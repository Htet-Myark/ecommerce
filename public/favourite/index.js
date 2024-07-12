document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const favoritesTbody = document.getElementById('favorites-tbody');

    function fetchFavorites() {
        fetch('/favourites', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(body => {
            const favorites = body.favorites;
            favoritesTbody.innerHTML = '';
            favorites.forEach(favorite => {
                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                const descriptionCell = document.createElement('td');
                const unitPriceCell = document.createElement('td');
                const countryCell = document.createElement('td');
                const productTypeCell = document.createElement('td');
                const imageCell = document.createElement('td');
                const remarksCell = document.createElement('td');
                const createdAtCell = document.createElement('td');
                const removeCell = document.createElement('td');
                const updateCell = document.createElement('td');

                nameCell.textContent = favorite.productName;
                descriptionCell.textContent = favorite.description;
                unitPriceCell.textContent = favorite.unitPrice;
                countryCell.textContent = favorite.country;
                productTypeCell.textContent = favorite.productType;
                imageCell.innerHTML = `<img src="${favorite.imageUrl}" alt="Product Image" width="50" height="50">`;
                remarksCell.textContent = favorite.remarks;
                createdAtCell.textContent = new Date(favorite.createdAt).toLocaleDateString();

                const removeButton = document.createElement('button');
                removeButton.href = '#';
                removeButton.classList.add('btn', 'btn-remove');
                removeButton.textContent = 'Remove';
                removeButton.setAttribute('data-favourite-id', favorite.favouriteId);

                removeButton.addEventListener('click', function (event) {
                    event.preventDefault();

                    const userConfirmed = confirm('Do you want to delete this item?');

                    if (userConfirmed) {
                        const favouriteId = removeButton.getAttribute('data-favourite-id');

                        console.log(favouriteId);

                        fetch('/favourites/delete', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ favouriteId })
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to delete favourite');
                            }
                            alert('Favourite deleted successfully!');
                            row.remove();
                        })
                        .catch(error => {
                            console.error('Error deleting favourite:', error);
                            alert('Failed to delete favourite. Please try again.');
                        });
                    }
                });

                removeCell.appendChild(removeButton);

               

                row.appendChild(nameCell);
                row.appendChild(descriptionCell);
                row.appendChild(unitPriceCell);
                row.appendChild(countryCell);
                row.appendChild(productTypeCell);
                row.appendChild(imageCell);
                row.appendChild(remarksCell);
                row.appendChild(createdAtCell);
                row.appendChild(removeCell);
               

                favoritesTbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching favorites:', error));
    }

  

    fetchFavorites();
});
