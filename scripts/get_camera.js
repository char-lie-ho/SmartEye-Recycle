let codeReader = null;

function startScanning() {
  codeReader = new ZXing.BrowserQRCodeReader();
  codeReader.decodeFromVideoDevice(null, 'webcam-preview', (result, err) => {
    if (result) {
      console.log('Found QR code!', result)
      document.getElementById('result').textContent = result.text
    }

    if (err) {
      // As long as this error belongs into one of the following categories
      // the code reader is going to continue as excepted. Any other error
      // will stop the decoding loop.
      if (err instanceof ZXing.NotFoundException) {
        console.log('No QR code found.')
      }

      if (err instanceof ZXing.ChecksumException) {
        console.log('A code was found, but it\'s read value was not valid.')
      }

      if (err instanceof ZXing.FormatException) {
        console.log('A code was found, but it was in an invalid format.')
      }
    }
  });
}

function stopScanning() {
  if (codeReader) {
    codeReader.reset();
  }
}
//pause scanning
document.getElementById('stopButton').addEventListener('click', stopScanning);
//restart scanning
document.getElementById('restartButton').addEventListener('click', startScanning);
// Start scanning initially
startScanning(); 