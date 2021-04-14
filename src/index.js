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

/*let allToysDiv = document.querySelector("div#toy-collection")


fetch("http://localhost:3000/toys")
   .then(res => res.json())
   .then((toysArr) => {
     toysArr.forEach(function(toysObj){
       
      //toysArr.forEach((toysObj) => {
        //renderToyCard(toysObj)
      })

       let outerH2 = document.createElement(`h2`)
           outerH2.className = `name`

       let cardNameP = document.createElement(`p`)
          cardNameP.className = `likes`

        let cardImg = document.createElement(`img`)
            cardImg.src = toysObj.image
            cardImg.class = `toy-avatar`

        let likeButton = document.createElement(`button`)
            likeButton.class = `like-btn`
            likeButton.innerText = `Like`

            cardNameP.append(toysObj.name)
            outerH2.append(cardNameP, likeButton)
            allToysDiv.append(outerH2, cardImg)
     })
   })*/


   //HELPER FUNCTION
   //Declare this globaly^^:
let toyCollectionDiv = document.querySelector(`#toy-collection`)
let toyForm = document.querySelector("form.add-toy-form")





  function renderToyCard(toysObj){
    let toyCardDiv = document.createElement(`div`)
        toyCardDiv.className = `card`

    let toyNameH2 = document.createElement(`h2`)
        toyNameH2.innerText = toy.name

    let toyImg = document.createElement(`img`)
        toyImg.src = toy.image
        toyImg.className = `toy-avatar`

    let toyLikesP = document.createElement(`p`)
        toyLikesP.innerText =   `${toy.like} Likes`

    let likeButton = document.createElement(`button`)
        likeButton.innerText = `Like <3`
        likeButton.classList.add(`like-btn`)

    //CONSTRUCT THE CARD
    toyCardDiv.append(toyNameH2, toyImg, toyLikesP, likeButton)
    
    //APPEND TO THE DOM
    toyCollectionDiv.append(toyCardDiv)


    likeButton.addEventListener(`click`, (event) => {
      
       fetch(`http://localhost:3000/toys/${toy.id}`,{// Making a request to a specific id
         method: "PATCH",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           likes: toy.likes + 1
         })
       })
       .then(res => res.json())
       .then((updatedToy) => {
         //UPDATE DOM
         toyLikesP.innerText = `${updatedToy.likes} Likes`

         //UPDATE OBJECT IN MEMORY
         toy.likes = updatedToy.likes
       })
    })


  }



  toyForm.addEventListener(`submit`, (e) => {
    e.preventDefault()
    // event -> form -> input -> value: this is how we get user input
    // form -> input -> value: if we already have the event
    //e.target will always be the form. Always use name or ID to get the user input
    //e.target.name.value

    let nameVar = e.target.name.value
    let imageVar = e.target.image.value
    fetch(`http://localhost:3000/toys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nameVar,
        image: imageVar,
        likes: 100
      })
    })
    .then(res => res.json())
    .then((newToy) => {
      //Calling helper function to turn into HTML
      renderToyCard(newToy)
    })
  })


  //SAVING FETCH TO A LOCAL VARIABLE
  function makingFetchHappen(url, configObj) {
    return fetch(url, configObj).then(res => res.json())
  }

  //Promsied object that contains fufilled promise, actual object.