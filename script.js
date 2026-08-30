/* =========================================================
   TANYA KUMARI PORTFOLIO
   script.js
   ========================================================= */


/* ================= DOM READY ================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENTS ================= */

    const header = document.querySelector(".header");
    const menuBtn = document.querySelector(".menu-btn");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    const backToTop = document.querySelector("#back-to-top");

    const modal = document.querySelector(".certificate-modal");
    const modalImage = modal ? modal.querySelector("img") : null;
    const modalClose = modal ? modal.querySelector(".modal-close") : null;

    const certificateCards =
        document.querySelectorAll(".certificate-card");


    /* =========================================================
       MOBILE MENU
       ========================================================= */

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("open");

            const isOpen = navbar.classList.contains("open");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

            /* Change hamburger icon */

            const icon = menuBtn.querySelector("i");

            if (icon) {

                if (isOpen) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });

    }


    /* =========================================================
       CLOSE MOBILE MENU AFTER CLICK
       ========================================================= */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navbar) {
                navbar.classList.remove("open");
            }

            if (menuBtn) {

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });

    });


    /* =========================================================
       HEADER SCROLL EFFECT
       ========================================================= */

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );


    /* =========================================================
       ACTIVE NAVIGATION LINK
       ========================================================= */

    const sections = document.querySelectorAll("section[id]");

    const updateActiveNav = () => {

        const scrollPosition =
            window.scrollY +
            150;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };

    updateActiveNav();

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    /* =========================================================
       BACK TO TOP
       ========================================================= */

    const handleBackToTop = () => {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    };

    handleBackToTop();

    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =========================================================
       CERTIFICATE FULL-SCREEN MODAL
       ========================================================= */

    const openCertificate = (imageSrc, imageAlt) => {

        if (!modal || !modalImage) return;

        modalImage.src = imageSrc;

        modalImage.alt =
            imageAlt ||
            "Certificate";

        modal.classList.add("show");

        document.body.classList.add(
            "modal-open"
        );

    };


    const closeCertificate = () => {

        if (!modal) return;

        modal.classList.remove("show");

        document.body.classList.remove(
            "modal-open"
        );

        /*
         * Small delay before clearing image
         * so closing animation works smoothly.
         */

        setTimeout(() => {

            if (modalImage) {
                modalImage.src = "";
            }

        }, 300);

    };


    /* =========================================================
       CERTIFICATE CLICK
       ========================================================= */

    certificateCards.forEach(card => {

        const image =
            card.querySelector(
                ".certificate-image img"
            );

        const viewButton =
            card.querySelector(
                ".certificate-view"
            );

        const certificateLink =
            card.querySelector(
                ".certificate-content a"
            );


        const handleClick = event => {

            /*
             * If actual external link is clicked,
             * don't open the modal twice.
             */

            if (
                event.target.closest(
                    ".certificate-content a"
                )
            ) {
                return;
            }

            if (!image) return;

            openCertificate(
                image.src,
                image.alt
            );

        };


        if (image) {

            image.style.cursor = "pointer";

            image.addEventListener(
                "click",
                handleClick
            );

        }


        if (viewButton) {

            viewButton.style.cursor = "pointer";

            viewButton.addEventListener(
                "click",
                handleClick
            );

        }

    });


    /* =========================================================
       CLOSE CERTIFICATE MODAL
       ========================================================= */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeCertificate
        );

    }


    /*
     * Click outside certificate
     */

    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeCertificate();

                }

            }
        );

    }


    /* =========================================================
       ESCAPE KEY
       ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("show")
            ) {

                closeCertificate();

            }

        }
    );


    /* =========================================================
       DOWNLOAD CV
       ========================================================= */

    const cvButtons =
        document.querySelectorAll(
            '[href*="cv"], [download]'
        );

    cvButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const href =
                    button.getAttribute("href");

                /*
                 * If CV file exists, browser handles
                 * download normally.
                 *
                 * We don't prevent default here.
                 */

                if (!href) {
                    event.preventDefault();
                }

            }
        );

    });


    /* =========================================================
       SMOOTH SCROLL FOR INTERNAL LINKS
       ========================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =========================================================
       IMAGE FALLBACK
       ========================================================= */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    /*
                     * Keep broken images from
                     * destroying the layout.
                     */

                    image.style.objectFit =
                        "contain";

                    image.style.padding =
                        "25px";

                }
            );

        });


    /* =========================================================
       CURRENT YEAR
       ========================================================= */

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =========================================================
       PAGE LOAD
       ========================================================= */

    document.body.classList.add(
        "page-loaded"
    );

});
/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .certificate-card"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});