function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
}
//Form Validation (Prevent Empty Submissions)
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        const name = document.querySelector("input[name='name']").value.trim();
        const email = document.querySelector("input[name='email']").value.trim();
        const message = document.querySelector("textarea[name='message']").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill out all fields before submitting!");
            event.preventDefault();
        }
    });
});

//4. Show Confirmation After Form Submission and linked contact form with Spreadsheet.
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const messageBox = document.createElement("p");
    messageBox.style.display = "none";
    messageBox.style.color = "green";
    form.appendChild(messageBox);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });

        // Replace with your own SheetDB API endpoint
        fetch("https://sheetdb.io/api/v1/7y4zpeaang9ja", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: object })
        })
        .then(response => response.json())
        .then(data => {
            messageBox.innerText = "✅ Thank you! Your message has been sent.";
            messageBox.style.display = "block";
            form.reset();
        })
        .catch(error => {
            messageBox.innerText = "❌ Sorry! Something went wrong.";
            messageBox.style.color = "red";
            messageBox.style.display = "block";
        });
    });
});


document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("navbar").classList.toggle("active");
});
