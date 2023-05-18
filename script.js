var countdownInterval;
var totalSeconds = 0;
var isPaused = false;

function startCountdown() {
  var hours = document.getElementById("input-hours").value;
  var minutes = document.getElementById("input-minutes").value;
  var seconds = document.getElementById("input-seconds").value;

  totalSeconds = hours * 3600 + minutes * 60 + Number(seconds);
  if (totalSeconds > 0) {
    var countdownElement = document.getElementById("countdown");

    countdownInterval = setInterval(function() {
      if (!isPaused) {
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        var seconds = totalSeconds % 60;

        countdownElement.innerHTML = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);

        if (totalSeconds <= 0) {
          clearInterval(countdownInterval);
          countdownElement.innerHTML = "타임 업!";
          showAlert();
        }

        totalSeconds--;
      }
    }, 1000);

    // Disable start button and enable pause and reset buttons
    document.getElementById("start").disabled = true;
    document.getElementById("pause").disabled = false;
    document.getElementById("reset").disabled = false;
  }
}

function pauseCountdown() {
  isPaused = !isPaused;

  // Toggle button text
  var pauseButton = document.getElementById("pause");
  if (isPaused) {
    pauseButton.innerHTML = "재개";
  } else {
    pauseButton.innerHTML = "일시정지";
  }
}

function resetCountdown() {
  clearInterval(countdownInterval);
  totalSeconds = 0;
  isPaused = false;

  // Reset countdown display
  var countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = "00:00:00";

  // Enable start button and disable pause and reset buttons
  document.getElementById("start").disabled = false;
  document.getElementById("pause").disabled = true;
  document.getElementById("reset").disabled = true;
}

function showAlert() {
  alert("타임 업!");
}

function pad(number) {
  return ("0" + number).slice(-2);
}

document.getElementById("start").addEventListener("click", startCountdown);
document.getElementById("pause").addEventListener("click", pauseCountdown);
document.getElementById("reset").addEventListener("click", resetCountdown);

function getCurrentDateTime() {
  var currentDateTime = new Date();
  var datetimeElement = document.getElementById('datetime');
  datetimeElement.innerHTML = currentDateTime.toLocaleString();
}

setInterval(getCurrentDateTime, 1000);