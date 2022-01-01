const productNameElm = document.querySelector(".input-form input[type='text']");
const productPriceElm = document.querySelector(
  ".input-form input[type='number']"
);
const addButtonElm = document.querySelector(".input-form button");
const totalPriceElm = document.querySelector(".total span");
let productContainerElm = document.querySelector("table tbody");
let product,
  index = 1,
  totalPrice = 0;

function addProduct(index) {
  product = `
  <tr>
  <td>${index}</td>
  <td>${productNameElm.value}</td>
  <td>${productPriceElm.value}</td>
  <td><button class="delete">Delete</button></td>
</tr>
  `;
  productContainerElm.innerHTML += product;
  calcTotalPrice(productPriceElm.value);
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
  } else {
    addProduct(index);
    index++;
    resetInput();
  }
});

// to delete product
document.addEventListener("click", (e) => {
  let targetElement = e.target.parentNode.parentNode;
  if (e.target.className === "delete") {
    targetElement.remove();
    totalPrice -= parseInt(targetElement.children[2].innerHTML);
    totalPriceElm.innerHTML = totalPrice;
  }
});

function calcTotalPrice(price) {
  totalPrice += parseInt(price);
  totalPriceElm.innerHTML = totalPrice;
}
