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

//Get the facility id for later use
const facilityID = localStorage.getItem("facilityID");

// display the facility name 
function getFacilityName(id) {
    db.collection("facility")
        .doc(id)
        .get()
        .then((facilities) => {
            let facilityName = facilities.data().name
            document.getElementById('facilityName').innerHTML = facilityName
        })
}

getFacilityName(facilityID);

// Submit a review
function submitReview() {
    console.log('Submitted');
    // Define a variable for the collection you want to create in Firestore to populate data
    var review = db.collection("reviews");

    // collect the checked boxes in Types of material
    const selectedValues = [];
    document.querySelectorAll('[id="materials"]:checked').forEach((checkbox) => { selectedValues.push(checkbox.value) });

    // Check if the review is anonymous
    var checkbox = document.getElementById('anonymous');
    if (checkbox.checked) {
        userName = 'Anonymous'
    }
    review.add({
        facilityID: facilityID,
        materialsHandle: selectedValues,
        waitingTime: parseInt(document.getElementById('waitingTime').value),
        cleanlinessRating: document.querySelector('input[name="cleanliness"]:checked').value,
        overallRating: document.getElementById('rating-value').innerHTML,
        recommended: document.querySelector('input[name="recommend"]:checked').value,
        comment: document.getElementById('comment').value,
        user: `${userName}`,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(function () {
            // Provide feedback to the user
            swal("Review submitted successfully!");
            document.querySelector('.confirm').addEventListener('click', function () {
                window.location.href = "facility_info.html?docID=" + facilityID;
            });
        })
}

// event listener for the submit button
document.getElementById('submit_review').addEventListener('click', function () {
    submitReview();
});

// take the user back to the previous page
function goBack() {
    window.history.back();
}

// Obtain the current user name
function getUserInfoFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user == null) {
            window.location.href = "../pages/login.html"
        }
    })
}

getUserInfoFromAuth(); // Run the function