window.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const reviewId = localStorage.getItem('reviewId');

    if (!reviewId) {
        alert('No review ID found in local storage.');
        return;
    }

    // Fetch the existing review details
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

        // Set the form fields with the existing review data
        document.querySelector('input[name="reviewId"]').value = review.id;
        document.querySelector('select[name="rating"]').value = review.rating;
        document.querySelector('textarea[name="reviewText"]').value = review.review_text;
    })
    .catch(function (error) {
        console.error("Error fetching review:", error);
    });

    // Handle form submission
    const form = document.querySelector('form');
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent the default form submission

        const reviewId = form.querySelector('input[name="reviewId"]').value;
        const rating = form.querySelector('select[name="rating"]').value;
        const reviewText = form.querySelector('textarea[name="reviewText"]').value;

        // Check if the elements are correctly referenced
        // if (!reviewId || !rating || !reviewText) {
        //     alert('Please fill out all fields.');
        //     return;
        // }

        // Update review details using fetch API with method PUT
        fetch(`/reviews/${reviewId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rating: rating,
                reviewText: reviewText
            }),
        })
        .then(function (response) {
            if (response.ok) {
                alert('Review updated successfully!');
                // Clear the input fields
                form.querySelector('select[name="rating"]').value = "";
                form.querySelector('textarea[name="reviewText"]').value = "";
            } else {
                // If failed, show the error message
                response.json().then(function (data) {
                    alert(`Error updating review - ${data.error}`);
                });
            }
        })
        .catch(function (error) {
            alert('Error updating review');
            console.error('Error updating review:', error);
        });
    };
});
