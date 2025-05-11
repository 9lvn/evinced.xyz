window.onload = function() {
  fetchRandomKey();
  setRandomGradient();
};

function fetchRandomKey() {
  // URL to the raw keys file
  const keyUrl = 'https://raw.githubusercontent.com/9lvn/krnl/refs/heads/main/keys';
  
  fetch(keyUrl)
    .then(response => response.text())  // Get the response text
    .then(keysData => {
      // Split the data into an array by line (assuming each line is a key)
      const keysArray = keysData.split('\n');
      
      // Filter out any empty strings (extra newlines)
      const filteredKeys = keysArray.filter(key => key.trim() !== '');
      
      // Get a random key from the filtered list
      const randomKey = filteredKeys[Math.floor(Math.random() * filteredKeys.length)];
      
      // Set the random key as the value in the textbox
      document.getElementById('key-box').value = randomKey;
    })
    .catch(error => {
      // Handle any errors (e.g., file not found, network issues)
      console.error('Error fetching the key:', error);
      document.getElementById('key-box').value = 'Error loading key';
    });
}

function setRandomGradient() {
  // Generate random positions for the light spot (values between 0% and 100%)
  const randomX = Math.floor(Math.random() * 100); // Random X position
  const randomY = Math.floor(Math.random() * 100); // Random Y position
  
  // Update the background style of the animated-glow with random values
  const glow = document.querySelector('.animated-glow');
  
  glow.style.background = `radial-gradient(circle at ${randomX}% ${randomY}%, #000000, #808080)`; // Black to Grey gradient
  
  // Update the keyframes with random values in the CSS dynamically
  const keyframes = `
    @keyframes moveHue {
      0% {
        transform: translate(-20%, -10%) scale(1);
        background: radial-gradient(circle at ${randomX}% ${randomY}%, #000000, #808080);
      }
      50% {
        transform: translate(10%, 5%) scale(1.1);
        background: radial-gradient(circle at ${randomX}% ${randomY}%, #333333, #808080);
      }
      100% {
        transform: translate(-15%, 10%) scale(1);
        background: radial-gradient(circle at ${randomX}% ${randomY}%, #000000, #666666);
      }
    }
  `;
  
  // Add the random keyframes to the document's style sheet
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}
