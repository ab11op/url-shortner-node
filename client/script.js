document.getElementById("shortenBtn").addEventListener("click", async () => {
    const longUrl = document.getElementById("longUrl").value;
    if (!longUrl) {
        alert("Please enter a URL");
        return;
    }

    try {
        const response = await fetch("http://localhost:5001/api/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ longUrl })
        });

        const data = await response.json();
        if (data.shortUrl) {
            document.getElementById("shortUrl").innerHTML = 
                `Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
        } else {
            document.getElementById("shortUrl").innerText = "Error: Unable to shorten URL";
        }
    } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById("shortUrl").innerText = "Error: Unable to connect to the server";
    }
});
