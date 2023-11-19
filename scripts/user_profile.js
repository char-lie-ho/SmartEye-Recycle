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

// const uploadButton = document.getElementById('uploadButton');
const uploadPopup = document.getElementById('uploadPopup');
const imageInput = document.getElementById('imageInput');


const imgSrc = document.getElementById('mypic-goes-here');


function selectImage() {
    document.getElementById('imageInput').click()
    uploadPopup.style.display = 'block';
}

function closePopup() {
    uploadPopup.style.display = 'none';
}

//upload image, 
function uploadImage() {
    const selectedFile = imageInput.files[0]; //get and store the uploaded img into this const

    if (selectedFile) {
        // Handle the upload logic, e.g., send the file to a server or perform other operations
        console.log('File uploaded:', selectedFile.name);
        var blob = URL.createObjectURL(selectedFile); //create a url of the object
        console.log(blob);
        imgSrc.src = blob; // Display this image in time on html

        const storageRef = firebase.storage().ref('images/' + blob);

        // Upload the file to Firebase Storage
        storageRef.put(selectedFile).then((snapshot) => {
            console.log('File uploaded successfully!', snapshot);

            // Get the download URL of the uploaded image
            storageRef.getDownloadURL().then((downloadURL) => {
                console.log('Image URL:', downloadURL);
                imgSrc.src = downloadURL;
                currentUser.update({
                    "image": downloadURL
                })

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
