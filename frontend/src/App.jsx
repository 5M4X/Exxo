import { useEffect, useRef, useState } from 'react'
import esFlag from 'flag-icons/flags/4x3/es.svg'
import frFlag from 'flag-icons/flags/4x3/fr.svg'
import gbFlag from 'flag-icons/flags/4x3/gb.svg'
import grFlag from 'flag-icons/flags/4x3/gr.svg'
import luFlag from 'flag-icons/flags/4x3/lu.svg'

const menuLinks = [
  { href: '#accueil', number: '01' },
  { href: '#expertises', number: '02' },
  { href: '#methode', number: '03' },
  { href: '#a-propos', number: '04' },
  { href: '#contact', number: '05' },
]

const languages = [
  { code: 'fr', label: 'Français', flag: frFlag },
  { code: 'en', label: 'English', flag: gbFlag },
  { code: 'lb', label: 'Lëtzebuergesch', flag: luFlag },
  { code: 'es', label: 'Español', flag: esFlag },
  { code: 'el', label: 'Ελληνικά', flag: grFlag },
]

const translations = {
  fr: {
    menuItems: ['Accueil', 'Expertises', 'Méthode', 'À propos', 'Contact'],
    tickerTopics: ['CONSEIL EN ENTREPRISE', 'GOUVERNANCE DE LA DONNÉE', 'QUALITÉ & FIABILITÉ DES DONNÉES', 'IA GÉNÉRATIVE & AUTOMATISATION', 'STRATÉGIE DATA', 'CONFORMITÉ & IA RESPONSABLE'],
    expertises: [
      { id: 'data', number: '01', title: 'Data & Business Intelligence', short: 'Des données lisibles, fiables et utiles à chaque décision.', detail: 'Analyse, nettoyage, visualisation, tableaux de bord et modèles prédictifs : nous transformons vos données brutes en leviers de croissance concrets.', tags: ['Dashboard', 'Data science', 'Prédictif'], accent: 'mint', symbol: '◉' },
      { id: 'ia', number: '02', title: 'IA & automatisation', short: 'L’intelligence artificielle au service de vos vrais usages.', detail: 'Nous identifions les tâches qui méritent d’être automatisées et développons des outils IA simples à adopter, sécurisés et intégrés à votre activité.', tags: ['IA générative', 'Agents', 'Automatisation'], accent: 'lavender', symbol: '✦' },
      { id: 'digital', number: '03', title: 'Produits digitaux', short: 'Des applications et expériences web pensées pour durer.', detail: 'Du prototype au produit métier, nous concevons des interfaces modernes, performantes et évolutives — toujours ajustées à vos besoins.', tags: ['Web apps', 'MVP', 'UX / UI'], accent: 'coral', symbol: '↗' },
      { id: 'conseil', number: '04', title: 'Conseil & sobriété', short: 'Une transformation numérique maîtrisée et responsable.', detail: 'Architecture, optimisation, sécurité et réduction de l’impact environnemental : nous vous aidons à choisir moins de complexité, mais plus de valeur.', tags: ['Audit', 'Stratégie', 'Green IT'], accent: 'lime', symbol: '⌁' },
    ],
    processSteps: [
      { number: '01', title: 'Comprendre', text: 'Un échange direct pour cadrer le problème, les utilisateurs et le résultat attendu.' },
      { number: '02', title: 'Construire', text: 'Un premier prototype rapidement testable, enrichi avec vos retours et vos données.' },
      { number: '03', title: 'Faire grandir', text: 'Une solution robuste, documentée et accompagnée dans la durée lorsque vous évoluez.' },
    ],
    aria: { home: 'Retour à l’accueil EXXO Techs', nav: 'Navigation principale', language: 'Choisir la langue', openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu', heroVisual: 'Illustration de solutions Data et Intelligence Artificielle', ticker: 'Domaines d’expertise', commitments: 'Nos engagements', close: 'Fermer' },
    side: { prompt: 'Un projet en tête ?', link: 'Parlons-en' },
    hero: { eyebrow: 'Data · IA · Produit digital', title: ['Donnez de l’élan', 'à vos idées.'], intro: 'EXXO Techs transforme vos données et vos ambitions en solutions numériques utiles, intelligentes et prêtes à grandir avec vous.', primary: 'Démarrer un projet', secondary: 'Découvrir nos expertises', reply: 'pour une première réponse', bespoke: 'de solutions sur mesure', explore: 'Explorer', signal: 'De la donnée à la décision.', metric: 'de temps gagné', usefulAi: 'IA utile', automate: 'Automatiser sans complexifier', humanFirst: 'Humain d’abord', tailored: 'La tech à votre mesure' },
    expertise: { kicker: 'Nos expertises', heading: ['Vos enjeux,', 'notre terrain de jeu.'], intro: 'Nous réunissons la Data, l’IA et le développement produit pour créer des solutions qui font vraiment avancer votre activité.', label: 'EXPERTISE' },
    commitments: [
      { value: '100', suffix: '%', title: 'Sur mesure', text: 'Chaque solution part de votre besoin, jamais d’un modèle générique.' },
      { value: '24', suffix: 'h', title: 'Réactivité', text: 'Une première réponse rapide et un interlocuteur réellement disponible.' },
      { value: '360', suffix: '°', title: 'Vision globale', text: 'Stratégie, données, design et technologie réunis dans la même équipe.' },
    ],
    method: { kicker: 'Notre méthode', heading: ['Avancer vite.', 'Construire juste.'], intro: 'Une collaboration directe, des étapes lisibles et des résultats visibles dès les premières semaines.', link: 'Parler de votre projet' },
    about: { kicker: 'EXXO Techs', heading: ['Petite structure.', 'Grande curiosité.'], lead: 'EXXO Techs est une entreprise technologique indépendante basée à Bertrange, au Luxembourg.', text: 'Nous accompagnons entrepreneurs, professions libérales et entreprises avec une approche à la fois créative, pragmatique et responsable. Notre laboratoire explore de nouveaux usages ; notre expérience les transforme en solutions fiables.', values: ['Innovation utile', 'Relation directe', 'Numérique responsable'], logoAlt: 'Symbole EXXO', planets: ['DATA', 'IA', 'WEB', 'GOUVERNANCE', 'STRATÉGIE'] },
    contact: { heading: ['Votre prochain projet', 'commence ici.'], intro: 'Une idée, une donnée à valoriser ou un processus à réinventer ? Écrivez-nous. Nous vous répondons sous 24 heures.', subject: 'Parlons de mon projet', phone: 'TÉLÉPHONE', address: 'ADRESSE', availability: 'DISPONIBILITÉ', status: 'Nouveaux projets — 2026' },
    footer: { description: 'Data, IA & produits digitaux — Luxembourg', privacy: 'Vie privée' },
    privacy: { title: 'Vos données restent les vôtres.', text: 'Ce site n’utilise que les données strictement nécessaires à son bon fonctionnement et, le cas échéant, à la mesure anonyme de son audience. Nous ne collectons aucune autre information personnelle via cette page.', note: 'Si nos usages évoluent, vous en serez informé et pourrez choisir les données que vous souhaitez partager.', link: 'Une question ? Contactez-nous' },
  },
  en: {
    menuItems: ['Home', 'Expertise', 'Approach', 'About', 'Contact'],
    tickerTopics: ['BUSINESS CONSULTING', 'DATA GOVERNANCE', 'DATA QUALITY & RELIABILITY', 'GENERATIVE AI & AUTOMATION', 'DATA STRATEGY', 'COMPLIANCE & RESPONSIBLE AI'],
    expertises: [
      { id: 'data', number: '01', title: 'Data & Business Intelligence', short: 'Clear, reliable data that supports every decision.', detail: 'Analysis, cleansing, visualisation, dashboards and predictive models: we turn raw data into practical growth drivers.', tags: ['Dashboards', 'Data science', 'Predictive'], accent: 'mint', symbol: '◉' },
      { id: 'ia', number: '02', title: 'AI & automation', short: 'Artificial intelligence built around real-world needs.', detail: 'We identify the tasks worth automating and develop AI tools that are easy to adopt, secure and integrated into your operations.', tags: ['Generative AI', 'Agents', 'Automation'], accent: 'lavender', symbol: '✦' },
      { id: 'digital', number: '03', title: 'Digital products', short: 'Web applications and experiences designed to last.', detail: 'From prototype to business product, we design modern, high-performing and scalable interfaces — always tailored to your needs.', tags: ['Web apps', 'MVP', 'UX / UI'], accent: 'coral', symbol: '↗' },
      { id: 'conseil', number: '04', title: 'Consulting & efficiency', short: 'A responsible, well-managed digital transformation.', detail: 'Architecture, optimisation, security and reduced environmental impact: we help you choose less complexity and more value.', tags: ['Audit', 'Strategy', 'Green IT'], accent: 'lime', symbol: '⌁' },
    ],
    processSteps: [
      { number: '01', title: 'Understand', text: 'A direct conversation to frame the challenge, the users and the expected outcome.' },
      { number: '02', title: 'Build', text: 'A first prototype that can be tested quickly, enriched with your feedback and data.' },
      { number: '03', title: 'Grow', text: 'A robust, documented solution supported over time as your organisation evolves.' },
    ],
    aria: { home: 'Back to EXXO Techs home', nav: 'Main navigation', language: 'Choose language', openMenu: 'Open menu', closeMenu: 'Close menu', heroVisual: 'Illustration of Data and Artificial Intelligence solutions', ticker: 'Areas of expertise', commitments: 'Our commitments', close: 'Close' },
    side: { prompt: 'Have a project in mind?', link: 'Let’s talk' },
    hero: { eyebrow: 'Data · AI · Digital product', title: ['Give momentum', 'to your ideas.'], intro: 'EXXO Techs turns your data and ambitions into useful, intelligent digital solutions that are ready to grow with you.', primary: 'Start a project', secondary: 'Explore our expertise', reply: 'for an initial response', bespoke: 'tailored solutions', explore: 'Explore', signal: 'From data to decisions.', metric: 'time saved', usefulAi: 'Useful AI', automate: 'Automate without adding complexity', humanFirst: 'People first', tailored: 'Technology on your terms' },
    expertise: { kicker: 'Our expertise', heading: ['Your challenges,', 'our playground.'], intro: 'We bring together Data, AI and product development to create solutions that truly move your business forward.', label: 'EXPERTISE' },
    commitments: [
      { value: '100', suffix: '%', title: 'Tailored', text: 'Every solution starts with your needs, never with a generic template.' },
      { value: '24', suffix: 'h', title: 'Responsive', text: 'A fast initial response and a genuinely available point of contact.' },
      { value: '360', suffix: '°', title: 'Full perspective', text: 'Strategy, data, design and technology brought together in one team.' },
    ],
    method: { kicker: 'Our approach', heading: ['Move fast.', 'Build right.'], intro: 'A direct collaboration, clear steps and visible results from the very first weeks.', link: 'Talk about your project' },
    about: { kicker: 'EXXO Techs', heading: ['Small team.', 'Big curiosity.'], lead: 'EXXO Techs is an independent technology company based in Bertrange, Luxembourg.', text: 'We support entrepreneurs, professionals and companies with an approach that is creative, pragmatic and responsible. Our lab explores new possibilities; our experience turns them into reliable solutions.', values: ['Useful innovation', 'Direct relationship', 'Responsible digital'], logoAlt: 'EXXO symbol', planets: ['DATA', 'AI', 'WEB', 'GOVERNANCE', 'STRATEGY'] },
    contact: { heading: ['Your next project', 'starts here.'], intro: 'An idea, data to unlock or a process to reinvent? Get in touch. We will respond within 24 hours.', subject: 'Let’s discuss my project', phone: 'PHONE', address: 'ADDRESS', availability: 'AVAILABILITY', status: 'New projects — 2026' },
    footer: { description: 'Data, AI & digital products — Luxembourg', privacy: 'Privacy' },
    privacy: { title: 'Your data remains yours.', text: 'This website uses only the data strictly necessary for its operation and, where applicable, anonymous audience measurement. We do not collect any other personal information through this website.', note: 'If our practices change, you will be informed and able to choose which data you wish to share.', link: 'Questions? Contact us' },
  },
  lb: {
    menuItems: ['Startsäit', 'Expertise', 'Aarbechtsweis', 'Iwwer eis', 'Kontakt'],
    tickerTopics: ['ENTREPRISESBERODUNG', 'DATEN-GOVERNANCE', 'DATENQUALITÉIT & ZOUVERLÄSSEGKEET', 'GENERATIV KI & AUTOMATISÉIERUNG', 'DATESTRATEGIE', 'COMPLIANCE & RESPONSABEL KI'],
    expertises: [
      { id: 'data', number: '01', title: 'Data & Business Intelligence', short: 'Kloer an zouverlässeg Daten, déi all Entscheedung ënnerstëtzen.', detail: 'Analyse, Bereinegung, Visualiséierung, Dashboards a Prognosemodeller: mir maachen aus Äre réien Daten konkret Wuesstemsméiglechkeeten.', tags: ['Dashboards', 'Data science', 'Prognosen'], accent: 'mint', symbol: '◉' },
      { id: 'ia', number: '02', title: 'KI & Automatiséierung', short: 'Kënschtlech Intelligenz fir Är reell Besoinen.', detail: 'Mir identifizéieren Aufgaben, déi et wäert sinn ze automatiséieren, an entwéckele sécher KI-Tools, déi einfach an Ären Alldag integréiert kënne ginn.', tags: ['Generativ KI', 'Agenten', 'Automatiséierung'], accent: 'lavender', symbol: '✦' },
      { id: 'digital', number: '03', title: 'Digital Produiten', short: 'Webapplikatiounen an Erfarungen, déi op Dauer geduecht sinn.', detail: 'Vum Prototyp bis zum Business-Produit entwéckele mir modern, performant a skaléierbar Interface-Léisungen — ëmmer op Är Besoinen zougeschnidden.', tags: ['Web apps', 'MVP', 'UX / UI'], accent: 'coral', symbol: '↗' },
      { id: 'conseil', number: '04', title: 'Berodung & Effizienz', short: 'Eng kontrolléiert a responsabel digital Transformatioun.', detail: 'Architektur, Optimiséierung, Sécherheet an e méi klengen Ëmweltimpakt: mir hëllefen Iech, manner Komplexitéit a méi Wäert ze wielen.', tags: ['Audit', 'Strategie', 'Green IT'], accent: 'lime', symbol: '⌁' },
    ],
    processSteps: [
      { number: '01', title: 'Verstoen', text: 'En direkten Austausch, fir de Problem, d’Benotzer an dat erwaart Resultat kloer ze definéieren.' },
      { number: '02', title: 'Bauen', text: 'En éischte Prototyp, dee séier getest a mat Ärem Feedback an Ären Daten verbessert gëtt.' },
      { number: '03', title: 'Weiderentwéckelen', text: 'Eng robust, dokumentéiert Léisung, déi laangfristeg mat Iech matwiisst.' },
    ],
    aria: { home: 'Zréck op d’Startsäit vun EXXO Techs', nav: 'Haaptnavigatioun', language: 'Sprooch auswielen', openMenu: 'Menü opmaachen', closeMenu: 'Menü zoumaachen', heroVisual: 'Illustratioun vun Daten- a KI-Léisungen', ticker: 'Expertiseberäicher', commitments: 'Eis Engagementer', close: 'Zoumaachen' },
    side: { prompt: 'Hutt Dir e Projet am Kapp?', link: 'Schwätze mir doriwwer' },
    hero: { eyebrow: 'Daten · KI · Digitalt Produkt', title: ['Gitt Ären Iddien', 'neie Schwong.'], intro: 'EXXO Techs verwandelt Är Daten an Ambitiounen an nëtzlech, intelligent digital Léisungen, déi mat Iech wuessen.', primary: 'E Projet starten', secondary: 'Eis Expertise entdecken', reply: 'fir eng éischt Äntwert', bespoke: 'Moossléisungen', explore: 'Entdecken', signal: 'Vun Daten zu Entscheedungen.', metric: 'Zäit gespuert', usefulAi: 'Nëtzlech KI', automate: 'Automatiséieren ouni Komplexitéit', humanFirst: 'De Mënsch als éischt', tailored: 'Technologie op Är Mooss' },
    expertise: { kicker: 'Eis Expertise', heading: ['Är Erausfuerderungen,', 'eist Spillfeld.'], intro: 'Mir verbannen Daten, KI a Produktentwécklung, fir Léisungen ze schafen, déi Äert Geschäft wierklech weiderbréngen.', label: 'EXPERTISE' },
    commitments: [
      { value: '100', suffix: '%', title: 'Op Mooss', text: 'All Léisung fänkt bei Ärem Besoin un, ni bei engem generesche Modell.' },
      { value: '24', suffix: 'h', title: 'Reaktiounsfäeg', text: 'Eng séier éischt Äntwert an eng Persoun, déi wierklech fir Iech do ass.' },
      { value: '360', suffix: '°', title: 'Ganzheetlech Vue', text: 'Strategie, Daten, Design an Technologie an engem Team vereent.' },
    ],
    method: { kicker: 'Eis Aarbechtsweis', heading: ['Séier virukommen.', 'Richteg bauen.'], intro: 'Eng direkt Zesummenaarbecht, kloer Etappen a siichtbar Resultater vun den éischte Wochen un.', link: 'Iwwer Äre Projet schwätzen' },
    about: { kicker: 'EXXO Techs', heading: ['Klengt Team.', 'Grouss Virwëtzegkeet.'], lead: 'EXXO Techs ass eng onofhängeg Technologiefirma zu Bartreng, Lëtzebuerg.', text: 'Mir begleeden Entrepreneuren, Fräiberuffler an Entreprisë mat enger kreativer, pragmatescher a responsabeler Approche. Eise Lab exploréiert nei Méiglechkeeten; eis Erfarung mécht zouverlässeg Léisungen doraus.', values: ['Nëtzlech Innovatioun', 'Direkte Kontakt', 'Responsabel Digitaliséierung'], logoAlt: 'EXXO-Symbol', planets: ['DATEN', 'KI', 'WEB', 'GOUVERNANCE', 'STRATEGIE'] },
    contact: { heading: ['Ären nächste Projet', 'fänkt hei un.'], intro: 'Eng Iddi, Daten déi Dir notze wëllt oder e Prozess fir nei ze denken? Schreift eis. Mir äntweren Iech bannent 24 Stonnen.', subject: 'Schwätze mir iwwer mäi Projet', phone: 'TELEFON', address: 'ADRESS', availability: 'DISPONIBILITÉIT', status: 'Nei Projeten — 2026' },
    footer: { description: 'Daten, KI & digital Produiten — Lëtzebuerg', privacy: 'Dateschutz' },
    privacy: { title: 'Är Date bleiwen Är.', text: 'Dëse Site benotzt nëmmen déi Daten, déi fir säi Fonctionnement strikt néideg sinn an, wann zoutreffend, fir eng anonym Publikumsmiessung. Mir sammele keng aner perséinlech Informatioun iwwer dëse Site.', note: 'Wann eis Praktike sech änneren, gitt Dir informéiert a kënnt entscheeden, wéi eng Daten Dir deele wëllt.', link: 'Eng Fro? Kontaktéiert eis' },
  },
  es: {
    menuItems: ['Inicio', 'Especialidades', 'Método', 'Nosotros', 'Contacto'],
    tickerTopics: ['CONSULTORÍA EMPRESARIAL', 'GOBIERNO DEL DATO', 'CALIDAD Y FIABILIDAD DE LOS DATOS', 'IA GENERATIVA Y AUTOMATIZACIÓN', 'ESTRATEGIA DE DATOS', 'CUMPLIMIENTO E IA RESPONSABLE'],
    expertises: [
      { id: 'data', number: '01', title: 'Datos y Business Intelligence', short: 'Datos claros, fiables y útiles para cada decisión.', detail: 'Análisis, limpieza, visualización, cuadros de mando y modelos predictivos: transformamos sus datos brutos en palancas concretas de crecimiento.', tags: ['Dashboards', 'Data science', 'Predicción'], accent: 'mint', symbol: '◉' },
      { id: 'ia', number: '02', title: 'IA y automatización', short: 'Inteligencia artificial al servicio de necesidades reales.', detail: 'Identificamos las tareas que merece la pena automatizar y desarrollamos herramientas de IA seguras, fáciles de adoptar e integradas en su actividad.', tags: ['IA generativa', 'Agentes', 'Automatización'], accent: 'lavender', symbol: '✦' },
      { id: 'digital', number: '03', title: 'Productos digitales', short: 'Aplicaciones y experiencias web diseñadas para durar.', detail: 'Del prototipo al producto empresarial, diseñamos interfaces modernas, eficaces y escalables, siempre adaptadas a sus necesidades.', tags: ['Web apps', 'MVP', 'UX / UI'], accent: 'coral', symbol: '↗' },
      { id: 'conseil', number: '04', title: 'Consultoría y eficiencia', short: 'Una transformación digital controlada y responsable.', detail: 'Arquitectura, optimización, seguridad y reducción del impacto ambiental: le ayudamos a elegir menos complejidad y más valor.', tags: ['Auditoría', 'Estrategia', 'Green IT'], accent: 'lime', symbol: '⌁' },
    ],
    processSteps: [
      { number: '01', title: 'Comprender', text: 'Una conversación directa para definir el problema, los usuarios y el resultado esperado.' },
      { number: '02', title: 'Construir', text: 'Un primer prototipo que puede probarse rápidamente y enriquecerse con sus comentarios y datos.' },
      { number: '03', title: 'Crecer', text: 'Una solución sólida, documentada y acompañada a largo plazo a medida que evoluciona.' },
    ],
    aria: { home: 'Volver al inicio de EXXO Techs', nav: 'Navegación principal', language: 'Elegir idioma', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú', heroVisual: 'Ilustración de soluciones de Datos e Inteligencia Artificial', ticker: 'Áreas de especialización', commitments: 'Nuestros compromisos', close: 'Cerrar' },
    side: { prompt: '¿Tiene un proyecto en mente?', link: 'Hablemos' },
    hero: { eyebrow: 'Datos · IA · Producto digital', title: ['Dé impulso', 'a sus ideas.'], intro: 'EXXO Techs transforma sus datos y ambiciones en soluciones digitales útiles, inteligentes y preparadas para crecer con usted.', primary: 'Iniciar un proyecto', secondary: 'Descubrir nuestras especialidades', reply: 'para una primera respuesta', bespoke: 'soluciones a medida', explore: 'Explorar', signal: 'De los datos a las decisiones.', metric: 'de tiempo ahorrado', usefulAi: 'IA útil', automate: 'Automatizar sin añadir complejidad', humanFirst: 'Las personas primero', tailored: 'Tecnología a su medida' },
    expertise: { kicker: 'Nuestras especialidades', heading: ['Sus retos,', 'nuestro terreno de juego.'], intro: 'Unimos Datos, IA y desarrollo de producto para crear soluciones que hacen avanzar realmente su actividad.', label: 'ESPECIALIDAD' },
    commitments: [
      { value: '100', suffix: '%', title: 'A medida', text: 'Cada solución parte de sus necesidades, nunca de un modelo genérico.' },
      { value: '24', suffix: 'h', title: 'Agilidad', text: 'Una primera respuesta rápida y un interlocutor realmente disponible.' },
      { value: '360', suffix: '°', title: 'Visión global', text: 'Estrategia, datos, diseño y tecnología reunidos en un mismo equipo.' },
    ],
    method: { kicker: 'Nuestro método', heading: ['Avanzar rápido.', 'Construir bien.'], intro: 'Una colaboración directa, etapas claras y resultados visibles desde las primeras semanas.', link: 'Hablar de su proyecto' },
    about: { kicker: 'EXXO Techs', heading: ['Equipo pequeño.', 'Gran curiosidad.'], lead: 'EXXO Techs es una empresa tecnológica independiente con sede en Bertrange, Luxemburgo.', text: 'Acompañamos a emprendedores, profesionales y empresas con un enfoque creativo, pragmático y responsable. Nuestro laboratorio explora nuevos usos; nuestra experiencia los convierte en soluciones fiables.', values: ['Innovación útil', 'Relación directa', 'Digital responsable'], logoAlt: 'Símbolo de EXXO', planets: ['DATOS', 'IA', 'WEB', 'GOBERNANZA', 'ESTRATEGIA'] },
    contact: { heading: ['Su próximo proyecto', 'empieza aquí.'], intro: '¿Una idea, datos que aprovechar o un proceso que reinventar? Escríbanos. Le responderemos en menos de 24 horas.', subject: 'Hablemos de mi proyecto', phone: 'TELÉFONO', address: 'DIRECCIÓN', availability: 'DISPONIBILIDAD', status: 'Nuevos proyectos — 2026' },
    footer: { description: 'Datos, IA y productos digitales — Luxemburgo', privacy: 'Privacidad' },
    privacy: { title: 'Sus datos siguen siendo suyos.', text: 'Este sitio solo utiliza los datos estrictamente necesarios para su funcionamiento y, cuando corresponde, para la medición anónima de la audiencia. No recopilamos ninguna otra información personal a través de esta página.', note: 'Si nuestras prácticas cambian, se lo comunicaremos y podrá elegir qué datos desea compartir.', link: '¿Alguna pregunta? Contáctenos' },
  },
  el: {
    menuItems: ['Αρχική', 'Εξειδίκευση', 'Μέθοδος', 'Σχετικά με εμάς', 'Επικοινωνία'],
    tickerTopics: ['ΕΠΙΧΕΙΡΗΜΑΤΙΚΗ ΣΥΜΒΟΥΛΕΥΤΙΚΗ', 'ΔΙΑΚΥΒΕΡΝΗΣΗ ΔΕΔΟΜΕΝΩΝ', 'ΠΟΙΟΤΗΤΑ & ΑΞΙΟΠΙΣΤΙΑ ΔΕΔΟΜΕΝΩΝ', 'ΠΑΡΑΓΩΓΙΚΗ ΤΝ & ΑΥΤΟΜΑΤΙΣΜΟΣ', 'ΣΤΡΑΤΗΓΙΚΗ ΔΕΔΟΜΕΝΩΝ', 'ΣΥΜΜΟΡΦΩΣΗ & ΥΠΕΥΘΥΝΗ ΤΝ'],
    expertises: [
      { id: 'data', number: '01', title: 'Data & Business Intelligence', short: 'Σαφή και αξιόπιστα δεδομένα για κάθε απόφαση.', detail: 'Ανάλυση, καθαρισμός, οπτικοποίηση, πίνακες ελέγχου και μοντέλα πρόβλεψης: μετατρέπουμε τα ακατέργαστα δεδομένα σας σε πρακτικούς μοχλούς ανάπτυξης.', tags: ['Dashboards', 'Data science', 'Πρόβλεψη'], accent: 'mint', symbol: '◉' },
      { id: 'ia', number: '02', title: 'ΤΝ & αυτοματισμός', short: 'Τεχνητή νοημοσύνη για πραγματικές ανάγκες.', detail: 'Εντοπίζουμε τις εργασίες που αξίζει να αυτοματοποιηθούν και αναπτύσσουμε ασφαλή εργαλεία ΤΝ, εύκολα στην υιοθέτηση και ενσωματωμένα στη δραστηριότητά σας.', tags: ['Παραγωγική ΤΝ', 'Agents', 'Αυτοματισμός'], accent: 'lavender', symbol: '✦' },
      { id: 'digital', number: '03', title: 'Ψηφιακά προϊόντα', short: 'Εφαρμογές και διαδικτυακές εμπειρίες με διάρκεια.', detail: 'Από το πρωτότυπο έως το επιχειρηματικό προϊόν, σχεδιάζουμε σύγχρονες, αποδοτικές και επεκτάσιμες διεπαφές, πάντα προσαρμοσμένες στις ανάγκες σας.', tags: ['Web apps', 'MVP', 'UX / UI'], accent: 'coral', symbol: '↗' },
      { id: 'conseil', number: '04', title: 'Συμβουλευτική & αποδοτικότητα', short: 'Ελεγχόμενος και υπεύθυνος ψηφιακός μετασχηματισμός.', detail: 'Αρχιτεκτονική, βελτιστοποίηση, ασφάλεια και μείωση του περιβαλλοντικού αποτυπώματος: σας βοηθάμε να επιλέξετε λιγότερη πολυπλοκότητα και περισσότερη αξία.', tags: ['Έλεγχος', 'Στρατηγική', 'Green IT'], accent: 'lime', symbol: '⌁' },
    ],
    processSteps: [
      { number: '01', title: 'Κατανόηση', text: 'Μια άμεση συζήτηση για τον καθορισμό του προβλήματος, των χρηστών και του επιθυμητού αποτελέσματος.' },
      { number: '02', title: 'Κατασκευή', text: 'Ένα πρώτο πρωτότυπο που δοκιμάζεται γρήγορα και εμπλουτίζεται με τα σχόλια και τα δεδομένα σας.' },
      { number: '03', title: 'Ανάπτυξη', text: 'Μια στιβαρή, τεκμηριωμένη λύση με μακροχρόνια υποστήριξη καθώς εξελίσσεστε.' },
    ],
    aria: { home: 'Επιστροφή στην αρχική σελίδα της EXXO Techs', nav: 'Κύρια πλοήγηση', language: 'Επιλογή γλώσσας', openMenu: 'Άνοιγμα μενού', closeMenu: 'Κλείσιμο μενού', heroVisual: 'Απεικόνιση λύσεων Δεδομένων και Τεχνητής Νοημοσύνης', ticker: 'Τομείς εξειδίκευσης', commitments: 'Οι δεσμεύσεις μας', close: 'Κλείσιμο' },
    side: { prompt: 'Έχετε κάποιο έργο στο μυαλό σας;', link: 'Ας μιλήσουμε' },
    hero: { eyebrow: 'Δεδομένα · ΤΝ · Ψηφιακό προϊόν', title: ['Δώστε ώθηση', 'στις ιδέες σας.'], intro: 'Η EXXO Techs μετατρέπει τα δεδομένα και τις φιλοδοξίες σας σε χρήσιμες, έξυπνες ψηφιακές λύσεις που αναπτύσσονται μαζί σας.', primary: 'Ξεκινήστε ένα έργο', secondary: 'Ανακαλύψτε την εξειδίκευσή μας', reply: 'για μια πρώτη απάντηση', bespoke: 'εξατομικευμένες λύσεις', explore: 'Εξερεύνηση', signal: 'Από τα δεδομένα στις αποφάσεις.', metric: 'εξοικονόμηση χρόνου', usefulAi: 'Χρήσιμη ΤΝ', automate: 'Αυτοματισμός χωρίς πολυπλοκότητα', humanFirst: 'Πρώτα ο άνθρωπος', tailored: 'Τεχνολογία στα μέτρα σας' },
    expertise: { kicker: 'Η εξειδίκευσή μας', heading: ['Οι προκλήσεις σας,', 'το πεδίο μας.'], intro: 'Συνδυάζουμε Δεδομένα, ΤΝ και ανάπτυξη προϊόντων για να δημιουργούμε λύσεις που προωθούν ουσιαστικά τη δραστηριότητά σας.', label: 'ΕΞΕΙΔΙΚΕΥΣΗ' },
    commitments: [
      { value: '100', suffix: '%', title: 'Στα μέτρα σας', text: 'Κάθε λύση ξεκινά από τις ανάγκες σας, ποτέ από ένα γενικό μοντέλο.' },
      { value: '24', suffix: 'h', title: 'Αμεσότητα', text: 'Γρήγορη πρώτη απάντηση και ένας πραγματικά διαθέσιμος συνεργάτης.' },
      { value: '360', suffix: '°', title: 'Συνολική εικόνα', text: 'Στρατηγική, δεδομένα, σχεδιασμός και τεχνολογία σε μία ομάδα.' },
    ],
    method: { kicker: 'Η μέθοδός μας', heading: ['Γρήγορα βήματα.', 'Σωστή κατασκευή.'], intro: 'Άμεση συνεργασία, σαφή στάδια και ορατά αποτελέσματα από τις πρώτες κιόλας εβδομάδες.', link: 'Μιλήστε μας για το έργο σας' },
    about: { kicker: 'EXXO Techs', heading: ['Μικρή ομάδα.', 'Μεγάλη περιέργεια.'], lead: 'Η EXXO Techs είναι μια ανεξάρτητη εταιρεία τεχνολογίας με έδρα το Bertrange του Λουξεμβούργου.', text: 'Υποστηρίζουμε επιχειρηματίες, επαγγελματίες και εταιρείες με μια δημιουργική, πρακτική και υπεύθυνη προσέγγιση. Το εργαστήριό μας εξερευνά νέες δυνατότητες και η εμπειρία μας τις μετατρέπει σε αξιόπιστες λύσεις.', values: ['Χρήσιμη καινοτομία', 'Άμεση συνεργασία', 'Υπεύθυνη ψηφιακή ανάπτυξη'], logoAlt: 'Σύμβολο EXXO', planets: ['DATA', 'ΤΝ', 'WEB', 'ΔΙΑΚΥΒΕΡΝΗΣΗ', 'ΣΤΡΑΤΗΓΙΚΗ'] },
    contact: { heading: ['Το επόμενο έργο σας', 'ξεκινά εδώ.'], intro: 'Μια ιδέα, δεδομένα προς αξιοποίηση ή μια διαδικασία προς επανασχεδιασμό; Επικοινωνήστε μαζί μας. Θα απαντήσουμε εντός 24 ωρών.', subject: 'Ας συζητήσουμε το έργο μου', phone: 'ΤΗΛΕΦΩΝΟ', address: 'ΔΙΕΥΘΥΝΣΗ', availability: 'ΔΙΑΘΕΣΙΜΟΤΗΤΑ', status: 'Νέα έργα — 2026' },
    footer: { description: 'Δεδομένα, ΤΝ & ψηφιακά προϊόντα — Λουξεμβούργο', privacy: 'Απόρρητο' },
    privacy: { title: 'Τα δεδομένα σας παραμένουν δικά σας.', text: 'Αυτός ο ιστότοπος χρησιμοποιεί μόνο τα δεδομένα που είναι απολύτως απαραίτητα για τη λειτουργία του και, κατά περίπτωση, για ανώνυμη μέτρηση επισκεψιμότητας. Δεν συλλέγουμε άλλες προσωπικές πληροφορίες μέσω αυτής της σελίδας.', note: 'Εάν αλλάξουν οι πρακτικές μας, θα ενημερωθείτε και θα μπορείτε να επιλέξετε ποια δεδομένα επιθυμείτε να μοιραστείτε.', link: 'Έχετε ερώτηση; Επικοινωνήστε μαζί μας' },
  },
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>
}

function LiquidGlassFilters() {
  return (
    <svg className="liquid-filter-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <filter id="liquid-glass-refraction" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.028 0.045" numOctaves="1" seed="7" result="liquidNoise" />
          <feGaussianBlur in="liquidNoise" stdDeviation="0.55" result="softLiquidNoise" />
          <feDisplacementMap in="SourceGraphic" in2="softLiquidNoise" scale="10" xChannelSelector="R" yChannelSelector="G" result="refracted" />
          <feGaussianBlur in="refracted" stdDeviation="0.18" />
        </filter>
        <filter id="liquid-glass-refraction-hover" x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.022 0.038" numOctaves="1" seed="11" result="hoverNoise" />
          <feGaussianBlur in="hoverNoise" stdDeviation="0.7" result="softHoverNoise" />
          <feDisplacementMap in="SourceGraphic" in2="softHoverNoise" scale="24" xChannelSelector="R" yChannelSelector="G" result="hoverRefracted" />
          <feGaussianBlur in="hoverRefracted" stdDeviation="0.24" />
        </filter>
      </defs>
    </svg>
  )
}

function LanguageSwitcher({ language, onChange, ariaLabel }) {
  const [dragPosition, setDragPosition] = useState(null)
  const [hoverPosition, setHoverPosition] = useState(null)
  const [dragDirection, setDragDirection] = useState(0)
  const [dragStretch, setDragStretch] = useState(1.14)
  const pointer = useRef(null)
  const dragStart = useRef(0)
  const lastPointerX = useRef(0)
  const wasDragged = useRef(false)
  const languageIndex = languages.findIndex((item) => item.code === language)
  const sliderPosition = dragPosition ?? hoverPosition ?? languageIndex

  const getPosition = (clientX, element) => {
    const bounds = element.getBoundingClientRect()
    return Math.min(languages.length - 1, Math.max(0, ((clientX - bounds.left) / bounds.width) * languages.length - 0.5))
  }

  const handlePointerDown = (event) => {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    pointer.current = event.pointerId
    dragStart.current = event.clientX
    lastPointerX.current = event.clientX
    wasDragged.current = false
  }

  const handlePointerMove = (event) => {
    if (pointer.current === null) {
      if (event.pointerType !== 'touch') setHoverPosition(getPosition(event.clientX, event.currentTarget))
      return
    }
    if (pointer.current !== event.pointerId) return
    const movement = event.clientX - lastPointerX.current
    if (Math.abs(movement) > 0.35) {
      setDragDirection(movement > 0 ? 1 : -1)
      setDragStretch(Math.min(1.42, 1.14 + Math.abs(movement) * 0.035))
      lastPointerX.current = event.clientX
    }
    if (Math.abs(event.clientX - dragStart.current) > 4) wasDragged.current = true
    if (wasDragged.current) setDragPosition(getPosition(event.clientX, event.currentTarget))
  }

  const handlePointerUp = (event) => {
    if (pointer.current !== event.pointerId) return
    const nextIndex = Math.round(getPosition(event.clientX, event.currentTarget))
    onChange(languages[nextIndex].code)
    setDragPosition(null)
    setHoverPosition(event.pointerType === 'touch' ? null : nextIndex)
    setDragDirection(0)
    setDragStretch(1.14)
    pointer.current = null
    if (wasDragged.current) event.preventDefault()
    window.setTimeout(() => { wasDragged.current = false }, 0)
  }

  const handlePointerCancel = () => {
    pointer.current = null
    wasDragged.current = false
    setDragPosition(null)
    setHoverPosition(null)
    setDragDirection(0)
    setDragStretch(1.14)
  }

  return (
    <div className={`language-switcher ${dragPosition !== null ? 'is-dragging' : ''} ${dragDirection > 0 ? 'drag-right' : dragDirection < 0 ? 'drag-left' : ''} ${hoverPosition !== null && dragPosition === null ? 'is-hovering' : ''}`} role="group" aria-label={ariaLabel} style={{ '--language-index': sliderPosition, '--liquid-stretch': dragStretch }} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerCancel} onDragStart={(event) => event.preventDefault()} onPointerLeave={() => {
      if (pointer.current === null) setHoverPosition(null)
    }}>
      <span className="language-slider" aria-hidden="true" />
      {languages.map((item, index) => (
        <button key={item.code} type="button" className={language === item.code ? 'is-active' : ''} aria-label={item.label} aria-pressed={language === item.code} title={item.label} onFocus={() => setHoverPosition(index)} onBlur={() => setHoverPosition(null)} onClick={() => {
          if (!wasDragged.current) onChange(item.code)
        }}>
          <img className="flag-image" src={item.flag} alt="" aria-hidden="true" draggable="false" />
        </button>
      ))}
    </div>
  )
}

export default function App() {
  const [language, setLanguage] = useState('fr')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('accueil')
  const [activeExpertiseId, setActiveExpertiseId] = useState('data')
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const t = translations[language]
  const logoPath = `${import.meta.env.BASE_URL}exxo-mark.png`
  const activeExpertise = t.expertises.find((expertise) => expertise.id === activeExpertiseId) ?? t.expertises[0]

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    let pointerFrame = 0
    let scrollFrame = 0
    let pointerX = 0
    let pointerY = 0

    const renderPointer = () => {
      document.documentElement.style.setProperty('--pointer-x', `${pointerX}px`)
      document.documentElement.style.setProperty('--pointer-y', `${pointerY}px`)
      pointerFrame = 0
    }
    const updatePointer = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderPointer)
    }
    const renderScroll = () => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0)
      const currentSection = menuLinks.map((item) => item.href.slice(1)).filter((id) => document.getElementById(id)?.getBoundingClientRect().top <= 180).at(-1)
      if (currentSection) setActiveSection(currentSection)
      scrollFrame = 0
    }
    const updateScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(renderScroll)
    }
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    }), { threshold: 0.13 })

    document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element))
    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('scroll', updateScroll, { passive: true })
    renderScroll()
    return () => {
      revealObserver.disconnect()
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('scroll', updateScroll)
      window.cancelAnimationFrame(pointerFrame)
      window.cancelAnimationFrame(scrollFrame)
    }
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setPrivacyOpen(false)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const brand = (
    <>
      <span className="brand-mark"><img src={logoPath} alt="" /></span>
      <span className="brand-copy"><strong>EXXO</strong><small>Techs</small></span>
    </>
  )

  return (
    <div className="site-shell">
      <LiquidGlassFilters />
      <div className="scroll-progress" style={{ '--scroll-progress': `${scrollProgress}%` }} aria-hidden="true" />

      <a className={`brand mobile-brand ${scrollProgress > 0.35 && !menuOpen ? 'is-hidden' : ''} ${menuOpen ? 'is-in-menu' : ''}`} href="#accueil" aria-label={t.aria.home} onClick={() => setMenuOpen(false)}>{brand}</a>

      <button className={`menu-trigger ${menuOpen ? 'is-active' : ''}`} type="button" aria-label={menuOpen ? t.aria.closeMenu : t.aria.openMenu} aria-controls="site-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}><span /><span /></button>

      <aside className={`side-panel ${menuOpen ? 'is-open' : ''}`} id="site-navigation">
        <a className="brand" href="#accueil" onClick={() => setMenuOpen(false)}>{brand}</a>
        <nav aria-label={t.aria.nav}>
          {menuLinks.map((item, index) => <a key={item.href} className={activeSection === item.href.slice(1) ? 'is-active' : ''} href={item.href} aria-current={activeSection === item.href.slice(1) ? 'location' : undefined} onClick={() => setMenuOpen(false)}><span>{item.number}</span>{t.menuItems[index]}</a>)}
        </nav>
        <div className="side-bottom">
          <LanguageSwitcher language={language} onChange={setLanguage} ariaLabel={t.aria.language} />
          <div className="side-contact"><span className="availability-dot" /><p>{t.side.prompt}</p><a href="mailto:contact@exxotechs.com">{t.side.link} <ArrowIcon /></a></div>
        </div>
      </aside>

      <main>
        <section className="hero" id="accueil" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" /><div className="hero-glow" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow"><span>{t.hero.eyebrow}</span> Luxembourg</p>
            <h1 id="hero-title">{t.hero.title[0]}<span>{t.hero.title[1]}</span></h1>
            <p className="hero-intro">{t.hero.intro}</p>
            <div className="hero-actions"><a className="button button-primary" href="#contact">{t.hero.primary} <ArrowIcon /></a><a className="button button-ghost" href="#expertises">{t.hero.secondary}</a></div>
            <div className="trust-line"><span><i>24h</i> {t.hero.reply}</span><span><i>100%</i> {t.hero.bespoke}</span></div>
          </div>
          <div className="hero-visual" aria-label={t.aria.heroVisual}>
            <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
            <div className="data-card data-card-main"><div className="card-topline"><span>EXXO / SIGNAL</span><span className="live-pill">LIVE</span></div><p>{t.hero.signal}</p><div className="chart" aria-hidden="true">{[38, 56, 44, 72, 64, 92, 78, 100].map((height, index) => <i key={index} style={{ '--bar-height': `${height}%` }} />)}</div><div className="card-metric"><strong>+38%</strong><span>{t.hero.metric}</span></div></div>
            <div className="data-card floating-card ai-card"><span className="spark">✦</span><div><strong>{t.hero.usefulAi}</strong><small>{t.hero.automate}</small></div></div>
            <div className="data-card floating-card human-card"><div className="mini-mark"><img src={logoPath} alt="" /></div><div><strong>{t.hero.humanFirst}</strong><small>{t.hero.tailored}</small></div></div>
          </div>
          <a className="scroll-cue" href="#expertises"><span>{t.hero.explore}</span><i aria-hidden="true" /></a>
        </section>

        <div className="marquee" aria-label={t.aria.ticker}><div className="marquee-track" aria-hidden="true">{[0, 1].map((sequence) => <div className="marquee-group" key={sequence}>{t.tickerTopics.map((topic) => <span key={`${sequence}-${topic}`}>{topic}<i>✦</i></span>)}</div>)}</div></div>

        <section className="section expertise-section" id="expertises" aria-labelledby="expertises-title">
          <div className="section-heading" data-reveal><p className="section-kicker"><span>02</span> {t.expertise.kicker}</p><h2 id="expertises-title">{t.expertise.heading[0]}<br /><em>{t.expertise.heading[1]}</em></h2><p>{t.expertise.intro}</p></div>
          <div className="expertise-layout" data-reveal><div className="expertise-list" role="list">{t.expertises.map((expertise) => <button key={expertise.id} className={`expertise-tab ${activeExpertise.id === expertise.id ? 'is-active' : ''}`} type="button" onClick={() => setActiveExpertiseId(expertise.id)} aria-pressed={activeExpertise.id === expertise.id}><span>{expertise.number}</span><strong>{expertise.title}</strong><i aria-hidden="true">↗</i></button>)}</div><article className={`expertise-feature accent-${activeExpertise.accent}`} key={`${language}-${activeExpertise.id}`}><div className="feature-symbol" aria-hidden="true">{activeExpertise.symbol}</div><p className="feature-label">{t.expertise.label} / {activeExpertise.number}</p><h3>{activeExpertise.short}</h3><p>{activeExpertise.detail}</p><div className="tag-list">{activeExpertise.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article></div>
        </section>

        <section className="impact-band" aria-label={t.aria.commitments}>{t.commitments.map((commitment) => <div key={commitment.value} data-reveal><strong>{commitment.value}<sup>{commitment.suffix}</sup></strong><span>{commitment.title}</span><p>{commitment.text}</p></div>)}</section>

        <section className="section method-section" id="methode" aria-labelledby="method-title"><div className="method-copy" data-reveal><p className="section-kicker"><span>03</span> {t.method.kicker}</p><h2 id="method-title">{t.method.heading[0]}<br /><em>{t.method.heading[1]}</em></h2><p>{t.method.intro}</p><a className="text-link" href="#contact">{t.method.link} <ArrowIcon /></a></div><div className="process-list">{t.processSteps.map((step) => <article key={step.number} data-reveal><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><i aria-hidden="true">↘</i></article>)}</div></section>

        <section className="section about-section" id="a-propos" aria-labelledby="about-title"><div className="about-visual" data-reveal><div className="about-logo"><img src={logoPath} alt={t.about.logoAlt} /></div><div className="about-orbits" aria-hidden="true">{t.about.planets.map((planet, index) => <div className={`planet-track planet-track-${index + 1}`} key={planet}><span className={`planet planet-${index + 1}`}><b>{planet}</b></span></div>)}</div><p>BERTRANGE<br />LUXEMBOURG</p></div><div className="about-copy" data-reveal><p className="section-kicker"><span>04</span> {t.about.kicker}</p><h2 id="about-title">{t.about.heading[0]}<br /><em>{t.about.heading[1]}</em></h2><p className="about-lead">{t.about.lead}</p><p>{t.about.text}</p><div className="values">{t.about.values.map((value, index) => <span key={value}><i>0{index + 1}</i>{value}</span>)}</div></div></section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-glow" aria-hidden="true" /><div className="contact-copy" data-reveal><p className="section-kicker"><span>05</span> Contact</p><h2 id="contact-title">{t.contact.heading[0]}<br /><em>{t.contact.heading[1]}</em></h2><p>{t.contact.intro}</p><a className="contact-mail" href={`mailto:contact@exxotechs.com?subject=${encodeURIComponent(t.contact.subject)}`}>contact@exxotechs.com <ArrowIcon /></a></div><div className="contact-details" data-reveal><div><small>{t.contact.phone}</small><a href="tel:+352661537493">+352 661 537 493</a></div><div><small>{t.contact.address}</small><address>43 Route de Longwy<br />L-8080 Bertrange<br />Luxembourg</address></div><div><small>{t.contact.availability}</small><p><span className="availability-dot" /> {t.contact.status}</p></div></div></section>

        <footer><a className="footer-brand" href="#accueil"><span className="brand-mark"><img src={logoPath} alt="" /></span><span>EXXO Techs</span></a><p>{t.footer.description}</p><button type="button" onClick={() => setPrivacyOpen(true)}>{t.footer.privacy}</button><span>© {new Date().getFullYear()} EXXO Techs</span></footer>
      </main>

      {privacyOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setPrivacyOpen(false)}><section className="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="privacy-title" onMouseDown={(event) => event.stopPropagation()}><button type="button" className="modal-close" aria-label={t.aria.close} onClick={() => setPrivacyOpen(false)}>×</button><p className="section-kicker"><span>EXXO</span> {t.footer.privacy}</p><h2 id="privacy-title">{t.privacy.title}</h2><p>{t.privacy.text}</p><p>{t.privacy.note}</p><a href="mailto:contact@exxotechs.com">{t.privacy.link} <ArrowIcon /></a></section></div>}
    </div>
  )
}
