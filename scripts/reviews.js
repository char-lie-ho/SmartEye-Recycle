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


// Submit a review
function submitReview() {
    console.log('Submitted');
    console.log(document.getElementById('rating-value').innerHTML);
    // Define a variable for the collection you want to create in Firestore to populate data
    var review = db.collection("reviews");
    review.add({
        facility_name: document.getElementById('facilityName').value,
        waitingTime: parseInt(document.getElementById('waitingTime').value),
        cleanlinessRating: document.querySelector('input[name="cleanlinessRating"]:checked').id,
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