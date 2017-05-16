'use strict';

var PropTypes = require('prop-types');

var React  = require('react')
var assign = require('object-assign')

module.exports = class ResizeProxy extends React.Component {
    static displayName = 'ReactDataGrid.ResizeProxy';

    static propTypes = {
        active: PropTypes.bool
    };

    state = {
        offset: 0
    };

    render() {

        var props = assign({}, this.props)
        var state = this.state

        var style  = {}
        var active = props.active

        if (active){
            style.display = 'block'
            style.left    = state.offset
        }

        return <div className='z-resize-proxy' style={style} />
    }
}
