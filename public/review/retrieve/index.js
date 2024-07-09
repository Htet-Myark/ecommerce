document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#retrieve-review-form');
    const reviewContainer = document.querySelector('#review-container');

    form.onsubmit = function (e) {
        e.preventDefault(); // prevent the default form submission

        const reviewId = form.querySelector('input[name="reviewId"]').value;
        const token = localStorage.getItem('token');

        // Fetch the review by ID
        fetch(`/reviews/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (body) {
            if (body.error) throw new Error(body.error);
            const review = body.review;

            // Display the review details with update and delete buttons
            reviewContainer.innerHTML = `
                <h3>Review ID: ${review.id}</h3>
                <p>Product Name: ${review.productName}</p>
                <p>Rating: ${'⭐'.repeat(review.rating)}</p>
                <p>Review Text: ${review.reviewText}</p>
                <p>Review Date: ${review.reviewDate ? review.review_date.slice(0, 10) : ""}</p>
                <button class="update-button" data-review-id="${review.id}">Update</button>
                <button class="delete-button" data-review-id="${review.id}">Delete</button>
            `;

            document.querySelector('.update-button').addEventListener('click', function() {
                localStorage.setItem("reviewId", review.id);
                window.location.href = `/review/update`;
            });

            document.querySelector('.delete-button').addEventListener('click', function() {
                const token = localStorage.getItem('token');
                const reviewId = this.getAttribute('data-review-id');

                fetch(`/reviews/${reviewId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (response.ok) {
                        alert('Review deleted successfully!');
                        reviewContainer.innerHTML = '';
                    } else {
                        response.json().then(data => {
                            alert(`Error deleting review - ${data.error}`);
                        });
                    }
                })
                .catch(error => {
                    alert('Error deleting review');
                    console.error('Error deleting review:', error);
                });
            });
        })
        .catch(function (error) {
            console.error("Error fetching review:", error);
            reviewContainer.innerHTML = `<p>Error retrieving review: ${error.message}</p>`;
        });
    };
});
