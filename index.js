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

function GetCurrentEvent(data) {
	let mainContainer = document.getElementById("srtQueryData");
	if (data.CurrentEvent == undefined)
	{
		return;
	}
	if (data.CurrentEvent == "")
	{
		mainContainer.innerHTML += `
		<div id="chapter">
			<div class="title">Current Event: </div><font color="#FF0000">Null</font>
		</div>`;
		return;
	}
	mainContainer.innerHTML += `
	<div id="chapter">
		<div class="title">Current Event: </div><font color="#00FF00">${data.CurrentEvent}</font>
	</div>`;
}

function getDA(data){
	let mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML += `
	<div id="da">
		<div class="title">DA Score: </div><font color="#00FF00">${data.RankScore}</font> 
	</div>`;
}

function appendData(data) {
	//console.log(data);
	var mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML = "";

	//if (data.VersionInfo == undefined || data.VersionInfo != "1.0.1.4") {
	//	mainContainer.innerHTML = `<font color="#FF0000">Outdated Version Please Update</font>`;
	//	return;
	//}

	//PLAYERS HP
	GetPlayerHP(data.PlayerCurrentHealth, data.PlayerMaxHealth, "Chris: ");
	GetPlayerHP(data.PlayerCurrentHealth2, data.PlayerMaxHealth2, "Sheva: ");

	//Money
	mainContainer.innerHTML += `
	<div id="da">
		<div class="title">Naira: </div><font color="#00FF00">${"₦ " + data.Money}</font>
		<div class="title">Chris Kills: </div><font color="#00FF00">${data.ChrisKills}</font>
		<div class="title">Sheva Kills: </div><font color="#00FF00">${data.ShevaKills}</font>
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
	
	//mainContainer.appendChild(table);
}
