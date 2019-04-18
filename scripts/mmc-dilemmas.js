var sectionArray			  = [
	document.querySelectorAll('.dilemma-header'),
	document.querySelectorAll('.dilemma-body'),
	document.querySelectorAll('.dilemma-first-button'),
	document.querySelectorAll('.dilemma-second-button'),
	document.querySelectorAll('.dilemma-third-button')
	];
var outputArray				  = [
	document.querySelector('#header-output'),
	document.querySelector('#body-output'),
	document.querySelector('#first-button-output'),
	document.querySelector('#second-button-output'),
	document.querySelector('#third-button-output')
	]
var submitAll				  = document.querySelectorAll('.textarea-submit')
var clearAll				  = document.querySelectorAll('.textarea-clear')
var dilemmaHeader 			  = document.querySelectorAll('.dilemma-header');
var dilemmaBody 			  = document.querySelectorAll('.dilemma-body');
var dilemmaFirstButton 		  = document.querySelectorAll('.dilemma-first-button');
var dilemmaSecondButton 	  = document.querySelectorAll('.dilemma-second-button');
var dilemmaThirdButton 		  = document.querySelectorAll('.dilemma-third-button');

for (let i = 0; i < submitAll.length; i++) {
	submitAll[i].addEventListener('click', function() {
		outputArray[i].value = dilemmaCompile(sectionArray[i]);
	});
	clearAll[i].addEventListener('click', function() {
		dilemmaClear(sectionArray[i]);
		outputArray[i].value = '';
	});
}

function dilemmaClear(section) {
	for (var i = 0; i < section.length; i++) {
		if (section[i].classList.contains('select-reset')) {
			section[i].selectedIndex = 0;
		} else {
			section[i].value = section[i].defaultValue;
		}
	}
}

function dilemmaCompile(section) {
	var dilemmaString = '';
	var localisationText = '';
	for (var i = 0; i < section.length; i++) {
		if (section[i].value !== '0' && section[i].value !== '') {
			if (section[i].classList.contains('localisation-default')) {
				localisationText += section[i].value;
			}
			if (section[i].classList.contains('dilemma-header')) {
			dilemmaBody[2].value = dilemmaHeader[6].value;
			dilemmaBody[3].value = dilemmaHeader[3].value;
			dilemmaFirstButton[3].value = dilemmaHeader[3].value;
			dilemmaSecondButton[3].value = dilemmaHeader[3].value;
			dilemmaThirdButton[3].value = dilemmaHeader[3].value;
			}
			dilemmaString += '"' + section[i].value + '",';
		} else if ((section[i].value === '' || section[i].value === '0') && section[i].classList.contains('localisation')) {
			dilemmaString += '"' + localisationText + '",';
		} else {
			dilemmaString += '"",';
		}
	}
	return dilemmaString.slice(0, -1);
}

// Semantic UI Activators
$('.ui.accordion')
  .accordion(
  	{exclusive: false}
  	)
;

$('.dilemmas')
	.popup({
		on: 'hover'
	})
;