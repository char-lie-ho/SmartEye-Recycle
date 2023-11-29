//get user name
function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            userName = user.displayName;
            // display user's name
            document.getElementById("name-goes-here").innerText = userName;    

        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth(); //run the function