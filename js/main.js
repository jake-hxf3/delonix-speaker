(() => {
console.log("JS file connected");

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// Burger Menu
const burgerBtn = document.querySelector("#burger-btn");
let burgerExpanded = false;

//X-Ray View
const xRaySlider = document.querySelector("#x-ray-slider");

// Model Viewer
const hotspots = document.querySelectorAll(".Hotspot");

//const anno = document.querySelector("#annotation");
let anno = null;

const temp = document.querySelector("template");
const annoCon = document.querySelector("#intro-ant");

// Hotspot Annotations

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
function scrollToLink(id) {
    if(!document.querySelector(`#${id}`)) return;
    gsap.to(window, {
        duration: 1, 
        ease: "power3.out",
        scrollTo: {
            y: `#${id}`,
            offsetY: 100
        }
    });
}

// flips the boolean attribute and turns anything else to false
function toggleAriaAttribute(target, aria) {
    let toggle = target.getAttribute(aria);
    if(!toggle) return false;
    if(toggle.toLowerCase() === "false") toggle = true;
    else toggle = false;
    target.setAttribute(aria, toggle);
    return toggle;
}

function toggleMobileMenu() {
    burgerBtn.classList.toggle("clicked");
    toggleAriaAttribute(burgerBtn, "aria-expanded");
}

let min = parseInt(xRaySlider.min);
if(isNaN(min)) min = 0;
let max = parseInt(xRaySlider.max);
if(isNaN(max)) max = 100;

function setXRayProgress() {
    let val = parseInt(xRaySlider.value);
    // Gradient Progress
    let xRayProgress = 100 - val;
    let rangeProgress = (val-min)/(max-min)*100;
    let hueShift = rangeProgress*-1.25;
    
    console.log(xRayProgress);
    document.body.style.setProperty('--x-ray-progress', `${xRayProgress}%`);
    document.body.style.setProperty('--x-ray-box-hue', `${hueShift}`);
    xRaySlider.style.setProperty('--range-progress', `${rangeProgress}%`);
}

setXRayProgress();



function addAnnotation() {
    anno = temp.content.cloneNode(true);
    annoCon.appendChild(anno);
    anno = annoCon.querySelector("#annotation");
    console.log(anno);
}

function positionAnnotation(e) {
    if(!anno) addAnnotation();

    let spot = e.currentTarget;
    let index = spot.index;
    
    anno.querySelector(".title").textContent = delonixInfo[index].title;
    anno.querySelector(".desc").textContent = delonixInfo[index].desc;
    anno.querySelector("img").src = `images/${delonixInfo[index].img}`;

    anno.classList.remove("hide");

    // scroll to the annotation
    scrollToLink(anno.id);    

    spot.ariaPressed = true;
}

// disappears when hotspot not focused anymore
function hideAnnotation(e) {
    let spot = e.currentTarget;
    anno.classList.add("hide");
    spot.ariaPressed = false;
}


hotspots.forEach((spot, index) => {
    spot.addEventListener("click", positionAnnotation);
    spot.addEventListener("focusout", hideAnnotation);
    spot.index = index;
})


burgerBtn.addEventListener("click", toggleMobileMenu);
xRaySlider.addEventListener("input", setXRayProgress);
})();


// GreenSock Animations
(() => {
    // Canvas
    const canvas = document.querySelector("#explode-view");
    const ctx = canvas.getContext("2d");

    const modelViewer = document.querySelector("model-viewer");

    const frameCount = 374;
    let images = []; // store images of the exploded animation frames and their sources

    const frames = {
        z: 0,
        x: 0,
        y: 0,
        w: 1280,
        h: 720,
    }; // store the current frame to be altered by the greensock plugin and then rendered

    const hotspots = document.querySelectorAll(".Hotspot");


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
            scrub: 2,
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


    // Other Animations
    

    gsap.from(modelViewer, {
        duration: 0.5,
        scale: 0,
        y: "5vh",
        ease: "power1.out",
        scrollTrigger: {
            trigger: "#rebirth",
            start: "50% bottom",
            end: "top top",
            toggleActions: "play none none none",
        },        
    })

    let hsRotate = gsap.timeline({
        paused: true,
    });

    hsRotate.to(hotspots, {
        rotation: 360,
        duration: 2,
        ease: "power1.out",
    })

    //hotspots.addEventListener("click", hotspotAnim);

    window.addEventListener("resize", () =>  {
        resizeCanvas();
        render();
    });
})();
