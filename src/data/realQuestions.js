// Comprehensive Question Bank for NEET/JEE
// Mapped with Class (11/12), Subject, and Chapter

export const chaptersList = {
    Physics: {
        "Class 11": [
            "Physical World", "Units and Measurements", "Motion in a Straight Line",
            "Motion in a Plane", "Laws of Motion", "Work, Energy and Power",
            "System of Particles and Rotational Motion", "Gravitation",
            "Mechanical Properties of Solids", "Mechanical Properties of Fluids",
            "Thermal Properties of Matter", "Thermodynamics", "Kinetic Theory",
            "Oscillations", "Waves"
        ],
        "Class 12": [
            "Electric Charges and Fields", "Electrostatic Potential and Capacitance",
            "Current Electricity", "Moving Charges and Magnetism",
            "Magnetism and Matter", "Electromagnetic Induction",
            "Alternating Current", "Electromagnetic Waves", "Ray Optics and Optical Instruments",
            "Wave Optics", "Dual Nature of Radiation and Matter", "Atoms",
            "Nuclei", "Semiconductor Electronics"
        ]
    },
    Chemistry: {
        "Class 11": [
            "Some Basic Concepts of Chemistry", "Structure of Atom",
            "Classification of Elements and Periodicity", "Chemical Bonding and Molecular Structure",
            "States of Matter", "Thermodynamics", "Equilibrium", "Redox Reactions",
            "Hydrogen", "s-Block Elements", "p-Block Elements", "Organic Chemistry - Some Basic Principles",
            "Hydrocarbons", "Environmental Chemistry"
        ],
        "Class 12": [
            "The Solid State", "Solutions", "Electrochemistry", "Chemical Kinetics",
            "Surface Chemistry", "General Principles of Isolation of Elements",
            "p-Block Elements", "d and f Block Elements", "Coordination Compounds",
            "Haloalkanes and Haloarenes", "Alcohols, Phenols and Ethers",
            "Aldehydes, Ketones and Carboxylic Acids", "Amines", "Biomolecules",
            "Polymers", "Chemistry in Everyday Life"
        ]
    },
    Biology: {
        "Class 11": [
            "The Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom",
            "Morphology of Flowering Plants", "Anatomy of Flowering Plants",
            "Structural Organisation in Animals", "Cell: The Unit of Life",
            "Biomolecules", "Cell Cycle and Cell Division", "Transport in Plants",
            "Mineral Nutrition", "Photosynthesis in Higher Plants",
            "Respiration in Plants", "Plant Growth and Development",
            "Digestion and Absorption", "Breathing and Exchange of Gases",
            "Body Fluids and Circulation", "Excretory Products and their Elimination",
            "Locomotion and Movement", "Neural Control and Coordination",
            "Chemical Coordination and Integration"
        ],
        "Class 12": [
            "Reproduction in Organisms", "Sexual Reproduction in Flowering Plants",
            "Human Reproduction", "Reproductive Health",
            "Principles of Inheritance and Variation", "Molecular Basis of Inheritance",
            "Evolution", "Human Health and Disease", "Strategies for Enhancement in Food Production",
            "Microbes in Human Welfare", "Biotechnology: Principles and Processes",
            "Biotechnology and its Applications", "Organisms and Populations",
            "Ecosystem", "Biodiversity and Conservation", "Environmental Issues"
        ]
    },
    Mathematics: {
        "Class 11": [
            "Sets", "Relations and Functions", "Trigonometric Functions",
            "Principle of Mathematical Induction", "Complex Numbers and Quadratic Equations",
            "Linear Inequalities", "Permutations and Combinations", "Binomial Theorem",
            "Sequence and Series", "Straight Lines", "Conic Sections",
            "Introduction to Three Dimensional Geometry", "Limits and Derivatives",
            "Mathematical Reasoning", "Statistics", "Probability"
        ],
        "Class 12": [
            "Relations and Functions", "Inverse Trigonometric Functions", "Matrices",
            "Determinants", "Continuity and Differentiability", "Application of Derivatives",
            "Integrals", "Application of Integrals", "Differential Equations",
            "Vector Algebra", "Three Dimensional Geometry", "Linear Programming", "Probability"
        ]
    }
};

export const realQuestions = [
    // --- PHYSICS (Class 11) ---
    {
        id: 'phy_11_001',
        subject: 'Physics',
        class: 'Class 11',
        chapter: 'Motion in a Plane',
        question: 'A particle is projected with a velocity v at an angle θ with the horizontal. The time of flight is given by:',
        options: [
            { id: 'A', text: '2v sinθ / g' },
            { id: 'B', text: 'v sinθ / g' },
            { id: 'C', text: '2v cosθ / g' },
            { id: 'D', text: 'v² sin2θ / g' }
        ],
        correctAnswer: 'A',
        explanation: 'Time of flight T = 2uy/g = 2(v sinθ)/g.'
    },
    {
        id: 'phy_11_002',
        subject: 'Physics',
        class: 'Class 11',
        chapter: 'Thermodynamics',
        question: 'In an adiabatic process, the relationship between Pressure (P) and Temperature (T) is given by (γ = Cp/Cv):',
        options: [
            { id: 'A', text: 'P^(1-γ) T^γ = constant' },
            { id: 'B', text: 'P^(γ-1) T^γ = constant' },
            { id: 'C', text: 'P^(1-γ) T = constant' },
            { id: 'D', text: 'P T^γ = constant' }
        ],
        correctAnswer: 'A',
        explanation: 'For adiabatic process, PV^γ = K. Using PV=nRT, eliminating V gives P^(1-γ)T^γ = Constant.'
    },
    {
        id: 'phy_11_003',
        subject: 'Physics',
        class: 'Class 11',
        chapter: 'System of Particles and Rotational Motion',
        question: 'A solid sphere, a disc, and a ring of the same mass and radius are allowed to roll down an inclined plane from the same height. Which one reaches the bottom first?',
        options: [
            { id: 'A', text: 'Solid Sphere' },
            { id: 'B', text: 'Disc' },
            { id: 'C', text: 'Ring' },
            { id: 'D', text: 'All reach at the same time' }
        ],
        correctAnswer: 'A',
        explanation: 'Acceleration a = gsinθ / (1 + I/MR²). I is smallest for solid sphere (2/5 MR²), so a is largest.'
    },
    {
        id: 'phy_11_004',
        subject: 'Physics',
        class: 'Class 11',
        chapter: 'Mechanical Properties of Fluids',
        question: 'Bernoulli’s theorem is a consequence of conservation of:',
        options: [
            { id: 'A', text: 'Mass' },
            { id: 'B', text: 'Momentum' },
            { id: 'C', text: 'Energy' },
            { id: 'D', text: 'Angular Momentum' }
        ],
        correctAnswer: 'C',
        explanation: 'Bernoulli’s equation relates pressure, velocity, and height, representing energy conservation per unit volume.'
    },
    {
        id: 'phy_11_005',
        subject: 'Physics',
        class: 'Class 11',
        chapter: 'Units and Measurements',
        question: 'Which of the following pairs has the same dimensions?',
        options: [
            { id: 'A', text: 'Impulse and Momentum' },
            { id: 'B', text: 'Work and Power' },
            { id: 'C', text: 'Force and Torque' },
            { id: 'D', text: 'Pressure and Force' }
        ],
        correctAnswer: 'A',
        explanation: 'Impulse = Force × time = [MLT⁻²][T] = [MLT⁻¹]. Momentum = mass × velocity = [M][LT⁻¹] = [MLT⁻¹].'
    },

    // --- PHYSICS (Class 12) ---
    {
        id: 'phy_12_001',
        subject: 'Physics',
        class: 'Class 12',
        chapter: 'Electric Charges and Fields',
        question: 'Two point charges +q and -2q are placed at a distance d apart. Where should a third charge +Q be placed so that the system is in equilibrium?',
        options: [
            { id: 'A', text: 'At a distance d from +q' },
            { id: 'B', text: 'At a distance d/(√2 - 1) from +q' },
            { id: 'C', text: 'At a distance d/(√2 + 1) from +q' },
            { id: 'D', text: 'Between the charges' }
        ],
        correctAnswer: 'B',
        explanation: 'For equilibrium, the net force on Q must be zero. Since charges have opposite signs, the null point lies outside the charges, closer to the smaller magnitude charge.'
    },
    {
        id: 'phy_12_002',
        subject: 'Physics',
        class: 'Class 12',
        chapter: 'Ray Optics and Optical Instruments',
        question: 'A convex lens of focal length 20 cm is placed in contact with a concave lens of focal length 40 cm. The power of the combination is:',
        options: [
            { id: 'A', text: '+2.5 D' },
            { id: 'B', text: '-2.5 D' },
            { id: 'C', text: '+5.0 D' },
            { id: 'D', text: '+1.5 D' }
        ],
        correctAnswer: 'A',
        explanation: 'P = P1 + P2. P1 = 100/20 = +5D. P2 = 100/-40 = -2.5D. P_net = 5 - 2.5 = +2.5D.'
    },
    {
        id: 'phy_12_003',
        subject: 'Physics',
        class: 'Class 12',
        chapter: 'Dual Nature of Radiation and Matter',
        question: 'The de Broglie wavelength of an electron accelerated through a potential difference of V volts is approximately:',
        options: [
            { id: 'A', text: '12.27 / √V Å' },
            { id: 'B', text: '1.227 / √V nm' },
            { id: 'C', text: 'Both A and B' },
            { id: 'D', text: '12.27 √V Å' }
        ],
        correctAnswer: 'C',
        explanation: 'λ = h/p = h/√(2meV). Substitute values to get 12.27/√V Å or 1.227/√V nm.'
    },
    {
        id: 'phy_12_004',
        subject: 'Physics',
        class: 'Class 12',
        chapter: 'Alternating Current',
        question: 'In a purely inductive circuit, the current:',
        options: [
            { id: 'A', text: 'Leads voltage by 90°' },
            { id: 'B', text: 'Lags voltage by 90°' },
            { id: 'C', text: 'Is in phase with voltage' },
            { id: 'D', text: 'Lags voltage by 45°' }
        ],
        correctAnswer: 'B',
        explanation: 'In an inductor, current lags behind the voltage by π/2 (90°).'
    },

    // --- CHEMISTRY (Class 11) ---
    {
        id: 'chem_11_001',
        subject: 'Chemistry',
        class: 'Class 11',
        chapter: 'Structure of Atom',
        question: 'Which of the following sets of quantum numbers is NOT possible?',
        options: [
            { id: 'A', text: 'n=3, l=2, m=-2, s=+1/2' },
            { id: 'B', text: 'n=4, l=0, m=0, s=-1/2' },
            { id: 'C', text: 'n=3, l=3, m=-3, s=+1/2' },
            { id: 'D', text: 'n=5, l=3, m=0, s=-1/2' }
        ],
        correctAnswer: 'C',
        explanation: 'The value of azimuthal quantum number (l) varies from 0 to n-1. So, for n=3, l cannot be 3.'
    },
    {
        id: 'chem_11_002',
        subject: 'Chemistry',
        class: 'Class 11',
        chapter: 'Thermodynamics',
        question: 'For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH is equal to:',
        options: [
            { id: 'A', text: 'ΔU - 2RT' },
            { id: 'B', text: 'ΔU + 2RT' },
            { id: 'C', text: 'ΔU + RT' },
            { id: 'D', text: 'ΔU' }
        ],
        correctAnswer: 'A',
        explanation: 'ΔH = ΔU + ΔngRT. Here Δng = 2 - (1+3) = -2. So ΔH = ΔU - 2RT.'
    },
    {
        id: 'chem_11_003',
        subject: 'Chemistry',
        class: 'Class 11',
        chapter: 'Chemical Bonding and Molecular Structure',
        question: 'Which of the following molecules has a trigonal bipyramidal geometry?',
        options: [
            { id: 'A', text: 'PCl₅' },
            { id: 'B', text: 'SF₆' },
            { id: 'C', text: 'CH₄' },
            { id: 'D', text: 'BF₃' }
        ],
        correctAnswer: 'A',
        explanation: 'PCl₅ has sp³d hybridization, resulting in Trigonal Bipyramidal geometry.'
    },
    {
        id: 'chem_11_004',
        subject: 'Chemistry',
        class: 'Class 11',
        chapter: 'Equilibrium',
        question: 'pH of a 10⁻⁸ M HCl solution is approximately:',
        options: [
            { id: 'A', text: '8' },
            { id: 'B', text: '7' },
            { id: 'C', text: 'Between 6 and 7' },
            { id: 'D', text: 'Between 7 and 8' }
        ],
        correctAnswer: 'C',
        explanation: 'Contribution of H+ from water (10⁻⁷ M) cannot be neglected. Total [H+] ≈ 1.1 × 10⁻⁷. pH ≈ 6.96.'
    },

    // --- CHEMISTRY (Class 12) ---
    {
        id: 'chem_12_001',
        subject: 'Chemistry',
        class: 'Class 12',
        chapter: 'Haloalkanes and Haloarenes',
        question: 'The major product formed when 2-bromobutane is treated with alcoholic KOH is:',
        options: [
            { id: 'A', text: '1-butene' },
            { id: 'B', text: '2-butene' },
            { id: 'C', text: 'butan-2-ol' },
            { id: 'D', text: 'butan-1-ol' }
        ],
        correctAnswer: 'B',
        explanation: 'According to Saytzeff rule, the more substituted alkene is the major product. 2-butene is more substituted than 1-butene.'
    },
    {
        id: 'chem_12_002',
        subject: 'Chemistry',
        class: 'Class 12',
        chapter: 'Solutions',
        question: 'Which of the following is a colligative property?',
        options: [
            { id: 'A', text: 'Surface Tension' },
            { id: 'B', text: 'Viscosity' },
            { id: 'C', text: 'Osmotic Pressure' },
            { id: 'D', text: 'Refractive Index' }
        ],
        correctAnswer: 'C',
        explanation: 'Colligative properties depend only on the number of solute particles. Osmotic pressure is one of them.'
    },
    {
        id: 'chem_12_003',
        subject: 'Chemistry',
        class: 'Class 12',
        chapter: 'Electrochemistry',
        question: 'The standard reduction potential of Zn is -0.76V and Cu is +0.34V. The EMF of the cell Zn|Zn²⁺||Cu²⁺|Cu is:',
        options: [
            { id: 'A', text: '1.10 V' },
            { id: 'B', text: '-0.42 V' },
            { id: 'C', text: '-1.10 V' },
            { id: 'D', text: '0.42 V' }
        ],
        correctAnswer: 'A',
        explanation: 'E°cell = E°cathode - E°anode = 0.34 - (-0.76) = 1.10 V.'
    },
    {
        id: 'chem_12_004',
        subject: 'Chemistry',
        class: 'Class 12',
        chapter: 'Coordination Compounds',
        question: 'The oxidation state of Ni in [Ni(CO)₄] is:',
        options: [
            { id: 'A', text: '+2' },
            { id: 'B', text: '0' },
            { id: 'C', text: '+4' },
            { id: 'D', text: '-2' }
        ],
        correctAnswer: 'B',
        explanation: 'CO is a neutral ligand. Since the complex is neutral, the oxidation state of Ni is 0.'
    },

    // --- BIOLOGY (Class 11) ---
    {
        id: 'bio_11_001',
        subject: 'Biology',
        class: 'Class 11',
        chapter: 'Cell: The Unit of Life',
        question: 'The power house of the cell is:',
        options: [
            { id: 'A', text: 'Nucleus' },
            { id: 'B', text: 'Mitochondria' },
            { id: 'C', text: 'Golgi Complex' },
            { id: 'D', text: 'Ribosome' }
        ],
        correctAnswer: 'B',
        explanation: 'Mitochondria is the site of cellular respiration where ATP is produced.'
    },
    {
        id: 'bio_11_002',
        subject: 'Biology',
        class: 'Class 11',
        chapter: 'Body Fluids and Circulation',
        question: 'The universal blood donor group is:',
        options: [
            { id: 'A', text: 'A+' },
            { id: 'B', text: 'B-' },
            { id: 'C', text: 'O-' },
            { id: 'D', text: 'AB+' }
        ],
        correctAnswer: 'C',
        explanation: 'O- blood group lacks A and B antigens and Rh factor, minimizing immune reaction.'
    },
    {
        id: 'bio_11_003',
        subject: 'Biology',
        class: 'Class 11',
        chapter: 'Plant Growth and Development',
        question: 'Which of the following hormones initiates fruit ripening?',
        options: [
            { id: 'A', text: 'Auxin' },
            { id: 'B', text: 'Gibberellin' },
            { id: 'C', text: 'Ethylene' },
            { id: 'D', text: 'Cytokinin' }
        ],
        correctAnswer: 'C',
        explanation: 'Ethylene is a gaseous hormone known for promoting fruit ripening.'
    },
    {
        id: 'bio_11_004',
        subject: 'Biology',
        class: 'Class 11',
        chapter: 'Chemical Coordination and Integration',
        question: 'The largest gland in the human body is:',
        options: [
            { id: 'A', text: 'Pancreas' },
            { id: 'B', text: 'Liver' },
            { id: 'C', text: 'Thyroid' },
            { id: 'D', text: 'Pituitary' }
        ],
        correctAnswer: 'B',
        explanation: 'Liver is the largest internal organ and gland.'
    },
    {
        id: 'bio_11_005',
        subject: 'Biology',
        class: 'Class 11',
        chapter: 'Plant Kingdom',
        question: 'Which of the following is an amphibian of the plant kingdom?',
        options: [
            { id: 'A', text: 'Algae' },
            { id: 'B', text: 'Bryophytes' },
            { id: 'C', text: 'Pteridophytes' },
            { id: 'D', text: 'Gymnosperms' }
        ],
        correctAnswer: 'B',
        explanation: 'Bryophytes require water for fertilization, hence are called amphibians of the plant kingdom.'
    },

    // --- BIOLOGY (Class 12) ---
    {
        id: 'bio_12_001',
        subject: 'Biology',
        class: 'Class 12',
        chapter: 'Principles of Inheritance and Variation',
        question: 'Mendel selected which plant for his experiments?',
        options: [
            { id: 'A', text: 'Sweet Pea' },
            { id: 'B', text: 'Garden Pea' },
            { id: 'C', text: 'Chickpea' },
            { id: 'D', text: 'Pigeon Pea' }
        ],
        correctAnswer: 'B',
        explanation: 'Mendel selected Pisum sativum (Garden Pea) for his genetic experiments.'
    },
    {
        id: 'bio_12_002',
        subject: 'Biology',
        class: 'Class 12',
        chapter: 'Ecosystem',
        question: 'Which pyramid is always upright?',
        options: [
            { id: 'A', text: 'Pyramid of Biomass' },
            { id: 'B', text: 'Pyramid of Number' },
            { id: 'C', text: 'Pyramid of Energy' },
            { id: 'D', text: 'All of the above' }
        ],
        correctAnswer: 'C',
        explanation: 'Energy flow in an ecosystem is always unidirectional, from lower to higher trophic levels, with loss at each step.'
    },
    {
        id: 'bio_12_003',
        subject: 'Biology',
        class: 'Class 12',
        chapter: 'Evolution',
        question: 'Theory of Natural Selection was proposed by:',
        options: [
            { id: 'A', text: 'Lamarck' },
            { id: 'B', text: 'Darwin' },
            { id: 'C', text: 'Mendel' },
            { id: 'D', text: 'Hooke' }
        ],
        correctAnswer: 'B',
        explanation: 'Charles Darwin proposed the theory of evolution by Natural Selection.'
    },
    {
        id: 'bio_12_004',
        subject: 'Biology',
        class: 'Class 12',
        chapter: 'Human Reproduction',
        question: 'In humans, fertilization occurs in:',
        options: [
            { id: 'A', text: 'Uterus' },
            { id: 'B', text: 'Fallopian Tube' },
            { id: 'C', text: 'Ovary' },
            { id: 'D', text: 'Vagina' }
        ],
        correctAnswer: 'B',
        explanation: 'Fertilization typically takes place in the ampullary region of the Fallopian tube.'
    },
    {
        id: 'bio_12_005',
        subject: 'Biology',
        class: 'Class 12',
        chapter: 'Biotechnology: Principles and Processes',
        question: 'PCR technique was invented by:',
        options: [
            { id: 'A', text: 'Kary Mullis' },
            { id: 'B', text: 'Watson and Crick' },
            { id: 'C', text: 'Alec Jeffreys' },
            { id: 'D', text: 'Boyer' }
        ],
        correctAnswer: 'A',
        explanation: 'Kary Mullis invented Polymerase Chain Reaction (PCR) in 1983.'
    },

    // --- MATHEMATICS (Class 11) ---
    {
        id: 'math_11_001',
        subject: 'Mathematics',
        class: 'Class 11',
        chapter: 'Limits and Derivatives',
        question: 'Limit x->0 of (sin x)/x is:',
        options: [
            { id: 'A', text: '0' },
            { id: 'B', text: '1' },
            { id: 'C', text: 'Infinity' },
            { id: 'D', text: 'Undefined' }
        ],
        correctAnswer: 'B',
        explanation: 'Standard limit.'
    },
    {
        id: 'math_11_002',
        subject: 'Mathematics',
        class: 'Class 11',
        chapter: 'Complex Numbers and Quadratic Equations',
        question: 'The value of i^999 is:',
        options: [
            { id: 'A', text: '1' },
            { id: 'B', text: '-1' },
            { id: 'C', text: 'i' },
            { id: 'D', text: '-i' }
        ],
        correctAnswer: 'D',
        explanation: '999 = 4*249 + 3. So i^999 = (i^4)^249 * i^3 = 1 * (-i) = -i.'
    },
    {
        id: 'math_11_003',
        subject: 'Mathematics',
        class: 'Class 11',
        chapter: 'Complex Numbers and Quadratic Equations',
        question: 'If roots of ax² + bx + c = 0 are equal, then:',
        options: [
            { id: 'A', text: 'b² - 4ac > 0' },
            { id: 'B', text: 'b² - 4ac < 0' },
            { id: 'C', text: 'b² - 4ac = 0' },
            { id: 'D', text: 'b² + 4ac = 0' }
        ],
        correctAnswer: 'C',
        explanation: 'Discriminant must be zero for equal roots.'
    },
    {
        id: 'math_11_004',
        subject: 'Mathematics',
        class: 'Class 11',
        chapter: 'Permutations and Combinations',
        question: 'How many different words can be formed using all letters of the word "MISSISSIPPI"?',
        options: [
            { id: 'A', text: '34650' },
            { id: 'B', text: '34560' },
            { id: 'C', text: '35640' },
            { id: 'D', text: '36450' }
        ],
        correctAnswer: 'A',
        explanation: 'Total 11 letters. 4 S, 4 I, 2 P. 11! / (4! 4! 2!) = 39916800 / (24*24*2) = 34650.'
    },

    // --- MATHEMATICS (Class 12) ---
    {
        id: 'math_12_001',
        subject: 'Mathematics',
        class: 'Class 12',
        chapter: 'Continuity and Differentiability',
        question: 'If y = x^x, then dy/dx is:',
        options: [
            { id: 'A', text: 'x^x log(x)' },
            { id: 'B', text: 'x^x (1 + log x)' },
            { id: 'C', text: 'x (1 + log x)' },
            { id: 'D', text: '1' }
        ],
        correctAnswer: 'B',
        explanation: 'Taking log: log y = x log x. Differentiating: 1/y dy/dx = 1 + log x. So dy/dx = y(1 + log x).'
    },
    {
        id: 'math_12_002',
        subject: 'Mathematics',
        class: 'Class 12',
        chapter: 'Matrices',
        question: 'If A is a square matrix such that A² = A, then (I + A)³ - 7A is equal to:',
        options: [
            { id: 'A', text: 'A' },
            { id: 'B', text: 'I - A' },
            { id: 'C', text: 'I' },
            { id: 'D', text: '3A' }
        ],
        correctAnswer: 'C',
        explanation: '(I+A)³ = I³ + A³ + 3I²A + 3IA² = I + A + 3A + 3A = I + 7A. So (I+A)³ - 7A = I.'
    },
    {
        id: 'math_12_003',
        subject: 'Mathematics',
        class: 'Class 12',
        chapter: 'Probability',
        question: 'A coin is tossed 3 times. The probability of getting at least 2 heads is:',
        options: [
            { id: 'A', text: '1/2' },
            { id: 'B', text: '1/4' },
            { id: 'C', text: '3/8' },
            { id: 'D', text: '5/8' }
        ],
        correctAnswer: 'A',
        explanation: 'Total outcomes = 8. Favorable: HHH, HHT, HTH, THH. Count = 4. Prob = 4/8 = 1/2.'
    },
    {
        id: 'math_12_004',
        subject: 'Mathematics',
        class: 'Class 12',
        chapter: 'Vector Algebra',
        question: 'The projection of vector a = 2i - j + k on vector b = i + 2j + 2k is:',
        options: [
            { id: 'A', text: '2/3' },
            { id: 'B', text: '1/3' },
            { id: 'C', text: '2' },
            { id: 'D', text: '4/3' }
        ],
        correctAnswer: 'A',
        explanation: 'Projection = (a.b)/|b|. a.b = 2(1) -1(2) + 1(2) = 2. |b| = √(1+4+4) = 3. Result = 2/3.'
    }
];
