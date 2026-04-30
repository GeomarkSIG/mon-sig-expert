export function computeScores(params) {

  let scores = {};
  let reasons = {};

  const init = (cat, keys) => {
    scores[cat] = {};
    reasons[cat] = {};
    keys.forEach(k => {
      scores[cat][k] = 0;
      reasons[cat][k] = [];
    });
  };

  // INIT
  init("logiciels", ["qgis","arcgis","autocad"]);
  init("bases", ["postgis","supabase","gpkg"]);
  init("serveurs", ["ovh","aws","local"]);
  init("web", ["lizmap","openlayers","experience"]);
  init("imagerie", ["osm","sentinel","drone"]);

  // --- BUDGET ---
  if (params.budget === "zero") {
    scores.logiciels.qgis += 100;
    reasons.logiciels.qgis.push("Budget nul");

    scores.bases.gpkg += 100;
    scores.serveurs.local += 100;
  }

  if (params.budget === "entreprise") {
    scores.logiciels.arcgis += 120;
    reasons.logiciels.arcgis.push("Budget élevé");

    scores.serveurs.aws += 100;
  }

  // --- VOLUME ---
  if (params.volume === "lourd") {
    scores.bases.postgis += 150;
    reasons.bases.postgis.push("Gros volume");
  }

  // --- TERRAIN ---
  if (params.besoin === "terrain") {
    scores.imagerie.drone += 120;
    reasons.imagerie.drone.push("Collecte terrain");
  }

  // --- DIFFUSION ---
  if (params.besoin === "web") {
    scores.web.lizmap += 100;
    scores.web.openlayers += 80;
  }

  return { scores, reasons };
}
