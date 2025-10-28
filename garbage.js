// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC32sfpy2olz_06Kc0qXgJVxTrT3wOMz6E",
    authDomain: "smsw-13a0d.firebaseapp.com",
    projectId: "smsw-13a0d",
    storageBucket: "smsw-13a0d.firebasestorage.app",
    messagingSenderId: "264297108239",
    appId: "1:264297108239:web:f8913c539b8bb656c3647a",
    measurementId: "G-Z2339QK6K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();


let checkUser = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {

        } else {
            window.location.replace('Login/login.html')
        }
    });
}



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















< !DOCTYPE html >
    <html lang="en">

        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>StoreSync - Dashboard</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                        <link rel="stylesheet" href="style.css">
                        </head>

                        <body class="bg-gray-50">

                            <!-- Simple & Clean Navbar -->
                            <nav class="bg-white shadow sticky top-0 z-50">
                                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div class="flex justify-between items-center h-16">
                                        <!-- Left: Logo & Links -->
                                        <div class="flex items-center space-x-6">
                                            <!-- Logo -->
                                            <div class="flex items-center space-x-2">
                                                <div class="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                                                    <i class="fas fa-store"></i>
                                                </div>
                                                <span class="text-xl font-bold text-gray-800">StoreSync</span>
                                            </div>

                                            <!-- Navigation Links -->
                                            <div class="hidden md:flex space-x-3">
                                                <a href="index.html"
                                                    class="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition">Dashboard</a>
                                                <a href="../Add Product/addProduct.html"
                                                    class="px-3 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition">Add
                                                    Products</a>
                                                <a href="../Inventary/inventory.html"
                                                    class="px-3 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition">Inventory</a>
                                            </div>
                                        </div>

                                        <!-- Right: User -->
                                        <div class="flex items-center space-x-4">
                                            <!-- Notification -->
                                            <button class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition">
                                                <i class="fas fa-bell"></i>
                                            </button>

                                            <!-- Profile -->
                                            <div class="flex items-center space-x-2">
                                                <div
                                                    class="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                                    A</div>
                                                <div class="hidden md:block">
                                                    <p class="text-sm font-medium text-gray-800">Admin</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Mobile Links -->
                                <div class="md:hidden border-t border-gray-100">
                                    <div class="flex justify-around py-2">
                                        <a href="../Dashboard/index.html" class="flex flex-col items-center text-blue-600">
                                            <i class="fas fa-chart-pie"></i>
                                            <span class="text-xs">Dashboard</span>
                                        </a>
                                        <a href="../Add Product/addProduct.html" class="flex flex-col items-center text-gray-600">
                                            <i class="fas fa-plus-circle"></i>
                                            <span class="text-xs">Add</span>
                                        </a>
                                        <a href="../Inventary/inventory.html" class="flex flex-col items-center text-gray-600">
                                            <i class="fas fa-boxes"></i>
                                            <span class="text-xs">Inventory</span>
                                        </a>
                                    </div>
                                </div>
                            </nav>


                            <!-- Dashboard Content -->
                            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                <!-- Header -->
                                <div class="mb-8">
                                    <h1 class="text-3xl font-bold text-gray-800">Store Overview</h1>
                                    <p class="text-gray-600 mt-2">Track your store performance at a glance</p>
                                </div>

                                <!-- Quick Stats -->
                                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">

                                    <!-- Products Sold This Month -->
                                    <div
                                        class="bg-white rounded-xl shadow p-6 flex flex-col justify-between border border-gray-100 hover:shadow-md transition-all">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <p class="text-gray-500 text-sm">Products Sold This Month</p>
                                                <h3 class="text-2xl font-bold text-gray-800 mt-1" id="productsSold">0</h3>
                                                <p class="text-green-600 text-xs mt-1 flex items-center">
                                                    <i class="fas fa-arrow-up mr-1"></i>Current month
                                                </p>
                                            </div>
                                            <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                <i class="fas fa-boxes text-blue-600"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Total Sales Value This Month -->
                                    <div
                                        class="bg-white rounded-xl shadow p-6 flex flex-col justify-between border border-gray-100 hover:shadow-md transition-all">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <p class="text-gray-500 text-sm">Total Sales Value</p>
                                                <h3 class="text-2xl font-bold text-gray-800 mt-1" id="totalSales">PKR 0</h3>
                                                <p class="text-blue-600 text-xs mt-1 flex items-center">
                                                    <i class="fas fa-chart-line mr-1"></i>Revenue
                                                </p>
                                            </div>
                                            <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                                <i class="fas fa-shopping-cart text-green-600"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Daily Sales -->
                                    <div
                                        class="bg-white rounded-xl shadow p-6 flex flex-col justify-between border border-gray-100 hover:shadow-md transition-all">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <p class="text-gray-500 text-sm">Today's Sales</p>
                                                <h3 class="text-2xl font-bold text-gray-800 mt-1" id="dailySales">PKR 0</h3>
                                                <p class="text-orange-600 text-xs mt-1 flex items-center">
                                                    <i class="fas fa-calendar-day mr-1"></i>Live
                                                </p>
                                            </div>
                                            <div class="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                                                <i class="fas fa-bolt text-orange-600"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Low Stock Alert -->
                                    <div
                                        class="bg-white rounded-xl shadow p-6 flex flex-col justify-between border border-gray-100 hover:shadow-md transition-all">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <p class="text-gray-500 text-sm">Low Stock Items</p>
                                                <h3 class="text-2xl font-bold text-gray-800 mt-1" id="lowStockItems">0</h3>
                                                <p class="text-red-600 text-xs mt-1 flex items-center">
                                                    <i class="fas fa-exclamation-circle mr-1"></i>Needs attention
                                                </p>
                                            </div>
                                            <div class="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                                <i class="fas fa-exclamation-triangle text-red-600"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Highest Sales Product -->
                                    <div
                                        class="bg-white rounded-xl shadow p-6 flex flex-col justify-between border border-gray-100 hover:shadow-md transition-all">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <p class="text-gray-500 text-sm">Highest Sales Product</p>
                                                <h3 class="text-xl font-bold text-gray-800 mt-1" id="highestSalesProduct">-</h3>
                                                <p class="text-yellow-600 text-xs mt-1 flex items-center">
                                                    <i class="fas fa-crown mr-1"></i>Top performer
                                                </p>
                                            </div>
                                            <div class="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                                <i class="fas fa-dollar-sign text-yellow-600"></i>
                                            </div>
                                        </div>
                                    </div>


                                    <!-- Most Sold Product -->
                                    <div
                                        class="bg-white rounded-xl shadow p-6 flex flex-col justify-between border border-gray-100 hover:shadow-md transition-all">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <p class="text-gray-500 text-sm">Most Sold Product</p>
                                                <h3 class="text-xl font-bold text-gray-800 mt-1" id="mostSold">-</h3>
                                                <p class="text-purple-600 text-xs mt-1 flex items-center">
                                                    <i class="fas fa-trophy mr-1"></i>Popular
                                                </p>
                                            </div>
                                            <div class="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                                <i class="fas fa-trophy text-purple-600"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Least Sold Product -->
                                    <div
                                        class="bg-white rounded-xl shadow p-6 flex flex-col justify-between border border-gray-100 hover:shadow-md transition-all">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <p class="text-gray-500 text-sm">Least Sold Product</p>
                                                <h3 class="text-xl font-bold text-gray-800 mt-1" id="leastSold">-</h3>
                                                <p class="text-gray-600 text-xs mt-1 flex items-center">
                                                    <i class="fas fa-chart-line mr-1"></i>Review needed
                                                </p>
                                            </div>
                                            <div class="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                                <i class="fas fa-arrow-down text-gray-600"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Customer Dues -->
                                    <div
                                        class="bg-white rounded-xl shadow p-6 flex flex-col justify-between border border-gray-100 hover:shadow-md transition-all">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <p class="text-gray-500 text-sm">Customer Dues</p>
                                                <h3 class="text-2xl font-bold text-gray-800 mt-1" id="customerDues">PKR 0</h3>
                                                <p class="text-indigo-600 text-xs mt-1 flex items-center">
                                                    <i class="fas fa-hand-holding-usd mr-1"></i>Pending
                                                </p>
                                            </div>
                                            <div class="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <i class="fas fa-credit-card text-indigo-600"></i>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <!-- Business Insights Section -->
                                <div class="bg-white rounded-xl shadow p-6 mb-8 border border-gray-100">
                                    <div class="flex items-center justify-between mb-6">
                                        <h2 class="text-xl font-bold text-gray-800">
                                            <i class="fas fa-chart-line text-blue-500 mr-2"></i>
                                            Business Insights
                                        </h2>
                                        <div class="text-sm text-gray-500 flex items-center">
                                            <div class="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                            Live Analysis
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <!-- Performance Metrics -->
                                        <div class="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                            <div class="flex items-center mb-2">
                                                <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                                    <i class="fas fa-tachometer-alt text-blue-600 text-sm"></i>
                                                </div>
                                                <h3 class="font-semibold text-gray-800">Performance Score</h3>
                                            </div>
                                            <div class="text-2xl font-bold text-gray-800 mb-1" id="performanceScore">85%</div>
                                            <div class="text-sm text-gray-600">Based on sales trends</div>
                                        </div>

                                        <!-- Stock Health -->
                                        <div class="p-4 bg-green-50 rounded-lg border border-green-100">
                                            <div class="flex items-center mb-2">
                                                <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                                    <i class="fas fa-heartbeat text-green-600 text-sm"></i>
                                                </div>
                                                <h3 class="font-semibold text-gray-800">Stock Health</h3>
                                            </div>
                                            <div class="text-2xl font-bold text-gray-800 mb-1" id="stockHealth">92%</div>
                                            <div class="text-sm text-gray-600">Optimal inventory levels</div>
                                        </div>

                                        <!-- Revenue Trend -->
                                        <div class="p-4 bg-purple-50 rounded-lg border border-purple-100">
                                            <div class="flex items-center mb-2">
                                                <div class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                                    <i class="fas fa-chart-bar text-purple-600 text-sm"></i>
                                                </div>
                                                <h3 class="font-semibold text-gray-800">Revenue Trend</h3>
                                            </div>
                                            <div class="text-2xl font-bold text-gray-800 mb-1" id="revenueTrend">+12%</div>
                                            <div class="text-sm text-gray-600">Month over month</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Two Column Layout -->
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                    <!-- Low Stock Alerts -->
                                    <div class="bg-white rounded-xl shadow p-6 border border-gray-100">
                                        <div class="flex justify-between items-center mb-6">
                                            <h2 class="text-xl font-bold text-gray-800">
                                                <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                                                Low Stock Alerts
                                            </h2>
                                            <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold" id="alertCount">
                                                0 Alerts
                                            </span>
                                        </div>

                                        <div class="overflow-x-auto">
                                            <table class="w-full text-left">
                                                <thead>
                                                    <tr class="border-b border-gray-200">
                                                        <th class="py-3 px-4 text-gray-600 font-semibold">Product</th>
                                                        <th class="py-3 px-4 text-gray-600 font-semibold">Current Stock</th>
                                                        <th class="py-3 px-4 text-gray-600 font-semibold">Status</th>
                                                        <th class="py-3 px-4 text-gray-600 font-semibold">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="lowStockTable">
                                                    <tr>
                                                        <td colspan="4" class="py-8 text-center text-gray-500">
                                                            <i class="fas fa-check-circle text-3xl mb-2 block text-green-500"></i>
                                                            No low stock items
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <!-- Quick Actions -->
                                    <div class="bg-white rounded-xl shadow p-6 border border-gray-100">
                                        <h2 class="text-xl font-bold text-gray-800 mb-6">
                                            <i class="fas fa-bolt text-yellow-500 mr-2"></i>
                                            Quick Actions
                                        </h2>

                                        <div class="grid grid-cols-2 gap-4">
                                            <a href="../Add Product/addProduct.html"
                                                class="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-all text-center group">
                                                <div
                                                    class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                                    <i class="fas fa-plus text-blue-600"></i>
                                                </div>
                                                <div class="text-blue-700 font-semibold">Add Product</div>
                                                <div class="text-blue-600 text-xs mt-1">New item</div>
                                            </a>

                                            <a href="../Inventary/inventory.html"
                                                class="p-4 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-all text-center group">
                                                <div
                                                    class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                                    <i class="fas fa-boxes text-green-600"></i>
                                                </div>
                                                <div class="text-green-700 font-semibold">Inventory</div>
                                                <div class="text-green-600 text-xs mt-1">Manage stock</div>
                                            </a>

                                            <button
                                                class="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 transition-all text-center group">
                                                <div
                                                    class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                                    <i class="fas fa-chart-bar text-purple-600"></i>
                                                </div>
                                                <div class="text-purple-700 font-semibold">Reports</div>
                                                <div class="text-purple-600 text-xs mt-1">Generate</div>
                                            </button>

                                            <button
                                                class="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 transition-all text-center group">
                                                <div
                                                    class="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                                    <i class="fas fa-cog text-orange-600"></i>
                                                </div>
                                                <div class="text-orange-700 font-semibold">Settings</div>
                                                <div class="text-orange-600 text-xs mt-1">Preferences</div>
                                            </button>
                                        </div>

                                        <!-- Live Stats -->
                                        <div class="mt-6 pt-6 border-t border-gray-200">
                                            <div class="grid grid-cols-3 gap-4 text-center">
                                                <div>
                                                    <div class="text-2xl font-bold text-gray-800" id="totalProducts">0</div>
                                                    <div class="text-gray-600 text-sm">Total Products</div>
                                                </div>
                                                <div>
                                                    <div class="text-2xl font-bold text-gray-800" id="activeProducts">0</div>
                                                    <div class="text-gray-600 text-sm">In Stock</div>
                                                </div>
                                                <div>
                                                    <div class="text-2xl font-bold text-gray-800" id="outOfStock">0</div>
                                                    <div class="text-gray-600 text-sm">Out of Stock</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Product Performance Table -->
                                <div class="bg-white rounded-xl shadow p-6 border border-gray-100">
                                    <div class="flex justify-between items-center mb-6">
                                        <h2 class="text-xl font-bold text-gray-800">
                                            <i class="fas fa-chart-pie text-blue-500 mr-2"></i>
                                            Product Performance
                                        </h2>
                                        <div class="text-sm text-gray-500 flex items-center">
                                            <span id="productCount">0</span> products in inventory
                                            <div class="h-2 w-2 bg-blue-500 rounded-full ml-2 animate-pulse"></div>
                                        </div>
                                    </div>

                                    <div class="overflow-x-auto">
                                        <table class="w-full text-left">
                                            <thead>
                                                <tr class="border-b border-gray-200">
                                                    <th class="py-3 px-4 text-gray-600 font-semibold">Product</th>
                                                    <th class="py-3 px-4 text-gray-600 font-semibold">Category</th>
                                                    <th class="py-3 px-4 text-gray-600 font-semibold">Price</th>
                                                    <th class="py-3 px-4 text-gray-600 font-semibold">Sales</th>
                                                    <th class="py-3 px-4 text-gray-600 font-semibold">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody id="productsTable">
                                                <tr>
                                                    <td colspan="5" class="py-8 text-center text-gray-500">
                                                        <i class="fas fa-box-open text-3xl mb-2 block"></i>
                                                        No products added yet. <a href="../Add Product/addProduct.html"
                                                            class="text-blue-600 hover:underline">Add your first product</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <script src="app.js"></script>
                        </body>

                  
                    </html>


















                    // ====== QUICK STATS ELEMENTS ======
const productsSoldEl = document.getElementById("productsSold");
const totalSalesEl = document.getElementById("totalSales");
const mostSoldEl = document.getElementById("mostSold");
const leastSoldEl = document.getElementById("leastSold");
const highestSalesProductEl = document.getElementById("highestSalesProduct");
const dailySalesEl = document.getElementById("dailySales");
const lowStockItemsEl = document.getElementById("lowStockItems");
const customerDuesEl = document.getElementById("customerDues");
const productCountEl = document.getElementById("productCount");
const productsTableEl = document.getElementById("productsTable");
const lowStockTableEl = document.getElementById("lowStockTable");
const alertCountEl = document.getElementById("alertCount");
const totalProductsEl = document.getElementById("totalProducts");
const activeProductsEl = document.getElementById("activeProducts");
const outOfStockEl = document.getElementById("outOfStock");
const performanceScoreEl = document.getElementById("performanceScore");
const stockHealthEl = document.getElementById("stockHealth");
const revenueTrendEl = document.getElementById("revenueTrend");

// ====== INITIALIZE DASHBOARD ======
document.addEventListener("DOMContentLoaded", function () {
  updateQuickStats();
  updateEnhancedDashboard();

  // Refresh data every 30 seconds
  setInterval(() => {
    updateQuickStats();
    updateEnhancedDashboard();
  }, 30000);
});

// ====== ENHANCED DASHBOARD FUNCTIONS ======
function updateEnhancedDashboard() {
  updateProductTable();
  updateLowStockTable();
  updateBusinessInsights();
  updateLiveStats();
}

function updateBusinessInsights() {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (products.length === 0) {
    if (performanceScoreEl) performanceScoreEl.textContent = "0%";
    if (stockHealthEl) stockHealthEl.textContent = "0%";
    if (revenueTrendEl) revenueTrendEl.textContent = "0%";
    return;
  }

  // Calculate performance score (placeholder logic)
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => (parseInt(p.productQuantity) || 0) > 0).length;
  const performanceScore = Math.min(100, Math.floor((inStockProducts / totalProducts) * 100));

  // Calculate stock health
  const lowStockCount = products.filter(p => {
    const currentStock = parseInt(p.productQuantity) || 0;
    return currentStock > 0 && currentStock <= 10;
  }).length;
  const stockHealth = Math.max(0, 100 - (lowStockCount * 10));

  // Revenue trend (placeholder)
  const revenueTrend = "+12%";

  if (performanceScoreEl) performanceScoreEl.textContent = `${performanceScore}%`;
  if (stockHealthEl) stockHealthEl.textContent = `${stockHealth}%`;
  if (revenueTrendEl) revenueTrendEl.textContent = revenueTrend;
}

function updateLiveStats() {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  const totalProducts = products.length;
  const activeProducts = products.filter(p => (parseInt(p.productQuantity) || 0) > 0).length;
  const outOfStock = products.filter(p => (parseInt(p.productQuantity) || 0) === 0).length;

  if (totalProductsEl) totalProductsEl.textContent = totalProducts;
  if (activeProductsEl) activeProductsEl.textContent = activeProducts;
  if (outOfStockEl) outOfStockEl.textContent = outOfStock;
}

function updateLowStockTable() {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (!lowStockTableEl) return;

  const lowStockProducts = products.filter(p => {
    const currentStock = parseInt(p.productQuantity) || 0;
    return currentStock > 0 && currentStock <= 10;
  });

  if (alertCountEl) {
    alertCountEl.textContent = `${lowStockProducts.length} Alert${lowStockProducts.length !== 1 ? 's' : ''}`;
  }

  if (lowStockProducts.length === 0) {
    lowStockTableEl.innerHTML = `
            <tr>
                <td colspan="4" class="py-8 text-center text-gray-500">
                    <i class="fas fa-check-circle text-3xl mb-2 block text-green-500"></i>
                    No low stock items
                </td>
            </tr>
        `;
    return;
  }

  let tableHTML = '';
  lowStockProducts.forEach(product => {
    const currentStock = parseInt(product.productQuantity) || 0;
    const status = getStockStatus(currentStock);

    tableHTML += `
            <tr class="border-b border-gray-100 hover:bg-red-50 transition-colors">
                <td class="py-3 px-4">
                    <div class="font-medium text-gray-800">${product.productName}</div>
                    <div class="text-gray-500 text-sm">${product.productCategory || 'General'}</div>
                </td>
                <td class="py-3 px-4">
                    <span class="font-semibold ${currentStock <= 5 ? 'text-red-600' : 'text-orange-600'}">
                        ${currentStock} units
                    </span>
                </td>
                <td class="py-3 px-4">
                    ${getStatusBadge(status)}
                </td>
                <td class="py-3 px-4">
                    <button class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors">
                        Restock
                    </button>
                </td>
            </tr>
        `;
  });

  lowStockTableEl.innerHTML = tableHTML;
}

function getStockStatus(quantity) {
  if (quantity === 0) return 'out-of-stock';
  if (quantity <= 3) return 'critical';
  if (quantity <= 10) return 'low';
  return 'healthy';
}

function getStatusBadge(status) {
  const badges = {
    'healthy': '<span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Healthy</span>',
    'low': '<span class="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Low Stock</span>',
    'critical': '<span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Critical</span>',
    'out-of-stock': '<span class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Out of Stock</span>'
  };
  return badges[status] || badges['healthy'];
}

function updateProductTable() {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (!productsTableEl) return;

  if (products.length === 0) {
    productsTableEl.innerHTML = `
            <tr>
                <td colspan="5" class="py-8 text-center text-gray-500">
                    <i class="fas fa-box-open text-3xl mb-2 block"></i>
                    No products added yet. <a href="../Add Product/addProduct.html"
                    class="text-blue-600 hover:underline">Add your first product</a>
                </td>
            </tr>
        `;
    return;
  }

  if (productCountEl) {
    productCountEl.textContent = products.length;
  }

  let tableHTML = '';
  products.forEach(product => {
    const quantity = parseInt(product.productQuantity) || 0;
    const status = getStockStatus(quantity);

    tableHTML += `
            <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="py-3 px-4">
                    <div class="font-medium text-gray-800">${product.productName}</div>
                </td>
                <td class="py-3 px-4 text-gray-600">${product.productCategory || 'General'}</td>
                <td class="py-3 px-4 text-gray-600">PKR ${(parseFloat(product.productPrice) || 0).toLocaleString()}</td>
                <td class="py-3 px-4">
                    <span class="font-medium text-gray-800">${Math.floor(Math.random() * 100)}</span>
                    <span class="text-sm text-gray-500 ml-1">units</span>
                </td>
                <td class="py-3 px-4">
                    ${getStatusBadge(status)}
                </td>
            </tr>
        `;
  });

  productsTableEl.innerHTML = tableHTML;
}

// ====== YOUR EXISTING CODE - UNCHANGED ======
// ====== HELPER FUNCTIONS ======

// Get products of current month
function getProductsThisMonth(products) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return products.filter(p => {
    const dateProdAdded = new Date(p.dateAdded);
    return dateProdAdded.getMonth() === currentMonth && dateProdAdded.getFullYear() === currentYear;
  });
}

// Calculate total quantity sold
function calculateTotalQuantity(productsThisMonth) {
  return productsThisMonth.reduce((sum, p) => sum + (parseInt(p.productQuantity) || 0), 0);
}

// Calculate total sales
function calculateTotalSales(productsThisMonth) {
  return productsThisMonth.reduce((sum, p) => {
    return sum + ((parseInt(p.productQuantity) || 0) * (parseFloat(p.productPrice) || 0));
  }, 0);
}

// Find most and least sold products
function getMostLeastSold(productsThisMonth) {
  let ProductsCount = {};

  productsThisMonth.forEach(p => {
    if (p.productName in ProductsCount) {
      ProductsCount[p.productName].prodCount += 1;
    } else {
      ProductsCount[p.productName] = { prodCount: 1 };
    }
  });

  const productsArray = Object.entries(ProductsCount).map(([name, obj]) => ({
    name: name,
    prodCount: obj.prodCount
  }));

  let mostSoldObj = { name: "-", prodCount: -Infinity };
  let leastSoldObj = { name: "-", prodCount: Infinity };

  productsArray.forEach(p => {
    if (p.prodCount > mostSoldObj.prodCount) mostSoldObj = p;
    if (p.prodCount < leastSoldObj.prodCount) leastSoldObj = p;
  });

  return { mostSoldObj, leastSoldObj };
}

// Find highest sales product
function getHighestSalesProduct(productsThisMonth) {
  let ProductSales = {};

  productsThisMonth.forEach(p => {
    const qty = parseInt(p.productQuantity) || 0;
    const price = parseFloat(p.productPrice) || 0;
    const total = qty * price;

    if (p.productName in ProductSales) {
      ProductSales[p.productName].totalSales += total;
    } else {
      ProductSales[p.productName] = { totalSales: total };
    }
  });

  const productSalesArray = Object.entries(ProductSales).map(([name, obj]) => ({
    name: name,
    totalSales: obj.totalSales
  }));

  let highestSalesObj = { name: "-", totalSales: 0 };

  productSalesArray.forEach(p => {
    if (p.totalSales > highestSalesObj.totalSales) highestSalesObj = p;
  });

  return highestSalesObj;
}

// ====== MAIN FUNCTION ======
function updateQuickStats() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productsThisMonth = getProductsThisMonth(products);

  // Update totals
  const totalQuantity = calculateTotalQuantity(productsThisMonth);
  const totalSales = calculateTotalSales(productsThisMonth);
  productsSoldEl.textContent = totalQuantity;
  totalSalesEl.textContent = `PKR ${totalSales.toLocaleString()}`;

  // Update most/least sold
  const { mostSoldObj, leastSoldObj } = getMostLeastSold(productsThisMonth);
  mostSoldEl.textContent = mostSoldObj.name;
  leastSoldEl.textContent = leastSoldObj.name;

  // Update highest sales product
  const highestSalesObj = getHighestSalesProduct(productsThisMonth);
  highestSalesProductEl.textContent = `${highestSalesObj.name} - PKR ${highestSalesObj.totalSales.toLocaleString()}`;

  // Update enhanced stats
  updateEnhancedStats(products);
}

function updateEnhancedStats(products) {
  // Daily Sales
  const today = new Date().toDateString();
  const todaySales = products.filter(p => {
    const saleDate = new Date(p.dateAdded);
    return saleDate.toDateString() === today;
  }).reduce((sum, p) => sum + ((parseFloat(p.productPrice) || 0) * (parseInt(p.productQuantity) || 0)), 0);

  if (dailySalesEl) dailySalesEl.textContent = `PKR ${todaySales.toLocaleString()}`;

  // Low Stock Items
  const lowStockCount = products.filter(p => {
    const currentStock = parseInt(p.productQuantity) || 0;
    return currentStock > 0 && currentStock <= 10;
  }).length;

  if (lowStockItemsEl) lowStockItemsEl.textContent = lowStockCount;

  // Customer Dues (placeholder)
  const customerDues = 0; // You can implement this later
  if (customerDuesEl) customerDuesEl.textContent = `PKR ${customerDues.toLocaleString()}`;
}