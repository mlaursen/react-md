'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throw_;

var _lodash = require('lodash.uniq');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var autoParserError = /@error\s+(?:'|")([^'"]+)/g;
var autoParserError = /@error\s+'(.+)';/g;

function throw_() {
  return {
    name: 'throw',

    parse: function parse(text) {
      return text.trim();
    },
    autofill: function autofill(item) {
      var match = void 0;
      var throwing = item.throws || [];

      while (match = autoParserError.exec(item.context.code)) {
        throwing.push(match[1]);
      }

      if (throwing.length > 0) {
        return (0, _lodash2.default)(throwing);
      }
    },


    alias: ['throws', 'exception'],

    allowedOn: ['function', 'mixin', 'placeholder']
  };
}
