var title = document.getElementById("title");
var price = document.getElementById("price");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var total = document.getElementById("total");
var category = document.getElementById("category");
var count = document.getElementById("count");
var create = document.getElementById("create");

function calcTotal() {
  var result=(+price.value+ +ads.value) - discount.value
total.innerHTML=result
}


