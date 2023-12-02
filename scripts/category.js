let params = new URL(window.location.href); //get URL of search bar
let ID = params.searchParams.get("docID"); //get value for key "id"

// Reference to the 'category' collection, then the 'paper_cardboard' subcollection
const categoryRef = db.collection('category').doc(ID); //use the document ID

// Query the 'instruction' and 'recyclable' fields
categoryRef.get()
    .then((doc) => {
        if (doc.exists) {
            const title = doc.data().categoryDocID;
            const instructionAccept = doc.data().instruction['WHERE ACCEPTED'];
            const instructionNotAccept = doc.data().instruction['Not Accepted'];
            const image_url = doc.data().img;

            document.getElementById("material").innerText = title;
            document.getElementById("instruction-go-here").innerHTML += '<h5>Where accepted:</h5>'
            instructionAccept.forEach((item) => {
                document.getElementById("instruction-go-here").innerHTML += `<li>${item}</li>`
            })
            document.getElementById("instruction-go-here").innerHTML += '<h5>Not accepted:</h5>'
            instructionNotAccept.forEach((item)=>{
                document.getElementById("instruction-go-here").innerHTML += `<li>${item}</li>`
            })          
            document.getElementById('material_image').setAttribute('src', image_url);

            // change the title of the html dynamically 
            document.querySelector('title').textContent = title
        } else {
            console.log('No such document!');
        }
    })
    .catch((error) => {
        console.error('Error retrieving document:', error);
    });

// take the user back to the previous page
function goBack() {
    window.history.back();
}
