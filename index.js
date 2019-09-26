// vim: set ts=2 sw=2 et tw=80:

const URL = 'http://atelier.inf.usi.ch/~maggicl/proxy.php?url=https://aule.usi.ch/aule/View.aspx?name=';

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
  'SI-004',
  'SI-005',
  'SI-006',
  'SI-007',
  'SI-008',
  'SI-013',
  'SI-015'
];

const ROOM_LIST = document.querySelector(".times");
const ROOM_TEMPLATE = document.getElementById("room");
const SLOT_TEMPLATE = document.getElementById("time-slot");
const FREE_SLOT_TEMPLATE = document.getElementById("time-free");


function formatTime(date) {
  return (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' +
    (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
}

async function buildRoomMarkup(roomTitle) {
  const data = await roomStatus(roomTitle);
  const room = document.importNode(ROOM_TEMPLATE.content, true);
  const title = room.querySelector('.room-title');
  title.innerHTML = roomTitle;
  const list = room.querySelector('.list');

  for (const d of data) {
    const slot = document.importNode(SLOT_TEMPLATE.content, true);
    const title = slot.querySelector('.title');
    document.getElementById("room");title.innerHTML = d.title;
    const start = slot.querySelector('.start');
    start.innerHTML = formatTime(d.start);
    const end = slot.querySelector('.end');
    end.innerHTML = formatTime(d.end);
    list.appendChild(slot);
  }

  if (data.length == 0) {
    list.appendChild(document.importNode(FREE_SLOT_TEMPLATE.content, true));
  }

  ROOM_LIST.appendChild(room);
}

(async function() {
for (const room of ROOMS) {
  await buildRoomMarkup(room);
}
})()
