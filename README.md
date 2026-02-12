# Smart Study Manager Pro 🚀

Smart Study Manager Pro is an advanced dark-themed productivity web app
built using HTML, CSS, JavaScript, and JSON.

It helps students manage structured study sessions with a clean neon UI,
smart queue system, progress tracking, and persistent data storage.

------------------------------------------------------------------------

## 📁 Project Structure

smart-study-manager-pro/ │ ├── index.html ├── script.js ├── data.json
└── README.md

------------------------------------------------------------------------

## ✨ Core Features

### 🎨 UI & Experience

-   Neon blue dark mode interface
-   Light / Dark mode toggle
-   Clean, distraction-free layout
-   Progress bar for active subject

### 📚 Study System

-   Predefined subjects loaded from JSON
-   Add custom subjects dynamically
-   Multi-subject queue system
-   Sequential subject execution
-   Per-subject completion alarm
-   Final completion alarm

### 📊 Tracking & Analytics

-   Attempted counter (session starts)
-   Completed counter (full study sets)
-   Session progress tracking
-   Daily reset option
-   LocalStorage persistence (data saved even after refresh)

### 🔊 Sound Control

-   Mute / Unmute toggle
-   Alarm after each subject
-   Final alarm after full set completion

------------------------------------------------------------------------

## 📦 data.json

Stores default subjects and durations (in minutes):

Example:

{ "subjects": \[ { "name": "Math", "duration": 60 }, { "name":
"Physics", "duration": 60 }, { "name": "Chemistry", "duration": 60 }, {
"name": "English", "duration": 45 } \] }

You can modify this file to change default subjects or durations.

------------------------------------------------------------------------

## 🚀 How To Install & Run

IMPORTANT: Since this project uses JSON (fetch), do NOT open with
double-click.

### Method 1: Using Python

1.  Open project folder in terminal.
2.  Run:

python -m http.server 8000

3.  Open browser:

http://localhost:8000

------------------------------------------------------------------------

### Method 2: Using VS Code

1.  Install Live Server extension.
2.  Right click index.html
3.  Click "Open with Live Server"

------------------------------------------------------------------------

## 🧠 How To Use

1.  Select one or multiple subjects.
2.  Click "Start Selected".
3.  Subjects run sequentially.
4.  Progress bar updates during each session.
5.  Alarm plays after each subject.
6.  Final alarm plays after full set completion.
7.  Attempted increases when session starts.
8.  Completed increases after full set finishes.
9.  Add new subject using name + duration fields.
10. Use reset button for daily fresh start.

------------------------------------------------------------------------

## 🔧 Technical Concepts Used

-   DOM manipulation
-   setInterval timer logic
-   Queue system using arrays
-   JSON data loading with fetch()
-   LocalStorage persistence
-   Dynamic HTML rendering
-   Progress bar calculations
-   Theme switching logic

------------------------------------------------------------------------

## 🛠 Challenges Faced

-   Fetch JSON not working without local server
-   Preventing timer overlap issues
-   Managing multi-subject queue transitions
-   Separating Attempted and Completed counters
-   Maintaining state after page refresh

------------------------------------------------------------------------

## 📈 Future Improvements

-   Export study history as CSV
-   Weekly / Monthly analytics chart
-   Custom alarm sound upload
-   Session notes per subject
-   Mobile responsive enhancement

------------------------------------------------------------------------

## 🎯 Purpose of This Project

This project was built to create a structured and motivating study
environment that feels modern and practical.

It demonstrates real-world JavaScript logic, JSON handling, state
management, and browser storage concepts in a clean productivity
application.

------------------------------------------------------------------------

Made with ❤️ by Genius
