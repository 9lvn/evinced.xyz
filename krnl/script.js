window.onload = function() {
  fetchRandomKey();
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
