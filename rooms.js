const roomsData = {
  black: ["SI-003", "SI-004", "SI-006", "SI-007", "SI-008", "SI-013", "SI-015"],
  east: [
    "D1.13",
    "D1.14",
    "D1.15",
    "C1.03",
    "C1.04",
    "C1.05",
    "D0.02",
    "D0.03",
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

const roomsMarkup = {
  black: `<div class="room room-big" id="SI-003">
      <a href="#schedule-SI-003">
        <h3>SI-003</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="SI-015">
      <a href="#schedule-SI-015">
        <h3>SI-015</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="SI-004">
      <a href="#schedule-SI-004">
        <h3>SI-004</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-big" id="SI-006">
      <a href="#schedule-SI-006">
        <h3>SI-006</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="SI-013">
      <a href="#schedule-SI-013">
        <h3>SI-013</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="SI-007">
      <a href="#schedule-SI-007">
        <h3>SI-007</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-big room" id="SI-008">
      <a href="#schedule-SI-008">
        <h3>SI-008</h3>
        <p>???</p>
      </a>
    </div>`,
  east: `<div class="room room-small" id="D1.13">
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
    <div class="room room-small" id="C1.03">
      <a href="#schedule-C1.03">
        <h3>C1.03</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="C1.04">
      <a href="#schedule-C1.04">
        <h3>C1.04</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-big" id="C1.05">
      <a href="#schedule-C1.05">
        <h3>C1.05</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="D0.02">
      <a href="#schedule-D0.02">
        <h3>D0.02</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="D0.03">
      <a href="#schedule-D0.03">
        <h3>D0.03</h3>
        <p>???</p>
      </a>
    </div>`,
  red: `<div class="room room-small" id="A11">
      <a href="#schedule-A11">
        <h3>A11</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="A12">
      <a href="#schedule-A12">
        <h3>A12</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="A13">
      <a href="#schedule-A13">
        <h3>A13</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="A14">
      <a href="#schedule-A14">
        <h3>A14</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="A21">
      <a href="#schedule-A21">
        <h3>A21</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="A22">
      <a href="#schedule-A22">
        <h3>A22</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="A23">
      <a href="#schedule-A23">
        <h3>A23</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="A24">
      <a href="#schedule-A24">
        <h3>A24</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="A31">
      <a href="#schedule-A31">
        <h3>A31</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="A32">
      <a href="#schedule-A32">
        <h3>A32</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="A33">
      <a href="#schedule-A33">
        <h3>A33</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="A34">
      <a href="#schedule-A34">
        <h3>A34</h3>
        <p>???</p>
      </a>
    </div>`,
  main: `<div class="room room-small" id="250">
      <a href="#schedule-250">
        <h3>250</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="251">
      <a href="#schedule-251">
        <h3>251</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="253">
      <a href="#schedule-253">
        <h3>253</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="254">
      <a href="#schedule-254">
        <h3>254</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="354">
      <a href="#schedule-354">
        <h3>354</h3>
        <p>???</p>
      </a>
    </div>
    <div class="room room-small" id="355">
      <a href="#schedule-355">
        <h3>355</h3>
        <p>???</p>
      </a>
    </div>`,
};

export { roomsData, roomsMarkup };
