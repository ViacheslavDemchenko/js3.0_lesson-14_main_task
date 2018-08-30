function tabs() {
		let tab = document.getElementsByClassName('info-header-tab'),
		tabContent = document.getElementsByClassName('info-tabcontent'),
		info = document.getElementsByClassName('info-header')[0];


		function hideTabContent(a) {
			for (i = a; i < tabContent.length; i++) {
				tabContent[i].classList.remove('show');
				tabContent[i].classList.add('hide');
			}
		};

		hideTabContent(1);

		function showTabcontent(b) {
			if (tabContent[b].classList.contains('hide')) {
				hideTabContent(0);
				tabContent[b].classList.remove('hide');
				tabContent[b].classList.add('show');
			}
		};

		info.addEventListener('click', (e) => {
			let target = e.target;
			if (target.className === 'info-header-tab') {
				for (let i = 0; i < tab.length; i++) {
					if (target === tab[i]) {
						showTabcontent(i);
						break;
					}
				}
			}
		});
}

module.exports = tabs;