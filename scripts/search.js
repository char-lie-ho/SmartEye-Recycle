// take the user back to the previous page
function goBack() {
    window.history.back();
}

// read from database
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("eachCategoriesTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allCategories => {
            allCategories.forEach(doc => { //iterate thru each doc
                var title = doc.data().categoryDocID;       // get value of the "name" key
                var imageCode = doc.data().imagecode;
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-img').src = `../images/${imageCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "category_template.html?docID=" + docID;
                // console.log(title)
                //attach to gallery, Example: "hikes-go-here"
                document.getElementById("categories-goes-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("category");  //input param is the name of the collection

//search function

function search() {
    // get the input element by its ID
    const searchTextElement = document.getElementById("searchText");
    // get the value attribute of the input element
    const searchValue = searchTextElement.value;
    console.log(searchValue);
}

