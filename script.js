function toggleMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}