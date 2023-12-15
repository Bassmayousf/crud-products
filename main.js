let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let total = document.getElementById("total");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let tableBody = document.getElementById("tbody");
const deleteOneItem = document.getElementById("delete");
const deleteAll = document.getElementById("delete-all");
let mood = "create";
let temp;
// const products = JSON.parse(localStorage.getItem("product"))
//   alert("بسم الله")
// localStorage.clear()
// get total

function getTotal() {
  if (price.value != "") {
    let results = +price.value + +ads.value + +taxes.value - +discount.value;
    total.innerHTML = `${results}`;
    total.style.backgroundColor = "#3eb13e";
  }
  else{
    total.style.backgroundColor = "#d85155";

  }
}
getTotal();

// create product
let dataPro;
function createProduct() {
  if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
  } else {
    dataPro = [];
  }

  create.onclick = () => {
    let newPro = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
    };
    if(title.value !=''&&price.value !=''&&category.value !='' && newPro.count < 200){
      if (mood === "create") {
        if (newPro.count > 1) {
          for (i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
          }
        } else {
          dataPro.push(newPro);
        
        }
      } else {
        dataPro[temp] = newPro;
        create.innerHTML = "Create";
          count.style.display = "block";
      }
      clearInputs();
      window.location.reload()

    }
    localStorage.setItem("product", JSON.stringify(dataPro));
    showData();

    // console.log(dataPro)
  };

}

createProduct();

// save local storage
//  clear data
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "total: ";
  count.value = "";
  category.value = "";

}

// read
showData();
function showData() {
  // dataPro = JSON.parse(localStorage.getItem("product"))
  
  getTotal();
  if (dataPro.length > 0) {
    deleteAll.style.display = "block";
    deleteAll.innerHTML = `<button>Delete All ${JSON.parse(localStorage.getItem('product')).length}</button>`;
  } else {
    deleteAll.style.display = "none";
  }
  tableBody.innerHTML = "";
  const products = JSON.parse(localStorage.getItem("product"));
  if (products != null || dataPro.length > 0) {
    products.map((pro, id) => {
      let content = `<tr>
  
      <td>${id}</td>
      <td>${pro.title}</td>
      <td>${pro.price}</td>
      <td>${pro.taxes}</td>
      <td>${pro.ads}</td>
      <td>${pro.discount}</td>
      <td>${pro.total}</td>
      <td>${pro.category}</td>
      <td><button id="updata" onclick="upData(${id}) ">updata</button></td>
      <td><button onclick="deleteItem(${id})" id="delete">delete</button></td>
    </tr>`;
      tableBody.innerHTML += content;
    });
  }

}
console.log(dataPro.length);
function deleteAllfun() {
  localStorage.clear();
  dataPro = [];

  showData();
}
// count
// delete
function deleteItem(id) {
  console.log(id);
  const products = JSON.parse(localStorage.getItem("product"));

  // Remove the item from the products array
  products.splice(id, 1);

  // Update the localStorage with the modified array
  localStorage.setItem("product", JSON.stringify(products));
dataPro.length - 1
  // Update the displayed data
  showData();
  // }
}
console.log(dataPro);

// updata
function upData(id) {
  mood = "updata";
  title.value = dataPro[id].title;
  price.value = dataPro[id].price;
  taxes.value = dataPro[id].taxes;
  ads.value = dataPro[id].ads;
  discount.value = dataPro[id].discount;
  // count.value = dataPro[id].count;
  count.style.display = "none";
  category.value = dataPro[id].category;
  create.innerHTML = "Updata";
  temp = id;
  getTotal();
  scroll({
    top: 0,
  });

}
// search
let search = document.getElementById("search");
let searchMode = "title";
function getSearchMode(id) {
  if (id == "searchByTitle") {
    searchMode = "title";
    search.placeholder = "search by Title";
  } else {
    searchMode = "category";
    search.placeholder = "search by category";
  }
  console.log(searchMode);
  search.focus();
  search.value = '';
  showData()

}
function searchData(value) {
  console.log(value);
  tableBody.innerHTML = "";
  if (searchMode == 'title') {
  for (let i = 0; i < dataPro.length; i++) {
    
      if(dataPro[i].title.includes(value.toLowerCase())){
        
          let content = `<tr>
        
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="updata" onclick="upData(${i}) ">updata</button></td>
            <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
          </tr>`;
      
          tableBody.innerHTML += content;

      }
    
    }

  }
  else {
    for (let i = 0; i < dataPro.length; i++) {
    
      if(dataPro[i].category.includes(value.toLowerCase())){
        
          let content = `<tr>
        
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="updata" onclick="upData(${i}) ">updata</button></td>
            <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
          </tr>`;
      
          tableBody.innerHTML += content;

      }  
      
  }

}
// tableBody.innerHTML += content;

}
// clean up
