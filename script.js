async function analyze() {
    const target = document.getElementById("targetInput").value;
    const resultsContainer = document.getElementById("resultsContainer");
    if (!target) {
        resultsContainer.textContent = "Please enter a valid target.";
        return;
    }

    resultsContainer.textContent = "Fetching data...";

    try {
        const shodanResponse = await fetch(`https://api.shodan.io/shodan/host/search?key=3eUPKAyjY5nIQS17qJKt8qmdoOS3Fmz1&query=${target}`);
        const shodanData = await shodanResponse.json();

        const censysResponse = await fetch("https://search.censys.io/api/v1/view/ipv4/" + target, {
            method: "GET",
            headers: {
                Authorization: "Basic " + btoa("c981f633-3d5d-4660-8569-66c5ad73b11c:AbbBD0AvZwddnzZVZwoIsLFsT5A3Fcab")
            }
        });
        const censysData = await censysResponse.json();

        resultsContainer.textContent = `
Shodan Data: ${JSON.stringify(shodanData, null, 2)}
Censys Data: ${JSON.stringify(censysData, null, 2)}
        `;
    } catch (error) {
        resultsContainer.textContent = `Error: ${error.message}`;
    }
}

function loginWithGoogle() {
    alert("Login with Google is under development.");
}

function loginWithFacebook() {
    alert("Login with Facebook is under development.");
}

function loginWithInstagram() {
    alert("Login with Instagram is under development.");
}
