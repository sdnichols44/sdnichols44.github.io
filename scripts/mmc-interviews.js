var sectionArray			   = [
	document.querySelectorAll('.question'),
	document.querySelectorAll('.answer-one'),
	document.querySelectorAll('.answer-two'),
	document.querySelectorAll('.answer-three'),
	document.querySelectorAll('.answer-four')
	];
var submitAllSections		   = document.querySelectorAll('.textarea-submit');
var clearAllSections		   = document.querySelectorAll('.textarea-clear');
var outputArray				   = [
	document.querySelector('#question-output'),
	document.querySelector('#answer-one-output'),
	document.querySelector('#answer-two-output'),
	document.querySelector('#answer-three-output'),
	document.querySelector('#answer-four-output')
	];
var gameAreaCopy 			   = document.querySelectorAll('.ga-copy');
var sourceCopy 				   = document.querySelectorAll('.s-copy');
var repeatCopy 				   = document.querySelectorAll('.r-copy');
var gameAreaMaster 			   = document.querySelector('.ga-master');
var sourceMaster 			   = document.querySelector('.s-master');
var repeatMaster 			   = document.querySelector('.r-master');

for (let i = 0; i < submitAllSections.length; i++) {
	if (i === 0) {
		submitAllSections[0].addEventListener('click', function() {
			questionCopy(gameAreaMaster, gameAreaCopy);
			questionCopy(sourceMaster, sourceCopy);
			questionCopy(repeatMaster, repeatCopy);
			outputArray[0].value = interviewSectionCompile(sectionArray[0]);
		});
		clearAllSections[0].addEventListener('click', function() {
			interviewClear(sectionArray[0]);
			outputArray[0].value = '';
		});
	} else {
		submitAllSections[i].addEventListener('click', function() {
			outputArray[i].value = interviewSectionCompile(sectionArray[i]);
		});
		clearAllSections[i].addEventListener('click', function() {
			interviewClear(sectionArray[i]);
			outputArray[i].value = '';
		});
	}
}

function interviewSectionCompile(section) {
	var interviewString = '';
	var localisationText = '';
	for (var i = 0; i < section.length; i++) {
		if (section[i].value !== '' && section.value !== '0') {
			if (section[i].classList.contains('localisation-default')) {
				localisationText = section[i].value;
			}
			interviewString += '"' + section[i].value + '",';
		} else {
			if (section[i].value === '' && section[i].classList.contains('localisation')) {
				interviewString += '"' + localisationText + '",';	
			} else {
				interviewString += '"",';
			}
		}
	}
	return interviewString.slice(0, -1);
}

function questionCopy(master, toCopy) {
	for (var i = 0; i < toCopy.length; i++) {
		toCopy[i].value = master.value;
	}
}

function interviewClear(section) {
	for (var i = 0; i < section.length; i++) {
		if (!section[i].classList.contains('select-reset')) {
			section[i].value = section[i].defaultValue;
		} else {
			section[i].selectedIndex = 0;
		}
	}
}

$('.ui.accordion')
  .accordion(
  	{exclusive: false}
  	)
;

$('.interviews')
  .popup(
	{on: 'hover',
	exlusive: 'true'}
	)
;