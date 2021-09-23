// vim: set ts=2 sw=2 et tw=80:

// Real code

const URL = "https://usirooms.maggioni.xyz/schedule.html?name=";
const NOW = new Date();
const timeTable = {};
let ROOMS;

function roomStatus(room, callback) {
  return new Promise((resolve, _) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xhr.responseText, "text/html");
      const lessons = doc.querySelectorAll(
        "table.rsContentTable div.rsAptSimple"
      );
      const parsed = [];

      for (let lesson of lessons) {
        const time = lesson.querySelector("span[id$=lblOrario]");
        const start = new Date();
        start.setHours(parseInt(time.innerText.substring(1, 3)));
        start.setMinutes(parseInt(time.innerText.substring(4, 6)));
        start.setSeconds(0);

        const end = new Date();
        end.setHours(parseInt(time.innerText.substring(7, 9)));
        end.setMinutes(parseInt(time.innerText.substring(10, 12)));
        end.setSeconds(0);

        parsed.push({
          title: lesson.getAttribute("title").trim(),
          start: start,
          end: end,
        });
      }

      let start = new Date();
      start.setHours(0);
      start.setMinutes(0);
      start.setSeconds(0);

      let s = start;

      let end = new Date();
      end.setHours(23);
      end.setMinutes(59);
      end.setSeconds(0);

      const holes = [];
      for (let i = 0; i <= parsed.length; i++) {
        const time = i == parsed.length ? end : parsed[i].start;
        if (time > s) {
          holes.push({ title: "Unassigned", start: s, end: time });
        }
        if (time != end) {
          s = parsed[i].end;
        }
      }

      parsed.push(...holes);

      resolve(parsed);
    });
    xhr.open("GET", URL + room);
    xhr.send();
  });
}

const ROOMS_SI = [
  "SI-003",
  "SI-004",
  "SI-006",
  "SI-007",
  "SI-008",
  "SI-013",
  "SI-015",
];

const ROOMS_EAST = ["D1.13", "D1.14", "D1.15"];

const ROOM_LIST = document.querySelector(".times");
const ROOM_TEMPLATE = document.getElementById("room");
const SLOT_TEMPLATE = document.getElementById("time-slot");
const FREE_SLOT_TEMPLATE = document.getElementById("time-free");

function getRoomNode() {
  return document.importNode(ROOM_TEMPLATE.content, true);
}

function formatTime(date) {
  const twoDigits = (n) => {
    return n < 10 ? "0" + n : n;
  };

  return twoDigits(date.getHours()) + ":" + twoDigits(date.getMinutes());
}

function colorRoom(roomTitle, node, time = NOW /* QuantumLeap */) {
  const data = timeTable[roomTitle];
  if (data == undefined) {
    return;
  }

  const currentLecture =
    data.filter((d) => d.start < time && d.end > time)[0] || null;
  const isFree =
    !!currentLecture &&
    !!currentLecture.title &&
    currentLecture.title === "Overflow";
  const block = document.getElementById(roomTitle);

  block.className = block.className
    .replace(" room-in-use", "")
    .replace(" room-free", "")
    .replace(" room-unassigned", "");
  block.className += isFree
    ? " room-free"
    : currentLecture.title === "Unassigned"
    ? " room-unassigned"
    : " room-in-use";

  const title = isFree ? "Free (overflow)" : currentLecture.title;

  block.querySelector("p").innerHTML =
    title +
    "<br> (" +
    formatTime(currentLecture.start) +
    " - " +
    formatTime(currentLecture.end) +
    ")";
}

async function buildRoomMarkup(roomTitle) {
  const data = await roomStatus(roomTitle);
  const room = getRoomNode();
  const title = room.querySelector(".room-title");
  title.innerHTML = roomTitle;
  title.id = "schedule-" + roomTitle;
  const list = room.querySelector(".list");

  for (const d of data) {
    if (d.title === "Unassigned" || d.title === "Overflow") continue;
    const slot = document.importNode(SLOT_TEMPLATE.content, true);
    const title = slot.querySelector(".title");
    title.innerHTML = d.title;
    const start = slot.querySelector(".start");
    start.innerHTML = formatTime(d.start);
    const end = slot.querySelector(".end");
    end.innerHTML = formatTime(d.end);
    list.appendChild(slot);
  }

  timeTable[roomTitle] = data;
  colorRoom(roomTitle, room);

  if (data.length == 0) {
    list.appendChild(document.importNode(FREE_SLOT_TEMPLATE.content, true));
  }

  return room;
}

function setTimePreview(date) {
  const timePreview = document.getElementById("timepreviewer");
  timePreview.innerText = "Time: " + formatTime(date);
}

function setupTimeMachine() {
  const slider = document.getElementById("timemachine");
  slider.min = 8 * 60 + 30;
  slider.max = 19 * 60 + 30;

  slider.addEventListener("input", (e) => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(slider.value);
    const node = getRoomNode();

    setTimePreview(date);

    ROOMS.forEach((roomTitle) => {
      colorRoom(roomTitle, node, date);
    });
  });

  const date = new Date();
  const mins = date.getHours() * 60 + date.getMinutes();
  slider.value =
    mins < slider.min ? slider.min : mins > slider.max ? slider.max : mins;
  setTimePreview(date);
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has("east")) {
  ROOMS = ROOMS_EAST;
  document
    .querySelectorAll(".navLink")
    .forEach((el) => el.classList.toggle("active"));

  document.querySelector(".room-map").innerHTML = `
    <div class="room room-small" id="D1.13">
      <a href="#schedule-D1.13">
        <h3>D1.13</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="D1.14">
      <a href="#schedule-D1.14">
        <h3>D1.14</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-big" id="D1.15">
      <a href="#schedule-D1.15">
        <h3>D1.15</h3>
        <p>???</p>
      </a>
    </div>
  `;
} else {
  ROOMS = ROOMS_SI;
}

// Thanks to Andrea Gallidabino and his mastery checks for this
Promise.all(ROOMS.map(buildRoomMarkup))
  .then((rooms) => {
    for (const room of rooms) {
      ROOM_LIST.appendChild(room);
    }
  })
  .catch(console.error);

setupTimeMachine();
