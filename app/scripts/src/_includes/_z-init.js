(function () {
    'use strict';

    let View = window.View;
    let viewRender = document.querySelector('.leadgen');
    new View(viewRender);

    let Validation = window.Validation;
    let validationForm = document.querySelector('.js-leadgen-validation');
    new Validation(validationForm);

    let datepickerLocales = {

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
        }
    };

    let picker = new Pikaday({
        field: document.getElementById('js-leadgen-datepicker'),
        showDaysInNextAndPreviousMonths: true,
        format: datepickerLocales.de.format,
        firstDay: datepickerLocales.de.firstDay,
        i18n: datepickerLocales.de.i18n,
        theme: 'leadgen-theme',
        disableWeekends: true,

        minDate: function() {
            let min = moment().add(4, 'days');

            return min.toDate();
        }()
    })
})();


function initMap(){
    let input = [...document.querySelectorAll('[data-leadgen-address]')];
    let options = {
        componentRestrictions: {country: 'de'}
    };

    input.forEach(el => {
        let autocomplete = new google.maps.places.Autocomplete(el, options);
    });
}