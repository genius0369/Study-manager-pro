let subjects = JSON.parse(localStorage.getItem("subjects")) || [
  { name: "Math", duration: 60, attempted: 0, completed: 0 },
  { name: "Physics", duration: 60, attempted: 0, completed: 0 },
  { name: "Chemistry", duration: 60, attempted: 0, completed: 0 },
  { name: "English", duration: 45, attempted: 0, completed: 0 }
];

let queue = [];
let currentInterval = null;

/* Daily Reset */
let today = new Date().toDateString();
if (localStorage.getItem("savedDate") !== today) {
  subjects.forEach(s => {
    s.attempted = 0;
    s.completed = 0;
  });
  localStorage.setItem("savedDate", today);
  saveData();
}

function saveData() {
  localStorage.setItem("subjects", JSON.stringify(subjects));
}

function renderSubjects() {
  const list = document.getElementById("subjectList");
  list.innerHTML = "";

  subjects.forEach((sub, index) => {
    list.innerHTML += `
      <div class="subject-item">
        <input type="checkbox" value="${index}">
        <strong>${sub.name}</strong> (${sub.duration} min)
        <div>Attempted: ${sub.attempted} | Completed: ${sub.completed}</div>
      </div>
    `;
  });

  updateAnalytics();
}

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

function toggleAddForm() {
  const modal = document.getElementById("addModal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function addSubject() {
  const name = document.getElementById("newName").value;
  const time = parseInt(document.getElementById("newTime").value);
  if (!name || !time) return;

  subjects.push({ name, duration: time, attempted: 0, completed: 0 });
  saveData();
  renderSubjects();
  document.getElementById("addModal").style.display = "none";
}

function startSelected() {
  let checked = document.querySelectorAll("input[type=checkbox]:checked");
  if (checked.length === 0) return;

  queue = [];
  checked.forEach(cb => {
    subjects[cb.value].attempted++;
    queue.push(cb.value);
  });

  saveData();
  renderSubjects();
  runNext();
}

function runNext() {
  if (queue.length === 0) {
    playAlarm();
    alert("All selected subjects completed!");
    return;
  }

  let index = queue.shift();
  let totalTime = subjects[index].duration * 60;
  let time = totalTime;

  currentInterval = setInterval(() => {
    let min = Math.floor(time / 60);
    let sec = time % 60;

    document.getElementById("timer").innerText =
      `${subjects[index].name} - ${min}:${sec < 10 ? "0" : ""}${sec}`;

    let progress = ((totalTime - time) / totalTime) * 100;
    document.getElementById("progressBar").style.width = progress + "%";

    time--;

    if (time < 0) {
      clearInterval(currentInterval);
      subjects[index].completed++;
      saveData();
      renderSubjects();
      playAlarm();
      runNext();
    }

  }, 1000);
}

function playAlarm() {
  if (document.getElementById("muteToggle").checked) return;
  let audio = new Audio("https://www.soundjay.com/buttons/beep-07.wav");
  audio.play();
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

renderSubjects();
