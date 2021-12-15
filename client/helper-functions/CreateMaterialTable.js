import React from "react";
import { connect } from "react-redux";

import MaterialTable from "material-table";

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
        rowStyle: (data, index) =>
          index % 2 == 0 ? { background: "#f5f5f5" } : null,
        headerStyle: { background: "#00004d", color: "white" },
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
