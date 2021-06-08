const JSON_ADDRESS = "127.0.0.1";
const JSON_PORT = 7190;
const POLLING_RATE = 333;

const JSON_ENDPOINT = `http://${JSON_ADDRESS}:${JSON_PORT}/`;

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

function GetSRank(data){
	var accuracy = data.EnemiesHit / data.ShotsFired * 100;
	switch(data.Chapter){
		case 0: // Chapter 1-1
			if(accuracy >= 70 && data.ChrisKills >= 20 && data.Deaths == 0 && data.IGT <= 720){
				return "S";
			} else{
				return "No S";
			}
		case 1:
			if(accuracy >= 70 && data.ChrisKills >= 15 && data.Deaths == 0 && data.IGT <= 780){
				return "S";
			} else{
				return "No S";
			}
		case 2: // Chapter 2-1
			if(accuracy >= 70 && data.ChrisKills >= 60 && data.Deaths == 0 && data.IGT <= 1380){
				return "S";
			} else{
				return "No S";
			}
		case 3:
			if(accuracy >= 70 && data.ChrisKills >= 50 && data.Deaths == 0 && data.IGT <= 1320){
				return "S";
			} else{
				return "No S";
			}
		case 4:
			if(accuracy >= 70 && data.ChrisKills >= 40 && data.Deaths == 0 && data.IGT <= 540){
				return "S";
			} else{
				return "No S";
			}
		case 5: // Chapter 3-1
			if(accuracy >= 70 && data.ChrisKills >= 30 && data.Deaths == 0 && data.IGT <= 1080){
				return "S";
			} else{
				return "No S";
			}
		case 6:
			if(accuracy >= 70 && data.ChrisKills >= 50 && data.Deaths == 0 && data.IGT <= 1140){
				return "S";
			} else{
				return "No S";
			}
		case 7:
			if(accuracy >= 70 && data.ChrisKills >= 30 && data.Deaths == 0 && data.IGT <= 1140){
				return "S";
			} else{
				return "No S";
			}
		case 8: // Chatper 4-1
			if(accuracy >= 70 && data.ChrisKills >= 50 && data.Deaths == 0 && data.IGT <= 1380){
				return "S";
			} else{
				return "No S";
			}
		case 9:
			if(accuracy >= 70 && data.ChrisKills >= 35 && data.Deaths == 0 && data.IGT <= 960){
				return "S";
			} else{
				return "No S";
			}
		case 10: // Chapter 5-1
			if(accuracy >= 70 && data.ChrisKills >= 7 && data.Deaths == 0 && data.IGT <= 720){
				return "S";
			} else{
				return "No S";
			}
		case 11:
			if(accuracy >= 70 && data.ChrisKills >= 40 && data.Deaths == 0 && data.IGT <= 1320){
				return "S";
			} else{
				return "No S";
			}
		case 12:
			if(accuracy >= 70 && data.ChrisKills >= 30 && data.Deaths == 0 && data.IGT <= 2280){
				return "S";
			} else{
				return "No S";
			}
		case 13: // Chapter  6-1
			if(accuracy >= 70 && data.ChrisKills >= 40 && data.Deaths == 0 && data.IGT <= 1560){
				return "S";
			} else{
				return "No S";
			}
		case 14:
			if(accuracy >= 70 && data.ChrisKills >= 35 && data.Deaths == 0 && data.IGT <= 1380){
				return "S";
			} else{
				return "No S";
			}
		case 15:
			if(accuracy >= 70 && data.ChrisKills >= 25 && data.Deaths == 0 && data.IGT <= 1320){
				return "S";
			} else{
				return "No S";
			}
		default:
			return "Not in a Chapter";
	}
}

function GetSRank2(data){
	var accuracy = data.EnemiesHit2 / data.ShotsFired2 * 100;
	switch(data.Chapter){
		case 0: // Chapter 1-1
			if(accuracy >= 70 && data.ShevaKills >= 20 && data.Deaths2 == 0 && data.IGT2 <= 720){
				return "S";
			} else{
				return "No S";
			}
		case 1:
			if(accuracy >= 70 && data.ShevaKills >= 15 && data.Deaths2 == 0 && data.IGT2 <= 780){
				return "S";
			} else{
				return "No S";
			}
		case 2: // Chapter 2-1
			if(accuracy >= 70 && data.ShevaKills >= 60 && data.Deaths2 == 0 && data.IGT2 <= 1380){
				return "S";
			} else{
				return "No S";
			}
		case 3:
			if(accuracy >= 70 && data.ShevaKills >= 50 && data.Deaths2 == 0 && data.IGT2 <= 1320){
				return "S";
			} else{
				return "No S";
			}
		case 4:
			if(accuracy >= 70 && data.ShevaKills >= 40 && data.Deaths2 == 0 && data.IGT2 <= 540){
				return "S";
			} else{
				return "No S";
			}
		case 5: // Chapter 3-1
			if(accuracy >= 70 && data.ShevaKills >= 30 && data.Deaths2 == 0 && data.IGT2 <= 1080){
				return "S";
			} else{
				return "No S";
			}
		case 6:
			if(accuracy >= 70 && data.ShevaKills >= 50 && data.Deaths2 == 0 && data.IGT2 <= 1140){
				return "S";
			} else{
				return "No S";
			}
		case 7:
			if(accuracy >= 70 && data.ShevaKills >= 30 && data.Deaths2 == 0 && data.IGT2 <= 1140){
				return "S";
			} else{
				return "No S";
			}
		case 8: // Chatper 4-1
			if(accuracy >= 70 && data.ShevaKills >= 50 && data.Deaths2 == 0 && data.IGT2 <= 1380){
				return "S";
			} else{
				return "No S";
			}
		case 9:
			if(accuracy >= 70 && data.ShevaKills >= 35 && data.Deaths2 == 0 && data.IGT2 <= 960){
				return "S";
			} else{
				return "No S";
			}
		case 10: // Chapter 5-1
			if(accuracy >= 70 && data.ShevaKills >= 7 && data.Deaths2 == 0 && data.IGT2 <= 720){
				return "S";
			} else{
				return "No S";
			}
		case 11:
			if(accuracy >= 70 && data.ShevaKills >= 40 && data.Deaths2 == 0 && data.IGT2 <= 1320){
				return "S";
			} else{
				return "No S";
			}
		case 12:
			if(accuracy >= 70 && data.ShevaKills >= 30 && data.Deaths2 == 0 && data.IGT2 <= 2280){
				return "S";
			} else{
				return "No S";
			}
		case 13: // Chapter  6-1
			if(accuracy >= 70 && data.ShevaKills >= 40 && data.Deaths2 == 0 && data.IGT2 <= 1560){
				return "S";
			} else{
				return "No S";
			}
		case 14:
			if(accuracy >= 70 && data.ShevaKills >= 35 && data.Deaths2 == 0 && data.IGT2 <= 1380){
				return "S";
			} else{
				return "No S";
			}
		case 15:
			if(accuracy >= 70 && data.ShevaKills >= 25 && data.Deaths2 == 0 && data.IGT2 <= 1320){
				return "S";
			} else{
				return "No S";
			}
		default:
			return "Not in a Chapter";
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
		<div class="title">P1 Kills: </div><font color="#00FF00">${data.ChrisKills} | ${GetNeededKills(data)} | ${GetSRank(data)}</font>
		<div class="title">P1 Kills: </div><font color="#00FF00">${data.ShevaKills} | ${GetNeededKills(data)} | ${GetSRank2(data)}</font>
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
