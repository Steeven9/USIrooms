const roomsData = {
  black: ["SI-003", "SI-004", "SI-006", "SI-007", "SI-008", "SI-013", "SI-015"],
  east: [
    "C1.03",
    "C1.04",
    "C1.05",
    "D0.02",
    "D0.03",
    "D1.13",
    "D1.14",
    "D1.15",
  ],
  east2: [
    "D2.19",
    "D2.21",
    "D3.01",
    "D3.03",
    "D4.01",
    "D4.08",
    "D5.01",
    "D5.03",
  ],
  red: [
    "A11",
    "A12",
    "A13",
    "A14",
    "A21",
    "A22",
    "A23",
    "A24",
    "A31",
    "A32",
    "A33",
    "A34",
  ],
  main: ["250", "251", "253", "254", "354", "355"],
};

const makeRoomMarkup = (rooms, sizes) => {
  return rooms.map((room, i) =>
    `<div class="room room-${sizes ? sizes[i] : "small"}" id="${room}">
      <a href="#schedule-${room}">
        <h3>${room}</h3>
        <p>???</p>
      </a>
    </div>
    `).reduce((acc, x) => acc + x, "");

}

const roomsMarkup = {
  black: makeRoomMarkup(
    roomsData.black,
    ["big", "small", "small", "big", "small", "small", "big"],
  ),
  east: makeRoomMarkup(
    roomsData.east,
    ["big", "big", "big", "big", "small", "small", "small", "small"],
  ),
  east2: makeRoomMarkup(
    roomsData.east2,
    null,
  ),
  main: makeRoomMarkup(
    roomsData.main,
    null,
  ),
  red: makeRoomMarkup(
    roomsData.red,
    null,
  ),
};

export { roomsData, roomsMarkup };
