/* ================================
   VEXA APOLOGI - ANIMATION JS
================================ */


/* ================================
   HAMBURGER MENU
================================ */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


// Buat garis hamburger
menuBtn.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
`;


// CSS khusus hamburger dibuat dari JS
const menuStyle = document.createElement("style");

menuStyle.textContent = `

.menu-btn {
    width: 42px;
    height: 42px;

    display: none;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 6px;

    cursor: pointer;

    transition: 0.4s;
}

.menu-btn span {
    width: 25px;
    height: 2px;

    background: white;

    border-radius: 10px;

    transition:
        transform 0.4s ease,
        opacity 0.3s ease,
        width 0.3s ease;
}


/* MENU TERBUKA */

.menu-btn.open span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.menu-btn.open span:nth-child(2) {
    opacity: 0;

    width: 0;
}

.menu-btn.open span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}


/* Animasi tombol */

.menu-btn:hover {
    transform: rotate(5deg) scale(1.08);
}


/* Tampilkan di mobile */

@media (max-width: 850px) {

    .menu-btn {
        display: flex;
    }

}

`;

document.head.appendChild(menuStyle);


// Buka / tutup menu

menuBtn.addEventListener("click", () => {

    menuBtn.classList.toggle("open");

    navMenu.classList.toggle("active");

});


// Tutup menu ketika link ditekan

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        menuBtn.classList.remove("open");

        navMenu.classList.remove("active");

    });

});


/* ================================
   SCROLL REVEAL
================================ */

const revealElements = document.querySelectorAll(
    ".section-title, .about-text, .stat, .service-card, .cta, .contact form"
);

const revealStyle = document.createElement("style");

revealStyle.textContent = `

.reveal {
    opacity: 0;

    transform:
        translateY(50px)
        scale(0.97);

    transition:
        opacity 0.8s ease,
        transform 0.8s ease;
}

.reveal.show {
    opacity: 1;

    transform:
        translateY(0)
        scale(1);
}

`;

document.head.appendChild(revealStyle);


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================================
   SERVICE CARD 3D EFFECT
================================ */

const cards = document.querySelectorAll(".service-card");


cards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const centerX = rect.width / 2;
        const centerY = rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -5;

        const rotateY =
            ((x - centerX) / centerX) * 5;


        card.style.transform =
            `perspective(700px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(700px) rotateX(0) rotateY(0) translateY(0)";

    });

});


/* ================================
   HERO CARD MOUSE EFFECT
================================ */

const heroCard =
    document.querySelector(".glass-card");


if (heroCard) {

    heroCard.addEventListener("mousemove", event => {

        const rect =
            heroCard.getBoundingClientRect();


        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const rotateY =
            ((x - rect.width / 2) / rect.width) * 20;

        const rotateX =
            ((y - rect.height / 2) / rect.height) * -20;


        heroCard.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.03)`;

    });


    heroCard.addEventListener("mouseleave", () => {

        heroCard.style.transform = "";

    });

}


/* ================================
   BUTTON RIPPLE
================================ */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function(event) {

        const ripple =
            document.createElement("span");

        const rect =
            this.getBoundingClientRect();


        const size =
            Math.max(rect.width, rect.height);


        ripple.style.width =
            ripple.style.height =
            `${size}px`;


        ripple.style.left =
            `${event.clientX - rect.left - size / 2}px`;


        ripple.style.top =
            `${event.clientY - rect.top - size / 2}px`;


        ripple.classList.add("ripple");


        this.appendChild(ripple);


        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


const rippleStyle =
    document.createElement("style");


rippleStyle.textContent = `

.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;

    border-radius: 50%;

    background:
        rgba(168, 85, 247, 0.3);

    transform: scale(0);

    animation:
        rippleAnimation 0.6s linear;

    pointer-events: none;
}

@keyframes rippleAnimation {

    to {
        transform: scale(2.5);
        opacity: 0;
    }

}

`;

document.head.appendChild(rippleStyle);


/* ================================
   PARALLAX HERO
================================ */

window.addEventListener("mousemove", event => {

    const hero = document.querySelector(".hero");

    if (!hero) return;


    const x =
        (event.clientX / window.innerWidth - 0.5) * 15;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 15;


    hero.style.backgroundPosition =
        `${50 + x}% ${50 + y}%`;

});


/* ================================
   CONTACT FORM
================================ */

const form =
    document.getElementById("contactForm");

const toast =
    document.getElementById("toast");


if (form) {

    form.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (!name || !email || !message) {

            alert("Silakan isi semua kolom.");

            return;

        }


        if (toast) {

            toast.classList.add("show");

        }


        form.reset();


        setTimeout(() => {

            if (toast) {

                toast.classList.remove("show");

            }

        }, 3000);

    });

}


/* ================================
   NAVBAR SCROLL EFFECT
================================ */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (!navbar) return;


    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(5,5,5,0.92)";

        navbar.style.boxShadow =
            "0 10px 40px rgba(0,0,0,0.25)";

    } else {

        navbar.style.background =
            "rgba(5,5,5,0.65)";

        navbar.style.boxShadow =
            "none";

    }

});


/* ================================
   TEXT TYPING EFFECT
================================ */

const heroText =
    document.querySelector(".hero h1 span");


if (heroText) {

    const originalText =
        heroText.textContent;

    heroText.textContent = "";


    let index = 0;


    function typing() {

        if (index < originalText.length) {

            heroText.textContent +=
                originalText.charAt(index);

            index++;

            setTimeout(typing, 100);

        }

    }


    setTimeout(typing, 700);

}


/* ================================
   RANDOM FLOATING EFFECT
================================ */

document.querySelectorAll(".stat").forEach(
    (item, index) => {

        item.style.transitionDelay =
            `${index * 100}ms`;

    }
);