document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let interval = setInterval(nextSlide, 5000);

    function nextSlide() {
        changeSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        changeSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    }

    function changeSlide(newSlide) {
        slides[currentSlide].classList.remove('active');
        currentSlide = newSlide;
        slides[currentSlide].classList.add('active');
    }

    function pauseSlideshow() {
        clearInterval(interval);
        interval = null;
    }

    function resumeSlideshow() {
        if (!interval) {
            interval = setInterval(nextSlide, 5000);
        }
    }

    document.getElementById('next').addEventListener('click', nextSlide);
    document.getElementById('prev').addEventListener('click', prevSlide);

    const pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', () => {
        if (interval) {
            pauseSlideshow();
            pauseButton.textContent = 'Resume';
        } else {
            resumeSlideshow();
            pauseButton.textContent = 'Pause';
        }
    });
});
