function displayFacilityInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    let title = null
    localStorage.setItem('facilityID', ID); // save the facility id to local storage
    // console.log(ID);

    //retrieve information from database
    db.collection("facility")
        .doc(ID)
        .get()
        .then(doc => {
            var title = doc.data().name;
            var address = doc.data().address;
            var operation = doc.data().hours_of_operation;
            var facilityID = doc.id;
            var image_url = doc.data().image;
            // console.log(title)
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

            //replace whitespace with + sign 
            queryParams = doc.data().name.replace(/\s+/g, '+')

            //dynamically search direction using google map
            document.getElementById('direction').href += queryParams;
        });
}
displayFacilityInfo();

function displayReviewInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID");
    console.log(ID);

    db.collection("reviews")
        .where("facilityID", "==", ID)
        .get()
        .then((allReviews) => {
            review = allReviews.docs;
            console.log(review);
            review.forEach((doc) =>{
                var rate = doc.data().overallRating;
                var userName = "anonymous";
                var comment = doc.data().comment;
                var content = doc.data().materialsHandle;
                var waitingTime = doc.data().waitingTime;
                var time = doc.data().last_updated.toDate();
                var recommend = doc.data().recommended;

            })

        })
}
displayReviewInfo()




// take the user back to the previous page
function goBack() {
                window.history.back();
            }