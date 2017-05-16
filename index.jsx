import React, { Component } from 'react'
import DataGrid from './src'
import ReactDOM from 'react-dom'
import faker from 'faker'

require('./index.styl')

class App extends Component {
    constructor(props) {
        super(props);

        this.DATA_SOURCE = Array(500).fill('1').map((ignored, i) => (
            { id: i + 1,
              lastName: faker.name.lastName(),
              firstName: faker.name.firstName() }
        ));

        this.state = {
            sortInfo: [],
            columnWidth: {}
        };

        this.handleColumnOrderChange = this.handleColumnOrderChange.bind(this);
        this.handleColumnResize = this.handleColumnResize.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    handleColumnOrderChange() {
    }

    handleSortChange(sortInfo) {
        const nextSortInfo = sortInfo.filter(s => s.name);
        this.setState({ sortInfo: nextSortInfo })
    }

    handleColumnResize(...args) {
        const data = args.reduce((memo, arg) => {
            if (typeof(arg) !== 'object') {
                if (!memo.candidate) { return memo }
                return {
                    candidate: null,
                    nextColumnWidth: Object.assign({}, memo.nextColumnWidth, { [memo.candidate]: arg })
                }
            }

            return Object.assign({}, memo, { candidate: arg.name });
        }, { candidate: null, nextColumnWidth: {} });

        console.log(data.nextColumnWidth);
        this.setState({ columnWidth: data.nextColumnWidth });
    }

    getColumns() {
        return [
            { name: 'id', title: 'ID', width: this.state.columnWidth.id },
            { name: 'name', title: 'name', width: this.state.columnWidth.name,
              render(ignored, r) { return `${r.firstName} ${r.lastName}` } }
        ];
    }

    getDataSource() {
        return this.state.sortInfo.reduce((memo, rule) => (
            memo.sort((a, b) => a[rule.name] > b[rule.name] ? rule.dir : -rule.dir)
        ), this.DATA_SOURCE)
    }

    render() {
        const rowStyle = (r) => (r.id % 2 === 0 ? { color: 'red' } : {})
        const rowClassName = (r) => (r.id % 2 === 1 ? 'hmm' : '')

        return (
            <div className="content">
                <DataGrid
                    idProperty="id"
                    dataSource={this.getDataSource()}
                    columns={this.getColumns()}
                    style={{ height: 200 }}
                    rowStyle={rowStyle}
                    rowClassName={rowClassName}
                    sortInfo={this.state.sortInfo}
                    emptyText={"Feed Me Records!!!"}
                    withColumnMenu={false}
                    defaultPageSize={25}
                    onColumnOrderChange={this.handleColumnOrderChange}
                    onSortChange={this.handleSortChange}
                    onColumnResize={this.handleColumnResize}
                    resizableColumns={true}
                    scrollbarSize={20}
                />

                <Pagination
                    offset={this.props.offset}
                    limit={this.props.limit}
                    total={this.props.total}
                    onPageChange={this.handlePageChange}
                    paginationClassName={this.props.paginationClassName}
                />
            </div>
        )
    }
}

ReactDOM.render((
    <App />
), document.getElementById('content'))
