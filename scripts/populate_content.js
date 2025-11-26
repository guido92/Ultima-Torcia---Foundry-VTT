/**
 * Script to populate compendiums with standard L'Ultima Torcia content.
 * Usage: Run this script in the Foundry VTT console or as a macro.
 */

const RACES = [
    {
        name: "Umano",
        type: "feature",
        img: "icons/svg/mystery-man.svg",
        system: {
            subtype: { value: "race" },
            description: { value: "<p>Versatile e adattabile. +1 a una caratteristica a scelta.</p>" }
        }
    },
    {
        name: "Elfo",
        type: "feature",
        img: "icons/svg/mystery-man.svg",
        system: {
            subtype: { value: "race" },
            description: { value: "<p>Agile e magico, ma fragile. +Agilità, +Magia, +Percezione. -Forza, -Socialità. Abilità: Passo Lieve.</p>" }
        }
    },
    {
        name: "Nano",
        type: "feature",
        img: "icons/svg/mystery-man.svg",
        system: {
            subtype: { value: "race" },
            description: { value: "<p>Robusto e resistente. +Coraggio, +Forza, +Manualità. -Agilità, -Magia, -Socialità. Abilità: Tempra Dura.</p>" }
        }
    }
];

const ROLES = [
    {
        name: "Guerriero",
        type: "feature",
        img: "icons/svg/sword.svg",
        system: {
            subtype: { value: "role" },
            description: { value: "<p>Combattente in prima linea. Bonus: Agilità, Coraggio, Forza.</p>" }
        }
    },
    {
        name: "Ladro",
        type: "feature",
        img: "icons/svg/daze.svg",
        system: {
            subtype: { value: "role" },
            description: { value: "<p>Esperto di furtività e inganni. Bonus: Agilità, Manualità, Percezione.</p>" }
        }
    },
    {
        name: "Sacerdote",
        type: "feature",
        img: "icons/svg/angel.svg",
        system: {
            subtype: { value: "role" },
            description: { value: "<p>Guaritore e protettore. Bonus: Coraggio, Magia, Socialità.</p>" }
        }
    },
    {
        name: "Stregone",
        type: "feature",
        img: "icons/svg/lightning.svg",
        system: {
            subtype: { value: "role" },
            description: { value: "<p>Incantatore offensivo. Bonus: Magia.</p>" }
        }
    },
    {
        name: "Ranger",
        type: "feature",
        img: "icons/svg/target.svg",
        system: {
            subtype: { value: "role" },
            description: { value: "<p>Esploratore e cacciatore. Bonus: Agilità, Manualità, Percezione.</p>" }
        }
    }
];

const ABILITIES = [
    {
        name: "Passo Lieve",
        type: "feature",
        system: {
            subtype: { value: "ability" },
            description: { value: "<p>(Elfo) Movimento silenzioso e immunità a veleni/malattie.</p>" }
        }
    },
    {
        name: "Tempra Dura",
        type: "feature",
        system: {
            subtype: { value: "ability" },
            description: { value: "<p>(Nano) Rimane cosciente a 0 PF.</p>" }
        }
    },
    {
        name: "Doppia Parata",
        type: "feature",
        system: {
            subtype: { value: "ability" },
            description: { value: "<p>(Guerriero) Può parare due attacchi per turno.</p>" }
        }
    },
    {
        name: "Colpire alle Spalle",
        type: "feature",
        system: {
            subtype: { value: "ability" },
            description: { value: "<p>(Ladro) +1d6 danni se attacca alle spalle.</p>" }
        }
    },
    {
        name: "Guarigione Sacra",
        type: "spell", // Using spell type for magic abilities
        system: {
            cost: { value: 1 },
            description: { value: "<p>(Sacerdote) Cura ferite.</p>" }
        }
    },
    {
        name: "Getto di Fiamme",
        type: "spell",
        system: {
            cost: { value: 1 },
            description: { value: "<p>(Stregone) Infligge danni da fuoco.</p>" }
        }
    }
];

const GEAR = [
    {
        name: "Spada Corta",
        type: "weapon",
        img: "icons/weapons/swords/sword-short-iron.webp",
        system: {
            damage: { value: "1d6" },
            type: { value: "melee" }
        }
    },
    {
        name: "Arco Corto",
        type: "weapon",
        img: "icons/weapons/bows/shortbow-simple.webp",
        system: {
            damage: { value: "1d6" },
            type: { value: "ranged" }
        }
    },
    {
        name: "Armatura di Cuoio",
        type: "armor",
        img: "icons/equipment/chest/leather-jerkin.webp",
        system: {
            value: { value: 1 }
        }
    },
    {
        name: "Torcia",
        type: "consumable",
        img: "icons/sundries/lights/torch-brown-lit.webp",
        system: {
            quantity: { value: 1 }
        }
    },
    {
        name: "Razione",
        type: "consumable",
        img: "icons/consumables/food/ration-wrapped.webp",
        system: {
            quantity: { value: 1 }
        }
    }
];

export async function populateCompendiums() {
    console.log("Ultima Torcia | Populating Compendiums...");

    // Helper to create or get pack
    const getPack = async (packName) => {
        const pack = game.packs.get(`ultima-torcia.${packName}`);
        if (!pack) {
            console.error(`Pack ultima-torcia.${packName} not found.`);
            return null;
        }
        // Unlock pack if locked (not possible via API usually for system packs, but we try)
        if (pack.locked) await pack.configure({ locked: false });
        return pack;
    };

    // Populate Races
    const racePack = await getPack("races");
    if (racePack) {
        for (let data of RACES) {
            const existing = racePack.index.find(i => i.name === data.name);
            if (!existing) await Item.create(data, { pack: racePack.collection });
        }
    }

    // Populate Roles
    const rolePack = await getPack("roles");
    if (rolePack) {
        for (let data of ROLES) {
            const existing = rolePack.index.find(i => i.name === data.name);
            if (!existing) await Item.create(data, { pack: rolePack.collection });
        }
    }

    // Populate Abilities
    const abilityPack = await getPack("abilities");
    if (abilityPack) {
        for (let data of ABILITIES) {
            const existing = abilityPack.index.find(i => i.name === data.name);
            if (!existing) await Item.create(data, { pack: abilityPack.collection });
        }
    }

    // Populate Gear
    const gearPack = await getPack("gear");
    if (gearPack) {
        for (let data of GEAR) {
            const existing = gearPack.index.find(i => i.name === data.name);
            if (!existing) await Item.create(data, { pack: gearPack.collection });
        }
    }

    console.log("Ultima Torcia | Compendiums Populated!");
    ui.notifications.info("Compendiums Populated!");
}
