var currentUser = null;

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
                    // Get user information
                    var userName = user.displayName;
                    var userEmail = user.email;
                    var userPhone = userDoc.data().phone;
                    var userCity = userDoc.data().city;
                    var userImage = userDoc.data().image;

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
                    if (userImage != null) {
                        document.getElementById("mypic-goes-here").src = userImage
                    }

                    // Insert user name using JS
                    document.getElementById("name-goes-here").innerText = userName;

                    // Insert email using JS
                    document.getElementById("email-goes-here").innerText = userEmail;

                    // Insert city using JS
                    document.getElementById("city-goes-here").innerText = userCity;

                    // Insert email using JS
                    document.getElementById("phone-goes-here").innerText = userPhone;


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
    document.getElementById('editProfile').style.display = "block";
    //Auto scroll down to the edit form
    document.getElementById('editProfile').scrollIntoView({ behavior: 'smooth' })
}

function saveUserInfo() {
    console.log('save')
    //get entered info from user
    userName = document.getElementById("nameInput").value;
    userPhone = document.getElementById("phoneInput").value;
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
    document.getElementById('editProfile').style.display = "none"
    //Auto scroll up to the top
    document.getElementById('navbarPlaceholder').scrollIntoView({ behavior: 'smooth' })
}

// upload profile


const imageInput = document.getElementById('imageInput');
const imgSrc = document.getElementById('mypic-goes-here');

function selectImage() {
    document.getElementById('imageInput').click()
    confirmImage.style.display = 'block';
}

//upload image to server
function uploadImage() {
    //get the selected file from the input element
    const selectedFile = imageInput.files[0];
    if (selectedFile) {
        // create a URL for the selected file (a temporary URL for preview)
        var blob = URL.createObjectURL(selectedFile);
        // display this image in time on html
        imgSrc.src = blob;
        // reference to the Firebase Storage with a specific path for the uploaded image
        const storageRef = firebase.storage().ref('images/users/' + currentUser.id + ".jpg");
        // upload the file to Firebase Storage
        storageRef.put(selectedFile).then(() => {
            // get the download URL of the uploaded image
            storageRef.getDownloadURL().then((downloadURL) => {
                // update the image source with the download URL
                imgSrc.src = downloadURL;
                //update user's data in database
                currentUser.update({
                    "image": downloadURL
                }).then(
                    confirmImage.style.display = 'none'
                )
            })
        })
    } else {
        alert('Please select an image file.');
    }
}


// take the user back to the previous page
function goBack() {
    window.history.back();
}
