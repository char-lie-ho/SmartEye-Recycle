function displayFacilityInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    localStorage.setItem('facilityID', ID); // save the facility id to local storage

    //retrieve information from database
    db.collection("facility")
        .doc(ID)
        .get()
        .then(doc => {
            var title = doc.data().name;
            var address = doc.data().address;
            var operation = doc.data().hours_of_operation;
            var image_url = doc.data().image;

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

    //prepare cards to clone and add content
    let reviewCardGroup = document.getElementById("reviewGroup");
    let reviewTemplate = document.getElementById("reviewTemplate");

    db.collection("reviews") 
        .where("facilityID", "==", ID)
        .limit(5) //Limit to 5 reviews
        .get()
        .then((allReviews) => {
            review = allReviews.docs;
            // Sort reviews by timestamp in descending order
            review.sort((a, b) => b.data().last_updated - a.data().last_updated);
            review.forEach((doc) => {
                var rate = doc.data().overallRating;
                var userName = doc.data().user;
                var comment = doc.data().comment;
                var content = doc.data().materialsHandle;
                var waitingTime = doc.data().waitingTime;
                var cleanliness = doc.data().cleanlinessRating;
                var time = doc.data().last_updated.toDate();
                var recommend = doc.data().recommended;
                let reviewCard = reviewTemplate.content.cloneNode(true);

                //Add stars
                let starRating = "";
                if (rate) {
                    for (let i = 0; i < rate; i++) {
                        starRating += '<span class="material-icons">star</span>';
                    }
                    //Complement stars with no-fill stars
                    for (let i = rate; i < 5; i++) {
                        starRating += '<span class="material-icons">star_outline</span>';
                    }
                } else {
                    for (let i = 0; i < 5; i++) {
                        starRating += '<span class="material-icons">star_outline</span>';
                    }
                }
                // Rating
                reviewCard.querySelector('.rating-goes-here').innerHTML = `${starRating}`;

                // User name
                reviewCard.querySelector('.users-name-goes-here').innerHTML += userName;

                // Comment
                if (comment != '') {
                    reviewCard.querySelector('.review-comment-goes-here').innerHTML = `Comment: ${comment}`;
                };

                // Materials Handle
                if (content != '') {
                    reviewCard.querySelector('.facility-accept-goes-here').innerHTML = `Accept: `
                    content.forEach((item) => {
                        reviewCard.querySelector('.facility-accept-goes-here').innerHTML += `<li>${item}</li>`;
                    })
                }
                // Waiting time
                reviewCard.querySelector('.waiting-time-goes-here').innerHTML = `Waiting time: ${waitingTime} minutes`;

                // Cleanliness
                if (cleanliness != 'unSure') {
                    reviewCard.querySelector('.cleanliness-goes-here').innerHTML = `Cleanliness: ${cleanliness}`;
                }
                // Recommend
                if (recommend != 'unSure') {
                    reviewCard.querySelector('.recommend-goes-here').innerHTML = `Recommend: ${recommend}`;
                }

                // Update Time
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