'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');

var React = require('react');
var assign = require('object-assign');

module.exports = (_temp2 = _class = function (_React$Component) {
    _inherits(ResizeProxy, _React$Component);

    function ResizeProxy() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ResizeProxy);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResizeProxy.__proto__ || Object.getPrototypeOf(ResizeProxy)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            offset: 0
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ResizeProxy, [{
        key: 'render',
        value: function render() {

            var props = assign({}, this.props);
            var state = this.state;

            var style = {};
            var active = props.active;

            if (active) {
                style.display = 'block';
                style.left = state.offset;
            }

            return React.createElement('div', { className: 'z-resize-proxy', style: style });
        }
    }]);

    return ResizeProxy;
}(React.Component), _class.displayName = 'ReactDataGrid.ResizeProxy', _class.propTypes = {
    active: PropTypes.bool
}, _temp2);