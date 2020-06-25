import { Timer } from "./timer.js";
export function listenGame2Events(nextRound) {

    //GET HTML ELEMENTS
    const immuneSystem = document.getElementById("immune-system");
    const pourcentage = document.getElementById("pourcentage");
    const nose = document.getElementById("nose");
    const gameOverElt = document.getElementsByClassName("game-over-or-next-game")[0];
    const nextGameElt = document.getElementsByClassName("game-over-or-next-game")[1];
    const btnPlayAgain = document.getElementById("btn-play-again");
    const btnNextGame = document.getElementById("btn-next-game");
    const virusGreenHTML = document.getElementsByClassName("virus-green")[0];
    const virusGreen2HTML = document.getElementsByClassName("virus-green")[1];
    const virusPurpleHTML = document.getElementsByClassName("virus-purple")[0];
    const virusPurple2HTML = document.getElementsByClassName("virus-purple")[1];
    const virusBlueHTML = document.getElementsByClassName("virus-blue")[0];
    const virusBlue2HTML = document.getElementsByClassName("virus-blue")[1];
    const antidoteHTML = document.getElementsByClassName("antidote")[0];
    var wind = document.getElementById('wind');
    var atchoum = document.getElementById("atchoum");
    var death = document.getElementById("death");
    let minDec = document.getElementById('minDec');//timer
    let minUni = document.getElementById('minUni');//timer
    let secDec = document.getElementById('secDec');//timer
    let secUni = document.getElementById('secUni');//timer

    //VARS
    let score = Number(localStorage.getItem("score")); //score from previous game 
    let column = 1;
    let row = 15;

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


    //CLASS VIRUSORANTIDOTE
    class VirusOrAntidote {
        constructor(points, rowVorA, columnVorA, interval = 1000, HTMLelement) {
            this.points = points;
            this.rowVorA = rowVorA;
            this.columnVorA = columnVorA;
            this.interval = interval;
            this.element = HTMLelement;
            this.intervalId = 0;
        }

        virusOrAntidoteMove() {
            this.intervalId = setInterval(() => {
                if (this.rowVorA >= 15) {
                    this.rowVorA = 1;
                    this.columnVorA = 1 + Math.floor(Math.random() * 16);
                } else {
                    this.rowVorA += 1;
                }
                this.element.style.gridColumn = `${this.columnVorA}`;
                this.element.style.gridRow = `${this.rowVorA}`;
            }, this.interval);
        }

        stopMoving() {
            clearInterval(this.intervalId)
        }

        collision() {
            if (column == this.columnVorA && row == this.rowVorA) {
                if ((score + this.points) >= 100) {
                    score = 100;
                    immuneSystem.style.width = `${score}%`;
                    pourcentage.innerHTML = `${score}%`;
                } else {
                    score = score + this.points;
                    immuneSystem.style.width = `${score}%`;
                    pourcentage.innerHTML = `${score}%`;
                }
                playAtchoum();
                return false;
            } return true;
        }

        destroySelf() {
            delete this.points;
            delete this.rowVorA;
            delete this.columnVorA;
            delete this.interval;
            delete this.element;
            delete this.intervalId;
        }
    }


    //INSTANCES OF CLASS VIRUSORANTIDOTE
    let virusGreen = new VirusOrAntidote(-5, 2, 2, 40, virusGreenHTML);
    let virusGreen2 = new VirusOrAntidote(-5, 3, 2, 40, virusGreen2HTML);
    let virusPurple = new VirusOrAntidote(-10, 10, 5, 40, virusPurpleHTML);
    let virusPurple2 = new VirusOrAntidote(-10, 6, 10, 40, virusPurple2HTML);
    let virusBlue = new VirusOrAntidote(-15, 6, 10, 40, virusBlueHTML);
    let virusBlue2 = new VirusOrAntidote(-15, 6, 10, 40, virusBlue2HTML);
    let antidote = new VirusOrAntidote(5, 6, 10, 40, antidoteHTML);

    //FUNCTION DECLARATIONS

    function startGame2() {
        virusGreen.virusOrAntidoteMove();
        virusGreen2.virusOrAntidoteMove();
        virusPurple.virusOrAntidoteMove();
        virusPurple2.virusOrAntidoteMove();
        virusBlue.virusOrAntidoteMove();
        virusBlue2.virusOrAntidoteMove();
        antidote.virusOrAntidoteMove();
        timer.startTimer(printTime, nextGame);
        playWind();
    }

    function moveNose() {
        switch (window.event.keyCode) {
            case 37: //left arrow
                if (column <= 1) {
                    column = 1;
                } else {
                    column--;
                }
                nose.style.gridColumn = `${column}`;
                break;
            case 39: //right arrow
                if (column >= 16) {
                    column = 16;
                } else {
                    column++;
                }
                nose.style.gridColumn = `${column}`;
                break;
        }
    };

    function playWind() {
        wind.play();
    };

    function stopWind() {
        wind.pause();
    };

    function playAtchoum(){
        atchoum.play();
    }

    function stopAtchoum(){
        atchoum.pause();
    }
    
    function playDeath(){
        death.volume=0.05;
        death.play();
    }

    function nextGame() {
        nextGameElt.classList.remove("game-over-or-next-game");
        nextGameElt.classList.add("game-over-or-next-game-display");
        nose.style.display = "none";
        virusGreen.stopMoving();
        virusGreen2.stopMoving();
        virusPurple.stopMoving();
        virusPurple2.stopMoving();
        virusBlue.stopMoving();
        virusBlue2.stopMoving();
        antidote.stopMoving();
        stopWind();
    }


    function gameOver() {
        if (score < 1) {
            score = 0;
            pourcentage.innerHTML = `0%`;
            gameOverElt.classList.remove("game-over-or-next-game");
            gameOverElt.classList.add("game-over-or-next-game-display");
            nose.style.display = "none";
            virusGreen.stopMoving();
            virusGreen2.stopMoving();
            virusPurple.stopMoving();
            virusPurple2.stopMoving();
            virusBlue.stopMoving();
            virusBlue2.stopMoving();
            antidote.stopMoving();
            clearInterval(timer.intervalId);
            virusGreen.destroySelf();
            virusGreen2.destroySelf();
            virusPurple.destroySelf();
            virusPurple2.destroySelf();
            virusBlue.destroySelf();
            virusBlue2.destroySelf();
            antidote.destroySelf();
            stopWind();
            playDeath();
            return false;
        } return true;
    }

    

    /*call collision function at all time*/
    function step(timestamp) {
        var noDelay = true;
        noDelay = noDelay && virusGreen.collision();
        noDelay = noDelay && virusGreen2.collision();
        noDelay = noDelay && virusPurple.collision();
        noDelay = noDelay && virusPurple2.collision();
        noDelay = noDelay && virusBlue.collision();
        noDelay = noDelay && virusBlue2.collision();
        noDelay = noDelay && antidote.collision();
        if (noDelay === false) {
            window.setTimeout(() => {
                requestAnimationFrame(step);
            }, 500);
        }
        else requestAnimationFrame(step);
    }

    /*call gameOver function at all time*/
    function step2(timestamp) {
        var noDelay2 = true;
        noDelay2 = noDelay2 && gameOver();
        if (noDelay2 === false) {
        }
        else requestAnimationFrame(step2);
    }


    // EVENT LISTENERS
    document.onkeydown = moveNose;
    btnPlayAgain.onclick = function () { window.location.href = "index.html"; }; //Play again (go back to home page)
    btnNextGame.onclick = function () {
        localStorage.setItem("scoreGame2", score);
        nextRound(3);
    }; //Go to the next game


    //FUNCTION CALLS
    var requestID;
    requestID = requestAnimationFrame(step);
    requestAnimationFrame(step2);

    setTimeout(() => {
        startGame2();
    }, 5000); // wait 5 seconds before the game starts
}