import React from "react";

import MaterialTable from "material-table";

import summations from "./summations";

function createMaterialTable(columns, tableData, title, downloadExcel) {
  return (
    <MaterialTable
      columns={columns}
      data={tableData}
      title={title}
      options={{
        paging: false,
        exportButton: true,
        columnsButton: true,
        rowStyle: (data, index) => {
          let returnObj = {}
          index % 2 == 0 ? returnObj.background = "#E7ECEF" : returnObj.background = null
          summations(data.tag) ?
          returnObj.borderTop = '2px solid #000000' : returnObj.borderTop = null
          summations(data.tag) ?
          returnObj.fontWeight = 'bold' : returnObj.fontWeight = null
          return returnObj
        },
        headerStyle: { background: "#274C77", color: "white" },
      }}
      actions={[
        {
          icon: () => <button>Export to Excel</button>,
          tooltip: "Export to Excel",
          onClick: () => downloadExcel(),
          isFreeAction: true,
        },
      ]}
    />
  );
}

export default createMaterialTable;
