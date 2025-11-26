export class UltimaTorciaItemSheet extends foundry.appv1.sheets.ItemSheet {
    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["ultima-torcia", "sheet", "item"],
            width: 520,
            height: 480,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "description",
                },
            ],
        });
    }

    /** @override */
    get template() {
        const path = "systems/ultima-torcia/templates/item";
        // Return a single sheet for all item types.
        // return `${path}/item-sheet.hbs`;

        // Alternatively, return a different sheet for each item type.
        return `${path}/item-sheet.hbs`;
    }

    /** @override */
    getData() {
        const context = super.getData();
        return context;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;
    }
}
