const productNameElm = document.querySelector(".input-form input[type='text']");
const productPriceElm = document.querySelector(".input-form #price");
const addButtonElm = document.querySelector(".input-form button");
const totalPriceElm = document.querySelector(".total span");
let productContainerElm = document.querySelector("table tbody"),
  productsContainer = [],
  index = 1;

function addProduct() {
  let theProduct = {
    name: productNameElm.value,
    price: productPriceElm.value,
  };

  productsContainer.push(theProduct);
  showProduct();
  totalPrice = 0;
  calcTotalPrice();
}

function showProduct() {
  let product = "";
  for (let i = 0; i < productsContainer.length; i++) {
    product += `
    <tr>
    <td>${i + 1}</td>
    <td>${productsContainer[i].name}</td>
    <td>${productsContainer[i].price}</td>
    <td><button class="delete" onclick=deleteProduct(${i})>Delete</button></td>
  </tr>
    `;
  }
  productContainerElm.innerHTML = product;
}

// resetInput function
function resetInput() {
  productNameElm.value = "";
  productPriceElm.value = "";
}

// to add product when click at add button
addButtonElm.addEventListener("click", () => {
  if (productNameElm.value === "" || productPriceElm.value === "") {
    swal("warning!", {
      title: "You must add your product name and price!",
      icon: "warning",
      timer: 2000,
      buttons: false,
    });
  } else if (isProductExist()) {
    isProductExist();
    resetInput();
  } else {
    addProduct();
    resetInput();
  }
});

// function to Delete Product
function deleteProduct(index) {
  productsContainer.splice(index, 1);
  showProduct();
  totalPrice = 0;
  calcTotalPrice();
}

function calcTotalPrice() {
  for (let i = 0; i < productsContainer.length; i++) {
    totalPrice += parseInt(productsContainer[i].price);
  }

  totalPriceElm.innerHTML = totalPrice;
}

// to accept only number in product price input
function isNumberKey(e) {
  let charCode = e.which ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
}

function isProductExist() {
  for (let i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.includes(productNameElm.value)) {
      swal("warning!", {
        title: "product is already Exist",
        icon: "warning",
        timer: 2000,
        buttons: false,
      });
      return true;
    }
  }
  return false;
}
