function generateBeginPage(){
    const beginPage=document.createElement("div");
    beginPage.id="begin-page";

    const buttonContainer=document.createElement("div");
    buttonContainer.id="button-container";

    const beginBtn=document.createElement("button");
    beginBtn.id="begin-btn"
    beginBtn.textContent="What's in here";

    beginBtn.addEventListener("click", ()=>{
        beginPage.remove();
        body.appendChild(countdownContainer);
        initialCountdown();
    }, {once: true});

    buttonContainer.appendChild(beginBtn);
    beginPage.appendChild(buttonContainer);
    return beginPage;

}

function generateCountdownPage(){
    const countdownContainer=document.createElement("div");
    countdownContainer.id="countdown-container";

    const countdownText=document.createElement("div");
    countdownText.id="countdown-text";

    countdownContainer.appendChild(countdownText);
    return countdownContainer;
}

function typewriterEffect(text, callback) {
    let charIndex = 0;
    const textElement = document.querySelector("#countdown-text");
    textElement.textContent = ""; // Clear previous text

    function type() {
        if (charIndex < text.length) {
            textElement.textContent += text[charIndex];
            charIndex++;
            setTimeout(type, 50); // Speed of typing effect
        } else {
            setTimeout(callback, 500); // Wait before switching text
        }
    }
    type();
}

function initialCountdown() {
    if (countdownIdx< countdownText.length) {
        typewriterEffect(countdownText[countdownIdx], ()=>{
            countdownIdx++;
            initialCountdown();
        });
    } else {
        countdownOver();
    }
}

function countdownOver(){
    countdownContainer.remove();
    beginWish();
}

function generateWishingPage(){
    const wishingCotainer=document.createElement("div");
    wishingCotainer.id="wishing-container";

    const topWishingContainer=document.createElement("div");
    topWishingContainer.id="top-wishing-container";

    const recordImgContainer=document.createElement("div");
    recordImgContainer.id="record-img-container";

    recordImg=document.createElement("img");
    recordImg.id="record-img";
    recordImg.src="./imgs/record1.png";
    
    recordImgContainer.appendChild(recordImg);
    topWishingContainer.appendChild(recordImgContainer);
    
    
    const bdWishContainer=document.createElement("div");
    bdWishContainer.id="bd-wish-container";

    topWishingContainer.appendChild(bdWishContainer);

    const cakeContainer=document.createElement("div");
    cakeContainer.id="cake-container"; 
    
    const cakeImg=document.createElement("img");
    cakeImg.id="cake-img"
    cakeImg.src="./imgs/cake.svg";
    
    cakeContainer.appendChild(cakeImg);
    

    const polaroidContainer1=document.createElement("figure");
    polaroidContainer1.classList.add("polaroid");
    polaroidContainer1.id="polaroid-1";
    
    const polaroidImg1=document.createElement("img");
    polaroidImg1.classList.add("polaroid-img");
    polaroidImg1.src="./imgs/i2.jpg"
    
    polaroidContainer1.appendChild(polaroidImg1);
    
    const polaroidContainer2=document.createElement("figure");
    polaroidContainer2.classList.add("polaroid");
    polaroidContainer2.id="polaroid-2";

    const polaroidImg2=document.createElement("img");
    polaroidImg2.classList.add("polaroid-img");
    polaroidImg2.src="./imgs/i3.jpg"

    polaroidContainer2.appendChild(polaroidImg2);

    const polaroidContainer3=document.createElement("figure");
    polaroidContainer3.classList.add("polaroid");
    polaroidContainer3.id="polaroid-3";

    const polaroidImg3=document.createElement("img");
    polaroidImg3.classList.add("polaroid-img");
    polaroidImg3.src="./imgs/i1.jpg"

    polaroidContainer3.appendChild(polaroidImg3);
    


    const middleContainer=document.createElement("div");
    middleContainer.id="middle-container";


    middleContainer.appendChild(polaroidContainer1);
    // middleContainer.appendChild(cakeContainer);
    middleContainer.appendChild(polaroidContainer2);
    middleContainer.appendChild(polaroidContainer3);


    const bottomContainer=document.createElement("div");
    bottomContainer.id="bottom-container"
    bottomContainer.appendChild(cakeContainer);

    wishingCotainer.appendChild(topWishingContainer);
    wishingCotainer.appendChild(middleContainer);
    wishingCotainer.appendChild(bottomContainer);
    // wishingCotainer.appendChild(bdWishContainer);
    const dummy=document.createElement("div");
    dummy.id="dummy";
    // wishingCotainer.appendChild(dummy);
    return wishingCotainer;
}

function beginWish(){
    body.appendChild(wishingPage);

    fadeInElement(wishingPage);

    addListenersToWishingPage();
    addWishingPageAudio();
    runConfetti();
    setTimeout(typewriterEffectBDWish, 2000);
}

function fadeInElement(element) {
    element.style.opacity = "0";
    // element.style.visibility = "visible";
    element.style.transition = "opacity 3s ease-in-out";

    setTimeout(() => {
        element.style.opacity = "1";
    }, 50);
}

function addWishingPageAudio(){
    wishingPageAudio=new Audio("./audio/wishing-page-audio.mp3");
    // wishingPageAudio=new Audio("./audio/test.mp3");
    wishingPageAudio.play();
    recordInterval=setInterval(rotateRecordImg, imgRotationInterval);
    
    wishingPageAudio.addEventListener("ended", ()=>{
        recordImg.click();
    });
}

function addListenersToWishingPage(){
    recordImg.addEventListener("click",()=>{
        isPlaying=!isPlaying;
        if(isPlaying){
            recordInterval=setInterval(rotateRecordImg, imgRotationInterval);
            rotateRecordImg();
            wishingPageAudio.play();
        }else{
            clearInterval(recordInterval);
            wishingPageAudio.pause();
        }   
    });

    const cakeImg=document.querySelector("#cake-img");
    cakeImg.addEventListener("click",()=>{
        cakeImg.src="./imgs/blown-cake-2.svg";
    }, {once:true});
}

function typewriterEffectBDWish() {
    const textElement = document.querySelector("#bd-wish-container");
    textElement.textContent = "";
    let wordIndex = 0;

    function type() {
        if (wordIndex < bdWishText.length) {
            textElement.textContent += (wordIndex === 0 ? "" : " ") + bdWishText[wordIndex];
            wordIndex++;
            setTimeout(type, 500); // Delay between words
        }
    }
    type();
}


function rotateRecordImg(){
    imgAngle+=5;
    recordImg.style.transform=`rotate(${imgAngle}deg)`;
}

function runConfetti() {
    const interval = setInterval(() => {
        confetti({
            particleCount: 15,
            spread: 80,
            origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
    }, 50); // Fire confetti every 200ms
    
    setTimeout(() => {
        clearInterval(interval);
    }, confettiDuration); // Stop confetti after 5 seconds
}


function initialise(){
    countdownText = ["Getting the cake", "Lighting up the candles", "Here we go!!"];
    countdownIdx = 0;
    confettiDuration=5000;
    body=document.querySelector("body");
    isPlaying=true;
    imgAngle=0;
    imgRotationInterval=75;
    wishingPageAudio=new Audio();
    bdWishText=["Happy", "Birthday", "Gunjan"];
    bdWishIdx=0;

    // cakeSvg=

    beginPage=generateBeginPage();
    countdownContainer=generateCountdownPage();
    wishingPage=generateWishingPage();
    // body.appendChild(countdownContainer);
    // body.appendChild(wishingPage);
    body.appendChild(beginPage);
}

function begin(){
    initialise();
    // console.log(window.innerWidth);
    // setTimeout(initialCountdown, 1000);
    // beginWish();

}
var countdownIdx, countdownText, countdownContainer, confettiDuration, wishingPage, body, isPlaying, imgAngle, recordInterval, recordImg,
imgRotationInterval, wishingPageAudio, bdWishText, beginPage;

window.addEventListener("DOMContentLoaded", begin);