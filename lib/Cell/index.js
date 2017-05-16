'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pickReactKnownProp = require('pick-react-known-prop');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');

var React = require('react');
var assign = require('object-assign');
var normalize = require('react-style-normalizer');


var TEXT_ALIGN_2_JUSTIFY = {
    right: 'flex-end',
    center: 'center'
};

var Cell = function (_React$Component) {
    _inherits(Cell, _React$Component);

    function Cell() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Cell);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cell.__proto__ || Object.getPrototypeOf(Cell)).call.apply(_ref, [this].concat(args))), _this), _this.prepareClassName = function (props) {
            var index = props.index;
            var columns = props.columns;
            var column = props.column;

            var textAlign = column && column.textAlign;

            var className = props.className || '';

            className += ' ' + Cell.className;

            if (columns) {
                if (!index && props.firstClassName) {
                    className += ' ' + props.firstClassName;
                }

                if (index == columns.length - 1 && props.lastClassName) {
                    className += ' ' + props.lastClassName;
                }
            }

            if (textAlign) {
                className += ' z-align-' + textAlign;
            }

            return className;
        }, _this.prepareStyle = function (props) {
            var column = props.column;
            var sizeStyle = column && column.sizeStyle;

            var alignStyle;
            var textAlign = column && column.textAlign || (props.style || {}).textAlign;

            if (textAlign) {
                alignStyle = { justifyContent: TEXT_ALIGN_2_JUSTIFY[textAlign] };
            }

            var style = assign({}, props.defaultStyle, sizeStyle, alignStyle, props.style);

            return normalize(style);
        }, _this.prepareProps = function (thisProps) {

            var props = assign({}, thisProps);

            if (!props.column && props.columns) {
                props.column = props.columns[props.index];
            }

            props.className = _this.prepareClassName(props);
            props.style = _this.prepareStyle(props);

            return props;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Cell, [{
        key: 'render',
        value: function render() {
            var props = this.p = this.prepareProps(this.props);

            var column = props.column;
            var text = props.renderText ? props.renderText(props.text, column, props.rowIndex) : props.text;

            var contentProps = {
                className: 'z-content',
                style: {
                    padding: props.contentPadding
                }
            };

            var content = props.renderCell ? props.renderCell(contentProps, text, props) : React.DOM.div(contentProps, text);

            var renderProps = (0, _pickReactKnownProp.pickHTMLProps)(props);

            return React.createElement(
                'div',
                renderProps,
                content,
                props.children
            );
        }
    }]);

    return Cell;
}(React.Component);

Cell.displayName = 'ReactDataGrid.Cell';
Cell.propTypes = {
    className: PropTypes.string,
    firstClassName: PropTypes.string,
    lastClassName: PropTypes.string,

    contentPadding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    column: PropTypes.object,
    columns: PropTypes.array,
    index: PropTypes.number,

    style: PropTypes.object,
    text: PropTypes.any,
    rowIndex: PropTypes.number
};
Cell.defaultProps = {
    text: '',

    firstClassName: 'z-first',
    lastClassName: 'z-last',

    defaultStyle: {}
};


Cell.className = 'z-cell';

module.exports = Cell;