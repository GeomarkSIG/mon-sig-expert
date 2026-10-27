/* ══════════════════════════════════════════════════════════════════
   HÉBERGEMENT · PUBLICATION WEB · IMAGERIE · TERRAIN
   sv : souveraineté max supportée (0 standard · 1 sensible UE/FR · 2 critique)
══════════════════════════════════════════════════════════════════ */

/* ───────── HÉBERGEMENT ───────── */
B('hebergement','local',{
  n:'Serveur physique local (On-Premise)', sub:'Souveraineté totale · coût récurrent nul', sv:2, fr:1, lvl:3, ms:2, pow:1,
  d:"Contrôle total, aucun coût cloud récurrent, intranet possible. Nécessite onduleur, sauvegardes et compétences Linux/Windows Server (investissement matériel hors budget).",
  f:'*2', si:'on_premise', img:'Local.png',
  sp:{
    etat:"Seule option compatible avec l'intranet cloisonné / air-gapped (défense, IGI 1300).",
    collectivite:"Souveraineté totale ; mutualisable avec la DSI de la collectivité et le PRA existant.",
    geometre:"NAS + serveur interne pour les fichiers lourds (nuages de points) et archivage légal.",
    default:"Aucun abonnement cloud ; prévoir maintenance et sauvegardes."
  }});
B('hebergement','ovh',{
  n:'VPS OVHcloud (France)', sub:'Cloud souverain FR · RGPD natif', sv:1, fr:1, lvl:2, ms:2, pow:1, cloud:true,
  d:"Starter 4 €/mois (2 Go) · Essential 14 €/mois (4 Go : PostGIS + Lizmap) · Comfort 28 €/mois (8 Go : GeoServer + PostGIS) · Elite 56 €/mois (16 Go).",
  p:{v:[56,168,672]}, f:'*2', si:'cloud_tier', img:'OVH.png', link:'https://www.ovhcloud.com', mail:'',
  sp:{ default:"Cloud français RGPD natif, Docker/Linux ; bon rapport qualité-prix pour PostGIS + Lizmap/GeoServer." }});
B('hebergement','scaleway',{
  n:'Scaleway (France)', sub:'Cloud souverain FR · Docker & Kubernetes', sv:1, fr:1, lvl:3, ms:2, pow:2, cloud:true,
  d:"Instances et Kubernetes managé hébergés en France, stockage objet pour rasters et sauvegardes. ≈ 180 à 1 800 €/an selon la charge.",
  p:{v:[180,480,1800]}, f:'*2', si:'cloud_tier', link:'https://www.scaleway.com',
  sp:{ default:"Alternative française à OVH avec objet S3 compatible ; idéale pour des rasters et tuiles volumineux." }});
B('hebergement','hetzner',{
  n:'Hetzner (Allemagne)', sub:'Cloud européen économique · RGPD', sv:1, fr:2, lvl:3, ms:2, pow:1, cloud:true,
  d:"Serveurs allemands très économiques (dès ~5 €/mois), hébergement UE soumis au RGPD ; support surtout en anglais.",
  p:{v:[60,240,960]}, f:'*2', si:'cloud_tier', link:'https://www.hetzner.com',
  sp:{ default:"Excellent rapport prix/performance pour PostGIS/GeoServer en Docker ; hors France." }});
B('hebergement','clever',{
  n:'Clever Cloud (France)', sub:'PaaS français · déploiement managé', sv:1, fr:1, lvl:2, ms:1, pow:2, cloud:true,
  d:"PaaS français : déploiement Git/Docker, PostgreSQL managé avec PostGIS, montée en charge simple, sans administration système.",
  p:{v:[360,1200,3600]}, f:'*2', si:'cloud_tier', link:'https://www.clever-cloud.com',
  sp:{ default:"Idéal pour une équipe sans admin système qui veut un cloud français managé." }});
B('hebergement','outscale',{
  n:'Cloud souverain qualifié SecNumCloud (Outscale / Cloud Temple)', sub:'Hébergement qualifié ANSSI · données sensibles', sv:1, fr:1, lvl:3, ms:1, pow:4, cloud:true,
  d:"Cloud de confiance qualifié SecNumCloud, hors lois extraterritoriales : réponse aux exigences des données sensibles (santé, réseaux, administration). ≈ 3 600 à 14 000 €/an.",
  p:{v:[3600,6000,14000]}, f:'*1 etat3 pub3 net3', link:'https://fr.outscale.com',
  sp:{
    etat:"Qualification SecNumCloud pour les systèmes d'information d'importance vitale ; alternative à l'hébergement interne.",
    energie:"Données de réseaux critiques (OIV/OSE) avec exigences de souveraineté et de traçabilité.",
    ong:"Hébergement de données de santé (HDS) lorsque nécessaire.",
    default:"Hébergement de confiance pour données sensibles ; coût supérieur au VPS."
  }});
B('hebergement','render',{
  n:'Render (cloud managé)', sub:'Abordable · Docker facile · hors France', sv:0, fr:2, lvl:2, ms:1, pow:1, cloud:true,
  d:"Gratuit (mise en veille) · Starter 7 $/mois · Standard 19 $/mois (1 Go) · Pro 85 $/mois (4 Go persistant). Déploiement Docker sans administration système.",
  p:{v:[0,228,1020]}, f:'*2', img:'Render.png', link:'https://render.com',
  sp:{ sci:"Gratuit pour démos et cours (cold-start), parfait pour héberger Lizmap/GeoServer d'enseignement.", default:"Hébergement simple pour prototypes ; serveurs hors UE." }});
B('hebergement','aws',{
  n:'Amazon Web Services (AWS)', sub:'Cloud mondial N°1 · autoscaling natif', sv:0, fr:2, lvl:3, ms:2, pow:3, cloud:true,
  d:"Région Paris (eu-west-3). ≈ 420 €/an (léger) à 3 600 €/an (pro) ; ArcGIS Enterprise 10 000–30 000 €/an. Autoscaling natif, SLA 99,99 %.",
  p:{v:[420,1200,3600]}, f:'*2 net3 biz3', si:'aws', img:'Amazon_Web_Services.png', link:'https://aws.amazon.com/fr/',
  sp:{ transport:"S3 pour les rasters, Lambda pour les flux GPS, scalabilité aux pics d'audience.", default:"Scalabilité élastique ; ⚠️ opérateur américain." }});
B('hebergement','azure',{
  n:'Microsoft Azure', sub:'Cloud Microsoft · Entra ID (SSO) · Office 365', sv:1, fr:1, lvl:3, ms:2, pow:3, cloud:true,
  d:"Paliers ≈ 600 à 3 000 €/an ; région France Central. Intégration native Active Directory/Entra ID, Teams et Power BI.",
  p:{v:[600,1200,3000]}, f:'*2 net3 pub3', si:'azure,m365', img:'Azure.png', link:'https://azure.microsoft.com/fr-fr',
  sp:{ collectivite:"SSO AD natif, région France Central pour le RGPD ; acceptable en « sensible » (pas en « critique »).", default:"Idéal si le SI est déjà Microsoft (AD, M365, Power BI)." }});
B('hebergement','gcp',{
  n:'Google Cloud Platform (GCP)', sub:'Cloud Google · BigQuery GIS · Earth Engine', sv:0, fr:2, lvl:3, ms:2, pow:3, cloud:true,
  d:"Cloud Google avec BigQuery GIS, Cloud Storage pour les rasters et intégration à Earth Engine ; ≈ 540 à 4 200 €/an.",
  p:{v:[540,1500,4200]}, f:'*2 biz3 bet3', si:'google,google_workspace', link:'https://cloud.google.com',
  sp:{ default:"Analyses spatiales à grande échelle (BigQuery GIS) ; ⚠️ opérateur américain." }});
B('hebergement','k8s',{
  n:'Kubernetes managé (Scaleway Kapsule / OVH MKS)', sub:'Orchestration · autoscaling souverain', sv:1, fr:1, lvl:4, ms:2, pow:4, cloud:true,
  d:"Cluster Kubernetes managé en France pour des architectures microservices (GeoServer scalable, tuiles, API) avec autoscaling. ≈ 2 400 à 7 200 €/an.",
  p:{v:[2400,3600,7200]}, f:'*0', link:'https://www.scaleway.com/fr/kubernetes-kapsule/',
  sp:{ default:"Pour audiences élastiques (pics de consultation) avec exigence de souveraineté ; compétences DevOps requises." }});

/* ───────── PUBLICATION WEB & PORTAILS ───────── */
B('publication','lizmap',{
  n:'Lizmap Web Client', sub:'Open Source · portail QGIS fidèle', xg:'qgisweb', host:true, sv:2, fr:1, lvl:3, ms:2, pow:2,
  d:"Publiez vos projets QGIS sur le web : symbologie fidèle, formulaires de saisie métier, mesure, interrogation d'objets, édition multi-utilisateurs. Standard des collectivités françaises.",
  f:'*3 pub5 geo4 env4 bet5 net3 ong3', tg:'portal,forms,opendata,sso,public', req:[['qgis'],['postgis','gpkg','spatialite']],
  img:'Lizmap.png', link:'https://www.lizmap.com', mail:'info@3liz.com',
  sp:{
    collectivite:"Portails métier (cadastre, voirie, PLU, assainissement), formulaires de signalement citoyen, droits par groupes LDAP.",
    etat:"Portail interne souverain avec droits fins et cartes thématiques ; hébergeable sur intranet.",
    geometre:"Livrer des plans et des rapports consultables en ligne aux clients, sans licence viewer.",
    bet_env:"Atlas de biodiversité et portail de suivi de chantier avec formulaires d'observations.",
    agriculture:"Portail parcellaire pour coopératives et conseillers, saisie d'interventions.",
    ong:"Cartes publiques de crises, tableaux de bord de distribution avec droits partenaires.",
    default:"Portail web fidèle à QGIS, éditeur français 3Liz ; nécessite QGIS Server + PostGIS."
  }});
B('publication','lizmap_hosted',{
  n:'Lizmap hébergé (3Liz)', sub:'SaaS français · Lizmap clé en main', xg:'qgisweb', sv:1, fr:1, lvl:1, ms:0, pow:3, cloud:true,
  d:"Lizmap Web Client hébergé et maintenu par l'éditeur français 3Liz : zéro administration, support francophone. ≈ 1 200 €/an (5 users) à 2 400 €/an (indicatif).",
  p:{t:[[5,1200],[9999,2400]]}, f:'*2 pub4 geo3 bet4 env3', tg:'portal,forms,public,opendata', req:[['qgis']],
  img:'Lizmap.png', link:'https://www.3liz.com', mail:'info@3liz.com',
  sp:{ default:"Portail QGIS clé en main sans serveur à gérer, support francophone ; données stockées chez 3Liz (France)." }});
B('publication','g3w',{
  n:'G3W-Suite', sub:'Open Source · portail QGIS (Italie)', xg:'qgisweb', host:true, sv:2, fr:0, lvl:3, ms:2, pow:2,
  d:"Alternative open source à Lizmap pour publier des projets QGIS : cartes web, formulaires, éditions, tableaux ; documentation majoritairement anglaise/italienne.",
  f:'*1 pub3 env3 bet2', tg:'portal,forms', req:[['qgis'],['postgis']], link:'https://g3wsuite.it',
  sp:{ default:"Portail QGIS multi-clients (SaaS interne possible) ; support francophone limité." }});
B('publication','qwc2',{
  n:'QWC2 (QGIS Web Client)', sub:'Open Source · client web sur QGIS Server', xg:'qgisweb', host:true, sv:2, fr:0, lvl:4, ms:2, pow:2,
  d:"Client web moderne (React) pour QGIS Server : personnalisable, plugins, édition ; destiné aux équipes avec compétences JavaScript.",
  f:'*0 sci3 bet2', tg:'portal,api', req:[['qgis'],['postgis']], link:'https://github.com/qgis/qwc2',
  sp:{ default:"Maximum de personnalisation côté front, mais plus technique que Lizmap." }});
B('publication','geoserver_node',{
  n:'GeoServer + GeoNode', sub:'Open Source · standard OGC · catalogue INSPIRE', host:true, sv:2, fr:2, lvl:4, ms:2, pow:3,
  d:"Moteur OGC de référence (WMS, WFS, WCS, WMTS) + plateforme de partage et catalogage ISO 19115/INSPIRE. Utilisé par 80 % des infrastructures de données spatiales.",
  f:'*1 pub5 net3 sci4 env3 bet3 ong3', tg:'opendata,api,sso,portal,big,public', req:[['postgis']],
  img:'GeoServer.png', link:'https://geoserver.org',
  sp:{
    collectivite:"Diffusion INSPIRE conforme, catalogue de métadonnées, flux WMS/WFS ouverts aux partenaires et au Géoportail.",
    etat:"Infrastructure de données spatiales nationales/régionales ; sécurité par rôles et SAML.",
    etudiant:"Mise à disposition de données de recherche aux normes OGC, reproductible et citable.",
    energie:"Diffusion de flux WFS dynamiques depuis PostGIS/TimescaleDB vers le SI.",
    default:"Interopérabilité maximale OGC ; nécessite un administrateur SIG."
  }});
B('publication','geoserver',{
  n:'GeoServer seul', sub:'Open Source · diffusion OGC légère', xg:'', host:true, sv:2, fr:2, lvl:3, ms:2, pow:2,
  d:"Moteur de diffusion de flux OGC (WMS/WFS/WMTS) sans le portail GeoNode : léger, rapide, adapté aux API cartographiques.",
  f:'*1 pub4 net4 bet4 sci3', tg:'opendata,api,sso,big', req:[['postgis']], img:'GeoServer.png', link:'https://geoserver.org',
  sp:{ default:"Publie PostGIS en services standards pour QGIS, ArcGIS, OpenLayers ou MapLibre." }});
B('publication','mapserver',{
  n:'MapServer', sub:'Open Source · moteur OGC historique, ultra-léger', xg:'', host:true, sv:2, fr:2, lvl:4, ms:2, pow:1,
  d:"Moteur cartographique OSGeo très léger et rapide, configuré par fichiers .map ; apprécié pour les services OGC à fort trafic.",
  f:'*0 etat3 pub3 sci3', tg:'opendata,api,big', link:'https://mapserver.org',
  sp:{ default:"Performances et faible empreinte mémoire ; configuration textuelle." }});
B('publication','openlayers',{
  n:'OpenLayers / Leaflet / MapLibre', sub:'Open Source · développement JavaScript', sv:2, fr:2, lvl:4, ms:0, pow:2,
  d:"Bibliothèques JS de cartographie web : cartes sur mesure, tuiles vectorielles (MapLibre), flux OGC. Leaflet pour les cas simples, OpenLayers/MapLibre pour les architectures avancées.",
  f:'*1 transport3 sci3 bet3 net3 biz3', tg:'api,public,scal,portal', img:'Openlayers.png', link:'https://openlayers.org',
  sp:{
    transport:"Cartes temps réel de flottes et d'arrêts, tuiles vectorielles performantes pour fortes audiences.",
    geomarketing:"Cartes de localisation magasin intégrées au site e-commerce, sans dépendance à Google.",
    default:"Cartes web sur mesure et légères ; compétences JavaScript requises."
  }});
B('publication','felt',{
  n:'Felt', sub:'SaaS · partage instantané · collaboratif', xg:'', sv:0, fr:2, lvl:1, ms:0, pow:2, cloud:true,
  d:"Diffusion web la plus rapide : gratuit (public) · Pro ~10 $/user/mois (privé, branding) · Équipe ~15 $/user/mois (SSO, droits). Lien partageable, commentaires en temps réel.",
  p:{u:[[1,0],[2,110]]}, f:'*2 ong4 geo3 biz3 bet3', tg:'public,portal', img:'Felt.png', link:'https://felt.com',
  sp:{
    geometre:"Partager un levé ou un plan avec un client par simple lien ; import GPKG/DXF/GeoJSON.",
    ong:"Cartes de situation publiques en un clic, collaboration en temps réel entre équipes terrain.",
    geomarketing:"Cartes de zones de chalandise à partager aux franchisés ; export vers présentations.",
    default:"Aucun serveur ni compétence technique ; ⚠️ données hébergées aux États-Unis."
  }});
B('publication','qgis_cloud',{
  n:'QGIS Cloud', sub:'SaaS suisse · publication directe depuis QGIS', xg:'qgisweb', sv:1, fr:2, lvl:1, ms:0, pow:1, cloud:true,
  d:"Publication directe depuis QGIS Desktop : gratuit (100 Mo, 2 projets) · Basic 19 €/mois · Standard 59 €/mois (2 Go) · Pro 99 €/mois (10 Go). Serveurs en Suisse.",
  p:{v:[0,228,1188]}, f:'*2 ong3 geo3 sci3', tg:'public', req:[['qgis']], img:'QgisCloud.png', link:'https://qgiscloud.com',
  sp:{ default:"Idéal pour partager un résultat client en un clic depuis QGIS ; sans portail métier avancé." }});
B('publication','experience_builder',{
  n:'ArcGIS Experience Builder', sub:'Esri · inclus dans AGO/Enterprise', sv:0, fr:1, lvl:2, ms:0, pow:3,
  d:"Applications web haut de gamme Esri : dashboards temps réel, StoryMaps, formulaires géolocalisés. Inclus dans ArcGIS Online Creator et Enterprise.",
  f:'*1 net4 pub3 biz4 bet3', tg:'portal,forms,public,bi', req:[['arcgis_online','arcgis_ent']],
  img:'Experience Builder.jpg', link:'https://www.esri.com/fr-fr/arcgis/products/arcgis-experience-builder',
  sp:{
    collectivite:"Portails citoyens, consultations publiques, StoryMaps de projets d'aménagement.",
    energie:"Dashboards d'exploitation (incidents, interventions, indicateurs réseau).",
    geomarketing:"Dashboards de ventes et de chalandise partageables en lien.",
    default:"Applications web sans code ; nécessite un abonnement ArcGIS."
  }});
B('publication','umap',{
  n:'uMap', sub:'Open Source · OSM France', xg:'', sv:1, fr:1, lvl:1, ms:0, pow:1, cloud:true,
  d:"Créez et partagez des cartes personnalisées sur fond OpenStreetMap en quelques minutes ; hébergement par OSM France ou auto-hébergé.",
  f:'*1 ong4 sci3 pub2', tg:'public', img:'OSM.jpg', link:'https://umap.openstreetmap.fr',
  sp:{ ong:"Cartes participatives et de crise accessibles par n'importe qui, sans compte requis pour la lecture.", default:"Cartes simples et gratuites ; pas de portail métier." }});
B('publication','geonetwork',{
  n:'GeoNetwork (catalogue de métadonnées)', sub:'Open Source · ISO 19115 / INSPIRE', xg:'catalogue', host:true, sv:2, fr:1, lvl:3, ms:2, pow:2,
  d:"Catalogue de métadonnées ISO 19115/19139 conforme INSPIRE, moissonnage CSW ; complément naturel de GeoServer pour l'open data.",
  f:'*0 pub5 sci3 env3', tg:'opendata,public', link:'https://geonetwork-opensource.org',
  sp:{ pub:"Catalogue conforme INSPIRE et aligné sur data.gouv.fr/Géocatalogue ; moissonnage régional.", default:"Fiches de métadonnées normalisées pour partager et référencer les données." }});
B('publication','arcgis_hub',{
  n:'ArcGIS Hub', sub:'Esri · portail open data & participation', sv:0, fr:1, lvl:2, ms:0, pow:4,
  d:"Portail open data et d'engagement citoyen Esri : initiatives, sites web de données, enquêtes publiques. ≈ 9 000 €/an (indicatif).",
  p:9000, f:'*0 pub4 net1', tg:'opendata,public,portal', req:[['arcgis_online','arcgis_ent']], link:'https://www.esri.com/fr-fr/arcgis/products/arcgis-hub',
  sp:{ collectivite:"Portail open data + concertation citoyenne clé en main (budget participatif, consultation PLU).", default:"Portail de données ouvertes premium ; coût élevé." }});
B('publication','mapbox',{
  n:'Mapbox', sub:'SaaS · cartes web & mobile sur mesure', xg:'', sv:0, fr:2, lvl:3, ms:0, pow:3, cloud:true,
  d:"Plateforme de cartographie web/mobile (tuiles vectorielles, géocodage, navigation) : gratuit jusqu'à 50 000 chargements/mois puis facturation à l'usage.",
  p:{v:[0,600,4800]}, f:'*0 transport4 biz4 bet3', tg:'api,public,scal', link:'https://www.mapbox.com',
  sp:{ transport:"Navigation, ETA et cartes embarquées dans des applications de mobilité.", geomarketing:"Store locator et cartes web à forte audience.", default:"Pour produits numériques grand public ; ⚠️ données hébergées aux USA." }});
B('publication','google_maps',{
  n:'Google Maps Platform', sub:'API · fonds de plan, Street View & itinéraires', xg:'', sv:0, fr:2, lvl:2, ms:0, pow:2, cloud:true,
  d:"APIs Maps/Places/Routes : gratuit jusqu'à ~28 000 chargements/mois (crédit 200 $/mois), puis ≈ 7 $/1 000 requêtes.",
  p:{v:[0,900,6000]}, f:'*0 biz3 transport3 immobilier3', tg:'api,public,scal', si:'google,google_workspace', link:'https://mapsplatform.google.com',
  sp:{ immobilier:"Street View et photos satellites pour les annonces et visites virtuelles.", default:"Fonds de plan et recherche d'adresses universels ; conditions d'usage strictes." }});
B('publication','supermap_iclient',{
  n:'SuperMap iClient (JS) + Online', sub:'SuperMap · clients web 2D/3D', xg:'', sv:0, fr:0, lvl:3, ms:0, pow:2, cloud:true,
  d:"Bibliothèques web SuperMap (iClient for JavaScript, Leaflet, OpenLayers, MapboxGL, 3D WebGL) pour visualiser les services iServer ou OGC ; gratuites avec iServer.",
  f:'*0 net3 btp3 pub2', tg:'3d,portal,public', req:[['supermap_iserver']], link:'https://www.supermap.com',
  sp:{ btp:"Visualisation web 3D de maquettes BIM et de maillages obliques dans le navigateur.", default:"Clients JS 2D/3D pour l'écosystème SuperMap." }});

/* ───────── IMAGERIE & FONDS DE PLAN ───────── */
B('imagerie','osm_libre',{
  n:'OpenStreetMap / fonds libres', sub:'Gratuit · ODbL · flux XYZ', sv:2, fr:2, lvl:1, ms:0, pow:1,
  d:"OSM : licence ODbL, diffusion libre. Flux XYZ réutilisables dans QGIS, Lizmap, Felt. Pas de limitation commerciale hors attribution.",
  f:'*3 ong5 sci4 transport4 gen4', img:'OSM.jpg', link:'https://www.openstreetmap.org',
  sp:{ ong:"Fond de plan par défaut des humanitaires ; mis à jour par la communauté après catastrophe.", default:"Fond de plan libre et mondial." }});
B('imagerie','ign_opendata',{
  n:'Géoplateforme IGN (BD TOPO, BD ORTHO, LiDAR HD, cadastre)', sub:'France · open data · gratuit', sv:2, fr:1, lvl:1, ms:0, pow:1,
  d:"Données ouvertes IGN diffusées en flux WMS/WMTS : orthophotographie, BD TOPO, RGE ALTI, LiDAR HD, Parcellaire express ; cadastre Etalab.",
  f:'*2 pub5 geo4 env4 bet4 biz4 net3 agriculture4', tg:'opendata,raster,3d', img:'DalleHD.jpg', link:'https://geoservices.ign.fr',
  sp:{
    collectivite:"Socle de référence : orthophotos, BD TOPO bâti/voirie, cadastre et LiDAR HD, gratuits.",
    geometre:"Fond de plan et MNT préliminaires avant levé ; cadastre pour les recherches de limites.",
    bet_env:"Orthophotos historiques, BD FORÊT, LiDAR HD pour hauteurs de végétation.",
    agriculture:"BD ORTHO, RPG et MNT pour les parcellaires.",
    default:"Fond de plan français officiel gratuit."
  }});
B('imagerie','ign_precise',{
  n:'Ortho HD 5 cm / PCRS / flux premium IGN', sub:'France · précision · convention', sv:2, fr:1, lvl:1, ms:0, pow:3,
  d:"Prises de vue à très haute résolution (ortho 5 cm), plan corps de rue simplifié (PCRS), flux premium. Public : via convention IGN/régionale · privé ≈ 800 €/an.",
  p:{pp:[0,800]}, f:'*1 geo4 pub4 agriculture3 net3', tg:'raster,3d', img:'DalleHD.jpg', link:'https://geoservices.ign.fr',
  sp:{ geometre:"Ortho HR pour la recherche de limites et l'implantation ; PCRS pour les réseaux enterrés.", collectivite:"Accessible en convention régionale (ex. GéoBretagne, Géo2France) : PCRS et ortho 5 cm pour l'urbanisme.", default:"Précision très haute pour l'étude foncière et les réseaux." }});
B('imagerie','sentinel2',{
  n:'Sentinel-2 / Landsat (Copernicus)', sub:'ESA · gratuit · 10 m · tous les 5 jours', sv:2, fr:2, lvl:2, ms:0, pow:1,
  d:"Imagerie multispectrale gratuite de l'ESA (10 m, revisite 5 jours) et Landsat : végétation, eau, occupation du sol.",
  f:'*1 env5 sci5 ong3', tg:'raster,big', link:'https://dataspace.copernicus.eu',
  sp:{ agriculture:"Indices NDVI/NDRE par parcelle, détection de stress hydrique et suivi de cultures.", bet_env:"Cartographie de l'occupation du sol, suivi des zones humides et détection de changements.", default:"Télédétection gratuite pour l'analyse du territoire." }});
B('imagerie','sentinelhub',{
  n:'Sentinel Hub (API)', sub:'Planet · API d\'imagerie satellite', sv:0, fr:2, lvl:3, ms:0, pow:2, cloud:true,
  d:"API pour accéder et traiter à la volée Sentinel, Landsat et données commerciales sans télécharger les images ; ≈ 360 à 2 400 €/an.",
  p:{v:[360,1200,2400]}, f:'*0 env4 sci3 ong3', tg:'raster,api,big', link:'https://www.sentinel-hub.com',
  sp:{ agriculture:"Séries NDVI par parcelle via API, alertes automatiques de stress végétal.", ong:"Suivi humanitaire (inondations, déplacements) par API en quasi temps réel.", default:"Imagerie à la demande sans infrastructure." }});
B('imagerie','planet',{
  n:'Planet (PlanetScope / SkySat)', sub:'Abonnement · 3–5 m quotidien', sv:0, fr:2, lvl:2, ms:0, pow:3, cloud:true,
  d:"Imagerie quotidienne 3–5 m (PlanetScope) et haute résolution (SkySat) : Basic ≈ 450 €/an · Business ≈ 2 500 €/an et plus.",
  p:2500, f:'*0 env4 agriculture4 ong3 net2', tg:'raster,big', link:'https://www.planet.com',
  sp:{ agriculture:"Revisite quotidienne : suivi intra-parcellaire fin et détection d'anomalies précoces.", ong:"Cartographie de l'urgence (inondations, camps) à fréquence quotidienne.", default:"Imagerie commerciale quotidienne ; ⚠️ opérateur américain." }});
B('imagerie','pleiades',{
  n:'Pléiades Neo (Airbus)', sub:'Satellite THR 30 cm · commande par scène', sv:1, fr:1, lvl:2, ms:0, pow:3,
  d:"Satellite très haute résolution européen (30 cm) : archive ou programmation à la demande (≈ 1 800 €/an de budget projet, indicatif).",
  p:1800, f:'*0 geo3 pub3 env3 net3', tg:'raster,3d', link:'https://www.intelligence-airbusds.com',
  sp:{ btp:"Suivi de grands chantiers et emprises ; extraction de MNS par stéréo.", collectivite:"Occupation du sol, suivi de l'artificialisation (ZAN), mise à jour du cadastre.", default:"Imagerie THR européenne (opérateur Airbus)." }});
B('imagerie','maxar',{
  n:'Maxar (WorldView / Vivid)', sub:'Satellite THR 30–50 cm · international', sv:0, fr:2, lvl:2, ms:0, pow:4,
  d:"Imagerie très haute résolution mondiale pour l'international, la défense civile et les grands projets ; ≈ 4 000 €/an de budget projet (indicatif).",
  p:4000, f:'*0 net3 ong2 geo2 env2', tg:'raster,3d,big', link:'https://www.maxar.com',
  sp:{ ong:"Programmes de coopération (Open Data Program) en situation de crise.", energie:"Suivi d'infrastructures sur de grandes zones géographiques.", default:"Couverture mondiale très haute résolution ; coût élevé." }});
B('imagerie','drone_presta',{
  n:'Drone & photogrammétrie (prestation / vols)', sub:'Centimétrique · ortho + MNT', sv:2, fr:2, lvl:3, ms:0, pow:3,
  d:"Acquisition par drone : orthophoto et MNT centimétriques sur votre zone, traitement via OpenDroneMap, Metashape ou Pix4D. ≈ 1 500 €/an pour un usage régulier.",
  p:1500, f:'*0 geo5 agriculture4 env3 net2', tg:'raster,3d,big', link:'https://www.opendronemap.org',
  sp:{ geometre:"Levés topographiques par drone, nuages de points pour MNT/volumes, plans de récolement rapides.", btp:"Suivi d'avancement, métrés de terrassement et reportages réguliers.", agriculture:"Cartographie intra-parcellaire (multispectral) et comptage de plants.", default:"Précision centimétrique sur zones restreintes." }});
B('imagerie','odm',{
  n:'OpenDroneMap / WebODM', sub:'Open Source · traitement photogrammétrique', host:true, sv:2, fr:2, lvl:3, ms:2, pow:1,
  d:"Chaîne de photogrammétrie open source : ortho, MNT, nuages de points, modèles 3D à partir de photos de drone.",
  f:'*0 geo4 agriculture3 sci4 ong3', tg:'raster,3d', link:'https://www.opendronemap.org',
  sp:{ ong:"Cartographie post-catastrophe avec drones grand public (HOT/OpenAerialMap).", geometre:"Alternative gratuite à Metashape/Pix4D pour des projets modestes.", default:"Traitement drone gratuit ; machine puissante requise." }});
B('imagerie','pix4d',{
  n:'Pix4D (mapper / matic)', sub:'Photogrammétrie professionnelle', os:'WM', sv:1, fr:2, lvl:2, ms:0, pow:3,
  d:"Logiciel de photogrammétrie de référence : cartographie par drone, volumes, précisions contrôlées par points d'appui. ≈ 3 500 €/an (indicatif).",
  p:3500, f:'*0 geo4 agriculture3 env2', tg:'raster,3d', link:'https://www.pix4d.com',
  sp:{ geometre:"Rapports qualité (RMS, GCP) acceptés en dossier ; export LAS/DXF/ortho vers QGIS/AutoCAD.", btp:"Volumes de stock et suivi de terrassement avec rapports de précision.", default:"Précision certifiable, interface simple." }});
B('imagerie','metashape',{
  n:'Agisoft Metashape Pro', sub:'Photogrammétrie · licence perpétuelle amortie', os:'WML', sv:2, fr:2, lvl:3, ms:0, pow:3,
  d:"Photogrammétrie très répandue : MNT, ortho, modèles 3D, nuages denses. Licence perpétuelle (≈ 3 500 €) amortie en ≈ 1 200 €/an.",
  p:1200, f:'*0 geo4 sci3 env3', tg:'raster,3d', link:'https://www.agisoft.com',
  sp:{ default:"Option économique face à Pix4D pour la production de MNT/ortho de drone." }});
B('imagerie','gee',{
  n:'Google Earth Engine', sub:'Analyse satellite cloud · gratuit recherche/ONG', sv:0, fr:2, lvl:4, ms:0, pow:3, cloud:true,
  d:"Plateforme d'analyse planétaire d'imagerie (Landsat, Sentinel, climat). Gratuite pour la recherche, l'éducation et les ONG ; licence commerciale payante (≈ 6 000 €/an).",
  p:{ac:[0,6000]}, f:'*0 sci5 env4 ong4 agriculture3', tg:'raster,big,api', link:'https://earthengine.google.com',
  sp:{ etudiant:"Séries temporelles sur 40 ans, deep learning, calcul distribué gratuit.", ong:"Suivi de déforestation, cultures et inondations pour programmes humanitaires.", default:"Analyse satellite à grande échelle ; compétences JS/Python requises." }});
B('imagerie','mapillary',{
  n:'Mapillary / KartaView', sub:'Imagerie de rue collaborative · gratuit', sv:0, fr:2, lvl:1, ms:0, pow:1, cloud:true,
  d:"Photographies de rue géoréférencées (collaboratives) pour inventorier panneaux, mobilier, voirie et enrichir OSM.",
  f:'*0 transport4 pub3 ong2', tg:'mobile,public', link:'https://www.mapillary.com',
  sp:{ transport:"Inventaire de la signalisation et du mobilier à partir d'images de rue, mises à jour fréquentes.", collectivite:"Recensement de l'état de la voirie sans véhicule dédié.", default:"Complément gratuit pour l'inventaire de terrain." }});

/* ───────── TERRAIN & GNSS ───────── */
B('terrain','qfield',{
  n:'QField (QFieldCloud)', sub:'QGIS terrain · Android / iOS · hors-ligne', sv:2, fr:1, lvl:2, ms:0, pow:1, cloud:true, os:'Mobile',
  d:"Synchronise vos projets QGIS : GPS décimétrique, saisie de géométries, formulaires métier, hors connexion. QFieldCloud : gratuit (100 Mo) · dès ~15 €/mois.",
  p:{t:[[1,0],[5,180],[9999,720]]}, f:'*3 geo5 env5 pub4 bet4 ong4 net3', tg:'mobile,forms', req:[['qgis']], img:'Qfield.png', link:'https://qfield.org',
  sp:{
    geometre:"Relevés de détail et implantation avec GNSS RTK (Emlid, Trimble) ; formulaires de limite et bornes.",
    collectivite:"Inventaires de voirie, éclairage public, mobilier, arbres, signalements.",
    bet_env:"Inventaires faune/flore, points d'observation, photos géolocalisées, hors-ligne en milieu naturel.",
    agriculture:"Relevés de parcelles, notations agronomiques et contrôles terrain.",
    ong:"Cartographie de terrain hors-ligne, complémentaire de KoboCollect.",
    default:"Collecte terrain hors-ligne fidèle à QGIS."
  }});
B('terrain','mergin',{
  n:'Mergin Maps', sub:'QGIS terrain · synchronisation cloud', sv:1, fr:2, lvl:2, ms:0, pow:2, cloud:true, os:'Mobile',
  d:"Application mobile + service de synchronisation de projets QGIS (Lutra Consulting) : travail en équipe hors-ligne, gestion de versions, formulaires.",
  p:{t:[[1,0],[5,228],[9999,1200]]}, f:'*2 geo3 env4 ong3 bet3', tg:'mobile,forms', req:[['qgis']], link:'https://merginmaps.com',
  sp:{ default:"Alternative à QFieldCloud avec synchronisation simple et versionnée des données de terrain." }});
B('terrain','kobo',{
  n:'KoboCollect / ODK', sub:'Enquêtes & formulaires · Open Source', sv:1, fr:1, lvl:1, ms:0, pow:1, os:'Mobile',
  d:"Standard humanitaire des enquêtes socio-économiques hors-ligne : logique conditionnelle, géolocalisation, photos. Gratuit pour les ONG via kobotoolbox.org.",
  f:'*1 ong5 sci4 agriculture3', tg:'mobile,forms', img:'Qfield.png', link:'https://www.kobotoolbox.org',
  sp:{ ong:"Standard des enquêtes de terrain (UNHCR, MSF) avec export direct vers QGIS ou PostGIS.", agriculture:"Enquêtes d'exploitations et suivis de pratiques agricoles.", etudiant:"Collecte de données de recherche reproductible.", default:"Formulaires d'enquête hors-ligne." }});
B('terrain','epicollect',{
  n:'Epicollect5', sub:'Collecte participative · gratuit', sv:0, fr:2, lvl:1, ms:0, pow:1, cloud:true, os:'Mobile',
  d:"Application et serveur gratuits (Imperial College) de collecte participative avec cartes, photos et questionnaires.",
  f:'*0 sci4 ong3 env3', tg:'mobile,forms,public', link:'https://five.epicollect.net',
  sp:{ etudiant:"Idéal pour des enquêtes participatives étudiantes ou science citoyenne.", default:"Collecte simple et gratuite sans serveur." }});
B('terrain','fieldmaps',{
  n:'ArcGIS Field Maps', sub:'Esri · terrain temps réel · ArcGIS Online requis', sv:0, fr:1, lvl:1, ms:0, pow:3, os:'Mobile',
  d:"App mobile Esri : collecte et édition temps réel, hors-ligne, formulaires géolocalisés. Inclus dans ArcGIS Online Creator et Enterprise.",
  f:'*1 net5 pub3 bet3 env3', tg:'mobile,forms,sso', req:[['arcgis_online','arcgis_ent']], img:'ArcGISFieldMaps.jpg', link:'https://www.esri.com/fr-fr/arcgis/products/arcgis-field-maps',
  sp:{ energie:"Techniciens réseau : édition de postes, câbles et conduites avec workflows d'intervention.", collectivite:"Inventaires et inspections avec workflows de validation, suivi des tournées.", default:"Collecte terrain temps réel intégrée à l'écosystème Esri." }});
B('terrain','survey123',{
  n:'ArcGIS Survey123', sub:'Esri · enquêtes géolocalisées', sv:0, fr:1, lvl:1, ms:0, pow:2, os:'Mobile',
  d:"Formulaires d'enquête avancés (XLSForm) avec cartes et analyses ; inclus dans ArcGIS Online/Enterprise.",
  f:'*1 net3 pub3 biz3', tg:'mobile,forms', req:[['arcgis_online','arcgis_ent']], link:'https://www.esri.com/fr-fr/arcgis/products/arcgis-survey123',
  sp:{ geomarketing:"Enquêtes clients et audits de points de vente en magasin.", default:"Formulaires d'enquête sous Esri." }});
B('terrain','supermap_imobile',{
  n:'SuperMap iMobile', sub:'SuperMap · SDK & apps mobiles', sv:0, fr:0, lvl:3, ms:0, pow:2, os:'Mobile',
  d:"Kit de développement et applications mobiles SuperMap : cartes hors-ligne, 3D, navigation de terrain, synchronisation avec iServer.",
  f:'*0 net3 btp3', tg:'mobile,3d', req:[['supermap_iserver']], link:'https://www.supermap.com',
  sp:{ default:"Terrain pour l'écosystème SuperMap ; SDK à intégrer par un développeur." }});
B('terrain','rtk',{
  n:'Correction RTK : Centipede / RGP IGN', sub:'Réseaux GNSS libres · précision centimétrique', sv:2, fr:1, lvl:2, ms:0, pow:1, os:'Mobile',
  d:"Réseaux de stations de référence ouverts (Centipede-RTK, RGP de l'IGN) pour obtenir des positions centimétriques avec un récepteur GNSS RTK (matériel hors budget).",
  f:'*0 geo5 agriculture4 btp3 env2', tg:'mobile', link:'https://docs.centipede.fr',
  sp:{ geometre:"Lien aux références RGF93 via le RGP ; indispensable pour des levés opposables.", agriculture:"Guidage et relevés de précision sans abonnement.", default:"Correction GNSS centimétrique gratuite." }});
