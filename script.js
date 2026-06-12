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

function quizAnswer(){

    const result =
    document.getElementById("quiz-result");

    result.innerHTML =
    `
    ✅ Correct.<br>
    The system is functioning normally.
    <br><br>
    Preparing next surprise...
    `;

    setTimeout(() => {

        goToScene(4);

    }, 3000);

}

function showDogMessage(element){

    const messages = [

        "Mom says: Come home soon ❤️",

        "Siddhant says: I still want my treat 😄",

        "You are loved more than you know ✨"

    ];

    const randomMessage =
    messages[
        Math.floor(
            Math.random()*messages.length
        )
    ];

    document.getElementById(
        "dogMessage"
    ).innerText =
    randomMessage;
}

function openLetter(name){

    alert(
        "Placeholder message from " + name +
        ". Replace later with real message."
    );

}