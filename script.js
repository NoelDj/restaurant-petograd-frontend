function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(
        function (data) {
            categoriesReceived(data)
        }

    )
}
init();

function categoriesReceived(cats) {
    console.log(cats);
    createNavigation(cats);
    createSections(cats);
    fetchProducts();
}

function createSections(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        section.setAttribute("id", category)
        const h2 = document.createElement("h2");
        h2.textContent = category;
        section.appendChild(h2);
        document.querySelector(".second").appendChild(section)
        console.log(section);
    })
}

function createNavigation(categories) {

    categories.forEach(cat => {
        const a = document.createElement("a");
        a.textContent = cat;
        a.setAttribute("href", '#' + `${cat}`)
        document.querySelector("#list").appendChild(a);
    })

}

function fetchProducts() {

    //fetch data

    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            receiveData(data);
        })

}
//looping the objects

function receiveData(meals) {
    meals.forEach(showmeal)
}

const filter = document.querySelector(".filterButton")
console.log(filter)
const modal = document.querySelector(".modal-background");

function showmeal(myMeal) {
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    const x = myMeal.discount;
    const y = myMeal.price;
    const z = y - (y * (x / 100));

    console.log(z + " is the price")

    const img = copy.querySelector("img");
    img.setAttribute("src", `https://kea-alt-del.dk/t5/site/imgs/medium/${myMeal.image}-md.jpg`)
    //html
    copy.querySelector(".number").textContent = myMeal.id;
    copy.querySelector(".dish").textContent = myMeal.name;
    copy.querySelector(".oldprice").textContent = y;
    copy.querySelector(".price").textContent = z + ".-";
    copy.querySelector(".description").textContent = myMeal.shortdescription;

    if (!myMeal.vegetarian) {
        copy.querySelector(".vegetarian").remove();
    }

    if (!myMeal.soldout) {
        copy.querySelector(".sold").remove();
    }

    if (myMeal.discount == 0) {
        copy.querySelector(".oldprice").remove();
    }

    copy.querySelector("article").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${myMeal.id}`)
            .then(res => res.json())
            .then(showDetails);
    });

    function showDetails(data) {
        modal.querySelector(".modal-name").textContent = data.name;
        modal.querySelector(".modal-description").textContent = data.longdescription;
        modal.querySelector(".modal-price").textContent = z;

        //...
        modal.classList.remove("hide");
    }



    //append
    document.querySelector("section#" + myMeal.category).appendChild(copy);

}

//close the modal when clicked
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});
/*

[{
    "id": "10",
    "category": "starter",
    "name": "666 Russian Ringbread",
    "price": 29,
    "soldout": false,
    "discount": 0,
    "shortdescription": "Russisk ringbr\u00f8d af Karapatisk mel",
    "vegetarian": true,
    "alcohol": 0,
    "image": "ringbroed-druer"
}

*/
