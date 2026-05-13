/* ----------------------------------------------------
   PAGE SWITCHING (For Dashboard Pages)
---------------------------------------------------- */
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });
    const currentPage = document.getElementById(pageId);
    if (currentPage) currentPage.classList.add("active");
}

/* ----------------------------------------------------
   HAMBURGER MENU
---------------------------------------------------- */
function toggleMenu() {
    document.getElementById("menuPanel").classList.toggle("menu-open");
}

/* ----------------------------------------------------
   DOCUMENT READY
---------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");

    // Add entry animation (only for login/register pages)
    container?.classList.add("active");

    /* ----------------------------------------------------
       REGISTER PAGE
    ---------------------------------------------------- */
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = registerForm.username.value.trim();
            const email = registerForm.email.value.trim();
            const password = registerForm.password.value.trim();

            if (!username || !email || !password) {
                alert("Please fill all fields!");
                return;
            }

            // Save user to localStorage
            localStorage.setItem(
                "farmerUser",
                JSON.stringify({ username, email, password })
            );

            alert("Registration Successful!");
            window.location.href = "login.html";
        });
    }

    /* ----------------------------------------------------
       LOGIN PAGE
    ---------------------------------------------------- */
    const loginForm = document.querySelector(".form-box.Login form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const loginUserInput = document.getElementById("loginUser")?.value.trim();
            const loginPassInput = document.getElementById("loginPass")?.value.trim();

            const user = JSON.parse(localStorage.getItem("farmerUser"));

            if (!user || user.username !== loginUserInput || user.password !== loginPassInput) {
                alert("Invalid Login Details!");
                return;
            }

            alert(`Welcome back, ${user.username}!`);
            window.location.href = "index.html";
        });
    }

    /* ----------------------------------------------------
       LOGOUT USER
    ---------------------------------------------------- */
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn?.addEventListener("click", () => {
        localStorage.removeItem("farmerUser");
        alert("Logged out!");
        window.location.href = "login.html";
    });

    /* ----------------------------------------------------
       CROP ADVISORY
    ---------------------------------------------------- */
    const cropBtn = document.getElementById("cropBtn");
    cropBtn?.addEventListener("click", () => {
        const crop = document.getElementById("cropName")?.value.trim();
        if (!crop) return alert("Please enter a crop name.");
        document.getElementById("cropResult").innerHTML =
            `Advice for <b>${crop}</b>: Use proper irrigation, nitrogen fertilizer, and regular pest monitoring.`;
    });

    /* ----------------------------------------------------
       MARKET PRICE
    ---------------------------------------------------- */
    const marketBtn = document.getElementById("marketBtn");
    marketBtn?.addEventListener("click", () => {
        const crop = document.getElementById("marketCrop")?.value.trim();
        if (!crop) return alert("Please enter a crop name.");
        document.getElementById("marketResult").innerHTML =
            `Current market price for <b>${crop}</b>: ₹45 – ₹70 per kg.`;
    });

    /* ----------------------------------------------------
       FERTILIZER GUIDE
    ---------------------------------------------------- */
    const fertBtn = document.getElementById("fertBtn");
    fertBtn?.addEventListener("click", () => {
        const crop = document.getElementById("fertCrop")?.value.trim();
        if (!crop) return alert("Please enter a crop name.");
        document.getElementById("fertResult").innerHTML =
            `<b>${crop}</b> requires Balanced NPK fertilizer: 120 : 60 : 40 ratio.`;
    });

    /* ----------------------------------------------------
       PEST CONTROL
    ---------------------------------------------------- */
    const pestBtn = document.getElementById("pestBtn");
    pestBtn?.addEventListener("click", () => {
        const crop = document.getElementById("pestCrop")?.value.trim();
        if (!crop) return alert("Please enter a crop name.");
        document.getElementById("pestResult").innerHTML =
            `<b>${crop}</b>: Use neem oil spray or pheromone traps.`;
    });

    /* ----------------------------------------------------
       WEATHER INFORMATION
    ---------------------------------------------------- */
    const weatherBtn = document.getElementById("weatherBtn");
    weatherBtn?.addEventListener("click", () => {
        const loc = document.getElementById("weatherLoc")?.value.trim();
        if (!loc) return alert("Please enter a location.");
        document.getElementById("weatherResult").innerHTML =
            `Weather in <b>${loc}</b>: 30°C | Partly Cloudy | Humidity 60%`;
    });

    /* ----------------------------------------------------
       VOICE ASSISTANT SIMULATION
    ---------------------------------------------------- */
    const startMic = document.getElementById("startMic");
    startMic?.addEventListener("click", () => {
        const input = document.getElementById("voiceOutput")?.value.trim();
        const output = document.getElementById("voiceResponse");
        if (!input) {
            output.innerHTML = "🎤 Voice assistant is listening... (Simulation)";
        } else {
            output.innerHTML = `🎤 You said: <b>${input}</b>`;
        }
    });
});
