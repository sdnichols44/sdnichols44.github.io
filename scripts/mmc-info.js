// Section view controllers
var reqButton = document.querySelector('.requirements');
var specButton = document.querySelector('.special-cases');
var iconButton = document.querySelector('.components');
var iconStandardButton = document.querySelector('.standard');
var iconDesignerButton = document.querySelector('.engineer');
var reqSection = document.querySelector('#ptraits-requirements');
var specSection = document.querySelector('#ptraits-specialcases');
var iconSection = document.querySelector('#pcomponents-icons');
var iconStandardSection = document.querySelector('#standard-icon-table');
var iconDesignerSection = document.querySelector('#engineer-icon-table');

reqButton.addEventListener('click', function() {
	toggleSection(reqSection, reqButton, 'Requirements');
});

specButton.addEventListener('click', function() {
	toggleSection(specSection, specButton, 'Special Cases');
});

iconButton.addEventListener('click', function() {
	toggleSection(iconSection, iconButton, 'Icons');
});

iconStandardButton.addEventListener('click', function() {
	toggleSection(iconStandardSection, iconStandardButton, 'Standard Icons');
});

iconDesignerButton.addEventListener('click', function() {
	toggleSection(iconDesignerSection, iconDesignerButton, 'Designer Icons');
})

function toggleSection(section, button, str) {
	if(section.classList.contains('hide')) {
		section.classList.remove('hide');
		button.textContent = 'Hide ' + str;
		button.classList.remove('blue');
		button.classList.add('red');
	} else {
		section.classList.add('hide');
		button.textContent = 'Show ' + str;
		button.classList.remove('red');
		button.classList.add('blue');
	}
}

// In-table drop down lists
