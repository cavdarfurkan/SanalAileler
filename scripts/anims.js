document.addEventListener("scroll", (event) => {
    // Navbar Color Anim
    const nav_el = document.querySelector("#navbar");
    const cover_el = document.querySelector("#cover");

    nav_el.classList.toggle("scrolled", document.documentElement.scrollTop > cover_el.offsetHeight);

    // Navbar Active Item Highlight
    const sections = document.querySelectorAll("section[id]");
    let scrollY = window.pageYOffset;

    sections.forEach(element => {
        const contentHeight = element.offsetHeight;
        const contentTop = element.offsetTop - 50;
        sectionId = element.getAttribute("id");

        if (scrollY > contentTop && scrollY <= contentTop + contentHeight) {
            document.querySelector(".nav a[href*=" + sectionId + "]").classList.add("active");
        }
        else {
            document.querySelector(".nav a[href*=" + sectionId + "]").classList.remove("active");
        }
    });
});

// Cards Animation
const animateCSS = (node, animation, prefix = 'animate__') => {
    new Promise((res, rej) => {
        const animationName = `${prefix}${animation}`;

        node.classList.add(`${prefix}animated`, animationName);

        function handleAnimationEnd(event) {
            event.stopPropagation();
            // node.classList.remove(`${prefix}animated`, animationName);
            res('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });
};

// IntersectionObserver and Call animateCSS()
let observer = new IntersectionObserver(function (nodes, o) {
    nodes.forEach(node => {
        if (node.isIntersecting === true) {
            node.target.style.visibility = "visible";

            if (node.target.classList.contains('card')) {
                animateCSS(node.target, 'fadeInUp');
                o.unobserve(node.target);
            }
            else if (node.target.classList.contains('anim-l')) {
                animateCSS(node.target, 'fadeInLeft');
                o.unobserve(node.target);
            }
            else if (node.target.classList.contains('anim-r')) {
                animateCSS(node.target, 'fadeInRight');
                o.unobserve(node.target);
            }
            else if (node.target.classList.contains('title')) {
                animateCSS(node.target, 'fadeInDown');
                o.unobserve(node.target);
            }
        }
    });
}, { threshold: [0.5] });

const cards = document.querySelectorAll('#konular .card'); // Get all cards
cards.forEach(card => {
    card.style.visibility = "hidden";
    observer.observe(card);
});

const hakkimizda = document.querySelectorAll('#hakkimizda .anim');
hakkimizda.forEach(hakkikimizda_el => {
    hakkikimizda_el.style.visibility = "hidden";
    observer.observe(hakkikimizda_el);
});

const titles = document.querySelectorAll('.title');
titles.forEach(title => {
    title.style.visibility = "hidden";
    observer.observe(title);
});