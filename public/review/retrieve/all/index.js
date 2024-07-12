// function fetchUserReviews() {
//     const token = localStorage.getItem("token");

//     return fetch(`/reviews`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//     .then(function (response) {
//         console.log("Response received:", response);
//         return response.json();
//     })
//     .then(function (body) {
//         console.log("Body parsed:", body);

//         if (body.error) throw new Error(body.error);
//         const reviews = body.reviews;
//         console.log("Reviews:", reviews);

//         const reviewContainerDiv = document.querySelector('#review-container');
//         reviewContainerDiv.innerHTML = ''; // Clear previous content

//         reviews.forEach(function (review) {
//             console.log('Review data:', review); // Log review data for debugging
//             const reviewDiv = document.createElement('div');
//             reviewDiv.classList.add('review-row');

//             let ratingStars = '';
//             for (let i = 0; i < review.rating; i++) {
//                 ratingStars += '⭐';
//             }

//             reviewDiv.innerHTML = `
//                 <h3>Review ID: ${review.id}</h3>
//                 <p>Product Name: ${review.productName}</p>
//                 <p>Rating: ${ratingStars}</p>
//                 <p>Review Text: ${review.reviewText}</p>
//                 <p>Review Date: ${review.reviewDate ? review.reviewDate.slice(0, 10) : ""}</p>
//                 <button class="update-button">Update</button>
//                 <button class="delete-button">Delete</button>
//             `;

//             reviewDiv.querySelector('.update-button').addEventListener('click', function() {
//                 localStorage.setItem("reviewId", review.id);
//                 window.location.href = `/review/update`;
//             });

//             reviewDiv.querySelector('.delete-button').addEventListener('click', function() {
//                 if (confirm("Are you sure you want to delete this review?")) {
//                     fetch(`/reviews/${review.id}`, {
//                         method: "DELETE",
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     })
//                     .then(response => {
//                         if (response.ok) {
//                             alert('Review deleted successfully!');
//                             fetchUserReviews(); // Refresh the list of reviews
//                         } else {
//                             response.json().then(data => {
//                                 alert(`Error deleting review - ${data.error}`);
//                             });
//                         }
//                     })
//                     .catch(error => {
//                         console.error('Error deleting review:', error);
//                         alert('Failed to delete review');
//                     });
//                 }
//             });

//             reviewContainerDiv.appendChild(reviewDiv);
//         });
//     })
//     .catch(function (error) {
//         console.error("Error:", error);
//     });
// }

// document.addEventListener('DOMContentLoaded', function () {
//     fetchUserReviews()
//         .catch(function (error) {
//             console.error("Error on DOMContentLoaded:", error);
//         });
// });

function fetchUserReviews() {
    const token = localStorage.getItem("token");

    return fetch(`/reviews/retrieve/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(function (response) {
        console.log("Response received:", response);
        return response.json();
    })
    .then(function (body) {
        console.log("Body parsed:", body);

        if (body.error) throw new Error(body.error);
        const reviews = body.reviews;
        console.log("Reviews:", reviews);

        const reviewContainerDiv = document.querySelector('#review-container');
        reviewContainerDiv.innerHTML = ''; // Clear previous content

        reviews.forEach(function (review) {
            console.log('Review data:', review); // Log review data for debugging
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review-row');

            let ratingStars = '';
            for (let i = 0; i < review.rating; i++) {
                ratingStars += '⭐';
            }

            reviewDiv.innerHTML = `
                <h3>Review ID: ${review.id}</h3>
                <p>Product Name: ${review.productName}</p>
                <p>Rating: ${ratingStars}</p>
                <p>Review Text: ${review.reviewText}</p>
                <p>Review Date: ${review.reviewDate ? review.reviewDate.slice(0, 10) : ""}</p>
                <button class="update-button">Update</button>
                <button class="delete-button">Delete</button>
            `;

            reviewDiv.querySelector('.update-button').addEventListener('click', function() {
                localStorage.setItem("reviewId", review.id);
                window.location.href = `/review/update`;
            });

            reviewDiv.querySelector('.delete-button').addEventListener('click', function() {
                localStorage.setItem("reviewId", review.id);
                window.location.href = `/review/delete`;
            });

            reviewContainerDiv.appendChild(reviewDiv);
        });
    })
    .catch(function (error) {
        console.error("Error:", error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchUserReviews()
        .catch(function (error) {
            console.error("Error on DOMContentLoaded:", error);
        });
});
