var teams 	   = document.querySelectorAll('.teams');
var teamSubmit = document.querySelector('#submit');
var clear 	   = document.querySelector('.clear');

clear.addEventListener('click', function() {
	for (var i = 0; i < teams.length; i++) {
		if (!teams[i].classList.contains('select-reset')) {
			teams[i].value = teams[i].defaultValue;
		} else {
			teams[i].selectedIndex = 0;
		}
	}
});

submit.addEventListener('click', function() {
	document.querySelector('#output').value = teamCompile();
});

function teamCompile() {
	var team = '';
	for (var i = 0; i < teams.length; i++) {
		team += teams[i].value + ',';
	}
	return team.slice(0, -1);
}

$('.teams')
	.popup({
		on: 'hover'
	})
;