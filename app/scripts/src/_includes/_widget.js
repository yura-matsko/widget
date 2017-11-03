(function () {
    'use strict';

    class Validation {

        constructor(el) {
            this.el = el;
            this.input = [...this.el.querySelectorAll('[data-validaton]')];
            this.submitBtn = this.el.querySelector('.js-leadgen-submit');
            this.textInput = 'leadgen-input-text';
            this.emailInput = 'leadgen-input-email';
            this.phoneInput = 'leadgen-input-phone';
            this.dateInput = 'leadgen-input-date';
            this.addressInput = 'leadgen-input-address';
            this.data = {};
            this.checkZip = [];

            this.onInit();
            this.registerEvents();
        }

        makeValid(el) {
            el.closest('.leadgen__form-container').classList.remove('is-invalid');
            el.closest('.leadgen__form-container').classList.add('is-valid');

            return true;
        }

        makeInvalid(el) {
            el.closest('.leadgen__form-container').classList.remove('is-valid');
            el.closest('.leadgen__form-container').classList.add('is-invalid');

            return false;
        }

        zipInvalid(el) {
            let elem = this.el.querySelector('.leadgen_msg-invalid');
            elem.classList.add('is-open');
            el.classList.add('zip-invalid');

            return false;
        }

        zipValid(el) {
            let elem = this.el.querySelector('.leadgen_msg-invalid');
            elem.classList.remove('is-open');
            el.classList.remove('zip-invalid');

            return true;
        }

        createErrorMsg() {
            let errorMsg = {
                de : 'Bitte Postleitzahl eingeben',
                fr : 'Veuillez entrer votre code postal'
            };
            let elem = document.createElement('div');
            
            elem.className = 'leadgen_msg-invalid';
            elem.innerHTML = errorMsg[leadgen_locale];

            return elem;
        }

        appendMsg() {
            this.el.insertBefore(this.createErrorMsg(), this.el.firstChild);
        }

        checkValidity(showValidationIcons = true) {
            let validArr = [];
            let checkZip = [];

            this.input.forEach(el => {

                // Ignore inactive inputs
                if (el.disabled || el.classList.contains('hidden-input')) {
                return showValidationIcons ? this.makeValid(el) : true;
            }

            // Empty inputs are always invalid
            if (el.value.trim().length === 0) {
                return showValidationIcons ? this.makeInvalid(el) : false;
            }

            // Test email address inputs
            if (el.dataset.validaton === this.emailInput) {

                if (Validation.EMAIL_REGEXP.test(el.value)) {
                    validArr.push(el);
                    return this.makeValid(el);
                }

                return showValidationIcons ? this.makeInvalid(el) : false;
            }

            // Test name inputs
            if (el.dataset.validaton === this.textInput) {

                if (Validation.NAME_REGEXP.test(el.value)) {
                    validArr.push(el);
                    return this.makeValid(el);
                }

                return showValidationIcons ? this.makeInvalid(el) : false;
            }

            // Test phone inputs
            if (el.dataset.validaton === this.phoneInput) {
                if ($(el).intlTelInput("isValidNumber")) {
                    validArr.push(el);
                    return this.makeValid(el);
                }

                return showValidationIcons ? this.makeInvalid(el) : false;
            }

            // Test date inputs
            if (el.dataset.validaton === this.dateInput) {

                if (Validation.DATE_REGEXP.test(el.value)) {
                    validArr.push(el);
                    return this.makeValid(el);
                }

                return showValidationIcons ? this.makeInvalid(el) : false;
            }

            // Address inputs
            if (el.dataset.validaton === this.addressInput) {
                this.hasZip();

                let zipInit;

                if (el.dataset.leadgenAddress === 'address-to') {
                    zipInit = leadgen_checkZip(leadgen_autocomplete_to);
                } else {
                    zipInit = leadgen_checkZip(leadgen_autocomplete);
                }

                checkZip.push(zipInit);

                if (el.value.trim().length != 0 && zipInit) validArr.push(el);

                if (checkZip.find(this.hasNoZero) === undefined || this.hasZip()) return this.zipValid(el) && this.makeValid(el);

                return showValidationIcons ? this.makeInvalid(el) || this.zipInvalid(el) : false;
            }

            return this.makeValid(el);
        });

            this.prepareData();
            return validArr;
        }

        hasZip() {
            let inputZip = [...this.el.querySelectorAll('input[name*="Zip"]')];
            
            let filledZip = inputZip.every(
                function isPositive(el) {
                    return el.value != '';
                }
            );

            return filledZip;
        }

        hasNoZero(element, index, array) {
            if (element === 0) return true;
        }

        prepareData() {
            let leadgenInput = document.getElementById('leadgen_landing'),
                leadgenHolder = document.querySelector('.leadgen'),
                providerId = leadgenHolder.dataset.providerid,
                providerIdDesktop = leadgenHolder.dataset.provideridDesktop;
                
            if (window.innerWidth <= 600) {
                leadgenInput.value = providerId || 'BookingFunnel-LS-M';
            } else {
                leadgenInput.value = providerIdDesktop || providerId || 'BookingFunnel-LS-H1';
            }

            this.urlParams();
        };

        formPost() {
            this.el.submit();
        }

        disableBtn() {
            this.submitBtn.classList.add('has-spinner');
        }

        sendData(url, location) {
            let formData = $(this.el).serialize();
            
            $.ajax({
                type: 'POST',
                url: url,
                data: formData,
                crossDomain: true,
                error: () => console.log('Error')
            });

            window.location = location;
        }

        formSubmit(e) {
            let customview = this.el.closest('.leadgen').dataset.version;
            e.preventDefault();

            if (this.checkValidity().length === this.input.length) {
                this.disableBtn();
                if(customview === 'v1') {
                    this.sendData('https://9yo0fqi28f.execute-api.eu-central-1.amazonaws.com/prod', 'http://umzugsfirmenvergleich.com/success');
                } else if(customview === 'v2') {
                    this.sendData('https://9yo0fqi28f.execute-api.eu-central-1.amazonaws.com/prod', 'http://umzugskostensparen.com/danke');
                } else if(customview === 'v3') {
                    this.sendData('https://9yo0fqi28f.execute-api.eu-central-1.amazonaws.com/prod', 'http://umzugsfirmen24.com/danke');
                } else {
                    this.formPost();
                }
            }

            return;
        }

        urlParams() {
            let sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                parameters = {},
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                let urlVariables = sURLVariables[i].split('=');
                parameters[urlVariables[0]] = urlVariables[1];
            }

            for (let key in parameters) {
                let hiddenFields = document.querySelector('.leadgen-hidden-input');
                let input = document.createElement("input");
                input.type = "text";
                input.name = key;
                input.value = parameters[key];
                input.hidden = true;
                hiddenFields.appendChild(input);
            }
        }

        onInit() {
            this.appendMsg();
        }

        registerEvents() {
            this.submitBtn.addEventListener('click', this.formSubmit.bind(this), false);
        }
    }

    Validation.NAME_REGEXP  = /^[ äÄäÖöÜüßÀÂÄÈÉÊËÎÏÔŒÙÛÜŸàâäèéêëîïôœùûüÿÇçÀÈÉÌÒÓÙàèéìòóù\-'\w]+$/;
    Validation.EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    Validation.DATE_REGEXP  = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

    // export
    window.Validation = Validation;

})();
