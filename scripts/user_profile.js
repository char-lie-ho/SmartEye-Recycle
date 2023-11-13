// take the user back to the previous page
function goBack() {
    window.history.back();
}

// Get user name and email
function getUserInfoFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    // Do something for the currently logged-in user here: 
                    console.log(user.uid); // Print the uid in the browser console
                    console.log(user.displayName); // Print the user name in the browser console
                    console.log(user.email); // Print the email in the browser console

                    // Get user information
                    userName = user.displayName;
                    userEmail = user.email;
                    userPhone = user.phone;
                    userCity = user.city

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userPhone != null) {
                        document.getElementById("phoneInput").value = userPhone;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }

                    // Insert user name using JS
                    document.getElementById("name-goes-here").innerText = userName;

                    // Insert email using JS
                    document.getElementById("email-goes-here").innerText = userEmail;

                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

getUserInfoFromAuth(); // Run the function

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    console.log('save')
    //get entered info from user
    userName = document.getElementById("nameInput").value;
    userPhone = document.getElementById("PhoneInput").value;
    userCity = document.getElementById("cityInput").value;


    currentUser.update({
        name: userName,
        phone: userPhone,
        city: userCity
    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    document.getElementById('personalInfoFields').disabled = true;
}