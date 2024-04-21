document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("addButton");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const startButton = document.getElementById("startButton");
    const resetButton = document.getElementById("resetButton");
    const breakButton = document.getElementById("breakButton");
    let timerInterval;
    let minutes = 25;
    let seconds = 0;

    addButton.addEventListener("click", function() {
        const task = taskInput.value.trim();
        if (task !== "") {
            const li = document.createElement("li");
            li.innerHTML = `<input type="checkbox">
                            <span>${task}</span>
                            <button>Delete</button>`;
            taskList.appendChild(li);
            taskInput.value = "";
        }
    });

    taskList.addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON") {
            event.target.parentElement.remove();
        } else if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
            const span = event.target.nextElementSibling;
            span.classList.toggle("completed");
        }
    });

    startButton.addEventListener("click", function() {
        startTimer();
        startButton.disabled = true;
    });

    resetButton.addEventListener("click", function() {
        clearInterval(timerInterval);
        minutes = 25;
        seconds = 0;
        updateTimerDisplay();
        startButton.disabled = false;
    });

    breakButton.addEventListener("click", function() {
        minutes = 5;
        seconds = 0;
        updateTimerDisplay();
        startTimer();
        breakButton.disabled = true;
    });

    function startTimer() {
        timerInterval = setInterval(function() {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timerInterval);
                if (startButton.disabled) {
                    breakButton.disabled = false;
                }
            } else if (seconds === 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateTimerDisplay();
        }, 1000);
    }

    function updateTimerDisplay() {
        const timerDisplay = document.getElementById("timer");
        timerDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
});
