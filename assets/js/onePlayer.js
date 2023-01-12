document.addEventListener("DOMContentLoaded" , () => {
    // Variables
    let allRounds = 0;
    let round = 1;
    let userScore = 0;
    let pcScore = 0;
    let userChoice = null;
    let pcChoice = null;
    // 0 : rock , 1 : paper , 2 : scissors

    // Elements
    const setRoundBtn = document.getElementById("set-rounds-btn");
    const roundInput = document.getElementById("round-input");
    const roundModal = document.getElementById("round-modal");
    const modalBox = document.getElementById("modal-box");
    const userChoiceHeader = document.getElementById("user-choice-header");
    const pcChoiceHeader = document.getElementById("pc-choice-header");
    const userLastChoiceDiv = document.getElementById("user-last-choice");
    const pcLastChoiceDiv = document.getElementById("pc-last-choice");
    const userScoreDiv = document.getElementById("user-score-div");
    const pcScoreDiv = document.getElementById("pc-score-div");
    const chooseBtns = document.querySelectorAll(".choose-btn");
    const rockBtn = document.getElementById("rock-btn");
    const paperBtn = document.getElementById("paper-btn");
    const scissorsBtn = document.getElementById("scissors-btn");
    const finishModal = document.getElementById("finish-modal");
    const finishModalBox = document.getElementById("finish-modal-box");
    const resetBtn = document.getElementById("reset-btn");
    const winnerSpan = document.getElementById("winner-span");
    const finalUserScoreSpan = document.getElementById("final-user-score");
    const finalPcScoreSpan = document.getElementById("final-pc-score");
    const roundHeader = document.getElementById("round-header");

    // Functions
    const handleSetRounds = () => {
        const cnt = Math.ceil(Number(roundInput.value));
        console.log(cnt);
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
        if(userChoice === pcChoice) {
            doNothing();
        }
        else if(userChoice === 0) {
            if(pcChoice === 1) {
                pcScore += 1;
                pcScoreDiv.innerHTML = pcScore.toString();
            }
            else {
                userScore += 1;
                userScoreDiv.innerHTML = userScore.toString();
            }
        }
        else if(userChoice === 1) {
            if(pcChoice === 0) {
                userScore += 1;
                userScoreDiv.innerHTML = userScore.toString();
            }
            else {
                pcScore += 1;
                pcScoreDiv.innerHTML = pcScore.toString();
            }
        }
        else if(userChoice === 2) {
            if(pcChoice === 0) {
                pcScore += 1;
                pcScoreDiv.innerHTML = pcScore.toString();
            }
            else {
                userScore += 1;
                userScoreDiv.innerHTML = userScore.toString();
            }
        }
    }

    const handleScoring = () => {
        userChoiceHeader.classList.remove("text-success");
        pcChoiceHeader.classList.add("text-primary");
        pcLastChoiceDiv.innerHTML = "<div class='spinner-border spinner-border-size text-dark'><span class='visually-hidden'>Loading...</span></div>"
        for(let b of chooseBtns) {
            b.classList.add("no-pointer-events");
        }
        setTimeout(() => {
            let randomNumber = Math.ceil(Math.random() * Math.random() * 256000) % 3;
            console.log(randomNumber);
            switch (randomNumber) {
                case 0:
                    pcChoice = 0; 
                    pcLastChoiceDiv.innerHTML = "Rock";
                    break;
                case 1:
                    pcChoice = 1; 
                    pcLastChoiceDiv.innerHTML = "Paper";
                    break;
                case 2:
                    pcChoice = 2; 
                    pcLastChoiceDiv.innerHTML = "Scissors";
                    break;
            }
            handleSetScore();
            round += 1;
            pcChoiceHeader.classList.remove("text-primary");
            userChoiceHeader.classList.add("text-success");
            for(let b of chooseBtns) {
                b.classList.remove("no-pointer-events");
            }
            if(round > allRounds) {
                winnerSpan.innerHTML = (userScore > pcScore) ? "You" : (userScore === pcScore) ? "Draw!" : "PC";
                finalUserScoreSpan.innerHTML = userScore.toString();
                finalPcScoreSpan.innerHTML = pcScore.toString();
                finishModal.classList.remove("d-none");
                setTimeout(() => {
                    finishModal.classList.add("show-modal");
                    finishModalBox.classList.add("show-modal-box");
                }, 10);
            }
            else {
                roundHeader.innerHTML = `Round ${round}/${allRounds}`;
            }
        }, 400);
    }

    rockBtn.addEventListener("click", () => {
        userLastChoiceDiv.innerHTML = "Rock";
        userChoice = 0;
        handleScoring();
    });

    paperBtn.addEventListener("click", () => {
        userLastChoiceDiv.innerHTML = "Paper";
        userChoice = 1;
        handleScoring();
    });

    scissorsBtn.addEventListener("click", () => {
        userLastChoiceDiv.innerHTML = "Scissors";
        userChoice = 2;
        handleScoring();
    });

    resetBtn.addEventListener("click", () => {
        allRounds = 0;
        round = 1;
        userScore = 0;
        pcScore = 0;
        userChoice = null;
        pcChoice = null;
        userLastChoiceDiv.innerHTML = "-";
        pcLastChoiceDiv.innerHTML = "-";
        userScoreDiv.innerHTML = "0";
        pcScoreDiv.innerHTML = "0";
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