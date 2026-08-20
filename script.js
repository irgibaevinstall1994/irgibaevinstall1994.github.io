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
/* =========================================================
   CERTIFICATE MODAL
========================================================= */

const certificateLinks =
    document.querySelectorAll(".certificate-view");

const certificateModal =
    document.getElementById("certificateModal");

const certificateModalImage =
    document.getElementById("certificateModalImage");

const certificateModalClose =
    document.querySelector(".certificate-modal-close");

const certificateModalBackdrop =
    document.querySelector(".certificate-modal-backdrop");


function openCertificate(imageSrc) {

    certificateModalImage.src = imageSrc;

    certificateModal.classList.add("is-open");

    document.body.classList.add("modal-open");
}


function closeCertificate() {

    certificateModal.classList.remove("is-open");

    document.body.classList.remove("modal-open");

    setTimeout(() => {
        certificateModalImage.src = "";
    }, 200);
}


certificateLinks.forEach((link) => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const imageSrc =
            this.dataset.certificate;

        openCertificate(imageSrc);

    });

});


certificateModalClose.addEventListener(
    "click",
    closeCertificate
);


certificateModalBackdrop.addEventListener(
    "click",
    closeCertificate
);


/* Close with Escape */

document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        certificateModal.classList.contains("is-open")
    ) {
        closeCertificate();
    }

});
