// read from database
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("facilityTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()
        .then(allFacilities => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allFacilities.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;
                var address = doc.data().address;
                var operation = doc.data().hours_of_operation;
                var facilityID = doc.id;
                var image_url = doc.data().image;
                let eachcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (eachcard) that will be filled with Firestore data.

                //update title and text and image
                eachcard.querySelector('.card-title').innerHTML = title;
                eachcard.querySelector('.card-address').innerHTML = address;
                eachcard.querySelector('.card-image').src = image_url
                //load the appropriate facility
                eachcard.querySelector('a').href = "facility_template.html?docID=" + facilityID;
                eachcard.querySelector('i').id = "fav" + facilityID;

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById("facilities-goes-here").appendChild(eachcard);

                //i++;   //Optional: iterate variable to serve as unique ID

                var favoriteButton = document.getElementById("fav" + facilityID);
                favoriteButton.addEventListener("click", function () {
                    this.classList.toggle("filled");
                })
            });

        })
}


displayCardsDynamically("facility");  //input param is the name of the collection


// take the user back to the previous page
function goBack() {
    window.history.back();
}
