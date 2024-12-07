$(document).ready(function() {
    let products = [];

    // Load products from JSON file
    $.getJSON('/products.json', function(data) {
        products = data;
        displayProducts(products);
    });

    // Function to display products
    function displayProducts(items) {
        let output = '';
        items.forEach(product => {
            output += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Category: ${product.category}</p>
                            <p class="card-text">Price: ${product.price}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        $('#productResults').html(output);
    }

    // Filter products based on search query
    $('#searchBar').on('keyup', function() {
        const searchText = $(this).val().toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText)
        );
        displayProducts(filteredProducts);
    });
});
