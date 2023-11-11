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
                let eachcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (eachcard) that will be filled with Firestore data.

                //update title and text and image
                eachcard.querySelector('.card-title').innerHTML = title;
                eachcard.querySelector('.card-address').innerHTML = address; 
                eachcard.getElementById("day1").innerText = operation[0];
                eachcard.getElementById("day2").innerText = operation[1];
                eachcard.getElementById("day3").innerText = operation[2];
                eachcard.getElementById("day4").innerText = operation[3];
                eachcard.getElementById("day5").innerText = operation[4];
                eachcard.getElementById("day6").innerText = operation[5];
                eachcard.getElementById("day7").innerText = operation[6];
                // eachcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
                eachcard.querySelector('a').href = "nearby_facility.html?docID=" + facilityID;

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById("facilities-goes-here").appendChild(eachcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("facility");  //input param is the name of the collection