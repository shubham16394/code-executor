// Function to send code to iframe and execute it
function executeCode() {
  const iframe = document.getElementById('codeFrame');
  const codeInput = document.getElementById('codeInput');
  const outputDiv = document.getElementById('output');
  const code = codeInput.value;

  // Clear previous output
  outputDiv.innerHTML = '';

  // Send the code to iframe via postMessage
  // iframe.contentWindow.postMessage({ type: 'execute', code: code }, '*');
  iframe.contentWindow.eval(code);
}

// Listen for messages from the iframe
window.addEventListener('message', function(event) {
  // Check the message origin to ensure security
  if (event.origin !== window.origin) return;

  if (event.data.type === 'log') {
      document.getElementById('output').innerHTML += `<p><strong>Log:</strong> ${event.data.message}</p>`;
  } else if (event.data.type === 'error') {
      document.getElementById('output').innerHTML += `<p><strong>Error:</strong> ${event.data.message}</p>`;
  }
});
