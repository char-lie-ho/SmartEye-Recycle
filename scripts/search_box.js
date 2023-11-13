const categoryRef = db.collection('category');
var keywords = localStorage.getItem('keywords');
console.log(keywords);

categoryRef.where('items', 'array-contains', keywords)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            const title = doc.data().categoryDocID;
            const instruction = doc.data().instruction;
            const recyclable = doc.data().recyclable;
            const examples = doc.data().items;
            const image_url = doc.data().img;
            console.log(`Instruction: ${instruction}, Recyclable: ${recyclable}`);
            document.getElementById("material").innerText = title;
            document.getElementById("instruction-go-here").innerText = instruction;
            document.getElementById("recyclable-go-here").innerText = recyclable;
            document.getElementById("example-go-here").innerText = examples;
            document.getElementById('material_image').setAttribute('src', image_url);
        });
    })


