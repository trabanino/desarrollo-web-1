function toggleMenu() {
    const links = document.querySelector(".links");
    const body = document.body;
    if (links) {
        links.classList.toggle("active");
        body.classList.toggle("menu-open");
    }
}

let resizeTimeout;

window.addEventListener("resize", () => {
    document.body.classList.add("no-transition");

    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        document.body.classList.remove("no-transition");
    }, 250);
});
