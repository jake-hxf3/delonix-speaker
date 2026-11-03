(() => {
console.log("JS file connected");

const viewer = document.querySelector("model-viewer");
const viewerCon = document.querySelector("#viewer-con");
const hotspots = document.querySelectorAll(".Hotspot");

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

function positionAnnotation(elem) {
    console.log("fired");
    console.log(`${elem.offsetLeft}, ${elem.offsetTop}`);
}

hotspots.forEach((elem) => {
    elem.addEventListener("click", positionAnnotation);
})

})();