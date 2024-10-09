// --------------------------------------------Owl Carousel 2 ---------------------------------------------------------------
function productGallery() {    

    $(".product__slider").owlCarousel({
        loop: false, // False - обязательно так как клонированные элементы будут работать неправильно !
        margin: 10,
        nav: true,

        navContainer: '.myNav',
        dotsContainer: '.myDots',
        responsive: {
            0: {
                items: 3
            }
            // 600:{
            //     items:3
            // },
            // 1000:{
            //     items:5
            // }
        }
    });

// -------------------------------------------------Magnific popUp ---------------------------------------------------------
    $('.product__gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',

        // If you enable allowHTMLInTemplate - 
        // make sure your HTML attributes are sanitized if they can be created by a non-admin user
        allowHTMLInTemplate: true,
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title') + '<a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank"></a>';
            }
        },

        gallery: {
            enabled: true,
            tCounter: '<span class="mfp-counter">%curr% из %total%</span>' // markup of counter

        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }

    });

}
export default productGallery;

// ------------------------------------------- Product Tabs -------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
/**
 * @class productTabs
 * @description Represents a tabs component.
 * @param {string} selector - The CSS selector for the tab's container.
 * @param {object} options - The options for configuring the tabs.
 */
export class productTabs {
	/**
	 * Direction of the tabs.
	 * @type {number | string | null}
	 */
	direction = null;
	errors = {
		selectorNotExist: 'Селектор data-tabs не существует',
		duplicateTabs: 'Количество элементов с одинаковым data-tabs больше одного',
		mismatch: 'Количество кнопок и количество панелей не совпадает',
	};

	constructor(selector, options = {}) {
		const productDefaultOptions = {
			tabsName: selector,
			defaultTab: 0,
			onChanged: () => {
			},
			onLoaded: () => {
			},
			onTabHover: () => {
			},
			onResize: () => {
			},
		};

		this.options = Object.assign(productDefaultOptions, options);
		this.selector = selector;
		this.tabs = document.querySelector(`[data-tabs="${selector}"]`);

		if (!this.tabs) {
			console.error(this.errors.selectorNotExist);
			return;
		}

		this.tabsNav = this.tabs.querySelector(':scope > .product-tabs__nav');
		this.tabsContent = this.tabs.querySelector(':scope .product-tabs__content');
		this.triggers = this.tabsNav.querySelectorAll(':scope .product-tabs__trigger');
		this.panels = this.tabsContent.querySelectorAll(':scope > .product-tabs__panel');

		this.#check();
		this.#init();
		this.#events();
	}

	/**
	 * Perform any necessary checks or validations.
	 * @private
	 */
	#check() {
		if (this.isTabsUnique()) {
			console.error(this.errors.duplicateTabs);
		}

		if (this.triggers.length !== this.panels.length) {
			console.error(this.errors.mismatch);
		}
	}

	isTabsUnique() {
		const tabs = document.querySelectorAll(`[data-tabs="${this.selector}"]`);
		return tabs.length > 1;
	}

	/**
	 * Initialize the tabs.
	 * @private
	 */
	#init() {
		const { tabsName, defaultTab } = this.options;

		this.tabsNav.setAttribute('role', 'tablist');

		this.triggers.forEach((trigger, i) => {
			trigger.setAttribute('role', 'tab');
			trigger.setAttribute('aria-controls', `${tabsName}_${i + 1}`);
			trigger.setAttribute('tabindex', '-1');
			trigger.setAttribute('id', `${tabsName}_${i + 1}`);
			trigger.classList.remove('active');
		});

		this.panels.forEach((panel, i) => {
			panel.setAttribute('role', 'tabpanel');
			panel.setAttribute('tabindex', '-1');
			panel.setAttribute('aria-labelledby', this.triggers[i].id);
			panel.classList.remove('active');
		});

		this.triggers[defaultTab].classList.add('active');
		this.triggers[defaultTab].removeAttribute('tabindex');
		this.triggers[defaultTab].setAttribute('aria-selected', 'true');
		this.panels[defaultTab].classList.add('active');
	}

	/**
	 * Bind event listeners to the tab triggers.
	 * @private
	 */
	#events() {
		this.options.onLoaded(this);

		this.triggers.forEach((trigger) => {
			trigger.addEventListener('click', ({ currentTarget }) => {
				const currentTab = this.tabsNav.querySelector('[aria-selected]');

				if (currentTarget !== currentTab) {
					this.switchTabs(currentTarget, currentTab);
				}
			});

			trigger.addEventListener('keydown', ({ currentTarget, which }) => {
				const currentTabIndex = this.getIndex(this.triggers, currentTarget);

				switch (which) {
					case 37: // Arrow Left
						this.direction = currentTabIndex - 1;
						break;
					case 39: // Arrow Right
						this.direction = currentTabIndex + 1;
						break;
					case 40: // Arrow Down
						this.direction = 'down';
						break;
					default:
						this.direction = null;
						break;
				}

				if (this.direction === 'down') {
					this.panels[currentTabIndex].focus();
				} else if (this.triggers[this.direction]) {
					this.switchTabs(this.triggers[this.direction], currentTarget);
				}
			});

			trigger.addEventListener('mouseenter', ({ currentTarget }) => {
				this.options.onTabHover({
					currentTarget,
					tabsContent: this.tabsContent,
				});
			});
		});

		window.addEventListener('resize', (event) => {
			this.options.onResize(event);
		});
	}

	/**
	 * Switch tabs to the specified next tab.
	 * @param {HTMLElement} nextTab - The next tab element.
	 * @param {HTMLElement} currentTab - The current tab element.
	 */
	switchTabs(nextTab, currentTab) {
		const nextIndex = this.getIndex(this.triggers, nextTab);
		const currentIndex = this.getIndex(this.triggers, currentTab);

		nextTab?.focus();
		nextTab?.removeAttribute('tabindex');
		nextTab?.setAttribute('aria-selected', 'true');

		currentTab.removeAttribute('aria-selected');
		currentTab.setAttribute('tabindex', '-1');

		this.removeClass(this.panels[currentIndex]);
		this.addClass(this.panels[nextIndex]);

		this.removeClass(this.triggers[currentIndex]);
		this.addClass(this.triggers[nextIndex]);

		this.options.onChanged({
			data: this,
			nextTab,
			currentTab,
			nextIndex,
			currentIndex,
			nextPanel: this.panels[nextIndex],
			currentPanel: this.panels[currentIndex],
		});
	}

	/**
	 * Get the index of an element within an array-like object.
	 * @param {NodeListOf<Element>} array - The array-like object to search.
	 * @param {HTMLElement} element - The element to find the index of.
	 * @returns {number} The index of the element.
	 */
	getIndex(array, element) {
		return Array.prototype.indexOf.call(array, element);
	}

	/**
	 * Add a CSS class to an element.
	 * @param {HTMLElement} element - The element to add the class to.
	 */
	addClass(element) {
		element?.classList.add('active');
	}

	/**
	 * Remove a CSS class from an element.
	 * @param {HTMLElement} element - The element to remove the class from.
	 */
	removeClass(element) {
		element?.classList.remove('active');
	}
}

