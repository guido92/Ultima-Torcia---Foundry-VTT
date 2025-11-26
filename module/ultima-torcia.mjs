import { UltimaTorciaActor } from "./documents/actor.mjs";
import { UltimaTorciaItem } from "./documents/item.mjs";
import { UltimaTorciaActorSheet } from "./sheets/actor-sheet.mjs";
import { UltimaTorciaItemSheet } from "./sheets/item-sheet.mjs";

Hooks.once("init", async function () {
  console.log("L'Ultima Torcia | Initializing L'Ultima Torcia System");

  // Define custom entity classes
  CONFIG.Actor.documentClass = UltimaTorciaActor;
  CONFIG.Item.documentClass = UltimaTorciaItem;

  // Register sheet application classes
  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("ultima-torcia", UltimaTorciaActorSheet, {
    makeDefault: true,
    label: "L'Ultima Torcia Character Sheet",
  });

  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet("ultima-torcia", UltimaTorciaItemSheet, {
    makeDefault: true,
    label: "L'Ultima Torcia Item Sheet",
  });

  // Register helpers
  Handlebars.registerHelper("eq", function (a, b) {
    return a === b;
  });

  // Preload Handlebars templates
  return preloadHandlebarsTemplates();
});

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    "systems/ultima-torcia/templates/actor/actor-character-sheet.hbs",
    "systems/ultima-torcia/templates/item/item-sheet.hbs",
  ];
  return foundry.applications.handlebars.loadTemplates(templatePaths);
}
