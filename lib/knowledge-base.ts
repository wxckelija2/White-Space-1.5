// White Space AI Knowledge Base
// Comprehensive knowledge covering science, technology, history, arts, business, health, and more
// This serves as offline fallback when API is unavailable

export interface KnowledgeEntry {
  topic: string;
  category: string;
  keywords: string[];
  content: string;
}

export const KNOWLEDGE_CATEGORIES = [
  'science',
  'technology', 
  'history',
  'mathematics',
  'programming',
  'business',
  'health',
  'arts',
  'geography',
  'language',
  'philosophy',
  'psychology',
  'economics',
  'politics',
  'sports',
  'music',
  'literature',
  'cooking',
  'travel',
  'nature',
] as const;

export type KnowledgeCategory = typeof KNOWLEDGE_CATEGORIES[number];

// =============================================================================
// SCIENCE KNOWLEDGE
// =============================================================================

export const SCIENCE_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Photosynthesis',
    category: 'science',
    keywords: ['photosynthesis', 'plants', 'chlorophyll', 'oxygen', 'carbon dioxide', 'sunlight'],
    content: `Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose.

**The Basic Equation:**
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

**Key Components:**
• **Chlorophyll** - Green pigment that absorbs light (mainly red and blue wavelengths)
• **Chloroplasts** - Organelles where photosynthesis occurs
• **Stomata** - Tiny pores on leaves for gas exchange

**Two Main Stages:**
1. **Light-dependent reactions** - Occur in thylakoid membranes, produce ATP and NADPH
2. **Calvin Cycle (Light-independent)** - Occurs in stroma, uses ATP and NADPH to fix CO₂ into glucose

**Importance:**
• Produces oxygen for Earth's atmosphere
• Forms the base of most food chains
• Removes CO₂ from atmosphere
• Creates fossil fuels over millions of years`
  },
  {
    topic: 'DNA and Genetics',
    category: 'science',
    keywords: ['dna', 'genetics', 'genes', 'chromosomes', 'heredity', 'rna', 'mutation', 'genome'],
    content: `DNA (Deoxyribonucleic Acid) is the molecule that carries genetic instructions for all living organisms.

**Structure:**
• Double helix shape discovered by Watson and Crick (1953)
• Made of nucleotides containing: sugar (deoxyribose), phosphate group, and nitrogenous base
• Four bases: Adenine (A), Thymine (T), Guanine (G), Cytosine (C)
• Base pairing: A-T and G-C

**Key Concepts:**
• **Gene** - Segment of DNA that codes for a protein
• **Chromosome** - Organized structure of DNA and proteins
• **Genome** - Complete set of genetic material
• **Allele** - Different versions of a gene

**Central Dogma:**
DNA → RNA → Protein (Transcription → Translation)

**Types of Mutations:**
• Point mutations (single base changes)
• Insertions and deletions
• Chromosomal mutations

**Applications:**
• Genetic testing and screening
• Gene therapy
• Forensic DNA analysis
• Genetic engineering and GMOs`
  },
  {
    topic: 'Evolution',
    category: 'science',
    keywords: ['evolution', 'darwin', 'natural selection', 'adaptation', 'species', 'fossil'],
    content: `Evolution is the change in heritable characteristics of biological populations over successive generations.

**Key Mechanisms:**
1. **Natural Selection** - Organisms with favorable traits survive and reproduce more
2. **Genetic Drift** - Random changes in gene frequency
3. **Gene Flow** - Movement of genes between populations
4. **Mutation** - Source of new genetic variation

**Evidence for Evolution:**
• Fossil record showing transitional forms
• Comparative anatomy (homologous structures)
• Molecular biology (DNA similarities)
• Biogeography (species distribution)
• Direct observation (antibiotic resistance)

**Important Concepts:**
• **Adaptation** - Traits that improve survival/reproduction
• **Speciation** - Formation of new species
• **Common Ancestry** - All life shares ancestors
• **Fitness** - Reproductive success

**Timeline:**
• Life began ~3.8 billion years ago
• First multicellular life ~600 million years ago
• Dinosaurs ~230-66 million years ago
• Humans ~300,000 years ago`
  },
  {
    topic: 'Atoms and Elements',
    category: 'science',
    keywords: ['atom', 'element', 'proton', 'neutron', 'electron', 'periodic table', 'chemistry'],
    content: `Atoms are the basic units of matter and the defining structure of elements.

**Atomic Structure:**
• **Protons** - Positive charge, in nucleus, determines element
• **Neutrons** - No charge, in nucleus, affects isotope
• **Electrons** - Negative charge, orbit nucleus in shells

**Periodic Table Organization:**
• 118 known elements
• Arranged by atomic number (protons)
• Rows = Periods (electron shells)
• Columns = Groups (similar properties)

**Important Groups:**
• Group 1: Alkali metals (reactive, soft)
• Group 17: Halogens (reactive nonmetals)
• Group 18: Noble gases (stable, unreactive)
• Transition metals: Middle of table

**Chemical Bonding:**
• **Ionic** - Transfer of electrons (NaCl)
• **Covalent** - Sharing of electrons (H₂O)
• **Metallic** - Sea of shared electrons

**Common Elements:**
• Hydrogen (H) - Most abundant in universe
• Carbon (C) - Basis of organic chemistry
• Oxygen (O) - Essential for respiration
• Iron (Fe) - Core of Earth, in blood`
  },
  {
    topic: 'The Solar System',
    category: 'science',
    keywords: ['solar system', 'planets', 'sun', 'moon', 'mars', 'jupiter', 'astronomy', 'space'],
    content: `Our Solar System consists of the Sun and everything gravitationally bound to it.

**The Sun:**
• Type: G-type main-sequence star (yellow dwarf)
• Age: ~4.6 billion years
• Composition: 73% hydrogen, 25% helium
• Temperature: 5,500°C surface, 15 million°C core

**The Planets (in order):**
1. **Mercury** - Smallest, closest to Sun, no atmosphere
2. **Venus** - Hottest (462°C), thick CO₂ atmosphere
3. **Earth** - Only known life, liquid water
4. **Mars** - Red planet, potential for past life
5. **Jupiter** - Largest, Great Red Spot storm
6. **Saturn** - Famous rings, 83+ moons
7. **Uranus** - Tilted on side, ice giant
8. **Neptune** - Windiest planet, blue color

**Other Objects:**
• Dwarf planets (Pluto, Ceres, Eris)
• Asteroid belt (between Mars and Jupiter)
• Kuiper Belt (beyond Neptune)
• Oort Cloud (outermost region)

**Distances:**
• Earth to Sun: 150 million km (1 AU)
• Earth to Moon: 384,400 km
• Light from Sun reaches Earth in 8 minutes`
  },
  {
    topic: 'Climate and Weather',
    category: 'science',
    keywords: ['climate', 'weather', 'temperature', 'rain', 'hurricane', 'tornado', 'global warming'],
    content: `Weather is short-term atmospheric conditions; climate is long-term patterns.

**Weather Elements:**
• Temperature
• Precipitation (rain, snow, hail)
• Humidity
• Wind speed and direction
• Air pressure
• Cloud cover

**Major Weather Phenomena:**
• **Hurricanes/Typhoons** - Large rotating storms over warm ocean
• **Tornadoes** - Violent rotating columns of air
• **Thunderstorms** - Convective storms with lightning
• **Blizzards** - Severe snowstorms with high winds

**Climate Zones:**
• Tropical (near equator, warm year-round)
• Temperate (moderate, four seasons)
• Polar (cold, ice-covered)
• Arid (desert, low precipitation)

**Climate Change:**
• Global average temperature rising
• Caused primarily by greenhouse gases (CO₂, methane)
• Effects: sea level rise, extreme weather, ecosystem changes
• Paris Agreement: Limit warming to 1.5-2°C

**Greenhouse Effect:**
• Natural process that warms Earth
• Without it, Earth would be -18°C
• Human activities intensifying it`
  },
  {
    topic: 'Human Body Systems',
    category: 'science',
    keywords: ['body', 'heart', 'brain', 'lungs', 'digestive', 'nervous', 'anatomy', 'organs'],
    content: `The human body consists of 11 major organ systems working together.

**Circulatory System:**
• Heart pumps blood through vessels
• Arteries carry oxygenated blood away
• Veins return deoxygenated blood
• ~5 liters of blood, 100,000 km of vessels

**Respiratory System:**
• Lungs exchange O₂ and CO₂
• Diaphragm controls breathing
• ~12-20 breaths per minute at rest

**Nervous System:**
• Brain: 86 billion neurons
• Spinal cord: information highway
• Peripheral nerves throughout body

**Digestive System:**
• Mouth → Esophagus → Stomach → Small intestine → Large intestine
• Liver, pancreas, gallbladder assist
• Takes 24-72 hours to digest food

**Skeletal System:**
• 206 bones in adults
• Provides structure, protection, movement
• Bone marrow produces blood cells

**Muscular System:**
• ~600 muscles
• Three types: skeletal, smooth, cardiac

**Other Systems:**
• Immune (defense against pathogens)
• Endocrine (hormones)
• Reproductive
• Urinary (waste removal)
• Integumentary (skin, hair, nails)`
  },
  {
    topic: 'Physics Fundamentals',
    category: 'science',
    keywords: ['physics', 'force', 'energy', 'motion', 'gravity', 'newton', 'momentum', 'velocity'],
    content: `Physics is the study of matter, energy, and their interactions.

**Newton's Laws of Motion:**
1. **Inertia** - Object at rest stays at rest; object in motion stays in motion
2. **F = ma** - Force equals mass times acceleration
3. **Action-Reaction** - Every action has equal and opposite reaction

**Types of Energy:**
• Kinetic (motion)
• Potential (stored - gravitational, elastic, chemical)
• Thermal (heat)
• Electromagnetic (light, radio waves)
• Nuclear

**Key Equations:**
• Velocity: v = d/t
• Acceleration: a = Δv/t
• Force: F = ma
• Work: W = F × d
• Kinetic Energy: KE = ½mv²
• Potential Energy: PE = mgh

**Fundamental Forces:**
1. Gravity (weakest, infinite range)
2. Electromagnetic (light, electricity, magnetism)
3. Strong nuclear (holds atomic nuclei together)
4. Weak nuclear (radioactive decay)

**Einstein's Contributions:**
• E = mc² (mass-energy equivalence)
• Special Relativity (time dilation, length contraction)
• General Relativity (gravity as curved spacetime)`
  },
  {
    topic: 'Electricity and Magnetism',
    category: 'science',
    keywords: ['electricity', 'magnetism', 'current', 'voltage', 'circuit', 'electromagnetic'],
    content: `Electricity and magnetism are related phenomena described by electromagnetism.

**Electric Charge:**
• Positive (protons) and negative (electrons)
• Like charges repel, opposite charges attract
• Measured in Coulombs (C)

**Electric Current:**
• Flow of electric charge
• Measured in Amperes (A)
• Direct Current (DC) - flows one direction
• Alternating Current (AC) - changes direction

**Key Concepts:**
• **Voltage (V)** - Electric potential difference (pressure)
• **Current (I)** - Flow rate of charge
• **Resistance (R)** - Opposition to current flow
• **Ohm's Law:** V = IR

**Circuits:**
• Series: Components in a line (current same, voltage divides)
• Parallel: Components on branches (voltage same, current divides)

**Magnetism:**
• Caused by moving electric charges
• Magnetic poles: North and South
• Earth has magnetic field (compass navigation)

**Electromagnetic Spectrum:**
Radio → Microwave → Infrared → Visible → UV → X-ray → Gamma

**Applications:**
• Electric motors and generators
• Transformers
• Electromagnets
• Wireless communication`
  },
  {
    topic: 'Cells and Microbiology',
    category: 'science',
    keywords: ['cell', 'bacteria', 'virus', 'microbe', 'organelle', 'mitochondria', 'nucleus'],
    content: `Cells are the basic structural and functional units of all living organisms.

**Cell Types:**
• **Prokaryotic** - No nucleus (bacteria, archaea)
• **Eukaryotic** - Has nucleus (plants, animals, fungi)

**Key Organelles:**
• **Nucleus** - Contains DNA, controls cell
• **Mitochondria** - Powerhouse, produces ATP
• **Ribosomes** - Protein synthesis
• **Endoplasmic Reticulum** - Protein/lipid processing
• **Golgi Apparatus** - Packaging and shipping
• **Cell Membrane** - Controls what enters/exits

**Plant Cell Extras:**
• Cell wall (rigid structure)
• Chloroplasts (photosynthesis)
• Large central vacuole

**Cell Division:**
• **Mitosis** - Creates identical cells (growth, repair)
• **Meiosis** - Creates sex cells (half chromosomes)

**Microorganisms:**
• **Bacteria** - Single-celled prokaryotes
• **Viruses** - Not truly alive, need host cells
• **Fungi** - Includes yeasts, molds, mushrooms
• **Protists** - Diverse eukaryotes (amoeba, algae)

**Importance:**
• Decomposition and nutrient cycling
• Food production (yogurt, bread, cheese)
• Medicine (antibiotics, vaccines)
• Disease (infections, pandemics)`
  },
];

// =============================================================================
// TECHNOLOGY KNOWLEDGE
// =============================================================================

export const TECHNOLOGY_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Artificial Intelligence',
    category: 'technology',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'neural network', 'deep learning', 'chatgpt', 'gpt'],
    content: `Artificial Intelligence (AI) is the simulation of human intelligence by machines.

**Types of AI:**
• **Narrow AI** - Specialized for specific tasks (current AI)
• **General AI (AGI)** - Human-level reasoning (theoretical)
• **Superintelligent AI** - Surpasses human intelligence (hypothetical)

**Machine Learning:**
• Algorithms that learn from data
• **Supervised Learning** - Labeled training data
• **Unsupervised Learning** - Finds patterns in unlabeled data
• **Reinforcement Learning** - Learns through rewards/penalties

**Deep Learning:**
• Uses artificial neural networks
• Multiple layers process information
• Powers image recognition, language models
• Requires large amounts of data and compute

**Large Language Models (LLMs):**
• GPT-4, Claude, Gemini, LLaMA
• Trained on vast text datasets
• Generate human-like text
• Can code, write, analyze, translate

**AI Applications:**
• Virtual assistants (Siri, Alexa)
• Recommendation systems (Netflix, Spotify)
• Autonomous vehicles
• Medical diagnosis
• Fraud detection
• Content generation

**Ethical Concerns:**
• Bias in training data
• Job displacement
• Privacy issues
• Misinformation
• AI safety and alignment`
  },
  {
    topic: 'Blockchain and Cryptocurrency',
    category: 'technology',
    keywords: ['blockchain', 'bitcoin', 'cryptocurrency', 'ethereum', 'crypto', 'nft', 'web3', 'defi'],
    content: `Blockchain is a distributed ledger technology that records transactions across many computers.

**How Blockchain Works:**
• Transactions grouped into blocks
• Each block linked to previous (chain)
• Cryptographically secured
• Distributed across network (decentralized)
• Immutable once confirmed

**Key Concepts:**
• **Consensus Mechanisms:**
  - Proof of Work (mining, energy-intensive)
  - Proof of Stake (validators stake coins)
• **Smart Contracts** - Self-executing code on blockchain
• **Wallets** - Store private keys to access crypto

**Major Cryptocurrencies:**
• **Bitcoin (BTC)** - First crypto, digital gold, store of value
• **Ethereum (ETH)** - Smart contracts platform
• **Stablecoins** - Pegged to fiat (USDT, USDC)
• **Altcoins** - All other cryptocurrencies

**Web3 Concepts:**
• Decentralized applications (dApps)
• DeFi (Decentralized Finance)
• NFTs (Non-Fungible Tokens)
• DAOs (Decentralized Autonomous Organizations)

**Use Cases:**
• Cross-border payments
• Supply chain tracking
• Digital identity
• Voting systems
• Tokenization of assets

**Risks:**
• Volatility
• Regulatory uncertainty
• Security vulnerabilities
• Environmental concerns (PoW)`
  },
  {
    topic: 'Cloud Computing',
    category: 'technology',
    keywords: ['cloud', 'aws', 'azure', 'google cloud', 'saas', 'paas', 'iaas', 'server'],
    content: `Cloud computing delivers computing services over the internet.

**Service Models:**
• **IaaS (Infrastructure)** - Virtual machines, storage, networks
• **PaaS (Platform)** - Development platforms, databases
• **SaaS (Software)** - Applications (Gmail, Salesforce, Office 365)

**Deployment Models:**
• **Public Cloud** - Shared infrastructure (AWS, Azure, GCP)
• **Private Cloud** - Dedicated to one organization
• **Hybrid Cloud** - Combination of public and private

**Major Providers:**
• **AWS (Amazon)** - Largest market share, most services
• **Azure (Microsoft)** - Strong enterprise integration
• **Google Cloud** - AI/ML strengths, Kubernetes
• **Others** - IBM, Oracle, Alibaba, DigitalOcean

**Key Services:**
• Compute (EC2, Lambda, VMs)
• Storage (S3, Blob Storage)
• Databases (RDS, DynamoDB, Firestore)
• Networking (VPC, Load Balancers)
• AI/ML (SageMaker, Vertex AI)

**Benefits:**
• Scalability (scale up/down as needed)
• Cost efficiency (pay for what you use)
• Global availability
• Managed services (less maintenance)
• Disaster recovery

**Considerations:**
• Data security and privacy
• Vendor lock-in
• Latency for some applications
• Compliance requirements`
  },
  {
    topic: 'Cybersecurity',
    category: 'technology',
    keywords: ['security', 'hacking', 'password', 'encryption', 'firewall', 'malware', 'phishing', 'cyber'],
    content: `Cybersecurity protects systems, networks, and data from digital attacks.

**Common Threats:**
• **Malware** - Viruses, worms, trojans, ransomware
• **Phishing** - Fake emails/sites to steal credentials
• **Social Engineering** - Manipulating people
• **DDoS** - Overwhelming servers with traffic
• **Man-in-the-Middle** - Intercepting communications
• **SQL Injection** - Attacking databases through inputs

**Protection Measures:**
• Strong, unique passwords
• Two-factor authentication (2FA)
• Regular software updates
• Firewalls and antivirus
• Encryption (HTTPS, VPNs)
• Security awareness training

**Encryption Types:**
• **Symmetric** - Same key encrypts/decrypts (AES)
• **Asymmetric** - Public/private key pairs (RSA)
• **Hashing** - One-way transformation (SHA-256)

**Security Frameworks:**
• NIST Cybersecurity Framework
• ISO 27001
• SOC 2
• GDPR (data protection)

**Career Paths:**
• Security Analyst
• Penetration Tester
• Security Engineer
• CISO (Chief Information Security Officer)

**Best Practices:**
• Principle of least privilege
• Defense in depth
• Regular backups
• Incident response planning
• Security audits`
  },
  {
    topic: 'Internet and Networking',
    category: 'technology',
    keywords: ['internet', 'network', 'wifi', 'router', 'ip address', 'dns', 'http', 'tcp'],
    content: `The Internet is a global network of interconnected computer networks.

**How the Internet Works:**
• Data travels in packets
• Routers direct traffic between networks
• Protocols ensure reliable communication

**Key Protocols:**
• **TCP/IP** - Foundation of internet communication
• **HTTP/HTTPS** - Web page transfer
• **DNS** - Translates domain names to IP addresses
• **SMTP/IMAP** - Email protocols
• **FTP** - File transfer

**IP Addresses:**
• **IPv4** - 32-bit (e.g., 192.168.1.1)
• **IPv6** - 128-bit (e.g., 2001:0db8:...)
• Public vs Private addresses
• Static vs Dynamic (DHCP)

**Network Types:**
• **LAN** - Local Area Network (home, office)
• **WAN** - Wide Area Network (cities, countries)
• **WLAN** - Wireless LAN (WiFi)
• **VPN** - Virtual Private Network (secure tunnel)

**WiFi Standards:**
• 802.11n (WiFi 4) - Up to 600 Mbps
• 802.11ac (WiFi 5) - Up to 3.5 Gbps
• 802.11ax (WiFi 6) - Up to 9.6 Gbps

**Network Security:**
• WPA3 encryption for WiFi
• Firewalls filter traffic
• VPNs encrypt connections
• Network segmentation

**Internet History:**
• ARPANET (1969) - First network
• TCP/IP adopted (1983)
• World Wide Web (1991)
• Broadband era (2000s)
• Mobile internet (2010s)`
  },
  {
    topic: 'Mobile Technology',
    category: 'technology',
    keywords: ['smartphone', 'mobile', 'ios', 'android', 'app', '5g', 'tablet'],
    content: `Mobile technology encompasses portable computing devices and their ecosystems.

**Mobile Operating Systems:**
• **iOS** - Apple's system for iPhone/iPad
  - Closed ecosystem, App Store only
  - Known for security and optimization
• **Android** - Google's open-source OS
  - Used by Samsung, Google, OnePlus, etc.
  - More customizable, multiple app stores

**Mobile Networks:**
• **2G** - Basic calls and texts
• **3G** - Mobile internet
• **4G LTE** - Fast data (up to 100 Mbps)
• **5G** - Ultra-fast (up to 10 Gbps), low latency

**App Development:**
• **Native** - Platform-specific (Swift/Kotlin)
• **Cross-platform** - React Native, Flutter
• **Progressive Web Apps** - Web-based mobile apps

**Key Technologies:**
• GPS and location services
• NFC (contactless payments)
• Biometrics (fingerprint, Face ID)
• Bluetooth and WiFi
• Camera and sensors

**Mobile Trends:**
• Foldable phones
• 5G adoption
• Mobile payments
• AR/VR integration
• AI assistants

**App Categories:**
• Social media
• Productivity
• Entertainment
• Health and fitness
• E-commerce
• Gaming`
  },
  {
    topic: 'Software Development',
    category: 'technology',
    keywords: ['software', 'developer', 'programming', 'code', 'agile', 'devops', 'git'],
    content: `Software development is the process of creating computer programs and applications.

**Development Methodologies:**
• **Waterfall** - Sequential phases
• **Agile** - Iterative, flexible
• **Scrum** - Sprints, daily standups
• **Kanban** - Visual workflow boards

**Software Development Lifecycle:**
1. Requirements gathering
2. Design
3. Implementation (coding)
4. Testing
5. Deployment
6. Maintenance

**Version Control:**
• **Git** - Most popular VCS
• **GitHub/GitLab/Bitbucket** - Hosting platforms
• Branches, commits, pull requests
• Collaboration and code review

**DevOps Practices:**
• Continuous Integration (CI)
• Continuous Deployment (CD)
• Infrastructure as Code
• Monitoring and logging
• Containerization (Docker)

**Testing Types:**
• Unit testing
• Integration testing
• End-to-end testing
• Performance testing
• Security testing

**Development Tools:**
• IDEs (VS Code, IntelliJ, Xcode)
• Package managers (npm, pip, Maven)
• Build tools (Webpack, Gradle)
• Debugging tools

**Career Paths:**
• Frontend Developer
• Backend Developer
• Full-Stack Developer
• Mobile Developer
• DevOps Engineer
• QA Engineer`
  },
  {
    topic: 'Databases',
    category: 'technology',
    keywords: ['database', 'sql', 'mysql', 'postgresql', 'mongodb', 'nosql', 'data'],
    content: `Databases are organized collections of data stored and accessed electronically.

**Database Types:**
• **Relational (SQL):**
  - Tables with rows and columns
  - Structured Query Language
  - ACID compliance
  - Examples: MySQL, PostgreSQL, Oracle

• **NoSQL:**
  - Document stores (MongoDB)
  - Key-value stores (Redis)
  - Column stores (Cassandra)
  - Graph databases (Neo4j)

**SQL Basics:**
\`\`\`sql
SELECT * FROM users WHERE age > 18;
INSERT INTO users (name, email) VALUES ('John', 'john@email.com');
UPDATE users SET name = 'Jane' WHERE id = 1;
DELETE FROM users WHERE id = 1;
\`\`\`

**Key Concepts:**
• **Primary Key** - Unique identifier
• **Foreign Key** - Links tables
• **Index** - Speeds up queries
• **Normalization** - Reduces redundancy
• **Transactions** - Atomic operations

**Database Design:**
• Entity-Relationship diagrams
• Schema design
• Query optimization
• Scaling strategies

**Modern Solutions:**
• Cloud databases (RDS, Cloud SQL)
• Serverless (DynamoDB, Firestore)
• Data warehouses (Snowflake, BigQuery)
• Real-time databases (Firebase)

**Best Practices:**
• Regular backups
• Security (encryption, access control)
• Performance monitoring
• Proper indexing`
  },
];

// =============================================================================
// PROGRAMMING KNOWLEDGE
// =============================================================================

export const PROGRAMMING_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'JavaScript',
    category: 'programming',
    keywords: ['javascript', 'js', 'node', 'react', 'vue', 'angular', 'typescript', 'npm'],
    content: `JavaScript is a versatile programming language primarily used for web development.

**Core Concepts:**
• Variables: let, const, var
• Data types: string, number, boolean, object, array, null, undefined
• Functions: regular, arrow, async/await
• Objects and classes
• Promises and async programming

**Modern JavaScript (ES6+):**
• Arrow functions: (x) => x * 2
• Template literals: \`Hello \${name}\`
• Destructuring: const {a, b} = obj
• Spread operator: [...array]
• Modules: import/export

**Popular Frameworks:**
• **React** - Component-based UI library by Meta
• **Vue** - Progressive framework
• **Angular** - Full framework by Google
• **Node.js** - Server-side JavaScript runtime

**TypeScript:**
• Superset of JavaScript with static typing
• Catches errors at compile time
• Better IDE support and refactoring

**Package Management:**
• npm (Node Package Manager)
• yarn
• pnpm

**Common Use Cases:**
• Web applications
• Mobile apps (React Native)
• Server-side (Node.js)
• Desktop apps (Electron)`
  },
  {
    topic: 'Python',
    category: 'programming',
    keywords: ['python', 'django', 'flask', 'pandas', 'numpy', 'machine learning', 'pip'],
    content: `Python is a high-level, interpreted programming language known for readability.

**Key Features:**
• Clean, readable syntax
• Dynamic typing
• Extensive standard library
• Cross-platform

**Basic Syntax:**
\`\`\`python
# Variables
name = "Alice"
age = 25
is_student = True

# Functions
def greet(name):
    return f"Hello, {name}!"

# Lists and loops
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num)

# Classes
class Person:
    def __init__(self, name):
        self.name = name
\`\`\`

**Popular Libraries:**
• **NumPy** - Numerical computing
• **Pandas** - Data analysis
• **Matplotlib** - Visualization
• **TensorFlow/PyTorch** - Machine learning
• **Django/Flask** - Web frameworks
• **Requests** - HTTP library

**Use Cases:**
• Data science and analytics
• Machine learning and AI
• Web development
• Automation and scripting
• Scientific computing

**Package Management:**
• pip (Python Package Installer)
• conda (for data science)
• virtualenv/venv for environments`
  },
  {
    topic: 'HTML and CSS',
    category: 'programming',
    keywords: ['html', 'css', 'web', 'website', 'frontend', 'flexbox', 'grid', 'responsive'],
    content: `HTML and CSS are the foundational technologies for building web pages.

**HTML (HyperText Markup Language):**
• Structure and content of web pages
• Uses tags: <element>content</element>

**Essential HTML Tags:**
• <html>, <head>, <body> - Document structure
• <h1>-<h6> - Headings
• <p> - Paragraphs
• <a href=""> - Links
• <img src=""> - Images
• <div>, <span> - Containers
• <form>, <input>, <button> - Forms
• <ul>, <ol>, <li> - Lists
• <table>, <tr>, <td> - Tables

**HTML5 Semantic Elements:**
• <header>, <footer>, <nav>
• <main>, <article>, <section>
• <aside>, <figure>

**CSS (Cascading Style Sheets):**
• Styling and layout of web pages
• Selectors target HTML elements

**CSS Concepts:**
• Box model (margin, border, padding, content)
• Flexbox - One-dimensional layouts
• Grid - Two-dimensional layouts
• Media queries - Responsive design
• Animations and transitions

**Modern CSS:**
• CSS Variables: --primary-color
• Flexbox and Grid layouts
• CSS-in-JS solutions
• Preprocessors (Sass, Less)

**Responsive Design:**
• Mobile-first approach
• Breakpoints for different screen sizes
• Flexible images and grids`
  },
  {
    topic: 'React',
    category: 'programming',
    keywords: ['react', 'reactjs', 'jsx', 'hooks', 'component', 'state', 'props', 'redux'],
    content: `React is a JavaScript library for building user interfaces, developed by Meta.

**Core Concepts:**
• **Components** - Reusable UI pieces
• **JSX** - JavaScript XML syntax
• **Props** - Data passed to components
• **State** - Component's internal data

**Component Types:**
\`\`\`jsx
// Functional Component
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}

// With Hooks
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

**Essential Hooks:**
• useState - State management
• useEffect - Side effects
• useContext - Context access
• useRef - DOM references
• useMemo/useCallback - Performance

**State Management:**
• useState for local state
• Context API for shared state
• Redux for complex apps
• Zustand, Jotai, Recoil alternatives

**React Ecosystem:**
• React Router - Navigation
• React Query - Data fetching
• Styled Components - CSS-in-JS
• Next.js - Full-stack framework

**Best Practices:**
• Keep components small and focused
• Lift state up when needed
• Use keys for lists
• Avoid prop drilling with Context`
  },
  {
    topic: 'Git Version Control',
    category: 'programming',
    keywords: ['git', 'github', 'version control', 'commit', 'branch', 'merge', 'pull request'],
    content: `Git is a distributed version control system for tracking code changes.

**Basic Commands:**
\`\`\`bash
git init              # Initialize repository
git clone <url>       # Clone repository
git add .             # Stage changes
git commit -m "msg"   # Commit changes
git push              # Push to remote
git pull              # Pull from remote
git status            # Check status
git log               # View history
\`\`\`

**Branching:**
\`\`\`bash
git branch            # List branches
git branch <name>     # Create branch
git checkout <name>   # Switch branch
git checkout -b <name> # Create and switch
git merge <branch>    # Merge branch
git branch -d <name>  # Delete branch
\`\`\`

**Workflow:**
1. Create feature branch
2. Make changes and commit
3. Push to remote
4. Create pull request
5. Code review
6. Merge to main

**Common Scenarios:**
• Resolving merge conflicts
• Reverting commits: git revert
• Resetting changes: git reset
• Stashing work: git stash

**GitHub/GitLab Features:**
• Pull/Merge requests
• Issues and project boards
• Actions/CI pipelines
• Code review tools
• Wiki and documentation`
  },
  {
    topic: 'APIs and REST',
    category: 'programming',
    keywords: ['api', 'rest', 'restful', 'http', 'json', 'endpoint', 'graphql', 'fetch'],
    content: `APIs (Application Programming Interfaces) allow software systems to communicate.

**REST (Representational State Transfer):**
• Architectural style for web services
• Uses HTTP methods
• Stateless communication
• Resource-based URLs

**HTTP Methods:**
• GET - Retrieve data
• POST - Create data
• PUT - Update data (full)
• PATCH - Update data (partial)
• DELETE - Remove data

**HTTP Status Codes:**
• 200 OK - Success
• 201 Created - Resource created
• 400 Bad Request - Client error
• 401 Unauthorized - Auth required
• 404 Not Found - Resource missing
• 500 Internal Server Error

**REST Best Practices:**
• Use nouns for endpoints: /users, /posts
• Use HTTP methods correctly
• Return appropriate status codes
• Version your API: /api/v1/
• Use pagination for lists

**Making API Calls:**
\`\`\`javascript
// Fetch API
const response = await fetch('/api/users');
const data = await response.json();

// With options
await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
});
\`\`\`

**GraphQL Alternative:**
• Query language for APIs
• Client specifies exact data needed
• Single endpoint
• Strongly typed schema`
  },
];

// =============================================================================
// HISTORY KNOWLEDGE
// =============================================================================

export const HISTORY_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'World War II',
    category: 'history',
    keywords: ['ww2', 'world war 2', 'hitler', 'nazi', 'holocaust', 'pearl harbor', '1945', '1939'],
    content: `World War II (1939-1945) was the deadliest conflict in human history.

**Key Dates:**
• Sept 1, 1939 - Germany invades Poland (war begins)
• Dec 7, 1941 - Pearl Harbor attack (US enters war)
• June 6, 1944 - D-Day (Normandy invasion)
• May 8, 1945 - V-E Day (Germany surrenders)
• Aug 6 & 9, 1945 - Atomic bombs on Hiroshima/Nagasaki
• Sept 2, 1945 - V-J Day (Japan surrenders)

**Major Powers:**
Allies: USA, UK, USSR, France, China
Axis: Germany, Italy, Japan

**Key Figures:**
• Adolf Hitler - Nazi Germany dictator
• Winston Churchill - British Prime Minister
• Franklin D. Roosevelt - US President
• Joseph Stalin - Soviet leader
• Dwight Eisenhower - Allied Supreme Commander

**The Holocaust:**
• Systematic genocide of 6 million Jews
• Also targeted Roma, disabled, LGBTQ+, political prisoners
• Concentration and extermination camps
• Nuremberg Trials held war criminals accountable

**Aftermath:**
• 70-85 million deaths (deadliest war ever)
• United Nations founded (1945)
• Cold War begins
• Decolonization accelerates
• Marshall Plan rebuilds Europe`
  },
  {
    topic: 'Ancient Rome',
    category: 'history',
    keywords: ['rome', 'roman', 'caesar', 'empire', 'gladiator', 'colosseum', 'latin'],
    content: `Ancient Rome was one of history's most influential civilizations.

**Timeline:**
• 753 BC - Legendary founding of Rome
• 509 BC - Roman Republic established
• 27 BC - Roman Empire begins (Augustus)
• 476 AD - Fall of Western Roman Empire

**Government Evolution:**
• Kingdom (753-509 BC)
• Republic (509-27 BC) - Senate, consuls
• Empire (27 BC-476 AD) - Emperors

**Notable Emperors:**
• Augustus - First emperor, Pax Romana
• Nero - Great Fire of Rome
• Trajan - Maximum territorial extent
• Marcus Aurelius - Philosopher emperor
• Constantine - Legalized Christianity

**Achievements:**
• Roads and aqueducts
• Latin language (basis for Romance languages)
• Roman law (influenced modern legal systems)
• Architecture (arches, domes, concrete)
• Military organization (legions)

**Daily Life:**
• Gladiatorial games in Colosseum
• Public baths and forums
• Slavery was widespread
• Toga as formal dress

**Fall of Rome:**
• Economic troubles
• Military overextension
• Barbarian invasions
• Political instability
• Split into Eastern/Western empires`
  },
  {
    topic: 'American Revolution',
    category: 'history',
    keywords: ['american revolution', '1776', 'independence', 'washington', 'founding fathers', 'boston tea party'],
    content: `The American Revolution (1765-1783) established the United States of America.

**Causes:**
• "No taxation without representation"
• British taxes (Stamp Act, Tea Act)
• Quartering of British soldiers
• Desire for self-governance

**Key Events:**
• 1773 - Boston Tea Party
• 1775 - Battles of Lexington and Concord
• 1776 - Declaration of Independence (July 4)
• 1777 - Battle of Saratoga (turning point)
• 1781 - Battle of Yorktown (British surrender)
• 1783 - Treaty of Paris (independence recognized)

**Founding Fathers:**
• George Washington - Commander, 1st President
• Thomas Jefferson - Declaration author
• Benjamin Franklin - Diplomat, inventor
• John Adams - 2nd President
• James Madison - "Father of Constitution"
• Alexander Hamilton - Treasury Secretary

**Key Documents:**
• Declaration of Independence (1776)
• Articles of Confederation (1781)
• Constitution (1787)
• Bill of Rights (1791)

**Impact:**
• First modern constitutional republic
• Inspired French Revolution
• Established democratic ideals
• Separation of church and state`
  },
  {
    topic: 'Ancient Egypt',
    category: 'history',
    keywords: ['egypt', 'pharaoh', 'pyramid', 'mummy', 'nile', 'cleopatra', 'tutankhamun', 'hieroglyphics'],
    content: `Ancient Egypt was a civilization along the Nile River lasting over 3,000 years.

**Timeline:**
• 3100 BC - Unification under first pharaoh
• 2686-2181 BC - Old Kingdom (pyramid building)
• 2055-1650 BC - Middle Kingdom
• 1550-1069 BC - New Kingdom (height of power)
• 30 BC - Roman conquest (end of ancient Egypt)

**The Pyramids:**
• Great Pyramid of Giza - Built for Pharaoh Khufu
• One of Seven Wonders of Ancient World
• Built with 2.3 million stone blocks
• Took ~20 years to construct

**Pharaohs:**
• Khufu - Built Great Pyramid
• Hatshepsut - Female pharaoh
• Ramesses II - Longest reign, great builder
• Tutankhamun - Famous tomb discovery (1922)
• Cleopatra VII - Last pharaoh

**Religion:**
• Polytheistic (many gods)
• Ra (sun god), Osiris (afterlife), Isis, Anubis
• Mummification for afterlife
• Book of the Dead

**Achievements:**
• Hieroglyphic writing
• 365-day calendar
• Advanced medicine
• Monumental architecture
• Paper from papyrus

**The Nile:**
• "Gift of the Nile" - annual flooding
• Fertile soil for agriculture
• Transportation highway
• Life source of civilization`
  },
  {
    topic: 'Industrial Revolution',
    category: 'history',
    keywords: ['industrial revolution', 'factory', 'steam engine', 'manufacturing', '1800s', 'victorian'],
    content: `The Industrial Revolution (1760-1840) transformed society from agrarian to industrial.

**Origins:**
• Started in Britain
• Spread to Europe, North America
• Combination of factors enabled it

**Key Inventions:**
• Steam engine (James Watt, 1769)
• Spinning jenny (textile production)
• Power loom (mechanized weaving)
• Cotton gin (Eli Whitney)
• Steam locomotive (George Stephenson)

**Changes:**
• Factory system replaced cottage industry
• Urbanization (people moved to cities)
• New social classes (industrial workers, factory owners)
• Child labor was common
• Transportation revolution (railroads, steamships)

**Social Impact:**
• Population growth
• Rise of middle class
• Labor movements and unions
• Public health challenges
• Education reforms

**Second Industrial Revolution (1870-1914):**
• Electricity and electric light
• Steel production
• Petroleum and automobiles
• Telephone and radio
• Assembly line (Henry Ford)

**Legacy:**
• Modern capitalism
• Environmental impact
• Global trade expansion
• Technological progress continues`
  },
  {
    topic: 'Civil Rights Movement',
    category: 'history',
    keywords: ['civil rights', 'mlk', 'martin luther king', 'rosa parks', 'segregation', 'equality', '1960s'],
    content: `The Civil Rights Movement (1954-1968) fought for racial equality in America.

**Background:**
• Jim Crow laws enforced segregation
• "Separate but equal" (Plessy v. Ferguson, 1896)
• Discrimination in voting, housing, employment

**Key Events:**
• 1954 - Brown v. Board of Education (school desegregation)
• 1955 - Rosa Parks, Montgomery Bus Boycott
• 1960 - Greensboro sit-ins
• 1963 - March on Washington, "I Have a Dream"
• 1964 - Civil Rights Act
• 1965 - Voting Rights Act, Selma marches
• 1968 - MLK assassination

**Key Figures:**
• Martin Luther King Jr. - Nonviolent leader
• Rosa Parks - "Mother of the Movement"
• Malcolm X - Black nationalism
• John Lewis - SNCC leader, congressman
• Thurgood Marshall - First Black Supreme Court Justice

**Organizations:**
• NAACP - Legal challenges
• SCLC - MLK's organization
• SNCC - Student activism
• Congress of Racial Equality (CORE)

**Strategies:**
• Nonviolent protest
• Civil disobedience
• Boycotts
• Legal challenges
• Voter registration

**Legacy:**
• End of legal segregation
• Voting rights protection
• Inspiration for other movements
• Ongoing struggle for equality`
  },
];

// =============================================================================
// MATHEMATICS KNOWLEDGE
// =============================================================================

export const MATH_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Algebra Basics',
    category: 'mathematics',
    keywords: ['algebra', 'equation', 'variable', 'solve', 'x', 'formula', 'expression'],
    content: `Algebra is the branch of mathematics dealing with symbols and rules for manipulating them.

**Key Concepts:**
• Variables represent unknown values (x, y, z)
• Expressions combine numbers and variables
• Equations state that two expressions are equal

**Solving Linear Equations:**
Example: 2x + 5 = 13
1. Subtract 5 from both sides: 2x = 8
2. Divide by 2: x = 4

**Order of Operations (PEMDAS):**
1. Parentheses
2. Exponents
3. Multiplication/Division (left to right)
4. Addition/Subtraction (left to right)

**Common Formulas:**
• Slope: m = (y₂ - y₁)/(x₂ - x₁)
• Slope-intercept: y = mx + b
• Quadratic formula: x = (-b ± √(b²-4ac))/2a
• Distance: d = √((x₂-x₁)² + (y₂-y₁)²)

**Factoring:**
• x² + 5x + 6 = (x + 2)(x + 3)
• Difference of squares: a² - b² = (a+b)(a-b)

**Inequalities:**
• < less than, > greater than
• ≤ less than or equal, ≥ greater than or equal
• Flip sign when multiplying/dividing by negative`
  },
  {
    topic: 'Geometry',
    category: 'mathematics',
    keywords: ['geometry', 'triangle', 'circle', 'area', 'perimeter', 'angle', 'shape', 'volume'],
    content: `Geometry studies shapes, sizes, positions, and properties of space.

**Basic Shapes:**
• Triangle - 3 sides, angles sum to 180°
• Square - 4 equal sides, 4 right angles
• Rectangle - 4 sides, opposite sides equal
• Circle - All points equidistant from center

**Area Formulas:**
• Rectangle: A = length × width
• Triangle: A = ½ × base × height
• Circle: A = πr²
• Trapezoid: A = ½(b₁ + b₂) × h

**Perimeter/Circumference:**
• Rectangle: P = 2(l + w)
• Circle: C = 2πr = πd

**Volume Formulas:**
• Cube: V = s³
• Rectangular prism: V = l × w × h
• Cylinder: V = πr²h
• Sphere: V = (4/3)πr³
• Cone: V = (1/3)πr²h

**Pythagorean Theorem:**
a² + b² = c² (for right triangles)

**Angle Types:**
• Acute: < 90°
• Right: = 90°
• Obtuse: > 90°
• Straight: = 180°

**Triangle Types:**
• Equilateral - All sides equal
• Isosceles - Two sides equal
• Scalene - No sides equal`
  },
  {
    topic: 'Statistics and Probability',
    category: 'mathematics',
    keywords: ['statistics', 'probability', 'mean', 'median', 'mode', 'average', 'percent', 'data'],
    content: `Statistics analyzes data; probability measures likelihood of events.

**Measures of Central Tendency:**
• **Mean (Average):** Sum of values ÷ number of values
• **Median:** Middle value when sorted
• **Mode:** Most frequent value

**Example:** Data: 2, 3, 3, 5, 7
• Mean: (2+3+3+5+7)/5 = 4
• Median: 3 (middle value)
• Mode: 3 (appears twice)

**Measures of Spread:**
• Range: Maximum - Minimum
• Variance: Average of squared deviations
• Standard Deviation: √Variance

**Probability Basics:**
• P(event) = favorable outcomes / total outcomes
• Probability ranges from 0 to 1 (or 0% to 100%)
• P(not A) = 1 - P(A)

**Probability Rules:**
• Independent events: P(A and B) = P(A) × P(B)
• Mutually exclusive: P(A or B) = P(A) + P(B)
• General: P(A or B) = P(A) + P(B) - P(A and B)

**Percentages:**
• To find X% of Y: (X/100) × Y
• Percent change: ((New - Old)/Old) × 100
• Part/Whole × 100 = Percentage`
  },
  {
    topic: 'Calculus',
    category: 'mathematics',
    keywords: ['calculus', 'derivative', 'integral', 'limit', 'differentiation', 'integration'],
    content: `Calculus studies continuous change through derivatives and integrals.

**Limits:**
• Foundation of calculus
• lim(x→a) f(x) = L means f(x) approaches L as x approaches a
• Used to define derivatives and integrals

**Derivatives (Rate of Change):**
• f'(x) or df/dx represents instantaneous rate of change
• Slope of tangent line to curve

**Basic Derivative Rules:**
• Power rule: d/dx(xⁿ) = nxⁿ⁻¹
• Constant: d/dx(c) = 0
• Sum rule: d/dx(f + g) = f' + g'
• Product rule: d/dx(fg) = f'g + fg'
• Chain rule: d/dx(f(g(x))) = f'(g(x)) × g'(x)

**Common Derivatives:**
• d/dx(sin x) = cos x
• d/dx(cos x) = -sin x
• d/dx(eˣ) = eˣ
• d/dx(ln x) = 1/x

**Integrals (Area Under Curve):**
• Reverse of differentiation
• ∫xⁿ dx = xⁿ⁺¹/(n+1) + C

**Applications:**
• Velocity and acceleration
• Optimization problems
• Area and volume calculations
• Physics and engineering`
  },
];

// =============================================================================
// BUSINESS & ECONOMICS KNOWLEDGE
// =============================================================================

export const BUSINESS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Economics Basics',
    category: 'economics',
    keywords: ['economics', 'supply', 'demand', 'market', 'inflation', 'gdp', 'recession'],
    content: `Economics studies how societies allocate scarce resources.

**Supply and Demand:**
• Demand: Quantity buyers want at various prices
• Supply: Quantity sellers offer at various prices
• Equilibrium: Where supply meets demand
• Price increases → demand decreases, supply increases

**Key Economic Indicators:**
• **GDP (Gross Domestic Product):** Total value of goods/services produced
• **Inflation:** Rate of price increases
• **Unemployment Rate:** Percentage of workforce without jobs
• **Interest Rates:** Cost of borrowing money

**Types of Markets:**
• Perfect competition (many sellers, identical products)
• Monopoly (one seller)
• Oligopoly (few sellers)
• Monopolistic competition (many sellers, differentiated products)

**Economic Systems:**
• Capitalism (private ownership, free markets)
• Socialism (government ownership of key industries)
• Mixed economy (combination)

**Business Cycles:**
• Expansion (growth)
• Peak (highest point)
• Recession (decline for 2+ quarters)
• Trough (lowest point)
• Recovery

**Monetary vs Fiscal Policy:**
• Monetary: Central bank controls money supply, interest rates
• Fiscal: Government spending and taxation`
  },
  {
    topic: 'Personal Finance',
    category: 'business',
    keywords: ['money', 'budget', 'savings', 'investing', 'credit', 'debt', 'retirement', '401k'],
    content: `Personal finance is managing your money effectively.

**Budgeting:**
• Track income and expenses
• 50/30/20 rule: 50% needs, 30% wants, 20% savings
• Emergency fund: 3-6 months of expenses

**Saving and Investing:**
• Savings accounts (low risk, low return)
• Stocks (ownership in companies)
• Bonds (lending to companies/government)
• Mutual funds/ETFs (diversified portfolios)
• Real estate

**Compound Interest:**
• A = P(1 + r/n)^(nt)
• Interest earns interest over time
• Start early for maximum benefit

**Retirement Accounts:**
• 401(k): Employer-sponsored, often with matching
• IRA: Individual Retirement Account
• Roth: After-tax contributions, tax-free withdrawals
• Traditional: Pre-tax contributions, taxed at withdrawal

**Credit:**
• Credit score: 300-850 (higher is better)
• Factors: Payment history, utilization, length, types, inquiries
• Good credit = better loan rates

**Debt Management:**
• Pay high-interest debt first (avalanche method)
• Or pay smallest balances first (snowball method)
• Avoid minimum payments only

**Insurance:**
• Health, auto, home/renters, life
• Protects against financial catastrophe`
  },
  {
    topic: 'Entrepreneurship',
    category: 'business',
    keywords: ['startup', 'entrepreneur', 'business plan', 'venture capital', 'founder', 'company'],
    content: `Entrepreneurship is creating and running new businesses.

**Starting a Business:**
1. Identify a problem to solve
2. Validate the idea (market research)
3. Create a business plan
4. Secure funding
5. Build MVP (Minimum Viable Product)
6. Launch and iterate

**Business Plan Components:**
• Executive summary
• Company description
• Market analysis
• Organization structure
• Product/service description
• Marketing strategy
• Financial projections

**Funding Options:**
• Bootstrapping (self-funded)
• Friends and family
• Angel investors
• Venture capital
• Crowdfunding
• Bank loans
• Grants

**Business Structures:**
• Sole proprietorship
• Partnership
• LLC (Limited Liability Company)
• Corporation (C-Corp, S-Corp)

**Key Metrics:**
• Revenue and profit
• Customer acquisition cost (CAC)
• Lifetime value (LTV)
• Burn rate (monthly spending)
• Runway (months until out of money)

**Startup Advice:**
• Focus on customer problems
• Iterate quickly based on feedback
• Build a strong team
• Manage cash carefully
• Be persistent but adaptable`
  },
  {
    topic: 'Marketing',
    category: 'business',
    keywords: ['marketing', 'advertising', 'brand', 'social media', 'seo', 'content', 'sales'],
    content: `Marketing promotes products/services to potential customers.

**Marketing Mix (4 Ps):**
• Product: What you're selling
• Price: How much it costs
• Place: Where it's sold
• Promotion: How you advertise

**Digital Marketing Channels:**
• Search Engine Optimization (SEO)
• Pay-Per-Click advertising (PPC)
• Social media marketing
• Email marketing
• Content marketing
• Influencer marketing

**SEO Basics:**
• Keywords in content
• Quality backlinks
• Mobile-friendly site
• Fast loading speed
• Good user experience

**Social Media Platforms:**
• Facebook/Instagram (broad audience)
• LinkedIn (B2B, professional)
• Twitter/X (news, engagement)
• TikTok (younger audience, viral content)
• YouTube (video content)

**Content Marketing:**
• Blog posts
• Videos
• Podcasts
• Infographics
• Ebooks and whitepapers

**Key Metrics:**
• Impressions and reach
• Click-through rate (CTR)
• Conversion rate
• Cost per acquisition (CPA)
• Return on ad spend (ROAS)

**Branding:**
• Logo and visual identity
• Brand voice and messaging
• Customer perception
• Consistency across channels`
  },
];

// =============================================================================
// HEALTH & WELLNESS KNOWLEDGE
// =============================================================================

export const HEALTH_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Nutrition Basics',
    category: 'health',
    keywords: ['nutrition', 'diet', 'calories', 'protein', 'carbs', 'fat', 'vitamins', 'food'],
    content: `Nutrition is the science of how food affects health and body function.

**Macronutrients:**
• **Carbohydrates:** Primary energy source (4 cal/g)
  - Simple (sugars) vs Complex (starches, fiber)
  - Recommended: 45-65% of calories
• **Proteins:** Building blocks for muscles (4 cal/g)
  - Complete (animal) vs Incomplete (plant)
  - Recommended: 10-35% of calories
• **Fats:** Energy storage, hormone production (9 cal/g)
  - Saturated, unsaturated, trans fats
  - Recommended: 20-35% of calories

**Micronutrients:**
• Vitamins (A, B, C, D, E, K)
• Minerals (calcium, iron, zinc, potassium)
• Essential for body functions

**Daily Calorie Needs:**
• Varies by age, sex, activity level
• Average: 2000-2500 calories/day
• Weight loss: Calorie deficit
• Weight gain: Calorie surplus

**Healthy Eating Tips:**
• Eat variety of fruits and vegetables
• Choose whole grains over refined
• Limit added sugars and sodium
• Stay hydrated (8 glasses water/day)
• Practice portion control`
  },
  {
    topic: 'Exercise and Fitness',
    category: 'health',
    keywords: ['exercise', 'fitness', 'workout', 'gym', 'cardio', 'strength', 'running', 'muscle'],
    content: `Regular exercise is essential for physical and mental health.

**Types of Exercise:**
• **Cardio/Aerobic:** Heart and lung health
  - Running, swimming, cycling, walking
  - 150 min moderate or 75 min vigorous/week
• **Strength Training:** Muscle and bone health
  - Weight lifting, resistance bands, bodyweight
  - 2+ days per week, all major muscle groups
• **Flexibility:** Range of motion
  - Stretching, yoga
• **Balance:** Stability, fall prevention

**Benefits of Exercise:**
• Weight management
• Reduced disease risk (heart, diabetes, cancer)
• Stronger bones and muscles
• Improved mental health
• Better sleep
• Increased energy

**Starting a Routine:**
1. Set realistic goals
2. Start slowly, progress gradually
3. Find activities you enjoy
4. Schedule regular workout times
5. Rest and recovery are important

**Common Exercises:**
• Push-ups, squats, lunges
• Planks, deadlifts, rows
• Running, cycling, swimming
• HIIT (High-Intensity Interval Training)

**Recovery:**
• Rest days between intense workouts
• Sleep 7-9 hours
• Proper nutrition and hydration
• Stretching and foam rolling`
  },
  {
    topic: 'Mental Health',
    category: 'health',
    keywords: ['mental health', 'anxiety', 'depression', 'stress', 'therapy', 'meditation', 'mindfulness'],
    content: `Mental health is as important as physical health for overall well-being.

**Common Conditions:**
• **Depression:** Persistent sadness, loss of interest
• **Anxiety:** Excessive worry, fear
• **PTSD:** Trauma-related symptoms
• **Bipolar Disorder:** Mood swings
• **OCD:** Obsessive thoughts, compulsive behaviors

**Warning Signs:**
• Persistent sadness or hopelessness
• Excessive worry or fear
• Withdrawal from activities
• Changes in sleep or appetite
• Difficulty concentrating
• Thoughts of self-harm

**Coping Strategies:**
• Talk to someone you trust
• Practice mindfulness/meditation
• Regular exercise
• Adequate sleep
• Limit alcohol and caffeine
• Maintain social connections

**Professional Help:**
• Therapy (CBT, DBT, talk therapy)
• Medication when appropriate
• Support groups
• Crisis hotlines available 24/7

**Mindfulness Practices:**
• Deep breathing exercises
• Meditation (guided or silent)
• Body scan relaxation
• Gratitude journaling
• Present-moment awareness

**Reducing Stigma:**
• Mental illness is common (1 in 5 adults)
• Treatment is effective
• Seeking help is strength, not weakness`
  },
  {
    topic: 'Sleep',
    category: 'health',
    keywords: ['sleep', 'insomnia', 'rest', 'tired', 'fatigue', 'circadian', 'melatonin'],
    content: `Quality sleep is essential for health, cognition, and well-being.

**Sleep Recommendations:**
• Adults: 7-9 hours per night
• Teenagers: 8-10 hours
• Children: 9-12 hours
• Infants: 12-16 hours

**Sleep Stages:**
• **NREM Stage 1:** Light sleep, transition
• **NREM Stage 2:** Body temperature drops
• **NREM Stage 3:** Deep sleep, restoration
• **REM:** Dreaming, memory consolidation

**Benefits of Good Sleep:**
• Memory consolidation
• Physical recovery
• Immune function
• Emotional regulation
• Cognitive performance

**Sleep Hygiene Tips:**
• Consistent sleep schedule
• Dark, cool, quiet bedroom
• Avoid screens before bed
• Limit caffeine after noon
• No large meals before bed
• Regular exercise (not too late)

**Common Sleep Disorders:**
• Insomnia (difficulty sleeping)
• Sleep apnea (breathing interruptions)
• Restless leg syndrome
• Narcolepsy

**When to Seek Help:**
• Chronic difficulty sleeping
• Excessive daytime sleepiness
• Snoring with breathing pauses
• Sleep significantly affects daily life`
  },
];

// =============================================================================
// GEOGRAPHY & WORLD KNOWLEDGE
// =============================================================================

export const GEOGRAPHY_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'World Countries',
    category: 'geography',
    keywords: ['country', 'countries', 'nation', 'capital', 'population', 'continent'],
    content: `The world has 195 recognized countries across 7 continents.

**Continents by Size:**
1. Asia - 44.6 million km²
2. Africa - 30.4 million km²
3. North America - 24.7 million km²
4. South America - 17.8 million km²
5. Antarctica - 14.2 million km²
6. Europe - 10.2 million km²
7. Australia/Oceania - 8.5 million km²

**Most Populous Countries (2024):**
1. India - ~1.44 billion
2. China - ~1.43 billion
3. United States - ~340 million
4. Indonesia - ~277 million
5. Pakistan - ~240 million

**Largest Countries by Area:**
1. Russia - 17.1 million km²
2. Canada - 10.0 million km²
3. United States - 9.8 million km²
4. China - 9.6 million km²
5. Brazil - 8.5 million km²

**Major Capitals:**
• USA - Washington, D.C.
• UK - London
• France - Paris
• Japan - Tokyo
• China - Beijing
• India - New Delhi
• Brazil - Brasília
• Australia - Canberra
• Russia - Moscow
• Germany - Berlin`
  },
  {
    topic: 'US States',
    category: 'geography',
    keywords: ['state', 'states', 'usa', 'america', 'american', 'united states'],
    content: `The United States consists of 50 states plus territories.

**Regions:**
• **Northeast:** Maine, NH, VT, MA, RI, CT, NY, NJ, PA
• **Southeast:** VA, NC, SC, GA, FL, AL, MS, LA, TN, KY, WV
• **Midwest:** OH, IN, IL, MI, WI, MN, IA, MO, ND, SD, NE, KS
• **Southwest:** TX, OK, NM, AZ
• **West:** CA, NV, UT, CO, WY, MT, ID, WA, OR, AK, HI

**Largest States by Area:**
1. Alaska - 665,384 sq mi
2. Texas - 268,596 sq mi
3. California - 163,695 sq mi

**Most Populous States:**
1. California - ~39 million
2. Texas - ~30 million
3. Florida - ~22 million
4. New York - ~19 million

**State Capitals (selected):**
• California - Sacramento
• Texas - Austin
• New York - Albany
• Florida - Tallahassee
• Illinois - Springfield

**Territories:**
• Puerto Rico
• Guam
• US Virgin Islands
• American Samoa
• Northern Mariana Islands`
  },
  {
    topic: 'Oceans and Seas',
    category: 'geography',
    keywords: ['ocean', 'sea', 'water', 'pacific', 'atlantic', 'marine'],
    content: `Oceans cover about 71% of Earth's surface.

**The Five Oceans:**
1. **Pacific Ocean** - Largest (165.2 million km²)
   - Deepest point: Mariana Trench (36,000 ft)
2. **Atlantic Ocean** - Second largest (106.4 million km²)
   - Separates Americas from Europe/Africa
3. **Indian Ocean** - Third largest (70.6 million km²)
   - Warmest ocean
4. **Southern Ocean** - Around Antarctica
5. **Arctic Ocean** - Smallest, coldest

**Major Seas:**
• Mediterranean Sea
• Caribbean Sea
• South China Sea
• Red Sea
• Black Sea
• Baltic Sea

**Ocean Facts:**
• Average depth: 12,100 feet
• Contains 97% of Earth's water
• Produces 50% of oxygen
• Absorbs 25% of CO₂
• Home to millions of species

**Ocean Currents:**
• Gulf Stream (warm, Atlantic)
• California Current (cold, Pacific)
• Affect climate and weather
• Important for marine life

**Ocean Zones:**
• Sunlight Zone (0-200m)
• Twilight Zone (200-1000m)
• Midnight Zone (1000-4000m)
• Abyssal Zone (4000-6000m)
• Hadal Zone (6000m+)`
  },
];

// =============================================================================
// ARTS & CULTURE KNOWLEDGE
// =============================================================================

export const ARTS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Music Theory',
    category: 'music',
    keywords: ['music', 'note', 'chord', 'scale', 'rhythm', 'melody', 'harmony', 'key'],
    content: `Music theory is the study of how music works.

**Basic Elements:**
• **Melody:** Sequence of notes (tune)
• **Harmony:** Multiple notes together (chords)
• **Rhythm:** Pattern of beats and timing
• **Dynamics:** Volume (loud/soft)
• **Timbre:** Sound quality/color

**Notes and Scales:**
• 12 notes: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
• Major scale: W-W-H-W-W-W-H (whole/half steps)
• Minor scale: W-H-W-W-H-W-W
• Octave: 8 notes, frequency doubles

**Chords:**
• Major chord: Root + Major 3rd + Perfect 5th
• Minor chord: Root + Minor 3rd + Perfect 5th
• Common progressions: I-IV-V-I, I-V-vi-IV

**Time Signatures:**
• 4/4 - Common time (most popular)
• 3/4 - Waltz time
• 6/8 - Compound time

**Reading Music:**
• Staff: 5 lines, 4 spaces
• Treble clef: Higher notes
• Bass clef: Lower notes
• Note values: Whole, half, quarter, eighth

**Music Genres:**
• Classical, Jazz, Blues
• Rock, Pop, Hip-hop
• Electronic, Country, R&B
• Folk, Metal, Reggae`
  },
  {
    topic: 'Art History',
    category: 'arts',
    keywords: ['art', 'painting', 'sculpture', 'artist', 'renaissance', 'impressionism', 'modern'],
    content: `Art history traces visual arts through different periods and movements.

**Major Art Periods:**
• **Ancient Art** (30,000 BC - 400 AD)
  - Cave paintings, Egyptian, Greek, Roman
• **Medieval** (500-1400)
  - Byzantine, Gothic, religious themes
• **Renaissance** (1400-1600)
  - Rebirth of classical ideals
  - Da Vinci, Michelangelo, Raphael
• **Baroque** (1600-1750)
  - Dramatic, ornate
  - Caravaggio, Rembrandt
• **Impressionism** (1860-1890)
  - Light, color, everyday scenes
  - Monet, Renoir, Degas
• **Modern Art** (1860-1970)
  - Cubism, Surrealism, Abstract
  - Picasso, Dalí, Pollock
• **Contemporary** (1970-present)
  - Diverse styles and media

**Famous Artists:**
• Leonardo da Vinci - Mona Lisa, Last Supper
• Michelangelo - Sistine Chapel, David
• Vincent van Gogh - Starry Night
• Pablo Picasso - Guernica, Cubism founder
• Claude Monet - Water Lilies
• Frida Kahlo - Self-portraits

**Art Elements:**
• Line, shape, form
• Color, value, texture
• Space, perspective`
  },
  {
    topic: 'Literature',
    category: 'arts',
    keywords: ['book', 'novel', 'author', 'poetry', 'shakespeare', 'writing', 'story', 'fiction'],
    content: `Literature encompasses written works of artistic merit.

**Literary Genres:**
• **Fiction:** Novels, short stories
• **Non-fiction:** Biography, essays, journalism
• **Poetry:** Verse, sonnets, haiku
• **Drama:** Plays, scripts

**Classic Authors:**
• William Shakespeare - Hamlet, Romeo and Juliet
• Jane Austen - Pride and Prejudice
• Charles Dickens - A Tale of Two Cities
• Mark Twain - Adventures of Huckleberry Finn
• Leo Tolstoy - War and Peace
• Virginia Woolf - Mrs Dalloway

**Literary Devices:**
• Metaphor: Comparison without "like"
• Simile: Comparison using "like" or "as"
• Symbolism: Objects represent ideas
• Foreshadowing: Hints at future events
• Irony: Opposite of expected
• Alliteration: Repeated consonant sounds

**Poetry Forms:**
• Sonnet: 14 lines, specific rhyme scheme
• Haiku: 5-7-5 syllables
• Free verse: No set structure
• Limerick: 5 lines, AABBA rhyme

**Nobel Prize in Literature:**
• Awarded annually since 1901
• Notable winners: Hemingway, Toni Morrison, Bob Dylan

**Reading Benefits:**
• Vocabulary expansion
• Critical thinking
• Empathy development
• Stress reduction`
  },
];

// =============================================================================
// PHILOSOPHY & PSYCHOLOGY KNOWLEDGE
// =============================================================================

export const PHILOSOPHY_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Major Philosophers',
    category: 'philosophy',
    keywords: ['philosophy', 'philosopher', 'socrates', 'plato', 'aristotle', 'kant', 'nietzsche'],
    content: `Philosophy explores fundamental questions about existence, knowledge, and ethics.

**Ancient Greek Philosophers:**
• **Socrates** (470-399 BC)
  - Socratic method (questioning)
  - "I know that I know nothing"
• **Plato** (428-348 BC)
  - Theory of Forms (ideal reality)
  - The Republic, Allegory of the Cave
• **Aristotle** (384-322 BC)
  - Logic, ethics, metaphysics
  - Golden mean (moderation)

**Modern Philosophers:**
• **René Descartes** (1596-1650)
  - "I think, therefore I am"
  - Mind-body dualism
• **Immanuel Kant** (1724-1804)
  - Categorical imperative
  - Critique of Pure Reason
• **Friedrich Nietzsche** (1844-1900)
  - "God is dead"
  - Will to power, Übermensch

**Branches of Philosophy:**
• **Metaphysics:** Nature of reality
• **Epistemology:** Nature of knowledge
• **Ethics:** Right and wrong
• **Logic:** Valid reasoning
• **Aesthetics:** Beauty and art
• **Political Philosophy:** Justice, rights

**Key Concepts:**
• Free will vs determinism
• Existence of God
• Nature of consciousness
• Meaning of life`
  },
  {
    topic: 'Psychology Basics',
    category: 'psychology',
    keywords: ['psychology', 'mind', 'behavior', 'freud', 'cognitive', 'therapy', 'personality'],
    content: `Psychology is the scientific study of mind and behavior.

**Major Schools:**
• **Psychoanalysis** (Freud)
  - Unconscious mind, id/ego/superego
• **Behaviorism** (Skinner, Watson)
  - Observable behavior, conditioning
• **Cognitive** (Piaget)
  - Mental processes, thinking
• **Humanistic** (Maslow, Rogers)
  - Self-actualization, potential

**Maslow's Hierarchy of Needs:**
1. Physiological (food, water, shelter)
2. Safety (security, stability)
3. Love/Belonging (relationships)
4. Esteem (respect, achievement)
5. Self-actualization (reaching potential)

**Personality Theories:**
• Big Five (OCEAN): Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
• Myers-Briggs (MBTI): 16 personality types
• Freud's psychosexual stages

**Cognitive Biases:**
• Confirmation bias (favor confirming info)
• Anchoring (rely on first info)
• Availability heuristic (recent = likely)
• Dunning-Kruger effect

**Memory Types:**
• Sensory (brief, <1 second)
• Short-term/Working (seconds to minutes)
• Long-term (permanent storage)

**Learning:**
• Classical conditioning (Pavlov's dogs)
• Operant conditioning (rewards/punishments)
• Observational learning (modeling)`
  },
];

// =============================================================================
// SPORTS KNOWLEDGE
// =============================================================================

export const SPORTS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Major Sports',
    category: 'sports',
    keywords: ['sports', 'football', 'basketball', 'soccer', 'baseball', 'nfl', 'nba', 'olympics'],
    content: `Sports are competitive physical activities enjoyed worldwide.

**American Sports:**
• **NFL (Football)**
  - 32 teams, Super Bowl championship
  - 4 quarters, 15 minutes each
• **NBA (Basketball)**
  - 30 teams, 82-game season
  - 4 quarters, 12 minutes each
• **MLB (Baseball)**
  - 30 teams, 162-game season
  - 9 innings
• **NHL (Hockey)**
  - 32 teams, Stanley Cup
  - 3 periods, 20 minutes each

**Global Sports:**
• **Soccer (Football)**
  - Most popular sport worldwide
  - FIFA World Cup every 4 years
  - 90 minutes (two 45-min halves)
• **Tennis**
  - Grand Slams: Australian, French, Wimbledon, US Open
• **Golf**
  - Majors: Masters, US Open, British Open, PGA

**Olympics:**
• Summer and Winter Games
• Every 4 years (alternating)
• Hundreds of events
• Ancient origins in Greece (776 BC)

**Famous Athletes:**
• Michael Jordan (basketball)
• Tom Brady (football)
• Lionel Messi (soccer)
• Serena Williams (tennis)
• Muhammad Ali (boxing)
• Usain Bolt (track)`
  },
];

// =============================================================================
// COOKING & FOOD KNOWLEDGE
// =============================================================================

export const COOKING_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Cooking Basics',
    category: 'cooking',
    keywords: ['cooking', 'recipe', 'baking', 'kitchen', 'chef', 'food', 'ingredient'],
    content: `Cooking is the art and science of preparing food.

**Cooking Methods:**
• **Dry Heat:**
  - Baking, roasting, grilling
  - Sautéing, pan-frying
  - Broiling
• **Moist Heat:**
  - Boiling, simmering
  - Steaming, poaching
  - Braising, stewing

**Essential Techniques:**
• Knife skills (dice, mince, julienne)
• Sautéing (high heat, little fat)
• Braising (sear then slow cook)
• Emulsification (mayo, vinaigrettes)

**Kitchen Equipment:**
• Chef's knife, cutting board
• Pots and pans (various sizes)
• Measuring cups and spoons
• Mixing bowls
• Thermometer

**Food Safety:**
• Wash hands frequently
• Separate raw meat from other foods
• Cook to proper temperatures
• Refrigerate promptly (below 40°F)

**Basic Ratios:**
• Vinaigrette: 3 parts oil : 1 part vinegar
• Bread: 5 parts flour : 3 parts liquid
• Rice: 1 part rice : 2 parts water

**Flavor Building:**
• Salt enhances all flavors
• Acid (lemon, vinegar) brightens
• Fat carries flavor
• Umami adds depth (soy, parmesan)
• Fresh herbs finish dishes`
  },
  {
    topic: 'World Cuisines',
    category: 'cooking',
    keywords: ['cuisine', 'italian', 'chinese', 'mexican', 'indian', 'japanese', 'french'],
    content: `World cuisines reflect cultural traditions and local ingredients.

**Italian Cuisine:**
• Pasta, pizza, risotto
• Olive oil, tomatoes, basil
• Regional variations
• Famous: Carbonara, Bolognese

**Chinese Cuisine:**
• Regional styles (Cantonese, Sichuan, etc.)
• Stir-frying, steaming
• Rice, noodles, soy sauce
• Famous: Kung Pao, Dim Sum

**Mexican Cuisine:**
• Corn, beans, chili peppers
• Tacos, burritos, enchiladas
• Fresh salsas, guacamole
• UNESCO heritage status

**Indian Cuisine:**
• Complex spice blends
• Curry, tandoori, biryani
• Vegetarian traditions
• Regional diversity

**Japanese Cuisine:**
• Fresh, seasonal ingredients
• Sushi, ramen, tempura
• Umami-focused
• Presentation important

**French Cuisine:**
• Foundation of Western cooking
• Sauces (mother sauces)
• Techniques and precision
• Famous: Coq au vin, Croissants

**Thai Cuisine:**
• Balance of flavors
• Sweet, sour, salty, spicy
• Fresh herbs (basil, cilantro)
• Famous: Pad Thai, Green Curry`
  },
];

// =============================================================================
// LANGUAGE & COMMUNICATION
// =============================================================================

export const LANGUAGE_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'World Languages',
    category: 'language',
    keywords: ['language', 'spanish', 'french', 'chinese', 'arabic', 'translation', 'speak'],
    content: `There are approximately 7,000 languages spoken worldwide.

**Most Spoken Languages (Native):**
1. Mandarin Chinese - 920 million
2. Spanish - 475 million
3. English - 373 million
4. Arabic - 362 million
5. Hindi - 344 million

**Most Spoken (Total Speakers):**
1. English - 1.5 billion
2. Mandarin - 1.1 billion
3. Hindi - 602 million
4. Spanish - 548 million
5. French - 280 million

**Language Families:**
• Indo-European (English, Spanish, Hindi)
• Sino-Tibetan (Chinese, Burmese)
• Afro-Asiatic (Arabic, Hebrew)
• Niger-Congo (Swahili, Yoruba)
• Austronesian (Indonesian, Tagalog)

**Writing Systems:**
• Latin alphabet (English, Spanish)
• Cyrillic (Russian)
• Arabic script
• Chinese characters
• Devanagari (Hindi)
• Japanese (Hiragana, Katakana, Kanji)

**Language Learning Tips:**
• Immersion is most effective
• Practice speaking early
• Learn common phrases first
• Use spaced repetition
• Watch media in target language

**Endangered Languages:**
• ~40% of languages at risk
• Many have few remaining speakers
• Documentation efforts ongoing`
  },
  {
    topic: 'Grammar and Writing',
    category: 'language',
    keywords: ['grammar', 'writing', 'sentence', 'punctuation', 'essay', 'paragraph'],
    content: `Good grammar and writing skills are essential for clear communication.

**Parts of Speech:**
• Nouns (person, place, thing)
• Verbs (action, state)
• Adjectives (describe nouns)
• Adverbs (describe verbs)
• Pronouns (replace nouns)
• Prepositions (show relationships)
• Conjunctions (connect words/clauses)

**Sentence Structure:**
• Subject + Verb + Object
• Simple, compound, complex sentences
• Active vs passive voice
• Parallel structure

**Punctuation:**
• Period (.) - End statements
• Comma (,) - Separate elements
• Semicolon (;) - Connect related clauses
• Colon (:) - Introduce lists
• Apostrophe (') - Possession, contractions

**Common Errors:**
• Their/there/they're
• Its/it's
• Your/you're
• Affect/effect
• Then/than

**Essay Structure:**
1. Introduction (thesis statement)
2. Body paragraphs (topic sentences)
3. Conclusion (summary, final thoughts)

**Writing Tips:**
• Know your audience
• Be clear and concise
• Use active voice
• Vary sentence length
• Proofread carefully`
  },
];

// =============================================================================
// NATURE & ENVIRONMENT
// =============================================================================

export const NATURE_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Animals',
    category: 'nature',
    keywords: ['animal', 'mammal', 'bird', 'fish', 'reptile', 'insect', 'wildlife', 'species'],
    content: `The animal kingdom includes millions of diverse species.

**Animal Classifications:**
• **Mammals:** Warm-blooded, hair/fur, milk
  - Examples: Dogs, whales, humans
• **Birds:** Feathers, beaks, eggs
  - Examples: Eagles, penguins, sparrows
• **Reptiles:** Cold-blooded, scales
  - Examples: Snakes, lizards, turtles
• **Amphibians:** Land and water
  - Examples: Frogs, salamanders
• **Fish:** Gills, fins, scales
  - Examples: Salmon, sharks, goldfish
• **Invertebrates:** No backbone
  - Examples: Insects, spiders, jellyfish

**Largest Animals:**
• Blue whale (largest ever) - 100 feet
• African elephant (largest land) - 13 feet
• Giraffe (tallest) - 18 feet
• Ostrich (largest bird) - 9 feet

**Fastest Animals:**
• Peregrine falcon - 240 mph (diving)
• Cheetah - 70 mph (land)
• Sailfish - 68 mph (water)

**Animal Facts:**
• Octopuses have 3 hearts
• Elephants can't jump
• Honeybees can recognize faces
• Dolphins sleep with one eye open
• Cows have best friends

**Endangered Species:**
• Giant panda, tigers, rhinos
• Habitat loss main threat
• Conservation efforts ongoing`
  },
  {
    topic: 'Plants and Trees',
    category: 'nature',
    keywords: ['plant', 'tree', 'flower', 'forest', 'garden', 'leaf', 'root', 'seed'],
    content: `Plants are essential for life on Earth.

**Plant Parts:**
• **Roots:** Absorb water and nutrients
• **Stem:** Support and transport
• **Leaves:** Photosynthesis
• **Flowers:** Reproduction
• **Seeds:** New plant development

**Types of Plants:**
• Trees (woody, tall)
• Shrubs (woody, shorter)
• Herbs (non-woody)
• Grasses
• Ferns (no seeds)
• Mosses (no vascular tissue)

**Photosynthesis:**
• Converts sunlight to energy
• Produces oxygen
• Absorbs carbon dioxide
• Occurs in chloroplasts

**Famous Trees:**
• Redwoods (tallest) - 380 feet
• Bristlecone pines (oldest) - 5,000 years
• Baobabs (widest trunk)
• Oak, maple, pine common

**Gardening Basics:**
• Soil preparation
• Proper watering
• Sunlight requirements
• Fertilization
• Pest management

**Plant Benefits:**
• Oxygen production
• Food source
• Medicine
• Building materials
• Climate regulation
• Mental health benefits`
  },
  {
    topic: 'Environment and Climate',
    category: 'nature',
    keywords: ['environment', 'climate', 'pollution', 'recycling', 'sustainability', 'ecosystem'],
    content: `Environmental science studies Earth's natural systems and human impacts.

**Ecosystems:**
• Forests (tropical, temperate, boreal)
• Grasslands and savannas
• Deserts
• Wetlands
• Oceans and coral reefs
• Tundra

**Environmental Issues:**
• Climate change (global warming)
• Deforestation
• Ocean pollution and plastic
• Air pollution
• Biodiversity loss
• Water scarcity

**Climate Change:**
• Global temperatures rising
• Caused by greenhouse gases
• Effects: sea level rise, extreme weather
• Paris Agreement: limit to 1.5-2°C

**Sustainability:**
• Meeting needs without compromising future
• Reduce, reuse, recycle
• Renewable energy (solar, wind)
• Sustainable agriculture
• Conservation efforts

**What You Can Do:**
• Reduce energy consumption
• Use public transport/bike
• Eat less meat
• Avoid single-use plastics
• Support sustainable products
• Vote for environmental policies

**Renewable Energy:**
• Solar power
• Wind power
• Hydroelectric
• Geothermal
• Biomass`
  },
];

// =============================================================================
// EVERYDAY KNOWLEDGE & LIFE SKILLS
// =============================================================================

export const LIFE_SKILLS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Time Management',
    category: 'life_skills',
    keywords: ['time', 'productivity', 'schedule', 'organize', 'procrastination', 'planning'],
    content: `Effective time management improves productivity and reduces stress.

**Key Principles:**
• Prioritize important tasks
• Set clear goals
• Avoid multitasking
• Take regular breaks
• Learn to say no

**Popular Methods:**
• **Pomodoro Technique:** 25 min work, 5 min break
• **Time Blocking:** Schedule specific tasks
• **Eisenhower Matrix:** Urgent vs Important
• **Getting Things Done (GTD):** Capture, clarify, organize
• **2-Minute Rule:** If <2 min, do it now

**Eisenhower Matrix:**
• Urgent + Important: Do first
• Important, Not Urgent: Schedule
• Urgent, Not Important: Delegate
• Neither: Eliminate

**Beating Procrastination:**
• Break tasks into smaller steps
• Start with easiest part
• Remove distractions
• Set deadlines
• Reward yourself

**Tools:**
• Calendars (Google, Outlook)
• To-do apps (Todoist, Things)
• Time trackers (Toggl, RescueTime)
• Note-taking (Notion, Evernote)`
  },
  {
    topic: 'Communication Skills',
    category: 'life_skills',
    keywords: ['communication', 'speaking', 'listening', 'presentation', 'public speaking'],
    content: `Strong communication skills are essential for personal and professional success.

**Types of Communication:**
• Verbal (spoken words)
• Non-verbal (body language, gestures)
• Written (emails, messages)
• Visual (charts, images)

**Active Listening:**
• Give full attention
• Don't interrupt
• Ask clarifying questions
• Paraphrase to confirm understanding
• Show empathy

**Public Speaking Tips:**
• Know your audience
• Practice extensively
• Start with a hook
• Use stories and examples
• Make eye contact
• Manage nervousness with breathing

**Written Communication:**
• Be clear and concise
• Know your purpose
• Proofread before sending
• Use appropriate tone
• Structure logically

**Non-Verbal Cues:**
• Eye contact shows confidence
• Open posture invites connection
• Facial expressions convey emotion
• Gestures emphasize points
• Personal space varies by culture

**Conflict Resolution:**
• Stay calm
• Listen to understand
• Focus on issues, not people
• Find common ground
• Seek win-win solutions`
  },
  {
    topic: 'Job and Career',
    category: 'life_skills',
    keywords: ['job', 'career', 'resume', 'interview', 'work', 'employment', 'salary'],
    content: `Career development requires planning and continuous improvement.

**Resume Tips:**
• Keep to 1-2 pages
• Use action verbs
• Quantify achievements
• Tailor to each job
• Include relevant keywords
• Proofread carefully

**Interview Preparation:**
• Research the company
• Practice common questions
• Prepare questions to ask
• Dress appropriately
• Arrive early
• Follow up with thank you

**Common Interview Questions:**
• Tell me about yourself
• Why do you want this job?
• What are your strengths/weaknesses?
• Where do you see yourself in 5 years?
• Tell me about a challenge you overcame

**Salary Negotiation:**
• Research market rates
• Know your worth
• Let employer make first offer
• Negotiate total compensation
• Get offers in writing

**Career Growth:**
• Set clear goals
• Seek feedback
• Build skills continuously
• Network actively
• Find mentors
• Take on new challenges

**Remote Work Tips:**
• Dedicated workspace
• Set boundaries
• Over-communicate
• Take breaks
• Stay connected with team`
  },
  {
    topic: 'Relationships',
    category: 'life_skills',
    keywords: ['relationship', 'friendship', 'dating', 'love', 'marriage', 'family'],
    content: `Healthy relationships require effort, communication, and mutual respect.

**Building Relationships:**
• Show genuine interest
• Be a good listener
• Be reliable and trustworthy
• Respect boundaries
• Invest time and effort

**Communication in Relationships:**
• Express feelings openly
• Use "I" statements
• Listen without judgment
• Address issues early
• Show appreciation regularly

**Conflict Resolution:**
• Stay calm
• Focus on the issue, not the person
• Seek to understand first
• Find compromises
• Apologize when wrong

**Signs of Healthy Relationships:**
• Mutual respect
• Trust and honesty
• Good communication
• Support for each other
• Maintaining individuality
• Equality

**Red Flags:**
• Controlling behavior
• Lack of respect
• Dishonesty
• Isolation from others
• Verbal or physical abuse

**Maintaining Friendships:**
• Stay in touch regularly
• Be supportive
• Celebrate successes
• Be there during hard times
• Accept differences`
  },
];

// =============================================================================
// RELIGION & WORLD BELIEFS
// =============================================================================

export const RELIGION_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'World Religions',
    category: 'religion',
    keywords: ['religion', 'christianity', 'islam', 'buddhism', 'hinduism', 'judaism', 'faith'],
    content: `Religion plays a significant role in cultures worldwide.

**Major World Religions:**

**Christianity** (~2.4 billion followers)
• Belief in Jesus Christ as savior
• Holy book: Bible
• Major branches: Catholic, Protestant, Orthodox
• Key practices: Prayer, church, sacraments

**Islam** (~1.9 billion followers)
• Belief in Allah and Prophet Muhammad
• Holy book: Quran
• Five Pillars: Faith, Prayer, Charity, Fasting, Pilgrimage
• Major branches: Sunni, Shia

**Hinduism** (~1.2 billion followers)
• Oldest major religion
• Multiple deities (Brahma, Vishnu, Shiva)
• Concepts: Karma, dharma, reincarnation
• Sacred texts: Vedas, Upanishads

**Buddhism** (~500 million followers)
• Founded by Siddhartha Gautama (Buddha)
• Four Noble Truths, Eightfold Path
• Goal: Enlightenment (Nirvana)
• Major branches: Theravada, Mahayana, Vajrayana

**Judaism** (~14 million followers)
• Oldest Abrahamic religion
• Holy book: Torah
• Belief in one God
• Key practices: Sabbath, kosher, holidays

**Other Religions:**
• Sikhism, Jainism, Shinto
• Indigenous and folk religions
• Secular/non-religious growing`
  },
];

// =============================================================================
// MOVIES, TV & ENTERTAINMENT
// =============================================================================

export const ENTERTAINMENT_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Film and Cinema',
    category: 'entertainment',
    keywords: ['movie', 'film', 'cinema', 'actor', 'director', 'hollywood', 'oscar'],
    content: `Cinema has been a major art form and entertainment medium since the late 1800s.

**Film History:**
• 1895: Lumière brothers first public screening
• 1927: First "talkie" (The Jazz Singer)
• 1939: Golden Age (Gone with the Wind, Wizard of Oz)
• 1970s: New Hollywood (Spielberg, Scorsese)
• 2000s+: Digital revolution, streaming

**Major Film Genres:**
• Action, Adventure, Comedy
• Drama, Horror, Thriller
• Science Fiction, Fantasy
• Romance, Musical
• Documentary, Animation

**Highest-Grossing Films:**
• Avatar ($2.9 billion)
• Avengers: Endgame ($2.8 billion)
• Avatar: The Way of Water ($2.3 billion)
• Titanic ($2.2 billion)

**Academy Awards (Oscars):**
• Highest honor in film
• Categories: Picture, Director, Acting, etc.
• Held annually since 1929

**Legendary Directors:**
• Steven Spielberg, Martin Scorsese
• Alfred Hitchcock, Stanley Kubrick
• Christopher Nolan, Quentin Tarantino

**Iconic Actors:**
• Meryl Streep, Tom Hanks
• Leonardo DiCaprio, Denzel Washington
• Cate Blanchett, Viola Davis`
  },
  {
    topic: 'Television',
    category: 'entertainment',
    keywords: ['tv', 'television', 'show', 'series', 'streaming', 'netflix', 'hbo'],
    content: `Television has evolved from broadcast to streaming era.

**TV History:**
• 1920s-30s: First broadcasts
• 1950s: Golden Age, widespread adoption
• 1980s: Cable TV expansion
• 2000s: Reality TV boom
• 2010s+: Streaming revolution

**Streaming Services:**
• Netflix, Amazon Prime Video
• Disney+, HBO Max, Hulu
• Apple TV+, Paramount+
• YouTube, Peacock

**TV Genres:**
• Drama, Comedy, Sitcom
• Reality, Game shows
• News, Documentary
• Sci-fi, Fantasy, Crime

**Acclaimed TV Series:**
• Breaking Bad, The Sopranos
• Game of Thrones, The Wire
• Friends, The Office, Seinfeld
• Stranger Things, The Crown

**Emmy Awards:**
• Highest TV honor
• Categories: Drama, Comedy, Limited Series
• Held annually

**TV Trends:**
• Binge-watching culture
• Limited/mini-series format
• International content growing
• Interactive content
• Second-screen experiences`
  },
];

// =============================================================================
// COMBINED KNOWLEDGE BASE & SEARCH FUNCTION
// =============================================================================

export const ALL_KNOWLEDGE: KnowledgeEntry[] = [
  ...SCIENCE_KNOWLEDGE,
  ...TECHNOLOGY_KNOWLEDGE,
  ...PROGRAMMING_KNOWLEDGE,
  ...HISTORY_KNOWLEDGE,
  ...MATH_KNOWLEDGE,
  ...BUSINESS_KNOWLEDGE,
  ...HEALTH_KNOWLEDGE,
  ...GEOGRAPHY_KNOWLEDGE,
  ...ARTS_KNOWLEDGE,
  ...PHILOSOPHY_KNOWLEDGE,
  ...SPORTS_KNOWLEDGE,
  ...COOKING_KNOWLEDGE,
  ...LANGUAGE_KNOWLEDGE,
  ...NATURE_KNOWLEDGE,
  ...LIFE_SKILLS_KNOWLEDGE,
  ...RELIGION_KNOWLEDGE,
  ...ENTERTAINMENT_KNOWLEDGE,
];

// Search function to find relevant knowledge
export function searchKnowledge(query: string, maxResults: number = 3): KnowledgeEntry[] {
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/).filter(w => w.length > 2);
  
  // Score each entry based on keyword matches
  const scored = ALL_KNOWLEDGE.map(entry => {
    let score = 0;
    
    // Check topic match
    if (entry.topic.toLowerCase().includes(lowerQuery)) {
      score += 10;
    }
    
    // Check keyword matches
    for (const keyword of entry.keywords) {
      if (lowerQuery.includes(keyword)) {
        score += 5;
      }
      for (const word of words) {
        if (keyword.includes(word) || word.includes(keyword)) {
          score += 2;
        }
      }
    }
    
    // Check content for word matches
    const lowerContent = entry.content.toLowerCase();
    for (const word of words) {
      if (lowerContent.includes(word)) {
        score += 1;
      }
    }
    
    return { entry, score };
  });
  
  // Sort by score and return top results
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(s => s.entry);
}

// Get knowledge by category
export function getKnowledgeByCategory(category: string): KnowledgeEntry[] {
  return ALL_KNOWLEDGE.filter(entry => 
    entry.category.toLowerCase() === category.toLowerCase()
  );
}

// Get random knowledge entry
export function getRandomKnowledge(): KnowledgeEntry {
  return ALL_KNOWLEDGE[Math.floor(Math.random() * ALL_KNOWLEDGE.length)];
}

// Format knowledge for AI response
export function formatKnowledgeForResponse(entries: KnowledgeEntry[]): string {
  if (entries.length === 0) return '';
  
  return entries.map(entry => entry.content).join('\n\n---\n\n');
}

// =============================================================================
// EXTENDED SCIENCE KNOWLEDGE
// =============================================================================

export const EXTENDED_SCIENCE: KnowledgeEntry[] = [
  {
    topic: 'The Solar System',
    category: 'science',
    keywords: ['solar system', 'planets', 'sun', 'mars', 'jupiter', 'saturn', 'mercury', 'venus', 'earth', 'neptune', 'uranus'],
    content: `The Solar System consists of the Sun and everything gravitationally bound to it.

**The Sun:**
• Type: G-type main-sequence star (yellow dwarf)
• Age: ~4.6 billion years
• Diameter: 1.4 million km (109× Earth)
• Temperature: 5,500°C surface, 15 million°C core
• Composition: 73% hydrogen, 25% helium

**The Planets (in order from Sun):**

**Mercury:**
• Smallest planet, closest to Sun
• No atmosphere, extreme temperatures
• Day: 59 Earth days, Year: 88 Earth days

**Venus:**
• Hottest planet (462°C) due to greenhouse effect
• Thick CO₂ atmosphere
• Rotates backwards (retrograde)

**Earth:**
• Only known planet with life
• 71% water surface
• One moon, magnetic field

**Mars:**
• "Red Planet" - iron oxide surface
• Largest volcano: Olympus Mons
• Two small moons: Phobos, Deimos

**Jupiter:**
• Largest planet (11× Earth diameter)
• Great Red Spot storm
• 95 known moons (including Ganymede, Europa)

**Saturn:**
• Famous ring system (ice and rock)
• Second largest planet
• 146 known moons (including Titan)

**Uranus:**
• Rotates on its side (98° tilt)
• Ice giant, blue-green color
• 27 known moons

**Neptune:**
• Windiest planet (2,100 km/h)
• Farthest from Sun
• 16 known moons (including Triton)

**Other Objects:**
• Dwarf planets (Pluto, Eris, Ceres)
• Asteroid belt (between Mars and Jupiter)
• Kuiper Belt and Oort Cloud`
  },
  {
    topic: 'Human Anatomy',
    category: 'science',
    keywords: ['anatomy', 'body', 'organs', 'heart', 'brain', 'lungs', 'bones', 'muscles'],
    content: `Human anatomy is the study of the body's structure.

**Major Organ Systems:**

**Skeletal System:**
• 206 bones in adults
• Functions: Support, protection, movement
• Largest bone: Femur (thigh)
• Smallest bone: Stapes (ear)

**Muscular System:**
• ~600 muscles
• Types: Skeletal, cardiac, smooth
• Largest muscle: Gluteus maximus
• Strongest: Masseter (jaw)

**Circulatory System:**
• Heart pumps ~5 liters blood/minute
• ~100,000 km of blood vessels
• Red blood cells carry oxygen
• White blood cells fight infection

**Respiratory System:**
• Lungs contain ~300 million alveoli
• Average: 12-20 breaths/minute
• Oxygen in, carbon dioxide out

**Digestive System:**
• ~9 meters long (mouth to anus)
• Stomach holds ~1 liter
• Small intestine: Most absorption
• Large intestine: Water absorption

**Nervous System:**
• Brain: ~86 billion neurons
• Spinal cord: Information highway
• Peripheral nerves throughout body

**The Brain:**
• Weight: ~1.4 kg (3 lbs)
• Uses 20% of body's energy
• Regions: Cerebrum, cerebellum, brainstem
• Left/right hemispheres

**The Heart:**
• Size of a fist
• Beats ~100,000 times/day
• Four chambers: 2 atria, 2 ventricles
• Pumps blood through pulmonary and systemic circuits`
  },
  {
    topic: 'Chemistry Fundamentals',
    category: 'science',
    keywords: ['chemistry', 'element', 'atom', 'molecule', 'periodic table', 'reaction', 'compound'],
    content: `Chemistry studies matter, its properties, and transformations.

**Atomic Structure:**
• Protons (positive) in nucleus
• Neutrons (neutral) in nucleus
• Electrons (negative) orbit nucleus
• Atomic number = number of protons

**The Periodic Table:**
• 118 known elements
• Organized by atomic number
• Groups (columns): Similar properties
• Periods (rows): Electron shells

**Common Elements:**
• Hydrogen (H) - Lightest, most abundant
• Carbon (C) - Basis of organic chemistry
• Oxygen (O) - Essential for respiration
• Nitrogen (N) - 78% of atmosphere
• Iron (Fe) - Essential for blood

**Chemical Bonds:**
• **Ionic:** Transfer of electrons (NaCl)
• **Covalent:** Sharing electrons (H₂O)
• **Metallic:** Electron sea (metals)
• **Hydrogen:** Weak attraction (water)

**Chemical Reactions:**
• Reactants → Products
• Conservation of mass
• Energy released or absorbed
• Types: Synthesis, decomposition, combustion

**Acids and Bases:**
• pH scale: 0-14
• Acids: pH < 7 (donate H⁺)
• Bases: pH > 7 (accept H⁺)
• Neutral: pH = 7 (water)

**States of Matter:**
• Solid: Fixed shape and volume
• Liquid: Fixed volume, variable shape
• Gas: Variable shape and volume
• Plasma: Ionized gas`
  },
  {
    topic: 'Genetics and DNA',
    category: 'science',
    keywords: ['genetics', 'dna', 'gene', 'chromosome', 'heredity', 'mutation', 'genome'],
    content: `Genetics is the study of heredity and variation in organisms.

**DNA (Deoxyribonucleic Acid):**
• Double helix structure
• Four bases: A, T, G, C
• A pairs with T, G pairs with C
• Contains genetic instructions

**Chromosomes:**
• Humans have 46 (23 pairs)
• 22 autosomal pairs + 1 sex pair
• XX = female, XY = male
• Genes located on chromosomes

**Genes:**
• Units of heredity
• Code for proteins
• ~20,000-25,000 human genes
• Alleles are gene variants

**Inheritance Patterns:**
• **Dominant:** One copy needed for expression
• **Recessive:** Two copies needed
• **Codominant:** Both alleles expressed
• **X-linked:** On X chromosome

**Punnett Squares:**
• Predict offspring genotypes
• Show probability of traits
• Used for simple inheritance

**Mutations:**
• Changes in DNA sequence
• Can be harmful, neutral, or beneficial
• Types: Point, insertion, deletion
• Cause of genetic variation

**Genetic Technologies:**
• PCR: Amplify DNA
• Sequencing: Read DNA code
• CRISPR: Gene editing
• Cloning: Genetic copies

**Human Genome Project:**
• Completed 2003
• Mapped all human genes
• ~3 billion base pairs
• Foundation for personalized medicine`
  },
  {
    topic: 'Ecology and Ecosystems',
    category: 'science',
    keywords: ['ecology', 'ecosystem', 'food chain', 'biodiversity', 'habitat', 'species'],
    content: `Ecology studies interactions between organisms and their environment.

**Levels of Organization:**
• Individual organism
• Population (same species)
• Community (different species)
• Ecosystem (community + environment)
• Biome (large geographic area)
• Biosphere (all life on Earth)

**Food Chains and Webs:**
• **Producers:** Plants, algae (make food)
• **Primary consumers:** Herbivores
• **Secondary consumers:** Carnivores
• **Tertiary consumers:** Top predators
• **Decomposers:** Break down dead matter

**Energy Flow:**
• Sun → Producers → Consumers
• 10% rule: 10% energy transfers up
• Energy lost as heat at each level

**Nutrient Cycles:**
• **Carbon cycle:** CO₂ ↔ organic matter
• **Nitrogen cycle:** N₂ → usable forms
• **Water cycle:** Evaporation, precipitation
• **Phosphorus cycle:** Rocks → organisms

**Biomes:**
• Tropical rainforest (most biodiversity)
• Desert (least precipitation)
• Tundra (coldest)
• Grassland/Savanna
• Temperate forest
• Taiga/Boreal forest

**Biodiversity:**
• Variety of life forms
• Species, genetic, ecosystem diversity
• Hotspots: Areas of high biodiversity
• Threats: Habitat loss, climate change

**Conservation:**
• Protected areas
• Endangered species protection
• Habitat restoration
• Sustainable practices`
  },
];

// =============================================================================
// EXTENDED TECHNOLOGY KNOWLEDGE
// =============================================================================

export const EXTENDED_TECHNOLOGY: KnowledgeEntry[] = [
  {
    topic: 'Computer Hardware',
    category: 'technology',
    keywords: ['hardware', 'cpu', 'gpu', 'ram', 'ssd', 'motherboard', 'computer parts'],
    content: `Computer hardware refers to the physical components of a computer.

**Central Processing Unit (CPU):**
• "Brain" of the computer
• Executes instructions
• Measured in GHz (clock speed)
• Cores: Multiple processing units
• Major brands: Intel, AMD

**Graphics Processing Unit (GPU):**
• Handles visual rendering
• Parallel processing
• Gaming, AI, video editing
• Major brands: NVIDIA, AMD

**Memory (RAM):**
• Temporary storage for active data
• Measured in GB (8GB, 16GB, 32GB)
• DDR4, DDR5 generations
• More RAM = better multitasking

**Storage:**
• **HDD:** Spinning disks, cheaper, slower
• **SSD:** Flash memory, faster, more expensive
• **NVMe:** Fastest SSD type
• Measured in GB/TB

**Motherboard:**
• Main circuit board
• Connects all components
• Contains chipset, slots, ports
• Form factors: ATX, Micro-ATX, Mini-ITX

**Power Supply Unit (PSU):**
• Converts AC to DC power
• Measured in watts
• 80+ efficiency ratings

**Cooling:**
• Air cooling (fans, heatsinks)
• Liquid cooling (water blocks, radiators)
• Thermal paste for heat transfer

**Peripherals:**
• Input: Keyboard, mouse, webcam
• Output: Monitor, speakers, printer
• Storage: External drives, USB devices`
  },
  {
    topic: 'Networking Basics',
    category: 'technology',
    keywords: ['network', 'internet', 'wifi', 'router', 'ip address', 'tcp', 'http'],
    content: `Networking connects computers to share resources and communicate.

**Network Types:**
• **LAN:** Local Area Network (home, office)
• **WAN:** Wide Area Network (cities, countries)
• **MAN:** Metropolitan Area Network
• **Internet:** Global network of networks

**Key Devices:**
• **Router:** Directs traffic between networks
• **Switch:** Connects devices in a network
• **Modem:** Connects to ISP
• **Access Point:** Provides WiFi

**IP Addresses:**
• Unique identifier for devices
• IPv4: 192.168.1.1 (32-bit)
• IPv6: 2001:0db8:... (128-bit)
• Public vs Private addresses

**Protocols:**
• **TCP/IP:** Foundation of internet
• **HTTP/HTTPS:** Web traffic
• **FTP:** File transfer
• **SMTP/POP/IMAP:** Email
• **DNS:** Domain name resolution

**WiFi Standards:**
• 802.11n (WiFi 4): Up to 600 Mbps
• 802.11ac (WiFi 5): Up to 3.5 Gbps
• 802.11ax (WiFi 6): Up to 9.6 Gbps
• WiFi 6E: Extended to 6 GHz band

**Network Security:**
• Firewalls block unauthorized access
• VPN encrypts traffic
• WPA3 for WiFi security
• SSL/TLS for web encryption

**Common Ports:**
• 80: HTTP
• 443: HTTPS
• 22: SSH
• 21: FTP
• 25: SMTP`
  },
  {
    topic: 'Operating Systems',
    category: 'technology',
    keywords: ['operating system', 'windows', 'macos', 'linux', 'android', 'ios', 'os'],
    content: `Operating systems manage computer hardware and software resources.

**Desktop Operating Systems:**

**Windows:**
• Most popular desktop OS (~75% market)
• Developed by Microsoft
• Versions: 10, 11
• Good software compatibility

**macOS:**
• Apple's desktop OS
• Unix-based
• Known for design and stability
• Exclusive to Mac hardware

**Linux:**
• Open-source, free
• Many distributions (Ubuntu, Fedora, Debian)
• Popular for servers
• Highly customizable

**Mobile Operating Systems:**

**Android:**
• Google's mobile OS
• Open-source base
• ~70% mobile market share
• Many device manufacturers

**iOS:**
• Apple's mobile OS
• Exclusive to iPhone/iPad
• Known for security and polish
• ~27% mobile market share

**OS Functions:**
• Process management
• Memory management
• File system management
• Device drivers
• User interface
• Security and permissions

**Kernel Types:**
• Monolithic (Linux)
• Microkernel (QNX)
• Hybrid (Windows, macOS)

**File Systems:**
• NTFS (Windows)
• APFS (macOS)
• ext4 (Linux)
• FAT32/exFAT (cross-platform)`
  },
  {
    topic: 'Mobile Technology',
    category: 'technology',
    keywords: ['smartphone', 'mobile', 'app', 'iphone', 'android', '5g', 'tablet'],
    content: `Mobile technology has transformed how we communicate and access information.

**Smartphone Evolution:**
• 2007: iPhone launched smartphone era
• 2008: Android introduced
• Touchscreens replaced keyboards
• Apps became primary software model

**Key Components:**
• **Display:** OLED, LCD, refresh rates
• **Processor:** Apple A-series, Qualcomm Snapdragon
• **Camera:** Multiple lenses, computational photography
• **Battery:** Lithium-ion, fast charging
• **Sensors:** GPS, accelerometer, gyroscope

**Mobile Networks:**
• **2G:** Voice and SMS
• **3G:** Mobile internet
• **4G LTE:** Fast data (100+ Mbps)
• **5G:** Ultra-fast (1+ Gbps), low latency

**App Ecosystems:**
• **App Store (iOS):** ~2 million apps
• **Google Play (Android):** ~3 million apps
• Native vs cross-platform development
• In-app purchases, subscriptions

**Mobile Security:**
• Biometrics (fingerprint, face)
• Encryption
• App permissions
• Remote wipe capabilities

**Tablets:**
• Larger screens for productivity
• iPad dominates market
• Android tablets, Surface
• Stylus support for creativity

**Wearables:**
• Smartwatches (Apple Watch, Galaxy Watch)
• Fitness trackers
• Health monitoring
• Notifications and apps`
  },
];

// =============================================================================
// EXTENDED HISTORY KNOWLEDGE
// =============================================================================

export const EXTENDED_HISTORY: KnowledgeEntry[] = [
  {
    topic: 'Ancient Greece',
    category: 'history',
    keywords: ['greece', 'greek', 'athens', 'sparta', 'democracy', 'olympics', 'philosophy'],
    content: `Ancient Greece (800 BC - 31 BC) laid foundations for Western civilization.

**City-States (Polis):**
• Independent political units
• Athens: Democracy, philosophy, arts
• Sparta: Military society
• Corinth: Trade and commerce
• Thebes: Military power

**Athenian Democracy:**
• First known democracy (~508 BC)
• Citizens voted directly on laws
• Only free adult males could vote
• Assembly (Ekklesia) met regularly

**Greek Philosophy:**
• Socrates: Questioning, ethics
• Plato: Forms, Republic
• Aristotle: Logic, science, politics
• Epicurus, Stoics, Cynics

**Greek Achievements:**
• **Architecture:** Parthenon, columns
• **Theater:** Tragedy, comedy
• **Olympics:** Started 776 BC
• **Mathematics:** Pythagoras, Euclid
• **Medicine:** Hippocrates
• **History:** Herodotus, Thucydides

**Major Wars:**
• **Persian Wars** (499-449 BC)
  - Marathon, Thermopylae, Salamis
  - Greeks defeated Persian Empire
• **Peloponnesian War** (431-404 BC)
  - Athens vs Sparta
  - Sparta ultimately victorious

**Alexander the Great:**
• Macedonian king (356-323 BC)
• Conquered Persian Empire
• Spread Greek culture (Hellenism)
• Empire from Greece to India
• Died at 32, empire divided

**Greek Mythology:**
• Zeus, Hera, Athena, Apollo
• Heroes: Hercules, Achilles, Odysseus
• Iliad and Odyssey (Homer)
• Influenced art and literature`
  },
  {
    topic: 'Medieval Europe',
    category: 'history',
    keywords: ['medieval', 'middle ages', 'feudalism', 'castle', 'knight', 'crusades', 'plague'],
    content: `The Medieval period (500-1500 AD) shaped European society and culture.

**Feudal System:**
• King at top
• Lords/Nobles held land
• Knights provided military service
• Peasants/Serfs worked the land
• Mutual obligations between classes

**The Church:**
• Catholic Church dominated
• Pope had immense power
• Monasteries preserved knowledge
• Church courts, tithes
• Influenced all aspects of life

**Castles:**
• Defensive fortifications
• Moats, drawbridges, towers
• Home of lords and knights
• Symbol of power

**The Crusades (1095-1291):**
• Religious wars for Holy Land
• Nine major crusades
• Cultural exchange with East
• Increased trade
• Knights Templar, Hospitallers

**The Black Death (1347-1351):**
• Bubonic plague pandemic
• Killed 30-60% of Europe
• Spread by fleas on rats
• Social and economic upheaval
• Labor shortages, peasant revolts

**Key Events:**
• Fall of Rome (476 AD)
• Charlemagne crowned (800 AD)
• Norman Conquest (1066)
• Magna Carta (1215)
• Hundred Years' War (1337-1453)

**Culture:**
• Gothic cathedrals
• Illuminated manuscripts
• Chivalry and courtly love
• Guilds and crafts
• Universities founded

**End of Medieval Period:**
• Renaissance begins (1400s)
• Fall of Constantinople (1453)
• Printing press (1450)
• Age of Exploration begins`
  },
  {
    topic: 'World War I',
    category: 'history',
    keywords: ['ww1', 'world war 1', 'great war', 'trench', 'versailles', '1914', '1918'],
    content: `World War I (1914-1918) was the first global industrial war.

**Causes (MAIN):**
• **Militarism:** Arms race
• **Alliances:** Entangling treaties
• **Imperialism:** Colonial competition
• **Nationalism:** Ethnic tensions

**Trigger:**
• Assassination of Archduke Franz Ferdinand
• June 28, 1914, Sarajevo
• Austria-Hungary declared war on Serbia
• Alliance system activated

**The Sides:**
• **Allied Powers:** France, Britain, Russia, Italy, USA (1917)
• **Central Powers:** Germany, Austria-Hungary, Ottoman Empire

**Key Features:**
• Trench warfare on Western Front
• Machine guns, artillery, poison gas
• Tanks and aircraft introduced
• Submarines (U-boats)
• Massive casualties

**Major Battles:**
• Battle of the Marne (1914)
• Battle of Verdun (1916)
• Battle of the Somme (1916)
• Gallipoli Campaign (1915-16)

**Timeline:**
• 1914: War begins, stalemate
• 1915: Italy joins Allies
• 1917: USA enters, Russia exits
• 1918: German Spring Offensive fails
• Nov 11, 1918: Armistice

**Aftermath:**
• ~17 million deaths
• Treaty of Versailles (1919)
• Germany blamed, harsh penalties
• Empires collapsed (Ottoman, Austro-Hungarian, Russian)
• League of Nations formed
• Seeds of WWII planted`
  },
  {
    topic: 'The Renaissance',
    category: 'history',
    keywords: ['renaissance', 'art', 'italy', 'florence', 'michelangelo', 'da vinci', 'rebirth'],
    content: `The Renaissance (1400-1600) was a cultural rebirth in Europe.

**Origins:**
• Started in Italy (Florence)
• Rediscovery of classical texts
• Wealthy patrons (Medici family)
• Trade and prosperity

**Key Ideas:**
• **Humanism:** Focus on human potential
• **Individualism:** Personal achievement
• **Secularism:** Worldly concerns
• **Classical revival:** Greek and Roman ideals

**Art Revolution:**
• Perspective in painting
• Realistic human forms
• Oil painting techniques
• Secular subjects alongside religious

**Great Artists:**
• **Leonardo da Vinci** (1452-1519)
  - Mona Lisa, Last Supper
  - Inventor, scientist, polymath
• **Michelangelo** (1475-1564)
  - Sistine Chapel, David
  - Sculptor, painter, architect
• **Raphael** (1483-1520)
  - School of Athens
  - Harmonious compositions
• **Botticelli** (1445-1510)
  - Birth of Venus

**Scientific Advances:**
• Copernicus: Heliocentric model
• Galileo: Telescope, astronomy
• Vesalius: Human anatomy
• Scientific method emerging

**Literature:**
• Dante: Divine Comedy
• Petrarch: Sonnets
• Machiavelli: The Prince
• Shakespeare (English Renaissance)

**Spread:**
• Northern Renaissance
• Printing press accelerated ideas
• Reformation connected
• Age of Exploration began`
  },
  {
    topic: 'The Cold War',
    category: 'history',
    keywords: ['cold war', 'soviet', 'ussr', 'communism', 'nuclear', 'berlin wall', 'cuba'],
    content: `The Cold War (1947-1991) was a geopolitical tension between superpowers.

**The Sides:**
• **USA and Western Allies:** Capitalism, democracy
• **USSR and Eastern Bloc:** Communism, one-party rule
• No direct military conflict between superpowers

**Origins:**
• Post-WWII power vacuum
• Ideological differences
• Soviet expansion in Eastern Europe
• Iron Curtain divided Europe

**Key Events:**

**1940s-50s:**
• Truman Doctrine (1947)
• Marshall Plan (1948)
• Berlin Blockade/Airlift (1948-49)
• NATO formed (1949)
• Korean War (1950-53)

**1960s:**
• Berlin Wall built (1961)
• Cuban Missile Crisis (1962)
• Vietnam War escalation
• Space Race (Sputnik, Moon landing)

**1970s-80s:**
• Détente (relaxation of tensions)
• Soviet invasion of Afghanistan (1979)
• Reagan military buildup
• Gorbachev reforms (glasnost, perestroika)

**End of Cold War:**
• Berlin Wall falls (1989)
• Eastern European revolutions
• USSR dissolves (1991)
• USA emerges as sole superpower

**Nuclear Arms Race:**
• Atomic bombs → Hydrogen bombs
• MAD (Mutually Assured Destruction)
• Arms control treaties (SALT, START)
• Thousands of warheads built

**Proxy Wars:**
• Korea, Vietnam, Afghanistan
• Africa, Latin America
• Superpowers supported opposing sides`
  },
];

// Add extended knowledge to ALL_KNOWLEDGE
ALL_KNOWLEDGE.push(
  ...EXTENDED_SCIENCE,
  ...EXTENDED_TECHNOLOGY,
  ...EXTENDED_HISTORY
);

// =============================================================================
// EXTENDED PROGRAMMING KNOWLEDGE
// =============================================================================

export const EXTENDED_PROGRAMMING: KnowledgeEntry[] = [
  {
    topic: 'Data Structures',
    category: 'programming',
    keywords: ['data structure', 'array', 'linked list', 'tree', 'hash', 'stack', 'queue', 'graph'],
    content: `Data structures organize and store data efficiently.

**Arrays:**
• Fixed-size, contiguous memory
• O(1) access by index
• O(n) insertion/deletion
• Best for: Random access, iteration

**Linked Lists:**
• Nodes with data and pointers
• O(1) insertion/deletion at known position
• O(n) access
• Types: Singly, doubly, circular

**Stacks (LIFO):**
• Last In, First Out
• Operations: push, pop, peek
• Uses: Undo, function calls, parsing

**Queues (FIFO):**
• First In, First Out
• Operations: enqueue, dequeue
• Uses: Task scheduling, BFS

**Hash Tables:**
• Key-value pairs
• O(1) average access
• Collision handling: chaining, open addressing
• Uses: Caching, indexing

**Trees:**
• Hierarchical structure
• Binary tree: Max 2 children
• BST: Left < root < right
• Uses: File systems, databases

**Heaps:**
• Complete binary tree
• Min-heap or max-heap property
• O(log n) insert/delete
• Uses: Priority queues, sorting

**Graphs:**
• Nodes (vertices) and edges
• Directed or undirected
• Weighted or unweighted
• Uses: Networks, maps, social connections`
  },
  {
    topic: 'Algorithms',
    category: 'programming',
    keywords: ['algorithm', 'sorting', 'searching', 'big o', 'complexity', 'recursion'],
    content: `Algorithms are step-by-step procedures for solving problems.

**Big O Notation:**
• O(1) - Constant time
• O(log n) - Logarithmic
• O(n) - Linear
• O(n log n) - Linearithmic
• O(n²) - Quadratic
• O(2ⁿ) - Exponential

**Sorting Algorithms:**
• **Bubble Sort:** O(n²), simple
• **Selection Sort:** O(n²), simple
• **Insertion Sort:** O(n²), good for small/sorted
• **Merge Sort:** O(n log n), stable, divide & conquer
• **Quick Sort:** O(n log n) avg, in-place
• **Heap Sort:** O(n log n), in-place

**Searching Algorithms:**
• **Linear Search:** O(n), unsorted data
• **Binary Search:** O(log n), sorted data
• **Hash Lookup:** O(1) average

**Graph Algorithms:**
• **BFS:** Breadth-first, shortest path (unweighted)
• **DFS:** Depth-first, traversal, cycle detection
• **Dijkstra's:** Shortest path (weighted)
• **A*:** Pathfinding with heuristics

**Dynamic Programming:**
• Break into subproblems
• Store results (memoization)
• Examples: Fibonacci, knapsack

**Recursion:**
• Function calls itself
• Base case stops recursion
• Stack overflow risk
• Can convert to iteration`
  },
  {
    topic: 'Object-Oriented Programming',
    category: 'programming',
    keywords: ['oop', 'class', 'object', 'inheritance', 'polymorphism', 'encapsulation'],
    content: `OOP organizes code around objects that contain data and behavior.

**Four Pillars:**

**1. Encapsulation:**
• Bundle data and methods
• Hide internal details
• Public/private access
• Getters and setters

**2. Abstraction:**
• Hide complexity
• Show only essentials
• Interfaces and abstract classes
• Simplify interaction

**3. Inheritance:**
• Classes inherit from parent
• Code reuse
• "is-a" relationship
• Override methods

**4. Polymorphism:**
• Same interface, different behavior
• Method overriding
• Method overloading
• Duck typing (dynamic languages)

**Key Concepts:**
• **Class:** Blueprint for objects
• **Object:** Instance of a class
• **Constructor:** Initialize object
• **Method:** Function in a class
• **Property:** Data in a class

**SOLID Principles:**
• **S:** Single Responsibility
• **O:** Open/Closed
• **L:** Liskov Substitution
• **I:** Interface Segregation
• **D:** Dependency Inversion

**Design Patterns:**
• Singleton, Factory, Observer
• Strategy, Decorator, Adapter
• MVC, MVVM architectures`
  },
  {
    topic: 'Web Development',
    category: 'programming',
    keywords: ['web', 'frontend', 'backend', 'fullstack', 'server', 'client', 'website'],
    content: `Web development creates websites and web applications.

**Frontend (Client-side):**
• HTML - Structure
• CSS - Styling
• JavaScript - Interactivity
• Frameworks: React, Vue, Angular

**Backend (Server-side):**
• Server logic and APIs
• Languages: Node.js, Python, Java, PHP, Ruby
• Frameworks: Express, Django, Spring, Laravel

**Databases:**
• SQL: PostgreSQL, MySQL
• NoSQL: MongoDB, Redis
• ORMs: Sequelize, Prisma

**Full Stack:**
• Frontend + Backend + Database
• Popular stacks: MERN, LAMP, JAMstack

**APIs:**
• REST: HTTP methods, JSON
• GraphQL: Query language
• WebSockets: Real-time

**Deployment:**
• Hosting: AWS, Vercel, Netlify
• Containers: Docker
• CI/CD: GitHub Actions, Jenkins

**Security:**
• HTTPS/SSL
• Authentication (JWT, OAuth)
• Input validation
• CORS, XSS, CSRF protection

**Performance:**
• Caching
• CDN
• Lazy loading
• Code splitting
• Image optimization`
  },
  {
    topic: 'Database Concepts',
    category: 'programming',
    keywords: ['database', 'sql', 'nosql', 'query', 'table', 'schema', 'mongodb', 'postgresql'],
    content: `Databases store and manage data persistently.

**SQL (Relational):**
• Tables with rows and columns
• Structured schema
• ACID compliance
• Examples: PostgreSQL, MySQL, SQLite

**Basic SQL Commands:**
\`\`\`sql
SELECT * FROM users WHERE age > 18;
INSERT INTO users (name, age) VALUES ('John', 25);
UPDATE users SET age = 26 WHERE name = 'John';
DELETE FROM users WHERE id = 1;
\`\`\`

**Joins:**
• INNER JOIN: Matching rows
• LEFT JOIN: All left + matching right
• RIGHT JOIN: All right + matching left
• FULL JOIN: All rows

**NoSQL Types:**
• **Document:** MongoDB (JSON-like)
• **Key-Value:** Redis
• **Column:** Cassandra
• **Graph:** Neo4j

**Database Design:**
• Normalization (reduce redundancy)
• Primary keys (unique identifier)
• Foreign keys (relationships)
• Indexes (faster queries)

**ACID Properties:**
• **Atomicity:** All or nothing
• **Consistency:** Valid state
• **Isolation:** Concurrent safety
• **Durability:** Persisted

**Scaling:**
• Vertical: Bigger server
• Horizontal: More servers
• Sharding: Distribute data
• Replication: Copies for reliability`
  },
  {
    topic: 'Testing and Debugging',
    category: 'programming',
    keywords: ['testing', 'debug', 'unit test', 'integration', 'bug', 'error', 'tdd'],
    content: `Testing ensures code works correctly; debugging fixes issues.

**Types of Testing:**
• **Unit Testing:** Individual functions
• **Integration Testing:** Components together
• **End-to-End (E2E):** Full user flows
• **Performance Testing:** Speed, load
• **Security Testing:** Vulnerabilities

**Testing Frameworks:**
• JavaScript: Jest, Mocha, Cypress
• Python: pytest, unittest
• Java: JUnit
• General: Selenium (browser)

**Test-Driven Development (TDD):**
1. Write failing test
2. Write minimal code to pass
3. Refactor
4. Repeat

**Code Coverage:**
• Percentage of code tested
• Line, branch, function coverage
• 80%+ is good target
• 100% not always practical

**Debugging Techniques:**
• Print/console.log statements
• Debugger breakpoints
• Stack traces
• Rubber duck debugging
• Binary search (isolate issue)

**Common Bug Types:**
• Syntax errors
• Logic errors
• Off-by-one errors
• Null/undefined references
• Race conditions

**Debugging Tools:**
• Browser DevTools
• IDE debuggers
• Logging frameworks
• Error tracking (Sentry)`
  },
];

// =============================================================================
// EXTENDED MATH KNOWLEDGE
// =============================================================================

export const EXTENDED_MATH: KnowledgeEntry[] = [
  {
    topic: 'Trigonometry',
    category: 'mathematics',
    keywords: ['trigonometry', 'sine', 'cosine', 'tangent', 'angle', 'triangle', 'radian'],
    content: `Trigonometry studies relationships between angles and sides of triangles.

**Basic Ratios (Right Triangle):**
• sin(θ) = opposite / hypotenuse
• cos(θ) = adjacent / hypotenuse
• tan(θ) = opposite / adjacent

**SOH-CAH-TOA** (memory aid)

**Reciprocal Functions:**
• csc(θ) = 1/sin(θ)
• sec(θ) = 1/cos(θ)
• cot(θ) = 1/tan(θ)

**Unit Circle:**
• Radius = 1
• x = cos(θ), y = sin(θ)
• Key angles: 0°, 30°, 45°, 60°, 90°

**Common Values:**
• sin(0°) = 0, cos(0°) = 1
• sin(30°) = 1/2, cos(30°) = √3/2
• sin(45°) = √2/2, cos(45°) = √2/2
• sin(90°) = 1, cos(90°) = 0

**Radians vs Degrees:**
• π radians = 180°
• 1 radian ≈ 57.3°
• Convert: radians = degrees × (π/180)

**Identities:**
• sin²θ + cos²θ = 1
• tan θ = sin θ / cos θ
• sin(2θ) = 2 sin θ cos θ

**Applications:**
• Navigation
• Physics (waves, oscillations)
• Engineering
• Computer graphics`
  },
  {
    topic: 'Linear Algebra',
    category: 'mathematics',
    keywords: ['linear algebra', 'matrix', 'vector', 'determinant', 'eigenvalue'],
    content: `Linear algebra studies vectors, matrices, and linear transformations.

**Vectors:**
• Magnitude and direction
• Addition: Component-wise
• Scalar multiplication
• Dot product: a·b = |a||b|cos(θ)
• Cross product: Perpendicular vector

**Matrices:**
• Rectangular array of numbers
• m × n (rows × columns)
• Addition: Same dimensions
• Multiplication: (m×n)(n×p) = (m×p)

**Matrix Operations:**
\`\`\`
[a b]   [e f]   [ae+bg af+bh]
[c d] × [g h] = [ce+dg cf+dh]
\`\`\`

**Special Matrices:**
• Identity matrix (I): Diagonal 1s
• Zero matrix: All zeros
• Transpose: Rows ↔ columns
• Inverse: A × A⁻¹ = I

**Determinant:**
• Scalar value from square matrix
• 2×2: ad - bc
• Used for: Invertibility, area/volume

**Eigenvalues/Eigenvectors:**
• Av = λv
• λ = eigenvalue
• v = eigenvector
• Used in: PCA, stability analysis

**Applications:**
• Computer graphics
• Machine learning
• Quantum mechanics
• Economics`
  },
  {
    topic: 'Number Theory',
    category: 'mathematics',
    keywords: ['number theory', 'prime', 'divisibility', 'modular', 'integer'],
    content: `Number theory studies properties of integers.

**Types of Numbers:**
• Natural: 1, 2, 3, ...
• Whole: 0, 1, 2, 3, ...
• Integers: ..., -2, -1, 0, 1, 2, ...
• Rational: p/q (fractions)
• Irrational: √2, π, e
• Real: All above
• Complex: a + bi

**Prime Numbers:**
• Divisible only by 1 and itself
• First primes: 2, 3, 5, 7, 11, 13...
• 2 is only even prime
• Infinite primes (Euclid's proof)

**Divisibility Rules:**
• By 2: Last digit even
• By 3: Digit sum divisible by 3
• By 5: Ends in 0 or 5
• By 9: Digit sum divisible by 9

**GCD and LCM:**
• GCD: Greatest Common Divisor
• LCM: Least Common Multiple
• GCD × LCM = a × b

**Modular Arithmetic:**
• a ≡ b (mod n): Same remainder
• Clock arithmetic
• Used in cryptography

**Famous Results:**
• Fundamental Theorem of Arithmetic
• Fermat's Little Theorem
• Chinese Remainder Theorem

**Applications:**
• Cryptography (RSA)
• Computer science
• Coding theory`
  },
];

// =============================================================================
// EXTENDED GEOGRAPHY KNOWLEDGE
// =============================================================================

export const EXTENDED_GEOGRAPHY: KnowledgeEntry[] = [
  {
    topic: 'European Countries',
    category: 'geography',
    keywords: ['europe', 'european', 'germany', 'france', 'uk', 'italy', 'spain'],
    content: `Europe is a continent with 44 countries and rich cultural diversity.

**Major Countries:**

**Germany:**
• Capital: Berlin
• Population: ~84 million
• Largest EU economy
• Known for: Engineering, beer, history

**France:**
• Capital: Paris
• Population: ~67 million
• Famous for: Art, cuisine, fashion
• Landmarks: Eiffel Tower, Louvre

**United Kingdom:**
• Capital: London
• Population: ~67 million
• Includes: England, Scotland, Wales, N. Ireland
• Constitutional monarchy

**Italy:**
• Capital: Rome
• Population: ~60 million
• Famous for: Art, food, history
• Landmarks: Colosseum, Vatican

**Spain:**
• Capital: Madrid
• Population: ~47 million
• Famous for: Culture, beaches, football
• Landmarks: Sagrada Familia

**Other Notable Countries:**
• Poland, Netherlands, Belgium
• Sweden, Norway, Denmark (Nordic)
• Switzerland, Austria (Alpine)
• Greece, Portugal

**European Union:**
• 27 member states
• Euro currency (20 countries)
• Free movement, trade
• Brussels headquarters

**Geography:**
• Alps mountain range
• Rhine, Danube rivers
• Mediterranean, North, Baltic seas
• Varied climates`
  },
  {
    topic: 'Asian Countries',
    category: 'geography',
    keywords: ['asia', 'asian', 'china', 'japan', 'india', 'korea', 'vietnam'],
    content: `Asia is the largest and most populous continent.

**Major Countries:**

**China:**
• Capital: Beijing
• Population: ~1.4 billion
• World's 2nd largest economy
• Great Wall, Forbidden City

**Japan:**
• Capital: Tokyo
• Population: ~125 million
• Technology leader
• Mt. Fuji, temples, anime

**India:**
• Capital: New Delhi
• Population: ~1.4 billion (most populous)
• Diverse cultures, languages
• Taj Mahal, Himalayas

**South Korea:**
• Capital: Seoul
• Population: ~52 million
• Tech hub (Samsung, LG)
• K-pop, Korean cuisine

**Indonesia:**
• Capital: Jakarta
• Population: ~277 million
• Largest archipelago (17,000+ islands)
• Bali, diverse cultures

**Other Notable Countries:**
• Vietnam, Thailand, Philippines
• Malaysia, Singapore
• Pakistan, Bangladesh
• Saudi Arabia, UAE, Israel

**Geography:**
• Himalayas (highest mountains)
• Gobi, Arabian deserts
• Mekong, Ganges, Yangtze rivers
• Diverse climates

**Regions:**
• East Asia
• Southeast Asia
• South Asia
• Central Asia
• Middle East/West Asia`
  },
  {
    topic: 'African Countries',
    category: 'geography',
    keywords: ['africa', 'african', 'egypt', 'nigeria', 'south africa', 'kenya', 'morocco'],
    content: `Africa is the second-largest continent with 54 countries.

**Major Countries:**

**Nigeria:**
• Capital: Abuja
• Population: ~220 million (most in Africa)
• Largest economy in Africa
• Oil producer, diverse cultures

**Egypt:**
• Capital: Cairo
• Population: ~104 million
• Ancient civilization
• Pyramids, Nile River

**South Africa:**
• Capitals: Pretoria, Cape Town, Bloemfontein
• Population: ~60 million
• Most developed in Africa
• Diverse wildlife, Table Mountain

**Kenya:**
• Capital: Nairobi
• Population: ~54 million
• Safari destination
• Maasai Mara, wildlife

**Ethiopia:**
• Capital: Addis Ababa
• Population: ~120 million
• Ancient history
• Coffee origin

**Other Notable Countries:**
• Morocco, Algeria, Tunisia (North)
• Ghana, Senegal, Ivory Coast (West)
• Tanzania, Uganda, Rwanda (East)
• DRC, Angola (Central)

**Geography:**
• Sahara Desert (largest hot desert)
• Nile River (longest river)
• Mt. Kilimanjaro (highest peak)
• Great Rift Valley
• Diverse ecosystems

**Regions:**
• North Africa
• West Africa
• East Africa
• Central Africa
• Southern Africa`
  },
];

// =============================================================================
// EXTENDED HEALTH KNOWLEDGE
// =============================================================================

export const EXTENDED_HEALTH: KnowledgeEntry[] = [
  {
    topic: 'Common Diseases',
    category: 'health',
    keywords: ['disease', 'illness', 'diabetes', 'cancer', 'heart disease', 'flu', 'cold'],
    content: `Understanding common diseases helps with prevention and treatment.

**Cardiovascular Disease:**
• Leading cause of death globally
• Includes: Heart attack, stroke
• Risk factors: High BP, cholesterol, smoking
• Prevention: Exercise, diet, no smoking

**Cancer:**
• Uncontrolled cell growth
• Many types (lung, breast, colon, etc.)
• Risk factors: Genetics, lifestyle, environment
• Treatment: Surgery, chemo, radiation

**Diabetes:**
• Type 1: Autoimmune, insulin-dependent
• Type 2: Insulin resistance (most common)
• Symptoms: Thirst, frequent urination, fatigue
• Management: Diet, exercise, medication

**Respiratory Diseases:**
• Asthma: Airway inflammation
• COPD: Chronic lung damage
• Pneumonia: Lung infection
• COVID-19: Coronavirus disease

**Infectious Diseases:**
• Flu (Influenza): Seasonal virus
• Common cold: Rhinovirus
• HIV/AIDS: Immune system attack
• Tuberculosis: Bacterial lung infection

**Mental Health Conditions:**
• Depression, anxiety
• Bipolar disorder
• Schizophrenia
• PTSD

**Prevention:**
• Vaccinations
• Healthy lifestyle
• Regular checkups
• Early detection
• Hygiene practices`
  },
  {
    topic: 'First Aid Basics',
    category: 'health',
    keywords: ['first aid', 'emergency', 'cpr', 'wound', 'burn', 'choking'],
    content: `First aid provides immediate care before professional help arrives.

**CPR (Cardiopulmonary Resuscitation):**
• Check responsiveness
• Call emergency services
• 30 chest compressions
• 2 rescue breaths
• Repeat until help arrives
• Push hard and fast (100-120/min)

**Choking (Heimlich Maneuver):**
• Stand behind person
• Make fist above navel
• Grasp with other hand
• Quick upward thrusts
• Repeat until object dislodges

**Bleeding:**
• Apply direct pressure
• Elevate wound above heart
• Use clean cloth/bandage
• Don't remove embedded objects
• Seek help for severe bleeding

**Burns:**
• Cool with running water (10+ min)
• Don't use ice or butter
• Cover with clean bandage
• Don't pop blisters
• Seek help for severe burns

**Fractures:**
• Immobilize the area
• Don't try to realign
• Apply ice (wrapped)
• Elevate if possible
• Seek medical attention

**Shock:**
• Lay person down
• Elevate legs
• Keep warm
• Don't give food/drink
• Monitor breathing

**Emergency Numbers:**
• USA: 911
• UK: 999
• EU: 112
• Know your local number`
  },
  {
    topic: 'Vitamins and Minerals',
    category: 'health',
    keywords: ['vitamin', 'mineral', 'supplement', 'nutrient', 'deficiency'],
    content: `Vitamins and minerals are essential nutrients for body function.

**Fat-Soluble Vitamins:**
• **Vitamin A:** Vision, immune system
  - Sources: Carrots, sweet potatoes, liver
• **Vitamin D:** Bone health, immunity
  - Sources: Sunlight, fish, fortified foods
• **Vitamin E:** Antioxidant, skin health
  - Sources: Nuts, seeds, vegetable oils
• **Vitamin K:** Blood clotting, bones
  - Sources: Leafy greens, broccoli

**Water-Soluble Vitamins:**
• **Vitamin C:** Immune system, collagen
  - Sources: Citrus, peppers, strawberries
• **B Vitamins:** Energy, nervous system
  - B1 (Thiamine), B2 (Riboflavin)
  - B3 (Niacin), B6, B12, Folate
  - Sources: Whole grains, meat, eggs

**Essential Minerals:**
• **Calcium:** Bones, teeth, muscles
  - Sources: Dairy, leafy greens
• **Iron:** Oxygen transport in blood
  - Sources: Red meat, beans, spinach
• **Magnesium:** Muscles, nerves, energy
  - Sources: Nuts, whole grains
• **Zinc:** Immune system, wound healing
  - Sources: Meat, shellfish, legumes
• **Potassium:** Heart, muscles, fluids
  - Sources: Bananas, potatoes

**Deficiency Signs:**
• Fatigue, weakness
• Poor immune function
• Skin/hair problems
• Bone issues

**Recommendations:**
• Get nutrients from food first
• Supplements if needed
• Don't exceed upper limits
• Consult healthcare provider`
  },
];

// Add more extended knowledge
ALL_KNOWLEDGE.push(
  ...EXTENDED_PROGRAMMING,
  ...EXTENDED_MATH,
  ...EXTENDED_GEOGRAPHY,
  ...EXTENDED_HEALTH
);

// =============================================================================
// FAMOUS PEOPLE KNOWLEDGE
// =============================================================================

export const FAMOUS_PEOPLE: KnowledgeEntry[] = [
  {
    topic: 'Albert Einstein',
    category: 'biography',
    keywords: ['einstein', 'relativity', 'physicist', 'e=mc2', 'genius'],
    content: `Albert Einstein (1879-1955) was a theoretical physicist who revolutionized our understanding of the universe.

**Key Achievements:**
• Theory of Special Relativity (1905)
• Theory of General Relativity (1915)
• E=mc² (mass-energy equivalence)
• Photoelectric effect (Nobel Prize 1921)
• Contributions to quantum mechanics

**Life:**
• Born in Ulm, Germany
• Worked as patent clerk while developing theories
• Professor at various universities
• Fled Nazi Germany (1933)
• Became US citizen (1940)
• Died in Princeton, New Jersey

**Famous Quotes:**
• "Imagination is more important than knowledge"
• "God does not play dice with the universe"
• "The only source of knowledge is experience"

**Legacy:**
• Changed our understanding of space, time, gravity
• Foundation for nuclear energy and weapons
• GPS technology relies on relativity
• Icon of genius in popular culture`
  },
  {
    topic: 'Leonardo da Vinci',
    category: 'biography',
    keywords: ['da vinci', 'leonardo', 'mona lisa', 'renaissance', 'inventor'],
    content: `Leonardo da Vinci (1452-1519) was the ultimate Renaissance polymath.

**Artistic Works:**
• Mona Lisa (most famous painting)
• The Last Supper
• Vitruvian Man
• Lady with an Ermine

**Scientific Studies:**
• Human anatomy (detailed dissections)
• Flight and aerodynamics
• Hydraulics and water flow
• Optics and light
• Botany and geology

**Inventions (ahead of his time):**
• Flying machines (helicopter, glider)
• Parachute
• Tank
• Diving suit
• Robotic knight

**Notebooks:**
• Over 7,000 pages survive
• Written in mirror script
• Drawings, observations, ideas
• Cover art, science, engineering

**Legacy:**
• Epitome of "Renaissance man"
• Bridged art and science
• Influenced countless artists and inventors
• Symbol of human potential`
  },
  {
    topic: 'Marie Curie',
    category: 'biography',
    keywords: ['curie', 'radioactivity', 'scientist', 'nobel prize', 'radium'],
    content: `Marie Curie (1867-1934) was a pioneering physicist and chemist.

**Achievements:**
• Discovered polonium and radium
• Coined term "radioactivity"
• First woman to win Nobel Prize
• Only person to win Nobel in two sciences (Physics 1903, Chemistry 1911)
• First female professor at Sorbonne

**Life:**
• Born Maria Sklodowska in Warsaw, Poland
• Moved to Paris for education
• Married Pierre Curie (fellow scientist)
• Continued research after Pierre's death
• Died from radiation exposure

**Contributions:**
• Pioneered radioactivity research
• Developed mobile X-ray units (WWI)
• Founded Curie Institutes
• Opened doors for women in science

**Legacy:**
• Element curium named after her
• Inspiration for women in STEM
• Her notebooks still radioactive
• Symbol of scientific dedication`
  },
  {
    topic: 'Martin Luther King Jr.',
    category: 'biography',
    keywords: ['mlk', 'martin luther king', 'civil rights', 'i have a dream'],
    content: `Martin Luther King Jr. (1929-1968) was a leader of the American civil rights movement.

**Key Events:**
• Montgomery Bus Boycott (1955-56)
• Southern Christian Leadership Conference founder
• March on Washington (1963)
• "I Have a Dream" speech
• Nobel Peace Prize (1964)
• Selma to Montgomery marches (1965)

**Philosophy:**
• Nonviolent resistance
• Civil disobedience
• Influenced by Gandhi
• Christian principles
• Economic justice

**Famous Speeches:**
• "I Have a Dream" (1963)
• "I've Been to the Mountaintop" (1968)
• Letter from Birmingham Jail

**Assassination:**
• April 4, 1968, Memphis, Tennessee
• Shot by James Earl Ray
• Sparked riots across America
• National day of mourning

**Legacy:**
• MLK Day (federal holiday)
• Civil Rights Act, Voting Rights Act
• Inspiration for movements worldwide
• Symbol of peaceful resistance`
  },
  {
    topic: 'William Shakespeare',
    category: 'biography',
    keywords: ['shakespeare', 'playwright', 'hamlet', 'romeo', 'juliet', 'bard'],
    content: `William Shakespeare (1564-1616) is considered the greatest writer in English.

**Famous Plays:**
• **Tragedies:** Hamlet, Macbeth, Othello, King Lear
• **Comedies:** A Midsummer Night's Dream, Much Ado About Nothing
• **Histories:** Henry V, Richard III
• **Romances:** The Tempest, Romeo and Juliet

**Achievements:**
• 37 plays, 154 sonnets
• Invented ~1,700 words
• Globe Theatre association
• Influenced literature for centuries

**Famous Quotes:**
• "To be, or not to be"
• "All the world's a stage"
• "What's in a name?"
• "The course of true love never did run smooth"

**Life:**
• Born in Stratford-upon-Avon
• Married Anne Hathaway
• Actor and playwright in London
• Retired to Stratford

**Legacy:**
• Most performed playwright
• Works translated to every language
• Shaped English language
• Universal themes still relevant`
  },
  {
    topic: 'Mahatma Gandhi',
    category: 'biography',
    keywords: ['gandhi', 'india', 'independence', 'nonviolence', 'civil disobedience'],
    content: `Mahatma Gandhi (1869-1948) led India's independence movement through nonviolent resistance.

**Key Principles:**
• **Ahimsa:** Nonviolence
• **Satyagraha:** Truth-force, civil disobedience
• **Swaraj:** Self-rule
• Simple living
• Religious tolerance

**Major Campaigns:**
• South Africa civil rights (1893-1914)
• Non-Cooperation Movement (1920)
• Salt March (1930)
• Quit India Movement (1942)

**Life:**
• Born in Porbandar, India
• Studied law in London
• Practiced in South Africa
• Returned to India (1915)
• Led independence movement
• Assassinated January 30, 1948

**Methods:**
• Peaceful protests
• Fasting
• Boycotts
• Civil disobedience
• Spinning cloth (khadi)

**Legacy:**
• Father of Indian nation
• Influenced MLK, Mandela
• Symbol of peaceful resistance
• International Day of Non-Violence (Oct 2)`
  },
];

// =============================================================================
// SPACE AND ASTRONOMY KNOWLEDGE
// =============================================================================

export const SPACE_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Stars and Galaxies',
    category: 'science',
    keywords: ['star', 'galaxy', 'milky way', 'supernova', 'black hole', 'universe'],
    content: `Stars and galaxies are the building blocks of the universe.

**Stars:**
• Massive balls of hot gas (plasma)
• Powered by nuclear fusion
• Convert hydrogen to helium
• Lifespan: millions to billions of years

**Star Types (by temperature):**
• O, B (blue) - Hottest
• A, F (white)
• G (yellow) - Like our Sun
• K, M (orange/red) - Coolest

**Star Life Cycle:**
1. Nebula (gas cloud)
2. Protostar
3. Main sequence (most of life)
4. Red giant
5. Death: White dwarf, neutron star, or black hole

**Galaxies:**
• Collections of stars, gas, dust
• Billions of stars each
• Types: Spiral, elliptical, irregular
• Milky Way: Our galaxy (~200 billion stars)

**Black Holes:**
• Extreme gravity (nothing escapes)
• Form from massive star collapse
• Supermassive at galaxy centers
• Event horizon: Point of no return

**The Universe:**
• ~13.8 billion years old
• Expanding (accelerating)
• Observable: ~93 billion light-years
• Contains ~2 trillion galaxies`
  },
  {
    topic: 'Space Exploration',
    category: 'science',
    keywords: ['nasa', 'spacex', 'astronaut', 'rocket', 'moon landing', 'mars'],
    content: `Space exploration has expanded human knowledge and capabilities.

**Key Milestones:**
• 1957: Sputnik (first satellite)
• 1961: Yuri Gagarin (first human in space)
• 1969: Apollo 11 (Moon landing)
• 1971: First space station (Salyut)
• 1981: Space Shuttle program
• 1998: International Space Station
• 2020: SpaceX Crew Dragon

**Moon Landing (Apollo 11):**
• July 20, 1969
• Neil Armstrong, Buzz Aldrin
• "One small step for man..."
• 6 successful Moon landings total

**Space Agencies:**
• NASA (USA)
• ESA (Europe)
• Roscosmos (Russia)
• CNSA (China)
• ISRO (India)
• JAXA (Japan)

**Private Space Companies:**
• SpaceX (Elon Musk)
• Blue Origin (Jeff Bezos)
• Virgin Galactic (Richard Branson)

**Current/Future Missions:**
• Mars rovers (Perseverance)
• Artemis (return to Moon)
• James Webb Space Telescope
• Mars colonization plans

**Challenges:**
• Radiation exposure
• Microgravity effects
• Distance and communication
• Life support systems
• Cost`
  },
  {
    topic: 'The Moon',
    category: 'science',
    keywords: ['moon', 'lunar', 'tide', 'eclipse', 'crater', 'apollo'],
    content: `The Moon is Earth's only natural satellite.

**Basic Facts:**
• Distance: ~384,400 km from Earth
• Diameter: 3,474 km (1/4 of Earth)
• Age: ~4.5 billion years
• No atmosphere
• Surface gravity: 1/6 of Earth

**Formation:**
• Giant impact hypothesis
• Mars-sized object hit early Earth
• Debris formed the Moon
• Gradually moved away from Earth

**Surface Features:**
• Maria (dark plains) - Ancient lava
• Highlands (bright areas)
• Craters from impacts
• No wind or water erosion

**Phases:**
• New Moon → Waxing Crescent
• First Quarter → Waxing Gibbous
• Full Moon → Waning Gibbous
• Last Quarter → Waning Crescent
• 29.5-day cycle

**Effects on Earth:**
• Tides (gravitational pull)
• Stabilizes Earth's axis
• Eclipses (solar and lunar)

**Exploration:**
• Luna program (USSR)
• Apollo missions (USA)
• Chang'e (China)
• Artemis program (future)`
  },
];

// =============================================================================
// MUSIC KNOWLEDGE
// =============================================================================

export const MUSIC_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Classical Music',
    category: 'music',
    keywords: ['classical', 'beethoven', 'mozart', 'bach', 'symphony', 'orchestra'],
    content: `Classical music spans centuries of Western art music tradition.

**Major Periods:**
• **Baroque** (1600-1750): Bach, Handel, Vivaldi
• **Classical** (1750-1820): Mozart, Haydn
• **Romantic** (1820-1900): Beethoven, Chopin, Brahms
• **20th Century**: Stravinsky, Debussy

**Great Composers:**

**Johann Sebastian Bach** (1685-1750)
• Baroque master
• Fugues, cantatas, concertos
• Brandenburg Concertos

**Wolfgang Amadeus Mozart** (1756-1791)
• Child prodigy
• Operas, symphonies, concertos
• The Magic Flute, Requiem

**Ludwig van Beethoven** (1770-1827)
• Bridge to Romantic era
• Composed while deaf
• 9 symphonies, piano sonatas

**Orchestra Sections:**
• Strings: Violin, viola, cello, bass
• Woodwinds: Flute, clarinet, oboe, bassoon
• Brass: Trumpet, horn, trombone, tuba
• Percussion: Timpani, cymbals, etc.

**Musical Forms:**
• Symphony (4 movements)
• Concerto (soloist + orchestra)
• Sonata (solo instrument)
• Opera (staged drama with music)`
  },
  {
    topic: 'Popular Music Genres',
    category: 'music',
    keywords: ['rock', 'pop', 'hip hop', 'jazz', 'blues', 'country', 'electronic'],
    content: `Popular music encompasses many genres that have shaped culture.

**Rock:**
• Origins: 1950s, blues and country
• Icons: Elvis, Beatles, Led Zeppelin
• Subgenres: Hard rock, punk, alternative, metal

**Pop:**
• Mainstream, catchy melodies
• Icons: Michael Jackson, Madonna, Taylor Swift
• Constantly evolving with trends

**Hip-Hop/Rap:**
• Origins: 1970s Bronx, NY
• Elements: MCing, DJing, breakdancing, graffiti
• Icons: Tupac, Notorious B.I.G., Jay-Z, Kendrick Lamar

**Jazz:**
• Origins: Early 1900s New Orleans
• Improvisation central
• Icons: Louis Armstrong, Miles Davis, John Coltrane

**Blues:**
• Origins: African American South
• 12-bar structure common
• Icons: B.B. King, Robert Johnson, Muddy Waters

**Country:**
• Origins: American South/Appalachia
• Storytelling, acoustic instruments
• Icons: Johnny Cash, Dolly Parton

**Electronic/EDM:**
• Synthesizers, drum machines
• Subgenres: House, techno, dubstep
• Festival culture

**R&B/Soul:**
• Rhythm and blues roots
• Icons: Aretha Franklin, Stevie Wonder, Beyoncé`
  },
];

// =============================================================================
// TECHNOLOGY COMPANIES
// =============================================================================

export const TECH_COMPANIES: KnowledgeEntry[] = [
  {
    topic: 'Major Tech Companies',
    category: 'technology',
    keywords: ['apple', 'google', 'microsoft', 'amazon', 'meta', 'facebook', 'tech company'],
    content: `Major technology companies shape the modern digital world.

**Apple:**
• Founded: 1976 (Steve Jobs, Steve Wozniak)
• Products: iPhone, Mac, iPad, Apple Watch
• Services: App Store, Apple Music, iCloud
• Known for: Design, ecosystem, premium pricing

**Google (Alphabet):**
• Founded: 1998 (Larry Page, Sergey Brin)
• Products: Search, Android, Chrome, YouTube
• Services: Gmail, Maps, Cloud, Workspace
• Known for: Search dominance, AI, advertising

**Microsoft:**
• Founded: 1975 (Bill Gates, Paul Allen)
• Products: Windows, Office, Xbox, Surface
• Services: Azure, Microsoft 365, LinkedIn
• Known for: Enterprise software, cloud

**Amazon:**
• Founded: 1994 (Jeff Bezos)
• Products: E-commerce, Kindle, Echo/Alexa
• Services: AWS, Prime, Prime Video
• Known for: E-commerce, cloud computing

**Meta (Facebook):**
• Founded: 2004 (Mark Zuckerberg)
• Products: Facebook, Instagram, WhatsApp
• Focus: Social media, VR/AR (Quest)
• Known for: Social networking, advertising

**Other Notable Companies:**
• Tesla (electric vehicles, Elon Musk)
• Netflix (streaming)
• NVIDIA (GPUs, AI chips)
• OpenAI (ChatGPT, AI research)
• SpaceX (space exploration)`
  },
];

// =============================================================================
// COMMON QUESTIONS
// =============================================================================

export const COMMON_QUESTIONS: KnowledgeEntry[] = [
  {
    topic: 'Why is the Sky Blue',
    category: 'science',
    keywords: ['sky', 'blue', 'color', 'atmosphere', 'light'],
    content: `The sky appears blue due to a phenomenon called Rayleigh scattering.

**The Science:**
• Sunlight contains all colors (rainbow spectrum)
• Light travels in waves of different lengths
• Blue light has shorter wavelength than red

**Rayleigh Scattering:**
• Sunlight enters Earth's atmosphere
• Molecules scatter shorter wavelengths more
• Blue light scatters in all directions
• We see blue from all parts of the sky

**Why Not Violet?**
• Violet has even shorter wavelength
• But: Sun emits less violet light
• Our eyes are more sensitive to blue
• Some violet is absorbed by upper atmosphere

**Sunset Colors:**
• Sun lower on horizon
• Light travels through more atmosphere
• Blue scatters away before reaching us
• Red/orange light remains (longer wavelength)

**Other Planets:**
• Mars: Butterscotch/pink (dust particles)
• Venus: Yellow-orange (thick clouds)
• Moon: Black (no atmosphere)`
  },
  {
    topic: 'How Do Airplanes Fly',
    category: 'science',
    keywords: ['airplane', 'fly', 'flight', 'wing', 'lift', 'aircraft'],
    content: `Airplanes fly using four fundamental forces.

**The Four Forces:**

**1. Lift (upward):**
• Generated by wings
• Air moves faster over curved top
• Creates lower pressure above wing
• Higher pressure below pushes up

**2. Weight/Gravity (downward):**
• Earth's gravitational pull
• Must be overcome by lift
• Affects fuel efficiency

**3. Thrust (forward):**
• Generated by engines
• Jet engines or propellers
• Pushes plane through air

**4. Drag (backward):**
• Air resistance
• Opposes forward motion
• Streamlined shapes reduce drag

**Wing Design:**
• Airfoil shape (curved top, flatter bottom)
• Angle of attack affects lift
• Flaps increase lift for takeoff/landing
• Ailerons control rolling

**Takeoff:**
• Engines provide thrust
• Speed increases
• Lift exceeds weight
• Plane rises

**Control Surfaces:**
• Ailerons (roll)
• Elevator (pitch up/down)
• Rudder (yaw left/right)`
  },
  {
    topic: 'How Does the Internet Work',
    category: 'technology',
    keywords: ['internet', 'web', 'network', 'data', 'connection'],
    content: `The internet is a global network of connected computers.

**Basic Concept:**
• Network of networks
• Computers communicate via protocols
• Data travels in packets
• No central control

**Key Components:**

**Your Device:**
• Computer, phone, tablet
• Has network interface
• Runs browser/apps

**Router/Modem:**
• Connects you to ISP
• Assigns local IP addresses
• Routes traffic

**ISP (Internet Service Provider):**
• Connects you to internet backbone
• Examples: Comcast, AT&T, Verizon

**Internet Backbone:**
• High-speed fiber optic cables
• Undersea cables connect continents
• Data centers and exchange points

**How Data Travels:**
1. You request a website
2. Request goes to DNS (finds IP address)
3. Request travels through routers
4. Reaches destination server
5. Server sends data back
6. Data arrives in packets
7. Browser assembles webpage

**Protocols:**
• TCP/IP: Foundation
• HTTP/HTTPS: Web pages
• DNS: Domain names to IPs
• SSL/TLS: Encryption`
  },
];

// Add final knowledge sections
ALL_KNOWLEDGE.push(
  ...FAMOUS_PEOPLE,
  ...SPACE_KNOWLEDGE,
  ...MUSIC_KNOWLEDGE,
  ...TECH_COMPANIES,
  ...COMMON_QUESTIONS
);

// Export total count for reference
export const KNOWLEDGE_COUNT = ALL_KNOWLEDGE.length;

// =============================================================================
// WORLD FACTS AND TRIVIA
// =============================================================================

export const WORLD_FACTS: KnowledgeEntry[] = [
  {
    topic: 'Interesting World Facts',
    category: 'trivia',
    keywords: ['fact', 'trivia', 'interesting', 'amazing', 'world record'],
    content: `Fascinating facts about our world.

**Geography Facts:**
• Russia spans 11 time zones
• Canada has more lakes than rest of world combined
• Australia is wider than the Moon
• Africa is bigger than USA, China, India, and Europe combined
• Vatican City is smallest country (0.44 km²)

**Human Body Facts:**
• Humans share 60% DNA with bananas
• Your brain uses 20% of your oxygen
• Stomach acid can dissolve metal
• You're taller in the morning
• Fingerprints are unique (even identical twins)

**Animal Facts:**
• Octopuses have 3 hearts, blue blood
• Elephants can't jump
• Honey never spoils
• Cows have best friends
• Flamingos are born white

**Historical Facts:**
• Cleopatra lived closer to Moon landing than pyramids
• Oxford University is older than Aztec Empire
• Woolly mammoths existed when pyramids were built
• Nintendo was founded in 1889

**Space Facts:**
• One day on Venus is longer than its year
• Neutron stars spin 600 times per second
• Space is completely silent
• There are more stars than grains of sand on Earth`
  },
  {
    topic: 'Units and Measurements',
    category: 'reference',
    keywords: ['unit', 'measurement', 'convert', 'metric', 'imperial', 'celsius', 'fahrenheit'],
    content: `Common units and conversions for everyday use.

**Length:**
• 1 inch = 2.54 cm
• 1 foot = 30.48 cm = 12 inches
• 1 yard = 0.914 m = 3 feet
• 1 mile = 1.609 km = 5,280 feet
• 1 meter = 100 cm = 3.28 feet

**Weight/Mass:**
• 1 ounce = 28.35 grams
• 1 pound = 453.6 grams = 16 ounces
• 1 kilogram = 2.205 pounds
• 1 ton (US) = 907 kg = 2,000 pounds
• 1 tonne (metric) = 1,000 kg

**Volume:**
• 1 cup = 236.6 mL
• 1 pint = 473 mL = 2 cups
• 1 quart = 946 mL = 2 pints
• 1 gallon = 3.785 L = 4 quarts
• 1 liter = 1,000 mL

**Temperature:**
• °F to °C: (°F - 32) × 5/9
• °C to °F: (°C × 9/5) + 32
• Water freezes: 0°C / 32°F
• Water boils: 100°C / 212°F
• Body temp: 37°C / 98.6°F

**Time:**
• 1 minute = 60 seconds
• 1 hour = 60 minutes = 3,600 seconds
• 1 day = 24 hours = 86,400 seconds
• 1 year = 365.25 days`
  },
  {
    topic: 'Holidays and Celebrations',
    category: 'culture',
    keywords: ['holiday', 'celebration', 'christmas', 'thanksgiving', 'easter', 'new year'],
    content: `Major holidays celebrated around the world.

**US Holidays:**
• New Year's Day (Jan 1)
• Martin Luther King Jr. Day (3rd Mon Jan)
• Presidents' Day (3rd Mon Feb)
• Memorial Day (Last Mon May)
• Independence Day (July 4)
• Labor Day (1st Mon Sept)
• Thanksgiving (4th Thu Nov)
• Christmas (Dec 25)

**Religious Holidays:**
• **Christmas:** Christian celebration of Jesus' birth
• **Easter:** Resurrection of Jesus
• **Hanukkah:** Jewish Festival of Lights
• **Ramadan:** Islamic month of fasting
• **Eid al-Fitr:** End of Ramadan
• **Diwali:** Hindu Festival of Lights
• **Passover:** Jewish liberation from Egypt

**International Celebrations:**
• Chinese New Year (Jan/Feb, lunar calendar)
• Carnival (before Lent, especially Brazil)
• Oktoberfest (Germany, Sept-Oct)
• Day of the Dead (Mexico, Nov 1-2)
• St. Patrick's Day (March 17)

**Secular Observances:**
• Valentine's Day (Feb 14)
• Earth Day (April 22)
• Mother's Day (2nd Sun May)
• Father's Day (3rd Sun June)
• Halloween (Oct 31)`
  },
];

// =============================================================================
// PRACTICAL LIFE KNOWLEDGE
// =============================================================================

export const PRACTICAL_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Home Maintenance',
    category: 'practical',
    keywords: ['home', 'repair', 'fix', 'maintenance', 'house', 'plumbing', 'electrical'],
    content: `Basic home maintenance knowledge for homeowners.

**Plumbing Basics:**
• Know where main water shutoff is
• Unclog drains: Plunger, snake, or baking soda + vinegar
• Leaky faucet: Usually needs new washer
• Running toilet: Check flapper valve
• Prevent frozen pipes: Insulate, drip faucets

**Electrical Safety:**
• Never work on live circuits
• Know your circuit breaker panel
• GFCI outlets near water
• Don't overload outlets
• Replace frayed cords immediately

**HVAC Maintenance:**
• Change air filters every 1-3 months
• Clean vents and registers
• Schedule annual professional service
• Check thermostat batteries
• Clear debris around outdoor unit

**Seasonal Tasks:**
• **Spring:** Clean gutters, check roof, service AC
• **Summer:** Water lawn, check windows/doors
• **Fall:** Clean gutters, winterize pipes, check heating
• **Winter:** Check insulation, prevent ice dams

**Tools Every Home Needs:**
• Hammer, screwdrivers (flat and Phillips)
• Pliers, adjustable wrench
• Tape measure, level
• Drill, utility knife
• Flashlight, duct tape`
  },
  {
    topic: 'Car Basics',
    category: 'practical',
    keywords: ['car', 'vehicle', 'driving', 'maintenance', 'oil', 'tire', 'engine'],
    content: `Essential car knowledge for vehicle owners.

**Regular Maintenance:**
• Oil change: Every 3,000-7,500 miles
• Tire rotation: Every 5,000-7,500 miles
• Air filter: Every 15,000-30,000 miles
• Brake inspection: Every 12,000 miles
• Coolant flush: Every 30,000 miles

**Tire Care:**
• Check pressure monthly (see door sticker)
• Tread depth: Penny test (Lincoln's head visible = replace)
• Rotate tires regularly
• Alignment if pulling to one side
• Spare tire: Know how to change it

**Dashboard Warning Lights:**
• Check engine: Get diagnosed soon
• Oil pressure: Stop immediately, check oil
• Temperature: Engine overheating, stop
• Battery: Charging system issue
• Brake: Check brake fluid, pads

**Fuel Efficiency Tips:**
• Maintain steady speed
• Avoid rapid acceleration
• Keep tires properly inflated
• Remove excess weight
• Use cruise control on highways

**Emergency Kit:**
• Jumper cables
• Flashlight
• First aid kit
• Blanket
• Basic tools
• Phone charger`
  },
  {
    topic: 'Money and Banking',
    category: 'practical',
    keywords: ['bank', 'account', 'check', 'atm', 'credit card', 'debit'],
    content: `Understanding banking and financial basics.

**Account Types:**
• **Checking:** Daily transactions, debit card
• **Savings:** Earn interest, limited withdrawals
• **Money Market:** Higher interest, minimum balance
• **CD:** Fixed term, higher rates

**Credit vs Debit:**
• **Debit:** Directly from checking account
• **Credit:** Borrowed money, pay later
• Credit builds credit score
• Debit has no interest charges

**Credit Score Factors:**
• Payment history (35%)
• Credit utilization (30%)
• Length of history (15%)
• Credit mix (10%)
• New credit (10%)

**Banking Tips:**
• Set up direct deposit
• Use autopay for bills
• Monitor accounts regularly
• Avoid overdraft fees
• Compare bank fees

**Fraud Protection:**
• Never share PIN
• Monitor statements
• Use secure websites (https)
• Report lost cards immediately
• Freeze credit if needed

**Interest Rates:**
• APR: Annual Percentage Rate
• APY: Annual Percentage Yield (includes compounding)
• Higher APY = better for savings
• Lower APR = better for loans`
  },
  {
    topic: 'Cooking Measurements',
    category: 'practical',
    keywords: ['cooking', 'measurement', 'tablespoon', 'teaspoon', 'cup', 'recipe'],
    content: `Essential cooking measurements and conversions.

**Volume Equivalents:**
• 3 teaspoons = 1 tablespoon
• 2 tablespoons = 1 fluid ounce
• 4 tablespoons = 1/4 cup
• 8 tablespoons = 1/2 cup
• 16 tablespoons = 1 cup
• 2 cups = 1 pint
• 4 cups = 1 quart
• 4 quarts = 1 gallon

**Common Abbreviations:**
• tsp or t = teaspoon
• tbsp or T = tablespoon
• c = cup
• oz = ounce
• lb = pound
• pt = pint
• qt = quart

**Weight Conversions:**
• 1 stick butter = 1/2 cup = 8 tbsp
• 1 cup flour ≈ 125 grams
• 1 cup sugar ≈ 200 grams
• 1 cup rice ≈ 185 grams

**Temperature Guide:**
• Low heat: 200-250°F
• Medium: 300-375°F
• High: 400-450°F
• Broil: 500°F+

**Substitutions:**
• 1 cup buttermilk = 1 cup milk + 1 tbsp vinegar
• 1 egg = 1/4 cup applesauce (baking)
• 1 cup self-rising flour = 1 cup flour + 1.5 tsp baking powder + 1/4 tsp salt`
  },
];

// =============================================================================
// SCIENCE DEEP DIVES
// =============================================================================

export const SCIENCE_DEEP: KnowledgeEntry[] = [
  {
    topic: 'The Water Cycle',
    category: 'science',
    keywords: ['water cycle', 'evaporation', 'precipitation', 'condensation', 'rain'],
    content: `The water cycle describes how water moves through Earth's systems.

**Main Stages:**

**1. Evaporation:**
• Sun heats water in oceans, lakes, rivers
• Water turns from liquid to vapor
• Rises into atmosphere
• Also: Transpiration from plants

**2. Condensation:**
• Water vapor cools in atmosphere
• Forms tiny droplets
• Creates clouds and fog
• Requires condensation nuclei (dust, etc.)

**3. Precipitation:**
• Water droplets combine, grow heavy
• Fall as rain, snow, sleet, or hail
• Type depends on temperature
• Returns water to Earth's surface

**4. Collection:**
• Water collects in oceans, lakes, rivers
• Groundwater seeps into aquifers
• Glaciers store frozen water
• Cycle begins again

**Key Facts:**
• 97% of Earth's water is in oceans
• Only 3% is freshwater
• Most freshwater is in ice caps
• Water cycle purifies water naturally
• Cycle takes days to thousands of years

**Human Impact:**
• Pollution affects water quality
• Climate change alters patterns
• Deforestation reduces transpiration
• Urbanization increases runoff`
  },
  {
    topic: 'Plate Tectonics',
    category: 'science',
    keywords: ['plate tectonics', 'earthquake', 'volcano', 'continent', 'fault'],
    content: `Plate tectonics explains how Earth's surface moves and changes.

**Earth's Structure:**
• Crust (outer layer, 5-70 km thick)
• Mantle (hot rock, 2,900 km thick)
• Outer core (liquid iron)
• Inner core (solid iron)

**Tectonic Plates:**
• Earth's crust divided into ~15 major plates
• Float on semi-liquid mantle
• Move 1-10 cm per year
• Carry continents and ocean floor

**Plate Boundaries:**

**Divergent (pulling apart):**
• New crust forms
• Mid-ocean ridges
• Example: Mid-Atlantic Ridge

**Convergent (pushing together):**
• Subduction or mountain building
• Trenches, volcanoes
• Example: Himalayas, Andes

**Transform (sliding past):**
• Earthquakes common
• No crust created or destroyed
• Example: San Andreas Fault

**Results:**
• Earthquakes at plate boundaries
• Volcanoes at subduction zones
• Mountain ranges form
• Continents drift over time

**Evidence:**
• Fossil distribution
• Matching coastlines
• Rock formations
• GPS measurements today`
  },
  {
    topic: 'Electricity and Circuits',
    category: 'science',
    keywords: ['electricity', 'circuit', 'voltage', 'current', 'resistance', 'power'],
    content: `Electricity is the flow of electric charge through conductors.

**Basic Concepts:**
• **Voltage (V):** Electrical pressure (volts)
• **Current (I):** Flow rate of charge (amperes)
• **Resistance (R):** Opposition to flow (ohms)
• **Power (P):** Energy used (watts)

**Ohm's Law:**
• V = I × R
• Voltage = Current × Resistance
• Fundamental relationship

**Power Equation:**
• P = V × I
• Power = Voltage × Current
• Watts = Volts × Amps

**Circuit Types:**

**Series Circuit:**
• Components in a line
• Same current through all
• Voltages add up
• One break stops all

**Parallel Circuit:**
• Components on separate paths
• Same voltage across all
• Currents add up
• One break doesn't stop others

**Conductors vs Insulators:**
• Conductors: Allow flow (copper, aluminum)
• Insulators: Block flow (rubber, plastic)
• Semiconductors: In between (silicon)

**Safety:**
• Never touch live wires
• Water conducts electricity
• Grounding prevents shocks
• Circuit breakers protect from overload`
  },
  {
    topic: 'Light and Optics',
    category: 'science',
    keywords: ['light', 'optics', 'reflection', 'refraction', 'lens', 'mirror', 'color'],
    content: `Light is electromagnetic radiation visible to the human eye.

**Nature of Light:**
• Both wave and particle (photon)
• Speed: 299,792 km/s in vacuum
• Travels in straight lines
• Can be reflected, refracted, absorbed

**Electromagnetic Spectrum:**
• Radio waves (longest)
• Microwaves
• Infrared
• **Visible light** (400-700 nm)
• Ultraviolet
• X-rays
• Gamma rays (shortest)

**Visible Light Colors:**
• Red, Orange, Yellow, Green, Blue, Indigo, Violet
• ROY G BIV (memory aid)
• Red = longest wavelength
• Violet = shortest wavelength

**Reflection:**
• Light bounces off surfaces
• Angle of incidence = angle of reflection
• Mirrors use reflection
• Smooth surfaces = clear reflection

**Refraction:**
• Light bends when entering new medium
• Causes rainbows, lens effects
• Why straws look bent in water

**Lenses:**
• **Convex:** Converges light (magnifying glass)
• **Concave:** Diverges light
• Used in glasses, cameras, telescopes

**Color:**
• Objects absorb some wavelengths
• Reflect others (we see those)
• White = all colors reflected
• Black = all colors absorbed`
  },
];

// =============================================================================
// LANGUAGE LEARNING
// =============================================================================

export const LANGUAGE_LEARNING: KnowledgeEntry[] = [
  {
    topic: 'Spanish Basics',
    category: 'language',
    keywords: ['spanish', 'español', 'hola', 'gracias', 'spanish words'],
    content: `Basic Spanish phrases and vocabulary.

**Greetings:**
• Hola - Hello
• Buenos días - Good morning
• Buenas tardes - Good afternoon
• Buenas noches - Good night
• Adiós - Goodbye

**Common Phrases:**
• Por favor - Please
• Gracias - Thank you
• De nada - You're welcome
• Lo siento - I'm sorry
• Perdón - Excuse me

**Questions:**
• ¿Cómo estás? - How are you?
• ¿Cómo te llamas? - What's your name?
• ¿Dónde está...? - Where is...?
• ¿Cuánto cuesta? - How much does it cost?
• ¿Qué hora es? - What time is it?

**Numbers 1-10:**
• Uno, dos, tres, cuatro, cinco
• Seis, siete, ocho, nueve, diez

**Days of the Week:**
• Lunes, martes, miércoles, jueves
• Viernes, sábado, domingo

**Useful Words:**
• Sí - Yes
• No - No
• Agua - Water
• Comida - Food
• Baño - Bathroom`
  },
  {
    topic: 'French Basics',
    category: 'language',
    keywords: ['french', 'français', 'bonjour', 'merci', 'french words'],
    content: `Basic French phrases and vocabulary.

**Greetings:**
• Bonjour - Hello/Good day
• Bonsoir - Good evening
• Bonne nuit - Good night
• Au revoir - Goodbye
• Salut - Hi/Bye (informal)

**Common Phrases:**
• S'il vous plaît - Please
• Merci - Thank you
• De rien - You're welcome
• Excusez-moi - Excuse me
• Je suis désolé(e) - I'm sorry

**Questions:**
• Comment allez-vous? - How are you?
• Comment vous appelez-vous? - What's your name?
• Où est...? - Where is...?
• Combien ça coûte? - How much does it cost?
• Quelle heure est-il? - What time is it?

**Numbers 1-10:**
• Un, deux, trois, quatre, cinq
• Six, sept, huit, neuf, dix

**Days of the Week:**
• Lundi, mardi, mercredi, jeudi
• Vendredi, samedi, dimanche

**Useful Words:**
• Oui - Yes
• Non - No
• Eau - Water
• Nourriture - Food
• Toilettes - Bathroom`
  },
  {
    topic: 'Japanese Basics',
    category: 'language',
    keywords: ['japanese', '日本語', 'konnichiwa', 'arigatou', 'japanese words'],
    content: `Basic Japanese phrases and vocabulary.

**Greetings:**
• こんにちは (Konnichiwa) - Hello
• おはようございます (Ohayou gozaimasu) - Good morning
• こんばんは (Konbanwa) - Good evening
• さようなら (Sayounara) - Goodbye
• じゃね (Ja ne) - Bye (casual)

**Common Phrases:**
• ありがとうございます (Arigatou gozaimasu) - Thank you
• どういたしまして (Dou itashimashite) - You're welcome
• すみません (Sumimasen) - Excuse me/Sorry
• お願いします (Onegaishimasu) - Please

**Questions:**
• お元気ですか (O-genki desu ka) - How are you?
• お名前は (O-namae wa) - What's your name?
• いくらですか (Ikura desu ka) - How much?
• どこですか (Doko desu ka) - Where is it?

**Numbers 1-10:**
• 一 (ichi), 二 (ni), 三 (san), 四 (shi/yon), 五 (go)
• 六 (roku), 七 (shichi/nana), 八 (hachi), 九 (kyuu/ku), 十 (juu)

**Writing Systems:**
• Hiragana - Native Japanese sounds
• Katakana - Foreign words
• Kanji - Chinese characters

**Useful Words:**
• はい (Hai) - Yes
• いいえ (Iie) - No
• 水 (Mizu) - Water
• 食べ物 (Tabemono) - Food`
  },
];

// =============================================================================
// CURRENT EVENTS CONTEXT
// =============================================================================

export const CURRENT_CONTEXT: KnowledgeEntry[] = [
  {
    topic: 'Climate Change Overview',
    category: 'current_events',
    keywords: ['climate change', 'global warming', 'carbon', 'emissions', 'paris agreement'],
    content: `Climate change is one of the most pressing global challenges.

**The Science:**
• Earth's average temperature rising
• Caused primarily by greenhouse gases
• CO₂ levels highest in 800,000 years
• Human activities main driver since 1850s

**Greenhouse Effect:**
• Sun's energy enters atmosphere
• Earth absorbs and re-emits as heat
• Greenhouse gases trap heat
• Natural process, but enhanced by humans

**Main Greenhouse Gases:**
• Carbon dioxide (CO₂) - Fossil fuels
• Methane (CH₄) - Agriculture, landfills
• Nitrous oxide (N₂O) - Fertilizers
• Fluorinated gases - Industrial

**Observed Effects:**
• Global temperature up ~1.1°C since 1900
• Sea levels rising
• Ice sheets melting
• More extreme weather events
• Ocean acidification

**Projected Impacts:**
• More frequent heat waves
• Changing precipitation patterns
• Species extinction
• Food and water insecurity
• Climate refugees

**Solutions:**
• Reduce fossil fuel use
• Renewable energy transition
• Energy efficiency
• Reforestation
• Carbon capture technology
• International cooperation (Paris Agreement)`
  },
  {
    topic: 'Artificial Intelligence Today',
    category: 'technology',
    keywords: ['ai today', 'chatgpt', 'generative ai', 'llm', 'machine learning current'],
    content: `AI has rapidly advanced and entered mainstream use.

**Current AI Capabilities:**
• Natural language processing
• Image generation and recognition
• Code writing and debugging
• Translation
• Recommendation systems
• Autonomous vehicles (developing)

**Large Language Models (LLMs):**
• Trained on vast text data
• Generate human-like text
• Examples: GPT-4, Claude, Gemini, LLaMA
• Power chatbots and assistants

**Generative AI:**
• Creates new content
• Text: ChatGPT, Claude
• Images: DALL-E, Midjourney, Stable Diffusion
• Audio: Music generation, voice synthesis
• Video: Emerging capabilities

**AI Applications:**
• Customer service chatbots
• Medical diagnosis assistance
• Legal document review
• Creative writing assistance
• Code completion (GitHub Copilot)
• Scientific research

**Concerns and Challenges:**
• Job displacement
• Misinformation potential
• Bias in training data
• Privacy issues
• Regulation needs
• AI safety and alignment

**The Future:**
• More capable systems
• Multimodal AI (text, image, audio)
• AI agents that take actions
• Ongoing ethical debates
• Potential for AGI (debated timeline)`
  },
];

// Add all remaining knowledge
ALL_KNOWLEDGE.push(
  ...WORLD_FACTS,
  ...PRACTICAL_KNOWLEDGE,
  ...SCIENCE_DEEP,
  ...LANGUAGE_LEARNING,
  ...CURRENT_CONTEXT
);

// =============================================================================
// ADDITIONAL PROGRAMMING LANGUAGES
// =============================================================================

export const MORE_PROGRAMMING: KnowledgeEntry[] = [
  {
    topic: 'C and C++',
    category: 'programming',
    keywords: ['c', 'c++', 'cpp', 'pointer', 'memory', 'compile', 'low level'],
    content: `C and C++ are foundational systems programming languages.

**C Language:**
• Created by Dennis Ritchie (1972)
• Low-level, close to hardware
• Used for: Operating systems, embedded systems
• Manual memory management
• Foundation for many other languages

**C Basics:**
\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

**C++ Language:**
• Created by Bjarne Stroustrup (1983)
• C with object-oriented features
• Used for: Games, browsers, databases
• STL (Standard Template Library)

**Key Concepts:**
• **Pointers:** Variables storing memory addresses
• **Memory allocation:** malloc/free (C), new/delete (C++)
• **Compilation:** Source → Object → Executable
• **Header files:** Declarations (.h)

**Data Types:**
• int, float, double, char
• Arrays, structs, unions
• Pointers

**C++ Features:**
• Classes and objects
• Inheritance, polymorphism
• Templates (generics)
• Exception handling
• Namespaces

**Memory Management:**
• Stack: Automatic, fast
• Heap: Manual, flexible
• Memory leaks if not freed
• Smart pointers in modern C++`
  },
  {
    topic: 'Java Programming',
    category: 'programming',
    keywords: ['java', 'jvm', 'spring', 'android', 'enterprise'],
    content: `Java is a widely-used object-oriented programming language.

**Overview:**
• Created by Sun Microsystems (1995)
• "Write once, run anywhere"
• Runs on JVM (Java Virtual Machine)
• Used for: Enterprise, Android, web

**Hello World:**
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

**Key Features:**
• Object-oriented
• Strongly typed
• Automatic garbage collection
• Platform independent (bytecode)
• Rich standard library

**Core Concepts:**
• Classes and objects
• Inheritance (extends)
• Interfaces (implements)
• Packages for organization
• Exception handling (try/catch)

**Data Types:**
• Primitives: int, double, boolean, char
• Objects: String, arrays, collections
• Wrapper classes: Integer, Double

**Popular Frameworks:**
• **Spring:** Enterprise applications
• **Android SDK:** Mobile apps
• **Hibernate:** Database ORM
• **Maven/Gradle:** Build tools

**Java Ecosystem:**
• JDK: Development kit
• JRE: Runtime environment
• JVM: Virtual machine
• Strong enterprise adoption`
  },
  {
    topic: 'Go Programming',
    category: 'programming',
    keywords: ['go', 'golang', 'goroutine', 'concurrency', 'google'],
    content: `Go (Golang) is a modern systems programming language by Google.

**Overview:**
• Created by Google (2009)
• Simple, efficient, concurrent
• Used for: Cloud, microservices, CLI tools
• Fast compilation

**Hello World:**
\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

**Key Features:**
• Simple syntax
• Fast compilation
• Built-in concurrency (goroutines)
• Garbage collected
• Static typing with inference

**Goroutines:**
• Lightweight threads
• Easy concurrency
• Channels for communication
• go keyword to start

**Data Types:**
• Basic: int, float64, string, bool
• Composite: arrays, slices, maps, structs
• Pointers (but no pointer arithmetic)

**Unique Features:**
• No classes (structs + methods)
• Interfaces (implicit)
• Multiple return values
• defer keyword
• Error handling via return values

**Popular Uses:**
• Docker, Kubernetes
• Cloud infrastructure
• Web servers
• CLI tools
• Microservices

**Tools:**
• go build, go run, go test
• go mod (dependency management)
• gofmt (code formatting)`
  },
  {
    topic: 'Rust Programming',
    category: 'programming',
    keywords: ['rust', 'memory safety', 'ownership', 'systems programming'],
    content: `Rust is a systems language focused on safety and performance.

**Overview:**
• Created by Mozilla (2010)
• Memory safe without garbage collection
• Used for: Systems, WebAssembly, CLI
• "Most loved language" (Stack Overflow)

**Hello World:**
\`\`\`rust
fn main() {
    println!("Hello, World!");
}
\`\`\`

**Key Features:**
• Memory safety guarantees
• No null or dangling pointers
• Zero-cost abstractions
• Fearless concurrency
• Pattern matching

**Ownership System:**
• Each value has one owner
• Value dropped when owner goes out of scope
• Borrowing: References without ownership
• Prevents data races at compile time

**Data Types:**
• Scalar: i32, f64, bool, char
• Compound: tuples, arrays
• Structs, enums
• Option<T>, Result<T, E>

**Error Handling:**
• Result<T, E> for recoverable errors
• panic! for unrecoverable
• ? operator for propagation
• No exceptions

**Popular Uses:**
• Firefox browser components
• Cloudflare Workers
• Discord
• Command-line tools
• WebAssembly

**Cargo:**
• Package manager and build tool
• cargo new, cargo build, cargo run
• crates.io for packages`
  },
  {
    topic: 'Swift Programming',
    category: 'programming',
    keywords: ['swift', 'ios', 'apple', 'xcode', 'iphone app'],
    content: `Swift is Apple's modern programming language for iOS/macOS.

**Overview:**
• Created by Apple (2014)
• Replaced Objective-C
• Used for: iOS, macOS, watchOS, tvOS
• Open source

**Hello World:**
\`\`\`swift
print("Hello, World!")
\`\`\`

**Key Features:**
• Type safety
• Optionals (nil safety)
• Closures
• Protocol-oriented programming
• Memory management (ARC)

**Optionals:**
• Handles absence of value
• var name: String? (optional)
• Unwrapping: if let, guard let
• Force unwrap: ! (dangerous)

**Data Types:**
• Int, Double, String, Bool
• Arrays, Dictionaries, Sets
• Structs, Classes, Enums
• Tuples

**SwiftUI:**
• Declarative UI framework
• Cross-platform Apple
• Live previews
• Modern replacement for UIKit

**iOS Development:**
• Xcode IDE
• Interface Builder or SwiftUI
• App Store distribution
• TestFlight for beta testing

**Key Concepts:**
• Protocols (like interfaces)
• Extensions
• Generics
• Error handling (do/try/catch)
• Property observers`
  },
  {
    topic: 'Kotlin Programming',
    category: 'programming',
    keywords: ['kotlin', 'android', 'jetbrains', 'jvm', 'mobile'],
    content: `Kotlin is a modern JVM language, official for Android development.

**Overview:**
• Created by JetBrains (2011)
• Official Android language (2017)
• Runs on JVM, compiles to JavaScript
• Interoperable with Java

**Hello World:**
\`\`\`kotlin
fun main() {
    println("Hello, World!")
}
\`\`\`

**Key Features:**
• Null safety built-in
• Concise syntax
• Data classes
• Coroutines for async
• Extension functions

**Null Safety:**
• Types non-null by default
• Nullable: String?
• Safe call: ?.
• Elvis operator: ?:
• Not-null assertion: !!

**Data Classes:**
\`\`\`kotlin
data class User(val name: String, val age: Int)
\`\`\`
• Auto-generates equals, hashCode, toString

**Coroutines:**
• Lightweight concurrency
• suspend functions
• Structured concurrency
• Better than callbacks

**Android Development:**
• Jetpack Compose (modern UI)
• Android Studio IDE
• Gradle build system
• Material Design

**Kotlin Features:**
• when expression (better switch)
• String templates
• Smart casts
• Sealed classes
• Companion objects`
  },
];

// =============================================================================
// MORE HISTORY
// =============================================================================

export const MORE_HISTORY: KnowledgeEntry[] = [
  {
    topic: 'Ancient China',
    category: 'history',
    keywords: ['china', 'chinese', 'dynasty', 'emperor', 'great wall', 'silk road'],
    content: `Ancient China developed one of the world's oldest continuous civilizations.

**Major Dynasties:**
• **Shang** (1600-1046 BC): Bronze age, writing
• **Zhou** (1046-256 BC): Longest dynasty, philosophy
• **Qin** (221-206 BC): First emperor, Great Wall
• **Han** (206 BC-220 AD): Silk Road, paper
• **Tang** (618-907): Golden age, poetry
• **Song** (960-1279): Technology, printing
• **Ming** (1368-1644): Forbidden City
• **Qing** (1644-1912): Last dynasty

**Great Inventions:**
• Paper (105 AD)
• Printing (woodblock, movable type)
• Gunpowder
• Compass
• Silk production

**The Great Wall:**
• Built over centuries
• Multiple dynasties contributed
• ~13,000 miles total
• Defense against northern invasions

**Silk Road:**
• Trade routes to West
• Silk, spices, ideas exchanged
• Connected China to Rome
• Buddhism spread to China

**Philosophy:**
• Confucianism (ethics, society)
• Taoism (nature, harmony)
• Legalism (strict laws)

**Cultural Achievements:**
• Terracotta Army
• Chinese calligraphy
• Porcelain ("china")
• Traditional medicine
• Martial arts`
  },
  {
    topic: 'French Revolution',
    category: 'history',
    keywords: ['french revolution', 'france', 'bastille', 'napoleon', 'guillotine'],
    content: `The French Revolution (1789-1799) transformed France and influenced the world.

**Causes:**
• Financial crisis (debt from wars)
• Social inequality (Three Estates)
• Enlightenment ideas
• Food shortages
• Weak leadership (Louis XVI)

**Key Events:**

**1789:**
• Estates-General convened
• National Assembly formed
• Storming of the Bastille (July 14)
• Declaration of Rights of Man

**1791-1792:**
• Constitutional monarchy
• War with Austria and Prussia
• Monarchy abolished

**1793-1794 (Reign of Terror):**
• Louis XVI executed
• Committee of Public Safety
• Robespierre's leadership
• ~17,000 guillotined
• Robespierre executed (1794)

**1795-1799:**
• Directory government
• Napoleon rises
• Coup of 18 Brumaire (1799)

**Key Figures:**
• Louis XVI and Marie Antoinette
• Robespierre
• Danton
• Napoleon Bonaparte

**Legacy:**
• End of absolute monarchy
• Spread of democratic ideals
• Nationalism
• Metric system
• Napoleonic Code
• Inspired revolutions worldwide`
  },
  {
    topic: 'The Space Race',
    category: 'history',
    keywords: ['space race', 'apollo', 'sputnik', 'nasa', 'moon', 'cold war space'],
    content: `The Space Race was a Cold War competition between USA and USSR.

**Timeline:**

**Soviet Firsts:**
• 1957: Sputnik 1 (first satellite)
• 1957: Laika (first animal in orbit)
• 1961: Yuri Gagarin (first human in space)
• 1963: Valentina Tereshkova (first woman)
• 1965: First spacewalk (Leonov)

**American Response:**
• 1958: NASA founded
• 1961: Alan Shepard (first American in space)
• 1962: John Glenn (first American to orbit)
• 1965: First American spacewalk (White)

**Apollo Program:**
• Goal: Land man on Moon by end of 1960s
• Apollo 1: Fire killed 3 astronauts (1967)
• Apollo 8: First to orbit Moon (1968)
• Apollo 11: Moon landing (July 20, 1969)
• Apollo 13: "Houston, we have a problem"
• Apollo 17: Last Moon mission (1972)

**Moon Landing (Apollo 11):**
• Neil Armstrong, Buzz Aldrin, Michael Collins
• "That's one small step for man..."
• 2.5 hours on lunar surface
• Planted American flag
• Returned safely

**Legacy:**
• Technological advances
• Satellite communications
• Weather forecasting
• GPS technology
• International Space Station
• Inspiration for generations`
  },
  {
    topic: 'The Reformation',
    category: 'history',
    keywords: ['reformation', 'protestant', 'luther', 'catholic', 'church', 'religion history'],
    content: `The Protestant Reformation (1517-1648) transformed Christianity and Europe.

**Background:**
• Catholic Church dominant in Europe
• Corruption concerns (indulgences)
• Renaissance humanism
• Printing press enabled spread of ideas

**Martin Luther:**
• German monk and professor
• 95 Theses (1517)
• Criticized indulgences
• Salvation by faith alone
• Bible as sole authority
• Excommunicated (1521)

**Key Reformers:**
• **John Calvin:** Predestination, Geneva
• **Huldrych Zwingli:** Swiss Reformation
• **Henry VIII:** Church of England
• **John Knox:** Scottish Presbyterianism

**Protestant Beliefs:**
• Sola scriptura (Scripture alone)
• Sola fide (Faith alone)
• Sola gratia (Grace alone)
• Priesthood of all believers
• Vernacular Bible

**Catholic Counter-Reformation:**
• Council of Trent (1545-1563)
• Jesuits founded
• Inquisition strengthened
• Art and architecture (Baroque)

**Consequences:**
• Religious wars (30 Years' War)
• Division of Western Christianity
• Rise of nation-states
• Education expansion
• Religious freedom (eventually)
• Shaped modern world`
  },
];

// =============================================================================
// ADDITIONAL SCIENCE TOPICS
// =============================================================================

export const MORE_SCIENCE: KnowledgeEntry[] = [
  {
    topic: 'Evolution',
    category: 'science',
    keywords: ['evolution', 'darwin', 'natural selection', 'species', 'adaptation'],
    content: `Evolution explains how life on Earth has changed over billions of years.

**Core Concepts:**
• Species change over time
• Common ancestry
• Natural selection drives change
• Genetic variation is raw material

**Natural Selection:**
• Variation exists in populations
• Some traits help survival/reproduction
• Those traits passed to offspring
• Population changes over generations
• "Survival of the fittest"

**Evidence for Evolution:**
• **Fossil record:** Transitional forms
• **Comparative anatomy:** Homologous structures
• **DNA:** Genetic similarities
• **Biogeography:** Species distribution
• **Direct observation:** Bacteria, insects

**Charles Darwin:**
• Voyage on HMS Beagle (1831-1836)
• Galápagos Islands observations
• "On the Origin of Species" (1859)
• Developed theory of natural selection

**Key Terms:**
• **Adaptation:** Trait suited to environment
• **Speciation:** New species formation
• **Mutation:** Random DNA changes
• **Gene flow:** Genes moving between populations
• **Genetic drift:** Random changes in small populations

**Human Evolution:**
• Shared ancestor with apes (~6 million years ago)
• Australopithecus, Homo erectus
• Homo sapiens (~300,000 years ago)
• Out of Africa migration

**Common Misconceptions:**
• Evolution is "just a theory" (theory = well-supported explanation)
• Humans evolved from modern apes (shared ancestor)
• Evolution is random (natural selection is not random)`
  },
  {
    topic: 'The Periodic Table',
    category: 'science',
    keywords: ['periodic table', 'elements', 'chemistry', 'atom', 'metal'],
    content: `The periodic table organizes all known chemical elements.

**Structure:**
• 118 confirmed elements
• Organized by atomic number
• Rows = Periods (electron shells)
• Columns = Groups (similar properties)

**Element Categories:**
• **Metals:** Conduct electricity, malleable
• **Nonmetals:** Poor conductors, brittle
• **Metalloids:** Properties of both
• **Noble gases:** Unreactive (Group 18)

**Important Groups:**
• **Alkali metals (Group 1):** Li, Na, K - very reactive
• **Alkaline earth (Group 2):** Mg, Ca - reactive
• **Halogens (Group 17):** F, Cl, Br - very reactive
• **Noble gases (Group 18):** He, Ne, Ar - stable

**Common Elements:**
• **Hydrogen (H):** Lightest, most abundant in universe
• **Carbon (C):** Basis of organic chemistry
• **Oxygen (O):** Essential for respiration
• **Iron (Fe):** In blood, construction
• **Gold (Au):** Precious metal, unreactive
• **Silicon (Si):** Semiconductors, sand

**Reading the Table:**
• Atomic number: Number of protons
• Atomic mass: Protons + neutrons
• Symbol: 1-2 letter abbreviation
• Electron configuration from position

**History:**
• Dmitri Mendeleev (1869)
• Organized by atomic mass
• Predicted undiscovered elements
• Modern table by atomic number`
  },
  {
    topic: 'Waves and Sound',
    category: 'science',
    keywords: ['wave', 'sound', 'frequency', 'wavelength', 'vibration', 'acoustic'],
    content: `Waves transfer energy through matter or space.

**Wave Properties:**
• **Wavelength:** Distance between peaks
• **Frequency:** Waves per second (Hz)
• **Amplitude:** Height of wave (loudness/brightness)
• **Speed:** Wavelength × Frequency

**Wave Types:**
• **Transverse:** Vibration perpendicular to direction (light)
• **Longitudinal:** Vibration parallel to direction (sound)
• **Mechanical:** Need medium (sound, water)
• **Electromagnetic:** No medium needed (light)

**Sound:**
• Longitudinal mechanical wave
• Needs medium (air, water, solid)
• Speed in air: ~343 m/s
• Cannot travel in vacuum

**Sound Properties:**
• **Pitch:** Frequency (high/low)
• **Volume:** Amplitude (loud/soft)
• **Timbre:** Quality (instrument character)

**Human Hearing:**
• Range: 20 Hz to 20,000 Hz
• Infrasound: Below 20 Hz
• Ultrasound: Above 20,000 Hz
• Loudness measured in decibels (dB)

**Sound Phenomena:**
• **Echo:** Reflection of sound
• **Doppler effect:** Pitch change with motion
• **Resonance:** Amplification at natural frequency
• **Interference:** Waves combining

**Applications:**
• Music and instruments
• Ultrasound imaging
• Sonar
• Noise cancellation`
  },
  {
    topic: 'Forces and Motion',
    category: 'science',
    keywords: ['force', 'motion', 'newton', 'gravity', 'friction', 'acceleration'],
    content: `Forces cause objects to accelerate, decelerate, or change direction.

**Newton's Laws of Motion:**

**First Law (Inertia):**
• Object at rest stays at rest
• Object in motion stays in motion
• Unless acted upon by force

**Second Law (F=ma):**
• Force = Mass × Acceleration
• More force = more acceleration
• More mass = less acceleration

**Third Law (Action-Reaction):**
• Every action has equal opposite reaction
• Forces come in pairs
• Act on different objects

**Types of Forces:**
• **Gravity:** Attraction between masses
• **Friction:** Opposes motion between surfaces
• **Normal force:** Surface pushing back
• **Tension:** Force through rope/string
• **Applied force:** Push or pull

**Gravity:**
• F = G(m₁m₂)/r²
• Earth's gravity: 9.8 m/s²
• Weight = mass × gravity
• Mass is constant, weight varies

**Friction:**
• Static: Prevents motion starting
• Kinetic: Opposes ongoing motion
• Depends on surfaces and normal force
• Can be helpful or harmful

**Motion Equations:**
• Velocity = Distance / Time
• Acceleration = Change in velocity / Time
• Distance = ½ × acceleration × time²

**Applications:**
• Vehicle design
• Sports physics
• Engineering
• Space travel`
  },
];

// Add final sections
ALL_KNOWLEDGE.push(
  ...MORE_PROGRAMMING,
  ...MORE_HISTORY,
  ...MORE_SCIENCE
);

// =============================================================================
// BUSINESS AND FINANCE EXTENDED
// =============================================================================

export const BUSINESS_EXTENDED: KnowledgeEntry[] = [
  {
    topic: 'Stock Market Basics',
    category: 'finance',
    keywords: ['stock', 'market', 'invest', 'share', 'trading', 'wall street', 'nasdaq'],
    content: `The stock market is where shares of public companies are traded.

**Key Concepts:**
• **Stock:** Ownership share in a company
• **Share price:** Current trading value
• **Market cap:** Total value of all shares
• **Dividend:** Profit paid to shareholders
• **Portfolio:** Collection of investments

**Major Exchanges:**
• **NYSE:** New York Stock Exchange (largest)
• **NASDAQ:** Tech-heavy exchange
• **LSE:** London Stock Exchange
• **TSE:** Tokyo Stock Exchange

**Stock Indices:**
• **Dow Jones:** 30 large US companies
• **S&P 500:** 500 large US companies
• **NASDAQ Composite:** All NASDAQ stocks
• **Russell 2000:** Small-cap stocks

**Types of Orders:**
• **Market order:** Buy/sell at current price
• **Limit order:** Buy/sell at specific price
• **Stop-loss:** Sell if price drops to level

**Investment Strategies:**
• **Buy and hold:** Long-term investing
• **Value investing:** Undervalued stocks
• **Growth investing:** High-growth companies
• **Index investing:** Track market indices
• **Dollar-cost averaging:** Regular investments

**Key Metrics:**
• P/E ratio (Price to Earnings)
• EPS (Earnings Per Share)
• Dividend yield
• Market capitalization

**Risks:**
• Market volatility
• Company-specific risk
• Economic downturns
• Never invest more than you can afford to lose`
  },
  {
    topic: 'Cryptocurrency',
    category: 'finance',
    keywords: ['crypto', 'bitcoin', 'ethereum', 'blockchain', 'cryptocurrency', 'wallet'],
    content: `Cryptocurrency is digital currency using cryptographic security.

**Key Concepts:**
• **Blockchain:** Distributed ledger technology
• **Decentralized:** No central authority
• **Mining:** Validating transactions
• **Wallet:** Stores crypto keys
• **Private key:** Access to your crypto

**Major Cryptocurrencies:**
• **Bitcoin (BTC):** First and largest
• **Ethereum (ETH):** Smart contracts platform
• **Tether (USDT):** Stablecoin (pegged to USD)
• **BNB:** Binance exchange token
• **Solana (SOL):** Fast transactions

**How Bitcoin Works:**
• Limited supply (21 million)
• Proof of Work consensus
• Halving every ~4 years
• Pseudonymous transactions

**Ethereum Features:**
• Smart contracts
• DeFi (Decentralized Finance)
• NFTs (Non-Fungible Tokens)
• Proof of Stake (since 2022)

**Wallets:**
• **Hot wallet:** Connected to internet
• **Cold wallet:** Offline storage
• **Hardware wallet:** Physical device
• **Exchange wallet:** On trading platform

**Risks:**
• Extreme volatility
• Regulatory uncertainty
• Security risks (hacks, scams)
• Loss of private keys = lost funds
• Not insured like bank deposits

**Use Cases:**
• Digital payments
• Store of value
• DeFi applications
• NFTs and digital ownership
• Cross-border transfers`
  },
  {
    topic: 'Taxes Basics',
    category: 'finance',
    keywords: ['tax', 'taxes', 'irs', 'income tax', 'deduction', 'refund'],
    content: `Understanding taxes is essential for financial planning.

**US Income Tax Basics:**
• Progressive tax system
• Higher income = higher rate
• Federal + state (most states)
• Due April 15 annually

**2024 Federal Tax Brackets (Single):**
• 10%: $0 - $11,600
• 12%: $11,601 - $47,150
• 22%: $47,151 - $100,525
• 24%: $100,526 - $191,950
• 32%: $191,951 - $243,725
• 35%: $243,726 - $609,350
• 37%: Over $609,350

**Key Terms:**
• **Gross income:** Total earnings
• **AGI:** Adjusted Gross Income
• **Taxable income:** After deductions
• **Tax credit:** Reduces tax owed
• **Tax deduction:** Reduces taxable income

**Common Deductions:**
• Standard deduction ($14,600 single, 2024)
• Mortgage interest
• State and local taxes (SALT)
• Charitable donations
• Medical expenses (above threshold)

**Tax-Advantaged Accounts:**
• **401(k):** Employer retirement plan
• **IRA:** Individual Retirement Account
• **HSA:** Health Savings Account
• **529:** Education savings

**Filing Status:**
• Single
• Married Filing Jointly
• Married Filing Separately
• Head of Household

**Tips:**
• Keep records and receipts
• File on time to avoid penalties
• Consider professional help for complex situations
• Contribute to retirement accounts`
  },
  {
    topic: 'Real Estate Basics',
    category: 'finance',
    keywords: ['real estate', 'house', 'mortgage', 'property', 'rent', 'buy home'],
    content: `Real estate involves buying, selling, and renting property.

**Buying a Home:**
• Down payment (typically 3-20%)
• Mortgage pre-approval
• Home inspection
• Closing costs (2-5% of price)
• Title insurance

**Mortgage Types:**
• **Fixed-rate:** Same rate entire term
• **Adjustable-rate (ARM):** Rate changes
• **FHA:** Lower down payment, government-backed
• **VA:** For veterans, no down payment
• **Conventional:** Standard bank loan

**Key Terms:**
• **Principal:** Loan amount
• **Interest:** Cost of borrowing
• **Escrow:** Held funds for taxes/insurance
• **Equity:** Ownership value (value - owed)
• **Amortization:** Loan payment schedule

**Costs of Homeownership:**
• Mortgage payment
• Property taxes
• Homeowner's insurance
• Maintenance (1-2% of value/year)
• HOA fees (if applicable)
• Utilities

**Renting vs Buying:**
• Renting: Flexibility, no maintenance
• Buying: Build equity, tax benefits
• Consider: Length of stay, market conditions
• Rule of thumb: Buy if staying 5+ years

**Real Estate Investing:**
• Rental properties
• REITs (Real Estate Investment Trusts)
• House flipping
• Commercial real estate

**Market Factors:**
• Location, location, location
• Interest rates
• Economic conditions
• Supply and demand`
  },
];

// =============================================================================
// PSYCHOLOGY AND SELF-IMPROVEMENT
// =============================================================================

export const PSYCHOLOGY_EXTENDED: KnowledgeEntry[] = [
  {
    topic: 'Habits and Behavior Change',
    category: 'psychology',
    keywords: ['habit', 'behavior', 'change', 'routine', 'willpower', 'motivation'],
    content: `Understanding habits helps create lasting positive change.

**Habit Loop (Charles Duhigg):**
1. **Cue:** Trigger for behavior
2. **Routine:** The behavior itself
3. **Reward:** Benefit received

**Atomic Habits (James Clear):**
• Make it obvious (cue)
• Make it attractive (craving)
• Make it easy (response)
• Make it satisfying (reward)

**Building Good Habits:**
• Start incredibly small
• Stack on existing habits
• Design your environment
• Track your progress
• Never miss twice

**Breaking Bad Habits:**
• Make it invisible (remove cues)
• Make it unattractive
• Make it difficult
• Make it unsatisfying

**The 21/66 Day Myth:**
• 21 days is a myth
• Average: 66 days to form habit
• Range: 18-254 days
• Complexity matters

**Willpower:**
• Limited resource (debated)
• Depletes with use
• Rest restores it
• Reduce decisions needed

**Motivation:**
• Intrinsic: Internal satisfaction
• Extrinsic: External rewards
• Intrinsic more sustainable
• Start with action, motivation follows

**Keystone Habits:**
• Trigger other positive changes
• Examples: Exercise, sleep, planning
• Create positive cascades`
  },
  {
    topic: 'Emotional Intelligence',
    category: 'psychology',
    keywords: ['emotional intelligence', 'eq', 'emotions', 'empathy', 'self awareness'],
    content: `Emotional intelligence (EQ) is the ability to understand and manage emotions.

**Five Components (Daniel Goleman):**

**1. Self-Awareness:**
• Recognize your emotions
• Understand triggers
• Know strengths/weaknesses
• Accurate self-assessment

**2. Self-Regulation:**
• Control impulses
• Manage emotions
• Adapt to change
• Think before acting

**3. Motivation:**
• Internal drive
• Optimism
• Commitment to goals
• Resilience

**4. Empathy:**
• Understand others' emotions
• See other perspectives
• Sense unspoken feelings
• Respond appropriately

**5. Social Skills:**
• Build relationships
• Communicate effectively
• Resolve conflicts
• Influence others positively

**Why EQ Matters:**
• Better relationships
• Career success
• Mental health
• Leadership effectiveness
• Decision making

**Developing EQ:**
• Practice mindfulness
• Journal about emotions
• Seek feedback
• Listen actively
• Pause before reacting

**EQ vs IQ:**
• IQ: Cognitive ability
• EQ: Emotional ability
• Both matter for success
• EQ can be developed more easily`
  },
  {
    topic: 'Stress Management',
    category: 'psychology',
    keywords: ['stress', 'anxiety', 'relax', 'calm', 'overwhelmed', 'burnout'],
    content: `Managing stress is essential for health and well-being.

**Understanding Stress:**
• Body's response to demands
• Fight-or-flight response
• Short-term can be helpful
• Chronic stress is harmful

**Signs of Stress:**
• Physical: Headaches, tension, fatigue
• Emotional: Irritability, anxiety, depression
• Cognitive: Poor concentration, worry
• Behavioral: Sleep changes, appetite changes

**Stress Management Techniques:**

**Physical:**
• Regular exercise
• Adequate sleep (7-9 hours)
• Healthy diet
• Limit caffeine and alcohol
• Deep breathing

**Mental:**
• Mindfulness meditation
• Cognitive reframing
• Problem-solving
• Time management
• Setting boundaries

**Social:**
• Talk to someone
• Maintain relationships
• Ask for help
• Join support groups

**Relaxation Techniques:**
• Deep breathing (4-7-8 technique)
• Progressive muscle relaxation
• Guided imagery
• Yoga and stretching
• Nature walks

**Preventing Burnout:**
• Take regular breaks
• Set realistic goals
• Learn to say no
• Separate work and personal life
• Practice self-care

**When to Seek Help:**
• Stress affects daily functioning
• Physical symptoms persist
• Feelings of hopelessness
• Substance use to cope`
  },
  {
    topic: 'Learning and Memory',
    category: 'psychology',
    keywords: ['learning', 'memory', 'study', 'remember', 'forget', 'brain'],
    content: `Understanding how we learn and remember improves retention.

**Types of Memory:**
• **Sensory:** Brief, <1 second
• **Short-term/Working:** 15-30 seconds
• **Long-term:** Permanent storage

**Long-term Memory Types:**
• **Explicit (Declarative):**
  - Episodic: Personal experiences
  - Semantic: Facts and concepts
• **Implicit (Procedural):**
  - Skills, habits

**How Memory Works:**
1. **Encoding:** Information enters brain
2. **Storage:** Information maintained
3. **Retrieval:** Information accessed

**Effective Learning Strategies:**

**Spaced Repetition:**
• Review at increasing intervals
• Better than cramming
• Apps: Anki, Quizlet

**Active Recall:**
• Test yourself
• Don't just re-read
• Practice retrieving information

**Elaboration:**
• Connect to existing knowledge
• Ask "why" and "how"
• Create examples

**Interleaving:**
• Mix different topics
• Better than blocking
• Improves discrimination

**The Forgetting Curve:**
• Memory decays over time
• Review prevents decay
• First 24 hours critical

**Sleep and Memory:**
• Sleep consolidates memories
• REM important for learning
• Naps can help retention

**Tips:**
• Teach others (best retention)
• Use multiple senses
• Take breaks (Pomodoro)
• Minimize distractions
• Stay physically active`
  },
];

// =============================================================================
// FOOD AND NUTRITION EXTENDED
// =============================================================================

export const FOOD_EXTENDED: KnowledgeEntry[] = [
  {
    topic: 'Healthy Eating Guidelines',
    category: 'health',
    keywords: ['healthy eating', 'diet', 'nutrition', 'balanced diet', 'food groups'],
    content: `Healthy eating provides nutrients for energy and well-being.

**Food Groups:**
• **Fruits:** 1.5-2 cups/day
• **Vegetables:** 2-3 cups/day
• **Grains:** 5-8 oz/day (half whole grains)
• **Protein:** 5-6.5 oz/day
• **Dairy:** 3 cups/day

**Healthy Plate Model:**
• 1/2 plate: Fruits and vegetables
• 1/4 plate: Whole grains
• 1/4 plate: Lean protein
• Side: Low-fat dairy

**Nutrients to Prioritize:**
• Fiber (25-30g/day)
• Calcium
• Potassium
• Vitamin D
• Omega-3 fatty acids

**Nutrients to Limit:**
• Added sugars (<10% of calories)
• Sodium (<2,300mg/day)
• Saturated fat (<10% of calories)
• Trans fat (avoid)

**Hydration:**
• Water is best
• 8 cups/day general guideline
• More if active or hot
• Limit sugary drinks

**Reading Food Labels:**
• Check serving size
• Look at calories
• Limit saturated fat, sodium, sugar
• Seek fiber, vitamins, minerals
• Ingredient list: First = most

**Healthy Eating Tips:**
• Cook at home more
• Plan meals ahead
• Eat mindfully
• Don't skip breakfast
• Control portions
• Limit processed foods`
  },
  {
    topic: 'Popular Diets Explained',
    category: 'health',
    keywords: ['diet', 'keto', 'vegan', 'paleo', 'mediterranean', 'intermittent fasting'],
    content: `Various diets have different approaches to eating.

**Mediterranean Diet:**
• Based on traditional Mediterranean eating
• Olive oil, fish, vegetables, whole grains
• Moderate wine (optional)
• Heart-healthy, well-researched
• Sustainable long-term

**Keto (Ketogenic):**
• Very low carb, high fat
• Body enters ketosis
• Rapid weight loss possible
• Can be hard to maintain
• May have side effects

**Paleo:**
• "Caveman" diet
• Meat, fish, vegetables, fruits, nuts
• No grains, dairy, processed foods
• Eliminates many food groups

**Vegan:**
• No animal products
• Ethical, environmental, health reasons
• Need to plan for B12, iron, protein
• Can be very healthy if balanced

**Vegetarian:**
• No meat, may include dairy/eggs
• Easier than vegan
• Health benefits documented

**Intermittent Fasting:**
• When you eat, not what
• 16:8 (16 hours fast, 8 hours eat)
• 5:2 (5 normal days, 2 low-calorie)
• May help weight loss

**DASH Diet:**
• Dietary Approaches to Stop Hypertension
• Low sodium, high potassium
• Fruits, vegetables, whole grains
• Proven to lower blood pressure

**Key Considerations:**
• No one-size-fits-all
• Sustainability matters
• Consult healthcare provider
• Focus on whole foods
• Avoid extreme restrictions`
  },
];

// =============================================================================
// TRAVEL AND CULTURE
// =============================================================================

export const TRAVEL_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Travel Tips',
    category: 'travel',
    keywords: ['travel', 'trip', 'vacation', 'flight', 'hotel', 'packing'],
    content: `Smart travel planning makes trips more enjoyable.

**Before You Go:**
• Check passport validity (6+ months)
• Research visa requirements
• Get travel insurance
• Check vaccination needs
• Notify bank of travel
• Copy important documents

**Booking Tips:**
• Book flights 6-8 weeks ahead (domestic)
• Tuesday/Wednesday often cheaper
• Use incognito mode for searches
• Compare prices across sites
• Consider nearby airports

**Packing:**
• Make a packing list
• Roll clothes to save space
• Wear bulky items on plane
• Pack essentials in carry-on
• Bring universal adapter
• Leave room for souvenirs

**At the Airport:**
• Arrive 2 hours early (domestic), 3 (international)
• Check in online
• Have documents ready
• Know TSA rules (3-1-1 for liquids)
• Wear easy-to-remove shoes

**Staying Safe:**
• Keep valuables secure
• Be aware of surroundings
• Use hotel safe
• Don't flash expensive items
• Know emergency numbers

**Money:**
• Notify bank of travel dates
• Carry some local currency
• Use credit cards with no foreign fees
• Know exchange rates
• ATMs often have best rates

**Jet Lag Tips:**
• Adjust sleep before trip
• Stay hydrated
• Get sunlight at destination
• Avoid alcohol on flight
• Short naps only`
  },
  {
    topic: 'World Wonders and Landmarks',
    category: 'travel',
    keywords: ['landmark', 'wonder', 'tourist', 'attraction', 'monument', 'famous place'],
    content: `Famous landmarks and wonders attract millions of visitors.

**Seven Wonders of the Ancient World:**
• Great Pyramid of Giza (only one remaining)
• Hanging Gardens of Babylon
• Statue of Zeus at Olympia
• Temple of Artemis at Ephesus
• Mausoleum at Halicarnassus
• Colossus of Rhodes
• Lighthouse of Alexandria

**New Seven Wonders:**
• Great Wall of China
• Petra, Jordan
• Christ the Redeemer, Brazil
• Machu Picchu, Peru
• Chichen Itza, Mexico
• Colosseum, Rome
• Taj Mahal, India

**Famous Landmarks:**

**Europe:**
• Eiffel Tower (Paris)
• Big Ben (London)
• Colosseum (Rome)
• Sagrada Familia (Barcelona)
• Acropolis (Athens)

**Americas:**
• Statue of Liberty (New York)
• Grand Canyon (Arizona)
• Machu Picchu (Peru)
• Christ the Redeemer (Rio)

**Asia:**
• Great Wall (China)
• Taj Mahal (India)
• Angkor Wat (Cambodia)
• Mount Fuji (Japan)

**Africa/Middle East:**
• Pyramids of Giza (Egypt)
• Petra (Jordan)
• Victoria Falls (Zambia/Zimbabwe)

**Australia:**
• Sydney Opera House
• Great Barrier Reef
• Uluru (Ayers Rock)`
  },
];

// Add extended sections
ALL_KNOWLEDGE.push(
  ...BUSINESS_EXTENDED,
  ...PSYCHOLOGY_EXTENDED,
  ...FOOD_EXTENDED,
  ...TRAVEL_KNOWLEDGE
);

// =============================================================================
// SPORTS EXTENDED
// =============================================================================

export const SPORTS_EXTENDED: KnowledgeEntry[] = [
  {
    topic: 'Soccer/Football Rules',
    category: 'sports',
    keywords: ['soccer', 'football', 'fifa', 'goal', 'offside', 'world cup'],
    content: `Soccer (football) is the world's most popular sport.

**Basic Rules:**
• 11 players per team
• 90 minutes (two 45-min halves)
• Ball must fully cross goal line
• No hands (except goalkeeper)
• Offside rule applies

**Offside Rule:**
• Player is offside if:
  - Nearer to goal than ball AND
  - Nearer than second-to-last defender
  - When ball is played to them
• Not offside if in own half

**Fouls and Cards:**
• **Yellow card:** Warning (caution)
• **Red card:** Sent off (ejection)
• Two yellows = red
• Direct/indirect free kicks
• Penalty kick for fouls in box

**Positions:**
• Goalkeeper (GK)
• Defenders (CB, LB, RB)
• Midfielders (CM, CDM, CAM, LM, RM)
• Forwards (ST, CF, LW, RW)

**Major Competitions:**
• FIFA World Cup (every 4 years)
• UEFA Champions League
• English Premier League
• La Liga (Spain)
• Serie A (Italy)
• Bundesliga (Germany)

**Famous Players:**
• Pelé, Diego Maradona
• Lionel Messi, Cristiano Ronaldo
• Zinedine Zidane, Ronaldinho`
  },
  {
    topic: 'Basketball Rules',
    category: 'sports',
    keywords: ['basketball', 'nba', 'dunk', 'three pointer', 'court'],
    content: `Basketball is a fast-paced team sport.

**Basic Rules:**
• 5 players per team on court
• Score by shooting ball through hoop
• 10-foot high basket
• Dribble to move with ball

**Scoring:**
• 2 points: Inside the arc
• 3 points: Beyond the arc
• 1 point: Free throw

**Game Structure (NBA):**
• 4 quarters, 12 minutes each
• 24-second shot clock
• 5 personal fouls = fouled out
• Overtime if tied

**Violations:**
• Traveling: Moving without dribbling
• Double dribble: Dribbling again after stopping
• Backcourt: Ball crossing half-court back
• Shot clock: Not shooting in time

**Positions:**
• Point Guard (PG): Ball handler, playmaker
• Shooting Guard (SG): Scorer
• Small Forward (SF): Versatile
• Power Forward (PF): Inside scorer
• Center (C): Tallest, rim protector

**NBA:**
• 30 teams
• 82-game regular season
• Playoffs: Best of 7 series
• NBA Finals championship

**Famous Players:**
• Michael Jordan, LeBron James
• Kobe Bryant, Magic Johnson
• Larry Bird, Shaquille O'Neal
• Stephen Curry, Kevin Durant`
  },
  {
    topic: 'Tennis Rules',
    category: 'sports',
    keywords: ['tennis', 'wimbledon', 'serve', 'grand slam', 'match'],
    content: `Tennis is played individually or in doubles.

**Scoring:**
• Points: 0 (love), 15, 30, 40, game
• Deuce: 40-40, need 2-point lead
• Games make up sets
• Sets make up match

**Match Format:**
• Best of 3 sets (most matches)
• Best of 5 sets (men's Grand Slams)
• 6 games to win set (by 2)
• Tiebreak at 6-6

**Basic Rules:**
• Serve starts each point
• Ball must land in service box
• Two serves allowed
• Ball can bounce once
• Hit before second bounce

**Court Surfaces:**
• Hard court (US Open, Australian Open)
• Clay (French Open)
• Grass (Wimbledon)
• Each affects play style

**Grand Slam Tournaments:**
• Australian Open (January)
• French Open (May-June)
• Wimbledon (June-July)
• US Open (August-September)

**Famous Players:**
• Roger Federer, Rafael Nadal
• Novak Djokovic, Pete Sampras
• Serena Williams, Steffi Graf
• Martina Navratilova, Billie Jean King`
  },
  {
    topic: 'American Football Rules',
    category: 'sports',
    keywords: ['american football', 'nfl', 'touchdown', 'quarterback', 'super bowl'],
    content: `American football combines strategy and athleticism.

**Basic Rules:**
• 11 players per team on field
• 4 downs to advance 10 yards
• Score by reaching end zone
• 100-yard field

**Scoring:**
• Touchdown: 6 points
• Extra point kick: 1 point
• 2-point conversion: 2 points
• Field goal: 3 points
• Safety: 2 points

**Game Structure:**
• 4 quarters, 15 minutes each
• Halftime after 2nd quarter
• Clock stops frequently
• Actual game ~3 hours

**Positions:**
**Offense:**
• Quarterback (QB): Leader, throws
• Running Back (RB): Runs with ball
• Wide Receiver (WR): Catches passes
• Offensive Line: Protects QB

**Defense:**
• Defensive Line: Rush QB
• Linebackers: Versatile
• Cornerbacks: Cover receivers
• Safeties: Last line of defense

**NFL:**
• 32 teams
• 17-game regular season
• Playoffs lead to Super Bowl
• Super Bowl in February

**Famous Players:**
• Tom Brady, Joe Montana
• Jerry Rice, Walter Payton
• Lawrence Taylor, Jim Brown
• Patrick Mahomes, Aaron Rodgers`
  },
];

// =============================================================================
// SCIENCE FICTION AND FANTASY
// =============================================================================

export const SCIFI_FANTASY: KnowledgeEntry[] = [
  {
    topic: 'Science Fiction Classics',
    category: 'entertainment',
    keywords: ['science fiction', 'scifi', 'star wars', 'star trek', 'space'],
    content: `Science fiction explores futuristic concepts and technology.

**Classic Sci-Fi Literature:**
• **Isaac Asimov:** Foundation, I Robot
• **Arthur C. Clarke:** 2001: A Space Odyssey
• **Philip K. Dick:** Do Androids Dream of Electric Sheep?
• **Frank Herbert:** Dune
• **H.G. Wells:** The Time Machine, War of the Worlds
• **Jules Verne:** 20,000 Leagues Under the Sea

**Star Wars:**
• Created by George Lucas (1977)
• Space opera franchise
• Jedi, Sith, the Force
• Original trilogy, prequels, sequels
• Expanded universe of shows, books

**Star Trek:**
• Created by Gene Roddenberry (1966)
• Optimistic future vision
• USS Enterprise, Starfleet
• Multiple TV series and films
• "Live long and prosper"

**Other Major Franchises:**
• **The Matrix:** Simulated reality
• **Blade Runner:** Androids, dystopia
• **Alien:** Space horror
• **Terminator:** AI apocalypse
• **Back to the Future:** Time travel

**Common Themes:**
• Space exploration
• Artificial intelligence
• Time travel
• Dystopian futures
• First contact with aliens
• Technology's impact on humanity

**Subgenres:**
• Space opera
• Cyberpunk
• Hard science fiction
• Post-apocalyptic
• Military sci-fi`
  },
  {
    topic: 'Fantasy Literature',
    category: 'entertainment',
    keywords: ['fantasy', 'lord of the rings', 'harry potter', 'magic', 'dragons'],
    content: `Fantasy literature features magical and supernatural elements.

**Classic Fantasy:**
• **J.R.R. Tolkien:** The Lord of the Rings, The Hobbit
• **C.S. Lewis:** The Chronicles of Narnia
• **Ursula K. Le Guin:** Earthsea series
• **Robert E. Howard:** Conan the Barbarian

**Modern Fantasy:**
• **J.K. Rowling:** Harry Potter series
• **George R.R. Martin:** A Song of Ice and Fire
• **Brandon Sanderson:** Mistborn, Stormlight Archive
• **Patrick Rothfuss:** The Kingkiller Chronicle
• **Terry Pratchett:** Discworld

**The Lord of the Rings:**
• Written by J.R.R. Tolkien
• Middle-earth setting
• Hobbits, elves, dwarves, wizards
• The One Ring, Sauron
• Influenced all modern fantasy

**Harry Potter:**
• Written by J.K. Rowling
• Wizarding world
• Hogwarts School
• Harry vs Voldemort
• 7 books, 8 films

**Common Elements:**
• Magic systems
• Mythical creatures (dragons, elves)
• Quests and heroes
• Good vs evil
• Medieval-inspired settings
• Chosen one narratives

**Subgenres:**
• High/epic fantasy
• Urban fantasy
• Dark fantasy
• Sword and sorcery
• Fairy tale retellings`
  },
];

// =============================================================================
// PETS AND ANIMALS
// =============================================================================

export const PETS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Dog Care',
    category: 'pets',
    keywords: ['dog', 'puppy', 'pet', 'canine', 'breed', 'training'],
    content: `Dogs are loyal companions requiring proper care.

**Basic Needs:**
• Quality dog food (age-appropriate)
• Fresh water always available
• Regular exercise
• Veterinary care
• Love and attention

**Feeding:**
• Puppies: 3-4 times daily
• Adults: 1-2 times daily
• Avoid: Chocolate, grapes, onions, xylitol
• Portion control to prevent obesity

**Exercise:**
• Daily walks (30-60+ min depending on breed)
• Playtime and mental stimulation
• Varies by breed and age
• Puppies need shorter, frequent sessions

**Training Basics:**
• Start early
• Positive reinforcement
• Consistency is key
• Basic commands: Sit, stay, come, down
• Socialization important

**Health Care:**
• Annual vet checkups
• Vaccinations (rabies, distemper, parvo)
• Flea/tick prevention
• Heartworm prevention
• Dental care

**Popular Breeds:**
• Labrador Retriever
• German Shepherd
• Golden Retriever
• French Bulldog
• Beagle
• Poodle

**Signs of Illness:**
• Loss of appetite
• Lethargy
• Vomiting/diarrhea
• Excessive thirst
• Behavior changes`
  },
  {
    topic: 'Cat Care',
    category: 'pets',
    keywords: ['cat', 'kitten', 'feline', 'pet', 'litter'],
    content: `Cats are independent but affectionate pets.

**Basic Needs:**
• Quality cat food
• Fresh water
• Clean litter box
• Scratching posts
• Safe indoor environment

**Feeding:**
• Kittens: 3-4 times daily
• Adults: 2 times daily
• Wet and/or dry food
• Avoid: Onions, garlic, chocolate, grapes

**Litter Box:**
• One per cat plus one extra
• Scoop daily
• Full clean weekly
• Quiet, accessible location
• Unscented litter often preferred

**Health Care:**
• Annual vet visits
• Vaccinations
• Spay/neuter recommended
• Dental care
• Indoor cats live longer

**Behavior:**
• Scratching is natural (provide posts)
• Hunting instincts (play with toys)
• Sleep 12-16 hours daily
• Grooming themselves
• Territorial

**Popular Breeds:**
• Persian
• Maine Coon
• Siamese
• Ragdoll
• British Shorthair
• Bengal

**Signs of Illness:**
• Hiding
• Not eating
• Litter box changes
• Excessive grooming
• Vocalization changes`
  },
];

// =============================================================================
// GAMING
// =============================================================================

export const GAMING_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Video Game History',
    category: 'entertainment',
    keywords: ['video game', 'gaming', 'nintendo', 'playstation', 'xbox', 'console'],
    content: `Video games have evolved from simple pixels to immersive experiences.

**History:**
• 1972: Pong (Atari)
• 1980: Pac-Man
• 1983: Video game crash
• 1985: NES revives industry
• 1990s: 16-bit era, 3D graphics
• 2000s: Online gaming grows
• 2010s: Mobile gaming, esports
• 2020s: VR, cloud gaming

**Major Consoles:**
• **Nintendo:** NES, SNES, N64, Wii, Switch
• **Sony:** PlayStation 1-5
• **Microsoft:** Xbox, Xbox 360, Xbox One, Series X
• **Sega:** Genesis, Dreamcast (discontinued)

**Iconic Games:**
• Super Mario Bros.
• The Legend of Zelda
• Tetris
• Minecraft
• Grand Theft Auto
• Call of Duty
• Fortnite
• The Last of Us

**Game Genres:**
• Action/Adventure
• RPG (Role-Playing Game)
• FPS (First-Person Shooter)
• Sports
• Racing
• Puzzle
• Strategy
• Simulation

**PC Gaming:**
• Steam platform dominant
• Higher graphics potential
• Keyboard/mouse controls
• Modding community
• Esports focus

**Mobile Gaming:**
• Casual games popular
• Free-to-play model
• In-app purchases
• Candy Crush, Pokémon GO

**Esports:**
• Competitive gaming
• Professional players
• Major tournaments
• Games: LoL, Dota 2, CS:GO, Valorant`
  },
];

// =============================================================================
// WEATHER AND CLIMATE
// =============================================================================

export const WEATHER_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Weather Basics',
    category: 'science',
    keywords: ['weather', 'rain', 'snow', 'temperature', 'forecast', 'storm'],
    content: `Weather describes atmospheric conditions at a specific time and place.

**Weather vs Climate:**
• Weather: Short-term conditions
• Climate: Long-term patterns
• "Climate is what you expect, weather is what you get"

**Key Weather Elements:**
• Temperature
• Precipitation (rain, snow, etc.)
• Humidity
• Wind speed and direction
• Air pressure
• Cloud cover

**Types of Precipitation:**
• Rain: Liquid water drops
• Snow: Ice crystals
• Sleet: Frozen rain
• Hail: Ice balls
• Freezing rain: Rain that freezes on contact

**Cloud Types:**
• **Cumulus:** Puffy, fair weather
• **Stratus:** Flat, overcast
• **Cirrus:** Wispy, high altitude
• **Cumulonimbus:** Thunderstorm clouds

**Severe Weather:**
• Thunderstorms: Lightning, heavy rain
• Tornadoes: Rotating columns of air
• Hurricanes: Large tropical storms
• Blizzards: Heavy snow, high winds
• Heat waves: Extended high temperatures

**Weather Fronts:**
• Cold front: Cold air replaces warm
• Warm front: Warm air replaces cold
• Stationary front: Neither moves
• Occluded front: Cold catches warm

**Reading Forecasts:**
• High/low temperatures
• Chance of precipitation
• Wind conditions
• Humidity levels
• UV index`
  },
  {
    topic: 'Natural Disasters',
    category: 'science',
    keywords: ['disaster', 'earthquake', 'hurricane', 'tornado', 'tsunami', 'flood'],
    content: `Natural disasters are severe events caused by natural processes.

**Earthquakes:**
• Caused by tectonic plate movement
• Measured on Richter/moment magnitude scale
• Epicenter: Point on surface above origin
• Can trigger tsunamis
• Drop, cover, hold on

**Hurricanes/Typhoons:**
• Large rotating storms over warm ocean
• Categories 1-5 (Saffir-Simpson scale)
• Eye: Calm center
• Storm surge: Rising water
• Hurricane season: June-November (Atlantic)

**Tornadoes:**
• Rotating columns of air
• EF0-EF5 scale
• Tornado Alley: Central US
• Seek shelter in basement/interior room
• Watch vs Warning

**Tsunamis:**
• Large ocean waves
• Caused by underwater earthquakes
• Can travel across oceans
• Move to high ground immediately

**Floods:**
• Most common natural disaster
• Flash floods: Rapid, dangerous
• River floods: Slower rising
• Never drive through flooded roads

**Volcanic Eruptions:**
• Molten rock (magma) reaches surface
• Ash clouds, lava flows
• Can affect global climate
• Ring of Fire: Pacific rim

**Preparation:**
• Emergency kit (water, food, first aid)
• Family communication plan
• Know evacuation routes
• Stay informed via alerts
• Insurance coverage`
  },
];

// Add final extended sections
ALL_KNOWLEDGE.push(
  ...SPORTS_EXTENDED,
  ...SCIFI_FANTASY,
  ...PETS_KNOWLEDGE,
  ...GAMING_KNOWLEDGE,
  ...WEATHER_KNOWLEDGE
);

// =============================================================================
// MATHEMATICS EXTENDED
// =============================================================================

export const MATH_EXTENDED: KnowledgeEntry[] = [
  {
    topic: 'Fractions and Decimals',
    category: 'mathematics',
    keywords: ['fraction', 'decimal', 'percent', 'ratio', 'proportion'],
    content: `Fractions and decimals represent parts of whole numbers.

**Fractions:**
• Numerator / Denominator
• 1/2 = one half
• Proper: numerator < denominator (3/4)
• Improper: numerator > denominator (5/3)
• Mixed number: 1 2/3

**Operations:**
• Add/Subtract: Common denominator
• Multiply: Straight across
• Divide: Flip and multiply

**Decimals:**
• Based on powers of 10
• 0.5 = 5/10 = 1/2
• 0.25 = 25/100 = 1/4
• 0.333... = 1/3

**Conversions:**
• Fraction to decimal: Divide
• Decimal to fraction: Use place value
• Percent to decimal: Divide by 100
• Decimal to percent: Multiply by 100

**Common Equivalents:**
• 1/2 = 0.5 = 50%
• 1/4 = 0.25 = 25%
• 1/3 ≈ 0.333 ≈ 33.3%
• 3/4 = 0.75 = 75%
• 1/5 = 0.2 = 20%

**Ratios:**
• Comparison of quantities
• 3:2 means 3 to 2
• Can be written as fraction

**Proportions:**
• Two equal ratios
• Cross multiply to solve
• a/b = c/d → ad = bc`
  },
  {
    topic: 'Basic Geometry Formulas',
    category: 'mathematics',
    keywords: ['geometry', 'area', 'perimeter', 'volume', 'circle', 'triangle'],
    content: `Essential geometry formulas for common shapes.

**2D Shapes - Area:**
• Rectangle: A = length × width
• Square: A = side²
• Triangle: A = (1/2) × base × height
• Circle: A = πr²
• Trapezoid: A = (1/2)(b₁ + b₂) × h
• Parallelogram: A = base × height

**2D Shapes - Perimeter:**
• Rectangle: P = 2(length + width)
• Square: P = 4 × side
• Triangle: P = a + b + c
• Circle (Circumference): C = 2πr = πd

**3D Shapes - Volume:**
• Cube: V = side³
• Rectangular prism: V = l × w × h
• Cylinder: V = πr²h
• Sphere: V = (4/3)πr³
• Cone: V = (1/3)πr²h
• Pyramid: V = (1/3) × base area × h

**3D Shapes - Surface Area:**
• Cube: SA = 6 × side²
• Rectangular prism: SA = 2(lw + lh + wh)
• Cylinder: SA = 2πr² + 2πrh
• Sphere: SA = 4πr²

**Key Values:**
• π ≈ 3.14159
• √2 ≈ 1.414
• √3 ≈ 1.732

**Pythagorean Theorem:**
• a² + b² = c²
• For right triangles
• c is hypotenuse`
  },
  {
    topic: 'Order of Operations',
    category: 'mathematics',
    keywords: ['order of operations', 'pemdas', 'bodmas', 'math rules'],
    content: `Order of operations ensures consistent mathematical results.

**PEMDAS (US) / BODMAS (UK):**
1. **P**arentheses / **B**rackets
2. **E**xponents / **O**rders (powers, roots)
3. **M**ultiplication and **D**ivision (left to right)
4. **A**ddition and **S**ubtraction (left to right)

**Examples:**
• 3 + 4 × 2 = 3 + 8 = 11 (not 14)
• (3 + 4) × 2 = 7 × 2 = 14
• 8 ÷ 2 × 4 = 4 × 4 = 16 (left to right)
• 2³ + 4 = 8 + 4 = 12

**Common Mistakes:**
• Multiplying before parentheses
• Not going left to right for ×/÷
• Forgetting exponents come before ×/÷

**Nested Parentheses:**
• Work from inside out
• [(3 + 2) × 4] - 1 = [5 × 4] - 1 = 20 - 1 = 19

**With Fractions:**
• Numerator and denominator are like parentheses
• Evaluate each separately first

**Memory Aids:**
• "Please Excuse My Dear Aunt Sally"
• "Brackets, Orders, Division, Multiplication, Addition, Subtraction"`
  },
];

// =============================================================================
// SOCIAL MEDIA AND INTERNET
// =============================================================================

export const SOCIAL_MEDIA: KnowledgeEntry[] = [
  {
    topic: 'Social Media Platforms',
    category: 'technology',
    keywords: ['social media', 'facebook', 'instagram', 'twitter', 'tiktok', 'youtube'],
    content: `Social media platforms connect billions of users worldwide.

**Major Platforms:**

**Facebook (Meta):**
• Largest social network (~3 billion users)
• Founded 2004 by Mark Zuckerberg
• Features: Posts, groups, marketplace
• Older demographic trending

**Instagram:**
• Photo/video sharing
• Owned by Meta
• Stories, Reels, IGTV
• Popular with younger users

**X (Twitter):**
• Microblogging (280 characters)
• Real-time news and discussions
• Acquired by Elon Musk (2022)
• Hashtags, trending topics

**TikTok:**
• Short-form video
• Owned by ByteDance (China)
• Algorithm-driven discovery
• Gen Z dominant

**YouTube:**
• Video sharing platform
• Owned by Google
• Creators, monetization
• Second largest search engine

**LinkedIn:**
• Professional networking
• Owned by Microsoft
• Job searching, B2B
• Career content

**Snapchat:**
• Disappearing messages
• AR filters
• Stories feature pioneer
• Young user base

**Reddit:**
• Discussion forums (subreddits)
• Upvote/downvote system
• Anonymous community
• "Front page of the internet"

**Safety Tips:**
• Privacy settings
• Think before posting
• Beware of scams
• Limit personal information`
  },
  {
    topic: 'Internet Safety',
    category: 'technology',
    keywords: ['internet safety', 'online security', 'password', 'phishing', 'privacy'],
    content: `Staying safe online protects your identity and data.

**Password Security:**
• Use strong, unique passwords
• 12+ characters, mix of types
• Password manager recommended
• Never reuse passwords
• Enable two-factor authentication (2FA)

**Phishing:**
• Fake emails/messages seeking info
• Check sender addresses carefully
• Don't click suspicious links
• Verify requests independently
• Banks won't ask for passwords via email

**Privacy:**
• Review privacy settings
• Limit personal info shared
• Be cautious with location sharing
• Use private browsing when needed
• Read privacy policies

**Safe Browsing:**
• Look for HTTPS (padlock icon)
• Avoid public WiFi for sensitive tasks
• Use VPN for added security
• Keep software updated
• Use reputable antivirus

**Social Engineering:**
• Manipulation to get information
• Verify identities before sharing
• Be skeptical of urgent requests
• Don't trust caller ID alone

**Children's Safety:**
• Parental controls
• Monitor online activity
• Teach about dangers
• Open communication
• Age-appropriate content

**If Compromised:**
• Change passwords immediately
• Check financial accounts
• Report to relevant services
• Consider credit freeze
• Document everything`
  },
];

// =============================================================================
// AUTOMOTIVE
// =============================================================================

export const AUTOMOTIVE: KnowledgeEntry[] = [
  {
    topic: 'How Cars Work',
    category: 'technology',
    keywords: ['car', 'engine', 'transmission', 'how car works', 'automobile'],
    content: `Understanding how cars work helps with maintenance and decisions.

**Internal Combustion Engine:**
• Burns fuel (gasoline/diesel)
• Four-stroke cycle: Intake, compression, power, exhaust
• Pistons move up and down
• Crankshaft converts to rotation
• Measured in horsepower and torque

**Transmission:**
• Transfers power to wheels
• **Manual:** Driver shifts gears
• **Automatic:** Shifts automatically
• **CVT:** Continuously variable
• Gears provide different speed/power ratios

**Drivetrain:**
• **FWD:** Front-wheel drive
• **RWD:** Rear-wheel drive
• **AWD:** All-wheel drive
• **4WD:** Four-wheel drive (off-road)

**Braking System:**
• Disc brakes (most common)
• Drum brakes (older/rear)
• ABS prevents wheel lockup
• Brake fluid transfers force

**Suspension:**
• Absorbs road bumps
• Springs and shock absorbers
• Affects handling and comfort

**Electrical System:**
• Battery provides starting power
• Alternator charges battery
• Powers lights, electronics
• 12V system (most cars)

**Cooling System:**
• Radiator dissipates heat
• Coolant circulates
• Thermostat regulates temperature
• Prevents overheating

**Fuel System:**
• Fuel tank stores fuel
• Fuel pump delivers to engine
• Fuel injectors spray into cylinders`
  },
  {
    topic: 'Electric Vehicles',
    category: 'technology',
    keywords: ['electric car', 'ev', 'tesla', 'hybrid', 'charging', 'battery'],
    content: `Electric vehicles are transforming transportation.

**Types:**
• **BEV:** Battery Electric (fully electric)
• **PHEV:** Plug-in Hybrid (electric + gas)
• **HEV:** Hybrid (gas + small battery)
• **FCEV:** Fuel Cell (hydrogen)

**How EVs Work:**
• Electric motor instead of engine
• Battery pack stores energy
• Regenerative braking recovers energy
• Fewer moving parts than gas cars

**Charging:**
• **Level 1:** Standard outlet (slow, 2-5 mi/hr)
• **Level 2:** 240V (10-30 mi/hr)
• **Level 3/DC Fast:** Rapid (100+ mi/hr)
• Home charging most common

**Range:**
• Varies by model (100-400+ miles)
• Affected by: Temperature, speed, AC/heat
• Range anxiety decreasing
• Charging network expanding

**Benefits:**
• Lower fuel costs
• Less maintenance
• Zero tailpipe emissions
• Instant torque
• Quieter operation

**Considerations:**
• Higher upfront cost
• Charging infrastructure
• Battery degradation over time
• Longer refueling time

**Major EV Makers:**
• Tesla (market leader)
• Rivian, Lucid (US startups)
• Ford, GM, VW (traditional)
• BYD, NIO (Chinese)

**Incentives:**
• Federal tax credits
• State rebates
• HOV lane access
• Reduced registration fees`
  },
];

// =============================================================================
// LEGAL BASICS
// =============================================================================

export const LEGAL_BASICS: KnowledgeEntry[] = [
  {
    topic: 'US Legal System',
    category: 'legal',
    keywords: ['law', 'legal', 'court', 'lawyer', 'rights', 'constitution'],
    content: `The US legal system protects rights and resolves disputes.

**Court System:**
• **Federal Courts:** Constitutional, federal law
• **State Courts:** State law, most cases
• **Supreme Court:** Highest court, final appeals

**Types of Law:**
• **Criminal:** Crimes against society
• **Civil:** Disputes between parties
• **Constitutional:** Rights, government powers
• **Administrative:** Government agencies

**Criminal vs Civil:**
• Criminal: State prosecutes, jail possible
• Civil: Private parties, monetary damages
• Different burden of proof
• Can face both for same act

**Constitutional Rights:**
• 1st Amendment: Speech, religion, press
• 2nd Amendment: Bear arms
• 4th Amendment: Search and seizure
• 5th Amendment: Self-incrimination
• 6th Amendment: Fair trial

**Legal Process:**
• Arrest/complaint filed
• Arraignment (charges read)
• Discovery (evidence sharing)
• Trial or settlement
• Verdict/judgment
• Appeals possible

**When to Get a Lawyer:**
• Criminal charges
• Serious injury
• Divorce/custody
• Business disputes
• Real estate transactions
• Estate planning

**Legal Terms:**
• Plaintiff: Person suing
• Defendant: Person being sued
• Verdict: Decision
• Appeal: Request higher court review
• Statute of limitations: Time limit to sue`
  },
];

// =============================================================================
// MISCELLANEOUS KNOWLEDGE
// =============================================================================

export const MISC_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Time Zones',
    category: 'reference',
    keywords: ['time zone', 'gmt', 'utc', 'est', 'pst', 'time difference'],
    content: `Time zones divide the world into regions with the same time.

**How Time Zones Work:**
• Earth divided into 24 zones
• Each zone ~15° longitude
• Based on UTC (Coordinated Universal Time)
• UTC = GMT (Greenwich Mean Time)

**US Time Zones:**
• **EST/EDT:** Eastern (UTC-5/-4)
• **CST/CDT:** Central (UTC-6/-5)
• **MST/MDT:** Mountain (UTC-7/-6)
• **PST/PDT:** Pacific (UTC-8/-7)
• **AKST/AKDT:** Alaska (UTC-9/-8)
• **HST:** Hawaii (UTC-10)

**Major World Cities:**
• London: UTC+0 (GMT)
• Paris, Berlin: UTC+1 (CET)
• Moscow: UTC+3
• Dubai: UTC+4
• Mumbai: UTC+5:30
• Beijing, Singapore: UTC+8
• Tokyo: UTC+9
• Sydney: UTC+10/+11

**Daylight Saving Time:**
• Clocks forward in spring
• Clocks back in fall
• "Spring forward, fall back"
• Not all places observe
• US: March-November

**International Date Line:**
• 180° longitude (Pacific)
• Cross west: Add a day
• Cross east: Subtract a day

**Converting Times:**
• Add hours going east
• Subtract hours going west
• Account for DST differences`
  },
  {
    topic: 'Etiquette and Manners',
    category: 'culture',
    keywords: ['etiquette', 'manners', 'polite', 'social', 'behavior'],
    content: `Good etiquette helps navigate social situations gracefully.

**Basic Manners:**
• Say please and thank you
• Hold doors for others
• Cover mouth when coughing/sneezing
• Chew with mouth closed
• Don't interrupt others

**Dining Etiquette:**
• Napkin in lap
• Wait for everyone to be served
• Elbows off table
• Use utensils outside-in
• Don't talk with mouth full
• Thank the host

**Professional Etiquette:**
• Be punctual
• Firm handshake
• Dress appropriately
• Listen actively
• Follow up after meetings
• Respect others' time

**Phone Etiquette:**
• Silence in meetings
• Don't use at dinner table
• Step away for calls
• Text back within reasonable time
• Don't scroll while talking to someone

**Email Etiquette:**
• Clear subject line
• Professional greeting
• Proofread before sending
• Reply within 24-48 hours
• Be concise

**Cultural Awareness:**
• Customs vary by culture
• Research before traveling
• Be respectful of differences
• Ask when unsure
• Observe and adapt

**Tipping (US):**
• Restaurants: 15-20%
• Bars: $1-2 per drink
• Hair salon: 15-20%
• Taxi/rideshare: 15-20%
• Hotel housekeeping: $2-5/night`
  },
  {
    topic: 'Common Abbreviations',
    category: 'reference',
    keywords: ['abbreviation', 'acronym', 'meaning', 'stands for'],
    content: `Common abbreviations and their meanings.

**Internet/Text:**
• LOL: Laugh out loud
• BRB: Be right back
• IMO/IMHO: In my (humble) opinion
• TBH: To be honest
• FWIW: For what it's worth
• TL;DR: Too long; didn't read
• ASAP: As soon as possible
• FYI: For your information

**Business:**
• CEO: Chief Executive Officer
• CFO: Chief Financial Officer
• HR: Human Resources
• ROI: Return on Investment
• B2B: Business to Business
• B2C: Business to Consumer
• KPI: Key Performance Indicator
• EOD: End of Day

**Technology:**
• AI: Artificial Intelligence
• API: Application Programming Interface
• URL: Uniform Resource Locator
• HTML: HyperText Markup Language
• CSS: Cascading Style Sheets
• SQL: Structured Query Language
• VPN: Virtual Private Network
• IoT: Internet of Things

**Medical:**
• ER: Emergency Room
• ICU: Intensive Care Unit
• MRI: Magnetic Resonance Imaging
• CT: Computed Tomography
• BP: Blood Pressure
• Rx: Prescription

**Government:**
• FBI: Federal Bureau of Investigation
• CIA: Central Intelligence Agency
• IRS: Internal Revenue Service
• FDA: Food and Drug Administration
• EPA: Environmental Protection Agency
• NASA: National Aeronautics and Space Administration`
  },
];

// Add final knowledge sections
ALL_KNOWLEDGE.push(
  ...MATH_EXTENDED,
  ...SOCIAL_MEDIA,
  ...AUTOMOTIVE,
  ...LEGAL_BASICS,
  ...MISC_KNOWLEDGE
);

// =============================================================================
// ENVIRONMENTAL SCIENCE
// =============================================================================

export const ENVIRONMENTAL: KnowledgeEntry[] = [
  {
    topic: 'Ecosystems',
    category: 'science',
    keywords: ['ecosystem', 'habitat', 'biodiversity', 'food chain', 'environment'],
    content: `Ecosystems are communities of living organisms interacting with their environment.

**Components:**
• **Biotic:** Living things (plants, animals, microbes)
• **Abiotic:** Non-living (water, soil, climate, sunlight)

**Types of Ecosystems:**
• **Terrestrial:** Forests, grasslands, deserts, tundra
• **Aquatic:** Freshwater (lakes, rivers), marine (oceans)
• **Artificial:** Urban, agricultural

**Food Chain:**
• Producers (plants) → Primary consumers (herbivores) → Secondary consumers (carnivores) → Decomposers
• Energy transfers between levels
• ~10% energy passes to next level

**Food Web:**
• Interconnected food chains
• More realistic than single chain
• Shows ecosystem complexity

**Biodiversity:**
• Variety of life in an area
• Species diversity
• Genetic diversity
• Ecosystem diversity
• Higher = more resilient

**Ecological Roles:**
• **Producers:** Make own food (photosynthesis)
• **Consumers:** Eat other organisms
• **Decomposers:** Break down dead matter
• **Keystone species:** Disproportionate impact

**Threats:**
• Habitat destruction
• Pollution
• Climate change
• Invasive species
• Overexploitation`
  },
  {
    topic: 'Renewable Energy',
    category: 'science',
    keywords: ['renewable', 'solar', 'wind', 'energy', 'sustainable', 'green'],
    content: `Renewable energy comes from naturally replenishing sources.

**Solar Energy:**
• Photovoltaic panels convert sunlight
• Solar thermal for heating
• Costs have dropped dramatically
• Works best in sunny regions
• Storage challenges (batteries)

**Wind Energy:**
• Turbines convert wind to electricity
• Onshore and offshore farms
• One of cheapest energy sources
• Variable (depends on wind)
• Visual and noise concerns

**Hydropower:**
• Dams generate electricity
• Oldest renewable source
• Reliable and controllable
• Environmental impact on rivers
• Limited new sites available

**Geothermal:**
• Heat from Earth's interior
• Consistent power source
• Limited to certain locations
• Iceland, US West use extensively

**Biomass:**
• Organic material for energy
• Wood, crops, waste
• Carbon neutral (debated)
• Can compete with food production

**Benefits of Renewables:**
• Reduce greenhouse gases
• Energy independence
• Job creation
• Lower long-term costs
• Sustainable

**Challenges:**
• Intermittency (sun, wind)
• Storage technology
• Grid infrastructure
• Initial investment costs
• Land use`
  },
  {
    topic: 'Pollution',
    category: 'science',
    keywords: ['pollution', 'air quality', 'water pollution', 'plastic', 'waste'],
    content: `Pollution is contamination of the environment with harmful substances.

**Air Pollution:**
• Sources: Vehicles, industry, power plants
• Pollutants: CO, NOx, particulates, ozone
• Health effects: Respiratory, cardiovascular
• Smog in cities
• Indoor air pollution too

**Water Pollution:**
• Sources: Industrial, agricultural, sewage
• Pollutants: Chemicals, nutrients, pathogens
• Eutrophication (algae blooms)
• Affects drinking water, ecosystems
• Ocean pollution increasing

**Plastic Pollution:**
• 8 million tons enter oceans yearly
• Microplastics in food chain
• Takes 100s of years to decompose
• Great Pacific Garbage Patch
• Single-use plastics major issue

**Soil Pollution:**
• Pesticides, heavy metals
• Industrial contamination
• Affects food production
• Groundwater contamination

**Noise Pollution:**
• Traffic, industry, construction
• Health effects: Stress, hearing loss
• Wildlife disruption

**Light Pollution:**
• Artificial light at night
• Affects wildlife, astronomy
• Human sleep disruption

**Solutions:**
• Regulations and enforcement
• Clean technology
• Reduce, reuse, recycle
• Individual actions
• Corporate responsibility
• International cooperation`
  },
];

// =============================================================================
// COMMUNICATION SKILLS
// =============================================================================

export const COMMUNICATION: KnowledgeEntry[] = [
  {
    topic: 'Public Speaking',
    category: 'skills',
    keywords: ['public speaking', 'presentation', 'speech', 'audience', 'nervous'],
    content: `Public speaking is a valuable skill that can be developed with practice.

**Preparation:**
• Know your audience
• Research thoroughly
• Organize content clearly
• Practice multiple times
• Prepare for questions

**Structure:**
• **Opening:** Hook, introduce topic
• **Body:** Main points (3-5 max)
• **Conclusion:** Summarize, call to action

**Delivery Tips:**
• Make eye contact
• Vary your voice (pace, volume, tone)
• Use natural gestures
• Move purposefully
• Pause for emphasis

**Managing Nervousness:**
• Prepare thoroughly
• Practice deep breathing
• Visualize success
• Arrive early
• Focus on message, not self
• It's normal to be nervous

**Visual Aids:**
• Keep slides simple
• Use images over text
• Don't read from slides
• Have backup plan

**Engaging the Audience:**
• Ask questions
• Tell stories
• Use humor appropriately
• Make it relevant to them
• Involve them when possible

**Common Mistakes:**
• Reading from notes
• Speaking too fast
• Not making eye contact
• Overloading with information
• Going over time`
  },
  {
    topic: 'Active Listening',
    category: 'skills',
    keywords: ['listening', 'communication', 'conversation', 'understand'],
    content: `Active listening improves understanding and relationships.

**What is Active Listening?**
• Fully concentrating on speaker
• Understanding the message
• Responding thoughtfully
• Remembering what was said

**Key Techniques:**

**Pay Attention:**
• Face the speaker
• Maintain eye contact
• Put away distractions
• Don't plan your response while listening

**Show You're Listening:**
• Nod occasionally
• Use facial expressions
• Say "uh-huh," "I see"
• Open, inviting posture

**Provide Feedback:**
• Paraphrase: "So you're saying..."
• Ask clarifying questions
• Summarize key points
• Reflect feelings

**Defer Judgment:**
• Let them finish
• Don't interrupt
• Avoid jumping to conclusions
• Be open-minded

**Respond Appropriately:**
• Be honest and respectful
• Share your perspective
• Ask follow-up questions

**Benefits:**
• Better relationships
• Fewer misunderstandings
• More information gathered
• Others feel valued
• Improved problem-solving

**Barriers to Avoid:**
• Thinking about your response
• Getting distracted
• Making assumptions
• Interrupting
• Judging`
  },
  {
    topic: 'Writing Skills',
    category: 'skills',
    keywords: ['writing', 'essay', 'email', 'grammar', 'communication'],
    content: `Good writing communicates ideas clearly and effectively.

**Writing Process:**
1. **Prewriting:** Brainstorm, research, outline
2. **Drafting:** Get ideas down
3. **Revising:** Improve content, structure
4. **Editing:** Fix grammar, spelling
5. **Publishing:** Final format

**Clear Writing Tips:**
• Know your audience
• Have a clear purpose
• Use simple words
• Keep sentences short
• One idea per paragraph
• Use active voice

**Structure:**
• Introduction with thesis
• Body paragraphs with evidence
• Conclusion summarizing points
• Transitions between ideas

**Common Errors:**
• Run-on sentences
• Comma splices
• Subject-verb disagreement
• Unclear pronouns
• Passive voice overuse

**Email Writing:**
• Clear subject line
• Professional greeting
• Get to the point quickly
• One topic per email
• Proofread before sending
• Appropriate sign-off

**Business Writing:**
• Be concise
• Use bullet points
• Front-load important info
• Avoid jargon
• Professional tone

**Improving:**
• Read widely
• Write regularly
• Get feedback
• Study grammar
• Edit ruthlessly`
  },
];

// =============================================================================
// WORLD RELIGIONS EXTENDED
// =============================================================================

export const RELIGIONS_EXTENDED: KnowledgeEntry[] = [
  {
    topic: 'Buddhism',
    category: 'religion',
    keywords: ['buddhism', 'buddha', 'meditation', 'enlightenment', 'karma'],
    content: `Buddhism is a spiritual tradition focused on ending suffering.

**Founder:**
• Siddhartha Gautama (the Buddha)
• Lived ~563-483 BCE
• Prince who sought enlightenment
• Taught in India

**Four Noble Truths:**
1. Life involves suffering (dukkha)
2. Suffering comes from craving/attachment
3. Suffering can end
4. The Eightfold Path leads to end of suffering

**Eightfold Path:**
• Right view, intention
• Right speech, action, livelihood
• Right effort, mindfulness, concentration

**Key Concepts:**
• **Karma:** Actions have consequences
• **Rebirth:** Cycle of death and rebirth
• **Nirvana:** Liberation from cycle
• **Dharma:** Buddha's teachings
• **Sangha:** Buddhist community

**Major Branches:**
• **Theravada:** Southeast Asia, oldest
• **Mahayana:** East Asia, bodhisattvas
• **Vajrayana:** Tibet, tantric practices

**Practices:**
• Meditation
• Mindfulness
• Chanting
• Monasticism
• Pilgrimage

**Core Values:**
• Non-violence (ahimsa)
• Compassion
• Wisdom
• Detachment
• Middle Way (avoiding extremes)

**Followers:** ~500 million worldwide`
  },
  {
    topic: 'Hinduism',
    category: 'religion',
    keywords: ['hinduism', 'hindu', 'india', 'karma', 'reincarnation', 'yoga'],
    content: `Hinduism is one of the world's oldest religions, originating in India.

**Overview:**
• No single founder
• Developed over 4,000+ years
• Diverse beliefs and practices
• ~1.2 billion followers

**Core Beliefs:**
• **Brahman:** Ultimate reality/God
• **Atman:** Individual soul
• **Karma:** Actions affect future
• **Samsara:** Cycle of rebirth
• **Moksha:** Liberation from cycle
• **Dharma:** Duty, righteousness

**Major Deities:**
• **Brahma:** Creator
• **Vishnu:** Preserver
• **Shiva:** Destroyer/transformer
• **Lakshmi:** Goddess of wealth
• **Saraswati:** Goddess of knowledge
• **Ganesha:** Remover of obstacles

**Sacred Texts:**
• Vedas (oldest)
• Upanishads
• Bhagavad Gita
• Ramayana
• Mahabharata

**Practices:**
• Puja (worship)
• Yoga
• Meditation
• Pilgrimage
• Festivals (Diwali, Holi)

**Paths to Moksha:**
• Karma yoga (action)
• Bhakti yoga (devotion)
• Jnana yoga (knowledge)
• Raja yoga (meditation)

**Caste System:**
• Traditional social hierarchy
• Being reformed/challenged
• Still influences society`
  },
  {
    topic: 'Judaism',
    category: 'religion',
    keywords: ['judaism', 'jewish', 'torah', 'israel', 'synagogue'],
    content: `Judaism is one of the oldest monotheistic religions.

**Overview:**
• ~4,000 years old
• Originated in Middle East
• ~14 million followers
• Foundation for Christianity and Islam

**Core Beliefs:**
• One God (monotheism)
• Covenant with God
• Torah as God's word
• Chosen people concept
• Importance of ethical behavior

**Sacred Texts:**
• **Torah:** First 5 books (Pentateuch)
• **Tanakh:** Hebrew Bible
• **Talmud:** Oral law, commentary
• **Midrash:** Biblical interpretation

**Key Figures:**
• Abraham (patriarch)
• Moses (received Torah)
• David (king)
• Prophets (Isaiah, Elijah, etc.)

**Practices:**
• Sabbath (Shabbat) - weekly rest
• Kosher dietary laws
• Prayer (3 times daily)
• Synagogue worship
• Life cycle rituals

**Major Holidays:**
• Rosh Hashanah (New Year)
• Yom Kippur (Day of Atonement)
• Passover (Exodus commemoration)
• Hanukkah (Festival of Lights)
• Sukkot (Harvest festival)

**Branches:**
• Orthodox (traditional)
• Conservative (moderate)
• Reform (liberal)
• Reconstructionist

**Israel:**
• Jewish homeland
• Established 1948
• Jerusalem holy city`
  },
];

// =============================================================================
// CAREER AND JOBS
// =============================================================================

export const CAREER_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Job Interview Tips',
    category: 'career',
    keywords: ['interview', 'job', 'hire', 'career', 'resume'],
    content: `Successful job interviews require preparation and practice.

**Before the Interview:**
• Research the company thoroughly
• Review the job description
• Prepare examples of your work
• Practice common questions
• Plan your outfit
• Know the location/tech setup

**Common Questions:**
• "Tell me about yourself"
• "Why do you want this job?"
• "What are your strengths/weaknesses?"
• "Where do you see yourself in 5 years?"
• "Tell me about a challenge you overcame"

**STAR Method for Answers:**
• **S**ituation: Set the context
• **T**ask: Describe your responsibility
• **A**ction: Explain what you did
• **R**esult: Share the outcome

**During the Interview:**
• Arrive early (10-15 min)
• Firm handshake, eye contact
• Listen carefully
• Be specific with examples
• Ask thoughtful questions
• Show enthusiasm

**Questions to Ask:**
• "What does success look like in this role?"
• "What's the team culture like?"
• "What are the biggest challenges?"
• "What are the next steps?"

**After the Interview:**
• Send thank-you email within 24 hours
• Reiterate interest
• Reference specific conversation points
• Follow up if you don't hear back

**Red Flags to Avoid:**
• Speaking negatively about past employers
• Being unprepared
• Arriving late
• Not asking questions`
  },
  {
    topic: 'Resume Writing',
    category: 'career',
    keywords: ['resume', 'cv', 'job application', 'career', 'hire'],
    content: `A strong resume gets you interviews.

**Resume Sections:**
• Contact information
• Summary/objective (optional)
• Work experience
• Education
• Skills
• Additional sections as relevant

**Formatting:**
• 1 page (2 for senior roles)
• Clean, readable font
• Consistent formatting
• Reverse chronological order
• PDF format usually best

**Work Experience Tips:**
• Start with action verbs
• Quantify achievements
• Focus on results, not duties
• Tailor to job description
• Most recent first

**Action Verbs:**
• Led, managed, developed
• Increased, improved, reduced
• Created, designed, implemented
• Achieved, exceeded, delivered

**Quantify Results:**
• "Increased sales by 25%"
• "Managed team of 10"
• "Reduced costs by $50K"
• "Served 100+ customers daily"

**Skills Section:**
• Technical skills
• Software proficiency
• Languages
• Certifications
• Relevant soft skills

**Common Mistakes:**
• Typos and errors
• Generic content
• Too long
• Irrelevant information
• Unprofessional email

**ATS Optimization:**
• Use keywords from job posting
• Simple formatting
• Standard section headers
• Avoid graphics/tables`
  },
];

// =============================================================================
// FINAL ADDITIONS
// =============================================================================

export const FINAL_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Critical Thinking',
    category: 'skills',
    keywords: ['critical thinking', 'logic', 'reasoning', 'analyze', 'evaluate'],
    content: `Critical thinking is the ability to analyze and evaluate information objectively.

**Core Skills:**
• Analysis: Breaking down information
• Evaluation: Assessing credibility
• Inference: Drawing conclusions
• Explanation: Clearly articulating reasoning
• Self-regulation: Examining own thinking

**Steps:**
1. Identify the problem/question
2. Gather relevant information
3. Consider different perspectives
4. Evaluate evidence
5. Draw reasoned conclusions
6. Communicate effectively

**Avoiding Bias:**
• Confirmation bias: Seeking supporting info
• Anchoring: Over-relying on first info
• Availability: Overweighting recent/memorable
• Bandwagon: Following the crowd
• Emotional reasoning: Feelings as facts

**Evaluating Sources:**
• Who is the author/source?
• What evidence is provided?
• Is it current?
• Is it biased?
• Can it be verified?

**Logical Fallacies:**
• Ad hominem: Attacking person, not argument
• Straw man: Misrepresenting opponent's view
• False dichotomy: Only two options presented
• Slippery slope: Extreme consequences assumed
• Appeal to authority: Expert opinion as proof

**Developing Skills:**
• Question assumptions
• Seek diverse viewpoints
• Practice analyzing arguments
• Reflect on your reasoning
• Be open to changing your mind`
  },
  {
    topic: 'Problem Solving',
    category: 'skills',
    keywords: ['problem solving', 'solution', 'decision', 'analyze'],
    content: `Effective problem solving is a valuable life and work skill.

**Problem-Solving Process:**
1. **Define:** Clearly state the problem
2. **Analyze:** Understand causes and context
3. **Generate:** Brainstorm possible solutions
4. **Evaluate:** Assess pros and cons
5. **Select:** Choose best solution
6. **Implement:** Put solution into action
7. **Review:** Assess results, adjust

**Techniques:**

**Brainstorming:**
• Generate many ideas
• No criticism during ideation
• Build on others' ideas
• Quantity over quality initially

**Root Cause Analysis:**
• Ask "Why?" 5 times
• Fishbone diagram
• Find underlying cause
• Don't just treat symptoms

**Pros and Cons:**
• List advantages and disadvantages
• Weight by importance
• Compare options objectively

**Decision Matrix:**
• List criteria
• Rate options on each
• Calculate weighted scores
• Choose highest score

**Mind Mapping:**
• Visual brainstorming
• Central idea with branches
• Shows connections
• Stimulates creativity

**Tips:**
• Don't rush to solutions
• Consider multiple perspectives
• Break big problems into smaller ones
• Learn from past solutions
• Be willing to iterate`
  },
  {
    topic: 'Goal Setting',
    category: 'skills',
    keywords: ['goal', 'objective', 'plan', 'achieve', 'success'],
    content: `Effective goal setting increases chances of success.

**SMART Goals:**
• **S**pecific: Clear and defined
• **M**easurable: Quantifiable progress
• **A**chievable: Realistic
• **R**elevant: Aligned with values
• **T**ime-bound: Has deadline

**Example:**
• Vague: "Get in shape"
• SMART: "Run a 5K in under 30 minutes by June 1"

**Types of Goals:**
• Short-term (days to months)
• Medium-term (months to year)
• Long-term (years)
• Process goals (actions)
• Outcome goals (results)

**Setting Goals:**
1. Reflect on what you want
2. Write goals down
3. Make them SMART
4. Break into smaller steps
5. Identify obstacles
6. Create action plan

**Staying on Track:**
• Review goals regularly
• Track progress
• Celebrate milestones
• Adjust as needed
• Find accountability partner

**Common Pitfalls:**
• Too many goals
• Too vague
• Not writing them down
• No action plan
• Giving up too soon

**Motivation:**
• Connect to your "why"
• Visualize success
• Focus on progress, not perfection
• Learn from setbacks
• Reward yourself`
  },
];

// Add all final sections
ALL_KNOWLEDGE.push(
  ...ENVIRONMENTAL,
  ...COMMUNICATION,
  ...RELIGIONS_EXTENDED,
  ...CAREER_KNOWLEDGE,
  ...FINAL_KNOWLEDGE
);

// =============================================================================
// ADDITIONAL TOPICS TO REACH 10,000+ LINES
// =============================================================================

export const ADDITIONAL_TOPICS: KnowledgeEntry[] = [
  {
    topic: 'Photography Basics',
    category: 'arts',
    keywords: ['photography', 'camera', 'photo', 'exposure', 'composition'],
    content: `Photography captures moments through light and composition.

**Exposure Triangle:**
• **Aperture (f-stop):** Controls depth of field
  - Lower f-number = more light, blurrier background
  - Higher f-number = less light, sharper throughout
• **Shutter Speed:** How long sensor is exposed
  - Fast = freeze motion
  - Slow = motion blur
• **ISO:** Sensor sensitivity
  - Low = less noise, needs more light
  - High = more noise, works in low light

**Composition Rules:**
• Rule of thirds: Place subjects on grid lines
• Leading lines: Guide viewer's eye
• Framing: Use natural frames
• Symmetry and patterns
• Negative space

**Camera Types:**
• DSLR: Mirror, optical viewfinder
• Mirrorless: No mirror, electronic viewfinder
• Point-and-shoot: Compact, automatic
• Smartphone: Always with you

**Lighting:**
• Golden hour: After sunrise, before sunset
• Blue hour: Just before sunrise, after sunset
• Diffused light: Soft, even
• Hard light: Strong shadows

**Tips:**
• Shoot in RAW for editing flexibility
• Learn your camera's settings
• Practice regularly
• Study others' work
• Backup your photos`
  },
  {
    topic: 'Gardening Basics',
    category: 'hobbies',
    keywords: ['garden', 'plant', 'grow', 'flower', 'vegetable', 'soil'],
    content: `Gardening connects you with nature and provides fresh produce.

**Getting Started:**
• Assess your space (sun, soil, size)
• Start small
• Choose appropriate plants for your zone
• Plan before planting

**Soil Basics:**
• Test soil pH and nutrients
• Add compost for nutrition
• Good drainage essential
• Mulch to retain moisture

**Sunlight Requirements:**
• Full sun: 6+ hours direct
• Partial sun: 3-6 hours
• Shade: Less than 3 hours
• Match plants to conditions

**Watering:**
• Deep, infrequent watering best
• Morning watering preferred
• Check soil moisture before watering
• Avoid wetting leaves

**Easy Plants for Beginners:**
• Tomatoes, lettuce, herbs
• Marigolds, sunflowers, zinnias
• Succulents, pothos, snake plant

**Container Gardening:**
• Good for small spaces
• Ensure drainage holes
• Use quality potting mix
• Water more frequently

**Common Problems:**
• Pests: Identify and treat appropriately
• Diseases: Remove affected parts
• Nutrient deficiency: Fertilize
• Overwatering: Let soil dry

**Seasonal Tasks:**
• Spring: Plant, prepare beds
• Summer: Water, harvest, weed
• Fall: Clean up, plant bulbs
• Winter: Plan, order seeds`
  },
  {
    topic: 'Chess Basics',
    category: 'games',
    keywords: ['chess', 'checkmate', 'strategy', 'board game', 'pieces'],
    content: `Chess is a strategic board game played worldwide.

**The Board:**
• 8x8 grid (64 squares)
• Alternating light and dark
• White square in right corner
• Ranks (rows) and files (columns)

**Pieces and Movement:**
• **King:** One square any direction
• **Queen:** Any direction, any distance
• **Rook:** Horizontal/vertical, any distance
• **Bishop:** Diagonal, any distance
• **Knight:** L-shape (2+1), can jump
• **Pawn:** Forward one (two from start), captures diagonally

**Special Moves:**
• Castling: King + rook swap (once per game)
• En passant: Pawn captures passing pawn
• Promotion: Pawn reaches end, becomes any piece

**Basic Strategy:**
• Control the center
• Develop pieces early
• Castle for king safety
• Don't move same piece twice early
• Connect your rooks

**Checkmate:**
• King is in check
• No legal moves to escape
• Game ends

**Stalemate:**
• Not in check
• No legal moves
• Game is a draw

**Notation:**
• Files: a-h
• Ranks: 1-8
• Pieces: K, Q, R, B, N
• Example: Nf3 (Knight to f3)`
  },
  {
    topic: 'Meditation Basics',
    category: 'wellness',
    keywords: ['meditation', 'mindfulness', 'calm', 'relax', 'breathe', 'zen'],
    content: `Meditation is a practice for training attention and awareness.

**Benefits:**
• Reduced stress and anxiety
• Improved focus
• Better emotional regulation
• Lower blood pressure
• Enhanced self-awareness

**Basic Technique:**
1. Find a quiet, comfortable spot
2. Sit comfortably (chair or floor)
3. Close eyes or soft gaze
4. Focus on breath
5. When mind wanders, gently return
6. Start with 5-10 minutes

**Types of Meditation:**
• **Mindfulness:** Present moment awareness
• **Focused:** Concentrate on object/breath
• **Loving-kindness:** Cultivate compassion
• **Body scan:** Awareness through body
• **Transcendental:** Mantra-based
• **Guided:** Follow instructions

**Tips for Beginners:**
• Start short (5 minutes)
• Same time daily
• Don't judge wandering thoughts
• Use apps if helpful
• Be patient with yourself

**Common Challenges:**
• Mind wandering (normal!)
• Restlessness
• Sleepiness
• Finding time
• Expecting immediate results

**Breathing Techniques:**
• 4-7-8: Inhale 4, hold 7, exhale 8
• Box breathing: 4-4-4-4
• Natural breath observation

**Building a Practice:**
• Consistency over duration
• Morning often works best
• Create a dedicated space
• Track your practice`
  },
  {
    topic: 'Coffee Knowledge',
    category: 'food',
    keywords: ['coffee', 'espresso', 'caffeine', 'brew', 'roast', 'beans'],
    content: `Coffee is one of the world's most popular beverages.

**Coffee Basics:**
• Made from roasted coffee beans
• Two main species: Arabica (higher quality), Robusta
• Caffeine content varies by preparation
• Second most traded commodity after oil

**Roast Levels:**
• **Light:** More caffeine, acidic, origin flavors
• **Medium:** Balanced, most popular
• **Dark:** Less caffeine, bold, bitter

**Brewing Methods:**
• **Drip/Pour-over:** Clean, consistent
• **French press:** Full-bodied, oils retained
• **Espresso:** Concentrated, pressurized
• **Cold brew:** Smooth, less acidic
• **Moka pot:** Stovetop, strong

**Espresso Drinks:**
• **Espresso:** 1-2 oz concentrated shot
• **Americano:** Espresso + hot water
• **Latte:** Espresso + steamed milk
• **Cappuccino:** Equal espresso, milk, foam
• **Macchiato:** Espresso + dollop of foam
• **Mocha:** Latte + chocolate

**Caffeine Content:**
• Espresso shot: ~63mg
• Drip coffee (8oz): ~95mg
• Cold brew (8oz): ~100-200mg
• Decaf (8oz): ~2-15mg

**Storage:**
• Airtight container
• Cool, dark place
• Use within 2-4 weeks of roasting
• Don't freeze (debated)

**Health:**
• Moderate consumption generally safe
• May improve alertness, mood
• Limit to 400mg caffeine/day
• Avoid late in day for sleep`
  },
  {
    topic: 'Wine Basics',
    category: 'food',
    keywords: ['wine', 'red wine', 'white wine', 'grape', 'vineyard'],
    content: `Wine is fermented grape juice with rich cultural history.

**Wine Types:**
• **Red:** Made with grape skins (color, tannins)
• **White:** Usually without skins
• **Rosé:** Brief skin contact
• **Sparkling:** Contains bubbles (Champagne)
• **Dessert:** Sweet, often fortified

**Popular Red Varieties:**
• Cabernet Sauvignon: Full-bodied, bold
• Merlot: Medium-bodied, smooth
• Pinot Noir: Light, elegant
• Syrah/Shiraz: Spicy, rich
• Malbec: Dark, fruity

**Popular White Varieties:**
• Chardonnay: Full-bodied, versatile
• Sauvignon Blanc: Crisp, citrus
• Riesling: Aromatic, sweet to dry
• Pinot Grigio: Light, refreshing

**Tasting Terms:**
• Body: Light, medium, full
• Tannins: Drying sensation (reds)
• Acidity: Crispness
• Finish: Aftertaste duration

**Food Pairing Basics:**
• Red with red meat
• White with fish, chicken
• Match intensity of food and wine
• Regional pairings often work

**Serving:**
• Red: Room temp or slightly cool
• White: Chilled (45-50°F)
• Sparkling: Cold (40-45°F)
• Let reds breathe

**Storage:**
• Cool, dark place
• Horizontal for cork wines
• 55°F ideal
• Drink most wines young`
  },
  {
    topic: 'Yoga Introduction',
    category: 'wellness',
    keywords: ['yoga', 'pose', 'stretch', 'flexibility', 'asana'],
    content: `Yoga combines physical postures, breathing, and meditation.

**Benefits:**
• Improved flexibility
• Increased strength
• Better balance
• Stress reduction
• Mind-body connection

**Basic Poses:**
• **Mountain (Tadasana):** Standing, grounded
• **Downward Dog:** Inverted V-shape
• **Warrior I/II:** Lunging, arms raised
• **Child's Pose:** Resting, folded forward
• **Cat-Cow:** Spinal flexion/extension
• **Corpse (Savasana):** Final relaxation

**Yoga Styles:**
• **Hatha:** Gentle, foundational
• **Vinyasa:** Flow, breath-linked movement
• **Ashtanga:** Set sequence, vigorous
• **Yin:** Slow, deep stretches
• **Restorative:** Relaxation, props
• **Hot/Bikram:** Heated room

**Getting Started:**
• Start with beginner classes
• Use a mat
• Wear comfortable clothes
• Don't eat right before
• Listen to your body

**Breathing (Pranayama):**
• Ujjayi: Ocean breath
• Alternate nostril
• Breath awareness
• Connects mind and body

**Tips:**
• Consistency over intensity
• Props are helpful (blocks, straps)
• Don't compare to others
• Modify as needed
• Practice on empty stomach`
  },
  {
    topic: 'Astronomy Basics',
    category: 'science',
    keywords: ['astronomy', 'telescope', 'constellation', 'planet', 'stargazing'],
    content: `Astronomy is the study of celestial objects and the universe.

**Getting Started:**
• Learn the night sky
• Start with naked eye
• Use star charts or apps
• Find dark sky locations

**What to Observe:**
• Moon (craters, phases)
• Planets (visible to naked eye)
• Constellations
• Meteor showers
• Satellites (ISS)

**Equipment:**
• Binoculars: Great starter
• Telescope: More detail
• Star charts/apps
• Red flashlight (preserves night vision)

**Telescope Types:**
• Refractor: Lenses, good for planets
• Reflector: Mirrors, good for deep sky
• Compound: Both, versatile

**Constellations:**
• Orion: Easy to find, winter
• Big Dipper: Points to North Star
• Cassiopeia: W-shape
• Scorpius: Summer, southern sky

**Planets Visible:**
• Mercury, Venus: Near sun, bright
• Mars: Reddish
• Jupiter: Brightest planet, moons visible
• Saturn: Rings visible with telescope

**Best Practices:**
• Let eyes adapt (20-30 min)
• Check weather and moon phase
• New moon = darkest skies
• Dress warmly
• Be patient

**Meteor Showers:**
• Perseids (August)
• Geminids (December)
• Leonids (November)
• Best after midnight`
  },
];

// =============================================================================
// MORE TOPICS
// =============================================================================

export const MORE_TOPICS: KnowledgeEntry[] = [
  {
    topic: 'Sleep and Health',
    category: 'health',
    keywords: ['sleep', 'insomnia', 'rest', 'tired', 'bed', 'dream'],
    content: `Quality sleep is essential for physical and mental health.

**Sleep Needs:**
• Adults: 7-9 hours
• Teens: 8-10 hours
• Children: 9-12 hours
• Infants: 12-16 hours

**Sleep Stages:**
• Light sleep (N1, N2)
• Deep sleep (N3): Physical restoration
• REM sleep: Dreams, memory consolidation
• Cycles repeat 4-6 times nightly

**Benefits of Good Sleep:**
• Memory consolidation
• Physical recovery
• Immune function
• Emotional regulation
• Cognitive performance

**Sleep Hygiene Tips:**
• Consistent sleep schedule
• Dark, cool, quiet room
• Avoid screens before bed
• Limit caffeine after noon
• Regular exercise (not late)
• Comfortable mattress/pillow

**Common Sleep Problems:**
• Insomnia: Difficulty falling/staying asleep
• Sleep apnea: Breathing interruptions
• Restless leg syndrome
• Circadian rhythm disorders

**Improving Sleep:**
• Wind-down routine
• Avoid alcohol before bed
• Don't watch clock
• Get morning sunlight
• Limit naps to 20-30 min

**When to Seek Help:**
• Chronic insomnia
• Loud snoring
• Daytime sleepiness
• Difficulty functioning`
  },
  {
    topic: 'Recycling Guide',
    category: 'environment',
    keywords: ['recycle', 'recycling', 'waste', 'trash', 'environment', 'plastic'],
    content: `Recycling reduces waste and conserves resources.

**Common Recyclables:**
• Paper and cardboard
• Glass bottles and jars
• Metal cans (aluminum, steel)
• Plastic bottles (#1 and #2)
• Cartons (milk, juice)

**Not Usually Recyclable:**
• Plastic bags (return to stores)
• Styrofoam
• Food-contaminated items
• Ceramics and mirrors
• Electronics (special recycling)

**Recycling Tips:**
• Rinse containers
• Remove caps (check local rules)
• Flatten cardboard
• Keep materials dry
• Don't bag recyclables

**Plastic Numbers:**
• #1 (PETE): Water bottles - recyclable
• #2 (HDPE): Milk jugs - recyclable
• #3-7: Check local guidelines

**Reduce and Reuse First:**
• Bring reusable bags
• Use refillable water bottles
• Choose products with less packaging
• Donate usable items
• Repair before replacing

**Special Recycling:**
• Electronics: E-waste centers
• Batteries: Special collection
• Light bulbs: Hardware stores
• Medications: Pharmacy take-back

**Benefits:**
• Conserves natural resources
• Saves energy
• Reduces landfill waste
• Decreases pollution
• Creates jobs`
  },
  {
    topic: 'Basic First Aid',
    category: 'health',
    keywords: ['first aid', 'emergency', 'injury', 'bandage', 'wound'],
    content: `Basic first aid knowledge can save lives.

**First Aid Kit Essentials:**
• Adhesive bandages (various sizes)
• Sterile gauze pads
• Medical tape
• Antiseptic wipes
• Antibiotic ointment
• Tweezers and scissors
• Disposable gloves
• Pain relievers
• Emergency contact info

**Minor Cuts and Scrapes:**
1. Wash hands
2. Stop bleeding with pressure
3. Clean wound with water
4. Apply antibiotic ointment
5. Cover with bandage
6. Change bandage daily

**Burns:**
• Cool with running water (10-20 min)
• Don't use ice or butter
• Cover loosely
• Don't pop blisters
• Seek help for severe burns

**Sprains:**
• RICE: Rest, Ice, Compression, Elevation
• Ice 20 min on, 20 min off
• Wrap with elastic bandage
• Keep elevated
• See doctor if severe

**Nosebleeds:**
• Sit upright, lean forward
• Pinch soft part of nose
• Hold 10-15 minutes
• Don't tilt head back
• Seek help if prolonged

**Choking (Conscious Adult):**
• Ask "Are you choking?"
• Stand behind, arms around waist
• Make fist above navel
• Quick upward thrusts
• Repeat until cleared

**When to Call 911:**
• Difficulty breathing
• Chest pain
• Severe bleeding
• Loss of consciousness
• Suspected stroke or heart attack`
  },
  {
    topic: 'Budgeting Basics',
    category: 'finance',
    keywords: ['budget', 'money', 'save', 'spend', 'finance', 'expenses'],
    content: `Budgeting helps you control your money and reach financial goals.

**Why Budget:**
• Know where money goes
• Avoid overspending
• Save for goals
• Reduce financial stress
• Build wealth over time

**50/30/20 Rule:**
• 50% Needs: Housing, food, utilities, insurance
• 30% Wants: Entertainment, dining out, hobbies
• 20% Savings: Emergency fund, retirement, debt

**Creating a Budget:**
1. Calculate monthly income
2. List fixed expenses
3. Track variable expenses
4. Set spending limits
5. Plan for savings
6. Review and adjust

**Tracking Methods:**
• Spreadsheet
• Budgeting apps (Mint, YNAB)
• Envelope system (cash)
• Pen and paper

**Cutting Expenses:**
• Review subscriptions
• Cook at home more
• Shop with a list
• Compare prices
• Use coupons/cashback

**Building Emergency Fund:**
• Start with $1,000
• Goal: 3-6 months expenses
• Keep in savings account
• Only for true emergencies

**Common Mistakes:**
• Not tracking spending
• Forgetting irregular expenses
• Being too restrictive
• Not adjusting as needed
• Giving up after slip-ups

**Tips:**
• Automate savings
• Pay yourself first
• Use cash for problem areas
• Review budget monthly
• Celebrate progress`
  },
];

// Add final additional topics
ALL_KNOWLEDGE.push(
  ...ADDITIONAL_TOPICS,
  ...MORE_TOPICS
);

// =============================================================================
// ADVANCED PROGRAMMING CONCEPTS
// =============================================================================

export const ADVANCED_PROGRAMMING: KnowledgeEntry[] = [
  {
    topic: 'Design Patterns',
    category: 'programming',
    keywords: ['design pattern', 'singleton', 'factory', 'observer', 'strategy', 'software design'],
    content: `Design patterns are reusable solutions to common software design problems.

**Creational Patterns:**

**Singleton:**
• Ensures only one instance of a class exists
• Global point of access
• Use for: Database connections, configuration, logging
• Example: \`class Singleton { static instance; static getInstance() { if (!this.instance) this.instance = new Singleton(); return this.instance; } }\`
• Caution: Can make testing harder

**Factory Method:**
• Creates objects without specifying exact class
• Subclasses decide which class to instantiate
• Use for: When creation logic is complex
• Promotes loose coupling
• Example: \`createShape(type) { if (type === 'circle') return new Circle(); }\`

**Abstract Factory:**
• Creates families of related objects
• Without specifying concrete classes
• Use for: Cross-platform UI components
• Groups related factories together

**Builder:**
• Constructs complex objects step by step
• Separates construction from representation
• Use for: Objects with many optional parameters
• Example: \`new QueryBuilder().select('name').from('users').where('age > 18').build()\`

**Prototype:**
• Creates new objects by cloning existing ones
• Avoids costly creation operations
• Use for: When object creation is expensive
• JavaScript uses prototypal inheritance natively

**Structural Patterns:**

**Adapter:**
• Makes incompatible interfaces work together
• Wraps existing class with new interface
• Use for: Legacy code integration
• Like a power adapter for different outlets

**Decorator:**
• Adds behavior to objects dynamically
• Without modifying original class
• Use for: Adding features without subclassing
• Example: Adding logging, caching, validation

**Facade:**
• Provides simplified interface to complex subsystem
• Hides complexity behind simple API
• Use for: Libraries, complex systems
• Example: jQuery simplifies DOM manipulation

**Proxy:**
• Controls access to another object
• Can add lazy loading, access control, logging
• Use for: Virtual proxies, protection proxies
• Example: Image lazy loading

**Composite:**
• Treats individual objects and compositions uniformly
• Tree structure of objects
• Use for: File systems, UI components
• Part-whole hierarchies

**Behavioral Patterns:**

**Observer:**
• One-to-many dependency between objects
• When one changes, all dependents are notified
• Use for: Event systems, pub/sub
• Example: addEventListener in DOM

**Strategy:**
• Defines family of algorithms
• Makes them interchangeable
• Use for: Different sorting, validation, pricing strategies
• Encapsulates what varies

**Command:**
• Encapsulates request as an object
• Supports undo/redo operations
• Use for: Transaction systems, macro recording
• Decouples sender from receiver

**Iterator:**
• Provides way to access elements sequentially
• Without exposing underlying representation
• Use for: Collections, custom data structures
• JavaScript: Symbol.iterator, for...of

**State:**
• Object behavior changes based on internal state
• Appears to change its class
• Use for: Finite state machines, UI states
• Alternative to large if/else chains`
  },
  {
    topic: 'Data Structures In Depth',
    category: 'programming',
    keywords: ['data structure', 'array', 'linked list', 'tree', 'hash', 'graph', 'stack', 'queue'],
    content: `Data structures organize and store data for efficient access and modification.

**Arrays:**
• Contiguous memory allocation
• O(1) access by index
• O(n) insertion/deletion (shifting)
• Fixed size (static) or dynamic
• Best for: Random access, iteration

**Linked Lists:**
• Nodes with data and pointer to next
• **Singly linked:** Forward traversal only
• **Doubly linked:** Forward and backward
• O(1) insertion/deletion at known position
• O(n) search (no random access)
• Best for: Frequent insertions/deletions

**Stacks:**
• Last In, First Out (LIFO)
• Operations: push, pop, peek
• All O(1) operations
• Use for: Undo systems, expression evaluation, call stack
• Implementation: Array or linked list

**Queues:**
• First In, First Out (FIFO)
• Operations: enqueue, dequeue, peek
• All O(1) operations
• Use for: Task scheduling, BFS, print queue
• Variants: Priority queue, deque, circular queue

**Hash Tables (Hash Maps):**
• Key-value pairs
• O(1) average lookup, insert, delete
• Hash function maps keys to indices
• Collision handling: Chaining, open addressing
• Use for: Caches, dictionaries, counting
• JavaScript: Object, Map

**Trees:**
• Hierarchical structure
• Root, nodes, leaves
• **Binary Tree:** Max 2 children per node
• **Binary Search Tree (BST):**
  - Left child < parent < right child
  - O(log n) search, insert, delete (balanced)
  - O(n) worst case (unbalanced)
• **AVL Tree:** Self-balancing BST
• **Red-Black Tree:** Self-balancing with color properties
• **B-Tree:** Used in databases, file systems

**Heaps:**
• Complete binary tree
• **Min-heap:** Parent ≤ children
• **Max-heap:** Parent ≥ children
• O(1) find min/max
• O(log n) insert, delete
• Use for: Priority queues, heap sort

**Graphs:**
• Vertices (nodes) and edges (connections)
• **Directed:** One-way edges
• **Undirected:** Two-way edges
• **Weighted:** Edges have values
• Representations: Adjacency matrix, adjacency list
• Traversal: BFS (breadth-first), DFS (depth-first)
• Use for: Social networks, maps, routing

**Tries (Prefix Trees):**
• Tree for storing strings
• Each node represents a character
• O(m) search where m = string length
• Use for: Autocomplete, spell checking, IP routing

**Big O Summary:**
• Array access: O(1)
• Array search: O(n)
• BST search: O(log n)
• Hash table lookup: O(1) average
• Linked list access: O(n)
• Heap insert: O(log n)
• Graph BFS/DFS: O(V + E)`
  },
  {
    topic: 'Algorithms Deep Dive',
    category: 'programming',
    keywords: ['algorithm', 'sorting', 'searching', 'dynamic programming', 'recursion', 'big o'],
    content: `Algorithms are step-by-step procedures for solving problems.

**Sorting Algorithms:**

**Bubble Sort:**
• Compare adjacent elements, swap if needed
• O(n²) time, O(1) space
• Simple but inefficient
• Good for: Nearly sorted data

**Selection Sort:**
• Find minimum, place at beginning
• O(n²) time, O(1) space
• Fewer swaps than bubble sort

**Insertion Sort:**
• Build sorted array one element at a time
• O(n²) worst, O(n) best (nearly sorted)
• Good for: Small or nearly sorted arrays

**Merge Sort:**
• Divide and conquer
• Split array, sort halves, merge
• O(n log n) time, O(n) space
• Stable sort, consistent performance

**Quick Sort:**
• Divide and conquer with pivot
• O(n log n) average, O(n²) worst
• O(log n) space
• Usually fastest in practice

**Heap Sort:**
• Build max-heap, extract elements
• O(n log n) time, O(1) space
• Not stable, but in-place

**Searching Algorithms:**

**Linear Search:**
• Check each element sequentially
• O(n) time
• Works on unsorted data

**Binary Search:**
• Divide sorted array in half repeatedly
• O(log n) time
• Requires sorted data
• Very efficient for large datasets

**Recursion:**
• Function calls itself
• Base case stops recursion
• Call stack stores state
• Examples: Factorial, Fibonacci, tree traversal
• Can cause stack overflow if too deep
• Tail recursion optimization

**Dynamic Programming:**
• Break problem into overlapping subproblems
• Store results to avoid recomputation
• **Memoization:** Top-down (cache results)
• **Tabulation:** Bottom-up (build table)
• Examples: Fibonacci, knapsack, longest common subsequence
• Key: Optimal substructure + overlapping subproblems

**Greedy Algorithms:**
• Make locally optimal choice at each step
• Hope to find global optimum
• Examples: Dijkstra's, Huffman coding, coin change
• Not always optimal but often efficient

**Graph Algorithms:**
• **BFS:** Level-by-level traversal, shortest path (unweighted)
• **DFS:** Explore as deep as possible first
• **Dijkstra's:** Shortest path (weighted, non-negative)
• **Bellman-Ford:** Shortest path (handles negative weights)
• **Kruskal's/Prim's:** Minimum spanning tree
• **Topological Sort:** Order dependencies

**Complexity Classes:**
• O(1): Constant - hash table lookup
• O(log n): Logarithmic - binary search
• O(n): Linear - linear search
• O(n log n): Linearithmic - merge sort
• O(n²): Quadratic - bubble sort
• O(2^n): Exponential - recursive Fibonacci
• O(n!): Factorial - permutations`
  },
  {
    topic: 'TypeScript Advanced',
    category: 'programming',
    keywords: ['typescript', 'types', 'generics', 'interface', 'enum', 'type guard'],
    content: `TypeScript adds static typing to JavaScript for better developer experience.

**Basic Types:**
• string, number, boolean
• null, undefined, void
• any, unknown, never
• Array<T> or T[]
• Tuple: [string, number]

**Interfaces:**
\`\`\`
interface User {
  name: string;
  age: number;
  email?: string; // optional
  readonly id: number; // immutable
}
\`\`\`

**Type Aliases:**
\`\`\`
type Point = { x: number; y: number };
type ID = string | number; // union
type Status = 'active' | 'inactive'; // literal
\`\`\`

**Generics:**
• Reusable components that work with multiple types
\`\`\`
function identity<T>(arg: T): T { return arg; }
interface Box<T> { value: T; }
\`\`\`
• Constraints: \`<T extends HasLength>\`
• Default types: \`<T = string>\`

**Utility Types:**
• Partial<T>: All properties optional
• Required<T>: All properties required
• Readonly<T>: All properties readonly
• Pick<T, K>: Select specific properties
• Omit<T, K>: Exclude specific properties
• Record<K, V>: Key-value mapping
• ReturnType<T>: Function return type
• Parameters<T>: Function parameter types

**Type Guards:**
• typeof: \`if (typeof x === 'string')\`
• instanceof: \`if (x instanceof Date)\`
• in: \`if ('name' in obj)\`
• Custom: \`function isUser(x: any): x is User\`

**Enums:**
\`\`\`
enum Direction { Up, Down, Left, Right }
enum Color { Red = 'RED', Blue = 'BLUE' }
\`\`\`

**Advanced Types:**
• Intersection: \`type A = B & C\`
• Conditional: \`type IsString<T> = T extends string ? true : false\`
• Mapped: \`type Optional<T> = { [K in keyof T]?: T[K] }\`
• Template literal: \`type Event = \\\`on\${string}\\\`\`

**Declaration Files:**
• .d.ts files for type definitions
• @types packages for libraries
• declare module for untyped packages

**Best Practices:**
• Avoid \`any\`, use \`unknown\` instead
• Use strict mode
• Prefer interfaces for objects
• Use type for unions/intersections
• Enable strict null checks`
  },
  {
    topic: 'React Advanced Patterns',
    category: 'programming',
    keywords: ['react', 'hooks', 'context', 'redux', 'component', 'state management'],
    content: `Advanced React patterns for building scalable applications.

**Hooks In Depth:**

**useState:**
• State management in functional components
• Lazy initialization: \`useState(() => expensiveCalc())\`
• Functional updates: \`setState(prev => prev + 1)\`

**useEffect:**
• Side effects in components
• Dependency array controls when it runs
• Cleanup function for subscriptions
• Empty array = run once (mount)

**useCallback:**
• Memoize functions
• Prevents unnecessary re-renders
• Use when passing callbacks to children
• \`const fn = useCallback(() => {}, [deps])\`

**useMemo:**
• Memoize computed values
• Expensive calculations
• \`const value = useMemo(() => compute(a, b), [a, b])\`

**useRef:**
• Mutable reference that persists across renders
• DOM element access
• Previous value tracking
• Doesn't trigger re-render

**useReducer:**
• Complex state logic
• Multiple sub-values
• State machine pattern
• \`const [state, dispatch] = useReducer(reducer, initialState)\`

**Custom Hooks:**
• Extract reusable logic
• Must start with "use"
• Can use other hooks
• Examples: useLocalStorage, useFetch, useDebounce

**Context API:**
• Avoid prop drilling
• Global state for theme, auth, language
• createContext + Provider + useContext
• Performance: Split contexts, memoize values

**Component Patterns:**

**Compound Components:**
• Components that work together
• Implicit state sharing
• Example: Select + Option

**Render Props:**
• Share code via prop that is a function
• \`<DataProvider render={data => <Display data={data} />} />\`

**Higher-Order Components (HOC):**
• Function that takes component, returns enhanced component
• \`const Enhanced = withAuth(MyComponent)\`
• Being replaced by hooks

**Performance:**
• React.memo for component memoization
• Code splitting with React.lazy + Suspense
• Virtualization for long lists
• Avoid inline objects/functions in JSX
• Use React DevTools Profiler

**State Management:**
• Local state: useState, useReducer
• Context: Shared state without prop drilling
• Redux: Predictable state container
• Zustand: Lightweight alternative
• React Query/TanStack Query: Server state`
  },
  {
    topic: 'Database Concepts',
    category: 'programming',
    keywords: ['database', 'sql', 'nosql', 'query', 'schema', 'index', 'normalization'],
    content: `Databases store, organize, and manage data efficiently.

**Relational Databases (SQL):**
• Data in tables with rows and columns
• Structured schema
• ACID properties (Atomicity, Consistency, Isolation, Durability)
• Examples: PostgreSQL, MySQL, SQLite, SQL Server

**SQL Basics:**
\`\`\`
SELECT name, age FROM users WHERE age > 18 ORDER BY name;
INSERT INTO users (name, age) VALUES ('Alice', 25);
UPDATE users SET age = 26 WHERE name = 'Alice';
DELETE FROM users WHERE age < 18;
\`\`\`

**Joins:**
• INNER JOIN: Matching rows in both tables
• LEFT JOIN: All from left, matching from right
• RIGHT JOIN: All from right, matching from left
• FULL JOIN: All rows from both tables
• CROSS JOIN: Cartesian product

**Normalization:**
• 1NF: Atomic values, no repeating groups
• 2NF: 1NF + no partial dependencies
• 3NF: 2NF + no transitive dependencies
• Reduces redundancy, improves integrity
• Trade-off: More joins needed

**Indexes:**
• Speed up data retrieval
• B-tree most common
• Trade-off: Slower writes, more storage
• Index on frequently queried columns
• Composite indexes for multi-column queries

**NoSQL Databases:**
• **Document:** MongoDB, CouchDB (JSON-like)
• **Key-Value:** Redis, DynamoDB (simple, fast)
• **Column-Family:** Cassandra, HBase (wide columns)
• **Graph:** Neo4j, ArangoDB (relationships)

**When to Use NoSQL:**
• Flexible schema needed
• Horizontal scaling required
• High write throughput
• Unstructured/semi-structured data
• Rapid development

**Database Design:**
• Identify entities and relationships
• Define primary and foreign keys
• Choose appropriate data types
• Plan for indexing
• Consider query patterns

**Transactions:**
• Group operations as atomic unit
• BEGIN, COMMIT, ROLLBACK
• Isolation levels control concurrency
• Important for data integrity

**ORMs:**
• Object-Relational Mapping
• Code objects map to database tables
• Examples: Prisma, Sequelize, TypeORM, SQLAlchemy
• Pros: Productivity, type safety
• Cons: Performance overhead, abstraction leaks`
  },
  {
    topic: 'Web Security',
    category: 'programming',
    keywords: ['security', 'xss', 'csrf', 'sql injection', 'authentication', 'encryption', 'https'],
    content: `Web security protects applications and users from attacks.

**Common Vulnerabilities:**

**Cross-Site Scripting (XSS):**
• Injecting malicious scripts into web pages
• Types: Stored, Reflected, DOM-based
• Prevention: Sanitize input, encode output, CSP headers
• Use frameworks that auto-escape (React, Angular)

**SQL Injection:**
• Injecting SQL through user input
• Can read/modify/delete database data
• Prevention: Parameterized queries, prepared statements
• Never concatenate user input into SQL

**Cross-Site Request Forgery (CSRF):**
• Tricks user into performing unwanted actions
• Exploits authenticated session
• Prevention: CSRF tokens, SameSite cookies
• Verify origin/referer headers

**Authentication Best Practices:**
• Hash passwords (bcrypt, argon2)
• Never store plain text passwords
• Multi-factor authentication (MFA)
• Rate limiting on login attempts
• Secure session management
• JWT best practices (short expiry, refresh tokens)

**Authorization:**
• Role-based access control (RBAC)
• Attribute-based access control (ABAC)
• Principle of least privilege
• Check permissions server-side
• Never trust client-side checks alone

**HTTPS:**
• Encrypts data in transit
• SSL/TLS certificates
• Prevents man-in-the-middle attacks
• Required for sensitive data
• Use HSTS headers

**Security Headers:**
• Content-Security-Policy (CSP)
• X-Content-Type-Options: nosniff
• X-Frame-Options: DENY
• Strict-Transport-Security
• X-XSS-Protection

**Input Validation:**
• Validate on both client and server
• Whitelist over blacklist
• Sanitize HTML input
• Validate file uploads
• Limit input length

**API Security:**
• Use API keys or OAuth
• Rate limiting
• Input validation
• CORS configuration
• Don't expose sensitive data

**OWASP Top 10:**
1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Authentication Failures
8. Data Integrity Failures
9. Logging Failures
10. Server-Side Request Forgery`
  },
  {
    topic: 'DevOps and CI/CD',
    category: 'programming',
    keywords: ['devops', 'ci cd', 'docker', 'kubernetes', 'deployment', 'pipeline', 'container'],
    content: `DevOps combines development and operations for faster, reliable delivery.

**Core Principles:**
• Automation of processes
• Continuous integration and delivery
• Infrastructure as code
• Monitoring and logging
• Collaboration between teams

**CI/CD Pipeline:**
• **Continuous Integration:** Merge code frequently, run tests
• **Continuous Delivery:** Automated release to staging
• **Continuous Deployment:** Automated release to production
• Tools: GitHub Actions, Jenkins, GitLab CI, CircleCI

**Docker:**
• Containerization platform
• Package app with dependencies
• Consistent across environments
• Dockerfile defines image
• docker-compose for multi-container apps
• Lightweight vs VMs

**Kubernetes (K8s):**
• Container orchestration
• Manages deployment, scaling, networking
• Pods: Smallest deployable unit
• Services: Expose pods to network
• Deployments: Manage pod replicas
• ConfigMaps/Secrets: Configuration

**Infrastructure as Code (IaC):**
• Define infrastructure in code files
• Version controlled
• Reproducible environments
• Tools: Terraform, CloudFormation, Pulumi
• Ansible for configuration management

**Cloud Providers:**
• AWS: Most services, largest market share
• Azure: Microsoft ecosystem, enterprise
• GCP: Google services, data/ML
• Services: Compute, storage, databases, networking

**Monitoring:**
• Application performance monitoring (APM)
• Log aggregation (ELK stack, Datadog)
• Metrics and alerting (Prometheus, Grafana)
• Health checks and uptime monitoring
• Error tracking (Sentry)

**Version Control Workflow:**
• Git flow: Feature branches, develop, main
• Trunk-based: Short-lived branches, frequent merges
• Pull requests for code review
• Semantic versioning (major.minor.patch)

**Best Practices:**
• Automate everything possible
• Test at every stage
• Deploy small, deploy often
• Roll back quickly if issues
• Document processes
• Security scanning in pipeline`
  },
  {
    topic: 'Mobile Development',
    category: 'programming',
    keywords: ['mobile', 'ios', 'android', 'react native', 'flutter', 'app development'],
    content: `Mobile development creates applications for smartphones and tablets.

**Approaches:**

**Native Development:**
• iOS: Swift/Objective-C, Xcode
• Android: Kotlin/Java, Android Studio
• Best performance and platform integration
• Separate codebases per platform
• Access to all device features

**Cross-Platform:**
• **React Native:** JavaScript/TypeScript, React-based
  - Large community, Meta-backed
  - Native components
  - Hot reloading
  - Expo for easier setup
• **Flutter:** Dart language, Google-backed
  - Custom rendering engine
  - Beautiful UI out of the box
  - Growing ecosystem
  - Single codebase
• **Xamarin:** C#, Microsoft
  - .NET ecosystem
  - Good for enterprise

**Progressive Web Apps (PWA):**
• Web technologies (HTML, CSS, JS)
• Installable, offline capable
• Service workers for caching
• Push notifications
• No app store needed

**Key Concepts:**

**Navigation:**
• Stack navigation (push/pop screens)
• Tab navigation (bottom tabs)
• Drawer navigation (side menu)
• Deep linking

**State Management:**
• Local component state
• Context/Provider pattern
• Redux, MobX, Zustand
• Server state (React Query)

**Data Storage:**
• AsyncStorage (key-value)
• SQLite (relational)
• Realm (object database)
• Secure storage for credentials

**Performance:**
• Minimize re-renders
• Optimize images
• Lazy loading
• Memory management
• Profile with dev tools

**App Store Guidelines:**
• Apple: Strict review process
• Google Play: More lenient
• Both require privacy policies
• In-app purchase rules
• Content guidelines

**Testing:**
• Unit tests (Jest)
• Integration tests
• E2E tests (Detox, Appium)
• Device testing
• Beta testing (TestFlight, Play Console)`
  },
  {
    topic: 'Machine Learning Basics',
    category: 'programming',
    keywords: ['machine learning', 'ai', 'neural network', 'deep learning', 'model', 'training'],
    content: `Machine learning enables computers to learn from data without explicit programming.

**Types of ML:**

**Supervised Learning:**
• Labeled training data
• Learn input → output mapping
• **Classification:** Predict categories (spam/not spam)
• **Regression:** Predict continuous values (house prices)
• Examples: Linear regression, decision trees, SVM, neural networks

**Unsupervised Learning:**
• No labels, find patterns
• **Clustering:** Group similar data (K-means, DBSCAN)
• **Dimensionality Reduction:** Simplify data (PCA, t-SNE)
• **Association:** Find rules (market basket analysis)

**Reinforcement Learning:**
• Agent learns through trial and error
• Rewards and penalties
• Examples: Game AI, robotics, self-driving cars
• Q-learning, policy gradient methods

**Key Concepts:**

**Training Process:**
1. Collect and prepare data
2. Choose model architecture
3. Train on training data
4. Validate on validation data
5. Test on test data
6. Deploy and monitor

**Overfitting vs Underfitting:**
• Overfitting: Too complex, memorizes training data
• Underfitting: Too simple, can't capture patterns
• Solutions: Regularization, more data, cross-validation

**Feature Engineering:**
• Selecting relevant input variables
• Creating new features from existing
• Normalization/standardization
• Handling missing values
• Encoding categorical variables

**Neural Networks:**
• Inspired by biological neurons
• Layers: Input, hidden, output
• Activation functions: ReLU, sigmoid, softmax
• Backpropagation for training
• Deep learning = many hidden layers

**Common Architectures:**
• **CNN:** Image recognition, computer vision
• **RNN/LSTM:** Sequential data, text, time series
• **Transformer:** NLP, attention mechanism (GPT, BERT)
• **GAN:** Generate realistic data (images)
• **Autoencoder:** Compression, anomaly detection

**Tools and Libraries:**
• Python: Primary language
• TensorFlow/Keras: Google's ML framework
• PyTorch: Facebook's ML framework
• scikit-learn: Classical ML algorithms
• Pandas/NumPy: Data manipulation

**Evaluation Metrics:**
• Accuracy, precision, recall, F1-score
• Confusion matrix
• ROC curve, AUC
• Mean squared error (regression)
• Cross-validation`
  },
];

ALL_KNOWLEDGE.push(...ADVANCED_PROGRAMMING);

// =============================================================================
// WORLD HISTORY DEEP DIVE
// =============================================================================

export const WORLD_HISTORY_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Ancient Egypt',
    category: 'history',
    keywords: ['egypt', 'pharaoh', 'pyramid', 'nile', 'hieroglyphics', 'ancient'],
    content: `Ancient Egypt was one of the greatest civilizations in human history.

**Timeline:**
• Old Kingdom (2686-2181 BCE): Pyramid building era
• Middle Kingdom (2055-1650 BCE): Cultural golden age
• New Kingdom (1550-1069 BCE): Empire expansion
• Ptolemaic Period (305-30 BCE): Greek rule
• Roman conquest: 30 BCE

**Geography:**
• Nile River: Lifeline of civilization
• Annual flooding deposited fertile soil
• Upper Egypt (south) and Lower Egypt (north)
• Desert on both sides provided protection
• Mediterranean coast for trade

**Pyramids:**
• Great Pyramid of Giza: Built for Khufu
• One of Seven Wonders of the Ancient World
• 2.3 million stone blocks
• Took ~20 years to build
• Precise astronomical alignment
• Sphinx guards the complex

**Pharaohs:**
• Considered living gods
• Wore double crown (Upper + Lower Egypt)
• Famous: Tutankhamun, Ramesses II, Cleopatra
• Hatshepsut: One of few female pharaohs
• Akhenaten: Introduced monotheism briefly

**Writing:**
• Hieroglyphics: Sacred carved writing
• Hieratic: Simplified for daily use
• Demotic: Even more simplified
• Rosetta Stone: Key to decipherment (1822)
• Papyrus: Writing material from reeds

**Religion:**
• Polytheistic (many gods)
• Ra (sun god), Osiris (afterlife), Isis (magic)
• Anubis (death), Horus (sky), Thoth (wisdom)
• Afterlife was central belief
• Mummification preserved bodies
• Book of the Dead guided souls

**Achievements:**
• Advanced mathematics and astronomy
• Medicine and surgery
• Architecture and engineering
• Calendar system (365 days)
• Irrigation systems
• Glass-making, cosmetics`
  },
  {
    topic: 'Ancient Greece',
    category: 'history',
    keywords: ['greece', 'greek', 'athens', 'sparta', 'democracy', 'philosophy', 'ancient'],
    content: `Ancient Greece laid the foundations for Western civilization.

**Timeline:**
• Archaic Period (800-480 BCE): City-states form
• Classical Period (480-323 BCE): Golden Age
• Hellenistic Period (323-31 BCE): After Alexander

**City-States (Polis):**
• Independent political units
• Athens: Democracy, philosophy, arts
• Sparta: Military society, discipline
• Corinth: Trade and commerce
• Thebes: Military power

**Athenian Democracy:**
• Direct democracy (citizens vote on laws)
• Assembly (Ekklesia): All male citizens
• Council of 500: Proposed legislation
• Jury courts: Large citizen juries
• Limited: Only free adult males
• Excluded: Women, slaves, foreigners

**Philosophy:**
• **Socrates:** Questioning method, ethics
• **Plato:** Republic, Theory of Forms, Academy
• **Aristotle:** Logic, science, politics, Lyceum
• Stoicism, Epicureanism, Cynicism
• Foundation of Western thought

**Arts and Architecture:**
• Parthenon: Temple to Athena
• Three orders: Doric, Ionic, Corinthian
• Theater: Tragedy and comedy
• Sophocles, Euripides, Aristophanes
• Sculpture: Idealized human form

**Persian Wars (499-449 BCE):**
• Greece vs Persian Empire
• Marathon (490 BCE): Athenian victory
• Thermopylae (480 BCE): 300 Spartans
• Salamis (480 BCE): Naval victory
• United Greek city-states

**Peloponnesian War (431-404 BCE):**
• Athens vs Sparta
• Lasted 27 years
• Plague devastated Athens
• Sparta ultimately won
• Weakened all Greek city-states

**Alexander the Great:**
• King of Macedon (356-323 BCE)
• Conquered Persian Empire
• Spread Greek culture (Hellenism)
• Empire from Greece to India
• Died at 32, empire divided

**Legacy:**
• Democracy, philosophy, science
• Olympic Games (776 BCE)
• Literature, theater, art
• Mathematics (Euclid, Pythagoras)
• Medicine (Hippocrates)
• Architecture and engineering`
  },
  {
    topic: 'Roman Empire',
    category: 'history',
    keywords: ['rome', 'roman', 'caesar', 'empire', 'republic', 'gladiator', 'ancient'],
    content: `The Roman Empire was one of the largest and most influential empires in history.

**Timeline:**
• Roman Kingdom (753-509 BCE)
• Roman Republic (509-27 BCE)
• Roman Empire (27 BCE-476 CE Western)
• Eastern Roman/Byzantine (330-1453 CE)

**Republic:**
• Senate: Patrician advisory body
• Consuls: Two elected leaders
• Tribunes: Protected plebeian rights
• Expansion through Italy, then Mediterranean
• Punic Wars against Carthage (Hannibal)

**Julius Caesar:**
• Military genius, conquered Gaul
• Crossed the Rubicon (49 BCE)
• Became dictator
• Assassinated March 15, 44 BCE (Ides of March)
• Calendar reform (Julian calendar)

**Empire:**
• Augustus (first emperor, 27 BCE)
• Pax Romana: 200 years of peace
• Peak territory under Trajan (117 CE)
• Mediterranean = "Roman Lake"
• ~70 million people at peak

**Government and Law:**
• Roman law: Foundation of Western legal systems
• Citizenship rights
• Provincial governance
• Census and taxation
• Twelve Tables: Written law code

**Engineering:**
• Roads: 250,000+ miles, connected empire
• Aqueducts: Water supply to cities
• Concrete: Revolutionary building material
• Colosseum: 50,000 spectators
• Pantheon: Unreinforced concrete dome

**Military:**
• Legions: ~5,000 soldiers each
• Professional army
• Superior tactics and discipline
• Siege warfare expertise
• Built roads and fortifications

**Culture:**
• Latin language (basis for Romance languages)
• Literature: Virgil, Ovid, Cicero
• Gladiatorial games
• Public baths and forums
• Adoption of Greek culture

**Fall of Western Rome (476 CE):**
• Economic decline
• Military overextension
• Barbarian invasions
• Political instability
• Division into East and West
• Eastern Empire continued as Byzantine`
  },
  {
    topic: 'Medieval Europe',
    category: 'history',
    keywords: ['medieval', 'middle ages', 'knight', 'castle', 'feudalism', 'crusade'],
    content: `The Medieval period (500-1500 CE) shaped European civilization.

**Early Middle Ages (500-1000):**
• Fall of Western Roman Empire
• Germanic kingdoms emerge
• Charlemagne's Frankish Empire (800 CE)
• Viking raids and expansion
• Spread of Christianity

**Feudal System:**
• King → Lords → Knights → Peasants/Serfs
• Land (fiefs) exchanged for loyalty and service
• Manorialism: Economic system
• Serfs bound to land
• Mutual obligations

**The Church:**
• Most powerful institution
• Pope: Head of Catholic Church
• Monasteries: Centers of learning
• Tithes: 10% tax to church
• Excommunication as political tool
• Preserved classical knowledge

**Castles:**
• Defensive fortifications
• Motte and bailey → stone castles
• Features: Moat, drawbridge, keep, battlements
• Centers of local power
• Evolved with siege technology

**Crusades (1096-1291):**
• Religious wars for Holy Land
• First Crusade: Captured Jerusalem (1099)
• Multiple crusades over 200 years
• Cultural exchange with Islamic world
• Increased trade and knowledge transfer
• Military orders: Templars, Hospitallers

**Black Death (1347-1351):**
• Bubonic plague killed 30-60% of Europe
• Spread via fleas on rats
• Massive social upheaval
• Labor shortage → better conditions for survivors
• Questioned religious authority

**Late Middle Ages:**
• Hundred Years' War (England vs France)
• Joan of Arc
• Rise of nation-states
• Universities founded
• Gothic architecture (cathedrals)
• Magna Carta (1215): Limited royal power

**Daily Life:**
• Most people were farmers
• Short life expectancy (~35 years)
• Limited literacy
• Guilds controlled trades
• Markets and fairs for commerce
• Festivals and religious holidays`
  },
  {
    topic: 'Renaissance',
    category: 'history',
    keywords: ['renaissance', 'art', 'da vinci', 'michelangelo', 'florence', 'rebirth'],
    content: `The Renaissance (14th-17th century) was a cultural rebirth in Europe.

**Origins:**
• Started in Italian city-states (Florence)
• Rediscovery of classical Greek/Roman works
• Wealthy patrons (Medici family)
• Trade brought wealth and ideas
• Reaction to Medieval constraints

**Key Ideas:**
• Humanism: Focus on human potential
• Individualism: Personal achievement
• Secularism: Worldly concerns alongside religious
• Classical learning: Greek and Latin texts
• Scientific inquiry: Observation and reason

**Art:**
• **Leonardo da Vinci:** Mona Lisa, Last Supper, inventor
• **Michelangelo:** Sistine Chapel, David, St. Peter's
• **Raphael:** School of Athens
• **Botticelli:** Birth of Venus
• **Titian:** Color master, Venetian school

**Art Innovations:**
• Linear perspective: Depth on flat surface
• Chiaroscuro: Light and shadow
• Sfumato: Soft, smoky transitions
• Oil painting techniques
• Anatomical accuracy
• Realistic portraiture

**Science:**
• **Copernicus:** Heliocentric model (sun-centered)
• **Galileo:** Telescope, supported Copernicus
• **Vesalius:** Modern anatomy
• Scientific method developing
• Observation over tradition

**Literature:**
• **Dante:** Divine Comedy
• **Petrarch:** Father of Humanism
• **Machiavelli:** The Prince (political realism)
• **Shakespeare:** English Renaissance drama
• **Cervantes:** Don Quixote
• Vernacular languages in writing

**Printing Press (1440):**
• Johannes Gutenberg
• Movable type technology
• Books became affordable
• Spread of ideas accelerated
• Literacy increased
• Enabled Reformation

**Spread:**
• Italy → France → England → Northern Europe
• Each region developed unique style
• Northern Renaissance: Van Eyck, Dürer
• Lasted roughly 1350-1600
• Led into Age of Exploration`
  },
  {
    topic: 'Age of Exploration',
    category: 'history',
    keywords: ['exploration', 'columbus', 'magellan', 'navigation', 'new world', 'colonialism'],
    content: `The Age of Exploration (15th-17th century) connected the world.

**Motivations:**
• Gold: Wealth and resources
• God: Spread Christianity
• Glory: National prestige
• Spice trade: Direct route to Asia
• New trade routes needed

**Key Explorers:**
• **Columbus (1492):** Reached Americas for Spain
• **Vasco da Gama (1498):** Sea route to India
• **Magellan (1519-1522):** First circumnavigation
• **Cortés:** Conquered Aztec Empire
• **Pizarro:** Conquered Inca Empire
• **Drake:** English circumnavigation

**Technology:**
• Compass: Navigation aid
• Astrolabe: Determine latitude
• Caravel: Maneuverable ship
• Better maps and charts
• Gunpowder weapons

**Columbian Exchange:**
• Transfer of plants, animals, diseases between hemispheres
• To Americas: Horses, cattle, wheat, diseases
• From Americas: Potatoes, tomatoes, corn, chocolate, tobacco
• Diseases devastated indigenous populations
• Transformed global agriculture

**Colonial Empires:**
• Spain: Americas, Philippines
• Portugal: Brazil, Africa, Asia
• England: North America, India
• France: Canada, Caribbean, Africa
• Netherlands: Indonesia, Caribbean

**Impact on Indigenous Peoples:**
• Population collapse from disease (up to 90%)
• Forced labor and slavery
• Cultural destruction
• Loss of land and sovereignty
• Some resistance and adaptation

**Atlantic Slave Trade:**
• 12+ million Africans forcibly transported
• Triangle trade: Europe → Africa → Americas
• Lasted 16th-19th centuries
• Devastating impact on Africa
• Built wealth of colonial powers

**Legacy:**
• Global trade networks
• Cultural exchange and mixing
• Colonial exploitation
• Spread of languages and religions
• Foundation of modern globalization`
  },
  {
    topic: 'Industrial Revolution',
    category: 'history',
    keywords: ['industrial', 'revolution', 'factory', 'steam', 'invention', 'manufacturing'],
    content: `The Industrial Revolution (1760-1840) transformed society from agrarian to industrial.

**Origins in Britain:**
• Agricultural improvements freed labor
• Coal and iron resources
• Stable government and banking
• Colonial markets
• Culture of innovation

**Key Inventions:**
• **Spinning Jenny (1764):** Textile production
• **Water Frame (1769):** Water-powered spinning
• **Steam Engine (Watt, 1769):** Power source
• **Power Loom (1785):** Mechanized weaving
• **Cotton Gin (1793):** Cotton processing
• **Steam Locomotive (1804):** Transportation

**Factory System:**
• Centralized production
• Division of labor
• Wage labor replaced cottage industry
• Clock time regulated work
• Mass production began

**Transportation:**
• Canals: Cheap bulk transport
• Railways: Faster, more flexible
• Steamships: Ocean trade
• Roads improved (macadam)
• Connected markets and resources

**Social Changes:**
• Urbanization: Rural to city migration
• New social classes: Industrial middle class, working class
• Child labor widespread
• Poor working conditions
• Long hours (12-16 hour days)

**Labor Movement:**
• Trade unions formed
• Strikes and protests
• Factory Acts limited child labor
• Gradual improvements
• Chartism: Political reform movement

**Second Industrial Revolution (1870-1914):**
• Electricity and electric light
• Internal combustion engine
• Telephone and telegraph
• Steel production (Bessemer process)
• Chemical industry
• Assembly line (Ford)

**Global Impact:**
• Spread to Europe, US, Japan
• Imperialism driven by industrial needs
• Environmental degradation began
• Population growth
• Standard of living eventually improved
• Foundation of modern economy`
  },
];

ALL_KNOWLEDGE.push(...WORLD_HISTORY_DEEP);

// =============================================================================
// SCIENCE DEEP DIVE EXTENDED
// =============================================================================

export const SCIENCE_DEEP_EXTENDED: KnowledgeEntry[] = [
  {
    topic: 'Quantum Physics',
    category: 'science',
    keywords: ['quantum', 'physics', 'particle', 'wave', 'uncertainty', 'superposition'],
    content: `Quantum physics describes the behavior of matter and energy at the smallest scales.

**Key Principles:**

**Wave-Particle Duality:**
• Light behaves as both wave and particle
• Electrons also show wave behavior
• Double-slit experiment demonstrates this
• Photons: Packets of light energy
• De Broglie wavelength for matter

**Uncertainty Principle (Heisenberg):**
• Cannot know both position and momentum precisely
• Fundamental limit, not measurement error
• The more precisely one is known, the less the other
• Applies to energy and time too
• Sets limits on what can be measured

**Superposition:**
• Particles exist in multiple states simultaneously
• Until measured/observed
• Schrödinger's cat thought experiment
• Basis for quantum computing
• Collapses to single state upon measurement

**Quantum Entanglement:**
• Two particles become correlated
• Measuring one instantly affects the other
• Regardless of distance ("spooky action at a distance")
• Einstein was skeptical but experiments confirmed it
• Basis for quantum communication

**Quantum Tunneling:**
• Particles can pass through energy barriers
• Classically impossible but quantum mechanically allowed
• Enables nuclear fusion in stars
• Used in tunnel diodes, scanning tunneling microscopes
• Probability decreases with barrier width

**Quantum Numbers:**
• Principal (n): Energy level/shell
• Angular momentum (l): Orbital shape
• Magnetic (ml): Orbital orientation
• Spin (ms): Intrinsic angular momentum (+½ or -½)

**Applications:**
• Lasers: Stimulated emission
• Semiconductors: Band theory
• MRI: Nuclear magnetic resonance
• Quantum computing: Qubits
• Quantum cryptography: Secure communication

**Famous Experiments:**
• Double-slit experiment
• Stern-Gerlach experiment
• Photoelectric effect (Einstein)
• Compton scattering
• Bell test experiments`
  },
  {
    topic: 'Organic Chemistry',
    category: 'science',
    keywords: ['organic chemistry', 'carbon', 'molecule', 'bond', 'hydrocarbon', 'functional group'],
    content: `Organic chemistry studies carbon-containing compounds.

**Why Carbon?**
• Forms 4 covalent bonds
• Bonds with itself (chains, rings)
• Bonds with many other elements
• Creates enormous variety of molecules
• Basis of all known life

**Hydrocarbons:**
• **Alkanes:** Single bonds only (CnH2n+2)
  - Methane (CH4), ethane, propane, butane
  - Saturated hydrocarbons
• **Alkenes:** One or more double bonds (CnH2n)
  - Ethylene, propylene
  - Unsaturated
• **Alkynes:** One or more triple bonds (CnH2n-2)
  - Acetylene
• **Aromatics:** Ring structures
  - Benzene (C6H6)
  - Delocalized electrons

**Functional Groups:**
• **Hydroxyl (-OH):** Alcohols (ethanol)
• **Carboxyl (-COOH):** Carboxylic acids (acetic acid)
• **Amino (-NH2):** Amines (amino acids)
• **Carbonyl (C=O):** Aldehydes, ketones
• **Ester (-COO-):** Fats, flavors
• **Ether (-O-):** Diethyl ether
• **Phosphate (-PO4):** DNA, ATP

**Isomers:**
• Same formula, different structure
• Structural isomers: Different connectivity
• Stereoisomers: Same connectivity, different spatial arrangement
• Enantiomers: Mirror images (chirality)
• Cis/trans isomers: Around double bonds

**Reactions:**
• Addition: Add atoms across double bond
• Substitution: Replace one atom/group
• Elimination: Remove atoms to form double bond
• Condensation: Join molecules, release water
• Hydrolysis: Break bonds with water

**Polymers:**
• Long chains of repeating units (monomers)
• **Addition polymers:** Polyethylene, PVC, polystyrene
• **Condensation polymers:** Nylon, polyester, proteins
• Natural: DNA, proteins, cellulose, rubber
• Synthetic: Plastics, fibers

**Biochemistry Connection:**
• Carbohydrates: Sugars, starches
• Lipids: Fats, oils, membranes
• Proteins: Amino acid polymers
• Nucleic acids: DNA, RNA`
  },
  {
    topic: 'Genetics and DNA',
    category: 'science',
    keywords: ['genetics', 'dna', 'gene', 'chromosome', 'heredity', 'mutation', 'genome'],
    content: `Genetics is the study of heredity and variation in living organisms.

**DNA Structure:**
• Double helix (Watson & Crick, 1953)
• Sugar-phosphate backbone
• Base pairs: A-T, G-C
• Adenine, Thymine, Guanine, Cytosine
• Antiparallel strands
• ~3 billion base pairs in human genome

**Genes:**
• Segments of DNA that code for proteins
• ~20,000-25,000 genes in humans
• Only ~1.5% of DNA codes for proteins
• Rest: Regulatory, structural, unknown ("junk DNA")
• Gene expression: DNA → RNA → Protein

**Central Dogma:**
• **Transcription:** DNA → mRNA (in nucleus)
• **Translation:** mRNA → Protein (at ribosomes)
• Codons: 3-base sequences code for amino acids
• 64 codons for 20 amino acids
• Start codon (AUG), stop codons (UAA, UAG, UGA)

**Chromosomes:**
• Humans: 23 pairs (46 total)
• 22 autosomal pairs + 1 sex pair (XX or XY)
• Homologous chromosomes: One from each parent
• Karyotype: Visual display of chromosomes

**Mendelian Genetics:**
• Dominant and recessive alleles
• Genotype (genetic makeup) vs phenotype (physical expression)
• Homozygous (AA, aa) vs heterozygous (Aa)
• Punnett squares predict offspring ratios
• Independent assortment
• Law of segregation

**Inheritance Patterns:**
• Autosomal dominant: One copy sufficient
• Autosomal recessive: Two copies needed
• X-linked: On X chromosome
• Codominance: Both alleles expressed (blood type)
• Incomplete dominance: Blended expression
• Polygenic: Multiple genes (height, skin color)

**Mutations:**
• Point mutations: Single base change
• Insertions/deletions: Frameshift
• Chromosomal: Large-scale changes
• Can be harmful, neutral, or beneficial
• Source of genetic variation

**Modern Genetics:**
• Human Genome Project (completed 2003)
• CRISPR: Gene editing technology
• Genetic testing and screening
• Gene therapy: Treating genetic diseases
• Epigenetics: Gene expression without DNA change
• Personalized medicine`
  },
  {
    topic: 'Astronomy and Cosmology',
    category: 'science',
    keywords: ['astronomy', 'universe', 'big bang', 'galaxy', 'black hole', 'cosmology'],
    content: `Cosmology studies the origin, structure, and fate of the universe.

**The Big Bang:**
• Universe began ~13.8 billion years ago
• Started as incredibly hot, dense point
• Rapid expansion (inflation)
• Cosmic microwave background radiation: Echo of Big Bang
• Universe still expanding (accelerating)

**Timeline of the Universe:**
• 0: Big Bang
• 10^-36 s: Inflation
• 3 min: First nuclei form
• 380,000 years: First atoms, CMB released
• 200 million years: First stars
• 1 billion years: First galaxies
• 9.2 billion years: Solar system forms
• 13.8 billion years: Present

**Stars:**
• Form from collapsing gas clouds (nebulae)
• Nuclear fusion: Hydrogen → Helium
• Main sequence: Stable hydrogen burning
• Red giant: Hydrogen exhausted, expands
• Death depends on mass:
  - Small: White dwarf → black dwarf
  - Medium: Neutron star (supernova)
  - Large: Black hole (supernova)

**Stellar Classification (OBAFGKM):**
• O: Hottest, blue, >30,000K
• B: Blue-white, 10,000-30,000K
• A: White, 7,500-10,000K
• F: Yellow-white, 6,000-7,500K
• G: Yellow (Sun), 5,200-6,000K
• K: Orange, 3,700-5,200K
• M: Red, coolest, <3,700K

**Galaxies:**
• Milky Way: Our galaxy, ~200 billion stars
• Types: Spiral, elliptical, irregular
• Andromeda: Nearest large galaxy
• Galaxy clusters and superclusters
• Observable universe: ~2 trillion galaxies

**Black Holes:**
• Extremely dense, gravity prevents light escape
• Event horizon: Point of no return
• Singularity: Infinite density at center
• Stellar black holes: From massive star death
• Supermassive: Center of galaxies (millions to billions of solar masses)
• Hawking radiation: Theoretical slow evaporation

**Dark Matter and Dark Energy:**
• Dark matter: ~27% of universe, invisible
• Holds galaxies together
• Dark energy: ~68% of universe
• Accelerates expansion
• Normal matter: Only ~5%
• Both poorly understood

**Exoplanets:**
• Planets orbiting other stars
• 5,000+ confirmed
• Detection: Transit method, radial velocity
• Habitable zone: "Goldilocks zone"
• Search for biosignatures`
  },
  {
    topic: 'Human Anatomy',
    category: 'science',
    keywords: ['anatomy', 'body', 'organ', 'system', 'muscle', 'bone', 'heart', 'brain'],
    content: `Human anatomy studies the structure of the human body.

**Skeletal System:**
• 206 bones in adult body
• Functions: Support, protection, movement, blood cell production
• Axial skeleton: Skull, spine, ribs (80 bones)
• Appendicular: Limbs, shoulders, pelvis (126 bones)
• Joints: Where bones meet (ball-and-socket, hinge, pivot)
• Cartilage: Flexible connective tissue
• Bone marrow: Produces blood cells

**Muscular System:**
• ~600 skeletal muscles
• Types: Skeletal (voluntary), smooth (involuntary), cardiac (heart)
• Muscles work in pairs (agonist/antagonist)
• Tendons connect muscles to bones
• Largest: Gluteus maximus
• Smallest: Stapedius (ear)

**Cardiovascular System:**
• Heart: 4 chambers, pumps blood
• Arteries: Carry blood away from heart
• Veins: Return blood to heart
• Capillaries: Exchange nutrients/waste
• ~60,000 miles of blood vessels
• Heart beats ~100,000 times/day
• Blood types: A, B, AB, O (+ Rh factor)

**Respiratory System:**
• Nose/mouth → trachea → bronchi → lungs
• Alveoli: Gas exchange (O2 in, CO2 out)
• Diaphragm: Main breathing muscle
• ~12-20 breaths per minute at rest
• Lungs: ~300 million alveoli

**Nervous System:**
• Brain: ~86 billion neurons
• Spinal cord: Information highway
• Central nervous system (CNS): Brain + spinal cord
• Peripheral nervous system (PNS): Nerves throughout body
• Autonomic: Involuntary functions
• Somatic: Voluntary movement

**Digestive System:**
• Mouth → esophagus → stomach → small intestine → large intestine
• Stomach: Acid breaks down food
• Small intestine: Nutrient absorption (~20 feet)
• Large intestine: Water absorption
• Liver: Detoxification, bile production
• Pancreas: Enzymes and insulin

**Endocrine System:**
• Hormone-producing glands
• Pituitary: "Master gland"
• Thyroid: Metabolism
• Adrenal: Stress response
• Pancreas: Blood sugar
• Reproductive glands: Sex hormones

**Immune System:**
• White blood cells: Fight infection
• Lymph nodes: Filter pathogens
• Antibodies: Target specific invaders
• Innate immunity: General defense
• Adaptive immunity: Specific, memory
• Vaccination: Train immune system`
  },
  {
    topic: 'Ecology and Biomes',
    category: 'science',
    keywords: ['ecology', 'biome', 'ecosystem', 'forest', 'desert', 'ocean', 'habitat'],
    content: `Ecology studies interactions between organisms and their environment.

**Major Terrestrial Biomes:**

**Tropical Rainforest:**
• Near equator, hot and wet year-round
• Greatest biodiversity on Earth
• Canopy layers: Emergent, canopy, understory, floor
• ~50% of all species
• Rapid nutrient cycling
• Threats: Deforestation, climate change

**Temperate Forest:**
• Moderate climate, four seasons
• Deciduous trees (lose leaves) or evergreen
• Rich soil from leaf litter
• Common in eastern US, Europe, East Asia
• Animals: Deer, bears, foxes, birds

**Boreal Forest (Taiga):**
• Cold, long winters
• Coniferous trees (spruce, pine, fir)
• Largest terrestrial biome
• Permafrost in some areas
• Animals: Moose, wolves, bears

**Grassland:**
• Moderate rainfall, too dry for forests
• Prairies (North America), steppes (Asia), savannas (Africa)
• Rich soil, great for agriculture
• Grazing animals: Bison, zebra, antelope
• Fire maintains ecosystem

**Desert:**
• Less than 10 inches rain/year
• Hot deserts: Sahara, Mojave
• Cold deserts: Gobi, Antarctic
• Adapted organisms: Cacti, camels, reptiles
• Extreme temperature variations

**Tundra:**
• Coldest biome, permafrost
• Arctic and alpine varieties
• Short growing season
• Low vegetation: Mosses, lichens, grasses
• Animals: Caribou, arctic fox, snowy owl

**Aquatic Biomes:**

**Freshwater:**
• Lakes, rivers, streams, wetlands
• <1% of Earth's water
• Critical for drinking, agriculture
• Diverse ecosystems
• Threats: Pollution, damming

**Marine:**
• Oceans cover 71% of Earth
• Coral reefs: "Rainforests of the sea"
• Deep sea: Largely unexplored
• Phytoplankton: Produce 50%+ of oxygen
• Zones: Intertidal, pelagic, benthic, abyssal

**Ecological Concepts:**
• Succession: Community change over time
• Carrying capacity: Maximum population
• Niche: Organism's role in ecosystem
• Symbiosis: Mutualism, commensalism, parasitism
• Trophic levels: Energy flow through food web
• Biogeochemical cycles: Carbon, nitrogen, water`
  },
  {
    topic: 'Geology',
    category: 'science',
    keywords: ['geology', 'rock', 'mineral', 'volcano', 'earthquake', 'fossil', 'earth'],
    content: `Geology studies Earth's structure, processes, and history.

**Earth's Layers:**
• **Crust:** Thin outer layer (5-70 km)
  - Continental: Thicker, less dense (granite)
  - Oceanic: Thinner, more dense (basalt)
• **Mantle:** Thick, semi-solid (2,900 km)
  - Convection currents drive plate tectonics
• **Outer Core:** Liquid iron/nickel (2,200 km)
  - Generates magnetic field
• **Inner Core:** Solid iron/nickel (1,200 km radius)
  - ~5,400°C, extreme pressure

**Rock Types:**
• **Ignite:** From cooled magma/lava
  - Intrusive (granite): Cooled slowly underground
  - Extrusive (basalt): Cooled quickly on surface
• **Sedimentary:** From compressed sediments
  - Sandstone, limestone, shale
  - Often contain fossils
  - Form in layers (strata)
• **Metamorphic:** Changed by heat/pressure
  - Marble (from limestone)
  - Slate (from shale)
  - Quartzite (from sandstone)

**Rock Cycle:**
• Igneous → weathering → sedimentary
• Sedimentary → heat/pressure → metamorphic
• Metamorphic → melting → igneous
• Any rock can become any other type

**Plate Tectonics:**
• Earth's crust divided into plates
• Plates move on asthenosphere
• **Divergent:** Plates move apart (mid-ocean ridges)
• **Convergent:** Plates collide (mountains, trenches)
• **Transform:** Plates slide past (San Andreas Fault)
• Pangaea: Supercontinent ~250 million years ago

**Volcanoes:**
• Openings where magma reaches surface
• Types: Shield, composite (stratovolcano), cinder cone
• Ring of Fire: Pacific Ocean rim
• Hotspots: Hawaii, Yellowstone
• Volcanic hazards: Lava, ash, pyroclastic flows

**Earthquakes:**
• Sudden release of energy in crust
• Caused by plate movement
• Seismic waves: P-waves, S-waves, surface waves
• Richter/moment magnitude scale
• Epicenter: Point on surface above focus
• Tsunamis: Caused by underwater earthquakes

**Minerals:**
• Naturally occurring, inorganic, crystalline
• ~5,000 known minerals
• Mohs hardness scale: 1 (talc) to 10 (diamond)
• Properties: Color, luster, streak, cleavage
• Silicates most common group

**Fossils:**
• Preserved remains of ancient life
• Types: Body fossils, trace fossils, molds, casts
• Fossil fuels: Coal, oil, natural gas
• Dating: Relative (stratigraphy) and absolute (radiometric)
• Geologic time scale: Eons, eras, periods, epochs`
  },
  {
    topic: 'Neuroscience',
    category: 'science',
    keywords: ['neuroscience', 'brain', 'neuron', 'synapse', 'memory', 'consciousness'],
    content: `Neuroscience studies the nervous system and brain.

**Neurons:**
• Basic unit of nervous system
• ~86 billion in human brain
• Parts: Cell body, dendrites, axon
• Dendrites: Receive signals
• Axon: Transmit signals
• Myelin sheath: Insulates axon, speeds transmission

**Synapses:**
• Junctions between neurons
• Chemical synapses: Neurotransmitters cross gap
• Electrical synapses: Direct ion flow
• ~100 trillion synapses in brain
• Synaptic plasticity: Connections strengthen/weaken

**Neurotransmitters:**
• **Dopamine:** Reward, motivation, pleasure
• **Serotonin:** Mood, sleep, appetite
• **Norepinephrine:** Alertness, attention
• **GABA:** Inhibitory, calming
• **Glutamate:** Excitatory, learning
• **Acetylcholine:** Memory, muscle control
• **Endorphins:** Pain relief, pleasure

**Brain Regions:**
• **Cerebral Cortex:** Higher thinking, consciousness
  - Frontal lobe: Decision-making, personality
  - Parietal lobe: Sensory processing
  - Temporal lobe: Hearing, memory
  - Occipital lobe: Vision
• **Cerebellum:** Coordination, balance
• **Brainstem:** Basic life functions (breathing, heart rate)
• **Hippocampus:** Memory formation
• **Amygdala:** Emotions, fear
• **Thalamus:** Sensory relay station
• **Hypothalamus:** Hormones, homeostasis

**Memory:**
• **Sensory memory:** Brief, milliseconds to seconds
• **Short-term/Working memory:** ~7 items, seconds to minutes
• **Long-term memory:** Unlimited capacity
  - Declarative: Facts and events
  - Procedural: Skills and habits
• Encoding → Storage → Retrieval
• Consolidation during sleep

**Neuroplasticity:**
• Brain's ability to reorganize
• New neural connections throughout life
• Strengthened by learning and experience
• Recovery after injury
• "Neurons that fire together wire together"

**Brain Imaging:**
• **fMRI:** Blood flow, brain activity
• **EEG:** Electrical activity
• **PET:** Metabolic activity
• **CT/MRI:** Brain structure
• Enabled major discoveries

**Consciousness:**
• Still poorly understood
• Involves widespread brain activity
• Sleep stages and consciousness levels
• Anesthesia and consciousness
• Hard problem of consciousness
• Theories: Global workspace, integrated information`
  },
  {
    topic: 'Microbiology',
    category: 'science',
    keywords: ['microbiology', 'bacteria', 'virus', 'microbe', 'infection', 'antibiotic'],
    content: `Microbiology studies microscopic organisms.

**Bacteria:**
• Single-celled prokaryotes
• No nucleus (DNA in nucleoid)
• Shapes: Cocci (round), bacilli (rod), spirilla (spiral)
• Reproduce by binary fission
• Some beneficial, some pathogenic
• Antibiotic-resistant strains increasing

**Viruses:**
• Not technically alive (no metabolism)
• Genetic material (DNA or RNA) in protein coat
• Must infect host cells to reproduce
• Much smaller than bacteria
• Examples: Influenza, HIV, SARS-CoV-2
• Treated with antivirals, prevented with vaccines

**Fungi:**
• Eukaryotic organisms
• Yeasts (single-celled), molds, mushrooms
• Decomposers in ecosystems
• Some cause infections (candida, athlete's foot)
• Useful: Bread, beer, antibiotics (penicillin)

**Protists:**
• Diverse eukaryotic microorganisms
• Amoeba, paramecium, algae
• Some cause disease (malaria - Plasmodium)
• Important in food chains

**Microbiome:**
• Trillions of microbes live in/on us
• Gut microbiome: 100 trillion bacteria
• Aids digestion, immune function
• Unique to each person
• Affected by diet, antibiotics, environment
• Research linking to mental health

**Immune Response:**
• Innate: Skin, mucus, inflammation, fever
• Adaptive: Specific antibodies, T-cells
• Vaccination: Trains immune system
• Herd immunity: Population-level protection

**Antibiotics:**
• Kill or inhibit bacteria
• Discovered by Fleming (penicillin, 1928)
• Don't work on viruses
• Resistance is growing concern
• Overuse and misuse accelerate resistance
• New antibiotics needed

**Applications:**
• Medicine: Diagnostics, treatment
• Food: Fermentation (yogurt, cheese, bread)
• Agriculture: Soil health, pest control
• Industry: Biofuels, bioremediation
• Research: Model organisms`
  },
];

ALL_KNOWLEDGE.push(...SCIENCE_DEEP_EXTENDED);

// =============================================================================
// PHILOSOPHY AND ETHICS
// =============================================================================

export const PHILOSOPHY_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Major Philosophical Schools',
    category: 'philosophy',
    keywords: ['philosophy', 'ethics', 'existentialism', 'stoicism', 'utilitarianism'],
    content: `Philosophy explores fundamental questions about existence, knowledge, and values.

**Ancient Philosophy:**

**Stoicism:**
• Founded by Zeno of Citium (~300 BCE)
• Focus on what you can control
• Virtue as highest good
• Accept what happens with equanimity
• Marcus Aurelius, Seneca, Epictetus
• Modern revival in self-help

**Epicureanism:**
• Founded by Epicurus (~300 BCE)
• Pleasure as highest good (not hedonism)
• Simple pleasures, avoid pain
• Friendship and community
• Atoms and void (materialism)

**Platonism:**
• Theory of Forms: Perfect ideals
• Allegory of the Cave
• Philosopher-kings should rule
• Soul is immortal
• Knowledge is recollection

**Aristotelianism:**
• Virtue ethics: Character development
• Golden mean: Balance between extremes
• Eudaimonia: Flourishing/happiness
• Logic and empirical observation
• Teleology: Purpose in nature

**Modern Philosophy:**

**Rationalism:**
• Knowledge through reason alone
• Descartes: "I think, therefore I am"
• Innate ideas exist
• Mathematics as model of knowledge
• Spinoza, Leibniz

**Empiricism:**
• Knowledge through experience/senses
• Locke: Mind as "blank slate"
• No innate ideas
• Scientific method
• Hume, Berkeley

**Existentialism:**
• Existence precedes essence
• Individual freedom and responsibility
• Authenticity and choice
• Anxiety and absurdity
• Sartre, Camus, Kierkegaard, Heidegger

**Utilitarianism:**
• Greatest good for greatest number
• Consequences determine morality
• Bentham: Quantify pleasure/pain
• Mill: Quality of pleasures matters
• Applied to policy and ethics

**Kantian Ethics:**
• Categorical imperative: Universal moral law
• Treat people as ends, not means
• Duty-based ethics (deontology)
• Good will is only unconditional good
• Autonomy and rationality

**Pragmatism:**
• Truth is what works in practice
• Ideas judged by consequences
• William James, John Dewey, Charles Peirce
• American philosophical tradition
• Influenced education and democracy`
  },
  {
    topic: 'Logic and Reasoning',
    category: 'philosophy',
    keywords: ['logic', 'argument', 'fallacy', 'deduction', 'induction', 'reasoning'],
    content: `Logic is the study of valid reasoning and argumentation.

**Types of Reasoning:**

**Deductive:**
• General premises → specific conclusion
• If premises are true, conclusion must be true
• Example: All humans are mortal. Socrates is human. Therefore, Socrates is mortal.
• Valid: Structure is correct
• Sound: Valid + true premises

**Inductive:**
• Specific observations → general conclusion
• Conclusion is probable, not certain
• Example: Every swan I've seen is white. Therefore, all swans are white.
• Strength varies with evidence
• Can be disproven by counterexample

**Abductive:**
• Best explanation for observations
• Used in everyday reasoning
• Medical diagnosis
• Scientific hypothesis formation
• "Inference to the best explanation"

**Formal Logic:**
• Propositional logic: AND, OR, NOT, IF-THEN
• Predicate logic: Quantifiers (all, some)
• Truth tables: Evaluate compound statements
• Validity: Structure guarantees truth
• Tautology: Always true

**Common Logical Fallacies:**

**Informal Fallacies:**
• **Ad Hominem:** Attack the person, not argument
• **Straw Man:** Misrepresent opponent's position
• **Red Herring:** Irrelevant distraction
• **Appeal to Authority:** Expert opinion as proof
• **Appeal to Emotion:** Feelings over facts
• **Bandwagon:** Everyone believes it
• **False Dilemma:** Only two options presented
• **Slippery Slope:** Extreme chain of consequences
• **Circular Reasoning:** Conclusion in premises
• **Hasty Generalization:** Too few examples
• **Post Hoc:** Correlation ≠ causation
• **Tu Quoque:** "You do it too"
• **No True Scotsman:** Redefining to exclude counterexamples
• **Equivocation:** Changing word meaning mid-argument

**Formal Fallacies:**
• Affirming the consequent
• Denying the antecedent
• Undistributed middle

**Critical Thinking Application:**
• Identify premises and conclusion
• Check for hidden assumptions
• Evaluate evidence quality
• Consider alternative explanations
• Recognize emotional manipulation`
  },
  {
    topic: 'Ethics and Moral Philosophy',
    category: 'philosophy',
    keywords: ['ethics', 'morality', 'right', 'wrong', 'justice', 'virtue'],
    content: `Ethics examines questions of right and wrong, good and bad.

**Major Ethical Theories:**

**Virtue Ethics:**
• Focus on character, not rules or consequences
• Aristotle: Develop virtuous habits
• Virtues: Courage, temperance, justice, wisdom
• Golden mean: Balance between extremes
• "What would a virtuous person do?"

**Deontology (Duty-Based):**
• Actions are right or wrong in themselves
• Kant: Categorical imperative
• Universal moral rules
• Rights and duties
• Intentions matter more than outcomes

**Consequentialism:**
• Outcomes determine morality
• Utilitarianism: Maximize happiness
• Act vs Rule utilitarianism
• Cost-benefit analysis
• Challenges: Predicting consequences

**Social Contract Theory:**
• Morality from agreement among people
• Hobbes: Avoid "war of all against all"
• Locke: Natural rights (life, liberty, property)
• Rawls: "Veil of ignorance" for fairness
• Basis for democratic government

**Applied Ethics:**

**Bioethics:**
• Euthanasia and assisted dying
• Genetic engineering
• Organ transplantation
• Medical research ethics
• Informed consent

**Environmental Ethics:**
• Obligations to nature
• Animal rights
• Climate change responsibility
• Sustainability
• Future generations

**Technology Ethics:**
• AI and automation
• Privacy and surveillance
• Social media impact
• Digital divide
• Autonomous weapons

**Business Ethics:**
• Corporate responsibility
• Fair labor practices
• Environmental impact
• Whistleblowing
• Conflicts of interest

**Ethical Dilemmas:**
• Trolley problem: Save five or one?
• Prisoner's dilemma: Cooperation vs self-interest
• Lifeboat ethics: Who gets saved?
• Moral relativism vs moral universalism
• Cultural differences in ethics`
  },
];

ALL_KNOWLEDGE.push(...PHILOSOPHY_DEEP);

// =============================================================================
// WORLD CULTURES AND GEOGRAPHY
// =============================================================================

export const WORLD_CULTURES: KnowledgeEntry[] = [
  {
    topic: 'Japanese Culture',
    category: 'culture',
    keywords: ['japan', 'japanese', 'tokyo', 'samurai', 'anime', 'sushi'],
    content: `Japan blends ancient traditions with cutting-edge modernity.

**History:**
• Ancient: Jomon period (~14,000 BCE)
• Classical: Nara and Heian periods (710-1185)
• Feudal: Samurai era (1185-1868)
• Meiji Restoration (1868): Modernization
• Post-WWII: Economic miracle
• Modern: Technology and cultural powerhouse

**Traditional Culture:**
• **Bushido:** Way of the warrior (samurai code)
• **Tea Ceremony (Chado):** Ritualized tea preparation
• **Ikebana:** Flower arrangement
• **Calligraphy (Shodo):** Brush writing
• **Origami:** Paper folding
• **Kabuki/Noh:** Traditional theater

**Religion:**
• Shinto: Indigenous nature religion
• Buddhism: Arrived from China/Korea
• Many practice both
• Temples and shrines throughout
• Festivals (matsuri) year-round

**Food:**
• Sushi and sashimi
• Ramen, udon, soba noodles
• Tempura
• Miso soup
• Rice as staple
• Washoku: Traditional cuisine (UNESCO)
• Izakaya: Casual dining/drinking

**Modern Culture:**
• Anime and manga: Global influence
• Video games: Nintendo, Sony, etc.
• J-pop and J-rock music
• Fashion: Harajuku, streetwear
• Technology and robotics
• Bullet trains (Shinkansen)

**Social Values:**
• Respect and politeness
• Group harmony (wa)
• Hard work and dedication
• Cleanliness and order
• Seasonal awareness
• Gift-giving culture

**Geography:**
• 6,852 islands
• Four main: Honshu, Hokkaido, Kyushu, Shikoku
• Mount Fuji: 3,776m, iconic volcano
• Earthquake-prone (Ring of Fire)
• Cherry blossoms (sakura) in spring
• Population: ~125 million`
  },
  {
    topic: 'Indian Culture',
    category: 'culture',
    keywords: ['india', 'indian', 'bollywood', 'curry', 'hindi', 'delhi'],
    content: `India is one of the world's oldest and most diverse civilizations.

**History:**
• Indus Valley Civilization (~3300 BCE)
• Vedic Period: Hindu scriptures
• Maurya Empire (Ashoka)
• Mughal Empire (1526-1857)
• British colonial rule (1858-1947)
• Independence: August 15, 1947
• Gandhi: Nonviolent resistance leader

**Languages:**
• 22 official languages
• Hindi and English most widely used
• Sanskrit: Ancient classical language
• Hundreds of regional languages
• Different scripts (Devanagari, Tamil, etc.)

**Religion:**
• Hinduism: ~80% of population
• Islam: ~14%
• Christianity, Sikhism, Buddhism, Jainism
• Birthplace of Hinduism, Buddhism, Jainism, Sikhism
• Religious diversity and coexistence

**Food:**
• Incredibly diverse by region
• Spices: Turmeric, cumin, coriander, cardamom
• Vegetarianism common
• North: Naan, tandoori, paneer
• South: Dosa, idli, sambar, coconut
• Street food culture
• Chai (tea) ubiquitous

**Arts and Entertainment:**
• Bollywood: World's largest film industry by output
• Classical dance: Bharatanatyam, Kathak, Odissi
• Classical music: Raga system
• Textile arts: Silk, cotton, embroidery
• Architecture: Taj Mahal, temples

**Festivals:**
• Diwali: Festival of Lights
• Holi: Festival of Colors
• Eid: Muslim celebrations
• Navratri/Durga Puja
• Pongal/Makar Sankranti
• Christmas (growing)

**Modern India:**
• IT and technology hub
• Space program (ISRO)
• Cricket: National passion
• Yoga: Global export
• Population: ~1.4 billion (most populous)
• Rapidly growing economy`
  },
  {
    topic: 'Chinese Culture',
    category: 'culture',
    keywords: ['china', 'chinese', 'beijing', 'great wall', 'mandarin', 'dynasty'],
    content: `China has one of the world's oldest continuous civilizations.

**History:**
• Ancient dynasties: Shang, Zhou, Qin, Han
• Qin Shi Huang: First emperor, Great Wall
• Tang Dynasty: Golden age of culture
• Song Dynasty: Technological innovation
• Ming Dynasty: Forbidden City, exploration
• Qing Dynasty: Last imperial dynasty
• Republic (1912), People's Republic (1949)

**Inventions:**
• Paper (105 CE)
• Printing (woodblock, movable type)
• Gunpowder (9th century)
• Compass (11th century)
• Silk production
• Porcelain
• Seismograph

**Philosophy:**
• **Confucianism:** Social harmony, filial piety, education
• **Taoism (Daoism):** Harmony with nature, Tao Te Ching
• **Legalism:** Strict laws and order
• **Buddhism:** Arrived from India, adapted
• These philosophies still influence society

**Food:**
• Eight major cuisines
• Cantonese: Dim sum, stir-fry
• Sichuan: Spicy, numbing peppercorn
• Beijing: Peking duck
• Shanghai: Sweet, seafood
• Rice in south, noodles/wheat in north
• Tea culture: Thousands of years old

**Arts:**
• Calligraphy: Highly valued art form
• Painting: Landscape tradition
• Porcelain (china): World-renowned
• Silk weaving
• Opera: Beijing opera, regional styles
• Martial arts: Kung fu, tai chi

**Modern China:**
• World's second-largest economy
• Manufacturing powerhouse
• Rapid urbanization
• Technology: WeChat, Alibaba, Huawei
• Space program
• Population: ~1.4 billion
• Belt and Road Initiative

**Landmarks:**
• Great Wall: 13,000+ miles
• Forbidden City: Imperial palace
• Terracotta Army: Xi'an
• Li River: Karst landscapes
• Yangtze River: Longest in Asia`
  },
  {
    topic: 'African Cultures',
    category: 'culture',
    keywords: ['africa', 'african', 'culture', 'tribe', 'sahara', 'continent'],
    content: `Africa is the most culturally diverse continent with 54 countries.

**Geography:**
• Second-largest continent
• Sahara Desert: World's largest hot desert
• Congo Rainforest: Second-largest
• Nile River: World's longest
• Mount Kilimanjaro: Highest peak
• Great Rift Valley
• Diverse climates and ecosystems

**Ancient Civilizations:**
• Egypt: Pyramids, pharaohs
• Kush/Nubia: Rival to Egypt
• Axum (Ethiopia): Trading empire
• Great Zimbabwe: Stone city
• Mali Empire: Mansa Musa (richest person ever)
• Songhai Empire: Timbuktu learning center

**Languages:**
• 2,000+ languages spoken
• Major families: Niger-Congo, Afro-Asiatic, Nilo-Saharan
• Swahili: Widely spoken in East Africa
• Arabic: North Africa
• Colonial languages: English, French, Portuguese
• Many people multilingual

**Music and Dance:**
• Djembe and talking drums
• Call-and-response singing
• Afrobeat (Fela Kuti)
• Highlife, soukous, kwaito
• Dance integral to culture
• Influenced jazz, blues, rock, hip-hop globally

**Art:**
• Sculpture: Benin bronzes, Nok terracotta
• Textile: Kente cloth (Ghana), mud cloth (Mali)
• Beadwork: Maasai, Zulu
• Mask-making: Ceremonial and spiritual
• Rock art: Oldest in the world

**Food:**
• Injera and wat (Ethiopia)
• Jollof rice (West Africa)
• Couscous (North Africa)
• Braai/barbecue (South Africa)
• Fufu (West/Central Africa)
• Diverse regional cuisines

**Modern Africa:**
• Youngest population globally
• Rapid urbanization
• Growing tech sector ("Silicon Savannah")
• Mobile banking innovation (M-Pesa)
• Rich natural resources
• Challenges: Poverty, conflict, climate change
• Growing middle class`
  },
  {
    topic: 'Latin American Culture',
    category: 'culture',
    keywords: ['latin america', 'mexico', 'brazil', 'spanish', 'carnival', 'salsa'],
    content: `Latin America encompasses Central America, South America, and the Caribbean.

**History:**
• Pre-Columbian civilizations:
  - Maya: Calendar, mathematics, writing
  - Aztec: Tenochtitlan, human sacrifice
  - Inca: Machu Picchu, road system
• Spanish and Portuguese colonization
• Independence movements (19th century)
• Simón Bolívar: "The Liberator"
• Mixed indigenous, European, African heritage

**Languages:**
• Spanish: Most countries
• Portuguese: Brazil
• French: Haiti, French Guiana
• Indigenous languages: Quechua, Nahuatl, Guaraní
• Creole languages in Caribbean

**Music and Dance:**
• Salsa: Cuba/Puerto Rico origin
• Samba: Brazil, Carnival
• Tango: Argentina
• Reggaeton: Puerto Rico
• Mariachi: Mexico
• Cumbia: Colombia
• Bossa nova: Brazil

**Food:**
• Tacos, burritos, mole (Mexico)
• Ceviche (Peru)
• Feijoada (Brazil)
• Empanadas (Argentina)
• Arepas (Venezuela/Colombia)
• Churrasco (Brazil/Argentina)
• Chocolate: Originated here (cacao)

**Festivals:**
• Carnival (Brazil): World's largest party
• Day of the Dead (Mexico): Honor deceased
• Inti Raymi (Peru): Inca sun festival
• Semana Santa: Holy Week celebrations
• Fiestas patrias: Independence celebrations

**Art and Literature:**
• Frida Kahlo: Mexican painter
• Diego Rivera: Muralist
• Gabriel García Márquez: Magical realism
• Pablo Neruda: Chilean poet
• Isabel Allende: Chilean novelist

**Geography:**
• Amazon Rainforest: World's largest
• Andes Mountains: Longest mountain range
• Amazon River: Largest by volume
• Atacama Desert: Driest place
• Galápagos Islands: Unique wildlife
• Diverse ecosystems

**Modern:**
• Growing economies
• Urbanization
• Cultural influence (music, food, art)
• Challenges: Inequality, political instability
• Rich biodiversity
• Tourism destinations`
  },
  {
    topic: 'Middle Eastern Culture',
    category: 'culture',
    keywords: ['middle east', 'arab', 'islam', 'persian', 'desert', 'oil'],
    content: `The Middle East is the cradle of civilization and major religions.

**History:**
• Mesopotamia: First civilization (Sumer, Babylon)
• Ancient Persia: Vast empire
• Birthplace of Judaism, Christianity, Islam
• Islamic Golden Age (8th-14th century)
• Ottoman Empire (1299-1922)
• Modern nation-states after WWI
• Oil discovery transformed region

**Islamic Golden Age:**
• Advances in mathematics (algebra, algorithms)
• Medicine (Ibn Sina/Avicenna)
• Astronomy and optics
• Philosophy and literature
• Preserved Greek/Roman knowledge
• Baghdad: Center of learning (House of Wisdom)

**Religion:**
• Islam: Dominant religion
  - Five Pillars: Shahada, prayer, charity, fasting, hajj
  - Sunni and Shia branches
  - Quran: Holy book
• Judaism: Israel
• Christianity: Significant minorities
• Druze, Bahá'í, Zoroastrianism

**Food:**
• Hummus, falafel, shawarma
• Kebabs (various styles)
• Tabbouleh, fattoush
• Baklava, Turkish delight
• Arabic coffee and tea
• Dates: Cultural significance
• Hospitality through food

**Art and Architecture:**
• Islamic geometric patterns
• Calligraphy as art form
• Mosques: Domes, minarets
• Persian carpets
• Arabesque designs
• No figurative art in religious contexts

**Languages:**
• Arabic: Most widely spoken
• Persian (Farsi): Iran
• Turkish: Turkey
• Hebrew: Israel
• Kurdish: Kurdistan region
• Many dialects

**Modern Middle East:**
• Oil and gas: Global energy supply
• Rapid modernization (Dubai, Abu Dhabi)
• Geopolitical significance
• Diverse economies
• Tourism growing
• Technology adoption
• Challenges: Conflict, water scarcity`
  },
];

ALL_KNOWLEDGE.push(...WORLD_CULTURES);

// =============================================================================
// ECONOMICS AND FINANCE DEEP DIVE
// =============================================================================

export const ECONOMICS_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Macroeconomics',
    category: 'economics',
    keywords: ['macroeconomics', 'gdp', 'inflation', 'unemployment', 'fiscal policy', 'economy'],
    content: `Macroeconomics studies the economy as a whole.

**Key Indicators:**

**GDP (Gross Domestic Product):**
• Total value of goods and services produced
• Measures economic output
• Real GDP: Adjusted for inflation
• Nominal GDP: Current prices
• GDP per capita: Per person
• Growth rate: Change over time

**Inflation:**
• General increase in price levels
• Measured by CPI (Consumer Price Index)
• Moderate inflation (2-3%) considered healthy
• Hyperinflation: Extremely rapid price increases
• Deflation: Falling prices (can be harmful)
• Causes: Demand-pull, cost-push, monetary

**Unemployment:**
• Percentage of labor force without jobs
• Types: Frictional (between jobs), structural (skills mismatch), cyclical (recession)
• Natural rate: ~4-5%
• Underemployment: Working below capacity
• Labor force participation rate

**Fiscal Policy:**
• Government spending and taxation
• Expansionary: Increase spending, cut taxes (stimulate)
• Contractionary: Cut spending, raise taxes (cool down)
• Budget deficit: Spending > revenue
• National debt: Accumulated deficits
• Automatic stabilizers: Unemployment benefits, progressive taxes

**Monetary Policy:**
• Central bank controls money supply
• Federal Reserve (US), ECB (Europe), BOJ (Japan)
• Interest rates: Cost of borrowing
• Lower rates: Stimulate economy
• Higher rates: Cool inflation
• Quantitative easing: Buying assets

**Business Cycle:**
• Expansion: Growing economy
• Peak: Maximum output
• Contraction/Recession: Declining output
• Trough: Lowest point
• Recovery: Beginning to grow again
• Depression: Severe, prolonged recession

**International Trade:**
• Comparative advantage: Specialize in what you do best
• Trade surplus: Exports > imports
• Trade deficit: Imports > exports
• Tariffs: Taxes on imports
• Free trade agreements: NAFTA/USMCA, EU
• Exchange rates: Currency values

**Economic Systems:**
• Capitalism: Private ownership, free markets
• Socialism: Government ownership of key industries
• Mixed economy: Combination (most countries)
• Command economy: Government controls all
• Market economy: Supply and demand determine`
  },
  {
    topic: 'Personal Investing',
    category: 'finance',
    keywords: ['investing', 'stocks', 'bonds', 'portfolio', 'retirement', 'compound interest'],
    content: `Investing grows wealth over time through various financial instruments.

**Investment Types:**

**Stocks:**
• Ownership shares in companies
• Potential for high returns
• Higher risk/volatility
• Dividends: Regular payments
• Growth stocks vs value stocks
• Market cap: Large, mid, small

**Bonds:**
• Loans to governments or corporations
• Fixed interest payments
• Lower risk than stocks
• Types: Treasury, municipal, corporate
• Bond ratings: AAA to junk
• Inverse relationship with interest rates

**Mutual Funds:**
• Pool money from many investors
• Professional management
• Diversified portfolio
• Expense ratios (fees)
• Actively managed

**Index Funds/ETFs:**
• Track market index (S&P 500, etc.)
• Low fees (expense ratios)
• Passive management
• Broad diversification
• Warren Buffett recommends for most investors

**Real Estate:**
• Property investment
• Rental income
• Appreciation over time
• REITs: Real estate investment trusts
• Leverage through mortgages

**Key Concepts:**

**Compound Interest:**
• Interest on interest
• "Eighth wonder of the world" (attributed to Einstein)
• Rule of 72: Divide by return rate = years to double
• Start early for maximum benefit
• Example: $10,000 at 7% = $76,123 in 30 years

**Diversification:**
• Don't put all eggs in one basket
• Spread across asset classes
• Reduces overall risk
• Asset allocation by age
• Rebalance periodically

**Risk and Return:**
• Higher potential return = higher risk
• Risk tolerance varies by person
• Time horizon matters
• Young investors can take more risk
• Diversification reduces risk

**Dollar-Cost Averaging:**
• Invest fixed amount regularly
• Buy more shares when prices low
• Buy fewer when prices high
• Reduces timing risk
• Automate investments

**Retirement Accounts:**
• 401(k): Employer-sponsored, tax-deferred
• IRA: Individual retirement account
• Roth: After-tax contributions, tax-free growth
• Traditional: Pre-tax contributions, taxed on withdrawal
• Employer match: Free money
• Start as early as possible`
  },
  {
    topic: 'Cryptocurrency Deep Dive',
    category: 'finance',
    keywords: ['crypto', 'bitcoin', 'ethereum', 'blockchain', 'defi', 'nft', 'web3'],
    content: `Cryptocurrency is digital currency secured by cryptography.

**Bitcoin:**
• Created 2009 by Satoshi Nakamoto (pseudonym)
• First and largest cryptocurrency
• Limited supply: 21 million coins
• Proof of Work consensus
• Mining: Solving complex math problems
• Halving: Reward cuts every ~4 years
• Digital gold narrative

**Ethereum:**
• Created by Vitalik Buterin (2015)
• Smart contracts: Self-executing code
• Decentralized applications (dApps)
• Moved to Proof of Stake (2022)
• Gas fees for transactions
• ERC-20 tokens standard
• Foundation for DeFi and NFTs

**Blockchain Technology:**
• Distributed ledger
• Blocks linked cryptographically
• Immutable (can't change history)
• Decentralized (no single authority)
• Transparent (public ledger)
• Consensus mechanisms validate transactions

**DeFi (Decentralized Finance):**
• Financial services without intermediaries
• Lending and borrowing protocols
• Decentralized exchanges (DEX)
• Yield farming and staking
• Liquidity pools
• Smart contract risk

**NFTs (Non-Fungible Tokens):**
• Unique digital assets
• Art, music, collectibles
• Proof of ownership on blockchain
• ERC-721 standard
• Marketplace: OpenSea, etc.
• Controversy over value and utility

**Stablecoins:**
• Pegged to fiat currency (usually USD)
• USDT (Tether), USDC, DAI
• Used for trading and DeFi
• Regulatory scrutiny
• Algorithmic vs collateralized

**Risks:**
• Extreme volatility
• Regulatory uncertainty
• Scams and fraud
• Technical complexity
• Loss of private keys = lost funds
• Environmental concerns (PoW)
• Market manipulation

**Wallets:**
• Hot wallets: Connected to internet (convenient)
• Cold wallets: Offline (more secure)
• Hardware wallets: Physical devices
• Seed phrase: Recovery backup
• "Not your keys, not your crypto"`
  },
  {
    topic: 'Accounting Basics',
    category: 'finance',
    keywords: ['accounting', 'balance sheet', 'income statement', 'bookkeeping', 'financial'],
    content: `Accounting tracks and reports financial information.

**Financial Statements:**

**Balance Sheet:**
• Assets = Liabilities + Equity
• Snapshot at a point in time
• Assets: What company owns
• Liabilities: What company owes
• Equity: Owner's stake

**Income Statement (P&L):**
• Revenue - Expenses = Net Income
• Over a period of time
• Revenue (sales/income)
• Cost of goods sold (COGS)
• Gross profit = Revenue - COGS
• Operating expenses
• Net income (bottom line)

**Cash Flow Statement:**
• Operating: Day-to-day business
• Investing: Buying/selling assets
• Financing: Debt and equity
• Cash is king
• Profitable companies can still run out of cash

**Key Concepts:**

**Double-Entry Bookkeeping:**
• Every transaction has two entries
• Debit and credit
• Assets and expenses: Debit increases
• Liabilities, equity, revenue: Credit increases
• Always balanced

**Accrual vs Cash Basis:**
• Accrual: Record when earned/incurred
• Cash: Record when money changes hands
• Accrual is standard for larger businesses
• Cash is simpler for small businesses

**Depreciation:**
• Spreading asset cost over useful life
• Straight-line: Equal amounts each year
• Accelerated: More in early years
• Affects taxes and reported income

**Financial Ratios:**
• Current ratio: Current assets / current liabilities
• Debt-to-equity: Total debt / equity
• Profit margin: Net income / revenue
• ROE: Net income / equity
• P/E ratio: Stock price / earnings per share

**Taxes:**
• Income tax: On earnings
• Sales tax: On purchases
• Property tax: On real estate
• Capital gains: On investment profits
• Tax deductions reduce taxable income
• Tax credits reduce tax owed directly`
  },
];

ALL_KNOWLEDGE.push(...ECONOMICS_DEEP);

// =============================================================================
// MUSIC DEEP DIVE
// =============================================================================

export const MUSIC_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Music Theory',
    category: 'music',
    keywords: ['music theory', 'notes', 'scales', 'chords', 'rhythm', 'harmony'],
    content: `Music theory explains how music works.

**Basic Elements:**

**Pitch:**
• How high or low a sound is
• Notes: A, B, C, D, E, F, G
• Sharps (#) and flats (b)
• Octave: Same note, higher/lower
• 12 semitones in an octave

**Rhythm:**
• Pattern of sounds in time
• Beat: Basic pulse
• Tempo: Speed (BPM - beats per minute)
• Time signature: 4/4, 3/4, 6/8
• Note values: Whole, half, quarter, eighth, sixteenth

**Scales:**
• **Major scale:** Happy, bright (W-W-H-W-W-W-H)
• **Minor scale:** Sad, dark
  - Natural minor
  - Harmonic minor
  - Melodic minor
• **Pentatonic:** 5 notes, used in many cultures
• **Blues scale:** Pentatonic + blue note
• **Chromatic:** All 12 semitones

**Intervals:**
• Distance between two notes
• Unison, 2nd, 3rd, 4th, 5th, 6th, 7th, octave
• Major, minor, perfect, augmented, diminished
• Consonant (stable) vs dissonant (tension)

**Chords:**
• Three or more notes played together
• **Major:** Root, major 3rd, perfect 5th (happy)
• **Minor:** Root, minor 3rd, perfect 5th (sad)
• **Diminished:** Root, minor 3rd, diminished 5th
• **Augmented:** Root, major 3rd, augmented 5th
• **7th chords:** Add 7th note
• Inversions: Rearranging notes

**Chord Progressions:**
• I-IV-V-I: Most common
• I-V-vi-IV: Pop progression
• ii-V-I: Jazz standard
• 12-bar blues: I-I-I-I-IV-IV-I-I-V-IV-I-V
• Roman numerals indicate scale degree

**Key Signatures:**
• Defines which notes are sharp/flat
• Major and relative minor keys
• Circle of fifths: Relationship between keys
• Key changes (modulation)

**Harmony:**
• Multiple notes/voices together
• Consonance and dissonance
• Voice leading
• Counterpoint: Independent melodies together
• Harmonic analysis`
  },
  {
    topic: 'History of Popular Music',
    category: 'music',
    keywords: ['rock', 'pop', 'hip hop', 'jazz', 'blues', 'music history'],
    content: `Popular music evolved through many genres and movements.

**Blues (1900s-present):**
• African American origins in Deep South
• 12-bar blues structure
• Call and response
• Influenced virtually all popular music
• Robert Johnson, B.B. King, Muddy Waters

**Jazz (1910s-present):**
• New Orleans origins
• Improvisation central
• Swing era (1930s-40s): Big bands
• Bebop (1940s): Complex, fast
• Cool jazz, fusion, free jazz
• Louis Armstrong, Miles Davis, John Coltrane

**Rock and Roll (1950s-present):**
• Blues + country + rhythm & blues
• Elvis Presley: "King of Rock and Roll"
• Chuck Berry, Little Richard, Buddy Holly
• British Invasion (1960s): Beatles, Rolling Stones
• Psychedelic rock: Hendrix, Pink Floyd
• Punk (1970s): Ramones, Sex Pistols
• Heavy metal: Led Zeppelin, Black Sabbath

**Soul/R&B (1950s-present):**
• Gospel + blues + jazz
• Motown Records: Supremes, Temptations
• Aretha Franklin: "Queen of Soul"
• James Brown: "Godfather of Soul"
• Funk: Parliament-Funkadelic
• Modern R&B: Beyoncé, The Weeknd

**Hip Hop (1970s-present):**
• Born in Bronx, New York
• DJing, MCing, breakdancing, graffiti
• Grandmaster Flash, Run-DMC
• Golden age (late 80s-90s): Public Enemy, Nas, Wu-Tang
• West Coast: Tupac, Dr. Dre, Snoop Dogg
• East Coast: Notorious B.I.G., Jay-Z
• Modern: Kendrick Lamar, Drake, Travis Scott

**Electronic Music (1970s-present):**
• Synthesizers and drum machines
• Kraftwerk: Pioneers
• House music: Chicago
• Techno: Detroit
• EDM: Global festival culture
• Subgenres: Trance, dubstep, ambient, drum & bass

**Pop (1950s-present):**
• Commercially oriented, catchy
• Michael Jackson: "King of Pop"
• Madonna: "Queen of Pop"
• Boy bands, girl groups
• Modern: Taylor Swift, Ed Sheeran, BTS
• K-pop: Global phenomenon

**Country (1920s-present):**
• American South and West
• Storytelling tradition
• Hank Williams, Johnny Cash
• Nashville: Country music capital
• Modern country-pop crossover`
  },
  {
    topic: 'Musical Instruments',
    category: 'music',
    keywords: ['instrument', 'guitar', 'piano', 'drums', 'violin', 'playing music'],
    content: `Musical instruments create sound through various methods.

**String Instruments:**
• **Guitar:** 6 strings, fretted
  - Acoustic: Hollow body, natural sound
  - Electric: Solid body, amplified
  - Bass guitar: 4 strings, lower pitch
• **Violin:** Bowed, highest string instrument
• **Viola:** Slightly larger than violin
• **Cello:** Large, deep tone
• **Double bass:** Largest, lowest
• **Ukulele:** Small, 4 strings, Hawaiian
• **Harp:** Plucked, many strings

**Keyboard Instruments:**
• **Piano:** 88 keys, hammers strike strings
  - Grand piano: Horizontal strings
  - Upright: Vertical strings
  - Digital: Electronic reproduction
• **Organ:** Pipes or electronic
• **Synthesizer:** Electronic sound generation
• **Harpsichord:** Plucked strings, Baroque era

**Wind Instruments:**

**Woodwinds:**
• Flute: Blow across hole
• Clarinet: Single reed
• Oboe: Double reed
• Saxophone: Single reed, brass body
• Bassoon: Double reed, large

**Brass:**
• Trumpet: Highest, brightest
• Trombone: Slide mechanism
• French horn: Coiled, mellow
• Tuba: Largest, lowest

**Percussion:**
• **Drums:** Struck membranes
  - Drum kit: Snare, bass, toms, cymbals
  - Timpani: Orchestral, tuned
• **Xylophone/Marimba:** Tuned bars
• **Cymbals:** Metallic crash/ride/hi-hat
• **Tambourine, triangle, shakers**

**Learning an Instrument:**
• Start with basics
• Practice regularly (even 15 min/day)
• Learn to read music
• Play along with recordings
• Find a teacher or online resources
• Be patient with progress
• Play music you enjoy`
  },
];

ALL_KNOWLEDGE.push(...MUSIC_DEEP);

// =============================================================================
// LITERATURE AND WRITING
// =============================================================================

export const LITERATURE_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Literary Genres',
    category: 'literature',
    keywords: ['literature', 'genre', 'fiction', 'novel', 'poetry', 'drama', 'book'],
    content: `Literature encompasses various forms of written artistic expression.

**Fiction Genres:**

**Literary Fiction:**
• Character-driven narratives
• Explores human condition
• Emphasis on prose style
• Often award-winning
• Examples: Toni Morrison, Kazuo Ishiguro

**Mystery/Thriller:**
• Crime solving, suspense
• Whodunit: Classic detective story
• Thriller: Action and danger
• Noir: Dark, morally ambiguous
• Examples: Agatha Christie, Lee Child

**Science Fiction:**
• Speculative technology and science
• Hard sci-fi: Scientifically accurate
• Space opera: Epic space adventures
• Dystopian: Oppressive future societies
• Cyberpunk: High tech, low life
• Examples: Asimov, Philip K. Dick, Ursula K. Le Guin

**Fantasy:**
• Magical elements, imaginary worlds
• High fantasy: Epic, secondary world (Tolkien)
• Urban fantasy: Magic in modern world
• Dark fantasy: Horror elements
• Examples: Tolkien, Rowling, Sanderson

**Romance:**
• Love story central
• Happily ever after expected
• Subgenres: Historical, contemporary, paranormal
• Largest commercial fiction genre
• Examples: Nora Roberts, Nicholas Sparks

**Horror:**
• Fear and dread
• Supernatural or psychological
• Gothic: Dark, atmospheric
• Examples: Stephen King, Shirley Jackson

**Historical Fiction:**
• Set in past time period
• Blends fact and fiction
• Research-intensive
• Examples: Hilary Mantel, Ken Follett

**Non-Fiction Forms:**
• Biography/Autobiography/Memoir
• Essay
• Journalism
• Self-help
• History
• Science writing
• True crime

**Poetry Forms:**
• Sonnet: 14 lines, specific rhyme scheme
• Haiku: 5-7-5 syllables
• Free verse: No fixed structure
• Limerick: Humorous, AABBA
• Epic: Long narrative poem
• Lyric: Personal emotion`
  },
  {
    topic: 'Classic Literature',
    category: 'literature',
    keywords: ['classic', 'shakespeare', 'dickens', 'austen', 'novel', 'great books'],
    content: `Classic literature includes works that have stood the test of time.

**Ancient Classics:**
• **Homer:** Iliad, Odyssey (Greek epic poems)
• **Virgil:** Aeneid (Roman epic)
• **Ovid:** Metamorphoses
• **Sophocles:** Oedipus Rex, Antigone
• **Plato:** Republic, Symposium

**Medieval:**
• **Dante:** Divine Comedy
• **Chaucer:** Canterbury Tales
• **Murasaki Shikibu:** Tale of Genji (Japan)
• **Rumi:** Poetry (Persian)

**Renaissance/Early Modern:**
• **Shakespeare:** Hamlet, Romeo and Juliet, Macbeth, Othello
  - 37 plays, 154 sonnets
  - Invented many English words
  - Greatest writer in English language
• **Cervantes:** Don Quixote
• **Milton:** Paradise Lost

**18th-19th Century:**
• **Jane Austen:** Pride and Prejudice, Emma
• **Charles Dickens:** Great Expectations, Oliver Twist, A Tale of Two Cities
• **Mark Twain:** Adventures of Huckleberry Finn, Tom Sawyer
• **Leo Tolstoy:** War and Peace, Anna Karenina
• **Fyodor Dostoevsky:** Crime and Punishment, Brothers Karamazov
• **Charlotte Brontë:** Jane Eyre
• **Emily Brontë:** Wuthering Heights
• **Herman Melville:** Moby-Dick
• **Victor Hugo:** Les Misérables

**20th Century:**
• **F. Scott Fitzgerald:** The Great Gatsby
• **George Orwell:** 1984, Animal Farm
• **Harper Lee:** To Kill a Mockingbird
• **Gabriel García Márquez:** One Hundred Years of Solitude
• **Toni Morrison:** Beloved
• **Virginia Woolf:** Mrs Dalloway, To the Lighthouse
• **James Joyce:** Ulysses
• **Franz Kafka:** The Metamorphosis, The Trial
• **Ernest Hemingway:** The Old Man and the Sea
• **Albert Camus:** The Stranger

**Why Read Classics:**
• Understand cultural references
• Timeless themes
• Beautiful prose
• Historical perspective
• Develop critical thinking`
  },
  {
    topic: 'Creative Writing',
    category: 'literature',
    keywords: ['creative writing', 'story', 'character', 'plot', 'narrative', 'fiction writing'],
    content: `Creative writing is the art of crafting original narratives and poetry.

**Story Elements:**

**Character:**
• Protagonist: Main character
• Antagonist: Opposing force
• Character arc: Growth/change
• Motivation: What drives them
• Flaws: Make characters human
• Backstory: History that shapes them
• Show, don't tell

**Plot:**
• Exposition: Setup, introduce characters/setting
• Rising action: Complications build
• Climax: Turning point, highest tension
• Falling action: Consequences unfold
• Resolution: Loose ends tied up
• Subplots: Secondary storylines

**Setting:**
• Time and place
• Worldbuilding: Creating fictional worlds
• Atmosphere and mood
• Setting as character
• Research for authenticity

**Point of View:**
• First person: "I" narrator
• Second person: "You" (rare)
• Third person limited: One character's perspective
• Third person omniscient: All-knowing narrator
• Unreliable narrator: Can't be fully trusted

**Dialogue:**
• Reveals character
• Advances plot
• Sounds natural
• Subtext: What's unsaid
• Avoid info-dumping through dialogue
• Each character should sound distinct

**Writing Craft:**

**Show, Don't Tell:**
• Bad: "She was angry"
• Good: "She slammed the door, her jaw clenched"

**Voice:**
• Author's unique style
• Tone and word choice
• Consistency
• Develops over time

**Revision:**
• First draft: Get it down
• Second draft: Fix structure
• Third draft: Polish prose
• Kill your darlings
• Get feedback
• Read aloud

**Common Advice:**
• Write every day
• Read widely
• Write what you know (and research what you don't)
• Finish what you start
• Accept criticism
• Persist through rejection`
  },
];

ALL_KNOWLEDGE.push(...LITERATURE_DEEP);

// =============================================================================
// TECHNOLOGY AND COMPUTING
// =============================================================================

export const TECHNOLOGY_DEEP: KnowledgeEntry[] = [
  {
    topic: 'History of Computing',
    category: 'technology',
    keywords: ['computer history', 'computing', 'turing', 'transistor', 'microprocessor'],
    content: `The history of computing spans from ancient calculators to modern supercomputers.

**Early Computing:**
• Abacus: Ancient calculating tool
• Pascaline (1642): Mechanical calculator
• Babbage's Analytical Engine (1837): First general-purpose computer concept
• Ada Lovelace: First programmer
• Hollerith tabulating machine (1890): Punch cards

**Electromechanical Era:**
• Alan Turing: Theoretical foundations, Turing machine
• Enigma code-breaking (WWII)
• Colossus (1943): First electronic digital computer
• ENIAC (1945): General-purpose, 30 tons
• Von Neumann architecture: Stored-program concept

**Transistor Era (1950s-60s):**
• Transistor invented (1947): Bell Labs
• Replaced vacuum tubes
• Smaller, faster, more reliable
• IBM mainframes dominated business
• COBOL, FORTRAN programming languages

**Integrated Circuit Era (1960s-70s):**
• Multiple transistors on single chip
• Moore's Law: Transistors double every ~2 years
• Minicomputers: DEC PDP series
• UNIX operating system (1969)
• ARPANET: Precursor to internet (1969)
• C programming language

**Personal Computer Era (1970s-80s):**
• Altair 8800 (1975): First PC kit
• Apple II (1977): Consumer-friendly
• IBM PC (1981): Business standard
• MS-DOS, then Windows
• Macintosh (1984): GUI revolution
• Commodore 64: Best-selling computer

**Internet Era (1990s-2000s):**
• World Wide Web (Tim Berners-Lee, 1991)
• Mosaic/Netscape browsers
• Dot-com boom and bust
• Google (1998), Amazon (1994)
• Social media: Facebook (2004), Twitter (2006)
• Smartphones: iPhone (2007)

**Modern Era (2010s-present):**
• Cloud computing
• AI and machine learning
• Mobile-first world
• IoT (Internet of Things)
• Quantum computing research
• 5G networks
• Edge computing`
  },
  {
    topic: 'Artificial Intelligence',
    category: 'technology',
    keywords: ['ai', 'artificial intelligence', 'chatgpt', 'gpt', 'deep learning', 'neural network'],
    content: `Artificial Intelligence aims to create machines that can think and learn.

**Types of AI:**

**Narrow AI (ANI):**
• Designed for specific tasks
• All current AI systems
• Examples: Siri, chess engines, recommendation systems
• Very good at one thing

**General AI (AGI):**
• Human-level intelligence
• Can learn any intellectual task
• Does not yet exist
• Major research goal
• Debated timeline

**Superintelligent AI (ASI):**
• Surpasses human intelligence
• Theoretical/speculative
• Existential risk debates
• Far future (if ever)

**Key Technologies:**

**Machine Learning:**
• Algorithms learn from data
• Supervised, unsupervised, reinforcement
• Requires large datasets
• Improves with more data

**Deep Learning:**
• Neural networks with many layers
• Image recognition, NLP
• Requires significant computing power
• GPUs accelerated progress
• Breakthrough results since 2012

**Natural Language Processing (NLP):**
• Understanding and generating human language
• Chatbots and virtual assistants
• Translation
• Sentiment analysis
• Text generation (GPT, Claude, etc.)

**Computer Vision:**
• Understanding images and video
• Object detection and recognition
• Facial recognition
• Medical imaging
• Self-driving cars

**Large Language Models (LLMs):**
• Trained on vast text data
• GPT series (OpenAI)
• Claude (Anthropic)
• Gemini (Google)
• Generate human-like text
• Few-shot learning
• Limitations: Hallucinations, bias

**AI Ethics:**
• Bias in training data
• Job displacement
• Privacy concerns
• Deepfakes
• Autonomous weapons
• Transparency and explainability
• Regulation debates

**Applications:**
• Healthcare: Diagnosis, drug discovery
• Finance: Fraud detection, trading
• Transportation: Self-driving vehicles
• Education: Personalized learning
• Creative: Art, music, writing
• Science: Research acceleration`
  },
  {
    topic: 'Cybersecurity',
    category: 'technology',
    keywords: ['cybersecurity', 'hacking', 'malware', 'phishing', 'firewall', 'password'],
    content: `Cybersecurity protects systems, networks, and data from digital attacks.

**Common Threats:**

**Malware:**
• **Virus:** Attaches to programs, spreads
• **Worm:** Self-replicating, spreads via network
• **Trojan:** Disguised as legitimate software
• **Ransomware:** Encrypts files, demands payment
• **Spyware:** Monitors activity secretly
• **Adware:** Unwanted advertisements
• **Rootkit:** Hides deep in system

**Social Engineering:**
• **Phishing:** Fake emails/websites to steal info
• **Spear phishing:** Targeted at specific person
• **Vishing:** Voice phishing (phone calls)
• **Smishing:** SMS phishing
• **Pretexting:** Creating false scenario
• **Baiting:** Offering something enticing

**Network Attacks:**
• **DDoS:** Overwhelm server with traffic
• **Man-in-the-middle:** Intercept communications
• **DNS spoofing:** Redirect to fake sites
• **SQL injection:** Database manipulation
• **Zero-day:** Exploit unknown vulnerabilities

**Protection Measures:**

**Passwords:**
• Use strong, unique passwords
• Password manager recommended
• Multi-factor authentication (MFA)
• Never reuse passwords
• Passphrases: Longer, easier to remember

**Software:**
• Keep everything updated
• Antivirus/anti-malware
• Firewall enabled
• VPN for public networks
• Ad blockers

**Practices:**
• Don't click suspicious links
• Verify sender before opening attachments
• Back up data regularly (3-2-1 rule)
• Encrypt sensitive data
• Use HTTPS websites
• Be cautious on public Wi-Fi

**For Organizations:**
• Security awareness training
• Incident response plan
• Regular security audits
• Access control (least privilege)
• Network segmentation
• Penetration testing
• Security Operations Center (SOC)

**Career in Cybersecurity:**
• Growing demand
• Certifications: CompTIA Security+, CISSP, CEH
• Ethical hacking
• Security analyst, engineer, architect
• Incident response
• Forensics`
  },
  {
    topic: 'Internet and Networking',
    category: 'technology',
    keywords: ['internet', 'network', 'tcp ip', 'dns', 'http', 'wifi', 'protocol'],
    content: `The internet is a global network of interconnected computers.

**How the Internet Works:**
• Network of networks
• Data travels in packets
• Routers direct traffic
• ISPs provide access
• Backbone: High-speed fiber optic cables
• Undersea cables connect continents

**Key Protocols:**

**TCP/IP:**
• Foundation of internet communication
• TCP: Reliable, ordered delivery
• IP: Addressing and routing
• IPv4: 32-bit addresses (running out)
• IPv6: 128-bit addresses (future)

**HTTP/HTTPS:**
• Web communication protocol
• Request-response model
• HTTPS: Encrypted (SSL/TLS)
• Methods: GET, POST, PUT, DELETE
• Status codes: 200 (OK), 404 (Not Found), 500 (Server Error)

**DNS (Domain Name System):**
• Translates domain names to IP addresses
• Like a phone book for the internet
• Hierarchical system
• Root servers, TLD servers, authoritative servers
• Caching for speed

**Other Protocols:**
• FTP: File transfer
• SMTP/IMAP/POP3: Email
• SSH: Secure remote access
• WebSocket: Real-time communication
• DHCP: Automatic IP assignment

**Networking Concepts:**

**OSI Model (7 Layers):**
1. Physical: Cables, signals
2. Data Link: MAC addresses, switches
3. Network: IP addresses, routers
4. Transport: TCP/UDP, ports
5. Session: Connection management
6. Presentation: Encryption, compression
7. Application: HTTP, FTP, DNS

**Network Types:**
• LAN: Local Area Network
• WAN: Wide Area Network
• WLAN: Wireless LAN (Wi-Fi)
• VPN: Virtual Private Network

**Wi-Fi:**
• Wireless networking standard (IEEE 802.11)
• Generations: Wi-Fi 4, 5, 6, 6E, 7
• 2.4 GHz: Longer range, slower
• 5 GHz: Shorter range, faster
• Security: WPA3 recommended

**Cloud Computing:**
• On-demand computing resources
• IaaS: Infrastructure (AWS EC2)
• PaaS: Platform (Heroku)
• SaaS: Software (Gmail, Office 365)
• Benefits: Scalability, cost, accessibility`
  },
];

ALL_KNOWLEDGE.push(...TECHNOLOGY_DEEP);

// =============================================================================
// PSYCHOLOGY DEEP DIVE
// =============================================================================

export const PSYCHOLOGY_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Cognitive Psychology',
    category: 'psychology',
    keywords: ['cognitive', 'thinking', 'perception', 'attention', 'memory', 'decision'],
    content: `Cognitive psychology studies mental processes like thinking, memory, and perception.

**Attention:**
• Selective attention: Focus on one thing
• Divided attention: Multitasking (limited)
• Sustained attention: Maintaining focus
• Cocktail party effect: Hearing your name in noise
• Inattentional blindness: Missing obvious things
• Change blindness: Not noticing changes

**Perception:**
• How we interpret sensory information
• Top-down: Expectations influence perception
• Bottom-up: Data-driven processing
• Gestalt principles: Proximity, similarity, closure
• Optical illusions: Perception errors
• Perceptual constancy: Objects stay same despite changes

**Memory Systems:**
• Sensory: Very brief, large capacity
• Short-term/Working: 7±2 items, ~30 seconds
• Long-term: Unlimited, permanent
• Encoding: Getting info in
• Storage: Keeping info
• Retrieval: Getting info out

**Memory Improvement:**
• Chunking: Group information
• Mnemonics: Memory aids
• Spaced repetition: Review over time
• Elaboration: Connect to existing knowledge
• Method of loci: Mental palace
• Sleep consolidates memories

**Decision Making:**
• Heuristics: Mental shortcuts
• Availability: Judge by ease of recall
• Representativeness: Judge by similarity
• Anchoring: First info influences
• Framing: How options are presented
• Loss aversion: Losses hurt more than gains please

**Cognitive Biases:**
• Confirmation bias: Seek confirming info
• Dunning-Kruger: Incompetent overestimate ability
• Hindsight bias: "I knew it all along"
• Sunk cost fallacy: Continue because invested
• Optimism bias: Overestimate good outcomes
• Status quo bias: Prefer current state
• Bandwagon effect: Follow the crowd

**Problem Solving:**
• Algorithm: Step-by-step procedure
• Heuristic: Rule of thumb
• Insight: Sudden "aha!" moment
• Functional fixedness: Can't see new uses
• Mental set: Stuck in one approach`
  },
  {
    topic: 'Developmental Psychology',
    category: 'psychology',
    keywords: ['development', 'child', 'adolescent', 'piaget', 'erikson', 'growth'],
    content: `Developmental psychology studies how people change throughout life.

**Piaget's Stages of Cognitive Development:**
1. **Sensorimotor (0-2 years):**
   • Learn through senses and actions
   • Object permanence develops
   • Begin symbolic thought
2. **Preoperational (2-7 years):**
   • Language development
   • Egocentric thinking
   • Symbolic play
   • Not yet logical
3. **Concrete Operational (7-11 years):**
   • Logical thinking about concrete things
   • Conservation: Quantity stays same
   • Classification and seriation
4. **Formal Operational (11+ years):**
   • Abstract thinking
   • Hypothetical reasoning
   • Scientific thinking

**Erikson's Psychosocial Stages:**
1. Trust vs Mistrust (0-1): Caregiver reliability
2. Autonomy vs Shame (1-3): Independence
3. Initiative vs Guilt (3-6): Purpose
4. Industry vs Inferiority (6-12): Competence
5. Identity vs Role Confusion (12-18): Who am I?
6. Intimacy vs Isolation (18-40): Relationships
7. Generativity vs Stagnation (40-65): Contributing
8. Integrity vs Despair (65+): Life review

**Attachment Theory (Bowlby/Ainsworth):**
• Secure: Comfortable with closeness
• Anxious-ambivalent: Clingy, worried
• Avoidant: Distant, self-reliant
• Disorganized: Inconsistent
• Early attachment affects adult relationships

**Language Development:**
• Babbling: 6-9 months
• First words: ~12 months
• Two-word stage: ~18-24 months
• Language explosion: 2-3 years
• Grammar mastery: 5-6 years
• Critical period for language learning

**Adolescent Development:**
• Puberty: Physical changes
• Identity formation
• Peer influence increases
• Risk-taking behavior
• Abstract thinking develops
• Emotional regulation developing

**Adult Development:**
• Emerging adulthood (18-25)
• Career and relationship formation
• Midlife transitions
• Cognitive changes with aging
• Wisdom and experience
• Successful aging factors`
  },
  {
    topic: 'Social Psychology',
    category: 'psychology',
    keywords: ['social psychology', 'conformity', 'obedience', 'group', 'persuasion', 'prejudice'],
    content: `Social psychology studies how people think about and influence each other.

**Social Influence:**

**Conformity:**
• Changing behavior to match group
• Asch experiment: Line length judgment
• Informational: Believe group is right
• Normative: Want to fit in
• Factors: Group size, unanimity, culture

**Obedience:**
• Following authority figures
• Milgram experiment: Shocking strangers
• 65% obeyed to maximum level
• Factors: Authority legitimacy, proximity, responsibility
• Ethical implications

**Group Dynamics:**
• Social facilitation: Perform better with audience (simple tasks)
• Social loafing: Less effort in groups
• Groupthink: Desire for harmony overrides critical thinking
• Deindividuation: Loss of self-awareness in groups
• Bystander effect: Less likely to help with more people present

**Persuasion:**
• Central route: Logical arguments, evidence
• Peripheral route: Cues, emotions, attractiveness
• Foot-in-the-door: Small request first
• Door-in-the-face: Large request first, then smaller
• Reciprocity: Return favors
• Scarcity: Limited availability increases desire

**Attitudes:**
• Cognitive dissonance: Discomfort from conflicting beliefs
• Self-perception theory: Infer attitudes from behavior
• Attitude change through persuasion
• Behavior doesn't always match attitudes

**Prejudice and Discrimination:**
• Stereotypes: Generalized beliefs about groups
• Prejudice: Negative attitudes
• Discrimination: Negative actions
• In-group/out-group bias
• Contact hypothesis: Interaction reduces prejudice
• Implicit bias: Unconscious associations

**Attraction and Relationships:**
• Proximity: Physical closeness
• Similarity: Shared attitudes, values
• Physical attractiveness
• Reciprocity: Liking those who like us
• Attachment styles in adult relationships
• Love: Passionate vs companionate

**Prosocial Behavior:**
• Altruism: Helping without reward
• Empathy: Understanding others' feelings
• Bystander effect: Diffusion of responsibility
• Factors: Mood, similarity, cost of helping`
  },
  {
    topic: 'Mental Health',
    category: 'psychology',
    keywords: ['mental health', 'anxiety', 'depression', 'therapy', 'counseling', 'wellbeing'],
    content: `Mental health is essential to overall wellbeing.

**Common Conditions:**

**Depression:**
• Persistent sadness, loss of interest
• Affects sleep, appetite, energy
• Difficulty concentrating
• Feelings of worthlessness
• Can be mild to severe
• Treatable with therapy and/or medication

**Anxiety Disorders:**
• Generalized anxiety: Excessive worry
• Social anxiety: Fear of social situations
• Panic disorder: Sudden intense fear
• Phobias: Specific fears
• OCD: Obsessive thoughts, compulsive behaviors
• PTSD: After traumatic events

**Other Conditions:**
• Bipolar disorder: Mood swings (mania/depression)
• ADHD: Attention and hyperactivity
• Eating disorders: Anorexia, bulimia, binge eating
• Schizophrenia: Altered perception of reality
• Personality disorders: Patterns of behavior
• Substance use disorders

**Treatment Approaches:**

**Psychotherapy:**
• CBT (Cognitive Behavioral Therapy): Change thought patterns
• DBT (Dialectical Behavior Therapy): Emotion regulation
• Psychodynamic: Explore unconscious patterns
• Humanistic: Self-actualization
• EMDR: Trauma processing

**Medication:**
• Antidepressants: SSRIs, SNRIs
• Anti-anxiety: Benzodiazepines (short-term)
• Mood stabilizers
• Antipsychotics
• Should be prescribed by professionals

**Self-Care Strategies:**
• Regular exercise
• Adequate sleep
• Social connection
• Stress management
• Mindfulness and meditation
• Limiting alcohol/substances
• Setting boundaries
• Seeking help when needed

**When to Seek Help:**
• Symptoms persist more than 2 weeks
• Interfering with daily life
• Thoughts of self-harm
• Substance abuse
• Relationship problems
• Difficulty functioning

**Reducing Stigma:**
• Mental health is health
• Treatment is strength, not weakness
• Talk openly about mental health
• Support others without judgment
• Educate yourself`
  },
];

ALL_KNOWLEDGE.push(...PSYCHOLOGY_DEEP);

// =============================================================================
// SPORTS AND FITNESS DEEP DIVE
// =============================================================================

export const SPORTS_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Football (Soccer)',
    category: 'sports',
    keywords: ['football', 'soccer', 'fifa', 'world cup', 'premier league', 'goal'],
    content: `Football (soccer) is the world's most popular sport with over 4 billion fans.

**Basic Rules:**
• 11 players per team
• 90 minutes (two 45-minute halves)
• Ball must cross goal line to score
• Offside rule: Can't be behind last defender when ball is played
• Fouls result in free kicks or penalties
• Yellow card: Warning; Red card: Ejection
• Goalkeeper only player who can use hands (in penalty area)

**Major Competitions:**
• **FIFA World Cup:** Every 4 years, biggest sporting event
  - First: 1930 (Uruguay)
  - Most wins: Brazil (5)
  - 2022: Argentina (Messi)
• **UEFA Champions League:** Top European clubs
• **Premier League:** England, most-watched league globally
• **La Liga:** Spain (Real Madrid, Barcelona)
• **Serie A:** Italy
• **Bundesliga:** Germany
• **Copa América:** South American nations
• **UEFA European Championship (Euros)**

**Legendary Players:**
• Pelé: Brazilian, 3 World Cups
• Diego Maradona: Argentine, "Hand of God"
• Lionel Messi: Argentine, 8 Ballon d'Or awards
• Cristiano Ronaldo: Portuguese, all-time top scorer
• Johan Cruyff: Dutch, Total Football
• Zinedine Zidane: French, elegant playmaker

**Tactics:**
• Formations: 4-4-2, 4-3-3, 3-5-2
• Possession-based (tiki-taka)
• Counter-attacking
• High press: Win ball back quickly
• Parking the bus: Deep defensive block
• Set pieces: Corners, free kicks

**Positions:**
• Goalkeeper (GK)
• Defenders: Center-back, full-back, wing-back
• Midfielders: Defensive, central, attacking
• Forwards: Striker, winger
• Modern roles are fluid`
  },
  {
    topic: 'Basketball',
    category: 'sports',
    keywords: ['basketball', 'nba', 'dunk', 'three pointer', 'court', 'lebron'],
    content: `Basketball was invented by James Naismith in 1891 in Springfield, Massachusetts.

**Basic Rules:**
• 5 players per team on court
• 4 quarters of 12 minutes (NBA) or 10 (FIBA)
• Score by shooting ball through hoop (10 feet high)
• 2 points inside arc, 3 points outside
• Free throws: 1 point each
• 24-second shot clock (NBA)
• Dribble to move with ball

**NBA (National Basketball Association):**
• 30 teams (Eastern and Western Conference)
• Regular season: 82 games
• Playoffs: Best of 7 series
• NBA Finals: Championship
• Most titles: Boston Celtics (18)
• Draft: Teams select college/international players

**Greatest Players:**
• Michael Jordan: 6 championships, cultural icon
• LeBron James: All-time leading scorer
• Kareem Abdul-Jabbar: Skyhook
• Magic Johnson: Showtime Lakers
• Larry Bird: Celtics legend
• Kobe Bryant: Mamba Mentality
• Wilt Chamberlain: 100-point game
• Bill Russell: 11 championships
• Stephen Curry: 3-point revolution
• Shaquille O'Neal: Dominant center

**Key Skills:**
• Shooting: Jump shot, layup, free throw
• Dribbling: Crossover, behind-the-back
• Passing: Assist, no-look, alley-oop
• Defense: Man-to-man, zone
• Rebounding: Offensive and defensive
• Court vision and basketball IQ

**Basketball Culture:**
• Streetball and playground culture
• March Madness: NCAA tournament
• WNBA: Women's professional league
• Global growth: International players in NBA
• Sneaker culture: Jordan brand
• Basketball in Olympics since 1936`
  },
  {
    topic: 'Olympic Games',
    category: 'sports',
    keywords: ['olympics', 'olympic games', 'gold medal', 'athlete', 'summer olympics', 'winter olympics'],
    content: `The Olympic Games are the world's foremost international multi-sport event.

**Ancient Olympics:**
• Began 776 BCE in Olympia, Greece
• Held every 4 years
• Events: Running, wrestling, chariot racing
• Sacred truce during games
• Only Greek male citizens
• Ended 393 CE by Roman Emperor Theodosius

**Modern Olympics:**
• Revived by Pierre de Coubertin (1896, Athens)
• Summer and Winter Games
• Olympic rings: 5 continents
• Motto: "Citius, Altius, Fortius" (Faster, Higher, Stronger)
• Olympic flame and torch relay
• Opening and closing ceremonies

**Summer Olympics Sports:**
• Track and field (athletics)
• Swimming and diving
• Gymnastics
• Basketball, volleyball, soccer
• Tennis, table tennis, badminton
• Boxing, judo, wrestling, fencing
• Cycling, rowing, sailing
• Newer: Skateboarding, surfing, climbing, breaking

**Winter Olympics Sports:**
• Alpine and cross-country skiing
• Figure skating and speed skating
• Ice hockey
• Snowboarding
• Biathlon
• Bobsled, luge, skeleton
• Curling
• Ski jumping

**Most Decorated Olympians:**
• Michael Phelps: 28 medals (23 gold) - Swimming
• Larisa Latynina: 18 medals - Gymnastics
• Usain Bolt: 8 gold - Sprinting
• Carl Lewis: 10 medals - Track and field
• Simone Biles: Most decorated gymnast

**Notable Moments:**
• Jesse Owens (1936 Berlin): Defied Nazi ideology
• 1968 Mexico City: Black Power salute
• 1980/1984: Cold War boycotts
• Dream Team (1992): US basketball
• Nadia Comăneci (1976): First perfect 10
• Usain Bolt (2008-2016): Sprint dominance

**Paralympics:**
• Athletes with disabilities
• Held after each Olympics
• Growing in size and prestige
• Inspiring athletic achievements
• Categories based on disability type`
  },
  {
    topic: 'Fitness and Exercise Science',
    category: 'health',
    keywords: ['fitness', 'exercise', 'workout', 'strength', 'cardio', 'training'],
    content: `Exercise science studies how physical activity affects the body.

**Types of Exercise:**

**Cardiovascular (Aerobic):**
• Running, cycling, swimming
• Improves heart and lung health
• Burns calories
• Reduces disease risk
• 150 min/week moderate or 75 min vigorous recommended
• Zone 2 training: Sustainable, fat-burning pace

**Strength Training (Resistance):**
• Builds muscle and bone density
• Increases metabolism
• Improves functional strength
• Free weights, machines, bodyweight
• 2-3 sessions per week recommended
• Progressive overload: Gradually increase difficulty

**Flexibility:**
• Stretching: Static and dynamic
• Yoga: Flexibility + strength + balance
• Prevents injury
• Improves range of motion
• Best after warming up

**HIIT (High-Intensity Interval Training):**
• Short bursts of intense exercise
• Followed by rest periods
• Time-efficient
• Burns calories during and after
• Example: 30 sec sprint, 30 sec rest

**Key Principles:**

**Progressive Overload:**
• Gradually increase stress on body
• More weight, reps, sets, or frequency
• Essential for continued improvement
• Avoid too much too soon

**Recovery:**
• Muscles grow during rest, not exercise
• Sleep: 7-9 hours crucial
• Rest days: 1-2 per week minimum
• Nutrition: Protein for repair
• Active recovery: Light movement
• Overtraining: Decreased performance, injury risk

**Nutrition for Fitness:**
• Protein: 0.7-1g per pound bodyweight
• Carbs: Energy for exercise
• Fats: Hormones, joint health
• Hydration: Before, during, after
• Timing: Pre and post-workout meals
• Supplements: Most unnecessary with good diet

**Common Exercises:**
• Squat: Legs, glutes, core
• Deadlift: Posterior chain
• Bench press: Chest, shoulders, triceps
• Pull-up: Back, biceps
• Overhead press: Shoulders
• Plank: Core stability
• Lunges: Single-leg strength

**Starting a Fitness Routine:**
• Start slow, build gradually
• Find activities you enjoy
• Set realistic goals
• Track progress
• Be consistent over perfect
• Consider a trainer initially
• Listen to your body`
  },
  {
    topic: 'Martial Arts',
    category: 'sports',
    keywords: ['martial arts', 'karate', 'judo', 'boxing', 'mma', 'taekwondo', 'kung fu'],
    content: `Martial arts are codified systems of combat practices.

**Striking Arts:**

**Boxing:**
• Punches only (jab, cross, hook, uppercut)
• Footwork and head movement
• Weight classes
• 12 rounds professional
• Famous: Muhammad Ali, Mike Tyson, Floyd Mayweather

**Karate:**
• Japanese origin
• Strikes, kicks, blocks
• Kata: Choreographed forms
• Belt ranking system (white to black)
• Styles: Shotokan, Goju-ryu, Kyokushin
• Olympic sport since 2020

**Taekwondo:**
• Korean origin
• Emphasis on kicks
• Olympic sport
• Belt system
• Forms (poomsae) and sparring

**Muay Thai:**
• Thai boxing
• "Art of Eight Limbs": Fists, elbows, knees, shins
• Clinch fighting
• National sport of Thailand
• Foundation for many MMA fighters

**Grappling Arts:**

**Judo:**
• Japanese, founded by Jigoro Kano
• Throws and takedowns
• Ground control and submissions
• Olympic sport
• "Gentle way"

**Brazilian Jiu-Jitsu (BJJ):**
• Ground fighting focus
• Submissions: Chokes, joint locks
• Guard positions
• Belt system: White to black (10+ years)
• Gracie family developed it
• Essential for MMA

**Wrestling:**
• One of oldest sports
• Freestyle and Greco-Roman (Olympic)
• Takedowns, pins, control
• Foundation for many combat sports

**Mixed Martial Arts (MMA):**
• Combines striking and grappling
• UFC: Largest organization
• Weight classes
• 3 or 5 rounds
• Win by KO, submission, or decision
• Requires well-rounded skills

**Traditional Arts:**
• Kung Fu: Chinese, many styles
• Aikido: Japanese, redirecting force
• Krav Maga: Israeli self-defense
• Capoeira: Brazilian, dance-like
• Wing Chun: Chinese, close-range

**Benefits:**
• Physical fitness
• Self-defense
• Discipline and respect
• Confidence
• Stress relief
• Community`
  },
];

ALL_KNOWLEDGE.push(...SPORTS_DEEP);

// =============================================================================
// SPACE EXPLORATION
// =============================================================================

export const SPACE_EXPLORATION: KnowledgeEntry[] = [
  {
    topic: 'History of Space Exploration',
    category: 'science',
    keywords: ['space', 'nasa', 'rocket', 'astronaut', 'moon landing', 'mars'],
    content: `Space exploration has expanded humanity's reach beyond Earth.

**Space Race (1957-1969):**
• Cold War competition: USA vs USSR
• **Sputnik (1957):** First satellite (USSR)
• **Yuri Gagarin (1961):** First human in space (USSR)
• **Alan Shepard (1961):** First American in space
• **John Glenn (1962):** First American to orbit Earth
• **Valentina Tereshkova (1963):** First woman in space
• **Apollo 11 (1969):** First Moon landing
  - Neil Armstrong: "One small step for man..."
  - Buzz Aldrin walked on Moon
  - Michael Collins orbited above

**Apollo Program:**
• 6 successful Moon landings (1969-1972)
• Apollo 13: "Houston, we've had a problem"
• 12 people walked on the Moon
• Brought back 842 pounds of lunar samples
• Last mission: Apollo 17 (1972)

**Space Shuttle Era (1981-2011):**
• Reusable spacecraft
• 135 missions
• Built International Space Station
• Hubble Space Telescope deployment and repair
• Challenger disaster (1986): 73 seconds after launch
• Columbia disaster (2003): During re-entry

**International Space Station (ISS):**
• Orbits Earth at ~250 miles altitude
• Continuous habitation since 2000
• International cooperation: US, Russia, Europe, Japan, Canada
• Size of football field
• Microgravity research
• Visible from Earth with naked eye

**Robotic Exploration:**
• **Mars rovers:** Spirit, Opportunity, Curiosity, Perseverance
• **Voyager 1 & 2:** Beyond solar system
• **Cassini:** Saturn exploration
• **New Horizons:** Pluto flyby (2015)
• **James Webb Space Telescope:** Deep space observation
• **Hubble Space Telescope:** Iconic images since 1990

**Modern Space Era:**
• **SpaceX:** Reusable rockets, Starship
  - Falcon 9: Routine launches
  - Dragon: Crew and cargo to ISS
  - Starlink: Satellite internet
• **Blue Origin:** Jeff Bezos, New Shepard
• **Virgin Galactic:** Space tourism
• **Artemis Program:** Return to Moon
• **Mars missions:** Goal for 2030s-2040s

**Future of Space:**
• Moon base (Artemis)
• Mars colonization
• Asteroid mining
• Space tourism
• Interstellar travel (far future)
• Search for extraterrestrial life`
  },
  {
    topic: 'Solar System',
    category: 'science',
    keywords: ['solar system', 'planet', 'sun', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'],
    content: `Our solar system contains the Sun and everything bound to it by gravity.

**The Sun:**
• Yellow dwarf star (G-type)
• 99.86% of solar system's mass
• Surface temperature: ~5,500°C
• Core temperature: ~15 million°C
• Age: ~4.6 billion years
• Will become red giant in ~5 billion years
• Solar wind and magnetic field

**Inner Planets (Rocky/Terrestrial):**

**Mercury:**
• Closest to Sun
• Smallest planet
• No atmosphere
• Extreme temperatures: -180°C to 430°C
• No moons
• Heavily cratered

**Venus:**
• Similar size to Earth
• Thick CO2 atmosphere
• Hottest planet: 465°C (greenhouse effect)
• Rotates backwards (retrograde)
• "Morning/Evening Star"
• No moons

**Earth:**
• Only known planet with life
• Liquid water on surface
• Protective atmosphere and magnetic field
• One moon (Luna)
• 71% water surface
• Tilted axis creates seasons

**Mars:**
• "Red Planet" (iron oxide)
• Thin CO2 atmosphere
• Olympus Mons: Largest volcano in solar system
• Valles Marineris: Massive canyon system
• Two small moons: Phobos, Deimos
• Evidence of past water
• Target for human exploration

**Outer Planets (Gas/Ice Giants):**

**Jupiter:**
• Largest planet (1,300 Earths could fit inside)
• Gas giant: Mostly hydrogen and helium
• Great Red Spot: Giant storm
• 95 known moons (Europa may have subsurface ocean)
• Strong magnetic field
• Faint ring system

**Saturn:**
• Famous ring system (ice and rock)
• Second-largest planet
• Gas giant, less dense than water
• 146 known moons
• Titan: Largest moon, has atmosphere
• Enceladus: Ice geysers, possible life

**Uranus:**
• Ice giant
• Rotates on its side (98° tilt)
• Blue-green color (methane)
• 27 known moons
• Faint rings
• Coldest planetary atmosphere: -224°C

**Neptune:**
• Farthest planet
• Ice giant
• Strongest winds in solar system
• 16 known moons
• Triton: Large moon, orbits backwards
• Deep blue color

**Other Objects:**
• Dwarf planets: Pluto, Eris, Ceres, Makemake, Haumea
• Asteroid belt: Between Mars and Jupiter
• Kuiper Belt: Beyond Neptune
• Oort Cloud: Outermost region
• Comets: Icy bodies with tails`
  },
];

ALL_KNOWLEDGE.push(...SPACE_EXPLORATION);

// =============================================================================
// ENVIRONMENTAL SCIENCE DEEP DIVE
// =============================================================================

export const ENVIRONMENTAL_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Climate Change',
    category: 'environment',
    keywords: ['climate change', 'global warming', 'greenhouse', 'carbon', 'emissions', 'temperature'],
    content: `Climate change refers to long-term shifts in global temperatures and weather patterns.

**The Science:**
• Greenhouse effect: Gases trap heat in atmosphere
• Key greenhouse gases: CO2, methane, nitrous oxide, water vapor
• Pre-industrial CO2: ~280 ppm
• Current CO2: ~420 ppm (highest in 800,000+ years)
• Global temperature: ~1.1°C above pre-industrial
• 97%+ of climate scientists agree: Human-caused

**Causes:**
• Burning fossil fuels (coal, oil, gas): ~75% of emissions
• Deforestation: Reduces CO2 absorption
• Agriculture: Methane from livestock, rice paddies
• Industrial processes: Cement, steel production
• Transportation: Cars, planes, ships
• Energy production: Power plants

**Effects:**
• Rising temperatures
• Melting ice caps and glaciers
• Sea level rise (~3.6mm/year)
• More extreme weather events
• Ocean acidification
• Shifting ecosystems and habitats
• Coral reef bleaching
• Permafrost thawing
• Agricultural disruption
• Water scarcity in some regions

**Tipping Points:**
• Ice sheet collapse (Greenland, Antarctica)
• Amazon rainforest dieback
• Permafrost methane release
• Atlantic circulation shutdown
• Coral reef die-off
• These could trigger cascading effects

**Solutions:**

**Mitigation (Reducing Emissions):**
• Renewable energy: Solar, wind, hydro
• Electric vehicles
• Energy efficiency
• Carbon capture and storage
• Nuclear energy
• Reforestation
• Sustainable agriculture
• Reducing meat consumption

**Adaptation:**
• Sea walls and flood defenses
• Drought-resistant crops
• Early warning systems
• Urban planning for heat
• Water conservation
• Infrastructure resilience

**International Efforts:**
• Paris Agreement (2015): Limit warming to 1.5-2°C
• IPCC reports: Scientific assessments
• COP conferences: Annual climate summits
• Net zero targets: Many countries by 2050
• Carbon markets and pricing
• Green finance and investment`
  },
  {
    topic: 'Renewable Energy',
    category: 'environment',
    keywords: ['renewable', 'solar', 'wind', 'energy', 'sustainable', 'clean energy'],
    content: `Renewable energy comes from naturally replenishing sources.

**Solar Energy:**
• Photovoltaic (PV) panels: Convert sunlight to electricity
• Concentrated solar power: Mirrors focus sunlight
• Costs dropped 90%+ since 2010
• Fastest-growing energy source
• Works even on cloudy days (reduced output)
• Rooftop and utility-scale installations
• Solar farms in deserts
• Challenges: Intermittency, storage, land use

**Wind Energy:**
• Turbines convert wind to electricity
• Onshore and offshore wind farms
• Offshore: Stronger, more consistent winds
• Costs competitive with fossil fuels
• Largest turbines: 15+ MW
• Challenges: Intermittency, visual impact, wildlife

**Hydroelectric:**
• Oldest renewable source
• Dams generate electricity from flowing water
• Provides ~16% of global electricity
• Reliable and controllable
• Pumped storage: Energy storage method
• Challenges: Environmental impact, drought vulnerability

**Geothermal:**
• Heat from Earth's interior
• Used for electricity and heating
• Iceland: 90% of heating from geothermal
• Reliable, 24/7 operation
• Limited to geologically active areas
• Enhanced geothermal systems expanding reach

**Biomass and Biofuels:**
• Organic material for energy
• Wood, crop waste, algae
• Ethanol, biodiesel
• Carbon-neutral in theory
• Debates about sustainability
• Competition with food production

**Energy Storage:**
• Lithium-ion batteries: Most common
• Grid-scale battery farms
• Pumped hydro: Largest storage method
• Hydrogen: Potential long-term storage
• Compressed air storage
• Essential for renewable grid

**Nuclear Energy:**
• Not renewable but low-carbon
• Provides ~10% of global electricity
• Reliable baseload power
• Safety concerns (Chernobyl, Fukushima)
• Nuclear waste storage challenge
• Small modular reactors: Future technology
• Fusion: Holy grail, still in research

**The Transition:**
• Renewables now cheapest new electricity in most places
• Global capacity growing rapidly
• Grid modernization needed
• Job creation in clean energy
• Energy independence benefits
• Investment accelerating`
  },
  {
    topic: 'Biodiversity and Conservation',
    category: 'environment',
    keywords: ['biodiversity', 'conservation', 'extinction', 'endangered', 'wildlife', 'habitat'],
    content: `Biodiversity is the variety of life on Earth at all levels.

**Why Biodiversity Matters:**
• Ecosystem services: Clean air, water, pollination
• Food security: Genetic diversity in crops
• Medicine: Many drugs from natural sources
• Climate regulation
• Cultural and aesthetic value
• Economic value: Trillions of dollars annually
• Resilience: Diverse ecosystems recover better

**Current Crisis:**
• Sixth mass extinction underway
• Species going extinct 100-1,000x faster than natural rate
• ~1 million species threatened with extinction
• 40% of amphibians threatened
• 33% of reef-building corals threatened
• 25% of mammals threatened
• Insect populations declining dramatically

**Causes of Biodiversity Loss:**
• Habitat destruction: Deforestation, urbanization
• Climate change: Shifting habitats
• Pollution: Pesticides, plastics, chemicals
• Overexploitation: Overfishing, poaching
• Invasive species: Outcompete natives
• Disease: Amphibian chytrid fungus

**Conservation Strategies:**

**Protected Areas:**
• National parks and reserves
• Marine protected areas
• Wildlife corridors connecting habitats
• ~17% of land, ~8% of ocean protected
• Goal: 30% by 2030

**Species Conservation:**
• Endangered species laws
• Captive breeding programs
• Reintroduction to wild
• Anti-poaching efforts
• CITES: International trade regulation
• Seed banks and gene banks

**Ecosystem Restoration:**
• Reforestation and afforestation
• Wetland restoration
• Coral reef restoration
• Rewilding: Reintroducing keystone species
• UN Decade of Ecosystem Restoration (2021-2030)

**Success Stories:**
• Bald eagle recovery (US)
• Giant panda: Downlisted from endangered
• Humpback whale population recovery
• Yellowstone wolf reintroduction
• Costa Rica: Forest cover doubled

**What Individuals Can Do:**
• Reduce, reuse, recycle
• Support sustainable products
• Reduce meat consumption
• Plant native species
• Support conservation organizations
• Reduce pesticide use
• Citizen science participation`
  },
];

ALL_KNOWLEDGE.push(...ENVIRONMENTAL_DEEP);

// =============================================================================
// COOKING AND FOOD SCIENCE
// =============================================================================

export const COOKING_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Cooking Techniques',
    category: 'cooking',
    keywords: ['cooking', 'technique', 'baking', 'roasting', 'sauteing', 'grilling'],
    content: `Mastering cooking techniques is fundamental to great food.

**Dry Heat Methods:**

**Roasting/Baking:**
• Oven cooking with dry heat
• Roasting: Higher temp, meats and vegetables
• Baking: Breads, pastries, casseroles
• Convection: Fan circulates air for even cooking
• Temperature control is key
• Maillard reaction: Browning = flavor

**Grilling/Broiling:**
• Direct high heat
• Grilling: Heat from below
• Broiling: Heat from above
• Creates char and smoky flavor
• Quick cooking method
• Best for tender cuts, vegetables

**Sautéing:**
• Quick cooking in small amount of fat
• High heat, constant movement
• Pan should be hot before adding food
• Don't overcrowd the pan
• French technique: "to jump"

**Stir-Frying:**
• Very high heat, constant stirring
• Wok is traditional vessel
• Quick cooking preserves texture
• Cut ingredients uniformly small
• Oil with high smoke point

**Pan-Frying/Deep-Frying:**
• Pan-frying: Moderate oil, one side at a time
• Deep-frying: Submerged in hot oil (350-375°F)
• Creates crispy exterior
• Temperature control prevents greasiness
• Drain on paper towels

**Moist Heat Methods:**

**Boiling/Simmering:**
• Boiling: 212°F/100°C, vigorous bubbles
• Simmering: 180-200°F, gentle bubbles
• Poaching: Below simmer, very gentle
• Blanching: Brief boil, then ice bath
• Good for pasta, grains, vegetables

**Steaming:**
• Cook with steam, not direct water contact
• Preserves nutrients and color
• Gentle cooking method
• Great for fish, vegetables, dumplings

**Braising/Stewing:**
• Low and slow in liquid
• Braising: Large pieces, less liquid
• Stewing: Small pieces, more liquid
• Breaks down tough connective tissue
• Develops deep flavors
• Dutch oven ideal

**Essential Skills:**
• Knife skills: Dice, mince, julienne, chiffonade
• Seasoning: Salt throughout cooking
• Tasting as you go
• Mise en place: Everything in its place
• Temperature awareness
• Resting meat after cooking`
  },
  {
    topic: 'Food Science',
    category: 'cooking',
    keywords: ['food science', 'maillard', 'fermentation', 'emulsion', 'gluten', 'chemistry'],
    content: `Food science explains the chemistry behind cooking.

**Maillard Reaction:**
• Browning reaction between amino acids and sugars
• Occurs above 280°F/140°C
• Creates hundreds of flavor compounds
• Responsible for: Bread crust, seared meat, roasted coffee
• Not the same as caramelization
• Requires dry surface (pat meat dry!)

**Caramelization:**
• Sugar breaks down when heated
• Starts at 320°F/160°C
• Creates nutty, complex flavors
• Different sugars caramelize at different temps
• Can go from perfect to burnt quickly

**Emulsification:**
• Combining two immiscible liquids (oil and water)
• Emulsifiers: Egg yolk (lecithin), mustard
• Vinaigrette: Temporary emulsion
• Mayonnaise: Permanent emulsion
• Hollandaise: Warm emulsion
• Technique: Add oil slowly while whisking

**Gluten:**
• Protein network in wheat flour
• Forms when flour is mixed with water
• Provides structure and chewiness
• More mixing = more gluten development
• Bread: High gluten desired
• Pastry: Minimal gluten desired
• Gluten-free alternatives: Rice, almond, coconut flour

**Fermentation:**
• Microorganisms convert sugars
• Yeast: Bread rising, beer, wine
• Bacteria: Yogurt, sauerkraut, kimchi
• Creates unique flavors and preserves food
• Sourdough: Wild yeast fermentation
• Kombucha: Fermented tea

**Acids and Bases:**
• Acid: Lemon juice, vinegar (brightens flavors)
• Base: Baking soda (tenderizes, browns)
• pH affects texture and color
• Acid denatures protein (ceviche)
• Baking soda + acid = CO2 (leavening)

**Heat Transfer:**
• Conduction: Direct contact (pan to food)
• Convection: Moving fluid (oven air, boiling water)
• Radiation: Electromagnetic waves (broiler, grill)
• Understanding helps control cooking

**Salt:**
• Enhances flavor (most important seasoning)
• Draws out moisture (osmosis)
• Tenderizes meat (brining)
• Controls fermentation
• Different types: Table, kosher, sea, flake
• Season in layers throughout cooking`
  },
  {
    topic: 'World Cuisines',
    category: 'cooking',
    keywords: ['cuisine', 'italian', 'french', 'thai', 'mexican', 'recipe', 'food culture'],
    content: `World cuisines reflect culture, geography, and history.

**Italian Cuisine:**
• Emphasis on quality ingredients
• Regional diversity
• Pasta: Hundreds of shapes, each with purpose
• Pizza: Neapolitan origin
• Olive oil, tomatoes, garlic, basil
• Risotto, osso buco, tiramisu
• Wine culture integral
• "Less is more" philosophy

**French Cuisine:**
• Foundation of Western cooking
• Mother sauces: Béchamel, velouté, espagnole, hollandaise, tomato
• Techniques: Mise en place, classical methods
• Bread and pastry tradition
• Regional specialties
• Wine and cheese pairing
• Haute cuisine and bistro culture

**Thai Cuisine:**
• Balance of flavors: Sweet, sour, salty, spicy, bitter
• Fresh herbs: Basil, cilantro, lemongrass, galangal
• Coconut milk in curries
• Fish sauce: Umami backbone
• Pad Thai, green curry, tom yum
• Street food culture
• Rice with every meal

**Japanese Cuisine:**
• Emphasis on freshness and seasonality
• Umami: Fifth taste (dashi, soy sauce, miso)
• Presentation is art
• Sushi, ramen, tempura
• Washoku: Traditional meal structure
• Tea ceremony
• Minimal seasoning, maximum quality

**Mexican Cuisine:**
• Corn, beans, chili peppers: Holy trinity
• Complex sauces: Mole (20+ ingredients)
• Tortillas: Corn and flour
• Regional diversity
• Street food: Tacos, elotes, tamales
• Chocolate and vanilla originated here
• UNESCO Intangible Cultural Heritage

**Indian Cuisine:**
• Spice mastery: Complex blends
• Regional diversity: North vs South
• Vegetarian tradition
• Tandoor: Clay oven cooking
• Curry: Diverse sauce-based dishes
• Bread variety: Naan, roti, paratha
• Chai culture

**Chinese Cuisine:**
• Eight great traditions
• Wok cooking: High heat, quick
• Dim sum: Small dishes, tea service
• Balance of flavors and textures
• Soy sauce, ginger, garlic, scallion
• Regional: Cantonese, Sichuan, Hunan, Shanghai

**Mediterranean Diet:**
• Olive oil, fish, vegetables, whole grains
• Moderate wine consumption
• Limited red meat
• One of healthiest diets studied
• Reduces heart disease risk
• Cultural: Shared meals, fresh ingredients`
  },
  {
    topic: 'Baking Fundamentals',
    category: 'cooking',
    keywords: ['baking', 'bread', 'cake', 'pastry', 'flour', 'yeast', 'dough'],
    content: `Baking is both art and science, requiring precision and understanding.

**Essential Ingredients:**

**Flour:**
• All-purpose: Versatile, moderate protein
• Bread flour: High protein, more gluten
• Cake flour: Low protein, tender crumb
• Whole wheat: Includes bran and germ
• Protein content determines structure

**Leavening:**
• **Yeast:** Biological, produces CO2
  - Active dry: Needs proofing
  - Instant: Can add directly
  - Sourdough starter: Wild yeast
• **Baking powder:** Chemical, double-acting
• **Baking soda:** Needs acid to activate
• **Steam:** Puff pastry, choux
• **Eggs:** Whipped for volume

**Fats:**
• Butter: Flavor, flakiness, tenderness
• Oil: Moisture, tender crumb
• Shortening: Flakiness, no water content
• Lard: Traditional, very flaky

**Sugar:**
• Sweetness and moisture
• Helps browning (Maillard, caramelization)
• Tenderizes by competing with gluten
• Types: Granulated, brown, powdered, honey

**Eggs:**
• Structure (protein coagulation)
• Leavening (whipped)
• Emulsification
• Moisture
• Color and richness

**Bread Baking:**
• Mix → Knead → First rise → Shape → Second rise → Bake
• Kneading develops gluten
• Fermentation: Flavor development
• Windowpane test: Gluten development check
• Internal temp: 190-210°F when done
• Steam in oven: Crispy crust

**Cake Baking:**
• Creaming method: Beat butter and sugar
• Alternate dry and wet ingredients
• Don't overmix (tough cake)
• Room temperature ingredients
• Test with toothpick
• Cool before frosting

**Pastry:**
• Pie crust: Keep fat cold, minimal mixing
• Puff pastry: Laminated dough, hundreds of layers
• Choux: Cooked dough, steam-leavened
• Shortcrust: Crumbly, tender

**Troubleshooting:**
• Dense bread: Not enough kneading or rising
• Flat cookies: Butter too warm
• Dry cake: Overbaked or too much flour
• Tough muffins: Overmixed
• Sunken cake: Oven opened too early`
  },
];

ALL_KNOWLEDGE.push(...COOKING_DEEP);

// =============================================================================
// MATHEMATICS EXTENDED
// =============================================================================

export const MATH_ADVANCED: KnowledgeEntry[] = [
  {
    topic: 'Calculus',
    category: 'mathematics',
    keywords: ['calculus', 'derivative', 'integral', 'limit', 'differentiation', 'integration'],
    content: `Calculus studies continuous change through derivatives and integrals.

**Limits:**
• Foundation of calculus
• Value a function approaches
• lim(x→a) f(x) = L
• One-sided limits: Left and right
• Limits at infinity
• L'Hôpital's rule for indeterminate forms

**Derivatives (Differentiation):**
• Rate of change at a point
• Slope of tangent line
• f'(x) = lim(h→0) [f(x+h) - f(x)] / h
• **Rules:**
  - Power rule: d/dx(x^n) = nx^(n-1)
  - Product rule: (fg)' = f'g + fg'
  - Quotient rule: (f/g)' = (f'g - fg')/g²
  - Chain rule: d/dx[f(g(x))] = f'(g(x))·g'(x)
• Common derivatives:
  - d/dx(sin x) = cos x
  - d/dx(cos x) = -sin x
  - d/dx(e^x) = e^x
  - d/dx(ln x) = 1/x

**Applications of Derivatives:**
• Finding maxima and minima
• Optimization problems
• Related rates
• Velocity and acceleration
• Curve sketching
• Linear approximation

**Integrals (Integration):**
• Reverse of differentiation
• Area under a curve
• ∫f(x)dx = F(x) + C (indefinite)
• ∫[a,b] f(x)dx = F(b) - F(a) (definite)
• **Techniques:**
  - Substitution (u-substitution)
  - Integration by parts
  - Partial fractions
  - Trigonometric substitution

**Applications of Integrals:**
• Area between curves
• Volume of revolution
• Arc length
• Work and force
• Probability distributions
• Average value of function

**Fundamental Theorem of Calculus:**
• Connects derivatives and integrals
• Part 1: d/dx ∫[a,x] f(t)dt = f(x)
• Part 2: ∫[a,b] f(x)dx = F(b) - F(a)
• Most important theorem in calculus`
  },
  {
    topic: 'Linear Algebra',
    category: 'mathematics',
    keywords: ['linear algebra', 'matrix', 'vector', 'eigenvalue', 'determinant', 'transformation'],
    content: `Linear algebra studies vectors, matrices, and linear transformations.

**Vectors:**
• Quantities with magnitude and direction
• Represented as arrays of numbers
• Addition: Component-wise
• Scalar multiplication: Scale each component
• Dot product: a·b = |a||b|cos(θ)
• Cross product: Perpendicular vector (3D)
• Unit vector: Magnitude of 1

**Matrices:**
• Rectangular array of numbers
• m × n: m rows, n columns
• Addition: Element-wise (same dimensions)
• Multiplication: Row × column
• Not commutative: AB ≠ BA generally
• Identity matrix: AI = IA = A
• Transpose: Swap rows and columns

**Matrix Operations:**
• Determinant: Scalar value, measures scaling
  - 2×2: ad - bc
  - Larger: Cofactor expansion
  - det = 0 means singular (no inverse)
• Inverse: A⁻¹ such that AA⁻¹ = I
• Rank: Number of independent rows/columns
• Trace: Sum of diagonal elements

**Systems of Linear Equations:**
• Ax = b
• Gaussian elimination: Row reduction
• Row echelon form
• Reduced row echelon form
• Solutions: Unique, infinite, or none
• Cramer's rule using determinants

**Eigenvalues and Eigenvectors:**
• Av = λv (v is eigenvector, λ is eigenvalue)
• Characteristic equation: det(A - λI) = 0
• Fundamental in many applications
• Diagonalization: A = PDP⁻¹
• Used in: PCA, quantum mechanics, vibrations

**Vector Spaces:**
• Set of vectors with addition and scalar multiplication
• Subspaces: Subsets that are also vector spaces
• Basis: Minimal spanning set
• Dimension: Number of basis vectors
• Null space, column space, row space

**Applications:**
• Computer graphics: Transformations
• Machine learning: Data representation
• Physics: Quantum mechanics
• Engineering: Systems of equations
• Economics: Input-output models
• Google PageRank algorithm`
  },
  {
    topic: 'Statistics and Probability',
    category: 'mathematics',
    keywords: ['statistics', 'probability', 'mean', 'standard deviation', 'distribution', 'hypothesis'],
    content: `Statistics analyzes data; probability measures likelihood of events.

**Descriptive Statistics:**
• **Mean:** Average (sum / count)
• **Median:** Middle value
• **Mode:** Most frequent value
• **Range:** Max - min
• **Variance:** Average squared deviation from mean
• **Standard deviation:** Square root of variance
• **Quartiles:** Q1, Q2 (median), Q3
• **IQR:** Q3 - Q1 (interquartile range)

**Probability Basics:**
• P(event) = favorable outcomes / total outcomes
• 0 ≤ P ≤ 1
• P(A or B) = P(A) + P(B) - P(A and B)
• P(A and B) = P(A) × P(B|A)
• Independent events: P(A and B) = P(A) × P(B)
• Complement: P(not A) = 1 - P(A)
• Conditional: P(A|B) = P(A and B) / P(B)

**Distributions:**
• **Normal (Gaussian):** Bell curve
  - 68-95-99.7 rule (within 1, 2, 3 standard deviations)
  - Many natural phenomena
  - Central limit theorem
• **Binomial:** Fixed number of yes/no trials
• **Poisson:** Events in fixed interval
• **Uniform:** Equal probability
• **Exponential:** Time between events

**Inferential Statistics:**
• **Hypothesis testing:**
  - Null hypothesis (H₀): No effect
  - Alternative hypothesis (H₁): Effect exists
  - p-value: Probability of results if H₀ true
  - Significance level (α): Usually 0.05
  - Reject H₀ if p < α
• **Confidence intervals:**
  - Range likely containing true parameter
  - 95% CI most common
  - Wider interval = more confident
• **t-test:** Compare means
• **Chi-square:** Test independence
• **ANOVA:** Compare multiple groups

**Regression:**
• Linear regression: y = mx + b
• Correlation coefficient (r): -1 to 1
• R²: Proportion of variance explained
• Multiple regression: Multiple predictors
• Logistic regression: Binary outcomes

**Bayes' Theorem:**
• P(A|B) = P(B|A) × P(A) / P(B)
• Updates probability with new evidence
• Foundation of Bayesian statistics
• Used in spam filters, medical diagnosis, AI`
  },
];

ALL_KNOWLEDGE.push(...MATH_ADVANCED);

// =============================================================================
// WORLD HISTORY MODERN ERA
// =============================================================================

export const MODERN_HISTORY: KnowledgeEntry[] = [
  {
    topic: 'World War I',
    category: 'history',
    keywords: ['world war 1', 'wwi', 'great war', 'trench', 'treaty of versailles'],
    content: `World War I (1914-1918) was the first global conflict of the modern era.

**Causes:**
• Alliance system: Triple Entente vs Triple Alliance
• Imperialism: Competition for colonies
• Militarism: Arms race, especially naval
• Nationalism: Ethnic tensions
• Assassination of Archduke Franz Ferdinand (June 28, 1914)
• Chain reaction of alliance obligations

**Key Participants:**
• **Allied Powers:** Britain, France, Russia, Italy, US (1917)
• **Central Powers:** Germany, Austria-Hungary, Ottoman Empire
• Over 30 nations eventually involved

**Major Events:**
• Western Front: Trench warfare in France/Belgium
• Eastern Front: Russia vs Germany/Austria-Hungary
• Gallipoli Campaign (1915): Failed Allied invasion
• Battle of the Somme (1916): 1 million+ casualties
• Battle of Verdun (1916): 700,000+ casualties
• Unrestricted submarine warfare
• US entry (1917): Tipped balance
• Russian Revolution (1917): Russia exits war
• Armistice: November 11, 1918

**Trench Warfare:**
• Defensive stalemate
• Miles of trenches across Western Front
• No Man's Land between opposing trenches
• Terrible conditions: Mud, rats, disease
• New weapons: Machine guns, poison gas, tanks, aircraft
• Massive casualties for minimal territorial gains

**Consequences:**
• ~17 million dead, ~20 million wounded
• Treaty of Versailles (1919): Harsh terms for Germany
• Collapse of empires: Ottoman, Austro-Hungarian, Russian, German
• League of Nations formed
• Redrawing of European and Middle Eastern borders
• Seeds of World War II
• Spanish Flu pandemic (1918-1919): 50-100 million dead`
  },
  {
    topic: 'World War II',
    category: 'history',
    keywords: ['world war 2', 'wwii', 'hitler', 'holocaust', 'normandy', 'd-day', 'atomic bomb'],
    content: `World War II (1939-1945) was the deadliest conflict in human history.

**Causes:**
• Treaty of Versailles resentment
• Rise of fascism: Hitler (Germany), Mussolini (Italy)
• Japanese expansionism in Asia
• Appeasement policy failed
• German invasion of Poland (September 1, 1939)

**Key Participants:**
• **Allies:** Britain, France, USSR, US, China, and others
• **Axis:** Germany, Italy, Japan

**European Theater:**
• Blitzkrieg: German lightning war
• Fall of France (1940)
• Battle of Britain (1940): RAF vs Luftwaffe
• Operation Barbarossa (1941): Germany invades USSR
• Battle of Stalingrad (1942-43): Turning point in East
• D-Day (June 6, 1944): Allied invasion of Normandy
• Battle of the Bulge (1944-45)
• Fall of Berlin (May 1945)
• V-E Day: May 8, 1945

**Pacific Theater:**
• Pearl Harbor (December 7, 1941): US enters war
• Battle of Midway (1942): Turning point
• Island hopping campaign
• Iwo Jima and Okinawa
• Atomic bombs: Hiroshima (Aug 6) and Nagasaki (Aug 9, 1945)
• V-J Day: August 15, 1945

**The Holocaust:**
• Nazi genocide of 6 million Jews
• Also targeted: Roma, disabled, LGBTQ+, political opponents
• Concentration and extermination camps
• Auschwitz: Largest death camp
• Nuremberg Trials: War crimes prosecution
• "Never again"

**Consequences:**
• 70-85 million dead (deadliest conflict ever)
• United Nations founded (1945)
• Cold War begins: US vs USSR
• Decolonization accelerates
• Marshall Plan: European reconstruction
• Nuclear age begins
• Universal Declaration of Human Rights (1948)
• State of Israel established (1948)`
  },
  {
    topic: 'Cold War',
    category: 'history',
    keywords: ['cold war', 'soviet', 'communism', 'nuclear', 'berlin wall', 'iron curtain'],
    content: `The Cold War (1947-1991) was a geopolitical rivalry between the US and USSR.

**Origins:**
• Ideological conflict: Capitalism vs Communism
• Post-WWII power vacuum
• Iron Curtain: Division of Europe
• Truman Doctrine: Contain communism
• Marshall Plan: Economic aid to Western Europe
• NATO (1949) vs Warsaw Pact (1955)

**Key Events:**

**Berlin (1948-1989):**
• Berlin Blockade (1948-49): Soviet blockade, Allied airlift
• Berlin Wall built (1961): Divided East and West
• "Ich bin ein Berliner" - JFK (1963)
• Berlin Wall falls (November 9, 1989)

**Korean War (1950-1953):**
• North Korea (communist) invades South
• UN forces (led by US) intervene
• China enters on North's side
• Armistice, not peace treaty
• Korea remains divided

**Cuban Missile Crisis (1962):**
• Soviet nuclear missiles in Cuba
• Closest to nuclear war
• 13 days of tension
• Kennedy and Khrushchev negotiate
• Missiles removed, US pledges not to invade Cuba

**Vietnam War (1955-1975):**
• US supports South Vietnam vs communist North
• Escalation under Johnson
• Anti-war movement in US
• Tet Offensive (1968): Turning point
• US withdrawal (1973)
• Fall of Saigon (1975): Communist victory

**Space Race:**
• Sputnik (1957) → Moon landing (1969)
• Demonstrated technological superiority
• Eventually led to cooperation (ISS)

**Arms Race:**
• Nuclear weapons buildup
• MAD: Mutually Assured Destruction
• Arms control treaties: SALT, START
• Nuclear testing and proliferation concerns

**End of Cold War:**
• Gorbachev: Glasnost (openness), Perestroika (restructuring)
• Eastern European revolutions (1989)
• Berlin Wall falls (1989)
• German reunification (1990)
• Soviet Union dissolves (December 1991)
• US emerges as sole superpower`
  },
  {
    topic: 'Civil Rights Movement',
    category: 'history',
    keywords: ['civil rights', 'martin luther king', 'segregation', 'equality', 'rosa parks'],
    content: `The Civil Rights Movement fought for racial equality in the United States.

**Background:**
• Slavery abolished (1865, 13th Amendment)
• Jim Crow laws: Legal segregation in South
• "Separate but equal" (Plessy v. Ferguson, 1896)
• Discrimination in housing, employment, voting
• Lynching and racial violence

**Key Events:**

**Brown v. Board of Education (1954):**
• Supreme Court rules segregation in schools unconstitutional
• Overturns "separate but equal"
• Thurgood Marshall argued the case
• Resistance in South: "Massive resistance"

**Montgomery Bus Boycott (1955-56):**
• Rosa Parks refuses to give up seat
• 381-day boycott of city buses
• Martin Luther King Jr. emerges as leader
• Supreme Court rules bus segregation unconstitutional

**Little Rock Nine (1957):**
• Nine Black students integrate Central High School
• Arkansas governor tries to block them
• President Eisenhower sends federal troops
• Symbol of resistance to integration

**Sit-ins and Freedom Rides (1960-61):**
• Greensboro sit-ins: Students at lunch counters
• Freedom Riders: Integrated bus travel through South
• Faced violence but persisted
• Drew national attention

**March on Washington (1963):**
• 250,000+ people
• Martin Luther King Jr.: "I Have a Dream" speech
• Peaceful demonstration for jobs and freedom
• Helped push Civil Rights Act

**Key Legislation:**
• Civil Rights Act (1964): Banned discrimination
• Voting Rights Act (1965): Protected voting rights
• Fair Housing Act (1968): Banned housing discrimination

**Key Figures:**
• Martin Luther King Jr.: Nonviolent resistance, Nobel Peace Prize
• Rosa Parks: "Mother of the Civil Rights Movement"
• Malcolm X: Black nationalism, later broader vision
• John Lewis: Freedom Rider, congressman
• Medgar Evers: NAACP leader, assassinated
• Thurgood Marshall: First Black Supreme Court Justice

**Legacy:**
• Ended legal segregation
• Inspired movements worldwide
• Ongoing struggle for racial justice
• Black Lives Matter continues the work
• Systemic racism still addressed today`
  },
];

ALL_KNOWLEDGE.push(...MODERN_HISTORY);

// =============================================================================
// LANGUAGE AND LINGUISTICS
// =============================================================================

export const LANGUAGE_DEEP: KnowledgeEntry[] = [
  {
    topic: 'How Language Works',
    category: 'language',
    keywords: ['linguistics', 'language', 'grammar', 'syntax', 'phonetics', 'semantics'],
    content: `Linguistics is the scientific study of language.

**Branches of Linguistics:**

**Phonetics:**
• Study of speech sounds
• How sounds are produced (articulatory)
• How sounds are perceived (auditory)
• How sounds are measured (acoustic)
• International Phonetic Alphabet (IPA)
• Vowels and consonants

**Phonology:**
• Sound patterns in languages
• Phonemes: Meaningful sound units
• Allophones: Variations of phonemes
• Syllable structure
• Stress and intonation patterns
• Tone languages (Mandarin, Yoruba)

**Morphology:**
• Study of word structure
• Morphemes: Smallest meaningful units
• Prefixes, suffixes, roots
• Inflection: Changing word form (walk → walked)
• Derivation: Creating new words (happy → unhappy)
• Compound words (blackbird, toothbrush)

**Syntax:**
• Study of sentence structure
• Word order rules
• Phrase structure
• Subject-Verb-Object (English)
• Subject-Object-Verb (Japanese, Korean)
• Verb-Subject-Object (Arabic, Irish)
• Transformational grammar (Chomsky)

**Semantics:**
• Study of meaning
• Word meaning (lexical semantics)
• Sentence meaning (compositional)
• Ambiguity: Multiple meanings
• Synonyms, antonyms, homonyms
• Metaphor and figurative language

**Pragmatics:**
• Language in context
• Speech acts: Requesting, promising, apologizing
• Implicature: Implied meaning
• Politeness strategies
• Context-dependent interpretation
• Conversational maxims (Grice)

**Language Families:**
• Indo-European: English, Spanish, Hindi, Russian
• Sino-Tibetan: Mandarin, Cantonese, Tibetan
• Afro-Asiatic: Arabic, Hebrew, Amharic
• Niger-Congo: Swahili, Yoruba, Zulu
• Austronesian: Malay, Tagalog, Hawaiian
• ~7,000 languages worldwide
• ~40% endangered

**Language Acquisition:**
• Children acquire language naturally
• Critical period: Before puberty
• Universal Grammar theory (Chomsky)
• Stages: Babbling → words → sentences
• Bilingualism: Cognitive benefits
• Second language learning differs from first`
  },
  {
    topic: 'Writing Systems',
    category: 'language',
    keywords: ['writing', 'alphabet', 'script', 'hieroglyphics', 'characters', 'writing system'],
    content: `Writing systems represent language visually.

**Types of Writing Systems:**

**Alphabets:**
• Letters represent individual sounds
• **Latin:** Most widely used (English, Spanish, French)
• **Cyrillic:** Russian, Ukrainian, Bulgarian
• **Greek:** Greek language, math symbols
• **Arabic:** Right-to-left, connected letters
• **Hebrew:** Right-to-left, consonantal

**Syllabaries:**
• Characters represent syllables
• **Japanese Hiragana/Katakana:** ~46 characters each
• **Cherokee:** Created by Sequoyah
• **Ethiopian (Ge'ez):** Amharic, Tigrinya

**Logographic:**
• Characters represent words or morphemes
• **Chinese characters (Hanzi):** Thousands of characters
• **Japanese Kanji:** Borrowed from Chinese
• **Ancient Egyptian hieroglyphics**

**Abugidas:**
• Consonant-vowel combinations
• **Devanagari:** Hindi, Sanskrit
• **Thai script**
• **Tibetan script**
• **Ethiopic script**

**History of Writing:**
• Cuneiform (~3400 BCE): Mesopotamia, wedge-shaped
• Hieroglyphics (~3200 BCE): Egypt, pictorial
• Chinese characters (~1200 BCE): Oracle bones
• Phoenician alphabet (~1050 BCE): Basis for many scripts
• Greek alphabet (~800 BCE): Added vowels
• Latin alphabet: From Greek via Etruscan
• Rosetta Stone: Key to deciphering hieroglyphics

**Modern Developments:**
• Printing press (1440): Mass literacy
• Typewriter (1860s): Standardized typing
• Unicode: Digital standard for all scripts
• Emoji: Modern pictographic communication
• Digital fonts and typography
• OCR: Optical character recognition`
  },
];

ALL_KNOWLEDGE.push(...LANGUAGE_DEEP);

// =============================================================================
// ARCHITECTURE AND DESIGN
// =============================================================================

export const ARCHITECTURE_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Architectural Styles',
    category: 'architecture',
    keywords: ['architecture', 'building', 'design', 'gothic', 'modern', 'style'],
    content: `Architecture reflects culture, technology, and artistic vision across history.

**Ancient Architecture:**
• **Egyptian:** Pyramids, temples, massive stone
• **Greek:** Columns (Doric, Ionic, Corinthian), Parthenon
• **Roman:** Arches, domes, concrete (Pantheon, Colosseum)
• **Mesoamerican:** Step pyramids (Maya, Aztec)

**Medieval:**
• **Romanesque (1000-1200):** Thick walls, round arches, small windows
• **Gothic (1200-1500):** Pointed arches, flying buttresses, stained glass
  - Notre-Dame, Chartres Cathedral
  - Height and light as spiritual expression
  - Ribbed vaults

**Renaissance (1400-1600):**
• Revival of classical Greek/Roman forms
• Symmetry and proportion
• Domes: Florence Cathedral (Brunelleschi)
• St. Peter's Basilica (Michelangelo)
• Palladio: Villa Rotonda

**Baroque (1600-1750):**
• Dramatic, ornate, emotional
• Curved forms, rich decoration
• Versailles Palace
• St. Paul's Cathedral (Wren)

**Neoclassical (1750-1850):**
• Return to Greek/Roman simplicity
• Columns, pediments, symmetry
• US Capitol, White House
• British Museum

**Art Nouveau (1890-1910):**
• Organic, flowing forms
• Nature-inspired decoration
• Gaudí: Sagrada Família
• Paris Metro entrances

**Modern Architecture (1920s-1970s):**
• "Form follows function"
• Minimal decoration
• Steel, glass, concrete
• Le Corbusier: Villa Savoye
• Mies van der Rohe: "Less is more"
• Frank Lloyd Wright: Fallingwater, organic architecture
• Bauhaus school: Design + function
• International Style: Glass curtain walls

**Postmodern (1970s-1990s):**
• Reaction against modernism
• Playful, eclectic, historical references
• Robert Venturi: "Less is a bore"
• Color and ornamentation return

**Contemporary:**
• Deconstructivism: Gehry (Bilbao Guggenheim), Hadid
• Sustainable/Green architecture
• Parametric design: Computer-generated forms
• Adaptive reuse: Repurposing old buildings
• Biophilic design: Nature integration
• Smart buildings: Technology integration`
  },
  {
    topic: 'Interior Design Principles',
    category: 'design',
    keywords: ['interior design', 'decoration', 'furniture', 'color', 'space', 'home'],
    content: `Interior design creates functional and aesthetically pleasing spaces.

**Design Principles:**

**Balance:**
• Symmetrical: Mirror image (formal)
• Asymmetrical: Different but equal visual weight (casual)
• Radial: Elements around central point

**Proportion and Scale:**
• Furniture appropriate to room size
• Golden ratio in design
• Human scale: Comfortable for people
• Avoid oversized or undersized pieces

**Rhythm and Repetition:**
• Repeating elements create visual flow
• Color, pattern, texture repetition
• Alternation and progression
• Guides the eye through space

**Emphasis (Focal Point):**
• Every room needs a focal point
• Fireplace, artwork, window view
• Draw attention to best features
• Don't compete with multiple focal points

**Harmony and Unity:**
• All elements work together
• Consistent style throughout
• Color palette ties rooms together
• Variety within unity

**Color Theory in Design:**
• Warm colors: Red, orange, yellow (energizing)
• Cool colors: Blue, green, purple (calming)
• Neutral colors: White, gray, beige (versatile)
• 60-30-10 rule: Dominant, secondary, accent
• Color affects mood and perception
• Light colors make rooms feel larger

**Design Styles:**
• **Minimalist:** Clean lines, few items, neutral
• **Scandinavian:** Light, functional, cozy (hygge)
• **Industrial:** Raw materials, exposed brick/pipes
• **Mid-Century Modern:** 1950s-60s, organic forms
• **Bohemian:** Eclectic, colorful, layered
• **Traditional:** Classic, ornate, symmetrical
• **Farmhouse:** Rustic, warm, natural materials
• **Japanese/Wabi-sabi:** Imperfection, simplicity

**Practical Tips:**
• Measure before buying furniture
• Layer lighting: Ambient, task, accent
• Use rugs to define spaces
• Mix textures for interest
• Plants add life and air quality
• Declutter regularly
• Personal items make it home`
  },
];

ALL_KNOWLEDGE.push(...ARCHITECTURE_KNOWLEDGE);

// =============================================================================
// TRANSPORTATION AND ENGINEERING
// =============================================================================

export const TRANSPORTATION_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'History of Transportation',
    category: 'technology',
    keywords: ['transportation', 'car', 'airplane', 'train', 'ship', 'travel history'],
    content: `Transportation technology has transformed human civilization.

**Ancient Transportation:**
• Walking: Original mode
• Domesticated animals: Horses, camels, donkeys (~4000 BCE)
• Wheel invention (~3500 BCE): Mesopotamia
• Boats and ships: River and coastal travel
• Roman roads: Engineering marvel, connected empire
• Silk Road: Trade routes across Asia

**Maritime Revolution:**
• Viking longships (800-1100 CE)
• Chinese junks: Advanced sailing technology
• Age of Sail (1500s-1800s)
• Caravel: Portuguese exploration ship
• Galleon: Spanish treasure ships
• Clipper ships: Fastest sailing vessels
• Steamships (1800s): Reliable, faster

**Rail Transportation:**
• Steam locomotive (1804): Richard Trevithick
• Liverpool-Manchester Railway (1830): First passenger line
• Transcontinental Railroad (US, 1869)
• Trans-Siberian Railway: Longest line
• Diesel and electric locomotives
• High-speed rail: Shinkansen (1964), TGV, Maglev
• Bullet trains: 200+ mph

**Automobile:**
• Karl Benz: First practical automobile (1885)
• Henry Ford: Assembly line, Model T (1908)
• Mass production made cars affordable
• Interstate Highway System (US, 1956)
• Fuel injection, safety features evolution
• Electric vehicles: Tesla revolution
• Self-driving cars: In development

**Aviation:**
• Wright Brothers: First powered flight (1903)
• WWI: Military aviation advances
• Charles Lindbergh: Solo transatlantic (1927)
• WWII: Jet engines developed
• Commercial aviation: Boeing 707 (1958)
• Concorde: Supersonic passenger travel (1976-2003)
• Boeing 747: "Jumbo jet," democratized air travel
• Modern: A380, 787 Dreamliner

**Space Transportation:**
• V-2 rocket: First to reach space
• Saturn V: Moon rocket
• Space Shuttle: Reusable
• SpaceX Falcon 9: Reusable orbital rocket
• Future: Starship, space tourism

**Future Transportation:**
• Electric vehicles mainstream
• Autonomous vehicles
• Hyperloop concept
• Urban air mobility (flying taxis)
• Hydrogen fuel cells
• Sustainable aviation fuel`
  },
  {
    topic: 'Civil Engineering',
    category: 'engineering',
    keywords: ['engineering', 'bridge', 'dam', 'tunnel', 'construction', 'infrastructure'],
    content: `Civil engineering designs and builds infrastructure.

**Bridges:**
• **Beam bridge:** Simplest, horizontal beam
• **Arch bridge:** Curved, transfers weight to supports
• **Suspension bridge:** Cables from towers
  - Golden Gate Bridge (1937)
  - Akashi Kaikyo Bridge: Longest suspension span
• **Cable-stayed:** Cables directly to towers
• **Truss bridge:** Triangular framework
• Materials: Steel, concrete, stone, wood

**Dams:**
• **Gravity dam:** Weight holds back water
• **Arch dam:** Curved, transfers force to canyon walls
• **Embankment dam:** Earth and rock fill
• Three Gorges Dam: Largest hydroelectric
• Hoover Dam: Iconic US dam
• Functions: Water supply, flood control, hydropower

**Tunnels:**
• **Cut-and-cover:** Dig trench, cover
• **Bored:** Tunnel boring machine (TBM)
• **Immersed tube:** Prefabricated sections sunk
• Channel Tunnel: UK-France, 31 miles
• Gotthard Base Tunnel: Longest rail tunnel (35 miles)
• Subway systems worldwide

**Skyscrapers:**
• Steel frame construction
• Elevator invention enabled tall buildings
• Empire State Building (1931): 102 floors
• Burj Khalifa (2010): Tallest at 2,717 feet
• Wind and earthquake engineering
• Foundation engineering for heavy loads
• Curtain wall systems

**Roads and Highways:**
• Roman roads: First engineered roads
• Macadam: Layered stone surface
• Asphalt and concrete paving
• Highway design: Grades, curves, drainage
• Traffic engineering
• Smart highways: Sensors, adaptive signals

**Water Infrastructure:**
• Aqueducts: Roman engineering
• Water treatment plants
• Sewage systems
• Stormwater management
• Desalination plants
• Water distribution networks

**Earthquake Engineering:**
• Base isolation: Building on flexible bearings
• Dampers: Absorb seismic energy
• Reinforced concrete and steel
• Building codes and standards
• Retrofitting older structures`
  },
];

ALL_KNOWLEDGE.push(...TRANSPORTATION_KNOWLEDGE);

// =============================================================================
// FILM AND CINEMA
// =============================================================================

export const FILM_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'History of Cinema',
    category: 'entertainment',
    keywords: ['film', 'cinema', 'movie', 'director', 'hollywood', 'oscar'],
    content: `Cinema has evolved from a novelty to a dominant art form.

**Early Cinema (1890s-1920s):**
• Lumière Brothers: First public screening (1895)
• Georges Méliès: Special effects pioneer (A Trip to the Moon)
• Silent films: No synchronized dialogue
• Charlie Chaplin: The Tramp character
• Buster Keaton: Physical comedy genius
• D.W. Griffith: Narrative techniques
• German Expressionism: The Cabinet of Dr. Caligari

**Golden Age of Hollywood (1930s-1960s):**
• Sound films ("talkies"): The Jazz Singer (1927)
• Studio system: MGM, Warner Bros, Paramount, etc.
• Technicolor: Wizard of Oz, Gone with the Wind
• Film noir: Dark, cynical crime dramas
• Alfred Hitchcock: Master of suspense
• Orson Welles: Citizen Kane (often called greatest film)
• Musicals: Singin' in the Rain
• Westerns: John Wayne, John Ford

**New Hollywood (1960s-1980s):**
• French New Wave influence
• Director as auteur
• More artistic freedom
• Francis Ford Coppola: The Godfather
• Martin Scorsese: Taxi Driver, Goodfellas
• Steven Spielberg: Jaws, E.T., Schindler's List
• George Lucas: Star Wars
• Stanley Kubrick: 2001, A Clockwork Orange

**Blockbuster Era (1975-present):**
• Jaws (1975): First summer blockbuster
• Star Wars (1977): Changed industry
• Franchise filmmaking
• Special effects revolution
• CGI: Jurassic Park (1993), Toy Story (1995)
• Marvel Cinematic Universe
• Streaming era: Netflix, Disney+

**World Cinema:**
• Japanese: Kurosawa (Seven Samurai)
• Italian Neorealism: Bicycle Thieves
• French New Wave: Godard, Truffaut
• Indian: Satyajit Ray, Bollywood
• Korean: Bong Joon-ho (Parasite)
• Iranian: Abbas Kiarostami
• Mexican: Alfonso Cuarón, Guillermo del Toro

**Film Techniques:**
• Cinematography: Camera work, lighting
• Editing: Montage, pacing
• Sound design: Score, effects
• Production design: Sets, costumes
• Screenwriting: Story structure
• Acting: Method, classical`
  },
  {
    topic: 'Filmmaking Process',
    category: 'entertainment',
    keywords: ['filmmaking', 'directing', 'screenplay', 'cinematography', 'editing', 'production'],
    content: `Filmmaking involves multiple stages and hundreds of collaborators.

**Pre-Production:**
• **Screenplay:** Story in script format
  - Three-act structure
  - Scene headings, action, dialogue
  - Spec script vs shooting script
• **Development:** Securing rights, financing
• **Casting:** Auditions, screen tests
• **Location scouting:** Finding filming locations
• **Storyboarding:** Visual planning
• **Budgeting and scheduling**

**Production (Filming):**
• **Director:** Creative vision, guides performances
• **Cinematographer (DP):** Camera and lighting
• **Sound:** Dialogue, ambient sound
• **Art department:** Sets, props, costumes
• **Actors:** Performing scenes
• **Script supervisor:** Continuity
• Shot types: Wide, medium, close-up, extreme close-up
• Camera movements: Pan, tilt, dolly, crane, Steadicam

**Post-Production:**
• **Editing:** Assembling footage, pacing
  - Rough cut → fine cut → final cut
  - Continuity editing
  - Montage
• **Visual effects (VFX):** CGI, compositing
• **Sound design:** Foley, ADR, ambient
• **Music/Score:** Original composition or licensed
• **Color grading:** Visual mood and consistency
• **Titles and credits**

**Distribution:**
• Film festivals: Sundance, Cannes, Venice, Toronto
• Theatrical release: Cinema chains
• Streaming platforms: Netflix, Amazon, Disney+
• Home video: Blu-ray, digital purchase
• International distribution
• Marketing and promotion

**Key Roles:**
• Producer: Business side, financing
• Director: Creative leader
• Screenwriter: Story and dialogue
• Cinematographer: Visual look
• Editor: Shapes the story
• Composer: Musical score
• Production designer: Visual world
• Costume designer: Character appearance

**Film Genres:**
• Action, comedy, drama, horror, sci-fi
• Documentary, animation, musical
• Genre blending increasingly common
• Audience expectations by genre`
  },
];

ALL_KNOWLEDGE.push(...FILM_KNOWLEDGE);

// =============================================================================
// MEDICINE AND HUMAN BODY
// =============================================================================

export const MEDICINE_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Human Body Systems',
    category: 'health',
    keywords: ['body', 'anatomy', 'organ', 'system', 'heart', 'brain', 'lungs'],
    content: `The human body is composed of interconnected organ systems.

**Cardiovascular System:**
• Heart: 4 chambers, pumps blood
• Arteries: Carry oxygenated blood away from heart
• Veins: Return deoxygenated blood to heart
• Capillaries: Tiny vessels for gas exchange
• Blood: Red cells, white cells, platelets, plasma
• Heart beats ~100,000 times per day
• ~60,000 miles of blood vessels
• Blood pressure: Systolic/diastolic (120/80 normal)

**Respiratory System:**
• Nose/mouth → trachea → bronchi → bronchioles → alveoli
• Gas exchange: O2 in, CO2 out
• Diaphragm: Main breathing muscle
• Lungs: ~300 million alveoli
• Breathing rate: 12-20 breaths/minute at rest
• Vital capacity: ~6 liters
• Oxygen carried by hemoglobin

**Nervous System:**
• Brain: ~86 billion neurons
• Spinal cord: Information highway
• Peripheral nerves: Connect body to CNS
• Autonomic: Involuntary (heart, digestion)
• Somatic: Voluntary (movement)
• Neurotransmitters: Chemical messengers
• Synapses: Connections between neurons

**Digestive System:**
• Mouth → esophagus → stomach → small intestine → large intestine
• Stomach: Acid breaks down food (pH 1.5-3.5)
• Small intestine: Nutrient absorption (~20 feet)
• Large intestine: Water absorption
• Liver: Detoxification, bile production
• Pancreas: Enzymes and insulin
• Gut microbiome: Trillions of bacteria

**Musculoskeletal System:**
• 206 bones in adult skeleton
• 600+ muscles
• Joints: Allow movement
• Tendons: Connect muscle to bone
• Ligaments: Connect bone to bone
• Cartilage: Cushions joints
• Bone marrow: Produces blood cells

**Immune System:**
• White blood cells: Fight infection
• Antibodies: Target specific pathogens
• Innate immunity: First line of defense
• Adaptive immunity: Learned, specific
• Lymph nodes: Filter lymph fluid
• Spleen: Filters blood
• Vaccination: Trains immune system

**Endocrine System:**
• Hormones: Chemical messengers
• Pituitary: "Master gland"
• Thyroid: Metabolism regulation
• Adrenal: Stress response (cortisol, adrenaline)
• Pancreas: Blood sugar (insulin, glucagon)
• Reproductive hormones: Estrogen, testosterone
• Feedback loops: Maintain balance`
  },
  {
    topic: 'Common Medical Conditions',
    category: 'health',
    keywords: ['disease', 'condition', 'diabetes', 'cancer', 'heart disease', 'treatment'],
    content: `Understanding common medical conditions helps with health awareness.

**Cardiovascular Disease:**
• Leading cause of death worldwide
• Coronary artery disease: Blocked arteries
• Heart attack: Blood flow to heart blocked
• Stroke: Blood flow to brain blocked
• Risk factors: High BP, cholesterol, smoking, diabetes
• Prevention: Exercise, diet, not smoking
• Treatment: Medications, surgery, lifestyle changes

**Diabetes:**
• Type 1: Autoimmune, body doesn't make insulin
  - Usually diagnosed in childhood
  - Requires insulin injections
• Type 2: Body doesn't use insulin well
  - Usually develops in adults
  - Linked to obesity and lifestyle
  - Can often be managed with diet and exercise
• Gestational: During pregnancy
• Complications: Eye, kidney, nerve damage
• Blood sugar monitoring essential

**Cancer:**
• Uncontrolled cell growth
• Can occur in any tissue
• Common types: Lung, breast, colon, prostate, skin
• Risk factors: Genetics, smoking, UV, diet, age
• Screening: Mammograms, colonoscopy, PSA
• Treatment: Surgery, chemotherapy, radiation, immunotherapy
• Early detection improves outcomes
• Prevention: Don't smoke, sunscreen, healthy diet

**Respiratory Conditions:**
• Asthma: Airway inflammation, wheezing
• COPD: Chronic lung damage (smoking)
• Pneumonia: Lung infection
• COVID-19: Coronavirus respiratory illness
• Treatment varies by condition
• Inhalers, antibiotics, antivirals

**Mental Health Conditions:**
• Depression: Persistent sadness, loss of interest
• Anxiety disorders: Excessive worry, panic
• Bipolar disorder: Mood swings
• Schizophrenia: Altered perception of reality
• PTSD: After traumatic events
• Treatment: Therapy, medication, support
• No shame in seeking help

**Infectious Diseases:**
• Bacteria: Treated with antibiotics
• Viruses: Antivirals, vaccines
• Fungi: Antifungals
• Parasites: Antiparasitics
• Antibiotic resistance: Growing concern
• Vaccination: Most effective prevention
• Hygiene: Handwashing, sanitation`
  },
  {
    topic: 'Nutrition Science',
    category: 'health',
    keywords: ['nutrition', 'vitamin', 'mineral', 'diet', 'protein', 'carbohydrate', 'fat'],
    content: `Nutrition science studies how food affects health and body function.

**Macronutrients:**

**Carbohydrates:**
• Primary energy source
• Simple: Sugars (glucose, fructose)
• Complex: Starches, fiber
• Fiber: Digestive health, satiety
• Whole grains preferred over refined
• 45-65% of daily calories recommended

**Proteins:**
• Building blocks: Amino acids (20 total, 9 essential)
• Muscle repair and growth
• Enzymes and hormones
• Complete proteins: All essential amino acids (meat, eggs, soy)
• Incomplete: Missing some (most plants)
• 0.8g per kg bodyweight minimum
• Athletes need more: 1.2-2.0g/kg

**Fats:**
• Energy storage, hormone production
• Unsaturated (healthy): Olive oil, nuts, avocado, fish
• Saturated: Butter, red meat (moderate)
• Trans fats: Avoid (partially hydrogenated oils)
• Omega-3: Anti-inflammatory (fish, flaxseed)
• Omega-6: Pro-inflammatory in excess
• 20-35% of daily calories

**Micronutrients:**

**Vitamins:**
• A: Vision, immune function (carrots, sweet potato)
• B complex: Energy metabolism, nerve function
• C: Immune support, collagen (citrus, peppers)
• D: Bone health, immune (sunlight, fish)
• E: Antioxidant (nuts, seeds)
• K: Blood clotting, bone health (leafy greens)

**Minerals:**
• Calcium: Bones, teeth (dairy, leafy greens)
• Iron: Oxygen transport (red meat, beans)
• Magnesium: Muscle, nerve function (nuts, whole grains)
• Zinc: Immune function, wound healing
• Potassium: Heart, muscle function (bananas, potatoes)
• Sodium: Fluid balance (limit to <2,300mg/day)

**Water:**
• Essential for all body functions
• ~60% of body weight
• 8 cups/day general guideline
• More needed with exercise, heat
• Dehydration affects cognition and performance

**Dietary Guidelines:**
• Eat variety of whole foods
• Plenty of fruits and vegetables
• Whole grains over refined
• Lean proteins
• Healthy fats
• Limit added sugars, sodium, processed foods
• Moderation, not deprivation`
  },
];

ALL_KNOWLEDGE.push(...MEDICINE_KNOWLEDGE);

// =============================================================================
// PERSONAL FINANCE AND INVESTING
// =============================================================================

export const FINANCE_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Personal Finance Fundamentals',
    category: 'finance',
    keywords: ['finance', 'budget', 'saving', 'debt', 'credit', 'money management'],
    content: `Personal finance is managing your money to achieve financial goals.

**Budgeting:**
• Track income and expenses
• 50/30/20 rule: Needs/wants/savings
• Zero-based budgeting: Every dollar has a job
• Envelope system: Cash in categories
• Apps: Mint, YNAB, Personal Capital
• Review and adjust monthly
• Emergency fund: 3-6 months expenses

**Saving:**
• Pay yourself first: Automate savings
• High-yield savings accounts
• Certificates of deposit (CDs)
• Money market accounts
• Savings goals: Short, medium, long-term
• Compound interest: "Eighth wonder of the world"
• Rule of 72: Years to double = 72 / interest rate

**Debt Management:**
• Good debt: Mortgage, education (potentially)
• Bad debt: High-interest credit cards
• Debt avalanche: Pay highest interest first
• Debt snowball: Pay smallest balance first
• Consolidation: Combine into one payment
• Avoid minimum payments only
• Negotiate interest rates

**Credit:**
• Credit score: 300-850 (FICO)
• Factors: Payment history (35%), utilization (30%), length (15%), mix (10%), new credit (10%)
• Check credit report annually (free)
• Keep utilization below 30%
• Pay on time, every time
• Don't close old accounts
• Dispute errors on report

**Insurance:**
• Health insurance: Essential
• Auto insurance: Required by law
• Homeowners/renters insurance
• Life insurance: Term vs whole
• Disability insurance: Protects income
• Umbrella policy: Extra liability coverage
• Shop around for best rates

**Taxes:**
• Income tax: Federal and state
• Tax brackets: Progressive system
• Deductions: Standard vs itemized
• Credits: Reduce tax owed directly
• W-4: Withholding from paycheck
• File by April 15 (US)
• Tax-advantaged accounts: 401(k), IRA, HSA`
  },
  {
    topic: 'Investing Basics',
    category: 'finance',
    keywords: ['investing', 'stocks', 'bonds', 'mutual fund', 'etf', 'portfolio', 'retirement'],
    content: `Investing grows wealth over time through various financial instruments.

**Stocks (Equities):**
• Ownership shares in a company
• Returns: Price appreciation + dividends
• Higher risk, higher potential return
• Stock exchanges: NYSE, NASDAQ
• Market cap: Large, mid, small cap
• Growth vs value stocks
• Individual stocks vs funds

**Bonds (Fixed Income):**
• Loans to governments or corporations
• Regular interest payments (coupon)
• Return of principal at maturity
• Lower risk than stocks
• Types: Treasury, municipal, corporate
• Bond prices inversely related to interest rates
• Credit ratings: AAA to junk

**Mutual Funds:**
• Pool money from many investors
• Professional management
• Diversification
• Expense ratios: Annual fees
• Actively managed vs index funds
• Minimum investments vary
• NAV: Net asset value

**ETFs (Exchange-Traded Funds):**
• Trade like stocks on exchanges
• Usually track an index
• Lower expense ratios than mutual funds
• Tax efficient
• No minimum investment
• Intraday trading
• Very popular for passive investing

**Index Funds:**
• Track a market index (S&P 500, total market)
• Very low fees
• Broad diversification
• Consistently beat most active managers
• Warren Buffett recommends for most investors
• "Don't look for the needle, buy the haystack"

**Retirement Accounts:**
• **401(k):** Employer-sponsored
  - Pre-tax contributions
  - Employer match: Free money!
  - 2024 limit: $23,000
• **IRA:** Individual Retirement Account
  - Traditional: Tax-deductible contributions
  - Roth: Tax-free withdrawals in retirement
  - 2024 limit: $7,000
• **HSA:** Health Savings Account
  - Triple tax advantage
  - For high-deductible health plans

**Investment Principles:**
• Start early: Time in market beats timing
• Diversify: Don't put all eggs in one basket
• Keep costs low: Fees eat returns
• Stay the course: Don't panic sell
• Dollar-cost averaging: Invest regularly
• Rebalance periodically
• Risk tolerance decreases with age
• Asset allocation: Stocks/bonds mix`
  },
  {
    topic: 'Real Estate',
    category: 'finance',
    keywords: ['real estate', 'house', 'mortgage', 'property', 'rent', 'home buying'],
    content: `Real estate is a major asset class and life decision.

**Buying a Home:**
• Down payment: 3-20% of purchase price
• 20% avoids PMI (private mortgage insurance)
• Pre-approval: Know your budget
• Home inspection: Essential before buying
• Closing costs: 2-5% of purchase price
• Location, location, location
• Consider total cost of ownership

**Mortgages:**
• Fixed-rate: Same payment for loan term
  - 30-year: Lower payments, more interest
  - 15-year: Higher payments, less interest
• Adjustable-rate (ARM): Rate changes after initial period
• Interest rates: Shop multiple lenders
• Points: Pay upfront to lower rate
• Refinancing: Replace with better terms
• Amortization: Early payments mostly interest

**Renting vs Buying:**
• Renting: Flexibility, no maintenance costs
• Buying: Building equity, tax benefits
• Price-to-rent ratio helps compare
• Consider how long you'll stay
• Factor in all costs (maintenance, taxes, insurance)
• Neither is always better

**Real Estate Investing:**
• Rental properties: Monthly income
• House flipping: Buy, renovate, sell
• REITs: Real estate investment trusts (like stocks)
• Crowdfunding platforms
• Commercial real estate
• Appreciation + cash flow
• Leverage: Use mortgage to amplify returns
• Property management considerations

**Home Maintenance:**
• Budget 1-2% of home value annually
• HVAC: Service twice yearly
• Roof: Inspect annually
• Plumbing: Watch for leaks
• Electrical: Don't DIY complex work
• Landscaping: Curb appeal matters
• Energy efficiency: Saves money long-term`
  },
];

ALL_KNOWLEDGE.push(...FINANCE_DEEP);

// =============================================================================
// GEOGRAPHY AND WORLD KNOWLEDGE
// =============================================================================

export const GEOGRAPHY_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Continents and Oceans',
    category: 'geography',
    keywords: ['continent', 'ocean', 'earth', 'geography', 'world', 'map'],
    content: `Earth's surface is divided into continents and oceans.

**Seven Continents:**

**Asia:**
• Largest continent (17.2 million sq mi)
• Most populous (~4.7 billion)
• Highest point: Mt. Everest (29,032 ft)
• Countries: China, India, Japan, Indonesia, etc.
• Diverse climates: Arctic to tropical
• Major rivers: Yangtze, Ganges, Mekong

**Africa:**
• Second-largest continent
• 54 countries (most of any continent)
• Sahara Desert: Largest hot desert
• Nile River: Longest river (~4,130 miles)
• Great Rift Valley
• Incredible biodiversity
• Youngest population globally

**North America:**
• Third-largest continent
• 23 countries
• Grand Canyon, Rocky Mountains
• Great Lakes: Largest freshwater system
• Mississippi River
• Diverse: Arctic to tropical
• US, Canada, Mexico largest countries

**South America:**
• Amazon Rainforest: Largest tropical forest
• Amazon River: Largest by volume
• Andes Mountains: Longest mountain range
• 12 countries + territories
• Angel Falls: Tallest waterfall
• Atacama Desert: Driest place on Earth

**Europe:**
• 44 countries
• Culturally diverse despite small size
• Alps, Pyrenees mountains
• Danube, Rhine rivers
• Mediterranean climate in south
• EU: Economic and political union
• Rich history and cultural heritage

**Australia/Oceania:**
• Smallest continent
• Great Barrier Reef
• Unique wildlife: Kangaroos, koalas
• Aboriginal culture: 65,000+ years
• Pacific Islands: Melanesia, Micronesia, Polynesia
• New Zealand: Maori culture

**Antarctica:**
• Coldest, driest, windiest continent
• 98% covered by ice
• No permanent residents
• Scientific research stations
• Antarctic Treaty: International cooperation
• Contains 70% of Earth's fresh water

**Five Oceans:**
• **Pacific:** Largest (63.8 million sq mi)
• **Atlantic:** Second-largest, busiest shipping
• **Indian:** Third-largest, warmest
• **Southern (Antarctic):** Surrounds Antarctica
• **Arctic:** Smallest, partially frozen
• Oceans cover 71% of Earth's surface
• Average depth: ~12,100 feet`
  },
  {
    topic: 'Natural Wonders',
    category: 'geography',
    keywords: ['wonder', 'natural', 'landmark', 'mountain', 'waterfall', 'canyon'],
    content: `Earth features extraordinary natural formations and phenomena.

**Mountains:**
• **Mt. Everest:** Tallest above sea level (29,032 ft)
• **K2:** Second tallest, most dangerous
• **Kilimanjaro:** Tallest in Africa, freestanding
• **Denali:** Tallest in North America
• **Matterhorn:** Iconic Alpine peak
• **Himalayas:** Highest mountain range
• **Andes:** Longest mountain range (4,300 miles)

**Waterfalls:**
• **Angel Falls:** Tallest (3,212 ft), Venezuela
• **Niagara Falls:** Most famous, US/Canada border
• **Victoria Falls:** "Smoke that Thunders," Zambia/Zimbabwe
• **Iguazu Falls:** 275 individual falls, Argentina/Brazil
• **Yosemite Falls:** Tallest in North America

**Canyons and Valleys:**
• **Grand Canyon:** 277 miles long, 1 mile deep
• **Colca Canyon:** Twice as deep as Grand Canyon
• **Great Rift Valley:** 4,000 miles, Africa to Middle East
• **Copper Canyon:** Larger than Grand Canyon, Mexico

**Deserts:**
• **Sahara:** Largest hot desert (3.6 million sq mi)
• **Antarctic:** Largest overall (cold desert)
• **Arabian:** Second-largest hot desert
• **Gobi:** Cold desert, Mongolia/China
• **Atacama:** Driest place on Earth

**Forests:**
• **Amazon Rainforest:** 2.1 million sq mi
  - "Lungs of the Earth"
  - 10% of all species
  - Amazon River: 1,100 tributaries
• **Congo Rainforest:** Second-largest
• **Taiga (Boreal):** Largest biome
• **Redwood forests:** Tallest trees on Earth

**Other Wonders:**
• **Great Barrier Reef:** Largest living structure
• **Northern Lights (Aurora Borealis):** Solar wind + atmosphere
• **Galápagos Islands:** Unique evolution
• **Yellowstone:** Supervolcano, geysers
• **Dead Sea:** Lowest point on land, extremely salty
• **Mariana Trench:** Deepest ocean point (36,000 ft)`
  },
  {
    topic: 'Countries and Capitals',
    category: 'geography',
    keywords: ['country', 'capital', 'nation', 'population', 'flag', 'government'],
    content: `There are 195 recognized countries in the world today.

**Most Populous Countries (2024):**
1. India: ~1.44 billion (New Delhi)
2. China: ~1.43 billion (Beijing)
3. United States: ~340 million (Washington, D.C.)
4. Indonesia: ~277 million (Jakarta)
5. Pakistan: ~240 million (Islamabad)
6. Nigeria: ~230 million (Abuja)
7. Brazil: ~216 million (Brasília)
8. Bangladesh: ~173 million (Dhaka)
9. Russia: ~144 million (Moscow)
10. Ethiopia: ~130 million (Addis Ababa)

**Largest Countries by Area:**
1. Russia: 6.6 million sq mi
2. Canada: 3.9 million sq mi
3. United States: 3.8 million sq mi
4. China: 3.7 million sq mi
5. Brazil: 3.3 million sq mi

**Smallest Countries:**
• Vatican City: 0.17 sq mi (smallest)
• Monaco: 0.78 sq mi
• San Marino: 24 sq mi
• Liechtenstein: 62 sq mi
• Malta: 122 sq mi

**Major European Capitals:**
• London (UK), Paris (France), Berlin (Germany)
• Rome (Italy), Madrid (Spain), Lisbon (Portugal)
• Amsterdam (Netherlands), Brussels (Belgium)
• Vienna (Austria), Warsaw (Poland)
• Athens (Greece), Stockholm (Sweden)

**Major Asian Capitals:**
• Tokyo (Japan), Beijing (China), Seoul (South Korea)
• New Delhi (India), Bangkok (Thailand)
• Jakarta (Indonesia), Manila (Philippines)
• Hanoi (Vietnam), Kuala Lumpur (Malaysia)

**Major African Capitals:**
• Cairo (Egypt), Nairobi (Kenya), Lagos (Nigeria - largest city)
• Addis Ababa (Ethiopia), Pretoria (South Africa)
• Accra (Ghana), Dar es Salaam (Tanzania)

**Major Americas Capitals:**
• Washington D.C. (US), Ottawa (Canada)
• Mexico City (Mexico), Brasília (Brazil)
• Buenos Aires (Argentina), Lima (Peru)
• Bogotá (Colombia), Santiago (Chile)

**Interesting Facts:**
• Most languages: Papua New Guinea (~840)
• Highest GDP per capita: Luxembourg
• Most visited: France (~90 million tourists/year)
• Newest country: South Sudan (2011)
• Only country in two continents: Turkey (Europe/Asia)`
  },
];

ALL_KNOWLEDGE.push(...GEOGRAPHY_DEEP);

// =============================================================================
// EDUCATION AND LEARNING
// =============================================================================

export const EDUCATION_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Learning Strategies',
    category: 'education',
    keywords: ['learning', 'study', 'memory', 'education', 'school', 'technique'],
    content: `Effective learning strategies are backed by cognitive science research.

**Evidence-Based Study Techniques:**

**Spaced Repetition:**
• Review material at increasing intervals
• Day 1 → Day 3 → Day 7 → Day 14 → Day 30
• Fights the forgetting curve
• Anki and other flashcard apps
• Most effective for memorization
• Better than cramming

**Active Recall:**
• Test yourself instead of re-reading
• Close the book and try to remember
• Practice questions and problems
• Teaching others (Feynman Technique)
• Much more effective than passive review
• Feels harder but works better

**Interleaving:**
• Mix different topics/problems in one session
• Don't practice same type repeatedly
• Improves ability to discriminate between concepts
• Feels less productive but improves long-term retention
• Example: Mix math problem types

**Elaboration:**
• Explain concepts in your own words
• Connect new information to what you know
• Ask "why" and "how" questions
• Create examples and analogies
• Deeper processing = better memory

**Dual Coding:**
• Combine words and visuals
• Draw diagrams, mind maps, charts
• Visual + verbal = stronger memory
• Sketch concepts while studying
• Use color coding

**The Pomodoro Technique:**
• 25 minutes focused work
• 5 minute break
• After 4 pomodoros: 15-30 minute break
• Prevents burnout
• Maintains focus
• Track completed pomodoros

**Note-Taking Methods:**
• Cornell method: Notes, cues, summary
• Mind mapping: Visual connections
• Outline method: Hierarchical
• Charting: Compare and contrast
• Handwriting may be better than typing for retention

**Growth Mindset:**
• Intelligence can be developed
• Effort leads to mastery
• Mistakes are learning opportunities
• "Not yet" instead of "I can't"
• Praise effort, not innate ability
• Carol Dweck's research

**Sleep and Learning:**
• Sleep consolidates memories
• 7-9 hours recommended
• Don't pull all-nighters
• Naps can help learning
• Review before sleep
• Consistent sleep schedule`
  },
  {
    topic: 'Critical Thinking',
    category: 'education',
    keywords: ['critical thinking', 'logic', 'argument', 'fallacy', 'reasoning', 'analysis'],
    content: `Critical thinking is the ability to analyze information objectively.

**Core Skills:**
• Analysis: Breaking down complex information
• Evaluation: Assessing credibility and relevance
• Inference: Drawing logical conclusions
• Interpretation: Understanding meaning
• Explanation: Clearly communicating reasoning
• Self-regulation: Monitoring own thinking

**Logical Reasoning:**

**Deductive Reasoning:**
• General → Specific
• If premises are true, conclusion must be true
• Syllogism: All A are B. C is A. Therefore C is B.
• Mathematical proofs
• Valid vs sound arguments

**Inductive Reasoning:**
• Specific → General
• Observations lead to probable conclusions
• Scientific method
• Stronger with more evidence
• Can never be 100% certain

**Common Logical Fallacies:**
• **Ad hominem:** Attacking the person, not argument
• **Straw man:** Misrepresenting opponent's argument
• **Appeal to authority:** "Expert says so"
• **False dichotomy:** Only two options presented
• **Slippery slope:** One thing leads to extreme
• **Circular reasoning:** Conclusion in premise
• **Red herring:** Irrelevant distraction
• **Bandwagon:** "Everyone believes it"
• **Appeal to emotion:** Using feelings instead of logic
• **Hasty generalization:** Too few examples
• **Post hoc:** Correlation ≠ causation
• **Tu quoque:** "You do it too"

**Evaluating Sources:**
• Who is the author? Credentials?
• What is the evidence?
• Is it peer-reviewed?
• Are there conflicts of interest?
• Is it current?
• Do other sources agree?
• Primary vs secondary sources
• Fact-checking resources

**Media Literacy:**
• Distinguish fact from opinion
• Recognize bias
• Check multiple sources
• Understand algorithms and filter bubbles
• Be skeptical of sensational claims
• Verify before sharing
• Understand how media is produced`
  },
];

ALL_KNOWLEDGE.push(...EDUCATION_KNOWLEDGE);

// =============================================================================
// ANCIENT CIVILIZATIONS
// =============================================================================

export const ANCIENT_CIVILIZATIONS: KnowledgeEntry[] = [
  {
    topic: 'Ancient Egypt',
    category: 'history',
    keywords: ['egypt', 'pharaoh', 'pyramid', 'nile', 'hieroglyphics', 'mummy'],
    content: `Ancient Egypt was one of the longest-lasting civilizations in history.

**Timeline:**
• Old Kingdom (2686-2181 BCE): Pyramid building era
• Middle Kingdom (2055-1650 BCE): Classical period
• New Kingdom (1550-1069 BCE): Empire period
• Ptolemaic Period (305-30 BCE): Greek rulers
• Ended with Roman conquest (30 BCE)

**The Nile River:**
• Lifeblood of Egyptian civilization
• Annual flooding deposited fertile soil
• Agriculture depended on flood cycle
• Transportation highway
• Papyrus grew along banks
• Upper Egypt (south) and Lower Egypt (north)

**Pyramids:**
• Great Pyramid of Giza: Built for Pharaoh Khufu
  - 481 feet tall originally
  - 2.3 million stone blocks
  - Built ~2560 BCE
  - Only surviving Ancient Wonder
• Sphinx: Lion body, human head
• Pyramids were tombs for pharaohs
• Contained treasures for afterlife

**Religion and Afterlife:**
• Polytheistic: Many gods
• Ra: Sun god
• Osiris: God of the dead
• Isis: Goddess of magic
• Anubis: Jackal-headed, embalming
• Mummification: Preserve body for afterlife
• Book of the Dead: Guide to afterlife
• Ka and Ba: Spirit concepts

**Writing and Culture:**
• Hieroglyphics: Pictorial writing system
• Rosetta Stone: Key to decipherment
• Papyrus: Paper-like writing material
• Scribes: Educated elite
• Mathematics: Base 10, fractions
• Medicine: Advanced for the time
• Calendar: 365-day year

**Famous Pharaohs:**
• Khufu: Great Pyramid builder
• Hatshepsut: Female pharaoh
• Akhenaten: Monotheistic revolution
• Tutankhamun: Famous tomb discovery (1922)
• Ramesses II: Great builder, warrior
• Cleopatra VII: Last pharaoh`
  },
  {
    topic: 'Ancient Greece',
    category: 'history',
    keywords: ['greece', 'athens', 'sparta', 'democracy', 'philosophy', 'olympic'],
    content: `Ancient Greece laid the foundations of Western civilization.

**City-States (Polis):**

**Athens:**
• Birthplace of democracy
• Direct democracy: Citizens voted on laws
• Only free adult males were citizens
• Golden Age under Pericles (461-429 BCE)
• Parthenon: Temple to Athena
• Center of philosophy, arts, learning

**Sparta:**
• Military society
• Boys trained from age 7
• Women had more rights than in Athens
• Powerful army
• Two kings
• Helots: Enslaved population

**Philosophy:**
• Socrates: Questioning method, "Know thyself"
• Plato: Republic, Theory of Forms, Academy
• Aristotle: Logic, science, ethics, Lyceum
• Pre-Socratics: Thales, Heraclitus, Democritus
• Stoicism, Epicureanism
• Foundation of Western philosophy

**Major Events:**
• Persian Wars (490-479 BCE)
  - Marathon: Athenian victory
  - Thermopylae: 300 Spartans
  - Salamis: Naval victory
• Peloponnesian War (431-404 BCE): Athens vs Sparta
• Alexander the Great (356-323 BCE)
  - Conquered Persian Empire
  - Spread Greek culture (Hellenism)
  - Empire from Greece to India

**Culture and Achievements:**
• Theater: Tragedy (Sophocles, Euripides) and Comedy (Aristophanes)
• Olympics: First in 776 BCE
• Architecture: Columns, temples
• Sculpture: Idealized human form
• Homer: Iliad and Odyssey
• Herodotus: "Father of History"
• Hippocrates: "Father of Medicine"
• Pythagoras, Euclid, Archimedes: Mathematics`
  },
  {
    topic: 'Ancient Rome',
    category: 'history',
    keywords: ['rome', 'roman', 'empire', 'caesar', 'gladiator', 'republic', 'colosseum'],
    content: `Ancient Rome grew from a small city to a vast empire.

**Timeline:**
• Kingdom (753-509 BCE): Legendary founding by Romulus
• Republic (509-27 BCE): Senate and elected officials
• Empire (27 BCE-476 CE Western): Emperors rule
• Eastern Empire (Byzantine): Until 1453 CE

**The Republic:**
• Senate: Patrician governing body
• Consuls: Two elected leaders
• Tribunes: Represented plebeians
• Roman law: Foundation of Western legal systems
• Punic Wars: Rome vs Carthage
  - Hannibal crossed the Alps with elephants
  - Rome destroyed Carthage (146 BCE)
• Julius Caesar: Conquered Gaul, crossed Rubicon
  - Assassinated March 15, 44 BCE (Ides of March)

**The Empire:**
• Augustus (first emperor): Pax Romana begins
• Pax Romana (27 BCE-180 CE): 200 years of peace
• At peak: 5 million sq km, 70 million people
• Notable emperors: Trajan, Hadrian, Marcus Aurelius
• Nero, Caligula: Infamous rulers
• Constantine: First Christian emperor
• Division into East and West (395 CE)
• Fall of Western Rome (476 CE)

**Engineering and Architecture:**
• Roads: 250,000 miles, "All roads lead to Rome"
• Aqueducts: Water supply system
• Colosseum: 50,000 spectators
• Pantheon: Concrete dome (still standing)
• Arches, vaults, concrete
• Central heating (hypocaust)
• Sewage systems

**Culture:**
• Latin language: Basis for Romance languages
• Roman law: Innocent until proven guilty
• Republic concept: Influenced US government
• Gladiatorial games
• Public baths: Social centers
• Literature: Virgil, Ovid, Cicero
• Spread of Christianity

**Fall of Rome:**
• Barbarian invasions
• Economic troubles
• Military overextension
• Political instability
• Disease and plague
• Division weakened empire
• 476 CE: Last Western emperor deposed`
  },
  {
    topic: 'Ancient China',
    category: 'history',
    keywords: ['china', 'dynasty', 'great wall', 'silk road', 'confucius', 'emperor'],
    content: `Ancient China produced one of the world's oldest continuous civilizations.

**Major Dynasties:**
• Shang (1600-1046 BCE): First historical dynasty, oracle bones
• Zhou (1046-256 BCE): Longest dynasty, Confucius
• Qin (221-206 BCE): First unified empire, Great Wall begun
• Han (206 BCE-220 CE): Golden age, Silk Road
• Tang (618-907 CE): Cultural golden age
• Song (960-1279): Technological innovation
• Yuan (1271-1368): Mongol rule (Kublai Khan)
• Ming (1368-1644): Great Wall rebuilt, Forbidden City
• Qing (1644-1912): Last dynasty

**Great Inventions:**
• Paper (105 CE): Revolutionized communication
• Printing (woodblock ~700 CE, movable type ~1040)
• Gunpowder (~850 CE): Changed warfare
• Compass (~1100 CE): Enabled navigation
• Also: Silk, porcelain, tea cultivation, acupuncture

**Philosophy:**
• Confucianism: Social harmony, respect, education
  - Five relationships: Ruler-subject, parent-child, etc.
  - Meritocracy through examination
• Taoism (Daoism): Harmony with nature
  - Lao Tzu: Tao Te Ching
  - Yin and yang
  - Wu wei: Non-action
• Legalism: Strict laws and punishments
• Buddhism: Arrived from India (~1st century CE)

**Great Wall of China:**
• Built over centuries by multiple dynasties
• ~13,000 miles total (all sections)
• Defensive fortification
• Not visible from space (myth)
• UNESCO World Heritage Site
• Most visited attraction in China

**Silk Road:**
• Trade routes connecting East and West
• Silk, spices, ideas, religions traveled
• ~4,000 miles
• Active for ~1,500 years
• Cultural exchange between civilizations
• Spread of Buddhism, Islam, Christianity

**Terracotta Army:**
• Buried with Emperor Qin Shi Huang
• ~8,000 soldiers, 670 horses
• Each face unique
• Discovered 1974 by farmers
• Guarded emperor in afterlife`
  },
];

ALL_KNOWLEDGE.push(...ANCIENT_CIVILIZATIONS);

// =============================================================================
// MUSIC GENRES AND THEORY EXTENDED
// =============================================================================

export const MUSIC_EXTENDED: KnowledgeEntry[] = [
  {
    topic: 'Music Genres',
    category: 'music',
    keywords: ['genre', 'rock', 'jazz', 'classical', 'hip hop', 'pop', 'electronic'],
    content: `Music genres represent distinct styles, traditions, and communities.

**Classical Music:**
• Baroque (1600-1750): Bach, Vivaldi, Handel
• Classical (1750-1820): Mozart, Haydn, Beethoven (early)
• Romantic (1820-1900): Chopin, Tchaikovsky, Brahms
• Modern (1900+): Stravinsky, Debussy, Schoenberg
• Orchestra: Strings, woodwinds, brass, percussion
• Concerto, symphony, sonata, opera
• Conductor leads the ensemble

**Jazz:**
• Born in New Orleans (~1900)
• African American origins
• Improvisation is central
• Swing, bebop, cool jazz, fusion
• Louis Armstrong: Trumpet pioneer
• Miles Davis: Innovator across eras
• John Coltrane: Saxophone legend
• Duke Ellington: Big band leader
• Blue notes, syncopation, call and response

**Rock:**
• 1950s: Rock and roll (Chuck Berry, Elvis Presley)
• 1960s: British Invasion (Beatles, Rolling Stones)
• 1970s: Hard rock, punk (Led Zeppelin, Ramones)
• 1980s: New wave, hair metal
• 1990s: Grunge, alternative (Nirvana, Radiohead)
• 2000s+: Indie rock, post-rock
• Electric guitar central instrument

**Hip Hop/Rap:**
• Born in Bronx, NYC (1970s)
• DJing, MCing, breakdancing, graffiti
• Grandmaster Flash, Run-DMC: Pioneers
• Tupac, Notorious B.I.G.: 1990s icons
• Eminem, Jay-Z, Kanye West: 2000s
• Kendrick Lamar, Drake: Modern era
• Sampling, beats, lyrical flow
• Most popular genre globally

**Electronic/Dance:**
• Synthesizers and drum machines
• House music: Chicago (1980s)
• Techno: Detroit (1980s)
• Trance, dubstep, EDM
• DJs as performers
• Festivals: Tomorrowland, Ultra
• Production software: Ableton, FL Studio

**R&B/Soul:**
• African American roots
• Gospel + blues influence
• Motown: Supremes, Temptations, Stevie Wonder
• Soul: Aretha Franklin, James Brown, Otis Redding
• Modern R&B: Beyoncé, Frank Ocean, The Weeknd
• Vocal ability emphasized

**Country:**
• American roots music
• Storytelling tradition
• Guitar, fiddle, banjo
• Nashville: Country music capital
• Johnny Cash, Dolly Parton, Willie Nelson
• Modern: Pop-country crossover

**Reggae:**
• Jamaica, 1960s
• Bob Marley: Global icon
• Offbeat rhythm
• Rastafari influence
• Ska and rocksteady predecessors
• Influenced punk and hip hop`
  },
  {
    topic: 'Music Production',
    category: 'music',
    keywords: ['production', 'recording', 'mixing', 'mastering', 'daw', 'studio'],
    content: `Music production is the process of creating recorded music.

**Digital Audio Workstations (DAWs):**
• Ableton Live: Electronic music, live performance
• Logic Pro: Apple, comprehensive
• FL Studio: Beat making, hip hop
• Pro Tools: Industry standard for recording
• GarageBand: Free, beginner-friendly
• Reaper: Affordable, powerful
• Studio One: Modern workflow

**Recording:**
• Microphones: Dynamic, condenser, ribbon
• Audio interface: Converts analog to digital
• Preamp: Boosts microphone signal
• Sample rate: 44.1kHz (CD quality) or higher
• Bit depth: 16-bit (CD) or 24-bit (professional)
• Monitoring: Studio headphones and speakers
• Acoustic treatment: Reduces room reflections

**MIDI:**
• Musical Instrument Digital Interface
• Controls virtual instruments
• Note data, not audio
• Quantization: Align notes to grid
• Velocity: How hard note is played
• Controllers: Keyboards, pads, knobs
• Automation: Change parameters over time

**Mixing:**
• Balance levels of all tracks
• EQ: Adjust frequency content
  - Cut before boost
  - Remove muddiness (200-500 Hz)
  - Add presence (2-5 kHz)
• Compression: Control dynamic range
  - Threshold, ratio, attack, release
  - Makes quiet parts louder, loud parts quieter
• Reverb: Simulates space
• Delay: Echo effect
• Panning: Left/right placement
• Bus processing: Group similar tracks

**Mastering:**
• Final step before distribution
• Ensure consistency across tracks
• Loudness optimization
• EQ adjustments for overall balance
• Stereo enhancement
• Limiting: Prevent clipping
• LUFS: Loudness measurement standard
• Different masters for streaming, vinyl, CD

**Sound Design:**
• Synthesis: Creating sounds electronically
  - Subtractive: Filter harmonics
  - Additive: Combine sine waves
  - FM: Frequency modulation
  - Wavetable: Morphing waveforms
• Sampling: Using recorded sounds
• Foley: Creating sound effects
• Layering: Combine multiple sounds`
  },
];

ALL_KNOWLEDGE.push(...MUSIC_EXTENDED);

// =============================================================================
// PHILOSOPHY EXTENDED
// =============================================================================

export const PHILOSOPHY_EXTENDED: KnowledgeEntry[] = [
  {
    topic: 'Major Philosophical Questions',
    category: 'philosophy',
    keywords: ['philosophy', 'existence', 'consciousness', 'free will', 'morality', 'meaning'],
    content: `Philosophy explores fundamental questions about existence and knowledge.

**Metaphysics (Nature of Reality):**
• What is real?
• Does God exist?
• What is consciousness?
• Is there free will or determinism?
• What is time?
• Mind-body problem: How do mind and body relate?
• Materialism vs idealism vs dualism

**Epistemology (Theory of Knowledge):**
• What can we know?
• How do we know what we know?
• What is truth?
• Rationalism: Knowledge through reason (Descartes)
• Empiricism: Knowledge through experience (Hume, Locke)
• Skepticism: Can we know anything for certain?
• Descartes: "I think, therefore I am"

**Ethics (Moral Philosophy):**
• What is right and wrong?
• How should we live?
• **Utilitarianism:** Greatest good for greatest number (Mill, Bentham)
• **Deontology:** Duty-based ethics (Kant)
  - Categorical imperative: Act as if it were universal law
• **Virtue ethics:** Character-based (Aristotle)
  - Develop virtuous habits
  - Golden mean between extremes
• **Care ethics:** Relationships and responsibility
• **Existentialism:** Create your own meaning (Sartre, Camus)

**Political Philosophy:**
• What is justice?
• What is the best form of government?
• Social contract: Hobbes, Locke, Rousseau
• John Rawls: Veil of ignorance, justice as fairness
• Liberty vs equality
• Rights: Natural vs legal
• Democracy, authoritarianism, anarchism

**Philosophy of Mind:**
• Hard problem of consciousness (Chalmers)
• Qualia: Subjective experience
• Chinese Room argument (Searle): Can machines think?
• Turing Test: Can machines appear intelligent?
• Zombie argument: Could there be beings without consciousness?
• Functionalism: Mind defined by function, not substance

**Existentialism:**
• Existence precedes essence
• Freedom and responsibility
• Absurdity of existence (Camus)
• Authenticity vs bad faith (Sartre)
• Anxiety and dread (Kierkegaard, Heidegger)
• "Man is condemned to be free" - Sartre
• The Myth of Sisyphus: Finding meaning in absurdity

**Eastern Philosophy:**
• Buddhism: Four Noble Truths, Eightfold Path
• Hinduism: Dharma, karma, moksha
• Confucianism: Social harmony, virtue
• Taoism: Wu wei, harmony with nature
• Zen: Direct experience, meditation
• Yoga: Union of mind and body`
  },
  {
    topic: 'Famous Thought Experiments',
    category: 'philosophy',
    keywords: ['thought experiment', 'trolley problem', 'brain in vat', 'ship of theseus'],
    content: `Thought experiments test philosophical ideas through hypothetical scenarios.

**The Trolley Problem:**
• A trolley is heading toward 5 people
• You can divert it to kill 1 person instead
• Should you? Most say yes
• Variant: Push a large man off bridge to stop trolley
• Most say no, even though outcome is same
• Tests: Utilitarianism vs deontology
• Relevant to autonomous vehicle programming

**The Ship of Theseus:**
• If you replace every plank of a ship, is it the same ship?
• What if you build a new ship from the old planks?
• Questions identity and persistence
• Applies to: Human cells replace every 7-10 years
• Are you the same person you were as a child?

**Brain in a Vat:**
• What if your brain is in a vat, fed simulated experiences?
• How would you know?
• You can't prove you're not
• Similar to: The Matrix, Descartes' evil demon
• Questions: Reality, knowledge, perception

**Plato's Cave:**
• Prisoners chained in cave, see only shadows
• One escapes, sees real world
• Returns to tell others, they don't believe
• Allegory for: Ignorance vs enlightenment
• Appearance vs reality
• Education as liberation

**The Chinese Room (Searle):**
• Person in room follows rules to respond in Chinese
• They don't understand Chinese
• Can a computer truly "understand"?
• Challenges: Strong AI claims
• Syntax vs semantics

**Schrödinger's Cat:**
• Cat in box with radioactive trigger
• Until observed: Both alive and dead
• Quantum superposition at macro scale
• Illustrates quantum mechanics absurdity
• Copenhagen interpretation

**The Veil of Ignorance (Rawls):**
• Design society without knowing your position in it
• Would you create inequality?
• Most would create fair, equal society
• Basis for justice as fairness
• Removes self-interest from moral reasoning

**Pascal's Wager:**
• If God exists and you believe: Infinite gain
• If God exists and you don't: Infinite loss
• If God doesn't exist: Little lost either way
• Therefore, rational to believe
• Criticisms: Which god? Sincerity of belief?

**The Experience Machine (Nozick):**
• Machine gives you any experience you want
• Would you plug in permanently?
• Most say no
• Suggests: We value reality, not just pleasure
• Challenges pure hedonism`
  },
];

ALL_KNOWLEDGE.push(...PHILOSOPHY_EXTENDED);

// =============================================================================
// DATA SCIENCE AND AI
// =============================================================================

export const DATA_SCIENCE_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Data Science Fundamentals',
    category: 'technology',
    keywords: ['data science', 'data analysis', 'big data', 'visualization', 'pandas', 'python'],
    content: `Data science extracts insights from structured and unstructured data.

**The Data Science Process:**
1. Define the question/problem
2. Collect data
3. Clean and preprocess data
4. Explore and visualize
5. Model and analyze
6. Communicate results
7. Deploy and monitor

**Data Types:**
• Structured: Tables, databases (SQL)
• Unstructured: Text, images, video
• Semi-structured: JSON, XML
• Time series: Data over time
• Geospatial: Location data

**Data Cleaning:**
• Handle missing values (impute, drop)
• Remove duplicates
• Fix data types
• Handle outliers
• Standardize formats
• Validate data quality
• Often 80% of the work

**Exploratory Data Analysis (EDA):**
• Summary statistics: Mean, median, std dev
• Distributions: Histograms, box plots
• Correlations: Scatter plots, heatmaps
• Patterns and anomalies
• Feature relationships
• Data visualization libraries: Matplotlib, Seaborn, Plotly

**Python for Data Science:**
• NumPy: Numerical computing, arrays
• Pandas: Data manipulation, DataFrames
• Matplotlib/Seaborn: Visualization
• Scikit-learn: Machine learning
• TensorFlow/PyTorch: Deep learning
• Jupyter Notebooks: Interactive coding

**SQL for Data:**
• SELECT, FROM, WHERE, JOIN
• GROUP BY, HAVING, ORDER BY
• Aggregations: COUNT, SUM, AVG, MAX, MIN
• Subqueries and CTEs
• Window functions
• Essential for data extraction

**Data Visualization Best Practices:**
• Choose right chart type for data
• Bar charts: Comparisons
• Line charts: Trends over time
• Scatter plots: Relationships
• Pie charts: Parts of whole (use sparingly)
• Keep it simple and clear
• Label axes and provide context
• Color with purpose`
  },
  {
    topic: 'Artificial Intelligence and Machine Learning',
    category: 'technology',
    keywords: ['ai', 'machine learning', 'neural network', 'deep learning', 'chatgpt', 'algorithm'],
    content: `AI enables machines to perform tasks that typically require human intelligence.

**Types of AI:**
• **Narrow AI (ANI):** Specific tasks (current AI)
  - Image recognition, language translation
  - Game playing (chess, Go)
  - Recommendation systems
• **General AI (AGI):** Human-level intelligence (theoretical)
• **Super AI (ASI):** Beyond human intelligence (hypothetical)

**Machine Learning Types:**

**Supervised Learning:**
• Learns from labeled data
• Classification: Categorize (spam/not spam)
• Regression: Predict numbers (house prices)
• Algorithms: Linear regression, decision trees, SVM, random forest

**Unsupervised Learning:**
• Finds patterns in unlabeled data
• Clustering: Group similar items (K-means)
• Dimensionality reduction: Simplify data (PCA)
• Anomaly detection

**Reinforcement Learning:**
• Learns through trial and error
• Reward and punishment signals
• Game AI, robotics
• AlphaGo: Defeated world Go champion

**Deep Learning:**
• Neural networks with many layers
• Inspired by brain structure
• **CNNs:** Image recognition
• **RNNs/LSTMs:** Sequential data, text
• **Transformers:** Modern NLP (GPT, BERT)
• **GANs:** Generate realistic images
• Requires large datasets and compute

**Natural Language Processing (NLP):**
• Text classification and sentiment analysis
• Machine translation
• Named entity recognition
• Question answering
• Text generation (ChatGPT, Claude)
• Large Language Models (LLMs)
• Tokenization, embeddings, attention

**Computer Vision:**
• Image classification
• Object detection
• Facial recognition
• Medical imaging
• Self-driving cars
• Image generation (DALL-E, Midjourney)

**AI Ethics:**
• Bias in training data and models
• Privacy concerns
• Job displacement
• Deepfakes and misinformation
• Autonomous weapons
• Transparency and explainability
• Regulation and governance
• AI safety and alignment`
  },
];

ALL_KNOWLEDGE.push(...DATA_SCIENCE_KNOWLEDGE);

// =============================================================================
// WEB DEVELOPMENT DEEP DIVE
// =============================================================================

export const WEB_DEV_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Frontend Development',
    category: 'programming',
    keywords: ['frontend', 'html', 'css', 'javascript', 'react', 'vue', 'angular', 'web'],
    content: `Frontend development creates the user-facing part of web applications.

**HTML5:**
• Semantic elements: header, nav, main, article, section, footer
• Forms: input types (email, date, range, color)
• Media: audio, video, canvas
• APIs: Geolocation, Web Storage, Web Workers
• Accessibility: ARIA roles and attributes
• SEO: Proper heading hierarchy, meta tags
• DOCTYPE declaration required

**CSS3:**
• Flexbox: One-dimensional layout
  - display: flex
  - justify-content, align-items
  - flex-direction, flex-wrap
  - flex-grow, flex-shrink, flex-basis
• Grid: Two-dimensional layout
  - display: grid
  - grid-template-columns, grid-template-rows
  - grid-gap, grid-area
  - fr unit, repeat(), minmax()
• Responsive design: Media queries
  - @media (max-width: 768px) {}
  - Mobile-first approach
  - Breakpoints: 320, 768, 1024, 1440
• Animations: @keyframes, transition
• Custom properties (CSS variables)
• Preprocessors: Sass, Less
• Frameworks: Tailwind CSS, Bootstrap

**JavaScript (Modern):**
• ES6+ features:
  - let/const, arrow functions
  - Template literals, destructuring
  - Spread/rest operators
  - Promises, async/await
  - Modules (import/export)
  - Classes, Map, Set
• DOM manipulation
• Event handling and delegation
• Fetch API for HTTP requests
• Local Storage and Session Storage
• Error handling: try/catch

**React:**
• Component-based architecture
• JSX: JavaScript + HTML syntax
• Hooks: useState, useEffect, useContext, useRef
• State management: Context, Redux, Zustand
• Virtual DOM for performance
• React Router for navigation
• Next.js: Server-side rendering framework
• Create React App or Vite for setup

**Vue.js:**
• Progressive framework
• Template syntax with directives
• Composition API (Vue 3)
• Reactive data binding
• Vuex/Pinia for state management
• Vue Router
• Nuxt.js: SSR framework

**Angular:**
• Full framework by Google
• TypeScript-based
• Components, services, modules
• Dependency injection
• RxJS for reactive programming
• Angular CLI
• Two-way data binding

**Build Tools:**
• Vite: Fast dev server, modern bundler
• Webpack: Module bundler
• npm/yarn/pnpm: Package managers
• ESLint: Code linting
• Prettier: Code formatting
• TypeScript: Type safety`
  },
  {
    topic: 'Backend Development',
    category: 'programming',
    keywords: ['backend', 'server', 'api', 'database', 'node', 'python', 'rest'],
    content: `Backend development handles server-side logic and data management.

**Node.js:**
• JavaScript runtime (V8 engine)
• Non-blocking, event-driven
• Express.js: Most popular framework
• Fastify: High-performance alternative
• NestJS: Enterprise framework (TypeScript)
• npm: Largest package ecosystem
• Middleware pattern

**Python Backend:**
• Django: Full-featured framework
  - ORM, admin panel, authentication
  - "Batteries included"
  - MTV pattern (Model-Template-View)
• Flask: Lightweight, flexible
• FastAPI: Modern, async, auto-docs
• SQLAlchemy: ORM

**APIs:**
• **REST (Representational State Transfer):**
  - HTTP methods: GET, POST, PUT, DELETE, PATCH
  - Status codes: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error
  - JSON format typically
  - Stateless
  - Resource-based URLs
• **GraphQL:**
  - Query language for APIs
  - Client specifies exact data needed
  - Single endpoint
  - Schema and types
  - Resolvers
• **WebSockets:**
  - Real-time bidirectional communication
  - Chat apps, live updates
  - Socket.io library

**Databases:**
• **SQL (Relational):**
  - PostgreSQL: Most advanced open-source
  - MySQL: Most popular
  - SQLite: File-based, lightweight
  - Tables, rows, columns
  - JOINs, indexes, transactions
  - ACID compliance
• **NoSQL:**
  - MongoDB: Document store (JSON-like)
  - Redis: In-memory key-value (caching)
  - Firebase: Real-time database
  - Cassandra: Wide-column store
  - DynamoDB: AWS managed

**Authentication:**
• JWT (JSON Web Tokens)
• OAuth 2.0: Third-party login
• Session-based authentication
• Password hashing: bcrypt
• Multi-factor authentication (MFA)
• API keys

**DevOps Basics:**
• Docker: Containerization
• CI/CD: Automated testing and deployment
• Cloud: AWS, Google Cloud, Azure
• Serverless: Lambda, Cloud Functions
• Monitoring: Logging, alerting
• Version control: Git`
  },
  {
    topic: 'Mobile Development',
    category: 'programming',
    keywords: ['mobile', 'ios', 'android', 'react native', 'flutter', 'app', 'swift'],
    content: `Mobile development creates applications for smartphones and tablets.

**Native Development:**

**iOS (Apple):**
• Language: Swift (modern), Objective-C (legacy)
• IDE: Xcode
• UI: SwiftUI (declarative) or UIKit (imperative)
• App Store distribution
• Frameworks: Core Data, Core Location, ARKit
• Design guidelines: Human Interface Guidelines

**Android (Google):**
• Language: Kotlin (modern), Java (legacy)
• IDE: Android Studio
• UI: Jetpack Compose (declarative) or XML layouts
• Google Play Store distribution
• Frameworks: Room, Retrofit, Navigation
• Design guidelines: Material Design

**Cross-Platform:**

**React Native:**
• JavaScript/TypeScript
• React-based components
• Native rendering (not WebView)
• Expo: Simplified development
• Large community and ecosystem
• Hot reloading for fast development
• Used by: Facebook, Instagram, Discord

**Flutter:**
• Dart language (by Google)
• Widget-based UI
• Compiles to native code
• Material Design and Cupertino widgets
• Hot reload
• Single codebase for iOS, Android, web, desktop
• Growing rapidly

**Expo:**
• Framework on top of React Native
• Simplified build and deployment
• Over-the-air updates
• Managed workflow: No native code needed
• EAS: Build and submit services
• Rich library of pre-built modules

**Mobile Design Principles:**
• Touch-friendly targets (44pt minimum)
• Responsive to different screen sizes
• Offline-first when possible
• Performance: 60fps animations
• Battery and data efficiency
• Platform conventions
• Accessibility

**App Store Optimization:**
• Keywords in title and description
• Screenshots and preview videos
• Ratings and reviews
• Regular updates
• Localization for different markets
• A/B testing store listings`
  },
];

ALL_KNOWLEDGE.push(...WEB_DEV_DEEP);

// =============================================================================
// PSYCHOLOGY AND RELATIONSHIPS
// =============================================================================

export const RELATIONSHIPS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Communication Skills',
    category: 'psychology',
    keywords: ['communication', 'listening', 'conflict', 'empathy', 'assertive', 'relationship'],
    content: `Effective communication is essential for healthy relationships.

**Active Listening:**
• Give full attention to the speaker
• Don't interrupt or plan your response
• Reflect back what you heard
• Ask clarifying questions
• Show engagement: Nodding, eye contact
• Validate emotions before problem-solving
• "I hear you saying..." technique

**Assertive Communication:**
• Express needs clearly and respectfully
• Use "I" statements: "I feel... when... because..."
• Not aggressive (attacking) or passive (avoiding)
• Set boundaries firmly but kindly
• Say no without guilt
• Respect others' boundaries too
• Practice: Start with low-stakes situations

**Conflict Resolution:**
• Address issues early (don't let them fester)
• Focus on the problem, not the person
• Listen to understand, not to win
• Find common ground
• Compromise when possible
• Take breaks if emotions run high
• Apologize sincerely when wrong
• Forgive (for your own peace)

**Nonverbal Communication:**
• Body language: 55% of communication
• Tone of voice: 38%
• Words: Only 7% (Mehrabian's rule)
• Eye contact: Shows engagement
• Posture: Open vs closed
• Facial expressions: Universal emotions
• Personal space: Varies by culture
• Mirroring: Builds rapport

**Emotional Intelligence:**
• Self-awareness: Know your emotions
• Self-regulation: Manage your reactions
• Motivation: Internal drive
• Empathy: Understand others' feelings
• Social skills: Navigate relationships
• Daniel Goleman's framework
• Can be developed with practice

**Difficult Conversations:**
• Prepare but don't script
• Choose right time and place
• Start with shared goals
• Be specific, not general
• Listen more than talk
• Acknowledge the other's perspective
• Focus on solutions, not blame
• Follow up afterward`
  },
  {
    topic: 'Positive Psychology',
    category: 'psychology',
    keywords: ['happiness', 'wellbeing', 'gratitude', 'mindfulness', 'resilience', 'positive'],
    content: `Positive psychology studies what makes life worth living.

**PERMA Model (Martin Seligman):**
• **P - Positive Emotions:** Joy, gratitude, hope
• **E - Engagement:** Flow state, deep involvement
• **R - Relationships:** Meaningful connections
• **M - Meaning:** Purpose beyond yourself
• **A - Accomplishment:** Achievement, mastery

**Gratitude:**
• Gratitude journal: Write 3 things daily
• Increases happiness by 25% (research)
• Reduces depression and anxiety
• Improves sleep quality
• Strengthens relationships
• Gratitude letters: Write to someone who helped you
• Shifts focus from what's lacking to what's present

**Mindfulness:**
• Present-moment awareness without judgment
• Meditation: Start with 5 minutes daily
• Body scan: Notice physical sensations
• Mindful breathing: Anchor to breath
• Reduces stress, anxiety, depression
• Improves focus and emotional regulation
• Apps: Headspace, Calm, Insight Timer

**Flow State (Mihaly Csikszentmihalyi):**
• Complete absorption in activity
• Challenge matches skill level
• Clear goals and immediate feedback
• Loss of self-consciousness
• Time distortion
• Intrinsically rewarding
• Found in work, sports, arts, games

**Resilience:**
• Ability to bounce back from adversity
• Not about avoiding difficulty
• Growth mindset helps
• Social support is crucial
• Self-care: Sleep, exercise, nutrition
• Cognitive reframing: Change perspective
• Post-traumatic growth is possible
• Builds with each challenge overcome

**Habits of Happy People:**
• Strong social connections
• Regular physical exercise
• Acts of kindness
• Gratitude practice
• Pursuing meaningful goals
• Spending time in nature
• Limiting social media
• Adequate sleep
• Living according to values
• Accepting imperfection`
  },
  {
    topic: 'Stress Management',
    category: 'psychology',
    keywords: ['stress', 'anxiety', 'coping', 'relaxation', 'burnout', 'self care'],
    content: `Stress management techniques help maintain mental and physical health.

**Understanding Stress:**
• Fight-or-flight response: Evolutionary survival mechanism
• Acute stress: Short-term, can be motivating
• Chronic stress: Long-term, harmful to health
• Cortisol: Primary stress hormone
• Effects: Heart disease, weakened immunity, depression
• Eustress: Positive stress (excitement, challenge)
• Distress: Negative stress (overwhelm, anxiety)

**Physical Techniques:**
• Deep breathing: 4-7-8 technique
  - Inhale 4 seconds
  - Hold 7 seconds
  - Exhale 8 seconds
• Progressive muscle relaxation
  - Tense and release each muscle group
• Exercise: Natural stress reliever
  - 30 minutes most days
  - Any movement counts
• Yoga: Combines physical and mental
• Walking in nature: Reduces cortisol

**Mental Techniques:**
• Cognitive reframing: Change how you think about stressors
• Journaling: Process thoughts and emotions
• Visualization: Imagine peaceful scenes
• Positive self-talk: Challenge negative thoughts
• Problem-solving: Break issues into steps
• Acceptance: Some things can't be changed
• Perspective: "Will this matter in 5 years?"

**Lifestyle Strategies:**
• Sleep: 7-9 hours, consistent schedule
• Nutrition: Balanced diet, limit caffeine/alcohol
• Time management: Prioritize, delegate
• Boundaries: Learn to say no
• Social connection: Talk to trusted people
• Hobbies: Activities you enjoy
• Digital detox: Limit screen time
• Nature: Spend time outdoors

**Burnout Prevention:**
• Recognize early signs: Exhaustion, cynicism, inefficacy
• Set work-life boundaries
• Take regular breaks
• Use vacation time
• Delegate when possible
• Align work with values
• Seek support: Therapy, coaching
• Recovery takes time

**When to Seek Help:**
• Persistent sadness or anxiety
• Difficulty functioning daily
• Sleep or appetite changes
• Substance use to cope
• Thoughts of self-harm
• Therapy is a sign of strength
• Many effective treatments available`
  },
];

ALL_KNOWLEDGE.push(...RELATIONSHIPS_KNOWLEDGE);

// =============================================================================
// BLOCKCHAIN AND CRYPTOCURRENCY
// =============================================================================

export const BLOCKCHAIN_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Blockchain Technology',
    category: 'technology',
    keywords: ['blockchain', 'bitcoin', 'ethereum', 'crypto', 'decentralized', 'web3'],
    content: `Blockchain is a distributed ledger technology that enables trustless transactions.

**How Blockchain Works:**
• Chain of blocks containing transaction data
• Each block has a cryptographic hash of previous block
• Distributed across many nodes (computers)
• Consensus mechanisms validate transactions
• Immutable: Can't change past blocks
• Transparent: Anyone can verify
• No central authority needed

**Consensus Mechanisms:**
• **Proof of Work (PoW):**
  - Miners solve complex math problems
  - First to solve adds the block
  - Requires significant energy
  - Bitcoin uses this
  - Secure but energy-intensive
• **Proof of Stake (PoS):**
  - Validators stake cryptocurrency
  - Selected based on stake amount
  - Much less energy than PoW
  - Ethereum switched to PoS (2022)
  - Slashing: Penalty for bad behavior

**Bitcoin:**
• First cryptocurrency (2009)
• Created by Satoshi Nakamoto (pseudonym)
• Limited supply: 21 million coins
• Halving: Mining reward halves every ~4 years
• Digital gold: Store of value
• Decentralized, censorship-resistant
• Lightning Network: Layer 2 for fast payments

**Ethereum:**
• Smart contract platform
• Created by Vitalik Buterin (2015)
• Ether (ETH): Native cryptocurrency
• Smart contracts: Self-executing code
• DApps: Decentralized applications
• ERC-20: Token standard
• Gas fees: Cost to execute transactions
• Layer 2: Optimism, Arbitrum, Polygon

**DeFi (Decentralized Finance):**
• Financial services without intermediaries
• Lending and borrowing (Aave, Compound)
• Decentralized exchanges (Uniswap, SushiSwap)
• Yield farming: Earning returns
• Liquidity pools
• Stablecoins: USDC, USDT, DAI
• Risks: Smart contract bugs, volatility

**NFTs (Non-Fungible Tokens):**
• Unique digital assets on blockchain
• Art, music, collectibles, gaming
• Proof of ownership and authenticity
• ERC-721 standard
• Marketplaces: OpenSea
• Controversy: Environmental impact, speculation
• Utility NFTs: Access, membership

**Web3:**
• Decentralized internet vision
• User ownership of data
• Wallet-based identity
• DAOs: Decentralized autonomous organizations
• IPFS: Decentralized file storage
• Still early and evolving
• Challenges: UX, scalability, regulation`
  },
];

ALL_KNOWLEDGE.push(...BLOCKCHAIN_KNOWLEDGE);

// =============================================================================
// ASTRONOMY DEEP DIVE
// =============================================================================

export const ASTRONOMY_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Stars and Stellar Evolution',
    category: 'science',
    keywords: ['star', 'sun', 'supernova', 'black hole', 'neutron star', 'stellar'],
    content: `Stars are massive balls of gas undergoing nuclear fusion.

**Star Formation:**
• Nebulae: Clouds of gas and dust
• Gravity causes collapse
• Protostar forms as material heats up
• Nuclear fusion begins: Hydrogen → Helium
• Main sequence star is born
• Process takes millions of years

**Main Sequence:**
• Stars spend most of their life here
• Balance: Gravity vs radiation pressure
• Our Sun: Middle-aged main sequence star
• Classification by temperature/color:
  - O (blue, hottest) → B → A → F → G (Sun) → K → M (red, coolest)
• Mass determines lifespan
  - Massive stars: Millions of years
  - Sun-like: ~10 billion years
  - Red dwarfs: Trillions of years

**Stellar Death:**

**Low-mass stars (like Sun):**
• Expands into red giant
• Outer layers shed: Planetary nebula
• Core remains: White dwarf
• Slowly cools over billions of years
• Eventually becomes black dwarf (theoretical)

**High-mass stars:**
• Expands into red supergiant
• Fuses heavier elements up to iron
• Core collapses: Supernova explosion
• Brightest events in universe
• Creates elements heavier than iron
• Remnant: Neutron star or black hole

**Neutron Stars:**
• Incredibly dense: Teaspoon = billion tons
• ~12 miles diameter
• Rapid rotation: Pulsars
• Strong magnetic fields
• Magnetars: Extreme magnetic neutron stars

**Black Holes:**
• Gravity so strong light can't escape
• Event horizon: Point of no return
• Singularity: Infinite density (theoretical)
• Stellar black holes: 3-100 solar masses
• Supermassive: Millions to billions of solar masses
  - Center of most galaxies
  - Sagittarius A*: Milky Way's SMBH
• Hawking radiation: Theoretical slow evaporation
• First image: M87 black hole (2019)

**Galaxies:**
• Milky Way: Our galaxy
  - Spiral galaxy
  - 100-400 billion stars
  - ~100,000 light-years across
  - Solar system in Orion Arm
• Types: Spiral, elliptical, irregular
• Andromeda: Nearest large galaxy (2.5 million light-years)
• Will merge with Milky Way in ~4.5 billion years
• Observable universe: ~2 trillion galaxies`
  },
  {
    topic: 'Cosmology and the Universe',
    category: 'science',
    keywords: ['universe', 'big bang', 'cosmology', 'dark matter', 'dark energy', 'expansion'],
    content: `Cosmology studies the origin, structure, and fate of the universe.

**The Big Bang:**
• Universe began ~13.8 billion years ago
• Started as infinitely hot, dense point
• Rapid expansion (not explosion)
• First atoms formed after ~380,000 years
• Cosmic Microwave Background (CMB): Afterglow
• First stars: ~100-200 million years after
• Evidence: CMB, redshift, element abundances

**Timeline of the Universe:**
• 0: Big Bang
• 10⁻³⁶ seconds: Inflation (rapid expansion)
• 3 minutes: First nuclei form (hydrogen, helium)
• 380,000 years: Atoms form, CMB released
• 100-200 million years: First stars
• 1 billion years: First galaxies
• 9.2 billion years: Solar system forms
• 13.8 billion years: Present day

**Dark Matter:**
• ~27% of universe's mass-energy
• Doesn't emit or absorb light
• Detected through gravitational effects
• Holds galaxies together
• Galaxy rotation curves: Evidence
• Candidates: WIMPs, axions
• Not yet directly detected

**Dark Energy:**
• ~68% of universe's mass-energy
• Causes accelerating expansion
• Discovered 1998 (Nobel Prize 2011)
• Nature unknown
• Cosmological constant (Einstein)
• May determine universe's fate

**Fate of the Universe:**
• **Big Freeze:** Expansion continues forever, stars die out
• **Big Crunch:** Gravity reverses expansion
• **Big Rip:** Dark energy tears everything apart
• Current evidence favors Big Freeze
• Heat death: Maximum entropy

**Scale of the Universe:**
• Observable universe: ~93 billion light-years diameter
• Light-year: ~5.88 trillion miles
• Nearest star (Proxima Centauri): 4.24 light-years
• Milky Way: ~100,000 light-years across
• Nearest galaxy (Andromeda): 2.5 million light-years
• Most distant observed: 13.4 billion light-years
• Universe may be infinite beyond observable

**Unsolved Questions:**
• What is dark matter?
• What is dark energy?
• What happened before the Big Bang?
• Is there a multiverse?
• Why is there more matter than antimatter?
• How did life begin?
• Are we alone in the universe?`
  },
];

ALL_KNOWLEDGE.push(...ASTRONOMY_DEEP);

// =============================================================================
// CREATIVE ARTS AND DESIGN
// =============================================================================

export const CREATIVE_ARTS: KnowledgeEntry[] = [
  {
    topic: 'Visual Art Fundamentals',
    category: 'art',
    keywords: ['art', 'painting', 'drawing', 'color theory', 'composition', 'design'],
    content: `Visual art encompasses many forms of creative expression.

**Elements of Art:**
• **Line:** Direction, weight, character
• **Shape:** 2D areas (geometric, organic)
• **Form:** 3D objects (sphere, cube)
• **Color:** Hue, saturation, value
• **Value:** Light to dark range
• **Texture:** Surface quality (actual or implied)
• **Space:** Positive and negative areas

**Principles of Design:**
• **Balance:** Visual weight distribution
• **Contrast:** Differences create interest
• **Emphasis:** Focal point draws attention
• **Movement:** Guides viewer's eye
• **Pattern:** Repeating elements
• **Rhythm:** Visual tempo
• **Unity:** Everything works together
• **Proportion:** Size relationships

**Color Theory:**
• Primary colors: Red, blue, yellow
• Secondary: Orange, green, purple
• Tertiary: Mix of primary + secondary
• Color wheel: Relationships between colors
• Complementary: Opposite on wheel (high contrast)
• Analogous: Adjacent on wheel (harmony)
• Warm colors: Red, orange, yellow
• Cool colors: Blue, green, purple
• Saturation: Intensity of color
• Value: Lightness or darkness

**Drawing:**
• Gesture drawing: Quick, captures movement
• Contour drawing: Outlines and edges
• Shading: Cross-hatching, stippling, blending
• Perspective: 1-point, 2-point, 3-point
• Proportion: Measuring relationships
• Negative space: Drawing what's not there
• Practice: Daily sketching improves skill

**Painting:**
• Oil: Rich color, slow drying, blendable
• Acrylic: Fast drying, versatile
• Watercolor: Transparent, luminous
• Gouache: Opaque watercolor
• Techniques: Wet-on-wet, glazing, impasto
• Brushwork: Flat, round, palette knife

**Art Movements:**
• Renaissance: Realism, perspective (Da Vinci, Michelangelo)
• Impressionism: Light, color, moment (Monet, Renoir)
• Post-Impressionism: Structure, emotion (Van Gogh, Cézanne)
• Cubism: Multiple perspectives (Picasso, Braque)
• Surrealism: Dreams, unconscious (Dalí, Magritte)
• Abstract Expressionism: Emotion, gesture (Pollock, Rothko)
• Pop Art: Popular culture (Warhol, Lichtenstein)
• Contemporary: Diverse, conceptual, multimedia`
  },
  {
    topic: 'Photography',
    category: 'art',
    keywords: ['photography', 'camera', 'exposure', 'composition', 'portrait', 'landscape'],
    content: `Photography captures light to create images.

**Exposure Triangle:**
• **Aperture (f-stop):**
  - Controls depth of field
  - Low f-number (f/1.8): Shallow DOF, blurry background
  - High f-number (f/16): Deep DOF, everything sharp
  - Also controls light amount
• **Shutter Speed:**
  - How long sensor is exposed
  - Fast (1/1000): Freezes motion
  - Slow (1/30): Motion blur
  - Very slow: Light trails, waterfalls
• **ISO:**
  - Sensor sensitivity to light
  - Low (100): Clean, less noise
  - High (3200+): Grainy, more noise
  - Use lowest ISO possible

**Composition:**
• Rule of thirds: Place subjects on grid intersections
• Leading lines: Guide viewer's eye
• Framing: Use natural frames
• Symmetry and patterns
• Fill the frame: Get closer
• Negative space: Simplify
• Foreground interest: Add depth
• Golden ratio/spiral

**Types of Photography:**
• Portrait: People, expression, personality
• Landscape: Nature, scenery, wide views
• Street: Candid, urban life
• Wildlife: Animals in natural habitat
• Macro: Extreme close-up
• Architecture: Buildings, structures
• Sports/Action: Fast movement
• Astrophotography: Night sky, stars

**Lighting:**
• Golden hour: After sunrise, before sunset
• Blue hour: Just before sunrise, after sunset
• Harsh light: Midday sun, strong shadows
• Soft light: Overcast, diffused
• Backlighting: Light behind subject
• Side lighting: Dramatic shadows
• Studio lighting: Controlled environment

**Post-Processing:**
• RAW format: Maximum editing flexibility
• White balance: Color temperature
• Exposure adjustment
• Contrast and clarity
• Color grading
• Cropping and straightening
• Software: Lightroom, Photoshop, Capture One
• Don't over-edit: Subtlety is key`
  },
  {
    topic: 'Graphic Design',
    category: 'design',
    keywords: ['graphic design', 'typography', 'logo', 'branding', 'layout', 'poster'],
    content: `Graphic design communicates ideas visually.

**Typography:**
• Serif fonts: Traditional, readable (Times, Georgia)
• Sans-serif: Modern, clean (Helvetica, Arial)
• Display fonts: Headlines, decorative
• Monospace: Code, typewriter look
• Font pairing: Contrast but complement
• Hierarchy: Size, weight, color guide reading
• Line height: 1.4-1.6 for body text
• Letter spacing: Adjust for readability
• Limit to 2-3 fonts per design

**Layout:**
• Grid systems: Organize content
• White space: Breathing room (not wasted space)
• Visual hierarchy: Most important first
• Alignment: Creates order and connection
• Proximity: Related items close together
• Consistency: Repeated patterns
• F-pattern and Z-pattern reading

**Logo Design:**
• Simple: Recognizable at any size
• Memorable: Distinctive and unique
• Timeless: Avoid trends
• Versatile: Works in all contexts
• Appropriate: Fits the brand
• Types: Wordmark, lettermark, symbol, combination
• Vector format: Scalable without quality loss

**Branding:**
• Logo, colors, typography, imagery
• Brand voice and personality
• Consistency across all touchpoints
• Style guide: Document brand rules
• Target audience understanding
• Emotional connection
• Brand story and values

**Design Tools:**
• Adobe Creative Suite:
  - Photoshop: Photo editing, raster graphics
  - Illustrator: Vector graphics, logos
  - InDesign: Print layout, publications
• Figma: UI/UX design, collaboration
• Canva: Easy, template-based
• Sketch: Mac UI design
• Affinity: Adobe alternative

**Design Process:**
1. Brief: Understand the problem
2. Research: Audience, competitors
3. Ideation: Sketches, brainstorming
4. Design: Digital execution
5. Feedback: Iterate based on input
6. Finalize: Prepare for delivery
7. Handoff: Files and specifications`
  },
];

ALL_KNOWLEDGE.push(...CREATIVE_ARTS);

// =============================================================================
// ENTREPRENEURSHIP AND BUSINESS
// =============================================================================

export const ENTREPRENEURSHIP_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Starting a Business',
    category: 'business',
    keywords: ['startup', 'entrepreneur', 'business plan', 'funding', 'company', 'venture'],
    content: `Entrepreneurship involves creating and growing businesses.

**Business Planning:**
• Problem-solution fit: What problem do you solve?
• Market research: Size, trends, competition
• Business model: How you make money
• Revenue streams: Products, services, subscriptions
• Cost structure: Fixed and variable costs
• Value proposition: Why customers choose you
• Lean Canvas: One-page business plan

**Legal Structure:**
• Sole proprietorship: Simplest, personal liability
• LLC: Limited liability, flexible
• Corporation (C-Corp): Separate entity, double taxation
• S-Corp: Pass-through taxation
• Partnership: Shared ownership
• Choose based on: Liability, taxes, growth plans

**Funding Options:**
• Bootstrapping: Self-funded
• Friends and family
• Angel investors: Early-stage individuals
• Venture capital: Institutional investors
  - Seed, Series A, B, C rounds
  - Give up equity for capital
• Crowdfunding: Kickstarter, Indiegogo
• Small business loans
• Grants: Government and private

**Minimum Viable Product (MVP):**
• Simplest version that delivers value
• Test assumptions quickly
• Get real user feedback
• Iterate based on data
• Don't build everything at once
• "If you're not embarrassed by v1, you launched too late"

**Marketing:**
• Content marketing: Blog, video, social media
• SEO: Search engine optimization
• Social media marketing
• Email marketing: Newsletters, automation
• Paid advertising: Google Ads, Facebook Ads
• Word of mouth: Best marketing
• Brand building: Trust and recognition

**Growth:**
• Product-market fit: People want what you're selling
• Customer acquisition cost (CAC)
• Lifetime value (LTV): LTV > CAC
• Retention: Keep existing customers
• Referrals: Turn customers into advocates
• Scaling: Systems and processes
• Hiring: Culture fit and skills

**Common Mistakes:**
• No market need (top reason startups fail)
• Running out of cash
• Wrong team
• Getting outcompeted
• Pricing issues
• Ignoring customers
• Scaling too early
• Not pivoting when needed`
  },
  {
    topic: 'Project Management',
    category: 'business',
    keywords: ['project management', 'agile', 'scrum', 'kanban', 'planning', 'team'],
    content: `Project management ensures work is completed efficiently and effectively.

**Methodologies:**

**Agile:**
• Iterative, incremental approach
• Respond to change over following a plan
• Working software over documentation
• Customer collaboration over contracts
• Individuals over processes
• Sprints: 1-4 week cycles
• Daily standups: Quick sync meetings
• Retrospectives: Continuous improvement

**Scrum:**
• Agile framework
• Roles: Product Owner, Scrum Master, Dev Team
• Artifacts: Product Backlog, Sprint Backlog, Increment
• Events: Sprint Planning, Daily Scrum, Sprint Review, Retrospective
• User stories: "As a [user], I want [feature], so that [benefit]"
• Story points: Estimate complexity
• Velocity: Team's capacity per sprint

**Kanban:**
• Visual workflow management
• Board with columns: To Do, In Progress, Done
• Work-in-progress (WIP) limits
• Continuous flow (no sprints)
• Pull system: Start new work when capacity allows
• Visualize bottlenecks
• Tools: Trello, Jira, Asana

**Waterfall:**
• Sequential phases
• Requirements → Design → Build → Test → Deploy
• Each phase completes before next begins
• Good for well-defined projects
• Less flexible to changes
• Traditional approach

**Key Concepts:**
• Scope: What needs to be done
• Timeline: When it needs to be done
• Budget: How much it costs
• Quality: How well it's done
• Risk management: Identify and mitigate risks
• Stakeholder management: Keep everyone informed
• Communication: Most important skill

**Tools:**
• Jira: Software development
• Asana: General project management
• Trello: Kanban boards
• Monday.com: Visual project management
• Notion: All-in-one workspace
• Slack: Team communication
• GitHub/GitLab: Code collaboration`
  },
];

ALL_KNOWLEDGE.push(...ENTREPRENEURSHIP_KNOWLEDGE);

// =============================================================================
// OCEANOGRAPHY AND MARINE SCIENCE
// =============================================================================

export const OCEAN_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Ocean Science',
    category: 'science',
    keywords: ['ocean', 'marine', 'sea', 'coral', 'whale', 'deep sea', 'tide'],
    content: `Oceans cover 71% of Earth's surface and contain 97% of its water.

**Ocean Zones:**
• **Sunlight Zone (Epipelagic):** 0-200m
  - Where photosynthesis occurs
  - Most marine life lives here
  - Coral reefs, fish, dolphins
• **Twilight Zone (Mesopelagic):** 200-1,000m
  - Dim light, no photosynthesis
  - Bioluminescent organisms
  - Jellyfish, squid, lanternfish
• **Midnight Zone (Bathypelagic):** 1,000-4,000m
  - Complete darkness
  - High pressure
  - Giant squid, anglerfish
• **Abyssal Zone:** 4,000-6,000m
  - Near freezing temperatures
  - Sparse life
  - Sea cucumbers, tube worms
• **Hadal Zone:** 6,000-11,000m
  - Ocean trenches
  - Extreme pressure
  - Mariana Trench: Deepest point (36,000 ft)

**Ocean Currents:**
• Thermohaline circulation: Global conveyor belt
• Gulf Stream: Warms Western Europe
• El Niño/La Niña: Pacific temperature cycles
• Upwelling: Deep nutrient-rich water rises
• Currents distribute heat globally
• Affect weather and climate patterns

**Marine Ecosystems:**
• **Coral Reefs:**
  - "Rainforests of the sea"
  - 25% of marine species
  - Great Barrier Reef: Largest
  - Threatened by warming and acidification
  - Bleaching: Stress response
• **Kelp Forests:**
  - Giant seaweed ecosystems
  - Absorb CO2
  - Support diverse life
• **Deep Sea Vents:**
  - Hydrothermal vents
  - Chemosynthesis (not photosynthesis)
  - Unique ecosystems
  - Extremophile organisms
• **Mangroves:**
  - Coastal forests
  - Nurseries for fish
  - Storm protection
  - Carbon storage

**Marine Life:**
• Blue whale: Largest animal ever (100 ft, 200 tons)
• Great white shark: Apex predator
• Octopus: Highly intelligent invertebrate
• Sea turtles: Ancient, endangered
• Dolphins: Social, intelligent mammals
• Jellyfish: Some immortal (Turritopsis dohrnii)
• Phytoplankton: Produce 50%+ of Earth's oxygen

**Ocean Threats:**
• Plastic pollution: 8 million tons/year enter oceans
• Overfishing: 90% of fish stocks fully exploited
• Ocean acidification: CO2 absorption lowers pH
• Warming: Coral bleaching, species migration
• Dead zones: Low oxygen from nutrient runoff
• Deep sea mining: Emerging threat`
  },
];

ALL_KNOWLEDGE.push(...OCEAN_KNOWLEDGE);

// =============================================================================
// GENETICS AND BIOTECHNOLOGY
// =============================================================================

export const GENETICS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Genetics and DNA',
    category: 'science',
    keywords: ['genetics', 'dna', 'gene', 'chromosome', 'mutation', 'heredity', 'genome'],
    content: `Genetics studies heredity and variation in living organisms.

**DNA (Deoxyribonucleic Acid):**
• Double helix structure (Watson & Crick, 1953)
• Four bases: Adenine (A), Thymine (T), Guanine (G), Cytosine (C)
• Base pairing: A-T, G-C
• Sugar-phosphate backbone
• Contains genetic instructions for life
• Human genome: ~3 billion base pairs
• ~20,000-25,000 genes

**Genes and Chromosomes:**
• Gene: Segment of DNA coding for a protein
• Chromosome: Organized structure of DNA
• Humans: 23 pairs (46 total)
• Sex chromosomes: XX (female), XY (male)
• Autosomes: Non-sex chromosomes (22 pairs)
• Alleles: Different versions of a gene
• Dominant and recessive traits

**Inheritance:**
• Mendel's Laws: Foundation of genetics
  - Law of Segregation: Alleles separate during gamete formation
  - Law of Independent Assortment: Genes on different chromosomes sort independently
• Punnett squares: Predict offspring traits
• Genotype: Genetic makeup (AA, Aa, aa)
• Phenotype: Observable traits
• Codominance: Both alleles expressed
• Incomplete dominance: Blended expression
• Polygenic traits: Multiple genes (height, skin color)

**Mutations:**
• Changes in DNA sequence
• Point mutations: Single base change
• Insertions and deletions
• Chromosomal mutations: Large-scale changes
• Can be harmful, neutral, or beneficial
• Cause of genetic diversity
• Cancer: Accumulation of mutations
• Mutagens: UV light, chemicals, radiation

**Genetic Technologies:**
• **CRISPR-Cas9:** Gene editing tool
  - Cut and modify specific DNA sequences
  - Potential to cure genetic diseases
  - Ethical debates about human editing
  - Agricultural applications
• **PCR:** Amplify DNA for analysis
• **Gene therapy:** Replace faulty genes
• **Genetic testing:** Screen for diseases
• **Cloning:** Dolly the sheep (1996)
• **Genomics:** Study entire genomes

**Human Genome Project:**
• Completed 2003
• Mapped all human genes
• Cost ~$3 billion
• Now costs ~$600 to sequence a genome
• Enabled personalized medicine
• Revealed: Humans 99.9% genetically identical
• Led to pharmacogenomics

**Epigenetics:**
• Changes in gene expression without DNA changes
• Environmental factors affect gene activity
• Can be inherited
• Diet, stress, toxins influence epigenetics
• Explains identical twins diverging
• Growing field of research`
  },
  {
    topic: 'Evolution and Natural Selection',
    category: 'science',
    keywords: ['evolution', 'natural selection', 'darwin', 'species', 'adaptation', 'fossil'],
    content: `Evolution explains the diversity of life through natural processes.

**Charles Darwin:**
• On the Origin of Species (1859)
• Voyage on HMS Beagle
• Galápagos Islands: Finch observations
• Theory of natural selection
• "Survival of the fittest" (Herbert Spencer's term)
• One of most influential scientists ever

**Natural Selection:**
• Variation: Individuals differ
• Heredity: Traits passed to offspring
• Selection: Some traits improve survival
• Time: Changes accumulate over generations
• Adaptation: Traits that improve fitness
• Not random: Directed by environment
• Does not have a goal or direction

**Evidence for Evolution:**
• **Fossil record:** Shows change over time
  - Transitional fossils (Tiktaalik, Archaeopteryx)
  - Oldest fossils: ~3.5 billion years
• **Comparative anatomy:**
  - Homologous structures: Same origin, different function
  - Vestigial structures: Reduced, no function (appendix)
• **Molecular biology:**
  - DNA similarities between species
  - Humans share 98.7% DNA with chimps
  - Universal genetic code
• **Biogeography:**
  - Species distribution matches evolutionary history
  - Island species unique but related to mainland
• **Direct observation:**
  - Antibiotic resistance in bacteria
  - Peppered moths during Industrial Revolution
  - Dog breeding (artificial selection)

**Speciation:**
• Formation of new species
• Allopatric: Geographic isolation
• Sympatric: Same area, different niches
• Reproductive isolation
• Takes thousands to millions of years
• Ring species: Gradual change around barrier

**Human Evolution:**
• Hominins: Human lineage after split from chimps (~6-7 million years ago)
• Australopithecus: Lucy (~3.2 million years ago)
• Homo habilis: First tool users
• Homo erectus: First to leave Africa
• Homo neanderthalensis: Coexisted with humans
• Homo sapiens: Modern humans (~300,000 years ago)
• Out of Africa: ~70,000 years ago
• All living humans are one species

**Common Misconceptions:**
• Evolution is "just a theory" (theory = well-supported explanation)
• Humans evolved from monkeys (shared ancestor)
• Evolution is random (natural selection is not random)
• Evolution means progress (no direction or goal)
• Individual organisms evolve (populations evolve)
• Evolution is slow (can be rapid in some cases)`
  },
];

ALL_KNOWLEDGE.push(...GENETICS_KNOWLEDGE);

// =============================================================================
// WORLD RELIGIONS EXTENDED
// =============================================================================

export const WORLD_RELIGIONS_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Major World Religions',
    category: 'religion',
    keywords: ['religion', 'christianity', 'islam', 'buddhism', 'hinduism', 'judaism', 'faith'],
    content: `World religions shape billions of people's lives and cultures.

**Christianity (~2.4 billion followers):**
• Based on teachings of Jesus Christ
• Holy book: Bible (Old and New Testament)
• Core belief: Jesus is Son of God, died for sins, resurrected
• Trinity: Father, Son, Holy Spirit
• Major branches: Catholic, Protestant, Orthodox
• Sacraments: Baptism, Communion
• Largest religion worldwide
• Christmas and Easter: Major holidays

**Islam (~1.9 billion followers):**
• Founded by Prophet Muhammad (7th century CE)
• Holy book: Quran
• Five Pillars: Shahada (faith), Salat (prayer), Zakat (charity), Sawm (fasting), Hajj (pilgrimage)
• Monotheistic: Allah is one God
• Major branches: Sunni (~85%), Shia (~15%)
• Mosque: Place of worship
• Ramadan: Month of fasting
• Fastest-growing religion

**Hinduism (~1.2 billion followers):**
• Oldest major religion (~4,000+ years)
• No single founder
• Holy texts: Vedas, Upanishads, Bhagavad Gita
• Concepts: Dharma, karma, samsara, moksha
• Many deities: Brahma, Vishnu, Shiva
• Caste system (historically)
• Yoga and meditation practices
• Diwali: Festival of lights

**Buddhism (~500 million followers):**
• Founded by Siddhartha Gautama (Buddha, ~500 BCE)
• Four Noble Truths:
  1. Life involves suffering (dukkha)
  2. Suffering caused by desire (tanha)
  3. Suffering can end (nirvana)
  4. Eightfold Path leads to end of suffering
• Eightfold Path: Right view, intention, speech, action, livelihood, effort, mindfulness, concentration
• Major branches: Theravada, Mahayana, Vajrayana
• Meditation central practice
• No creator god

**Judaism (~15 million followers):**
• Oldest Abrahamic religion (~3,500 years)
• Holy book: Torah (part of Tanakh)
• Monotheistic: One God (YHWH)
• Covenant between God and Abraham
• Ten Commandments
• Synagogue: Place of worship
• Rabbi: Religious teacher
• Shabbat: Weekly day of rest
• Major holidays: Rosh Hashanah, Yom Kippur, Passover

**Sikhism (~30 million followers):**
• Founded by Guru Nanak (15th century, Punjab)
• One God, equality of all people
• Holy book: Guru Granth Sahib
• Five Ks: Kesh, kangha, kara, kachera, kirpan
• Gurdwara: Place of worship
• Langar: Free community kitchen
• Rejects caste system

**Other Traditions:**
• Taoism: Harmony with the Tao
• Shinto: Japanese nature spirits (kami)
• Jainism: Non-violence (ahimsa)
• Bahá'í: Unity of all religions
• Indigenous/tribal religions worldwide
• Secular humanism and atheism growing`
  },
];

ALL_KNOWLEDGE.push(...WORLD_RELIGIONS_DEEP);

// =============================================================================
// ECONOMICS AND GLOBAL TRADE
// =============================================================================

export const ECONOMICS_EXTENDED: KnowledgeEntry[] = [
  {
    topic: 'Economic Systems and Theory',
    category: 'economics',
    keywords: ['economics', 'capitalism', 'socialism', 'supply', 'demand', 'gdp', 'inflation'],
    content: `Economics studies how societies allocate scarce resources.

**Economic Systems:**

**Capitalism (Market Economy):**
• Private ownership of means of production
• Supply and demand determine prices
• Profit motive drives innovation
• Competition benefits consumers
• Minimal government intervention (ideally)
• Examples: US, UK, Japan
• Criticisms: Inequality, market failures

**Socialism:**
• Government or collective ownership
• Central planning of economy
• Wealth redistribution
• Universal services (healthcare, education)
• Various forms: Democratic socialism, state socialism
• Examples: Scandinavian model (mixed)
• Criticisms: Inefficiency, reduced incentives

**Mixed Economy:**
• Combination of market and government
• Most modern economies
• Private enterprise with regulation
• Social safety nets
• Public goods: Roads, defense, education
• Government corrects market failures

**Key Concepts:**

**Supply and Demand:**
• Supply: Quantity producers willing to sell
• Demand: Quantity consumers willing to buy
• Equilibrium: Where supply meets demand
• Price increases → demand decreases
• Price increases → supply increases
• Shifts: Changes in non-price factors

**GDP (Gross Domestic Product):**
• Total value of goods and services produced
• Measures economic output
• GDP per capita: Per person
• Real GDP: Adjusted for inflation
• Growth rate: Economic health indicator
• Limitations: Doesn't measure well-being

**Inflation:**
• General increase in prices over time
• Measured by CPI (Consumer Price Index)
• Target: ~2% annually (most central banks)
• Causes: Demand-pull, cost-push, monetary
• Hyperinflation: Extreme (Zimbabwe, Venezuela)
• Deflation: Falling prices (can be harmful)
• Central banks use interest rates to control

**Unemployment:**
• Frictional: Between jobs
• Structural: Skills mismatch
• Cyclical: Economic downturns
• Natural rate: ~4-5%
• Measured by unemployment rate
• Underemployment also significant

**International Trade:**
• Comparative advantage: Specialize in what you do best
• Free trade: No tariffs or barriers
• Protectionism: Tariffs, quotas
• Trade deficit/surplus
• WTO: World Trade Organization
• Trade agreements: NAFTA/USMCA, EU
• Globalization: Interconnected economies

**Monetary Policy:**
• Central banks (Federal Reserve, ECB, Bank of England)
• Interest rates: Cost of borrowing
• Money supply control
• Quantitative easing: Buying assets
• Inflation targeting
• Independence from government

**Fiscal Policy:**
• Government spending and taxation
• Stimulus: Increase spending or cut taxes
• Austerity: Cut spending or raise taxes
• Budget deficit: Spending > revenue
• National debt: Accumulated deficits
• Keynesian economics: Government intervention during downturns`
  },
  {
    topic: 'Global Economic Issues',
    category: 'economics',
    keywords: ['poverty', 'inequality', 'development', 'trade', 'globalization', 'economy'],
    content: `Global economic challenges affect billions of people worldwide.

**Poverty:**
• Extreme poverty: <$2.15/day (World Bank)
• ~700 million people in extreme poverty
• Declining globally but unevenly
• Causes: Conflict, corruption, geography, education
• Multidimensional: Income, health, education
• Poverty trap: Hard to escape without help
• Microfinance: Small loans for entrepreneurs

**Income Inequality:**
• Gini coefficient: Measures inequality (0-1)
• Top 1% own ~45% of global wealth
• Growing in many countries
• Causes: Technology, globalization, policy
• Effects: Social tension, health outcomes
• Solutions debated: Taxation, education, minimum wage

**Economic Development:**
• Developed vs developing countries
• HDI: Human Development Index
• Factors: Education, healthcare, infrastructure
• Foreign aid: Controversial effectiveness
• FDI: Foreign direct investment
• Sustainable development goals (SDGs)
• Technology leapfrogging

**Financial Crises:**
• 2008 Global Financial Crisis:
  - Subprime mortgage collapse
  - Bank failures (Lehman Brothers)
  - Global recession
  - Government bailouts
  - Regulatory reforms (Dodd-Frank)
• Causes: Excessive risk, deregulation, bubbles
• Effects: Unemployment, lost wealth, austerity
• Prevention: Regulation, oversight, stress tests

**Globalization:**
• Increased interconnection of economies
• Benefits: Lower prices, innovation, growth
• Challenges: Job displacement, inequality
• Supply chains: Global and complex
• COVID-19 exposed vulnerabilities
• Reshoring: Bringing production back
• Digital globalization: Services and data

**Future Economic Challenges:**
• Automation and AI: Job displacement
• Climate change: Economic costs
• Aging populations: Pension and healthcare costs
• Debt levels: Government and private
• Digital currencies: Central bank digital currencies
• Gig economy: Changing nature of work
• Universal basic income: Debated solution`
  },
];

ALL_KNOWLEDGE.push(...ECONOMICS_EXTENDED);

// =============================================================================
// CYBERSECURITY FUNDAMENTALS
// =============================================================================

export const CYBERSECURITY_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Cybersecurity Basics',
    category: 'technology',
    keywords: ['cybersecurity', 'hacking', 'password', 'encryption', 'phishing', 'malware', 'security'],
    content: `Cybersecurity protects systems, networks, and data from digital attacks.

**Common Threats:**

**Malware:**
• Virus: Attaches to files, spreads
• Worm: Self-replicating, spreads via network
• Trojan: Disguised as legitimate software
• Ransomware: Encrypts files, demands payment
• Spyware: Monitors activity secretly
• Adware: Unwanted advertisements
• Rootkit: Hides deep in system

**Social Engineering:**
• Phishing: Fake emails/websites to steal credentials
• Spear phishing: Targeted at specific individuals
• Vishing: Voice phishing (phone calls)
• Smishing: SMS phishing
• Pretexting: Creating false scenario
• Baiting: Leaving infected USB drives
• Tailgating: Following authorized person into building

**Network Attacks:**
• DDoS: Overwhelm server with traffic
• Man-in-the-middle: Intercept communications
• SQL injection: Exploit database queries
• Cross-site scripting (XSS): Inject malicious scripts
• Zero-day: Exploit unknown vulnerabilities
• Brute force: Try all password combinations

**Protection Measures:**

**Passwords:**
• Use strong, unique passwords (12+ characters)
• Password manager: LastPass, 1Password, Bitwarden
• Multi-factor authentication (MFA): Always enable
• Never reuse passwords across sites
• Passkeys: Passwordless future

**Encryption:**
• Converts data to unreadable format
• HTTPS: Encrypted web traffic
• End-to-end encryption: Only sender/receiver can read
• AES: Standard encryption algorithm
• VPN: Encrypted tunnel for internet traffic
• Full disk encryption: Protect stored data

**Best Practices:**
• Keep software updated (patches fix vulnerabilities)
• Use antivirus/anti-malware software
• Back up data regularly (3-2-1 rule)
• Be skeptical of unexpected emails/links
• Use secure Wi-Fi (avoid public for sensitive tasks)
• Enable firewall
• Principle of least privilege
• Security awareness training

**For Developers:**
• Input validation: Never trust user input
• Parameterized queries: Prevent SQL injection
• OWASP Top 10: Common web vulnerabilities
• Secure coding practices
• Code review for security
• Dependency scanning
• Penetration testing
• Bug bounty programs

**Privacy:**
• Data minimization: Collect only what's needed
• GDPR: European data protection regulation
• CCPA: California privacy law
• Right to be forgotten
• Cookie consent
• Privacy by design
• Data breach notification requirements`
  },
];

ALL_KNOWLEDGE.push(...CYBERSECURITY_KNOWLEDGE);

// =============================================================================
// SOCIOLOGY AND CULTURE
// =============================================================================

export const SOCIOLOGY_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Sociology Fundamentals',
    category: 'social science',
    keywords: ['sociology', 'society', 'culture', 'social', 'class', 'inequality', 'community'],
    content: `Sociology studies human society, social behavior, and social structures.

**Core Concepts:**

**Social Stratification:**
• Class system: Upper, middle, lower
• Social mobility: Moving between classes
• Wealth vs income inequality
• Education as social elevator
• Intersectionality: Race, gender, class overlap
• Meritocracy: Ideal vs reality

**Culture:**
• Material culture: Physical objects (technology, art)
• Non-material culture: Ideas, values, norms
• Cultural norms: Expected behaviors
• Folkways: Casual norms (manners)
• Mores: Serious norms (laws, taboos)
• Ethnocentrism: Judging others by own culture
• Cultural relativism: Understanding in context
• Subcultures and countercultures

**Socialization:**
• Process of learning social norms
• Primary: Family (most influential)
• Secondary: School, peers, media
• Agents of socialization
• Nature vs nurture debate
• Gender socialization
• Media influence on behavior

**Social Institutions:**
• Family: Basic social unit
• Education: Knowledge transmission
• Religion: Meaning and community
• Government: Order and governance
• Economy: Production and distribution
• Healthcare: Physical and mental well-being
• Media: Information and entertainment

**Social Change:**
• Technology as driver
• Social movements: Organized collective action
• Globalization: Cultural exchange
• Urbanization: Rural to urban migration
• Demographic transitions
• Digital revolution: New social dynamics

**Key Thinkers:**
• Karl Marx: Class conflict, capitalism critique
• Émile Durkheim: Social solidarity, anomie
• Max Weber: Bureaucracy, Protestant ethic
• W.E.B. Du Bois: Race and double consciousness
• Erving Goffman: Dramaturgy, presentation of self
• Pierre Bourdieu: Cultural capital
• Michel Foucault: Power and knowledge

**Modern Issues:**
• Social media's impact on society
• Political polarization
• Immigration and multiculturalism
• Gender equality progress
• Racial justice movements
• Digital divide
• Loneliness epidemic
• Changing family structures`
  },
];

ALL_KNOWLEDGE.push(...SOCIOLOGY_KNOWLEDGE);

// =============================================================================
// LOGIC AND PUZZLES
// =============================================================================

export const LOGIC_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Logic and Problem Solving',
    category: 'mathematics',
    keywords: ['logic', 'puzzle', 'riddle', 'problem solving', 'brain teaser', 'reasoning'],
    content: `Logic is the study of valid reasoning and argumentation.

**Formal Logic:**

**Propositional Logic:**
• Statements that are true or false
• AND (∧): Both must be true
• OR (∨): At least one must be true
• NOT (¬): Negation
• IF...THEN (→): Implication
• IF AND ONLY IF (↔): Biconditional
• Truth tables: All possible combinations

**Predicate Logic:**
• Extends propositional logic
• Quantifiers: For all (∀), There exists (∃)
• Variables and predicates
• More expressive than propositional

**Common Logical Patterns:**
• Modus ponens: If P then Q; P; therefore Q
• Modus tollens: If P then Q; not Q; therefore not P
• Disjunctive syllogism: P or Q; not P; therefore Q
• Hypothetical syllogism: If P then Q; if Q then R; therefore if P then R
• Contrapositive: If P then Q ≡ If not Q then not P

**Problem-Solving Strategies:**
• Break problem into smaller parts
• Work backwards from the goal
• Look for patterns
• Draw diagrams or tables
• Consider extreme cases
• Eliminate impossible options
• Use analogies to similar problems
• Trial and error systematically

**Famous Logic Puzzles:**
• **Monty Hall Problem:**
  - Three doors: One prize, two goats
  - You pick a door, host opens another (goat)
  - Should you switch? Yes! (2/3 chance)
  - Counterintuitive but mathematically proven

• **Prisoner's Dilemma:**
  - Two prisoners can cooperate or betray
  - Best individual outcome: Betray while other cooperates
  - Best collective outcome: Both cooperate
  - Foundation of game theory

• **Tower of Hanoi:**
  - Move disks from one peg to another
  - Only move one disk at a time
  - Never place larger on smaller
  - Minimum moves: 2^n - 1

• **Knights and Knaves:**
  - Knights always tell truth
  - Knaves always lie
  - Determine who is who from statements

• **River Crossing Puzzles:**
  - Transport items across river
  - Constraints on what can be together
  - Classic: Farmer, fox, chicken, grain

**Mathematical Thinking:**
• Proof by contradiction: Assume opposite, find contradiction
• Proof by induction: Base case + inductive step
• Pigeonhole principle: More items than containers
• Combinatorics: Counting arrangements
• Graph theory: Networks and connections
• Game theory: Strategic decision-making`
  },
];

ALL_KNOWLEDGE.push(...LOGIC_KNOWLEDGE);

// =============================================================================
// WEATHER AND METEOROLOGY
// =============================================================================

export const WEATHER_DEEP: KnowledgeEntry[] = [
  {
    topic: 'Weather and Meteorology',
    category: 'science',
    keywords: ['weather', 'climate', 'storm', 'hurricane', 'tornado', 'rain', 'forecast'],
    content: `Meteorology studies atmospheric phenomena and weather prediction.

**Atmospheric Layers:**
• Troposphere (0-12 km): Where weather occurs
• Stratosphere (12-50 km): Ozone layer
• Mesosphere (50-80 km): Meteors burn up
• Thermosphere (80-700 km): Aurora, ISS orbits
• Exosphere (700+ km): Fades into space

**Weather Fundamentals:**
• Temperature: Measured in °F or °C
• Humidity: Amount of water vapor in air
• Air pressure: Weight of atmosphere above
  - High pressure: Clear skies, calm
  - Low pressure: Clouds, precipitation
• Wind: Air moving from high to low pressure
• Fronts: Boundaries between air masses
  - Cold front: Cold air pushes warm air up
  - Warm front: Warm air slides over cold
  - Stationary front: Neither moves
  - Occluded front: Cold catches warm

**Cloud Types:**
• Cumulus: Puffy, fair weather
• Stratus: Flat, layered, overcast
• Cirrus: High, wispy, ice crystals
• Cumulonimbus: Towering, thunderstorms
• Nimbostratus: Rain-producing layers
• Altocumulus/Altostratus: Mid-level clouds
• Fog: Cloud at ground level

**Severe Weather:**

**Thunderstorms:**
• Require: Moisture, instability, lift
• Lightning: Electrical discharge
• Thunder: Sound from rapid air expansion
• Hail: Ice formed in updrafts
• Flash floods: Rapid water accumulation
• 40,000 thunderstorms daily worldwide

**Tornadoes:**
• Violently rotating column of air
• EF scale: EF0 (weak) to EF5 (incredible)
• Tornado Alley: Central US
• Supercell thunderstorms produce strongest
• Average path: 5 miles long
• Wind speeds up to 300+ mph
• Seek shelter in basement or interior room

**Hurricanes (Typhoons/Cyclones):**
• Tropical cyclones with sustained winds 74+ mph
• Form over warm ocean water (80°F+)
• Eye: Calm center
• Eyewall: Strongest winds
• Saffir-Simpson scale: Category 1-5
• Storm surge: Most dangerous aspect
• Season: June-November (Atlantic)
• Names assigned alphabetically

**Winter Weather:**
• Snow: Ice crystals, unique shapes
• Blizzard: Heavy snow + strong winds
• Ice storm: Freezing rain
• Wind chill: Feels colder than actual temp
• Nor'easter: Powerful winter storms (US East Coast)

**Weather Forecasting:**
• Satellites: View from space
• Radar: Detect precipitation
• Weather stations: Ground observations
• Computer models: Simulate atmosphere
• 7-day forecast: Reasonably accurate
• Beyond 10 days: Much less reliable
• Climate vs weather: Long-term vs short-term`
  },
];

ALL_KNOWLEDGE.push(...WEATHER_DEEP);

// =============================================================================
// PERSONAL DEVELOPMENT
// =============================================================================

export const PERSONAL_DEV: KnowledgeEntry[] = [
  {
    topic: 'Productivity and Time Management',
    category: 'self-improvement',
    keywords: ['productivity', 'time management', 'habits', 'goals', 'focus', 'efficiency'],
    content: `Productivity is about working smarter, not just harder.

**Time Management Frameworks:**

**Eisenhower Matrix:**
• Urgent + Important: Do immediately
• Important + Not Urgent: Schedule it
• Urgent + Not Important: Delegate it
• Not Urgent + Not Important: Eliminate it
• Most people spend too much time on urgent but unimportant

**Getting Things Done (GTD) - David Allen:**
• Capture: Write everything down
• Clarify: What is it? Is it actionable?
• Organize: Put in appropriate lists
• Reflect: Review regularly
• Engage: Do the work
• Weekly review is essential

**Time Blocking:**
• Assign specific tasks to specific time slots
• Protect deep work blocks
• Batch similar tasks together
• Include buffer time between blocks
• Plan the night before or morning of

**The 80/20 Principle (Pareto):**
• 80% of results come from 20% of efforts
• Identify your highest-impact activities
• Focus energy on what matters most
• Eliminate or minimize low-value tasks

**Habit Building:**
• Atomic Habits (James Clear):
  - Make it obvious (cue)
  - Make it attractive (craving)
  - Make it easy (response)
  - Make it satisfying (reward)
• Habit stacking: Link new habit to existing one
• Start incredibly small (2-minute rule)
• Track habits for accountability
• Environment design: Make good habits easy
• Identity-based habits: "I am a person who..."

**Focus and Deep Work:**
• Cal Newport's Deep Work concept
• Eliminate distractions
• Phone in another room
• Scheduled internet use
• Single-tasking > multitasking
• Flow state: 90-120 minute blocks
• Take real breaks (not social media)

**Goal Setting:**
• SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound
• Break big goals into milestones
• Write goals down (increases success)
• Review goals regularly
• Process goals vs outcome goals
• Accountability partner or group
• Celebrate progress along the way

**Energy Management:**
• Manage energy, not just time
• Physical: Sleep, exercise, nutrition
• Emotional: Positive relationships, gratitude
• Mental: Focus, learning, creativity
• Spiritual: Purpose, values, meaning
• Identify your peak energy hours
• Match important work to peak energy`
  },
  {
    topic: 'Public Speaking and Presentation',
    category: 'self-improvement',
    keywords: ['public speaking', 'presentation', 'speech', 'confidence', 'audience', 'communication'],
    content: `Public speaking is a learnable skill that improves with practice.

**Preparation:**
• Know your audience: Who are they? What do they need?
• Clear message: One main takeaway
• Structure: Opening, body (3 points), conclusion
• Research thoroughly, present selectively
• Practice out loud multiple times
• Time yourself
• Prepare for questions

**Opening Strong:**
• Start with a story or anecdote
• Ask a provocative question
• Share a surprising statistic
• Use a relevant quote
• Don't start with "Um, so, today I'm going to..."
• First 30 seconds set the tone
• Hook the audience immediately

**Delivery:**
• Eye contact: Connect with individuals
• Voice: Vary pace, volume, tone
• Pauses: Powerful for emphasis
• Gestures: Natural, purposeful
• Movement: Don't pace, but don't be a statue
• Posture: Stand tall, shoulders back
• Smile: Shows confidence and warmth

**Visual Aids:**
• Slides: Support, don't replace your talk
• Minimal text: 6 words per slide maximum
• Large fonts: Readable from back
• High-quality images
• One idea per slide
• No reading from slides
• Guy Kawasaki's 10/20/30 rule

**Managing Nervousness:**
• Preparation reduces anxiety
• Deep breathing before speaking
• Power poses: 2 minutes before
• Reframe: Excitement, not fear
• Focus on the message, not yourself
• Practice in front of friends first
• Accept imperfection
• Most nervousness isn't visible to audience

**Storytelling:**
• Stories are memorable (22x more than facts)
• Structure: Character, conflict, resolution
• Personal stories build connection
• Use specific details
• Show, don't tell
• Emotional arc
• Tie story back to your point

**Handling Q&A:**
• Repeat the question for everyone
• Pause before answering
• Be honest if you don't know
• Keep answers concise
• Bridge back to your key message
• "That's a great question" (use sparingly)
• Prepare for likely questions`
  },
  {
    topic: 'Leadership Skills',
    category: 'self-improvement',
    keywords: ['leadership', 'management', 'team', 'motivation', 'influence', 'decision making'],
    content: `Leadership is the ability to inspire and guide others toward a shared goal.

**Leadership Styles:**
• **Transformational:** Inspire and motivate change
• **Servant:** Put team's needs first
• **Democratic:** Involve team in decisions
• **Autocratic:** Make decisions alone
• **Laissez-faire:** Hands-off approach
• **Situational:** Adapt style to context
• Best leaders use multiple styles

**Core Leadership Skills:**

**Vision:**
• See the big picture
• Communicate a compelling future
• Align team around shared goals
• Think strategically
• Anticipate challenges

**Communication:**
• Listen more than you speak
• Be clear and direct
• Give and receive feedback
• Transparent about decisions
• Adapt message to audience

**Decision Making:**
• Gather relevant information
• Consider multiple perspectives
• Weigh risks and benefits
• Make timely decisions
• Own your decisions (good and bad)
• Learn from mistakes

**Emotional Intelligence:**
• Self-awareness: Know your strengths and weaknesses
• Empathy: Understand team members' perspectives
• Self-regulation: Stay calm under pressure
• Social skills: Build relationships
• Motivation: Drive and optimism

**Building Teams:**
• Hire for culture fit and potential
• Diverse teams perform better
• Clear roles and expectations
• Psychological safety: Safe to take risks
• Celebrate wins together
• Address conflicts early
• Develop team members' skills

**Delegation:**
• Assign tasks based on strengths
• Provide context, not just instructions
• Trust but verify
• Give authority with responsibility
• Don't micromanage
• Accept different approaches
• Use delegation as development

**Feedback:**
• Regular, not just annual reviews
• Specific and actionable
• Balance positive and constructive
• SBI model: Situation, Behavior, Impact
• Ask for feedback on your leadership
• Create a feedback culture
• Follow up on feedback given`
  },
];

ALL_KNOWLEDGE.push(...PERSONAL_DEV);

// =============================================================================
// MATHEMATICS - NUMBER THEORY AND DISCRETE MATH
// =============================================================================

export const DISCRETE_MATH: KnowledgeEntry[] = [
  {
    topic: 'Number Theory',
    category: 'mathematics',
    keywords: ['number theory', 'prime', 'integer', 'divisibility', 'modular', 'cryptography'],
    content: `Number theory studies properties of integers and their relationships.

**Prime Numbers:**
• Divisible only by 1 and itself
• First primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
• 2 is the only even prime
• Infinitely many primes (Euclid's proof)
• Prime factorization: Every integer has unique prime factors
• Fundamental Theorem of Arithmetic
• Sieve of Eratosthenes: Finding primes
• Largest known primes: Mersenne primes (2^p - 1)
• Twin primes: Differ by 2 (e.g., 11, 13)
• Goldbach's conjecture: Every even number > 2 is sum of two primes (unproven)

**Divisibility:**
• a divides b if b = a × k for some integer k
• Divisibility rules:
  - By 2: Last digit even
  - By 3: Digit sum divisible by 3
  - By 5: Ends in 0 or 5
  - By 9: Digit sum divisible by 9
  - By 11: Alternating digit sum divisible by 11
• GCD: Greatest Common Divisor
• LCM: Least Common Multiple
• Euclidean algorithm: Efficient GCD calculation

**Modular Arithmetic:**
• Clock arithmetic: 13 mod 12 = 1
• a ≡ b (mod n) means n divides (a - b)
• Addition and multiplication work normally
• Used in: Cryptography, computer science
• Fermat's Little Theorem: a^p ≡ a (mod p) for prime p
• Chinese Remainder Theorem

**Applications in Cryptography:**
• RSA encryption: Based on prime factorization difficulty
• Public key: Product of two large primes
• Private key: Related to prime factors
• Factoring large numbers is computationally hard
• Secures internet communications (HTTPS)
• Modular exponentiation
• Diffie-Hellman key exchange

**Famous Problems:**
• Riemann Hypothesis: Distribution of primes (unsolved, $1M prize)
• Fermat's Last Theorem: Proved by Andrew Wiles (1995)
• Collatz Conjecture: Simple to state, unsolved
• P vs NP: Computational complexity (unsolved, $1M prize)
• Perfect numbers: Equal to sum of proper divisors (6, 28, 496)`
  },
  {
    topic: 'Set Theory and Combinatorics',
    category: 'mathematics',
    keywords: ['set theory', 'combinatorics', 'permutation', 'combination', 'counting', 'probability'],
    content: `Set theory and combinatorics are foundational areas of discrete mathematics.

**Set Theory:**
• Set: Collection of distinct objects
• Notation: {1, 2, 3} or {x | x > 0}
• Empty set: ∅ or {}
• Subset: A ⊆ B (all elements of A are in B)
• Union: A ∪ B (elements in A or B)
• Intersection: A ∩ B (elements in both A and B)
• Complement: A' (elements not in A)
• Difference: A - B (elements in A but not B)
• Cardinality: |A| = number of elements
• Power set: Set of all subsets (2^n elements)
• Venn diagrams: Visual representation

**Counting Principles:**
• Addition principle: If A or B, then |A| + |B| (if disjoint)
• Multiplication principle: If A then B, then |A| × |B|
• Inclusion-exclusion: |A ∪ B| = |A| + |B| - |A ∩ B|

**Permutations:**
• Ordered arrangements
• n! = n × (n-1) × ... × 1
• P(n, r) = n! / (n-r)!
• Example: Arranging 3 books from 5 = 5!/(5-3)! = 60
• With repetition: n^r

**Combinations:**
• Unordered selections
• C(n, r) = n! / (r! × (n-r)!)
• Also written as "n choose r" or (n r)
• Example: Choosing 3 from 5 = 10
• Pascal's Triangle: Visual pattern of combinations
• Binomial theorem: (a+b)^n expansion

**Graph Theory:**
• Vertices (nodes) and edges (connections)
• Degree: Number of edges at a vertex
• Path: Sequence of connected vertices
• Cycle: Path that returns to start
• Connected graph: Path between any two vertices
• Tree: Connected graph with no cycles
• Euler path: Visit every edge once
• Hamiltonian path: Visit every vertex once
• Planar graph: Can draw without crossing edges
• Graph coloring: Minimum colors so no adjacent same color
• Applications: Networks, scheduling, maps, social media

**Boolean Algebra:**
• AND, OR, NOT operations
• Truth tables
• De Morgan's laws: NOT(A AND B) = (NOT A) OR (NOT B)
• Foundation of digital circuits
• Used in database queries
• Search engine logic`
  },
];

ALL_KNOWLEDGE.push(...DISCRETE_MATH);

// =============================================================================
// ROBOTICS AND AUTOMATION
// =============================================================================

export const ROBOTICS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Robotics Fundamentals',
    category: 'technology',
    keywords: ['robot', 'robotics', 'automation', 'actuator', 'sensor', 'autonomous'],
    content: `Robotics combines engineering, computer science, and AI to create machines that interact with the physical world.

**Types of Robots:**

**Industrial Robots:**
• Manufacturing assembly lines
• Welding, painting, packaging
• Highly precise and repeatable
• Articulated arms (6+ degrees of freedom)
• SCARA robots: Fast pick-and-place
• Collaborative robots (cobots): Work alongside humans
• Companies: FANUC, ABB, KUKA, Universal Robots

**Service Robots:**
• Vacuum robots (Roomba)
• Delivery robots
• Healthcare: Surgical robots (da Vinci)
• Agriculture: Harvesting, monitoring
• Hospitality: Hotel service robots
• Retail: Inventory management
• Growing market rapidly

**Mobile Robots:**
• Wheeled: Simple, efficient on flat surfaces
• Legged: Navigate rough terrain (Boston Dynamics Spot)
• Tracked: Tanks, bomb disposal
• Aerial: Drones (quadcopters, fixed-wing)
• Underwater: ROVs, AUVs
• Space: Mars rovers (Curiosity, Perseverance)

**Humanoid Robots:**
• Human-like form
• Honda ASIMO (retired)
• Boston Dynamics Atlas
• Tesla Optimus
• Sophia by Hanson Robotics
• Challenges: Balance, dexterity, energy

**Key Components:**

**Sensors:**
• Camera/vision: See the environment
• LIDAR: 3D mapping with laser
• Ultrasonic: Distance measurement
• IMU: Orientation and acceleration
• Force/torque: Detect contact
• Encoders: Measure joint angles
• GPS: Outdoor positioning

**Actuators:**
• Electric motors: Most common
• Servo motors: Precise position control
• Stepper motors: Discrete steps
• Hydraulic: High force (heavy machinery)
• Pneumatic: Air-powered, fast
• Soft actuators: Flexible, safe

**Control Systems:**
• PID control: Proportional-Integral-Derivative
• Feedback loops: Sense-plan-act
• Path planning: Navigate obstacles
• SLAM: Simultaneous Localization and Mapping
• Computer vision: Object recognition
• Machine learning: Adaptive behavior

**Programming:**
• ROS (Robot Operating System): Standard framework
• Python and C++: Primary languages
• Simulation: Gazebo, Isaac Sim
• Motion planning libraries
• Sensor fusion algorithms

**Future of Robotics:**
• AI-powered autonomy
• Human-robot collaboration
• Soft robotics: Flexible, safe materials
• Swarm robotics: Coordinated groups
• Nano-robots: Medical applications
• Ethical considerations: Job displacement, safety
• Regulation and standards evolving`
  },
];

ALL_KNOWLEDGE.push(...ROBOTICS_KNOWLEDGE);

// =============================================================================
// ANCIENT AND MEDIEVAL HISTORY EXTENDED
// =============================================================================

export const MEDIEVAL_HISTORY: KnowledgeEntry[] = [
  {
    topic: 'Medieval Europe',
    category: 'history',
    keywords: ['medieval', 'middle ages', 'knight', 'castle', 'feudalism', 'crusade', 'plague'],
    content: `The Medieval period (500-1500 CE) shaped European civilization.

**Feudalism:**
• Social hierarchy: King → Lords → Knights → Peasants
• Land-based economy
• Vassals swore loyalty to lords
• Serfs: Bound to the land
• Manor system: Self-sufficient estates
• Feudal obligations: Military service, taxes
• Gradually declined with rise of towns and trade

**The Church:**
• Catholic Church: Most powerful institution
• Pope: Head of the Church, political power
• Monasteries: Centers of learning and preservation
• Cathedrals: Gothic architecture masterpieces
• Tithes: 10% tax to the Church
• Excommunication: Powerful political tool
• Inquisition: Enforcement of orthodoxy

**The Crusades (1095-1291):**
• Military campaigns to reclaim Holy Land
• First Crusade (1096-1099): Captured Jerusalem
• Eight major Crusades total
• Cultural exchange between East and West
• Increased trade and knowledge transfer
• Military orders: Templars, Hospitallers
• Ultimately failed to hold territory
• Lasting impact on Christian-Muslim relations

**The Black Death (1347-1353):**
• Bubonic plague killed 30-60% of Europe's population
• Spread via fleas on rats
• Originated in Central Asia
• Social upheaval: Labor shortages
• Peasant revolts: Demanded better conditions
• Weakened feudal system
• Changed art and culture (memento mori)
• Took 200+ years for population to recover

**Knights and Warfare:**
• Chivalric code: Honor, courage, courtesy
• Armor evolution: Chain mail to plate armor
• Castles: Defensive fortifications
  - Motte and bailey → Stone keeps → Concentric
• Siege warfare: Trebuchets, battering rams
• Longbow: Changed warfare (Agincourt, 1415)
• Gunpowder: Eventually made knights obsolete

**Culture and Learning:**
• Universities founded: Oxford (1096), Paris (1150), Bologna (1088)
• Scholasticism: Thomas Aquinas
• Illuminated manuscripts
• Troubadours: Poetry and song
• Arthurian legends
• Magna Carta (1215): Limited royal power
• Printing press (1440): End of medieval era

**Viking Age (793-1066):**
• Norse seafarers from Scandinavia
• Raided and traded across Europe
• Reached North America (Vinland, ~1000 CE)
• Founded settlements: Normandy, Dublin, Kiev
• Longships: Advanced naval technology
• Norse mythology: Odin, Thor, Valhalla
• Norman Conquest of England (1066)

**Byzantine Empire:**
• Eastern Roman Empire
• Capital: Constantinople (Istanbul)
• Preserved Greek and Roman knowledge
• Hagia Sophia: Architectural marvel
• Justinian's Code: Legal foundation
• Fell to Ottoman Turks (1453)
• Bridge between ancient and modern worlds`
  },
  {
    topic: 'The Renaissance',
    category: 'history',
    keywords: ['renaissance', 'art', 'science', 'humanism', 'da vinci', 'michelangelo', 'reformation'],
    content: `The Renaissance (14th-17th century) was a cultural rebirth in Europe.

**Origins:**
• Started in Italian city-states (Florence, Venice, Rome)
• Rediscovery of classical Greek and Roman texts
• Wealthy patrons: Medici family
• Trade wealth funded art and learning
• Humanism: Focus on human potential
• Shift from purely religious to secular thinking

**Art:**
• Leonardo da Vinci: Mona Lisa, Last Supper, inventor
• Michelangelo: Sistine Chapel ceiling, David sculpture
• Raphael: School of Athens
• Botticelli: Birth of Venus
• Titian: Venetian color master
• Perspective: Mathematical depth in painting
• Oil painting techniques advanced
• Realism and human anatomy in art

**Science and Innovation:**
• Scientific method emerging
• Copernicus: Heliocentric model (Sun-centered)
• Galileo: Telescope, confirmed heliocentrism
• Kepler: Laws of planetary motion
• Vesalius: Human anatomy
• Gutenberg: Printing press (1440)
  - Books became affordable
  - Literacy spread rapidly
  - Ideas traveled faster
• Leonardo's inventions: Flying machines, tanks, bridges

**Literature:**
• Dante: Divine Comedy
• Petrarch: Father of Humanism
• Boccaccio: Decameron
• Machiavelli: The Prince (political realism)
• Shakespeare: Greatest English writer
• Cervantes: Don Quixote
• Vernacular languages replaced Latin in literature

**The Reformation (1517):**
• Martin Luther: 95 Theses, challenged Catholic Church
• Criticized indulgences (paying for forgiveness)
• Protestant denominations formed
• Counter-Reformation: Catholic response
• Council of Trent: Catholic reforms
• Religious wars across Europe
• Permanent split in Western Christianity

**Exploration:**
• Age of Discovery (15th-17th century)
• Columbus: Americas (1492)
• Vasco da Gama: Sea route to India (1498)
• Magellan: First circumnavigation (1519-1522)
• Motivated by: Trade, religion, glory
• Columbian Exchange: Plants, animals, diseases
• Colonialism began
• Devastating impact on indigenous peoples

**Legacy:**
• Foundation of modern science
• Artistic techniques still used today
• Humanism influenced democracy
• Printing revolution → information age
• Religious pluralism
• Global exploration and exchange
• Transition from medieval to modern world`
  },
];

ALL_KNOWLEDGE.push(...MEDIEVAL_HISTORY);

// =============================================================================
// QUANTUM COMPUTING
// =============================================================================

export const QUANTUM_COMPUTING: KnowledgeEntry[] = [
  {
    topic: 'Quantum Computing',
    category: 'technology',
    keywords: ['quantum computing', 'qubit', 'superposition', 'entanglement', 'quantum'],
    content: `Quantum computing uses quantum mechanics to process information fundamentally differently.

**Classical vs Quantum:**
• Classical bit: 0 or 1
• Qubit: 0, 1, or superposition of both
• n qubits can represent 2^n states simultaneously
• Exponential advantage for certain problems
• Not faster for all tasks
• Complementary to classical computing

**Key Principles:**

**Superposition:**
• Qubit exists in multiple states at once
• Collapses to definite state when measured
• Enables parallel computation
• Like a coin spinning in the air (both heads and tails)

**Entanglement:**
• Two qubits become correlated
• Measuring one instantly affects the other
• "Spooky action at a distance" (Einstein)
• Enables quantum teleportation
• Key resource for quantum algorithms

**Interference:**
• Quantum states can amplify or cancel
• Used to increase probability of correct answers
• Decrease probability of wrong answers
• Core of quantum algorithm design

**Quantum Gates:**
• Hadamard (H): Creates superposition
• CNOT: Entangles two qubits
• Pauli-X, Y, Z: Rotations
• Toffoli: Universal classical gate
• Quantum circuits: Sequences of gates

**Applications:**
• **Cryptography:** Shor's algorithm can break RSA
• **Drug discovery:** Simulate molecular interactions
• **Optimization:** Supply chain, logistics
• **Machine learning:** Quantum speedups
• **Materials science:** Design new materials
• **Financial modeling:** Risk analysis
• **Climate modeling:** Complex simulations

**Current State:**
• NISQ era: Noisy Intermediate-Scale Quantum
• Major players: IBM, Google, Microsoft, IonQ
• Google's quantum supremacy claim (2019)
• IBM Quantum: Cloud access to quantum computers
• Error correction: Major challenge
• Decoherence: Qubits lose quantum properties
• Cryogenic cooling: Near absolute zero required
• Topological qubits: Microsoft's approach

**Quantum-Safe Cryptography:**
• Current encryption vulnerable to quantum computers
• Post-quantum cryptography: New algorithms
• NIST standardizing quantum-resistant algorithms
• Lattice-based, hash-based, code-based approaches
• Transition needed before large quantum computers exist

**Timeline:**
• Current: 100-1000+ qubits (noisy)
• Near-term: Error-corrected logical qubits
• Medium-term: Practical quantum advantage
• Long-term: Large-scale fault-tolerant quantum computers
• Full timeline uncertain: 10-30+ years for many applications`
  },
];

ALL_KNOWLEDGE.push(...QUANTUM_COMPUTING);

// =============================================================================
// ETHICS AND MORAL PHILOSOPHY
// =============================================================================

export const ETHICS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Applied Ethics',
    category: 'philosophy',
    keywords: ['ethics', 'moral', 'bioethics', 'technology ethics', 'environmental ethics'],
    content: `Applied ethics addresses moral questions in specific real-world domains.

**Bioethics:**
• Euthanasia and assisted dying debates
• Organ donation and allocation
• Genetic engineering ethics (designer babies)
• Stem cell research
• Clinical trial ethics (informed consent)
• End-of-life care decisions
• Reproductive rights and technologies
• Patient autonomy vs medical paternalism
• Animal testing in medical research

**Technology Ethics:**
• AI bias and fairness
• Privacy in the digital age
• Surveillance and civil liberties
• Social media and mental health
• Autonomous weapons (killer robots)
• Digital divide and access inequality
• Algorithmic decision-making transparency
• Data ownership and consent
• Right to be forgotten
• Deepfakes and misinformation

**Environmental Ethics:**
• Climate justice: Who bears the burden?
• Rights of future generations
• Animal rights vs animal welfare
• Conservation vs development
• Environmental racism
• Sustainability obligations
• Tragedy of the commons
• Carbon footprint responsibility
• Biodiversity preservation duty

**Business Ethics:**
• Corporate social responsibility (CSR)
• Whistleblowing: Duty to report wrongdoing
• Fair trade and labor practices
• Executive compensation fairness
• Insider trading
• Environmental responsibility
• Supply chain ethics
• Stakeholder vs shareholder theory
• Greenwashing: False environmental claims

**Media Ethics:**
• Truthfulness and accuracy
• Objectivity vs advocacy
• Privacy of public figures
• Sensationalism and clickbait
• Source protection
• Conflict of interest disclosure
• Representation and diversity
• Misinformation responsibility

**Ethical Frameworks Applied:**
• Utilitarianism: What produces the most good?
• Deontology: What is our duty regardless of outcome?
• Virtue ethics: What would a virtuous person do?
• Care ethics: What preserves relationships?
• Justice: What is fair to all parties?
• Rights-based: What respects individual rights?
• No single framework provides all answers
• Ethical reasoning requires weighing multiple perspectives`
  },
];

ALL_KNOWLEDGE.push(...ETHICS_KNOWLEDGE);

// Update total knowledge entries count
export const TOTAL_KNOWLEDGE_ENTRIES = ALL_KNOWLEDGE.length;
