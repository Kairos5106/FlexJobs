const questions = [
    'A – Operate a printing press',
    'B – Study the causes of earthquakes',
    'C – Plant and harvest crops',
    'R – Replace a car window and fender',
    'E – Analyze reports and records',
    'F – Operate a machine',
    'G – Work in an office',
    'H – Answer customer questions',
    'D – Write reports',
    'J – Help former prison inmates find work',
    'L – Design a freeway',
    'M – Plan educational lessons',
    'N – Balance a checkbook',
    'O – Take an X-ray',
    'P – Write a computer program',
    'Q – Train animals',
    'C – Be in charge of replanting forests',
    'A – Act in a TV show or movie',
    'E – Make three-dimensional items',
    'D – Analyze handwriting',
    'B – Design indoor sprinkler systems',
    'F – Run a factory sewing machine',
    'G – Develop personnel policies',
    'Q – Train racehorses',
    'D – Guard an office building',
    'H – Run a department store',
    'A – Write for a newspaper',
    'G – Use a calculator',
    'O – Help people at a mental health clinic',
    'L – Remodel old houses',
    'M – Care for young children',
    'D – Locate a missing person',
    'N – Plan estate disbursements/payments',
    'P – Enter data',
    'A – Design a book cover',
    'E – Build toys with written instructions',
    'B – Figure out why someone is sick',
    'R – Fly an airplane',
    'C – Learn how things grow and stay alive',
    'H – Sell cars',
    'I – Work as a restaurant host or hostess',
    'D – Fight fires',
    'G – Keep payroll records for a company',
    'J – Work in a nursing home',
    'G – Hire new staff',
    'O – Run ventilators/breathing machines',
    'R – Drive a taxi',
    'A – Broadcast the news',
    'K – Audit taxes for the government',
    'B – Sort and date dinosaur bones',
    'O – Give shots',
    'C – Design landscaping',
    'P – Give tech support to computer users',
    'D – Work in a courtroom',
    'Q – Care for injured animals',
    'I – Serve meals to customers'
];


// Function to create a checkbox container for each question
function createQuestionContainer(question) {
    const container = document.createElement("div");
    container.className = "question-container";

    const label = document.createElement("label");
    label.textContent = question;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = question;
    checkbox.value = "tick";

    container.appendChild(label);
    container.appendChild(checkbox);

    return container;
}

// Function to generate questions and checkboxes
function generateQuestions() {
    const questionsContainer = document.getElementById("questions-container");

    questions.forEach(question => {
        const questionContainer = createQuestionContainer(question);
        questionsContainer.appendChild(questionContainer);
    });
}

// Function to handle form submission
function handleSubmit() {
let counts = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, J: 0, L: 0, M: 0, N: 0, O: 0, P: 0, Q: 0, R: 0 };

questions.forEach(question => {
const checkbox = document.querySelector(`input[name="${question}"]`);
const category = question[0]; // Extract the first letter as category
if (checkbox.checked) {
    counts[category]++;
}
});

// Construct the query parameters string
let queryParams = '';
for (const category in counts) {
queryParams += `${category}=${counts[category]}&`;
}

// Remove the trailing '&' from queryParams
queryParams = queryParams.slice(0, -1);

// Redirect to the new page with query parameters
window.location.href = `results.html?${queryParams}`;
}


// Call the function to generate questions and checkboxes
generateQuestions();

// Add event listener to the submit button
document.getElementById("submit-btn").addEventListener("click", handleSubmit);