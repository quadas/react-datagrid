'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');

var React = require('react');
var assign = require('object-assign');
var Scroller = require('react-virtual-scroller');

function emptyFn() {}

module.exports = (_temp2 = _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, _class);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.onMount = function (scroller) {
            ;(_this.props.onMount || emptyFn)(_this, scroller);
        }, _this.onVerticalScrollOverflow = function () {}, _this.onHorizontalScrollOverflow = function () {}, _this.onHorizontalScroll = function (scrollLeft) {
            _this.props.onScrollLeft(scrollLeft);
        }, _this.onVerticalScroll = function (pos) {
            _this.props.onScrollTop(pos);
        }, _this.prepareProps = function (thisProps) {
            var props = {};

            assign(props, thisProps);

            return props;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class, [{
        key: 'render',
        value: function render() {

            var props = this.prepareProps(this.props);
            var rowsCount = props.renderCount;

            var groupsCount = 0;
            if (props.groupData) {
                groupsCount = props.groupData.groupsCount;
            }

            rowsCount += groupsCount;

            // var loadersSize = props.loadersSize
            var verticalScrollerSize = (props.totalLength + groupsCount) * props.rowHeight; // + loadersSize

            var content = props.empty ? React.createElement(
                'div',
                { className: 'z-empty-text', style: props.emptyTextStyle },
                props.emptyText
            ) : React.createElement('div', _extends({}, props.tableProps, { ref: 'table' }));

            return React.createElement(
                Scroller,
                {
                    onMount: this.onMount,
                    preventDefaultHorizontal: true,

                    loadMask: !props.loadMaskOverHeader,
                    loading: props.loading,

                    scrollbarSize: props.scrollbarSize,

                    minVerticalScrollStep: props.rowHeight,
                    scrollTop: props.scrollTop,
                    scrollLeft: props.scrollLeft,

                    scrollHeight: verticalScrollerSize,
                    scrollWidth: props.minRowWidth,

                    onVerticalScroll: this.onVerticalScroll,
                    onHorizontalScroll: this.onHorizontalScroll
                },
                content
            );
        }
    }]);

    return _class;
}(React.Component), _class.displayName = 'ReactDataGrid.Wrapper', _class.propTypes = {
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    scrollbarSize: PropTypes.number,
    rowHeight: PropTypes.any,
    renderCount: PropTypes.number
}, _class.defaultProps = {
    scrollLeft: 0,
    scrollTop: 0
}, _temp2);