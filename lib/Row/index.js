'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');

var React = require('react');
var Region = require('region');
var assign = require('object-assign');
var normalize = require('react-style-normalizer');
var Cell = require('../Cell');
var CellFactory = React.createFactory(Cell);
var ReactMenu = require('react-menus');
var ReactMenuFactory = React.createFactory(ReactMenu);

module.exports = (_temp2 = _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      mouseOver: false
    }, _this.prepareProps = function (thisProps) {
      var props = assign({}, thisProps);

      props.className = _this.prepareClassName(props, _this.state);
      props.style = _this.prepareStyle(props);

      props.onMouseEnter = _this.handleMouseEnter;
      props.onMouseLeave = _this.handleMouseLeave;
      props.onContextMenu = _this.handleContextMenu;
      props.onClick = _this.handleRowClick;

      delete props.data;
      delete props.cellPadding;

      return props;
    }, _this.handleRowClick = function (event) {

      if (_this.props.onClick) {
        _this.props.onClick(event);
      }

      if (_this.props._onClick) {
        _this.props._onClick(_this.props, event);
      }
    }, _this.handleContextMenu = function (event) {

      if (_this.props.rowContextMenu) {
        _this.showMenu(event);
      }

      if (_this.props.onContextMenu) {
        _this.props.onContextMenu(event);
      }
    }, _this.showMenu = function (event) {
      var factory = _this.props.rowContextMenu;
      var alignTo = Region.from(event);

      var props = {
        style: {
          position: 'absolute'
        },
        rowProps: _this.props,
        data: _this.props.data,
        alignTo: alignTo,
        alignPositions: ['tl-bl', 'tr-br', 'bl-tl', 'br-tr'],
        items: [{
          label: 'stop'
        }]
      };

      var menu = factory(props);

      if (menu === undefined) {
        menu = ReactMenuFactory(props);
      }

      event.preventDefault();

      _this.props.showMenu(function () {
        return menu;
      });
    }, _this.handleMouseLeave = function (event) {
      _this.setState({
        mouseOver: false
      });

      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(event);
      }
    }, _this.handleMouseEnter = function (event) {
      _this.setState({
        mouseOver: true
      });

      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    }, _this.renderCell = function (props, column, index) {

      var text = props.data[column.name];
      var columns = props.columns;

      var cellProps = {
        style: column.style,
        className: column.className,

        key: column.name,
        name: column.name,

        data: props.data,
        columns: columns,
        index: index,
        rowIndex: props.index,
        textPadding: props.cellPadding,
        renderCell: props.renderCell,
        renderText: props.renderText
      };

      if (typeof column.render == 'function') {
        text = column.render(text, props.data, cellProps);
      }

      cellProps.text = text;

      var result;

      if (props.cellFactory) {
        result = props.cellFactory(cellProps);
      }

      if (result === undefined) {
        result = CellFactory(cellProps);
      }

      return result;
    }, _this.prepareClassName = function (props, state) {
      var className = props.className || '';

      className += ' z-row ';

      if (props.index % 2 === 0) {
        className += ' z-even ' + (props.evenClassName || '');
      } else {
        className += ' z-odd ' + (props.oddClassName || '');
      }

      if (state.mouseOver) {
        className += ' z-over ' + (props.overClassName || '');
      }

      if (props.selected) {
        className += ' z-selected ' + (props.selectedClassName || '');
      }

      return className;
    }, _this.prepareStyle = function (props) {

      var style = assign({}, props.defaultStyle, props.style);

      style.height = props.rowHeight;
      style.minWidth = props.minWidth;

      return style;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      var props = this.prepareProps(this.props);
      var cells = props.children || props.columns.map(this.renderCell.bind(this, this.props));

      return React.createElement(
        'div',
        props,
        cells
      );
    }
  }]);

  return _class;
}(React.Component), _class.displayName = 'ReactDataGrid.Row', _class.propTypes = {
  data: PropTypes.object,
  columns: PropTypes.array,
  index: PropTypes.number
}, _class.defaultProps = {
  defaultStyle: {}
}, _temp2);