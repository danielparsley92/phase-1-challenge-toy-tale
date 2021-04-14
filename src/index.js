let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let allToysDiv = document.querySelector("div#toy-collection")

fetch("http://localhost:3000/toys")
   .then(res => res.json())
   .then( function (toysArr){
     toysArr.forEach(function(toyObj){

      turnToyToCard(toyObj)
     })
   })



function turnToyToCard(aToy){
   let aToyCard = document.createElement("div")
       aToyCard.className = ("card")

   let toyName = document.createElement("h2")
       toyName.innerText = toy.name 

    let toyImg = document.createElement("img")
        toyImg.src = toy.image

    toyImg.className = ("toy-avatar")
    toyImg.alt = toy.name
}