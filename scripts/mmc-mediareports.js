var sectionArray = [
	document.querySelectorAll('.report-header'),
	document.querySelectorAll('.body0'),
	document.querySelectorAll('.body1'),
	document.querySelectorAll('.body2'),
	document.querySelectorAll('.body3'),
	document.querySelectorAll('.body4')
	];
var outputArray = [
	document.querySelector('#header-output'),
	document.querySelector('#body0-output'),
	document.querySelector('#body1-output'),
	document.querySelector('#body2-output'),
	document.querySelector('#body3-output'),
	document.querySelector('#body4-output')
	];
var submitAll = document.querySelectorAll('.textarea-submit');
var clearAll = document.querySelectorAll('.textarea-clear');

for (let i = 0; i < sectionArray.length; i++) {
	submitAll[i].addEventListener('click', function() {
		outputArray[i].value = reportCompile(sectionArray[i]);
		if (i === 0) {
			forceValue(document.querySelector('.ga-master'), document.querySelectorAll('.ga-copy'));
			forceValue(document.querySelector('.s-master'), document.querySelectorAll('.s-copy'));
			forceValue(document.querySelector('.w-master'), document.querySelectorAll('.w-copy'));
		}
	});
	clearAll[i].addEventListener('click', function() {
		reportClear(sectionArray[i]);
		outputArray[i].value = '';
	});
}

function reportCompile(section) {
	let reportString = '';
	let localisationDefault = '';
	for (let i = 0; i < section.length; i++) {
		if ((section[i].value !== '0' && section[i].value !== '') || section[i].classList.contains('localisation')) {
			if (section[i].classList.contains('localisation-default')) {
				localisationDefault = section[i].value;
			} else if (section[i].classList.contains('localisation') && section[i].value === '') {
				section[i].value = localisationDefault;
			}
			reportString += '"' + section[i].value + '",';
		} else {
			reportString += '"",';
		}
	}
	return reportString += '"","","","","","","","",""';
}

function reportClear(section) {
	for (let i = 0; i < section.length; i++) {
		if (section[i].classList.contains('select-reset')) {
			section[i].selectedIndex = 0;
		} else {
			section[i].value = section[i].defaultValue;
		}
	}
}

function forceValue(master, copyTo) {
	for (let i = 0; i < copyTo.length; i++) {
		copyTo[i].value = master.value;
	}
}

$('.ui.accordion').accordion({exclusive: false});

$('.media-reports').popup({on: 'hover', exlusive: 'true'});