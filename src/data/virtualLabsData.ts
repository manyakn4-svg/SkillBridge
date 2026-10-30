import { EngineeringBranch, VirtualLabExperiment } from '../types';

export const virtualLabExperiments: VirtualLabExperiment[] = [
  // ==========================================================================
  // CSE – Computer Science & Engineering
  // ==========================================================================
  {
    id: 'cse-lab-1',
    branch: 'CSE',
    labName: 'Data Structures Lab',
    experimentTitle: 'Stack and Queue Operations & Memory Simulation',
    objective: 'Implement and visualize Last-In-First-Out (LIFO) Stack operations (Push, Pop, Peek) and First-In-First-Out (FIFO) Queue operations with overflow/underflow handling.',
    theory: `A Stack is a linear data structure that follows the LIFO (Last In First Out) principle. Elements can only be added or removed from the top pointer.
Key operations:
1. Push(x): Inserts element x at the top. Time complexity: O(1).
2. Pop(): Removes and returns the top element. Time complexity: O(1).
3. Peek(): Returns the top element without removing it.

A Queue is a FIFO (First In First Out) structure where insertions happen at the Rear and deletions happen at the Front.
Applications: Function call call-stack recursion, undo/redo buffers, browser history, BFS graph traversal, printer queues.`,
    requiredTools: ['GCC Compiler / Java JDK', 'Interactive Memory Simulator', 'VS Code'],
    procedure: [
      'Initialize an array of maximum capacity (e.g. Max Size = 6).',
      'Set top pointer = -1 for Stack, and front = 0, rear = -1 for Queue.',
      'Check for Stack Overflow before pushing a new value (top == Max - 1).',
      'Observe element insertion at the top index and state updates.',
      'Perform Pop() and verify that the most recently inserted item is removed.',
      'Perform Queue Enqueue and Dequeue and compare FIFO vs LIFO memory behaviors.'
    ],
    simType: 'stack-queue',
    defaultInputs: { maxSize: 6, initialElements: [10, 25, 42] },
    observationsGuide: 'Observe pointer transitions (Top, Front, Rear). Note how pop() always ejects the topmost item whereas queue dequeue() removes the oldest item.',
    conclusionGuide: 'Successfully demonstrated LIFO and FIFO dynamic memory access. Stack is ideal for backtracking while Queue is optimal for sequential scheduling.',
    mcqs: [
      {
        id: 'cse-q1',
        question: 'Which condition signifies Stack Underflow in an array-based implementation?',
        options: ['top == -1', 'top == MAX - 1', 'top == 0', 'top == NULL'],
        correctIndex: 0,
        explanation: 'When top == -1, the stack contains no elements, so any pop operation results in Stack Underflow.'
      },
      {
        id: 'cse-q2',
        question: 'What is the time complexity of pushing an element onto an array stack?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        correctIndex: 0,
        explanation: 'Push operation directly accesses the next index via the top pointer, making it constant O(1) time.'
      },
      {
        id: 'cse-q3',
        question: 'Which of the following computer systems applications primarily uses a FIFO queue?',
        options: ['CPU printer spooler scheduling', 'Expression syntax parsing', 'Undo operation in text editor', 'Recursive call stack'],
        correctIndex: 0,
        explanation: 'Print spooling and CPU job queues service jobs in the order they arrived (FIFO).'
      }
    ]
  },
  {
    id: 'cse-lab-2',
    branch: 'CSE',
    labName: 'Data Structures Lab',
    experimentTitle: 'Array Operations & Sorting Algorithm Visualizer',
    objective: 'Analyze and visually compare Bubble Sort, Selection Sort, and Binary Search algorithms on dynamic integer arrays.',
    theory: `Sorting rearranges array elements in ascending or descending sequence.
- Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if in the wrong order. Worst-case time: O(n^2), Best-case (already sorted): O(n).
- Binary Search works on sorted arrays by repeatedly dividing the search interval in half. Time complexity: O(log n).`,
    requiredTools: ['C/C++ runtime', 'Visual Array Inspector', 'Performance Profiler'],
    procedure: [
      'Generate a random or custom array of 6 to 10 integer bars.',
      'Step through the Bubble Sort pass by pass to watch adjacent comparisons.',
      'Observe the largest element bubbling up to the rightmost index in each pass.',
      'Run Binary Search on the sorted array to find a target value in O(log n) steps.'
    ],
    simType: 'array-sort',
    defaultInputs: { array: [45, 12, 89, 34, 7, 63, 22] },
    observationsGuide: 'Notice the number of swaps versus comparisons in each pass. Note how after pass k, the last k elements are guaranteed sorted.',
    conclusionGuide: 'Bubble Sort has simple logic but quadratic complexity O(n^2), while binary search yields logarithmic O(log n) efficiency on sorted arrays.',
    mcqs: [
      {
        id: 'cse-q4',
        question: 'What is the average and worst-case time complexity of Bubble Sort?',
        options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(1)'],
        correctIndex: 0,
        explanation: 'With nested comparison loops, bubble sort requires n*(n-1)/2 comparisons, resulting in O(n^2).'
      },
      {
        id: 'cse-q5',
        question: 'What prerequisite is required before executing Binary Search?',
        options: ['The array must be sorted', 'The array must contain unique numbers only', 'The size must be a power of 2', 'Elements must be positive integers'],
        correctIndex: 0,
        explanation: 'Binary search requires elements to be in sorted ascending or descending order.'
      }
    ]
  },
  {
    id: 'cse-lab-3',
    branch: 'CSE',
    labName: 'C Programming Lab',
    experimentTitle: 'Dynamic Memory Allocation and Pointer Arithmetic',
    objective: 'Implement dynamic memory management using malloc(), calloc(), realloc(), and free() to prevent memory leaks and dangling pointers.',
    theory: `In C, dynamic memory is allocated on the Heap at runtime:
- malloc(size_t size): Allocates uninitialized memory block.
- calloc(size_t num, size_t size): Allocates and zero-initializes memory.
- realloc(void *ptr, size_t new_size): Resizes previously allocated memory.
- free(void *ptr): Deallocates heap memory back to the operating system.`,
    requiredTools: ['Valgrind Memory Leak Checker', 'GCC / Clang', 'GDB Debugger'],
    procedure: [
      'Allocate memory for n integers using int *arr = (int*)malloc(n * sizeof(int)).',
      'Verify whether the pointer returned is NULL (allocation failure check).',
      'Populate elements and compute aggregate statistics.',
      'Resize the array dynamically using realloc() to accommodate more items.',
      'Free the allocated heap block using free(arr) and assign arr = NULL to avoid dangling pointers.'
    ],
    simType: 'guided-code',
    defaultInputs: { arraySize: 5 },
    observationsGuide: 'Check pointers returned before and after realloc. Note that realloc may copy data to a new heap address if the current block cannot expand in place.',
    conclusionGuide: 'Dynamic allocation allows flexible memory utilization at runtime. Always invoke free() to prevent memory leaks.',
    mcqs: [
      {
        id: 'cse-q6',
        question: 'What does malloc() return if memory allocation fails?',
        options: ['NULL', '0', '-1', 'Void'],
        correctIndex: 0,
        explanation: 'malloc returns a NULL pointer when sufficient heap memory cannot be allocated.'
      }
    ]
  },
  {
    id: 'cse-lab-4',
    branch: 'CSE',
    labName: 'DBMS Lab',
    experimentTitle: 'Relational Schema Design & SQL Query Optimization',
    objective: 'Design a normalized 3NF relational database schema, define Primary/Foreign keys, and formulate complex JOIN queries.',
    theory: `A Relational Database stores structured data in tables linked through relationships.
Normal Forms eliminate redundancy:
- 1NF: Atomic values, no repeating groups.
- 2NF: 1NF + no partial dependency on a composite key.
- 3NF: 2NF + no transitive dependency (non-key attributes depend only on primary key).
JOIN types: INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN, and FULL JOIN.`,
    requiredTools: ['PostgreSQL / SQLite / MySQL Engine', 'DBeaver / pgAdmin'],
    procedure: [
      'Create Students, Courses, and Enrollments tables with Foreign Key constraints.',
      'Insert sample normalized records.',
      'Execute INNER JOIN to retrieve student course enrollments.',
      'Analyze query execution plan using EXPLAIN ANALYZE.'
    ],
    simType: 'guided-code',
    defaultInputs: {},
    observationsGuide: 'Verify referential integrity constraints when deleting a referenced row without ON DELETE CASCADE.',
    conclusionGuide: 'Normalized schemas prevent insert, update, and deletion anomalies while maintaining ACID properties.',
    mcqs: [
      {
        id: 'cse-q7',
        question: 'Which normal form eliminates transitive dependency?',
        options: ['Third Normal Form (3NF)', 'First Normal Form (1NF)', 'Second Normal Form (2NF)', 'BCNF'],
        correctIndex: 0,
        explanation: '3NF requires that no non-prime attribute is transitively dependent on the primary key.'
      }
    ]
  },
  {
    id: 'cse-lab-5',
    branch: 'CSE',
    labName: 'Operating Systems Lab',
    experimentTitle: 'CPU Process Scheduling: FCFS and Round Robin',
    objective: 'Simulate CPU process scheduling algorithms (First-Come First-Served and Round Robin with Time Quantum) and calculate Turnaround and Waiting times.',
    theory: `CPU Scheduling is the process of selecting which ready process executes on the CPU core.
Metrics:
- Waiting Time (WT) = Turnaround Time - Burst Time
- Turnaround Time (TAT) = Completion Time - Arrival Time
- Round Robin (RR) allocates a fixed time quantum q to each ready process in circular order, ensuring fair time sharing and preventing starvation.`,
    requiredTools: ['OS Simulator', 'C/Python Runtime', 'Gantt Chart Visualizer'],
    procedure: [
      'Input process arrival times (AT) and burst times (BT).',
      'Set time quantum q = 2ms for Round Robin scheduling.',
      'Construct Gantt chart and log context switches.',
      'Calculate average Waiting Time and average Turnaround Time.'
    ],
    simType: 'guided-code',
    defaultInputs: { quantum: 2 },
    observationsGuide: 'Notice that small time quanta decrease response time for interactive jobs but increase context-switching overhead.',
    conclusionGuide: 'Round Robin is preemptive and well suited for time-sharing systems, while FCFS is non-preemptive and prone to the convoy effect.',
    mcqs: [
      {
        id: 'cse-q8',
        question: 'Which scheduling algorithm can cause the "convoy effect"?',
        options: ['FCFS', 'Round Robin', 'SJF Preemptive', 'Priority Scheduling'],
        correctIndex: 0,
        explanation: 'In FCFS, when a long CPU-burst process arrives first, all short processes behind it are delayed, creating a convoy effect.'
      }
    ]
  },

  // ==========================================================================
  // ECE – Electronics & Communication Engineering
  // ==========================================================================
  {
    id: 'ece-lab-1',
    branch: 'ECE',
    labName: 'Logic Gates Lab',
    experimentTitle: 'Verification of Basic and Universal Logic Gates',
    objective: 'Verify the truth tables of AND, OR, NOT, NAND, NOR, XOR, and XNOR digital gates and demonstrate NAND/NOR universal gate synthesis.',
    theory: `Digital logic gates are the fundamental building blocks of digital integrated circuits.
Boolean operations:
- AND: Y = A · B (Output 1 only when all inputs are 1)
- OR: Y = A + B (Output 1 when any input is 1)
- NOT: Y = A' (Inverts input)
- NAND: Y = (A · B)' (Universal gate; can synthesize AND, OR, NOT)
- NOR: Y = (A + B)' (Universal gate)
- XOR: Y = A ⊕ B = A'B + AB' (Output 1 when inputs differ)
- XNOR: Y = (A ⊕ B)' (Output 1 when inputs are equal)`,
    requiredTools: ['Digital ICs (7408, 7432, 7404, 7400, 7402, 7486)', 'Breadboard & 5V DC Supply', 'LED Indicators & Logic Switches'],
    procedure: [
      'Select a logic gate from the selector.',
      'Toggle input switches A and B between binary states 0 (GND) and 1 (+5V).',
      'Observe the output logic level on the LED indicator.',
      'Verify the observed output against the theoretical truth table.',
      'Test NAND universality by verifying synthesized NOT and AND configurations.'
    ],
    simType: 'logic-gates',
    defaultInputs: { gate: 'AND', inputA: 1, inputB: 1 },
    observationsGuide: 'Verify that NAND gate output is low only when both inputs are high. Test XOR gate to see that output is high only on parity difference.',
    conclusionGuide: 'All basic and universal logic gates verified successfully according to Boolean postulates.',
    mcqs: [
      {
        id: 'ece-q1',
        question: 'Why are NAND and NOR gates called Universal Gates?',
        options: [
          'Any Boolean function can be implemented using only NAND or only NOR gates',
          'They operate at universal voltage levels',
          'They have infinite fan-out',
          'They never consume static power'
        ],
        correctIndex: 0,
        explanation: 'Universal gates can reproduce the behavior of NOT, AND, and OR gates, meaning complete digital systems can be constructed exclusively with them.'
      },
      {
        id: 'ece-q2',
        question: 'For an XOR gate with inputs A=1 and B=1, what is the output Y?',
        options: ['0', '1', 'High Impedance', 'Undefined'],
        correctIndex: 0,
        explanation: 'XOR outputs 1 when inputs are dissimilar. When A=1 and B=1, output Y = 1 ⊕ 1 = 0.'
      }
    ]
  },
  {
    id: 'ece-lab-2',
    branch: 'ECE',
    labName: 'Circuit Simulation Lab',
    experimentTitle: 'Ohm’s Law and Kirchhoff’s Circuit Laws Verification',
    objective: 'Measure voltage, current, and resistance in DC resistive circuits to experimentally verify Ohm’s Law and Kirchhoff’s Voltage Law (KVL).',
    theory: `Ohm’s Law states that current I through a conductor between two points is directly proportional to voltage V across the two points and inversely proportional to resistance R:
V = I · R  =>  I = V / R,  P = V · I = I^2 · R
Kirchhoff's Voltage Law (KVL): The algebraic sum of all voltages around any closed loop in a circuit must equal zero: Σ V_drop = Σ V_source.`,
    requiredTools: ['Variable DC Power Supply (0-30V)', 'Digital Multimeter (DMM)', 'Precision Resistors (100Ω to 10kΩ)', 'Breadboard'],
    procedure: [
      'Connect a DC voltage source across a known resistor R.',
      'Vary the supply voltage from 1V to 24V using the slider.',
      'Record current I in milliamps on the virtual ammeter.',
      'Plot V vs I and observe the linear slope representing resistance R.',
      'Calculate power dissipation P = V * I and verify tolerance ratings.'
    ],
    simType: 'ohms-circuit',
    defaultInputs: { voltage: 12, resistance: 220 },
    observationsGuide: 'Observe how doubling the voltage doubles the current proportionally. Note how high resistance attenuates current.',
    conclusionGuide: 'The linear relationship between voltage and current confirms Ohm’s Law. Circuit power dissipation increases with the square of voltage.',
    mcqs: [
      {
        id: 'ece-q3',
        question: 'If voltage is 12V and resistance is 400Ω, what is the current in mA?',
        options: ['30 mA', '300 mA', '3 mA', '48 mA'],
        correctIndex: 0,
        explanation: 'I = V / R = 12 / 400 = 0.03 A = 30 mA.'
      }
    ]
  },

  // ==========================================================================
  // EEE – Electrical & Electronics Engineering
  // ==========================================================================
  {
    id: 'eee-lab-1',
    branch: 'EEE',
    labName: 'Electrical Circuits Lab',
    experimentTitle: 'DC Circuit Analysis & Maximum Power Transfer Theorem',
    objective: 'Demonstrate Maximum Power Transfer Theorem in DC networks: maximum power is delivered to the load when load resistance equals Thevenin source resistance.',
    theory: `Maximum Power Transfer Theorem states that maximum power is transferred from a source with internal resistance R_th to a variable load R_L when:
R_L = R_th
At this matched condition:
P_max = (V_th^2) / (4 · R_th)
Efficiency at maximum power transfer is 50%, with the remaining 50% dissipated across the source internal resistance.`,
    requiredTools: ['DC Power Supply', 'Decade Resistance Box', 'Precision Voltmeter and Ammeter', 'Wattmeter'],
    procedure: [
      'Construct a circuit with source voltage V = 20V and internal resistance R_s = 50Ω.',
      'Vary load resistance R_L from 10Ω to 200Ω.',
      'For each step, measure current I_L and load voltage V_L.',
      'Calculate load power P_L = (I_L)^2 * R_L.',
      'Identify the peak of the power curve and verify that it occurs at R_L = R_s.'
    ],
    simType: 'ohms-circuit',
    defaultInputs: { voltage: 20, resistance: 50 },
    observationsGuide: 'Notice that load power increases as R_L approaches R_s, peaks at R_L = R_s, and declines for R_L > R_s.',
    conclusionGuide: 'Maximum Power Transfer Theorem verified. Vital in communications and RF amplifier matching, while power distribution seeks high efficiency rather than maximum transfer.',
    mcqs: [
      {
        id: 'eee-q1',
        question: 'Under maximum power transfer condition, what is the transmission efficiency?',
        options: ['50%', '100%', '75%', '25%'],
        correctIndex: 0,
        explanation: 'Since R_L = R_th, equal power is dissipated in both the source and load, resulting in exactly 50% efficiency.'
      }
    ]
  },

  // ==========================================================================
  // AI & DS – Artificial Intelligence & Data Science
  // ==========================================================================
  {
    id: 'aids-lab-1',
    branch: 'AI & DS',
    labName: 'Machine Learning Demonstrations',
    experimentTitle: 'Linear Regression and Gradient Descent Visualization',
    objective: 'Fit an optimal regression line y = mx + c to dynamic 2D data points by iteratively minimizing Mean Squared Error (MSE) loss using Gradient Descent.',
    theory: `Linear Regression models the relationship between dependent variable Y and independent feature X:
y_hat = w · x + b
Cost Function (Mean Squared Error):
MSE = (1/2n) · Σ (y_hat_i - y_i)^2
Optimization via Gradient Descent:
w := w - α · (∂MSE/∂w)
b := b - α · (∂MSE/∂b)
Where α is the learning rate. As iterations proceed, the regression line converges to minimize residual errors.`,
    requiredTools: ['NumPy / Scikit-Learn', 'Matplotlib / Canvas Interactive Chart', 'Jupyter Lab'],
    procedure: [
      'Inspect generated synthetic data points (X, Y).',
      'Adjust slope (weight w) and intercept (bias b) sliders.',
      'Observe real-time recalculation of Mean Squared Error (MSE) and best-fit line.',
      'Click "Run Gradient Descent Step" to observe automated convergence toward global minimum loss.'
    ],
    simType: 'linear-regression',
    defaultInputs: { slope: 1.2, intercept: 15, learningRate: 0.05 },
    observationsGuide: 'Watch how increasing learning rate too high causes loss oscillation or divergence, while optimal rate leads to smooth convex convergence.',
    conclusionGuide: 'Demonstrated gradient descent parameter tuning. Verified that optimal slope and intercept correspond to minimum Mean Squared Error.',
    mcqs: [
      {
        id: 'aids-q1',
        question: 'What happens in Gradient Descent if the learning rate is set excessively high?',
        options: [
          'The cost function may oscillate and diverge away from the minimum',
          'It always converges instantly in 1 step',
          'The model underfits automatically',
          'It converts into classification'
        ],
        correctIndex: 0,
        explanation: 'An overly large learning rate causes step overshoot across the valley of the cost curve, preventing convergence.'
      },
      {
        id: 'aids-q2',
        question: 'Which metric is standardly minimized in Ordinary Least Squares (OLS) regression?',
        options: ['Sum of squared residuals (MSE)', 'Absolute sum of inputs', 'Entropy', 'Gini Index'],
        correctIndex: 0,
        explanation: 'OLS minimizes the sum of squared differences between observed values and predictions.'
      }
    ]
  },

  // ==========================================================================
  // Mechanical Engineering
  // ==========================================================================
  {
    id: 'mech-lab-1',
    branch: 'Mechanical',
    labName: 'Engineering Mechanics Lab',
    experimentTitle: 'Simply Supported Beam Bending & Shear Force Analysis',
    objective: 'Calculate support reactions, construct Shear Force Diagram (SFD) and Bending Moment Diagram (BMD), and determine maximum bending stress for a simply supported beam.',
    theory: `For a simply supported beam of span L subjected to a concentrated point load W at distance 'a' from left support A:
Reactions:
R_A = W · (L - a) / L
R_B = W · a / L
Maximum Bending Moment occurs under the load:
M_max = W · a · (L - a) / L
Bending Stress from Euler-Bernoulli Beam Formula:
σ = (M · y) / I
Where I is the Area Moment of Inertia and y is the distance to the extreme neutral fiber.`,
    requiredTools: ['Beam Bending Apparatus', 'Dial Gauge Indicator', 'Calibrated Weights (10N - 200N)', 'Vernier Caliper'],
    procedure: [
      'Select beam length L (meters) and material (Steel or Aluminum).',
      'Apply concentrated load W (Newtons) at position x.',
      'Compute support reactions R_A and R_B from static equilibrium (ΣF_y = 0, ΣM = 0).',
      'Analyze live shear force distribution and bending moment curve.',
      'Locate section of zero shear and note that maximum bending moment coincides at this point.'
    ],
    simType: 'beam-deflection',
    defaultInputs: { spanLength: 5, loadMagnitude: 50, loadPosition: 2.5 },
    observationsGuide: 'Verify that when point load is centered (a = L/2), maximum bending moment equals (W·L)/4 and reactions are symmetric.',
    conclusionGuide: 'Static equilibrium laws and beam flexure theory confirmed. Zero shear crossing corresponds precisely to peak bending moment.',
    mcqs: [
      {
        id: 'mech-q1',
        question: 'For a simply supported beam with centered point load W and span L, what is the maximum bending moment?',
        options: ['(W · L) / 4', '(W · L) / 2', '(W · L^2) / 8', 'W · L'],
        correctIndex: 0,
        explanation: 'At midspan x = L/2, M_max = R_A * (L/2) = (W/2) * (L/2) = (W·L)/4.'
      }
    ]
  },

  // ==========================================================================
  // Civil Engineering
  // ==========================================================================
  {
    id: 'civil-lab-1',
    branch: 'Civil',
    labName: 'Concrete Technology Lab',
    experimentTitle: 'Concrete Mix Design & Compressive Strength Estimation',
    objective: 'Formulate standard concrete mix proportions (M20, M25, M30 grades according to IS 10262) and calculate cement, sand, coarse aggregate, and water quantities.',
    theory: `Concrete compressive strength depends predominantly on the Water-Cement (w/c) ratio (Abram’s Law).
Standard nominal grades:
- M20: Characteristic strength 20 N/mm² at 28 days (Nominal ratio approx 1 : 1.5 : 3)
- M25: Characteristic strength 25 N/mm² at 28 days (Nominal ratio approx 1 : 1 : 2)
- M30: Design mix with target mean strength f_ck' = f_ck + 1.65 · s
Lower w/c ratio increases compressive durability and strength, provided adequate compaction is achieved.`,
    requiredTools: ['Concrete Compression Testing Machine (CTM)', 'Moulds (150mm cubes)', 'Tamping Rod & Slump Cone', 'Weigh Balance'],
    procedure: [
      'Select concrete design grade (M20, M25, or M30).',
      'Specify batch volume in cubic meters.',
      'Adjust water-cement ratio slider (typically 0.40 to 0.55).',
      'Calculate mass quantities of Cement, Fine Aggregate (Sand), and Coarse Aggregate.',
      'Inspect the 28-day estimated compressive strength curve and slump workability.'
    ],
    simType: 'concrete-mix',
    defaultInputs: { grade: 'M25', volumeM3: 1, waterCementRatio: 0.45 },
    observationsGuide: 'Observe the inverse relationship between water-cement ratio and compressive strength: lower water gives higher strength but lower slump workability.',
    conclusionGuide: 'Accurate mix proportioning ensures safety, durability, and cost-effectiveness in reinforced concrete structures.',
    mcqs: [
      {
        id: 'civil-q1',
        question: 'What is the standard cube size used for concrete compressive strength testing as per IS 516?',
        options: ['150 mm × 150 mm × 150 mm', '100 mm × 100 mm × 100 mm', '200 mm × 200 mm × 200 mm', '70.6 mm × 70.6 mm × 70.6 mm'],
        correctIndex: 0,
        explanation: 'Standard concrete specimens are 150mm cubes cured in water for 7 and 28 days prior to crushing.'
      }
    ]
  },
  {
    id: 'civil-lab-2',
    branch: 'Civil',
    labName: 'Structural Analysis Lab',
    experimentTitle: 'Simply Supported and Cantilever Beam Structural Deflection',
    objective: 'Simulate structural deflection profiles under various boundary conditions and verify Euler-Bernoulli flexural rigidity EI.',
    theory: `Deflection equation:
E · I · (d²y / dx²) = M(x)
For cantilever with point load P at free end: Max deflection δ = (P · L³) / (3 · E · I).
For simply supported beam with central load W: Max deflection δ = (W · L³) / (48 · E · I).`,
    requiredTools: ['Structural Deflection Frame', 'Dial Gauges', 'Weights'],
    procedure: [
      'Select boundary condition (Simply Supported or Cantilever).',
      'Apply load and monitor dial gauge displacement.',
      'Compare simulated deflection with theoretical Euler-Bernoulli formulas.'
    ],
    simType: 'beam-deflection',
    defaultInputs: { spanLength: 4, loadMagnitude: 40, loadPosition: 2 },
    observationsGuide: 'Observe that deflection is inversely proportional to modulus of elasticity E and second moment of area I.',
    conclusionGuide: 'Verified flexural rigidity relationships. Section depth contributes cubically to deflection resistance (I = b·d³/12).',
    mcqs: [
      {
        id: 'civil-q2',
        question: 'How does doubling the beam depth d affect its Moment of Inertia for a rectangular section?',
        options: ['Increases by a factor of 8', 'Increases by a factor of 4', 'Doubles', 'Increases by 16'],
        correctIndex: 0,
        explanation: 'I = (b · d³) / 12. If d is doubled (2d)³, (2)³ = 8, so I increases 8 times.'
      }
    ]
  },

  // ==========================================================================
  // ISE – Information Science & Engineering
  // ==========================================================================
  {
    id: 'ise-lab-1',
    branch: 'ISE',
    labName: 'Web Technologies Lab',
    experimentTitle: 'Client-Server HTTP Request Lifecycle & DOM Tree Visualization',
    objective: 'Inspect the HTTP request-response cycle, REST API status codes, and interactive DOM tree mutations in single-page applications.',
    theory: `The Web is built on the HTTP protocol over TCP/IP:
- HTTP Methods: GET (retrieve), POST (create), PUT/PATCH (update), DELETE (remove).
- Status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error.
- DOM (Document Object Model) represents HTML documents as nodes and objects that can be dynamically altered via JavaScript.`,
    requiredTools: ['Browser DevTools Network & Elements tab', 'Postman / Curl', 'Node.js'],
    procedure: [
      'Trigger simulated GET and POST requests.',
      'Inspect request headers, payload, and response status codes.',
      'Observe DOM tree node additions and attribute changes dynamically.'
    ],
    simType: 'guided-code',
    defaultInputs: {},
    observationsGuide: 'Notice header caching directives (ETag, Cache-Control) and asynchronous non-blocking event loop execution.',
    conclusionGuide: 'RESTful architectures provide scalable, stateless communication between client and server systems.',
    mcqs: [
      {
        id: 'ise-q1',
        question: 'Which HTTP status code indicates that a requested resource was not found on the server?',
        options: ['404', '200', '500', '301'],
        correctIndex: 0,
        explanation: '404 Not Found means the server cannot find the requested URL.'
      }
    ]
  }
];

export function getLabsForBranch(branch: EngineeringBranch): VirtualLabExperiment[] {
  const branchLabs = virtualLabExperiments.filter(lab => lab.branch === branch);
  if (branchLabs.length > 0) return branchLabs;
  return virtualLabExperiments;
}

export function getLabById(id: string): VirtualLabExperiment | undefined {
  return virtualLabExperiments.find(lab => lab.id === id);
}
