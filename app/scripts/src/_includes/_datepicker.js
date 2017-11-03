(function () {
  'use strict';
  let leadgenHolidays = [];
  let leadgenDatepickerLocales = {

      de : {
          format : 'DD.MM.YYYY',
          firstDay: 1,
          i18n : {
              previousMonth : 'Dieser Monat',
              nextMonth     : 'Nächster Monat',
              months        : ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
              weekdays      : ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
              weekdaysShort : ['SO','MO','DI','MI','DO','FR','SA']
          }
      },

      fr: {
          format: 'DD.MM.YYYY',
          'firstDay': 1,
          i18n: {
          previousMonth: 'Le mois précédent',
          nextMonth: 'Le mois prochain',
          months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
          weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
          weekdaysShort: ['Dim', 'Lu', 'Ma', 'Me', 'Jeu', 'Vend', 'Sam']
          }
      }
  };

  class leadgenDatepicker {
    constructor(el) {
      this.el = el;
      this.el.readOnly = true;

      moment.locale(leadgen_locale);

      this.initDatepicker();
    }

    initDatepicker() {
      this.picker = new Pikaday({
        field: this.el,
        showDaysInNextAndPreviousMonths: true,
        format: leadgenDatepickerLocales[leadgen_locale].format,
        firstDay: leadgenDatepickerLocales[leadgen_locale].firstDay,
        i18n: leadgenDatepickerLocales[leadgen_locale].i18n,
        theme: 'leadgen-theme',
        container: document.querySelector('.leadgen__datepicker-holder'),
        disableDayFn: this.isNotWorkingDay.bind(this)
      });

      this.fetchHolidays(moment().year(), (endYear) => {
        this.picker.setMinDate(this.workingDaysSinceToday(4));
        this.picker.setDate(this.getDefaultDate());
        this.picker.setMaxDate(moment([endYear, 11, 31]).toDate());
        this.picker.draw();
      });
    }

    fetchHolidays(startYear = moment().year(), callback) {
      const years = this.range(startYear, 2);
      let data = leadgen_holidays[leadgen_locale];

      for(let key in data) {
        if(years.includes(+key)){
          Array.prototype.push.apply(leadgenHolidays, data[key]);
        }
      }

      if (typeof callback === 'function') callback(years.pop());
    }

    getDefaultDate() {
      let format = leadgenDatepickerLocales[leadgen_locale].format;
      return (this.date ? moment(this.date, format) : moment()).toDate();
    }

    isNotWorkingDay(date) {
      return this.isWeekend(date) || this.isHoliday(date);
    }

    isWeekend(date) {
      return date.getDay() == 0;
    }

    isHoliday(date) {
      return leadgenHolidays.includes(moment(date).format('YYYY-MM-DD'));
    }

    workingDaysSinceToday(days) {
      for (let i = 1; i <= days; i++) {
        if (this.isNotWorkingDay(moment().add(i, 'days').toDate())) {
          days += 1;
        }
      }

      return moment().add(days, 'days').toDate();
    }

    range(start, count) {
      return Array.apply(0, Array(count))
        .map(function (element, index) {
        return index + start;
      });
    }
  }
  // export
  window.leadgenDatepicker = leadgenDatepicker;
})();