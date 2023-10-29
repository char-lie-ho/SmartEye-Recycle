function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            console.log($('#navbarPlaceholder').load('../text/nav_after_login.html'));
            // console.log($('#footerPlaceholder').load('./text/footer.html'));  ///comment this out because not sure if we need a footer
        } else {
            // No user is signed in.
            console.log($('#navbarPlaceholder').load('../text/nav_before_login.html'));
            // console.log($('#footerPlaceholder').load('./text/footer.html')); ///comment this out because not sure if we need a footer
        }
    });
}
loadSkeleton(); //invoke the function

console.log('hello')