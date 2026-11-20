import {
  BoardPaper,
  MicroModule,
  QuizQuestion,
  StepSolutionProblem,
} from '../types';

export const TENTH_MICRO_MODULES: MicroModule[] = [
  {
    id: 'm-ohms-law',
    subject: 'Physics',
    chapter: 'Electricity',
    title: "Ohm's Law & Series-Parallel Resistance",
    durationMin: 5,
    summary:
      'Understand how voltage, current, and resistance interact in a DC circuit at constant temperature.',
    keyFormula: 'V = I × R   |   R_series = R₁ + R₂   |   1/R_parallel = 1/R₁ + 1/R₂',
    simulationType: 'ohms-law',
    conceptSteps: [
      {
        heading: 'Potential Difference Drives Current',
        detail:
          'Voltage (V) acts as the electrical pressure pushing charges through a conductor. Doubling voltage across a fixed resistor doubles the current (I).',
      },
      {
        heading: 'Resistance Opposes Flow',
        detail:
          'Measured in Ohms (Ω), resistance depends on length (L), cross-sectional area (A), and resistivity (ρ): R = ρL / A.',
      },
      {
        heading: 'Power Dissipation Check',
        detail:
          'Electrical power converted to heat or light is given by P = V × I = I²R. Always verify units (Volts, Amperes, Ohms) before substituting.',
      },
    ],
    checkpoint: {
      question:
        'A 12 V battery is connected across a 4 Ω resistor. What is the current flowing through the circuit?',
      options: ['0.33 A', '3.0 A', '8.0 A', '48.0 A'],
      correctIndex: 1,
      explanation: 'Using I = V / R = 12 V / 4 Ω = 3.0 A.',
    },
  },
  {
    id: 'm-quadratic-roots',
    subject: 'Mathematics',
    chapter: 'Quadratic Equations',
    title: 'Discriminant & Nature of Quadratic Roots',
    durationMin: 6,
    summary:
      'Predict whether a parabola touches, crosses, or misses the x-axis using Δ = b² − 4ac without solving fully.',
    keyFormula: 'x = (−b ± √(b² − 4ac)) / 2a   |   Δ = b² − 4ac',
    simulationType: 'quadratic',
    conceptSteps: [
      {
        heading: 'Standard Form Alignment',
        detail:
          'Always rearrange the equation to ax² + bx + c = 0 (with a ≠ 0) before reading coefficients a, b, and c with their signs.',
      },
      {
        heading: 'Three Discriminant Regimes',
        detail:
          'If Δ > 0, two distinct real roots exist. If Δ = 0, two equal real roots touch the x-axis at vertex −b/2a. If Δ < 0, no real roots exist.',
      },
      {
        heading: 'Vertex & Axis of Symmetry',
        detail:
          'The turning point of y = ax² + bx + c always lies on the vertical line x = −b / (2a). Sign of "a" determines upward or downward opening.',
      },
    ],
    checkpoint: {
      question: 'For the equation 2x² − 4x + 2 = 0, what is the nature of the roots?',
      options: [
        'Two distinct real roots',
        'Two equal real roots',
        'No real roots',
        'Irrational conjugate roots',
      ],
      correctIndex: 1,
      explanation: 'Δ = (−4)² − 4(2)(2) = 16 − 16 = 0, so there are two equal real roots (x = 1).',
    },
  },
  {
    id: 'm-snells-optics',
    subject: 'Physics',
    chapter: 'Light: Reflection & Refraction',
    title: "Snell's Law & Spherical Mirror Sign Convention",
    durationMin: 5,
    summary:
      'Master Cartesian sign conventions for concave/convex mirrors and refractive index calculations across media.',
    keyFormula: '1/f = 1/v + 1/u   |   m = −v/u   |   n₁ sin(i) = n₂ sin(r)',
    simulationType: 'refraction',
    conceptSteps: [
      {
        heading: 'New Cartesian Sign Convention',
        detail:
          'Measure all distances from the optical center or pole. Distances against incident light are negative (u is always negative for real objects).',
      },
      {
        heading: 'Focal Length Signs',
        detail:
          'Concave mirror / concave lens has negative focal length (f < 0). Convex mirror / convex lens has positive focal length (f > 0).',
      },
      {
        heading: 'Refractive Bending Rule',
        detail:
          'Light bends toward the normal when entering a denser medium (n₂ > n₁) and bends away when entering a rarer medium.',
      },
    ],
    checkpoint: {
      question:
        'An object is placed 30 cm in front of a concave mirror of focal length 15 cm. Where is the image formed?',
      options: [
        '30 cm in front of the mirror',
        '15 cm behind the mirror',
        '10 cm in front of the mirror',
        'At infinity',
      ],
      correctIndex: 0,
      explanation:
        'Object is at 2f (center of curvature, C = −30 cm), so a real, inverted, same-sized image forms at −30 cm (in front of the mirror).',
    },
  },
  {
    id: 'm-chemical-balancing',
    subject: 'Chemistry',
    chapter: 'Chemical Reactions & Equations',
    title: 'Balancing Equations & Redox Identification',
    durationMin: 4,
    summary:
      'Balance atoms systematically using the hit-and-trial conservation method and spot oxidizing vs reducing agents.',
    keyFormula: 'Atoms(Reactants) = Atoms(Products)   |   OIL RIG (Oxidation Is Loss, Reduction Is Gain)',
    conceptSteps: [
      {
        heading: 'Lock Compounds Inside Boxes',
        detail:
          'Never alter chemical subscripts (e.g. changing H₂O to H₂O₂). Only adjust stoichiometric coefficients in front of formulas.',
      },
      {
        heading: 'Balance Polyatomic & Largest Formula First',
        detail:
          'Start with the compound containing the maximum number of atoms, then balance metals, non-metals, and finally hydrogen and oxygen.',
      },
      {
        heading: 'Spot Redox Pairs',
        detail:
          'Addition of oxygen or removal of hydrogen is oxidation; the substance that gets oxidized acts as the reducing agent.',
      },
    ],
    checkpoint: {
      question:
        'In the balanced equation a Fe + b H₂O → c Fe₃O₄ + d H₂, what are the values of (a, b, c, d)?',
      options: ['(3, 4, 1, 4)', '(2, 3, 1, 3)', '(3, 2, 1, 2)', '(1, 4, 1, 4)'],
      correctIndex: 0,
      explanation: '3Fe + 4H₂O → Fe₃O₄ + 4H₂ balances 3 Fe, 8 H, and 4 O on both sides.',
    },
  },
  {
    id: 'm-trigonometry-ratios',
    subject: 'Mathematics',
    chapter: 'Introduction to Trigonometry',
    title: 'Trigonometric Ratios & Standard Angles',
    durationMin: 5,
    summary:
      'Connect right-triangle side ratios to heights and distances problems using 0°, 30°, 45°, 60°, and 90° tables.',
    keyFormula: 'sin²θ + cos²θ = 1   |   1 + tan²θ = sec²θ   |   1 + cot²θ = cosec²θ',
    conceptSteps: [
      {
        heading: 'Identify Opposite & Adjacent Relative to θ',
        detail:
          'The hypotenuse is fixed opposite 90°. Opposite and adjacent swap depending on which acute angle θ is referenced.',
      },
      {
        heading: 'Zero-Memorization Table Pattern',
        detail:
          'For sin θ at 0°, 30°, 45°, 60°, 90°, compute √(0/4), √(1/4), √(2/4), √(3/4), √(4/4). Reverse the sequence for cos θ.',
      },
      {
        heading: 'Angle of Elevation vs Depression',
        detail:
          'Both angles are measured from the horizontal line of sight, never from the vertical pole or wall.',
      },
    ],
    checkpoint: {
      question: 'If sin A = 3/5 for an acute angle A, what is the value of tan A?',
      options: ['4/5', '3/4', '4/3', '5/3'],
      correctIndex: 1,
      explanation: 'With opposite = 3 and hypotenuse = 5, adjacent = √(5² − 3²) = 4. Thus tan A = 3/4.',
    },
  },
  {
    id: 'm-life-processes',
    subject: 'Biology',
    chapter: 'Life Processes',
    title: 'Double Circulation & Nephron Filtration',
    durationMin: 5,
    summary:
      'Trace oxygenated vs deoxygenated blood pathways across the four heart chambers and urine formation in nephrons.',
    keyFormula: 'Pulmonary Circuit (Right Ventricle → Lungs → Left Atrium) | Systemic Circuit (Left Ventricle → Body)',
    conceptSteps: [
      {
        heading: 'Why Double Circulation Matters',
        detail:
          'Complete separation of the left and right sides of the human heart prevents mixing of oxygenated and deoxygenated blood, supporting high metabolic energy needs.',
      },
      {
        heading: 'Thick Ventricular Walls',
        detail:
          'The left ventricle has the thickest muscular wall because it pumps blood at high pressure to the entire systemic body.',
      },
      {
        heading: 'Selective Reabsorption in Nephrons',
        detail:
          'Bowman’s capsule filters water, glucose, amino acids, and urea; useful glucose and amino acids are selectively reabsorbed along the renal tubule.',
      },
    ],
    checkpoint: {
      question: 'Which blood vessel carries oxygenated blood from the lungs to the left atrium?',
      options: ['Pulmonary artery', 'Pulmonary vein', 'Vena cava', 'Aorta'],
      correctIndex: 1,
      explanation:
        'Pulmonary veins are the only veins in the systemic-pulmonary circuit carrying oxygenated blood from lungs into the left atrium.',
    },
  },
];

export const TENTH_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q10-1',
    subject: 'Science',
    topic: 'Electricity',
    difficulty: 'Foundation',
    question: 'Two resistors of 6 Ω and 3 Ω are connected in parallel. What is their equivalent resistance?',
    options: ['9 Ω', '4.5 Ω', '2 Ω', '1.5 Ω'],
    correctIndex: 2,
    explanation: '1/Rp = 1/6 + 1/3 = 3/6 = 1/2, hence Rp = 2 Ω.',
  },
  {
    id: 'q10-2',
    subject: 'Mathematics',
    topic: 'Arithmetic Progressions',
    difficulty: 'Standard',
    question: 'What is the 10th term of the arithmetic progression 2, 7, 12, ...?',
    options: ['42', '47', '52', '45'],
    correctIndex: 1,
    explanation: 'a = 2, d = 5. a₁₀ = a + 9d = 2 + 9(5) = 47.',
  },
  {
    id: 'q10-3',
    subject: 'Science',
    topic: 'Acids, Bases & Salts',
    difficulty: 'Foundation',
    question: 'A solution turns red litmus blue. Its pH is likely to be:',
    options: ['1', '4', '5', '10'],
    correctIndex: 3,
    explanation: 'Bases turn red litmus blue and have pH values above 7 (here pH = 10).',
  },
  {
    id: 'q10-4',
    subject: 'Mathematics',
    topic: 'Coordinate Geometry',
    difficulty: 'Standard',
    question: 'What is the distance between the points A(3, 4) and the origin O(0, 0)?',
    options: ['7 units', '5 units', '√7 units', '25 units'],
    correctIndex: 1,
    explanation: 'd = √((3 − 0)² + (4 − 0)²) = √(9 + 16) = √25 = 5 units.',
  },
  {
    id: 'q10-5',
    subject: 'Science',
    topic: 'Light: Reflection & Refraction',
    difficulty: 'Challenge',
    question: 'A convex lens has a focal length of 25 cm. What is its optical power in dioptres?',
    options: ['+0.04 D', '+4.0 D', '−4.0 D', '+2.5 D'],
    correctIndex: 1,
    explanation: 'f = +25 cm = +0.25 m. Power P = 1 / f(m) = 1 / 0.25 = +4.0 D.',
  },
  {
    id: 'q10-6',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    difficulty: 'Standard',
    question: 'Evaluate: 2 tan²(45°) + cos²(30°) − sin²(60°)',
    options: ['0', '1', '2', '3/2'],
    correctIndex: 2,
    explanation: 'tan 45° = 1; cos 30° = √3/2 and sin 60° = √3/2 cancel out. So 2(1)² + 0 = 2.',
  },
  {
    id: 'q10-7',
    subject: 'Science',
    topic: 'Carbon & Its Compounds',
    difficulty: 'Challenge',
    question: 'How many covalent bonds are present in a molecule of ethane (C₂H₆)?',
    options: ['6 covalent bonds', '7 covalent bonds', '8 covalent bonds', '9 covalent bonds'],
    correctIndex: 1,
    explanation: 'Ethane has 1 C–C single bond and 6 C–H single bonds, making 7 covalent bonds total.',
  },
  {
    id: 'q10-8',
    subject: 'Mathematics',
    topic: 'Triangles & Similarity',
    difficulty: 'Challenge',
    question:
      'If ΔABC ~ ΔPQR and area(ΔABC) = 64 cm², area(ΔPQR) = 121 cm², and QR = 15.4 cm, find BC.',
    options: ['11.2 cm', '12.4 cm', '10.8 cm', '14.0 cm'],
    correctIndex: 0,
    explanation:
      '(BC / QR)² = 64 / 121 ⇒ BC / 15.4 = 8 / 11 ⇒ BC = (8 × 15.4) / 11 = 11.2 cm.',
  },
];

export const TENTH_BOARD_PAPERS: BoardPaper[] = [
  {
    id: 'bp-cbse-math-2025',
    board: 'CBSE',
    year: 2025,
    subject: 'Mathematics',
    title: 'CBSE Class 10 Mathematics (Standard) — Set 1',
    durationMin: 180,
    maxMarks: 80,
    sections: [
      {
        sectionName: 'Section A — Objective & Short Reasoning',
        instructions: 'Answer all questions showing brief justification.',
        questions: [
          {
            qNo: 'Q1',
            marks: 2,
            prompt: 'Find the HCF and LCM of 96 and 404 by the prime factorisation method.',
            markingScheme: '0.5m prime factors of 96 & 404 · 0.5m HCF · 1m LCM formula verification',
            modelAnswer:
              '96 = 2⁵ × 3 and 404 = 2² × 101. Common smallest power: HCF = 2² = 4. LCM = (96 × 404) / 4 = 96 × 101 = 9696.',
          },
          {
            qNo: 'Q2',
            marks: 3,
            prompt:
              'Prove that √3 is an irrational number, given that if a prime p divides a², then p divides a.',
            markingScheme: '1m contradiction assumption · 1m squaring & divisibility · 1m contradiction conclusion',
            modelAnswer:
              'Assume √3 = a/b with coprime integers a, b (b ≠ 0). Squaring gives 3b² = a², so 3 divides a² and hence 3 divides a. Set a = 3c ⇒ 3b² = 9c² ⇒ b² = 3c², so 3 divides b. This contradicts coprimality of a and b; therefore √3 is irrational.',
          },
        ],
      },
      {
        sectionName: 'Section B — Long Answer Problem Solving',
        instructions: 'Show complete algebraic steps and geometric diagrams where applicable.',
        questions: [
          {
            qNo: 'Q3',
            marks: 5,
            prompt:
              'A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. Find the speed of the train.',
            markingScheme: '1m variable setup · 1.5m quadratic formation · 1.5m solving · 1m discarding negative root',
            modelAnswer:
              'Let speed = x km/h. 360/x − 360/(x + 5) = 1 ⇒ 360(5) = x(x + 5) ⇒ x² + 5x − 1800 = 0 ⇒ (x + 45)(x − 40) = 0. Since speed > 0, x = 40 km/h.',
          },
        ],
      },
    ],
  },
  {
    id: 'bp-ssc-sci-2024',
    board: 'State SSC',
    year: 2024,
    subject: 'Physical Science',
    title: 'State SSC Class 10 Physical Science — Paper I',
    durationMin: 165,
    maxMarks: 50,
    sections: [
      {
        sectionName: 'Part A — Conceptual & Numerical',
        instructions: 'Include SI units and ray/circuit sketches where asked.',
        questions: [
          {
            qNo: 'Q1',
            marks: 2,
            prompt:
              'Why do we apply paint on iron articles, and how does galvanization offer superior protection?',
            markingScheme: '1m moisture/oxygen barrier explanation · 1m sacrificial zinc coating note',
            modelAnswer:
              'Paint isolates iron from atmospheric oxygen and moisture to prevent rusting (Fe₂O₃·xH₂O). Galvanization coats iron with zinc; even if scratched, more reactive zinc oxidizes preferentially to protect iron.',
          },
          {
            qNo: 'Q2',
            marks: 4,
            prompt:
              'An object 4 cm high is placed at 25 cm in front of a concave mirror of focal length 15 cm. Find the position, nature, and height of the image.',
            markingScheme: '1m sign convention · 1.5m mirror formula · 1.5m magnification & nature',
            modelAnswer:
              'u = −25 cm, f = −15 cm, h = +4 cm. 1/v = 1/f − 1/u = −1/15 + 1/25 = −2/75 ⇒ v = −37.5 cm (in front of mirror). m = −v/u = −(−37.5)/(−25) = −1.5. h′ = m × h = −6.0 cm. Image is real, inverted, and enlarged.',
          },
        ],
      },
    ],
  },
  {
    id: 'bp-icse-bio-2024',
    board: 'ICSE',
    year: 2024,
    subject: 'Biology',
    title: 'ICSE Class 10 Biology — Science Paper 3',
    durationMin: 120,
    maxMarks: 80,
    sections: [
      {
        sectionName: 'Section I — Compulsory Short Answers',
        instructions: 'Use exact biological terminology.',
        questions: [
          {
            qNo: 'Q1',
            marks: 3,
            prompt:
              'State three structural adaptations in leaves that maximize the rate of photosynthesis.',
            markingScheme: '1m per valid structural adaptation with functional reason',
            modelAnswer:
              '(1) Large flat surface area maximizes light absorption. (2) Thin lamina reduces diffusion distance for CO₂. (3) Dense upper palisade mesophyll packed with chloroplasts directly beneath transparent epidermis.',
          },
        ],
      },
    ],
  },
  {
    id: 'bp-cbse-sci-2023',
    board: 'CBSE',
    year: 2023,
    subject: 'Physical Science',
    title: 'CBSE Class 10 Science — Board Question Paper',
    durationMin: 180,
    maxMarks: 80,
    sections: [
      {
        sectionName: 'Section C — Numerical & Case Study',
        instructions: 'Show step-by-step substitution.',
        questions: [
          {
            qNo: 'Q1',
            marks: 3,
            prompt:
              'Three resistors of 5 Ω, 10 Ω, and 30 Ω are connected in parallel across a 12 V battery. Calculate total current and total effective resistance.',
            markingScheme: '1m parallel formula · 1m effective R · 1m total current',
            modelAnswer:
              '1/Rp = 1/5 + 1/10 + 1/30 = (6 + 3 + 1)/30 = 10/30 = 1/3 ⇒ Rp = 3 Ω. Total current I = V / Rp = 12 / 3 = 4 A.',
          },
        ],
      },
    ],
  },
];

export const TENTH_STEP_SOLUTIONS: StepSolutionProblem[] = [
  {
    id: 'sol-lens-numerical',
    subject: 'Physics',
    chapter: 'Light: Reflection & Refraction',
    title: 'Convex Lens Image Distance & Magnification',
    problemStatement:
      'A 5 cm tall object is placed perpendicular to the principal axis of a convex lens of focal length 10 cm. The distance of the object from the lens is 15 cm. Find the position, nature, and size of the image.',
    hint: 'Remember: for a convex lens, focal length f is positive (+10 cm) and object distance u is negative (−15 cm). Use 1/f = 1/v − 1/u.',
    steps: [
      {
        label: 'Step 1 · Extract Given Data with Sign Convention',
        expression: 'h = +5 cm,   f = +10 cm,   u = −15 cm',
        explanation:
          'Object stands upright above the principal axis (+5 cm) and to the left of the optical center (−15 cm). Convex lens converges parallel rays to a real focus (+10 cm).',
      },
      {
        label: 'Step 2 · Apply the Thin Lens Formula',
        expression: '1/v = 1/f + 1/u = 1/10 + 1/(−15)',
        explanation: 'Rearrange 1/f = 1/v − 1/u to isolate 1/v before substituting signed values.',
      },
      {
        label: 'Step 3 · Compute Image Distance v',
        expression: '1/v = (3 − 2) / 30 = 1 / 30   ⇒   v = +30 cm',
        explanation:
          'Positive v indicates the image forms 30 cm on the opposite side (right) of the lens, hence it is a real image.',
      },
      {
        label: 'Step 4 · Calculate Magnification & Image Height',
        expression: 'm = v / u = 30 / (−15) = −2   ⇒   h′ = m × h = −2 × 5 = −10 cm',
        explanation:
          'Negative magnification confirms the image is inverted; magnitude 2 means the image is twice as tall (10 cm).',
      },
    ],
    finalAnswer: 'Image at +30 cm (other side), Real & Inverted, Height = 10 cm.',
  },
  {
    id: 'sol-quad-boat',
    subject: 'Mathematics',
    chapter: 'Quadratic Equations',
    title: 'Motorboat Upstream & Downstream Speed',
    problemStatement:
      'A motorboat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than to return downstream to the same spot. Find the speed of the stream.',
    hint: 'Upstream speed is (18 − x) km/h and downstream speed is (18 + x) km/h. Equate T_upstream − T_downstream = 1.',
    steps: [
      {
        label: 'Step 1 · Define Variable & Relative Speeds',
        expression: 'Let stream speed = x km/h (0 < x < 18).   v_up = 18 − x,   v_down = 18 + x',
        explanation:
          'Moving against the current reduces net speed; moving with the current adds the stream speed.',
      },
      {
        label: 'Step 2 · Set Up Time Difference Equation',
        expression: '24 / (18 − x) − 24 / (18 + x) = 1',
        explanation: 'Time = Distance / Speed, and upstream travel takes 1 hour longer.',
      },
      {
        label: 'Step 3 · Clear Denominators into Standard Quadratic',
        expression: '24[(18 + x) − (18 − x)] = (18 − x)(18 + x)   ⇒   48x = 324 − x²',
        explanation: 'Simplify numerator 24(2x) = 48x and apply difference of squares (a−b)(a+b) = a² − b².',
      },
      {
        label: 'Step 4 · Factorize and Select Valid Physical Root',
        expression: 'x² + 48x − 324 = 0   ⇒   (x + 54)(x − 6) = 0   ⇒   x = 6',
        explanation: 'Reject x = −54 because speed cannot be negative.',
      },
    ],
    finalAnswer: 'Speed of the stream = 6 km/h.',
  },
  {
    id: 'sol-trig-identity',
    subject: 'Mathematics',
    chapter: 'Introduction to Trigonometry',
    title: 'Proving Secant-Tangent Identity Fraction',
    problemStatement:
      'Prove that (sin θ − 2 sin³θ) / (2 cos³θ − cos θ) = tan θ.',
    hint: 'Factor out sin θ from the numerator and cos θ from the denominator, then rewrite cos²θ in terms of sin²θ.',
    steps: [
      {
        label: 'Step 1 · Factor Common Terms in LHS',
        expression: 'LHS = [sin θ (1 − 2 sin²θ)] / [cos θ (2 cos²θ − 1)]',
        explanation: 'Separating sin θ / cos θ immediately isolates tan θ.',
      },
      {
        label: 'Step 2 · Substitute Pythagorean Identity',
        expression: 'cos²θ = 1 − sin²θ',
        explanation: 'Express the denominator bracket purely in terms of sin²θ so factors match.',
      },
      {
        label: 'Step 3 · Simplify Denominator Bracket',
        expression: '2 cos²θ − 1 = 2(1 − sin²θ) − 1 = 2 − 2 sin²θ − 1 = 1 − 2 sin²θ',
        explanation: 'The denominator polynomial matches (1 − 2 sin²θ) in the numerator.',
      },
      {
        label: 'Step 4 · Cancel Common Factor',
        expression: 'LHS = (sin θ / cos θ) × [(1 − 2 sin²θ) / (1 − 2 sin²θ)] = tan θ = RHS',
        explanation: 'Valid wherever 2 cos³θ − cos θ ≠ 0.',
      },
    ],
    finalAnswer: 'Identity verified: LHS = tan θ = RHS.',
  },
  {
    id: 'sol-chem-stoich',
    subject: 'Chemistry',
    chapter: 'Chemical Reactions & Equations',
    title: 'Thermite Reaction Balancing & Redox Analysis',
    problemStatement:
      'Balance the thermite reaction Fe₂O₃(s) + Al(s) → Fe(l) + Al₂O₃(s) and identify the oxidized substance, reduced substance, and oxidizing agent.',
    hint: 'Compare oxygen counts on Fe₂O₃ and Al₂O₃ first, then balance Fe and Al atoms.',
    steps: [
      {
        label: 'Step 1 · Compare Oxygen Atoms',
        expression: 'Reactant Fe₂O₃ has 3 O; Product Al₂O₃ has 3 O',
        explanation: 'Oxygen is already balanced with coefficient 1 on both oxides.',
      },
      {
        label: 'Step 2 · Balance Iron and Aluminium Metals',
        expression: 'Fe₂O₃(s) + 2 Al(s) → 2 Fe(l) + Al₂O₃(s)',
        explanation: 'Left side has 2 Fe, so place 2 before Fe. Right side has 2 Al, so place 2 before Al.',
      },
      {
        label: 'Step 3 · Assign Oxidation vs Reduction',
        expression: 'Al → Al₂O₃ (gains oxygen = Oxidized)   |   Fe₂O₃ → Fe (loses oxygen = Reduced)',
        explanation: 'Aluminium removes oxygen from iron(III) oxide, releasing intense exothermic heat used to weld railway tracks.',
      },
    ],
    finalAnswer: 'Fe₂O₃ + 2Al → 2Fe + Al₂O₃; Al is oxidized, Fe₂O₃ is reduced (oxidizing agent).',
  },
];
