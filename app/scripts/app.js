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
let leadgen_holidays = {
    "de": {
        "2017": ["2017-01-01", "2017-04-14", "2017-04-17", "2017-05-01", "2017-05-25", "2017-06-05", "2017-10-03", "2017-10-31", "2017-12-25", "2017-12-26"],
        "2018": ["2018-01-01", "2018-03-30", "2018-04-02", "2018-05-01", "2018-05-10", "2018-05-21", "2018-10-03", "2018-12-25", "2018-12-26"],
        "2019": ["2019-01-01", "2019-04-19", "2019-04-22", "2019-05-01", "2019-05-30", "2019-06-10", "2019-10-03", "2019-12-25", "2019-12-26"],
        "2020": ["2020-01-01", "2020-04-10", "2020-04-13", "2020-05-01", "2020-05-21", "2020-06-01", "2020-10-03", "2020-12-25", "2020-12-26"],
        "2021": ["2021-01-01", "2021-04-02", "2021-04-05", "2021-05-01", "2021-05-13", "2021-05-24", "2021-10-03", "2021-12-25", "2021-12-26"],
        "2022": ["2022-01-01", "2022-04-15", "2022-04-18", "2022-05-01", "2022-05-26", "2022-06-06", "2022-10-03", "2022-12-25", "2022-12-26"],
        "2023": ["2023-01-01", "2023-04-07", "2023-04-10", "2023-05-01", "2023-05-18", "2023-05-29", "2023-10-03", "2023-12-25", "2023-12-26"],
        "2024": ["2024-01-01", "2024-03-29", "2024-04-01", "2024-05-01", "2024-05-09", "2024-05-20", "2024-10-03", "2024-12-25", "2024-12-26"],
        "2025": ["2025-01-01", "2025-04-18", "2025-04-21", "2025-05-01", "2025-05-29", "2025-06-09", "2025-10-03", "2025-12-25", "2025-12-26"],
        "2026": ["2026-01-01", "2026-04-03", "2026-04-06", "2026-05-01", "2026-05-14", "2026-05-25", "2026-10-03", "2026-12-25", "2026-12-26"],
        "2027": ["2027-01-01", "2027-03-26", "2027-03-29", "2027-05-01", "2027-05-06", "2027-05-17", "2027-10-03", "2027-12-25", "2027-12-26"],
        "2028": ["2028-01-01", "2028-04-14", "2028-04-17", "2028-05-01", "2028-05-25", "2028-06-05", "2028-10-03", "2028-12-25", "2028-12-26"],
        "2029": ["2029-01-01", "2029-03-30", "2029-04-02", "2029-05-01", "2029-05-10", "2029-05-21", "2029-10-03", "2029-12-25", "2029-12-26"],
        "2030": ["2030-01-01", "2030-04-19", "2030-04-22", "2030-05-01", "2030-05-30", "2030-06-10", "2030-10-03", "2030-12-25", "2030-12-26"]
    },
    "fr": {
        "2017": ["2017-01-01", "2017-04-17", "2017-05-01", "2017-05-08", "2017-05-25", "2017-06-05", "2017-07-14", "2017-08-15", "2017-11-01", "2017-11-11", "2017-12-25"],
        "2018": ["2018-01-01", "2018-04-02", "2018-05-01", "2018-05-08", "2018-05-10", "2018-05-21", "2018-07-14", "2018-08-15", "2018-11-01", "2018-11-11", "2018-12-25"],
        "2019": ["2019-01-01", "2019-04-22", "2019-05-01", "2019-05-08", "2019-05-30", "2019-06-10", "2019-07-14", "2019-08-15", "2019-11-01", "2019-11-11", "2019-12-25"],
        "2020": ["2020-01-01", "2020-04-13", "2020-05-01", "2020-05-08", "2020-05-21", "2020-06-01", "2020-07-14", "2020-08-15", "2020-11-01", "2020-11-11", "2020-12-25"],
        "2021": ["2021-01-01", "2021-04-05", "2021-05-01", "2021-05-08", "2021-05-13", "2021-05-24", "2021-07-14", "2021-08-15", "2021-11-01", "2021-11-11", "2021-12-25"],
        "2022": ["2022-01-01", "2022-04-18", "2022-05-01", "2022-05-08", "2022-05-26", "2022-06-06", "2022-07-14", "2022-08-15", "2022-11-01", "2022-11-11", "2022-12-25"],
        "2023": ["2023-01-01", "2023-04-10", "2023-05-01", "2023-05-08", "2023-05-18", "2023-05-29", "2023-07-14", "2023-08-15", "2023-11-01", "2023-11-11", "2023-12-25"],
        "2024": ["2024-01-01", "2024-04-01", "2024-05-01", "2024-05-08", "2024-05-09", "2024-05-20", "2024-07-14", "2024-08-15", "2024-11-01", "2024-11-11", "2024-12-25"],
        "2025": ["2025-01-01", "2025-04-21", "2025-05-01", "2025-05-08", "2025-05-29", "2025-06-09", "2025-07-14", "2025-08-15", "2025-11-01", "2025-11-11", "2025-12-25"],
        "2026": ["2026-01-01", "2026-04-06", "2026-05-01", "2026-05-08", "2026-05-14", "2026-05-25", "2026-07-14", "2026-08-15", "2026-11-01", "2026-11-11", "2026-12-25"],
        "2027": ["2027-01-01", "2027-03-29", "2027-05-01", "2027-05-08", "2027-05-06", "2027-05-17", "2027-07-14", "2027-08-15", "2027-11-01", "2027-11-11", "2027-12-25"],
        "2028": ["2028-01-01", "2028-04-17", "2028-05-01", "2028-05-08", "2028-05-25", "2028-06-05", "2028-07-14", "2028-08-15", "2028-11-01", "2028-11-11", "2028-12-25"],
        "2029": ["2029-01-01", "2029-04-02", "2029-05-01", "2029-05-08", "2029-05-10", "2029-05-21", "2029-07-14", "2029-08-15", "2029-11-01", "2029-11-11", "2029-12-25"],
        "2030": ["2030-01-01", "2030-04-22", "2030-05-01", "2030-05-08", "2030-05-30", "2030-06-10", "2030-07-14", "2030-08-15", "2030-11-01", "2030-11-11", "2030-12-25"]
    }
}
/*!
 * gulp-boilerplate v4.2.3: My Gulp.js boilerplate for creating new web projects
 * (c) 2017 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/Plugin
 */

//! moment.js
//! version : 2.17.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return od.apply(null,arguments)}
// This is done to register the method called with moment()
// without creating circular dependencies.
    function b(a){od=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){
// IE8 will treat undefined and null as object if it wasn't for
// input != null
        return null!=a&&"[object Object]"===Object.prototype.toString.call(a)}function e(a){var b;for(b in a)
// even if its not own property I'd still call it non-empty
        return!1;return!0}function f(a){return"number"==typeof a||"[object Number]"===Object.prototype.toString.call(a)}function g(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function h(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function i(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function j(a,b){for(var c in b)i(b,c)&&(a[c]=b[c]);return i(b,"toString")&&(a.toString=b.toString),i(b,"valueOf")&&(a.valueOf=b.valueOf),a}function k(a,b,c,d){return rb(a,b,c,d,!0).utc()}function l(){
// We need to deep clone this object.
        return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function m(a){return null==a._pf&&(a._pf=l()),a._pf}function n(a){if(null==a._isValid){var b=m(a),c=qd.call(b.parsedDateParts,function(a){return null!=a}),d=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.invalidWeekday&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated&&(!b.meridiem||b.meridiem&&c);if(a._strict&&(d=d&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour),null!=Object.isFrozen&&Object.isFrozen(a))return d;a._isValid=d}return a._isValid}function o(a){var b=k(NaN);return null!=a?j(m(b),a):m(b).userInvalidated=!0,b}function p(a){return void 0===a}function q(a,b){var c,d,e;if(p(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),p(b._i)||(a._i=b._i),p(b._f)||(a._f=b._f),p(b._l)||(a._l=b._l),p(b._strict)||(a._strict=b._strict),p(b._tzm)||(a._tzm=b._tzm),p(b._isUTC)||(a._isUTC=b._isUTC),p(b._offset)||(a._offset=b._offset),p(b._pf)||(a._pf=m(b)),p(b._locale)||(a._locale=b._locale),rd.length>0)for(c in rd)d=rd[c],e=b[d],p(e)||(a[d]=e);return a}
// Moment prototype object
    function r(b){q(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),
// Prevent infinite loop in case updateOffset creates new moment
// objects.
    sd===!1&&(sd=!0,a.updateOffset(this),sd=!1)}function s(a){return a instanceof r||null!=a&&null!=a._isAMomentObject}function t(a){return a<0?Math.ceil(a)||0:Math.floor(a)}function u(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=t(b)),c}
// compare two arrays, return the number of differences
    function v(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;d<e;d++)(c&&a[d]!==b[d]||!c&&u(a[d])!==u(b[d]))&&g++;return g+f}function w(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function x(b,c){var d=!0;return j(function(){if(null!=a.deprecationHandler&&a.deprecationHandler(null,b),d){for(var e,f=[],g=0;g<arguments.length;g++){if(e="","object"==typeof arguments[g]){e+="\n["+g+"] ";for(var h in arguments[0])e+=h+": "+arguments[0][h]+", ";e=e.slice(0,-2)}else e=arguments[g];f.push(e)}w(b+"\nArguments: "+Array.prototype.slice.call(f).join("")+"\n"+(new Error).stack),d=!1}return c.apply(this,arguments)},c)}function y(b,c){null!=a.deprecationHandler&&a.deprecationHandler(b,c),td[b]||(w(c),td[b]=!0)}function z(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function A(a){var b,c;for(c in a)b=a[c],z(b)?this[c]=b:this["_"+c]=b;this._config=a,
// Lenient ordinal parsing accepts just a number in addition to
// number + (possibly) stuff coming from _ordinalParseLenient.
      this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function B(a,b){var c,e=j({},a);for(c in b)i(b,c)&&(d(a[c])&&d(b[c])?(e[c]={},j(e[c],a[c]),j(e[c],b[c])):null!=b[c]?e[c]=b[c]:delete e[c]);for(c in a)i(a,c)&&!i(b,c)&&d(a[c])&&(
// make sure changes to properties don't modify parent config
      e[c]=j({},e[c]));return e}function C(a){null!=a&&this.set(a)}function D(a,b,c){var d=this._calendar[a]||this._calendar.sameElse;return z(d)?d.call(b,c):d}function E(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function F(){return this._invalidDate}function G(a){return this._ordinal.replace("%d",a)}function H(a,b,c,d){var e=this._relativeTime[c];return z(e)?e(a,b,c,d):e.replace(/%d/i,a)}function I(a,b){var c=this._relativeTime[a>0?"future":"past"];return z(c)?c(b):c.replace(/%s/i,b)}function J(a,b){var c=a.toLowerCase();Dd[c]=Dd[c+"s"]=Dd[b]=a}function K(a){return"string"==typeof a?Dd[a]||Dd[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)i(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(a,b){Ed[a]=b}function N(a){var b=[];for(var c in a)b.push({unit:c,priority:Ed[c]});return b.sort(function(a,b){return a.priority-b.priority}),b}function O(b,c){return function(d){return null!=d?(Q(this,b,d),a.updateOffset(this,c),this):P(this,b)}}function P(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function Q(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}
// MOMENTS
    function R(a){return a=K(a),z(this[a])?this[a]():this}function S(a,b){if("object"==typeof a){a=L(a);for(var c=N(a),d=0;d<c.length;d++)this[c[d].unit](a[c[d].unit])}else if(a=K(a),z(this[a]))return this[a](b);return this}function T(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}
// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
    function U(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Id[a]=e),b&&(Id[b[0]]=function(){return T(e.apply(this,arguments),b[1],b[2])}),c&&(Id[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function V(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function W(a){var b,c,d=a.match(Fd);for(b=0,c=d.length;b<c;b++)Id[d[b]]?d[b]=Id[d[b]]:d[b]=V(d[b]);return function(b){var e,f="";for(e=0;e<c;e++)f+=d[e]instanceof Function?d[e].call(b,a):d[e];return f}}
// format date using native date object
    function X(a,b){return a.isValid()?(b=Y(b,a.localeData()),Hd[b]=Hd[b]||W(b),Hd[b](a)):a.localeData().invalidDate()}function Y(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Gd.lastIndex=0;d>=0&&Gd.test(a);)a=a.replace(Gd,c),Gd.lastIndex=0,d-=1;return a}function Z(a,b,c){$d[a]=z(b)?b:function(a,d){return a&&c?c:b}}function $(a,b){return i($d,a)?$d[a](b._strict,b._locale):new RegExp(_(a))}
// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function _(a){return aa(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function aa(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function ba(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),f(b)&&(d=function(a,c){c[b]=u(a)}),c=0;c<a.length;c++)_d[a[c]]=d}function ca(a,b){ba(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function da(a,b,c){null!=b&&i(_d,a)&&_d[a](b,c._a,c,a)}function ea(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function fa(a,b){return a?c(this._months)?this._months[a.month()]:this._months[(this._months.isFormat||ke).test(b)?"format":"standalone"][a.month()]:this._months}function ga(a,b){return a?c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[ke.test(b)?"format":"standalone"][a.month()]:this._monthsShort}function ha(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._monthsParse)for(
// this is not used
      this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],d=0;d<12;++d)f=k([2e3,d]),this._shortMonthsParse[d]=this.monthsShort(f,"").toLocaleLowerCase(),this._longMonthsParse[d]=this.months(f,"").toLocaleLowerCase();return c?"MMM"===b?(e=je.call(this._shortMonthsParse,g),e!==-1?e:null):(e=je.call(this._longMonthsParse,g),e!==-1?e:null):"MMM"===b?(e=je.call(this._shortMonthsParse,g),e!==-1?e:(e=je.call(this._longMonthsParse,g),e!==-1?e:null)):(e=je.call(this._longMonthsParse,g),e!==-1?e:(e=je.call(this._shortMonthsParse,g),e!==-1?e:null))}function ia(a,b,c){var d,e,f;if(this._monthsParseExact)return ha.call(this,a,b,c);
// TODO: add sorting
// Sorting makes sure if one month (or abbr) is a prefix of another
// see sorting in computeMonthsParse
        for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;d<12;d++){
// test the regex
            if(
// make the regex if we don't have it already
              e=k([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}
// MOMENTS
    function ja(a,b){var c;if(!a.isValid())
// No op
        return a;if("string"==typeof b)if(/^\d+$/.test(b))b=u(b);else
// TODO: Another silent failure?
    if(b=a.localeData().monthsParse(b),!f(b))return a;return c=Math.min(a.date(),ea(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ka(b){return null!=b?(ja(this,b),a.updateOffset(this,!0),this):P(this,"Month")}function la(){return ea(this.year(),this.month())}function ma(a){return this._monthsParseExact?(i(this,"_monthsRegex")||oa.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):(i(this,"_monthsShortRegex")||(this._monthsShortRegex=ne),this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex)}function na(a){return this._monthsParseExact?(i(this,"_monthsRegex")||oa.call(this),a?this._monthsStrictRegex:this._monthsRegex):(i(this,"_monthsRegex")||(this._monthsRegex=oe),this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex)}function oa(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;b<12;b++)
// make the regex if we don't have it already
        c=k([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(
// Sorting makes sure if one month (or abbr) is a prefix of another it
// will match the longer piece.
      d.sort(a),e.sort(a),f.sort(a),b=0;b<12;b++)d[b]=aa(d[b]),e[b]=aa(e[b]);for(b=0;b<24;b++)f[b]=aa(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")","i")}
// HELPERS
    function pa(a){return qa(a)?366:365}function qa(a){return a%4===0&&a%100!==0||a%400===0}function ra(){return qa(this.year())}function sa(a,b,c,d,e,f,g){
//can't just apply() to create a date:
//http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var h=new Date(a,b,c,d,e,f,g);
//the date constructor remaps years 0-99 to 1900-1999
        return a<100&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function ta(a){var b=new Date(Date.UTC.apply(null,arguments));
//the Date.UTC function remaps years 0-99 to 1900-1999
        return a<100&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}
// start-of-first-week - start-of-year
    function ua(a,b,c){var// first-week day -- which january is always in the first week (4 for iso, 1 for other)
      d=7+b-c,
// first-week day local weekday -- which local weekday is fwd
      e=(7+ta(a,0,d).getUTCDay()-b)%7;return-e+d-1}
//http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function va(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ua(a,d,e),j=1+7*(b-1)+h+i;return j<=0?(f=a-1,g=pa(f)+j):j>pa(a)?(f=a+1,g=j-pa(a)):(f=a,g=j),{year:f,dayOfYear:g}}function wa(a,b,c){var d,e,f=ua(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return g<1?(e=a.year()-1,d=g+xa(e,b,c)):g>xa(a.year(),b,c)?(d=g-xa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function xa(a,b,c){var d=ua(a,b,c),e=ua(a+1,b,c);return(pa(a)-d+e)/7}
// HELPERS
// LOCALES
    function ya(a){return wa(a,this._week.dow,this._week.doy).week}function za(){return this._week.dow}function Aa(){return this._week.doy}
// MOMENTS
    function Ba(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function Ca(a){var b=wa(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}
// HELPERS
    function Da(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function Ea(a,b){return"string"==typeof a?b.weekdaysParse(a)%7||7:isNaN(a)?null:a}function Fa(a,b){return a?c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]:this._weekdays}function Ga(a){return a?this._weekdaysShort[a.day()]:this._weekdaysShort}function Ha(a){return a?this._weekdaysMin[a.day()]:this._weekdaysMin}function Ia(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],d=0;d<7;++d)f=k([2e3,1]).day(d),this._minWeekdaysParse[d]=this.weekdaysMin(f,"").toLocaleLowerCase(),this._shortWeekdaysParse[d]=this.weekdaysShort(f,"").toLocaleLowerCase(),this._weekdaysParse[d]=this.weekdays(f,"").toLocaleLowerCase();return c?"dddd"===b?(e=je.call(this._weekdaysParse,g),e!==-1?e:null):"ddd"===b?(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:null):(e=je.call(this._minWeekdaysParse,g),e!==-1?e:null):"dddd"===b?(e=je.call(this._weekdaysParse,g),e!==-1?e:(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:(e=je.call(this._minWeekdaysParse,g),e!==-1?e:null))):"ddd"===b?(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:(e=je.call(this._weekdaysParse,g),e!==-1?e:(e=je.call(this._minWeekdaysParse,g),e!==-1?e:null))):(e=je.call(this._minWeekdaysParse,g),e!==-1?e:(e=je.call(this._weekdaysParse,g),e!==-1?e:(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:null)))}function Ja(a,b,c){var d,e,f;if(this._weekdaysParseExact)return Ia.call(this,a,b,c);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;d<7;d++){
// test the regex
        if(
// make the regex if we don't have it already
          e=k([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}
// MOMENTS
    function Ka(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Da(a,this.localeData()),this.add(a-b,"d")):b}function La(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Ma(a){if(!this.isValid())return null!=a?this:NaN;
// behaves the same as moment#day except
// as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
// as a setter, sunday should belong to the previous week.
        if(null!=a){var b=Ea(a,this.localeData());return this.day(this.day()%7?b:b-7)}return this.day()||7}function Na(a){return this._weekdaysParseExact?(i(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysStrictRegex:this._weekdaysRegex):(i(this,"_weekdaysRegex")||(this._weekdaysRegex=ue),this._weekdaysStrictRegex&&a?this._weekdaysStrictRegex:this._weekdaysRegex)}function Oa(a){return this._weekdaysParseExact?(i(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(i(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=ve),this._weekdaysShortStrictRegex&&a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function Pa(a){return this._weekdaysParseExact?(i(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(i(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=we),this._weekdaysMinStrictRegex&&a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function Qa(){function a(a,b){return b.length-a.length}var b,c,d,e,f,g=[],h=[],i=[],j=[];for(b=0;b<7;b++)
// make the regex if we don't have it already
        c=k([2e3,1]).day(b),d=this.weekdaysMin(c,""),e=this.weekdaysShort(c,""),f=this.weekdays(c,""),g.push(d),h.push(e),i.push(f),j.push(d),j.push(e),j.push(f);for(
// Sorting makes sure if one weekday (or abbr) is a prefix of another it
// will match the longer piece.
      g.sort(a),h.sort(a),i.sort(a),j.sort(a),b=0;b<7;b++)h[b]=aa(h[b]),i[b]=aa(i[b]),j[b]=aa(j[b]);this._weekdaysRegex=new RegExp("^("+j.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+h.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+g.join("|")+")","i")}
// FORMATTING
    function Ra(){return this.hours()%12||12}function Sa(){return this.hours()||24}function Ta(a,b){U(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}
// PARSING
    function Ua(a,b){return b._meridiemParse}
// LOCALES
    function Va(a){
// IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
// Using charAt should be more compatible.
        return"p"===(a+"").toLowerCase().charAt(0)}function Wa(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Xa(a){return a?a.toLowerCase().replace("_","-"):a}
// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function Ya(a){for(var b,c,d,e,f=0;f<a.length;){for(e=Xa(a[f]).split("-"),b=e.length,c=Xa(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=Za(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&v(e,c,!0)>=b-1)
//the next array item is better than a shallower substring of this one
        break;b--}f++}return null}function Za(a){var b=null;
// TODO: Find a better way to register and load all the locales in Node
        if(!Be[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=xe._abbr,require("./locale/"+a),
// because defineLocale currently also sets the global locale, we
// want to undo that for lazy loaded locales
          $a(b)}catch(a){}return Be[a]}
// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
    function $a(a,b){var c;
// moment.duration._locale = moment._locale = data;
        return a&&(c=p(b)?bb(a):_a(a,b),c&&(xe=c)),xe._abbr}function _a(a,b){if(null!==b){var c=Ae;if(b.abbr=a,null!=Be[a])y("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),c=Be[a]._config;else if(null!=b.parentLocale){if(null==Be[b.parentLocale])return Ce[b.parentLocale]||(Ce[b.parentLocale]=[]),Ce[b.parentLocale].push({name:a,config:b}),null;c=Be[b.parentLocale]._config}
// backwards compat for now: also set the locale
// make sure we set the locale AFTER all child locales have been
// created, so we won't end up with the child locale set.
        return Be[a]=new C(B(c,b)),Ce[a]&&Ce[a].forEach(function(a){_a(a.name,a.config)}),$a(a),Be[a]}
// useful for testing
        return delete Be[a],null}function ab(a,b){if(null!=b){var c,d=Ae;
// MERGE
        null!=Be[a]&&(d=Be[a]._config),b=B(d,b),c=new C(b),c.parentLocale=Be[a],Be[a]=c,
// backwards compat for now: also set the locale
          $a(a)}else
// pass null for config to unupdate, useful for tests
        null!=Be[a]&&(null!=Be[a].parentLocale?Be[a]=Be[a].parentLocale:null!=Be[a]&&delete Be[a]);return Be[a]}
// returns locale data
    function bb(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return xe;if(!c(a)){if(
//short-circuit everything else
      b=Za(a))return b;a=[a]}return Ya(a)}function cb(){return wd(Be)}function db(a){var b,c=a._a;return c&&m(a).overflow===-2&&(b=c[be]<0||c[be]>11?be:c[ce]<1||c[ce]>ea(c[ae],c[be])?ce:c[de]<0||c[de]>24||24===c[de]&&(0!==c[ee]||0!==c[fe]||0!==c[ge])?de:c[ee]<0||c[ee]>59?ee:c[fe]<0||c[fe]>59?fe:c[ge]<0||c[ge]>999?ge:-1,m(a)._overflowDayOfYear&&(b<ae||b>ce)&&(b=ce),m(a)._overflowWeeks&&b===-1&&(b=he),m(a)._overflowWeekday&&b===-1&&(b=ie),m(a).overflow=b),a}
// date from iso format
    function eb(a){var b,c,d,e,f,g,h=a._i,i=De.exec(h)||Ee.exec(h);if(i){for(m(a).iso=!0,b=0,c=Ge.length;b<c;b++)if(Ge[b][1].exec(i[1])){e=Ge[b][0],d=Ge[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=He.length;b<c;b++)if(He[b][1].exec(i[3])){
// match[2] should be 'T' or space
        f=(i[2]||" ")+He[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Fe.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),kb(a)}else a._isValid=!1}
// date from iso format or fallback
    function fb(b){var c=Ie.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(eb(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}
// Pick the first defined of two or three arguments.
    function gb(a,b,c){return null!=a?a:null!=b?b:c}function hb(b){
// hooks is actually the exported moment object
        var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}
// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
    function ib(a){var b,c,d,e,f=[];if(!a._d){
// Default to current date.
// * if no year, month, day of month are given, default to today
// * if day of month is given, default month and year
// * if month is given, default only year
// * if year is given, don't default anything
        for(d=hb(a),
//compute day of the year from weeks and weekdays
            a._w&&null==a._a[ce]&&null==a._a[be]&&jb(a),
//if the day of the year is set, figure out what it is
            a._dayOfYear&&(e=gb(a._a[ae],d[ae]),a._dayOfYear>pa(e)&&(m(a)._overflowDayOfYear=!0),c=ta(e,0,a._dayOfYear),a._a[be]=c.getUTCMonth(),a._a[ce]=c.getUTCDate()),b=0;b<3&&null==a._a[b];++b)a._a[b]=f[b]=d[b];
// Zero out whatever was not defaulted, including time
        for(;b<7;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];
// Check for 24:00:00.000
        24===a._a[de]&&0===a._a[ee]&&0===a._a[fe]&&0===a._a[ge]&&(a._nextDay=!0,a._a[de]=0),a._d=(a._useUTC?ta:sa).apply(null,f),
// Apply timezone offset from input. The actual utcOffset can be changed
// with parseZone.
        null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[de]=24)}}function jb(a){var b,c,d,e,f,g,h,i;if(b=a._w,null!=b.GG||null!=b.W||null!=b.E)f=1,g=4,
// TODO: We need to take the current isoWeekYear, but that depends on
// how we interpret now (local, utc, fixed offset). So create
// a now version of current config (take local/utc/offset flags, and
// create now).
      c=gb(b.GG,a._a[ae],wa(sb(),1,4).year),d=gb(b.W,1),e=gb(b.E,1),(e<1||e>7)&&(i=!0);else{f=a._locale._week.dow,g=a._locale._week.doy;var j=wa(sb(),f,g);c=gb(b.gg,a._a[ae],j.year),
// Default to current week.
      d=gb(b.w,j.week),null!=b.d?(
// weekday -- low day numbers are considered next week
      e=b.d,(e<0||e>6)&&(i=!0)):null!=b.e?(
// local weekday -- counting starts from begining of week
      e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):
// default to begining of week
      e=f}d<1||d>xa(c,f,g)?m(a)._overflowWeeks=!0:null!=i?m(a)._overflowWeekday=!0:(h=va(c,d,e,f,g),a._a[ae]=h.year,a._dayOfYear=h.dayOfYear)}
// date from string and format string
    function kb(b){
// TODO: Move this to another part of the creation flow to prevent circular deps
        if(b._f===a.ISO_8601)return void eb(b);b._a=[],m(b).empty=!0;
// This array is used to make a Date, either with `new Date` or `Date.UTC`
        var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=Y(b._f,b._locale).match(Fd)||[],c=0;c<e.length;c++)f=e[c],d=(h.match($(f,b))||[])[0],
// console.log('token', token, 'parsedInput', parsedInput,
//         'regex', getParseRegexForToken(token, config));
        d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&m(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),
// don't parse if it's not a known token
          Id[f]?(d?m(b).empty=!1:m(b).unusedTokens.push(f),da(f,d,b)):b._strict&&!d&&m(b).unusedTokens.push(f);
// add remaining unparsed input length to the string
        m(b).charsLeftOver=i-j,h.length>0&&m(b).unusedInput.push(h),
// clear _12h flag if hour is <= 12
        b._a[de]<=12&&m(b).bigHour===!0&&b._a[de]>0&&(m(b).bigHour=void 0),m(b).parsedDateParts=b._a.slice(0),m(b).meridiem=b._meridiem,
// handle meridiem
          b._a[de]=lb(b._locale,b._a[de],b._meridiem),ib(b),db(b)}function lb(a,b,c){var d;
// Fallback
        return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&b<12&&(b+=12),d||12!==b||(b=0),b):b}
// date from string and array of format strings
    function mb(a){var b,c,d,e,f;if(0===a._f.length)return m(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=q({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],kb(b),n(b)&&(
// if there is any input that was not parsed add a penalty for that format
      f+=m(b).charsLeftOver,
//or tokens
      f+=10*m(b).unusedTokens.length,m(b).score=f,(null==d||f<d)&&(d=f,c=b));j(a,c||b)}function nb(a){if(!a._d){var b=L(a._i);a._a=h([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),ib(a)}}function ob(a){var b=new r(db(pb(a)));
// Adding is smart enough around DST
        return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function pb(a){var b=a._i,d=a._f;return a._locale=a._locale||bb(a._l),null===b||void 0===d&&""===b?o({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),s(b)?new r(db(b)):(g(b)?a._d=b:c(d)?mb(a):d?kb(a):qb(a),n(a)||(a._d=null),a))}function qb(b){var d=b._i;void 0===d?b._d=new Date(a.now()):g(d)?b._d=new Date(d.valueOf()):"string"==typeof d?fb(b):c(d)?(b._a=h(d.slice(0),function(a){return parseInt(a,10)}),ib(b)):"object"==typeof d?nb(b):f(d)?
// from milliseconds
      b._d=new Date(d):a.createFromInputFallback(b)}function rb(a,b,f,g,h){var i={};
// object construction must be done this way.
// https://github.com/moment/moment/issues/1423
        return f!==!0&&f!==!1||(g=f,f=void 0),(d(a)&&e(a)||c(a)&&0===a.length)&&(a=void 0),i._isAMomentObject=!0,i._useUTC=i._isUTC=h,i._l=f,i._i=a,i._f=b,i._strict=g,ob(i)}function sb(a,b,c,d){return rb(a,b,c,d,!1)}
// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
    function tb(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return sb();for(d=b[0],e=1;e<b.length;++e)b[e].isValid()&&!b[e][a](d)||(d=b[e]);return d}
// TODO: Use [].sort instead?
    function ub(){var a=[].slice.call(arguments,0);return tb("isBefore",a)}function vb(){var a=[].slice.call(arguments,0);return tb("isAfter",a)}function wb(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;
// representation for dateAddRemove
        this._milliseconds=+k+1e3*j+// 1000
          6e4*i+// 1000 * 60
          1e3*h*60*60,//using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
// Because of dateAddRemove treats 24 hours as different from a
// day when working around DST, we need to store them separately
          this._days=+g+7*f,
// It is impossible translate months into days without knowing
// which months you are are talking about, so we have to store
// it separately.
          this._months=+e+3*d+12*c,this._data={},this._locale=bb(),this._bubble()}function xb(a){return a instanceof wb}function yb(a){return a<0?Math.round(-1*a)*-1:Math.round(a)}
// FORMATTING
    function zb(a,b){U(a,0,0,function(){var a=this.utcOffset(),c="+";return a<0&&(a=-a,c="-"),c+T(~~(a/60),2)+b+T(~~a%60,2)})}function Ab(a,b){var c=(b||"").match(a);if(null===c)return null;var d=c[c.length-1]||[],e=(d+"").match(Me)||["-",0,0],f=+(60*e[1])+u(e[2]);return 0===f?0:"+"===e[0]?f:-f}
// Return a moment from input, that is local/utc/zone equivalent to model.
    function Bb(b,c){var d,e;
// Use low-level api, because this fn is low-level api.
        return c._isUTC?(d=c.clone(),e=(s(b)||g(b)?b.valueOf():sb(b).valueOf())-d.valueOf(),d._d.setTime(d._d.valueOf()+e),a.updateOffset(d,!1),d):sb(b).local()}function Cb(a){
// On Firefox.24 Date#getTimezoneOffset returns a floating point.
// https://github.com/moment/moment/pull/1871
        return 15*-Math.round(a._d.getTimezoneOffset()/15)}
// MOMENTS
// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
    function Db(b,c){var d,e=this._offset||0;if(!this.isValid())return null!=b?this:NaN;if(null!=b){if("string"==typeof b){if(b=Ab(Xd,b),null===b)return this}else Math.abs(b)<16&&(b=60*b);return!this._isUTC&&c&&(d=Cb(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?Tb(this,Ob(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?e:Cb(this)}function Eb(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Fb(a){return this.utcOffset(0,a)}function Gb(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Cb(this),"m")),this}function Hb(){if(null!=this._tzm)this.utcOffset(this._tzm);else if("string"==typeof this._i){var a=Ab(Wd,this._i);null!=a?this.utcOffset(a):this.utcOffset(0,!0)}return this}function Ib(a){return!!this.isValid()&&(a=a?sb(a).utcOffset():0,(this.utcOffset()-a)%60===0)}function Jb(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Kb(){if(!p(this._isDSTShifted))return this._isDSTShifted;var a={};if(q(a,this),a=pb(a),a._a){var b=a._isUTC?k(a._a):sb(a._a);this._isDSTShifted=this.isValid()&&v(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Lb(){return!!this.isValid()&&!this._isUTC}function Mb(){return!!this.isValid()&&this._isUTC}function Nb(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}function Ob(a,b){var c,d,e,g=a,
// matching against regexp is expensive, do it on demand
      h=null;// checks for null or undefined
        return xb(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:f(a)?(g={},b?g[b]=a:g.milliseconds=a):(h=Ne.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:u(h[ce])*c,h:u(h[de])*c,m:u(h[ee])*c,s:u(h[fe])*c,ms:u(yb(1e3*h[ge]))*c}):(h=Oe.exec(a))?(c="-"===h[1]?-1:1,g={y:Pb(h[2],c),M:Pb(h[3],c),w:Pb(h[4],c),d:Pb(h[5],c),h:Pb(h[6],c),m:Pb(h[7],c),s:Pb(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=Rb(sb(g.from),sb(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new wb(g),xb(a)&&i(a,"_locale")&&(d._locale=a._locale),d}function Pb(a,b){
// We'd normally use ~~inp for this, but unfortunately it also
// converts floats to ints.
// inp may be undefined, so careful calling replace on it.
        var c=a&&parseFloat(a.replace(",","."));
// apply sign while we're at it
        return(isNaN(c)?0:c)*b}function Qb(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Rb(a,b){var c;return a.isValid()&&b.isValid()?(b=Bb(b,a),a.isBefore(b)?c=Qb(a,b):(c=Qb(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}
// TODO: remove 'name' arg after deprecation is removed
    function Sb(a,b){return function(c,d){var e,f;
//invert the arguments, but complain about it
        return null===d||isNaN(+d)||(y(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Ob(c,d),Tb(this,e,a),this}}function Tb(b,c,d,e){var f=c._milliseconds,g=yb(c._days),h=yb(c._months);b.isValid()&&(e=null==e||e,f&&b._d.setTime(b._d.valueOf()+f*d),g&&Q(b,"Date",P(b,"Date")+g*d),h&&ja(b,P(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function Ub(a,b){var c=a.diff(b,"days",!0);return c<-6?"sameElse":c<-1?"lastWeek":c<0?"lastDay":c<1?"sameDay":c<2?"nextDay":c<7?"nextWeek":"sameElse"}function Vb(b,c){
// We want to compare the start of today, vs this.
// Getting start-of-today depends on whether we're local/utc/offset or not.
        var d=b||sb(),e=Bb(d,this).startOf("day"),f=a.calendarFormat(this,e)||"sameElse",g=c&&(z(c[f])?c[f].call(this,d):c[f]);return this.format(g||this.localeData().calendar(f,this,sb(d)))}function Wb(){return new r(this)}function Xb(a,b){var c=s(a)?a:sb(a);return!(!this.isValid()||!c.isValid())&&(b=K(p(b)?"millisecond":b),"millisecond"===b?this.valueOf()>c.valueOf():c.valueOf()<this.clone().startOf(b).valueOf())}function Yb(a,b){var c=s(a)?a:sb(a);return!(!this.isValid()||!c.isValid())&&(b=K(p(b)?"millisecond":b),"millisecond"===b?this.valueOf()<c.valueOf():this.clone().endOf(b).valueOf()<c.valueOf())}function Zb(a,b,c,d){return d=d||"()",("("===d[0]?this.isAfter(a,c):!this.isBefore(a,c))&&(")"===d[1]?this.isBefore(b,c):!this.isAfter(b,c))}function $b(a,b){var c,d=s(a)?a:sb(a);return!(!this.isValid()||!d.isValid())&&(b=K(b||"millisecond"),"millisecond"===b?this.valueOf()===d.valueOf():(c=d.valueOf(),this.clone().startOf(b).valueOf()<=c&&c<=this.clone().endOf(b).valueOf()))}function _b(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function ac(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function bc(a,b,c){var d,e,f,g;// 1000
// 1000 * 60
// 1000 * 60 * 60
// 1000 * 60 * 60 * 24, negate dst
// 1000 * 60 * 60 * 24 * 7, negate dst
        return this.isValid()?(d=Bb(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=cc(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:t(g)):NaN):NaN}function cc(a,b){
// difference in months
        var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),
// b is in (anchor - 1 month, anchor + 1 month)
          f=a.clone().add(e,"months");
//check for negative zero, return zero if negative zero
// linear across the month
// linear across the month
        return b-f<0?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)||0}function dc(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ec(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?z(Date.prototype.toISOString)?this.toDate().toISOString():X(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):X(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}/**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function fc(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var a="moment",b="";this.isLocal()||(a=0===this.utcOffset()?"moment.utc":"moment.parseZone",b="Z");var c="["+a+'("]',d=0<this.year()&&this.year()<=9999?"YYYY":"YYYYYY",e="-MM-DD[T]HH:mm:ss.SSS",f=b+'[")]';return this.format(c+d+e+f)}function gc(b){b||(b=this.isUtc()?a.defaultFormatUtc:a.defaultFormat);var c=X(this,b);return this.localeData().postformat(c)}function hc(a,b){return this.isValid()&&(s(a)&&a.isValid()||sb(a).isValid())?Ob({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function ic(a){return this.from(sb(),a)}function jc(a,b){return this.isValid()&&(s(a)&&a.isValid()||sb(a).isValid())?Ob({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function kc(a){return this.to(sb(),a)}
// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
    function lc(a){var b;return void 0===a?this._locale._abbr:(b=bb(a),null!=b&&(this._locale=b),this)}function mc(){return this._locale}function nc(a){
// the following switch intentionally omits break keywords
// to utilize falling through the cases.
        switch(a=K(a)){case"year":this.month(0);/* falls through */
            case"quarter":case"month":this.date(1);/* falls through */
            case"week":case"isoWeek":case"day":case"date":this.hours(0);/* falls through */
            case"hour":this.minutes(0);/* falls through */
            case"minute":this.seconds(0);/* falls through */
            case"second":this.milliseconds(0)}
// weeks are a special case
// quarters are also special
        return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function oc(a){
// 'date' is an alias for 'day', so it should be considered as such.
        return a=K(a),void 0===a||"millisecond"===a?this:("date"===a&&(a="day"),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms"))}function pc(){return this._d.valueOf()-6e4*(this._offset||0)}function qc(){return Math.floor(this.valueOf()/1e3)}function rc(){return new Date(this.valueOf())}function sc(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function tc(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function uc(){
// new Date(NaN).toJSON() === null
        return this.isValid()?this.toISOString():null}function vc(){return n(this)}function wc(){return j({},m(this))}function xc(){return m(this).overflow}function yc(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function zc(a,b){U(0,[a,a.length],0,b)}
// MOMENTS
    function Ac(a){return Ec.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Bc(a){return Ec.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Cc(){return xa(this.year(),1,4)}function Dc(){var a=this.localeData()._week;return xa(this.year(),a.dow,a.doy)}function Ec(a,b,c,d,e){var f;return null==a?wa(this,d,e).year:(f=xa(a,d,e),b>f&&(b=f),Fc.call(this,a,b,c,d,e))}function Fc(a,b,c,d,e){var f=va(a,b,c,d,e),g=ta(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}
// MOMENTS
    function Gc(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}
// HELPERS
// MOMENTS
    function Hc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function Ic(a,b){b[ge]=u(1e3*("0."+a))}
// MOMENTS
    function Jc(){return this._isUTC?"UTC":""}function Kc(){return this._isUTC?"Coordinated Universal Time":""}function Lc(a){return sb(1e3*a)}function Mc(){return sb.apply(null,arguments).parseZone()}function Nc(a){return a}function Oc(a,b,c,d){var e=bb(),f=k().set(d,b);return e[c](f,a)}function Pc(a,b,c){if(f(a)&&(b=a,a=void 0),a=a||"",null!=b)return Oc(a,b,c,"month");var d,e=[];for(d=0;d<12;d++)e[d]=Oc(a,d,c,"month");return e}
// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
    function Qc(a,b,c,d){"boolean"==typeof a?(f(b)&&(c=b,b=void 0),b=b||""):(b=a,c=b,a=!1,f(b)&&(c=b,b=void 0),b=b||"");var e=bb(),g=a?e._week.dow:0;if(null!=c)return Oc(b,(c+g)%7,d,"day");var h,i=[];for(h=0;h<7;h++)i[h]=Oc(b,(h+g)%7,d,"day");return i}function Rc(a,b){return Pc(a,b,"months")}function Sc(a,b){return Pc(a,b,"monthsShort")}function Tc(a,b,c){return Qc(a,b,c,"weekdays")}function Uc(a,b,c){return Qc(a,b,c,"weekdaysShort")}function Vc(a,b,c){return Qc(a,b,c,"weekdaysMin")}function Wc(){var a=this._data;return this._milliseconds=Ze(this._milliseconds),this._days=Ze(this._days),this._months=Ze(this._months),a.milliseconds=Ze(a.milliseconds),a.seconds=Ze(a.seconds),a.minutes=Ze(a.minutes),a.hours=Ze(a.hours),a.months=Ze(a.months),a.years=Ze(a.years),this}function Xc(a,b,c,d){var e=Ob(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}
// supports only 2.0-style add(1, 's') or add(duration)
    function Yc(a,b){return Xc(this,a,b,1)}
// supports only 2.0-style subtract(1, 's') or subtract(duration)
    function Zc(a,b){return Xc(this,a,b,-1)}function $c(a){return a<0?Math.floor(a):Math.ceil(a)}function _c(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;
// if we have a mix of positive and negative values, bubble down first
// check: https://github.com/moment/moment/issues/2166
// The following code bubbles up values, see the tests for
// examples of what that means.
// convert days to months
// 12 months -> 1 year
        return f>=0&&g>=0&&h>=0||f<=0&&g<=0&&h<=0||(f+=864e5*$c(bd(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=t(f/1e3),i.seconds=a%60,b=t(a/60),i.minutes=b%60,c=t(b/60),i.hours=c%24,g+=t(c/24),e=t(ad(g)),h+=e,g-=$c(bd(e)),d=t(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function ad(a){
// 400 years have 146097 days (taking into account leap year rules)
// 400 years have 12 months === 4800
        return 4800*a/146097}function bd(a){
// the reverse of daysToMonths
        return 146097*a/4800}function cd(a){var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+ad(b),"month"===a?c:c/12;switch(
// handle milliseconds separately because of floating point math errors (issue #1867)
      b=this._days+Math.round(bd(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;
// Math.floor prevents floating point math errors here
        case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}
// TODO: Use this.as('ms')?
    function dd(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*u(this._months/12)}function ed(a){return function(){return this.as(a)}}function fd(a){return a=K(a),this[a+"s"]()}function gd(a){return function(){return this._data[a]}}function hd(){return t(this.days()/7)}
// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function id(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function jd(a,b,c){var d=Ob(a).abs(),e=of(d.as("s")),f=of(d.as("m")),g=of(d.as("h")),h=of(d.as("d")),i=of(d.as("M")),j=of(d.as("y")),k=e<pf.s&&["s",e]||f<=1&&["m"]||f<pf.m&&["mm",f]||g<=1&&["h"]||g<pf.h&&["hh",g]||h<=1&&["d"]||h<pf.d&&["dd",h]||i<=1&&["M"]||i<pf.M&&["MM",i]||j<=1&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,id.apply(null,k)}
// This function allows you to set the rounding function for relative time strings
    function kd(a){return void 0===a?of:"function"==typeof a&&(of=a,!0)}
// This function allows you to set a threshold for relative time strings
    function ld(a,b){return void 0!==pf[a]&&(void 0===b?pf[a]:(pf[a]=b,!0))}function md(a){var b=this.localeData(),c=jd(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function nd(){
// for ISO strings we do not use the normal bubbling rules:
//  * milliseconds bubble up until they become hours
//  * days do not bubble at all
//  * months bubble up until they become years
// This is because there is no context-free conversion between hours and days
// (think of clock changes)
// and also not between days and months (28-31 days per month)
        var a,b,c,d=qf(this._milliseconds)/1e3,e=qf(this._days),f=qf(this._months);
// 3600 seconds -> 60 minutes -> 1 hour
        a=t(d/60),b=t(a/60),d%=60,a%=60,
// 12 months -> 1 year
          c=t(f/12),f%=12;
// inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(m<0?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var od,pd;pd=Array.prototype.some?Array.prototype.some:function(a){for(var b=Object(this),c=b.length>>>0,d=0;d<c;d++)if(d in b&&a.call(this,b[d],d,b))return!0;return!1};var qd=pd,rd=a.momentProperties=[],sd=!1,td={};a.suppressDeprecationWarnings=!1,a.deprecationHandler=null;var ud;ud=Object.keys?Object.keys:function(a){var b,c=[];for(b in a)i(a,b)&&c.push(b);return c};var vd,wd=ud,xd={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},yd={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},zd="Invalid date",Ad="%d",Bd=/\d{1,2}/,Cd={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Dd={},Ed={},Fd=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Gd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Hd={},Id={},Jd=/\d/,Kd=/\d\d/,Ld=/\d{3}/,Md=/\d{4}/,Nd=/[+-]?\d{6}/,Od=/\d\d?/,Pd=/\d\d\d\d?/,Qd=/\d\d\d\d\d\d?/,Rd=/\d{1,3}/,Sd=/\d{1,4}/,Td=/[+-]?\d{1,6}/,Ud=/\d+/,Vd=/[+-]?\d+/,Wd=/Z|[+-]\d\d:?\d\d/gi,Xd=/Z|[+-]\d\d(?::?\d\d)?/gi,Yd=/[+-]?\d+(\.\d{1,3})?/,Zd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,$d={},_d={},ae=0,be=1,ce=2,de=3,ee=4,fe=5,ge=6,he=7,ie=8;vd=Array.prototype.indexOf?Array.prototype.indexOf:function(a){
// I know
        var b;for(b=0;b<this.length;++b)if(this[b]===a)return b;return-1};var je=vd;
// FORMATTING
    U("M",["MM",2],"Mo",function(){return this.month()+1}),U("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),U("MMMM",0,0,function(a){return this.localeData().months(this,a)}),
// ALIASES
      J("month","M"),
// PRIORITY
      M("month",8),
// PARSING
      Z("M",Od),Z("MM",Od,Kd),Z("MMM",function(a,b){return b.monthsShortRegex(a)}),Z("MMMM",function(a,b){return b.monthsRegex(a)}),ba(["M","MM"],function(a,b){b[be]=u(a)-1}),ba(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);
// if we didn't find a month name, mark the date as invalid.
        null!=e?b[be]=e:m(c).invalidMonth=a});
// LOCALES
    var ke=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,le="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),me="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),ne=Zd,oe=Zd;
// FORMATTING
    U("Y",0,0,function(){var a=this.year();return a<=9999?""+a:"+"+a}),U(0,["YY",2],0,function(){return this.year()%100}),U(0,["YYYY",4],0,"year"),U(0,["YYYYY",5],0,"year"),U(0,["YYYYYY",6,!0],0,"year"),
// ALIASES
      J("year","y"),
// PRIORITIES
      M("year",1),
// PARSING
      Z("Y",Vd),Z("YY",Od,Kd),Z("YYYY",Sd,Md),Z("YYYYY",Td,Nd),Z("YYYYYY",Td,Nd),ba(["YYYYY","YYYYYY"],ae),ba("YYYY",function(b,c){c[ae]=2===b.length?a.parseTwoDigitYear(b):u(b)}),ba("YY",function(b,c){c[ae]=a.parseTwoDigitYear(b)}),ba("Y",function(a,b){b[ae]=parseInt(a,10)}),
// HOOKS
      a.parseTwoDigitYear=function(a){return u(a)+(u(a)>68?1900:2e3)};
// MOMENTS
    var pe=O("FullYear",!0);
// FORMATTING
    U("w",["ww",2],"wo","week"),U("W",["WW",2],"Wo","isoWeek"),
// ALIASES
      J("week","w"),J("isoWeek","W"),
// PRIORITIES
      M("week",5),M("isoWeek",5),
// PARSING
      Z("w",Od),Z("ww",Od,Kd),Z("W",Od),Z("WW",Od,Kd),ca(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=u(a)});var qe={dow:0,// Sunday is the first day of the week.
        doy:6};
// FORMATTING
    U("d",0,"do","day"),U("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),U("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),U("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),U("e",0,0,"weekday"),U("E",0,0,"isoWeekday"),
// ALIASES
      J("day","d"),J("weekday","e"),J("isoWeekday","E"),
// PRIORITY
      M("day",11),M("weekday",11),M("isoWeekday",11),
// PARSING
      Z("d",Od),Z("e",Od),Z("E",Od),Z("dd",function(a,b){return b.weekdaysMinRegex(a)}),Z("ddd",function(a,b){return b.weekdaysShortRegex(a)}),Z("dddd",function(a,b){return b.weekdaysRegex(a)}),ca(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);
// if we didn't get a weekday name, mark the date as invalid
        null!=e?b.d=e:m(c).invalidWeekday=a}),ca(["d","e","E"],function(a,b,c,d){b[d]=u(a)});
// LOCALES
    var re="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),se="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),te="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),ue=Zd,ve=Zd,we=Zd;U("H",["HH",2],0,"hour"),U("h",["hh",2],0,Ra),U("k",["kk",2],0,Sa),U("hmm",0,0,function(){return""+Ra.apply(this)+T(this.minutes(),2)}),U("hmmss",0,0,function(){return""+Ra.apply(this)+T(this.minutes(),2)+T(this.seconds(),2)}),U("Hmm",0,0,function(){return""+this.hours()+T(this.minutes(),2)}),U("Hmmss",0,0,function(){return""+this.hours()+T(this.minutes(),2)+T(this.seconds(),2)}),Ta("a",!0),Ta("A",!1),
// ALIASES
      J("hour","h"),
// PRIORITY
      M("hour",13),Z("a",Ua),Z("A",Ua),Z("H",Od),Z("h",Od),Z("HH",Od,Kd),Z("hh",Od,Kd),Z("hmm",Pd),Z("hmmss",Qd),Z("Hmm",Pd),Z("Hmmss",Qd),ba(["H","HH"],de),ba(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),ba(["h","hh"],function(a,b,c){b[de]=u(a),m(c).bigHour=!0}),ba("hmm",function(a,b,c){var d=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d)),m(c).bigHour=!0}),ba("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d,2)),b[fe]=u(a.substr(e)),m(c).bigHour=!0}),ba("Hmm",function(a,b,c){var d=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d))}),ba("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d,2)),b[fe]=u(a.substr(e))});var xe,ye=/[ap]\.?m?\.?/i,ze=O("Hours",!0),Ae={calendar:xd,longDateFormat:yd,invalidDate:zd,ordinal:Ad,ordinalParse:Bd,relativeTime:Cd,months:le,monthsShort:me,week:qe,weekdays:re,weekdaysMin:te,weekdaysShort:se,meridiemParse:ye},Be={},Ce={},De=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Ee=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Fe=/Z|[+-]\d\d(?::?\d\d)?/,Ge=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],
// YYYYMM is NOT allowed by the standard
        ["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],He=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Ie=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=x("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),
// constant that refers to the ISO standard
      a.ISO_8601=function(){};var Je=x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=sb.apply(null,arguments);return this.isValid()&&a.isValid()?a<this?this:a:o()}),Ke=x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=sb.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:o()}),Le=function(){return Date.now?Date.now():+new Date};zb("Z",":"),zb("ZZ",""),
// PARSING
      Z("Z",Xd),Z("ZZ",Xd),ba(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ab(Xd,a)});
// HELPERS
// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
    var Me=/([\+\-]|\d\d)/gi;
// HOOKS
// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
    a.updateOffset=function(){};
// ASP.NET json date format regex
    var Ne=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Oe=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;Ob.fn=wb.prototype;var Pe=Sb(1,"add"),Qe=Sb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",a.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Re=x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});
// FORMATTING
    U(0,["gg",2],0,function(){return this.weekYear()%100}),U(0,["GG",2],0,function(){return this.isoWeekYear()%100}),zc("gggg","weekYear"),zc("ggggg","weekYear"),zc("GGGG","isoWeekYear"),zc("GGGGG","isoWeekYear"),
// ALIASES
      J("weekYear","gg"),J("isoWeekYear","GG"),
// PRIORITY
      M("weekYear",1),M("isoWeekYear",1),
// PARSING
      Z("G",Vd),Z("g",Vd),Z("GG",Od,Kd),Z("gg",Od,Kd),Z("GGGG",Sd,Md),Z("gggg",Sd,Md),Z("GGGGG",Td,Nd),Z("ggggg",Td,Nd),ca(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=u(a)}),ca(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),
// FORMATTING
      U("Q",0,"Qo","quarter"),
// ALIASES
      J("quarter","Q"),
// PRIORITY
      M("quarter",7),
// PARSING
      Z("Q",Jd),ba("Q",function(a,b){b[be]=3*(u(a)-1)}),
// FORMATTING
      U("D",["DD",2],"Do","date"),
// ALIASES
      J("date","D"),
// PRIOROITY
      M("date",9),
// PARSING
      Z("D",Od),Z("DD",Od,Kd),Z("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),ba(["D","DD"],ce),ba("Do",function(a,b){b[ce]=u(a.match(Od)[0],10)});
// MOMENTS
    var Se=O("Date",!0);
// FORMATTING
    U("DDD",["DDDD",3],"DDDo","dayOfYear"),
// ALIASES
      J("dayOfYear","DDD"),
// PRIORITY
      M("dayOfYear",4),
// PARSING
      Z("DDD",Rd),Z("DDDD",Ld),ba(["DDD","DDDD"],function(a,b,c){c._dayOfYear=u(a)}),
// FORMATTING
      U("m",["mm",2],0,"minute"),
// ALIASES
      J("minute","m"),
// PRIORITY
      M("minute",14),
// PARSING
      Z("m",Od),Z("mm",Od,Kd),ba(["m","mm"],ee);
// MOMENTS
    var Te=O("Minutes",!1);
// FORMATTING
    U("s",["ss",2],0,"second"),
// ALIASES
      J("second","s"),
// PRIORITY
      M("second",15),
// PARSING
      Z("s",Od),Z("ss",Od,Kd),ba(["s","ss"],fe);
// MOMENTS
    var Ue=O("Seconds",!1);
// FORMATTING
    U("S",0,0,function(){return~~(this.millisecond()/100)}),U(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),U(0,["SSS",3],0,"millisecond"),U(0,["SSSS",4],0,function(){return 10*this.millisecond()}),U(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),U(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),U(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),U(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),U(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),
// ALIASES
      J("millisecond","ms"),
// PRIORITY
      M("millisecond",16),
// PARSING
      Z("S",Rd,Jd),Z("SS",Rd,Kd),Z("SSS",Rd,Ld);var Ve;for(Ve="SSSS";Ve.length<=9;Ve+="S")Z(Ve,Ud);for(Ve="S";Ve.length<=9;Ve+="S")ba(Ve,Ic);
// MOMENTS
    var We=O("Milliseconds",!1);
// FORMATTING
    U("z",0,0,"zoneAbbr"),U("zz",0,0,"zoneName");var Xe=r.prototype;Xe.add=Pe,Xe.calendar=Vb,Xe.clone=Wb,Xe.diff=bc,Xe.endOf=oc,Xe.format=gc,Xe.from=hc,Xe.fromNow=ic,Xe.to=jc,Xe.toNow=kc,Xe.get=R,Xe.invalidAt=xc,Xe.isAfter=Xb,Xe.isBefore=Yb,Xe.isBetween=Zb,Xe.isSame=$b,Xe.isSameOrAfter=_b,Xe.isSameOrBefore=ac,Xe.isValid=vc,Xe.lang=Re,Xe.locale=lc,Xe.localeData=mc,Xe.max=Ke,Xe.min=Je,Xe.parsingFlags=wc,Xe.set=S,Xe.startOf=nc,Xe.subtract=Qe,Xe.toArray=sc,Xe.toObject=tc,Xe.toDate=rc,Xe.toISOString=ec,Xe.inspect=fc,Xe.toJSON=uc,Xe.toString=dc,Xe.unix=qc,Xe.valueOf=pc,Xe.creationData=yc,
// Year
      Xe.year=pe,Xe.isLeapYear=ra,
// Week Year
      Xe.weekYear=Ac,Xe.isoWeekYear=Bc,
// Quarter
      Xe.quarter=Xe.quarters=Gc,
// Month
      Xe.month=ka,Xe.daysInMonth=la,
// Week
      Xe.week=Xe.weeks=Ba,Xe.isoWeek=Xe.isoWeeks=Ca,Xe.weeksInYear=Dc,Xe.isoWeeksInYear=Cc,
// Day
      Xe.date=Se,Xe.day=Xe.days=Ka,Xe.weekday=La,Xe.isoWeekday=Ma,Xe.dayOfYear=Hc,
// Hour
      Xe.hour=Xe.hours=ze,
// Minute
      Xe.minute=Xe.minutes=Te,
// Second
      Xe.second=Xe.seconds=Ue,
// Millisecond
      Xe.millisecond=Xe.milliseconds=We,
// Offset
      Xe.utcOffset=Db,Xe.utc=Fb,Xe.local=Gb,Xe.parseZone=Hb,Xe.hasAlignedHourOffset=Ib,Xe.isDST=Jb,Xe.isLocal=Lb,Xe.isUtcOffset=Mb,Xe.isUtc=Nb,Xe.isUTC=Nb,
// Timezone
      Xe.zoneAbbr=Jc,Xe.zoneName=Kc,
// Deprecations
      Xe.dates=x("dates accessor is deprecated. Use date instead.",Se),Xe.months=x("months accessor is deprecated. Use month instead",ka),Xe.years=x("years accessor is deprecated. Use year instead",pe),Xe.zone=x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",Eb),Xe.isDSTShifted=x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",Kb);var Ye=C.prototype;Ye.calendar=D,Ye.longDateFormat=E,Ye.invalidDate=F,Ye.ordinal=G,Ye.preparse=Nc,Ye.postformat=Nc,Ye.relativeTime=H,Ye.pastFuture=I,Ye.set=A,
// Month
      Ye.months=fa,Ye.monthsShort=ga,Ye.monthsParse=ia,Ye.monthsRegex=na,Ye.monthsShortRegex=ma,
// Week
      Ye.week=ya,Ye.firstDayOfYear=Aa,Ye.firstDayOfWeek=za,
// Day of Week
      Ye.weekdays=Fa,Ye.weekdaysMin=Ha,Ye.weekdaysShort=Ga,Ye.weekdaysParse=Ja,Ye.weekdaysRegex=Na,Ye.weekdaysShortRegex=Oa,Ye.weekdaysMinRegex=Pa,
// Hours
      Ye.isPM=Va,Ye.meridiem=Wa,$a("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===u(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),
// Side effect imports
      a.lang=x("moment.lang is deprecated. Use moment.locale instead.",$a),a.langData=x("moment.langData is deprecated. Use moment.localeData instead.",bb);var Ze=Math.abs,$e=ed("ms"),_e=ed("s"),af=ed("m"),bf=ed("h"),cf=ed("d"),df=ed("w"),ef=ed("M"),ff=ed("y"),gf=gd("milliseconds"),hf=gd("seconds"),jf=gd("minutes"),kf=gd("hours"),lf=gd("days"),mf=gd("months"),nf=gd("years"),of=Math.round,pf={s:45,// seconds to minute
        m:45,// minutes to hour
        h:22,// hours to day
        d:26,// days to month
        M:11},qf=Math.abs,rf=wb.prototype;
// Deprecations
// Side effect imports
// FORMATTING
// PARSING
// Side effect imports
    return rf.abs=Wc,rf.add=Yc,rf.subtract=Zc,rf.as=cd,rf.asMilliseconds=$e,rf.asSeconds=_e,rf.asMinutes=af,rf.asHours=bf,rf.asDays=cf,rf.asWeeks=df,rf.asMonths=ef,rf.asYears=ff,rf.valueOf=dd,rf._bubble=_c,rf.get=fd,rf.milliseconds=gf,rf.seconds=hf,rf.minutes=jf,rf.hours=kf,rf.days=lf,rf.weeks=hd,rf.months=mf,rf.years=nf,rf.humanize=md,rf.toISOString=nd,rf.toString=nd,rf.toJSON=nd,rf.locale=lc,rf.localeData=mc,rf.toIsoString=x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",nd),rf.lang=Re,U("X",0,0,"unix"),U("x",0,0,"valueOf"),Z("x",Vd),Z("X",Yd),ba("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),ba("x",function(a,b,c){c._d=new Date(u(a))}),a.version="2.17.1",b(sb),a.fn=Xe,a.min=ub,a.max=vb,a.now=Le,a.utc=k,a.unix=Lc,a.months=Rc,a.isDate=g,a.locale=$a,a.invalid=o,a.duration=Ob,a.isMoment=s,a.weekdays=Tc,a.parseZone=Mc,a.localeData=bb,a.isDuration=xb,a.monthsShort=Sc,a.weekdaysMin=Vc,a.defineLocale=_a,a.updateLocale=ab,a.locales=cb,a.weekdaysShort=Uc,a.normalizeUnits=K,a.relativeTimeRounding=kd,a.relativeTimeThreshold=ld,a.calendarFormat=Ub,a.prototype=Xe,a});
/*!
 * gulp-boilerplate v4.2.3: My Gulp.js boilerplate for creating new web projects
 * (c) 2017 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/Plugin
 */

/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */

(function (root, factory)
{
    'use strict';

    var moment;
    if (typeof exports === 'object') {
        // CommonJS module
        // Load moment.js as an optional dependency
        try { moment = require('moment'); } catch (e) {}
        module.exports = factory(moment);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function (req)
        {
            // Load moment.js as an optional dependency
            var id = 'moment';
            try { moment = req(id); } catch (e) {}
            return factory(moment);
        });
    } else {
        root.Pikaday = factory(root.moment);
    }
}(this, function (moment)
{
    'use strict';

    /**
     * feature detection and helper functions
     */
    var hasMoment = typeof moment === 'function',

      hasEventListeners = !!window.addEventListener,

      document = window.document,

      sto = window.setTimeout,

      addEvent = function(el, e, callback, capture)
      {
          if (hasEventListeners) {
              el.addEventListener(e, callback, !!capture);
          } else {
              el.attachEvent('on' + e, callback);
          }
      },

      removeEvent = function(el, e, callback, capture)
      {
          if (hasEventListeners) {
              el.removeEventListener(e, callback, !!capture);
          } else {
              el.detachEvent('on' + e, callback);
          }
      },

      fireEvent = function(el, eventName, data)
      {
          var ev;

          if (document.createEvent) {
              ev = document.createEvent('HTMLEvents');
              ev.initEvent(eventName, true, false);
              ev = extend(ev, data);
              el.dispatchEvent(ev);
          } else if (document.createEventObject) {
              ev = document.createEventObject();
              ev = extend(ev, data);
              el.fireEvent('on' + eventName, ev);
          }
      },

      trim = function(str)
      {
          return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
      },

      hasClass = function(el, cn)
      {
          return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
      },

      addClass = function(el, cn)
      {
          if (!hasClass(el, cn)) {
              el.className = (el.className === '') ? cn : el.className + ' ' + cn;
          }
      },

      removeClass = function(el, cn)
      {
          el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
      },

      isArray = function(obj)
      {
          return (/Array/).test(Object.prototype.toString.call(obj));
      },

      isDate = function(obj)
      {
          return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
      },

      isWeekend = function(date)
      {
          var day = date.getDay();
          return day === 0 || day === 6;
      },

      isLeapYear = function(year)
      {
          // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
          return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      },

      getDaysInMonth = function(year, month)
      {
          return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      },

      setToStartOfDay = function(date)
      {
          if (isDate(date)) date.setHours(0,0,0,0);
      },

      compareDates = function(a,b)
      {
          // weak date comparison (use setToStartOfDay(date) to ensure correct result)
          return a.getTime() === b.getTime();
      },

      extend = function(to, from, overwrite)
      {
          var prop, hasProp;
          for (prop in from) {
              hasProp = to[prop] !== undefined;
              if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                  if (isDate(from[prop])) {
                      if (overwrite) {
                          to[prop] = new Date(from[prop].getTime());
                      }
                  }
                  else if (isArray(from[prop])) {
                      if (overwrite) {
                          to[prop] = from[prop].slice(0);
                      }
                  } else {
                      to[prop] = extend({}, from[prop], overwrite);
                  }
              } else if (overwrite || !hasProp) {
                  to[prop] = from[prop];
              }
          }
          return to;
      },

      adjustCalendar = function(calendar) {
          if (calendar.month < 0) {
              calendar.year -= Math.ceil(Math.abs(calendar.month)/12);
              calendar.month += 12;
          }
          if (calendar.month > 11) {
              calendar.year += Math.floor(Math.abs(calendar.month)/12);
              calendar.month -= 12;
          }
          return calendar;
      },

      /**
       * defaults and localisation
       */
      defaults = {

          // bind the picker to a form field
          field: null,

          // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
          bound: undefined,

          // position of the datepicker, relative to the field (default to bottom & left)
          // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
          position: 'bottom left',

          // automatically fit in the viewport even if it means repositioning from the position option
          reposition: true,

          // the default output format for `.toString()` and `field` value
          format: 'YYYY-MM-DD',

          // the initial date to view when first opened
          defaultDate: null,

          // make the `defaultDate` the initial selected value
          setDefaultDate: false,

          // first day of week (0: Sunday, 1: Monday etc)
          firstDay: 0,

          // the default flag for moment's strict date parsing
          formatStrict: false,

          // the minimum/earliest date that can be selected
          minDate: null,
          // the maximum/latest date that can be selected
          maxDate: null,

          // number of years either side, or array of upper/lower range
          yearRange: 10,

          // show week numbers at head of row
          showWeekNumber: false,

          // used internally (don't config outside)
          minYear: 0,
          maxYear: 9999,
          minMonth: undefined,
          maxMonth: undefined,

          startRange: null,
          endRange: null,

          isRTL: false,

          // Additional text to append to the year in the calendar title
          yearSuffix: '',

          // Render the month after year in the calendar title
          showMonthAfterYear: false,

          // Render days of the calendar grid that fall in the next or previous month
          showDaysInNextAndPreviousMonths: false,

          // how many months are visible
          numberOfMonths: 1,

          // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
          // only used for the first display or when a selected date is not visible
          mainCalendar: 'left',

          // Specify a DOM element to render the calendar in
          container: undefined,

          // Blur field when date is selected
          blurFieldOnSelect : true,

          // internationalization
          i18n: {
              previousMonth : 'Previous Month',
              nextMonth     : 'Next Month',
              months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
              weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
              weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
          },

          // Theme Classname
          theme: null,

          // events array
          events: [],

          // callback function
          onSelect: null,
          onOpen: null,
          onClose: null,
          onDraw: null
      },


      /**
       * templating functions to abstract HTML rendering
       */
      renderDayName = function(opts, day, abbr)
      {
          day += opts.firstDay;
          while (day >= 7) {
              day -= 7;
          }
          return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
      },

      renderDay = function(opts)
      {
          var arr = [];
          var ariaSelected = 'false';
          if (opts.isEmpty) {
              if (opts.showDaysInNextAndPreviousMonths) {
                  arr.push('is-outside-current-month');
              } else {
                  return '<td class="is-empty"></td>';
              }
          }
          if (opts.isDisabled) {
              arr.push('is-disabled');
          }
          if (opts.isToday) {
              arr.push('is-today');
          }
          if (opts.isSelected) {
              arr.push('is-selected');
              ariaSelected = 'true';
          }
          if (opts.hasEvent) {
              arr.push('has-event');
          }
          if (opts.isInRange) {
              arr.push('is-inrange');
          }
          if (opts.isStartRange) {
              arr.push('is-startrange');
          }
          if (opts.isEndRange) {
              arr.push('is-endrange');
          }
          return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' +
            '<button class="pika-button pika-day" type="button" ' +
            'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' +
            opts.day +
            '</button>' +
            '</td>';
      },

      renderWeek = function (d, m, y) {
          // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
          var onejan = new Date(y, 0, 1),
            weekNum = Math.ceil((((new Date(y, m, d) - onejan) / 86400000) + onejan.getDay()+1)/7);
          return '<td class="pika-week">' + weekNum + '</td>';
      },

      renderRow = function(days, isRTL)
      {
          return '<tr>' + (isRTL ? days.reverse() : days).join('') + '</tr>';
      },

      renderBody = function(rows)
      {
          return '<tbody>' + rows.join('') + '</tbody>';
      },

      renderHead = function(opts)
      {
          var i, arr = [];
          if (opts.showWeekNumber) {
              arr.push('<th></th>');
          }
          for (i = 0; i < 7; i++) {
              arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
          }
          return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
      },

      renderTitle = function(instance, c, year, month, refYear, randId)
      {
          var i, j, arr,
            opts = instance._o,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
            monthHtml,
            yearHtml,
            prev = true,
            next = true;

          for (arr = [], i = 0; i < 12; i++) {
              arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
                (i === month ? ' selected="selected"': '') +
                ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled="disabled"' : '') + '>' +
                opts.i18n.months[i] + '</option>');
          }

          monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

          if (isArray(opts.yearRange)) {
              i = opts.yearRange[0];
              j = opts.yearRange[1] + 1;
          } else {
              i = year - opts.yearRange;
              j = 1 + year + opts.yearRange;
          }

          for (arr = []; i < j && i <= opts.maxYear; i++) {
              if (i >= opts.minYear) {
                  arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"': '') + '>' + (i) + '</option>');
              }
          }
          yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

          if (opts.showMonthAfterYear) {
              html += yearHtml + monthHtml;
          } else {
              html += monthHtml + yearHtml;
          }

          if (isMinYear && (month === 0 || opts.minMonth >= month)) {
              prev = false;
          }

          if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
              next = false;
          }

          if (c === 0) {
              html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
          }
          if (c === (instance._o.numberOfMonths - 1) ) {
              html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
          }

          return html += '</div>';
      },

      renderTable = function(opts, data, randId)
      {
          return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
      },


      /**
       * Pikaday constructor
       */
      Pikaday = function(options)
      {
          var self = this,
            opts = self.config(options);

          self._onMouseDown = function(e)
          {
              if (!self._v) {
                  return;
              }
              e = e || window.event;
              var target = e.target || e.srcElement;
              if (!target) {
                  return;
              }

              if (!hasClass(target, 'is-disabled')) {
                  if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
                      self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                      if (opts.bound) {
                          sto(function() {
                              self.hide();
                              if (opts.blurFieldOnSelect && opts.field) {
                                  opts.field.blur();
                              }
                          }, 100);
                      }
                  }
                  else if (hasClass(target, 'pika-prev')) {
                      self.prevMonth();
                  }
                  else if (hasClass(target, 'pika-next')) {
                      self.nextMonth();
                  }
              }
              if (!hasClass(target, 'pika-select')) {
                  // if this is touch event prevent mouse events emulation
                  if (e.preventDefault) {
                      e.preventDefault();
                  } else {
                      e.returnValue = false;
                      return false;
                  }
              } else {
                  self._c = true;
              }
          };

          self._onChange = function(e)
          {
              e = e || window.event;
              var target = e.target || e.srcElement;
              if (!target) {
                  return;
              }
              if (hasClass(target, 'pika-select-month')) {
                  self.gotoMonth(target.value);
              }
              else if (hasClass(target, 'pika-select-year')) {
                  self.gotoYear(target.value);
              }
          };

          self._onKeyChange = function(e)
          {
              e = e || window.event;

              if (self.isVisible()) {

                  switch(e.keyCode){
                      case 13:
                      case 27:
                          if (opts.field) {
                              opts.field.blur();
                          }
                          break;
                      case 37:
                          e.preventDefault();
                          self.adjustDate('subtract', 1);
                          break;
                      case 38:
                          self.adjustDate('subtract', 7);
                          break;
                      case 39:
                          self.adjustDate('add', 1);
                          break;
                      case 40:
                          self.adjustDate('add', 7);
                          break;
                  }
              }
          };

          self._onInputChange = function(e)
          {
              var date;

              if (e.firedBy === self) {
                  return;
              }
              if (hasMoment) {
                  date = moment(opts.field.value, opts.format, opts.formatStrict);
                  date = (date && date.isValid()) ? date.toDate() : null;
              }
              else {
                  date = new Date(Date.parse(opts.field.value));
              }
              if (isDate(date)) {
                  self.setDate(date);
              }
              if (!self._v) {
                  self.show();
              }
          };

          self._onInputFocus = function()
          {
              self.show();
          };

          self._onInputClick = function()
          {
              self.show();
          };

          self._onInputBlur = function()
          {
              // IE allows pika div to gain focus; catch blur the input field
              var pEl = document.activeElement;
              do {
                  if (hasClass(pEl, 'pika-single')) {
                      return;
                  }
              }
              while ((pEl = pEl.parentNode));

              if (!self._c) {
                  self._b = sto(function() {
                      self.hide();
                  }, 50);
              }
              self._c = false;
          };

          self._onClick = function(e)
          {
              e = e || window.event;
              var target = e.target || e.srcElement,
                pEl = target;
              if (!target) {
                  return;
              }
              if (!hasEventListeners && hasClass(target, 'pika-select')) {
                  if (!target.onchange) {
                      target.setAttribute('onchange', 'return;');
                      addEvent(target, 'change', self._onChange);
                  }
              }
              do {
                  if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
                      return;
                  }
              }
              while ((pEl = pEl.parentNode));
              if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
                  self.hide();
              }
          };

          self.el = document.createElement('div');
          self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

          addEvent(self.el, 'mousedown', self._onMouseDown, true);
          addEvent(self.el, 'touchend', self._onMouseDown, true);
          addEvent(self.el, 'change', self._onChange);
          addEvent(document, 'keydown', self._onKeyChange);

          if (opts.field) {
              if (opts.container) {
                  opts.container.appendChild(self.el);
              } else if (opts.bound) {
                  document.body.appendChild(self.el);
              } else {
                  opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
              }
              addEvent(opts.field, 'change', self._onInputChange);

              if (!opts.defaultDate) {
                  if (hasMoment && opts.field.value) {
                      opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                  } else {
                      opts.defaultDate = new Date(Date.parse(opts.field.value));
                  }
                  opts.setDefaultDate = true;
              }
          }

          var defDate = opts.defaultDate;

          if (isDate(defDate)) {
              if (opts.setDefaultDate) {
                  self.setDate(defDate, true);
              } else {
                  self.gotoDate(defDate);
              }
          } else {
              self.gotoDate(new Date());
          }

          if (opts.bound) {
              this.hide();
              self.el.className += ' is-bound';
              addEvent(opts.trigger, 'click', self._onInputClick);
              addEvent(opts.trigger, 'focus', self._onInputFocus);
              addEvent(opts.trigger, 'blur', self._onInputBlur);
          } else {
              this.show();
          }
      };


    /**
     * public Pikaday API
     */
    Pikaday.prototype = {


        /**
         * configure functionality
         */
        config: function(options)
        {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }

            var opts = extend(this._o, options, true);

            opts.isRTL = !!opts.isRTL;

            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

            opts.theme = (typeof opts.theme) === 'string' && opts.theme ? opts.theme : null;

            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

            opts.disableWeekends = !!opts.disableWeekends;

            opts.disableDayFn = (typeof opts.disableDayFn) === 'function' ? opts.disableDayFn : null;

            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;

            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                this.setMinDate(opts.minDate);
            }
            if (opts.maxDate) {
                this.setMaxDate(opts.maxDate);
            }

            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }

            return opts;
        },

        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function(format)
        {
            return !isDate(this._d) ? '' : hasMoment ? moment(this._d).format(format || this._o.format) : this._d.toDateString();
        },

        /**
         * return a Moment.js object of the current selection (if available)
         */
        getMoment: function()
        {
            return hasMoment ? moment(this._d) : null;
        },

        /**
         * set the current selection from a Moment.js object (if available)
         */
        setMoment: function(date, preventOnSelect)
        {
            if (hasMoment && moment.isMoment(date)) {
                this.setDate(date.toDate(), preventOnSelect);
            }
        },

        /**
         * return a Date object of the current selection
         */
        getDate: function()
        {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },

        /**
         * set the current selection
         */
        setDate: function(date, preventOnSelect)
        {
            if (!date) {
                this._d = null;

                if (this._o.field) {
                    this._o.field.value = '';
                    fireEvent(this._o.field, 'change', { firedBy: this });
                }

                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }

            var min = this._o.minDate,
              max = this._o.maxDate;

            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }

            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', { firedBy: this });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },

        /**
         * change view to a specific date
         */
        gotoDate: function(date)
        {
            var newCalendar = true;

            if (!isDate(date)) {
                return;
            }

            if (this.calendars) {
                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                  lastVisibleDate = new Date(this.calendars[this.calendars.length-1].year, this.calendars[this.calendars.length-1].month, 1),
                  visibleDate = date.getTime();
                // get the end of the month
                lastVisibleDate.setMonth(lastVisibleDate.getMonth()+1);
                lastVisibleDate.setDate(lastVisibleDate.getDate()-1);
                newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
            }

            if (newCalendar) {
                this.calendars = [{
                    month: date.getMonth(),
                    year: date.getFullYear()
                }];
                if (this._o.mainCalendar === 'right') {
                    this.calendars[0].month += 1 - this._o.numberOfMonths;
                }
            }

            this.adjustCalendars();
        },

        adjustDate: function(sign, days) {

            var day = this.getDate() || new Date();
            var difference = parseInt(days)*24*60*60*1000;

            var newDay;

            if (sign === 'add') {
                newDay = new Date(day.valueOf() + difference);
            } else if (sign === 'subtract') {
                newDay = new Date(day.valueOf() - difference);
            }

            if (hasMoment) {
                if (sign === 'add') {
                    newDay = moment(day).add(days, "days").toDate();
                } else if (sign === 'subtract') {
                    newDay = moment(day).subtract(days, "days").toDate();
                }
            }

            this.setDate(newDay);
        },

        adjustCalendars: function() {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) {
                this.calendars[c] = adjustCalendar({
                    month: this.calendars[0].month + c,
                    year: this.calendars[0].year
                });
            }
            this.draw();
        },

        gotoToday: function()
        {
            this.gotoDate(new Date());
        },

        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function(month)
        {
            if (!isNaN(month)) {
                this.calendars[0].month = parseInt(month, 10);
                this.adjustCalendars();
            }
        },

        nextMonth: function()
        {
            this.calendars[0].month++;
            this.adjustCalendars();
        },

        prevMonth: function()
        {
            this.calendars[0].month--;
            this.adjustCalendars();
        },

        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function(year)
        {
            if (!isNaN(year)) {
                this.calendars[0].year = parseInt(year, 10);
                this.adjustCalendars();
            }
        },

        /**
         * change the minDate
         */
        setMinDate: function(value)
        {
            if(value instanceof Date) {
                setToStartOfDay(value);
                this._o.minDate = value;
                this._o.minYear  = value.getFullYear();
                this._o.minMonth = value.getMonth();
            } else {
                this._o.minDate = defaults.minDate;
                this._o.minYear  = defaults.minYear;
                this._o.minMonth = defaults.minMonth;
                this._o.startRange = defaults.startRange;
            }

            this.draw();
        },

        /**
         * change the maxDate
         */
        setMaxDate: function(value)
        {
            if(value instanceof Date) {
                setToStartOfDay(value);
                this._o.maxDate = value;
                this._o.maxYear = value.getFullYear();
                this._o.maxMonth = value.getMonth();
            } else {
                this._o.maxDate = defaults.maxDate;
                this._o.maxYear = defaults.maxYear;
                this._o.maxMonth = defaults.maxMonth;
                this._o.endRange = defaults.endRange;
            }

            this.draw();
        },

        setStartRange: function(value)
        {
            this._o.startRange = value;
        },

        setEndRange: function(value)
        {
            this._o.endRange = value;
        },

        /**
         * refresh the HTML
         */
        draw: function(force)
        {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
              minYear = opts.minYear,
              maxYear = opts.maxYear,
              minMonth = opts.minMonth,
              maxMonth = opts.maxMonth,
              html = '',
              randId;

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }

            randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

            for (var c = 0; c < opts.numberOfMonths; c++) {
                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
            }

            this.el.innerHTML = html;

            if (opts.bound) {
                if(opts.field.type !== 'hidden') {
                    sto(function() {
                        opts.trigger.focus();
                    }, 1);
                }
            }

            if (typeof this._o.onDraw === 'function') {
                this._o.onDraw(this);
            }

            if (opts.bound) {
                // let the screen reader user know to use arrow keys
                opts.field.setAttribute('aria-label', 'Use the arrow keys to pick a date');
            }
        },

        adjustPosition: function()
        {
            var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;

            if (this._o.container) return;

            this.el.style.position = 'absolute';

            field = this._o.trigger;
            pEl = field;
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
            viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top  = pEl.offsetTop + pEl.offsetHeight;
                while((pEl = pEl.offsetParent)) {
                    left += pEl.offsetLeft;
                    top  += pEl.offsetTop;
                }
            }

            // default position is bottom & left
            if ((this._o.reposition && left + width > viewportWidth) ||
              (
                this._o.position.indexOf('right') > -1 &&
                left - width + field.offsetWidth > 0
              )
            ) {
                left = left - width + field.offsetWidth;
            }
            if ((this._o.reposition && top + height > viewportHeight + scrollTop) ||
              (
                this._o.position.indexOf('top') > -1 &&
                top - height - field.offsetHeight > 0
              )
            ) {
                top = top - height - field.offsetHeight;
            }

            this.el.style.left = left + 'px';
            this.el.style.top = top + 'px';
        },

        /**
         * render HTML for a particular month
         */
        render: function(year, month, randId)
        {
            var opts   = this._o,
              now    = new Date(),
              days   = getDaysInMonth(year, month),
              before = new Date(year, month, 1).getDay(),
              data   = [],
              row    = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var previousMonth = month === 0 ? 11 : month - 1,
              nextMonth = month === 11 ? 0 : month + 1,
              yearOfPreviousMonth = month === 0 ? year - 1 : year,
              yearOfNextMonth = month === 11 ? year + 1 : year,
              daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
            var cells = days + before,
              after = cells;
            while(after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            for (var i = 0, r = 0; i < cells; i++)
            {
                var day = new Date(year, month, 1 + (i - before)),
                  isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                  isToday = compareDates(day, now),
                  hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
                  isEmpty = i < before || i >= (days + before),
                  dayNumber = 1 + (i - before),
                  monthNumber = month,
                  yearNumber = year,
                  isStartRange = opts.startRange && compareDates(opts.startRange, day),
                  isEndRange = opts.endRange && compareDates(opts.endRange, day),
                  isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
                  isDisabled = (opts.minDate && day < opts.minDate) ||
                    (opts.maxDate && day > opts.maxDate) ||
                    (opts.disableWeekends && isWeekend(day)) ||
                    (opts.disableDayFn && opts.disableDayFn(day));

                if (isEmpty) {
                    if (i < before) {
                        dayNumber = daysInPreviousMonth + dayNumber;
                        monthNumber = previousMonth;
                        yearNumber = yearOfPreviousMonth;
                    } else {
                        dayNumber = dayNumber - days;
                        monthNumber = nextMonth;
                        yearNumber = yearOfNextMonth;
                    }
                }

                var dayConfig = {
                    day: dayNumber,
                    month: monthNumber,
                    year: yearNumber,
                    hasEvent: hasEvent,
                    isSelected: isSelected,
                    isToday: isToday,
                    isDisabled: isDisabled,
                    isEmpty: isEmpty,
                    isStartRange: isStartRange,
                    isEndRange: isEndRange,
                    isInRange: isInRange,
                    showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
                };

                row.push(renderDay(dayConfig));

                if (++r === 7) {
                    if (opts.showWeekNumber) {
                        row.unshift(renderWeek(i - before, month, year));
                    }
                    data.push(renderRow(row, opts.isRTL));
                    row = [];
                    r = 0;
                }
            }
            return renderTable(opts, data, randId);
        },

        isVisible: function()
        {
            return this._v;
        },

        show: function()
        {
            if (!this.isVisible()) {
                this._v = true;
                this.draw();
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                    this.adjustPosition();
                }
                removeClass(this.el, 'is-hidden');
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },

        hide: function()
        {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.position = 'static'; // reset
                this.el.style.left = 'auto';
                this.el.style.top = 'auto';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },

        /**
         * GAME OVER
         */
        destroy: function()
        {
            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'touchend', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (this._o.field) {
                removeEvent(this._o.field, 'change', this._onInputChange);
                if (this._o.bound) {
                    removeEvent(this._o.trigger, 'click', this._onInputClick);
                    removeEvent(this._o.trigger, 'focus', this._onInputFocus);
                    removeEvent(this._o.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }

    };

    return Pikaday;

}));

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
(function () {
    'use strict';

    class Validation {

        constructor(el) {
            this.el = el;
            this.input = [...this.el.querySelectorAll('[data-validaton]')];
            this.submitBtn = this.el.querySelector('.js-leadgen-submit');
            this.textInput = 'leadgen-input-text';
            this.emailInput = 'leadgen-input-email';
            this.phoneInput = 'leadgen-input-phone';
            this.dateInput = 'leadgen-input-date';
            this.addressInput = 'leadgen-input-address';
            this.data = {};
            
            this.registerEvents();
        }

        makeValid(el) {
            el.closest('.leadgen__form-container').classList.remove('is-invalid');
            el.closest('.leadgen__form-container').classList.add('is-valid');

            return true;
        }

        makeInvalid(el) {
            el.closest('.leadgen__form-container').classList.remove('is-valid');
            el.closest('.leadgen__form-container').classList.add('is-invalid');

            return false;
        }

        checkAddress() {
            const cityFrom = document.getElementById('locality_from').value;
            const cityTo = document.getElementById('locality_to').value;
            
            return (cityFrom !== '' && cityTo !== '')
        }

        checkValidity(showValidationIcons = true) {
            let validArr = [];

            this.input.forEach(el => {

                // Ignore inactive inputs
                if (el.disabled || el.classList.contains('hidden-input')) {
                return showValidationIcons ? this.makeValid(el) : true;
            }

            // Empty inputs are always invalid
            if (el.value.trim().length === 0) {
                return showValidationIcons ? this.makeInvalid(el) : false;
            }

            // Test email address inputs
            if (el.dataset.validaton === this.emailInput) {

                if (Validation.EMAIL_REGEXP.test(el.value)) {
                    validArr.push(el);
                    return this.makeValid(el);
                }

                return showValidationIcons ? this.makeInvalid(el) : false;
            }

            // Test name inputs
            if (el.dataset.validaton === this.textInput) {

                if (Validation.NAME_REGEXP.test(el.value)) {
                    validArr.push(el);
                    return this.makeValid(el);
                }

                return showValidationIcons ? this.makeInvalid(el) : false;
            }

            // Test phone inputs
            if (el.dataset.validaton === this.phoneInput) {
                if ($(el).intlTelInput("isValidNumber")) {
                    validArr.push(el);
                    return this.makeValid(el);
                }

                return showValidationIcons ? this.makeInvalid(el) : false;
            }

            // Test date inputs
            if (el.dataset.validaton === this.dateInput) {

                if (Validation.DATE_REGEXP.test(el.value)) {
                    validArr.push(el);
                    return this.makeValid(el);
                }

                return showValidationIcons ? this.makeInvalid(el) : false;
            }

            // Address inputs
            if (el.dataset.validaton === this.addressInput) {

                if (el.value.trim().length != 0 && this.checkAddress()) {
                    validArr.push(el);
                    return this.makeValid(el);
                }

                return showValidationIcons ? this.makeInvalid(el) : false;
            }

            return this.makeValid(el);
        });

            this.prepareData();
            return validArr;
        }

        prepareData() {
            let leadgenInput = document.getElementById('leadgen_landing'),
                leadgenHolder = document.querySelector('.leadgen'),
                providerId = leadgenHolder.dataset.providerid,
                providerIdDesktop = leadgenHolder.dataset.provideridDesktop;
                
            if (window.innerWidth <= 600) {
                leadgenInput.value = providerId || 'BookingFunnel-LS-M';
            } else {
                leadgenInput.value = providerIdDesktop || providerId || 'BookingFunnel-LS-H1';
            }

            this.urlParams();
        };

        formPost() {
            this.el.submit();
        }

        disableBtn() {
            this.submitBtn.classList.add('has-spinner');
        }

        sendData(url, location) {
            let formData = $(this.el).serialize();
            
            $.ajax({
                type: 'POST',
                url: url,
                data: formData,
                crossDomain: true,
                error: () => console.log('Error')
            });

            window.location = location;
        }

        formSubmit(e) {
            let customview = this.el.closest('.leadgen').dataset.version;
            e.preventDefault();

            if (this.checkValidity().length === this.input.length) {
                this.disableBtn();
                if(customview === 'v1') {
                    this.sendData('https://9yo0fqi28f.execute-api.eu-central-1.amazonaws.com/prod', 'http://umzugsfirmenvergleich.com/success');
                } else if(customview === 'v2') {
                    this.sendData('https://9yo0fqi28f.execute-api.eu-central-1.amazonaws.com/prod', 'http://umzugskostensparen.com/danke');
                } else if(customview === 'v3') {
                    this.sendData('https://9yo0fqi28f.execute-api.eu-central-1.amazonaws.com/prod', 'http://umzugsfirmen24.com/danke');
                } else {
                    this.formPost();
                }
            }

            return;
        }

        urlParams() {
            let sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                parameters = {},
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                let urlVariables = sURLVariables[i].split('=');
                parameters[urlVariables[0]] = urlVariables[1];
            }

            for (let key in parameters) {
                let hiddenFields = document.querySelector('.leadgen-hidden-input');
                let input = document.createElement("input");
                input.type = "text";
                input.name = key;
                input.value = parameters[key];
                input.hidden = true;
                hiddenFields.appendChild(input);
            }
        }

        registerEvents() {
            this.submitBtn.addEventListener('click', this.formSubmit.bind(this), false);
        }
    }

    Validation.NAME_REGEXP  = /^[ äÄäÖöÜüßÀÂÄÈÉÊËÎÏÔŒÙÛÜŸàâäèéêëîïôœùûüÿÇçÀÈÉÌÒÓÙàèéìòóù\-'\w]+$/;
    Validation.EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    Validation.DATE_REGEXP  = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

    // export
    window.Validation = Validation;

})();

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
/*!
 * gulp-boilerplate v4.2.3: My Gulp.js boilerplate for creating new web projects
 * (c) 2017 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/Plugin
 */

//! moment.js
//! version : 2.17.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return od.apply(null,arguments)}
// This is done to register the method called with moment()
// without creating circular dependencies.
    function b(a){od=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){
// IE8 will treat undefined and null as object if it wasn't for
// input != null
        return null!=a&&"[object Object]"===Object.prototype.toString.call(a)}function e(a){var b;for(b in a)
// even if its not own property I'd still call it non-empty
        return!1;return!0}function f(a){return"number"==typeof a||"[object Number]"===Object.prototype.toString.call(a)}function g(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function h(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function i(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function j(a,b){for(var c in b)i(b,c)&&(a[c]=b[c]);return i(b,"toString")&&(a.toString=b.toString),i(b,"valueOf")&&(a.valueOf=b.valueOf),a}function k(a,b,c,d){return rb(a,b,c,d,!0).utc()}function l(){
// We need to deep clone this object.
        return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function m(a){return null==a._pf&&(a._pf=l()),a._pf}function n(a){if(null==a._isValid){var b=m(a),c=qd.call(b.parsedDateParts,function(a){return null!=a}),d=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.invalidWeekday&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated&&(!b.meridiem||b.meridiem&&c);if(a._strict&&(d=d&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour),null!=Object.isFrozen&&Object.isFrozen(a))return d;a._isValid=d}return a._isValid}function o(a){var b=k(NaN);return null!=a?j(m(b),a):m(b).userInvalidated=!0,b}function p(a){return void 0===a}function q(a,b){var c,d,e;if(p(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),p(b._i)||(a._i=b._i),p(b._f)||(a._f=b._f),p(b._l)||(a._l=b._l),p(b._strict)||(a._strict=b._strict),p(b._tzm)||(a._tzm=b._tzm),p(b._isUTC)||(a._isUTC=b._isUTC),p(b._offset)||(a._offset=b._offset),p(b._pf)||(a._pf=m(b)),p(b._locale)||(a._locale=b._locale),rd.length>0)for(c in rd)d=rd[c],e=b[d],p(e)||(a[d]=e);return a}
// Moment prototype object
    function r(b){q(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),
// Prevent infinite loop in case updateOffset creates new moment
// objects.
    sd===!1&&(sd=!0,a.updateOffset(this),sd=!1)}function s(a){return a instanceof r||null!=a&&null!=a._isAMomentObject}function t(a){return a<0?Math.ceil(a)||0:Math.floor(a)}function u(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=t(b)),c}
// compare two arrays, return the number of differences
    function v(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;d<e;d++)(c&&a[d]!==b[d]||!c&&u(a[d])!==u(b[d]))&&g++;return g+f}function w(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function x(b,c){var d=!0;return j(function(){if(null!=a.deprecationHandler&&a.deprecationHandler(null,b),d){for(var e,f=[],g=0;g<arguments.length;g++){if(e="","object"==typeof arguments[g]){e+="\n["+g+"] ";for(var h in arguments[0])e+=h+": "+arguments[0][h]+", ";e=e.slice(0,-2)}else e=arguments[g];f.push(e)}w(b+"\nArguments: "+Array.prototype.slice.call(f).join("")+"\n"+(new Error).stack),d=!1}return c.apply(this,arguments)},c)}function y(b,c){null!=a.deprecationHandler&&a.deprecationHandler(b,c),td[b]||(w(c),td[b]=!0)}function z(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function A(a){var b,c;for(c in a)b=a[c],z(b)?this[c]=b:this["_"+c]=b;this._config=a,
// Lenient ordinal parsing accepts just a number in addition to
// number + (possibly) stuff coming from _ordinalParseLenient.
      this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function B(a,b){var c,e=j({},a);for(c in b)i(b,c)&&(d(a[c])&&d(b[c])?(e[c]={},j(e[c],a[c]),j(e[c],b[c])):null!=b[c]?e[c]=b[c]:delete e[c]);for(c in a)i(a,c)&&!i(b,c)&&d(a[c])&&(
// make sure changes to properties don't modify parent config
      e[c]=j({},e[c]));return e}function C(a){null!=a&&this.set(a)}function D(a,b,c){var d=this._calendar[a]||this._calendar.sameElse;return z(d)?d.call(b,c):d}function E(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function F(){return this._invalidDate}function G(a){return this._ordinal.replace("%d",a)}function H(a,b,c,d){var e=this._relativeTime[c];return z(e)?e(a,b,c,d):e.replace(/%d/i,a)}function I(a,b){var c=this._relativeTime[a>0?"future":"past"];return z(c)?c(b):c.replace(/%s/i,b)}function J(a,b){var c=a.toLowerCase();Dd[c]=Dd[c+"s"]=Dd[b]=a}function K(a){return"string"==typeof a?Dd[a]||Dd[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)i(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(a,b){Ed[a]=b}function N(a){var b=[];for(var c in a)b.push({unit:c,priority:Ed[c]});return b.sort(function(a,b){return a.priority-b.priority}),b}function O(b,c){return function(d){return null!=d?(Q(this,b,d),a.updateOffset(this,c),this):P(this,b)}}function P(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function Q(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}
// MOMENTS
    function R(a){return a=K(a),z(this[a])?this[a]():this}function S(a,b){if("object"==typeof a){a=L(a);for(var c=N(a),d=0;d<c.length;d++)this[c[d].unit](a[c[d].unit])}else if(a=K(a),z(this[a]))return this[a](b);return this}function T(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}
// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
    function U(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Id[a]=e),b&&(Id[b[0]]=function(){return T(e.apply(this,arguments),b[1],b[2])}),c&&(Id[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function V(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function W(a){var b,c,d=a.match(Fd);for(b=0,c=d.length;b<c;b++)Id[d[b]]?d[b]=Id[d[b]]:d[b]=V(d[b]);return function(b){var e,f="";for(e=0;e<c;e++)f+=d[e]instanceof Function?d[e].call(b,a):d[e];return f}}
// format date using native date object
    function X(a,b){return a.isValid()?(b=Y(b,a.localeData()),Hd[b]=Hd[b]||W(b),Hd[b](a)):a.localeData().invalidDate()}function Y(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Gd.lastIndex=0;d>=0&&Gd.test(a);)a=a.replace(Gd,c),Gd.lastIndex=0,d-=1;return a}function Z(a,b,c){$d[a]=z(b)?b:function(a,d){return a&&c?c:b}}function $(a,b){return i($d,a)?$d[a](b._strict,b._locale):new RegExp(_(a))}
// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function _(a){return aa(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function aa(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function ba(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),f(b)&&(d=function(a,c){c[b]=u(a)}),c=0;c<a.length;c++)_d[a[c]]=d}function ca(a,b){ba(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function da(a,b,c){null!=b&&i(_d,a)&&_d[a](b,c._a,c,a)}function ea(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function fa(a,b){return a?c(this._months)?this._months[a.month()]:this._months[(this._months.isFormat||ke).test(b)?"format":"standalone"][a.month()]:this._months}function ga(a,b){return a?c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[ke.test(b)?"format":"standalone"][a.month()]:this._monthsShort}function ha(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._monthsParse)for(
// this is not used
      this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],d=0;d<12;++d)f=k([2e3,d]),this._shortMonthsParse[d]=this.monthsShort(f,"").toLocaleLowerCase(),this._longMonthsParse[d]=this.months(f,"").toLocaleLowerCase();return c?"MMM"===b?(e=je.call(this._shortMonthsParse,g),e!==-1?e:null):(e=je.call(this._longMonthsParse,g),e!==-1?e:null):"MMM"===b?(e=je.call(this._shortMonthsParse,g),e!==-1?e:(e=je.call(this._longMonthsParse,g),e!==-1?e:null)):(e=je.call(this._longMonthsParse,g),e!==-1?e:(e=je.call(this._shortMonthsParse,g),e!==-1?e:null))}function ia(a,b,c){var d,e,f;if(this._monthsParseExact)return ha.call(this,a,b,c);
// TODO: add sorting
// Sorting makes sure if one month (or abbr) is a prefix of another
// see sorting in computeMonthsParse
        for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;d<12;d++){
// test the regex
            if(
// make the regex if we don't have it already
              e=k([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}
// MOMENTS
    function ja(a,b){var c;if(!a.isValid())
// No op
        return a;if("string"==typeof b)if(/^\d+$/.test(b))b=u(b);else
// TODO: Another silent failure?
    if(b=a.localeData().monthsParse(b),!f(b))return a;return c=Math.min(a.date(),ea(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ka(b){return null!=b?(ja(this,b),a.updateOffset(this,!0),this):P(this,"Month")}function la(){return ea(this.year(),this.month())}function ma(a){return this._monthsParseExact?(i(this,"_monthsRegex")||oa.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):(i(this,"_monthsShortRegex")||(this._monthsShortRegex=ne),this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex)}function na(a){return this._monthsParseExact?(i(this,"_monthsRegex")||oa.call(this),a?this._monthsStrictRegex:this._monthsRegex):(i(this,"_monthsRegex")||(this._monthsRegex=oe),this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex)}function oa(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;b<12;b++)
// make the regex if we don't have it already
        c=k([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(
// Sorting makes sure if one month (or abbr) is a prefix of another it
// will match the longer piece.
      d.sort(a),e.sort(a),f.sort(a),b=0;b<12;b++)d[b]=aa(d[b]),e[b]=aa(e[b]);for(b=0;b<24;b++)f[b]=aa(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")","i")}
// HELPERS
    function pa(a){return qa(a)?366:365}function qa(a){return a%4===0&&a%100!==0||a%400===0}function ra(){return qa(this.year())}function sa(a,b,c,d,e,f,g){
//can't just apply() to create a date:
//http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var h=new Date(a,b,c,d,e,f,g);
//the date constructor remaps years 0-99 to 1900-1999
        return a<100&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function ta(a){var b=new Date(Date.UTC.apply(null,arguments));
//the Date.UTC function remaps years 0-99 to 1900-1999
        return a<100&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}
// start-of-first-week - start-of-year
    function ua(a,b,c){var// first-week day -- which january is always in the first week (4 for iso, 1 for other)
      d=7+b-c,
// first-week day local weekday -- which local weekday is fwd
      e=(7+ta(a,0,d).getUTCDay()-b)%7;return-e+d-1}
//http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function va(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ua(a,d,e),j=1+7*(b-1)+h+i;return j<=0?(f=a-1,g=pa(f)+j):j>pa(a)?(f=a+1,g=j-pa(a)):(f=a,g=j),{year:f,dayOfYear:g}}function wa(a,b,c){var d,e,f=ua(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return g<1?(e=a.year()-1,d=g+xa(e,b,c)):g>xa(a.year(),b,c)?(d=g-xa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function xa(a,b,c){var d=ua(a,b,c),e=ua(a+1,b,c);return(pa(a)-d+e)/7}
// HELPERS
// LOCALES
    function ya(a){return wa(a,this._week.dow,this._week.doy).week}function za(){return this._week.dow}function Aa(){return this._week.doy}
// MOMENTS
    function Ba(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function Ca(a){var b=wa(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}
// HELPERS
    function Da(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function Ea(a,b){return"string"==typeof a?b.weekdaysParse(a)%7||7:isNaN(a)?null:a}function Fa(a,b){return a?c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]:this._weekdays}function Ga(a){return a?this._weekdaysShort[a.day()]:this._weekdaysShort}function Ha(a){return a?this._weekdaysMin[a.day()]:this._weekdaysMin}function Ia(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],d=0;d<7;++d)f=k([2e3,1]).day(d),this._minWeekdaysParse[d]=this.weekdaysMin(f,"").toLocaleLowerCase(),this._shortWeekdaysParse[d]=this.weekdaysShort(f,"").toLocaleLowerCase(),this._weekdaysParse[d]=this.weekdays(f,"").toLocaleLowerCase();return c?"dddd"===b?(e=je.call(this._weekdaysParse,g),e!==-1?e:null):"ddd"===b?(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:null):(e=je.call(this._minWeekdaysParse,g),e!==-1?e:null):"dddd"===b?(e=je.call(this._weekdaysParse,g),e!==-1?e:(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:(e=je.call(this._minWeekdaysParse,g),e!==-1?e:null))):"ddd"===b?(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:(e=je.call(this._weekdaysParse,g),e!==-1?e:(e=je.call(this._minWeekdaysParse,g),e!==-1?e:null))):(e=je.call(this._minWeekdaysParse,g),e!==-1?e:(e=je.call(this._weekdaysParse,g),e!==-1?e:(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:null)))}function Ja(a,b,c){var d,e,f;if(this._weekdaysParseExact)return Ia.call(this,a,b,c);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;d<7;d++){
// test the regex
        if(
// make the regex if we don't have it already
          e=k([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}
// MOMENTS
    function Ka(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Da(a,this.localeData()),this.add(a-b,"d")):b}function La(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Ma(a){if(!this.isValid())return null!=a?this:NaN;
// behaves the same as moment#day except
// as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
// as a setter, sunday should belong to the previous week.
        if(null!=a){var b=Ea(a,this.localeData());return this.day(this.day()%7?b:b-7)}return this.day()||7}function Na(a){return this._weekdaysParseExact?(i(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysStrictRegex:this._weekdaysRegex):(i(this,"_weekdaysRegex")||(this._weekdaysRegex=ue),this._weekdaysStrictRegex&&a?this._weekdaysStrictRegex:this._weekdaysRegex)}function Oa(a){return this._weekdaysParseExact?(i(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(i(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=ve),this._weekdaysShortStrictRegex&&a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function Pa(a){return this._weekdaysParseExact?(i(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(i(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=we),this._weekdaysMinStrictRegex&&a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function Qa(){function a(a,b){return b.length-a.length}var b,c,d,e,f,g=[],h=[],i=[],j=[];for(b=0;b<7;b++)
// make the regex if we don't have it already
        c=k([2e3,1]).day(b),d=this.weekdaysMin(c,""),e=this.weekdaysShort(c,""),f=this.weekdays(c,""),g.push(d),h.push(e),i.push(f),j.push(d),j.push(e),j.push(f);for(
// Sorting makes sure if one weekday (or abbr) is a prefix of another it
// will match the longer piece.
      g.sort(a),h.sort(a),i.sort(a),j.sort(a),b=0;b<7;b++)h[b]=aa(h[b]),i[b]=aa(i[b]),j[b]=aa(j[b]);this._weekdaysRegex=new RegExp("^("+j.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+h.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+g.join("|")+")","i")}
// FORMATTING
    function Ra(){return this.hours()%12||12}function Sa(){return this.hours()||24}function Ta(a,b){U(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}
// PARSING
    function Ua(a,b){return b._meridiemParse}
// LOCALES
    function Va(a){
// IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
// Using charAt should be more compatible.
        return"p"===(a+"").toLowerCase().charAt(0)}function Wa(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Xa(a){return a?a.toLowerCase().replace("_","-"):a}
// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function Ya(a){for(var b,c,d,e,f=0;f<a.length;){for(e=Xa(a[f]).split("-"),b=e.length,c=Xa(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=Za(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&v(e,c,!0)>=b-1)
//the next array item is better than a shallower substring of this one
        break;b--}f++}return null}function Za(a){var b=null;
// TODO: Find a better way to register and load all the locales in Node
        if(!Be[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=xe._abbr,require("./locale/"+a),
// because defineLocale currently also sets the global locale, we
// want to undo that for lazy loaded locales
          $a(b)}catch(a){}return Be[a]}
// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
    function $a(a,b){var c;
// moment.duration._locale = moment._locale = data;
        return a&&(c=p(b)?bb(a):_a(a,b),c&&(xe=c)),xe._abbr}function _a(a,b){if(null!==b){var c=Ae;if(b.abbr=a,null!=Be[a])y("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),c=Be[a]._config;else if(null!=b.parentLocale){if(null==Be[b.parentLocale])return Ce[b.parentLocale]||(Ce[b.parentLocale]=[]),Ce[b.parentLocale].push({name:a,config:b}),null;c=Be[b.parentLocale]._config}
// backwards compat for now: also set the locale
// make sure we set the locale AFTER all child locales have been
// created, so we won't end up with the child locale set.
        return Be[a]=new C(B(c,b)),Ce[a]&&Ce[a].forEach(function(a){_a(a.name,a.config)}),$a(a),Be[a]}
// useful for testing
        return delete Be[a],null}function ab(a,b){if(null!=b){var c,d=Ae;
// MERGE
        null!=Be[a]&&(d=Be[a]._config),b=B(d,b),c=new C(b),c.parentLocale=Be[a],Be[a]=c,
// backwards compat for now: also set the locale
          $a(a)}else
// pass null for config to unupdate, useful for tests
        null!=Be[a]&&(null!=Be[a].parentLocale?Be[a]=Be[a].parentLocale:null!=Be[a]&&delete Be[a]);return Be[a]}
// returns locale data
    function bb(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return xe;if(!c(a)){if(
//short-circuit everything else
      b=Za(a))return b;a=[a]}return Ya(a)}function cb(){return wd(Be)}function db(a){var b,c=a._a;return c&&m(a).overflow===-2&&(b=c[be]<0||c[be]>11?be:c[ce]<1||c[ce]>ea(c[ae],c[be])?ce:c[de]<0||c[de]>24||24===c[de]&&(0!==c[ee]||0!==c[fe]||0!==c[ge])?de:c[ee]<0||c[ee]>59?ee:c[fe]<0||c[fe]>59?fe:c[ge]<0||c[ge]>999?ge:-1,m(a)._overflowDayOfYear&&(b<ae||b>ce)&&(b=ce),m(a)._overflowWeeks&&b===-1&&(b=he),m(a)._overflowWeekday&&b===-1&&(b=ie),m(a).overflow=b),a}
// date from iso format
    function eb(a){var b,c,d,e,f,g,h=a._i,i=De.exec(h)||Ee.exec(h);if(i){for(m(a).iso=!0,b=0,c=Ge.length;b<c;b++)if(Ge[b][1].exec(i[1])){e=Ge[b][0],d=Ge[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=He.length;b<c;b++)if(He[b][1].exec(i[3])){
// match[2] should be 'T' or space
        f=(i[2]||" ")+He[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Fe.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),kb(a)}else a._isValid=!1}
// date from iso format or fallback
    function fb(b){var c=Ie.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(eb(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}
// Pick the first defined of two or three arguments.
    function gb(a,b,c){return null!=a?a:null!=b?b:c}function hb(b){
// hooks is actually the exported moment object
        var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}
// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
    function ib(a){var b,c,d,e,f=[];if(!a._d){
// Default to current date.
// * if no year, month, day of month are given, default to today
// * if day of month is given, default month and year
// * if month is given, default only year
// * if year is given, don't default anything
        for(d=hb(a),
//compute day of the year from weeks and weekdays
            a._w&&null==a._a[ce]&&null==a._a[be]&&jb(a),
//if the day of the year is set, figure out what it is
            a._dayOfYear&&(e=gb(a._a[ae],d[ae]),a._dayOfYear>pa(e)&&(m(a)._overflowDayOfYear=!0),c=ta(e,0,a._dayOfYear),a._a[be]=c.getUTCMonth(),a._a[ce]=c.getUTCDate()),b=0;b<3&&null==a._a[b];++b)a._a[b]=f[b]=d[b];
// Zero out whatever was not defaulted, including time
        for(;b<7;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];
// Check for 24:00:00.000
        24===a._a[de]&&0===a._a[ee]&&0===a._a[fe]&&0===a._a[ge]&&(a._nextDay=!0,a._a[de]=0),a._d=(a._useUTC?ta:sa).apply(null,f),
// Apply timezone offset from input. The actual utcOffset can be changed
// with parseZone.
        null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[de]=24)}}function jb(a){var b,c,d,e,f,g,h,i;if(b=a._w,null!=b.GG||null!=b.W||null!=b.E)f=1,g=4,
// TODO: We need to take the current isoWeekYear, but that depends on
// how we interpret now (local, utc, fixed offset). So create
// a now version of current config (take local/utc/offset flags, and
// create now).
      c=gb(b.GG,a._a[ae],wa(sb(),1,4).year),d=gb(b.W,1),e=gb(b.E,1),(e<1||e>7)&&(i=!0);else{f=a._locale._week.dow,g=a._locale._week.doy;var j=wa(sb(),f,g);c=gb(b.gg,a._a[ae],j.year),
// Default to current week.
      d=gb(b.w,j.week),null!=b.d?(
// weekday -- low day numbers are considered next week
      e=b.d,(e<0||e>6)&&(i=!0)):null!=b.e?(
// local weekday -- counting starts from begining of week
      e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):
// default to begining of week
      e=f}d<1||d>xa(c,f,g)?m(a)._overflowWeeks=!0:null!=i?m(a)._overflowWeekday=!0:(h=va(c,d,e,f,g),a._a[ae]=h.year,a._dayOfYear=h.dayOfYear)}
// date from string and format string
    function kb(b){
// TODO: Move this to another part of the creation flow to prevent circular deps
        if(b._f===a.ISO_8601)return void eb(b);b._a=[],m(b).empty=!0;
// This array is used to make a Date, either with `new Date` or `Date.UTC`
        var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=Y(b._f,b._locale).match(Fd)||[],c=0;c<e.length;c++)f=e[c],d=(h.match($(f,b))||[])[0],
// console.log('token', token, 'parsedInput', parsedInput,
//         'regex', getParseRegexForToken(token, config));
        d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&m(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),
// don't parse if it's not a known token
          Id[f]?(d?m(b).empty=!1:m(b).unusedTokens.push(f),da(f,d,b)):b._strict&&!d&&m(b).unusedTokens.push(f);
// add remaining unparsed input length to the string
        m(b).charsLeftOver=i-j,h.length>0&&m(b).unusedInput.push(h),
// clear _12h flag if hour is <= 12
        b._a[de]<=12&&m(b).bigHour===!0&&b._a[de]>0&&(m(b).bigHour=void 0),m(b).parsedDateParts=b._a.slice(0),m(b).meridiem=b._meridiem,
// handle meridiem
          b._a[de]=lb(b._locale,b._a[de],b._meridiem),ib(b),db(b)}function lb(a,b,c){var d;
// Fallback
        return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&b<12&&(b+=12),d||12!==b||(b=0),b):b}
// date from string and array of format strings
    function mb(a){var b,c,d,e,f;if(0===a._f.length)return m(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=q({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],kb(b),n(b)&&(
// if there is any input that was not parsed add a penalty for that format
      f+=m(b).charsLeftOver,
//or tokens
      f+=10*m(b).unusedTokens.length,m(b).score=f,(null==d||f<d)&&(d=f,c=b));j(a,c||b)}function nb(a){if(!a._d){var b=L(a._i);a._a=h([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),ib(a)}}function ob(a){var b=new r(db(pb(a)));
// Adding is smart enough around DST
        return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function pb(a){var b=a._i,d=a._f;return a._locale=a._locale||bb(a._l),null===b||void 0===d&&""===b?o({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),s(b)?new r(db(b)):(g(b)?a._d=b:c(d)?mb(a):d?kb(a):qb(a),n(a)||(a._d=null),a))}function qb(b){var d=b._i;void 0===d?b._d=new Date(a.now()):g(d)?b._d=new Date(d.valueOf()):"string"==typeof d?fb(b):c(d)?(b._a=h(d.slice(0),function(a){return parseInt(a,10)}),ib(b)):"object"==typeof d?nb(b):f(d)?
// from milliseconds
      b._d=new Date(d):a.createFromInputFallback(b)}function rb(a,b,f,g,h){var i={};
// object construction must be done this way.
// https://github.com/moment/moment/issues/1423
        return f!==!0&&f!==!1||(g=f,f=void 0),(d(a)&&e(a)||c(a)&&0===a.length)&&(a=void 0),i._isAMomentObject=!0,i._useUTC=i._isUTC=h,i._l=f,i._i=a,i._f=b,i._strict=g,ob(i)}function sb(a,b,c,d){return rb(a,b,c,d,!1)}
// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
    function tb(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return sb();for(d=b[0],e=1;e<b.length;++e)b[e].isValid()&&!b[e][a](d)||(d=b[e]);return d}
// TODO: Use [].sort instead?
    function ub(){var a=[].slice.call(arguments,0);return tb("isBefore",a)}function vb(){var a=[].slice.call(arguments,0);return tb("isAfter",a)}function wb(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;
// representation for dateAddRemove
        this._milliseconds=+k+1e3*j+// 1000
          6e4*i+// 1000 * 60
          1e3*h*60*60,//using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
// Because of dateAddRemove treats 24 hours as different from a
// day when working around DST, we need to store them separately
          this._days=+g+7*f,
// It is impossible translate months into days without knowing
// which months you are are talking about, so we have to store
// it separately.
          this._months=+e+3*d+12*c,this._data={},this._locale=bb(),this._bubble()}function xb(a){return a instanceof wb}function yb(a){return a<0?Math.round(-1*a)*-1:Math.round(a)}
// FORMATTING
    function zb(a,b){U(a,0,0,function(){var a=this.utcOffset(),c="+";return a<0&&(a=-a,c="-"),c+T(~~(a/60),2)+b+T(~~a%60,2)})}function Ab(a,b){var c=(b||"").match(a);if(null===c)return null;var d=c[c.length-1]||[],e=(d+"").match(Me)||["-",0,0],f=+(60*e[1])+u(e[2]);return 0===f?0:"+"===e[0]?f:-f}
// Return a moment from input, that is local/utc/zone equivalent to model.
    function Bb(b,c){var d,e;
// Use low-level api, because this fn is low-level api.
        return c._isUTC?(d=c.clone(),e=(s(b)||g(b)?b.valueOf():sb(b).valueOf())-d.valueOf(),d._d.setTime(d._d.valueOf()+e),a.updateOffset(d,!1),d):sb(b).local()}function Cb(a){
// On Firefox.24 Date#getTimezoneOffset returns a floating point.
// https://github.com/moment/moment/pull/1871
        return 15*-Math.round(a._d.getTimezoneOffset()/15)}
// MOMENTS
// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
    function Db(b,c){var d,e=this._offset||0;if(!this.isValid())return null!=b?this:NaN;if(null!=b){if("string"==typeof b){if(b=Ab(Xd,b),null===b)return this}else Math.abs(b)<16&&(b=60*b);return!this._isUTC&&c&&(d=Cb(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?Tb(this,Ob(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?e:Cb(this)}function Eb(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Fb(a){return this.utcOffset(0,a)}function Gb(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Cb(this),"m")),this}function Hb(){if(null!=this._tzm)this.utcOffset(this._tzm);else if("string"==typeof this._i){var a=Ab(Wd,this._i);null!=a?this.utcOffset(a):this.utcOffset(0,!0)}return this}function Ib(a){return!!this.isValid()&&(a=a?sb(a).utcOffset():0,(this.utcOffset()-a)%60===0)}function Jb(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Kb(){if(!p(this._isDSTShifted))return this._isDSTShifted;var a={};if(q(a,this),a=pb(a),a._a){var b=a._isUTC?k(a._a):sb(a._a);this._isDSTShifted=this.isValid()&&v(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Lb(){return!!this.isValid()&&!this._isUTC}function Mb(){return!!this.isValid()&&this._isUTC}function Nb(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}function Ob(a,b){var c,d,e,g=a,
// matching against regexp is expensive, do it on demand
      h=null;// checks for null or undefined
        return xb(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:f(a)?(g={},b?g[b]=a:g.milliseconds=a):(h=Ne.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:u(h[ce])*c,h:u(h[de])*c,m:u(h[ee])*c,s:u(h[fe])*c,ms:u(yb(1e3*h[ge]))*c}):(h=Oe.exec(a))?(c="-"===h[1]?-1:1,g={y:Pb(h[2],c),M:Pb(h[3],c),w:Pb(h[4],c),d:Pb(h[5],c),h:Pb(h[6],c),m:Pb(h[7],c),s:Pb(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=Rb(sb(g.from),sb(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new wb(g),xb(a)&&i(a,"_locale")&&(d._locale=a._locale),d}function Pb(a,b){
// We'd normally use ~~inp for this, but unfortunately it also
// converts floats to ints.
// inp may be undefined, so careful calling replace on it.
        var c=a&&parseFloat(a.replace(",","."));
// apply sign while we're at it
        return(isNaN(c)?0:c)*b}function Qb(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Rb(a,b){var c;return a.isValid()&&b.isValid()?(b=Bb(b,a),a.isBefore(b)?c=Qb(a,b):(c=Qb(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}
// TODO: remove 'name' arg after deprecation is removed
    function Sb(a,b){return function(c,d){var e,f;
//invert the arguments, but complain about it
        return null===d||isNaN(+d)||(y(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Ob(c,d),Tb(this,e,a),this}}function Tb(b,c,d,e){var f=c._milliseconds,g=yb(c._days),h=yb(c._months);b.isValid()&&(e=null==e||e,f&&b._d.setTime(b._d.valueOf()+f*d),g&&Q(b,"Date",P(b,"Date")+g*d),h&&ja(b,P(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function Ub(a,b){var c=a.diff(b,"days",!0);return c<-6?"sameElse":c<-1?"lastWeek":c<0?"lastDay":c<1?"sameDay":c<2?"nextDay":c<7?"nextWeek":"sameElse"}function Vb(b,c){
// We want to compare the start of today, vs this.
// Getting start-of-today depends on whether we're local/utc/offset or not.
        var d=b||sb(),e=Bb(d,this).startOf("day"),f=a.calendarFormat(this,e)||"sameElse",g=c&&(z(c[f])?c[f].call(this,d):c[f]);return this.format(g||this.localeData().calendar(f,this,sb(d)))}function Wb(){return new r(this)}function Xb(a,b){var c=s(a)?a:sb(a);return!(!this.isValid()||!c.isValid())&&(b=K(p(b)?"millisecond":b),"millisecond"===b?this.valueOf()>c.valueOf():c.valueOf()<this.clone().startOf(b).valueOf())}function Yb(a,b){var c=s(a)?a:sb(a);return!(!this.isValid()||!c.isValid())&&(b=K(p(b)?"millisecond":b),"millisecond"===b?this.valueOf()<c.valueOf():this.clone().endOf(b).valueOf()<c.valueOf())}function Zb(a,b,c,d){return d=d||"()",("("===d[0]?this.isAfter(a,c):!this.isBefore(a,c))&&(")"===d[1]?this.isBefore(b,c):!this.isAfter(b,c))}function $b(a,b){var c,d=s(a)?a:sb(a);return!(!this.isValid()||!d.isValid())&&(b=K(b||"millisecond"),"millisecond"===b?this.valueOf()===d.valueOf():(c=d.valueOf(),this.clone().startOf(b).valueOf()<=c&&c<=this.clone().endOf(b).valueOf()))}function _b(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function ac(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function bc(a,b,c){var d,e,f,g;// 1000
// 1000 * 60
// 1000 * 60 * 60
// 1000 * 60 * 60 * 24, negate dst
// 1000 * 60 * 60 * 24 * 7, negate dst
        return this.isValid()?(d=Bb(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=cc(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:t(g)):NaN):NaN}function cc(a,b){
// difference in months
        var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),
// b is in (anchor - 1 month, anchor + 1 month)
          f=a.clone().add(e,"months");
//check for negative zero, return zero if negative zero
// linear across the month
// linear across the month
        return b-f<0?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)||0}function dc(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ec(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?z(Date.prototype.toISOString)?this.toDate().toISOString():X(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):X(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}/**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function fc(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var a="moment",b="";this.isLocal()||(a=0===this.utcOffset()?"moment.utc":"moment.parseZone",b="Z");var c="["+a+'("]',d=0<this.year()&&this.year()<=9999?"YYYY":"YYYYYY",e="-MM-DD[T]HH:mm:ss.SSS",f=b+'[")]';return this.format(c+d+e+f)}function gc(b){b||(b=this.isUtc()?a.defaultFormatUtc:a.defaultFormat);var c=X(this,b);return this.localeData().postformat(c)}function hc(a,b){return this.isValid()&&(s(a)&&a.isValid()||sb(a).isValid())?Ob({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function ic(a){return this.from(sb(),a)}function jc(a,b){return this.isValid()&&(s(a)&&a.isValid()||sb(a).isValid())?Ob({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function kc(a){return this.to(sb(),a)}
// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
    function lc(a){var b;return void 0===a?this._locale._abbr:(b=bb(a),null!=b&&(this._locale=b),this)}function mc(){return this._locale}function nc(a){
// the following switch intentionally omits break keywords
// to utilize falling through the cases.
        switch(a=K(a)){case"year":this.month(0);/* falls through */
            case"quarter":case"month":this.date(1);/* falls through */
            case"week":case"isoWeek":case"day":case"date":this.hours(0);/* falls through */
            case"hour":this.minutes(0);/* falls through */
            case"minute":this.seconds(0);/* falls through */
            case"second":this.milliseconds(0)}
// weeks are a special case
// quarters are also special
        return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function oc(a){
// 'date' is an alias for 'day', so it should be considered as such.
        return a=K(a),void 0===a||"millisecond"===a?this:("date"===a&&(a="day"),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms"))}function pc(){return this._d.valueOf()-6e4*(this._offset||0)}function qc(){return Math.floor(this.valueOf()/1e3)}function rc(){return new Date(this.valueOf())}function sc(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function tc(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function uc(){
// new Date(NaN).toJSON() === null
        return this.isValid()?this.toISOString():null}function vc(){return n(this)}function wc(){return j({},m(this))}function xc(){return m(this).overflow}function yc(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function zc(a,b){U(0,[a,a.length],0,b)}
// MOMENTS
    function Ac(a){return Ec.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Bc(a){return Ec.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Cc(){return xa(this.year(),1,4)}function Dc(){var a=this.localeData()._week;return xa(this.year(),a.dow,a.doy)}function Ec(a,b,c,d,e){var f;return null==a?wa(this,d,e).year:(f=xa(a,d,e),b>f&&(b=f),Fc.call(this,a,b,c,d,e))}function Fc(a,b,c,d,e){var f=va(a,b,c,d,e),g=ta(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}
// MOMENTS
    function Gc(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}
// HELPERS
// MOMENTS
    function Hc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function Ic(a,b){b[ge]=u(1e3*("0."+a))}
// MOMENTS
    function Jc(){return this._isUTC?"UTC":""}function Kc(){return this._isUTC?"Coordinated Universal Time":""}function Lc(a){return sb(1e3*a)}function Mc(){return sb.apply(null,arguments).parseZone()}function Nc(a){return a}function Oc(a,b,c,d){var e=bb(),f=k().set(d,b);return e[c](f,a)}function Pc(a,b,c){if(f(a)&&(b=a,a=void 0),a=a||"",null!=b)return Oc(a,b,c,"month");var d,e=[];for(d=0;d<12;d++)e[d]=Oc(a,d,c,"month");return e}
// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
    function Qc(a,b,c,d){"boolean"==typeof a?(f(b)&&(c=b,b=void 0),b=b||""):(b=a,c=b,a=!1,f(b)&&(c=b,b=void 0),b=b||"");var e=bb(),g=a?e._week.dow:0;if(null!=c)return Oc(b,(c+g)%7,d,"day");var h,i=[];for(h=0;h<7;h++)i[h]=Oc(b,(h+g)%7,d,"day");return i}function Rc(a,b){return Pc(a,b,"months")}function Sc(a,b){return Pc(a,b,"monthsShort")}function Tc(a,b,c){return Qc(a,b,c,"weekdays")}function Uc(a,b,c){return Qc(a,b,c,"weekdaysShort")}function Vc(a,b,c){return Qc(a,b,c,"weekdaysMin")}function Wc(){var a=this._data;return this._milliseconds=Ze(this._milliseconds),this._days=Ze(this._days),this._months=Ze(this._months),a.milliseconds=Ze(a.milliseconds),a.seconds=Ze(a.seconds),a.minutes=Ze(a.minutes),a.hours=Ze(a.hours),a.months=Ze(a.months),a.years=Ze(a.years),this}function Xc(a,b,c,d){var e=Ob(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}
// supports only 2.0-style add(1, 's') or add(duration)
    function Yc(a,b){return Xc(this,a,b,1)}
// supports only 2.0-style subtract(1, 's') or subtract(duration)
    function Zc(a,b){return Xc(this,a,b,-1)}function $c(a){return a<0?Math.floor(a):Math.ceil(a)}function _c(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;
// if we have a mix of positive and negative values, bubble down first
// check: https://github.com/moment/moment/issues/2166
// The following code bubbles up values, see the tests for
// examples of what that means.
// convert days to months
// 12 months -> 1 year
        return f>=0&&g>=0&&h>=0||f<=0&&g<=0&&h<=0||(f+=864e5*$c(bd(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=t(f/1e3),i.seconds=a%60,b=t(a/60),i.minutes=b%60,c=t(b/60),i.hours=c%24,g+=t(c/24),e=t(ad(g)),h+=e,g-=$c(bd(e)),d=t(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function ad(a){
// 400 years have 146097 days (taking into account leap year rules)
// 400 years have 12 months === 4800
        return 4800*a/146097}function bd(a){
// the reverse of daysToMonths
        return 146097*a/4800}function cd(a){var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+ad(b),"month"===a?c:c/12;switch(
// handle milliseconds separately because of floating point math errors (issue #1867)
      b=this._days+Math.round(bd(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;
// Math.floor prevents floating point math errors here
        case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}
// TODO: Use this.as('ms')?
    function dd(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*u(this._months/12)}function ed(a){return function(){return this.as(a)}}function fd(a){return a=K(a),this[a+"s"]()}function gd(a){return function(){return this._data[a]}}function hd(){return t(this.days()/7)}
// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function id(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function jd(a,b,c){var d=Ob(a).abs(),e=of(d.as("s")),f=of(d.as("m")),g=of(d.as("h")),h=of(d.as("d")),i=of(d.as("M")),j=of(d.as("y")),k=e<pf.s&&["s",e]||f<=1&&["m"]||f<pf.m&&["mm",f]||g<=1&&["h"]||g<pf.h&&["hh",g]||h<=1&&["d"]||h<pf.d&&["dd",h]||i<=1&&["M"]||i<pf.M&&["MM",i]||j<=1&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,id.apply(null,k)}
// This function allows you to set the rounding function for relative time strings
    function kd(a){return void 0===a?of:"function"==typeof a&&(of=a,!0)}
// This function allows you to set a threshold for relative time strings
    function ld(a,b){return void 0!==pf[a]&&(void 0===b?pf[a]:(pf[a]=b,!0))}function md(a){var b=this.localeData(),c=jd(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function nd(){
// for ISO strings we do not use the normal bubbling rules:
//  * milliseconds bubble up until they become hours
//  * days do not bubble at all
//  * months bubble up until they become years
// This is because there is no context-free conversion between hours and days
// (think of clock changes)
// and also not between days and months (28-31 days per month)
        var a,b,c,d=qf(this._milliseconds)/1e3,e=qf(this._days),f=qf(this._months);
// 3600 seconds -> 60 minutes -> 1 hour
        a=t(d/60),b=t(a/60),d%=60,a%=60,
// 12 months -> 1 year
          c=t(f/12),f%=12;
// inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(m<0?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var od,pd;pd=Array.prototype.some?Array.prototype.some:function(a){for(var b=Object(this),c=b.length>>>0,d=0;d<c;d++)if(d in b&&a.call(this,b[d],d,b))return!0;return!1};var qd=pd,rd=a.momentProperties=[],sd=!1,td={};a.suppressDeprecationWarnings=!1,a.deprecationHandler=null;var ud;ud=Object.keys?Object.keys:function(a){var b,c=[];for(b in a)i(a,b)&&c.push(b);return c};var vd,wd=ud,xd={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},yd={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},zd="Invalid date",Ad="%d",Bd=/\d{1,2}/,Cd={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Dd={},Ed={},Fd=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Gd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Hd={},Id={},Jd=/\d/,Kd=/\d\d/,Ld=/\d{3}/,Md=/\d{4}/,Nd=/[+-]?\d{6}/,Od=/\d\d?/,Pd=/\d\d\d\d?/,Qd=/\d\d\d\d\d\d?/,Rd=/\d{1,3}/,Sd=/\d{1,4}/,Td=/[+-]?\d{1,6}/,Ud=/\d+/,Vd=/[+-]?\d+/,Wd=/Z|[+-]\d\d:?\d\d/gi,Xd=/Z|[+-]\d\d(?::?\d\d)?/gi,Yd=/[+-]?\d+(\.\d{1,3})?/,Zd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,$d={},_d={},ae=0,be=1,ce=2,de=3,ee=4,fe=5,ge=6,he=7,ie=8;vd=Array.prototype.indexOf?Array.prototype.indexOf:function(a){
// I know
        var b;for(b=0;b<this.length;++b)if(this[b]===a)return b;return-1};var je=vd;
// FORMATTING
    U("M",["MM",2],"Mo",function(){return this.month()+1}),U("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),U("MMMM",0,0,function(a){return this.localeData().months(this,a)}),
// ALIASES
      J("month","M"),
// PRIORITY
      M("month",8),
// PARSING
      Z("M",Od),Z("MM",Od,Kd),Z("MMM",function(a,b){return b.monthsShortRegex(a)}),Z("MMMM",function(a,b){return b.monthsRegex(a)}),ba(["M","MM"],function(a,b){b[be]=u(a)-1}),ba(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);
// if we didn't find a month name, mark the date as invalid.
        null!=e?b[be]=e:m(c).invalidMonth=a});
// LOCALES
    var ke=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,le="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),me="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),ne=Zd,oe=Zd;
// FORMATTING
    U("Y",0,0,function(){var a=this.year();return a<=9999?""+a:"+"+a}),U(0,["YY",2],0,function(){return this.year()%100}),U(0,["YYYY",4],0,"year"),U(0,["YYYYY",5],0,"year"),U(0,["YYYYYY",6,!0],0,"year"),
// ALIASES
      J("year","y"),
// PRIORITIES
      M("year",1),
// PARSING
      Z("Y",Vd),Z("YY",Od,Kd),Z("YYYY",Sd,Md),Z("YYYYY",Td,Nd),Z("YYYYYY",Td,Nd),ba(["YYYYY","YYYYYY"],ae),ba("YYYY",function(b,c){c[ae]=2===b.length?a.parseTwoDigitYear(b):u(b)}),ba("YY",function(b,c){c[ae]=a.parseTwoDigitYear(b)}),ba("Y",function(a,b){b[ae]=parseInt(a,10)}),
// HOOKS
      a.parseTwoDigitYear=function(a){return u(a)+(u(a)>68?1900:2e3)};
// MOMENTS
    var pe=O("FullYear",!0);
// FORMATTING
    U("w",["ww",2],"wo","week"),U("W",["WW",2],"Wo","isoWeek"),
// ALIASES
      J("week","w"),J("isoWeek","W"),
// PRIORITIES
      M("week",5),M("isoWeek",5),
// PARSING
      Z("w",Od),Z("ww",Od,Kd),Z("W",Od),Z("WW",Od,Kd),ca(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=u(a)});var qe={dow:0,// Sunday is the first day of the week.
        doy:6};
// FORMATTING
    U("d",0,"do","day"),U("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),U("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),U("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),U("e",0,0,"weekday"),U("E",0,0,"isoWeekday"),
// ALIASES
      J("day","d"),J("weekday","e"),J("isoWeekday","E"),
// PRIORITY
      M("day",11),M("weekday",11),M("isoWeekday",11),
// PARSING
      Z("d",Od),Z("e",Od),Z("E",Od),Z("dd",function(a,b){return b.weekdaysMinRegex(a)}),Z("ddd",function(a,b){return b.weekdaysShortRegex(a)}),Z("dddd",function(a,b){return b.weekdaysRegex(a)}),ca(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);
// if we didn't get a weekday name, mark the date as invalid
        null!=e?b.d=e:m(c).invalidWeekday=a}),ca(["d","e","E"],function(a,b,c,d){b[d]=u(a)});
// LOCALES
    var re="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),se="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),te="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),ue=Zd,ve=Zd,we=Zd;U("H",["HH",2],0,"hour"),U("h",["hh",2],0,Ra),U("k",["kk",2],0,Sa),U("hmm",0,0,function(){return""+Ra.apply(this)+T(this.minutes(),2)}),U("hmmss",0,0,function(){return""+Ra.apply(this)+T(this.minutes(),2)+T(this.seconds(),2)}),U("Hmm",0,0,function(){return""+this.hours()+T(this.minutes(),2)}),U("Hmmss",0,0,function(){return""+this.hours()+T(this.minutes(),2)+T(this.seconds(),2)}),Ta("a",!0),Ta("A",!1),
// ALIASES
      J("hour","h"),
// PRIORITY
      M("hour",13),Z("a",Ua),Z("A",Ua),Z("H",Od),Z("h",Od),Z("HH",Od,Kd),Z("hh",Od,Kd),Z("hmm",Pd),Z("hmmss",Qd),Z("Hmm",Pd),Z("Hmmss",Qd),ba(["H","HH"],de),ba(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),ba(["h","hh"],function(a,b,c){b[de]=u(a),m(c).bigHour=!0}),ba("hmm",function(a,b,c){var d=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d)),m(c).bigHour=!0}),ba("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d,2)),b[fe]=u(a.substr(e)),m(c).bigHour=!0}),ba("Hmm",function(a,b,c){var d=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d))}),ba("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d,2)),b[fe]=u(a.substr(e))});var xe,ye=/[ap]\.?m?\.?/i,ze=O("Hours",!0),Ae={calendar:xd,longDateFormat:yd,invalidDate:zd,ordinal:Ad,ordinalParse:Bd,relativeTime:Cd,months:le,monthsShort:me,week:qe,weekdays:re,weekdaysMin:te,weekdaysShort:se,meridiemParse:ye},Be={},Ce={},De=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Ee=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Fe=/Z|[+-]\d\d(?::?\d\d)?/,Ge=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],
// YYYYMM is NOT allowed by the standard
        ["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],He=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Ie=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=x("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),
// constant that refers to the ISO standard
      a.ISO_8601=function(){};var Je=x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=sb.apply(null,arguments);return this.isValid()&&a.isValid()?a<this?this:a:o()}),Ke=x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=sb.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:o()}),Le=function(){return Date.now?Date.now():+new Date};zb("Z",":"),zb("ZZ",""),
// PARSING
      Z("Z",Xd),Z("ZZ",Xd),ba(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ab(Xd,a)});
// HELPERS
// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
    var Me=/([\+\-]|\d\d)/gi;
// HOOKS
// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
    a.updateOffset=function(){};
// ASP.NET json date format regex
    var Ne=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Oe=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;Ob.fn=wb.prototype;var Pe=Sb(1,"add"),Qe=Sb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",a.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Re=x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});
// FORMATTING
    U(0,["gg",2],0,function(){return this.weekYear()%100}),U(0,["GG",2],0,function(){return this.isoWeekYear()%100}),zc("gggg","weekYear"),zc("ggggg","weekYear"),zc("GGGG","isoWeekYear"),zc("GGGGG","isoWeekYear"),
// ALIASES
      J("weekYear","gg"),J("isoWeekYear","GG"),
// PRIORITY
      M("weekYear",1),M("isoWeekYear",1),
// PARSING
      Z("G",Vd),Z("g",Vd),Z("GG",Od,Kd),Z("gg",Od,Kd),Z("GGGG",Sd,Md),Z("gggg",Sd,Md),Z("GGGGG",Td,Nd),Z("ggggg",Td,Nd),ca(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=u(a)}),ca(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),
// FORMATTING
      U("Q",0,"Qo","quarter"),
// ALIASES
      J("quarter","Q"),
// PRIORITY
      M("quarter",7),
// PARSING
      Z("Q",Jd),ba("Q",function(a,b){b[be]=3*(u(a)-1)}),
// FORMATTING
      U("D",["DD",2],"Do","date"),
// ALIASES
      J("date","D"),
// PRIOROITY
      M("date",9),
// PARSING
      Z("D",Od),Z("DD",Od,Kd),Z("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),ba(["D","DD"],ce),ba("Do",function(a,b){b[ce]=u(a.match(Od)[0],10)});
// MOMENTS
    var Se=O("Date",!0);
// FORMATTING
    U("DDD",["DDDD",3],"DDDo","dayOfYear"),
// ALIASES
      J("dayOfYear","DDD"),
// PRIORITY
      M("dayOfYear",4),
// PARSING
      Z("DDD",Rd),Z("DDDD",Ld),ba(["DDD","DDDD"],function(a,b,c){c._dayOfYear=u(a)}),
// FORMATTING
      U("m",["mm",2],0,"minute"),
// ALIASES
      J("minute","m"),
// PRIORITY
      M("minute",14),
// PARSING
      Z("m",Od),Z("mm",Od,Kd),ba(["m","mm"],ee);
// MOMENTS
    var Te=O("Minutes",!1);
// FORMATTING
    U("s",["ss",2],0,"second"),
// ALIASES
      J("second","s"),
// PRIORITY
      M("second",15),
// PARSING
      Z("s",Od),Z("ss",Od,Kd),ba(["s","ss"],fe);
// MOMENTS
    var Ue=O("Seconds",!1);
// FORMATTING
    U("S",0,0,function(){return~~(this.millisecond()/100)}),U(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),U(0,["SSS",3],0,"millisecond"),U(0,["SSSS",4],0,function(){return 10*this.millisecond()}),U(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),U(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),U(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),U(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),U(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),
// ALIASES
      J("millisecond","ms"),
// PRIORITY
      M("millisecond",16),
// PARSING
      Z("S",Rd,Jd),Z("SS",Rd,Kd),Z("SSS",Rd,Ld);var Ve;for(Ve="SSSS";Ve.length<=9;Ve+="S")Z(Ve,Ud);for(Ve="S";Ve.length<=9;Ve+="S")ba(Ve,Ic);
// MOMENTS
    var We=O("Milliseconds",!1);
// FORMATTING
    U("z",0,0,"zoneAbbr"),U("zz",0,0,"zoneName");var Xe=r.prototype;Xe.add=Pe,Xe.calendar=Vb,Xe.clone=Wb,Xe.diff=bc,Xe.endOf=oc,Xe.format=gc,Xe.from=hc,Xe.fromNow=ic,Xe.to=jc,Xe.toNow=kc,Xe.get=R,Xe.invalidAt=xc,Xe.isAfter=Xb,Xe.isBefore=Yb,Xe.isBetween=Zb,Xe.isSame=$b,Xe.isSameOrAfter=_b,Xe.isSameOrBefore=ac,Xe.isValid=vc,Xe.lang=Re,Xe.locale=lc,Xe.localeData=mc,Xe.max=Ke,Xe.min=Je,Xe.parsingFlags=wc,Xe.set=S,Xe.startOf=nc,Xe.subtract=Qe,Xe.toArray=sc,Xe.toObject=tc,Xe.toDate=rc,Xe.toISOString=ec,Xe.inspect=fc,Xe.toJSON=uc,Xe.toString=dc,Xe.unix=qc,Xe.valueOf=pc,Xe.creationData=yc,
// Year
      Xe.year=pe,Xe.isLeapYear=ra,
// Week Year
      Xe.weekYear=Ac,Xe.isoWeekYear=Bc,
// Quarter
      Xe.quarter=Xe.quarters=Gc,
// Month
      Xe.month=ka,Xe.daysInMonth=la,
// Week
      Xe.week=Xe.weeks=Ba,Xe.isoWeek=Xe.isoWeeks=Ca,Xe.weeksInYear=Dc,Xe.isoWeeksInYear=Cc,
// Day
      Xe.date=Se,Xe.day=Xe.days=Ka,Xe.weekday=La,Xe.isoWeekday=Ma,Xe.dayOfYear=Hc,
// Hour
      Xe.hour=Xe.hours=ze,
// Minute
      Xe.minute=Xe.minutes=Te,
// Second
      Xe.second=Xe.seconds=Ue,
// Millisecond
      Xe.millisecond=Xe.milliseconds=We,
// Offset
      Xe.utcOffset=Db,Xe.utc=Fb,Xe.local=Gb,Xe.parseZone=Hb,Xe.hasAlignedHourOffset=Ib,Xe.isDST=Jb,Xe.isLocal=Lb,Xe.isUtcOffset=Mb,Xe.isUtc=Nb,Xe.isUTC=Nb,
// Timezone
      Xe.zoneAbbr=Jc,Xe.zoneName=Kc,
// Deprecations
      Xe.dates=x("dates accessor is deprecated. Use date instead.",Se),Xe.months=x("months accessor is deprecated. Use month instead",ka),Xe.years=x("years accessor is deprecated. Use year instead",pe),Xe.zone=x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",Eb),Xe.isDSTShifted=x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",Kb);var Ye=C.prototype;Ye.calendar=D,Ye.longDateFormat=E,Ye.invalidDate=F,Ye.ordinal=G,Ye.preparse=Nc,Ye.postformat=Nc,Ye.relativeTime=H,Ye.pastFuture=I,Ye.set=A,
// Month
      Ye.months=fa,Ye.monthsShort=ga,Ye.monthsParse=ia,Ye.monthsRegex=na,Ye.monthsShortRegex=ma,
// Week
      Ye.week=ya,Ye.firstDayOfYear=Aa,Ye.firstDayOfWeek=za,
// Day of Week
      Ye.weekdays=Fa,Ye.weekdaysMin=Ha,Ye.weekdaysShort=Ga,Ye.weekdaysParse=Ja,Ye.weekdaysRegex=Na,Ye.weekdaysShortRegex=Oa,Ye.weekdaysMinRegex=Pa,
// Hours
      Ye.isPM=Va,Ye.meridiem=Wa,$a("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===u(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),
// Side effect imports
      a.lang=x("moment.lang is deprecated. Use moment.locale instead.",$a),a.langData=x("moment.langData is deprecated. Use moment.localeData instead.",bb);var Ze=Math.abs,$e=ed("ms"),_e=ed("s"),af=ed("m"),bf=ed("h"),cf=ed("d"),df=ed("w"),ef=ed("M"),ff=ed("y"),gf=gd("milliseconds"),hf=gd("seconds"),jf=gd("minutes"),kf=gd("hours"),lf=gd("days"),mf=gd("months"),nf=gd("years"),of=Math.round,pf={s:45,// seconds to minute
        m:45,// minutes to hour
        h:22,// hours to day
        d:26,// days to month
        M:11},qf=Math.abs,rf=wb.prototype;
// Deprecations
// Side effect imports
// FORMATTING
// PARSING
// Side effect imports
    return rf.abs=Wc,rf.add=Yc,rf.subtract=Zc,rf.as=cd,rf.asMilliseconds=$e,rf.asSeconds=_e,rf.asMinutes=af,rf.asHours=bf,rf.asDays=cf,rf.asWeeks=df,rf.asMonths=ef,rf.asYears=ff,rf.valueOf=dd,rf._bubble=_c,rf.get=fd,rf.milliseconds=gf,rf.seconds=hf,rf.minutes=jf,rf.hours=kf,rf.days=lf,rf.weeks=hd,rf.months=mf,rf.years=nf,rf.humanize=md,rf.toISOString=nd,rf.toString=nd,rf.toJSON=nd,rf.locale=lc,rf.localeData=mc,rf.toIsoString=x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",nd),rf.lang=Re,U("X",0,0,"unix"),U("x",0,0,"valueOf"),Z("x",Vd),Z("X",Yd),ba("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),ba("x",function(a,b,c){c._d=new Date(u(a))}),a.version="2.17.1",b(sb),a.fn=Xe,a.min=ub,a.max=vb,a.now=Le,a.utc=k,a.unix=Lc,a.months=Rc,a.isDate=g,a.locale=$a,a.invalid=o,a.duration=Ob,a.isMoment=s,a.weekdays=Tc,a.parseZone=Mc,a.localeData=bb,a.isDuration=xb,a.monthsShort=Sc,a.weekdaysMin=Vc,a.defineLocale=_a,a.updateLocale=ab,a.locales=cb,a.weekdaysShort=Uc,a.normalizeUnits=K,a.relativeTimeRounding=kd,a.relativeTimeThreshold=ld,a.calendarFormat=Ub,a.prototype=Xe,a});
/*!
 * gulp-boilerplate v4.2.3: My Gulp.js boilerplate for creating new web projects
 * (c) 2017 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/Plugin
 */

/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */

(function (root, factory)
{
    'use strict';

    var moment;
    if (typeof exports === 'object') {
        // CommonJS module
        // Load moment.js as an optional dependency
        try { moment = require('moment'); } catch (e) {}
        module.exports = factory(moment);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function (req)
        {
            // Load moment.js as an optional dependency
            var id = 'moment';
            try { moment = req(id); } catch (e) {}
            return factory(moment);
        });
    } else {
        root.Pikaday = factory(root.moment);
    }
}(this, function (moment)
{
    'use strict';

    /**
     * feature detection and helper functions
     */
    var hasMoment = typeof moment === 'function',

      hasEventListeners = !!window.addEventListener,

      document = window.document,

      sto = window.setTimeout,

      addEvent = function(el, e, callback, capture)
      {
          if (hasEventListeners) {
              el.addEventListener(e, callback, !!capture);
          } else {
              el.attachEvent('on' + e, callback);
          }
      },

      removeEvent = function(el, e, callback, capture)
      {
          if (hasEventListeners) {
              el.removeEventListener(e, callback, !!capture);
          } else {
              el.detachEvent('on' + e, callback);
          }
      },

      fireEvent = function(el, eventName, data)
      {
          var ev;

          if (document.createEvent) {
              ev = document.createEvent('HTMLEvents');
              ev.initEvent(eventName, true, false);
              ev = extend(ev, data);
              el.dispatchEvent(ev);
          } else if (document.createEventObject) {
              ev = document.createEventObject();
              ev = extend(ev, data);
              el.fireEvent('on' + eventName, ev);
          }
      },

      trim = function(str)
      {
          return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
      },

      hasClass = function(el, cn)
      {
          return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
      },

      addClass = function(el, cn)
      {
          if (!hasClass(el, cn)) {
              el.className = (el.className === '') ? cn : el.className + ' ' + cn;
          }
      },

      removeClass = function(el, cn)
      {
          el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
      },

      isArray = function(obj)
      {
          return (/Array/).test(Object.prototype.toString.call(obj));
      },

      isDate = function(obj)
      {
          return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
      },

      isWeekend = function(date)
      {
          var day = date.getDay();
          return day === 0 || day === 6;
      },

      isLeapYear = function(year)
      {
          // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
          return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      },

      getDaysInMonth = function(year, month)
      {
          return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      },

      setToStartOfDay = function(date)
      {
          if (isDate(date)) date.setHours(0,0,0,0);
      },

      compareDates = function(a,b)
      {
          // weak date comparison (use setToStartOfDay(date) to ensure correct result)
          return a.getTime() === b.getTime();
      },

      extend = function(to, from, overwrite)
      {
          var prop, hasProp;
          for (prop in from) {
              hasProp = to[prop] !== undefined;
              if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                  if (isDate(from[prop])) {
                      if (overwrite) {
                          to[prop] = new Date(from[prop].getTime());
                      }
                  }
                  else if (isArray(from[prop])) {
                      if (overwrite) {
                          to[prop] = from[prop].slice(0);
                      }
                  } else {
                      to[prop] = extend({}, from[prop], overwrite);
                  }
              } else if (overwrite || !hasProp) {
                  to[prop] = from[prop];
              }
          }
          return to;
      },

      adjustCalendar = function(calendar) {
          if (calendar.month < 0) {
              calendar.year -= Math.ceil(Math.abs(calendar.month)/12);
              calendar.month += 12;
          }
          if (calendar.month > 11) {
              calendar.year += Math.floor(Math.abs(calendar.month)/12);
              calendar.month -= 12;
          }
          return calendar;
      },

      /**
       * defaults and localisation
       */
      defaults = {

          // bind the picker to a form field
          field: null,

          // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
          bound: undefined,

          // position of the datepicker, relative to the field (default to bottom & left)
          // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
          position: 'bottom left',

          // automatically fit in the viewport even if it means repositioning from the position option
          reposition: true,

          // the default output format for `.toString()` and `field` value
          format: 'YYYY-MM-DD',

          // the initial date to view when first opened
          defaultDate: null,

          // make the `defaultDate` the initial selected value
          setDefaultDate: false,

          // first day of week (0: Sunday, 1: Monday etc)
          firstDay: 0,

          // the default flag for moment's strict date parsing
          formatStrict: false,

          // the minimum/earliest date that can be selected
          minDate: null,
          // the maximum/latest date that can be selected
          maxDate: null,

          // number of years either side, or array of upper/lower range
          yearRange: 10,

          // show week numbers at head of row
          showWeekNumber: false,

          // used internally (don't config outside)
          minYear: 0,
          maxYear: 9999,
          minMonth: undefined,
          maxMonth: undefined,

          startRange: null,
          endRange: null,

          isRTL: false,

          // Additional text to append to the year in the calendar title
          yearSuffix: '',

          // Render the month after year in the calendar title
          showMonthAfterYear: false,

          // Render days of the calendar grid that fall in the next or previous month
          showDaysInNextAndPreviousMonths: false,

          // how many months are visible
          numberOfMonths: 1,

          // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
          // only used for the first display or when a selected date is not visible
          mainCalendar: 'left',

          // Specify a DOM element to render the calendar in
          container: undefined,

          // Blur field when date is selected
          blurFieldOnSelect : true,

          // internationalization
          i18n: {
              previousMonth : 'Previous Month',
              nextMonth     : 'Next Month',
              months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
              weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
              weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
          },

          // Theme Classname
          theme: null,

          // events array
          events: [],

          // callback function
          onSelect: null,
          onOpen: null,
          onClose: null,
          onDraw: null
      },


      /**
       * templating functions to abstract HTML rendering
       */
      renderDayName = function(opts, day, abbr)
      {
          day += opts.firstDay;
          while (day >= 7) {
              day -= 7;
          }
          return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
      },

      renderDay = function(opts)
      {
          var arr = [];
          var ariaSelected = 'false';
          if (opts.isEmpty) {
              if (opts.showDaysInNextAndPreviousMonths) {
                  arr.push('is-outside-current-month');
              } else {
                  return '<td class="is-empty"></td>';
              }
          }
          if (opts.isDisabled) {
              arr.push('is-disabled');
          }
          if (opts.isToday) {
              arr.push('is-today');
          }
          if (opts.isSelected) {
              arr.push('is-selected');
              ariaSelected = 'true';
          }
          if (opts.hasEvent) {
              arr.push('has-event');
          }
          if (opts.isInRange) {
              arr.push('is-inrange');
          }
          if (opts.isStartRange) {
              arr.push('is-startrange');
          }
          if (opts.isEndRange) {
              arr.push('is-endrange');
          }
          return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' +
            '<button class="pika-button pika-day" type="button" ' +
            'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' +
            opts.day +
            '</button>' +
            '</td>';
      },

      renderWeek = function (d, m, y) {
          // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
          var onejan = new Date(y, 0, 1),
            weekNum = Math.ceil((((new Date(y, m, d) - onejan) / 86400000) + onejan.getDay()+1)/7);
          return '<td class="pika-week">' + weekNum + '</td>';
      },

      renderRow = function(days, isRTL)
      {
          return '<tr>' + (isRTL ? days.reverse() : days).join('') + '</tr>';
      },

      renderBody = function(rows)
      {
          return '<tbody>' + rows.join('') + '</tbody>';
      },

      renderHead = function(opts)
      {
          var i, arr = [];
          if (opts.showWeekNumber) {
              arr.push('<th></th>');
          }
          for (i = 0; i < 7; i++) {
              arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
          }
          return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
      },

      renderTitle = function(instance, c, year, month, refYear, randId)
      {
          var i, j, arr,
            opts = instance._o,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
            monthHtml,
            yearHtml,
            prev = true,
            next = true;

          for (arr = [], i = 0; i < 12; i++) {
              arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
                (i === month ? ' selected="selected"': '') +
                ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled="disabled"' : '') + '>' +
                opts.i18n.months[i] + '</option>');
          }

          monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

          if (isArray(opts.yearRange)) {
              i = opts.yearRange[0];
              j = opts.yearRange[1] + 1;
          } else {
              i = year - opts.yearRange;
              j = 1 + year + opts.yearRange;
          }

          for (arr = []; i < j && i <= opts.maxYear; i++) {
              if (i >= opts.minYear) {
                  arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"': '') + '>' + (i) + '</option>');
              }
          }
          yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

          if (opts.showMonthAfterYear) {
              html += yearHtml + monthHtml;
          } else {
              html += monthHtml + yearHtml;
          }

          if (isMinYear && (month === 0 || opts.minMonth >= month)) {
              prev = false;
          }

          if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
              next = false;
          }

          if (c === 0) {
              html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
          }
          if (c === (instance._o.numberOfMonths - 1) ) {
              html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
          }

          return html += '</div>';
      },

      renderTable = function(opts, data, randId)
      {
          return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
      },


      /**
       * Pikaday constructor
       */
      Pikaday = function(options)
      {
          var self = this,
            opts = self.config(options);

          self._onMouseDown = function(e)
          {
              if (!self._v) {
                  return;
              }
              e = e || window.event;
              var target = e.target || e.srcElement;
              if (!target) {
                  return;
              }

              if (!hasClass(target, 'is-disabled')) {
                  if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
                      self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                      if (opts.bound) {
                          sto(function() {
                              self.hide();
                              if (opts.blurFieldOnSelect && opts.field) {
                                  opts.field.blur();
                              }
                          }, 100);
                      }
                  }
                  else if (hasClass(target, 'pika-prev')) {
                      self.prevMonth();
                  }
                  else if (hasClass(target, 'pika-next')) {
                      self.nextMonth();
                  }
              }
              if (!hasClass(target, 'pika-select')) {
                  // if this is touch event prevent mouse events emulation
                  if (e.preventDefault) {
                      e.preventDefault();
                  } else {
                      e.returnValue = false;
                      return false;
                  }
              } else {
                  self._c = true;
              }
          };

          self._onChange = function(e)
          {
              e = e || window.event;
              var target = e.target || e.srcElement;
              if (!target) {
                  return;
              }
              if (hasClass(target, 'pika-select-month')) {
                  self.gotoMonth(target.value);
              }
              else if (hasClass(target, 'pika-select-year')) {
                  self.gotoYear(target.value);
              }
          };

          self._onKeyChange = function(e)
          {
              e = e || window.event;

              if (self.isVisible()) {

                  switch(e.keyCode){
                      case 13:
                      case 27:
                          if (opts.field) {
                              opts.field.blur();
                          }
                          break;
                      case 37:
                          e.preventDefault();
                          self.adjustDate('subtract', 1);
                          break;
                      case 38:
                          self.adjustDate('subtract', 7);
                          break;
                      case 39:
                          self.adjustDate('add', 1);
                          break;
                      case 40:
                          self.adjustDate('add', 7);
                          break;
                  }
              }
          };

          self._onInputChange = function(e)
          {
              var date;

              if (e.firedBy === self) {
                  return;
              }
              if (hasMoment) {
                  date = moment(opts.field.value, opts.format, opts.formatStrict);
                  date = (date && date.isValid()) ? date.toDate() : null;
              }
              else {
                  date = new Date(Date.parse(opts.field.value));
              }
              if (isDate(date)) {
                  self.setDate(date);
              }
              if (!self._v) {
                  self.show();
              }
          };

          self._onInputFocus = function()
          {
              self.show();
          };

          self._onInputClick = function()
          {
              self.show();
          };

          self._onInputBlur = function()
          {
              // IE allows pika div to gain focus; catch blur the input field
              var pEl = document.activeElement;
              do {
                  if (hasClass(pEl, 'pika-single')) {
                      return;
                  }
              }
              while ((pEl = pEl.parentNode));

              if (!self._c) {
                  self._b = sto(function() {
                      self.hide();
                  }, 50);
              }
              self._c = false;
          };

          self._onClick = function(e)
          {
              e = e || window.event;
              var target = e.target || e.srcElement,
                pEl = target;
              if (!target) {
                  return;
              }
              if (!hasEventListeners && hasClass(target, 'pika-select')) {
                  if (!target.onchange) {
                      target.setAttribute('onchange', 'return;');
                      addEvent(target, 'change', self._onChange);
                  }
              }
              do {
                  if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
                      return;
                  }
              }
              while ((pEl = pEl.parentNode));
              if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
                  self.hide();
              }
          };

          self.el = document.createElement('div');
          self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

          addEvent(self.el, 'mousedown', self._onMouseDown, true);
          addEvent(self.el, 'touchend', self._onMouseDown, true);
          addEvent(self.el, 'change', self._onChange);
          addEvent(document, 'keydown', self._onKeyChange);

          if (opts.field) {
              if (opts.container) {
                  opts.container.appendChild(self.el);
              } else if (opts.bound) {
                  document.body.appendChild(self.el);
              } else {
                  opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
              }
              addEvent(opts.field, 'change', self._onInputChange);

              if (!opts.defaultDate) {
                  if (hasMoment && opts.field.value) {
                      opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                  } else {
                      opts.defaultDate = new Date(Date.parse(opts.field.value));
                  }
                  opts.setDefaultDate = true;
              }
          }

          var defDate = opts.defaultDate;

          if (isDate(defDate)) {
              if (opts.setDefaultDate) {
                  self.setDate(defDate, true);
              } else {
                  self.gotoDate(defDate);
              }
          } else {
              self.gotoDate(new Date());
          }

          if (opts.bound) {
              this.hide();
              self.el.className += ' is-bound';
              addEvent(opts.trigger, 'click', self._onInputClick);
              addEvent(opts.trigger, 'focus', self._onInputFocus);
              addEvent(opts.trigger, 'blur', self._onInputBlur);
          } else {
              this.show();
          }
      };


    /**
     * public Pikaday API
     */
    Pikaday.prototype = {


        /**
         * configure functionality
         */
        config: function(options)
        {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }

            var opts = extend(this._o, options, true);

            opts.isRTL = !!opts.isRTL;

            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

            opts.theme = (typeof opts.theme) === 'string' && opts.theme ? opts.theme : null;

            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

            opts.disableWeekends = !!opts.disableWeekends;

            opts.disableDayFn = (typeof opts.disableDayFn) === 'function' ? opts.disableDayFn : null;

            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;

            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                this.setMinDate(opts.minDate);
            }
            if (opts.maxDate) {
                this.setMaxDate(opts.maxDate);
            }

            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }

            return opts;
        },

        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function(format)
        {
            return !isDate(this._d) ? '' : hasMoment ? moment(this._d).format(format || this._o.format) : this._d.toDateString();
        },

        /**
         * return a Moment.js object of the current selection (if available)
         */
        getMoment: function()
        {
            return hasMoment ? moment(this._d) : null;
        },

        /**
         * set the current selection from a Moment.js object (if available)
         */
        setMoment: function(date, preventOnSelect)
        {
            if (hasMoment && moment.isMoment(date)) {
                this.setDate(date.toDate(), preventOnSelect);
            }
        },

        /**
         * return a Date object of the current selection
         */
        getDate: function()
        {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },

        /**
         * set the current selection
         */
        setDate: function(date, preventOnSelect)
        {
            if (!date) {
                this._d = null;

                if (this._o.field) {
                    this._o.field.value = '';
                    fireEvent(this._o.field, 'change', { firedBy: this });
                }

                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }

            var min = this._o.minDate,
              max = this._o.maxDate;

            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }

            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', { firedBy: this });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },

        /**
         * change view to a specific date
         */
        gotoDate: function(date)
        {
            var newCalendar = true;

            if (!isDate(date)) {
                return;
            }

            if (this.calendars) {
                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                  lastVisibleDate = new Date(this.calendars[this.calendars.length-1].year, this.calendars[this.calendars.length-1].month, 1),
                  visibleDate = date.getTime();
                // get the end of the month
                lastVisibleDate.setMonth(lastVisibleDate.getMonth()+1);
                lastVisibleDate.setDate(lastVisibleDate.getDate()-1);
                newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
            }

            if (newCalendar) {
                this.calendars = [{
                    month: date.getMonth(),
                    year: date.getFullYear()
                }];
                if (this._o.mainCalendar === 'right') {
                    this.calendars[0].month += 1 - this._o.numberOfMonths;
                }
            }

            this.adjustCalendars();
        },

        adjustDate: function(sign, days) {

            var day = this.getDate() || new Date();
            var difference = parseInt(days)*24*60*60*1000;

            var newDay;

            if (sign === 'add') {
                newDay = new Date(day.valueOf() + difference);
            } else if (sign === 'subtract') {
                newDay = new Date(day.valueOf() - difference);
            }

            if (hasMoment) {
                if (sign === 'add') {
                    newDay = moment(day).add(days, "days").toDate();
                } else if (sign === 'subtract') {
                    newDay = moment(day).subtract(days, "days").toDate();
                }
            }

            this.setDate(newDay);
        },

        adjustCalendars: function() {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) {
                this.calendars[c] = adjustCalendar({
                    month: this.calendars[0].month + c,
                    year: this.calendars[0].year
                });
            }
            this.draw();
        },

        gotoToday: function()
        {
            this.gotoDate(new Date());
        },

        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function(month)
        {
            if (!isNaN(month)) {
                this.calendars[0].month = parseInt(month, 10);
                this.adjustCalendars();
            }
        },

        nextMonth: function()
        {
            this.calendars[0].month++;
            this.adjustCalendars();
        },

        prevMonth: function()
        {
            this.calendars[0].month--;
            this.adjustCalendars();
        },

        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function(year)
        {
            if (!isNaN(year)) {
                this.calendars[0].year = parseInt(year, 10);
                this.adjustCalendars();
            }
        },

        /**
         * change the minDate
         */
        setMinDate: function(value)
        {
            if(value instanceof Date) {
                setToStartOfDay(value);
                this._o.minDate = value;
                this._o.minYear  = value.getFullYear();
                this._o.minMonth = value.getMonth();
            } else {
                this._o.minDate = defaults.minDate;
                this._o.minYear  = defaults.minYear;
                this._o.minMonth = defaults.minMonth;
                this._o.startRange = defaults.startRange;
            }

            this.draw();
        },

        /**
         * change the maxDate
         */
        setMaxDate: function(value)
        {
            if(value instanceof Date) {
                setToStartOfDay(value);
                this._o.maxDate = value;
                this._o.maxYear = value.getFullYear();
                this._o.maxMonth = value.getMonth();
            } else {
                this._o.maxDate = defaults.maxDate;
                this._o.maxYear = defaults.maxYear;
                this._o.maxMonth = defaults.maxMonth;
                this._o.endRange = defaults.endRange;
            }

            this.draw();
        },

        setStartRange: function(value)
        {
            this._o.startRange = value;
        },

        setEndRange: function(value)
        {
            this._o.endRange = value;
        },

        /**
         * refresh the HTML
         */
        draw: function(force)
        {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
              minYear = opts.minYear,
              maxYear = opts.maxYear,
              minMonth = opts.minMonth,
              maxMonth = opts.maxMonth,
              html = '',
              randId;

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }

            randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

            for (var c = 0; c < opts.numberOfMonths; c++) {
                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
            }

            this.el.innerHTML = html;

            if (opts.bound) {
                if(opts.field.type !== 'hidden') {
                    sto(function() {
                        opts.trigger.focus();
                    }, 1);
                }
            }

            if (typeof this._o.onDraw === 'function') {
                this._o.onDraw(this);
            }

            if (opts.bound) {
                // let the screen reader user know to use arrow keys
                opts.field.setAttribute('aria-label', 'Use the arrow keys to pick a date');
            }
        },

        adjustPosition: function()
        {
            var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;

            if (this._o.container) return;

            this.el.style.position = 'absolute';

            field = this._o.trigger;
            pEl = field;
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
            viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top  = pEl.offsetTop + pEl.offsetHeight;
                while((pEl = pEl.offsetParent)) {
                    left += pEl.offsetLeft;
                    top  += pEl.offsetTop;
                }
            }

            // default position is bottom & left
            if ((this._o.reposition && left + width > viewportWidth) ||
              (
                this._o.position.indexOf('right') > -1 &&
                left - width + field.offsetWidth > 0
              )
            ) {
                left = left - width + field.offsetWidth;
            }
            if ((this._o.reposition && top + height > viewportHeight + scrollTop) ||
              (
                this._o.position.indexOf('top') > -1 &&
                top - height - field.offsetHeight > 0
              )
            ) {
                top = top - height - field.offsetHeight;
            }

            this.el.style.left = left + 'px';
            this.el.style.top = top + 'px';
        },

        /**
         * render HTML for a particular month
         */
        render: function(year, month, randId)
        {
            var opts   = this._o,
              now    = new Date(),
              days   = getDaysInMonth(year, month),
              before = new Date(year, month, 1).getDay(),
              data   = [],
              row    = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var previousMonth = month === 0 ? 11 : month - 1,
              nextMonth = month === 11 ? 0 : month + 1,
              yearOfPreviousMonth = month === 0 ? year - 1 : year,
              yearOfNextMonth = month === 11 ? year + 1 : year,
              daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
            var cells = days + before,
              after = cells;
            while(after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            for (var i = 0, r = 0; i < cells; i++)
            {
                var day = new Date(year, month, 1 + (i - before)),
                  isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                  isToday = compareDates(day, now),
                  hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
                  isEmpty = i < before || i >= (days + before),
                  dayNumber = 1 + (i - before),
                  monthNumber = month,
                  yearNumber = year,
                  isStartRange = opts.startRange && compareDates(opts.startRange, day),
                  isEndRange = opts.endRange && compareDates(opts.endRange, day),
                  isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
                  isDisabled = (opts.minDate && day < opts.minDate) ||
                    (opts.maxDate && day > opts.maxDate) ||
                    (opts.disableWeekends && isWeekend(day)) ||
                    (opts.disableDayFn && opts.disableDayFn(day));

                if (isEmpty) {
                    if (i < before) {
                        dayNumber = daysInPreviousMonth + dayNumber;
                        monthNumber = previousMonth;
                        yearNumber = yearOfPreviousMonth;
                    } else {
                        dayNumber = dayNumber - days;
                        monthNumber = nextMonth;
                        yearNumber = yearOfNextMonth;
                    }
                }

                var dayConfig = {
                    day: dayNumber,
                    month: monthNumber,
                    year: yearNumber,
                    hasEvent: hasEvent,
                    isSelected: isSelected,
                    isToday: isToday,
                    isDisabled: isDisabled,
                    isEmpty: isEmpty,
                    isStartRange: isStartRange,
                    isEndRange: isEndRange,
                    isInRange: isInRange,
                    showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
                };

                row.push(renderDay(dayConfig));

                if (++r === 7) {
                    if (opts.showWeekNumber) {
                        row.unshift(renderWeek(i - before, month, year));
                    }
                    data.push(renderRow(row, opts.isRTL));
                    row = [];
                    r = 0;
                }
            }
            return renderTable(opts, data, randId);
        },

        isVisible: function()
        {
            return this._v;
        },

        show: function()
        {
            if (!this.isVisible()) {
                this._v = true;
                this.draw();
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                    this.adjustPosition();
                }
                removeClass(this.el, 'is-hidden');
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },

        hide: function()
        {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.position = 'static'; // reset
                this.el.style.left = 'auto';
                this.el.style.top = 'auto';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },

        /**
         * GAME OVER
         */
        destroy: function()
        {
            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'touchend', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (this._o.field) {
                removeEvent(this._o.field, 'change', this._onInputChange);
                if (this._o.bound) {
                    removeEvent(this._o.trigger, 'click', this._onInputClick);
                    removeEvent(this._o.trigger, 'focus', this._onInputFocus);
                    removeEvent(this._o.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }

    };

    return Pikaday;

}));

/*
 * International Telephone Input v11.0.0
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],function(b){a(b,window,document)}):"object"==typeof module&&module.exports?module.exports=a(require("jquery"),window,document):a(jQuery,window,document)}(function(a,b,c,d){"use strict";function e(b,c){this.a=a(b),this.b=a.extend({},h,c),this.ns="."+f+g++,this.d=Boolean(b.setSelectionRange),this.e=Boolean(a(b).attr("placeholder"))}var f="intlTelInput",g=1,h={allowDropdown:!0,autoHideDialCode:!0,autoPlaceholder:"polite",customPlaceholder:null,dropdownContainer:"",excludeCountries:[],formatOnDisplay:!0,geoIpLookup:null,initialCountry:"",nationalMode:!0,onlyCountries:[],placeholderNumberType:"MOBILE",preferredCountries:["us","gb"],separateDialCode:!1,utilsScript:""},i={b:38,c:40,d:13,e:27,f:43,A:65,Z:90,j:32,k:9},j=["800","822","833","844","855","866","877","880","881","882","883","884","885","886","887","888","889"];a(b).on("load",function(){a.fn[f].windowLoaded=!0}),e.prototype={_a:function(){return this.b.nationalMode&&(this.b.autoHideDialCode=!1),this.b.separateDialCode&&(this.b.autoHideDialCode=this.b.nationalMode=!1),this.g=/Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),this.g&&(a("body").addClass("iti-mobile"),this.b.dropdownContainer||(this.b.dropdownContainer="body")),this.h=new a.Deferred,this.i=new a.Deferred,this._b(),this._f(),this._h(),this._i(),this._i2(),[this.h,this.i]},_b:function(){this._d(),this._d2(),this._e()},_c:function(a,b,c){b in this.q||(this.q[b]=[]);var d=c||0;this.q[b][d]=a},_c2:function(b,c){var d;for(d=0;d<b.length;d++)b[d]=b[d].toLowerCase();for(this.p=[],d=0;d<k.length;d++)c(a.inArray(k[d].iso2,b))&&this.p.push(k[d])},_d:function(){this.b.onlyCountries.length?this._c2(this.b.onlyCountries,function(a){return a>-1}):this.b.excludeCountries.length?this._c2(this.b.excludeCountries,function(a){return a==-1}):this.p=k},_d2:function(){this.q={};for(var a=0;a<this.p.length;a++){var b=this.p[a];if(this._c(b.iso2,b.dialCode,b.priority),b.areaCodes)for(var c=0;c<b.areaCodes.length;c++)this._c(b.iso2,b.dialCode+b.areaCodes[c])}},_e:function(){this.preferredCountries=[];for(var a=0;a<this.b.preferredCountries.length;a++){var b=this.b.preferredCountries[a].toLowerCase(),c=this._y(b,!1,!0);c&&this.preferredCountries.push(c)}},_f:function(){this.a.attr("autocomplete","off");var b="intl-tel-input";this.b.allowDropdown&&(b+=" allow-dropdown"),this.b.separateDialCode&&(b+=" separate-dial-code"),this.a.wrap(a("<div>",{"class":b})),this.k=a("<div>",{"class":"flag-container"}).insertBefore(this.a);var c=a("<div>",{"class":"selected-flag"});c.appendTo(this.k),this.l=a("<div>",{"class":"iti-flag"}).appendTo(c),this.b.separateDialCode&&(this.t=a("<div>",{"class":"selected-dial-code"}).appendTo(c)),this.b.allowDropdown?(c.attr("tabindex","0"),a("<div>",{"class":"iti-arrow"}).appendTo(c),this.m=a("<ul>",{"class":"country-list hide"}),this.preferredCountries.length&&(this._g(this.preferredCountries,"preferred"),a("<li>",{"class":"divider"}).appendTo(this.m)),this._g(this.p,""),this.o=this.m.children(".country"),this.b.dropdownContainer?this.dropdown=a("<div>",{"class":"intl-tel-input iti-container"}).append(this.m):this.m.appendTo(this.k)):this.o=a()},_g:function(a,b){for(var c="",d=0;d<a.length;d++){var e=a[d];c+="<li class='country "+b+"' data-dial-code='"+e.dialCode+"' data-country-code='"+e.iso2+"'>",c+="<div class='flag-box'><div class='iti-flag "+e.iso2+"'></div></div>",c+="<span class='country-name'>"+e.name+"</span>",c+="<span class='dial-code'>+"+e.dialCode+"</span>",c+="</li>"}this.m.append(c)},_h:function(){var a=this.a.val();this._af(a)&&!this._isRegionlessNanp(a)?this._v(a):"auto"!==this.b.initialCountry&&(this.b.initialCountry?this._z(this.b.initialCountry.toLowerCase()):(this.j=this.preferredCountries.length?this.preferredCountries[0].iso2:this.p[0].iso2,a||this._z(this.j)),a||this.b.nationalMode||this.b.autoHideDialCode||this.b.separateDialCode||this.a.val("+"+this.s.dialCode)),a&&this._u(a)},_i:function(){this._j(),this.b.autoHideDialCode&&this._l(),this.b.allowDropdown&&this._i1()},_i1:function(){var a=this,b=this.a.closest("label");b.length&&b.on("click"+this.ns,function(b){a.m.hasClass("hide")?a.a.focus():b.preventDefault()});var c=this.l.parent();c.on("click"+this.ns,function(b){!a.m.hasClass("hide")||a.a.prop("disabled")||a.a.prop("readonly")||a._n()}),this.k.on("keydown"+a.ns,function(b){var c=a.m.hasClass("hide");!c||b.which!=i.b&&b.which!=i.c&&b.which!=i.j&&b.which!=i.d||(b.preventDefault(),b.stopPropagation(),a._n()),b.which==i.k&&a._ac()})},_i2:function(){var c=this;this.b.utilsScript?a.fn[f].windowLoaded?a.fn[f].loadUtils(this.b.utilsScript,this.i):a(b).on("load",function(){a.fn[f].loadUtils(c.b.utilsScript,c.i)}):this.i.resolve(),"auto"===this.b.initialCountry?this._i3():this.h.resolve()},_i3:function(){a.fn[f].autoCountry?this.handleAutoCountry():a.fn[f].startedLoadingAutoCountry||(a.fn[f].startedLoadingAutoCountry=!0,"function"==typeof this.b.geoIpLookup&&this.b.geoIpLookup(function(b){a.fn[f].autoCountry=b.toLowerCase(),setTimeout(function(){a(".intl-tel-input input").intlTelInput("handleAutoCountry")})}))},_j:function(){var a=this;this.a.on("keyup"+this.ns,function(){a._v(a.a.val())&&a._triggerCountryChange()}),this.a.on("cut"+this.ns+" paste"+this.ns,function(){setTimeout(function(){a._v(a.a.val())&&a._triggerCountryChange()})})},_j2:function(a){var b=this.a.attr("maxlength");return b&&a.length>b?a.substr(0,b):a},_l:function(){var b=this;this.a.on("mousedown"+this.ns,function(a){b.a.is(":focus")||b.a.val()||(a.preventDefault(),b.a.focus())}),this.a.on("focus"+this.ns,function(a){b.a.val()||b.a.prop("readonly")||!b.s.dialCode||(b.a.val("+"+b.s.dialCode),b.a.one("keypress.plus"+b.ns,function(a){a.which==i.f&&b.a.val("")}),setTimeout(function(){var a=b.a[0];if(b.d){var c=b.a.val().length;a.setSelectionRange(c,c)}}))});var c=this.a.prop("form");c&&a(c).on("submit"+this.ns,function(){b._removeEmptyDialCode()}),this.a.on("blur"+this.ns,function(){b._removeEmptyDialCode()})},_removeEmptyDialCode:function(){var a=this.a.val(),b="+"==a.charAt(0);if(b){var c=this._m(a);c&&this.s.dialCode!=c||this.a.val("")}this.a.off("keypress.plus"+this.ns)},_m:function(a){return a.replace(/\D/g,"")},_n:function(){this._o();var a=this.m.children(".active");a.length&&(this._x(a),this._ad(a)),this._p(),this.l.children(".iti-arrow").addClass("up")},_o:function(){var c=this;if(this.b.dropdownContainer&&this.dropdown.appendTo(this.b.dropdownContainer),this.n=this.m.removeClass("hide").outerHeight(),!this.g){var d=this.a.offset(),e=d.top,f=a(b).scrollTop(),g=e+this.a.outerHeight()+this.n<f+a(b).height(),h=e-this.n>f;if(this.m.toggleClass("dropup",!g&&h),this.b.dropdownContainer){var i=!g&&h?0:this.a.innerHeight();this.dropdown.css({top:e+i,left:d.left}),a(b).on("scroll"+this.ns,function(){c._ac()})}}},_p:function(){var b=this;this.m.on("mouseover"+this.ns,".country",function(c){b._x(a(this))}),this.m.on("click"+this.ns,".country",function(c){b._ab(a(this))});var d=!0;a("html").on("click"+this.ns,function(a){d||b._ac(),d=!1});var e="",f=null;a(c).on("keydown"+this.ns,function(a){a.preventDefault(),a.which==i.b||a.which==i.c?b._q(a.which):a.which==i.d?b._r():a.which==i.e?b._ac():(a.which>=i.A&&a.which<=i.Z||a.which==i.j)&&(f&&clearTimeout(f),e+=String.fromCharCode(a.which),b._s(e),f=setTimeout(function(){e=""},1e3))})},_q:function(a){var b=this.m.children(".highlight").first(),c=a==i.b?b.prev():b.next();c.length&&(c.hasClass("divider")&&(c=a==i.b?c.prev():c.next()),this._x(c),this._ad(c))},_r:function(){var a=this.m.children(".highlight").first();a.length&&this._ab(a)},_s:function(a){for(var b=0;b<this.p.length;b++)if(this._t(this.p[b].name,a)){var c=this.m.children("[data-country-code="+this.p[b].iso2+"]").not(".preferred");this._x(c),this._ad(c,!0);break}},_t:function(a,b){return a.substr(0,b.length).toUpperCase()==b},_u:function(a){if(this.b.formatOnDisplay&&b.intlTelInputUtils&&this.s){var c=this.b.separateDialCode||!this.b.nationalMode&&"+"==a.charAt(0)?intlTelInputUtils.numberFormat.INTERNATIONAL:intlTelInputUtils.numberFormat.NATIONAL;a=intlTelInputUtils.formatNumber(a,this.s.iso2,c)}a=this._ah(a),this.a.val(a)},_v:function(b){b&&this.b.nationalMode&&this.s&&"1"==this.s.dialCode&&"+"!=b.charAt(0)&&("1"!=b.charAt(0)&&(b="1"+b),b="+"+b);var c=this._af(b),d=null,e=this._m(b);if(c){var f=this.q[this._m(c)],g=this.s&&a.inArray(this.s.iso2,f)>-1,h="+1"==c&&e.length>=4,i=this.s&&"1"==this.s.dialCode;if((!i||!this._isRegionlessNanp(e))&&(!g||h))for(var j=0;j<f.length;j++)if(f[j]){d=f[j];break}}else"+"==b.charAt(0)&&e.length?d="":b&&"+"!=b||(d=this.j);return null!==d&&this._z(d)},_isRegionlessNanp:function(b){var c=this._m(b);if("1"==c.charAt(0)){var d=c.substr(1,3);return a.inArray(d,j)>-1}return!1},_x:function(a){this.o.removeClass("highlight"),a.addClass("highlight")},_y:function(a,b,c){for(var d=b?k:this.p,e=0;e<d.length;e++)if(d[e].iso2==a)return d[e];if(c)return null;throw new Error("No country data for '"+a+"'")},_z:function(a){var b=this.s&&this.s.iso2?this.s:{};this.s=a?this._y(a,!1,!1):{},this.s.iso2&&(this.j=this.s.iso2),this.l.attr("class","iti-flag "+a);var c=a?this.s.name+": +"+this.s.dialCode:"Unknown";if(this.l.parent().attr("title",c),this.b.separateDialCode){var d=this.s.dialCode?"+"+this.s.dialCode:"",e=this.a.parent();b.dialCode&&e.removeClass("iti-sdc-"+(b.dialCode.length+1)),d&&e.addClass("iti-sdc-"+d.length),this.t.text(d)}return this._aa(),this.o.removeClass("active"),a&&this.o.find(".iti-flag."+a).first().closest(".country").addClass("active"),b.iso2!==a},_aa:function(){var a="aggressive"===this.b.autoPlaceholder||!this.e&&(this.b.autoPlaceholder===!0||"polite"===this.b.autoPlaceholder);if(b.intlTelInputUtils&&a&&this.s){var c=intlTelInputUtils.numberType[this.b.placeholderNumberType],d=this.s.iso2?intlTelInputUtils.getExampleNumber(this.s.iso2,this.b.nationalMode,c):"";d=this._ah(d),"function"==typeof this.b.customPlaceholder&&(d=this.b.customPlaceholder(d,this.s)),this.a.attr("placeholder",d)}},_ab:function(a){var b=this._z(a.attr("data-country-code"));if(this._ac(),this._ae(a.attr("data-dial-code"),!0),this.a.focus(),this.d){var c=this.a.val().length;this.a[0].setSelectionRange(c,c)}b&&this._triggerCountryChange()},_ac:function(){this.m.addClass("hide"),this.l.children(".iti-arrow").removeClass("up"),a(c).off(this.ns),a("html").off(this.ns),this.m.off(this.ns),this.b.dropdownContainer&&(this.g||a(b).off("scroll"+this.ns),this.dropdown.detach())},_ad:function(a,b){var c=this.m,d=c.height(),e=c.offset().top,f=e+d,g=a.outerHeight(),h=a.offset().top,i=h+g,j=h-e+c.scrollTop(),k=d/2-g/2;if(h<e)b&&(j-=k),c.scrollTop(j);else if(i>f){b&&(j+=k);var l=d-g;c.scrollTop(j-l)}},_ae:function(a,b){var c,d=this.a.val();if(a="+"+a,"+"==d.charAt(0)){var e=this._af(d);c=e?d.replace(e,a):a}else{if(this.b.nationalMode||this.b.separateDialCode)return;if(d)c=a+d;else{if(!b&&this.b.autoHideDialCode)return;c=a}}this.a.val(c)},_af:function(b){var c="";if("+"==b.charAt(0))for(var d="",e=0;e<b.length;e++){var f=b.charAt(e);if(a.isNumeric(f)&&(d+=f,this.q[d]&&(c=b.substr(0,e+1)),4==d.length))break}return c},_ag:function(){var b,c=a.trim(this.a.val()),d=this.s.dialCode,e=this._m(c),f="1"==e.charAt(0)?e:"1"+e;return b=this.b.separateDialCode?"+"+d:"+"!=c.charAt(0)&&"1"!=c.charAt(0)&&d&&"1"==d.charAt(0)&&4==d.length&&d!=f.substr(0,4)?d.substr(1):"",b+c},_ah:function(a){if(this.b.separateDialCode){var b=this._af(a);if(b){null!==this.s.areaCodes&&(b="+"+this.s.dialCode);var c=" "===a[b.length]||"-"===a[b.length]?b.length+1:b.length;a=a.substr(c)}}return this._j2(a)},_triggerCountryChange:function(){this.a.trigger("countrychange",this.s)},handleAutoCountry:function(){"auto"===this.b.initialCountry&&(this.j=a.fn[f].autoCountry,this.a.val()||this.setCountry(this.j),this.h.resolve())},handleUtils:function(){b.intlTelInputUtils&&(this.a.val()&&this._u(this.a.val()),this._aa()),this.i.resolve()},destroy:function(){if(this.allowDropdown&&(this._ac(),this.l.parent().off(this.ns),this.a.closest("label").off(this.ns)),this.b.autoHideDialCode){var b=this.a.prop("form");b&&a(b).off(this.ns)}this.a.off(this.ns);var c=this.a.parent();c.before(this.a).remove()},getExtension:function(){return b.intlTelInputUtils?intlTelInputUtils.getExtension(this._ag(),this.s.iso2):""},getNumber:function(a){return b.intlTelInputUtils?intlTelInputUtils.formatNumber(this._ag(),this.s.iso2,a):""},getNumberType:function(){return b.intlTelInputUtils?intlTelInputUtils.getNumberType(this._ag(),this.s.iso2):-99},getSelectedCountryData:function(){return this.s||{}},getValidationError:function(){return b.intlTelInputUtils?intlTelInputUtils.getValidationError(this._ag(),this.s.iso2):-99},isValidNumber:function(){var c=a.trim(this._ag()),d=this.b.nationalMode?this.s.iso2:"";return b.intlTelInputUtils?intlTelInputUtils.isValidNumber(c,d):null},setCountry:function(a){a=a.toLowerCase(),this.l.hasClass(a)||(this._z(a),this._ae(this.s.dialCode,!1),this._triggerCountryChange())},setNumber:function(a){var b=this._v(a);this._u(a),b&&this._triggerCountryChange()}},a.fn[f]=function(b){var c=arguments;if(b===d||"object"==typeof b){var g=[];return this.each(function(){if(!a.data(this,"plugin_"+f)){var c=new e(this,b),d=c._a();g.push(d[0]),g.push(d[1]),a.data(this,"plugin_"+f,c)}}),a.when.apply(null,g)}if("string"==typeof b&&"_"!==b[0]){var h;return this.each(function(){var d=a.data(this,"plugin_"+f);d instanceof e&&"function"==typeof d[b]&&(h=d[b].apply(d,Array.prototype.slice.call(c,1))),"destroy"===b&&a.data(this,"plugin_"+f,null)}),h!==d?h:this}},a.fn[f].getCountryData=function(){return k},a.fn[f].loadUtils=function(b,c){a.fn[f].loadedUtilsScript?c&&c.resolve():(a.fn[f].loadedUtilsScript=!0,a.ajax({type:"GET",url:b,complete:function(){a(".intl-tel-input input").intlTelInput("handleUtils")},dataType:"script",cache:!0}))},a.fn[f].version="11.0.0",a.fn[f].defaults=h;for(var k=[["Afghanistan (‫افغانستان‬‎)","af","93"],["Albania (Shqipëri)","al","355"],["Algeria (‫الجزائر‬‎)","dz","213"],["American Samoa","as","1684"],["Andorra","ad","376"],["Angola","ao","244"],["Anguilla","ai","1264"],["Antigua and Barbuda","ag","1268"],["Argentina","ar","54"],["Armenia (Հայաստան)","am","374"],["Aruba","aw","297"],["Australia","au","61",0],["Austria (Österreich)","at","43"],["Azerbaijan (Azərbaycan)","az","994"],["Bahamas","bs","1242"],["Bahrain (‫البحرين‬‎)","bh","973"],["Bangladesh (বাংলাদেশ)","bd","880"],["Barbados","bb","1246"],["Belarus (Беларусь)","by","375"],["Belgium (België)","be","32"],["Belize","bz","501"],["Benin (Bénin)","bj","229"],["Bermuda","bm","1441"],["Bhutan (འབྲུག)","bt","975"],["Bolivia","bo","591"],["Bosnia and Herzegovina (Босна и Херцеговина)","ba","387"],["Botswana","bw","267"],["Brazil (Brasil)","br","55"],["British Indian Ocean Territory","io","246"],["British Virgin Islands","vg","1284"],["Brunei","bn","673"],["Bulgaria (България)","bg","359"],["Burkina Faso","bf","226"],["Burundi (Uburundi)","bi","257"],["Cambodia (កម្ពុជា)","kh","855"],["Cameroon (Cameroun)","cm","237"],["Canada","ca","1",1,["204","226","236","249","250","289","306","343","365","387","403","416","418","431","437","438","450","506","514","519","548","579","581","587","604","613","639","647","672","705","709","742","778","780","782","807","819","825","867","873","902","905"]],["Cape Verde (Kabu Verdi)","cv","238"],["Caribbean Netherlands","bq","599",1],["Cayman Islands","ky","1345"],["Central African Republic (République centrafricaine)","cf","236"],["Chad (Tchad)","td","235"],["Chile","cl","56"],["China (中国)","cn","86"],["Christmas Island","cx","61",2],["Cocos (Keeling) Islands","cc","61",1],["Colombia","co","57"],["Comoros (‫جزر القمر‬‎)","km","269"],["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)","cd","243"],["Congo (Republic) (Congo-Brazzaville)","cg","242"],["Cook Islands","ck","682"],["Costa Rica","cr","506"],["Côte d’Ivoire","ci","225"],["Croatia (Hrvatska)","hr","385"],["Cuba","cu","53"],["Curaçao","cw","599",0],["Cyprus (Κύπρος)","cy","357"],["Czech Republic (Česká republika)","cz","420"],["Denmark (Danmark)","dk","45"],["Djibouti","dj","253"],["Dominica","dm","1767"],["Dominican Republic (República Dominicana)","do","1",2,["809","829","849"]],["Ecuador","ec","593"],["Egypt (‫مصر‬‎)","eg","20"],["El Salvador","sv","503"],["Equatorial Guinea (Guinea Ecuatorial)","gq","240"],["Eritrea","er","291"],["Estonia (Eesti)","ee","372"],["Ethiopia","et","251"],["Falkland Islands (Islas Malvinas)","fk","500"],["Faroe Islands (Føroyar)","fo","298"],["Fiji","fj","679"],["Finland (Suomi)","fi","358",0],["France","fr","33"],["French Guiana (Guyane française)","gf","594"],["French Polynesia (Polynésie française)","pf","689"],["Gabon","ga","241"],["Gambia","gm","220"],["Georgia (საქართველო)","ge","995"],["Germany (Deutschland)","de","49"],["Ghana (Gaana)","gh","233"],["Gibraltar","gi","350"],["Greece (Ελλάδα)","gr","30"],["Greenland (Kalaallit Nunaat)","gl","299"],["Grenada","gd","1473"],["Guadeloupe","gp","590",0],["Guam","gu","1671"],["Guatemala","gt","502"],["Guernsey","gg","44",1],["Guinea (Guinée)","gn","224"],["Guinea-Bissau (Guiné Bissau)","gw","245"],["Guyana","gy","592"],["Haiti","ht","509"],["Honduras","hn","504"],["Hong Kong (香港)","hk","852"],["Hungary (Magyarország)","hu","36"],["Iceland (Ísland)","is","354"],["India (भारत)","in","91"],["Indonesia","id","62"],["Iran (‫ایران‬‎)","ir","98"],["Iraq (‫العراق‬‎)","iq","964"],["Ireland","ie","353"],["Isle of Man","im","44",2],["Israel (‫ישראל‬‎)","il","972"],["Italy (Italia)","it","39",0],["Jamaica","jm","1876"],["Japan (日本)","jp","81"],["Jersey","je","44",3],["Jordan (‫الأردن‬‎)","jo","962"],["Kazakhstan (Казахстан)","kz","7",1],["Kenya","ke","254"],["Kiribati","ki","686"],["Kosovo","xk","383"],["Kuwait (‫الكويت‬‎)","kw","965"],["Kyrgyzstan (Кыргызстан)","kg","996"],["Laos (ລາວ)","la","856"],["Latvia (Latvija)","lv","371"],["Lebanon (‫لبنان‬‎)","lb","961"],["Lesotho","ls","266"],["Liberia","lr","231"],["Libya (‫ليبيا‬‎)","ly","218"],["Liechtenstein","li","423"],["Lithuania (Lietuva)","lt","370"],["Luxembourg","lu","352"],["Macau (澳門)","mo","853"],["Macedonia (FYROM) (Македонија)","mk","389"],["Madagascar (Madagasikara)","mg","261"],["Malawi","mw","265"],["Malaysia","my","60"],["Maldives","mv","960"],["Mali","ml","223"],["Malta","mt","356"],["Marshall Islands","mh","692"],["Martinique","mq","596"],["Mauritania (‫موريتانيا‬‎)","mr","222"],["Mauritius (Moris)","mu","230"],["Mayotte","yt","262",1],["Mexico (México)","mx","52"],["Micronesia","fm","691"],["Moldova (Republica Moldova)","md","373"],["Monaco","mc","377"],["Mongolia (Монгол)","mn","976"],["Montenegro (Crna Gora)","me","382"],["Montserrat","ms","1664"],["Morocco (‫المغرب‬‎)","ma","212",0],["Mozambique (Moçambique)","mz","258"],["Myanmar (Burma) (မြန်မာ)","mm","95"],["Namibia (Namibië)","na","264"],["Nauru","nr","674"],["Nepal (नेपाल)","np","977"],["Netherlands (Nederland)","nl","31"],["New Caledonia (Nouvelle-Calédonie)","nc","687"],["New Zealand","nz","64"],["Nicaragua","ni","505"],["Niger (Nijar)","ne","227"],["Nigeria","ng","234"],["Niue","nu","683"],["Norfolk Island","nf","672"],["North Korea (조선 민주주의 인민 공화국)","kp","850"],["Northern Mariana Islands","mp","1670"],["Norway (Norge)","no","47",0],["Oman (‫عُمان‬‎)","om","968"],["Pakistan (‫پاکستان‬‎)","pk","92"],["Palau","pw","680"],["Palestine (‫فلسطين‬‎)","ps","970"],["Panama (Panamá)","pa","507"],["Papua New Guinea","pg","675"],["Paraguay","py","595"],["Peru (Perú)","pe","51"],["Philippines","ph","63"],["Poland (Polska)","pl","48"],["Portugal","pt","351"],["Puerto Rico","pr","1",3,["787","939"]],["Qatar (‫قطر‬‎)","qa","974"],["Réunion (La Réunion)","re","262",0],["Romania (România)","ro","40"],["Russia (Россия)","ru","7",0],["Rwanda","rw","250"],["Saint Barthélemy (Saint-Barthélemy)","bl","590",1],["Saint Helena","sh","290"],["Saint Kitts and Nevis","kn","1869"],["Saint Lucia","lc","1758"],["Saint Martin (Saint-Martin (partie française))","mf","590",2],["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)","pm","508"],["Saint Vincent and the Grenadines","vc","1784"],["Samoa","ws","685"],["San Marino","sm","378"],["São Tomé and Príncipe (São Tomé e Príncipe)","st","239"],["Saudi Arabia (‫المملكة العربية السعودية‬‎)","sa","966"],["Senegal (Sénégal)","sn","221"],["Serbia (Србија)","rs","381"],["Seychelles","sc","248"],["Sierra Leone","sl","232"],["Singapore","sg","65"],["Sint Maarten","sx","1721"],["Slovakia (Slovensko)","sk","421"],["Slovenia (Slovenija)","si","386"],["Solomon Islands","sb","677"],["Somalia (Soomaaliya)","so","252"],["South Africa","za","27"],["South Korea (대한민국)","kr","82"],["South Sudan (‫جنوب السودان‬‎)","ss","211"],["Spain (España)","es","34"],["Sri Lanka (ශ්‍රී ලංකාව)","lk","94"],["Sudan (‫السودان‬‎)","sd","249"],["Suriname","sr","597"],["Svalbard and Jan Mayen","sj","47",1],["Swaziland","sz","268"],["Sweden (Sverige)","se","46"],["Switzerland (Schweiz)","ch","41"],["Syria (‫سوريا‬‎)","sy","963"],["Taiwan (台灣)","tw","886"],["Tajikistan","tj","992"],["Tanzania","tz","255"],["Thailand (ไทย)","th","66"],["Timor-Leste","tl","670"],["Togo","tg","228"],["Tokelau","tk","690"],["Tonga","to","676"],["Trinidad and Tobago","tt","1868"],["Tunisia (‫تونس‬‎)","tn","216"],["Turkey (Türkiye)","tr","90"],["Turkmenistan","tm","993"],["Turks and Caicos Islands","tc","1649"],["Tuvalu","tv","688"],["U.S. Virgin Islands","vi","1340"],["Uganda","ug","256"],["Ukraine (Україна)","ua","380"],["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)","ae","971"],["United Kingdom","gb","44",0],["United States","us","1",0],["Uruguay","uy","598"],["Uzbekistan (Oʻzbekiston)","uz","998"],["Vanuatu","vu","678"],["Vatican City (Città del Vaticano)","va","39",1],["Venezuela","ve","58"],["Vietnam (Việt Nam)","vn","84"],["Wallis and Futuna","wf","681"],["Western Sahara (‫الصحراء الغربية‬‎)","eh","212",1],["Yemen (‫اليمن‬‎)","ye","967"],["Zambia","zm","260"],["Zimbabwe","zw","263"],["Åland Islands","ax","358",1]],l=0;l<k.length;l++){var m=k[l];k[l]={name:m[0],iso2:m[1],dialCode:m[2],priority:m[3]||0,areaCodes:m[4]||null}}});