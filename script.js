/* ==============================
   INITIAL DATA LOAD
============================== */

let subjects = JSON.parse(localStorage.getItem("subjects")) || [
  { name: "Math", duration: 60, attempted: 0, completed: 0 },
  { name: "Physics", duration: 60, attempted: 0, completed: 0 },
  { name: "Chemistry", duration: 60, attempted: 0, completed: 0 },
  { name: "English", duration: 45, attempted: 0, completed: 0 }
];

let queue = [];
let currentInterval = null;
let currentIndex = null;
let remainingTime = 0;
let isPaused = false;

/* ==============================
   DAILY RESET
============================== */

let today = new Date().toDateString();
let savedDate = localStorage.getItem("savedDate");

if (savedDate !== today) {
  subjects.forEach(s => {
    s.attempted = 0;
    s.completed = 0;
  });

  localStorage.setItem("savedDate", today);
  localStorage.setItem("subjects", JSON.stringify(subjects));
}

/* ==============================
   SAVE
============================== */

function saveData() {
  localStorage.setItem("subjects", JSON.stringify(subjects));
}

/* ==============================
   RENDER
============================== */

function renderSubjects() {
  const list = document.getElementById("subjectList");
  list.innerHTML = "";

  subjects.forEach((sub, index) => {
    list.innerHTML += `
      <div class="subject-item">
        <input type="checkbox" value="${index}" id="sub${index}">
        <strong>${sub.name}</strong> (${sub.duration} min)
        <div>Attempted: ${sub.attempted} | Completed: ${sub.completed}</div>
      </div>
    `;
  });

  updateAnalytics();
}

/* ==============================
   ANALYTICS
============================== */

function updateAnalytics() {
  document.getElementById("totalSubjects").innerText = subjects.length;

  let totalA = 0, totalC = 0;
  subjects.forEach(s => {
    totalA += s.attempted;
    totalC += s.completed;
  });

  document.getElementById("totalAttempted").innerText = totalA;
  document.getElementById("totalCompleted").innerText = totalC;
}

/* ==============================
   START
============================== */

function startSelected() {
  if (currentInterval) return;

  let checked = document.querySelectorAll("input[type=checkbox]:checked");
  if (checked.length === 0) {
    alert("Please select at least one subject.");
    return;
  }

  queue = [];

  checked.forEach(cb => {
    let index = parseInt(cb.value);
    subjects[index].attempted++;
    queue.push(index);
  });

  saveData();
  renderSubjects();
  runNext();
}

/* ==============================
   RUN NEXT
============================== */

function runNext() {
  if (queue.length === 0) {
    finishAll();
    return;
  }

  currentIndex = queue.shift();
  remainingTime = subjects[currentIndex].duration * 60;
  isPaused = false;

  document.getElementById("pauseBtn").innerText = "Pause";

  startTimer();
}

/* ==============================
   TIMER
============================== */

function startTimer() {
  currentInterval = setInterval(() => {

    if (!isPaused) {
      remainingTime--;
      updateTimerUI();

      if (remainingTime <= 0) {
        clearInterval(currentInterval);
        currentInterval = null;

        subjects[currentIndex].completed++;
        saveData();
        autoUncheck(currentIndex);
        renderSubjects();

        playAlarm();
        runNext();
      }
    }

  }, 1000);
}

function updateTimerUI() {
  let min = Math.floor(remainingTime / 60);
  let sec = remainingTime % 60;

  document.getElementById("timer").innerText =
    `${subjects[currentIndex].name} - ${min}:${sec < 10 ? "0" : ""}${sec}`;

  let totalTime = subjects[currentIndex].duration * 60;
  let progress = ((totalTime - remainingTime) / totalTime) * 100;

  document.getElementById("progressBar").style.width = progress + "%";
}

/* ==============================
   PAUSE / RESUME (TOGGLE)
============================== */

function pauseResume() {
  if (!currentInterval) return;

  isPaused = !isPaused;

  document.getElementById("pauseBtn").innerText =
    isPaused ? "Resume" : "Pause";
}

/* ==============================
   STOP
============================== */

function stopTimer() {
  clearInterval(currentInterval);
  currentInterval = null;
  queue = [];
  remainingTime = 0;
  currentIndex = null;
  isPaused = false;

  document.getElementById("timer").innerText = "00:00";
  document.getElementById("progressBar").style.width = "0%";
  document.getElementById("pauseBtn").innerText = "Pause";
}

/* ==============================
   AUTO UNCHECK
============================== */

function autoUncheck(index) {
  let checkbox = document.getElementById("sub" + index);
  if (checkbox) checkbox.checked = false;
}

/* ==============================
   FINISH ALL
============================== */

function finishAll() {
  playAlarm();
  alert("All selected subjects completed!");
  document.getElementById("timer").innerText = "Done!";
  document.getElementById("progressBar").style.width = "100%";
}

/* ==============================
   ADD SUBJECT MODAL
============================== */

function toggleAddForm() {
  let modal = document.getElementById("addModal");
  modal.style.display =
    modal.style.display === "flex" ? "none" : "flex";
}

function addSubject() {
  let name = document.getElementById("newName").value.trim();
  let time = parseInt(document.getElementById("newTime").value);

  if (!name || !time || time <= 0) {
    alert("Enter valid subject and time");
    return;
  }

  subjects.push({
    name: name,
    duration: time,
    attempted: 0,
    completed: 0
  });

  saveData();
  renderSubjects();
  toggleAddForm();

  document.getElementById("newName").value = "";
  document.getElementById("newTime").value = "";
}

/* ==============================
   ALARM
============================== */

function playAlarm() {
  if (document.getElementById("muteToggle")?.checked) return;

  let audio = new Audio("https://www.soundjay.com/buttons/beep-07.wav");
  audio.play();
}

/* ==============================
   LOAD
============================== */

window.onload = function () {
  renderSubjects();
};
