(function () {
    'use strict';

    class View {

        constructor(el) {
            this.el = el;

            this.render();
        }

        // !!! Will be changed if future !!!

        render () {
            this.el.innerHTML = `
              <div class="leadgen__container">
                <strong class="leadgen__title">Jetzt kostenloses Umzugsangebot erhalten</strong>
                <form class="leadgen__form js-leadgen-validation" action="https://umzug.movinga.de/plan/entry" method="POST">
                    <div class="leadgen__form-container leadgen__form-container--list">
                        <div class="leadgen__form-row leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-start"></span>
              </span>
                            <input data-validaton="leadgen-input-address" data-leadgen-address="address-from" name="address-from" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Auszugsort'>
                            <i class="leadgen__form-focus"></i>
                        </div>
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-end"></span>
              </span>
                            <input data-validaton="leadgen-input-address" data-leadgen-address="address-to" name="address-to" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Einzugsort'>
                            <i class="leadgen__form-focus"></i>
                        </div>
                    </div>
                    <div class="leadgen__form-container">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-calendar"></span>
              </span>
                            <input id="js-leadgen-datepicker" name="date" readonly data-validaton="leadgen-input-date" autocomplete="off" type="text" class='leadgen__form-input' placeholder='Umzugsdatum'>
                            <i class="leadgen__form-focus"></i>
                        </div>
                    </div>
                    <div class="leadgen__form-container">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-mail"></span>
              </span>
                            <input type="email" data-validaton="leadgen-input-email" name="email" class='leadgen__form-input' placeholder='E-Mail'>
                            <i class="leadgen__form-focus"></i>
                        </div>
                    </div>
                    <div class="leadgen__form-container">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-phone"></span>
              </span>
                            <input type="tel" data-validaton="leadgen-input-phone" name="phone" class='leadgen__form-input' placeholder='Telefonnummer'>
                            <i class="leadgen__form-focus"></i>
                        </div>
                    </div>
                    <div class="leadgen__form-container leadgen__form-container--row">
                        <div class="leadgen__form-row">
              <span class="leadgen__form-holder">
                <span class="leadgen-icon-name"></span>
              </span>
                            <input type="text" class='leadgen__form-input' name="first-name" data-validaton="leadgen-input-text" placeholder='Vorname'>
                            <i class="leadgen__form-focus"></i>
                        </div>
                        <div class="leadgen__form-row">
                            <input type="text" class='leadgen__form-input' name="last-name" data-validaton="leadgen-input-text" placeholder='Nachname'>
                            <i class="leadgen__form-focus"></i>
                        </div>
                    </div>
                    <button type="submit" class="leadgen__form-btn js-leadgen-submit">Angebot berechnen</button>
                </form>
                <ul class="leadgen__list">
                    <li class="leadgen__list-item">
                        <div class="leadgen__trusted">
                            <img class="leadgen__trusted-img" src="images/logo-trusted.png" width="35" height="35" alt="trusted">
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
                                <span class="leadgen__trusted-text">“Sehr gut” 4.66/5.00</span>
                            </div>
                        </div>
                    </li>
                    <li class="leadgen__list-item">
                        <img src="images/logo-immobilen.png" width="45" height="40" alt="immobilen">
                    </li>
                    <li class="leadgen__list-item">
                        <img src="images/logo-iam.png" width="52" height="25" alt="aim">
                    </li>
                </ul>
                <p class="leadgen__info">Ihre Daten werden nicht an Dritte weitergegeben. Ihr persönlicher Umzugsberater wird sich mit Ihnen in Verbindung setzen und Sie durch das Angebot führen.</p>
            </div>`;
        }
    }

    // export
    window.View = View;
})();