let url = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    fetch(url)
    .then(resp => resp.json())
    .then(dogs => load_dogs(dogs))
})

function load_dogs(dogs){
    for (const dog of dogs){
        add_dog_to_DOM(dog);
    }
}

function add_dog_to_DOM(dog){
    let dogs_table = qs("#table-body");

    let tr = ce("tr");
    tr.id = dog.id;

    let name = ce("td");
    name.innerText = dog.name;
    name.className="name"

    let breed = ce("td");
    breed.innerText = dog.breed;
    breed.className="breed"

    let sex = ce("td");
    sex.innerText = dog.sex;
    sex.className="sex"

    let btn_td = ce("td");

    let btn = ce("button");
    btn.innerText = "Edit Dog";
    btn.addEventListener("click", () => {
        let dog_form = qs("#dog-form");
        dog_form[0].value = dog.name;
        dog_form[1].value = dog.breed;
        dog_form[2].value = dog.sex;
        
        dog_form.addEventListener("submit", () => {
            event.preventDefault();
            fetch(`${url}/${dog.id}`, getPatchObj(event))
            .then(resp => resp.json())
            .then(new_dog => {
                update_dog(new_dog);
                dog = new_dog;
                dog_form.reset();
            })
        })
    })
    btn_td.append(btn);

    tr.append(name, breed, sex, btn_td);
    dogs_table.append(tr);
}

function getPatchObj(event){
    return {
        method: "PATCH",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            name: event.target[0].value,
            breed: event.target[1].value,
            sex: event.target[2].value
        })
    }
}

function update_dog(dog){
    let wanted_dog = qs(`tr[id='${dog.id}']`)
    wanted_dog.children[0].innerText = dog.name;
    wanted_dog.children[1].innerText = dog.breed;
    wanted_dog.children[2].innerText = dog.sex
}

function qs(item){
    return document.querySelector(item);
}

function ce(item){
    return document.createElement(item);
}