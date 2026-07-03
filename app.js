// ----------------------------------
// GLOBAL API (Backend URL)
// ----------------------------------
const API = "http://localhost:5000";


// ----------------------------------
// PAGE NAVIGATION (index.html)
// ----------------------------------
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}



// ----------------------------------
// LOGIN SYSTEM — SEND OTP
// ----------------------------------
async function sendOTP() {
    let user = document.getElementById("loginInput").value;
    let msg = document.getElementById("loginMessage");

    if (!user) {
        alert("Please enter phone or email.");
        return;
    }

    msg.style.display = "block";
    msg.innerHTML = "Sending OTP...";

    try {
        let result = await fetch(`${API}/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user })
        });

        let data = await result.json();

        if (data.success) {
            msg.innerHTML = "OTP sent successfully!";
            document.getElementById("otpBox").style.display = "block";
        } else {
            msg.innerHTML = "Failed to send OTP!";
        }
    } catch (error) {
        msg.innerHTML = "Server not reachable!";
    }
}



// ----------------------------------
// LOGIN SYSTEM — VERIFY OTP
// ----------------------------------
async function verifyOTP() {
    let user = document.getElementById("loginInput").value;
    let otp = document.getElementById("loginOtp").value;
    let msg = document.getElementById("loginMessage");

    if (!otp) {
        alert("Enter OTP!");
        return;
    }

    msg.style.display = "block";
    msg.innerHTML = "Verifying OTP...";

    try {
        let result = await fetch(`${API}/verify-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, otp })
        });

        let data = await result.json();

        if (data.success) {
            msg.innerHTML = "Login successful! Redirecting...";

            setTimeout(() => {
                window.location.href = "index.html";  // redirect to main home page
            }, 1500);
        } else {
            msg.innerHTML = "Incorrect OTP!";
        }
    } catch (error) {
        msg.innerHTML = "Server error!";
    }
}





// ----------------------------------
// CROP ADVISORY
// ----------------------------------
async function getCrop() {
    let crop = document.getElementById("cropName").value;
    let output = document.getElementById("cropResult");

    if (!crop) {
        alert("Enter crop name");
        return;
    }

    output.style.display = "block";
    output.innerHTML = "Loading...";

    let res = await fetch(`${API}/crop/${crop}`);
    let data = await res.json();

    output.innerHTML = `
        <h3>${data.crop}</h3>
        <p>${data.advice}</p>
    `;
}



// ----------------------------------
// MARKET PRICE
// ----------------------------------
async function getMarket() {
    let crop = document.getElementById("marketCrop").value;
    let output = document.getElementById("marketResult");

    if (!crop) {
        alert("Enter crop name");
        return;
    }

    output.style.display = "block";
    output.innerHTML = "Loading...";

    let res = await fetch(`${API}/market/${crop}`);
    let data = await res.json();

    output.innerHTML = `
        <h3>${data.crop}</h3>
        <p>Market Price: ₹${data.price}</p>
    `;
}



// ----------------------------------
// FERTILIZER ADVICE
// ----------------------------------
async function getFertilizer() {
    let crop = document.getElementById("fertCrop").value;
    let output = document.getElementById("fertResult");

    if (!crop) {
        alert("Enter crop name");
        return;
    }

    output.style.display = "block";
    output.innerHTML = "Loading...";

    let res = await fetch(`${API}/fertilizer/${crop}`);
    let data = await res.json();

    output.innerHTML = `
        <h3>${data.crop}</h3>
        <p>${data.fertilizer}</p>
    `;
}



// ----------------------------------
// PEST CONTROL
// ----------------------------------
async function getPest() {
    let crop = document.getElementById("pestCrop").value;
    let output = document.getElementById("pestResult");

    if (!crop) {
        alert("Enter crop name");
        return;
    }

    output.style.display = "block";
    output.innerHTML = "Loading...";

    let res = await fetch(`${API}/pests/${crop}`);
    let data = await res.json();

    output.innerHTML = `
        <h3>${data.crop}</h3>
        <p>${data.pests}</p>
    `;
}



// ----------------------------------
// WEATHER REPORT
// ----------------------------------
async function getWeather() {
    let loc = document.getElementById("weatherLoc").value;
    let output = document.getElementById("weatherResult");

    if (!loc) {
        alert("Enter location");
        return;
    }

    output.style.display = "block";
    output.innerHTML = "Loading...";

    let res = await fetch(`${API}/weather?location=${loc}`);
    let data = await res.json();

    output.innerHTML = `
        <h3>${loc}</h3>
        <p>Temperature: ${data.temperature}</p>
        <p>Humidity: ${data.humidity}</p>
        <p>Rainfall: ${data.rainfall}</p>
    `;
}



// ----------------------------------
// VOICE ASSISTANT
// ----------------------------------
document.addEventListener("DOMContentLoaded", () => {
    let micBtn = document.getElementById("startMic");

    if (!micBtn) return; // if button doesn't exist on this page

    micBtn.onclick = function () {
        let output = document.getElementById("voiceOutput");
        let response = document.getElementById("voiceResponse");

        if (!window.webkitSpeechRecognition) {
            alert("Use Google Chrome for voice");
            return;
        }

        let SR = new webkitSpeechRecognition();
        SR.lang = "en-IN";
        SR.start();

        SR.onresult = async function(event) {
            let text = event.results[0][0].transcript;
            output.value = text;
            response.style.display = "block";

            // Voice command example: "price of rice"
            if (text.includes("price")) {
                let crop = text.match(/rice|wheat|cotton|maize|onion|tomato/i);

                if (crop) {
                    let res = await fetch(`${API}/market/${crop[0]}`);
                    let data = await res.json();

                    response.innerHTML = `Price of ${crop[0]} is ₹${data.price}`;
                    return;
                }
            }

            response.innerHTML = `Heard: ${text}`;
        };
    };
});
