function initialCountdown() {
    if (index < texts.length) {
        document.getElementById("textDisplay").textContent = texts[index];
        index++;
        setTimeout(initialCountdown, 1000);
    } else {
        countdownOver();
    }
}

function countdownOver(){
    document.querySelector(".countdown-container").style.display = "none";
    beginWish();
}

function beginWish(){
    runConfetti();
    
}

function runConfetti() {
    const duration = 5000; // Confetti lasts for 5 seconds
    const interval = setInterval(() => {
        confetti({
            particleCount: 15,
            spread: 80,
            origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
    }, 50); // Fire confetti every 200ms

    setTimeout(() => {
        clearInterval(interval);
        console.log("H");
    }, duration); // Stop confetti after 5 seconds
}

function initialise(){
    texts = ["Getting the cake", "Lighting up the candles", "Here we go!!"];
    index = 0;
}
function begin(){
    setTimeout(initialCountdown, 1000);
    initialise();
}
var index, texts;

window.addEventListener("load", begin);