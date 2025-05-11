window.onload = function() {
  fetchRandomKey();
};

function fetchRandomKey() {
  // URL to the raw keys file
  const keyUrl = 'https://raw.githubusercontent.com/9lvn/krnl/refs/heads/main/keys';
  
  fetch(keyUrl)
    .then(response => response.text())
    .then(keysData => {
      // Split the data into an array by line
      const keysArray = keysData.split('\n');
      
      // Filter out any empty strings
      const filteredKeys = keysArray.filter(key => key.trim() !== '');
      
      // Get a random key
      const randomKey = filteredKeys[Math.floor(Math.random() * filteredKeys.length)];
      
      // Set the value of the key in the textbox
      document.getElementById('key-box').value = randomKey;
    })
    .catch(error => {
      console.error('Error fetching the key:', error);
      document.getElementById('key-box').value = 'Error loading key';
    });
}
