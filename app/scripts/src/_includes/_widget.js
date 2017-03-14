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

            this.registerEvents();
        }

        makeValid(el) {
            el.classList.remove('is-invalid');
            el.classList.add('is-valid');

            return true;
        }

        makeInvalid(el) {
            el.classList.remove('is-valid');
            el.classList.add('is-invalid');

            return false;
        }

        checkValidity(showValidationIcons = true) {

            let validArr = [];

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

                if (Validation.NUM_REGEXP.test(el.value)) {
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

                if (el.value.trim().length != 0) {
                    validArr.push(el);
                    return this.makeValid(el);
                }

                return showValidationIcons ? this.makeInvalid(el) : false;
            }

            return this.makeValid(el);
        });

            this.prepareData(validArr);
            return validArr;
        }

        prepareData(val) {
            val.forEach(el => this.data[`${el.name}`] = el.value);
        }

        formPost() {

            for(let key in this.data) {
                if(this.data.hasOwnProperty(key)) {
                    let hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", key);
                    hiddenField.setAttribute("value", this.data[key]);

                    this.el.appendChild(hiddenField);
                }
            }
            this.el.submit();
        }

        formSubmit(e) {
            this.checkValidity();

            if (this.checkValidity().length === this.input.length) {
                this.formPost();
            }

            e.preventDefault();
        }

        registerEvents() {
            this.submitBtn.addEventListener('click', this.formSubmit.bind(this), false);
        }
    }

    Validation.NAME_REGEXP  = /^[ äÄäÖöÜüßÀÂÄÈÉÊËÎÏÔŒÙÛÜŸàâäèéêëîïôœùûüÿÇçÀÈÉÌÒÓÙàèéìòóù\-'\w]+$/;
    Validation.EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    Validation.DATE_REGEXP  = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    Validation.NUM_REGEXP   = /^\s*\+?[\d\s()-]*$/;

    // export
    window.Validation = Validation;

})();
