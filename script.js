document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".portfolio-track");

    const slides = Array.from(
        document.querySelectorAll(".portfolio-slide")
    );

    const prevButton = document.querySelector(".portfolio-prev");
    const nextButton = document.querySelector(".portfolio-next");

    const currentDisplay = document.getElementById("portfolioCurrent");
    const totalDisplay = document.getElementById("portfolioTotal");


    if (
        !track ||
        slides.length === 0 ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }


    let currentIndex = 0;


    /* ---------- TOTAL PHOTOS ---------- */

    totalDisplay.textContent =
        String(slides.length).padStart(2, "0");


    /* ---------- NUMBER OF VISIBLE PHOTOS ---------- */

    function getVisibleSlides() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;
    }


    /* ---------- WIDTH OF ONE MOVEMENT ---------- */

    function getStep() {

        const slideWidth =
            slides[0].getBoundingClientRect().width;

        const trackStyle =
            window.getComputedStyle(track);

        const gap =
            parseFloat(trackStyle.gap) || 0;

        return slideWidth + gap;
    }


    /* ---------- LAST POSSIBLE POSITION ---------- */

    function getMaxIndex() {

        return Math.max(
            0,
            slides.length - getVisibleSlides()
        );
    }


    /* ---------- MOVE SLIDER ---------- */

    function updateSlider() {

        const step = getStep();

        track.style.transform =
            `translate3d(-${currentIndex * step}px, 0, 0)`;

        currentDisplay.textContent =
            String(currentIndex + 1).padStart(2, "0");
    }


    /* ---------- NEXT ---------- */

    nextButton.addEventListener("click", function () {

        currentIndex++;

        if (currentIndex > getMaxIndex()) {
            currentIndex = 0;
        }

        updateSlider();

    });


    /* ---------- PREVIOUS ---------- */

    prevButton.addEventListener("click", function () {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = getMaxIndex();
        }

        updateSlider();

    });


    /* ---------- SWIPE ---------- */

    let touchStartX = 0;


    track.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].clientX;

        },
        { passive: true }
    );


    track.addEventListener(
        "touchend",
        function (event) {

            const touchEndX =
                event.changedTouches[0].clientX;

            const distance =
                touchStartX - touchEndX;


            if (Math.abs(distance) < 40) {
                return;
            }


            if (distance > 0) {

                currentIndex++;

                if (currentIndex > getMaxIndex()) {
                    currentIndex = 0;
                }

            } else {

                currentIndex--;

                if (currentIndex < 0) {
                    currentIndex = getMaxIndex();
                }

            }


            updateSlider();

        },
        { passive: true }
    );


    /* ---------- WINDOW RESIZE ---------- */

    window.addEventListener("resize", function () {

        if (currentIndex > getMaxIndex()) {
            currentIndex = getMaxIndex();
        }

        updateSlider();

    });


    updateSlider();

});
