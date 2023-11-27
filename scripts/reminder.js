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
        Swal.fire("Please enter a valid date and time.");
        return false;
    }

    // check if the entered time is in the past
    if (newAlarmTime <= currentTime) {
        Swal.fire("Please enter a future date and time.");
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
    if (submitTime()) {
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
                Swal.fire('You have saved the alarm!');
            });
        } else {
            console.log("No user is signed in");
            window.location.href = 'login.html';
        }
    }
}


// Delete the selected time from database
function cleandata(time, userDocRef){
    userDocRef.update({
        remindTime: firebase.firestore.FieldValue.arrayRemove(time),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(
        Swal.fire('You have delete it.')
    )
}


// Display the time in the recycling alarm
function displayRemindTime() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let userID = user.uid;
            const userDocRef = db.collection('users').doc(userID);

            userDocRef.get().then(function (doc) {
                if (doc.exists) {
                    let userData = doc.data().remindTime;
                    console.log(userData)
                    // ensure only display alarms if exist
                    if (userData !== undefined) {
                        document.getElementById('alarm-goes-here').innerHTML = '';
                        document.getElementById('alarm-goes-here').innerHTML = `<ol id="alarm_list"></ol>`;
                        //loop through remindTime array
                        userData.forEach((time) => {
                            // create list element
                            let list_items = document.createElement('li');
                            // write text into <li>tag
                            list_items.textContent = time;
                            //                             trash_icon = document.createElement('span')
                            //                             trash_icon.innerText = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            //                                 < path d = "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            //                                     <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            // </svg >`

                            // append <li> into <ol>
                            document.getElementById('alarm_list').appendChild(list_items)
                            trash = document.createElement('span')
                            trash.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                < path d = "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
</svg >`
                            trash.addEventListener('click', function () {
                                list_items.remove()
                                
                                //TODO: delete from database
                                cleandata(time, userDocRef);

                            })
                            list_items.append(trash)
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