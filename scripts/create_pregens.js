/**
 * Macro to create Pregenerated Characters for L'Ultima Torcia.
 * Creates: Trager (Human Warrior), Jildoar (Elf Sorcerer), Laka (Dwarf Priest).
 */

const PREGENS = [
    {
        name: "Trager",
        type: "character",
        img: "icons/svg/mystery-man.svg",
        system: {
            details: { race: { value: "Umano" }, role: { value: "Guerriero" } },
            attributes: {
                forza: { value: 2, pregio: true }, // Guerriero + Umano bonus
                agilita: { value: 1 },
                coraggio: { value: 1 },
                intelligenza: { value: 1 },
                magia: { value: 0 },
                manualita: { value: 1 },
                percezione: { value: 1 },
                socialita: { value: 1 }
            },
            resources: {
                hp: { value: 10, max: 10 },
                mana: { value: 0, max: 0 }
            }
        },
        items: [
            { name: "Spada Corta", type: "weapon", system: { damage: { value: "1d6" }, type: { value: "melee" } } },
            { name: "Armatura di Cuoio", type: "armor", system: { value: { value: 1 } } },
            { name: "Doppia Parata", type: "feature", system: { subtype: { value: "ability" }, description: { value: "Parata extra." } } }
        ]
    },
    {
        name: "Jildoar Gufo d'Argento",
        type: "character",
        img: "icons/svg/mystery-man.svg",
        system: {
            details: { race: { value: "Elfo" }, role: { value: "Stregone" } },
            attributes: {
                magia: { value: 2, pregio: true },
                agilita: { value: 2 },
                percezione: { value: 2 },
                forza: { value: 0 },
                socialita: { value: 0 }
            },
            resources: {
                hp: { value: 8, max: 8 },
                mana: { value: 5, max: 5 }
            }
        },
        items: [
            { name: "Pugnale", type: "weapon", system: { damage: { value: "1d4" }, type: { value: "melee" } } },
            { name: "Getto di Fiamme", type: "spell", system: { cost: { value: 1 }, description: { value: "Danni da fuoco." } } },
            { name: "Passo Lieve", type: "feature", system: { subtype: { value: "ability" } } }
        ]
    },
    {
        name: "Laka Pietrascudo",
        type: "character",
        img: "icons/svg/mystery-man.svg",
        system: {
            details: { race: { value: "Nano" }, role: { value: "Sacerdote" } },
            attributes: {
                coraggio: { value: 2, pregio: true },
                forza: { value: 2 },
                manualita: { value: 2 },
                agilita: { value: 0 },
                magia: { value: 0 },
                socialita: { value: 0 }
            },
            resources: {
                hp: { value: 12, max: 12 },
                mana: { value: 2, max: 2 }
            }
        },
        items: [
            { name: "Martello da Guerra", type: "weapon", system: { damage: { value: "1d8" }, type: { value: "melee" } } },
            { name: "Guarigione Sacra", type: "spell", system: { cost: { value: 1 } } },
            { name: "Tempra Dura", type: "feature", system: { subtype: { value: "ability" } } }
        ]
    }
];

export async function createPregens() {
    console.log("Ultima Torcia | Creating Pregenerated Characters...");
    for (let data of PREGENS) {
        const existing = game.actors.getName(data.name);
        if (!existing) {
            await Actor.create(data);
            console.log(`Created ${data.name}`);
        } else {
            console.log(`${data.name} already exists.`);
        }
    }
    ui.notifications.info("Pregenerated Characters Created!");
}
