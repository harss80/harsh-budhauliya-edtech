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
    // New Physics 11
    { id: 'phy_11_006', subject: 'Physics', class: 'Class 11', chapter: 'Work, Energy and Power', question: 'If potential energy U = ax² - bx, then force is zero at x equals:', options: [{ id: 'A', text: 'b/2a' }, { id: 'B', text: '2a/b' }, { id: 'C', text: 'b/a' }, { id: 'D', text: 'a/b' }], correctAnswer: 'A', explanation: 'F = -dU/dx = -(2ax-b). F=0 implies 2ax=b => x=b/2a.' },
    { id: 'phy_11_007', subject: 'Physics', class: 'Class 11', chapter: 'Oscillations', question: 'The time period of a simple pendulum depends on:', options: [{ id: 'A', text: 'Mass of bob' }, { id: 'B', text: 'Length of string' }, { id: 'C', text: 'Amplitude' }, { id: 'D', text: 'Material of bob' }], correctAnswer: 'B', explanation: 'T = 2π√(L/g). Depends on Length.' },


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
    // New Physics 12
    { id: 'phy_12_005', subject: 'Physics', class: 'Class 12', chapter: 'Semiconductor Electronics', question: 'In a p-type semiconductor, the majority charge carriers are:', options: [{ id: 'A', text: 'Electrons' }, { id: 'B', text: 'Holes' }, { id: 'C', text: 'Neutrons' }, { id: 'D', text: 'Protons' }], correctAnswer: 'B', explanation: 'Doping with trivalent impurity creates holes.' },
    { id: 'phy_12_006', subject: 'Physics', class: 'Class 12', chapter: 'Nuclei', question: 'The binding energy per nucleon is maximum for:', options: [{ id: 'A', text: 'He-4' }, { id: 'B', text: 'Fe-56' }, { id: 'C', text: 'U-235' }, { id: 'D', text: 'H-2' }], correctAnswer: 'B', explanation: 'Fe-56 has the highest binding energy per nucleon (8.8 MeV), making it most stable.' },


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
    // New Chem 11
    { id: 'chem_11_005', subject: 'Chemistry', class: 'Class 11', chapter: 'States of Matter', question: 'At constant temperature, the product of pressure and volume of a given amount of gas is constant. This is:', options: [{ id: 'A', text: 'Boyles Law' }, { id: 'B', text: 'Charles Law' }, { id: 'C', text: 'Avogadros Law' }, { id: 'D', text: 'Daltons Law' }], correctAnswer: 'A', explanation: 'Boyles Law: PV = k (at constant T).' },
    { id: 'chem_11_006', subject: 'Chemistry', class: 'Class 11', chapter: 'Redox Reactions', question: 'The oxidation state of Cr in K₂Cr₂O₇ is:', options: [{ id: 'A', text: '+6' }, { id: 'B', text: '+7' }, { id: 'C', text: '+3' }, { id: 'D', text: '+5' }], correctAnswer: 'A', explanation: '2(+1) + 2x + 7(-2) = 0 => 2x - 12 = 0 => x = +6.' },


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
    // New Chem 12
    { id: 'chem_12_005', subject: 'Chemistry', class: 'Class 12', chapter: 'Chemical Kinetics', question: 'For a first order reaction, the half-life period is independent of:', options: [{ id: 'A', text: 'Initial concentration' }, { id: 'B', text: 'Temperature' }, { id: 'C', text: 'Catalyst' }, { id: 'D', text: 'Rate constant' }], correctAnswer: 'A', explanation: 't(1/2) = 0.693/k. Independent of initial concentration [A]₀.' },


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
    // New Bio 11
    { id: 'bio_11_006', subject: 'Biology', class: 'Class 11', chapter: 'Animal Kingdom', question: 'Which of the following animals is cold blooded?', options: [{ id: 'A', text: 'Pigeon' }, { id: 'B', text: 'Human' }, { id: 'C', text: 'Shark' }, { id: 'D', text: 'Rabbit' }], correctAnswer: 'C', explanation: 'Sharks (Pisces/Fish) are poikilotherms (cold-blooded).' },
    { id: 'bio_11_007', subject: 'Biology', class: 'Class 11', chapter: 'Biomolecules', question: 'Enzymes are basically:', options: [{ id: 'A', text: 'Fats' }, { id: 'B', text: 'Sugars' }, { id: 'C', text: 'Proteins' }, { id: 'D', text: 'Vitamins' }], correctAnswer: 'C', explanation: 'Almost all enzymes are proteins.' },


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
    // New Bio 12
    { id: 'bio_12_006', subject: 'Biology', class: 'Class 12', chapter: 'Molecular Basis of Inheritance', question: 'The genetic material in HIV is:', options: [{ id: 'A', text: 'dsDNA' }, { id: 'B', text: 'dsRNA' }, { id: 'C', text: 'ssRNA' }, { id: 'D', text: 'ssDNA' }], correctAnswer: 'C', explanation: 'HIV contains two identical copies of single-stranded RNA (ssRNA).' },


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
    // New Math 11
    { id: 'math_11_005', subject: 'Mathematics', class: 'Class 11', chapter: 'Straight Lines', question: 'The slope of a line perpendicular to 3x - 4y + 5 = 0 is:', options: [{ id: 'A', text: '3/4' }, { id: 'B', text: '-3/4' }, { id: 'C', text: '-4/3' }, { id: 'D', text: '4/3' }], correctAnswer: 'C', explanation: 'Slope of given line is 3/4. Perpendicular slope m2 = -1/m1 = -4/3.' },


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
    },
    // New Math 12
    { id: 'math_12_005', subject: 'Mathematics', class: 'Class 12', chapter: 'Integrals', question: 'Integral of ln(x) dx is:', options: [{ id: 'A', text: '1/x + C' }, { id: 'B', text: 'x ln(x) - x + C' }, { id: 'C', text: 'x ln(x) + C' }, { id: 'D', text: 'ln(x)' }], correctAnswer: 'B', explanation: 'Using Integration by Parts: ∫u dv = uv - ∫v du. u=ln x, dv=dx.' },

    // --- FOUNDATION LEVEL QUESTIONS (Classes 6-10) ---

    // Class 6 Mathematics
    {
        id: 'math_6_001',
        subject: 'Mathematics',
        class: 'Class 6',
        chapter: 'Knowing Our Numbers',
        question: 'The greatest 4-digit number using the digits 8, 5, 2, 9 (each digit used only once) is:',
        options: [
            { id: 'A', text: '9852' },
            { id: 'B', text: '9825' },
            { id: 'C', text: '9582' },
            { id: 'D', text: '9285' }
        ],
        correctAnswer: 'A',
        explanation: 'To form the greatest number, arrange digits in descending order: 9, 8, 5, 2 → 9852.'
    },
    {
        id: 'math_6_002',
        subject: 'Mathematics',
        class: 'Class 6',
        chapter: 'Whole Numbers',
        question: 'The predecessor of 1000 is:',
        options: [
            { id: 'A', text: '1001' },
            { id: 'B', text: '999' },
            { id: 'C', text: '1000' },
            { id: 'D', text: '998' }
        ],
        correctAnswer: 'B',
        explanation: 'Predecessor means the number that comes before. The number before 1000 is 999.'
    },
    {
        id: 'math_6_003',
        subject: 'Mathematics',
        class: 'Class 6',
        chapter: 'Fractions',
        question: 'Which fraction is equivalent to 3/4?',
        options: [
            { id: 'A', text: '6/8' },
            { id: 'B', text: '2/3' },
            { id: 'C', text: '4/5' },
            { id: 'D', text: '5/6' }
        ],
        correctAnswer: 'A',
        explanation: 'Multiply numerator and denominator by 2: 3×2/4×2 = 6/8.'
    },

    // Class 6 Science
    {
        id: 'sci_6_001',
        subject: 'Science',
        class: 'Class 6',
        chapter: 'Components of Food',
        question: 'Which of the following is rich in proteins?',
        options: [
            { id: 'A', text: 'Rice' },
            { id: 'B', text: 'Eggs' },
            { id: 'C', text: 'Sugar' },
            { id: 'D', text: 'Oil' }
        ],
        correctAnswer: 'B',
        explanation: 'Eggs are rich in proteins, which are essential for body building and repair.'
    },
    {
        id: 'sci_6_002',
        subject: 'Science',
        class: 'Class 6',
        chapter: 'Getting to Know Plants',
        question: 'The process by which plants make their own food is called:',
        options: [
            { id: 'A', text: 'Respiration' },
            { id: 'B', text: 'Photosynthesis' },
            { id: 'C', text: 'Transpiration' },
            { id: 'D', text: 'Germination' }
        ],
        correctAnswer: 'B',
        explanation: 'Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to make food.'
    },

    // Class 7 Mathematics
    {
        id: 'math_7_001',
        subject: 'Mathematics',
        class: 'Class 7',
        chapter: 'Integers',
        question: 'The value of (-3) × (-2) × 5 is:',
        options: [
            { id: 'A', text: '-30' },
            { id: 'B', text: '30' },
            { id: 'C', text: '-10' },
            { id: 'D', text: '10' }
        ],
        correctAnswer: 'B',
        explanation: '(-3) × (-2) = 6, then 6 × 5 = 30. Product of two negatives is positive.'
    },
    {
        id: 'math_7_002',
        subject: 'Mathematics',
        class: 'Class 7',
        chapter: 'Algebra',
        question: 'If x = 2, then the value of 3x + 5 is:',
        options: [
            { id: 'A', text: '10' },
            { id: 'B', text: '11' },
            { id: 'C', text: '12' },
            { id: 'D', text: '13' }
        ],
        correctAnswer: 'B',
        explanation: 'Substitute x = 2: 3(2) + 5 = 6 + 5 = 11.'
    },

    // Class 7 Science
    {
        id: 'sci_7_001',
        subject: 'Science',
        class: 'Class 7',
        chapter: 'Nutrition in Plants',
        question: 'Which part of the plant is responsible for photosynthesis?',
        options: [
            { id: 'A', text: 'Roots' },
            { id: 'B', text: 'Stem' },
            { id: 'C', text: 'Leaves' },
            { id: 'D', text: 'Flowers' }
        ],
        correctAnswer: 'C',
        explanation: 'Leaves contain chlorophyll and are the main sites of photosynthesis in plants.'
    },
    {
        id: 'sci_7_002',
        subject: 'Science',
        class: 'Class 7',
        chapter: 'Heat',
        question: 'Heat transfer in solids occurs mainly through:',
        options: [
            { id: 'A', text: 'Conduction' },
            { id: 'B', text: 'Convection' },
            { id: 'C', text: 'Radiation' },
            { id: 'D', text: 'Evaporation' }
        ],
        correctAnswer: 'A',
        explanation: 'In solids, heat is transferred mainly through conduction, where particles vibrate and pass energy to neighboring particles.'
    },

    // Class 8 Mathematics
    {
        id: 'math_8_001',
        subject: 'Mathematics',
        class: 'Class 8',
        chapter: 'Rational Numbers',
        question: 'Which of the following is a rational number?',
        options: [
            { id: 'A', text: '√2' },
            { id: 'B', text: 'π' },
            { id: 'C', text: '3/4' },
            { id: 'D', text: '√3' }
        ],
        correctAnswer: 'C',
        explanation: 'A rational number can be expressed as a fraction p/q where p and q are integers. 3/4 is a rational number.'
    },
    {
        id: 'math_8_002',
        subject: 'Mathematics',
        class: 'Class 8',
        chapter: 'Linear Equations',
        question: 'The solution of the equation 2x + 3 = 11 is:',
        options: [
            { id: 'A', text: 'x = 3' },
            { id: 'B', text: 'x = 4' },
            { id: 'C', text: 'x = 5' },
            { id: 'D', text: 'x = 6' }
        ],
        correctAnswer: 'B',
        explanation: '2x + 3 = 11 → 2x = 11 - 3 → 2x = 8 → x = 4.'
    },

    // Class 8 Science
    {
        id: 'sci_8_001',
        subject: 'Science',
        class: 'Class 8',
        chapter: 'Crop Production and Management',
        question: 'The process of loosening and turning of soil is called:',
        options: [
            { id: 'A', text: 'Irrigation' },
            { id: 'B', text: 'Ploughing' },
            { id: 'C', text: 'Harvesting' },
            { id: 'D', text: 'Weeding' }
        ],
        correctAnswer: 'B',
        explanation: 'Ploughing is the agricultural process of loosening and turning the soil to prepare it for cultivation.'
    },
    {
        id: 'sci_8_002',
        subject: 'Science',
        class: 'Class 8',
        chapter: 'Materials: Metals and Non-metals',
        question: 'Which of the following is a non-metal?',
        options: [
            { id: 'A', text: 'Iron' },
            { id: 'B', text: 'Copper' },
            { id: 'C', text: 'Sulphur' },
            { id: 'D', text: 'Aluminium' }
        ],
        correctAnswer: 'C',
        explanation: 'Sulphur is a non-metal, while iron, copper, and aluminium are metals.'
    },

    // Class 9 Mathematics
    {
        id: 'math_9_001',
        subject: 'Mathematics',
        class: 'Class 9',
        chapter: 'Number Systems',
        question: 'The decimal expansion of 1/3 is:',
        options: [
            { id: 'A', text: '0.3' },
            { id: 'B', text: '0.33' },
            { id: 'C', text: '0.333...' },
            { id: 'D', text: '0.3333' }
        ],
        correctAnswer: 'C',
        explanation: '1/3 = 0.333... which is a repeating decimal with infinite 3s.'
    },
    {
        id: 'math_9_002',
        subject: 'Mathematics',
        class: 'Class 9',
        chapter: 'Polynomials',
        question: 'The degree of the polynomial 3x² + 2x³ - 5x + 7 is:',
        options: [
            { id: 'A', text: '1' },
            { id: 'B', text: '2' },
            { id: 'C', text: '3' },
            { id: 'D', text: '4' }
        ],
        correctAnswer: 'C',
        explanation: 'The degree of a polynomial is the highest power of the variable. Here, the highest power is 3 in the term 2x³.'
    },

    // Class 9 Science
    {
        id: 'sci_9_001',
        subject: 'Science',
        class: 'Class 9',
        chapter: 'Matter in Our Surroundings',
        question: 'Which state of matter has maximum compressibility?',
        options: [
            { id: 'A', text: 'Solid' },
            { id: 'B', text: 'Liquid' },
            { id: 'C', text: 'Gas' },
            { id: 'D', text: 'Plasma' }
        ],
        correctAnswer: 'C',
        explanation: 'Gases have maximum compressibility because their molecules are far apart and can be easily compressed.'
    },
    {
        id: 'sci_9_002',
        subject: 'Science',
        class: 'Class 9',
        chapter: 'Atoms and Molecules',
        question: 'The symbol of gold is:',
        options: [
            { id: 'A', text: 'Go' },
            { id: 'B', text: 'Gd' },
            { id: 'C', text: 'Au' },
            { id: 'D', text: 'Ag' }
        ],
        correctAnswer: 'C',
        explanation: 'The chemical symbol of gold is Au, which comes from the Latin word "Aurum".'
    },

    // Class 10 Mathematics
    {
        id: 'math_10_001',
        subject: 'Mathematics',
        class: 'Class 10',
        chapter: 'Quadratic Equations',
        question: 'The discriminant of the quadratic equation x² + 5x + 6 = 0 is:',
        options: [
            { id: 'A', text: '1' },
            { id: 'B', text: '25' },
            { id: 'C', text: '1' },
            { id: 'D', text: '-1' }
        ],
        correctAnswer: 'C',
        explanation: 'For ax² + bx + c = 0, discriminant D = b² - 4ac. Here, D = 5² - 4(1)(6) = 25 - 24 = 1.'
    },
    {
        id: 'math_10_002',
        subject: 'Mathematics',
        class: 'Class 10',
        chapter: 'Trigonometry',
        question: 'The value of sin²30° + cos²30° is:',
        options: [
            { id: 'A', text: '0' },
            { id: 'B', text: '1' },
            { id: 'C', text: '2' },
            { id: 'D', text: '√2' }
        ],
        correctAnswer: 'B',
        explanation: 'For any angle θ, sin²θ + cos²θ = 1. This is a fundamental trigonometric identity.'
    },

    // Class 10 Science
    {
        id: 'sci_10_001',
        subject: 'Science',
        class: 'Class 10',
        chapter: 'Chemical Reactions and Equations',
        question: 'The balanced equation for the reaction between hydrogen and oxygen is:',
        options: [
            { id: 'A', text: 'H₂ + O₂ → H₂O' },
            { id: 'B', text: '2H₂ + O₂ → 2H₂O' },
            { id: 'C', text: 'H₂ + 2O₂ → 2H₂O' },
            { id: 'D', text: '2H₂ + 2O₂ → 4H₂O' }
        ],
        correctAnswer: 'B',
        explanation: 'The balanced equation is 2H₂ + O₂ → 2H₂O, which balances the number of hydrogen and oxygen atoms on both sides.'
    },
    {
        id: 'sci_10_002',
        subject: 'Science',
        class: 'Class 10',
        chapter: 'Life Processes',
        question: 'Which organelle is known as the powerhouse of the cell?',
        options: [
            { id: 'A', text: 'Nucleus' },
            { id: 'B', text: 'Mitochondria' },
            { id: 'C', text: 'Ribosome' },
            { id: 'D', text: 'Chloroplast' }
        ],
        correctAnswer: 'B',
        explanation: 'Mitochondria are known as the powerhouse of the cell as they produce ATP (energy) through cellular respiration.'
    },

    // Additional Foundation Questions - Hard Level

    // Class 6 Mathematics (Advanced)
    {
        id: 'math_6_004',
        subject: 'Mathematics',
        class: 'Class 6',
        chapter: 'Ratio and Proportion',
        question: 'If 12 workers can build a wall in 6 days, how many days will 8 workers take to build same wall?',
        options: [
            { id: 'A', text: '4 days' },
            { id: 'B', text: '9 days' },
            { id: 'C', text: '8 days' },
            { id: 'D', text: '12 days' }
        ],
        correctAnswer: 'B',
        explanation: 'This is inverse proportion: 12×6 = 8×x → x = 72/8 = 9 days.'
    },
    {
        id: 'math_6_005',
        subject: 'Mathematics',
        class: 'Class 6',
        chapter: 'Mensuration',
        question: 'The area of a square field is 2025 m². The perimeter of the field is:',
        options: [
            { id: 'A', text: '180 m' },
            { id: 'B', text: '90 m' },
            { id: 'C', text: '45 m' },
            { id: 'D', text: '225 m' }
        ],
        correctAnswer: 'A',
        explanation: 'Area = side² → side = √2025 = 45 m. Perimeter = 4×side = 4×45 = 180 m.'
    },

    // Class 6 Science (Advanced)
    {
        id: 'sci_6_003',
        subject: 'Science',
        class: 'Class 6',
        chapter: 'Electricity and Circuits',
        question: 'In a circuit with three resistors of 2Ω, 3Ω, and 5Ω connected in series, total resistance is:',
        options: [
            { id: 'A', text: '10Ω' },
            { id: 'B', text: '8Ω' },
            { id: 'C', text: '5Ω' },
            { id: 'D', text: '30Ω' }
        ],
        correctAnswer: 'A',
        explanation: 'In series connection, total resistance = sum of all resistances = 2+3+5 = 10Ω.'
    },
    {
        id: 'sci_6_004',
        subject: 'Science',
        class: 'Class 6',
        chapter: 'Water',
        question: 'The process of conversion of water vapor into liquid water is called:',
        options: [
            { id: 'A', text: 'Evaporation' },
            { id: 'B', text: 'Condensation' },
            { id: 'C', text: 'Precipitation' },
            { id: 'D', text: 'Transpiration' }
        ],
        correctAnswer: 'B',
        explanation: 'Condensation is the process where water vapor changes to liquid water droplets.'
    },

    // Class 7 Mathematics (Advanced)
    {
        id: 'math_7_003',
        subject: 'Mathematics',
        class: 'Class 7',
        chapter: 'Comparing Quantities',
        question: 'A shopkeeper offers 20% discount on an item marked at ₹500. The selling price is:',
        options: [
            { id: 'A', text: '₹400' },
            { id: 'B', text: '₹480' },
            { id: 'C', text: '₹420' },
            { id: 'D', text: '₹450' }
        ],
        correctAnswer: 'A',
        explanation: 'Discount = 20% of 500 = 100. Selling price = 500 - 100 = ₹400.'
    },
    {
        id: 'math_7_004',
        subject: 'Mathematics',
        class: 'Class 7',
        chapter: 'Perimeter and Area',
        question: 'The radius of a circle is 7 cm. Its area is approximately:',
        options: [
            { id: 'A', text: '154 cm²' },
            { id: 'B', text: '44 cm²' },
            { id: 'C', text: '21 cm²' },
            { id: 'D', text: '49 cm²' }
        ],
        correctAnswer: 'A',
        explanation: 'Area = πr² = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm².'
    },

    // Class 7 Science (Advanced)
    {
        id: 'sci_7_003',
        subject: 'Science',
        class: 'Class 7',
        chapter: 'Acids, Bases and Salts',
        question: 'A solution with pH value 3 is:',
        options: [
            { id: 'A', text: 'Strongly acidic' },
            { id: 'B', text: 'Weakly acidic' },
            { id: 'C', text: 'Neutral' },
            { id: 'D', text: 'Basic' }
        ],
        correctAnswer: 'A',
        explanation: 'pH scale: 0-6 (acidic), 7 (neutral), 8-14 (basic). pH 3 is strongly acidic.'
    },
    {
        id: 'sci_7_004',
        subject: 'Science',
        class: 'Class 7',
        chapter: 'Weather and Climate',
        question: 'Which instrument is used to measure atmospheric pressure?',
        options: [
            { id: 'A', text: 'Thermometer' },
            { id: 'B', text: 'Barometer' },
            { id: 'C', text: 'Hygrometer' },
            { id: 'D', text: 'Anemometer' }
        ],
        correctAnswer: 'B',
        explanation: 'Barometer is used to measure atmospheric pressure.'
    },

    // Class 8 Mathematics (Advanced)
    {
        id: 'math_8_003',
        subject: 'Mathematics',
        class: 'Class 8',
        chapter: 'Understanding Quadrilaterals',
        question: 'The sum of interior angles of a regular hexagon is:',
        options: [
            { id: 'A', text: '360°' },
            { id: 'B', text: '540°' },
            { id: 'C', text: '720°' },
            { id: 'D', text: '900°' }
        ],
        correctAnswer: 'C',
        explanation: 'Sum of interior angles = (n-2) × 180° = (6-2) × 180° = 4 × 180° = 720°.'
    },
    {
        id: 'math_8_004',
        subject: 'Mathematics',
        class: 'Class 8',
        chapter: 'Exponents and Powers',
        question: 'The value of (2³)² × 2⁻¹ is:',
        options: [
            { id: 'A', text: '16' },
            { id: 'B', text: '32' },
            { id: 'C', text: '64' },
            { id: 'D', text: '8' }
        ],
        correctAnswer: 'B',
        explanation: '(2³)² × 2⁻¹ = 2⁶ × 2⁻¹ = 2⁵ = 32.'
    },

    // Class 8 Science (Advanced)
    {
        id: 'sci_8_003',
        subject: 'Science',
        class: 'Class 8',
        chapter: 'Conservation of Plants and Animals',
        question: 'Which of the following is an example of in-situ conservation?',
        options: [
            { id: 'A', text: 'Zoological park' },
            { id: 'B', text: 'Botanical garden' },
            { id: 'C', text: 'National park' },
            { id: 'D', text: 'Seed bank' }
        ],
        correctAnswer: 'C',
        explanation: 'In-situ conservation protects species in their natural habitat, like national parks.'
    },
    {
        id: 'sci_8_004',
        subject: 'Science',
        class: 'Class 8',
        chapter: 'Reaching the Age of Adolescence',
        question: 'Which hormone is responsible for secondary sexual characteristics in males?',
        options: [
            { id: 'A', text: 'Estrogen' },
            { id: 'B', text: 'Testosterone' },
            { id: 'C', text: 'Insulin' },
            { id: 'D', text: 'Thyroxine' }
        ],
        correctAnswer: 'B',
        explanation: 'Testosterone is the male sex hormone responsible for secondary sexual characteristics.'
    },

    // Class 9 Mathematics (Advanced)
    {
        id: 'math_9_003',
        subject: 'Mathematics',
        class: 'Class 9',
        chapter: 'Coordinate Geometry',
        question: 'The distance between points (3,4) and (7,1) is:',
        options: [
            { id: 'A', text: '5 units' },
            { id: 'B', text: '√25 units' },
            { id: 'C', text: '√41 units' },
            { id: 'D', text: '7 units' }
        ],
        correctAnswer: 'A',
        explanation: 'Distance = √[(7-3)² + (1-4)²] = √[16 + 9] = √25 = 5 units.'
    },
    {
        id: 'math_9_004',
        subject: 'Mathematics',
        class: 'Class 9',
        chapter: 'Heron\'s Formula',
        question: 'The area of a triangle with sides 13cm, 14cm, and 15cm is:',
        options: [
            { id: 'A', text: '84 cm²' },
            { id: 'B', text: '96 cm²' },
            { id: 'C', text: '72 cm²' },
            { id: 'D', text: '108 cm²' }
        ],
        correctAnswer: 'A',
        explanation: 's = (13+14+15)/2 = 21. Area = √[21(21-13)(21-14)(21-15)] = √[21×8×7×6] = √7056 = 84 cm².'
    },

    // Class 9 Science (Advanced)
    {
        id: 'sci_9_003',
        subject: 'Science',
        class: 'Class 9',
        chapter: 'Structure of the Atom',
        question: 'The maximum number of electrons that can be accommodated in M shell is:',
        options: [
            { id: 'A', text: '2' },
            { id: 'B', text: '8' },
            { id: 'C', text: '18' },
            { id: 'D', text: '32' }
        ],
        correctAnswer: 'C',
        explanation: 'M shell is the third shell (n=3). Maximum electrons = 2n² = 2×3² = 18.'
    },
    {
        id: 'sci_9_004',
        subject: 'Science',
        class: 'Class 9',
        chapter: 'Work and Energy',
        question: 'A body of mass 5 kg is moving with velocity 2 m/s. Its kinetic energy is:',
        options: [
            { id: 'A', text: '10 J' },
            { id: 'B', text: '20 J' },
            { id: 'C', text: '5 J' },
            { id: 'D', text: '40 J' }
        ],
        correctAnswer: 'A',
        explanation: 'KE = ½mv² = ½ × 5 × 2² = ½ × 5 × 4 = 10 J.'
    },

    // Class 10 Mathematics (Advanced)
    {
        id: 'math_10_003',
        subject: 'Mathematics',
        class: 'Class 10',
        chapter: 'Arithmetic Progressions',
        question: 'The sum of first 20 terms of AP: 3, 7, 11, 15, ... is:',
        options: [
            { id: 'A', text: '820' },
            { id: 'B', text: '840' },
            { id: 'C', text: '860' },
            { id: 'D', text: '880' }
        ],
        correctAnswer: 'A',
        explanation: 'a=3, d=4, n=20. S_n = n/2[2a + (n-1)d] = 20/2[6 + 76] = 10×82 = 820.'
    },
    {
        id: 'math_10_004',
        subject: 'Mathematics',
        class: 'Class 10',
        chapter: 'Circles',
        question: 'The length of tangent from a point 6cm away from center of circle with radius 4cm is:',
        options: [
            { id: 'A', text: '2√5 cm' },
            { id: 'B', text: '√20 cm' },
            { id: 'C', text: '2√5 cm' },
            { id: 'D', text: '√52 cm' }
        ],
        correctAnswer: 'A',
        explanation: 'Tangent length = √(d² - r²) = √(6² - 4²) = √(36 - 16) = √20 = 2√5 cm.'
    },

    // Class 10 Science (Advanced)
    {
        id: 'sci_10_003',
        subject: 'Science',
        class: 'Class 10',
        chapter: 'Periodic Classification of Elements',
        question: 'Which element has electronic configuration 2,8,8,1?',
        options: [
            { id: 'A', text: 'Sodium' },
            { id: 'B', text: 'Potassium' },
            { id: 'C', text: 'Chlorine' },
            { id: 'D', text: 'Argon' }
        ],
        correctAnswer: 'B',
        explanation: '2,8,8,1 configuration has 19 electrons, which is potassium (K, atomic number 19).'
    },
    {
        id: 'sci_10_004',
        subject: 'Science',
        class: 'Class 10',
        chapter: 'Heredity and Evolution',
        question: 'Which law of Mendel states that factors segregate independently during gamete formation?',
        options: [
            { id: 'A', text: 'Law of Dominance' },
            { id: 'B', text: 'Law of Segregation' },
            { id: 'C', text: 'Law of Independent Assortment' },
            { id: 'D', text: 'Law of Purity of Gametes' }
        ],
        correctAnswer: 'C',
        explanation: 'Law of Independent Assortment states that genes segregate independently during gamete formation.'
    },

    // Additional Mixed Questions for Variety
    {
        id: 'mixed_001',
        subject: 'Mathematics',
        class: 'Class 8',
        chapter: 'Data Handling',
        question: 'The mean of first 10 prime numbers is approximately:',
        options: [
            { id: 'A', text: '12.9' },
            { id: 'B', text: '15.7' },
            { id: 'C', text: '18.3' },
            { id: 'D', text: '21.1' }
        ],
        correctAnswer: 'A',
        explanation: 'First 10 primes: 2,3,5,7,11,13,17,19,23,29. Sum = 129, Mean = 129/10 = 12.9.'
    },
    {
        id: 'mixed_002',
        subject: 'Science',
        class: 'Class 9',
        chapter: 'Natural Resources',
        question: 'Which gas is primarily responsible for greenhouse effect?',
        options: [
            { id: 'A', text: 'Oxygen' },
            { id: 'B', text: 'Nitrogen' },
            { id: 'C', text: 'Carbon dioxide' },
            { id: 'D', text: 'Hydrogen' }
        ],
        correctAnswer: 'C',
        explanation: 'Carbon dioxide is the primary greenhouse gas responsible for global warming.'
    },
    {
        id: 'mixed_003',
        subject: 'Mathematics',
        class: 'Class 7',
        chapter: 'Symmetry',
        question: 'How many lines of symmetry does a regular hexagon have?',
        options: [
            { id: 'A', text: '3' },
            { id: 'B', text: '6' },
            { id: 'C', text: '9' },
            { id: 'D', text: '12' }
        ],
        correctAnswer: 'B',
        explanation: 'A regular hexagon has 6 lines of symmetry - 3 through opposite vertices and 3 through midpoints of opposite sides.'
    },
    {
        id: 'mixed_004',
        subject: 'Science',
        class: 'Class 10',
        chapter: 'Magnetic Effects of Electric Current',
        question: 'The device used to convert electrical energy into mechanical energy is:',
        options: [
            { id: 'A', text: 'Generator' },
            { id: 'B', text: 'Motor' },
            { id: 'C', text: 'Transformer' },
            { id: 'D', text: 'Rectifier' }
        ],
        correctAnswer: 'B',
        explanation: 'Electric motor converts electrical energy into mechanical energy.'
    },
    {
        id: 'mixed_005',
        subject: 'Mathematics',
        class: 'Class 6',
        chapter: 'Practical Geometry',
        question: 'The angle bisector of 90° angle divides it into two angles of:',
        options: [
            { id: 'A', text: '30° each' },
            { id: 'B', text: '45° each' },
            { id: 'C', text: '60° each' },
            { id: 'D', text: '90° each' }
        ],
        correctAnswer: 'B',
        explanation: 'Angle bisector divides an angle into two equal parts. 90° ÷ 2 = 45° each.'
    },
    {
        id: 'mixed_006',
        subject: 'Science',
        class: 'Class 8',
        chapter: 'Sound',
        question: 'The speed of sound in air at room temperature is approximately:',
        options: [
            { id: 'A', text: '340 m/s' },
            { id: 'B', text: '150 m/s' },
            { id: 'C', text: '500 m/s' },
            { id: 'D', text: '1000 m/s' }
        ],
        correctAnswer: 'A',
        explanation: 'Speed of sound in air at room temperature (20°C) is approximately 340 m/s.'
    }
];
