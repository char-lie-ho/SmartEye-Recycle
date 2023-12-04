document.getElementById('submit_review').addEventListener('click', function () {
    submit();
});

function submit() {
    var feedback = db.collection("feedbacks");
    feedback.add(
        {
            subject: document.getElementById('subject').value,
            comment: document.getElementById('comment').value,
        }
    ).then(
        // empty the text boxes
        document.getElementById('subject').value = "",
        document.getElementById('comment').value =""
    )
    Swal.fire('Thank you for your feedback!')
}