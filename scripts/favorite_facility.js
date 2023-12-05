// take the user back to the previous page
function goBack() {
    window.history.back();
}

// read from database
function displayCardsDynamically(collection, favoriteList) {
    favoriteList.forEach(eachFavorite => {
        let cardTemplate = document.getElementById("facilityTemplate"); 
        const favFacility = db.collection(collection)
        favFacility.where('name', '==', eachFavorite)
            .get()
            .then(allFacilities => {
                allFacilities.forEach(doc => { //iterate thru each doc
                    var title = doc.data().name;
                    var address = doc.data().address;
                    var facilityID = doc.id;
                    var image_url = doc.data().image;
                    let eachcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (eachcard) that will be filled with Firestore data.

                    //update title and text and image
                    eachcard.querySelector('.card-title').innerHTML = title;
                    eachcard.querySelector('.card-address').innerHTML = address;
                    eachcard.querySelector('.card-image').src = image_url
                    //load the appropriate facility
                    eachcard.querySelector('a').href = "facility_template.html?docID=" + facilityID;
                    eachcard.querySelector('i').id = title

                    //append each facility 
                    document.getElementById("facilities-goes-here").appendChild(eachcard);

                    //read from DB, ensure favorite icon is correct color
                    currentUser.get().then(userDoc => {
                        var favorite = userDoc.data().favorite;
                        if (favorite.includes(title)) {
                            document.getElementById(title).style = "font-variation-settings: 'FILL' 1; color: red;"
                        }
                    })
                    //favortie button eventListener
                    var favoriteButton = document.getElementById(title);
                    favoriteButton.addEventListener("click", () => { updateFavourite(title) })
                });
            })
    })
}

// update the color of favorite button when clicked 
function updateFavourite(title) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const user = firebase.auth().currentUser;
            currentUser.get().then(userDoc => {
                var favorite = userDoc.data().favorite;
                let isFavorite = favorite.includes(title)
                if (isFavorite) {   // already faved
                    currentUser.update({
                        favorite: firebase.firestore.FieldValue.arrayRemove(title)
                    }).then(function () {
                        document.getElementById(title).style = "font-variation-settings: 'FILL' 0; color: red;"
                    })
                } else {  // not yet faved
                    currentUser.update({
                        favorite: firebase.firestore.FieldValue.arrayUnion(title)
                    }).then(function () {
                        document.getElementById(title).style = "font-variation-settings: 'FILL' 1; color: red;"
                    })
                }
            })
        }
    })
}

function main() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const user = firebase.auth().currentUser;
            currentUser = db.collection("users").doc(user.uid); //global
            currentUser.get().then(userDoc => {
                var favoriteList = userDoc.data().favorite;
                if (favoriteList.length == 0) {
                    document.getElementById("facilities-goes-here").innerHTML = `<p>You have no favourite facility yet!</p>`
                } else {
                    displayCardsDynamically("facility", favoriteList)  //input param is the name of the collection
                }
            })
        }
    })
}

main()
