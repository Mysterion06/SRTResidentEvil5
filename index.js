const JSON_ADDRESS = "127.0.0.1";
const JSON_PORT = 7190;
const POLLING_RATE = 333;

const JSON_ENDPOINT = `http://${JSON_ADDRESS}:${JSON_PORT}/`;

var Chapters = [
    {
      Accuracy: 70,
      Kills: 20,
      Deaths: 0,
      Time: 720
    },
    {
      Accuracy: 70,
      Kills: 15,
      Deaths: 0,
      Time: 780
    },
    {
      Accuracy: 70,
      Kills: 60,
      Deaths: 0,
      Time: 1380
    },
    {
      Accuracy: 70,
      Kills: 50,
      Deaths: 0,
      Time: 1320
    },
    {
      Accuracy: 70,
      Kills: 40,
      Deaths: 0,
      Time: 540
    },
    {
      Accuracy: 70,
      Kills: 30,
      Deaths: 0,
      Time: 1080
    },
    {
      Accuracy: 70,
      Kills: 50,
      Deaths: 0,
      Time: 1140
    },
    {
      Accuracy: 70,
      Kills: 30,
      Deaths: 0,
      Time: 1140
    },
    {
      Accuracy: 70,
      Kills: 50,
      Deaths: 0,
      Time: 1380
    },
    {
      Accuracy: 70,
      Kills: 35,
      Deaths: 0,
      Time: 960
    },
    {
      Accuracy: 70,
      Kills: 7,
      Deaths: 0,
      Time: 720
    },
    {
      Accuracy: 70,
      Kills: 40,
      Deaths: 0,
      Time: 1320
    },
    {
      Accuracy: 70,
      Kills: 30,
      Deaths: 0,
      Time: 2280
    },
    {
      Accuracy: 70,
      Kills: 40,
      Deaths: 0,
      Time: 1560
    },
    {
      Accuracy: 70,
      Kills: 35,
      Deaths: 0,
      Time: 1380
    },
    {
      Accuracy: 70,
      Kills: 25,
      Deaths: 0,
      Time: 1320
    }
];

window.onload = function () {
	getData();
	setInterval(getData, POLLING_RATE);
};

var Asc = function (a, b) {
	if (a > b) return +1;
	if (a < b) return -1;
	return 0;
};

var Desc = function (a, b) {
	if (a > b) return -1;
	if (a < b) return +1;
	return 0;
};



function getData() {
	fetch(JSON_ENDPOINT)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			appendData(data);
		})
		.catch(function (err) {
			console.log("Error: " + err);
		});
}

function GetPlayerHP(current, max, playerName) {
	let mainContainer = document.getElementById("srtQueryData");
	var hitPercent = (current / max) * 100;
	if (hitPercent > 66) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar fine" style="width:${hitPercent}%">
				<div id="currenthp">${playerName}${current} / ${max}</div><div class="green" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent <= 66 && hitPercent > 33) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar caution" style="width:${hitPercent}%">
				<div id="currenthp">${playerName}${current} / ${max}</div><div class="yellow" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent <= 33 && hitPercent > 0){
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar danger" style="width:${hitPercent}%">
				<div id="currenthp">${playerName}${current} / ${max}</div><div class="red" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar dead" style="width:${100}%">
				<div id="currenthp">${playerName}${current} / ${max}</div><div class="grey" id="percenthp">${0}%</div></div></div>`;
	}
}

function GetNeededKills(data){
	switch(data.Chapter){
		case 0:
			return "20";
		case 1:
			return "15";
		case 2:
			return "60";
		case 3:
			return "50";
		case 4:
			return "40";
		case 5:
			return "30";
		case 6:
			return "50";
		case 7:
			return "30";
		case 8:
			return "50";
		case 9:
			return "35";
		case 10:
			return "7";
		case 11:
			return "40";
		case 12:
			return "30";
		case 13:
			return "40";
		case 14:
			return "35";
		case 15:
			return "25";
		default:
			return "None";
	}
}

function GetSRank(chapter, enemiesHit, shotsFired, kills, deaths, time){
	var accuracy = enemiesHit / shotsFired * 100;
	if (accuracy >= Chapters[chapter].Accuracy && kills >= Chapters[chapter].Kills && deaths == Chapters[chapter].Deaths && time <= Chapters[chapter].Time) {
		return "S";
	}
	else {
		return "No S";
	}
}

function appendData(data) {
	//console.log(data);
	var mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML = "";

	//PLAYERS HP
	GetPlayerHP(data.PlayerCurrentHealth, data.PlayerMaxHealth, "P1: ");
	GetPlayerHP(data.PlayerCurrentHealth2, data.PlayerMaxHealth2, "P2: ");

	//Money, Killcount
	mainContainer.innerHTML += `
	<div id="Money">
		<div class="title">Naira: </div><font color="#00FF00">${"₦ " + data.Money}</font>
		<div class="title">P1 Kills: </div><font color="#00FF00">${data.ChrisKills} | ${GetNeededKills(data)} | ${GetSRank(data.Chapter, data.EnemiesHits, data.ShotsFired, data.Deaths, data.IGT, data.ChrisKills)}</font>
		<div class="title">P2 Kills: </div><font color="#00FF00">${data.ShevaKills} | ${GetNeededKills(data)} | ${GetSRank(data.Chapter, data.EnemiesHits2, data.ShotsFired2, data.Deaths, data.IGT2, data.ShevaKills)}</font>
	</div>`;

	//Chris DA
	mainContainer.innerHTML += `
	<div id="DAChris">
		<div class="title">P1 DA: </div><font color="#00FF00">${data.ChrisDA}</font>
		<div class="title">Rank: </div><font color="#00FF00">${data.ChrisDARank}</font>
	</div>`;

	//Sheva DA
	mainContainer.innerHTML += `
	<div id="DASheva">
		<div class="title">P2 DA: </div><font color="#00FF00">${data.ShevaDA}</font>
		<div class="title">Rank: </div><font color="#00FF00">${data.ShevaDARank}</font>
	</div>`;

	//SRTVersion
	mainContainer.innerHTML += `
	<div id="SRTVersion">
		<div class="title">TV: </div><font color="#00FF00">${data.VersionInfo}</font>
	</div>`;

	//GameVersion
	mainContainer.innerHTML += `
	<div id="GameVersion">
		<div class="title">GV: </div><font color="#00FF00">${data.GameInfo}</font>
	</div>`; 

	//var table = document.createElement("table");
	var filterdEnemies = data.EnemyHealth.filter(m => { return (m.IsAlive) });
	
	//console.log("Filtered Enemies", filterdEnemies);
	filterdEnemies.sort(function (a, b) {
		return Asc(a.Percentage, b.Percentage) || Desc(a.CurrentHP, b.CurrentHP);
	}).forEach(function (item, index, arr) {
		if (item.IsAlive) {
			mainContainer.innerHTML += `<div class="enemyhp"><div class="enemyhpbar danger" style="width:${(item.Percentage * 100).toFixed(1)}%">
			<div id="currentenemyhp">${item.CurrentHP}</div><div class="red" id="percentenemyhp">${(item.Percentage * 100).toFixed(1)}%</div></div></div>`;
		}
	});

	//Functions(data)
	GetNeededKills(data);
	GetSRank(data);
}
