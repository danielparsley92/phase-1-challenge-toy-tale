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


function turnToyToCard(toy){
   let aToyCard = document.createElement("div")
       aToyCard.className = ("card")

   let aToyName = document.createElement("h2")
       aToyName.innerText = toy.name 

    let aToyImg = document.createElement("img")
        aToyImg.src = toy.image

        aToyImg.className = ("toy-avatar")
        aToyImg.alt = toy.name
    
    let aToyLikeP = document.createElement("p")
      aToyLikeP.innertext = `${toy.likes} Likes`
    
    let incrementButton = document.createElement("toy_id")
      incrementButton.className = ("like-btn")
      incrementButton.innerText = ("like")

    aToyCard.append(aToyName, aToyImg, aToyLikeP, incrementButton)
    allToysDiv.append(aToyCard)

    incrementButton.addEventListener("click", function(event){
//PATCH
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            likes: toy.likes +1
          })
        })
        .then(res => res.json())
        then(function (updatedtoyObj){
          toy.likes = updatedtoyObj
          aToyLikeP.innertext = `${updatedtoyObj.likes} Likes`
        })
      })

}

let Form = document.querySelector(".add-toy-form")
Form.addEventListener('submit', function(e){
  e.preventDefault()
  let newToy = e.target.name.value
  let newToyImg = e.target.image.value
  
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
  
  body: JSON.stringify({
    name: newToy,
    image: newToyImage,
    likes:0
  })
  })
.then(res => res.json())
.then(function(newToy){
  turnToyToCard(newToy)
})
})




//POST