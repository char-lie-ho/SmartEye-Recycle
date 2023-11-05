function displayCategoryInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("category")
        .doc(ID)
        .get()
        .then(doc => {
            Name = doc.data().recycable;
            document.getElementById("material").innerHTML = Name;
        });
}
displayCategoryInfo();