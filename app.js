// ====== ELEMENT REFERENCES ======
const totalProducts = document.getElementById("totalProducts");
const topSelling = document.getElementById("topSelling");
const leastSelling = document.getElementById("leastSelling");
const dashboardTableBody = document.getElementById("dashboardTableBody");

// ====== GET DATA FROM LOCAL STORAGE ======
function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

// ====== DISPLAY PRODUCTS ======
function displayDashboard() {
    const products = getProducts();
    dashboardTableBody.innerHTML = "";

    if (products.length === 0) {
        dashboardTableBody.innerHTML = `<tr><td colspan="4" class="text-center text-gray-500 py-4">No products available</td></tr>`;
        totalProducts.textContent = "0";
        topSelling.textContent = "-";
        leastSelling.textContent = "-";
        return;
    }

    totalProducts.textContent = products.length;

    // Sort products by "sold" count (if exists)
    products.sort((a, b) => (b.sold || 0) - (a.sold || 0));

    // Display table
    products.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td class="py-3 px-4 text-gray-800">${p.productName}</td>
      <td class="py-3 px-4 text-gray-600">${p.productCategory}</td>
      <td class="py-3 px-4 text-gray-600">$${p.productPrice}</td>
      <td class="py-3 px-4 text-gray-600">${p.sold || 0}</td>
    `;
        dashboardTableBody.appendChild(row);
    });

    // Set top and least selling names
    topSelling.textContent = products[0].productName;
    leastSelling.textContent = products[products.length - 1].productName;
}

displayDashboard();
