/*jshint esversion: 6 */

(function () {
  'use strict';

  class Validation {

    constructor(el) {
      this.el = el;
      this.input = [...this.el.querySelectorAll('.js-leadgen-input')];
      this.submitBtn = this.el.querySelector('.js-leadgen-submit');
      this.textInput = 'leadgen-input-text';
      this.emailInput = 'leadgen-input-email';
      this.phoneInput = 'leadgen-input-phone';
      this.dateInput = 'leadgen-input-date';
      this.validArr = [];

      this.registerEvents();

    }

    makeValid(el) {
      el.classList.remove('is-invalid');
      el.classList.add('is-valid');

      this.validArr.push(el);

      let uniqueArray = this.validArr.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
      });

      return true;
    }

    makeInvalid(el) {
      el.classList.remove('is-valid');
      el.classList.add('is-invalid');

      return false;
    }

    checkValidity(e) {
      let showValidationIcons = true;

      this.input.forEach(el => {

        // Ignore inactive inputs
        if (el.disabled || el.classList.contains('hidden-input')) {
          return showValidationIcons ? this.makeValid(el) : true;
        }

        // Test email address inputs
        if (el.dataset.validaton === this.emailInput) {

          if (Validation.EMAIL_REGEXP.test(el.value)) {
            return this.makeValid(el);
          }

          return showValidationIcons ? this.makeInvalid(el) : false;
        }

        // Test name inputs
        if (el.dataset.validaton === this.textInput) {

          if (Validation.NAME_REGEXP.test(el.value)) {
            return this.makeValid(el);
          }

          return showValidationIcons ? this.makeInvalid(el) : false;
        }

        // Test phone inputs
        if (el.dataset.validaton === this.phoneInput) {

          if (Validation.NUM_REGEXP.test(el.value)) {
            return this.makeValid(el);
          }

          return showValidationIcons ? this.makeInvalid(el) : false;
        }

        // Test date inputs
        if (el.dataset.validaton === this.dateInput) {

          if (Validation.DATE_REGEXP.test(el.value)) {
            return this.makeValid(el);
          }

          return showValidationIcons ? this.makeInvalid(el) : false;
        }

        // Empty inputs are always invalid
        if (el.value.trim().length === 0) {
          return showValidationIcons ? this.makeInvalid(el) : false;
        }

        return this.makeValid(el);
      })

      e.preventDefault();
    }

    registerEvents() {
      this.submitBtn.addEventListener('click', this.checkValidity.bind(this), false);
    }
  }

  Validation.NAME_REGEXP  = /^[ äÄäÖöÜüßÀÂÄÈÉÊËÎÏÔŒÙÛÜŸàâäèéêëîïôœùûüÿÇçÀÈÉÌÒÓÙàèéìòóù\-'\w]+$/;
  Validation.EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  Validation.DATE_REGEXP  = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  Validation.NUM_REGEXP   = /^\d+$/;

  // export
  window.Validation = Validation;

})();