export function listenIntroEvents(nextRound) {
    const btnStart = document.getElementById("start");
    const gameInfo = document.querySelector(".game-info-page");
    const trigger = document.querySelector(".trigger");
    const closeBtn = document.querySelector(".close-btn");

    function toggleGameInfo() {
        gameInfo.classList.toggle("display-game-info");
    }

    function windowOnClick(event) {
        if (event.target === gameInfo) {
            toggleGameInfo();
        }
    }

    trigger.onclick = toggleGameInfo;
    closeBtn.onclick = toggleGameInfo;
    btnStart.onclick = () => nextRound(1)
}