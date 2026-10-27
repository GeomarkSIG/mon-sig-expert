/* ══════════════════════════════════════════════════════════════════
   LEXIQUE — termes techniques, définitions et sources
   G(terme, catégorie, définition, [[libellé source, url], …], [alias])
══════════════════════════════════════════════════════════════════ */
var GLOSS = [];
var GLOSS_CATS = [
  'Formats et standards de données',
  'Services web et interfaces (API)',
  'Coordonnées et référentiels',
  'Données de référence (France / Europe)',
  'Imagerie et télédétection',
  'Terrain et positionnement GNSS',
  'Bases de données et traitement',
  'Hébergement et infrastructure',
  'Sécurité, identité et conformité',
  'Écosystèmes et fonctions logicielles',
  'Analyses et notions métier',
  'Temps réel et capteurs',
  'Modèles économiques et exploitation'
];
function G(t, c, d, u, al) { GLOSS.push({t: t, c: c, d: d, u: u || [], al: al || [], id: slug(t)}); }
function slug(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

/* ───────── Formats et standards ───────── */
var C1 = GLOSS_CATS[0];
G('OGC', C1, "Open Geospatial Consortium : organisme qui publie les standards d'interopérabilité géospatiale (WMS, WFS, GeoPackage…). Un logiciel « conforme OGC » échange des données avec n'importe quel autre sans format propriétaire.", [['ogc.org', 'https://www.ogc.org/'], ['Wikipédia', 'https://fr.wikipedia.org/wiki/Open_Geospatial_Consortium']], ['Open Geospatial Consortium']);
G('GeoPackage', C1, "Format OGC qui stocke vecteurs, rasters et styles dans un seul fichier SQLite. Successeur moderne du shapefile : pas de limite de 2 Go ni de noms de champs tronqués. Convient en solo ou en terrain, pas à l'édition concurrente.", [['geopackage.org', 'https://www.geopackage.org/'], ['Norme OGC', 'https://www.ogc.org/standards/geopackage/']], ['GPKG', '.gpkg']);
G('Shapefile', C1, "Format vectoriel historique d'Esri (fichiers .shp/.dbf/.shx). Universellement lu, mais limité : 2 Go, noms de champs à 10 caractères, un seul type de géométrie par fichier.", [['Spécification Esri (PDF)', 'https://www.esri.com/content/dam/esrisites/sitecore-archive/Files/Pdfs/library/whitepapers/pdfs/shapefile.pdf'], ['Wikipédia', 'https://fr.wikipedia.org/wiki/Shapefile']], ['SHP']);
G('GeoJSON', C1, "Format texte (JSON) pour les données vectorielles, standard IETF (RFC 7946), très utilisé sur le web et dans les API.", [['geojson.org', 'https://geojson.org/'], ['RFC 7946', 'https://datatracker.ietf.org/doc/html/rfc7946']]);
G('KML', C1, "Format XML de Google Earth, standardisé OGC, pour échanger des repères, lignes et surfaces avec leur mise en forme.", [['Norme OGC', 'https://www.ogc.org/standards/kml/']]);
G('GeoParquet', C1, "Extension du format colonne Parquet pour les données géographiques : lecture très rapide sur des centaines de millions de lignes, adaptée à l'analytique.", [['geoparquet.org', 'https://geoparquet.org/']]);
G('DWG', C1, "Format de fichier natif d'AutoCAD pour les plans de dessin assisté par ordinateur (DAO). Référence des échanges avec architectes et bureaux d'études.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/DWG']]);
G('DXF', C1, "Format d'échange de dessin d'Autodesk, documenté et lisible par presque tous les logiciels. Moins fidèle que le DWG (styles, blocs) mais plus ouvert.", [['Wikipédia', 'https://en.wikipedia.org/wiki/AutoCAD_DXF']]);
G('IFC', C1, "Industry Foundation Classes : format ouvert d'échange de maquettes numériques du bâtiment et des infrastructures (BIM), normalisé ISO 16739.", [['buildingSMART', 'https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/']]);
G('BIM', C1, "Building Information Modeling : maquette numérique 3D d'un ouvrage contenant aussi ses données (matériaux, coûts, phases). Les SIG s'y raccordent pour situer l'ouvrage dans son territoire.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Building_information_modeling']]);
G('LandXML', C1, "Format XML d'échange de données de topographie et de génie civil (semis de points, MNT, tracés routiers).", [['landxml.org', 'http://landxml.org/']]);
G('CityGML', C1, "Standard OGC de modélisation de villes en 3D (bâtiments, ponts, végétation) avec des niveaux de détail et des attributs.", [['Norme OGC', 'https://www.ogc.org/standards/citygml/']]);
G('3D Tiles', C1, "Standard OGC pour diffuser de très gros jeux de données 3D (bâtiments, maillages, nuages de points) dans un navigateur par morceaux.", [['Norme OGC', 'https://www.ogc.org/standards/3dtiles/']]);
G('Geodatabase', C1, "Format de base de données géographique d'Esri (fichier ou serveur) qui gère règles de topologie, domaines de valeurs et versionnement.", [['Documentation Esri', 'https://pro.arcgis.com/en/pro-app/latest/help/data/geodatabases/overview/what-is-a-geodatabase-.htm']], ['GDB', 'File Geodatabase', 'géodatabase']);
G('SLD', C1, "Styled Layer Descriptor : standard OGC qui décrit en XML la symbologie d'une couche (couleurs, étiquettes) pour les serveurs cartographiques.", [['Norme OGC', 'https://www.ogc.org/standards/sld/']]);
G('XLSForm', C1, "Convention de formulaire écrite dans un tableur Excel (feuilles survey/choices) utilisée par KoboToolbox, ODK et Survey123.", [['xlsform.org', 'https://xlsform.org/']]);
G('Métadonnées', C1, "Données qui décrivent une donnée : auteur, date, emprise, précision, licence. Obligatoires pour les données publiques (INSPIRE) et indispensables pour retrouver et réutiliser un jeu de données.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/M%C3%A9tadonn%C3%A9e']]);
G('ISO 19115', C1, "Norme internationale de description des métadonnées géographiques, sur laquelle s'appuient les catalogues INSPIRE.", [['ISO 19115-1', 'https://www.iso.org/standard/53798.html']]);
G('Tuiles vectorielles', C1, "Découpage de cartes en petits morceaux de données vectorielles (et non d'images) envoyés au navigateur : affichage fluide et style modifiable côté client.", [['Spécification Mapbox', 'https://github.com/mapbox/vector-tile-spec']]);
G('SQLite', C1, "Moteur de base de données embarqué dans un simple fichier, sans serveur. Base de GeoPackage et de SpatiaLite.", [['sqlite.org', 'https://www.sqlite.org/']]);

/* ───────── Services web et API ───────── */
var C2 = GLOSS_CATS[1];
G('WMS', C2, "Web Map Service (OGC) : le serveur renvoie une image de carte pour une zone demandée. Simple à consommer, mais on ne récupère pas les données elles-mêmes.", [['Norme OGC', 'https://www.ogc.org/standards/wms/']]);
G('WFS', C2, "Web Feature Service (OGC) : le serveur renvoie les objets géographiques eux-mêmes (géométries et attributs), modifiables dans sa version transactionnelle.", [['Norme OGC', 'https://www.ogc.org/standards/wfs/']]);
G('WMTS', C2, "Web Map Tile Service (OGC) : cartes prédécoupées en tuiles mises en cache, très rapides pour les fonds de plan et les fortes audiences.", [['Norme OGC', 'https://www.ogc.org/standards/wmts/']]);
G('WCS', C2, "Web Coverage Service (OGC) : diffusion de données raster (MNT, imagerie) avec leurs valeurs, pas seulement une image.", [['Norme OGC', 'https://www.ogc.org/standards/wcs/']]);
G('OGC API Features', C2, "Génération moderne de WFS : interface web REST/JSON simple à utiliser par les développeurs.", [['ogcapi.ogc.org', 'https://ogcapi.ogc.org/features/']]);
G('CSW', C2, "Catalogue Service for the Web (OGC) : interface de recherche et de moissonnage de fiches de métadonnées entre catalogues.", [['Norme OGC', 'https://www.ogc.org/standards/cat/']]);
G('STAC', C2, "SpatioTemporal Asset Catalog : format ouvert pour décrire et rechercher des imageries satellite ou aériennes par zone et par date.", [['stacspec.org', 'https://stacspec.org/']]);
G('API REST', C2, "Interface de programmation basée sur HTTP qui permet à des applications d'échanger des données (en JSON le plus souvent). Sert à relier un SIG à un ERP, à un site web ou à une application mobile.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Representational_state_transfer']], ['REST', 'API']);
G('Webhook', C2, "Appel HTTP automatique envoyé par un système vers un autre lorsqu'un événement survient (nouvelle donnée, modification). Sert à déclencher des traitements en temps réel.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Webhook']], ['webhooks']);
G('Feature Service', C2, "Service Esri qui expose des couches modifiables via le web, utilisé par ArcGIS Online/Enterprise et les applications de terrain.", [['Documentation Esri', 'https://developers.arcgis.com/rest/services-reference/enterprise/feature-service.htm']], ['Feature Services']);
G('XYZ', C2, "Convention de tuiles de carte (zoom/x/y) utilisée par OpenStreetMap et la plupart des fonds de plan web.", [['Wiki OpenStreetMap', 'https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames']], ['flux XYZ']);
G('GTFS', C2, "General Transit Feed Specification : format ouvert des horaires et arrêts de transports en commun.", [['gtfs.org', 'https://gtfs.org/']]);
G('Open data', C2, "Données publiques librement réutilisables. En France, publiées notamment sur data.gouv.fr sous licence ouverte (Etalab).", [['data.gouv.fr', 'https://www.data.gouv.fr/'], ['Licence ouverte Etalab', 'https://www.etalab.gouv.fr/licence-ouverte-open-licence/']], ['open data', 'Etalab']);
G('INSPIRE', C2, "Directive européenne qui oblige les administrations à diffuser leurs données géographiques selon des modèles et des services communs (métadonnées, WMS, WFS).", [['inspire.ec.europa.eu', 'https://inspire.ec.europa.eu/'], ['Géocatalogue (France)', 'https://www.geocatalogue.fr/']]);
G('ETL', C2, "Extract-Transform-Load : outil qui extrait des données d'une source, les transforme (reprojection, nettoyage, jointures) et les charge dans une autre.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Extract-transform-load']]);

/* ───────── Coordonnées et référentiels ───────── */
var C3 = GLOSS_CATS[2];
G('CRS', C3, "Système de coordonnées de référence : combinaison d'un référentiel (ellipsoïde) et d'une projection. Une erreur de CRS décale les données de plusieurs mètres ou kilomètres.", [['EPSG.io', 'https://epsg.io/'], ['Wikipédia', 'https://fr.wikipedia.org/wiki/Syst%C3%A8me_de_coordonn%C3%A9es']], ['système de projection']);
G('Lambert 93', C3, "Projection légale en France métropolitaine (RGF93, EPSG:2154), en mètres. À utiliser pour toute donnée officielle (cadastre, BD TOPO).", [['EPSG:2154', 'https://epsg.io/2154']], ['Lambert-93']);
G('RGF93', C3, "Réseau Géodésique Français 1993 : référentiel officiel en France métropolitaine, compatible avec le GPS (ETRS89).", [['IGN — géodésie', 'https://geodesie.ign.fr/']]);
G('RGR92', C3, "Référentiel géodésique de La Réunion (projection UTM 40 Sud, EPSG:2975).", [['EPSG:2975', 'https://epsg.io/2975']], ['UTM-40S']);
G('WGS 84', C3, "Référentiel mondial utilisé par le GPS et les cartes web (EPSG:4326), en degrés.", [['EPSG:4326', 'https://epsg.io/4326']], ['WGS84']);
G('Conique conforme', C3, "Projections « CC » (zones 42 à 50) utilisées en topographie en France métropolitaine pour limiter la déformation sur de petites zones.", [['IGN — projections', 'https://geodesie.ign.fr/index.php?page=documentation']], ['CC9Z', 'CC']);
G('EPSG', C3, "Registre mondial des codes de systèmes de coordonnées (ex. 2154 pour Lambert 93).", [['epsg.io', 'https://epsg.io/']]);

/* ───────── Données de référence ───────── */
var C4 = GLOSS_CATS[3];
G('Géoplateforme', C4, "Plateforme de l'IGN qui diffuse les données géographiques de référence (orthophotos, BD TOPO, LiDAR HD…) en flux web.", [['geoservices.ign.fr', 'https://geoservices.ign.fr/']]);
G('BD TOPO', C4, "Description vectorielle 3D du territoire français (bâti, routes, hydrographie, végétation) produite par l'IGN, en données ouvertes.", [['IGN', 'https://geoservices.ign.fr/bdtopo']]);
G('BD ORTHO', C4, "Orthophotographies aériennes de l'IGN couvrant la France (résolution jusqu'à 20 cm ou mieux selon les zones).", [['IGN', 'https://geoservices.ign.fr/bdortho']]);
G('RGE ALTI', C4, "Modèle numérique de terrain de l'IGN (altitudes au pas de 1 m ou 5 m).", [['IGN', 'https://geoservices.ign.fr/rgealti']]);
G('LiDAR HD', C4, "Programme IGN de relevé LiDAR aérien de tout le territoire (nuage de points classifié, plusieurs points par m²), en données ouvertes.", [['IGN', 'https://geoservices.ign.fr/lidarhd']]);
G('Cadastre', C4, "Plan des parcelles et des propriétés. Les données vectorielles sont ouvertes via cadastre.data.gouv.fr.", [['cadastre.data.gouv.fr', 'https://cadastre.data.gouv.fr/']], ['Parcellaire express']);
G('PCRS', C4, "Plan de Corps de Rue Simplifié : fond de plan très précis (≤ 10 cm) obligatoire pour localiser les réseaux enterrés.", [['CNIG', 'https://cnig.gouv.fr/']]);
G('DVF', C4, "Demandes de Valeurs Foncières : base ouverte des ventes immobilières déclarées (prix, surface, localisation).", [['data.gouv.fr', 'https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/']]);
G('MAJIC', C4, "Fichiers fonciers de la DGFiP décrivant propriétaires et locaux ; accès réglementé (Cerema).", [['Cerema', 'https://doc-datafoncier.cerema.fr/']], ['Fichiers fonciers']);
G('RPG', C4, "Registre Parcellaire Graphique : îlots et parcelles culturales déclarés à la PAC, publié par l'IGN/ASP.", [['IGN', 'https://geoservices.ign.fr/rpg']], ['PAC']);
G('INSEE', C4, "Institut national de la statistique : population, revenus, emplois et carreaux de données rattachables à des territoires.", [['insee.fr', 'https://www.insee.fr/']]);
G('SIRENE', C4, "Répertoire officiel des entreprises et établissements français, géolocalisable (adresse).", [['data.gouv.fr', 'https://www.data.gouv.fr/fr/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/']]);
G('Natura 2000', C4, "Réseau européen de sites protégés pour leur biodiversité ; périmètres à consulter dans tout projet d'aménagement.", [['INPN', 'https://inpn.mnhn.fr/programme/natura2000']]);
G('INPN', C4, "Inventaire National du Patrimoine Naturel : espèces, habitats et espaces protégés (MNHN).", [['inpn.mnhn.fr', 'https://inpn.mnhn.fr/']]);
G('GBIF', C4, "Infrastructure mondiale de données ouvertes sur la biodiversité (observations d'espèces).", [['gbif.org', 'https://www.gbif.org/']]);
G('PLU', C4, "Plan Local d'Urbanisme : document qui définit les règles de construction par zone. Sa version intercommunale est le PLUi.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Plan_local_d%27urbanisme']], ['PLUi']);
G('ZAN', C4, "Zéro Artificialisation Nette : objectif français de limiter la consommation d'espaces naturels, agricoles et forestiers.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Z%C3%A9ro_artificialisation_nette']]);
G('OpenStreetMap', C4, "Base de données cartographique mondiale collaborative et libre (licence ODbL).", [['openstreetmap.org', 'https://www.openstreetmap.org/about'], ['ODbL', 'https://opendatacommons.org/licenses/odbl/']], ['OSM', 'ODbL']);
G('Tasking Manager', C4, "Outil du Humanitarian OpenStreetMap Team pour répartir la cartographie d'une zone entre des bénévoles lors d'une crise.", [['tasks.hotosm.org', 'https://tasks.hotosm.org/']]);
G('HOT', C4, "Humanitarian OpenStreetMap Team : organisation qui coordonne la cartographie collaborative humanitaire.", [['hotosm.org', 'https://www.hotosm.org/']]);

/* ───────── Imagerie et télédétection ───────── */
var C5 = GLOSS_CATS[4];
G('Orthophotographie', C5, "Photographie aérienne ou satellite redressée géométriquement pour être superposable à une carte (sans déformation de relief).", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Orthophotographie']], ['orthophoto', 'ortho']);
G('Photogrammétrie', C5, "Technique qui reconstitue des modèles 3D, des orthos et des MNT à partir de photographies qui se chevauchent (drone, avion).", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Photogramm%C3%A9trie']]);
G('MNT', C5, "Modèle Numérique de Terrain : altitude du sol nu. Le MNS inclut les objets au-dessus du sol (bâtiments, arbres) et le MNH est leur hauteur.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Mod%C3%A8le_num%C3%A9rique_de_terrain']], ['MNS', 'MNH']);
G('LiDAR', C5, "Télédétection par laser : mesure la distance à des millions de points pour produire un nuage de points 3D précis, même sous la végétation.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Lidar']], ['nuage de points', 'nuages de points', 'LAZ']);
G('Sentinel-2', C5, "Satellites européens (Copernicus) qui imagent la Terre en 13 bandes, à 10 m de résolution tous les 5 jours. Données gratuites.", [['ESA', 'https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-2'], ['Copernicus Data Space', 'https://dataspace.copernicus.eu/']], ['Sentinel', 'Copernicus']);
G('Landsat', C5, "Programme américain d'imagerie satellite à 30 m depuis 1972, gratuit : référence pour les séries temporelles longues.", [['Wikipédia (EN)', 'https://en.wikipedia.org/wiki/Landsat_program']]);
G('Multispectral', C5, "Imagerie qui capte plusieurs bandes de lumière (dont le proche infrarouge) pour analyser végétation, eau et sols.", [['Wikipédia', 'https://en.wikipedia.org/wiki/Multispectral_imaging']], ['multispectrale']);
G('NDVI', C5, "Indice de végétation calculé à partir du rouge et du proche infrarouge : mesure la vigueur et la densité des plantes. Le NDRE est une variante plus sensible à la teneur en chlorophylle.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Normalized_difference_vegetation_index']], ['NDRE']);
G('THR', C5, "Très Haute Résolution : imagerie satellite ou aérienne de résolution inférieure à 1 m (30 à 50 cm pour Pléiades Neo ou Maxar).", [['Airbus', 'https://www.intelligence-airbusds.com/imagery/constellation/pleiades-neo/']], ['Pléiades Neo', 'Pléiades']);
G('Télédétection', C5, "Acquisition d'informations sur la surface terrestre à distance (satellite, avion, drone), puis analyse des images.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/T%C3%A9l%C3%A9d%C3%A9tection']]);
G('Maillage oblique', C5, "Modèle 3D texturé obtenu par photogrammétrie de photos prises en biais (fichiers OSGB, 3D Tiles) : bâtiments et rues réalistes.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Photogramm%C3%A9trie']], ['OSGB', 'photogrammétrie oblique']);

/* ───────── Terrain et GNSS ───────── */
var C6 = GLOSS_CATS[5];
G('GNSS', C6, "Systèmes de positionnement par satellites (GPS, Galileo, GLONASS, BeiDou). Un récepteur GNSS pro atteint le centimètre avec correction.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/GNSS']], ['GPS']);
G('RTK', C6, "Real-Time Kinematic : correction en temps réel du GNSS par une station de référence, qui ramène l'erreur à 1–3 cm.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Cin%C3%A9matique_temps_r%C3%A9el']]);
G('RGP', C6, "Réseau GNSS Permanent de l'IGN : stations de référence qui matérialisent le RGF93 et fournissent des données de correction.", [['rgp.ign.fr', 'https://rgp.ign.fr/']]);
G('Centipede', C6, "Réseau libre de stations RTK en France, ouvert et sans abonnement.", [['docs.centipede.fr', 'https://docs.centipede.fr/']]);
G('NMEA', C6, "Protocole standard de transmission des positions entre un récepteur GNSS et un logiciel ou une application.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/NMEA_0183']]);
G('Hors-ligne', C6, "Mode de fonctionnement d'une application mobile qui enregistre localement les saisies sans réseau, puis se synchronise une fois reconnectée.", [], ['hors connexion']);
G('Station totale', C6, "Instrument de topographie qui mesure angles et distances. Ses mesures sont compensées dans des logiciels comme Trimble Business Center.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Station_totale']]);

/* ───────── Bases de données et traitement ───────── */
var C7 = GLOSS_CATS[6];
G('PostGIS', C7, "Extension spatiale de la base PostgreSQL : types géométriques, index spatiaux, plus de 1 000 fonctions d'analyse. Standard open source des bases SIG multi-utilisateurs.", [['postgis.net', 'https://postgis.net/documentation/']]);
G('PostgreSQL', C7, "Système de gestion de base de données relationnelle libre, robuste et extensible.", [['postgresql.org', 'https://www.postgresql.org/']]);
G('SpatiaLite', C7, "Extension spatiale de SQLite : base géographique légère dans un fichier.", [['gaia-gis.it', 'https://www.gaia-gis.it/fossil/libspatialite/index']]);
G('pgRouting', C7, "Extension PostGIS pour le calcul d'itinéraires, d'isochrones et de plus courts chemins sur un réseau.", [['pgrouting.org', 'https://pgrouting.org/']]);
G('Index GIST', C7, "Index qui accélère les requêtes spatiales dans PostgreSQL (recherche par emprise ou proximité).", [['PostgreSQL', 'https://www.postgresql.org/docs/current/gist.html']]);
G('Topologie', C7, "Relations entre objets (adjacence, connexité, contenance). Les règles topologiques évitent trous et chevauchements entre parcelles ou conduites.", [['PostGIS', 'https://postgis.net/docs/Topology.html']]);
G('GDAL', C7, "Bibliothèque libre de lecture, conversion et traitement de plus de 200 formats raster et vecteur (outil OGR pour les vecteurs). Moteur caché de QGIS, de nombreux ETL et de la plupart des SIG.", [['gdal.org', 'https://gdal.org/']], ['OGR', 'GDAL/OGR']);
G('GeoPandas', C7, "Bibliothèque Python qui ajoute la géométrie aux tableaux de données (DataFrame) de pandas.", [['geopandas.org', 'https://geopandas.org/']], ['Rasterio', 'Shapely']);
G('PyQGIS', C7, "Interface Python de QGIS pour automatiser des traitements, créer des extensions et produire des livrables en série.", [['Documentation QGIS', 'https://docs.qgis.org/latest/fr/docs/pyqgis_developer_cookbook/']]);
G('ArcPy', C7, "Bibliothèque Python d'Esri pour automatiser ArcGIS Pro (traitements, cartes, publications).", [['Documentation Esri', 'https://pro.arcgis.com/en/pro-app/latest/arcpy/get-started/what-is-arcpy-.htm']]);
G('Jupyter', C7, "Environnement de notebooks qui mêle code, résultats et texte ; usuel en science des données et en recherche.", [['jupyter.org', 'https://jupyter.org/']]);
G('Data warehouse', C7, "Entrepôt de données analytique centralisé (BigQuery, Snowflake…) où l'on croise des volumes massifs de données.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Entrep%C3%B4t_de_donn%C3%A9es']], ['entrepôt de données', 'BigQuery']);
G('Big Data', C7, "Volumes de données trop gros ou trop rapides pour des outils classiques, qui demandent un traitement distribué.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Big_data']]);
G('Édition concurrente', C7, "Plusieurs personnes qui modifient la même couche en même temps. Impossible avec un fichier (GeoPackage), possible avec une base serveur (PostGIS) qui gère les verrous.", [], ['multi-utilisateur', 'multi-utilisateurs']);
G('BI', C7, "Business Intelligence (informatique décisionnelle) : tableaux de bord et analyses qui aident à piloter une organisation (Power BI, Metabase, Tableau…).", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Informatique_d%C3%A9cisionnelle']], ['décisionnel']);
G('ERP', C7, "Progiciel de gestion intégré (SAP, Odoo…) qui gère finances, stocks, achats et ressources humaines.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Progiciel_de_gestion_int%C3%A9gr%C3%A9']]);
G('CRM', C7, "Gestion de la relation client : base des clients, prospects et ventes (Salesforce, HubSpot…).", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Gestion_de_la_relation_client']]);
G('GMAO', C7, "Gestion de Maintenance Assistée par Ordinateur : suivi des interventions et du parc d'équipements, souvent couplé au SIG réseau.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Gestion_de_maintenance_assist%C3%A9e_par_ordinateur']]);

/* ───────── Hébergement et infrastructure ───────── */
var C8 = GLOSS_CATS[7];
G('Docker', C8, "Technologie de conteneurs qui empaquette une application et ses dépendances pour la déployer à l'identique partout. Lizmap, GeoServer ou PostGIS s'installent ainsi en quelques commandes.", [['docs.docker.com', 'https://docs.docker.com/get-started/overview/']]);
G('Kubernetes', C8, "Orchestrateur de conteneurs : déploie, répartit et redimensionne automatiquement les applications selon la charge.", [['kubernetes.io', 'https://kubernetes.io/fr/docs/concepts/overview/']], ['K8s']);
G('Autoscaling', C8, "Ajustement automatique des ressources (serveurs, mémoire) en fonction du trafic, pour absorber des pics sans surdimensionner.", [['Documentation Kubernetes', 'https://kubernetes.io/docs/concepts/workloads/autoscaling/']], ['mise à l\'échelle automatique', 'élastique']);
G('VPS', C8, "Serveur privé virtuel : machine virtuelle louée chez un hébergeur (OVHcloud, Scaleway, Hetzner), administrée par vous.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Serveur_d%C3%A9di%C3%A9_virtuel']]);
G('Linux', C8, "Système d'exploitation libre, très répandu sur les serveurs. La plupart des briques serveur open source (PostGIS, GeoServer, Lizmap) y fonctionnent nativement.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Linux']]);
G('On-Premise', C8, "Hébergement sur vos propres serveurs, dans vos locaux. Contrôle total et pas d'abonnement cloud, mais maintenance et sauvegardes à votre charge.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Informatique_en_nuage']], ['serveur interne', 'serveur physique', 'sur site', 'intranet']);
G('Air-gapped', C8, "Réseau physiquement isolé d'internet, exigé pour les données de défense ou très sensibles.", [['Wikipédia', 'https://en.wikipedia.org/wiki/Air_gap_(networking)']], ['air-gap', 'cloisonné']);
G('Stockage objet', C8, "Stockage de fichiers volumineux (rasters, tuiles, sauvegardes) accessible par API, compatible S3.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Amazon_S3']], ['S3']);
G('CDN', C8, "Réseau de diffusion de contenu qui met en cache cartes et tuiles près des utilisateurs pour supporter de fortes audiences.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/R%C3%A9seau_de_diffusion_de_contenu']]);

/* ───────── Sécurité, identité et conformité ───────── */
var C9 = GLOSS_CATS[8];
G('SSO', C9, "Authentification unique : un seul identifiant donne accès à plusieurs applications (SIG, messagerie, BI) via l'annuaire de l'organisation.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Authentification_unique']]);
G('LDAP', C9, "Protocole d'annuaire qui centralise comptes et groupes d'utilisateurs ; implémenté notamment par Active Directory.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol']]);
G('Active Directory', C9, "Annuaire Microsoft des comptes et droits d'une organisation Windows.", [['Microsoft', 'https://learn.microsoft.com/fr-fr/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview']], ['AD']);
G('Entra ID', C9, "Annuaire et service d'identité cloud de Microsoft (anciennement Azure AD), avec authentification multifacteur.", [['Microsoft', 'https://learn.microsoft.com/fr-fr/entra/fundamentals/whatis']], ['Azure AD', 'Entra']);
G('SAML', C9, "Standard d'échange d'authentification entre un fournisseur d'identité et des applications (SAML 2.0).", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Security_Assertion_Markup_Language']], ['SAML 2.0']);
G('OpenID Connect', C9, "Couche d'identité moderne au-dessus d'OAuth 2.0, utilisée pour la connexion unique d'applications web.", [['openid.net', 'https://openid.net/developers/how-connect-works/']], ['OIDC', 'OAuth2']);
G('Keycloak', C9, "Serveur libre de gestion des identités (SAML, OpenID Connect, LDAP) qui fédère plusieurs applications sans éditeur propriétaire.", [['keycloak.org', 'https://www.keycloak.org/documentation']]);
G('MFA', C9, "Authentification multifacteur : mot de passe plus un second élément (application, clé), qui limite le risque de compte volé.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Authentification_multifacteur']]);
G('RGPD', C9, "Règlement général sur la protection des données (UE) : encadre la collecte et l'hébergement des données personnelles, avec sanctions.", [['CNIL', 'https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on']]);
G('SecNumCloud', C9, "Qualification de l'ANSSI pour les services cloud de confiance, protégés des lois extraterritoriales.", [['ANSSI', 'https://cyber.gouv.fr/secnumcloud-pour-les-fournisseurs-de-services-cloud']]);
G('HDS', C9, "Hébergeur de Données de Santé : certification requise pour héberger des données de santé à caractère personnel en France.", [['Agence du numérique en santé', 'https://esante.gouv.fr/produits-services/hds']]);
G('IGI 1300', C9, "Instruction interministérielle qui encadre la protection des informations classifiées de défense.", [['SGDSN', 'https://www.sgdsn.gouv.fr/']]);
G('OIV', C9, "Opérateur d'Importance Vitale : organisation dont l'activité est essentielle à la Nation (énergie, eau, transport) et soumise à des obligations de sécurité renforcées.", [['ANSSI', 'https://cyber.gouv.fr/les-oiv']], ['OSE']);
G('Souveraineté', C9, "Maîtrise du lieu d'hébergement et du droit applicable aux données. Trois niveaux dans ce diagnostic : standard (cloud mondial accepté), sensible (UE ou France requis), critique (hébergement interne).", [['SecNumCloud (ANSSI)', 'https://cyber.gouv.fr/secnumcloud-pour-les-fournisseurs-de-services-cloud'], ['CNIL', 'https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on']], ['souveraineté critique', 'souveraineté sensible']);

/* ───────── Écosystèmes et fonctions logicielles ───────── */
var C10 = GLOSS_CATS[9];
G('Plugin', C10, "Extension qui ajoute une fonction à un logiciel (QGIS en compte plus de 1 000, créés par la communauté).", [['Dépôt des plugins QGIS', 'https://plugins.qgis.org/']], ['plugins', 'extension']);
G('Processing', C10, "Boîte à outils de QGIS qui regroupe des algorithmes (GDAL, GRASS, SAGA…) et permet de les enchaîner en modèles graphiques.", [['Documentation QGIS', 'https://docs.qgis.org/latest/fr/docs/user_manual/processing/index.html']], ['Modélisateur', 'modèles de traitement']);
G('QGIS Server', C10, "Serveur cartographique de QGIS qui publie un projet .qgz en WMS/WFS ; moteur de rendu de Lizmap.", [['Documentation QGIS', 'https://docs.qgis.org/latest/fr/docs/server_manual/index.html']]);
G('Symbologie', C10, "Mise en forme graphique d'une couche (couleurs, symboles, étiquettes). Lizmap la reprend à l'identique depuis QGIS.", []);
G('Atlas', C10, "Série automatique de planches cartographiques générées à partir d'une couche de découpage (une feuille par commune par exemple).", [['Documentation QGIS', 'https://docs.qgis.org/latest/fr/docs/user_manual/print_composer/create_reports.html']]);
G('Formulaire', C10, "Écran de saisie lié à une couche, avec champs, listes et contrôles. Il est reproduit à l'identique sur le web (Lizmap) et sur mobile (QField).", [], ['formulaires']);
G('Utility Network', C10, "Modèle de réseau d'Esri pour l'électricité, l'eau, le gaz et le télécom, avec règles de connexion et analyses amont/aval.", [['Documentation Esri', 'https://pro.arcgis.com/en/pro-app/latest/help/data/utility-network/']]);
G('Named User', C10, "Licence nominative d'Esri attribuée à une personne, qui se connecte au portail (ArcGIS Online ou Enterprise) pour utiliser les logiciels.", [['Documentation Esri', 'https://enterprise.arcgis.com/en/portal/latest/administer/windows/about-licensing.htm']]);
G('FDO', C10, "Feature Data Objects : couche d'accès aux données d'AutoCAD Map 3D vers des bases spatiales et des fichiers SIG.", [['fdo.osgeo.org', 'https://fdo.osgeo.org/']]);
G('Jumeau numérique', C10, "Réplique numérique 3D d'un territoire ou d'un réseau, alimentée en données pour simuler et surveiller.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Jumeau_num%C3%A9rique']]);
G('MapLibre', C10, "Bibliothèque libre d'affichage de cartes web en tuiles vectorielles, avec Leaflet et OpenLayers parmi les références.", [['maplibre.org', 'https://maplibre.org/']], ['Leaflet', 'OpenLayers']);
G('deck.gl', C10, "Bibliothèque de visualisation de très gros volumes de données géographiques dans le navigateur (WebGL).", [['deck.gl', 'https://deck.gl/']]);

/* ───────── Analyses et notions métier ───────── */
var C11 = GLOSS_CATS[10];
G('Isochrone', C11, "Zone atteignable depuis un point en un temps donné (ex. 10 min en voiture), utile pour mesurer l'accessibilité ou une zone de chalandise.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Isochrone']], ['isochrones']);
G('Géocodage', C11, "Conversion d'une adresse postale en coordonnées géographiques, indispensable pour cartographier des fichiers clients.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/G%C3%A9ocodage'], ['Base Adresse Nationale', 'https://adresse.data.gouv.fr/']]);
G('Zone de chalandise', C11, "Territoire d'où vient la clientèle d'un point de vente, calculé par distance, temps de trajet ou données de fréquentation.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Zone_de_chalandise']], ['chalandise']);
G('VRP', C11, "Problème de tournées de véhicules : calculer les meilleures routes pour servir des clients avec des contraintes (horaires, capacités).", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Probl%C3%A8me_de_tourn%C3%A9es_de_v%C3%A9hicules']], ['optimisation de tournées', 'tournées']);
G('Récolement', C11, "Plan de l'ouvrage tel qu'il a été réellement exécuté, établi après travaux, notamment pour les réseaux enterrés.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Plan_de_r%C3%A9colement']], ['plans de récolement', 'dossiers de récolement']);
G('VRD', C11, "Voirie et Réseaux Divers : travaux de voirie, assainissement, eau, électricité et télécoms d'un aménagement.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Voirie_et_r%C3%A9seaux_divers']]);
G('Terrassement', C11, "Travaux de déblai et remblai qui modifient le relief d'un terrain ; les volumes se calculent par différence de MNT.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Terrassement']], ['déblais/remblais', 'volumes']);
G('Cheminement', C11, "Suite de points mesurés de proche en proche en topographie, ensuite compensée pour répartir les erreurs.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Topographie']], ['cheminements']);
G('Hydrologie', C11, "Étude de l'écoulement de l'eau (bassins versants, crues, érosion), souvent calculée à partir d'un MNT.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Hydrologie']], ['bassins versants', 'bassin versant']);
G('Biodiversité', C11, "Variété des espèces et des milieux vivants ; les inventaires naturalistes sont géolocalisés dans des bases comme celles de l'INPN.", [['INPN', 'https://inpn.mnhn.fr/']]);
G('Éclairage public', C11, "Parc de luminaires d'une collectivité, géré en SIG pour maintenance et économie d'énergie.", []);

/* ───────── Temps réel et capteurs ───────── */
var C12 = GLOSS_CATS[11];
G('IoT', C12, "Internet des objets : capteurs et équipements connectés qui envoient automatiquement des mesures (niveau d'eau, qualité de l'air, position).", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Internet_des_objets']], ['capteurs', 'capteur']);
G('MQTT', C12, "Protocole léger de messagerie publication/abonnement, standard de l'IoT.", [['mqtt.org', 'https://mqtt.org/']], ['Mosquitto', 'Node-RED']);
G('SCADA', C12, "Système de supervision et d'acquisition de données qui pilote à distance des installations industrielles (réseaux d'eau, d'électricité).", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Supervisory_Control_and_Data_Acquisition']]);
G('Série temporelle', C12, "Suite de mesures horodatées (température toutes les minutes). Les bases temporelles comme TimescaleDB les stockent et les interrogent efficacement.", [['Timescale', 'https://docs.timescale.com/']], ['séries temporelles', 'TimescaleDB']);
G('Géofencing', C12, "Zone virtuelle qui déclenche une alerte quand un véhicule ou un objet y entre ou en sort.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Geofencing']], ['géofence', 'géofences']);
G('Suivi de flotte', C12, "Localisation en temps réel de véhicules équipés de boîtiers GPS, avec historique de trajets.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Gestion_de_flotte']], ['flottes', 'flotte']);

/* ───────── Modèles économiques et exploitation ───────── */
var C13 = GLOSS_CATS[12];
G('Open source', C13, "Logiciel dont le code est public et réutilisable sous licence libre : pas de licence par utilisateur, mais le support et la maintenance sont à organiser (communauté ou prestataire).", [['Open Source Initiative', 'https://opensource.org/osd'], ['OSGeo', 'https://www.osgeo.org/']], ['logiciel libre', 'libre', 'open-source']);
G('SaaS', C13, "Logiciel en ligne par abonnement : rien à installer, hébergé et maintenu par l'éditeur (ArcGIS Online, Felt).", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Logiciel_en_tant_que_service']]);
G('PaaS', C13, "Plateforme en tant que service : l'hébergeur gère le serveur, vous déployez votre application (Clever Cloud, Render).", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Plate-forme_en_tant_que_service']]);
G('Dégressif', C13, "Tarif unitaire qui baisse avec le nombre de licences (ex. ArcGIS Pro : 820 € pour 1 licence, environ 580 € à partir de 10).", [], ['dégressifs', 'dégressive']);
G('Licence par utilisateur', C13, "Mode de facturation où chaque personne qui édite des données a sa licence, par opposition à un forfait serveur.", [], ['par utilisateur', 'licences']);
G('Infogérance', C13, "Administration de vos serveurs par un prestataire : mises à jour, sécurité, supervision et sauvegardes.", [['Wikipédia', 'https://fr.wikipedia.org/wiki/Infog%C3%A9rance']]);
G('Sauvegarde 3-2-1', C13, "Règle de sauvegarde : 3 copies des données, sur 2 supports différents, dont 1 hors site.", [['Wikipédia', 'https://en.wikipedia.org/wiki/Backup']], ['3-2-1']);
G('Sur devis', C13, "Prix non publié : l'éditeur ou son revendeur établit une offre selon le nombre d'utilisateurs et les options. Les montants affichés sont des ordres de grandeur.", [], ['indicatif']);
G('Palier', C13, "Niveau de budget annuel : Open Source (0 €), Starter, Professionnel, Avancé, Entreprise, Grande organisation. Chaque scénario s'inscrit dans la fourchette de son palier.", [], ['paliers']);
G('Support francophone', C13, "Documentation, assistance et formation en français : critère de sélection retenu dans le diagnostic (éditeurs ou intégrateurs français).", [], ['Support FR']);
G('Natif', C13, "Compatibilité directe : les deux briques échangent sans conversion ni passerelle.", []);
G('Via conversion', C13, "Compatibilité indirecte : échange par un format intermédiaire, un plugin ou un service OGC, avec une perte possible (styles, attributs).", [], ['Via conversion/OGC']);

/* ───────── Lire ce diagnostic ───────── */
GLOSS_CATS.push('Lire ce diagnostic');
var C14 = GLOSS_CATS[GLOSS_CATS.length - 1];
G('Spécificités métier', C14, "Particularités d'une brique pour votre corps de métier : modules et extensions utiles, formats et normes du secteur, contraintes d'usage. Le texte change selon le métier choisi dans le questionnaire.", [], ['Spécificités']);
G('Scénario', C14, "Architecture complète (logiciel, base, hébergement, publication, imagerie, terrain…) calculée pour un palier de budget. Le diagnostic en propose trois : celui qui correspond à votre fourchette et ses deux voisins.", [], ['scénarios']);
G('Fourchette', C14, "Intervalle de budget annuel que vous avez indiqué (ex. 1 000 – 5 000 €). Chaque scénario est ajusté pour y tenir, ou indique de combien il s'en écarte.", []);
G('Dépendance', C14, "Brique qui ne fonctionne qu'avec une autre. Exemple : Lizmap requiert QGIS et une base PostGIS ; Field Maps requiert ArcGIS Online ou Enterprise. Le diagnostic les ajoute et les chiffre automatiquement.", [], ['Requiert', 'dépendances']);
G('Inclus', C14, "Brique comprise dans le prix d'une autre (Experience Builder et Field Maps sont inclus dans ArcGIS Online Creator) : elle n'ajoute aucun coût.", [], ['Inclut']);
G('Limité', C14, "Compatibilité partielle : l'échange fonctionne pour certains usages (lecture seule, fonctions réduites).", []);
G('Non recommandé', C14, "Deux briques qui font double emploi ou ne s'intègrent pas : à ne pas cumuler.", []);
G('Exigences couvertes', C14, "Besoins que vous avez exprimés (ou impliqués par votre métier) et qui sont pris en charge par au moins une brique du scénario.", []);
G('Auto-hébergé', C14, "Logiciel installé sur un serveur que vous administrez (le vôtre ou loué chez un hébergeur), par opposition à un service en ligne géré par l'éditeur.", [], ['Serveur requis', 'auto-hébergeable', 'auto-hébergée']);
