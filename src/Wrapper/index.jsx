'use strict';

var PropTypes = require('prop-types');

var React    = require('react')
var assign   = require('object-assign')
var Scroller = require('react-virtual-scroller')

function emptyFn(){}

module.exports = class extends React.Component {
    static displayName = 'ReactDataGrid.Wrapper';

    static propTypes = {
        scrollLeft   : PropTypes.number,
        scrollTop    : PropTypes.number,
        scrollbarSize: PropTypes.number,
        rowHeight   : PropTypes.any,
        renderCount : PropTypes.number
    };

    static defaultProps = {
        scrollLeft: 0,
        scrollTop : 0
    };

    onMount = (scroller) => {
        ;(this.props.onMount || emptyFn)(this, scroller)
    };

    render() {

        var props     = this.prepareProps(this.props)
        var rowsCount = props.renderCount

        var groupsCount = 0
        if (props.groupData){
            groupsCount = props.groupData.groupsCount
        }

        rowsCount += groupsCount

        // var loadersSize = props.loadersSize
        var verticalScrollerSize = (props.totalLength + groupsCount) * props.rowHeight// + loadersSize

        var content = props.empty?
            <div className="z-empty-text" style={props.emptyTextStyle}>{props.emptyText}</div>:
            <div {...props.tableProps} ref="table"/>


        return <Scroller
                onMount={this.onMount}
                preventDefaultHorizontal={true}

                loadMask={!props.loadMaskOverHeader}
                loading={props.loading}

                scrollbarSize={props.scrollbarSize}

                minVerticalScrollStep={props.rowHeight}
                scrollTop={props.scrollTop}
                scrollLeft={props.scrollLeft}

                scrollHeight={verticalScrollerSize}
                scrollWidth={props.minRowWidth}

                onVerticalScroll={this.onVerticalScroll}
                onHorizontalScroll={this.onHorizontalScroll}
            >
            {content}
        </Scroller>
    }

    onVerticalScrollOverflow = () => {
    };

    onHorizontalScrollOverflow = () => {
    };

    onHorizontalScroll = (scrollLeft) => {
        this.props.onScrollLeft(scrollLeft)
    };

    onVerticalScroll = (pos) => {
        this.props.onScrollTop(pos)
    };

    prepareProps = (thisProps) => {
        var props = {}

        assign(props, thisProps)

        return props
    };
}
