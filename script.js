// Simplified search function and view handling

// Filter Table Rows
function filterTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#questionsTable tbody tr");

    // Filter rows based on input
    rows.forEach(row => {
        const problemText = row.cells[1].innerText.toLowerCase();
        const explanation = row.cells[3].innerText.toLowerCase();
        const domain = row.cells[4].innerText.toLowerCase();

        if (
            problemText.includes(input) ||
            explanation.includes(input) ||
            domain.includes(input)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Switch Views
function switchView(view) {
    const content = document.getElementById("content");
    const rows = document.querySelectorAll("#questionsTable tbody tr");

    // Clear content to avoid overlap
    content.innerHTML = "";

    switch (view) {
        case "table":
            document.getElementById("searchInput").style.display = "block"; // Show searchInput
            document.getElementById("questionsTable").style.display = "table"; // Show the table
            document.getElementById("showAllAnswersButton").style.display = "none"; // Hide the Show All Answers button
            document.getElementById("hideAllAnswersButton").style.display = "none"; // Hide the Hide All Answers button
            break;

            case "vertical":
                document.getElementById("searchInput").style.display = "none"; // Hide searchInput
                document.getElementById("questionsTable").style.display = "none"; // Hide the table
                document.getElementById("showAllAnswersButton").style.display = "block"; // Show the Show All Answers button
                document.getElementById("hideAllAnswersButton").style.display = "block"; // Show the Hide All Answers button
                content.innerHTML = Array.from(rows)
                    .map((row, index) => {
                        const cells = row.querySelectorAll("td");
                        const choices = Array.from(cells[1].querySelectorAll("li"))
                            .map(choice => `<li style='margin-left:20px;'>${choice.innerText}</li>`)
                            .join("");
    
                        return `
                            <div class="question-block">
                                <h3>${cells[1].childNodes[0].nodeValue.trim()}</h3>
                                <ol class="choices" style="list-style-type: lower-alpha;">
                                    ${choices}
                                </ol>
                                <p id="answer-${index}" style="display:none;"><strong>Answer:</strong> ${cells[2].innerHTML}</p>
                                <p id="explanation-${index}" style="display:none;"><strong>Explanation:</strong> ${cells[3].innerHTML}</p>
                                <button onclick="toggleAnswer(${index})">Show Answer</button>
                            </div>`;
                    })
                    .join("");
                break;
            
    }
}

// Toggle Answer Visibility
function toggleAnswer(index) {
    const answer = document.getElementById(`answer-${index}`);
    const explanation = document.getElementById(`explanation-${index}`);
    const button = answer.closest('.question-block').querySelector('button');
    const isVisible = answer.style.display === "block";

    answer.style.display = isVisible ? "none" : "block";
    explanation.style.display = isVisible ? "none" : "block";
    button.textContent = isVisible ? "Show Answer" : "Hide Answer";
}


// Show All Answers
function showAllAnswers() {
    const answers = document.querySelectorAll("[id^='answer-']");
    const explanations = document.querySelectorAll("[id^='explanation-']");
    const buttons = document.querySelectorAll(".question-block button");

    answers.forEach(answer => {
        answer.style.display = "block";
    });
    explanations.forEach(explanation => {
        explanation.style.display = "block";
    });
    buttons.forEach(button => {
        button.textContent = "Hide Answer";
    });
}

// Hide All Answers
function hideAllAnswers() {
    const answers = document.querySelectorAll("[id^='answer-']");
    const explanations = document.querySelectorAll("[id^='explanation-']");
    const buttons = document.querySelectorAll(".question-block button");

    answers.forEach(answer => {
        answer.style.display = "none";
    });
    explanations.forEach(explanation => {
        explanation.style.display = "none";
    });
    buttons.forEach(button => {
        button.textContent = "Show Answer";
    });
}

// Show or hide the Back to Top button
window.onscroll = function() {
    const button = document.getElementById('backToTop');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
};

// Scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
