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
