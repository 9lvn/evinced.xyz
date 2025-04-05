// This will use Vercel's serverless functions to track visitors
async function updateVisitorCounter() {
    try {
        // Call our Vercel serverless function
        const response = await fetch('/api/visitors');
        const data = await response.json();
        
        document.getElementById('visitor-counter').textContent = data.count;
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        document.getElementById('visitor-counter').textContent = 'Error';
    }
}

// Update counter on page load
updateVisitorCounter();
