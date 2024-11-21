function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
}
/*contact and about button redirect to social links*/
document.addEventListener("DOMContentLoaded", () => {
    const contactLink = document.getElementById("conn");
    const aboutLink = document.getElementById("about-nav");
    const socialSection = document.getElementById("social-media");
    const aboutSection = document.getElementById("about-me");

    function scrollToSection(link, section) {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent the default anchor behavior
            section.scrollIntoView({ behavior: "smooth" });

            // Add hover class
            section.classList.add("footer-hover");

            // Remove the hover class after 2 seconds
            setTimeout(() => {
                section.classList.remove("footer-hover");
            }, 2000);
        });
    }

    scrollToSection(contactLink, socialSection);
    scrollToSection(aboutLink, aboutSection);
});

