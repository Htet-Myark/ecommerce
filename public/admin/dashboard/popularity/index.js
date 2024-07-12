document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const popularityTableBody = document.querySelector('#popularity-table tbody');

    function fetchPopularity() {
        fetch('/favourites/popularity', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(body => {
            const favoriteCounts = body.favoriteCounts;
            popularityTableBody.innerHTML = '';
            favoriteCounts.forEach(favorite => {
                const row = document.createElement('tr');

                const productNameCell = document.createElement('td');
                const favoritedByCell = document.createElement('td');
                const id = document.createElement('td');

                id.textContent=favorite.productId;
                productNameCell.textContent = favorite.productName;
                favoritedByCell.textContent = favorite.favoritedBy;

                row.appendChild(id)
                row.appendChild(productNameCell);
                row.appendChild(favoritedByCell);
                

                popularityTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching popularity data:', error));
    }

    fetchPopularity();
});
