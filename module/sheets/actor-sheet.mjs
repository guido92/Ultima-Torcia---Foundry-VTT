export class UltimaTorciaActorSheet extends foundry.appv1.sheets.ActorSheet {
    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["ultima-torcia", "sheet", "actor"],
            template: "systems/ultima-torcia/templates/actor/actor-character-sheet.hbs",
            width: 600,
            height: 700,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "attributes",
                },
            ],
        });
    }

    /** @override */
    getData() {
        const context = super.getData();
        const actorData = context.actor.system;

        context.system = actorData;
        context.flags = context.actor.flags;

        // Prepare character data and items.
        if (context.actor.type === "character") {
            this._prepareCharacterData(context);
        }

        return context;
    }

    /**
     * Organize and classify Items for Character sheets.
     *
     * @param {Object} context The context object to use for rendering.
     */
    _prepareCharacterData(context) {
        // Handle item sorting here if needed
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        // Rollable abilities.
        html.find(".rollable").click(this._onRoll.bind(this));

        // Render the item sheet for viewing/editing prior to the editable check.
        html.find(".item-edit").click((ev) => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.sheet.render(true);
        });

        // Delete Inventory Item
        html.find(".item-delete").click((ev) => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.delete();
        });

        // Create new Item
        html.find(".item-create").click(this._onItemCreate.bind(this));

        // Item Roll
        html.find(".item-roll").click(this._onItemRoll.bind(this));
    }

    /**
     * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
     * @param {Event} event   The originating click event
     * @private
     */
    async _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        // Get the type of item to create.
        const type = header.dataset.type;
        // Grab any data associated with this control.
        const data = duplicate(header.dataset);
        // Initialize a default name.
        const name = `New ${type.capitalize()}`;
        // Prepare the item object.
        const itemData = {
            name: name,
            type: type,
            system: data,
        };
        // Remove the type from the dataset since it's in the itemData.type prop.
        delete itemData.system["type"];

        // Finally, create the item!
        return await Item.create(itemData, { parent: this.actor });
    }

    /**
     * Handle clickable rolls.
     * @param {Event} event   The originating click event
     * @private
     */
    _onRoll(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;

        // Handle rolls.
        if (dataset.roll) {
            let label = dataset.label ? `Rolling ${dataset.label}` : "";

            // Create a dialog to ask for modifiers
            new Dialog({
                title: "Roll Attribute",
                content: `
          <form>
            <div class="form-group">
              <label>Modifier</label>
              <input type="text" name="modifier" value="0"/>
            </div>
            <div class="form-group">
              <label>Roll Mode</label>
              <select name="mode">
                <option value="normal">Normal (1d10)</option>
                <option value="advantage">Advantage (2d10kh1)</option>
                <option value="disadvantage">Disadvantage (2d10kl1)</option>
              </select>
            </div>
          </form>
        `,
                buttons: {
                    roll: {
                        label: "Roll",
                        callback: (html) => {
                            const modifier = parseInt(html.find('[name="modifier"]').val()) || 0;
                            const mode = html.find('[name="mode"]').val();
                            let formula = dataset.roll;

                            if (mode === "advantage") {
                                formula = formula.replace("d10", "2d10kh1");
                            } else if (mode === "disadvantage") {
                                formula = formula.replace("d10", "2d10kl1");
                            }

                            if (modifier !== 0) {
                                formula += ` + ${modifier}`;
                            }

                            let roll = new Roll(formula, this.actor.getRollData());
                            roll.toMessage({
                                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                                flavor: label,
                                rollMode: game.settings.get("core", "rollMode"),
                            });
                        },
                    },
                },
                default: "roll",
            }).render(true);
        }
    }

    /**
     * Handle item rolls.
     * @param {Event} event   The originating click event
     * @private
     */
    _onItemRoll(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const itemId = element.closest(".item").dataset.itemId;
        const item = this.actor.items.get(itemId);

        // Basic roll logic for items (e.g. Weapon Damage)
        if (item.type === "weapon") {
            let formula = item.system.damage.value;
            let label = `Attacking with ${item.name}`;

            // You might want to add an attribute roll here first (Attack Roll)
            // For now, just rolling damage as an example
            let roll = new Roll(formula, this.actor.getRollData());
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor: label,
                rollMode: game.settings.get("core", "rollMode"),
            });
        } else {
            // Show item description in chat
            item.roll();
        }
    }
}
