var barcodeHistory = [];

// Barbode scanner function
function startScanner() {
  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector('#scanner-container'),
      constraints: {
        width: 320,
        height: 370,
        facingMode: "user"
      },
    },
    decoder: {
      readers: [
        // "code_128_reader",
        "ean_reader",
        // "ean_8_reader",
        // "code_39_reader",
        // "code_39_vin_reader",
        // "codabar_reader",
        // "upc_reader",
        // "upc_e_reader",
        // "i2of5_reader"
      ],
      debug: {
        showCanvas: true,
        showPatches: true,
        showFoundPatches: true,
        showSkeleton: true,
        showLabels: true,
        showPatchLabels: true,
        showRemainingPatchLabels: true,
        boxFromPatches: {
          showTransformed: true,
          showTransformedBox: true,
          showBB: true
        }
      }
    },

  }, function (err) {
    if (err) {
      console.log(err);
      return
    }

    console.log("Initialization finished. Ready to start");
    Quagga.start();

    // Set flag to is running
    _scannerIsRunning = true;
  });

  Quagga.onProcessed(function (result) {
    var drawingCtx = Quagga.canvas.ctx.overlay,
      drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
        result.boxes.filter(function (box) {
          return box !== result.box;
        }).forEach(function (box) {
          Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
        });
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
      }
    }
  });


  Quagga.onDetected(function (result) {
    var barcode = result.codeResult.code;

    // Add the barcode to the history array
    barcodeHistory.push(barcode);

    // Keep only the last 50 entries in the history array
    if (barcodeHistory.length > 50) {
      barcodeHistory.shift(); // Remove the oldest entry
    }

    // Check if the last 50 barcodes are the same
    if (areLast50BarcodesSame()) {
      // Display the barcode on the html after successfully read the barcode
      document.getElementById('result').textContent = 'Your barcode is ' + barcodeHistory[0];

      // Display the go button after successfully read the barcode
      document.getElementById('go').style.display = 'inline'
    }
  });

  // This line is added so that each time restart clicked, the result div can be emptied 
  // Clear the inner text of the result div
  document.getElementById('result').textContent = ""


  function stopScanning() {
    // Clear the inner text of the result div
    document.getElementById('result').textContent = ""

    if (_scannerIsRunning) {
      Quagga.stop();
      _scannerIsRunning = false;
      console.log("Scanner stopped");
    } else {
      console.log("Scanner is not running. ")
    }
  }

  //pause scanning
  document.getElementById('stopButton').addEventListener('click', stopScanning);

  //restart scanning
  document.getElementById('restartButton').addEventListener('click', () => {
    // Refresh the page when the button is clicked
    location.reload();
  });
}

startScanner()


// Check if the last 50 barcodes are the same
function areLast50BarcodesSame() {
  // Check if all elements in the array are the same
  return barcodeHistory.every(function (value) {
    return value === barcodeHistory[0];
  });
}


// Go button
// Alter the href inside go based on the barcode
// Add a click event listener to the button
document.getElementById('go').addEventListener('click', function () {
  document.getElementById('go')
    .setAttribute('href', `post_scan.html?${barcodeHistory[0]}`);
});


// take the user back to the previous page
function goBack() {
  window.history.back();
}

//pop-up window for manually enter barcode
document.getElementById('keyboard').addEventListener('click', function () {
  Swal.fire({
    title: "Enter your barcode",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "Look up",
    showLoaderOnConfirm: true,
    preConfirm: (barcode) => {
      // redirect user to another page when look up Btn is clicked
      window.location.href = `post_scan.html?${barcode}`
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
})

// Help button
document.getElementById('help').addEventListener('click', function () {
  Swal.fire({
    title: "Quick Guide:",
    html: `   
    <ol style='text-align: left'>
        <li>Activate the camera</li>
        <li>Place the barcode about 10cm away from the camera</li>
        <li>Click 'Look up!' for recycling details when the barcode number appears</li>
    </ol>

    <p><strong>Additional Options:</strong></p>
    <ul style='text-align: left'>
        <li>Use the keyboard icon for manual barcode entry</li>
        <li>Use the Pause button to stop the camera temporarily</li>
        <li>Click Restart to resume camera</li>
    </ul>

    <p style='text-align: left'>For help, click the 'support' button to contact us. Happy recycling!</p>`
  });
})
