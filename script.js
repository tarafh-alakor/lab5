
 // Sample data for the lab (not live or official NBA statistics).
const players = [
  {name:"LeBron James",team:"Los Angeles Lakers",position:"SF",games:70,ppg:25.7,rpg:7.3,apg:8.3},
  {name:"Stephen Curry",team:"Golden State Warriors",position:"PG",games:74,ppg:26.4,rpg:4.5,apg:5.1},
  {name:"Kevin Durant",team:"Phoenix Suns",position:"PF",games:75,ppg:27.1,rpg:6.6,apg:5.0},
  {name:"Jayson Tatum",team:"Boston Celtics",position:"SF",games:74,ppg:26.9,rpg:8.1,apg:4.9},
  {name:"Luka Doncic",team:"Dallas Mavericks",position:"PG",games:70,ppg:33.9,rpg:9.2,apg:9.8},
  {name:"Nikola Jokic",team:"Denver Nuggets",position:"C",games:79,ppg:26.4,rpg:12.4,apg:9.0},
  {name:"Giannis Antetokounmpo",team:"Milwaukee Bucks",position:"PF",games:73,ppg:30.4,rpg:11.5,apg:6.5},
  {name:"Joel Embiid",team:"Philadelphia 76ers",position:"C",games:39,ppg:34.7,rpg:11.0,apg:5.6},
  {name:"Anthony Edwards",team:"Minnesota Timberwolves",position:"SG",games:79,ppg:25.9,rpg:5.4,apg:5.1},
  {name:"Shai Gilgeous-Alexander",team:"Oklahoma City Thunder",position:"PG",games:75,ppg:30.1,rpg:5.5,apg:6.2},
  {name:"Devin Booker",team:"Phoenix Suns",position:"SG",games:68,ppg:27.1,rpg:4.5,apg:6.9},
  {name:"Jimmy Butler",team:"Miami Heat",position:"SF",games:60,ppg:20.8,rpg:5.3,apg:5.0},
  {name:"Bam Adebayo",team:"Miami Heat",position:"C",games:71,ppg:19.3,rpg:10.4,apg:3.9},
  {name:"Jaylen Brown",team:"Boston Celtics",position:"SG",games:70,ppg:23.0,rpg:5.5,apg:3.6},
  {name:"Anthony Davis",team:"Los Angeles Lakers",position:"PF",games:76,ppg:24.7,rpg:12.6,apg:3.5}
];

const tableBody = document.getElementById("playersTableBody");
const searchInput = document.getElementById("searchInput");
const teamFilter = document.getElementById("teamFilter");
const positionFilter = document.getElementById("positionFilter");
const darkModeToggle = document.getElementById("darkModeToggle");

// Create dropdown options from the player objects.
function populateFilters() {
  const teams = [...new Set(players.map(player => player.team))].sort();
  const positions = [...new Set(players.map(player => player.position))].sort();

  teams.forEach(team => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    teamFilter.appendChild(option);
  });

  positions.forEach(position => {
    const option = document.createElement("option");
    option.value = position;
    option.textContent = position;
    positionFilter.appendChild(option);
  });
}

// Create table rows using the DOM API.
function displayPlayers(list) {
  tableBody.innerHTML = "";

  list.forEach(player => {
    const row = document.createElement("tr");
    const values = [
      player.name,
      player.team,
      player.position,
      player.games,
      player.ppg,
      player.rpg,
      player.apg
    ];

    values.forEach((value, index) => {
      const cell = document.createElement("td");
      cell.textContent = value;

      if (index === 0) {
        cell.classList.add("player-name");
      }

      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  document.getElementById("totalPlayers").textContent = players.length;
  document.getElementById("shownPlayers").textContent = list.length;
  document.getElementById("shownTeams").textContent =
    new Set(list.map(player => player.team)).size;

  document.getElementById("emptyMessage").hidden = list.length !== 0;
}

// Search and both dropdown filters work together.
function filterPlayers() {
  const search = searchInput.value.toLowerCase().trim();
  const team = teamFilter.value;
  const position = positionFilter.value;

  const filtered = players.filter(player =>
    player.name.toLowerCase().includes(search) &&
    (team === "all" || player.team === team) &&
    (position === "all" || player.position === position)
  );

  displayPlayers(filtered);
}

searchInput.addEventListener("input", filterPlayers);
teamFilter.addEventListener("change", filterPlayers);
positionFilter.addEventListener("change", filterPlayers);

darkModeToggle.addEventListener("click", function() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  darkModeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
  darkModeToggle.setAttribute("aria-pressed", String(isDark));
});

// Event delegation: one listener handles all table rows.
tableBody.addEventListener("mouseover", function(event) {
  const row = event.target.closest("tr");

  if (row) {
    row.style.cursor = "default";
  }
});

populateFilters();
displayPlayers(players);
