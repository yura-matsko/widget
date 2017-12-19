const leadgen_locale = document.querySelector('.leadgen').dataset.lang || 'de';

(function () {
    'use strict';

    let View = window.View;
    let viewRender = document.querySelector('.leadgen');
    if(viewRender) new View(viewRender);

    let datePicker = window.leadgenDatepicker;
    let datePickerEl = document.getElementById('js-leadgen-datepicker');
    if(viewRender) new datePicker(datePickerEl);

    let Validation = window.Validation;
    let validationForm = document.querySelector('.js-leadgen-validation');
    if(viewRender) new Validation(validationForm);

    let TrustedshopsData = window.TrustedshopsData;
    let trustedEl = document.querySelector('.leadgen__trusted');
    if(viewRender && trustedEl) new TrustedshopsData(trustedEl);

    if(viewRender) {
      let input = document.getElementById('leadgen-date-to');
      input.oninput = () => {
        input.closest('.leadgen__form-container').classList.add('js-trigger');
      };
    }

    const host = window.location.host;
    const hostLang = (host === 'www.movinga.fr') ? 'fr' : 'de';

    document.addEventListener('DOMContentLoaded', function(){
      $("#leadgen_phone").intlTelInput({
        initialCountry: hostLang,
        onlyCountries: ["al", "ad", "at", "by", "be", "ba", "bg", "hr", "cz", "dk",
          "ee", "fo", "fi", "fr", "de", "gi", "gr", "va", "hu", "is", "ie", "it", "lv",
          "li", "lt", "lu", "mk", "mt", "md", "mc", "me", "nl", "no", "pl", "pt", "ro",
          "ru", "sm", "rs", "sk", "si", "es", "se", "ch", "ua", "gb"],
        /*
        geoIpLookup: function(callback) {
          $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
          });
        },
        */
        utilsScript: "https://s3.eu-central-1.amazonaws.com/movinga-leadgen/DE/final-widget/dist/scripts/utils.js"
      });

      $("#leadgen_phone").on('blur', function(){
        $(this).parents('.leadgen__form-container').removeClass('is-focused');
      }).on('focus', function(){
        $(this).parents('.leadgen__form-container').addClass('is-focused');
      });
    });
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
let streets = [];

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
      if(addressType === 'route') document.querySelector(`.street${unique}`).value = place.name;
    }
  }
}