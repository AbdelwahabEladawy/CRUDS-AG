var title = document.getElementById("title");
var price = document.getElementById("price");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var total = document.getElementById("total");
var category = document.getElementById("category");
var count = document.getElementById("count");
var create = document.getElementById("create");
var productList;
if(localStorage.product !=null){
  productList=JSON.parse(localStorage.product)
}else{
  productList=[]
}


function calcTotal() {
  var result=(+price.value+ +ads.value) - discount.value
total.innerHTML=result
}

create.onclick=function createElement(){
var products={
  name:title.value,
  price:price.value,
  ads:ads.value,
  discount:discount.value,
  total:total.innerHTML,
  category:category.value,
  count:count.value
}
productList.push(products)
localStorage.setItem("product",JSON.stringify(productList))
console.log(productList)
clearData()
}

function clearData(){
  title.value=""
  price.value=""
  ads.value=""
  discount.value=""
  category.value=""
  count.value=""
}
