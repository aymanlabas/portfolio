// Default content (from your CV). Once you save in /admin, Firestore overrides this.
export const defaultData = {
  name: "Ayman LABAS",
  title: "Full Stack Developer · 5th-year Engineering Student",
  availability: "Open to a PFE internship · 4–6 months · from February 2027",
  bio: "5th-year engineering student in digital development and information systems, passionate about Full Stack development, software architecture and DevOps. Rigorous, analytical and autonomous, I want to contribute to innovative solutions and take on new technical challenges.",
  email: "aymanlabas60@gmail.com", phone: "+212 690 427729", location: "Casablanca, Morocco · Remote or on-site",
  github: "https://github.com/aymanlabas", linkedin: "https://www.linkedin.com/in/ayman-labas", photo: "/ayman.jpg",
  experiences: [
    {
      role: "PFA Internship, Full Stack Developer", company: "Aqualab Technologies, Casablanca", period: "Jul 2026 – Aug 2026",
      description: "Designed and built a web platform with React.js, Laravel and MySQL\nBuilt a REST API and an admin space (products, categories, news, applications)\nFunctional and API testing, SEO optimisation, performance improvements\nProduction deployment: domain, database, e-mails and Cron jobs\nSource control with Git/GitHub", tech: "Laravel, React.js, Next.js, MySQL, Git, REST API"
    },
    {
      role: "Technical Internship, Full Stack Developer", company: "Sertect Innova, Rabat", period: "Jul 2025 – Aug 2025",
      description: "UML/Merise diagrams (use cases, classes, activities)\nCRUD methods in controllers\nBootstrap components for a responsive UI", tech: "Laravel, React.js, Material UI, Bootstrap, MySQL, Git"
    },
    {
      role: "IT Support Technician", company: "Centre Régional d’Investissement Casablanca-Settat", period: "Feb 2024 – Jun 2024",
      description: "Hardware installation and maintenance\nUser management on the SBM scan system\nWindows Server 2016 configuration\nElectronic office support on the cri-invest platform", tech: "Windows Server 2016, Support"
    }],
  projects: [
    {
      title: "Smart Attendance System (Face Recognition)",
      description: "Système intelligent d'émargement et de pointage par reconnaissance faciale en temps réel. Frontend moderne en React.js, gestion des données avec Firebase, et notifications instantanées via l'API Telegram.",
      tech: "React.js, Material UI, Firebase, Telegram API, Vercel",
      link: "https://github.com/aymanlabas/Systempointgae_frontend",
      demo: "https://systempointag.vercel.app"
    },
    {
      title: "Hotel Management System",
      description: "Application web Full Stack développée avec Django pour gérer les réservations de chambres et l'administration hôtelière. Comprend la recherche de chambres, les réservations clients et un tableau de bord administrateur.",
      tech: "Python, Django, SQLite, PostgreSQL, HTML5, CSS3",
      link: "https://github.com/aymanlabas/-Hotel-Management-System"
    },
    {
      title: "Plateforme Aqualab Technologies",
      description: "Plateforme web complète conçue lors du stage PFA avec frontend React.js / Next.js et backend API REST Laravel. Espace d'administration pour la gestion des produits, catégories et actualités.",
      tech: "React.js, Next.js, Laravel, MySQL, REST API, Git",
      link: "https://github.com/aymanlabas/projet-stage-complet-frontend",
      demo: "https://projet-stage-complet-frontend.vercel.app"
    },
    {
      title: "Maskani – Application Immobilière",
      description: "Plateforme immobilière en ligne permettant la recherche, le filtrage et la publication d'annonces de biens immobiliers (vente et location) avec gestion des comptes utilisateurs.",
      tech: "Laravel, PHP, Blade, MySQL, Bootstrap",
      link: "https://github.com/aymanlabas/maskani_immoblierAPP"
    },
    {
      title: "DevOps CI/CD Automation Lab",
      description: "Mise en place d'un pipeline d'intégration et déploiement continu automatisé avec Jenkins, déclenchement par Webhooks GitHub, exécution des tests et conteneurisation Docker.",
      tech: "Jenkins, Docker, GitHub Actions, CI/CD, Java",
      link: "https://github.com/aymanlabas/jenkinaproject"
    },
    {
      title: "EMSI Exam – Plateforme d'Évaluation",
      description: "Application d'examens en ligne avec séparation claire frontend/backend pour la passation de tests d'évaluation académique et le suivi des notes des étudiants.",
      tech: "JavaScript, Node.js, Express, React.js, REST API",
      link: "https://github.com/aymanlabas/EmsiExamFullVersion"
    },
    {
      title: "Quiz Intelligent",
      description: "Application interactive de quiz avec gestion dynamique des banques de questions, chronomètre par question, calcul instantané des scores et analyse des résultats.",
      tech: "Java, OOP, Swing / JavaFX",
      link: "https://github.com/aymanlabas/Quize_Inteligent"
    },
    {
      title: "Gestion École (Système Académique)",
      description: "Système de gestion scolaire complet permettant la gestion des inscriptions, le suivi des étudiants, la répartition des cours et la gestion des enseignants.",
      tech: "Java, JDBC, MySQL, Architecture Orientée Objet",
      link: "https://github.com/aymanlabas/GestionEcole"
    }
  ],
  education: [
    { degree: "Engineering Cycle, Digital Development & Information Systems", school: "EMSI, Casablanca", period: "Oct 2024 – present" },
    { degree: "Specialised Technician Diploma, Full Stack Web Development", school: "OFPPT El Hank, Casablanca", period: "Sep 2021 – Jul 2023" },
    { degree: "Baccalauréat, Life & Earth Sciences", school: "Groupe scolaire Farabi 2, Casablanca", period: "Sep 2020 – Jun 2021" }],
  skills: [
    { label: "Languages", items: "PHP, Python, C++, JavaScript, Java" },
    { label: "Web & Mobile", items: "Laravel, React.js, Spring Boot, React Native, HTML, CSS, Firebase" },
    { label: "Databases", items: "MySQL, PL/SQL, PostgreSQL, SQL Server, Oracle, MongoDB" },
    { label: "DevOps & Tools", items: "Linux, Docker, Git, GitHub, GitLab" }],
  certificates: [
    {
      name: "Mastering Scrum and Jira",
      issuer: "Orange Digital Center Sidi Mâarouf",
      date: "Jul 2024",
      credentialId: null,
      credentialUrl: "https://www.orangedigitalcenters.com",
      issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Orange_logo.svg/240px-Orange_logo.svg.png"
    },
    {
      name: "Front End Development – HTML",
      issuer: "Great Learning Academy",
      date: "Nov 2023",
      credentialId: "BILZGITA",
      credentialUrl: "https://verify.mygreatlearning.com/BILZGITA",
      issuerLogo: "https://d1jnx9ba8s6j9r.cloudfront.net/img/ui-tech/great-learning-logo.png"
    },
    {
      name: "IT Customer Support Basics",
      issuer: "Cisco Networking Academy",
      date: "Sep 2025",
      credentialId: null,
      credentialUrl: "https://www.credly.com/badges",
      issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cisco_logo.svg/440px-Cisco_logo.svg.png"
    },
    {
      name: "EF SET English Certificate – C1 Advanced (64/100)",
      issuer: "EF SET",
      date: "Jul 2026",
      credentialId: "RBJyCj",
      credentialUrl: "https://cert.efset.org/RBJyCj",
      issuerLogo: "https://www.efset.org/static/efset/img/ef-set-logo.png"
    },
    {
      name: "Using Python to Access Web Data",
      issuer: "University of Michigan · Coursera",
      date: "Jun 2023",
      credentialId: "EBFQ7P7XBWLH",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/EBFQ7P7XBWLH",
      issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/240px-Coursera-Logo_600x600.svg.png"
    },
    {
      name: "Introduction à la programmation orientée objet (en C++)",
      issuer: "École Polytechnique Fédérale de Lausanne (EPFL) · Coursera",
      date: "Jan 2025",
      credentialId: "62BIY3LGIUO2",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/62BIY3LGIUO2",
      issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/EPFL_logo.svg/320px-EPFL_logo.svg.png"
    },
    {
      name: "Interactivity with JavaScript",
      issuer: "University of Michigan · Coursera",
      date: "Dec 2024",
      credentialId: "0FLDG2UABM8N",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/0FLDG2UABM8N",
      issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/240px-Coursera-Logo_600x600.svg.png"
    },
    {
      name: "Successful Negotiation: Essential Strategies and Skills",
      issuer: "University of Michigan · Coursera",
      date: "Jan 2025",
      credentialId: "8GJF92N8ND9I",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/8GJF92N8ND9I",
      issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/240px-Coursera-Logo_600x600.svg.png"
    },
    {
      name: "Introduction to JavaScript",
      issuer: "Sololearn",
      date: "Sep 2024",
      credentialId: "CC-NBLQECFA",
      credentialUrl: "https://www.sololearn.com/certificates/CC-NBLQECFA",
      issuerLogo: "https://www.sololearn.com/Images/sololearn-logo.svg"
    },
    {
      name: "CSS Complete Course For Beginners",
      issuer: "Udemy · Proper Dot Institute",
      date: "Aug 2024",
      credentialId: "UC-7880fd28-4ec2-4465-9178-c2defa2d28e7",
      credentialUrl: "https://ude.my/UC-7880fd28-4ec2-4465-9178-c2defa2d28e7",
      issuerLogo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
    },
    {
      name: "Complete Python For Absolute Beginners",
      issuer: "Udemy · Hassan Shoayb",
      date: "Mar 2025",
      credentialId: "UC-6269dbff-f19f-4bdd-a6df-0b862e9cc0ae",
      credentialUrl: "https://ude.my/UC-6269dbff-f19f-4bdd-a6df-0b862e9cc0ae",
      issuerLogo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
    },
    {
      name: "Software Engineering: Software Design and Project Management",
      issuer: "The Hong Kong University of Science and Technology · Coursera",
      date: "Jun 2025",
      credentialId: "L6R245XXZD3G",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/L6R245XXZD3G",
      issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/240px-Coursera-Logo_600x600.svg.png"
    }
  ],
  languages: "Arabic (native) · English B2 · French B1 · German A1",
  telegramBotToken: "8847983717:AAELpQvJm24zrLq68so10X8JcgaNrV9zD2w",
  telegramChatId: "1367086686"
};
