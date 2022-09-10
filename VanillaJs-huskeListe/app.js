const form = document.querySelector('#item-form');
const itemList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-items');
const filter = document.querySelector('#filter');
const itemInput = document.querySelector('#item');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getItems);
    form.addEventListener('submit', addItem);
    itemList.addEventListener('click', deleteItem);
    clearBtn.addEventListener('click', clearItems);
    filter.addEventListener('keyup', filterItems);
}
// Get items
function getItems(){
    let items;
    if (localStorage.getItem("items") === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    items.forEach(function(item){ 
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(item));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="material-icons">close</i>`;
        li.appendChild(link);
        itemList.appendChild(li);
    });
}

// Add listItem
function addItem(e) {
    const inputError = document.querySelector(".input-error");
    if(itemInput.value === ""){
        inputError.style.display = "block";
    } else {
        inputError.style.display = "none";
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(itemInput.value));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="material-icons">close</i>`;
        li.appendChild(link);
        itemList.appendChild(li);

        storeItemInLocalStorage(itemInput.value);

        itemInput.value = '';
    }

    e.preventDefault();
}

// Store items
function storeItemInLocalStorage(item){
    let items;
    if (localStorage.getItem("items") === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
}

// Delete listItem
function deleteItem(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        removeItemFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

// Delete in localstorage
function removeItemFromLocalStorage(storageItem) {
    let items;
    if(localStorage.getItem('items') === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
  
    items.forEach(function(item, index){
      if(storageItem.textContent === item){
        items.splice(index, 1);
      }
    });
  
    localStorage.setItem('items', JSON.stringify(items));
  }
  

// Delete all items
function clearItems(){
    itemList.innerHTML = "";

    clearItemsFromLocalStorage();
}

// Delete from LS
function clearItemsFromLocalStorage() {
    localStorage.clear();
  }
   
// Filter items
function filterItems(e) {
    const text = e.target.value.toLowerCase();
  
    document.querySelectorAll('.collection-item').forEach(function(item){
      const searchItem = item.firstChild.textContent;
      if(searchItem.toLowerCase().indexOf(text) != -1){
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }