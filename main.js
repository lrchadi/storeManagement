// show and hide buttons
const addImage = document.querySelector(".addImage");
const Categorie_Name = document.querySelector("#Categorie_Name");
const select = document.querySelector("select");
// Product info
const product_name = document.querySelector("#product_name");
const product_price = document.querySelector("#product_price");
let product_input_image = document.querySelector("#product_input_image");
const submit = document.querySelector("#submit");
const content = document.querySelector(".content");
const search_input = document.querySelector("#search_input");
const search_btn = document.querySelector("#search_btn");
const textSearch = document.querySelector("#textSearch");
const catgrSearch = document.querySelector("#catgrSearch");


let productImageConvert;
let categories;
let products;
let count = 0;
let data;
let mood = "create";
let tep;









document.querySelector("#add_items").addEventListener("click", function () {
    document.querySelector(".addItems").style.display = "block";
    document.body.style.overflow = "hidden";
})

document.querySelector("#hidebtn").addEventListener("click", function () {
    document.querySelector(".addItems").style.display = "none";
    document.body.style.overflow = "auto";
})


product_input_image.addEventListener("change", function(e) {
    const file = e.target.files[0];
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        productImageConvert = reader.result;
    }
    
    if (file) {
        
        addImage.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
        addImage.style.backgroundSize = "cover";

    }

})








document.querySelector("#add_categories").addEventListener("click", function () {
    document.querySelector(".addCategories").style.display = "block";
    document.body.style.overflow = "hidden";
})

document.querySelector("#hidebtn2").addEventListener("click", function() {
    document.querySelector(".addCategories").style.display = "none";
    document.body.style.overflow = "auto";
})    




if (localStorage.Categories != null) {
   categories = JSON.parse(localStorage.Categories);
} else {
    categories = [];
}


document.querySelector("#submitCatg").addEventListener("click", function() {
    if (Categorie_Name.value != "") {
        categories.push(Categorie_Name.value);
        localStorage.setItem("Categories", JSON.stringify(categories));
        Categorie_Name.value = "";
    }
    addCatg();
})

// Add Categories to the select element in HTML
function addCatg() {
    if (localStorage.Categories != null) {
        let catg = JSON.parse(localStorage.Categories);
        if (catg.length > 0) {
            select.innerHTML = "";
            for (let i of catg) {
                select.innerHTML += `<option>${i}</option>`
            }
        }   
    }
}

addCatg();

if (localStorage.products != null) {
    products = JSON.parse(localStorage.products);
} else {
    products = [];
}

submit.addEventListener("click", function () {
    if (product_name.value != "" && product_price.value > 0 && select.value != '') {
        const item = {
            ProName: product_name.value,
            ProPrice: product_price.value,
            ProCategorie: select.value,
            ProImage: productImageConvert
        };
        if (mood === "create") {
            products.push(item);  
        } else {
            products[tep] = item;
            mood = "create";
            document.getElementById("submit").innerHTML = "Submit";
        }
        product_name.value = '';
        product_price.value = ''; 
        addImage.style.backgroundImage = 'url(assets/add-image.webp)';
        document.querySelector("label").style.display = "block";
        localStorage.setItem("products", JSON.stringify(products));   
        showProductsInCard();     
    } else {
        alert("Error");
    }
})

// Show prducts cards in HOME

function showProductsInCard() {
    if (localStorage.products != null) {
        data = JSON.parse(localStorage.products);
        document.getElementById("noPro").style.display = "none";
        content.innerHTML = "";
        count = 0;
        for(let i = 0; i < data.length; i++){
            content.innerHTML += `
                <div class="card">
                    <div class="img">
                        <img src="${data[i].ProImage}" id="product_image">
                    </div>
                    <h2> ${data[i].ProName} </h2>
                    <h5> Categorie: ${data[i].ProCategorie} </h5>
                    <p id="price"> ${data[i].ProPrice}  DH</p>
                    <i class="more fa-solid fa-ellipsis"></i>
                    <div id="x" style="display: none;">
                        <div class="modifie">
                            <div class="modifieItem">
                                <i class="fa-regular fa-pen-to-square"></i>
                                <p onclick="modifie_Item(${i})">modifie Item</p>
                            </div>
                            <hr>
                            <div class="deleteItem">
                                <i class="fa-solid fa-trash"></i>
                                <p onclick="deleteItem(${i})">Delete Item</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            count++;
        }
    }
    document.getElementById("allElementsText").innerHTML = `ALL ELEMENTS (${count})`;
}

showProductsInCard();   

// for deleting ITEMS

document.querySelector("#delete_items").addEventListener("click", function() {
    document.querySelector(".deleteItems").style.display = "block";
    document.body.style.overflow = "hidden";
})

document.querySelector("#cancel_item").addEventListener("click", function() {
    document.querySelector(".deleteItems").style.display = "none";
    document.body.style.overflow = "auto";
})

document.querySelector("#delete_item").addEventListener("click", function() {
    if (products.length > 0) {
        products.splice(0);
        localStorage.removeItem("products");
        document.querySelector(".deleteItems").style.display = "none";
        showProductsInCard()
    } else {
        alert("There is no Products ALREADY!");
        document.querySelector(".deleteItems").style.display = "none";
    }
})

// for deleting CATEGORIES
document.querySelector("#delete_categories").addEventListener("click", function() {
    document.querySelector(".deleteCategories").style.display = "block";
    document.body.style.overflow = "hidden";
})

document.querySelector("#cancelCatg").addEventListener("click", function() {
    document.querySelector(".deleteCategories").style.display = "none";
    document.body.style.overflow = "auto";
})

document.querySelector("#deleteCatg").addEventListener("click", function() {
    if (categories.length > 0) {
        categories.splice(0);
        localStorage.removeItem("Categories");
        document.querySelector(".deleteCategories").style.display = "none";
    } else {
        alert("There is no Categories ALREADY!");
        document.querySelector(".deleteCategories").style.display = "none";
    }
})





let elementsSaerched;
search_btn.addEventListener("click", function() {
    elementsSaerched = [];
    if (textSearch.checked) {
        for(let i of products){
            if (search_input.value.trim().toLowerCase() == i.ProName.trim().toLowerCase()) {
                elementsSaerched.push(i);
            }
        }   
    } 
    else if (catgrSearch.checked) {
        for(let i of products){
            if (search_input.value.trim().toLowerCase() == i.ProCategorie.trim().toLowerCase()) {
                elementsSaerched.push(i);    
            }
        }
    } 
    else {
        alert("Choose a METHOD of searching!");
    }
    showSearchedElements();
})

function showSearchedElements() {
    if (search_input.value != "" && elementsSaerched.length >= 0) {
        let count2 = 0;
        content.innerHTML = ""
        for(let i = 0; i < elementsSaerched.length; i++){
            content.innerHTML += `
            <div class="card">
                <div class="img">
                    <img src="${elementsSaerched[i].ProImage}" id="product_image">
                </div>
                <h2> ${elementsSaerched[i].ProName} </h2>
                <h5> Categorie: ${elementsSaerched[i].ProCategorie} </h5>
                <p id="price"> ${elementsSaerched[i].ProPrice}  DH</p>
                <i class="fa-solid fa-ellipsis" style="display: none;"></i>
                <div class="x" style="display: none;">
                    <div class="modifie">
                        <div class="modifieItem">
                            <i class="fa-regular fa-pen-to-square"></i>
                            <p>modifie Item</p>
                        </div>
                        <hr>
                        <div class="deleteItem">
                            <i class="fa-solid fa-trash"></i>
                            <p>Delete Item</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        count2++;
        }
        document.getElementById("allElementsText").innerHTML = `ELEMENTS FOUNDED (${count2})`;
    } else {   
        showProductsInCard();
    } 
} 


function options(){
    document.querySelectorAll('.more').forEach(button => {
        button.addEventListener('click', function() {
        const menu = this.nextElementSibling; 
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
        });
    });
}

options();

function deleteItem(i){
    for(let j of products){
        if (j == products[i]) {
            products.splice(j, 0);
            data.splice(data.indexOf(data[i]), 1);
            localStorage.setItem("products", JSON.stringify(data)); 
            showProductsInCard();
        }
    }    
}

function modifie_Item(i){
    document.querySelector(".addItems").style.display = "block";
    document.body.style.overflow = "hidden";
    scroll({
        top:0,
        behavior:"smooth",
    });
    product_name.value = products[i].ProName;
    product_price.value = products[i].ProPrice;
    select.value = products[i].ProCategorie;
    addImage.style.backgroundImage = `url(${products[i].ProImage})`;
    addImage.style.backgroundSize = "cover";
    document.getElementById("submit").innerHTML = "Edit";
    mood = "Edit";
    tep = i;
}

