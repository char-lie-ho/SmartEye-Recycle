function displayFacilityInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    
    db.collection("facility")
        .doc(ID)
        .get()
        .then(doc => {
            var title = doc.data().name;
            var address = doc.data().address;
            var operation = doc.data().hours_of_operation;
            var facilityID = doc.id;
            var image_url = doc.data().image;
            console.log(title)
            // only populate title, and image
            document.getElementById("facility_name").innerText = title;
            document.querySelector('.card-address').innerHTML = address;
            document.getElementById("day1").innerText = operation[0];
            document.getElementById("day2").innerText = operation[1];
            document.getElementById("day3").innerText = operation[2];
            document.getElementById("day4").innerText = operation[3];
            document.getElementById("day5").innerText = operation[4];
            document.getElementById("day6").innerText = operation[5];
            document.getElementById("day7").innerText = operation[6];
            document.querySelector('.card-image').src = image_url

        });
}
displayFacilityInfo();