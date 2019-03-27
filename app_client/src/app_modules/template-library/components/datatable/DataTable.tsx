import * as React from 'react';

export interface IProps {
    data: any;
}

class DataTable extends React.Component<IProps, object> {
    constructor(props) {
        super(props);
    }
    public render() {
        const { data } = this.props;
        const TableRow = ({ row }) => (
            <tr>
                <td>{row.type}</td>
                <td>{row.last}</td>
                <td>{row.status}</td>
                <td>{row.variants}</td>
            </tr>
        );

        const Table = ({ data }) => (
            <React.Fragment>
                {data.map(row => {
                    return <TableRow key={row.key} row={row} />;
                })}
            </React.Fragment>
        );
        return <Table data={data} />;
    }
}

export default DataTable;
