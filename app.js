// ====== QUICK STATS ELEMENTS ======
const productsSoldEl = document.getElementById("productsSold");
const totalSalesEl = document.getElementById("totalSales");
const mostSoldEl = document.getElementById("mostSold");
const leastSoldEl = document.getElementById("leastSold");
const highestSalesProductEl = document.getElementById("highestSalesProduct");

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
}

// ====== CALL AFTER ANY CHANGE ======
document.addEventListener("DOMContentLoaded", updateQuickStats);







// ====== PRODUCT PERFORMANCE SCRIPT (Fixed & Beginner Friendly) ======

// Get HTML elements
// const performancePeriod = document.getElementById("performancePeriod");
// const performanceSort = document.getElementById("performanceSort");
// const updatePerformanceBtn = document.getElementById("updatePerformance");
// const performanceBody = document.getElementById("performanceBody");
// const performanceEmpty = document.getElementById("performanceEmpty");







// // ====== Helper: Get products from localStorage ======
// function getProductsFromStorage() {
//   const stored = localStorage.getItem("products");
//   return stored ? JSON.parse(stored) : [];
// }

// // ====== Get products by selected time period ======
// function getProductsByPeriod(products, period) {
//   const now = new Date();
//   let startDate;

//   if (period === "week") {
//     startDate = new Date();
//     startDate.setDate(now.getDate() - 7);
//   } else if (period === "month") {
//     startDate = new Date(now.getFullYear(), now.getMonth(), 1);
//   } else if (period === "quarter") {
//     const currentQuarter = Math.floor(now.getMonth() / 3);
//     startDate = new Date(now.getFullYear(), currentQuarter * 3, 1);
//   } else if (period === "year") {
//     startDate = new Date(now.getFullYear(), 0, 1);
//   } else {
//     startDate = new Date(now.getFullYear(), now.getMonth(), 1);
//   }

//   // Filter products added after start date
//   return products.filter(p => new Date(p.dateAdded) >= startDate);
// }

// // ====== Calculate totals for each product ======
// function calculateProductPerformance(products) {
//   const result = {};

//   products.forEach(p => {
//     const name = p.productName;
//     const category = p.productCategory;
//     const qty = Number(p.productQuantity) || 0;
//     const revenue = Number(p.productPrice) || 0; // ✅ already total revenue

//     if (result[name]) {
//       result[name].totalQty += qty;
//       result[name].totalRevenue += revenue;
//       result[name].timesSold += 1;
//     } else {
//       result[name] = {
//         name,
//         category,
//         totalQty: qty,
//         totalRevenue: revenue,
//         timesSold: 1
//       };
//     }
//   });

//   return Object.values(result);
// }

// // ====== Sort products ======
// function sortProducts(data, type) {
//   if (type === "quantity") {
//     return data.sort((a, b) => b.totalQty - a.totalQty);
//   } else if (type === "revenue") {
//     return data.sort((a, b) => b.totalRevenue - a.totalRevenue);
//   } else {
//     return data.sort((a, b) => b.timesSold - a.timesSold);
//   }
// }

// // ====== Determine performance rating ======
// function getPerformanceLevel(product, allProducts) {
//   const maxRevenue = Math.max(...allProducts.map(p => p.totalRevenue));
//   const score = product.totalRevenue / (maxRevenue || 1);

//   if (score >= 0.8) return "Excellent";
//   if (score >= 0.6) return "Good";
//   if (score >= 0.4) return "Average";
//   if (score >= 0.2) return "Below Average";
//   return "Poor";
// }

// // ====== Choose color for badge ======
// function getBadgeColor(level) {
//   if (level === "Excellent") return "bg-green-100 text-green-800";
//   if (level === "Good") return "bg-blue-100 text-blue-800";
//   if (level === "Average") return "bg-yellow-100 text-yellow-800";
//   if (level === "Below Average") return "bg-orange-100 text-orange-800";
//   return "bg-red-100 text-red-800";
// }

// // ====== Main Function ======
// function updateProductPerformance() {
//   const products = getProductsFromStorage();
//   const period = performancePeriod.value;
//   const sortBy = performanceSort.value;

//   const periodProducts = getProductsByPeriod(products, period);
//   const performance = calculateProductPerformance(periodProducts);
//   const sorted = sortProducts(performance, sortBy);

//   performanceBody.innerHTML = "";

//   // If no data found
//   if (sorted.length === 0) {
//     performanceEmpty.classList.remove("hidden");
//     performanceBody.classList.add("hidden");
//     return;
//   }

//   performanceEmpty.classList.add("hidden");
//   performanceBody.classList.remove("hidden");

//   // Add table rows
//   sorted.forEach(p => {
//     const level = getPerformanceLevel(p, sorted);
//     const color = getBadgeColor(level);

//     const row = document.createElement("tr");
//     row.classList.add("hover:bg-gray-50");
//     row.innerHTML = `
//             <td class="px-4 py-3 text-sm font-medium text-gray-900">${p.name}</td>
//             <td class="px-4 py-3 text-sm text-gray-500">${p.category}</td>
//             <td class="px-4 py-3 text-sm text-gray-500">${p.totalQty}</td>
//             <td class="px-4 py-3 text-sm text-gray-500">PKR ${p.totalRevenue.toLocaleString()}</td>
//             <td class="px-4 py-3 text-sm text-gray-500">${p.timesSold} times</td>
//             <td class="px-4 py-3">
//                 <span class="px-2 inline-flex text-xs font-semibold rounded-full ${color}">
//                     ${level}
//                 </span>
//             </td>
//         `;
//     performanceBody.appendChild(row);
//   });
// }

// // ====== Event Listeners ======
// updatePerformanceBtn.addEventListener("click", updateProductPerformance);
// document.addEventListener("DOMContentLoaded", updateProductPerformance);
// document.addEventListener("productsUpdated", updateProductPerformance);




// 🔹 Get all HTML references
const performancePeriod = document.getElementById("performancePeriod");
const performanceSort = document.getElementById("performanceSort");
const updatePerformanceBtn = document.getElementById("updatePerformance");
const performanceBody = document.getElementById("performanceBody");
const performanceEmpty = document.getElementById("performanceEmpty");

// 🔹 Get products from localStorage
const getProductsFromStorage = () => {
  return JSON.parse(localStorage.getItem("products")) || [];
};

// 🔹 Get sale info for a product
const getProdSellingInfo = (prodName) => {
  let products = getProductsFromStorage();

  let prodAllSale = products.filter((p) => {
    return p.productName == prodName;
  });

  let prodTotalSalePrice = prodAllSale.reduce((prev, curr) => {
    return prev + curr.productPrice;
  }, 0);

  let prodTotalQuantitySale = prodAllSale.reduce((prev, curr) => {
    return prev + curr.productQuantity;
  }, 0);

  // 🟢 New fields (no logic change)
  let prodFrequency = prodAllSale.length;
  let prodPerformance = "Average";
  if (prodTotalSalePrice > 50000) prodPerformance = "Excellent";
  else if (prodTotalSalePrice > 20000) prodPerformance = "Good";

  return {
    prodTotalQuantitySale,
    prodTotalSalePrice,
    prodFrequency,
    prodPerformance
  };
};

let insertData = () => {
  const products = getProductsFromStorage();
  performanceBody.innerHTML = "";

  if (products.length === 0) {
    performanceEmpty.classList.remove("hidden");
    return;
  }

  performanceEmpty.classList.add("hidden");

  let alreadyAdded = {};

  products.forEach((p) => {
    if (alreadyAdded[p.productName]) {
      return;
    } else {
      alreadyAdded[p.productName] = true;

      let prodSellingInfo = getProdSellingInfo(p.productName);

      const row = document.createElement("tr");
      row.classList.add("hover:bg-gray-50");
      row.innerHTML = `
        <td class="px-4 py-3 text-sm font-medium text-gray-900">${p.productName}</td>
        <td class="px-4 py-3 text-sm text-gray-500">${p.productCategory}</td>
        <td class="px-4 py-3 text-sm text-gray-500">${prodSellingInfo.prodTotalQuantitySale}</td>
        <td class="px-4 py-3 text-sm text-gray-500">PKR ${prodSellingInfo.prodTotalSalePrice.toLocaleString()}</td>
        <td class="px-4 py-3 text-sm text-gray-500">${prodSellingInfo.prodFrequency} time${prodSellingInfo.prodFrequency > 1 ? "s" : ""}</td>
        <td class="px-4 py-3">
          <span class="px-2 inline-flex text-xs font-semibold rounded-full ${prodSellingInfo.prodPerformance === "Excellent"
          ? "bg-green-100 text-green-800"
          : prodSellingInfo.prodPerformance === "Good"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-800"
        }">
            ${prodSellingInfo.prodPerformance}
          </span>
        </td>
      `;
      performanceBody.appendChild(row);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  insertData();
});
