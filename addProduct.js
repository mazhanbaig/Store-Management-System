// ====== ELEMENT REFERENCES ======
const productNameInput = document.querySelector("input[type='text']");
const productCategoryInput = document.querySelector("select");
const quantityInput = document.getElementById('quantity');
const productPriceInput = document.querySelector("#price");
const addProductBtn = document.querySelector("#addBtn");
const tbody = document.getElementById("tbody");
const countText = document.querySelector(".text-sm.text-gray-500");

// ====== CREATE DATALIST FOR AUTOCOMPLETE ======
let nameList = document.getElementById("productNamesList");
if (!nameList) {
    nameList = document.createElement("datalist");
    nameList.id = "productNamesList";
    document.body.appendChild(nameList);
}
productNameInput.setAttribute("list", "productNamesList");

// ====== GET PRODUCTS FROM STORAGE ======
function getProductsFromStorage() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

// ====== SAVE PRODUCTS TO STORAGE ======
function saveProductsToStorage(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

// ====== INSERT PRODUCTS INTO TABLE ======
function insertProducts() {
    const products = getProductsFromStorage();
    tbody.innerHTML = "";

    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="py-8 text-center text-gray-500">
                    No products added yet.
                </td>
            </tr>`;
        countText.textContent = "0 products added";
        return;
    }

    products.forEach((p, index) => {
        const row = document.createElement("tr");
        row.classList.add("border-b", "hover:bg-gray-50");
        row.innerHTML = `
            <td class="py-2">${p.productName}</td>
            <td class="py-2">${p.productCategory}</td>
            <td class="py-2">PKR ${p.productPrice || "0"}</td>
            <td class="py-2">${p.dateAdded}</td>
            <td class="py-2">${p.productQuantity}</td>
            <td class="py-2 text-red-500 cursor-pointer delete-btn" data-index="${index}">🗑️</td>
        `;
        tbody.appendChild(row);
    });

    countText.textContent = `${products.length} product(s) added`;

    // Attach delete events
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.closest(".delete-btn").dataset.index;
            deleteProduct(index);
        });
    });
}

// ====== DELETE PRODUCT ======
function deleteProduct(index) {
    const products = getProductsFromStorage();
    products.splice(index, 1);
    saveProductsToStorage(products);
    insertProducts();
    updateNameSuggestions();
}

// ====== CLEAR FORM ======
function clearForm() {
    productNameInput.value = "";
    productCategoryInput.selectedIndex = 0;
    productPriceInput.value = "";
    quantityInput.value = "";
}

// ====== UPDATE AUTOCOMPLETE ======
function updateNameSuggestions() {
    const products = getProductsFromStorage();
    nameList.innerHTML = "";

    const uniqueNames = [...new Set(products.map(p => p.productName))];
    uniqueNames.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        nameList.appendChild(option);
    });
}

// ====== ADD PRODUCT FUNCTION ======
addProductBtn.addEventListener("click", () => {
    const productInfo = {
        productName: productNameInput.value.trim(),
        productCategory: productCategoryInput.value,
        productPrice: Number(productPriceInput.value.trim()) || 0,   // convert to number
        productQuantity: Number(quantityInput.value.trim()) || 0, 
        dateAdded: new Date().toLocaleString(),
    };

    if (!productInfo.productName || !productInfo.productCategory || !productInfo.productQuantity) {
        alert("Please fill all required fields!");
        return;
    }

    const products = getProductsFromStorage();
    products.push(productInfo);
    saveProductsToStorage(products);

    insertProducts();
    clearForm();
    updateNameSuggestions();
});

// ====== INITIAL LOAD ======
document.addEventListener("DOMContentLoaded", () => {
    insertProducts();
    updateNameSuggestions();
});
