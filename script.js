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
        question: "Who is the most systematic and organized son in law in our fam?",
        options: { a: "Ashwin", b: "Kashy", c: "Babu", d: "None of the above" },
        correct: "d"
    },
    {
        question: "Who is the best multitasker yet stays humble?",
        options: { a: "Nandini", b: "Uma", c: "Swagu", d: "None of the above" },
        correct: "d",
        wrongResponses: {
            a: "Good multitaskers but ain't humble.",
            b: "Good multitaskers but ain't humble.",
            c: "By selecting your own name u proved u ain't humble."
        }
    },
    {
        question: "Who is the best Male dancer in our fam?",
        options: { a: "Ashwin", b: "Gokul", c: "Babu", d: "Shekhar" },
        correct: "a"
    },
    {
        question: "Which one is swagu’s favourite clash royal emote?",
        options: { a: "Bowlie", b: "Ho ho hou", c: "Electro wizardy zap", d: "Higwadaa hog riderrr" },
        correct: "a"
    },
    {
        question: "Which is swagu’s favorite word?",
        options: { a: "Coco Jumbo", b: "Jine Mosto", c: "Yaari Dosti", d: "Main hoon" },
        correct: "c"
    },
    {
        question: "On which item has swagu spent a fortune?",
        options: { a: "Sotret", b: "Coffee", c: "Sarojni", d: "Dolls" },
        correct: "a"
    },
    {
        question: "What is swagu’s favorite with dosa/idli(all made by sumathi aunty)",
        options: { a: "Kothamalli", b: "Mala pudi", c: "Sambhar", d: "Coconut chutney" },
        correct: "a"
    },
    {
        question: "Which is swagu’s fav type of jine?",
        options: { a: "Coco jine", b: "Jumbo jine", c: "Jine mosto", d: "Kundi kule jine" },
        correct: "b"
    },
    {
        question: "Which is swagu’s favorite exercise?",
        options: { a: "Push ups", b: "Pull ups", c: "Splits", d: "Handstand" },
        correct: "b"
    },
    {
        question: "who is your favorite sibling?",
        options: { a: "Siddhu", b: "Ashwin", c: "Kashy", d: "Nandini" },
        correct: "a"
    }
];

let currentQuestionIndex = 0;
let quizScore = 0;

let sceneHistory = [1];
let historyIndex = 0;

function goBackScene(){
    if(historyIndex > 0){
        goToScene(sceneHistory[historyIndex - 1], true);
    }
}

function goForwardScene(){
    if(historyIndex < sceneHistory.length - 1){
        goToScene(sceneHistory[historyIndex + 1], true);
    }
}

function restartJourney(){
    resetSceneHistory();
    goToScene(1, true);
}

function resetSceneHistory(){
    sceneHistory = [1];
    historyIndex = 0;
    updateNavButtons();
}

function updateNavButtons(){
    const backBtn = document.getElementById("backNavBtn");
    const forwardBtn = document.getElementById("forwardNavBtn");
    const current = document.querySelector(".scene.active");
    const currentScene = current ? parseInt(current.id.replace("scene", ""), 10) : 1;

    if(currentScene === 10){
        backBtn.classList.add("hidden");
        forwardBtn.classList.add("hidden");
        return;
    }

    if(historyIndex > 0){
        backBtn.classList.remove("hidden");
    } else {
        backBtn.classList.add("hidden");
    }

    if(historyIndex < sceneHistory.length - 1){
        forwardBtn.classList.remove("hidden");
    } else {
        forwardBtn.classList.add("hidden");
    }
}

function goToScene(nextScene, fromHistory = false){
    const current = document.querySelector(".scene.active");
    const next = document.getElementById("scene" + nextScene);
    const overlay = document.getElementById("transition-overlay");

    if(!next || current === next) return;

    const currentScene = current ? parseInt(current.id.replace("scene", ""), 10) : 1;

    if(!fromHistory){
        if(historyIndex < sceneHistory.length - 1){
            sceneHistory = sceneHistory.slice(0, historyIndex + 1);
        }
        sceneHistory.push(nextScene);
        historyIndex = sceneHistory.length - 1;
    } else {
        const targetIndex = sceneHistory.indexOf(nextScene);
        if(targetIndex >= 0){
            historyIndex = targetIndex;
        }
    }

    overlay.classList.add("animate");

    setTimeout(() => {
        if(current){
            current.classList.remove("active");
        }
        next.classList.add("active");
        next.scrollTop = 0;
        updateNavButtons();
    }, 500);

    setTimeout(() => {
        overlay.classList.remove("animate");
    }, 1000);
}

function updateSceneHistoryForCurrentLoad(){
    const current = document.querySelector(".scene.active");
    const currentScene = current ? parseInt(current.id.replace("scene", ""), 10) : 1;
    if(currentScene !== sceneHistory[historyIndex]){
        sceneHistory = [currentScene];
        historyIndex = 0;
    }
    updateNavButtons();
}

function quizAnswer(selectedOption){

    const result = document.getElementById("quiz-result");
    const correct = quizQuestions[currentQuestionIndex].correct;
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

    if(selectedOption === correct){
        quizScore++; // Increment score for correct answer

        result.innerHTML =
        `
            <div class="quiz-feedback">
                🎉 CORRECT!<br>
                <button class="quiz-next-btn" onclick="advanceFamilyQuiz()">
                    ${isLastQuestion ? "See Results" : "Next Question"} →
                </button>
            </div>
        `;
    } else {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const wrongResponse =
            currentQuestion.wrongResponses?.[selectedOption] ||
            "Oops! Better luck next time.";

        result.innerHTML =
        `
        <div class="quiz-feedback" style="color:#ff6b6b;">
            ❌ ${wrongResponse}<br>
            <button class="quiz-next-btn" onclick="advanceFamilyQuiz()">
                ${isLastQuestion ? "See Results" : "Next Question"} →
            </button>
        </div>
        `;
    }

    disableQuizButtons();
}

function advanceFamilyQuiz(){
    if(currentQuestionIndex >= quizQuestions.length - 1){
        showQuizResults();
        return;
    }

    currentQuestionIndex++;
    updateProgressBar();
    loadQuizQuestion();
    enableQuizButtons();
}

function showQuizResults(){
    const quizBox = document.querySelector(".quiz-box");
    const result = document.getElementById("quiz-result");
    
    // Hide the quiz box and show results
    quizBox.style.display = "none";
    
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    
    result.innerHTML = `
        <div class="quiz-results-screen">
            <h2>Quiz Complete! 🎉</h2>
            
            <div class="score-display">
                <div class="score-circle">
                    <span class="score-number">${quizScore}</span>
                    <span class="score-total">/${quizQuestions.length}</span>
                </div>
                <p class="score-percentage">${percentage}% Score</p>
            </div>
            
            <div class="score-message">
                ${getScoreMessage(percentage)}
            </div>
            
            <div class="quiz-results-buttons">
                <button class="quiz-results-btn retake-btn" onclick="restartQuizScene3()">
                    🔄 Take Quiz Again
                </button>
                <button class="quiz-results-btn continue-btn" onclick="continueFromQuiz()">
                    Continue Journey →
                </button>
            </div>
        </div>
    `;
}

function getScoreMessage(percentage){
    if(percentage === 100){
        return "<p>Perfect Score! You're a true family expert! 💯</p>";
    } else if(percentage >= 80){
        return "<p>Excellent! You know your family so well! 🌟</p>";
    } else if(percentage >= 60){
        return "<p>Good job! You know quite a bit about your family! 👍</p>";
    } else if(percentage >= 40){
        return "<p>Not bad! Time to learn more about your family! 📚</p>";
    } else {
        return "<p>Keep learning! Every family member is unique! ❤️</p>";
    }
}

function restartQuizScene3(){
    currentQuestionIndex = 0;
    quizScore = 0;
    
    const quizBox = document.querySelector(".quiz-box");
    const result = document.getElementById("quiz-result");
    
    quizBox.style.display = "block";
    result.innerHTML = '';
    
    updateProgressBar();
    loadQuizQuestion();
    enableQuizButtons();
}

function continueFromQuiz(){
    currentQuestionIndex = 0;
    quizScore = 0;
    goToScene(4);
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
        
        // Check if this is the audio question (question index 3)
        if(currentQuestionIndex === 3){
            setupAudioQuestion();
        } else {
            removeAudioListeners();
        }
        
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

let quizAudioManager = {
    currentAudio: null
};

function setupAudioQuestion(){
    // Audio sounds for clash royale question
    const audioSounds = {
        a: "assets/music/Clash Royale Bowler Sounds.mp3",
        b: "assets/music/Clash Royale old King Sounds.mp3",
        c: "assets/music/CLASH ROYALE ELECTRO WIZARD SOUNDS.mp3",
        d: "assets/music/Hog rider sound.mp3"
    };
    
    const buttons = document.querySelectorAll(".quiz-btn");
    buttons.forEach((btn, index) => {
        const optionKey = String.fromCharCode(97 + index); // 'a', 'b', 'c', 'd'
        const soundUrl = audioSounds[optionKey];
        
        // Update button styling
        btn.style.background = "linear-gradient(135deg, rgba(100,200,255,.9), rgba(100,150,255,.85))";
        btn.style.boxShadow = "0 8px 20px rgba(100,200,255,.25)";
        
        // Play sound on hover and stop any previous audio
        btn.audioListener = () => {
            // Stop any currently playing audio
            if(quizAudioManager.currentAudio){
                quizAudioManager.currentAudio.pause();
                quizAudioManager.currentAudio.currentTime = 0;
            }
            // Play new audio
            quizAudioManager.currentAudio = new Audio(soundUrl);
            quizAudioManager.currentAudio.play();
        };
        
        // Stop sound when mouse leaves button
        btn.audioLeaveListener = () => {
            if(quizAudioManager.currentAudio){
                quizAudioManager.currentAudio.pause();
                quizAudioManager.currentAudio.currentTime = 0;
                quizAudioManager.currentAudio = null;
            }
        };
        
        btn.addEventListener("mouseenter", btn.audioListener);
        btn.addEventListener("mouseleave", btn.audioLeaveListener);
    });
}

function removeAudioListeners(){
    // Stop any playing audio
    if(quizAudioManager.currentAudio){
        quizAudioManager.currentAudio.pause();
        quizAudioManager.currentAudio.currentTime = 0;
        quizAudioManager.currentAudio = null;
    }
    
    const buttons = document.querySelectorAll(".quiz-btn");
    buttons.forEach(btn => {
        if(btn.audioListener){
            btn.removeEventListener("mouseenter", btn.audioListener);
            btn.audioListener = null;
        }
        if(btn.audioLeaveListener){
            btn.removeEventListener("mouseleave", btn.audioLeaveListener);
            btn.audioLeaveListener = null;
        }
        // Reset button styling
        btn.style.background = "";
        btn.style.boxShadow = "";
    });
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
   MEMORY FOREST IMAGE POPUP
===================================== */

function initializeMemoryImagePopup(){
    const popup = document.getElementById("memoryImagePopup");
    const fullImage = document.getElementById("memoryImageFull");
    const memoryImages = document.querySelectorAll("#scene2 .card-back img");
    const memoryCards = document.querySelectorAll("#scene2 .leaf-card");

    if(!popup || !fullImage) return;

    memoryCards.forEach(card => {
        card.addEventListener("click", function(){
            this.classList.toggle("is-flipped");
        });
    });

    memoryImages.forEach(image => {
        image.addEventListener("click", function(event){
            event.stopPropagation();
            fullImage.src = this.currentSrc || this.src;
            fullImage.alt = this.alt;
            popup.classList.remove("hidden");
        });
    });

    popup.addEventListener("click", function(){
        popup.classList.add("hidden");
        fullImage.src = "";
        fullImage.alt = "";
    });

    document.addEventListener("keydown", function(event){
        if(event.key === "Escape" && !popup.classList.contains("hidden")){
            popup.click();
        }
    });
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
image:"https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
description:"Freedom and exploration excite you.",
why:"You embrace challenges and enjoy discovering new experiences."
},

beagle:{
name:"Beagle",
title:"Cheerful & Optimistic",
image:"https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
description:"Your positivity brightens every room.",
why:"You naturally focus on joy and happiness."
},

poodle:{
name:"Poodle",
title:"Creative & Elegant",
image:"https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
description:"Creative, expressive and thoughtful.",
why:"You appreciate beauty, originality and self-expression."
},

shiba:{
name:"Shiba Inu",
title:"Confident & Self-Reliant",
image:"https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
description:"Independent and confident.",
why:"You trust yourself and enjoy forging your own path."
},

corgi:{
name:"Corgi",
title:"Fun & Playful",
image:"https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
description:"Playful, energetic and lovable.",
why:"You bring smiles and laughter wherever you go."
},

saint:{
name:"Saint Bernard",
title:"Caring & Supportive",
image:"https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
description:"Deeply caring and compassionate.",
why:"You often place the needs of loved ones before your own."
},

aussie:{
name:"Australian Shepherd",
title:"Hardworking & Energetic",
image:"https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
description:"Driven and goal-oriented.",
why:"You enjoy challenges and achieving meaningful goals."
},

samoyed:{
name:"Samoyed",
title:"Positive & Uplifting",
image:"https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
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
/* =====================================
   LETTERS FROM HOME
===================================== */

let letterOpen = false;

const letterMessages = {

    "Amma":
    `Dear Swagu, 
    
    I am so incredibly proud of you. 
    
    While the world sees your awards and accomplishments, 
    
    I know the real story: the grit, late nights, and sheer determination it took to get here. 
    
    I have no doubt you'll achieve every dream you set your mind to, 
    
    because I've seen firsthand how you leave no stone unturned 💖.`,


    "Appa":
    `This is for my darling & adorable daughter. 
    
    When  you came in my life, this was the best thing that happened. 
    
    I have and will always  wish you the best in your life.
    
    I know that  you always are affectionate and caring. 
    
    The day you went to Manipal and now in US, I could feel the vacuum in our house 
    
    and in my mind that some part of my body is separated, but got used to it. 
    
    You have grown up as matured and responsible. I cherish that you should be with us, 
    
    so that I can always see and talk to you.
    
    You are closest to my heart and I know you also reciprocate the love, kindness and warmth towards me.
    
    You seldom show your expression, but I know your nature and sensitivity towards your family.
    
    You are gritty person and soft within. As you complete 32 years, I still see you as my adorable child 
    
    and the memories of your childhood are etched permanently in my mind.
    
    I wish you the best and happiest moments forever. ⭐`,



    "Sumathy Aunty":
    `Swagata, happy birthday ⭐! 
    
    You are a very good girl, a calm girl, a patient girl—there is no one raised like you. 
    
    I miss you a lot. You must stay well for many years—that is my blessing for you. 
    
    Thank you very much.`,



    "Siddhu":
    `Happy Birthday, dawg ❤️
    
    They say the bond between siblings is one of the longest relationships we'll ever have, 
    
    and I'm incredibly grateful that I get to share mine with the most amazing sister. 
    
    We've grown through every phase of life together, and with every year, our bond only gets stronger. 
    
    I'll always be there for you and will forever be your biggest cheerleader 😎.`,



    "Kashy":
    `Happy Birthday Swaggy ✨,
    
    This is the first birthday we are celebrating away. 
    
    While I am a bit upset about not being there, I am also grateful for the friends 
    
    that are going to be there with you to make it a memorable day. 
    
    I miss you a lot. I am very proud of you for how you conduct yourself in tough situations and 
    
    built up a strong work ethic, which is what will take you forward. 
    
    May this year bring all the goals you have to life, and make you very happy. 
    
    Keep scaling new heights and always do it with a smile. ✨`,



    "Bestie":
    `Happy Birthday lil gurl! 💕✨

    I honestly hope this year brings you everything you've been wishing for and so much more. 
    
    You're such a lovely person to be around, and I'm really grateful to know you. 
    
    Keep being your amazing self, keep smiling, and keep spreading the same warmth and 
    
    positivity that makes everyone love you. Have the best birthday ever—you deserve it! 🥹🎂


    Love you always 🫶`,


    "Uma Didi":
    `Happy Birthday! 💕✨

    The future belongs to those who believe in the beauty of their dreams, 
    
    and I see you living this quote every day. I greatly admire your determination, 
    
    hard work, and unwavering belief in yourself, which have helped you grow into an accomplished 
    
    and inspiring young woman. I am so proud of all that you have achieved, both personally and professionally, 
    
    and I know even greater things lie ahead. Wishing you a very Happy Birthday filled with happiness, success, 
    
    and endless opportunities to keep pursuing your dreams and making your mark on the world 🫶. `,



    "Bala Patti":
    `I am so proud of you. 😊 
    
    You have always been a calm, patient, and kind-hearted child, and I pray that life continues 
    
    to bless you with happiness and success. 🌸

    Live a long, beautiful life, and remember that wherever I am, I will always be watching over you. 🤍 
    
    My blessings and love will forever be with you. 🙏✨

    Take care, dear. ❤️🌷`

};



const senderEmojis = {

    "Amma":"❤️",
    "Appa":"⭐",
    "Sumathy Aunty":"🌸",
    "Siddhu":"😎",
    "Kashy":"🤝",
    "Bestie":"🫶",
    "Bala Patti":"💐",
    "Uma Didi":"🌷"

};



function openLetterPopup(event, name){

    event.stopPropagation();

    if(letterOpen) return;

    letterOpen = true;

    document.getElementById("letterFrom").innerText =
        `From ${name}`;

    document.getElementById("letterMessage").innerText =
        letterMessages[name];

    document.getElementById("senderEmoji").innerHTML =
        senderEmojis[name] || "💌";

    const popup =
        document.getElementById("letterPopup");

    popup.classList.remove("hidden");

    document.body.style.overflow = "hidden";

}



function closeLetter(){

    letterOpen = false;

    const popup =
        document.getElementById("letterPopup");

    popup.classList.add("hidden");

    document.body.style.overflow = "auto";

}



/* =====================================
   CLOSE LETTER WHEN CLICKING OUTSIDE
===================================== */

document.addEventListener("click", function(event){

    const popup =
        document.getElementById("letterPopup");

    const letterPaper =
        document.querySelector(".letter-paper");

    if(

        popup &&
        !popup.classList.contains("hidden") &&
        letterPaper &&
        !letterPaper.contains(event.target) &&
        !event.target.closest(".envelope")

    ){

        closeLetter();

    }

});

/* =====================================
   ESC KEY SUPPORT
===================================== */

document.addEventListener("keydown", function(e){

    if(
        e.key === "Escape" &&
        letterOpen
    ){

        closeLetter();

    }

});




/* =====================================
   VIDEO MESSAGES (SCENE 9)
===================================== */

let videoPlaying = false;

function playVideoMessage(event, personName, videoPath){
    // Prevent event from bubbling
    event.stopPropagation();
    
    // Check if a video is already playing
    if(videoPlaying) return;
    
    videoPlaying = true;
    
    // Set the video player content
    document.getElementById("videoPlayerTitle").innerText = `Message from ${personName}`;
    document.getElementById("videoSource").src = videoPath;
    
    // Show the popup
    const popup = document.getElementById("videoPlayerPopup");
    popup.classList.remove("hidden");
    
    // Reload the video element to apply the new source
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.load();
    videoPlayer.play();
}

function closeVideoMessage(){
    videoPlaying = false;
    
    const popup = document.getElementById("videoPlayerPopup");
    const videoPlayer = document.getElementById("videoPlayer");
    
    // Pause and stop the video
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    
    // Hide the popup
    popup.classList.add("hidden");
}

// Close video when clicking outside
document.addEventListener("click", function(event){
    const popup = document.getElementById("videoPlayerPopup");
    const playerCard = document.querySelector(".video-player-card");
    
    if(
        popup && 
        !popup.classList.contains("hidden") &&
        !playerCard.contains(event.target) &&
        !event.target.closest(".video-card")
    ){
        closeVideoMessage();
    }
});

// Close video when pressing Escape
document.addEventListener("keydown", function(event){
    if(event.key === "Escape"){
        const popup = document.getElementById("videoPlayerPopup");
        if(popup && !popup.classList.contains("hidden")){
            closeVideoMessage();
        }
    }
});


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
let bridgeCardOpen = false;

/* =====================================
   INITIALIZE
===================================== */

function initializeDreamBridge(){

    currentBridgeStep = 0;

    bridgeBusy = false;
    bridgeCardOpen = false;

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

function activatePebble(event, index){

    if(bridgeBusy) return;

    if(index !== currentBridgeStep)
        return;

    if(event && event.stopPropagation)
        event.stopPropagation();

    bridgeBusy = true;
    bridgeCardOpen = true;

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

}

function closeQualityCard(){
    const card = document.getElementById(
        "qualityCard"
    );

    if(!card || card.classList.contains("hidden"))
        return;

    card.classList.add("hidden");
    bridgeCardOpen = false;

    moveToNextPebble();
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

// Close the quality card when the user clicks anywhere on the screen
// after the card has opened.
document.addEventListener("click", function(event){
    const card = document.getElementById("qualityCard");
    if(bridgeCardOpen && card && !card.classList.contains("hidden")){
        closeQualityCard();
    }
});

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
/* =====================================
   HRITHIK ROSHAN FAN AWARD
===================================== */

let awardUnlocked = false;

function acceptHrithikAward(){

    if(awardUnlocked) return;

    awardUnlocked = true;

    const flash =
    document.getElementById(
        "cameraFlash"
    );

    const reveal =
    document.getElementById(
        "awardReveal"
    );

    const container =
    document.querySelector(
        "#scene7 .award-container"
    );

    /* Camera Flash */

    flash.classList.add(
        "active"
    );

    /* Sound effect (optional later) */

    setTimeout(()=>{

        flash.classList.remove(
            "active"
        );

    },800);

    /* Reveal Award */

    setTimeout(()=>{

        container.style.display =
        "none";

        reveal.classList.remove(
            "hidden"
        );

        launchAwardConfetti();

    },1000);

}

/* =====================================
   AWARD CONFETTI
===================================== */

function launchAwardConfetti(){

    const colors = [

        "#FFD700",
        "#FFB6D9",
        "#FFFFFF",
        "#FF8C42",
        "#FFE59F"

    ];

    for(let i=0;i<100;i++){

        const confetti =
        document.createElement(
            "div"
        );

        confetti.className =
        "award-confetti";

        confetti.style.left =
        Math.random()*100 + "vw";

        confetti.style.background =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];

        confetti.style.animationDuration =
        (3 + Math.random()*2)
        + "s";

        document.body.appendChild(
            confetti
        );

        setTimeout(()=>{

            confetti.remove();

        },5000);

    }

}

/* =====================================
   TROPHY SPARKLES
===================================== */

let trophySparkleInterval = null;
let sparkleTimeoutId = null;

function createTrophySparkles(){

    const activeScene = 
    document.querySelector(".scene.active");
    
    const currentSceneId = 
    activeScene ? activeScene.id : "scene1";

    // Clear any existing intervals and timeouts
    if(trophySparkleInterval){
        clearInterval(trophySparkleInterval);
        trophySparkleInterval = null;
    }

    if(sparkleTimeoutId){
        clearTimeout(sparkleTimeoutId);
        sparkleTimeoutId = null;
    }

    // On home page (scene1), keep sparkles forever
    if(currentSceneId === "scene1"){

        trophySparkleInterval = 
        setInterval(()=>{

            createSparkleElement("center");

        },500);

    }
    // On scene7 (award), show sparkles for 8 seconds only
    else if(currentSceneId === "scene7"){

        trophySparkleInterval = 
        setInterval(()=>{

            createSparkleElement("trophy");

        },500);

        // Stop creating sparkles after 8 seconds
        sparkleTimeoutId = 
        setTimeout(()=>{

            if(trophySparkleInterval){
                clearInterval(trophySparkleInterval);
                trophySparkleInterval = null;
            }

        },8000);

    }

}

function createSparkleElement(position){

    const sparkle =
    document.createElement("div");

    sparkle.className =
    "trophy-sparkle";

    sparkle.innerHTML = "✨";

    if(position === "trophy"){

        const trophy =
        document.querySelector(
            ".award-trophy"
        );

        if(!trophy) return;

        const rect =
        trophy.getBoundingClientRect();

        sparkle.style.left =
        (
            rect.left +
            Math.random()*rect.width
        ) + "px";

        sparkle.style.top =
        (
            rect.top +
            Math.random()*rect.height
        ) + "px";

    } else if(position === "center"){

        // Sparkles float around the center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        sparkle.style.left =
        (centerX + (Math.random()-0.5)*200) + "px";

        sparkle.style.top =
        (centerY + (Math.random()-0.5)*200) + "px";

    }

    document.body.appendChild(sparkle);

    setTimeout(()=>{

        sparkle.remove();

    },2000);

}

/* =====================================
   AUTO INIT
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    createTrophySparkles
);

// Reinitialize sparkles when scene changes
const originalGoToScene = goToScene;

goToScene = function(nextScene, fromHistory = false){

    originalGoToScene(nextScene, fromHistory);
    
    // Reinitialize trophy sparkles for the new scene
    setTimeout(()=>{
        createTrophySparkles();
    },500);

};
document.addEventListener("DOMContentLoaded", () => {
    loadQuizQuestion();
    updateProgressBar();
});
/* =====================================
   VIDEO MESSAGES
===================================== */

let videoPopupOpen = false;

function playVideoMessage(event, personName, videoPath){

    event.stopPropagation();

    const popup =
        document.getElementById("videoPlayerPopup");

    const title =
        document.getElementById("videoPlayerTitle");

    const video =
        document.getElementById("videoPlayer");

    const source =
        document.getElementById("videoSource");

    if(!popup || !title || !video || !source){
        console.error("Video player elements not found");
        return;
    }

    title.innerHTML =
        `💌 Message from ${personName}`;

    source.src = videoPath;

    video.load();

    popup.classList.remove("hidden");

    document.body.style.overflow = "hidden";

    videoPopupOpen = true;

    /* autoplay attempt */
    setTimeout(() => {
        video.play().catch(() => {});
    }, 300);
}

function closeVideoMessage(){

    const popup =
        document.getElementById("videoPlayerPopup");

    const video =
        document.getElementById("videoPlayer");

    if(video){
        video.pause();
        video.currentTime = 0;
    }

    if(popup){
        popup.classList.add("hidden");
    }

    document.body.style.overflow = "";

    videoPopupOpen = false;
}

/* =====================================
   OUTSIDE CLICK CLOSE
===================================== */

document.addEventListener("click", function(event){

    if(!videoPopupOpen) return;

    const popup =
        document.getElementById("videoPlayerPopup");

    const card =
        document.querySelector(".video-player-card");

    if(
        popup &&
        card &&
        !card.contains(event.target) &&
        !event.target.closest(".video-card")
    ){
        closeVideoMessage();
    }

});

/* =====================================
   ESC CLOSE
===================================== */

document.addEventListener("keydown", function(event){

    if(
        event.key === "Escape" &&
        videoPopupOpen
    ){
        closeVideoMessage();
    }

});

/* =====================================
   VIDEO ENDED EFFECT
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const video =
        document.getElementById("videoPlayer");

    if(video){

        video.addEventListener("ended", () => {

            const title =
                document.getElementById("videoPlayerTitle");

            if(title){
                title.innerHTML =
                "❤️ Hope you enjoyed the message";
            }

        });

    }

});