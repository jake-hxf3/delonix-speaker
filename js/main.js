(() => {
console.log("JS file connected");

// Burger Menu
const burgerBtn = document.querySelector("#burger-btn");
let burgerHidden = true;

//X-Ray View
const xRaySlider = document.querySelector("#x-ray-slider");
let xRayProgress = 0;

// Model Viewer
const viewer = document.querySelector("model-viewer");
const viewerCon = document.querySelector("#viewer-con");
const hotspots = document.querySelectorAll(".Hotspot");

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


// Functions
function toggleMobileMenu() {
    burgerBtn.classList.toggle("clicked");
    burgerHidden = !burgerHidden;
    burgerBtn.ariaExpanded = burgerHidden;
}

function setXRayProgress() {
    xRayProgress = 100 - xRaySlider.value;
    document.body.style.setProperty('--x-ray-progress', `${xRayProgress}%`);
}

setXRayProgress();


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
xRaySlider.addEventListener("input", setXRayProgress);
})();


// GreenSock Animations
(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    // Canvas
    const canvas = document.querySelector("#explode-view");
    const canvasCon = document.querySelector("#canvas-con");
    const ctx = canvas.getContext("2d");

    const frameCount = 374;
    let images = []; // store images of the exploded animation frames and their sources

    const frames = {
        z: 0,
        x: 0,
        y: 0,
        w: 1280,
        h: 720,
    }; // store the current frame to be altered by the greensock plugin and then rendered

    // Canvas Animation
    // populate the image array

    function resizeCanvas() {
        canvas.width = Math.max(1280, window.innerWidth);
        canvas.height = Math.max(720, window.innerHeight);    
    }

    resizeCanvas();

    for(let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `images/exploded/exploded_${(i + 1).toString().padStart(5, '0')}.webp`;
        images.push(img);
    };


    gsap.to(frames, {
        z: frameCount - 1,
        ease: "none",
        snap: "z",
        scrollTrigger: {
            trigger: "#explode-view",
            pin: true,
            start: "top top",
            scrub: 1
        },
        onUpdate: render
    });

    function render() {
        frames.w = 1280;
        frames.h = 720;
        frames.x = 0.5*(window.innerWidth - frames.w);
        frames.y = 0.5*(window.innerHeight - frames.h);
        ctx.drawImage(images[frames.z], frames.x, frames.y, frames.w, frames.h);
    }

    window.addEventListener("resize", () =>  {
        resizeCanvas();
        render();
    });
})();
