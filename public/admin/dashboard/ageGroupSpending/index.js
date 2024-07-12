window.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem("token");

    fetchAgeGroupSpending();

    const form = document.querySelector("#search-form");

    function fetchAgeGroupSpending(queryParams = "") {
        console.log("Fetching age group spending with queryParams:", queryParams); // Debugging log

        fetch(`/dashboard/ageGroupSpending?${queryParams}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (body) {
            console.log("Received response:", body); // Debugging log

            if (body.error) throw new Error(body.error);
            const spendings = body.ageGroupSpending; // Correct this line
            console.log("Processing spendings:", spendings); // Debugging log

            const tbody = document.querySelector("#spending-tbody");
            tbody.innerHTML = '';

            spendings.forEach(function (spending) {
                const row = document.createElement("tr");

                const ageGroupCell = document.createElement("td");
                const totalSpendingCell = document.createElement("td");
                const numberOfMembersCell = document.createElement("td");

                ageGroupCell.textContent = spending.ageGroup; // Correct these lines
                totalSpendingCell.textContent = spending.totalSpending;
                numberOfMembersCell.textContent = spending.memberCount;

                row.appendChild(ageGroupCell);
                row.appendChild(totalSpendingCell);
                row.appendChild(numberOfMembersCell);

                tbody.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error("Error fetching age group spending:", error);
        });
    }

    function handleFormSubmission(event) {
        event.preventDefault();

        const gender = form.elements.gender.value;
        const minTotalSpending = form.elements.minTotalSpending.value;
        const minMemberTotalSpending = form.elements.minMemberTotalSpending.value;

        const queryParams = new URLSearchParams({
            gender,
            minTotalSpending,
            minMemberTotalSpending
        }).toString();

        console.log("Form submitted with queryParams:", queryParams); // Debugging log

        fetchAgeGroupSpending(queryParams);
    }

    form.addEventListener("submit", handleFormSubmission);
});