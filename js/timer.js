export class Timer {
    constructor(time) {
        this.currentTime = time;
        this.intervalId = null;
    }

    startTimer(callbackPrint, callbackNext) {
        this.intervalId = setInterval(() => {
            this.currentTime--;
            callbackPrint();
            if (this.currentTime === 0) {
                this.stopTimer();
                callbackNext();
            }
        }, 1000);
    }

    getMinutes() {
        return parseInt(this.currentTime / 60);
    }

    getSeconds() {
        return this.currentTime - this.getMinutes() * 60;
    }
    stopTimer() {
        clearInterval(this.intervalId);
    }

    twoDigitsNumber(number) {
        number = String(number);
        if (number.length === 0) {
            return "00";
        } else if (number.length === 1) {
            return "0" + number
        } else {
            return number;
        }
    }
}