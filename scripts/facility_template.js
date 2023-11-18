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
            // console.log(image_url)
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
            document.querySelector('.card-image').src = image_url;

            //replace whitespace with + sign 
            queryParams = doc.data().name.replace(/\s+/g, '+')

            //dynamically search direction using google map
            document.getElementById('direction').href += queryParams;
        });
}
displayFacilityInfo()

function displayReviewInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID");
    console.log(ID);

    //prepare cards to clone and add content
    let reviewCardGroup = document.getElementById("reviewGroup");
    let reviewTemplate = document.getElementById("reviewTemplate");

    db.collection("reviews")
        .where("facilityID", "==", ID)
        .get()
        .then((allReviews) => {
            review = allReviews.docs;
            console.log(review);
            review.forEach((doc) => {
                var rate = doc.data().overallRating;
                var userName = "anonymous";
                var comment = doc.data().comment;
                var content = doc.data().materialsHandle;
                var waitingTime = doc.data().waitingTime;
                var cleanliness = doc.data().cleanlinessRating;
                var time = doc.data().last_updated.toDate();
                var recommend = doc.data().recommended;

                let reviewCard = reviewTemplate.content.cloneNode(true);

                //Add starts
                let starRating = "";
                if (rate) {
                    for (let i = 0; i < rate; i++) {
                        starRating += '<span class="material-icons">star</span>';
                    }
                    //Complement stars with no-fill starts
                    for (let i = rate; i < 5; i++) {
                        starRating += '<span class="material-icons">star_outline</span>';
                    }
                } else {
                    for (let i = 0; i < 5; i++) {
                        starRating += '<span class="material-icons">star_outline</span>';
                    }
                }
                reviewCard.querySelector('.rating-goes-here').innerHTML = `Rating: ${starRating}`;
                reviewCard.querySelector('.users-name-goes-here').innerHTML = userName;

                if (comment != '') { 
                    reviewCard.querySelector('.review-content-goes-here').innerHTML = `Comment: ${comment}`; 
                };

                // Materials Handle
                if (content!=''){
                    content.forEach((item)=>{
                        // console.log(item)
                        reviewCard.querySelector('.facility-accept-goes-here').innerHTML += `<li>${item}</li>`;
                    })
                }    
                    
                reviewCard.querySelector('.waiting-time-goes-here').innerHTML = `Waiting time: ${waitingTime} minutes`;
                reviewCard.querySelector('.cleanliness-goes-here').innerHTML = `Cleanliness: ${cleanliness}`;
                reviewCard.querySelector('.recommend-goes-here').innerHTML = `Recommend: ${recommend}`;
                reviewCard.querySelector('.update-time-goes-here').innerHTML = new Date(time).toLocaleString();

                //Append template to Review section
                reviewCardGroup.appendChild(reviewCard);

            })

        })
}
displayReviewInfo()



// take the user back to the previous page
function goBack() {
    window.history.back();
}