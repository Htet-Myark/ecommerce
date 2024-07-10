window.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const reviewId = localStorage.getItem('reviewId');

    if (!reviewId) {
        alert('No review ID found in local storage.');
        return;
    }

    const form = document.querySelector('#delete-review-form');
    form.querySelector('input[name=reviewId]').value = reviewId;

    form.onsubmit = function (e) {
        e.preventDefault(); // prevent the default form submission

        fetch(`/reviews/${reviewId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Review deleted successfully!');
                localStorage.removeItem('reviewId');
                window.location.href = '/review/retrieve/all'; // Redirect to all reviews page
            } else {
                response.json().then(data => {
                    alert(`Error deleting review - ${data.error}`);
                });
            }
        })
        .catch(error => {
            console.error('Error deleting review:', error);
            alert('Failed to delete review');
        });
    };
});
