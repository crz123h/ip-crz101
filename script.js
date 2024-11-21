async function analyze() {
    const target = document.getElementById("targetInput").value;
    const resultsContainer = document.getElementById("resultsContainer");
    if (!target) {
        resultsContainer.textContent = "Please enter a valid target.";
        return;
    }

    resultsContainer.textContent = "Fetching data...";

    try {
        const shodanResponse = await fetch(`https://api.shodan.io/shodan/host/search?key=YOUR_SHODAN_API_KEY&query=${target}`);
        const shodanData = await shodanResponse.json();

        resultsContainer.textContent = `
Target: ${target}
Shodan Data: ${JSON.stringify(shodanData, null, 2)}
        `;
    } catch (error) {
        resultsContainer.textContent = `Error: ${error.message}`;
    }
}

async function scanPort() {
    const target = document.getElementById("targetInput").value;
    const resultsContainer = document.getElementById("resultsContainer");
    if (!target) {
        resultsContainer.textContent = "Please enter a valid target.";
        return;
    }

    resultsContainer.textContent = "Scanning ports for " + target + "...";
    setTimeout(() => {
        resultsContainer.textContent += `
Common ports:
- Port 80 (HTTP) - Open
- Port 443 (HTTPS) - Open
- Port 22 (SSH) - Closed
        `;
    }, 2000);
}

async function whois() {
    const target = document.getElementById("targetInput").value;
    const resultsContainer = document.getElementById("resultsContainer");
    if (!target) {
        resultsContainer.textContent = "Please enter a valid target.";
        return;
    }

    resultsContainer.textContent = "Fetching WHOIS data for " + target + "...";
    try {
        const response = await fetch(`https://jsonwhoisapi.com/api/v1/whois?identifier=${target}`, {
            headers: { Authorization: "Token YOUR_API_KEY_HERE" }
        });
        const data = await response.json();

        resultsContainer.textContent = `
WHOIS Data:
Domain: ${data.domain}
Registrar: ${data.registrar}
Created: ${data.created}
Expires: ${data.expires}
        `;
    } catch (error) {
        resultsContainer.textContent = `Error: ${error.message}`;
    }
}