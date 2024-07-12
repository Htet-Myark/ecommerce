// document.addEventListener('DOMContentLoaded', function () {
//     const token = localStorage.getItem("token");
//     const productId = localStorage.getItem("favouriteProductId"); // Get the selected product ID

//     // Pre-fill the product ID in the form
//     const addFavoriteForm = document.getElementById('add-favorite-form');
//     const productIdInput = addFavoriteForm.querySelector('input[name="productId"]');
//     productIdInput.value = productId;

//     function addFavorite(event) {
//         event.preventDefault();
//         const formData = new FormData(addFavoriteForm);
//         const productId = formData.get('productId');
//         const remarks = formData.get('remarks');
        

//         fetch('/favourites/create', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             },
//             body: JSON.stringify({ productId, remarks })
//         })
//         .then(response => response.json())
//         .then(() => {
//             window.location.href = '/favourite';
//         })
//         .catch(error => console.error('Error adding favorite:', error));
//     }

//     addFavoriteForm.addEventListener('submit', addFavorite);
// });
