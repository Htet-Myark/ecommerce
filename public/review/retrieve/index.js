// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.querySelector('#retrieve-review-form');
//     const reviewContainer = document.querySelector('#review-container');

//     form.onsubmit = function (e) {
//         e.preventDefault(); // prevent the default form submission

//         const reviewId = form.querySelector('input[name="reviewId"]').value;
//         const token = localStorage.getItem('token');

//         // Fetch the review by ID
//         fetch(`/reviews/retrieve/${reviewId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (body) {
//             if (body.error) throw new Error(body.error);
//             const review = body.review;

//             // Display the review details
//             reviewContainer.innerHTML = `
//                 <h3>Review ID: ${review.id}</h3>
//                 <p>Product Name: ${review.productName}</p>
//                 <p>Rating: ${'⭐'.repeat(review.rating)}</p>
//                 <p>Review Text: ${review.reviewText}</p>
//                 <p>Review Date: ${review.reviewDate ? review.reviewDate.slice(0, 10) : "N/A"}</p>
//                 <button class="update-button">Update</button>
//                 <button class="delete-button">Delete</button>
//             `;

//             document.querySelector('.update-button').addEventListener('click', function() {
//                 localStorage.setItem("reviewId", review.id);
//                 window.location.href = `/review/update`;
//             });

//             document.querySelector('.delete-button').addEventListener('click', function() {
//                 localStorage.setItem("reviewId", review.id);
//                 window.location.href = `/review/delete`;
//             });
//         })
//         .catch(function (error) {
//             console.error("Error fetching review:", error);
//             reviewContainer.innerHTML = `<p>Error retrieving review: ${error.message}</p>`;
//         });
//     };
// });

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#retrieve-review-form');
    const reviewContainer = document.querySelector('#review-container');

    form.onsubmit = function (e) {
        e.preventDefault(); // prevent the default form submission

        const reviewId = form.querySelector('input[name="reviewId"]').value;
        const token = localStorage.getItem('token');

        // Fetch the review by ID
        fetch(`/reviews/retrieve/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error(` ${response.status}`);
            }
            return response.json();
        })
        .then(function (body) {
            if (body.error) throw new Error(body.error);
            const review = body.review;

            // Display the review details
            reviewContainer.innerHTML = `
                <h3>Review ID: ${review.id}</h3>
                <p>Product Name: ${review.productName}</p>
                <p>Rating: ${'⭐'.repeat(review.rating)}</p>
                <p>Review Text: ${review.reviewText}</p>
                <p>Review Date: ${review.reviewDate ? review.reviewDate.slice(0, 10) : "N/A"}</p>
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
            console.error("Error fetching review:", error);
            alert(`Error retrieving review: ${error.message}`);
            reviewContainer.innerHTML = ''; // Clear the review container
        });
    };
});
