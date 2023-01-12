document.addEventListener("DOMContentLoaded", () => {
    // Variables
    let allRounds = 0;
    let round = 1;
    let user1Score = 0;
    let user2Score = 0;
    let user1Choice = null;
    let user2Choice = null;
    // 0 : rock , 1 : paper , 2 : scissors

    // Elements
    const setRoundBtn = document.getElementById("set-rounds-btn");
    const roundInput = document.getElementById("round-input");
    const roundModal = document.getElementById("round-modal");
    const modalBox = document.getElementById("modal-box");
    const user1ChoiceHeader = document.getElementById("user1-choice-header");
    const user2ChoiceHeader = document.getElementById("user2-choice-header");
    const user1LastChoiceDiv = document.getElementById("user1-last-choice");
    const user2LastChoiceDiv = document.getElementById("user2-last-choice");
    const user1ScoreDiv = document.getElementById("user1-score-div");
    const user2ScoreDiv = document.getElementById("user2-score-div");
    const user1Btns = document.querySelectorAll(".user1-btn");
    const user2Btns = document.querySelectorAll(".user2-btn");
    const rock1Btn = document.getElementById("rock-btn1");
    const paper1Btn = document.getElementById("paper-btn1");
    const scissors1Btn = document.getElementById("scissors-btn1");
    const rock2Btn = document.getElementById("rock-btn2");
    const paper2Btn = document.getElementById("paper-btn2");
    const scissors2Btn = document.getElementById("scissors-btn2");
    const finishModal = document.getElementById("finish-modal");
    const finishModalBox = document.getElementById("finish-modal-box");
    const resetBtn = document.getElementById("reset-btn");
    const winnerSpan = document.getElementById("winner-span");
    const finalUser1ScoreSpan = document.getElementById("final-user1-score");
    const finalUser2ScoreSpan = document.getElementById("final-user2-score");
    const roundHeader = document.getElementById("round-header");


    // Functions
    const handleSetRounds = () => {
        const cnt = Math.ceil(Number(roundInput.value));
        if(cnt < 1) {
            alert("Enter a number greater than 0!");
        } else {
            allRounds = cnt;
            roundHeader.innerHTML = `Round ${round}/${allRounds}`;
            roundModal.classList.add("fade-modal");
            modalBox.classList.add("fade-modal-box");
            setTimeout(() => {
                roundModal.classList.add("d-none");
            } , 301);
        }
    }

    setRoundBtn.addEventListener("click", handleSetRounds);

    roundInput.addEventListener("keydown", (event) => {
        if(event.key === "Enter") {
            handleSetRounds();
        }
    });

    const doNothing = () => {
        return;
    }

    const handleSetScore = () => {
        if(user1Choice === user2Choice) {
            doNothing();
        }
        else if(user1Choice === 0) {
            if(user2Choice === 1) {
                user2Score += 1;
                user2ScoreDiv.innerHTML = user2Score.toString();
            }
            else {
                user1Score += 1;
                user1ScoreDiv.innerHTML = user1Score.toString();
            }
        }
        else if(user1Choice === 1) {
            if(user2Choice === 0) {
                user1Score += 1;
                user1ScoreDiv.innerHTML = user1Score.toString();
            }
            else {
                user2Score += 1;
                user2ScoreDiv.innerHTML = user2Score.toString();
            }
        }
        else if(user1Choice === 2) {
            if(user2Choice === 0) {
                user2Score += 1;
                user2ScoreDiv.innerHTML = user2Score.toString();
            }
            else {
                user1Score += 1;
                user1ScoreDiv.innerHTML = user1Score.toString();
            }
        }
        round += 1;
        if(round > allRounds) {
            winnerSpan.innerHTML = (user1Score > user2Score) ? "Player 1" : (user1Score === user2Score) ? "Draw!" : "Player 2";
            finalUser1ScoreSpan.innerHTML = user1Score.toString();
            finalUser2ScoreSpan.innerHTML = user2Score.toString();
            finishModal.classList.remove("d-none");
            setTimeout(() => {
                finishModal.classList.add("show-modal");
                finishModalBox.classList.add("show-modal-box");
            }, 10);
        }
        else {
            roundHeader.innerHTML = `Round ${round}/${allRounds}`;
        }
    }

    rock1Btn.addEventListener("click", () => {
        user1Choice = 0;
        user1LastChoiceDiv.innerHTML = "<div class='spinner-border spinner-border-size text-dark'><span class='visually-hidden'>Loading...</span></div>"
        user1ChoiceHeader.classList.remove("text-success");
        user2ChoiceHeader.classList.add("text-primary");
        for(let b of user1Btns) {
            b.classList.add("no-pointer-events");
        }
        for(let b of user2Btns) {
            b.classList.remove("no-pointer-events");
        }
    });

    paper1Btn.addEventListener("click", () => {
        user1Choice = 1;
        user1LastChoiceDiv.innerHTML = "<div class='spinner-border spinner-border-size text-dark'><span class='visually-hidden'>Loading...</span></div>"
        user1ChoiceHeader.classList.remove("text-success");
        user2ChoiceHeader.classList.add("text-primary");
        for(let b of user1Btns) {
            b.classList.add("no-pointer-events")
        }
        for(let b of user2Btns) {
            b.classList.remove("no-pointer-events")
        }
    });

    scissors1Btn.addEventListener("click", () => {
        user1Choice = 2;
        user1LastChoiceDiv.innerHTML = "<div class='spinner-border spinner-border-size text-dark'><span class='visually-hidden'>Loading...</span></div>"
        user1ChoiceHeader.classList.remove("text-success");
        user2ChoiceHeader.classList.add("text-primary");
        for(let b of user1Btns) {
            b.classList.add("no-pointer-events")
        }
        for(let b of user2Btns) {
            b.classList.remove("no-pointer-events")
        }
    });

    rock2Btn.addEventListener("click", () => {
        user2Choice = 0;
        user2LastChoiceDiv.innerHTML = "Rock";
        user1LastChoiceDiv.innerHTML = (user1Choice === 0) ? "Rock" : (user1Choice === 1) ? "Paper" : "Scissors";
        user2ChoiceHeader.classList.remove("text-primary");
        user1ChoiceHeader.classList.add("text-success");
        handleSetScore();
        for(let b of user2Btns) {
            b.classList.add("no-pointer-events")
        }
        for(let b of user1Btns) {
            b.classList.remove("no-pointer-events")
        }
    });

    paper2Btn.addEventListener("click", () => {
        user2Choice = 1;
        user2LastChoiceDiv.innerHTML = "Paper";
        user1LastChoiceDiv.innerHTML = (user1Choice === 0) ? "Rock" : (user1Choice === 1) ? "Paper" : "Scissors";
        user2ChoiceHeader.classList.remove("text-primary");
        user1ChoiceHeader.classList.add("text-success");
        handleSetScore();
        for(let b of user2Btns) {
            b.classList.add("no-pointer-events")
        }
        for(let b of user1Btns) {
            b.classList.remove("no-pointer-events")
        }
    });

    scissors2Btn.addEventListener("click", () => {
        user2Choice = 2;
        user2LastChoiceDiv.innerHTML = "Scissors";
        user1LastChoiceDiv.innerHTML = (user1Choice === 0) ? "Rock" : (user1Choice === 1) ? "Paper" : "Scissors";
        user2ChoiceHeader.classList.remove("text-primary");
        user1ChoiceHeader.classList.add("text-success");
        handleSetScore();
        for(let b of user2Btns) {
            b.classList.add("no-pointer-events")
        }
        for(let b of user1Btns) {
            b.classList.remove("no-pointer-events")
        }
    });

    resetBtn.addEventListener("click", () => {
        allRounds = 0;
        round = 1;
        user1Score = 0;
        user2Score = 0;
        user1Choice = null;
        user2Choice = null;
        user1LastChoiceDiv.innerHTML = "-";
        user2LastChoiceDiv.innerHTML = "-";
        user1ScoreDiv.innerHTML = "0";
        user2ScoreDiv.innerHTML = "0";
        roundHeader.innerHTML = "Round";
        finishModal.classList.remove("show-modal");
        finishModalBox.classList.remove("show-modal-box");
        setTimeout(() => {
            finishModal.classList.add("d-none");
            roundModal.classList.remove("d-none");
        }, 301);
        setTimeout(() => {
            roundModal.classList.remove("fade-modal");
            modalBox.classList.remove("fade-modal-box");
        }, 311);
    });
});