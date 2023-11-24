// take the user back to the previous page
function goBack() {
    window.history.back();
}

var currentUser = null;


function submitTime() {
    let alarmTime = document.getElementById('alarmtime').value;
    let newAlarmTime = new Date(alarmTime);
    let currentTime = new Date();

    // check if the input field is not empty
    if (isNaN(newAlarmTime.getTime())) {
        swal("Please enter a valid date and time.");
        return false;
    }

    // check if the entered time is in the past
    if (newAlarmTime <= currentTime) {
        swal("Please enter a future date and time.");
        return false;
    }

    var year = newAlarmTime.getFullYear();
    var month = newAlarmTime.getMonth() + 1;
    var day = newAlarmTime.getDate();
    var hours = newAlarmTime.getHours();
    var minutes = newAlarmTime.getMinutes();
    selectedTime = `${year} - ${month} - ${day} - ${hours} : ${minutes}`

    localStorage.setItem('alarmTime', selectedTime) // save the selected time into application
    document.getElementById('alarm-goes-here').innerHTML = `<div>${selectedTime}</div>` // change the alarm time without refreshing
    return true
}

//save the time into database
function saveInToDatabase() {
    if(submitTime()){
    const user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        remindTime = localStorage.getItem('alarmTime');

        // Get the document for the current user.
        currentUser.update({
            remindTime: firebase.firestore.FieldValue.arrayUnion(remindTime),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            swal('You have saved the alarm!');
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'login.html';
        }
    }
}

// Display the time in the recycling alarm
function displayRemindTime() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // console.log(user)
            var userID = user.uid;
            const userDocRef = db.collection('users').doc(userID);

            userDocRef.get().then(function (doc) {
                if (doc.exists) {
                    var userData = doc.data().remindTime;
                    console.log(userData)
                    // ensure only display alarms if exist
                    if (userData !== undefined){
                        document.getElementById('alarm-goes-here').innerHTML = '';
                        document.getElementById('alarm-goes-here').innerHTML = `<ol id="alarm_list"></ol>`;
                        //loop through remindTime array
                        userData.forEach((time)=>{
                            // create list element
                            list_items = document.createElement('li');
                            // write text into <li>tag
                            list_items.textContent = time;
                            // append <li> into <ol>
                            document.getElementById('alarm_list').appendChild(list_items)
                        })
                    }
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