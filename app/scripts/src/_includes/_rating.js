(function () {
    'use strict';

    class TrustedshopsData {
        constructor(el) {
            const descriptionSpan = el.querySelector('.leadgen__trusted-text i');
            const markSpan = el.querySelector('.leadgen__trusted-text span');
            const ratingStars = el.querySelector('.leadgen__trusted-stars--top');
            let hash;

            if (leadgen_locale == 'de') {
                hash = 'X5A16CAEF1D1E1E3FD408FA918B69A571'
            } else {
                hash = 'X27D6240BF3BE3EAD61877146E7518CF4'
            }

            let xhr = new XMLHttpRequest();
            xhr.open('GET', `https://api.trustedshops.com/rest/public/v2/shops/${hash}/quality`, true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Accept-Language', leadgen_locale);
            xhr.send();

            xhr.onreadystatechange = function() {
                if (this.readyState != 4) return;

                if (this.status != 200) {
                    console.log( 'Error: ' + (this.status ? this.statusText : 'request not send') );
                    return;
                }

                let data = JSON.parse(xhr.responseText);

                const reviewIndicator = data.response.data.shop.qualityIndicators.reviewIndicator;
                const percentageRating = reviewIndicator.overallMark / 5 * 100;

                descriptionSpan.innerHTML = (`"${reviewIndicator.overallMarkDescriptionGUILang}"`);
                markSpan.innerHTML = (`${reviewIndicator.overallMark}/5.00`);
                ratingStars.style.width = `${percentageRating}%`;
            }
        }
    }
    window.TrustedshopsData = TrustedshopsData;
})();