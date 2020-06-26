import { Timer } from "./timer.js";
import { playSound, stopSound,playLowSound } from "./sound-functions.js";
export function listenGame3Events(nextRound) {
    //GET HTML ELEMENTS
    const immuneSystem = document.getElementById("immune-system");
    const pourcentage = document.getElementById("pourcentage");
    const gameOverElt = document.getElementsByClassName("game-over-or-next-game")[0];
    const endGame = document.getElementsByClassName("win")[0];
    const btnPlayAgain = document.getElementById("btn-play-again");
    const virusGreenHTML = document.getElementsByClassName("virus-green")[0];
    const virusGreen2HTML = document.getElementsByClassName("virus-green")[1];
    const virusPurpleHTML = document.getElementsByClassName("virus-purple")[0];
    const virusPurple2HTML = document.getElementsByClassName("virus-purple")[1];
    const virusBlueHTML = document.getElementsByClassName("virus-blue")[0];
    const virusBlue2HTML = document.getElementsByClassName("virus-blue")[1];
    const virusAll = document.getElementsByClassName("virus");
    const death = document.getElementById("death");
    const countdown = document.getElementById("countdown");
    const heartbeat = document.getElementById("heartbeat");
    const cheering = document.getElementById("cheering");
    let minDec = document.getElementById('minDec');//timer
    let minUni = document.getElementById('minUni');//timer
    let secDec = document.getElementById('secDec');//timer
    let secUni = document.getElementById('secUni');//timer

    //VARS
    let score = Number(localStorage.getItem("scoreGame2")); //score from previous game 
    let column = 1;
    let row = 1;
    var intervalIddamage;

    //DISPLAY THE IMMUNE SYSTEM
    immuneSystem.style.width = `${score}%`; //Display progress bar (immune system)...
    pourcentage.innerHTML = `${score}%`; //... and pourcentage with score from the previous game

    //TIMER FUNCTIONS
    function printTime() {
        printMinutes();
        printSeconds();
    }

    function printMinutes() {
        var minutes = timer.twoDigitsNumber(timer.getMinutes());
        minDec.textContent = minutes[0];
        minUni.textContent = minutes[1];
    }

    function printSeconds() {
        var seconds = timer.twoDigitsNumber(timer.getSeconds());
        secDec.textContent = seconds[0];
        secUni.textContent = seconds[1];
    }

    //INSTANCE OF CLASS TIMER
    var timer = new Timer(45);

    // CLASS VIRUSGAME3
    class VirusGame3 {
        constructor(points, rowVorA, columnVorA, interval, HTMLelement) {
            this.points = points;
            this.rowVorA = rowVorA;
            this.columnVorA = columnVorA;
            this.interval = interval;
            this.element = HTMLelement;
            this.intervalId = 0;
        }

        virusMove() {
            this.intervalId = setInterval(() => {
                this.columnVorA = 1 + Math.floor(Math.random() * 16);
                this.rowVorA = 1 + Math.floor(Math.random() * 15);
                this.element.style.gridColumn = `${this.columnVorA}`;
                this.element.style.gridRow = `${this.rowVorA}`;
                //lightEffectIS.classList.remove("light-virus");
            }, this.interval);
        }

        virusClicked() {
            if (score >= 100) {
                score = 100;
            } else {
                if ((score + this.points) >= 100) {
                    score = 100;
                    immuneSystem.style.width = `${score}%`;
                    pourcentage.innerHTML = `${score}%`;
                } else {
                    score = score + this.points;
                    immuneSystem.style.width = `${score}%`;
                    pourcentage.innerHTML = `${score}%`;
                    console.log(this, this.points);
                }

            }
        }
    }


    //INSTANCES OF VIRUSGAME3
    let virusGreen = new VirusGame3(2, 2, 2, 1200, virusGreenHTML);
    let virusGreen2 = new VirusGame3(2, 3, 2, 1200, virusGreen2HTML);
    let virusPurple = new VirusGame3(5, 10, 5, 900, virusPurpleHTML);
    let virusPurple2 = new VirusGame3(5, 6, 10, 900, virusPurple2HTML);
    let virusBlue = new VirusGame3(7, 6, 10, 800, virusBlueHTML);
    let virusBlue2 = new VirusGame3(7, 6, 10, 800, virusBlue2HTML);

    //FUNCTION DECLARATIONS

    function startGame3() {
        virusGreen.virusMove();
        virusGreen2.virusMove();
        virusPurple.virusMove();
        virusPurple2.virusMove();
        virusBlue.virusMove();
        virusBlue2.virusMove();
        timer.startTimer(printTime, goToEnd);
        playSound(heartbeat);
        damageImmuneSystem();
        gameOver();
    }

    function damageImmuneSystem() {
        intervalIddamage = setInterval(() => {
            score = score - 2;
            immuneSystem.style.width = `${score}%`;
            pourcentage.innerHTML = `${score}%`;
        }, 1000);
    }

    /*call gameOver function at all time*/
    function step2(timestamp) {
        var noDelay2 = true;
        noDelay2 = noDelay2 && gameOver();
        if (noDelay2 === false) {
        }
        else requestAnimationFrame(step2);
    }

    function playSoundVirusclicked() {
        var sound = document.getElementById('sound');
        sound.play();
    }

    function gameOver() {
        if (score <= 1) {
            score = 0;
            pourcentage.innerHTML = `0%`;
            gameOverElt.classList.remove("game-over-or-next-game");
            gameOverElt.classList.add("game-over-or-next-game-display");
            clearInterval(virusGreen.intervalId);
            clearInterval(virusGreen2.intervalId);
            clearInterval(virusPurple.intervalId);
            clearInterval(virusPurple2.intervalId);
            clearInterval(virusBlue.intervalId);
            clearInterval(virusBlue2.intervalId);
            clearInterval(timer.intervalId);
            clearInterval(intervalIddamage);
            stopSound(heartbeat);
            playLowSound(death);
            for (let i = 0; i < virusAll.length; i++) {
                virusAll[i].style.display = "none";
            }
            return false;
        } return true;
    }

    function goToEnd() {
        endGame.classList.remove("win");
        endGame.classList.add("game-over-or-next-game-display");
        clearInterval(virusGreen.intervalId);
        clearInterval(virusGreen2.intervalId);
        clearInterval(virusPurple.intervalId);
        clearInterval(virusPurple2.intervalId);
        clearInterval(virusBlue.intervalId);
        clearInterval(virusBlue2.intervalId);
        clearInterval(intervalIddamage);
        stopHeartbeat();
        playSound(cheering);
        for (let i = 0; i < virusAll.length; i++) {
            virusAll[i].style.display = "none";
        }
    }



    /* EVENT LISTENERS */
    btnPlayAgain.onclick = function () { window.location.href = "index.html"; }; //Play again (go back to home page)

    setTimeout(() => {
        virusGreenHTML.addEventListener("click", function () {
            playSoundVirusclicked();
            virusGreen.virusClicked();
        });
    
        virusGreen2HTML.addEventListener("click", function () {
            playSoundVirusclicked();
            virusGreen.virusClicked();
        });
    
        virusPurpleHTML.addEventListener("click", function () {
            playSoundVirusclicked();
            virusPurple.virusClicked();
        });
    
        virusPurple2HTML.addEventListener("click", function () {
            playSoundVirusclicked();
            virusPurple2.virusClicked();
        });
    
        virusBlueHTML.addEventListener("click", function () {
            playSoundVirusclicked();
            virusBlue.virusClicked();
        });
    
        virusBlue2HTML.addEventListener("click", function () {
            playSoundVirusclicked();
            virusBlue2.virusClicked();
        });
    }, 5000);
    

    /*FUNCTIONS CALLS*/
    requestAnimationFrame(step2);
    playSound(countdown);

    setTimeout(() => {
        startGame3();
    }, 5000);
}