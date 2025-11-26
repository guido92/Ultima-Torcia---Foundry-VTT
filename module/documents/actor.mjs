export class UltimaTorciaActor extends Actor {
    /** @override */
    prepareData() {
        // Prepare data for the actor. Data preparation involves three steps:
        // 1. Prepare data from the `data` object
        // 2. Prepare derived data
        // 3. Prepare embedded documents
        super.prepareData();
    }

    /** @override */
    prepareBaseData() {
        // Data modifications in this step occur before processing embedded
        // documents or derived data.
    }

    /** @override */
    prepareDerivedData() {
        const actorData = this;
        const system = actorData.system;
        const flags = actorData.flags.ultimaTorcia || {};

        // Make separate methods for each Actor type (character, npc, etc.) to keep
        // things organized.
        this._prepareCharacterData(actorData);
    }

    /**
     * Prepare Character type specific data
     */
    _prepareCharacterData(actorData) {
        if (actorData.type !== "character") return;

        // Make modifications to data here. For example:
        const system = actorData.system;

        // Calculate Armor Class (CA)
        let armorValue = 0;
        for (let item of this.items) {
            if (item.type === 'armor') {
                armorValue += item.system.value.value || 0;
            }
        }
        // We can store this in a temporary property
        system.attributes.armor = { value: armorValue, label: "Armatura" };
    }

    /** @override */
    getRollData() {
        const data = super.getRollData();

        // Prepare character roll data.
        this._getCharacterRollData(data);
        this._getNpcRollData(data);

        return data;
    }

    /**
     * Prepare character roll data.
     */
    _getCharacterRollData(data) {
        if (this.type !== "character") return;

        // Copy the system data to the top level, so that rolls can use
        // formulas like `@attributes.str.mod + 4`.
        if (data.attributes) {
            for (let [k, v] of Object.entries(data.attributes)) {
                data[k] = foundry.utils.deepClone(v);
            }
        }
    }

    /**
     * Prepare NPC roll data.
     */
    _getNpcRollData(data) {
        if (this.type !== "npc") return;

        // Process NPC data here
    }
}
