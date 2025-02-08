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
/* 2. Smooth Scrolling (For Navigation)
document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: "smooth"
            });
        }
    });
});*/
//4. Show Confirmation After Form Submission
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const messageBox = document.createElement("p");
    messageBox.style.display = "none";
    form.appendChild(messageBox);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Simulate form submission (You still need a backend for real submission)
        setTimeout(() => {
            messageBox.innerText = "Thank you! Your message has been sent.";
            messageBox.style.display = "block";
            form.reset();
        }, 500);
    });
});


document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("navbar").classList.toggle("active");
});
