const leadgen_locale = document.querySelector('.leadgen').dataset.lang || 'de';

(function () {
    'use strict';

    let View = window.View;
    let viewRender = document.querySelector('.leadgen');
    if(viewRender) new View(viewRender);

    let Validation = window.Validation;
    let validationForm = document.querySelector('.js-leadgen-validation');
    if(viewRender) new Validation(validationForm);

    let TrustedshopsData = window.TrustedshopsData;
    let trustedEl = document.querySelector('.leadgen__trusted');
    if(viewRender) new TrustedshopsData(trustedEl);

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

    let picker = new Pikaday({
        field: document.getElementById('js-leadgen-datepicker'),
        showDaysInNextAndPreviousMonths: true,
        format: datepickerLocales[leadgen_locale].format,
        firstDay: datepickerLocales[leadgen_locale].firstDay,
        i18n: datepickerLocales[leadgen_locale].i18n,
        theme: 'leadgen-theme',
        disableWeekends: true,

        minDate: function() {
            let min = moment().add(4, 'days');

            return min.toDate();
        }()
    })
})();

let leadgen_componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  country: 'long_name',
  postal_code: 'short_name'
};

let leadgen_options = {
  types: ['geocode'],
  componentRestrictions: {country: leadgen_locale}
};

function initAutocomplete() {

  leadgen_autocomplete = new google.maps.places.Autocomplete((document.getElementById('leadgen-date-from')), leadgen_options);

  leadgen_autocomplete.addListener('place_changed', function() {
    leadgen_fillInAddress(leadgen_autocomplete, "_from");
  });

  leadgen_autocomplete_to = new google.maps.places.Autocomplete((document.getElementById('leadgen-date-to')), leadgen_options);

  leadgen_autocomplete_to.addListener('place_changed', function() {
    leadgen_fillInAddress(leadgen_autocomplete_to, "_to");
  });

}

function leadgen_checkZip(autocomplete) {
  let place = autocomplete.getPlace();
  let check = [];

  if (place) {
    check = place.address_components.filter(el => {
      return el.types[0] === 'postal_code';
    });
  }
  
  return check.length;
}

function leadgen_fillInAddress(autocomplete, unique) {
  // Get the place details from the autocomplete object.
  let place = autocomplete.getPlace();

  for (let component in leadgen_componentForm) {
    if(!!document.getElementById(component + unique)){
      document.getElementById(component + unique).value = '';
      document.getElementById(component + unique).disabled = false;
    }
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (let i = 0; i < place.address_components.length; i++) {

    let addressType = place.address_components[i].types[0];

    if (leadgen_componentForm[addressType] && document.getElementById(addressType + unique)) {
      let val = place.address_components[i][leadgen_componentForm[addressType]];
      document.getElementById(addressType + unique).value = val;
    }
  }
  // !!! Will be changed in future !!!
  document.getElementById('from-street').value = document.getElementById('route_from').value + ' ' + document.getElementById('street_number_from').value;
  document.getElementById('to-street').value = document.getElementById('route_to').value + ' ' + document.getElementById('street_number_to').value;
}
