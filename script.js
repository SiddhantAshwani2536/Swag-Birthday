function goToScene(nextScene){

    const current =
    document.querySelector(".scene.active");

    const next =
    document.getElementById(
        "scene" + nextScene
    );

    const overlay =
    document.getElementById(
        "transition-overlay"
    );

    overlay.classList.add("animate");

    setTimeout(()=>{

        current.classList.remove("active");
        next.classList.add("active");

    },500);

    setTimeout(()=>{

        overlay.classList.remove("animate");

    },1000);

}

const quizQuestions = [
    {
        question: "Who is your favourite sibling?",
        options: { a: "Siddhant", b: "Myself", c: "The dog", d: "No one" },
        correct: "a"
    },
    {
        question: "Who is always there for you?",
        options: { a: "Strangers", b: "Your family", c: "Social media", d: "Your phone" },
        correct: "b"
    },
    {
        question: "Who makes you laugh the most?",
        options: { a: "Serious people", b: "The mirror", c: "Siddhant", d: "Movies" },
        correct: "c"
    },
    {
        question: "Which is your superpower?",
        options: { a: "Flying", b: "Your spirit", c: "Money", d: "Fame" },
        correct: "b"
    },
    {
        question: "What drives you forward?",
        options: { a: "Fear", b: "Dreams", c: "Others' opinions", d: "Nothing" },
        correct: "b"
    },
    {
        question: "Who do you trust the most?",
        options: { a: "Strangers", b: "Your family", c: "Nobody", d: "Social media" },
        correct: "b"
    },
    {
        question: "Your biggest quality is?",
        options: { a: "Laziness", b: "Your strength", c: "Your looks", d: "Your luck" },
        correct: "b"
    },
    {
        question: "What makes home special?",
        options: { a: "The building", b: "The location", c: "The people", d: "The furniture" },
        correct: "c"
    },
    {
        question: "Your best moment is?",
        options: { a: "When alone", b: "When with family", c: "When famous", d: "When sleeping" },
        correct: "b"
    },
    {
        question: "Life lesson you learned?",
        options: { a: "Money is everything", b: "Love matters most", c: "Trust no one", d: "Nothing matters" },
        correct: "b"
    }
];

let currentQuestionIndex = 0;

function quizAnswer(selectedOption){

    const result = document.getElementById("quiz-result");
    const correct = quizQuestions[currentQuestionIndex].correct;

    if(selectedOption === correct){
        if(currentQuestionIndex < quizQuestions.length - 1){
            result.innerHTML =
            `
            <div class="quiz-feedback">
                🎉 CORRECT!<br>
                <span class="loading-dots">Loading next question</span>
            </div>
            `;

            disableQuizButtons();

            setTimeout(() => {
                currentQuestionIndex++;
                updateProgressBar();
                loadQuizQuestion();
                enableQuizButtons();
            }, 1200);
        } else {
            result.innerHTML =
            `
            <div class="quiz-completion">
                🎉 CONGRATULATIONS!<br>
                <span>You've won the Crorepati! 💕</span>
                <br><br>
                <span class="loading-dots">Preparing your prize</span>
            </div>
            `;

            disableQuizButtons();

            setTimeout(() => {
                currentQuestionIndex = 0;
                goToScene(4);
            }, 3000);
        }
    } else {
        result.innerHTML =
        `
        <div class="quiz-feedback" style="color:#ff6b6b;">
            ❌ Oops! Better luck next time.<br>
            <span class="loading-dots">Loading next question</span>
        </div>
        `;

        disableQuizButtons();

        setTimeout(() => {
            if(currentQuestionIndex < quizQuestions.length - 1){
                currentQuestionIndex++;
                updateProgressBar();
                loadQuizQuestion();
                enableQuizButtons();
            } else {
                result.innerHTML = `<div class="quiz-completion">But you made it here! 💕</div>`;
                setTimeout(() => {
                    currentQuestionIndex = 0;
                    goToScene(4);
                }, 2000);
            }
        }, 1200);
    }
}

function updateProgressBar(){
    const fillPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    const progressFill = document.getElementById("quiz-progress-fill");
    const progressText = document.getElementById("quiz-progress-text");
    
    progressFill.style.width = fillPercentage + "%";
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
}

function loadQuizQuestion(){
    const questionElement = document.getElementById("quiz-question");
    const quizContent = document.querySelector(".quiz-content");
    const currentQ = quizQuestions[currentQuestionIndex];
    
    questionElement.classList.remove("quiz-question-animated");
    quizContent.style.opacity = "0";
    quizContent.style.transform = "translateY(20px)";
    
    setTimeout(() => {
        questionElement.innerText = "Question: " + currentQ.question;
        
        // Update option buttons
        document.getElementById("option-a").innerText = currentQ.options.a;
        document.getElementById("option-b").innerText = currentQ.options.b;
        document.getElementById("option-c").innerText = currentQ.options.c;
        document.getElementById("option-d").innerText = currentQ.options.d;
        
        questionElement.classList.add("quiz-question-animated");
        quizContent.style.animation = "none";
        setTimeout(() => {
            quizContent.style.animation = "slideInUp .6s ease";
            quizContent.style.opacity = "1";
            quizContent.style.transform = "translateY(0)";
        }, 10);
    }, 200);
    
    const result = document.getElementById("quiz-result");
    result.innerHTML = '';
}

function disableQuizButtons(){
    const buttons = document.querySelectorAll(".quiz-btn");
    buttons.forEach(btn => btn.disabled = true);
}

function enableQuizButtons(){
    const buttons = document.querySelectorAll(".quiz-btn");
    buttons.forEach(btn => btn.disabled = false);
}

/* =====================================
   PUPPY VILLAGE PERSONALITY QUIZ
===================================== */

const DOG_BREEDS = {

golden:{
name:"Golden Retriever",
title:"Kind & Warm",
image:"https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
description:"You radiate warmth, kindness and emotional intelligence.",
why:"You naturally care for people and make them feel safe, valued and understood."
},

labrador:{
name:"Labrador",
title:"Friendly & Social",
image:"https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800",
description:"You bring positive energy wherever you go.",
why:"Your personality shines brightest when surrounded by people you love."
},

german:{
name:"German Shepherd",
title:"Protective & Reliable",
image:"https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800",
description:"Strong, dependable and trustworthy.",
why:"People know they can count on you during difficult moments."
},

collie:{
name:"Border Collie",
title:"Intelligent & Curious",
image:"https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800",
description:"You love learning and exploring ideas.",
why:"Your choices reveal curiosity and a desire to grow."
},

husky:{
name:"Siberian Husky",
title:"Adventurous & Independent",
image:"https://placedog.net/500?id=208",
description:"Freedom and exploration excite you.",
why:"You embrace challenges and enjoy discovering new experiences."
},

beagle:{
name:"Beagle",
title:"Cheerful & Optimistic",
image:"https://placedog.net/500?id=302",
description:"Your positivity brightens every room.",
why:"You naturally focus on joy and happiness."
},

poodle:{
name:"Poodle",
title:"Creative & Elegant",
image:"https://placedog.net/500?id=401",
description:"Creative, expressive and thoughtful.",
why:"You appreciate beauty, originality and self-expression."
},

shiba:{
name:"Shiba Inu",
title:"Confident & Self-Reliant",
image:"https://placedog.net/500?id=501",
description:"Independent and confident.",
why:"You trust yourself and enjoy forging your own path."
},

corgi:{
name:"Corgi",
title:"Fun & Playful",
image:"https://placedog.net/500?id=601",
description:"Playful, energetic and lovable.",
why:"You bring smiles and laughter wherever you go."
},

saint:{
name:"Saint Bernard",
title:"Caring & Supportive",
image:"https://placedog.net/500?id=701",
description:"Deeply caring and compassionate.",
why:"You often place the needs of loved ones before your own."
},

aussie:{
name:"Australian Shepherd",
title:"Hardworking & Energetic",
image:"https://placedog.net/500?id=801",
description:"Driven and goal-oriented.",
why:"You enjoy challenges and achieving meaningful goals."
},

samoyed:{
name:"Samoyed",
title:"Positive & Uplifting",
image:"https://placedog.net/500?id=901",
description:"A source of encouragement and joy.",
why:"You inspire optimism in others."
}
};

let puppyQuestionIndex = 0;

let breedScores = {};

Object.keys(DOG_BREEDS)
.forEach(key => breedScores[key] = 0);

const puppyQuestions = [

{
question:"How do your friends describe you?",
answers:[
{text:"Caring and kind",breed:"golden"},
{text:"Funny and energetic",breed:"corgi"},
{text:"Smart and thoughtful",breed:"collie"},
{text:"Strong and dependable",breed:"german"}
]
},

{
question:"Your ideal weekend is:",
answers:[
{text:"Time with loved ones",breed:"golden"},
{text:"Exploring somewhere new",breed:"husky"},
{text:"Learning something exciting",breed:"collie"},
{text:"Relaxing and recharging",breed:"samoyed"}
]
},

{
question:"When someone needs help you usually:",
answers:[
{text:"Comfort them emotionally",breed:"saint"},
{text:"Take action immediately",breed:"german"},
{text:"Offer practical advice",breed:"collie"},
{text:"Stay beside them",breed:"golden"}
]
},

{
question:"Which quality matters most?",
answers:[
{text:"Loyalty",breed:"golden"},
{text:"Freedom",breed:"husky"},
{text:"Growth",breed:"aussie"},
{text:"Joy",breed:"beagle"}
]
},

{
question:"If you had a superpower?",
answers:[
{text:"Healing",breed:"saint"},
{text:"Flying",breed:"husky"},
{text:"Super intelligence",breed:"collie"},
{text:"Super strength",breed:"german"}
]
},

{
question:"What motivates you most?",
answers:[
{text:"Family",breed:"golden"},
{text:"Adventure",breed:"husky"},
{text:"Achievement",breed:"aussie"},
{text:"Happiness",breed:"beagle"}
]
},

{
question:"How do you approach challenges?",
answers:[
{text:"Stay calm",breed:"samoyed"},
{text:"Dive right in",breed:"husky"},
{text:"Analyze everything",breed:"collie"},
{text:"Never give up",breed:"aussie"}
]
},

{
question:"Which environment do you prefer?",
answers:[
{text:"Cozy home",breed:"golden"},
{text:"Mountains and nature",breed:"husky"},
{text:"Creative workspace",breed:"poodle"},
{text:"Busy gatherings",breed:"labrador"}
]
},

{
question:"Pick a life motto:",
answers:[
{text:"Be kind",breed:"golden"},
{text:"Live boldly",breed:"shiba"},
{text:"Keep learning",breed:"collie"},
{text:"Never give up",breed:"aussie"}
]
},

{
question:"How do you want people to remember you?",
answers:[
{text:"Loving",breed:"golden"},
{text:"Inspiring",breed:"samoyed"},
{text:"Brilliant",breed:"collie"},
{text:"Reliable",breed:"german"}
]
}

];

function initializePuppyQuiz(){

loadPuppyQuestion();

}

function loadPuppyQuestion(){

const q = puppyQuestions[puppyQuestionIndex];

document.getElementById(
"puppyQuestion"
).innerText = q.question;

document.getElementById(
"puppyProgressText"
).innerText =
`Question ${puppyQuestionIndex+1} of ${puppyQuestions.length}`;

document.getElementById(
"puppyProgressFill"
).style.width =
`${((puppyQuestionIndex+1)/puppyQuestions.length)*100}%`;

const options =
document.getElementById(
"puppyOptions"
);

options.innerHTML = "";

q.answers.forEach(answer=>{

const btn =
document.createElement("button");

btn.className =
"puppy-option";

btn.innerText =
answer.text;

btn.onclick =
()=>selectPuppyAnswer(answer);

options.appendChild(btn);

});

}

function selectPuppyAnswer(answer){

breedScores[
answer.breed
] += 1;

puppyQuestionIndex++;

if(
puppyQuestionIndex <
puppyQuestions.length
){
loadPuppyQuestion();
}
else{
showPuppyResult();
}

}

function showPuppyResult(){

const winner =
Object.keys(breedScores)
.reduce((a,b)=>
breedScores[a] >
breedScores[b]
? a : b
);

const dog =
DOG_BREEDS[winner];

document
.getElementById(
"puppyQuizCard"
)
.style.display =
"none";

const result =
document.getElementById(
"puppyResult"
);

result.classList
.remove("hidden");

result.innerHTML = `

<img
class="result-dog-image"
src="${dog.image}"
>

<h2 class="result-breed">
${dog.name}
</h2>

<div class="result-title">
${dog.title}
</div>

<p class="result-description">
${dog.description}
</p>

<div class="why-match">

<h3>
Why This Matches You
</h3>

<p>
${dog.why}
</p>

</div>

<button
class="take-again-btn"
onclick="restartPuppyQuiz()">

Take Quiz Again

</button>

<br>

<button
onclick="goToScene(5)">

Continue Journey →

</button>

`;

launchConfetti();

}

function restartPuppyQuiz(){

puppyQuestionIndex = 0;

Object.keys(breedScores)
.forEach(
key =>
breedScores[key] = 0
);

document
.getElementById(
"puppyQuizCard"
)
.style.display =
"block";

document
.getElementById(
"puppyResult"
)
.classList.add(
"hidden"
);

loadPuppyQuestion();

}

function launchConfetti(){

for(let i=0;i<120;i++){

const confetti =
document.createElement(
"div"
);

confetti.className =
"confetti";

confetti.style.left =
Math.random()*100+"vw";

confetti.style.background =
[
"#ff9ecf",
"#ffd66b",
"#ffffff",
"#d4b5ff"
][Math.floor(
Math.random()*4
)];

confetti.style.animationDuration =
(3 + Math.random()*2)
+ "s";

document.body
.appendChild(confetti);

setTimeout(()=>{
confetti.remove();
},5000);

}

}

function startPuppyQuiz(){

    document.querySelector(
        ".puppy-preview-section"
    ).style.display = "none";

    document.getElementById(
        "puppyQuizCard"
    ).style.display = "block";

    document.querySelector(
        ".puppy-progress-container"
    ).style.display = "block";

    initializePuppyQuiz();
}

function openLetter(name){
    alert("Placeholder message from " + name + ". Replace later with real message.");
}

// Initialize first quiz question
function initializeQuiz(){
    const currentQ = quizQuestions[0];
    document.getElementById("quiz-question").innerText = "Question: " + currentQ.question;
    document.getElementById("option-a").innerText = currentQ.options.a;
    document.getElementById("option-b").innerText = currentQ.options.b;
    document.getElementById("option-c").innerText = currentQ.options.c;
    document.getElementById("option-d").innerText = currentQ.options.d;
    updateProgressBar();
}

function initializeAll(){
    initializeQuiz();
    initializePuppyQuiz();
}

// Initialize when DOM is ready
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}
/* =====================================
   DANCE OF A THOUSAND MOMENTS
===================================== */

const danceVideos = {
    1: "assets/videos/dance1.mp4",
    2: "assets/videos/dance2.mp4",
    3: "assets/videos/dance3.mp4",
    4: "assets/videos/dance4.mp4"
};

function openDanceVideo(videoNumber){

    const popup =
    document.getElementById(
        "danceVideoPopup"
    );

    const source =
    document.getElementById(
        "danceVideoSource"
    );

    const player =
    document.getElementById(
        "danceVideoPlayer"
    );

    source.src =
    danceVideos[videoNumber];

    player.load();

    popup.classList.remove(
        "hidden"
    );

    player.play();

}

function closeDanceVideo(){

    const popup =
    document.getElementById(
        "danceVideoPopup"
    );

    const player =
    document.getElementById(
        "danceVideoPlayer"
    );

    player.pause();

    popup.classList.add(
        "hidden"
    );

}

/* Close when clicking outside */

document.addEventListener(
    "click",
    function(event){

        const popup =
        document.getElementById(
            "danceVideoPopup"
        );

        const card =
        document.querySelector(
            ".dance-video-card"
        );

        if(
            popup &&
            !popup.classList.contains("hidden") &&
            !card.contains(event.target) &&
            !event.target.closest(".butterfly")
        ){

            closeDanceVideo();

        }

    }
);

/* Escape key support */

document.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Escape"){

            closeDanceVideo();

        }

    }
);

/* =====================================
   OPTIONAL PHOTO LIGHTBOX
===================================== */

function initializeDanceGallery(){

    const photos =
    document.querySelectorAll(
        ".dance-photo img"
    );

    photos.forEach(photo=>{

        photo.addEventListener(
            "click",
            function(){

                const overlay =
                document.createElement(
                    "div"
                );

                overlay.className =
                "dance-lightbox";

                overlay.innerHTML = `
                    <div class="dance-lightbox-content">
                        <img src="${this.src}">
                    </div>
                `;

                document.body.appendChild(
                    overlay
                );

                overlay.addEventListener(
                    "click",
                    ()=>{
                        overlay.remove();
                    }
                );

            }
        );

    });

}

/* Run on page load */

document.addEventListener(
    "DOMContentLoaded",
    initializeDanceGallery
);

/* =====================================
   DREAM BRIDGE
===================================== */

const bridgeQualities = [

{
letter:"S",
title:"Strong",
description:
"You face every challenge with courage, resilience and grace."
},

{
letter:"W",
title:"Wise",
description:
"Your thoughtful decisions and understanding guide those around you."
},

{
letter:"A",
title:"Ambitious",
description:
"You dream big and work hard to turn dreams into reality."
},

{
letter:"G",
title:"Graceful",
description:
"You carry yourself with elegance, confidence and kindness."
},

{
letter:"A",
title:"Affectionate",
description:
"You make people feel loved, valued and deeply cared for."
},

{
letter:"T",
title:"Talented",
description:
"Your gifts, creativity and dedication inspire everyone around you."
},

{
letter:"A",
title:"Amazing",
description:
"You are uniquely wonderful and leave a lasting impact wherever you go."
}

];

let currentBridgeStep = 0;

let bridgeBusy = false;

/* =====================================
   INITIALIZE
===================================== */

function initializeDreamBridge(){

    currentBridgeStep = 0;

    bridgeBusy = false;

    const girl =
    document.getElementById(
        "bridgeGirl"
    );

    const firstPebble =
    document.getElementById(
        "pebble0"
    );

    if(girl && firstPebble){

        placeGirlOnPebble(
            firstPebble
        );
    }

}

function placeGirlOnPebble(pebble){

    const girl =
    document.getElementById(
        "bridgeGirl"
    );

    if(!girl) return;

    const left =
    pebble.offsetLeft + 5;

    const top =
    pebble.offsetTop - 80;

    girl.style.left =
    left + "px";

    girl.style.top =
    top + "px";
}

/* =====================================
   CLICK PEBBLE
===================================== */

function activatePebble(index){

    if(bridgeBusy) return;

    if(index !== currentBridgeStep)
        return;

    bridgeBusy = true;

    const data =
    bridgeQualities[index];

    const card =
    document.getElementById(
        "qualityCard"
    );

    document.getElementById(
        "qualityLetter"
    ).innerText =
    data.letter;

    document.getElementById(
        "qualityTitle"
    ).innerText =
    data.title;

    document.getElementById(
        "qualityDescription"
    ).innerText =
    data.description;

    card.classList.remove(
        "hidden"
    );

    createRippleEffect(index);

    setTimeout(()=>{

        card.classList.add(
            "hidden"
        );

        moveToNextPebble();

    },5000);

}

/* =====================================
   MOVE GIRL
===================================== */

function moveToNextPebble(){

    const oldPebble =
    document.getElementById(
        "pebble" + currentBridgeStep
    );

    if(oldPebble){

        oldPebble.classList.remove(
            "active"
        );
    }

    currentBridgeStep++;

    if(
        currentBridgeStep >=
        bridgeQualities.length
    ){

        showDreamFinal();

        bridgeBusy = false;

        return;
    }

    const nextPebble =
    document.getElementById(
        "pebble" + currentBridgeStep
    );

    nextPebble.classList.add(
        "active"
    );

    hopGirlToPebble(
        nextPebble
    );

    setTimeout(()=>{

        bridgeBusy = false;

    },1000);

}

/* =====================================
   HOP ANIMATION
===================================== */

function hopGirlToPebble(pebble){

    const girl =
    document.getElementById(
        "bridgeGirl"
    );

    girl.animate(

        [
            {
                transform:
                "translateY(0)"
            },

            {
                transform:
                "translateY(-80px)"
            },

            {
                transform:
                "translateY(0)"
            }
        ],

        {
            duration:1000,
            easing:"ease-in-out"
        }

    );

    setTimeout(()=>{

        placeGirlOnPebble(
            pebble
        );

    },500);

}

/* =====================================
   WATER RIPPLE
===================================== */

function createRippleEffect(index){

    const pebble =
    document.getElementById(
        "pebble" + index
    );

    const ripple =
    document.createElement(
        "div"
    );

    ripple.className =
    "bridge-ripple";

    ripple.style.left =
    pebble.offsetLeft + "px";

    ripple.style.top =
    (pebble.offsetTop + 80)
    + "px";

    document
    .querySelector(
        ".bridge-container"
    )
    .appendChild(
        ripple
    );

    setTimeout(()=>{

        ripple.remove();

    },2000);

}

/* =====================================
   FINAL REVEAL
===================================== */

function showDreamFinal(){

    document
    .getElementById(
        "dreamFinalReveal"
    )
    .classList.remove(
        "hidden"
    );

    document
    .getElementById(
        "dreamContinueBtn"
    )
    .classList.remove(
        "hidden"
    );

    launchBridgeSparkles();

}

/* =====================================
   SPARKLES
===================================== */

function launchBridgeSparkles(){

    for(
        let i = 0;
        i < 70;
        i++
    ){

        const sparkle =
        document.createElement(
            "div"
        );

        sparkle.className =
        "bridge-sparkle";

        sparkle.innerHTML =
        "✨";

        sparkle.style.left =
        Math.random()*100 + "vw";

        sparkle.style.top =
        Math.random()*100 + "vh";

        document.body
        .appendChild(
            sparkle
        );

        setTimeout(()=>{

            sparkle.remove();

        },4000);

    }

}

/* =====================================
   AUTO INIT
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeDreamBridge
);
