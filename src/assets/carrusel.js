let currentIndex = 0;
const intervalTime = 5000; // Intervalo de tiempo en milisegundos
let slideInterval;

function moveCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    items[currentIndex].classList.remove('active');

    currentIndex += direction;
    if (currentIndex >= totalItems) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    }

    items[currentIndex].classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    // Ensure the first item is visible
    document.querySelectorAll('.carousel-item')[0].classList.add('active');

    // Start the slide
    slideInterval = setInterval(() => {
        moveCarousel(1);
    }, intervalTime);
});
