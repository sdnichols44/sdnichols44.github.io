var drivers 	 = document.querySelectorAll('.drivers');
var driverSubmit = document.querySelector('#submit');
var driverOutput = document.querySelector('#output');
var clear 		 = document.querySelector('.clear');

driverSubmit.addEventListener('click', function() {
	driverOutput.value = driverCompile();
});

clear.addEventListener('click', function() {
	for (var i = 0; i < drivers.length; i++) {
		if (drivers[i].classList.contains('select-reset')) {
			drivers[i].selectedIndex = 0;
		} else {
			drivers[i].value = drivers[i].defaultValue;
		}
	}
})

function driverCompile() {
	var driverString = '';
	for (var i = 0; i < drivers.length; i++) {
		if (drivers[i].classList.contains('dob')) {
			var oldDate = drivers[i].value;
			var newDate = oldDate[8] + oldDate[9] + '/' + oldDate[5] + oldDate[6] + '/' + oldDate[0] + oldDate[1] + oldDate[2] + oldDate[3] + ',';
			driverString += newDate;
		} else if (drivers[i].classList.contains('autocalc')) {
			driverString += autoCalcStarRating() + ','; 
		} else {
			driverString += drivers[i].value + ',';
		}
	}
	return driverString.slice(0, -1);
}

function autoCalcStarRating() {
	var baseStat = document.querySelectorAll('.base-stat');
	var total = 0;
	for (var i = 0; i < baseStat.length; i++) {
		total += Number(baseStat[i].value);
	}
	return total / 180 * 5;
}

// Semantic UI Activators
$('.drivers')
	.popup({
		on: 'hover'
	})
;