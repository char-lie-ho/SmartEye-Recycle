//To handle user interactions and update the rating value

$(document).ready(function () {
    $('.star').click(function () {
        $(this).addClass('active');
        $(this).prevAll().addClass('active');
        $(this).nextAll().removeClass('active');
        updateRating();
    });

    function updateRating() {
        var rating = $('.star.active').length;
        $('.rating-value').text(rating);
    }
});

//load the facility name
var facilityID = localStorage.getItem("facilityID");
console.log(facilityID)

function getFacilityName(id) {
    db.collection("facility")
        .doc(id)
        .get()
        .then((facilities) => {
            var facilityName = facilities.data().name
            document.getElementById('facilityName').innerHTML = facilityName 
        }
        )
}

getFacilityName(facilityID);

// Submit a review
function submitReview() {
    console.log('Submitted');
    // Define a variable for the collection you want to create in Firestore to populate data
    var review = db.collection("reviews");
    review.add({

        waitingTime: parseInt(document.getElementById('waitingTime').value),

        overallRating: document.getElementById('rating-value').innerHTML,
        comment: document.getElementById('comment').value,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(function () {
            // Provide feedback to the user
            alert("Review submitted successfully!");

            // Refresh the page 
            location.reload();
        })

}
document.getElementById('submit_review').addEventListener('click', function () {
    submitReview();
});

// take the user back to the previous page
function goBack() {
    window.history.back();
}