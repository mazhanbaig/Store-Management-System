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
