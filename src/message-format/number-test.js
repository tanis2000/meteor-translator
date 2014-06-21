var NAMESPACE = 'packages/translator/test/namespace';
var englishTrans = new Translator();
englishTrans.setLanguage(['en_US']);
englishTrans.use(NAMESPACE);

var germanTrans = new Translator();
germanTrans.setLanguage(['de_DE']);
germanTrans.use(NAMESPACE);

testAsyncMulti("Translator - message-format - number - language default", [
  function (test, expect) {
    var key = 'subscribers';
    var trans = englishTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "You have 0 subscribers!");
      test.equal(trans.get(key, { num: 10 }), "You have 10 subscribers!");
      test.equal(trans.get(key, { num: 1000 }), "You have 1,000 subscribers!");
      test.equal(trans.get(key, { num: 0.25 }), "You have 0.25 subscribers!");
      test.equal(trans.get(key, { num: 2000.25 }), "You have 2,000.25 subscribers!");
      test.equal(trans.get(key, { num: -2000.25 }), "You have -2,000.25 subscribers!");
    }));
  },
  function (test, expect) {
    var key = 'subscribers';
    var trans = germanTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "Du hast 0 subscriber!");
      test.equal(trans.get(key, { num: 10 }), "Du hast 10 subscriber!");
      test.equal(trans.get(key, { num: 1000 }), "Du hast 1.000 subscriber!");
      test.equal(trans.get(key, { num: 0.25 }), "Du hast 0,25 subscriber!");
      test.equal(trans.get(key, { num: 2000.25 }), "Du hast 2.000,25 subscriber!");
      test.equal(trans.get(key, { num: -2000.25 }), "Du hast -2.000,25 subscriber!");
    }));
  }
]);

testAsyncMulti("Translator - message-format - number - force digits after point", [
  function (test, expect) {
    var key = 'normal_number';
    var trans = englishTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0.00");
      test.equal(trans.get(key, { num: 10 }), "10.00");
      test.equal(trans.get(key, { num: 1000 }), "1,000.00");
      test.equal(trans.get(key, { num: 0.25 }), "0.25");
      test.equal(trans.get(key, { num: 2000.25 }), "2,000.25");
      test.equal(trans.get(key, { num: -2000.25 }), "-2,000.25");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
    }));
  },
  function (test, expect) {
    var key = 'normal_number';
    var trans = germanTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0,00");
      test.equal(trans.get(key, { num: 10 }), "10,00");
      test.equal(trans.get(key, { num: 1000 }), "1.000,00");
      test.equal(trans.get(key, { num: 0.25 }), "0,25");
      test.equal(trans.get(key, { num: 2000.25 }), "2.000,25");
      test.equal(trans.get(key, { num: -2000.25 }), "-2.000,25");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
    }));
  }
]);

testAsyncMulti("Translator - message-format - number - optional 1 digit after point", [
  function (test, expect) {
    var key = 'more_point_number';
    var trans = englishTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0");
      test.equal(trans.get(key, { num: 10 }), "10");
      test.equal(trans.get(key, { num: 1000 }), "1,000");
      test.equal(trans.get(key, { num: 0.25 }), "0.3");
      test.equal(trans.get(key, { num: 2000.25 }), "2,000.3");
      test.equal(trans.get(key, { num: -2000.25 }), "-2,000.2");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
    }));
  },
  function (test, expect) {
    var key = 'more_point_number';
    var trans = germanTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0");
      test.equal(trans.get(key, { num: 10 }), "10");
      test.equal(trans.get(key, { num: 1000 }), "1.000");
      test.equal(trans.get(key, { num: 0.25 }), "0,3");
      test.equal(trans.get(key, { num: 2000.25 }), "2.000,3");
      test.equal(trans.get(key, { num: -2000.25 }), "-2.000,2");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
    }));
  }
]);

testAsyncMulti("Translator - message-format - number - force min 4 digits before point", [
  function (test, expect) {
    var key = 'more_digit_number';
    var trans = englishTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0,000");
      test.equal(trans.get(key, { num: 10 }), "0,010");
      test.equal(trans.get(key, { num: 1000 }), "1,000");
      test.equal(trans.get(key, { num: 0.25 }), "0,000.25");
      test.equal(trans.get(key, { num: 2000.25 }), "2,000.25");
      test.equal(trans.get(key, { num: -2000.25 }), "-2,000.25");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
    }));
  },
  function (test, expect) {
    var key = 'more_digit_number';
    var trans = germanTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0.000");
      test.equal(trans.get(key, { num: 10 }), "0.010");
      test.equal(trans.get(key, { num: 1000 }), "1.000");
      test.equal(trans.get(key, { num: 0.25 }), "0.000,25");
      test.equal(trans.get(key, { num: 2000.25 }), "2.000,25");
      test.equal(trans.get(key, { num: -2000.25 }), "-2.000,25");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
    }));
  }
]);

testAsyncMulti("Translator - message-format - number - positive plus sign", [
  function (test, expect) {
    var key = 'plus_number';
    var trans = englishTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "+0");
      test.equal(trans.get(key, { num: 10 }), "+10");
      test.equal(trans.get(key, { num: 1000 }), "+1,000");
      test.equal(trans.get(key, { num: 0.25 }), "+0.25");
      test.equal(trans.get(key, { num: 2000.25 }), "+2,000.25");
      test.equal(trans.get(key, { num: -2000.25 }), "-2,000.25");
      test.equal(trans.get(key, { num: Infinity }), "+∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
    }));
  },
  function (test, expect) {
    var key = 'plus_number';
    var trans = germanTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "+0");
      test.equal(trans.get(key, { num: 10 }), "+10");
      test.equal(trans.get(key, { num: 1000 }), "+1.000");
      test.equal(trans.get(key, { num: 0.25 }), "+0,25");
      test.equal(trans.get(key, { num: 2000.25 }), "+2.000,25");
      test.equal(trans.get(key, { num: -2000.25 }), "-2.000,25");
      test.equal(trans.get(key, { num: Infinity }), "+∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
    }));
  }
]);

testAsyncMulti("Translator - message-format - number - round to 0.05", [
  function (test, expect) {
    var key = 'rounded_number';
    var trans = englishTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0.00");
      test.equal(trans.get(key, { num: 10 }), "10.00");
      test.equal(trans.get(key, { num: 1000 }), "1,000.00");
      test.equal(trans.get(key, { num: 0.23 }), "0.25");
      test.equal(trans.get(key, { num: 2000.23 }), "2,000.25");
      test.equal(trans.get(key, { num: -2000.23 }), "-2,000.25");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
    }));
  },
  function (test, expect) {
    var key = 'rounded_number';
    var trans = germanTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0,00");
      test.equal(trans.get(key, { num: 10 }), "10,00");
      test.equal(trans.get(key, { num: 1000 }), "1.000,00");
      test.equal(trans.get(key, { num: 0.23 }), "0,25");
      test.equal(trans.get(key, { num: 2000.23 }), "2.000,25");
      test.equal(trans.get(key, { num: -2000.23 }), "-2.000,25");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
    }));
  }
]);

testAsyncMulti("Translator - message-format - number - exponent", [
  function (test, expect) {
    var key = 'exponential_number';
    var trans = englishTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0E0");
      test.equal(trans.get(key, { num: 10 }), "1E1");
      test.equal(trans.get(key, { num: 1000 }), "1E3");
      test.equal(trans.get(key, { num: 0.23 }), "2.3E-1");
      test.equal(trans.get(key, { num: 2000.23 }), "2E3");
      test.equal(trans.get(key, { num: -2000.23 }), "-2E3");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
      
      test.equal(trans.get(key, { num: 1234 }), "1.23E3");
      test.equal(trans.get(key, { num: 0.00123 }), "1.23E-3");
    }));
  },
  function (test, expect) {
    var key = 'exponential_number';
    var trans = germanTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0E0");
      test.equal(trans.get(key, { num: 10 }), "1E1");
      test.equal(trans.get(key, { num: 1000 }), "1E3");
      test.equal(trans.get(key, { num: 0.23 }), "2,3E-1");
      test.equal(trans.get(key, { num: 2000.23 }), "2E3");
      test.equal(trans.get(key, { num: -2000.23 }), "-2E3");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
      
      test.equal(trans.get(key, { num: 1234 }), "1,23E3");
      test.equal(trans.get(key, { num: 0.00123 }), "1,23E-3");
    }));
  }
]);

testAsyncMulti("Translator - message-format - number - exponent plus", [
  function (test, expect) {
    var key = 'exponential_number_plus';
    var trans = englishTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0E+0");
      test.equal(trans.get(key, { num: 10 }), "1E+1");
      test.equal(trans.get(key, { num: 1000 }), "1E+3");
      test.equal(trans.get(key, { num: 0.23 }), "2.3E-1");
      test.equal(trans.get(key, { num: 2000.23 }), "2E+3");
      test.equal(trans.get(key, { num: -2000.23 }), "-2E+3");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
      
      test.equal(trans.get(key, { num: 1234 }), "1.23E+3");
      test.equal(trans.get(key, { num: 0.00123 }), "1.23E-3");
    }));
  },
  function (test, expect) {
    var key = 'exponential_number_plus';
    var trans = germanTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0E+0");
      test.equal(trans.get(key, { num: 10 }), "1E+1");
      test.equal(trans.get(key, { num: 1000 }), "1E+3");
      test.equal(trans.get(key, { num: 0.23 }), "2,3E-1");
      test.equal(trans.get(key, { num: 2000.23 }), "2E+3");
      test.equal(trans.get(key, { num: -2000.23 }), "-2E+3");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
      
      test.equal(trans.get(key, { num: 1234 }), "1,23E+3");
      test.equal(trans.get(key, { num: 0.00123 }), "1,23E-3");
    }));
  }
]);

testAsyncMulti("Translator - message-format - number - exponent with 2 digits", [
  function (test, expect) {
    var key = 'exponential_number_minimum';
    var trans = englishTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "00E0");
      test.equal(trans.get(key, { num: 10 }), "10E0");
      test.equal(trans.get(key, { num: 1000 }), "10E2");
      test.equal(trans.get(key, { num: 0.23 }), "23E-2");
      test.equal(trans.get(key, { num: 2000.23 }), "20E2");
      test.equal(trans.get(key, { num: -2000.23 }), "-20E2");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
      
      test.equal(trans.get(key, { num: 1234 }), "12.34E2");
      test.equal(trans.get(key, { num: 0.00123 }), "12.3E-2");
    }));
  },
  function (test, expect) {
    var key = 'exponential_number_minimum';
    var trans = germanTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "00E0");
      test.equal(trans.get(key, { num: 10 }), "10E0");
      test.equal(trans.get(key, { num: 1000 }), "10E2");
      test.equal(trans.get(key, { num: 0.23 }), "23E-2");
      test.equal(trans.get(key, { num: 2000.23 }), "2E3");
      test.equal(trans.get(key, { num: -2000.23 }), "-2E3");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
      
      test.equal(trans.get(key, { num: 1234 }), "12,34E2");
      test.equal(trans.get(key, { num: 0.00123 }), "12,3E-2");
    }));
  }
]);

testAsyncMulti("Translator - message-format - number - exponent exponent 3", [
  function (test, expect) {
    var key = 'exponential_number_multiple';
    var trans = englishTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0E0");
      test.equal(trans.get(key, { num: 10 }), "10E0");
      test.equal(trans.get(key, { num: 1000 }), "1E3");
      test.equal(trans.get(key, { num: 0.23 }), "230E-3");
      test.equal(trans.get(key, { num: 2000.23 }), "2E3");
      test.equal(trans.get(key, { num: -2000.23 }), "-2E3");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
      
      test.equal(trans.get(key, { num: 1234 }), "1.23E3");
      test.equal(trans.get(key, { num: 0.00123 }), "1.23E-3");
    }));
  },
  function (test, expect) {
    var key = 'exponential_number_multiple';
    var trans = germanTrans;
    trans.ready(expect(function () {
      test.equal(trans.get(key, { num: 0 }), "0E0");
      test.equal(trans.get(key, { num: 10 }), "10E0");
      test.equal(trans.get(key, { num: 1000 }), "1E3");
      test.equal(trans.get(key, { num: 0.23 }), "230E-3");
      test.equal(trans.get(key, { num: 2000.23 }), "2E3");
      test.equal(trans.get(key, { num: -2000.23 }), "-2E3");
      test.equal(trans.get(key, { num: Infinity }), "∞");
      test.equal(trans.get(key, { num: -Infinity }), "-∞");
      test.equal(trans.get(key, { num: "hello" }), "NaN");
      
      test.equal(trans.get(key, { num: 1234 }), "1,23E3");
      test.equal(trans.get(key, { num: 0.00123 }), "1,23E-3");
    }));
  }
]);
