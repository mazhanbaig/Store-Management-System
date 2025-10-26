// // ====== ELEMENT REFERENCES ======
// const productNameInput = document.querySelector("input[type='text']");
// const productCategoryInput = document.querySelector("select");
// const productPriceInput = document.querySelector("input[type='number']");
// const addProductBtn = document.querySelector("button");
// const tbody = document.getElementById("tbody");

// // ====== ADD PRODUCT FUNCTION ======
// addProductBtn.addEventListener("click", () => {
//     const productInfo = {
//         productName: productNameInput.value.trim(),
//         productCategory: productCategoryInput.value,
//         productPrice: productPriceInput.value.trim() || "0",
//         dateAdded: new Date().toLocaleString(),
//     };

//     if (!productInfo.productName || !productInfo.productCategory) {
//         alert("Please fill all required fields!");
//         return;
//     }

//     let products = getProductsFromStorage();
//     products.push(productInfo);
//     localStorage.setItem("products", JSON.stringify(products));

//     insertProducts();
//     clearForm();
// });

// // ====== GET PRODUCTS FROM STORAGE ======
// function getProductsFromStorage() {
//     return JSON.parse(localStorage.getItem("products")) || [];
// }

// // ====== INSERT PRODUCTS INTO TABLE ======
// function insertProducts() {
//     let products = getProductsFromStorage();
//     tbody.innerHTML = "";

//     products.forEach((p, index) => {
//         let row = document.createElement("tr");
//         row.classList.add("border-b", "hover:bg-gray-50");
//         row.innerHTML = `
//       <td class="py-2">${p.productName}</td>
//       <td class="py-2">${p.productCategory}</td>
//       <td class="py-2">$${p.productPrice}</td>
//       <td class="py-2">${p.dateAdded}</td>
//       <td class="py-2 text-red-500 cursor-pointer delete-btn" data-index="${index}">
//         <i class="fas fa-trash"></i>
//       </td>
//     `;
//         tbody.appendChild(row);
//     });

//     // Update count display
//     const countText = document.querySelector(".text-sm.text-gray-500");
//     if (countText) countText.textContent = `${products.length} product(s) added`;

//     // Add delete functionality
//     document.querySelectorAll(".delete-btn").forEach((btn) => {
//         btn.addEventListener("click", (e) => {
//             let index = e.target.closest(".delete-btn").dataset.index;
//             deleteProduct(index);
//         });
//     });
// }

// // ====== DELETE PRODUCT ======
// function deleteProduct(index) {
//     let products = getProductsFromStorage();
//     products.splice(index, 1);
//     localStorage.setItem("products", JSON.stringify(products));
//     insertProducts();
// }

// // ====== CLEAR FORM ======
// function clearForm() {
//     productNameInput.value = "";
//     productCategoryInput.selectedIndex = 0;
//     productPriceInput.value = "";
// }


// document.addEventListener('DOMContentLoaded',()=>{
//     insertProducts();

// })










// ====== ELEMENT REFERENCES ======
const productNameInput = document.querySelector("input[type='text']");
const productCategoryInput = document.querySelector("select");
const productPriceInput = document.querySelector("input[type='number']");
const addProductBtn = document.querySelector("button");
const tbody = document.getElementById("tbody");

// ====== CREATE DATALIST FOR AUTOCOMPLETE ======
const nameList = document.createElement("datalist");
nameList.id = "productNamesList";
document.body.appendChild(nameList);
productNameInput.setAttribute("list", "productNamesList");

// ====== ADD PRODUCT FUNCTION ======
addProductBtn.addEventListener("click", () => {
    const productInfo = {
        productName: productNameInput.value.trim(),
        productCategory: productCategoryInput.value,
        productPrice: productPriceInput.value.trim() || "0",
        dateAdded: new Date().toLocaleString(),
    };

    if (!productInfo.productName || !productInfo.productCategory) {
        alert("Please fill all required fields!");
        return;
    }

    let products = getProductsFromStorage();
    products.push(productInfo);
    localStorage.setItem("products", JSON.stringify(products));

    insertProducts();
    clearForm();
    updateNameSuggestions(); // update name list when new added
});

// ====== GET PRODUCTS FROM STORAGE ======
function getProductsFromStorage() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

// ====== INSERT PRODUCTS INTO TABLE ======
function insertProducts() {
    let products = getProductsFromStorage();
    tbody.innerHTML = "";

    products.forEach((p, index) => {
        let row = document.createElement("tr");
        row.classList.add("border-b", "hover:bg-gray-50");
        row.innerHTML = `
      <td class="py-2">${p.productName}</td>
      <td class="py-2">${p.productCategory}</td>
      <td class="py-2">$${p.productPrice}</td>
      <td class="py-2">${p.dateAdded}</td>
      <td class="py-2 text-red-500 cursor-pointer delete-btn" data-index="${index}">
        🗑️
      </td>
    `;
        tbody.appendChild(row);
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let index = e.target.closest(".delete-btn").dataset.index;
            deleteProduct(index);
        });
    });
}

// ====== DELETE PRODUCT ======
function deleteProduct(index) {
    let products = getProductsFromStorage();
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    insertProducts();
    updateNameSuggestions();
}

// ====== CLEAR FORM ======
function clearForm() {
    productNameInput.value = "";
    productCategoryInput.selectedIndex = 0;
    productPriceInput.value = "";
}

// ====== POPULATE AUTOCOMPLETE OPTIONS ======
function updateNameSuggestions() {
    let products = getProductsFromStorage();
    nameList.innerHTML = "";

    let uniqueNames = [...new Set(products.map(p => p.productName))];

    uniqueNames.forEach(name => {
        let option = document.createElement("option");
        option.value = name;
        nameList.appendChild(option);
    });
}

// ====== INITIAL LOAD ======
document.addEventListener("DOMContentLoaded", () => {
    insertProducts();
    updateNameSuggestions();
});
