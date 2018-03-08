(function () {
  'use strict';
  class TimePicker {
    constructor(el) {
      this.el = el;
      this.initDatepicker();
    }

    initDatepicker() {
      $(this.el).timepicker({
        appendWidgetTo: '#timepicker-container',
        showMeridian: false
      });
    }
  }
  // export
  window.TimePicker = TimePicker;
})();