// All Personality Traits Code
var personalityTraits 		   = document.querySelectorAll('.personality-traits');
var personalityTraitsContainer = document.querySelector('#personality-traits-container');
var traitSubmit 			   = document.querySelector('#submit');
var traitOutput 			   = document.querySelector('#output');
var traitClear 				   = document.querySelector('.clear');

traitSubmit.addEventListener('click', function() {	
	traitOutput.value = traitCompile();
	sectionArray[0][4].value = personalityTraits[1].value;
	sectionArray[0][5].value = personalityTraits[2].value;
	sectionArray[1][4].value = personalityTraits[4].value;
	sectionArray[1][5].value = personalityTraits[5].value;
});

traitClear.addEventListener('click', function() {
	inputClear(personalityTraits);
	output.value = '';
});

function traitCompile() {
	var trait = '';
	for (var i = 0; i < personalityTraits.length; i++) {
		if ((personalityTraits[i].type === 'number' || personalityTraits[i].classList.contains('special')) && personalityTraits[i].value !== '0' && personalityTraits[i].value !== '') {
			trait += personalityTraits[i].value + ',';
		} else if (personalityTraits[i].type === 'text' && personalityTraits[i].value !== '0' && personalityTraits[i].value !== '') {
			trait += '"' + personalityTraits[i].value + '",';
		} else {
			trait += ',';
		}
	}
	return trait.slice(0, -1);
}

// function buildTrait() {
// 	var builtTrait = '';
// 	for (var i = 0; i < personalityTraits.length; i++) {
// 			if (personalityTraits[i].type === 'number' && personalityTraits[i].value !== '0' && personalityTraits[i].value !== '') {
// 				var traitFrag = Number(personalityTraits[i].value);
// 				builtTrait += traitFrag + ',';
// 			} else if (personalityTraits[i].classList.contains('special')) {
// 				var traitFrag = personalityTraits[i].value;
// 				builtTrait += traitFrag + ',';
// 			} else if (personalityTraits[i].type === 'text' && personalityTraits[i].value.length > 0 && personalityTraits.value !== 'none') {
// 				var traitFrag = personalityTraits[i].value;
// 				builtTrait += '"' + traitFrag + '",';
// 			} else {
// 				builtTrait += ',';
// 			}
// 	}
// 	return builtTrait.slice(0, -1);
// }

// Frontend compiling sections
var sectionArray = [
	document.querySelectorAll('.trait-name-frontend'),
	document.querySelectorAll('.trait-description-frontend')
	];
var allOutputs = document.querySelectorAll('.frontend-output');
var submitAll = document.querySelectorAll('.textarea-submit');
var clearAll = document.querySelectorAll('.textarea-clear');

for (let i = 0; i < sectionArray.length; i++) {
	submitAll[i].addEventListener('click', function() {
		allOutputs[i].value = frontendCompile(sectionArray[i]);
	})
	clearAll[i].addEventListener('click', function() {
		inputClear(sectionArray[i]);
		allOutputs[i].value = '';
	})
}

function frontendCompile(section) {
	var frontendString = '';
	var localisationDefault = '';
	for (let i = 0; i < section.length; i++) {
		if ((section[i].value !== '' && section[i].value !== '') || section[i].classList.contains('localisation')) {
			if (section[i].classList.contains('localisation-default')) {
				localisationDefault = section[i].value;
				frontendString += '"' + section[i].value + '",'
			} else if (section[i].classList.contains('localisation') && section[i].value === '') {
				frontendString += '"' + localisationDefault + '",';
			} else {
				frontendString += '"' + section[i].value + '",';
			}
		} else {
			frontendString += '"",';
		}
	}
	return frontendString.slice(0, -1);
}

function inputClear(section) {
	for (let i = 0; i < section.length; i++) {
		if (section[i].classList.contains('select-reset')) {
			section[i].selectedIndex = 0;
		} else {
			section[i].value = section[i].defaultValue;
		}
	}	
}

// Semantic UI Activators
$('.personality-traits')
	.popup({
		on: 'hover'
	})
;

$('.personality-traits-frontend')
	.popup({
		on: 'hover',
		exlusive: 'true'
	})
;

$('.ui.accordion')
  .accordion(
  	{exclusive: false}
  	)
;