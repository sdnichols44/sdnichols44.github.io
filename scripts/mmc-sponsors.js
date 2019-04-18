var sponsors 	  = document.querySelectorAll('.sponsors');
var sponsorSubmit = document.querySelector('#submit');
var clear 		  = document.querySelector('.clear');

sponsorSubmit.addEventListener('click', function() {
	document.querySelector('#output').value = sponsorCompile();
});

// Clear all fields
clear.addEventListener('click', function() {
	for (var i = 0; i < sponsors.length; i++) {
		if (!sponsors[i].classList.contains('nil')) {
			sponsors[i].value = '';
		} else {
			sponsors[i].value = '0';
		}
	}
});

// Build Sponsor String
function sponsorCompile() {
	var sponsorString = '';
	for (var i = 0; i < sponsors.length; i++) {
		if (sponsors[i].value !== '') {
			sponsorString += sponsors[i].value + ',';
		} else if (sponsors[i].name === 'sponsor-deal-total' || sponsors[i].name === 'sponsor-deal-value') {
			var upfrontPayment = Number(document.querySelector('input[name="sponsor-upfront"]').value);
			var bonusAmount = Number(document.querySelector('input[name="sponsor-bonus-amount"]').value);
			var perRacePayment = Number(document.querySelector('input[name="sponsor-per-race"]').value);
			var dealLength = Number(document.querySelector('input[name="sponsor-deal-length"]').value);
			if (sponsors[i].name === 'sponsor-deal-total') {
				value = upfrontPayment + ((bonusAmount + perRacePayment) * dealLength);
				sponsorString += value + ',';
			} else {
				value = (upfrontPayment / dealLength) + (bonusAmount + perRacePayment);
				sponsorString += value + ',';
			}
		} else if (sponsors[i].classList.contains('autonum')) {
			value = Math.floor(Math.random() * 2);
			sponsorString += value + ',';
		} else {
			sponsorString += ',';
		}
	}
	return sponsorString.slice(0, -1);
}

// Semantic UI Activators
$('.sponsors')
	.popup({
		on: 'hover'
	})
;