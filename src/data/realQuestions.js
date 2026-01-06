
export const realQuestions = [
    // --- PHYSICS ---
    {
        id: 'phy_001',
        subject: 'Physics',
        topic: 'Mechanics',
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
        id: 'phy_002',
        subject: 'Physics',
        topic: 'Electromagnetism',
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
        id: 'phy_003',
        subject: 'Physics',
        topic: 'Thermodynamics',
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
        id: 'phy_004',
        subject: 'Physics',
        topic: 'Optics',
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
        id: 'phy_005',
        subject: 'Physics',
        topic: 'Modern Physics',
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
        id: 'phy_006',
        subject: 'Physics',
        topic: 'Rotational Motion',
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
        id: 'phy_007',
        subject: 'Physics',
        topic: 'SHM',
        question: 'The time period of a simple pendulum inside a satellite orbiting the earth is:',
        options: [
            { id: 'A', text: 'Zero' },
            { id: 'B', text: 'Infinite' },
            { id: 'C', text: 'T' },
            { id: 'D', text: '2T' }
        ],
        correctAnswer: 'B',
        explanation: 'Inside a satellite, effective g = 0. T = 2π√(L/g_eff) = 2π√(L/0) = Infinite.'
    },
    {
        id: 'phy_008',
        subject: 'Physics',
        topic: 'Fluid Mechanics',
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
        id: 'phy_009',
        subject: 'Physics',
        topic: 'AC Circuits',
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
    {
        id: 'phy_010',
        subject: 'Physics',
        topic: 'Units and Dimensions',
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

    // --- CHEMISTRY ---
    {
        id: 'chem_001',
        subject: 'Chemistry',
        topic: 'Atomic Structure',
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
        id: 'chem_002',
        subject: 'Chemistry',
        topic: 'Thermodynamics',
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
        id: 'chem_003',
        subject: 'Chemistry',
        topic: 'Organic Chemistry',
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
        id: 'chem_004',
        subject: 'Chemistry',
        topic: 'Chemical Bonding',
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
        id: 'chem_005',
        subject: 'Chemistry',
        topic: 'Solutions',
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
        id: 'chem_006',
        subject: 'Chemistry',
        topic: 'Periodic Table',
        question: 'The element with the highest electronegativity is:',
        options: [
            { id: 'A', text: 'Chlorine' },
            { id: 'B', text: 'Fluorine' },
            { id: 'C', text: 'Oxygen' },
            { id: 'D', text: 'Nitrogen' }
        ],
        correctAnswer: 'B',
        explanation: 'Fluorine is the most electronegative element in the periodic table (Paulings scale value ~ 4.0).'
    },
    {
        id: 'chem_007',
        subject: 'Chemistry',
        topic: 'Equilibrium',
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
    {
        id: 'chem_008',
        subject: 'Chemistry',
        topic: 'Electrochemistry',
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
        id: 'chem_009',
        subject: 'Chemistry',
        topic: 'Coordination Compounds',
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
    {
        id: 'chem_010',
        subject: 'Chemistry',
        topic: 'Biomolecules',
        question: 'Which of the following is a reducing sugar?',
        options: [
            { id: 'A', text: 'Sucrose' },
            { id: 'B', text: 'Maltose' },
            { id: 'C', text: 'Starch' },
            { id: 'D', text: 'Cellulose' }
        ],
        correctAnswer: 'B',
        explanation: 'Maltose has a free aldehyde group at C1 of one glucose unit, making it a reducing sugar. Sucrose is non-reducing.'
    },


    // --- MATHEMATICS ---
    {
        id: 'math_001',
        subject: 'Mathematics',
        topic: 'Calculus',
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
        id: 'math_002',
        subject: 'Mathematics',
        topic: 'Complex Numbers',
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
        id: 'math_003',
        subject: 'Mathematics',
        topic: 'Matrices',
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
        id: 'math_004',
        subject: 'Mathematics',
        topic: 'Probability',
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
        id: 'math_005',
        subject: 'Mathematics',
        topic: 'Vectors',
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
    {
        id: 'math_006',
        subject: 'Mathematics',
        topic: 'Trigonometry',
        question: 'The value of sin(15°) is:',
        options: [
            { id: 'A', text: '(√3 - 1) / 2√2' },
            { id: 'B', text: '(√3 + 1) / 2√2' },
            { id: 'C', text: '(√3 - 1) / 2' },
            { id: 'D', text: '(√3 + 1) / 2' }
        ],
        correctAnswer: 'A',
        explanation: 'sin(45-30) = sin45 cos30 - cos45 sin30 = (1/√2)(√3/2) - (1/√2)(1/2) = (√3-1)/2√2.'
    },
    {
        id: 'math_007',
        subject: 'Mathematics',
        topic: 'Limits',
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
        id: 'math_008',
        subject: 'Mathematics',
        topic: 'Coordinate Geometry',
        question: 'The slope of the line perpendicular to 3x - 4y + 7 = 0 is:',
        options: [
            { id: 'A', text: '3/4' },
            { id: 'B', text: '-3/4' },
            { id: 'C', text: '-4/3' },
            { id: 'D', text: '4/3' }
        ],
        correctAnswer: 'C',
        explanation: 'Slope of given line m1 = 3/4. For perpendicular line m2 = -1/m1 = -4/3.'
    },
    {
        id: 'math_009',
        subject: 'Mathematics',
        topic: 'Quadratic Equations',
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
        id: 'math_010',
        subject: 'Mathematics',
        topic: 'Permutations',
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

    // --- BIOLOGY ---
    {
        id: 'bio_001',
        subject: 'Biology',
        topic: 'Cell Biology',
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
        id: 'bio_002',
        subject: 'Biology',
        topic: 'Genetics',
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
        id: 'bio_003',
        subject: 'Biology',
        topic: 'Human Physiology',
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
        id: 'bio_004',
        subject: 'Biology',
        topic: 'Plant Physiology',
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
        id: 'bio_005',
        subject: 'Biology',
        topic: 'Ecology',
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
        id: 'bio_006',
        subject: 'Biology',
        topic: 'Evolution',
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
        id: 'bio_007',
        subject: 'Biology',
        topic: 'Human Physiology',
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
        id: 'bio_008',
        subject: 'Biology',
        topic: 'Reproduction',
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
        id: 'bio_009',
        subject: 'Biology',
        topic: 'Diversity',
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
    {
        id: 'bio_010',
        subject: 'Biology',
        topic: 'Biotech',
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
];
