(() => {
console.log("JS file connected");

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// Burger Menu
const burgerBtn = document.querySelector("#burger-btn");
let burgerHidden = true;

// Model Viewer
const viewer = document.querySelector("model-viewer");
const viewerCon = document.querySelector("#viewer-con");
const hotspots = document.querySelectorAll(".Hotspot");

// Canvas
const canvas = document.querySelector("#explode-view");
const ctx = canvas.getContext("2d");

const frameCount = 374;
let images = []; // store images of the exploded animation frames and their sources

const frames = {
    frame: 0
}; // store the current frame to be altered by the greensock plugin and then rendered


// Hotspot Annotations
const temp = document.querySelector("#annotation-template");

const delonixInfo = [
    {
        title: "Power of the Phoenix Flames",
        desc: "Feel the soaring heat of the Delonix! Rising and unquenchable, yet surrounded by the bluest darkness. Forged, reformed, and embellised, you'll be careful to touch it.",
        img: "phoenix.svg"
    },
    {
        title: "Synchronized Controls",
        desc: "Like a phoenix loyal to its master, Delonix keeps a telepathic connection to your source device, mirroring its audio controls.",
        img: "telepathy.svg"
    },
    {
        title: "Raging Bass Boosters",
        desc: "Extremely powerful for its apparent size with high fidelity and power. Waves of flaming hot sounds. Tremble before it burns you.",
        img: "loud.svg"
    },
    {
        title: "Multi-port",
        desc: "The connection to the source of power to fuel the fire.",
        img: "beak.svg"
    },
];


// Canvas Animation
// populate the image array
canvas.width = 1920;
canvas.height = 1080;

for(let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/exploded/exploded_${(i + 1).toString().padStart(5, '0')}.webp`;
    images.push(img);
};

gsap.to(frames, {
    frame: frameCount - 1,
    ease: "none",
    snap: "frame",
    scrollTrigger: {
        trigger: "#explode-view",
        pin: true,
        start: "top top",
        markers: true,
        scrub: 1
    },
    onUpdate: render
});

function render() {
    console.log(frames.frame);
    ctx.drawImage(images[frames.frame], 0, 0);
}


// Functions
function toggleMobileMenu() {
    burgerBtn.classList.toggle("clicked");
    burgerHidden = !burgerHidden;
    burgerBtn.ariaExpanded = burgerHidden;
}


/*function positionAnnotation(elem) {
    console.log("fired");
    console.log(`${elem.offsetLeft}, ${elem.offsetTop}`);
}

hotspots.forEach((spot, index) => {
    spot.addEventListener("click", positionAnnotation);

    let anno = temp.content.cloneNode(true);
    anno.querySelector(".title").textContent = delonixInfo[index].title;
    anno.querySelector(".desc").textContent = delonixInfo[index].desc;
    anno.querySelector("img").src = `images/${delonixInfo[index].img}`;

    spot.appendChild(anno);
})*/

burgerBtn.addEventListener("click", toggleMobileMenu);

})();