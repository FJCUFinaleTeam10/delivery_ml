import React from 'react';
import MaterialTable from 'material-table';
import { useTrans } from '../hooks';

export default (props) => {
    const t = useTrans();
    const options = props.options || {
        actionsColumnIndex: -1,
        actionsCellStyle: { width: '106px' }
    };
    const localization = {
        pagination: {
            labelDisplayedRows: t('{from}-{to} of {count}', '{from}-{to} of {count}'),
            labelRowsSelect: t('rows', 'rows'),
            nextTooltip: t('Next Page', 'Next Page'),
            previousTooltip: t('Previous Page', 'Previous Page'),
            firstTooltip: t('First Page', 'First Page'),
            lastTooltip: t('Last Page', 'Last Page')
        },
        header: {
            actions: t('Actions', 'Actions')
        },
        toolbar: {
            searchPlaceholder: t('Search', 'Search')
        },
        body: {
            emptyDataSourceMessage: t('No records to display', 'No records to display'),
            editRow: {
                saveTooltip: t('Save', 'Save'),
                cancelTooltip: t('Cancel', 'Cancel')
            }
        }
    };
    return (
        <MaterialTable
            options={options}
            localization={localization}
            {...props}
        />
    );
}
