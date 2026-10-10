/*
  CONTENUTI DEL PORTFOLIO
  -----------------------
  Questo è l'unico file da modificare per aggiornare la pagina.
  Ogni testo ha la versione italiana (it) e inglese (en).

  Per registrare un nuovo esame: sposta il corso da "daSostenere" a "esami"
  e scrivi il voto in "voto". Crediti, percentuale e media si ricalcolano da soli.
*/

window.PORTFOLIO = {
  aggiornato: "2026-10-10",
  mostraVoti: true, // metti false per nascondere i voti dei singoli esami

  contatti: {
    email: "s.percossi@gmail.com",
    linkedin: "https://www.linkedin.com/in/simone-percossi/",
    github: "https://github.com/spercossi",
    cv: "cv/CV-Simone-Percossi.pdf"
  },

  ruolo: {
    it: "Technical Program Manager · AI & trasformazione digitale",
    en: "Technical Program Manager · AI & digital transformation"
  },

  presentazione: {
    it: "Da nove anni in Open Fiber porto in produzione programmi IT complessi, tenendo insieme business, tecnologia e fornitori. Sto completando una laurea in Ingegneria Informatica e AI per guidare progetti di intelligenza artificiale dall'idea all'uso quotidiano.",
    en: "For nine years at Open Fiber I have taken complex IT programs to production, keeping business, technology and vendors aligned. I am completing a BSc in Computer Engineering & AI to lead AI initiatives from idea to everyday use."
  },

  // Il percorso professionale, in ordine. "futuro: true" disegna la tratta tratteggiata.
  percorso: [
    { anno: "2016", titolo: "FTTH Designer",
      it: "Progettazione di reti in fibra, analisi GIS e SQL",
      en: "Fibre network design, GIS and SQL analysis" },
    { anno: "2019", titolo: "Operational Management Specialist",
      it: "Coordinamento della progettazione e controllo dei costi",
      en: "Design coordination and cost control" },
    { anno: "2021", titolo: "Demand IT Specialist",
      it: "Requisiti di business tradotti in specifiche per i sistemi BSS/OSS",
      en: "Business needs turned into specs for BSS/OSS systems" },
    { anno: "2024", titolo: "Technical Program Manager",
      it: "57 progetti governati nel 2025, per circa 1,5M€",
      en: "57 projects governed in 2025, worth about €1.5M" },
    { anno: "2027", titolo: { it: "Laurea in Ingegneria Informatica e AI", en: "BSc Computer Engineering & AI" },
      it: "Prevista a luglio, con la tesi",
      en: "Expected in July, with the thesis",
      futuro: true }
  ],

  puntiForza: [
    { titolo: { it: "Delivery", en: "Delivery" },
      it: "57 progetti IT governati nel 2025, per circa 1,5M€, dalla raccolta dei requisiti al collaudo con gli utenti.",
      en: "57 IT projects governed in 2025, worth about €1.5M, from requirements to user acceptance testing." },
    { titolo: { it: "Adozione", en: "Adoption" },
      it: "Referente ICT per le sedi territoriali: raccolgo le esigenze del campo e le trasformo in miglioramenti di processo. Docente interno per un corso ufficiale HR.",
      en: "ICT liaison for regional teams: I collect field needs and turn them into process improvements. Internal trainer for an official HR course." },
    { titolo: { it: "AI applicata", en: "Applied AI" },
      it: "Una pipeline di computer vision costruita e misurata: 79% di accuratezza su 10 categorie di capi.",
      en: "A computer vision pipeline built and measured: 79% accuracy across 10 garment categories." }
  ],

  progettoPrincipale: {
    titolo: { it: "MissingPieces: riconoscere un capo da una foto", en: "MissingPieces: recognising a garment from a photo" },
    intro: {
      it: "Un'app per il guardaroba digitale costruita in tre corsi della laurea. Il cuore è una pipeline di computer vision che parte da una foto scattata in casa, su pavimenti e tappeti qualsiasi, e restituisce un JSON pronto per l'API.",
      en: "A digital wardrobe app built across three degree courses. Its core is a computer vision pipeline that starts from a photo taken at home, on any floor or rug, and returns a JSON payload ready for the API."
    },
    passi: [
      { it: "Foto dell'utente", en: "User photo", det: "224 × 224 px, RGB" },
      { it: "Separazione del capo dallo sfondo", en: "Garment separated from background", det: "GrabCut + morphology" },
      { it: "Colore dominante", en: "Dominant colour", det: "K-Means, k = 3" },
      { it: "Categoria del capo", en: "Garment category", det: "ResNet18, 10 classes" },
      { it: "JSON per l'API", en: "JSON for the API", det: "category, confidence, colour" },
      { it: "Back end", en: "Back end", det: "Spring Boot, JWT, PostgreSQL" },
      { it: "App web", en: "Web app", det: "React" }
    ],
    dataset: {
      it: "Dataset: 5.175 immagini verificate (Kaggle, clothing-dataset-full), 10 categorie, 20% per la validazione.",
      en: "Dataset: 5,175 verified images (Kaggle, clothing-dataset-full), 10 categories, 20% held out for validation."
    },
    risultati: [
      { modello: { it: "Approccio classico: SVM su HOG + LBP", en: "Classical: SVM on HOG + LBP" },
        accuratezza: "60,0%", f1: "0,46", latenza: { it: "~221 ms (CPU)", en: "~221 ms (CPU)" } },
      { modello: { it: "Deep learning: ResNet18 pre-addestrata", en: "Deep learning: pretrained ResNet18" },
        accuratezza: "78,9%", f1: "0,76", latenza: { it: "~107 ms (GPU)", en: "~107 ms (GPU)" }, migliore: true }
    ],
    errori: [
      { it: "Quando è incerto, il modello sceglie T-shirt, la classe più frequente nel dataset.",
        en: "When uncertain, the model picks T-shirt, the most frequent class in the dataset." },
      { it: "Le maglie a manica lunga vengono confuse con le camicie (18 casi): stese, hanno una forma simile.",
        en: "Long-sleeve tops get confused with shirts (18 cases): laid flat, they look alike." },
      { it: "La gonna è la categoria più difficile: l'SVM non la riconosce mai, ResNet18 arriva al 51,6% di recall.",
        en: "Skirts are the hardest class: the SVM never detects them, ResNet18 reaches 51.6% recall." }
    ],
    perche: {
      it: "Ho confrontato una soluzione semplice con una più costosa usando le stesse metriche, ho analizzato dove sbaglia e ho prodotto un risultato che il resto del sistema può usare. È il percorso che serve per portare un caso d'uso AI dal pilota alla produzione.",
      en: "I compared a simple solution with a costlier one on the same metrics, analysed where it fails and produced an output the rest of the system can use. It is the path an AI use case needs to go from pilot to production."
    },
    link: [
      { it: "Pipeline di computer vision", en: "Computer vision pipeline", url: "https://github.com/spercossi/Computer-Vision---Missing-Pieces-Clothes-Recognition" },
      { it: "Back end", en: "Back end", url: "https://github.com/spercossi/MISSING-PIECES-BACKEND" },
      { it: "App web", en: "Web app", url: "https://github.com/spercossi/missingpieces" }
    ]
  },

  altriProgetti: [
    { titolo: { it: "JamFinder: organizzare jam session", en: "JamFinder: organising jam sessions" },
      testo: {
        it: "Applicazione Java per far incontrare musicisti e organizzare jam session, con notifiche automatiche ai partecipanti. Usa quattro design pattern: Factory, Observer, Composite e Iterator. Progetto del corso di Object-Oriented Programming.",
        en: "Java application that matches musicians and organises jam sessions, with automatic notifications to participants. Uses four design patterns: Factory, Observer, Composite and Iterator. Object-Oriented Programming course project."
      },
      url: "https://github.com/spercossi/Jamfinder---Java-OOP-Project" }
  ],

  laurea: {
    nome: { it: "BSc (Hons) in Computer Engineering & Artificial Intelligence", en: "BSc (Hons) in Computer Engineering & Artificial Intelligence" },
    ateneo: "EPICODE Institute of Technology",
    dettaglio: { it: "EQF livello 6 · 180 crediti ECTS · fine prevista luglio 2027", en: "EQF level 6 · 180 ECTS credits · expected July 2027" },
    creditiTotali: 180
  },

  // I colori seguono il codice colori delle fibre ottiche.
  aree: {
    ai:    { it: "AI e dati",            en: "AI & data",              colore: "#2563B0" },
    sw:    { it: "Sviluppo software",    en: "Software development",   colore: "#D46B12" },
    cloud: { it: "Cloud e reti",         en: "Cloud & networks",       colore: "#2E8550" },
    base:  { it: "Fondamenti e metodo",  en: "Foundations & method",   colore: "#7A4F2E" }
  },

  // Esami superati. "prova" usa le chiavi: progetto, scritto, scrittoColloquio, test.
  esami: [
    { nome: "Introduction to Machine Learning", ects: 6, voto: 88, area: "ai", prova: "scritto",
      programma: ["Supervised and unsupervised learning", "Regression and classification", "Clustering", "Decision trees and SVM", "Model evaluation, overfitting and underfitting", "Feature selection and engineering"] },
    { nome: "Introduction to Computer Vision", ects: 6, voto: 85, area: "ai", prova: "progetto",
      programma: ["Image filtering and enhancement", "Image segmentation", "Feature extraction and description", "Object detection", "Image classification and recognition", "Video analysis and tracking"] },
    { nome: "Introduction to Databases", ects: 6, voto: 80, area: "ai", prova: "scritto",
      programma: ["Relational databases and SQL", "Normalisation and database design", "NoSQL: document and key-value databases"] },
    { nome: "Introduction to Artificial Intelligence", ects: 6, voto: 79, area: "ai", prova: "scritto",
      programma: ["Search algorithms and heuristics", "Knowledge representation and reasoning", "Machine learning fundamentals", "Neural networks, CNN, RNN, transfer learning", "Natural language processing and LLMs", "Ethics in AI"] },

    { nome: "Back-end Programming", ects: 6, voto: 90, area: "sw", prova: "progetto",
      programma: ["Java on the server side", "REST APIs and CRUD", "JDBC and database connectivity", "Authentication and security"] },
    { nome: "Human-Computer Interaction", ects: 6, voto: 89, area: "sw", prova: "progetto",
      programma: ["User-centred design", "UX design", "Interaction design principles", "UI design and prototyping"] },
    { nome: "Programming Principles", ects: 6, voto: 88, area: "sw", prova: "scritto",
      programma: ["Programming fundamentals", "Paradigms: procedural, functional, object-oriented", "Basic data structures", "Version control with Git"] },
    { nome: "Web Development", ects: 5, voto: 85, area: "sw", prova: "progetto",
      programma: ["HTML, CSS and JavaScript", "DOM and events", "Responsive design", "Front-end frameworks", "Deployment and hosting"] },
    { nome: "Object-Oriented Programming", ects: 6, voto: 75, area: "sw", prova: "progetto",
      programma: ["Java basics", "Classes, inheritance and polymorphism", "Exception handling", "Multithreading", "File I/O and serialisation"] },
    { nome: "Data Structures and Algorithms", ects: 6, voto: 73, area: "sw", prova: "scritto",
      programma: ["Lists, stacks and queues", "Trees and graphs", "Hash tables", "Sorting algorithms", "Time and space complexity"] },
    { nome: "Front-end Programming", ects: 5, voto: 73, area: "sw", prova: "progetto",
      programma: ["React components and routing", "Redux", "TypeScript basics", "HTTP communication"] },
    { nome: "Testing, Code Quality & CI/CD", ects: 6, voto: 73, area: "sw", prova: "scritto",
      programma: ["Unit, integration and acceptance testing", "Code quality and static analysis", "Test automation", "CI/CD pipelines"] },
    { nome: "Introduction to Systems Programming", ects: 6, voto: 70, area: "sw", prova: "scritto",
      programma: ["Operating systems", "C programming", "Memory management and pointers", "Processes, threads and concurrency", "File systems"] },

    { nome: "Computer Networks", ects: 6, voto: 85, area: "cloud", prova: "scritto",
      programma: ["Network models and protocols", "TCP/IP, addressing and subnetting", "Network security", "Troubleshooting and performance"] },
    { nome: "Cloud Development and Ops", ects: 6, voto: 83, area: "cloud", prova: "scritto",
      programma: ["Cloud-native application development", "Serverless computing", "Security, IAM and compliance", "Monitoring and cost optimisation", "DevOps, infrastructure as code"] },
    { nome: "Computer Architectures", ects: 6, voto: 50, area: "cloud", prova: "scritto",
      programma: ["CPU and instruction sets", "Memory hierarchy", "Processor pipeline", "Parallel architectures"] },
    { nome: "Cloud Computing Infrastructure", ects: 6, voto: 50, area: "cloud", prova: "scritto",
      programma: ["Cloud computing fundamentals", "AWS or Azure basics", "Virtual machines and containers", "Storage, databases and networking in the cloud"] },

    { nome: "Discrete Mathematics", ects: 5, voto: 85, area: "base", prova: "scrittoColloquio",
      programma: ["Logic and Boolean algebra", "Proof techniques", "Combinatorics", "Graph theory", "Discrete probability"] },
    { nome: "Critical Thinking", ects: 2, voto: 82, area: "base", prova: "test",
      programma: ["Logical fallacies and cognitive biases", "Evaluating information and arguments"] },
    { nome: "Academic Reading and Writing in English", ects: 2, voto: 70, area: "base", prova: "test",
      programma: ["Academic reading strategies", "Essay structure and academic writing"] },
    { nome: "Software Development Methodologies", ects: 6, voto: 65, area: "base", prova: "scritto",
      programma: ["Waterfall, Agile and hybrid approaches", "Scrum and Kanban", "Lean software development", "Agile engineering practices"] },
    { nome: "Foundational Mathematics", ects: 5, voto: 50, area: "base", prova: "scritto",
      programma: ["Functions, limits and derivatives", "Integrals, sequences and series", "Linear algebra", "Probability and statistics"] }
  ],

  // Terzo anno, ancora da sostenere.
  daSostenere: [
    { nome: "Introduction to Deep Learning & NLP", ects: 6, obbligatorio: true },
    { nome: "Introduction to Large Language Models", ects: 6, obbligatorio: true },
    { nome: { it: "Quattro esami a scelta", en: "Four elective exams" }, ects: 24 },
    { nome: { it: "Tesi di laurea", en: "Final dissertation" }, ects: 24 }
  ]
};
