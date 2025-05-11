window.onload = function() {
  fetchRandomKey();
  setRandomGradient();
};

function fetchRandomKey() {
  const keyUrl = 'https://raw.githubusercontent.com/9lvn/krnl/refs/heads/main/keye';
  
  fetch(keyUrl)
    .then(response => response.text()) 
    .then(keysData => {
      const keysArray = keysData.split('\n');
      
      const filteredKeys = keysArray.filter(key => key.trim() !== '');
      
      const randomKey = filteredKeys[Math.floor(Math.random() * filteredKeys.length)];
      
      document.getElementById('key-box').value = randomKey;
    })
    .catch(error => {
      
      console.error('Error fetching the key:', error);
      document.getElementById('key-box').value = 'Error loading key';
    });
}

function setRandomGradient() {

  const randomX = Math.floor(Math.random() * 100);
  const randomY = Math.floor(Math.random() * 100);
  
  const glow = document.querySelector('.animated-glow');
  
  glow.style.background = `radial-gradient(circle at ${randomX}% ${randomY}%, #000000, #808080)`; 
  
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
  
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}
