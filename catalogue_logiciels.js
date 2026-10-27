/* ══════════════════════════════════════════════════════════════════
   LOGICIELS · PLATEFORMES · BASES DE DONNÉES
   grp : sig = SIG principal · dao = DAO/CAO · spec = outil métier
══════════════════════════════════════════════════════════════════ */

/* ───────── LOGICIELS SIG & DAO ───────── */
B('logiciels','qgis',{
  n:'QGIS Desktop', sub:'Open Source · Win / Mac / Linux · Gratuit', grp:'sig', os:'WML', sv:2, fr:1, lvl:2, ms:0, pow:1,
  d:"SIG open source de référence mondial. Analyses spatiales avancées, 1 000+ plugins, Python/PyQGIS, symbologie professionnelle, communauté francophone très active. Pas de licence par utilisateur.",
  f:'*4 geo5 env5 pub5 bet5 ong5 sci5 gen5 net3 biz4', tg:'opendata,mobile,etl,raster,api,portal',
  img:'Qgis.png', link:'https://qgis.org', mail:'office@qgis.org',
  sp:{
    geometre:"Plugins Cadastre/QCadastre, Georeferencer ; lecture DWG/DXF via GDAL/OGR ; GPS Leica/Trimble via NMEA. Pour l'édition DWG native, le coupler à AutoCAD/BricsCAD.",
    btp:"Plugins Georeferencer, Point Sampling, profils en long ; lien AutoCAD/Civil 3D via DXF/SHP ; import IFC possible via GDAL/plugins BIM.",
    collectivite:"Standard des SIG territoriaux français : plugins Cadastre, Lizmap, AtlasPrint, Géoportail ; exports INSPIRE ; QField pour la voirie et l'éclairage public.",
    etat:"Plugins Cadastre, PLU/PLUi, Natura 2000 ; connexion WFS aux données nationales (Géoplateforme, INPN) ; pile souveraine sans licence.",
    bet_env:"Plugins Natura 2000, BioHab, SCP (télédétection), PDAL (LiDAR) ; connexion WFS INPN/GBIF/OpenObs pour la biodiversité.",
    agriculture:"Plugins SCP (NDVI/NDRE), Orfeo Toolbox ; import RPG/PAC direct ; Sentinel-2 via Copernicus ; QFieldCloud pour les relevés de parcelles.",
    energie:"Cartographie des réseaux via PostGIS, pgRouting pour le routage ; peu adapté à un modèle de réseau géométrique complet (préférer Utility Network Esri à grande échelle).",
    transport:"pgRouting + plugins OSM/GTFS ; isochrones, analyses de desserte ; MovingPandas (Python) pour les traces GPS.",
    bet:"Atelier de production : modèles de traitement, atlas, impression de planches ; automatisation PyQGIS pour les livrables clients.",
    immobilier:"Jointures DVF/cadastre/PLU, plugins Cadastre ; cartes de prix au m² ; lecture des fichiers fonciers (MAJIC) via PostGIS.",
    geomarketing:"Plugins MMQGIS (géocodage), isochrones ORS, jointures INSEE/SIRENE pour zones de chalandise ; moins turnkey que Geoconcept pour les tournées.",
    ong:"Plugins HOT Export Tool, QuickMapServices, OSMDownloader ; compatible KoboToolbox et QFieldCloud ; fonctionne hors-ligne sur ordinateur modeste.",
    etudiant:"Plugins GRASS, Orfeo Toolbox, SAGA, PDAL, pgRouting ; interopérable avec R (sf) et Python ; licence libre adaptée à l'enseignement.",
    default:"Analyses vecteur/raster, mise en page, exports SHP/GPKG/DXF/KML/GeoJSON, Python/PyQGIS ; complément gratuit de n'importe quelle suite."
  }});

B('logiciels','arcgis_pro',{
  n:'ArcGIS Pro (Standard)', sub:'Esri · Windows uniquement · par utilisateur', grp:'sig', os:'W', sv:0, crit:'ent', fr:1, lvl:2, ms:0, pow:3,
  d:"Logiciel Esri de référence industrielle : analyse 2D/3D, Python ArcPy, intégration native ArcGIS Online/Enterprise. Dégressif : 1 user 820 € · 5+ ~650 € · 10+ ~580 €/an.",
  p:{u:[[1,820],[5,650],[10,580]]}, f:'*2 net5 pub3 geo3 env3 bet3 biz3 sci3 ong1', tg:'bi,sso,raster,3d,erp,forms',
  si:'arcgis_si', img:'ArcGisPRO.jpg', link:'https://www.esri.com/fr-fr', mail:'contact@esri.com',
  sp:{
    geometre:"Extensions Spatial Analyst/3D Analyst ; import DWG/DXF natif ; Lambert 93 / CC9Z nativement gérés. ⚠️ Windows uniquement.",
    btp:"3D Analyst (surfaces, volumes), scène 3D intégrée, lien BIM/Revit via ArcGIS GeoBIM. ⚠️ Windows uniquement.",
    collectivite:"Connexion native à ArcGIS Online/Enterprise ; modèles Urban et Hub ; GDB fichier haute performance pour la voirie et le cadastre.",
    etat:"Standard dans les grands établissements publics ; Geodatabase versionnée, ArcPy pour l'automatisation, support Esri France.",
    energie:"Base de l'Utility Network (électricité/eau/gaz) avec ArcGIS Enterprise ; édition topologique avancée ; Network Analyst pour les tournées de maintenance.",
    transport:"Network Analyst (itinéraires, VRP, zones de desserte) en version Advanced ; GTFS natif ; tableaux de bord Esri.",
    bet_env:"Spatial/Image Analyst, ArcPy pour automatiser les chaînes d'analyse ; extensions de modélisation hydrologique.",
    biz:"Business Analyst (démographie, chalandise) et Insights ; connecteurs CRM ; cartes décisionnelles.",
    default:"Analyse vecteur/raster, Python ArcPy, 3D de base, connexion AGO. ⚠️ Windows uniquement."
  }});

B('logiciels','arcgis_pro_adv',{
  n:'ArcGIS Pro Advanced', sub:'Esri · Réseau, 3D & topologie avancée · Windows', grp:'sig', os:'W', sv:0, crit:'ent', fr:1, lvl:3, ms:0, pow:4,
  d:"ArcGIS Pro Standard + Network Analyst, Spatial Analyst complet, Image Analyst, topologie et géotraitement avancés. 3 850 €/user · 5+ ~3 200 €.",
  p:{u:[[1,3850],[5,3200]]}, f:'*1 net5 pub3 env3 bet3 geo2', tg:'raster,3d,bi,sso', si:'arcgis_si',
  img:'ArcGisPRO.jpg', link:'https://www.esri.com/fr-fr', mail:'contact@esri.com',
  sp:{
    energie:"Utility Network Editing + Network Analyst : modélisation complète des réseaux (électricité, eau, gaz, télécom) et traçabilité amont/aval.",
    transport:"Network Analyst complet : optimisation de flottes, VRP, accessibilité multimodale, réseaux routiers complexes.",
    bet_env:"Image Analyst + Spatial Analyst complets : classification d'images, modélisation du risque, hydrologie.",
    default:"Network Analyst, Spatial Analyst complet, Image Analyst, topologie avancée. ⚠️ Windows uniquement."
  }});

B('logiciels','mapinfo',{
  n:'MapInfo Pro (Precisely)', sub:'Windows · SIG bureautique · fichiers .TAB', grp:'sig', os:'W', sv:2, fr:2, lvl:2, ms:0, pow:2,
  d:"SIG historique très répandu en télécom, assurance, retail et utilities. Interface orientée métier, format TAB, requêtes SQL spatiales. Env. 1 300 €/an/user (indicatif).",
  p:{u:[[1,1300],[5,1100]]}, f:'*1 biz4 net3 pub2 geo2 bet2', tg:'bi,erp', si:'mapinfo_si',
  link:'https://www.precisely.com', mail:'',
  sp:{
    geomarketing:"Prisme et zones de chalandise, géocodage d'adresses, cartes thématiques pour le réseau de points de vente ; fort parc installé dans la grande distribution.",
    energie:"Cartographie des réseaux télécom/cuivre/fibre et de la couverture ; dialogue avec les bases SQL internes.",
    immobilier:"Cartographie de portefeuille, analyses de proximité et d'exposition ; lecture des fichiers fonciers par jointure.",
    default:"Interface bureautique simple, format .TAB lisible par QGIS/GDAL ; ⚠️ Windows uniquement, écosystème plus fermé qu'Esri/QGIS."
  }});

B('logiciels','supermap_idesktop',{
  n:'SuperMap iDesktop', sub:'SuperMap · Windows / Linux · 3D, BIM & Big Data', grp:'sig', os:'WL', sv:0, fr:0, lvl:3, ms:0, pow:3,
  d:"SIG bureautique de l'éditeur chinois SuperMap : 3D native, BIM, photogrammétrie oblique, nuages de points, Big Data et IA. Formats UDB/UDBX/SMWU. Prix sur devis (≈ 2 500 €/an/user, indicatif).",
  p:{u:[[1,2500],[5,2000]]}, f:'*1 net4 transport4 btp3 pub3 geometre2 sci3 biz2', tg:'3d,bim,big,raster', si:'supermap_si',
  link:'https://www.supermap.com', mail:'',
  sp:{
    btp:"Modèles 3D BIM (IFC/Revit) et maillages obliques (OSGB) intégrés ; calculs de terrassement et d'emprise en 3D.",
    collectivite:"Jumeau numérique urbain : bâti 3D, photogrammétrie oblique, gestion des réseaux enterrés ; très utilisé en urbanisme d'Asie.",
    energie:"Réseaux 3D, nuages de points LiDAR, ville intelligente et suivi d'actifs ; nécessite iServer pour le déploiement multi-utilisateurs.",
    transport:"Modélisation 3D des infrastructures, analyses réseau et Big Data sur trajectoires.",
    geometre:"Traitement de photogrammétrie oblique et de nuages de points ; échanges DWG/SHP/GDB ; documentation majoritairement en anglais/chinois.",
    etudiant:"Édition communautaire/éducative et ressources académiques ; intéressant pour étudier le GIS 3D et Big Data.",
    default:"SIG 3D/BIM/Big Data ; ⚠️ support francophone limité, éditeur non européen : à écarter si souveraineté sensible ou critique."
  }});

B('logiciels','gvsig',{
  n:'gvSIG Desktop', sub:'Open Source · Java · Win / Mac / Linux', grp:'sig', os:'WML', sv:2, fr:0, lvl:2, ms:0, pow:1,
  d:"SIG open source issu de l'administration valencienne : très orienté administrations publiques et cadastre, nombreux modules (gvSIG Roads, gvSIG Online).",
  f:'*1 pub3 sci3 ong2 geo2', tg:'opendata',
  link:'https://www.gvsig.com',
  sp:{ pub:"Intéressant pour les administrations ibéro-américaines et européennes ; édition de données cadastrales et réseaux routiers (gvSIG Roads).",
       default:"Alternative open source à QGIS ; communauté et documentation moins francophones." }});

B('logiciels','global_mapper',{
  n:'Global Mapper Pro', sub:'Blue Marble · Windows · MNT, LiDAR & raster', grp:'spec', os:'W', sv:2, fr:2, lvl:2, ms:0, pow:2,
  d:"Logiciel léger et rapide pour le MNT, les nuages de points LiDAR, la classification, les volumes et les gros rasters. Env. 650 €/an/user (indicatif).",
  p:{u:[[1,650]]}, f:'*1 geo4 env4 sci3 net2', tg:'raster,3d,big,dwg',
  link:'https://www.bluemarblegeo.com',
  sp:{
    geometre:"Calcul de volumes, profils, courbes de niveau, extraction de MNT depuis nuages de points ; lecture DWG/DXF.",
    btp:"Plateformes, déblais/remblais et mise à jour de MNT sur chantier ; export vers Civil 3D.",
    bet_env:"Traitement LiDAR (classification sol/végétation), MNH et analyses d'ombrage pour les études d'impact.",
    agriculture:"MNT et ortho-mosaïques de drone pour l'analyse de pente et d'écoulement.",
    default:"Lecture de 300+ formats, raster/LiDAR/3D ; ⚠️ Windows uniquement."
  }});

B('logiciels','geoconcept',{
  n:'Geoconcept', sub:'Éditeur français · Géomarketing & tournées · Sur devis', grp:'sig', os:'W', sv:2, fr:1, lvl:2, ms:0, pow:3,
  d:"SIG expert français pour le géomarketing, l'optimisation de tournées et l'analyse de territoires commerciaux. Support francophone dédié. ~2 800 €/an monoposte (indicatif, sur devis).",
  p:{u:[[1,2800],[5,2300]]}, f:'*1 biz5 transport4 net3 pub2 bet2', tg:'erp,bi', fr_:1,
  img:'Geoconcept.png', link:'https://www.geoconcept.com', mail:'info@geoconcept.com',
  sp:{
    geomarketing:"Zones de chalandise, implantation de magasins, couverture commerciale et sectorisation ; données INSEE/SIRENE ; optimisation de tournées de visite.",
    immobilier:"Études de marché locales et analyse de zones d'attractivité ; cartographie de portefeuilles.",
    transport:"Optimisation de tournées de livraison, contraintes horaires et capacités, matrices de distances.",
    default:"SIG français orienté décision commerciale ; données routières et adresses de référence incluses ; ⚠️ Windows."
  }});

B('logiciels','autocad',{
  n:'AutoCAD Map 3D', sub:'Autodesk · Windows · Pont DAO↔SIG', grp:'dao', xg:'cad', os:'W', sv:2, fr:1, lvl:2, ms:0, pow:2,
  d:"Pont DAO↔SIG indispensable pour les géomètres et le BTP : lecture/écriture native DWG/DXF, FDO, Object Data. 2 500 €/an · dégressif dès 5 licences.",
  p:{u:[[1,2500],[5,2100]]}, f:'*0 geo5 btp5 net3 bet3 pub2', tg:'dwg,bim', si:'autocad_si',
  img:'Autocad.jpg', link:'https://www.autodesk.fr', mail:'support@autodesk.com',
  sp:{
    geometre:"Survey Functions, FDO Spatial, Object Data, Map 3D Mapbook ; plans de récolement, DWG normés ; export SHP/GeoJSON/KML natif.",
    btp:"Échange avec les maquettes et plans d'architectes, plans VRD, profils ; base pour Civil 3D via le bundle AEC.",
    energie:"Plans de réseaux et schémas de postes en DWG, relations avec les bureaux d'études.",
    bet:"Reprise des plans clients DWG et production de livrables normés.",
    default:"FDO Provider, Object Data, import/export SHP, DWG natif ; ⚠️ Windows uniquement."
  }});

B('logiciels','aec',{
  n:'AEC Collection (Civil 3D + Revit + Map 3D)', sub:'Autodesk · Windows · Infrastructure & BIM', grp:'dao', xg:'cad', os:'W', sv:2, fr:1, lvl:3, ms:0, pow:4,
  d:"Suite Autodesk pour l'ingénierie des infrastructures et le BIM : Civil 3D (VRD, terrassement), Revit, ReCap, Navisworks, AutoCAD Map 3D. ≈ 3 600 €/an/user.",
  p:{u:[[1,3600],[5,3100]]}, f:'*0 btp5 geometre3 bet4 net3', tg:'dwg,bim,3d', si:'autocad_si',
  img:'Autocad.jpg', link:'https://www.autodesk.fr', mail:'support@autodesk.com',
  sp:{
    btp:"Civil 3D (profils en long/travers, réseaux gravitaires, terrassement), ReCap (nuages de points), Navisworks (coordination BIM) : tout le cycle chantier.",
    geometre:"Civil 3D pour les projets VRD et lotissements ; ReCap pour les nuages de points de scanner 3D.",
    bet:"Modélisation d'ouvrages, coordination multi-lots et métrés BIM.",
    default:"Suite BIM/infrastructure complète ; ⚠️ Windows et coûteuse hors BTP."
  }});

B('logiciels','bricscad',{
  n:'BricsCAD', sub:'Bricsys · Win / Mac / Linux · DWG natif économique', grp:'dao', xg:'cad', os:'WML', sv:2, fr:1, lvl:2, ms:0, pow:2,
  d:"Alternative économique à AutoCAD : DWG natif, compatible LISP, disponible aussi sur macOS et Linux. ≈ 500 €/an/user (indicatif).",
  p:{u:[[1,500],[5,450]]}, f:'*0 geo4 btp4 bet3 net2', tg:'dwg,bim',
  link:'https://www.bricsys.com', mail:'',
  sp:{
    geometre:"DWG natif à ~1/5 du prix d'AutoCAD ; plug-ins topo (Covadis fonctionne sur BricsCAD) ; version Mac/Linux disponible.",
    btp:"BricsCAD BIM pour la modélisation légère ; échanges IFC ; alternative à Revit pour les petites structures.",
    default:"DWG natif multi-plateforme ; excellente option pour un budget limité."
  }});

B('logiciels','covadis',{
  n:'Covadis (Géomédia) — topographie & VRD', sub:'Plug-in AutoCAD/BricsCAD · Windows · standard FR', grp:'spec', os:'W', sv:2, fr:1, lvl:2, ms:0, pow:2,
  d:"Suite française de topographie, VRD et assainissement fonctionnant dans AutoCAD ou BricsCAD : semis de points, MNT, projets routiers, dossiers de récolement. ≈ 1 600 €/an/user (indicatif).",
  p:{u:[[1,1600],[5,1400]]}, f:'*0 geo5 pub2 bet2', tg:'dwg', req:[['autocad','aec','bricscad']],
  link:'https://www.geo-covadis.fr',
  sp:{
    geometre:"Semis de points, MNT, plans topo, calcul de surfaces et de volumes, dossiers de récolement ; compatible Lambert 93/CC.",
    btp:"Projets routiers, profils en long/travers, assainissement, métrés VRD ; référence des bureaux d'études VRD français.",
    default:"Outils de topographie/VRD français normés ; ⚠️ nécessite AutoCAD ou BricsCAD."
  }});

B('logiciels','tbc',{
  n:'Trimble Business Center', sub:'Trimble · Windows · GNSS, station totale & drone', grp:'spec', os:'W', sv:2, fr:2, lvl:3, ms:0, pow:3,
  d:"Post-traitement GNSS, compensation de stations totales, nuages de points et photogrammétrie. Pilote les instruments Trimble. ≈ 2 400 €/an (indicatif).",
  p:{u:[[1,2400]]}, f:'*0 geometre5 btp4 env1', tg:'dwg,raster,3d',
  link:'https://geospatial.trimble.com',
  sp:{
    geometre:"Compensation de cheminements, post-traitement GNSS/RTK, export DWG/LandXML ; lien direct avec carnets de terrain Trimble.",
    btp:"Implantation, contrôle de terrassement et export vers machines de chantier (guidage 3D).",
    default:"Chaîne topographique Trimble ; ⚠️ Windows, écosystème propriétaire."
  }});

B('logiciels','josm',{
  n:'JOSM / OpenStreetMap Editor', sub:'Open Source · Java · Communautaire', grp:'spec', os:'WML', sv:2, fr:1, lvl:2, ms:0, pow:1,
  d:"Éditeur OpenStreetMap de référence : standard des ONG et humanitaires (HOT, MSF, UNHCR) pour cartographier les zones sinistrées.",
  f:'*0 ong5 sci2 transport2 pub1', tg:'opendata',
  img:'OSM.jpg', link:'https://josm.openstreetmap.de',
  sp:{
    ong:"Cartographie collaborative post-crise (Tasking Manager HOT), validation de bâtiments et routes, imports d'imagerie ouverte.",
    transport:"Mise à jour des arrêts, voies et restrictions dans OSM pour alimenter l'ouverture des données mobilités.",
    default:"Contribution à la base de données géographique libre mondiale."
  }});

B('logiciels','grass',{
  n:'GRASS GIS', sub:'Open Source · Analyse raster & hydrologie', grp:'spec', os:'WML', sv:2, fr:1, lvl:3, ms:0, pow:1,
  d:"SIG scientifique : modélisation hydrologique, télédétection, analyses raster lourdes, intégré à QGIS via Processing.",
  f:'*0 sci5 env4 bet2 net1', tg:'raster,big',
  img:'Qgis.png', link:'https://grass.osgeo.org',
  sp:{
    etudiant:"Référence académique pour l'hydrologie, la géomorphologie et la modélisation de l'érosion ; scripts reproductibles.",
    bet_env:"Modélisation de bassins versants, propagation de crues, indices de végétation.",
    agriculture:"Modèles d'érosion et d'écoulement sur parcelles ; traitements raster de grande taille.",
    default:"Analyses raster/hydrologie avancées, gratuit, intégré à QGIS."
  }});

B('logiciels','otb',{
  n:'Orfeo Toolbox + SNAP', sub:'Open Source · CNES / ESA · Télédétection', grp:'spec', os:'WML', sv:2, fr:1, lvl:3, ms:0, pow:1,
  d:"Chaînes de traitement d'images satellitaires (OTB du CNES, SNAP de l'ESA) : classification, séries temporelles Sentinel, radar.",
  f:'*0 env5 sci5 net1', tg:'raster,big',
  link:'https://www.orfeo-toolbox.org',
  sp:{
    agriculture:"Classification de cultures, suivi phénologique Sentinel-2, détection de stress hydrique et cartographie du RPG.",
    bet_env:"Cartographie d'occupation du sol, détection de changements, habitats et zones humides.",
    etudiant:"Chaînes reproductibles pour la recherche ; produits S1/S2 prêts à l'emploi.",
    default:"Télédétection open source du CNES/ESA."
  }});

B('logiciels','python_geo',{
  n:'Python géospatial (GeoPandas · Rasterio · Jupyter)', sub:'Open Source · Scripts & notebooks', grp:'spec', os:'WML', sv:2, fr:2, lvl:4, ms:0, pow:1,
  d:"Écosystème Python pour la donnée spatiale : GeoPandas, Shapely, Rasterio, Xarray, MovingPandas, Jupyter ; automatisation et science des données.",
  f:'*1 sci5 bet3 biz3 net3', tg:'api,etl,big',
  link:'https://geopandas.org',
  sp:{
    etudiant:"Notebooks reproductibles, traitement de séries temporelles, apprentissage automatique géospatial.",
    geomarketing:"Modèles de gravité et de prévision de fréquentation, jointures massives INSEE/SIRENE.",
    transport:"Traces GPS (MovingPandas), matrices origine-destination, simulation.",
    default:"Automatisation et analyse reproductible ; compétences Python requises."
  }});

/* ───────── PLATEFORMES SERVEUR / SaaS ───────── */
B('plateforme','arcgis_ent',{
  n:'ArcGIS Enterprise', sub:'Esri · Suite serveur · Experience Builder, Field Maps, Survey123 inclus', grp:'main', os:'WL', sv:2, fr:1, lvl:3, ms:2, pow:4,
  d:"Portail SIG privé + serveur cartographique + data store. Inclut Experience Builder, Field Maps, Survey123. 6 200 € (5 users) · 10 000 € (10 users) · 18 000 € (25 users). SSO LDAP/AD natif.",
  p:{t:[[5,6200],[10,10000],[25,18000],[9999,26000]]}, f:'*0 net5 pub4 bet2 env2 biz2', tg:'sso,portal,forms,mobile,bi,opendata,3d,erp',
  inc:['experience_builder','fieldmaps','survey123','arcgis_db'], host:true, si:'arcgis_si',
  img:'ArcGisPRO.jpg', link:'https://www.esri.com/fr-fr', mail:'contact@esri.com',
  sp:{
    collectivite:"Portail interne SSO LDAP/AD, INSPIRE WMS/WFS natifs, catalogue de métadonnées, applications citoyennes via Experience Builder.",
    etat:"Déploiement souverain sur serveurs internes, versionnement multi-services, gouvernance des données métier.",
    energie:"Utility Network (électricité/eau/gaz), Field Maps pour les techniciens, dashboards temps réel et GeoEvent.",
    transport:"Portail d'exploitation, suivi de flotte (GeoEvent), tableaux de bord de ponctualité.",
    default:"Suite complète : portail, Experience Builder, Field Maps, Survey123, Insights, Notebooks. SSO LDAP/AD."
  }});

B('plateforme','arcgis_online',{
  n:'ArcGIS Online Creator', sub:'Esri · SaaS · Experience Builder, Field Maps, Survey123 inclus', grp:'main', os:'Web', sv:0, fr:1, lvl:1, ms:0, pow:2, cloud:true,
  d:"Plateforme SaaS Esri. Creator (500 €/an/user) inclut ArcGIS Online, Experience Builder, Field Maps, Survey123 et 5 Go de stockage. Viewer gratuit pour la consultation seule.",
  p:{u:[[1,500]]}, f:'*1 biz4 net3 pub3 bet3 env3 ong2', tg:'portal,forms,mobile,sso,bi,erp',
  inc:['experience_builder','fieldmaps','survey123','arcgis_db'], si:'arcgis_si',
  img:'AGOL.png', link:'https://www.arcgis.com', mail:'support@esri.com',
  sp:{
    geomarketing:"Dashboards commerciaux, zones de chalandise, Story Maps ; Survey123 pour les enquêtes clients.",
    immobilier:"Cartes interactives de biens pour clients, tableaux de bord de portefeuille.",
    collectivite:"Portails citoyens rapides, cartes de consultation publique ; ⚠️ données hébergées chez Esri (non souverain).",
    bet:"Livrables interactifs pour clients (Experience Builder), enquêtes de terrain avec Survey123.",
    default:"Creator : AGO, Experience Builder, Field Maps, Survey123, Insights, 5 Go. Viewer gratuit."
  }});

B('plateforme','supermap_iserver',{
  n:'SuperMap iServer', sub:'SuperMap · Serveur SIG · 2D/3D, Big Data & services OGC', grp:'main', os:'WL', sv:0, fr:0, lvl:3, ms:2, pow:4,
  d:"Serveur SIG de SuperMap : services cartographiques 2D/3D, OGC WMS/WFS/WMTS, analyse Big Data et temps réel, clients iClient (JS) et iMobile. Sur devis (≈ 6 000 à 16 000 €/an, indicatif).",
  p:{t:[[5,6000],[25,10000],[9999,16000]]}, f:'*0 net4 pub3 btp3 transport4', tg:'portal,3d,big,iot,mobile,opendata',
  inc:['supermap_imobile'], host:true, si:'supermap_si',
  link:'https://www.supermap.com',
  sp:{
    energie:"Services de cartographie 3D des réseaux, analyses de réseau et diffusion de couches Big Data ; interfaces OGC pour le SI existant.",
    transport:"Suivi temps réel de flottes, analyse de trajectoires massives et services de routage.",
    btp:"Diffusion web de maquettes BIM et de maillages obliques (OSGB) vers les parties prenantes du chantier.",
    collectivite:"Jumeau numérique territorial 3D et portail de données ; ⚠️ support francophone et revendeurs rares en France.",
    default:"Serveur 2D/3D/Big Data ; ⚠️ éditeur chinois, à écarter pour données sensibles ou critiques."
  }});

B('plateforme','supermap_iportal',{
  n:'SuperMap iPortal', sub:'SuperMap · Portail & gestion des ressources SIG', grp:'extra', os:'WL', sv:0, fr:0, lvl:3, ms:2, pow:3,
  d:"Portail de gestion et de partage des ressources SuperMap : catalogue, cartes, applications, gestion des utilisateurs et des droits. ≈ 4 500 €/an (indicatif).",
  p:4500, f:'*0 net3 pub3 btp2', tg:'portal,opendata,sso', req:[['supermap_iserver']], host:true, si:'supermap_si',
  link:'https://www.supermap.com',
  sp:{ default:"Catalogue et applications web SuperMap (équivalent d'ArcGIS Portal) ; nécessite iServer." }});

B('plateforme','carto',{
  n:'CARTO', sub:'SaaS · Location Intelligence sur data warehouse', grp:'main', os:'Web', sv:0, fr:2, lvl:3, ms:0, pow:4, cloud:true,
  d:"Plateforme d'analytique spatiale cloud qui s'appuie sur BigQuery, Snowflake ou Redshift : analyses à très grande échelle, visualisation et workflows. ≈ 8 000 €/an (indicatif, sur devis).",
  p:8000, f:'*0 biz5 transport3 bet3 net2', tg:'bi,big,api,erp',
  link:'https://carto.com',
  sp:{
    geomarketing:"Analyses de chalandise à l'échelle nationale, enrichissement de données (démographie, mobilité), tableaux de bord décisionnels.",
    immobilier:"Cartes de potentiel et scoring de zones d'investissement sur de très gros volumes.",
    transport:"Analyses de flux et de mobilité à grande échelle sur entrepôts de données.",
    default:"Analytique spatiale sur data warehouse ; ⚠️ cloud non souverain."
  }});

/* ───────── BASES DE DONNÉES SPATIALES ───────── */
B('bases','postgis',{
  n:'PostgreSQL / PostGIS', sub:'Open Source · Moteur spatial de référence', host:true, sv:2, fr:1, lvl:3, ms:2, pow:2,
  d:"Moteur spatial open source de référence : SQL spatial, topologie, index GIST, multi-utilisateurs, scalable jusqu'à des centaines de millions d'objets. Extensions pgRouting, Raster, TimescaleDB.",
  f:'*3 net5 pub5 geo4 env4 bet5 sci5 biz4 ong3', tg:'big,api,sso,etl,iot',
  img:'PostGre_PostGIS.jpg', link:'https://postgis.net',
  sp:{
    collectivite:"Base centrale des données communales : cadastre, voirie, urbanisme ; accès multi-services via Lizmap/GeoServer et droits par rôle.",
    energie:"Stockage topologique des réseaux et des actifs, pgRouting pour le routage ; passerelle avec les bases SCADA/GMAO.",
    transport:"pgRouting + GTFS ; séries temporelles via TimescaleDB pour les positions de flotte.",
    geometre:"Archive centralisée de plans et de levés, emprises parcellaires, historisation de dossiers.",
    bet_env:"Bases naturalistes multi-sites (inventaires, espèces, habitats), requêtes croisées sur couches réglementaires.",
    agriculture:"Registre parcellaire, historiques d'assolement, séries NDVI.",
    sci:"SQL spatial reproductible, pgRouting, PostGIS Raster ; compatible R/Python.",
    default:"Base spatiale libre, robuste et standard ; nécessite un serveur."
  }});

B('bases','gpkg',{
  n:'GeoPackage (.gpkg)', sub:'Format OGC · fichier unique · gratuit', sv:2, fr:2, lvl:1, ms:0, pow:1,
  d:"Standard OGC portable : une base spatiale dans un seul fichier. Compatible QGIS, ArcGIS, GDAL, FME. Idéal en solo, sur le terrain et pour l'archivage.",
  f:'*3 geo5 ong5 sci4 agriculture4', tg:'mobile',
  img:'Geopackage.jpg', link:'https://www.geopackage.org',
  sp:{
    geometre:"Livraison de levés aux clients et échanges avec QField ; remplace avantageusement le SHP (noms de champs, 2 Go).",
    ong:"Un seul fichier, hors-ligne, sans serveur : adapté aux contextes à faible connectivité.",
    default:"Fichier unique, usage mono-utilisateur ; ne convient pas à l'édition concurrente."
  }});

B('bases','spatialite',{
  n:'SpatiaLite / SQLite', sub:'Open Source · embarqué · léger', sv:2, fr:2, lvl:2, ms:0, pow:1,
  d:"Base spatiale légère dans un fichier SQLite : applications mobiles, projets zéro-config. Taille conseillée ≤ 2 Go.",
  f:'*2 geo3 ong3', tg:'mobile', img:'Spatialite.jpg', link:'https://www.gaia-gis.it/fossil/libspatialite',
  sp:{ default:"Stockage hors-ligne et applications embarquées ; requêtes SQL spatiales sans serveur." }});

B('bases','supabase',{
  n:'Supabase (PostGIS managé)', sub:'Cloud SaaS · PostGIS clé en main · API REST', sv:0, fr:2, lvl:3, ms:0, pow:2, cloud:true,
  d:"PostGIS clé en main avec API REST auto-générée. Gratuit (500 Mo) · Pro 25 €/mois · Équipe 599 €/mois.",
  p:{v:[0,300,3000]}, f:'*1 bet3 biz3 sci3 transport3', tg:'api,etl',
  img:'Supabase.png', link:'https://supabase.com',
  sp:{
    bet:"Base partagée pour projets multi-clients, API REST immédiate pour des applications web.",
    geomarketing:"Back-end d'applications de cartographie commerciale avec authentification intégrée.",
    default:"PostGIS managé sans administration ; ⚠️ serveurs US/EU selon le projet."
  }});

B('bases','arcgis_db',{
  n:'ArcGIS Data Store (Feature Services)', sub:'Esri · inclus dans AGO/Enterprise', sv:0, fr:1, lvl:1, ms:0, pow:2,
  d:"Données hébergées dans le cloud ou le serveur Esri sous forme de Feature Services ; incluses dans ArcGIS Online Creator (5 Go/user) et Enterprise.",
  f:'*1 net4 pub3', req:[['arcgis_online','arcgis_ent']], img:'AGOL.png', link:'https://www.arcgis.com',
  sp:{ default:"Stockage SaaS/serveur Esri ; stockage supplémentaire payant au-delà du quota." }});

B('bases','file_gdb',{
  n:'File Geodatabase (Esri)', sub:'Esri · format fichier performant', sv:2, fr:1, lvl:2, ms:0, pow:1,
  d:"Format de géodatabase fichier Esri : performant, jusqu'à 1 To/classe, lisible en lecture par GDAL/QGIS.",
  f:'*1 net3 pub2', req:[['arcgis_pro','arcgis_pro_adv']], img:'ArcGisPRO.jpg',
  sp:{ default:"Géodatabase locale d'ArcGIS Pro ; QGIS ne l'écrit pas nativement (lecture OK)." }});

B('bases','duckdb',{
  n:'DuckDB Spatial + GeoParquet', sub:'Open Source · analytique embarquée', sv:2, fr:2, lvl:4, ms:0, pow:1,
  d:"Moteur SQL analytique embarqué lisant GeoParquet/GPKG : requêtes très rapides sur des centaines de millions de lignes sans serveur.",
  f:'*0 sci5 bet3 biz3 net2', tg:'big,api,etl', link:'https://duckdb.org',
  sp:{ default:"Analyses massives locales (open data, DVF, OSM) ; nécessite des compétences SQL/Python." }});

B('bases','sqlserver_spatial',{
  n:'SQL Server (types spatiaux)', sub:'Microsoft · Windows / Linux · intégration BI', sv:1, fr:1, lvl:3, ms:2, pow:3, host:true,
  d:"Base relationnelle Microsoft avec types GEOMETRY/GEOGRAPHY, très répandue dans les SI d'entreprise ; Express gratuit jusqu'à 10 Go.",
  p:{v:[0,1800,3800]}, f:'*1 net3 pub3 biz2', tg:'bi,erp,sso', si:'azure,m365',
  link:'https://www.microsoft.com/fr-fr/sql-server',
  sp:{ default:"Intégré à Power BI, Active Directory et aux ERP ; bonne option si le SI est déjà Microsoft." }});

B('bases','oracle_spatial',{
  n:'Oracle Spatial', sub:'Oracle · bases d\'entreprise critiques', sv:2, fr:1, lvl:3, ms:2, pow:4, host:true,
  d:"Moteur spatial Oracle pour les très gros systèmes d'information (réseaux, cadastres nationaux). Coût élevé (≈ 10 000 €/an, indicatif).",
  p:10000, f:'*0 net4 pub3', tg:'erp,big,sso',
  link:'https://www.oracle.com/fr/database/',
  sp:{ default:"Choix pertinent si Oracle est déjà le SGBD de référence de l'organisation ; sinon préférer PostGIS." }});
