/* ══════════════════════════════════════════════════════════════════
   ETL & API · BI · TEMPS RÉEL / IoT · SSO · SUPPORT
══════════════════════════════════════════════════════════════════ */

/* ───────── ETL, API & PASSERELLES ───────── */
B('etl','qgis_modeler',{
  n:'Modélisateur QGIS (Processing)', sub:'Automatisation graphique · gratuit', sv:2, fr:1, lvl:2, ms:0, pow:1,
  d:"Chaînes de traitement visuelles dans QGIS : reprojections, nettoyage, jointures, exports par lots, sans écrire de code.",
  f:'*3 geo4 pub4 bet4', tg:'etl', req:[['qgis']], img:'Qgis.png',
  sp:{ collectivite:"Chaînes récurrentes de mise à jour (cadastre, adresses, PLU) planifiables en lot.", geometre:"Normalisation de levés multi-sources, reprojection Lambert 93 / CC.", default:"ETL gratuit pour les formats usuels." }});
B('etl','gdal',{
  n:'Python / GDAL / OGR', sub:'Scripts sur mesure · gratuit', sv:2, fr:2, lvl:4, ms:0, pow:1,
  d:"Bibliothèque de référence de lecture/écriture de 200+ formats vectoriels et raster, pilotée en ligne de commande ou en Python.",
  f:'*2 sci5 bet4 net3', tg:'etl,api,big', link:'https://gdal.org',
  sp:{ etudiant:"Conversions reproductibles et pipelines de données pour la recherche.", energie:"Imports massifs de données réseaux et conversions GML/CityGML.", default:"ETL scriptable, gratuit et universel." }});
B('etl','fme',{
  n:'Safe FME', sub:'ETL géospatial professionnel', os:'WL', sv:2, fr:1, lvl:2, ms:0, pow:4,
  d:"Leader de la conversion et de l'intégration de données géospatiales (500+ formats, BIM/IFC, ERP, API). ≈ 3 500 €/an (indicatif).",
  p:3500, f:'*1 net4 pub3 btp4 geometre3 bet3 biz2', tg:'etl,erp,bim,api,dwg', link:'https://fme.safe.com',
  sp:{ btp:"Passerelles IFC/Revit ↔ SIG, échanges DWG ↔ PostGIS, validation de données BIM.", energie:"Synchronisation GMAO/SCADA ↔ SIG, flux nocturnes et surveillance d'erreurs.", collectivite:"Alimentation régulière du SIG (cadastre, état civil, urbanisme) avec contrôle qualité.", default:"Intégration de données sans code, support francophone via revendeurs." }});
B('etl','hale',{
  n:'HALE Studio / transformations INSPIRE', sub:'Open Source · harmonisation de données', sv:2, fr:2, lvl:3, ms:0, pow:1,
  d:"Outil d'harmonisation de schémas pour produire des jeux de données conformes INSPIRE et CityGML (wetransform).",
  f:'*0 pub5 sci3 env3', tg:'opendata,etl', link:'https://www.wetransform.to/products/halestudio/',
  sp:{ pub:"Transformation des jeux communaux en thèmes INSPIRE (bâtiments, parcelles, zonages).", default:"Conformité INSPIRE sans ETL commercial." }});
B('etl','postgrest',{
  n:'PostgREST / pg_featureserv (API REST spatiale)', sub:'Open Source · API sur PostGIS', host:true, sv:2, fr:2, lvl:4, ms:2, pow:1,
  d:"Expose votre base PostGIS en API REST/OGC API Features sans développement : requêtes filtrées, GeoJSON, droits par rôle.",
  f:'*1 bet4 net3 sci3 biz3', tg:'api,erp,etl', req:[['postgis']], link:'https://postgrest.org',
  sp:{ geomarketing:"Alimentation d'applications commerciales et de CRM avec zones géographiques.", default:"Passerelle API légère vers ERP/CRM et applications web." }});

/* ───────── BI & TABLEAUX DE BORD ───────── */
B('bi','metabase',{ xg:'bitool',
  n:'Metabase', sub:'Open Source · BI simple, cartes PostGIS', host:true, sv:2, fr:1, lvl:2, ms:2, pow:1,
  d:"BI open source facile : tableaux de bord et questions en clic, connecté à PostGIS, SQL Server, etc. (auto-hébergé gratuit).",
  f:'*2 pub3 bet4 biz4 net3', tg:'bi', link:'https://www.metabase.com',
  sp:{ collectivite:"Tableaux de bord décisionnels pour élus et directions, données SIG + finances.", default:"BI libre pour partager des indicateurs spatiaux." }});
B('bi','superset',{ xg:'bitool',
  n:'Apache Superset', sub:'Open Source · BI avancée, cartes deck.gl', host:true, sv:2, fr:2, lvl:3, ms:2, pow:2,
  d:"Plateforme BI open source puissante : SQL Lab, cartes deck.gl, rôles fins, très gros volumes.",
  f:'*1 net4 sci4 bet4 biz4', tg:'bi,big,sso', link:'https://superset.apache.org',
  sp:{ transport:"Analyse de trajectoires et séries de ponctualité sur gros volumes.", energie:"Indicateurs de qualité de service croisant SIG et SCADA.", default:"BI libre puissante avec SSO et rôles." }});
B('bi','grafana',{
  n:'Grafana', sub:'Open Source · supervision & temps réel', host:true, sv:2, fr:2, lvl:3, ms:2, pow:2,
  d:"Tableaux de bord de supervision temps réel (capteurs, flottes), carte géographique, alertes ; se branche à PostgreSQL/TimescaleDB, InfluxDB.",
  f:'*1 net5 pub2 bet3', tg:'bi,iot', link:'https://grafana.com',
  sp:{ energie:"Supervision de capteurs de réseau et d'alarmes en temps réel.", transport:"Suivi de flotte et de la qualité de service avec alertes.", default:"Visualisation de séries temporelles et capteurs géolocalisés." }});
B('bi','power_bi',{ xg:'bitool',
  n:'Power BI (+ cartes ArcGIS)', sub:'Microsoft · BI d\'entreprise', os:'W', sv:0, fr:1, lvl:2, ms:0, pow:3, cloud:true,
  d:"BI Microsoft intégrée à M365 et Azure ; visuels cartographiques (Azure Maps, ArcGIS for Power BI). ≈ 144 €/utilisateur/an (Pro).",
  p:{u:[[1,144]]}, f:'*2 biz5 bet3 net3 pub2', tg:'bi,erp,sso', si:'m365,azure', link:'https://powerbi.microsoft.com/fr-fr/',
  sp:{ geomarketing:"Croisement ventes ↔ territoires, cartes de chaleur et indicateurs de réseau.", immobilier:"Tableaux de bord de portefeuille avec cartes.", default:"BI Microsoft ; cartes via ArcGIS for Power BI." }});
B('bi','tableau',{ xg:'bitool',
  n:'Tableau', sub:'Salesforce · BI visuelle avancée', os:'WM', sv:0, fr:1, lvl:2, ms:0, pow:4, cloud:true,
  d:"BI visuelle avancée avec cartes (Mapbox, spatial files) ; connecteurs ERP/CRM. ≈ 840 €/utilisateur/an (Creator, indicatif).",
  p:{u:[[1,840]]}, f:'*0 biz4 net3 bet2', tg:'bi,erp', link:'https://www.tableau.com/fr-fr',
  sp:{ geomarketing:"Visualisation fine des performances magasins sur fond cartographique.", default:"BI haut de gamme avec cartes ; coût par utilisateur élevé." }});

/* ───────── TEMPS RÉEL / IoT ───────── */
B('iot','timescale_mqtt',{ xg:'iotplat',
  n:'TimescaleDB + MQTT (Mosquitto / Node-RED)', sub:'Open Source · séries temporelles & capteurs', host:true, sv:2, fr:2, lvl:4, ms:2, pow:2,
  d:"Extension PostgreSQL pour les séries temporelles couplée à un broker MQTT : ingestion de capteurs, GPS et SCADA directement dans PostGIS.",
  f:'*1 net5 sci3 env3 bet2', tg:'iot,big,api', req:[['postgis']], link:'https://www.timescale.com',
  sp:{ energie:"Collecte de télémesures de réseau, historisation et exposition à Grafana/GeoServer.", transport:"Positions de véhicules et événements en flux continu.", bet_env:"Stations de mesure (qualité de l'air, hydrométrie) en continu.", default:"Pile temps réel libre, intégrée à PostGIS." }});
B('iot','traccar',{
  n:'Traccar', sub:'Open Source · suivi GPS de flottes', host:true, sv:2, fr:2, lvl:3, ms:2, pow:1,
  d:"Serveur de suivi GPS compatible 200+ protocoles/boîtiers : positions, trajets, géofencing, alertes ; API REST.",
  f:'*0 transport5 net3 agriculture2', tg:'iot,api', link:'https://www.traccar.org',
  sp:{ transport:"Suivi de véhicules, géofences, rapports de trajets et de vitesse.", agriculture:"Suivi d'engins agricoles et d'équipes terrain.", default:"Suivi GPS gratuit et ouvert." }});
B('iot','thingsboard',{ xg:'iotplat',
  n:'ThingsBoard', sub:'IoT Platform · Community gratuite', host:true, sv:2, fr:2, lvl:4, ms:2, pow:2,
  d:"Plateforme IoT open source (Community) : devices, règles, tableaux de bord et cartes ; Professional Edition payante.",
  f:'*0 net4 transport3 env3', tg:'iot,bi,api', link:'https://thingsboard.io',
  sp:{ default:"Gestion de parc de capteurs et alertes avec cartes embarquées." }});
B('iot','arcgis_geoevent',{ xg:'iotplat',
  n:'ArcGIS GeoEvent Server', sub:'Esri · flux temps réel', sv:2, fr:1, lvl:3, ms:2, pow:4,
  d:"Extension temps réel d'ArcGIS Enterprise : ingestion de flux (GPS, MQTT, Kafka), géofencing, alertes. ≈ 7 000 €/an (indicatif).",
  p:7000, f:'*0 net5 pub2', tg:'iot,portal', req:[['arcgis_ent']], host:true, si:'arcgis_si', link:'https://www.esri.com/fr-fr',
  sp:{ energie:"Suivi temps réel d'équipes, incidents et capteurs de réseau dans l'Utility Network.", transport:"Suivi de flotte et notifications de retard intégrés aux dashboards.", default:"Temps réel intégré à Esri." }});
B('iot','azure_iot',{ xg:'iotplat',
  n:'Azure IoT Hub + Stream Analytics', sub:'Microsoft · IoT cloud', sv:1, fr:1, lvl:3, ms:1, pow:3, cloud:true,
  d:"Ingestion et traitement de flux IoT dans Azure, avec Event Hubs et Stream Analytics ; ≈ 240 à 4 800 €/an selon volume.",
  p:{v:[240,1200,4800]}, f:'*0 net4 transport4', tg:'iot,sso,bi', si:'azure', req:[['azure']], link:'https://azure.microsoft.com/fr-fr/products/iot-hub',
  sp:{ default:"Passerelle capteurs → cloud Azure → PostGIS/Power BI." }});

/* ───────── AUTHENTIFICATION & SSO ───────── */
B('securite','ldap',{
  n:'Annuaire LDAP / Active Directory existant', sub:'Intégration à votre annuaire', sv:2, fr:1, lvl:2, ms:1, pow:1,
  d:"Authentification des utilisateurs via l'annuaire interne déjà en place (Lizmap, GeoServer, ArcGIS Enterprise, Metabase le supportent nativement).",
  f:'*3 pub5 net4 bet3', tg:'sso', si:'on_premise,azure,m365',
  sp:{ collectivite:"Connexion unique avec l'AD de la collectivité, droits par services.", default:"Comptes centralisés sans coût de licence." }});
B('securite','keycloak',{
  n:'Keycloak (SSO open source)', sub:'Open Source · SAML / OIDC', host:true, sv:2, fr:1, lvl:3, ms:2, pow:2,
  d:"Fournisseur d'identité libre (SAML 2.0, OpenID Connect, LDAP) pour fédérer QGIS Server/Lizmap/GeoServer/Metabase sans éditeur.",
  f:'*2 pub4 net4 bet3', tg:'sso,api', link:'https://www.keycloak.org',
  sp:{ default:"SSO souverain et gratuit ; nécessite un serveur et de l'administration." }});
B('securite','entra_id',{
  n:'Microsoft Entra ID (Azure AD)', sub:'Microsoft · SSO cloud', sv:0, fr:1, lvl:2, ms:0, pow:3, cloud:true,
  d:"SSO Microsoft : inclus avec M365, ou ≈ 62 €/utilisateur/an (P1) pour l'accès conditionnel et le MFA avancé.",
  p:{u:[[1,62]]}, f:'*1 net3 pub3 bet3', tg:'sso', si:'azure,m365', link:'https://www.microsoft.com/fr-fr/security/business/identity-access/microsoft-entra-id',
  sp:{ default:"Idéal si M365/Azure sont déjà en place ; ArcGIS Enterprise/Online le supportent nativement." }});

/* ───────── SUPPORT, MAINTENANCE & SAUVEGARDE ───────── */
B('support','support_oss',{
  n:'Contrat de support open source (Oslandia / 3Liz / OPENGIS.ch / Camptocamp)', sub:'Support francophone expert · QGIS, PostGIS, Lizmap', sv:2, fr:1, lvl:1, ms:0, pow:3,
  d:"Support, formation à la demande et développements pour la pile QGIS + PostGIS + Lizmap/GeoServer par des éditeurs/intégrateurs français et suisses. ≈ 2 500 €/an (forfait indicatif).",
  p:2500, f:'*2 pub5 bet4 geo3 net3', tg:'', link:'https://oslandia.com',
  sp:{ collectivite:"Garantie de maintenance de la pile open source pour la DSI, avec engagement de réponse.", geometre:"Dépannage QGIS/QField, plugins métier et automatisation de livrables.", default:"Support de niveau 2 sur l'open source, remplaçant la maintenance éditeur." }});
B('support','infogerance',{
  n:'Infogérance du serveur SIG (administration déléguée)', sub:'Prestataire · mises à jour, sauvegardes, supervision', sv:1, fr:1, lvl:1, ms:0, pow:3,
  d:"Un prestataire administre votre serveur (PostGIS, QGIS Server, Lizmap/GeoServer, sécurité, mises à jour) : idéal sans admin système. ≈ 3 600 €/an (indicatif).",
  p:3600, f:'*2 geo3 bet3 pub3 env3', tg:'',
  sp:{ default:"Supprime la contrainte d'administration Linux ; indispensable si « zéro maintenance » mais serveur auto-hébergé." }});
B('support','backup',{ 
  n:'Sauvegarde externalisée chiffrée (S3 / Restic)', sub:'Plan de reprise · 3-2-1', sv:2, fr:2, lvl:2, ms:1, pow:1,
  d:"Sauvegarde automatique chiffrée hors site de PostGIS, projets QGIS et fichiers lourds ; ≈ 120 €/an.",
  p:120, f:'*2', tg:'',
  sp:{ default:"Règle 3-2-1 : copies locale, distante et immuable." }});
