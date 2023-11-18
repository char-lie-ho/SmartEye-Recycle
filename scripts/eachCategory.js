let params = new URL(window.location.href); //get URL of search bar
let ID = params.searchParams.get("docID"); //get value for key "id"

// Reference to the 'category' collection, then the 'paper_cardboard' subcollection
const categoryRef = db.collection('category').doc(ID); //use the document ID

// Query the 'instruction' and 'recyclable' fields
categoryRef.get()
    .then((doc) => {
        if (doc.exists) {
            const title = doc.data().categoryDocID;
            const instructionA = doc.data().instruction['WHERE ACCEPTED'];
            const instructionNotAccept = doc.data().instruction['Not Accepted'];
            const recyclable = doc.data().recyclable;
            const examples = doc.data().examples;
            const image_url = doc.data().img;
            // console.log(`Instruction: ${instruction}, Recyclable: ${recyclable}`);
            document.getElementById("material").innerText = title;
            document.getElementById("instruction-go-here").innerHTML = `<p>Where accept: ${instructionA}</p><p>Not accepted: ${instructionNotAccept}`;
            document.getElementById("recyclable-go-here").innerText = recyclable;
            document.getElementById("example-go-here").innerText = examples;
            document.getElementById('material_image').setAttribute('src', image_url);
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
