import * as React from 'react';
import styled from 'styled-components';
import StyledTable, { TableComponent } from './Table.style';
import DataTable from '../datatable/DataTable';

class Table extends React.Component<{}, object> {
    constructor(props) {
        super(props);
    }
    public render() {
        const fakeData = [
            {
                key: 1,
                type: 'Custodian Agreement',
                last: 'Mar 1, 2018, 11:44 am',
                status: 'Checked in',
                variants: '9'
            },
            {
                key: 2,
                type: 'Trust Agreement',
                last: 'Mar 1, 2018, 11:44 am',
                status: 'Checked out',
                variants: '6'
            },
            {
                key: 3,
                type: 'Non-Disclosure Afreement',
                last: 'Mar 1, 2018, 11:44 am',
                status: 'Checked in',
                variants: '3'
            },
            {
                key: 4,
                type: 'IP Agreement',
                last: 'Mar 1, 2018, 11:44 am',
                status: 'Checked in',
                variants: '5'
            }
        ];
        return (
            <StyledTable>
                <TableComponent>
                    <thead>
                        <tr>
                            <th>Template Type</th>
                            <th>Last Edited</th>
                            <th>Status</th>
                            <th>Variants</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DataTable data={fakeData} />
                    </tbody>
                </TableComponent>
            </StyledTable>
        );
    }
}

export default Table;
