document.getElementById('retrieveReviewForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const reviewId = document.getElementById('reviewId').value;
    const token = localStorage.getItem("token");

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

        const reviewContainerDiv = document.getElementById('review-container');
        reviewContainerDiv.innerHTML = ''; // Clear previous content

        let ratingStars = '';
        for (let i = 0; i < review.rating; i++) {
            ratingStars += '⭐';
        }

        reviewContainerDiv.innerHTML = `
            <h3>Review ID: ${review.id}</h3>
            <p>Product Name: ${review.productName}</p>
            <p>Rating: ${ratingStars}</p>
            <p>Review Text: ${review.reviewText}</p>
            <p>Review Date: ${review.reviewDate ? review.review_date.slice(0, 10) : ""}</p>
            <button class="update-button">Update</button>
            <button class="delete-button">Delete</button>
        `;

        document.querySelector('.update-button').addEventListener('click', function() {
            localStorage.setItem("reviewId", review.id);
            window.location.href = `/review/update`;
        });

        document.querySelector('.delete-button').addEventListener('click', function() {
            localStorage.setItem("reviewId", review.id);
            window.location.href = `/review/delete`;
        });

    })
    .catch(function (error) {
        console.error("Error:", error);
    });
});
