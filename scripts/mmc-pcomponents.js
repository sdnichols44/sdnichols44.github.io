var partComponentsContainer = document.querySelector('#part-components-container');
var partComponents 			= document.querySelectorAll('.part-components');
var partSubmit 				= document.querySelector('#submit');
var partOutput 				= document.querySelector('#part-output');
var clear 					= document.querySelector('.clear');

partSubmit.addEventListener('click', function() {
	partOutput.value = partCompile();
	if (partComponents[1].value !== '') {
		frontendForm[4].value = frontendConvert(partComponents[1].value);
		frontendForm[5].value = partComponents[2].value;
	}
});

clear.addEventListener('click', function() {
	partOutput.value = '';
	for (var i = 0; i < partComponents.length; i++) {
		if(partComponents[i].classList.contains('select-reset')) {
			partComponents[i].selectedIndex = 0;
		} else {
			partComponents[i].value = partComponents[i].defaultValue;
		}
	}
});

// Frontend form buttons
var frontendSubmit = document.querySelector('#frontend-submit');
var frontendOutput = document.querySelector('.frontend-output');
var frontendClear = document.querySelector('#frontend-clear');
var frontendForm = document.querySelectorAll('.part-components-frontend')

frontendSubmit.addEventListener('click', function() {
	frontendOutput.value = frontendCompile();
})

frontendClear.addEventListener('click', function() {
	frontendOutput.value = '';
	for (let i = 0; i < frontendForm.length; i++) {
		if (frontendForm[i].classList.contains('select-reset')) {
			frontendForm[i].selectedIndex = 0;
		} else {
			frontendForm[i].value = frontendForm[i].defaultValue;
		}
	}
})

function frontendCompile() {
	var frontendString = '';
	var localisationDefault = '';
	for (let i = 0; i < frontendForm.length; i++) {
		if ((frontendForm[i].value !== '' && frontendForm[i].value !== '0') || frontendForm[i].classList.contains('localisation')) {
			if (frontendForm[i].classList.contains('localisation-default')) {
				localisationDefault = frontendForm[i].value;
				frontendString += frontendForm[i].value + ',';
			} else if (frontendForm[i].classList.contains('localisation') && frontendForm[i].value === '') {
				if (localisationDefault === '') {
					frontendString += '"' + localisationDefault + '",';
				} else {
					frontendString += localisationDefault + ',';
				}
			} else {
				frontendString += '"' + frontendForm[i].value + '",';
			}
		} else {
			frontendString += '"",'
		}
	}
	return frontendString.slice(0, -1);
}

// Frontend choice buttons
var frontendSwitch = document.querySelector('.frontend-switch')
var frontend = document.querySelectorAll('.frontend');

frontendSwitch.addEventListener('click', function() {
	for (var i = 0; i < frontend.length; i++) {
		if (frontend[i].classList.contains('pc-prebuilt-text')) {
			frontend[i].classList.remove('pc-prebuilt-text');
			frontend[i].value = frontend[i].defaultValue;
			frontendSwitch.textContent = 'Frontend Entries: Yes';
			frontendSwitch.classList.remove('off');
		} else if (!frontend[i].classList.contains('pc-prebuilt-text')) {
			frontend[i].classList.add('pc-prebuilt-text');
			frontendSwitch.textContent = 'Frontend Entries: No ';
			frontendSwitch.classList.add('off');
		}
	}
});

// Function to build regular text
function partCompile() {
	var builtPart = '';
	for (var i = 0; i < partComponents.length; i++) {
	var partComponentsValue = partComponents[i].value;
	var partComponentsType = partComponents[i].type;
		if (partComponents[i].classList.contains('pc-prebuilt-text')) {
			partComponents[i].value = partInfo();
			builtPart += partInfo() + ',';
		} else if (partComponentsValue === '0' || partComponentsValue === '') {
			builtPart += ',';
		} else {
			var partFrag = partComponentsValue;
			builtPart += partFrag + ',';
		}
	}
	return builtPart.slice(0, -1);
}


function frontendConvert(string) {
	var styleSearches = {
		boldOpening: /<b>/ig,
		boldClosing: /<\/b>/ig
	};
	if (string.search(styleSearches.boldOpening)) {
		string = string.replace(styleSearches.boldOpening, '<font=CooperHewitt-Bold>');
		if (string.search(styleSearches.boldClosing)) {
			string = string.replace(styleSearches.boldClosing, '</font>');
		}
	}
	return string;
}

// Search objects being used by the functions
var searches = {
	spaceInsert: /spc/i,
	minus: /-/i,
	reliability: /reliability/i,
	perf: /perf/i,
	redZone: /zone/i,
	buildTime: /build/i,
	qualifying: /qualifying/i,
	softTyres: /compoundsoft/i,
	wetTyres: /compoundwet/i,
	race: /race/i
}

var bonusSearches = {
	bonusFuel: /fuelefficiency/i,
	bonusTyre: /tyrewear/i,
	bonusDriver: /feedback|smoothness|consistency|adaptability|cornering|overtaking|braking/i,
	bonusAddComponent: /randomlevel/i,
	bonusTimeReduction: /timereduction/i,
	bonusConditionLoss: /lossever/i,
	bonusConditionLossFirstRace: /firstrace/i,
	bonusAddPart: /secondpart/i,
	bonusAddReliability: /reliabilityperday/i,
	bonusReliabilityPerLevel: /reliabilitybonus/i,
	bonusExtraSlot: /extraslot/i,
	bonusPit: /fixtime/i,
	bonusMaxPerf: /autoimproved/i,
	bonusMistake: /nomistake/i,
	bonusWeight: /weightstripping/i,
	bonusNoTime: /addnodays/i
}

// Array to convert bonus numbers to the correct string value
var levels = [
	['Average', 1],
	['Good', 2],
	['Great', 3],
	['Epic', 4],
	['Legendary', 5]
];

// Function to build descriptive text for the part created.
function partInfo() {
	var partDescText = '';	
	var textPreObj = {
		Performance: document.querySelector("input[name='pc-stat-boost']").value,
		MaxspcPerformance: document.querySelector("input[name='pc-max-stat-boost']").value,
		Reliability: document.querySelector("input[name='pc-reliability-boost']").value,
		MaxspcReliability:  document.querySelector("input[name='pc-max-reliability-boost']").value,
		RedspcZone:  document.querySelector("input[name='pc-redzone']").value,
		BuildspcTime:  document.querySelector("input[name='pc-production-time']").value,
		Cost:  document.querySelector("input[name='pc-cost']").value,
		Risk:  document.querySelector("input[name='pc-risk']").value
	}
	var textObj = Object.entries(textPreObj);
	for (var i = 0; i < textObj.length; i++) {
		var stat = textObj[i][0];
		var mod = textObj[i][1];
		if (mod !== '0' && mod !== '') {
			// Checking and appending the relevent text based on what the part is affecting
			if (stat.search(searches.reliability) !== -1 || stat.search(searches.redZone) !== -1) {
					mod += '%';
				} else if (stat.search(searches.buildTime) !== -1) {
					if (document.querySelector("select[name='pc-level']").value > 1 && mod.search(searches.minus) === -1) {
						mod -= document.querySelector("select[name='pc-level']").value;
					}
					mod += ' days';
				}
				// Creates the spaces needed from the key names
				if (stat.search(searches.spaceInsert) !== -1) {
					var statFixed = stat.replace(searches.spaceInsert, ' ');			
					var text = '<b>' + statFixed + ':</b> ';
				} else {
					var text = '<b>' + stat + ':</b> ';
				}
			// Adds a plus sign if the modifier is positive
			if (mod < 0 || mod.search(searches.minus) !== -1) {
				var value = mod + '\n';
			} else {
				var value = '+' + mod + '\n';
			}
			partDescText += text + value;
		}			
	}
	return '"' + partDescText +  bonusInfo() + conditionInfo() + '"';
}

// Function to build any additional text from bonuses
function bonusInfo() {
	var bonusObj = {
		bonusType: document.querySelector("select[name='pc-bonus-type']").value,
		bonusValue: document.querySelector("input[name='pc-bonus']").value
	}
	var bonusObjArr = Object.entries(bonusObj);
	for (var i = 0; i < bonusObjArr.length; i++) {
		var bonus = '';
		var bonusText = bonusObjArr[i][1];
		var bonusAmount = bonusObjArr[i+1][1];
		var levelName = '';
		if (bonusText.search(bonusSearches.bonusFuel) !== -1 || bonusText.search(bonusSearches.bonusTyre) !== -1) {
			bonusAmount *= 100;
			bonusAmount += '%';
			if (bonusAmount.search(searches.minus) !== -1) {
				bonusAmount.replace(searches.minus, '+');
			} else if (bonusAmount.search(searches.minus) === -1) {
				bonusAmount = '-' + bonusAmount;
			}
				if (bonusText.search(bonusSearches.bonusFuel) !== -1) {
					bonus += 'Fuel Usage: ' + bonusAmount;
				} else if (bonusText.search(bonusSearches.bonusTyre) !== -1) {
					bonus += 'Tyre Wear: ' + bonusAmount;
				}		
		} else if (bonusText.search(bonusSearches.bonusAddComponent) !== -1) {
			var levelName = levels[bonusAmount - 1][0];
			bonus += 'Adds a Random "' + levelName + '" Component';
		} else if (bonusText.search(bonusSearches.bonusPit) !== -1) {
			if (bonusAmount.search(searches.minus) === -1) {
				bonus += 'Part Fix Time: +' + bonusAmount + 's';
			} else {
				bonus += 'Part Fix Time: ' + bonusAmount + 's';
			}
		} else if (bonusText.search(bonusSearches.bonusConditionLoss) !== -1 || bonusText.search(bonusSearches.bonusConditionLossFirstRace) !== -1) {
			if (bonusText.search(bonusSearches.bonusConditionLoss) !== -1) {
				bonus += 'No Condition Loss: Ever';
			} else {
				bonus += 'No Condition Loss: on First Race';
			}				
		} else if (bonusText.search(bonusSearches.bonusAddPart) !== -1) {
			bonus += 'Additional Parts: 1';
		} else if (bonusText.search(bonusSearches.bonusAddReliability) !== -1) {
			bonus += 'Reliability: ' + isPositive(bonusAmount) + '% For Each Day In Production';
		} else if (bonusText.search(bonusSearches.bonusReliabilityPerLevel) !== -1) {
			bonusReliability = document.querySelector("input[name='pc-reliability-boost']").value;
			var levelName = levels[bonusAmount - 1][0];	
			bonus += 'Reliability: ' + isPositive(bonusReliability) + '% For Each ' + levelName + ' Component';
		} else if (bonusText.search(bonusSearches.bonusExtraSlot) !== -1) {
			var levelName = levels[bonusAmount - 1][0];
			bonus += 'Unlocks an Additional "' + levelName + '" Component Slot';
		} else if (bonusText.search(bonusSearches.bonusTimeReduction) !== -1) {
			bonus += 'Build Time: ' + isPositive(bonusAmount) + ' days \n For: Each Million Spent';
		} else if (bonusText.search(bonusSearches.bonusMaxPerf) !== -1) {
			bonus += 'Max Performance: Instant'
		} else if (bonusText.search(bonusSearches.bonusMistake) !== -1) {
			bonus += 'Chance of Repair Pit Mistake: None';
		} else if (bonusText.search(bonusSearches.bonusWeight) !== -1) {
			bonusAmount = 'x' + bonusAmount
			bonus += 'Weight Stripping Bonus: ' + bonusAmount;
		} else if (bonusText.search(bonusSearches.bonusDriver) !== -1) {
			var match = bonusText.match(bonusSearches.bonusDriver);
			if (bonusAmount.search(searches.minus) === -1) {
				bonusAmount = '+' + bonusAmount;
			}
			bonus += 'Driver ' + match + ': ' + bonusAmount;
		} else if (bonusText.search(bonusSearches.bonusNoTime) !== -1) {
			var levelName = levels[bonusAmount - 1][0];
			bonus += '<b>Build Time:</b> Take No Time \n Components: ' + levelName;
		}
		// if (bonus.length !== 0) {
		// 	bonus += '\n'
		// }
		return bonus		
	}
}

function conditionInfo() {
	var condition = '';
	var activationReq = document.querySelector("select[name='pc-activation']").value;
	if (activationReq.search(searches.qualifying) !== -1) {
		condition = 'During: Qualifying';
	} else if (activationReq.search(searches.race) !== -1) {
		condition = 'During: Race';
	} else if (activationReq.search(searches.softTyres) !== -1) {
		condition = 'On: Softs, Supers & Ultras';
	} else if (activationReq.search(searches.wetTyres) !== -1) {
		condition = 'On: Wets and Inters'
	}
	return condition
}

// Positive number check
function isPositive(num) {
	if (num.search(searches.minus) === -1) {
		num = '+' + num;
	}
	return num;
}

// Semantic UI Activators
$('.part-components')
	.popup({
		on: 'hover'
	})
;

$('.ui.accordion')
  .accordion()
;