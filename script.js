window.onload = function() {
    fetch('https://your-server-url/get-counter')  // Replace with your actual server URL
        .then(response => response.json())
        .then(data => {
            document.getElementById('counter').textContent = data.counter;
        })
        .catch(error => {
            console.error('Error fetching counter:', error);
            document.getElementById('counter').textContent = "Error loading counter";
        });

    // Send a request to increase the counter on the server
    fetch('https://your-server-url/increment-counter', {
        method: 'POST',
    })
    .catch(error => console.error('Error updating counter:', error));
};
