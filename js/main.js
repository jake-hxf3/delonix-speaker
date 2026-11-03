(() => {
console.log("JS file connected");

const viewer = document.querySelector("model-viewer");
const hotspots = document.querySelectorAll(".Hotspot");
const lb = document.querySelector("#lightbox");

const temp = document.querySelector("#annotation-template");

let spotElem = null;
let annoElem = null;

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


function lightbox() {
    console.log("lightbox triggered");
    if ((!annoElem) || (!spotElem)) return;
    if (window.innerWidth < 768) {
        lb.appendChild(annoElem);
        lb.classList.remove("hidden");
        annoElem.classList.add("col-span-full");
    } else {
        spotElem.appendChild(annoElem);
    }
}

function darkbox() {
 /*   if((annoElem) && (spotElem)) {
        lb.classList.add("hidden");
        spotElem.appendChild(annoElem);
    }  */
}

function positionAnnotation() {
    console.log("fired");

}

hotspots.forEach((spot, index) => {
    spot.addEventListener("mouseover", () => {
        spotElem = spot;
        annoElem = spot.querySelector(`#anno-${spot.slot}`);

        console.log(spotElem);
        console.log(annoElem);

        positionAnnotation();
        lightbox();
    });

    let anno = temp.content.cloneNode(true);

    anno.querySelector(".title").textContent = delonixInfo[index].title;
    anno.querySelector(".desc").textContent = delonixInfo[index].desc;
    anno.querySelector("img").src = `images/${delonixInfo[index].img}`;

    spot.appendChild(anno);
    spot.firstElementChild.id = `anno-${spot.slot}`;
})

/*lb.addEventListener("mouseover", darkbox);
lb.addEventListener("click", darkbox);*/

})();