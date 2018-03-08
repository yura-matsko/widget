(function () {
    'use strict';

    class View {

        constructor(el) {
            this.el = el;

            if (el.dataset.lang === 'fr') {
               if (el.dataset.version === 'v1') {
                    this.renderFRV0();
                }
            } else {
                if (el.dataset.version === 'v1') {
                    this.renderV1();
                } else if (el.dataset.version === 'v2') {
                    this.renderV2();
                } else if (el.dataset.version === 'v3') {
                    this.renderV3();
                } else if (el.dataset.version === 'v4') {
                  const params = new URLSearchParams(window.location.search);
                  this.sid = params.get('sid');
                  this.renderV4();
                } else {
                    this.renderV0();
                }
            }
        }

        // !!! Will be changed if future !!!

        renderV0 () {
            this.el.innerHTML = `
              <div class="leadgen__container">
                <strong class="leadgen__title">Jetzt kostenloses Umzugsangebot erhalten</strong>
                <form class="leadgen__form js-leadgen-validation" action="https://umzug.movinga.de/plan/entry" method="POST" onkeypress="return event.keyCode != 13;">
                    <div class="leadgen__form-wrapper">
                        <div class="leadgen__form-container leadgen__form-container--list leadgen__form-container--address">
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
                            <div class="leadgen__form-error">Bitte wählen Sie aus der automatischen Vorschlagsliste</div>
                        </div>
                        <div class="leadgen__form-container leadgen__form-container--date">
                            <div class="leadgen__form-row">
                <span class="leadgen__form-holder">
                    <span class="leadgen-icon-calendar"></span>
                </span>
                                <input id="js-leadgen-datepicker" name="dateMoving" readonly data-validaton="leadgen-input-date" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Umzugsdatum'>
                                <i class="leadgen__form-focus"></i>
                                <i class="leadgen__form-valid leadgen-icon-validation"></i>
                            </div>
                            <div class="leadgen__datepicker-holder"></div>
                        </div>
                        <div class="leadgen__form-container leadgen__form-container--name leadgen__form-container--row">
                            <div class="leadgen__form-row">
                <span class="leadgen__form-holder">
                    <span class="leadgen-icon-name"></span>
                </span>
                                <input type="text" id="leadgen_first_name" class='leadgen__form-input' name="firstname" data-validaton="leadgen-input-text" placeholder='Vorname'>
                                <i class="leadgen__form-focus"></i>
                                <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                <div class="leadgen__form-error">Bitte geben Sie Ihren Vornamen ein</div>
                            </div>
                            <div class="leadgen__form-row">
                                <input type="text" id="leadgen_last_name" class='leadgen__form-input' name="lastname" data-validaton="leadgen-input-text" placeholder='Nachname'>
                                <i class="leadgen__form-focus"></i>
                                <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                <div class="leadgen__form-error">Bitte geben Sie Ihren Nachname ein</div>
                            </div>
                        </div>
                        <div class="leadgen__form-container leadgen__form-container--email">
                            <div class="leadgen__form-row">
                <span class="leadgen__form-holder">
                    <span class="leadgen-icon-mail"></span>
                </span>
                                <input type="email" id="leadgen_email" data-validaton="leadgen-input-email" name="email" class='leadgen__form-input' placeholder='E-Mail'>
                                <i class="leadgen__form-focus"></i>
                                <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                <div class="leadgen__form-error">Bitte geben Sie Ihre E-Mail-Adresse ein</div>
                            </div>
                        </div>
                        <div class="leadgen__form-container leadgen__form-container--phone">
                            <div class="leadgen__form-row">
                <span class="leadgen__form-holder">
                    <span class="leadgen-icon-phone"></span>
                </span>
                                <input type="tel" id="leadgen_phone" data-validaton="leadgen-input-phone" name="telnumber" class='leadgen__form-input'>
                                <i class="leadgen__form-focus"></i>
                                <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                <div class="leadgen__form-error">Bitte geben Sie eine gültige Telefonnummer ein</div>
                            </div>
                        </div>
                        <div class="leadgen__form-btn-holder">
                            <button type="submit" class="leadgen__form-btn js-leadgen-submit">
                                Angebot berechnen
                                <div class="leadgen__form-spinner">
                                    <div class="leadgen__form-bounce1"></div>
                                    <div class="leadgen__form-bounce2"></div>
                                    <div class="leadgen__form-bounce3"></div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="leadgen-hidden-input">
                      <input type="text" hidden id="street_number_from" name="street_number">
                      <input type="text" hidden id="route_from" name="street_name">
                      <input type="text" hidden id="locality_from" name="fromCity">
                      <input type="text" hidden id="postal_code_from" name="fromZip">
                      <input type="text" hidden id="from-street" class="street_from" name="fromStreet">
                      <input type="text" hidden id="street_number_to" name="street_number_to">
                      <input type="text" hidden id="route_to" name="street_name_to">
                      <input type="text" hidden id="locality_to" name="toCity">
                      <input type="text" hidden id="postal_code_to" name="toZip">
                      <input type="text" hidden id="to-street" class="street_to" name="toStreet">
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
                <p class="leadgen__info">Ihre Daten werden nicht an Dritte weitergegeben. Ihr persönlicher Umzugsberater wird sich mit Ihnen in Verbindung setzen und Sie durch das Angebot führen.</p>
            </div>`;
        }

        renderV1 () {
            this.el.innerHTML = `
                <div class="leadgen__container leadgen__container--style01">
                <strong class="leadgen__title">Erhalten Sie Ihr persönliches Angebot</strong>
                <form class="leadgen__form js-leadgen-validation" action="https://hooks.zapier.com/hooks/catch/528457/9kgur3/" method="POST" onkeypress="return event.keyCode != 13;">
                    <div class="leadgen__form-wrapper">
                        <div class="leadgen__form-area">
                            <div class="leadgen__form-container leadgen__form-container--address">
                                <div class="leadgen__form-row">
                                    <input data-validaton="leadgen-input-address" id="leadgen-date-from" data-leadgen-address="address-from" name="address-from" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Auszugstrasse, N°, PLZ, Stadt'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                            </div>
                            <div class="leadgen__form-container leadgen__form-container--address">
                                <div class="leadgen__form-row">
                                    <input data-validaton="leadgen-input-address" data-leadgen-address="address-to" id="leadgen-date-to" name="address-to" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Einzugstrasse, N°, PLZ, Stadt'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                            </div>
                        </div>
                        <div class="leadgen__form-area">
                            <div class="leadgen__form-container leadgen__form-container--date">
                                <div class="leadgen__form-row">
                                    <input id="js-leadgen-datepicker" name="dateMoving" readonly data-validaton="leadgen-input-date" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Umzugsdatum'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                    <div class="leadgen__datepicker-holder"></div>
                                </div>
                            </div>
                            <div class="leadgen__form-container leadgen__form-container--room">
                                <div class="leadgen__form-row">
                                    <input autocomplete="off" type="text" name="leadgen-rooms" class='leadgen__form-input' placeholder='Zimmer'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                            </div>
                        </div>
                        <div class="leadgen__form-area">
                            <div class="leadgen__form-container leadgen__form-container--email">
                                <div class="leadgen__form-row">
                                    <input type="email" id="leadgen_email" data-validaton="leadgen-input-email" name="email" class='leadgen__form-input' placeholder='E-Mail'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                            </div>
                            <div class="leadgen__form-container leadgen__form-container--phone">
                                <div class="leadgen__form-row">
                                    <input type="tel" id="leadgen_phone" data-validaton="leadgen-input-phone" name="telnumber" class='leadgen__form-input'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                            </div>
                        </div>
                        <div class="leadgen__form-area">
                            <div class="leadgen__form-container leadgen__form-container--name">
                                <div class="leadgen__form-row">
                                    <input type="text" id="leadgen_first_name" class='leadgen__form-input' name="firstname" data-validaton="leadgen-input-text" placeholder='Vorname'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                            </div>
                            <div class="leadgen__form-container leadgen__form-container--name">
                                <div class="leadgen__form-row">
                                    <input type="text" id="leadgen_last_name" class='leadgen__form-input' name="lastname" data-validaton="leadgen-input-text" placeholder='Nachname'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                            </div>
                        </div>
                        <div class="leadgen__form-btn-holder">
                            <button type="submit" class="leadgen__form-btn js-leadgen-submit">
                                Kostenlos anfragen
                                <div class="leadgen__form-spinner">
                                    <div class="leadgen__form-bounce1"></div>
                                    <div class="leadgen__form-bounce2"></div>
                                    <div class="leadgen__form-bounce3"></div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="leadgen-hidden-input">
                      <input type="text" hidden id="street_number_from" name="street_number">
                      <input type="text" hidden id="route_from" name="street_name">
                      <input type="text" hidden id="locality_from" name="fromCity">
                      <input type="text" hidden id="postal_code_from" name="fromZip">
                      <input type="text" hidden id="from-street" class="street_from" name="fromStreet">
                      <input type="text" hidden id="street_number_to" name="street_number_to">
                      <input type="text" hidden id="route_to" name="street_name_to">
                      <input type="text" hidden id="locality_to" name="toCity">
                      <input type="text" hidden id="postal_code_to" name="toZip">
                      <input type="text" hidden id="to-street" class="street_to" name="toStreet">
                      <input type="text" hidden id="leadgen_landing" name="landing">
                    </div>
                </form>
                <ul class="leadgen-items">
                    <li> <i class="leadgen-icon-validation"></i> Sicher</li>
                    <li> <i class="leadgen-icon-validation"></i> Professionell</li>
                    <li> <i class="leadgen-icon-validation"></i> Preiswert</li>
                </ul>
            </div>
            `;
        }

        renderV2 () {
            this.el.innerHTML = `
              <div class="leadgen__container leadgen__container--style02">
                <strong class="leadgen__title">Finden Sie Ihre Umzugsfirma</strong>
                <form class="leadgen__form js-leadgen-validation" action="https://9yo0fqi28f.execute-api.eu-central-1.amazonaws.com/prod" method="POST" onkeypress="return event.keyCode != 13;">
                    <div class="leadgen__form-wrapper">
                        <div class="leadgen__form-container leadgen__form-container--address">
                            <div class="leadgen__form-row leadgen__form-row">
                                <input data-validaton="leadgen-input-address" id="leadgen-date-from" data-leadgen-address="address-from" name="address-from" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Auszugstrasse, N°, PLZ, Stadt'>
                                <i class="leadgen__form-focus"></i>
                                <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                <div class="leadgen__form-error">Bitte wählen Sie aus der automatischen Vorschlagsliste</div>
                            </div>
                        </div>
                        <div class="leadgen__form-container leadgen__form-container--address">
                            <div class="leadgen__form-row">
                                <input data-validaton="leadgen-input-address" data-leadgen-address="address-to" id="leadgen-date-to" name="address-to" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Einzugstrasse, N°, PLZ, Stadt'>
                                <i class="leadgen__form-focus"></i>
                                <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                <div class="leadgen__form-error">Bitte wählen Sie aus der automatischen Vorschlagsliste</div>
                            </div>
                        </div>
                        <div class="leadgen__form-area">
                            <div class="leadgen__form-container leadgen__form-container--date">
                                <div class="leadgen__form-row">
                                    <input id="js-leadgen-datepicker" name="dateMoving" readonly data-validaton="leadgen-input-date" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Umzugsdatum'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                    <div class="leadgen__datepicker-holder"></div>
                                </div>
                            </div>
                            <div class="leadgen__form-container leadgen__form-container--room">
                                <div class="leadgen__form-row">
                                    <input autocomplete="off" type="text" name="leadgen-rooms" class='leadgen__form-input' placeholder='Zimmer'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                            </div>
                        </div>
                        <div class="leadgen__form-container">
                            <div class="leadgen__form-row">
                                <input type="email" id="leadgen_email" data-validaton="leadgen-input-email" name="email" class='leadgen__form-input' placeholder='E-Mail'>
                                <i class="leadgen__form-focus"></i>
                                <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                <div class="leadgen__form-error">Bitte geben Sie Ihre E-Mail-Adresse ein</div>
                            </div>
                        </div>
                        <div class="leadgen__form-container">
                            <div class="leadgen__form-row">
                                <input type="tel" id="leadgen_phone" data-validaton="leadgen-input-phone" name="telnumber" class='leadgen__form-input'>
                                <i class="leadgen__form-focus"></i>
                                <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                <div class="leadgen__form-error">Bitte geben Sie eine gültige Telefonnummer ein</div>
                            </div>
                        </div>
                        <div class="leadgen__form-area">
                            <div class="leadgen__form-container leadgen__form-container--name">
                                <div class="leadgen__form-row">
                                    <input type="text" id="leadgen_first_name" class='leadgen__form-input' name="firstname" data-validaton="leadgen-input-text" placeholder='Vorname'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                                <div class="leadgen__form-error">Bitte geben Sie Ihren Vornamen ein</div>
                            </div>
                            <div class="leadgen__form-container leadgen__form-container--name">
                                <div class="leadgen__form-row">
                                    <input type="text" id="leadgen_last_name" class='leadgen__form-input' name="lastname" data-validaton="leadgen-input-text" placeholder='Nachname'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                                <div class="leadgen__form-error">Bitte geben Sie Ihren Nachname ein</div>
                            </div>
                        </div>
                        <div class="leadgen__form-btn-holder">
                            <button type="submit" class="leadgen__form-btn js-leadgen-submit">
                                Kostenlos anfragen
                                <div class="leadgen__form-spinner">
                                    <div class="leadgen__form-bounce1"></div>
                                    <div class="leadgen__form-bounce2"></div>
                                    <div class="leadgen__form-bounce3"></div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="leadgen-hidden-input">
                      <input type="text" hidden id="street_number_from" name="street_number">
                      <input type="text" hidden id="route_from" name="street_name">
                      <input type="text" hidden id="locality_from" name="fromCity">
                      <input type="text" hidden id="postal_code_from" name="fromZip">
                      <input type="text" hidden id="from-street" class="street_from" name="fromStreet">
                      <input type="text" hidden id="street_number_to" name="street_number_to">
                      <input type="text" hidden id="route_to" name="street_name_to">
                      <input type="text" hidden id="locality_to" name="toCity">
                      <input type="text" hidden id="postal_code_to" name="toZip">
                      <input type="text" hidden id="to-street" class="street_to" name="toStreet">
                      <input type="text" hidden id="leadgen_landing" name="landing">
                    </div>
                </form>
            </div>`;
        }

        renderV3 () {
            this.el.innerHTML = `
              <div class="leadgen__container leadgen__container--style03">
                <strong class="leadgen__title">Jetzt kostenloses Umzugsangebot erhalten</strong>
                <form class="leadgen__form js-leadgen-validation" action="https://hooks.zapier.com/hooks/catch/528457/9kaenc/" method="POST" onkeypress="return event.keyCode != 13;">
                    <div class="leadgen__form-wrapper">
                        <div class="leadgen__form-area">
                            <div class="leadgen__form-container leadgen__form-container--address">
                                <div class="leadgen__form-row leadgen__form-row">
                                    <input data-validaton="leadgen-input-address" id="leadgen-date-from" data-leadgen-address="address-from" name="address-from" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Auszugstrasse, N°, PLZ, Stadt'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                                <div class="leadgen__form-error">Bitte wählen Sie aus der automatischen Vorschlagsliste</div>
                            </div>
                            <div class="leadgen__form-container leadgen__form-container--address">
                                <div class="leadgen__form-row">
                                    <input data-validaton="leadgen-input-address" data-leadgen-address="address-to" id="leadgen-date-to" name="address-to" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Einzugstrasse, N°, PLZ, Stadt'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                                <div class="leadgen__form-error">Bitte wählen Sie aus der automatischen Vorschlagsliste</div>
                            </div>
                        </div>
                        <div class="leadgen__form-area">
                            <div class="leadgen__form-container leadgen__form-container--date">
                                <div class="leadgen__form-row">
                                    <input id="js-leadgen-datepicker" name="dateMoving" readonly data-validaton="leadgen-input-date" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Umzugsdatum'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                    <div class="leadgen__datepicker-holder"></div>
                                </div>
                            </div>
                        </div>
                        <div class="leadgen__form-area">
                            <div class="leadgen__form-container">
                                <div class="leadgen__form-row">
                                    <input type="email" id="leadgen_email" data-validaton="leadgen-input-email" name="email" class='leadgen__form-input' placeholder='E-Mail'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                                <div class="leadgen__form-error">Bitte geben Sie Ihre E-Mail-Adresse ein</div>
                            </div>
                            <div class="leadgen__form-container">
                                <div class="leadgen__form-row">
                                    <input type="tel" id="leadgen_phone" data-validaton="leadgen-input-phone" name="telnumber" class='leadgen__form-input'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                                <div class="leadgen__form-error">Bitte geben Sie eine gültige Telefonnummer ein</div>
                            </div>
                        </div>
                        <div class="leadgen__form-area">
                            <div class="leadgen__form-container leadgen__form-container--name">
                                <div class="leadgen__form-row">
                                    <input type="text" id="leadgen_first_name" class='leadgen__form-input' name="firstname" data-validaton="leadgen-input-text" placeholder='Vorname'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                                <div class="leadgen__form-error">Bitte geben Sie Ihren Vornamen ein</div>
                            </div>
                            <div class="leadgen__form-container leadgen__form-container--name">
                                <div class="leadgen__form-row">
                                    <input type="text" id="leadgen_last_name" class='leadgen__form-input' name="lastname" data-validaton="leadgen-input-text" placeholder='Nachname'>
                                    <i class="leadgen__form-focus"></i>
                                    <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                </div>
                                <div class="leadgen__form-error">Bitte geben Sie Ihren Nachname ein</div>
                            </div>
                        </div>
                        <div class="leadgen__form-btn-holder">
                            <button type="submit" class="leadgen__form-btn js-leadgen-submit">
                                Kostenlos anfragen
                                <div class="leadgen__form-spinner">
                                    <div class="leadgen__form-bounce1"></div>
                                    <div class="leadgen__form-bounce2"></div>
                                    <div class="leadgen__form-bounce3"></div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="leadgen-hidden-input">
                      <input type="text" hidden id="street_number_from" name="street_number">
                      <input type="text" hidden id="route_from" name="street_name">
                      <input type="text" hidden id="locality_from" name="fromCity">
                      <input type="text" hidden id="postal_code_from" name="fromZip">
                      <input type="text" hidden id="from-street" class="street_from" name="fromStreet">
                      <input type="text" hidden id="street_number_to" name="street_number_to">
                      <input type="text" hidden id="route_to" name="street_name_to">
                      <input type="text" hidden id="locality_to" name="toCity">
                      <input type="text" hidden id="postal_code_to" name="toZip">
                      <input type="text" hidden id="to-street" class="street_to" name="toStreet">
                      <input type="text" hidden id="leadgen_landing" name="landing">
                    </div>
                </form>
            </div>`;
        }

      renderV4 () {
        this.el.innerHTML = `
              <div class="leadgen__container">
                <strong class="leadgen__title">Jetzt kostenloses Umzugsangebot erhalten</strong>
                <form class="leadgen__form js-leadgen-validation" action="https://umzug.movinga.de/plan/entry/${this.sid}" method="POST" onkeypress="return event.keyCode != 13;">
                    <div class="leadgen__form-wrapper">
                        <div class="leadgen__form-container leadgen__form-container--sid">
                            <div class="leadgen__form-row">
                                <span class="leadgen__form-holder">
                                    <span class="leadgen-icon-code"></span>
                                </span>
                                <input type="text" id="leadgen_sid" value=${this.sid} data-validaton="leadgen-input-text" placeholder="SID" readonly name="sid" class='leadgen__form-input'>
                                <i class="leadgen__form-focus"></i>
                                <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                <div class="leadgen__form-error">Bitte geben Sie eine gültige SID</div>
                            </div>
                        </div>
                        <div class="leadgen__form-container leadgen__form-container--date">
                            <div class="leadgen__form-row">
                <span class="leadgen__form-holder">
                    <span class="leadgen-icon-calendar"></span>
                </span>
                                <input id="js-leadgen-datepicker" name="dateMoving" readonly data-validaton="leadgen-input-date" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Umzugsdatum'>
                                <i class="leadgen__form-focus"></i>
                                <i class="leadgen__form-valid leadgen-icon-validation"></i>
                            </div>
                            <div class="leadgen__datepicker-holder"></div>
                        </div>
                        <div class="leadgen__form-container leadgen__form-container--email">
                            <div class="leadgen__form-row">
                <span class="leadgen__form-holder">
                    <span class="leadgen-icon-clock"></span>
                </span>
                                <input type="text" id="leadgen_time" data-validaton="leadgen-input-time" name="time" class='leadgen__form-input' placeholder='Time'>
                                <i class="leadgen__form-focus"></i>
                                <i class="leadgen__form-valid leadgen-icon-validation"></i>
                                <div id="timepicker-container"></div>
                                <div class="leadgen__form-error">Bitte geben Sie Ihre Zeit</div>
                            </div>
                        </div>
                        <div class="leadgen__form-btn-holder">
                            <button type="submit" class="leadgen__form-btn js-leadgen-submit">
                                Angebot berechnen
                                <div class="leadgen__form-spinner">
                                    <div class="leadgen__form-bounce1"></div>
                                    <div class="leadgen__form-bounce2"></div>
                                    <div class="leadgen__form-bounce3"></div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="leadgen-hidden-input">
                      <input type="text" hidden id="street_number_from" name="street_number">
                      <input type="text" hidden id="route_from" name="street_name">
                      <input type="text" hidden id="locality_from" name="fromCity">
                      <input type="text" hidden id="postal_code_from" name="fromZip">
                      <input type="text" hidden id="from-street" class="street_from" name="fromStreet">
                      <input type="text" hidden id="street_number_to" name="street_number_to">
                      <input type="text" hidden id="route_to" name="street_name_to">
                      <input type="text" hidden id="locality_to" name="toCity">
                      <input type="text" hidden id="postal_code_to" name="toZip">
                      <input type="text" hidden id="to-street" class="street_to" name="toStreet">
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
                <p class="leadgen__info">Ihre Daten werden nicht an Dritte weitergegeben. Ihr persönlicher Umzugsberater wird sich mit Ihnen in Verbindung setzen und Sie durch das Angebot führen.</p>
            </div>`;
      }

        renderFRV0 () {
            this.el.innerHTML = `
              <div class="leadgen__container">
                <strong class="leadgen__title">Recevez votre devis gratuit en 3 min !</strong>
                <form class="leadgen__form js-leadgen-validation" action="https://demenagement.movinga.fr/plan/entry/" method="POST" onkeypress="return event.keyCode != 13;">
                    <div class="leadgen__form-container leadgen__form-container--list">
                        <div class="leadgen__form-row leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-start"></span>
              </span>
                            <input data-validaton="leadgen-input-address" id="leadgen-date-from" data-leadgen-address="address-from" name="address-from" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Adresse de départ'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                            <div class="leadgen__form-error">Veuillez sélectionner dans la liste des adresses suggérées</div>
                        </div>
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-end"></span>
              </span>
                            <input data-validaton="leadgen-input-address" data-leadgen-address="address-to" id="leadgen-date-to" name="address-to" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Adresse de d’arrivée'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                            <div class="leadgen__form-error">Veuillez sélectionner dans la liste des adresses suggérées</div>
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
                        <div class="leadgen__datepicker-holder"></div>
                    </div>
                    <div class="leadgen__form-container leadgen__form-container--row">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-name"></span>
              </span>
                            <input type="text" id="leadgen_first_name" class='leadgen__form-input' name="firstname" data-validaton="leadgen-input-text" placeholder='Prénom'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                            <div class="leadgen__form-error">Veuillez svp entrer votre prénom</div>
                        </div>
                        <div class="leadgen__form-row">
                            <input type="text" id="leadgen_last_name" class='leadgen__form-input' name="lastname" data-validaton="leadgen-input-text" placeholder='Nom'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                            <div class="leadgen__form-error">Veuillez svp entrer votre nom</div>
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
                        <div class="leadgen__form-error">Veuillez svp entrer votre Email</div>
                    </div>
                    <div class="leadgen__form-container">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-phone"></span>
              </span>
                            <input type="tel" id="leadgen_phone" data-validaton="leadgen-input-phone" name="telnumber" class='leadgen__form-input'>
                            <i class="leadgen__form-focus"></i>
                            <i class="leadgen__form-valid leadgen-icon-validation"></i>
                        </div>
                        <div class="leadgen__form-error">Veuillez svp entrer un numéro valide</div>
                    </div>
                    <div class="leadgen__form-btn-holder">
                        <button type="submit" class="leadgen__form-btn js-leadgen-submit">
                            DEVIS GRATUIT
                            <div class="leadgen__form-spinner">
                                <div class="leadgen__form-bounce1"></div>
                                <div class="leadgen__form-bounce2"></div>
                                <div class="leadgen__form-bounce3"></div>
                            </div>
                        </button>
                    </div>
                    <div class="leadgen-hidden-input">
                      <input type="text" hidden id="street_number_from" name="street_number">
                      <input type="text" hidden id="route_from" name="street_name">
                      <input type="text" hidden id="locality_from" name="fromCity">
                      <input type="text" hidden id="postal_code_from" name="fromZip">
                      <input type="text" hidden id="from-street" class="street_from" name="fromStreet">
                      <input type="text" hidden id="street_number_to" name="street_number_to">
                      <input type="text" hidden id="route_to" name="street_name_to">
                      <input type="text" hidden id="locality_to" name="toCity">
                      <input type="text" hidden id="postal_code_to" name="toZip">
                      <input type="text" hidden id="to-street" class="street_to" name="toStreet">
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