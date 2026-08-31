// ================= ABOUT POPUP OPEN =================

function openAbout() {
    document.getElementById("aboutPopup").style.display = "flex";
}


// ================= ABOUT POPUP CLOSE =================

function closeAbout() {
    document.getElementById("aboutPopup").style.display = "none";
}


// ================= ACHIEVEMENT POPUP =================

function openAchievement() {
    document.getElementById("achievementPopup").style.display = "flex";
}

function closeAchievement() {
    document.getElementById("achievementPopup").style.display = "none";
}


// ================= IMAGE POPUP =================

function openImage(imagePath) {

    const popup = document.getElementById("imagePopup");
    const image = document.getElementById("fullImage");

    popup.style.display = "flex";
    image.src = imagePath;
}


function closeImage() {

    document.getElementById("imagePopup").style.display = "none";

}


// ================= CLOSE POPUPS WHEN CLICK OUTSIDE =================

window.addEventListener("click", function(event) {

    const aboutPopup =
        document.getElementById("aboutPopup");

    const achievementPopup =
        document.getElementById("achievementPopup");

    const imagePopup =
        document.getElementById("imagePopup");


    if (event.target === aboutPopup) {
        closeAbout();
    }


    if (event.target === achievementPopup) {
        closeAchievement();
    }


    if (event.target === imagePopup) {
        closeImage();
    }

});


// ================= ESC KEY CLOSE =================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeAbout();
        closeAchievement();
        closeImage();

    }

});


// ================= NAVBAR ACTIVE LINK =================

const sections = document.querySelectorAll(
    "#home, #about, #skills, #projects, #education, #certificates, #contact"
);

const navLinks = document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", function() {

    let current = "home";


    sections.forEach(function(section) {

        const rect =
            section.getBoundingClientRect();


        if (
            rect.top <= 150 &&
            rect.bottom >= 150
        ) {

            current = section.id;

        }

    });


    navLinks.forEach(function(link) {

        link.classList.remove("active");


        if (
            link.getAttribute("href")
            === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


// ================= FADE ANIMATION =================

const hiddenElements =
    document.querySelectorAll(".hidden");


const hiddenObserver =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


hiddenElements.forEach(function(element) {

    hiddenObserver.observe(element);

});


// ================= TYPEWRITER EFFECT =================

const roles = [

    "Computer Science & Engineering Student",

    "Software Development Learner",

    "Web Technology Enthusiast",

    "Programming & Database Learner"

];


let roleIndex = 0;

let charIndex = 0;


const heading =
    document.querySelector(".typewriter");


function typeEffect() {

    if (!heading) return;


    if (
        charIndex <
        roles[roleIndex].length
    ) {

        heading.textContent +=
            roles[roleIndex].charAt(charIndex);

        charIndex++;


        setTimeout(
            typeEffect,
            70
        );

    }

    else {

        setTimeout(
            eraseEffect,
            1500
        );

    }

}


function eraseEffect() {

    if (charIndex > 0) {

        heading.textContent =
            roles[roleIndex].substring(
                0,
                charIndex - 1
            );

        charIndex--;


        setTimeout(
            eraseEffect,
            40
        );

    }

    else {

        roleIndex++;


        if (
            roleIndex >= roles.length
        ) {

            roleIndex = 0;

        }


        setTimeout(
            typeEffect,
            300
        );

    }

}


if (heading) {

    heading.textContent = "";

    typeEffect();

}


// ================= CONTACT FORM =================

function sendMessage(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value;


    const email =
        document.getElementById("email").value;


    const subject =
        document.getElementById("subject").value;


    const message =
        document.getElementById("message").value;


    const mailSubject =
        encodeURIComponent(subject);


    const mailBody =
        encodeURIComponent(

            "Name: " +
            name +

            "\nEmail: " +
            email +

            "\n\nMessage:\n" +

            message

        );


    window.location.href =

        "mailto:t6872964@gmail.com" +

        "?subject=" +

        mailSubject +

        "&body=" +

        mailBody;

}