window.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem("token");

    fetch('/saleOrders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(body => {
        if (body.error) throw new Error(body.error);
        const saleOrders = body.saleOrders;
        const tbody = document.querySelector("#product-tbody");
        saleOrders.forEach(saleOrder => {
            const row = document.createElement("tr");
            row.classList.add("product");
            row.innerHTML = `
                <td>${saleOrder.name}</td>
                <td>${saleOrder.description}</td>
                <td><img src="${saleOrder.imageUrl}" alt="Product Image"></td>
                <td>${saleOrder.unitPrice}</td>
                <td>${saleOrder.quantity}</td>
                <td>${saleOrder.country}</td>
                <td>${saleOrder.saleOrderId}</td>
                <td>${new Date(saleOrder.orderDatetime).toLocaleString()}</td>
                <td>${saleOrder.status}</td>
                <td><button class="create-review-btn" data-product-id="${saleOrder.productId}" data-sale-order-id="${saleOrder.saleOrderId}">Create Review</button></td>
            `;
            tbody.appendChild(row);
        });

        document.querySelectorAll('.create-review-btn').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelector("#review-product-id").textContent = this.closest('tr').querySelector('td:nth-child(1)').textContent;
                document.querySelector("input[name='productId']").value = this.dataset.productId;
                document.querySelector("input[name='saleOrderId']").value = this.dataset.saleOrderId;
            });
        });
    })
    .catch(error => console.error(error));

    document.querySelector('#reviewForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const productId = document.querySelector('#productId').value;
        const rating = document.querySelector('#rating').value;
        const reviewText = document.querySelector('#reviewText').value;
        const saleOrderId = document.querySelector('#saleOrderId').value;

        if (!productId || !rating || !reviewText || !saleOrderId) {
            alert('Product ID, rating, review text, and sale order ID are required.');
            return;
        }
        if (rating < 1 || rating > 5) {
            alert('Rating must be between 1 and 5.');
            return;
        }

        const token = localStorage.getItem('token');
        const response = await fetch('/reviews/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId, rating, reviewText, saleOrderId })
        });

        const result = await response.json();
        if (response.ok) {
            alert('Review created successfully.');
        } else {
            alert(result.error);
        }
    });
});