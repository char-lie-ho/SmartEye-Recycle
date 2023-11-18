// take the user back to the previous page
function goBack() {
    window.history.back();
}

//get URL of search bar
let params = new URL(window.location.href);

// obtain the barcode number
console.log(params.search.slice(1))
let searchBarcode = params.search.slice(1)

//obtain the document name inside category from database
const categoryRef = db.collection('category');

categoryRef.where('barcode', 'array-contains', searchBarcode)
    .get()
    .then((querySnapshot) => {
        // if the query result is not empty, a matching document was found
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                // Retrieve the name of the document
                var category = doc.id;
                console.log('Document with barcode found:', category);
                //Based on the barcode, alter the href inside recycling suggestions
                var suggestionButton = document.getElementById('suggestion');
                suggestionButton.setAttribute('href', `category_template.html?docID=${category}`);

            });
        } else {
            console.log('Not found!');
        }
    })
