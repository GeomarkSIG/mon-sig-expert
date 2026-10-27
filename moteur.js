/* ══════════════════════════════════════════════════════════════════
   MOTEUR DE RECOMMANDATION
   secteur  ->  budget  ->  3 scénarios (inférieur / recommandé / supérieur)
   Chaque scénario est composé brique par brique, puis ajusté à sa
   fourchette budgétaire (min–max) en respectant les compatibilités.
══════════════════════════════════════════════════════════════════ */
var BANDS = [
  {id:0, key:'zero',         lbl:'0 € — Open source',                  short:'0 €',              min:0,     max:0,     target:0},
  {id:1, key:'starter_free', lbl:'Starter · 50 – 1 000 €/an',          short:'50 – 1 000 €',     min:50,    max:1000,  target:600},
  {id:2, key:'inter_pro',    lbl:'Intermédiaire · 1 000 – 5 000 €/an', short:'1 000 – 5 000 €',  min:1000,  max:5000,  target:3000},
  {id:3, key:'avance',       lbl:'Avancé · 5 000 – 10 000 €/an',       short:'5 000 – 10 000 €', min:5000,  max:10000, target:7500},
  {id:4, key:'entreprise',   lbl:'Entreprise · 10 000 – 25 000 €/an',  short:'10 000 – 25 000 €',min:10000, max:25000, target:16000},
  {id:5, key:'premium',      lbl:'Grande organisation · +25 000 €/an', short:'+25 000 €',        min:25000, max:70000, target:36000}
];
var LEVEL_NAMES = ['Open Source','Starter','Professionnel','Avancé','Entreprise','Grande organisation'];
var BAND_BY_KEY = {zero:0, starter_free:1, inter_pro:2, avance:3, entreprise:4, premium:5};
var IMPLICIT_NEEDS = {geometre:['dwg'], btp:['dwg','bim'], energie:['iot'], transport:['iot'], immobilier:['opendata']};

/* ───────── CONTEXTE ───────── */
function buildCtx(P) {
  var g = function (k, d) { return (P[k] !== undefined && P[k] !== '') ? P[k] : d; };
  var sector = g('secteur', 'ne_sait_pas'); if (!SECT[sector]) sector = 'ne_sait_pas';
  var users = {solo:1, multi_2_5:3, multi_10:12}[g('collaboration', 'solo')] || 1;
  var vol = {leger:0, moyen:1, lourd:2}[g('volume', 'leger')] || 0;
  var scal = g('scalabilite', 'fixe');
  var load = Math.min(2, vol + (users >= 12 ? 1 : 0) + ((scal === 'elastique' || scal === 'pics') ? 1 : 0));
  var souv = {standard:0, sensible:1, critique:2}[g('souverainete', 'standard')] || 0;
  var cls = {sensible:1, confidentiel:2}[g('classification', 'public')] || 0;
  var si = g('si_existant', 'aucun');
  var terrain = g('terrain', 'nsp');
  var needs = (IMPLICIT_NEEDS[sector] || []).slice();
  function need(t) { if (needs.indexOf(t) < 0) needs.push(t); }
  if (P.interop_autocad === '1') { need('dwg'); need('bim'); }
  if (P.interop_erp === '1') need('erp');
  if (P.interop_bi === '1') need('bi');
  var rt = g('temps_reel', 'non');
  if (P.interop_iot === '1' || (rt !== 'non' && rt !== 'nsp') || g('frequence_maj', '') === 'temps_reel') need('iot');
  var diff = g('diffusion', 'nsp');
  if (P.interop_opendata === '1' || diff === 'grand_public') { need('opendata'); need('public'); }
  if (P.interop_api === '1') need('api');
  var sso = g('auth_sso', 'non');
  if (sso !== 'non' && sso !== 'nsp') need('sso');
  var besoinTerrain = terrain !== 'non' && terrain !== 'nsp';
  if (besoinTerrain) { need('mobile'); need('forms'); }
  if (diff === 'portail_metier') { need('portal'); need('forms'); }
  if (diff === 'collaboratif') need('portal');
  if (diff === 'simple_web') need('public');
  var aud = g('audience', 'interne');
  if (aud === 'public_large' || scal === 'elastique' || scal === 'pics') { need('scal'); need('public'); }
  if (aud === 'public_moyen') need('public');
  if (vol === 2) need('big');
  var etl = g('etl', 'non'); if (etl !== 'non' && etl !== 'nsp') need('etl');
  var img = g('imagerie', 'nsp'); if (['payant_mensuel', 'achat_precision', 'drone', 'sat_thr', 'gee'].indexOf(img) >= 0) need('raster');
  var bId = BAND_BY_KEY[g('budget', 'nsp')];
  var rec = (bId !== undefined) ? bId : SECT[sector].def;
  var levels = rec === 0 ? [0, 1, 2] : rec === 5 ? [3, 4, 5] : [rec - 1, rec, rec + 1];
  return {
    P: P, nom: g('identite', ''), sector: sector, mode: g('mode', 'simple'),
    users: users, vol: vol, load: load, mac: (si === 'apple_icloud'),
    sovLvl: Math.max(souv, cls), sso: sso, skill: {debutant:1, intermediaire:2, administrateur:3, developpeur:4}[g('competences', 'nsp')] || 2,
    maint: {zero:0, facile:1, avance:2}[g('maintenance', 'nsp')] !== undefined ? {zero:0, facile:1, avance:2}[g('maintenance', 'nsp')] : 1,
    frSupport: g('support_fr', 'non') === 'oui', formation: g('formation', 'non'),
    needs: needs, etlPref: etl, rt: rt, scal: scal, audience: aud, diffusion: diff,
    si: si, imgPref: img, terPref: terrain, besoinTerrain: besoinTerrain, crs: g('crs', 'lambert93'),
    pub: (sector === 'collectivite' || sector === 'etat'), acad: (sector === 'etudiant' || sector === 'ong'),
    budgetKey: g('budget', 'nsp'), budgetKnown: bId !== undefined, recLevel: rec, levels: levels
  };
}

/* ───────── ADMISSIBILITÉ & SCORE ───────── */
function allowed(b, C, stack) {
  if (b.win && C.mac) return false;
  for (var i = 0; i < CONFLITS.length; i++) {
    var c = CONFLITS[i];
    if ((c[0] === b.key && stack.indexOf(c[1]) >= 0) || (c[1] === b.key && stack.indexOf(c[0]) >= 0)) return false;
  }
  if (C.sovLvl > b.sv) {
    var ok = (b.crit === 'ent' && stack.indexOf('arcgis_ent') >= 0);
    if (!ok) return false;
  }
  return true;
}

var PREF_BONUS = {
  imagerie: {
    gratuit_local: ['osm_libre', 'ign_opendata'],
    payant_mensuel: ['sentinelhub', 'planet', 'sentinel2'],
    achat_precision: ['ign_precise', 'pleiades'],
    drone: ['drone_presta', 'odm', 'pix4d', 'metashape'],
    sat_thr: ['pleiades', 'maxar'],
    gee: ['gee', 'sentinelhub']
  },
  terrain: { qfield: ['qfield', 'mergin'], kobo: ['kobo', 'epicollect'], fieldmaps: ['fieldmaps', 'survey123'], supermap: ['supermap_imobile'] },
  etl: { qgis_modeler: ['qgis_modeler'], python_gdal: ['gdal'], fme: ['fme'] },
  sso: { ldap: ['ldap'], azure_ad: ['entra_id'], saml: ['keycloak'] }
};
function prefHit(map, key, k) { return map && map[key] && map[key].indexOf(k) >= 0; }

function score(b, C, stack) {
  var s = 10 * b.F[C.sector];
  stack = stack || [];
  var hasK = function (k) { return stack.indexOf(k) >= 0; };
  /* synergies : on reste dans un écosystème cohérent */
  if ((hasK('arcgis_ent') || hasK('arcgis_online')) && (b.key === 'arcgis_pro' || b.key === 'arcgis_pro_adv')) s += (b.key === 'arcgis_pro' ? 28 : 12);
  if (hasK('supermap_iserver') && b.key === 'supermap_idesktop') s += 28;
  if ((hasK('autocad') || hasK('aec') || hasK('bricscad')) && b.key === 'covadis') s += 10;
  s += b.pow * 3 * Math.max(0, C.level - 1);
  b.tg.forEach(function (t) { if (C.needs.indexOf(t) >= 0) s += 6; });
  if (b.fr === 1 && C.frSupport) s += 8;
  if (b.fr === 0) s -= (C.frSupport ? 14 : 10);
  if (b.key === 'render' && (hasK('lizmap') || hasK('geoserver_node') || hasK('geoserver') || hasK('postgis'))) s -= 15;
  if (b.lvl > C.skill) s -= 8 * (b.lvl - C.skill);
  if (b.ms > C.maint) s -= 10 * (b.ms - C.maint);
  if (b.si.indexOf(C.si) >= 0) s += 22;
  if (C.sovLvl >= 1 && b.fr === 1 && (b.cloud || b.cat === 'hebergement')) s += 8;
  if (C.level <= 1 && b.free) s += 4;
  if (prefHit(PREF_BONUS.imagerie, C.imgPref, b.key)) s += 24;
  if (prefHit(PREF_BONUS.terrain, C.terPref, b.key)) s += 30;
  if (prefHit(PREF_BONUS.etl, C.etlPref, b.key)) s += 26;
  if (prefHit(PREF_BONUS.sso, C.sso, b.key)) s += 26;
  if (b.key === 'postgrest' && C.needs.indexOf('api') >= 0) s += 18;
  if (b.key === 'traccar' && C.rt === 'suivi_vehicule') s += 26;
  if ((b.key === 'timescale_mqtt' || b.key === 'thingsboard') && C.rt === 'capteurs_iot') s += 16;
  if (b.cat === 'hebergement') {
    if (C.scal === 'elastique' && (b.key === 'aws' || b.key === 'k8s' || b.key === 'azure' || b.key === 'scaleway')) s += 14;
    if (C.audience === 'public_large' && (b.key === 'aws' || b.key === 'scaleway' || b.key === 'k8s' || b.key === 'ovh')) s += 8;
    if (C.sovLvl === 2 && b.key === 'local') s += 30;
  }
  if ((b.key === 'gpkg' || b.key === 'spatialite') && C.users >= 3) s -= (C.users >= 12 ? 50 : 24);
  if (b.key === 'postgis' && C.users >= 3) s += 10;
  if (C.crs === 'rgr92' && (b.key === 'qgis' || b.key === 'arcgis_pro')) s += 3;
  return s;
}

/* ───────── COÛT ───────── */
function costIn(k, stack, C) {
  for (var i = 0; i < stack.length; i++) if (D[stack[i]].inc.indexOf(k) >= 0) return 0;
  return priceOf(D[k], C);
}
function stackCost(stack, C) { return stack.reduce(function (t, k) { return t + costIn(k, stack, C); }, 0); }

/* ───────── COMPOSITION D'UN SCÉNARIO ───────── */
function compose(L, C0) {
  var band = BANDS[L];
  var C = Object.assign({}, C0, {level: L});
  var stack = [], notes = [], skipped = [];
  var soft = Math.min(band.max, band.target * 1.15);

  function has(k) { return stack.indexOf(k) >= 0; }
  function satisfied(grp, cur) {
    return grp.some(function (x) { return cur.indexOf(x) >= 0 || cur.some(function (s) { return D[s].inc.indexOf(x) >= 0; }); });
  }
  function needAdds(k, stk) {
    var add = [], cur = stk.slice();
    function walk(key) {
      var b = D[key];
      for (var i = 0; i < b.req.length; i++) {
        var grp = b.req[i]; if (satisfied(grp, cur)) continue;
        var pick = null;
        for (var j = 0; j < grp.length; j++) if (allowed(D[grp[j]], C, cur)) { pick = grp[j]; break; }
        if (!pick) return false;
        add.push(pick); cur.push(pick);
        if (!walk(pick)) return false;
      }
      return true;
    }
    return walk(k) ? add : null;
  }
  function marginal(k, ad) {
    var tmp = stack.concat(ad).concat([k]), before = stackCost(stack, C), after = stackCost(tmp, C);
    return after - before;
  }
  function candidates(filter) {
    var out = [];
    Object.keys(D).forEach(function (k) {
      var b = D[k]; if (has(k)) return;
      if (filter && !filter(b)) return;
      if (b.xg && stack.some(function (s) { return D[s].xg === b.xg; })) return;
      if (!allowed(b, C, stack)) return;
      var ad = needAdds(k, stack); if (ad === null) return;
      if (ad.some(function (a) { return D[a].cat === 'plateforme' && D[a].grp === 'main'; }) && stack.some(function (s) { return D[s].cat === 'plateforme' && D[s].grp === 'main'; })) return;
      out.push({k: k, sc: score(b, C, stack), m: marginal(k, ad), ad: ad});
    });
    out.sort(function (a, b) { return b.sc - a.sc || a.m - b.m; });
    return out;
  }
  function add(c) { c.ad.forEach(function (a) { if (!has(a)) stack.push(a); }); if (!has(c.k)) stack.push(c.k); }
  function room() { return soft - stackCost(stack, C); }

  /* pick : choisit jusqu'à n briques d'une catégorie (seuil de score, plafond budgétaire) */
  function pick(cat, n, thresh, required, extraFilter, capShare) {
    var got = 0;
    for (var i = 0; i < n; i++) {
      var cs = candidates(function (b) { return b.cat === cat && (!extraFilter || extraFilter(b)); });
      var cap = room() * (capShare || 1);
      var ch = null;
      for (var j = 0; j < cs.length; j++) {
        if (cs[j].sc < thresh && !(required && got === 0)) continue;
        if (cs[j].m <= cap + 1e-9) { ch = cs[j]; break; }
      }
      if (!ch && required && got === 0) {
        for (var j2 = 0; j2 < cs.length; j2++) if (cs[j2].m <= band.max - stackCost(stack, C)) { ch = cs[j2]; break; }
      }
      if (!ch) { if (required && got === 0) skipped.push(cat); break; }
      add(ch); got++;
    }
    return got;
  }

  /* 1 ─ Plateforme serveur / SaaS (choisie d'abord : elle conditionne le logiciel de bureau) */
  if (L >= 2) pick('plateforme', 1, 52, false, function (b) { return b.grp === 'main'; }, 0.85);

  /* 2 ─ Logiciel SIG principal */
  pick('logiciels', 1, -999, true, function (b) { return b.grp === 'sig'; }, 0.7);
  var prim = stack.filter(function (k) { return D[k].cat === 'logiciels'; })[0];
  if (prim && prim !== 'qgis' && L >= 2 && allowed(D.qgis, C, stack) && D.qgis.F[C.sector] >= 3) stack.push('qgis');
  /* 2b ─ DAO & outils métiers (seulement si le métier en a vraiment besoin) */
  pick('logiciels', 2, 42, false, function (b) { return (b.grp === 'dao' || b.grp === 'spec') && (b.F[C.sector] >= 4 || b.si.indexOf(C.si) >= 0); }, 0.55);
  if (has('supermap_iserver') && (C.needs.indexOf('portal') >= 0 || C.needs.indexOf('opendata') >= 0)) {
    var ip = candidates(function (b) { return b.key === 'supermap_iportal'; })[0];
    if (ip && ip.m <= room()) add(ip);
  }

  /* 3 ─ Base de données */
  pick('bases', 1, -999, true, function (b) { return b.free || b.cat === 'bases'; }, 0.6);

  /* 4 ─ Publication web */
  var wantPub = C.diffusion !== 'interne' || C.needs.indexOf('public') >= 0 || C.needs.indexOf('portal') >= 0 || L >= 2;
  if (wantPub) pick('publication', (C.audience === 'public_large' || C.diffusion === 'portail_metier') ? 2 : 1, 40, true, null, 0.7);

  /* 5 ─ Imagerie */
  var baseImg = candidates(function (b) { return b.key === 'osm_libre' || b.key === 'ign_opendata'; })[0];
  if (baseImg) add(baseImg);
  var imgThr = (C.imgPref === 'gratuit_local' || C.imgPref === 'nsp') ? 52 : 32;
  pick('imagerie', 2, imgThr, false, function (b) { return b.key !== 'osm_libre' && b.key !== 'ign_opendata'; }, 0.5);

  /* 6 ─ Terrain */
  if (C.besoinTerrain) {
    pick('terrain', 1, -999, true, null, 0.6);
    pick('terrain', 1, 48, false, function (b) { return b.free || b.key === 'rtk'; }, 0.3);
  }

  /* 7 ─ ETL, BI, IoT, SSO */
  if (C.needs.indexOf('etl') >= 0 || C.needs.indexOf('erp') >= 0 || C.needs.indexOf('api') >= 0 || (L >= 3 && C.needs.indexOf('dwg') >= 0))
    pick('etl', 2, 28, false, null, 0.5);
  if (C.needs.indexOf('bi') >= 0) pick('bi', 1, 15, false, null, 0.5);
  if (C.needs.indexOf('iot') >= 0) pick('iot', 2, 22, false, null, 0.5);
  if (C.needs.indexOf('sso') >= 0) pick('securite', 1, 0, false, null, 0.4);

  /* 8 ─ Hébergement (si au moins une brique auto-hébergée) */
  if (stack.some(function (k) { return D[k].host; })) pick('hebergement', 1, -999, true, null, 1);

  /* 9 ─ Support & sauvegarde */
  if (C.maint === 0 && stack.some(function (k) { return D[k].host && D[k].ms === 2; }) && L >= 2) pick('support', 1, -999, false, function (b) { return b.key === 'infogerance'; }, 1);
  if (C.frSupport && L >= 2 && (has('qgis') || has('postgis'))) pick('support', 1, -999, false, function (b) { return b.key === 'support_oss'; }, 1);
  if (L >= 1 && stack.some(function (k) { return D[k].cat === 'hebergement' && k !== 'local'; })) pick('support', 1, -999, false, function (b) { return b.key === 'backup'; }, 1);

  /* ───── Ajustement à la fourchette ───── */
  var guard = 0;
  var UP_CATS = {logiciels:1, plateforme:1, publication:1, imagerie:1, etl:1, bi:1, support:1, iot:1, terrain:1};
  function upgradeOne(relax) {
    var total = stackCost(stack, C), best = null;
    var cs = candidates(function (b) {
      if (!UP_CATS[b.cat] || b.cost === 0) return false;
      if (b.cat === 'logiciels' && b.grp === 'sig') return false;
      if (b.cat === 'plateforme' && b.grp !== 'main') return false;
      if (b.cat === 'plateforme' && stack.some(function (s) { return D[s].cat === 'plateforme' && D[s].grp === 'main'; })) return false;
      if (b.cat === 'publication' && stack.filter(function (s) { return D[s].cat === 'publication'; }).length >= 2) return false;
      if (b.cat === 'imagerie' && stack.filter(function (s) { return D[s].cat === 'imagerie'; }).length >= 4) return false;
      if ((b.cat === 'iot' && C.needs.indexOf('iot') < 0) || (b.cat === 'terrain' && !C.besoinTerrain)) return false;
      /* pertinence métier : support/sauvegarde toujours, sinon ajustement au secteur ou aux besoins */
      var relevant = b.cat === 'support' || b.F[C.sector] >= (relax === 2 ? 0 : relax ? 2 : 3) ||
        (b.F[C.sector] >= 2 && b.tg.some(function (t) { return C.needs.indexOf(t) >= 0; }));
      return relevant;
    });
    for (var i = 0; i < cs.length; i++) {
      var c = cs[i];
      if (c.m <= 0) continue;
      if (total + c.m > band.max + 1e-9) continue;
      var thr = relax ? -999 : (D[c.k].cat === 'support' ? -999 : 18);
      if (c.sc < thr) continue;
      if (!best || (total + c.m <= band.target * 1.1 && Math.abs(total + c.m - band.target) < Math.abs(total + best.m - band.target) - 1)) {
        if (!best) best = c;
        else if (c.sc >= best.sc - 12) best = c;
      }
      if (best && total + best.m >= band.min && c.sc < best.sc - 12) break;
    }
    if (!best) return false;
    add(best); return true;
  }

  /* montée en gamme d'une brique existante (hébergement / plateforme) quand il n'y a plus rien à ajouter */
  function swapUp() {
    var total = stackCost(stack, C), best = null;
    stack.slice().forEach(function (k) {
      var b = D[k]; if (b.cat !== 'hebergement' && !(b.cat === 'plateforme' && b.grp === 'main')) return;
      var st2 = stack.filter(function (x) { return x !== k; });
      Object.keys(D).forEach(function (c) {
        var cb = D[c]; if (cb.cat !== b.cat || cb.grp !== b.grp || stack.indexOf(c) >= 0) return;
        if (!allowed(cb, C, st2)) return;
        var ad = needAdds(c, st2); if (ad === null) return;
        var after = stackCost(st2.concat(ad).concat([c]), C);
        if (after <= total || after > band.max) return;
        var better = !best || (after >= band.min && (best.after < band.min || after < best.after)) || (best.after < band.min && after > best.after);
        if (better) best = {k: k, c: c, ad: ad, after: after};
      });
    });
    if (!best) return false;
    removeKey(best.k); best.ad.forEach(function (a) { if (!has(a)) stack.push(a); }); stack.push(best.c);
    return true;
  }
  while (stackCost(stack, C) < band.min && guard++ < 16) {
    if (!upgradeOne(false) && !upgradeOne(true) && !swapUp() && !upgradeOne(2)) break;
  }

  /* trop cher -> retirer / alléger */
  function removeKey(k) {
    var i = stack.indexOf(k); if (i >= 0) stack.splice(i, 1);
    var changed = true;
    while (changed) {
      changed = false;
      for (var j = stack.length - 1; j >= 0; j--) {
        var b = D[stack[j]];
        for (var g = 0; g < b.req.length; g++) {
          if (!satisfied(b.req[g], stack.filter(function (x) { return x !== stack[j]; }))) { stack.splice(j, 1); changed = true; break; }
        }
      }
    }
  }
  var core = {};
  function markCore() {
    core = {};
    ['logiciels', 'bases', 'hebergement'].forEach(function (cat) {
      var f = stack.filter(function (k) { return D[k].cat === cat; });
      if (f.length) core[f[0]] = 1;
    });
    var p = stack.filter(function (k) { return D[k].cat === 'publication'; }); if (p.length) core[p[0]] = 1;
    if (C.besoinTerrain) { var t = stack.filter(function (k) { return D[k].cat === 'terrain'; }); if (t.length) core[t[0]] = 1; }
  }
  guard = 0;
  while (stackCost(stack, C) > band.max + 1e-9 && guard++ < 20) {
    markCore();
    var cur = stackCost(stack, C), worst = null;
    stack.forEach(function (k) {
      if (core[k]) return;
      var save = cur - stackCost(stack.filter(function (x) { return x !== k; }), C);
      if (save <= 0) return;
      var val = score(D[k], C) + 1;
      var ratio = save / val;
      if (!worst || ratio > worst.ratio) worst = {k: k, ratio: ratio};
    });
    if (worst) { removeKey(worst.k); continue; }
    /* sinon échanger une brique de base pour une moins chère */
    var swapped = false;
    stack.slice().forEach(function (k) {
      if (swapped) return;
      var b = D[k], mine = costIn(k, stack, C); if (mine <= 0) return;
      var alts = candidates(function (x) { return x.cat === b.cat && x.grp === b.grp; }).filter(function (c) { return priceOf(D[c.k], C) < mine; });
      if (!alts.length) return;
      removeKey(k); add(alts[0]); swapped = true;
    });
    if (!swapped) break;
  }

  var total = stackCost(stack, C);
  var status = total < band.min - 1e-9 ? 'low' : total > band.max + 1e-9 ? 'high' : 'in';
  return {level: L, band: band, keys: ordered(stack), total: total, status: status, skipped: skipped, C: C};
}

function ordered(stack) {
  return stack.slice().sort(function (a, b) {
    var ca = CAT_ORDER.indexOf(D[a].cat), cb = CAT_ORDER.indexOf(D[b].cat);
    return ca - cb;
  });
}

/* ───────── ENRICHISSEMENT D'UN SCÉNARIO ───────── */
function describe(sc, C0, idx, recIdx) {
  var C = sc.C, S = SECT[C.sector];
  var rel = idx - recIdx;
  sc.role = rel === 0 ? 'rec' : rel < 0 ? 'inf' : 'sup';
  var roleTxt = {rec: 'Recommandé'};
  var n = Math.abs(rel);
  sc.roleLbl = rel === 0 ? 'Recommandé' : (rel < 0 ? 'Inférieur' : 'Supérieur') + (n > 1 || (C0.levels.length === 3 && (C0.recLevel === 0 || C0.recLevel === 5)) ? (rel < 0 ? ' −' : ' +') + n : '');
  sc.name = S.e + ' ' + S.tag;
  sc.palier = LEVEL_NAMES[sc.level];
  sc.items = sc.keys.map(function (k) {
    var b = D[k], p = costIn(k, sc.keys, C), inc = (p === 0 && priceOf(b, C) > 0);
    return {key: k, cat: b.cat, price: p, included: inc};
  });
  sc.perUser = C.users > 1 ? Math.round(sc.total / C.users) : null;
  var mains = sc.keys.filter(function (k) { return ['logiciels', 'plateforme', 'publication'].indexOf(D[k].cat) >= 0; }).slice(0, 4).map(function (k) { return D[k].n; });
  sc.desc = 'Palier ' + sc.palier + ' pour ' + S.l + ' : ' + mains.join(' + ') + '. Budget estimé ' + fmt(sc.total) + ' € / an dans la fourchette « ' + sc.band.short + ' ».';
  /* pertinence */
  var main = sc.keys.filter(function (k) { return ['logiciels', 'bases', 'publication', 'terrain', 'plateforme'].indexOf(D[k].cat) >= 0; });
  var avg = main.length ? main.reduce(function (t, k) { return t + D[k].F[C.sector]; }, 0) / main.length : 2;
  var pct = 52 + avg * 7 + (sc.status === 'in' ? 8 : 0) + Math.min(6, sc.keys.length / 2);
  sc.pct = Math.max(55, Math.min(97, Math.round(pct)));
  sc.compat = compatPairs(sc.keys);
  sc.conflicts = compatConflicts(sc.keys);
  sc.alerts = alertsFor(sc, C);
  sc.reasons = reasonsFor(sc, C);
  return sc;
}
function fmt(n) { return Math.round(n).toLocaleString('fr-FR'); }

function bandRelation(sc, C) {
  if (!C.budgetKnown) return null;
  var ub = BANDS[C.recLevel];
  if (sc.total < ub.min) return 'sous';
  if (sc.total > ub.max) return 'dessus';
  return 'dans';
}

/* ───────── ALERTES (incompatibilités) ───────── */
function alertsFor(sc, C) {
  var a = [], keys = sc.keys, sect = C.sector, b = sc.band;
  var has = function (k) { return keys.indexOf(k) >= 0; };
  if (b.id === 0 && (sect === 'geometre' || sect === 'btp'))
    a.push("💶 <strong>Budget 0 € et " + SECT[sect].l + "</strong> : sans AutoCAD/BricsCAD, les échanges DWG natifs restent limités (QGIS lit les DWG en lecture via GDAL). Un palier « Starter » ajoute BricsCAD (≈ 500 €/an).");
  if (b.id === 0 && C.imgPref === 'drone')
    a.push("🛰️ <strong>Drone et budget 0 €</strong> : l'acquisition (drone, prestation) a un coût ; on vous propose OpenDroneMap pour le traitement, Sentinel-2 et LiDAR HD IGN en alternatives gratuites.");
  if (C.mac && C.P.si_existant === 'apple_icloud')
    a.push("🍎 <strong>macOS détecté</strong> : ArcGIS Pro, AutoCAD, MapInfo, Global Mapper, TBC et Covadis sont Windows uniquement et ont été écartés. QGIS et BricsCAD fonctionnent nativement.");
  if (b.id <= 1 && C.users >= 12)
    a.push("👥 <strong>Budget faible et 10+ éditeurs</strong> : il faut au minimum un VPS (~168 €/an) et PostGIS pour éviter les conflits d'édition ; le palier proposé les intègre si possible.");
  if (C.sovLvl >= 1 && (has('supermap_idesktop') || has('supermap_iserver')))
    a.push("🔒 <strong>SuperMap et souveraineté</strong> : éditeur non européen ; à écarter pour les données sensibles ou critiques.");
  if (C.sovLvl === 2 && C.P.si_existant && ['aws', 'azure', 'google'].indexOf(C.P.si_existant) >= 0)
    a.push("🛡️ <strong>Souveraineté critique et SI cloud existant</strong> : votre cloud actuel est incompatible avec une exigence air-gapped ; l'architecture proposée est 100 % interne.");
  if (C.maint === 0 && keys.some(function (k) { return D[k].host && D[k].ms === 2; }) && !has('infogerance'))
    a.push("🛠️ <strong>Maintenance « zéro »</strong> : l'architecture contient des composants auto-hébergés (Linux/Docker). Prévoyez une infogérance (≈ 3 600 €/an) ou privilégiez une version SaaS.");
  if (sc.skipped && sc.skipped.length)
    a.push("⚠️ <strong>Composants non couverts à ce palier</strong> (" + sc.skipped.map(function (c) { return CATS[c].lbl; }).join(', ') + ") : le budget est insuffisant ; consultez le palier supérieur.");
  if (sc.status === 'high')
    a.push("💰 <strong>Dépassement de fourchette</strong> : l'estimation (" + fmt(sc.total) + " €) dépasse le plafond du palier (" + fmt(b.max) + " €) à cause du nombre d'utilisateurs ; réduisez les licences ou choisissez le palier supérieur.");
  [['imagerie', C.imgPref, 'Imagerie'], ['terrain', C.terPref, 'Outil terrain'], ['etl', C.etlPref, 'ETL'], ['sso', C.sso, 'SSO']].forEach(function (r) {
    var want = PREF_BONUS[r[0]][r[1]]; if (!want) return;
    if (!want.some(function (k) { return keys.indexOf(k) >= 0; }))
      a.push('🎛️ <strong>' + r[2] + ' demandé non retenu à ce palier</strong> : ' + D[want[0]].n.split(' (')[0] + ' n\'a pas pu être intégré (budget, souveraineté, système d\'exploitation ou dépendance manquante). Une alternative compatible est proposée.');
  });
  sc.conflicts.forEach(function (c) { a.push("🔀 <strong>Compatibilité</strong> : " + D[c.a].n + " ↔ " + D[c.b].n + " — " + c.note); });
  return a;
}

/* ───────── RAISONS ───────── */
function reasonsFor(sc, C) {
  var r = [], sect = C.sector, S = SECT[sect];
  var rel = bandRelation(sc, C);
  var recB = BANDS[C.recLevel];
  r.push({dot: 'g', txt: "<strong>Palier " + sc.palier + "</strong> (" + sc.band.short + ") : " + fmt(sc.total) + " €/an" + (sc.band.id === 0 ? " — architecture 100 % libre." : " pour " + C.users + " utilisateur" + (C.users > 1 ? "s" : "") + ".") +
    (rel === 'dans' ? " Dans la fourchette que vous avez indiquée." : rel === 'sous' ? " Sous votre fourchette (" + recB.short + ") : option d'économie." : rel === 'dessus' ? " Au-dessus de votre fourchette (" + recB.short + ") : option d'évolution." : " Budget non précisé : palier typique du métier « " + S.l + " »." )});
  sc.keys.forEach(function (k) {
    var b = D[k], t = lk(b.sp, sect);
    if (!t) return;
    var main = ['logiciels', 'plateforme', 'bases', 'publication', 'terrain', 'hebergement'].indexOf(b.cat) >= 0;
    if (main) r.push({dot: b.cat === 'plateforme' || b.cat === 'logiciels' ? 'b' : 'g', txt: "<strong>" + b.n + "</strong> — " + t});
  });
  if (C.sovLvl >= 1) r.push({dot: 'a', txt: "<strong>Souveraineté " + (C.sovLvl === 2 ? "critique" : "sensible") + "</strong> : les services SaaS non européens (Felt, ArcGIS Online, AWS, Mapbox, SuperMap…) sont écartés au profit de briques " + (C.sovLvl === 2 ? "auto-hébergées sur site." : "hébergées en France/UE.")});
  if (C.needs.indexOf('dwg') >= 0) r.push({dot: 'a', txt: "<strong>Interopérabilité CAO/BIM</strong> : DWG/DXF/IFC pris en charge via " + (sc.keys.indexOf('autocad') >= 0 ? 'AutoCAD' : sc.keys.indexOf('aec') >= 0 ? 'la collection AEC' : sc.keys.indexOf('bricscad') >= 0 ? 'BricsCAD' : 'GDAL (lecture) ; ajoutez BricsCAD/AutoCAD pour l’édition') + (sc.keys.indexOf('fme') >= 0 ? ' et FME.' : '.')});
  if (C.maint === 0) r.push({dot: 'b', txt: "<strong>Maintenance minimale</strong> : préférence aux SaaS ou aux services managés" + (sc.keys.indexOf('infogerance') >= 0 ? ", avec infogérance du serveur." : ".")});
  if (C.frSupport) r.push({dot: 'b', txt: "<strong>Support francophone</strong> : priorité aux éditeurs/intégrateurs français (3Liz, Oslandia, Esri France, Geoconcept…) ; les outils sans support en français ont été pénalisés."});
  return r;
}

/* ───────── ALTERNATIVES PAR CATÉGORIE ───────── */
function alternatives(sc) {
  var C = sc.C, out = {};
  var chosen = sc.keys;
  var cats = {};
  chosen.forEach(function (k) { cats[D[k].cat] = (cats[D[k].cat] || 0) + priceOf(D[k], C); });
  Object.keys(cats).forEach(function (cat) {
    var winP = cats[cat];
    var list = Object.keys(D).filter(function (k) {
      var b = D[k]; return b.cat === cat && chosen.indexOf(k) < 0 && allowed(b, C, chosen);
    }).map(function (k) {
      var b = D[k], dep = 0, present = function (x) { return chosen.indexOf(x) >= 0 || chosen.some(function (s) { return D[s].inc.indexOf(x) >= 0; }); };
      b.req.forEach(function (g) { if (g.some(present)) return; for (var i = 0; i < g.length; i++) if (allowed(D[g[i]], C, chosen)) { dep += priceOf(D[g[i]], C); return; } });
      return {k: k, sc: score(b, C, chosen), p: priceOf(b, C) + dep, dep: dep};
    })
      .sort(function (a, b) { return b.sc - a.sc; }).slice(0, 6);
    if (list.length) out[cat] = {winP: winP, list: list};
  });
  return out;
}
function budgetTag(altP, winP) {
  if (altP < winP) return ['t-inf', 'Budget inf.'];
  if (Math.abs(altP - winP) <= Math.max(50, winP * 0.15)) return ['t-sim', 'Similaire'];
  if (altP > winP && altP <= winP * 4 + 800) return ['t-sup', 'Budget sup.'];
  return ['t-hb', 'Hors budget'];
}

/* ───────── POINT D'ENTRÉE ───────── */
function run(P) {
  var C = buildCtx(P);
  var recIdx = C.levels.indexOf(C.recLevel);
  var scenarios = C.levels.map(function (L, i) { return describe(compose(L, C), C, i, recIdx); });
  return {C: C, scenarios: scenarios, recIdx: recIdx};
}
if (typeof module !== 'undefined') module.exports = {run: run, D: D, BANDS: BANDS, SECT: SECT, CATS: CATS, buildCtx: buildCtx, compose: compose};
