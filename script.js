// ===== Lucky Number App =====

const nameInput = document.getElementById("name");
const dobInput = document.getElementById("dob");

const calculateBtn = document.getElementById("calculateBtn");

const luckyNumber = document.getElementById("luckyNumber");
const luckyColor = document.getElementById("luckyColor");
const luckyDay = document.getElementById("luckyDay");
const luckyTime = document.getElementById("luckyTime");

const meaning = document.getElementById("meaning");
const advice = document.getElementById("advice");

const resultCard = document.getElementById("resultCard");
const remedyCard = document.getElementById("remedyCard");

const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "White",
    "Orange",
    "Purple",
    "Pink",
    "Golden"
];

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday"
];

const meanings = [
    "",
    "Leadership and confidence.",
    "Cooperation and balance.",
    "Creativity and communication.",
    "Hard work and stability.",
    "Freedom and adventure.",
    "Family and responsibility.",
    "Knowledge and spirituality.",
    "Success and achievement.",
    "Humanity and compassion."
];

calculateBtn.addEventListener("click", generateReport);

function generateReport() {

    const dob = dobInput.value;

    if (!dob) {
        alert("Please select your Date of Birth.");
        return;
    }

    let total = 0;

    dob.replaceAll("-", "")
       .split("")
       .forEach(num => total += Number(num));

    while (total > 9) {

        total = total
            .toString()
            .split("")
            .reduce((a,b)=>a+Number(b),0);
    }

    luckyNumber.innerHTML = total;

    luckyColor.innerHTML = colors[total-1];

    luckyDay.innerHTML = days[total-1];

    luckyTime.innerHTML = `${6+total}:00 AM`;

    meaning.innerHTML = meanings[total];

    advice.innerHTML =
        "Believe in yourself and stay positive today.";

    resultCard.classList.remove("hidden");

    remedyCard.classList.remove("hidden");

    saveHistory();
}
// ===== History =====

const historyList = document.getElementById("historyList");

function saveHistory() {

    const report = {
        name: nameInput.value || "Unknown",
        date: dobInput.value,
        lucky: luckyNumber.innerText,
        color: luckyColor.innerText,
        day: luckyDay.innerText
    };

    let history =
        JSON.parse(localStorage.getItem("luckyHistory")) || [];

    history.unshift(report);

    localStorage.setItem(
        "luckyHistory",
        JSON.stringify(history)
    );

    loadHistory();
}

function loadHistory() {

    let history =
        JSON.parse(localStorage.getItem("luckyHistory")) || [];

    historyList.innerHTML = "";

    if(history.length===0){

        historyList.innerHTML="<p>No Reports Yet.</p>";

        return;

    }

    history.forEach(item=>{

        historyList.innerHTML += `
        <div class="history-item">
            <strong>${item.name}</strong><br>
            Lucky Number : ${item.lucky}<br>
            Color : ${item.color}<br>
            Day : ${item.day}
        </div>
        `;

    });

}

loadHistory();


// =====
