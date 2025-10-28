// // Load products from localStorage
// function loadProducts() {
//   let data = localStorage.getItem('storeProducts');
//   return data ? JSON.parse(data) : [];
// }

// // Show Quick Stats
// function showStats(products) {
//   const totalProducts = products.length;
//   const totalSales = products.reduce((sum, p) => sum + (p.sales || 0), 0);

//   let topProduct = '-';
//   let topSales = 0;
//   if (products.length > 0) {
//     const sorted = [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0));
//     topProduct = sorted[0].name || '-';
//     topSales = sorted[0].sales || 0;
//   }

//   const lowStock = products.filter(p => p.stock <= 5).length;

//   document.getElementById('totalProducts').textContent = totalProducts;
//   document.getElementById('totalSales').textContent = totalSales;
//   document.getElementById('topProduct').textContent = topProduct;
//   document.getElementById('topProductSales').textContent = `${topSales} sales`;
//   document.getElementById('lowStockCount').textContent = lowStock;
//   document.getElementById('productCount').textContent = totalProducts;
// }

// // Show Products Table
// function showProductsTable(products) {
//   const tableBody = document.getElementById('productsTable');

//   if (products.length === 0) {
//     tableBody.innerHTML = `
//       <tr>
//         <td colspan="5" class="py-8 text-center text-gray-500">
//           <i class="fas fa-box-open text-3xl mb-2 block"></i>
//           No products added yet. <a href="addProduct.html" class="text-blue-600 hover:underline">Add your first product</a>
//         </td>
//       </tr>`;
//     return;
//   }

//   const rows = products.map(p => {
//     const sales = p.sales || 0;
//     const status = sales >= 10 ? 'High' : sales >= 5 ? 'Medium' : 'Low';
//     const statusColor = sales >= 10 ? 'text-green-600 bg-green-100' :
//       sales >= 5 ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100';
//     return `
//       <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
//         <td class="py-4 px-4 font-medium text-gray-800">${p.name}</td>
//         <td class="py-4 px-4 capitalize">${p.category}</td>
//         <td class="py-4 px-4">${p.price ? `$${p.price.toFixed(2)}` : 'Not set'}</td>
//         <td class="py-4 px-4 flex items-center">
//           <span class="font-medium mr-2">${sales}</span>
//           <div class="w-20 bg-gray-200 rounded-full h-2">
//             <div class="bg-blue-600 h-2 rounded-full" style="width: ${Math.min(sales * 10, 100)}%"></div>
//           </div>
//         </td>
//         <td class="py-4 px-4">
//           <span class="px-2 py-1 rounded-full text-xs font-medium ${statusColor}">${status}</span>
//         </td>
//       </tr>`;
//   }).join('');

//   tableBody.innerHTML = rows;
// }

// // Show Sales Chart
// function showSalesChart(products) {
//   const chart = document.getElementById('salesChart');
//   if (!chart) return; // in case the chart div is missing

//   if (products.length === 0) {
//     chart.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-400">
//       <div class="text-center"><i class="fas fa-chart-bar text-4xl mb-2 block"></i>No sales data available</div>
//     </div>`;
//     return;
//   }

//   const topProducts = [...products]
//     .sort((a, b) => (b.sales || 0) - (a.sales || 0))
//     .slice(0, 5);

//   const maxSales = Math.max(...topProducts.map(p => p.sales || 0), 1);

//   chart.innerHTML = topProducts.map(p => {
//     const height = ((p.sales || 0) / maxSales) * 100;
//     return `
//       <div class="flex flex-col items-center flex-1">
//         <div class="w-full bg-gradient-to-t from-blue-500 to-blue-700 rounded-t-lg transition-all duration-500 hover:opacity-80" style="height:${height}%"></div>
//         <div class="mt-2 text-xs text-center truncate w-full">${p.name}</div>
//         <div class="text-xs text-gray-500">${p.sales || 0}</div>
//       </div>`;
//   }).join('');
// }

// // Update Dashboard
// function updateDashboard() {
//   const products = loadProducts();
//   showStats(products);
//   showProductsTable(products); 
//   showSalesChart(products);
// }

// // Initialize Dashboard on page load
// document.addEventListener('DOMContentLoaded', updateDashboard);

// // Update in real-time if localStorage changes (optional)
// window.addEventListener('storage', updateDashboard);






// ====== QUICK STATS ELEMENTS ======
const productsSoldEl = document.getElementById("productsSold");
const totalSalesEl = document.getElementById("totalSales");
const mostSoldEl = document.getElementById("mostSold");
const leastSoldEl = document.getElementById("leastSold");
const highestSalesProductEl = document.getElementById("highestSalesProduct");

// ====== UPDATE QUICK STATS ======
function updateQuickStats() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const now = new Date();
  const currentMonth = now.getMonth(); // 0 = Jan, 1 = Feb, ...
  const currentYear = now.getFullYear();

  // Filter products added this month
  const productsThisMonth = products.filter(p => {
    const dateProdAdded = new Date(p.dateAdded);
    return dateProdAdded.getMonth() === currentMonth && dateProdAdded.getFullYear() === currentYear;
  });

  // Total products sold this month (sum of quantity)
  const totalQuantity = productsThisMonth.reduce((sum, p) => sum + (parseInt(p.productQuantity) || 0), 0);
  productsSoldEl.textContent = totalQuantity;

  // Total sales value this month
  const totalSales = productsThisMonth.reduce((sum, p) => sum + ((parseFloat(p.productPrice) || 0) * (parseInt(p.productQuantity) || 0)), 0);
  totalSalesEl.textContent = `PKR ${totalSales.toLocaleString()}`;

  // Count quantities per product
  const productCounts = {}; // { "Product Name": totalQuantity }
  const productSales = {}; // { "Product Name": totalSales }

  productsThisMonth.forEach(p => {
    const name = p.productName;
    const qty = parseInt(p.productQuantity) || 0;
    const price = parseFloat(p.productPrice) || 0;

    // Count quantities
    if (productCounts[name]) {
      productCounts[name] += qty;
    } else {
      productCounts[name] = qty;
    }

    // Count total sales
    const totalPrice = qty * price;
    if (productSales[name]) {
      productSales[name] += totalPrice;
    } else {
      productSales[name] = totalPrice;
    }
  });

  // ---- Most sold product ----
  let mostSoldProduct = "-";
  let maxQty = 0;

  // ---- Least sold product ----
  let leastSoldProduct = "-";
  let minQty = Infinity;

  for (const [name, qty] of Object.entries(productCounts)) {
    if (qty > maxQty) {
      maxQty = qty;
      mostSoldProduct = name;
    }
    if (qty < minQty) {
      minQty = qty;
      leastSoldProduct = name;
    }
  }

  mostSoldEl.textContent = mostSoldProduct;
  leastSoldEl.textContent = leastSoldProduct;

  // ---- Highest sales product ----
  let highestSalesProduct = "-";
  let maxSales = 0;

  for (const [name, sales] of Object.entries(productSales)) {
    if (sales > maxSales) {
      maxSales = sales;
      highestSalesProduct = name;
    }
  }

  highestSalesProductEl.textContent = `${highestSalesProduct} - PKR ${maxSales.toLocaleString()}`;
}

// ====== CALL AFTER ANY CHANGE ======
document.addEventListener("DOMContentLoaded", updateQuickStats);
