export class MultiSelect {

    constructor(element, options = {}) {
        let defaults = {
            placeholder: 'Выбирайте фруктики !',
            selectAllText: 'Выбрать все !',
            howMuchText: "выбрано !",
            searchText: 'Поиск...',
            showCounter: true,
            max: 5,
            search: true,
            selectAll: false,
            listAll: true,
            closeListOnItemSelect: false,
            edge: 0,
            numberCells: 5,
            name: '',
            width: '',
            height: '',
            dropdownWidth: '',
            dropdownHeight: '',
            data: [],
            onChange: function () { },
            onSelect: function () { },
            onUnselect: function () { }
        };

        this.wl_selectAllPlaceholder = options.selectAllText
        this.wl_searchPlaceholder = options.searchText
        this.wl_selectedPlaceholder = options.howMuchText
        this.wl_counterPlaceHolder = options.showCounter

        this.options = Object.assign(defaults, options);
        this.selectElement = typeof element === 'string' ? document.querySelector(element) : element;
        for (const prop in this.selectElement.dataset) {
            if (this.options[prop] !== undefined) {
                this.options[prop] = this.selectElement.dataset[prop];
            }
        }
        this.name = this.selectElement.getAttribute('name') ? this.selectElement.getAttribute('name') : 'multi-select-' + Math.floor(Math.random() * 1000000);
        if (!this.options.data.length) {
            let options = this.selectElement.querySelectorAll('option');
            for (let i = 0; i < options.length; i++) {
                this.options.data.push({
                    value: options[i].value,
                    text: options[i].innerHTML,
                    selected: options[i].selected,
                    html: options[i].getAttribute('data-html')
                });
            }
        }
        this.element = this._template();
        this.selectElement.replaceWith(this.element);
        this._updateSelected();
        this._eventHandlers();
        this.current
        this.visibleOptions 

    }
    _scrollDown(optionItem, counter, optionAmount) {
        if (!optionItem.classList.contains('multi-select-all')) {
            let scrollWindow = document.querySelector('.multi-select-options-only')
            let scrollWindowHeight = scrollWindow.scrollHeight
            let clientWindowHeight = scrollWindow.clientHeight
            let elementHeight = optionItem.offsetHeight
            let numberVisibleItems = parseInt(clientWindowHeight / elementHeight)

            this.current++
            if (this.current >= numberVisibleItems - this.options.edge) { this.current = numberVisibleItems - this.options.edge }
            if (counter === 0) { this.current = 0 }

            if (counter === 0) {
                scrollWindow.scrollTo(0, - scrollWindowHeight);
                this.current = 0
            }
            if (this.current === numberVisibleItems - this.options.edge) {
                scrollWindow.scrollBy(0, elementHeight + 0.5);
            }
        }
    }

    _scrollUp(optionItem, counter, optionAmount) {
        if (!optionItem.classList.contains('multi-select-all')) {
            let scrollWindow = document.querySelector('.multi-select-options-only')
            let scrollWindowHeight = scrollWindow.scrollHeight
            let clientWindowHeight = scrollWindow.clientHeight
            let elementHeight = optionItem.offsetHeight
            let numberVisibleItems = parseInt(clientWindowHeight / elementHeight)

            this.current--
            if (this.current < 1) { this.current = 0 }
            if (counter === optionAmount) { this.current = numberVisibleItems - this.options.edge }

            if (counter === optionAmount) {
                scrollWindow.scrollTo(0, scrollWindowHeight);
                this.current = numberVisibleItems - this.options.edge
            }
            if (this.current === 0) {
                scrollWindow.scrollBy(0, - (elementHeight - 0.5));
            }
        }
    }

    _template() {
        let optionsHTML = '';


        for (let i = 0; i < this.data.length; i++) {
            optionsHTML += `<div class="multi-select-option key-item ${this.selectedValues.includes(this.data[i].value) ? ' multi-select-selected' : ''}" data-value="${this.data[i].value}">
                    <span class="multi-select-option-radio"></span>
                    <span class="multi-select-option-text">${this.data[i].html ? this.data[i].html : this.data[i].text}</span>
                </div>`;
        }

        let selectAllHTML = '';
        if (this.options.selectAll === true || this.options.selectAll === 'true') {
            selectAllHTML = `<div class="multi-select-all key-item">
                <span class="multi-select-option-radio"></span>
                <span class="multi-select-option-text">${this.wl_selectAllPlaceholder}</span>
            </div>`;
        }
        let template = `
            <div class="multi-select ${this.name}"${this.selectElement.id ? ' id="' + this.selectElement.id + '"' : ''} style="${this.width ? 'width:' + this.width + ';' : ''}${this.height ? 'height:' + this.height + ';' : ''}">
                ${this.selectedValues.map(value => `<input type="hidden" name="${this.name}" value="${value}">`).join('')}
                <div class="multi-select-header" style="${this.width ? 'width:' + this.width + ';' : ''}${this.height ? 'height:' + this.height + ';' : ''}">
                <span class="multi-select-header-placeholder">${this.placeholder}</span> 
                <span class="multi-select-header-max">${this.options.max && this.wl_counterPlaceHolder ? this.selectedValues.length + '/' + this.options.max : ''}</span>
                  
                </div>
                <div class="multi-select-options" style="${this.options.dropdownWidth ? 'width:' + this.options.dropdownWidth + ';' : ''}${this.options.dropdownHeight ? 'height:' + this.options.dropdownHeight + ';' : ''}">
                    ${this.options.search === true || this.options.search === 'true' ? `<div class='multi-select-search-wrap'><input type="text" class="multi-select-search" autocomplete="off" placeholder=${this.wl_searchPlaceholder} name='search-${this.name}'></div>` : ''}
                   ${selectAllHTML}
                   <div class="multi-select-options-only">
                   ${optionsHTML}
                   </div>
                </div>
            </div>
        `;
        let element = document.createElement('div');
        element.setAttribute('name' , `${this.name}`)
        element.innerHTML = template;
        return element;
    }

    _eventHandlers() {
        // ---------------------------- КЛАВА ---------------------------------
        let searchInput = this.element.querySelector('.multi-select-search')    
        let counter = 15
        let related
        searchInput.addEventListener('keydown', (event) => {

            this.visibleOptions = []
            this.element.querySelectorAll('.multi-select-option').forEach(item => {          
                getComputedStyle(item , null).display == 'flex'?this.visibleOptions.push(item):''
            })               
            
            let searchItems = this.visibleOptions
            event.stopPropagation()          

            if (event.code === "ArrowUp" || event.code === "ArrowDown") {
                event.code === "ArrowUp" ? counter-- : counter++;

                if (counter < 0) counter = searchItems.length - 1
                if (counter > searchItems.length - 1) counter = 0
         
                if (event.code === "ArrowDown") this._scrollDown(searchItems[counter], counter, searchItems.length - 1);
                if (event.code === "ArrowUp") this._scrollUp(searchItems[counter], counter, searchItems.length - 1);

                if (related && (counter !== 0 || counter !== searchItems.length)) related.classList.remove("key-item-current")
                searchItems[counter].classList.add("key-item-current");
                related = searchItems[counter]
            }

            if (event.code === "Enter" || event.code === "Space") {
                const currentDropdownItem = document.querySelector(
                    ".key-item-current"
                );

                document.querySelectorAll(".key-item-current").forEach(el => {
                    el.classList.remove('key-item-current')
                });                
                
                currentDropdownItem && currentDropdownItem.click();
                event.preventDefault()
            }
        })



        // -------------------------  КЛИКИ МЫШКОЙ -----------------------------
        let headerElement = this.element.querySelector('.multi-select-header');
        this.element.querySelectorAll('.multi-select-option').forEach(option => {
            option.onclick = () => {
                let selected = true;
                if (!option.classList.contains('multi-select-selected')) {
                    if (this.options.max && this.selectedValues.length >= this.options.max) {
                        return;
                    }
                    option.classList.add('multi-select-selected');
                    if (this.options.listAll === true || this.options.listAll === 'true') {
                        if (this.element.querySelector('.multi-select-header-option')) {
                            let opt = Array.from(this.element.querySelectorAll('.multi-select-header-option')).pop();
                            opt.insertAdjacentHTML('afterend', `<span class="multi-select-header-option" data-value="${option.dataset.value}">${option.querySelector('.multi-select-option-text').innerHTML}</span>`);
                        } else {
                            headerElement.insertAdjacentHTML('afterbegin', `<span class="multi-select-header-option" data-value="${option.dataset.value}">${option.querySelector('.multi-select-option-text').innerHTML}</span>`);
                        }
                    }
                    this.element.querySelector('.multi-select').insertAdjacentHTML('afterbegin', `<input type="hidden" name="${this.name}[]" value="${option.dataset.value}">`);
                    this.data.filter(data => data.value == option.dataset.value)[0].selected = true;
                } else {
                    option.classList.remove('multi-select-selected');
                    this.element.querySelectorAll('.multi-select-header-option').forEach(headerOption => headerOption.dataset.value == option.dataset.value ? headerOption.remove() : '');
                    this.element.querySelector(`input[value="${option.dataset.value}"]`).remove();
                    this.data.filter(data => data.value == option.dataset.value)[0].selected = false;
                    selected = false;
                }
                if (this.options.listAll === false || this.options.listAll === 'false') {
                    if (this.element.querySelector('.multi-select-header-option')) {
                        this.element.querySelector('.multi-select-header-option').remove();
                    }
                    // ------------------------------------------------------------------------СКОЛЬКО ВЫБРАНО ЗДЕСЬ PLACEHOLDER ----------
                    if (this.selectedValues.length) {
                        headerElement.insertAdjacentHTML('afterbegin', `<span class="multi-select-header-option">${this.selectedValues.length} ${this.wl_selectedPlaceholder}</span>`);
                    }
                }
                if (!this.element.querySelector('.multi-select-header-option')) {
                    headerElement.insertAdjacentHTML('afterbegin', `<span class="multi-select-header-placeholder">${this.placeholder}</span>`);
                } else if (this.element.querySelector('.multi-select-header-placeholder')) {
                    this.element.querySelector('.multi-select-header-placeholder').remove();
                }// ---------------------------------------------------------------------------ВЫВОДИТ СКОЛЬКО ИЗ СКОЛЬКИ PLACEHOLDER----------------
                if (this.options.max) {
                    if (this.wl_counterPlaceHolder) {
                        this.element.querySelector('.multi-select-header-max').innerHTML = `${this.selectedValues.length} / ${this.options.max}`
                    }
                }
                if (this.options.search === true || this.options.search === 'true') {
                    this.element.querySelector('.multi-select-search').value = '';
                }
                this.element.querySelectorAll('.multi-select-option').forEach(option => option.style.display = 'flex');
                if ((this.options.closeListOnItemSelect === true || this.options.closeListOnItemSelect === 'true') &&
                    this.selectedValues.length >= this.options.max) {
                    headerElement.classList.remove('multi-select-header-active');
                    this.element.querySelectorAll('.multi-select-option').forEach(el => {
                        el.classList.remove("key-current")                       
                        var optionsAllElement = this.element.querySelector('div.multi-select-options')
                        optionsAllElement.style.height = 0 ;    
                    })

                }
                this.options.onChange(option.dataset.value, option.querySelector('.multi-select-option-text').innerHTML, option);
                if (selected) {
                    this.options.onSelect(option.dataset.value, option.querySelector('.multi-select-option-text').innerHTML, option);
                } else {
                    this.options.onUnselect(option.dataset.value, option.querySelector('.multi-select-option-text').innerHTML, option);
                }
            };
        });

        // ----------------------------- Клик по каретке ОТКРЫТЬ\ЗАКРЫТЬ Мультиселект --------------------------------------
        headerElement.onclick = () => {
            headerElement.classList.toggle('multi-select-header-active')
            if (headerElement.classList.contains('multi-select-header-active')) {
                var searchElement = this.element.querySelector('div.multi-select-search-wrap')
                var allElement = this.element.querySelector('div.multi-select-all')
                var cellElement = this.element.querySelector('div.multi-select-option')
                var optionsAllElement = this.element.querySelector('div.multi-select-options')
                var optionsOnlyElement = this.element.querySelector('div.multi-select-options-only')
                var optionsOnlyHeight = this.options.numberCells * cellElement.scrollHeight

                console.log('Высота поиска - ', searchElement.scrollHeight,
                    ' Высота выбрать все - ', allElement.scrollHeight,
                    ' Высота ячейки -  ', cellElement.scrollHeight,
                    ' Высота Оптионс  - ', optionsOnlyHeight);

                let paddingDropdownTop = parseInt(getComputedStyle(optionsAllElement, null).paddingTop)
                let paddingDropdownBottom = parseInt(getComputedStyle(optionsAllElement, null).paddingBottom)               
                optionsAllElement.style.height = optionsOnlyHeight + allElement.scrollHeight + searchElement.scrollHeight  + paddingDropdownTop + paddingDropdownBottom + 'px';               
                optionsOnlyElement.style.height = optionsOnlyHeight + 'px'              
            } else {
                var optionsAllElement = this.element.querySelector('div.multi-select-options')
                optionsAllElement.style.height = 0 ;             
            }

        }
        if (this.options.search === true || this.options.search === 'true') {
            let search = this.element.querySelector('.multi-select-search');
            search.oninput = () => {
                var filtered = [] 
                this.element.querySelectorAll('.multi-select-option').forEach(option => {
                    option.style.display = option.querySelector('.multi-select-option-text').innerHTML.toLowerCase().indexOf(search.value.toLowerCase()) > -1 ? 'flex' : 'none';
                    option.classList.remove('key-item-current')                                          
                    if(option.style.display !== 'none') filtered.push(option)
                })               
                counter = 15 
                filtered.length === 1?filtered[0].classList.add('key-item-current'):''          
            };
        }
        if (this.options.selectAll === true || this.options.selectAll === 'true') {
            let selectAllButton = this.element.querySelector('.multi-select-all');
            selectAllButton.onclick = () => {
                let allSelected = selectAllButton.classList.contains('multi-select-selected');
                this.element.querySelectorAll('.multi-select-option').forEach(option => {
                    let dataItem = this.data.find(data => data.value == option.dataset.value);
                    if (dataItem && ((allSelected && dataItem.selected) || (!allSelected && !dataItem.selected))) {
                        option.click();
                    }
                });
                selectAllButton.classList.toggle('multi-select-selected');
            };
        }
        if (this.selectElement.id && document.querySelector('label[for="' + this.selectElement.id + '"]')) {
            document.querySelector('label[for="' + this.selectElement.id + '"]').onclick = () => {
                headerElement.classList.toggle('multi-select-header-active');
            };
        }
        document.addEventListener('click', event => {
            if (!event.target.closest('.' + this.name) && !event.target.closest('label[for="' + this.selectElement.id + '"]')) {
                headerElement.classList.remove('multi-select-header-active');
            }
        });
    }

    _updateSelected() {
        if (this.options.listAll === true || this.options.listAll === 'true') {
            this.element.querySelectorAll('.multi-select-option').forEach(option => {
                if (option.classList.contains('multi-select-selected')) {
                    this.element.querySelector('.multi-select-header').insertAdjacentHTML('afterbegin', `<span class="multi-select-header-option" data-value="${option.dataset.value}">${option.querySelector('.multi-select-option-text').innerHTML}</span>`);
                }
            });
        } else {

            if (this.selectedValues.length > 0) {
                this.element.querySelector('.multi-select-header').insertAdjacentHTML('afterbegin', `<span class="multi-select-header-option">${this.selectedValues.length} selected</span>`);
            }
        }
        if (this.element.querySelector('.multi-select-header-option')) {
            this.element.querySelector('.multi-select-header-placeholder').remove();

        }
    }

    get selectedValues() {
        return this.data.filter(data => data.selected).map(data => data.value);
    }

    get selectedItems() {
        return this.data.filter(data => data.selected);
    }

    set data(value) {
        this.options.data = value;
    }

    get data() {
        return this.options.data;
    }

    set selectElement(value) {
        this.options.selectElement = value;
    }

    get selectElement() {
        return this.options.selectElement;
    }

    set element(value) {
        this.options.element = value;
    }

    get element() {
        return this.options.element;
    }

    set placeholder(value) {
        this.options.placeholder = value;
    }

    get placeholder() {
        return this.options.placeholder;
    }

    set name(value) {
        this.options.name = value;
    }

    get name() {
        return this.options.name;
    }

    set width(value) {
        this.options.width = value;
    }

    get width() {
        return this.options.width;
    }

    set height(value) {
        this.options.height = value;
    }

    get height() {
        return this.options.height;
    }

}
