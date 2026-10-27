/* ══════════════════════════════════════════════════════════════════
   MATRICE DE COMPATIBILITÉ ENTRE BRIQUES
   niveau : natif · via (conversion / plugin / service OGC) · limite · non
══════════════════════════════════════════════════════════════════ */
var COMPAT = [
  /* QGIS ↔ bases */
  ['qgis','postgis','natif',"Connexion PostGIS native : édition multi-utilisateur, vues, couches liées, SQL."],
  ['qgis','gpkg','natif',"Format de référence : lecture/écriture complètes, styles embarqués."],
  ['qgis','spatialite','natif',"Lecture/écriture native, requêtes SQL via DB Manager."],
  ['qgis','file_gdb','limite',"Lecture OK via GDAL/OpenFileGDB ; écriture limitée selon version."],
  ['qgis','sqlserver_spatial','natif',"Connecteur SQL Server natif (GEOMETRY/GEOGRAPHY)."],
  ['qgis','oracle_spatial','natif',"Connecteur Oracle Spatial natif (client Oracle requis)."],
  ['qgis','duckdb','via',"Lecture GeoParquet / DuckDB via GDAL ou plugin ; écriture par export."],
  ['qgis','supabase','natif',"PostGIS managé : connexion PostgreSQL standard."],
  ['qgis','mapinfo','via',"Fichiers .TAB lus/écrits via GDAL ; styles MapInfo non conservés."],
  ['qgis','supermap_idesktop','via',"Échange via SHP/GPKG/GeoJSON ou services OGC ; formats UDB/UDBX non natifs."],
  ['qgis','autocad','via',"DWG/DXF via GDAL en lecture ; export DXF ; édition DWG native seulement dans AutoCAD."],
  ['qgis','bricscad','via',"Échange DWG/DXF via GDAL ; fonctionnement côte à côte courant en cabinet de géomètres."],
  ['qgis','arcgis_pro','via',"Échange SHP/GPKG/GDB (lecture) et services WMS/WFS ; styles non transposables."],
  ['qgis','global_mapper','via',"Échange GeoTIFF/LAZ/SHP ; Global Mapper traite MNT et LiDAR avant QGIS."],
  ['qgis','grass','natif',"Intégré via Processing : modules GRASS accessibles dans QGIS."],
  ['qgis','otb','natif',"Algorithmes Orfeo Toolbox disponibles dans la boîte à outils Processing."],
  ['qgis','python_geo','natif',"PyQGIS + GeoPandas/Rasterio dans la console et les scripts."],
  ['qgis','josm','via',"Échange OSM/GeoJSON ; QuickOSM pour importer des données OSM."],
  /* QGIS ↔ web / terrain */
  ['qgis','lizmap','natif',"Lizmap publie directement les projets QGIS (.qgz) avec symbologie fidèle."],
  ['qgis','lizmap_hosted','natif',"Dépôt des projets QGIS via plugin Lizmap, publication hébergée."],
  ['qgis','g3w','natif',"Plugin G3W-Suite pour envoyer les projets QGIS."],
  ['qgis','qwc2','natif',"Utilise QGIS Server pour rendre les projets QGIS."],
  ['qgis','qgis_cloud','natif',"Plugin QGIS Cloud : publication en un clic."],
  ['qgis','qfield','natif',"QFieldSync prépare les projets QGIS pour le terrain hors-ligne."],
  ['qgis','mergin','natif',"Plugin Mergin Maps pour synchroniser les projets QGIS."],
  ['qgis','kobo','via',"Import des soumissions Kobo/ODK en CSV/GeoJSON ou via plugin."],
  ['qgis','geoserver_node','via',"QGIS consomme les services WMS/WFS GeoServer ; exportation SLD possible."],
  ['qgis','geoserver','via',"Services OGC consommés dans QGIS ; styles SLD."],
  ['qgis','experience_builder','limite',"Pas de publication directe ; passer par services OGC ou import dans ArcGIS."],
  ['qgis','mergin','natif',"Synchronisation de projets, versions et formulaires."],
  /* Lizmap & co */
  ['lizmap','postgis','natif',"Édition multi-utilisateur sur PostGIS depuis le web (formulaires QGIS)."],
  ['lizmap','gpkg','limite',"Lecture OK ; édition concurrente limitée (SQLite verrouille les fichiers)."],
  ['lizmap','ovh','natif',"Déploiement Docker standard sur VPS Linux."],
  ['lizmap','scaleway','natif',"Déploiement Docker sur instances ou Kubernetes."],
  ['lizmap','hetzner','natif',"Déploiement Docker standard."],
  ['lizmap','local','natif',"Serveur interne Linux ; intranet possible."],
  ['lizmap','render','limite',"Possible avec disque persistant payant ; plan gratuit inadapté (mise en veille)."],
  ['lizmap','keycloak','natif',"Authentification SAML/OIDC via plugin."],
  ['lizmap','ldap','natif',"Authentification LDAP/AD native."],
  ['lizmap','felt','non',"Deux chaînes de publication concurrentes ; ne pas cumuler sans besoin."],
  ['lizmap','arcgis_online','non',"Aucune intégration : portails distincts."],
  /* GeoServer */
  ['geoserver_node','postgis','natif',"Publie PostGIS en WMS/WFS/WCS/WMTS."],
  ['geoserver','postgis','natif',"Entrepôt PostGIS natif avec styles SLD/CSS."],
  ['geoserver_node','geonetwork','natif',"GeoNode intègre le catalogue ; GeoNetwork en complément pour INSPIRE."],
  ['geoserver_node','keycloak','natif',"SAML/OIDC via GeoNode/OAuth2."],
  ['geoserver_node','ldap','natif',"LDAP natif dans GeoServer et GeoNode."],
  ['geoserver','openlayers','natif',"Flux OGC consommés directement par OpenLayers/Leaflet/MapLibre."],
  ['geoserver','arcgis_pro','via',"Ajout de couches WMS/WFS dans ArcGIS Pro (lecture)."],
  ['mapserver','openlayers','natif',"Services WMS/WFS/WMTS consommés par OpenLayers."],
  /* Esri */
  ['arcgis_pro','arcgis_online','natif',"Publication directe de cartes et couches depuis ArcGIS Pro."],
  ['arcgis_pro','arcgis_ent','natif',"Publication vers le portail Enterprise, Named User via portail."],
  ['arcgis_pro','file_gdb','natif',"Géodatabase fichier native."],
  ['arcgis_pro','postgis','natif',"Connexion PostGIS en lecture/écriture (Query Layers/connexions DB)."],
  ['arcgis_pro','autocad','natif',"Import/export DWG natif ; CAD to Geodatabase."],
  ['arcgis_pro','mapinfo','via',"Import TAB via Data Interoperability ou conversion SHP."],
  ['arcgis_pro','sqlserver_spatial','natif',"Géodatabase d'entreprise SQL Server officiellement supportée."],
  ['arcgis_pro','oracle_spatial','natif',"Géodatabase d'entreprise Oracle officiellement supportée."],
  ['arcgis_online','experience_builder','natif',"Inclus : Experience Builder dans le portail."],
  ['arcgis_online','fieldmaps','natif',"Inclus : projets Field Maps liés aux cartes AGO."],
  ['arcgis_online','survey123','natif',"Inclus : enquêtes publiées dans le portail."],
  ['arcgis_ent','fieldmaps','natif',"Inclus dans Enterprise, avec edition via Feature Services."],
  ['arcgis_ent','postgis','via',"PostGIS non supporté en géodatabase ; accessible en Query Layer en lecture."],
  ['arcgis_ent','ldap','natif',"Authentification LDAP/AD native pour les Named Users."],
  ['arcgis_ent','entra_id','natif',"SSO SAML/Entra ID natif."],
  ['arcgis_ent','arcgis_geoevent','natif',"Extension temps réel intégrée au portail."],
  ['arcgis_ent','azure','natif',"Déploiement supporté sur VM Azure (Esri ArcGIS Enterprise Cloud Builder)."],
  ['arcgis_ent','aws','natif',"Déploiement supporté sur EC2 (CloudFormation Esri)."],
  ['arcgis_online','keycloak','limite',"SAML possible via portail organisation ; configuration spécifique."],
  ['arcgis_pro','python_geo','via',"ArcPy et API ArcGIS for Python ; GeoPandas via conversions."],
  /* AutoCAD / BIM */
  ['autocad','covadis','natif',"Covadis est un plug-in AutoCAD : topographie, VRD, MNT."],
  ['bricscad','covadis','natif',"Covadis fonctionne également sous BricsCAD."],
  ['autocad','fme','natif',"FME lit/écrit DWG, DXF et IFC avec fort contrôle de schéma."],
  ['autocad','aec','natif',"Civil 3D / Revit inclus dans la collection AEC."],
  ['autocad','tbc','via',"Échange DWG/LandXML avec Trimble Business Center."],
  ['aec','supermap_idesktop','via',"Échange IFC/Revit possible, modèle BIM visualisé en 3D SuperMap."],
  ['tbc','covadis','via',"Échange de semis de points et fichiers LandXML."],
  /* SuperMap */
  ['supermap_idesktop','supermap_iserver','natif',"Publication de cartes/données depuis iDesktop vers iServer (UDBX/SMWU)."],
  ['supermap_iserver','supermap_iportal','natif',"iPortal s'appuie sur iServer pour la gestion de contenus."],
  ['supermap_iserver','supermap_imobile','natif',"Synchronisation et services pour iMobile."],
  ['supermap_iserver','supermap_iclient','natif',"iClient consomme directement les services iServer."],
  ['supermap_iserver','postgis','via',"Source de données PostgreSQL/PostGIS prise en charge par iServer/iDesktop."],
  ['supermap_iserver','oracle_spatial','via',"Datasource Oracle Spatial prise en charge."],
  ['supermap_iserver','geoserver','via',"Échange via services OGC (WMS/WFS/WMTS)."],
  ['supermap_iserver','arcgis_ent','limite',"Interopérabilité OGC uniquement ; pas de fédération de portails."],
  ['supermap_iserver','ldap','via',"Authentification LDAP/SAML supportée dans iServer/iPortal."],
  ['supermap_idesktop','autocad','via',"Import/export DWG/DXF ; données CAD converties en datasets SuperMap."],
  /* MapInfo */
  ['mapinfo','postgis','via',"Tables liées via ODBC/OGR ; édition limitée."],
  ['mapinfo','sqlserver_spatial','natif',"Connexion directe à SQL Server spatial."],
  ['mapinfo','oracle_spatial','natif',"Connexion directe à Oracle Spatial."],
  ['mapinfo','fme','natif',"Lecture/écriture TAB/MIF dans FME."],
  /* Géomarketing */
  ['geoconcept','postgis','via',"Connexion via ODBC/OGR ; jointures avec référentiels INSEE."],
  ['geoconcept','power_bi','via',"Exports et connecteurs de données ; indicateurs partagés dans Power BI."],
  ['geoconcept','tableau','via',"Exports de zones et de scores vers les tableaux de bord."],
  /* Terrain */
  ['qfield','gpkg','natif',"Format d'échange terrain par défaut (hors-ligne)."],
  ['qfield','postgis','natif',"Synchronisation via QFieldCloud ou QFieldSync avec PostGIS."],
  ['kobo','postgis','via',"Export CSV/GeoJSON ; connecteurs Kobo → PostGIS (API/ETL)."],
  ['fieldmaps','arcgis_online','natif',"Couches hébergées éditées en temps réel."],
  ['rtk','qfield','natif',"Récepteur GNSS externe (NMEA/Bluetooth) corrigé en RTK."],
  ['rtk','tbc','natif',"Post-traitement et réseau RGP dans TBC."],
  /* Imagerie */
  ['sentinel2','qgis','natif',"Chargement direct via STAC/Copernicus Data Space et plugin SCP."],
  ['sentinel2','otb','natif',"Chaînes de classification dédiées."],
  ['sentinelhub','qgis','natif',"Connexion WMS/WMTS/STAC dans QGIS."],
  ['ign_opendata','qgis','natif',"Flux WMS/WMTS/WFS Géoplateforme directement dans QGIS."],
  ['ign_opendata','lizmap','natif',"Flux IGN affichables dans Lizmap en fond de plan."],
  ['ign_opendata','arcgis_pro','natif',"Services WMS/WMTS/WFS compatibles ArcGIS."],
  ['odm','qgis','natif',"Orthos/MNT/nuages de points au format GeoTIFF/LAZ."],
  ['pix4d','qgis','via',"Export GeoTIFF/LAS/DXF vers QGIS."],
  ['pix4d','autocad','via',"Export DXF/LAS ou rapports pour Civil 3D."],
  ['gee','qgis','via',"Plugin Earth Engine pour QGIS ; exports GeoTIFF."],
  /* ETL / BI / IoT */
  ['fme','postgis','natif',"Lecture/écriture PostGIS avec écritures transactionnelles."],
  ['fme','arcgis_pro','natif',"Lecture/écriture de GDB, services AGOL et Enterprise."],
  ['fme','supermap_idesktop','via',"Lecture/écriture de formats ouverts ; pas de format UDBX natif."],
  ['postgis','metabase','natif',"Source PostgreSQL native ; cartes de points/régions."],
  ['postgis','superset','natif',"Connexion SQL et cartes deck.gl."],
  ['postgis','grafana','natif',"Source PostgreSQL / TimescaleDB avec panneaux carte."],
  ['postgis','power_bi','via',"Connecteur PostgreSQL (non géométrique) ; cartes via lat/lon ou ArcGIS."],
  ['timescale_mqtt','postgis','natif',"TimescaleDB est une extension de PostgreSQL ; coexiste avec PostGIS."],
  ['timescale_mqtt','grafana','natif',"Tableaux de bord de capteurs en temps réel."],
  ['traccar','postgis','via',"Export des positions via API/DB PostgreSQL."],
  ['postgrest','postgis','natif',"API REST générée depuis le schéma PostGIS."],
  ['keycloak','arcgis_ent','via',"SAML 2.0 supporté par ArcGIS Enterprise."],
  ['entra_id','power_bi','natif',"SSO unifié avec M365."],
  ['entra_id','azure','natif',"Annuaire natif Azure."]
];

/* Conflits ou incompatibilités d'architecture (bloquants ou à signaler) */
var CONFLITS = [
  ['arcgis_online','lizmap_hosted','Deux portails concurrents : choisir une seule chaîne de diffusion.'],
  ['felt','lizmap_hosted','Doublon de diffusion web.'],
  ['arcgis_online','lizmap','Deux portails concurrents : choisir une seule chaîne de diffusion.'],
  ['felt','lizmap','Doublon de diffusion web (SaaS US vs portail QGIS).'],
  ['supermap_iserver','arcgis_ent','Deux serveurs SIG propriétaires : rarement justifié (OGC uniquement).'],
  ['render','arcgis_ent','Render n\'est pas supporté pour ArcGIS Enterprise.'],
  ['render','supermap_iserver','Render n\'est pas adapté à iServer (ressources mémoire).']
];

var NIVEAU_LBL = {natif:'Natif', via:'Via conversion/OGC', limite:'Limité', non:'Non recommandé'};

function compatPairs(keys) {
  var set = {}; keys.forEach(function (k) { set[k] = 1; });
  var seen = {}, out = [];
  COMPAT.forEach(function (r) {
    if (set[r[0]] && set[r[1]]) {
      var id = [r[0], r[1]].sort().join('|');
      if (!seen[id]) { seen[id] = 1; out.push({a: r[0], b: r[1], niv: r[2], note: r[3]}); }
    }
  });
  return out;
}
function compatConflicts(keys) {
  var set = {}; keys.forEach(function (k) { set[k] = 1; });
  return CONFLITS.filter(function (r) { return set[r[0]] && set[r[1]]; })
                 .map(function (r) { return {a: r[0], b: r[1], note: r[2]}; });
}
