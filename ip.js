// fetching api from db-ip
fetch("https://api.db-ip.com/v2/free/self")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    document.getElementById("ip").textContent = data.ipAddress;
    document.getElementById("country-name").textContent = data.countryName;

    // Set user country code globally for confirmation logic
    const code = data.countryCode; // 2-letter code like "PK"
    if (code) {
      window.setUserCountryCode(code);
    }
  })
  .catch(err => {
    console.error("Error fetching IP data:", err);
    document.getElementById("ip-info").textContent = "Could not fetch IP data.";
  });
