// vim: set ts=2 sw=2 et tw=80:

// Real code

const URL = 'https://usirooms.maggioni.xyz/schedule.html?name=';
const NOW = new Date();

const timeTable = {};

function roomStatus(room, callback) {
  return new Promise((resolve, _) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xhr.responseText, 'text/html');
      const lessons =
        doc.querySelectorAll('table.rsContentTable div.rsAptSimple');
      const parsed = [];

      for (let lesson of lessons) {
        const time = lesson.querySelector('span[id$=lblOrario]');
        const start = new Date();
        start.setHours(parseInt(time.innerText.substring(1,3)));
        start.setMinutes(parseInt(time.innerText.substring(4,6)));
        start.setSeconds(0);

        const end = new Date();
        end.setHours(parseInt(time.innerText.substring(7,9)));
        end.setMinutes(parseInt(time.innerText.substring(10,12)));
        end.setSeconds(0);

        parsed.push({
          title: lesson.getAttribute('title'),
          start: start,
          end: end
        });
      }

      resolve(parsed);
    });
    xhr.open('GET', URL + room);
    xhr.send();
  });
}

const ROOMS = [
  'SI-003',
  'SI-015',
  'SI-004',
  'SI-006',
  'SI-013',
  'SI-007',
  'SI-008',
];

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
    }

    return twoDigits(date.getHours()) + ':' +
        twoDigits(date.getMinutes());
}

function colorRoom(roomTitle, node, time = NOW /* QuantumLeap */) {
    const data = timeTable[roomTitle];
    if (data == undefined) {
        return
    }

    const currentLecture = data.filter(d => d.start < time && d.end > time)[0];
    const isFree = currentLecture === void(0);
    const block = document.getElementById(roomTitle);

    block.className = block.className.replace(" room-in-use", "")
        .replace(" room-free", "");
    block.className += isFree ? " room-free" : " room-in-use";

    block.querySelector('p').innerHTML = isFree ? 'Free' :
        currentLecture.title + "<br> (" + formatTime(currentLecture.start) + " - " +
        formatTime(currentLecture.end) + ")";
}

async function buildRoomMarkup(roomTitle) {
    const data = await roomStatus(roomTitle);
    const room = getRoomNode();
    const title = room.querySelector('.room-title');
    title.innerHTML = roomTitle;
    title.id = "schedule-" + roomTitle;
    const list = room.querySelector('.list');

    for (const d of data) {
        const slot = document.importNode(SLOT_TEMPLATE.content, true);
        const title = slot.querySelector('.title');
        title.innerHTML = d.title;
        const start = slot.querySelector('.start');
        start.innerHTML = formatTime(d.start);
        const end = slot.querySelector('.end');
        end.innerHTML = formatTime(d.end);
        list.appendChild(slot);
    }

    timeTable[roomTitle] = data;
    colorRoom(roomTitle, room);

    if (data.length == 0) {
        list.appendChild(document.importNode(FREE_SLOT_TEMPLATE.content, true));
    }

    ROOM_LIST.appendChild(room);
}

function setTimePreview(date) {
    const timePreview = document.getElementById('timepreviewer');
    timePreview.innerText = "Time: " + formatTime(date);
}

function setupTimeMachine() {
    const slider = document.getElementById('timemachine');
    slider.min = 0;
    // Remaining minutes until 23:59
    // 24 * 60 - [current hours * 60] - [current minutes] - [1 min to midnight]
    slider.max = 1440 - (NOW.getHours() * 60) - NOW.getMinutes() - 1;

    slider.addEventListener("input", (e) => {
        const hours = Math.floor(slider.value / 60);
        const mins = slider.value % 60;

        let newDate = new Date();
        newDate.setHours(newDate.getHours() + hours);
        newDate.setMinutes(newDate.getMinutes() + mins);
        const node = getRoomNode();

        setTimePreview(newDate)

        ROOMS.forEach((roomTitle) => {
            colorRoom(roomTitle, node, newDate);
        });
    });

    // 10 mins into the future by default
    slider.value = 10;
    setTimePreview(new Date(NOW.getTime() + 600000));
}

(async function() {
for (const room of ROOMS) {
    await buildRoomMarkup(room);
}
})()

setupTimeMachine();
