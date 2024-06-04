var title = document.getElementById("title");
var price = document.getElementById("price");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var total = document.getElementById("total");
var category = document.getElementById("category");
var count = document.getElementById("count");
var create = document.getElementById("create");
var productList;
var mode = "create";
var intermed;

if (localStorage.product != null) {
  productList = JSON.parse(localStorage.product);
  displayProduct(productList);
} else {
  productList = [];
}

function calcTotal() {
  var result = +price.value + +ads.value - discount.value;
  total.innerHTML = result;
}

create.onclick = function createElement() {
  var products = {
    name: title.value.toLowerCase(),
    price: price.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
    count: count.value,
  };
  if (mode === "create") {
    if (products.count > 1) {
      for (var i = 0; i < products.count; i++) {
        productList.push(products);
      }
    } else {
      productList.push(products);
    }
  } else {
    productList[intermed] = products;
    mode = "create";
    create.innerHTML = "Create";
    count.style.display = "block";
    document.getElementById("count-l").classList.remove("d-none");
  }

  localStorage.setItem("product", JSON.stringify(productList));
  clearData();
  displayProduct(productList);
};

function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
}

function displayProduct(list) {
  calcTotal();
  var tablerow = "";
  for (var i = 0; i < list.length; i++) {
    tablerow += `  <tr>
    <td>${i + 1}</td>
    <td>${list[i].name}</td>
    <td>${list[i].price}</td>
    <td>${list[i].ads}</td>
    <td>${list[i].discount}</td>
    <td>${list[i].total}</td>
    <td>${list[i].category}</td>
    <td><button class="btn btn-info" onclick="updateData(${i})">Update</button></td>
    <td><button class="btn btn-danger" onclick="DeleteOne(${i})">Delete</button></td>
    </tr>`;
  }
  document.getElementById("data").innerHTML = tablerow;
  if (productList.length > 0) {
    document.getElementById("deleteAll").classList.remove("d-none");
  } else {
    document.getElementById("deleteAll").classList.add("d-none");
  }
}

function DeleteOne(i) {
  productList.splice(i, 1);
  localStorage.product = JSON.stringify(productList);
  displayProduct(productList);
}
function delALL() {
  localStorage.clear();
  productList.splice(0);
  displayProduct(productList);
}

function updateData(i) {
  title.value = productList[i].name;
  price.value = productList[i].price;
  ads.value = productList[i].ads;
  discount.value = productList[i].discount;
  total.value = productList[i].total;
  category.value = productList[i].category;
  calcTotal();
  count.style.display = "none";
  document.getElementById("count-l").classList.add("d-none");
  create.innerHTML = "Update";
  mode = "update";
  intermed = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

var sm = "title";
function searchMode(id) {
  var search = document.getElementById("search");
  if (id == "title") {
    sm = "title";
  } else {
    sm = "category";
  }
  search.focus();
  search.placeholder = "search by " + sm;
  search.value = "";
}


function matchingData(value) {
  var tablerow = "";
  var found = false;

  if (sm == "title") {
    for (var i = 0; i < productList.length; i++) {
      if (productList[i].name.includes(value.toLowerCase())) {
        tablerow += `  <tr>
          <td>${i + 1}</td>
          <td>${productList[i].name}</td>
          <td>${productList[i].price}</td>
          <td>${productList[i].ads}</td>
          <td>${productList[i].discount}</td>
          <td>${productList[i].total}</td>
          <td>${productList[i].category}</td>
          <td><button class="btn btn-info" onclick="updateData(${i})">Update</button></td>
          <td><button class="btn btn-danger" onclick="DeleteOne(${i})">Delete</button></td>
        </tr>`;
        found = true;
      }
    }
  } else if (sm == "category") {
    for (var i = 0; i < productList.length; i++) {
      if (productList[i].category.includes(value.toLowerCase())) {
        tablerow += `  <tr>
          <td>${i + 1}</td>
          <td>${productList[i].name}</td>
          <td>${productList[i].price}</td>
          <td>${productList[i].ads}</td>
          <td>${productList[i].discount}</td>
          <td>${productList[i].total}</td>
          <td>${productList[i].category}</td>
          <td><button class="btn btn-info" onclick="updateData(${i})">Update</button></td>
          <td><button class="btn btn-danger" onclick="DeleteOne(${i})">Delete</button></td>
        </tr>`;
        found = true;
      }
    }
  }

  document.getElementById("data").innerHTML = tablerow;

  if (!found) {
    document.getElementById("notFoundMessage").style.display = "block";
  } else {
    document.getElementById("notFoundMessage").style.display = "none";
  }
}

