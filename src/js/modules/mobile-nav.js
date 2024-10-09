function mobileNav() {
	// Mobile nav button
	const navBtn = document.querySelector('.mobile-nav__btn');
	const nav = document.querySelector('.mobile-nav');
	const menuIcon = document.querySelector('.mobile-nav__btn');

	navBtn.onclick = function () {
		nav.classList.toggle('mobile-nav--open');
		menuIcon.classList.toggle('mobile-nav__btn--active');
		document.body.classList.toggle('no-scroll');

	};

	function mobileNavPaste() {
		$('ul.mobile-nav__list').html($('ul.header-nav__list').html());
	}

	mobileNavPaste();
	
}

export default mobileNav;