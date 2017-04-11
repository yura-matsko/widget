(function () {
    'use strict';

    class View {

        constructor(el) {
            this.el = el;

            if (el.dataset.lang === 'fr') {
                this.renderFR();
            } else {
                this.render();
            }
        }

        // !!! Will be changed if future !!!

        render () {
            this.el.innerHTML = `
              <div class="leadgen__container">
                <strong class="leadgen__title">Jetzt kostenloses Umzugsangebot erhalten</strong>
                <form class="leadgen__form js-leadgen-validation" action="https://umzug.movinga.de/plan/entry" method="POST" onkeypress="return event.keyCode != 13;">
                    <div class="leadgen__form-container leadgen__form-container--list">
                        <div class="leadgen__form-row leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-start"></span>
              </span>
                            <input data-validaton="leadgen-input-address" id="leadgen-date-from" data-leadgen-address="address-from" name="address-from" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Auszugsort'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-end"></span>
              </span>
                            <input data-validaton="leadgen-input-address" data-leadgen-address="address-to" id="leadgen-date-to" name="address-to" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Einzugsort'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                    </div>
                    <div class="leadgen__form-container">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-calendar"></span>
              </span>
                            <input id="js-leadgen-datepicker" name="dateMoving" readonly data-validaton="leadgen-input-date" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Umzugsdatum'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                    </div>
                    <div class="leadgen__form-container">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-mail"></span>
              </span>
                            <input type="email" id="leadgen_email" data-validaton="leadgen-input-email" name="email" class='leadgen__form-input' placeholder='E-Mail'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                    </div>
                    <div class="leadgen__form-container">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-phone"></span>
              </span>
                            <input type="tel" id="leadgen_phone" data-validaton="leadgen-input-phone" name="telnumber" class='leadgen__form-input' placeholder='Telefonnummer'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                    </div>
                    <div class="leadgen__form-container leadgen__form-container--row">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-name"></span>
              </span>
                            <input type="text" id="leadgen_first_name" class='leadgen__form-input' name="firstname" data-validaton="leadgen-input-text" placeholder='Vorname'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                        <div class="leadgen__form-row">
                            <input type="text" id="leadgen_last_name" class='leadgen__form-input' name="lastname" data-validaton="leadgen-input-text" placeholder='Nachname'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                    </div>
                    <button type="submit" class="leadgen__form-btn js-leadgen-submit">Angebot berechnen</button>
                    <div class="leadgen-hidden-input">
                      <input type="text" hidden id="street_number_from" name="street_number">
                      <input type="text" hidden id="route_from" name="street_name">
                      <input type="text" hidden id="locality_from" name="fromCity">
                      <input type="text" hidden id="postal_code_from" name="fromZip">
                      <input type="text" hidden id="from-street" name="fromStreet">
                      <input type="text" hidden id="street_number_to" name="street_number_to">
                      <input type="text" hidden id="route_to" name="street_name_to">
                      <input type="text" hidden id="locality_to" name="toCity">
                      <input type="text" hidden id="postal_code_to" name="toZip">
                      <input type="text" hidden id="to-street" name="toStreet">
                      <input type="text" hidden id="leadgen_landing" name="landing">
                    </div>
                </form>
                <ul class="leadgen__list">
                    <li class="leadgen__list-item">
                        <div class="leadgen__trusted">
                            <img class="leadgen__trusted-img" src="https://s3.eu-central-1.amazonaws.com/movinga-leadgen/DE/final-widget/dist/images/logo-trusted.png" width="35" height="35" alt="trusted">
                            <div class="leadgen__trusted-info">
                                <div class="leadgen__trusted-stars-holder">
                                    <div class="leadgen__trusted-stars leadgen__trusted-stars--top">
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                    </div>
                                    <div class="leadgen__trusted-stars">
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                    </div>
                                </div>
                                <span class="leadgen__trusted-text"><i>“Sehr gut”</i> <span>4.66/5.00</span></span>
                            </div>
                        </div>
                    </li>
                    <li class="leadgen__list-item">
                        <img src="https://s3.eu-central-1.amazonaws.com/movinga-leadgen/DE/final-widget/dist/images/logo-immobilen.png" width="45" height="40" alt="immobilen">
                    </li>
                    <li class="leadgen__list-item">
                        <img src="https://s3.eu-central-1.amazonaws.com/movinga-leadgen/DE/final-widget/dist/images/logo-iam.png" width="52" height="25" alt="aim">
                    </li>
                </ul>
                <p class="leadgen__info">Ihre Daten werden nicht an Dritte weitergegeben. Ihr persönlicher Umzugsberater wird sich mit Ihnen in Verbindung setzen und Sie durch das Angebot führen.</p>
            </div>`;
        }

        renderFR () {
            this.el.innerHTML = `
              <div class="leadgen__container">
                <strong class="leadgen__title">Recevez votre devis gratuit en 3 min !</strong>
                <form class="leadgen__form js-leadgen-validation" action="https://demenagement.movinga.fr/plan/entry" method="POST" onkeypress="return event.keyCode != 13;">
                    <div class="leadgen__form-container leadgen__form-container--list">
                        <div class="leadgen__form-row leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-start"></span>
              </span>
                            <input data-validaton="leadgen-input-address" id="leadgen-date-from" data-leadgen-address="address-from" name="address-from" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Départ'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-end"></span>
              </span>
                            <input data-validaton="leadgen-input-address" data-leadgen-address="address-to" id="leadgen-date-to" name="address-to" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Arrivée'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                    </div>
                    <div class="leadgen__form-container">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-calendar"></span>
              </span>
                            <input id="js-leadgen-datepicker" name="dateMoving" readonly data-validaton="leadgen-input-date" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Date du déménagement'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                    </div>
                    <div class="leadgen__form-container">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-mail"></span>
              </span>
                            <input type="email" id="leadgen_email" data-validaton="leadgen-input-email" name="email" class='leadgen__form-input' placeholder='Adresse e-mail'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                    </div>
                    <div class="leadgen__form-container">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-phone"></span>
              </span>
                            <input type="tel" id="leadgen_phone" data-validaton="leadgen-input-phone" name="telnumber" class='leadgen__form-input' placeholder='N° de téléphone'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                    </div>
                    <div class="leadgen__form-container leadgen__form-container--row">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-name"></span>
              </span>
                            <input type="text" id="leadgen_first_name" class='leadgen__form-input' name="firstname" data-validaton="leadgen-input-text" placeholder='Prénom'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                        <div class="leadgen__form-row">
                            <input type="text" id="leadgen_last_name" class='leadgen__form-input' name="lastname" data-validaton="leadgen-input-text" placeholder='Nom'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                    </div>
                    <button type="submit" class="leadgen__form-btn js-leadgen-submit">DEVIS GRATUIT</button>
                    <div class="leadgen-hidden-input">
                      <input type="text" hidden id="street_number_from" name="street_number">
                      <input type="text" hidden id="route_from" name="street_name">
                      <input type="text" hidden id="locality_from" name="fromCity">
                      <input type="text" hidden id="postal_code_from" name="fromZip">
                      <input type="text" hidden id="from-street" name="fromStreet">
                      <input type="text" hidden id="street_number_to" name="street_number_to">
                      <input type="text" hidden id="route_to" name="street_name_to">
                      <input type="text" hidden id="locality_to" name="toCity">
                      <input type="text" hidden id="postal_code_to" name="toZip">
                      <input type="text" hidden id="to-street" name="toStreet">
                      <input type="text" hidden id="leadgen_landing" name="landing">
                    </div>
                </form>
                <ul class="leadgen__list">
                    <li class="leadgen__list-item">
                        <div class="leadgen__trusted">
                            <img class="leadgen__trusted-img" src="https://s3.eu-central-1.amazonaws.com/movinga-leadgen/DE/final-widget/dist/images/logo-trusted.png" width="35" height="35" alt="trusted">
                            <div class="leadgen__trusted-info">
                                <div class="leadgen__trusted-stars-holder">
                                    <div class="leadgen__trusted-stars leadgen__trusted-stars--top">
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                    </div>
                                    <div class="leadgen__trusted-stars">
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                        <i class="leadgen__trusted-star">★</i>
                                    </div>
                                </div>
                                <span class="leadgen__trusted-text"><i>“Sehr gut”</i> <span>4.66/5.00</span></span>
                            </div>
                        </div>
                    </li>
                    <li class="leadgen__list-item">
                        <img src="https://s3.eu-central-1.amazonaws.com/movinga-leadgen/DE/final-widget/dist/images/logo-iam.png" width="52" height="25" alt="aim">
                    </li>
                </ul>
                <p class="leadgen__info">Vos données ne seront pas transmises à des tiers. Votre conseiller personnel en déménagement vous contactera sous peu pour vous présenter notre offre en détail.</p>
            </div>`;
        }
    }

    // export
    window.View = View;
})();