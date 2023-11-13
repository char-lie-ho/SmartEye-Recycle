// take the user back to the previous page
function goBack() {
    window.history.back();
}

var currentUser = null;  


function submitTime() {
    console.log('hi there')
    let alarmTime = document.getElementById('alarmtime').value;
    let newAlarmTime = new Date(alarmTime);

    var year = newAlarmTime.getFullYear();
    var month = newAlarmTime.getMonth() + 1;
    var day = newAlarmTime.getDate();
    var hours = newAlarmTime.getHours();
    var minutes = newAlarmTime.getMinutes();
    selectedTime = `${year} - ${month} - ${day} - ${hours} : ${minutes}`

    localStorage.setItem('alarmTime', selectedTime) // save the selected time into application
    document.getElementById('alarm-goes-here').innerHTML = `<div>${selectedTime}</div>`


}

//save the time into database
function saveInToDatabase() {
    const user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        remindTime = localStorage.getItem('alarmTime');

        // Get the document for the current user.
        currentUser.update({
            userID: userID,
            remindTime: remindTime,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert('You have saved the alarm!');
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'login.html';
    }

}

function displayRemindTime() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user)
            var userID = user.uid;
            const userDocRef = db.collection('users').doc(userID);

            userDocRef.get().then(function (doc) {
                if (doc.exists) {
                    var userData = doc.data().remindTime;
                    document.getElementById('alarm-goes-here').innerHTML = userData;
                }
            }).catch((error) => {
                console.error('Error retrieving document:', error);
            });
        } else {
            // Handle the case where no user is signed in
            console.log("No user is signed in.");
        }
    });
}

function setup() {
    displayRemindTime();
}

$(document).ready(setup);