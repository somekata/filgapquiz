// Enhanced search function with autocomplete and sorting
let autocompleteSuggestions = [];

// Gather unique data for autocomplete
function collectAutocompleteData() {
    const rows = document.getElementById("questionsTable").tBodies[0].rows;
    const suggestionsSet = new Set();

    for (const row of rows) {
        suggestionsSet.add(row.cells[1].innerText.trim()); // 問題文
        suggestionsSet.add(row.cells[3].innerText.trim()); // 解説
        suggestionsSet.add(row.cells[4].innerText.trim()); // 領域
    }

    autocompleteSuggestions = Array.from(suggestionsSet);
}

// Create autocomplete dropdown
function setupAutocomplete() {
    const searchInput = document.getElementById("searchInput");
    const suggestionBox = document.createElement("div");
    suggestionBox.id = "autocompleteSuggestions";
    suggestionBox.style.position = "absolute";
    suggestionBox.style.backgroundColor = "#fff";
    suggestionBox.style.border = "1px solid #ccc";
    suggestionBox.style.zIndex = "1000";
    suggestionBox.style.width = `${searchInput.offsetWidth}px`;
    suggestionBox.style.maxHeight = "200px";
    suggestionBox.style.overflowY = "auto";
    suggestionBox.style.display = "none";
    document.body.appendChild(suggestionBox);

    searchInput.addEventListener("input", function () {
        const input = searchInput.value.toLowerCase();
        suggestionBox.innerHTML = "";

        if (input) {
            const filteredSuggestions = autocompleteSuggestions.filter((item) =>
                item.toLowerCase().includes(input)
            );

            filteredSuggestions.forEach((suggestion) => {
                const suggestionItem = document.createElement("div");
                suggestionItem.innerText = suggestion;
                suggestionItem.style.padding = "10px";
                suggestionItem.style.cursor = "pointer";

                suggestionItem.addEventListener("click", () => {
                    searchInput.value = suggestion;
                    suggestionBox.style.display = "none";
                    filterTable();
                });

                suggestionBox.appendChild(suggestionItem);
            });

            suggestionBox.style.display = filteredSuggestions.length ? "block" : "none";
        } else {
            suggestionBox.style.display = "none";
        }
    });

    searchInput.addEventListener("blur", () => {
        setTimeout(() => (suggestionBox.style.display = "none"), 200);
    });

    searchInput.addEventListener("focus", () => {
        if (searchInput.value) {
            suggestionBox.style.display = "block";
        }
    });
}

// Filter Table Rows
function filterTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.getElementById("questionsTable").tBodies[0].rows;

    for (const row of rows) {
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
    }
}

// Sort Table Columns
function sortTable(columnIndex) {
    const table = document.getElementById("questionsTable");
    const rows = Array.from(table.tBodies[0].rows);
    const isAscending = table.dataset.sortOrder === "asc";

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].innerText.trim().toLowerCase();
        const cellB = rowB.cells[columnIndex].innerText.trim().toLowerCase();

        if (cellA < cellB) return isAscending ? -1 : 1;
        if (cellA > cellB) return isAscending ? 1 : -1;
        return 0;
    });

    rows.forEach((row) => table.tBodies[0].appendChild(row));
    table.dataset.sortOrder = isAscending ? "desc" : "asc";
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

// Initialize functionality
window.onload = function () {
    collectAutocompleteData();
    setupAutocomplete();
};
