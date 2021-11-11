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
            labelDisplayedRows: t('{from}-{to} of {count}', '{from}-{to}/{count} 條資料'),
            labelRowsSelect: t('rows', '行'),
            nextTooltip: t('Next Page', '下一頁'),
            previousTooltip: t('Previous Page', '上一頁'),
            firstTooltip: t('First Page', '首頁'),
            lastTooltip: t('Last Page', '最後一頁')
        },
        header: {
            actions: t('Actions', '操作')
        },
        toolbar: {
            searchPlaceholder: t('Search', '搜索')
        },
        body: {
            emptyDataSourceMessage: t('No records to display', '沒有數據'),
            editRow: {
                saveTooltip: t('Save', '儲存'),
                cancelTooltip: t('Cancel', '返回')
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
