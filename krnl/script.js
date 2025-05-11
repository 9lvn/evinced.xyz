// Function to generate a random captcha text
function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
}

// Function to fetch a random string from GitHub
async function getRandomString() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/9lvn/krnl/refs/heads/main/keys');
        const data = await response.text();
        const strings = data.split('\n');
        const randomString = strings[Math.floor(Math.random() * strings.length)];
        return randomString;
    } catch (error) {
        console.error('Error fetching random string:', error);
        return 'Error fetching string.';
    }
}

// When the page loads, generate a captcha
document.addEventListener('DOMContentLoaded', () => {
    const captchaText = generateCaptcha();
    document.getElementById('captcha-text').textContent = captchaText;
    
    document.getElementById('verify-btn').addEventListener('click', async () => {
        const userInput = document.getElementById('captcha-input').value;
        if (userInput === captchaText) {
            const randomString = await getRandomString();
            document.getElementById('result').textContent = `Success! Random string: ${randomString}`;
        } else {
            document.getElementById('result').textContent = 'Captcha incorrect. Try again.';
        }
    });
});
