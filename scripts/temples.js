document.addEventListener('DOMContentLoaded', function () {
    let yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    let lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        function formatLastModified(date) {
            return date.toLocaleString();
        }

        function updateLastModified() {
            let now = new Date();
            lastModifiedSpan.textContent = formatLastModified(now);
        }
        updateLastModified();
    }

    // Código do menu de hambúrguer
    function toggleMenu() {
        let menu = document.querySelector('.flex-nav ul');
        menu.classList.toggle('show');

        let hamburgerButton = document.querySelector('.hamburger');
        if (hamburgerButton) {
            if (menu.classList.contains('show')) {
                hamburgerButton.textContent = 'X';
            } else {
                hamburgerButton.textContent = '☰';
            }
        }
    }

    let hamburgerButton = document.querySelector('.hamburger');
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', toggleMenu);
    }
});
