import { facts } from "./data-game1.js";
export function listenGame1Events(nextRound) {

    //GET HTML ELEMENTS 
    const btnTrue = document.getElementById("true");
    const btnFalse = document.getElementById("false");
    const next = document.getElementById("next");
    const answer = document.getElementById("answer");
    const scoreContainer = document.getElementById("score");
    const divTof = document.getElementById("tOf");
    const questionContainer = document.getElementById("question");
    const immuneSystem = document.getElementById("immune-system");
    const pourcentage = document.getElementById("pourcentage");
    const lightEffectIS = document.getElementById("board");

    //VARS
    var randomInd;
    var score = 80;
    var question = 0;

    //FUNCTIONS
    function pickStatement() {
        if (question < 4) {
            randomInd = Math.floor(Math.random() * facts.length)
            var randomStatement = facts[randomInd].statement;
            const paragraph = document.getElementById("statement");
            paragraph.innerHTML = `"${randomStatement}"`;
            question++;
            questionContainer.innerHTML = `Question : ${question}/4`;
            answer.innerHTML = "";
            next.style.display = "none";
            divTof.style.display = "initial";
            lightEffectIS.classList.remove("light-good");
            lightEffectIS.classList.remove("light-bad");
        } else {
            nextMiniGame2();
        }
    }

    function checkTrue() {
        if (facts[randomInd].trueOrFalse) {
            answer.innerHTML = "You're right => 5% BOOST";
            next.style.display = "initial";
            answer.style.color = "green";
            score = score + 5;
            immuneSystem.style.width = `${score}%`;
            pourcentage.innerHTML = `${score}%`;
            divTof.style.display = "none";
            lightEffectIS.classList.add("light-good");

        } else {
            answer.innerHTML = "You're wrong => 5% DAMAGE";
            next.style.display = "initial";
            answer.style.color = "red";
            score = score - 5;
            immuneSystem.style.width = `${score}%`;
            pourcentage.innerHTML = `${score}%`;
            divTof.style.display = "none";
            lightEffectIS.classList.add("light-bad");
        }

    }

    function checkFalse() {
        if (!facts[randomInd].trueOrFalse) {
            answer.innerHTML = "You're right => 5% BOOST";
            next.style.display = "initial";
            answer.style.color = "green";
            score = score + 5;
            immuneSystem.style.width = `${score}%`;
            pourcentage.innerHTML = `${score}%`;
            scoreContainer.innerHTML = `Score : ${score}`;
            divTof.style.display = "none";
            lightEffectIS.classList.add("light-good");
        } else {
            answer.innerHTML = "You're wrong => 5% DAMAGE";
            next.style.display = "initial";
            answer.style.color = "red";
            score = score - 5;
            immuneSystem.style.width = `${score}%`;
            pourcentage.innerHTML = `${score}%`;
            divTof.style.display = "none";
            lightEffectIS.classList.add("light-bad");
        }
    }

    function nextMiniGame2() {
        localStorage.setItem("score", score);
        next.onclick = () => nextRound(2);
    }

    //EVENT LISTENERS
    btnTrue.onclick = checkTrue;
    btnFalse.onclick = checkFalse;
    next.onclick = pickStatement;

    //Display one statement when the page loads 
    pickStatement();
}