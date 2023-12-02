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


// greeting message
var thehours = new Date().getHours();
var themessage;
var morning = ('Good morning,');
var afternoon = ('Good afternoon,');
var evening = ('Good evening,');

if (thehours >= 0 && thehours < 12) {
    themessage = morning;

} else if (thehours >= 12 && thehours < 17) {
    themessage = afternoon;

} else if (thehours >= 17 && thehours < 24) {
    themessage = evening;
}

$('.greeting').append(themessage);