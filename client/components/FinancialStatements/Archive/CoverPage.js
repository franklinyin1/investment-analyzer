import React from "react";
import { connect } from "react-redux";

import createMaterialTable from "../../../helper-functions/FinancialStatements/createMaterialTable"

import XLSX from "xlsx";

import filterFinancials from "../../../helper-functions/FinancialStatements/filterFinancials";

class CoverPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { company } = this.props;

    let tableData = [];

    let columns = [
      { title: "Presentation Label", field: "presentationLabel" },
      { title: "Version", field: "version", align: "center" },
      {
        title: "Period End Date",
        field: "periodEndDate",
        align: "center",
      },
      { title: "Value", field: "value", align: "center" },
      {
        title: "Unit of Measure",
        field: "unitOfMeasure",
        align: "center",
      },
    ];

    if (company.financials) {

      let currentQuarterFinancials = filterFinancials(company, 'CP', '20210630', null)

      for (let i = 0; i < currentQuarterFinancials.length; i++) {
        let row = {
          presentationLabel: currentQuarterFinancials[i].presentation[0].plabel,
          version: currentQuarterFinancials[i].version,
          periodEndDate: currentQuarterFinancials[i].ddate,
          value: currentQuarterFinancials[i].value.toLocaleString(),
          unitOfMeasure: currentQuarterFinancials[i].uom,
        };

        tableData.push(row);
      }
    }

    const downloadExcel = () => {
      const newData = tableData.map((row) => {
        delete row.tableData;
        return row;
      });
      const workSheet = XLSX.utils.json_to_sheet(newData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "balanceSheet");

      //buffer to deal with bulk data
      let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

      //binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

      //download
      XLSX.writeFile(workBook, "balanceSheet.xlsx");
    };

    let materialTable = createMaterialTable(columns, tableData, "Cover Page", downloadExcel)

    return (
      <React.Fragment>
        {tableData.length > 1 ? (
          <React.Fragment>
            {materialTable}
            <h1></h1>
          </React.Fragment>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

/**
 * CONTAINER
 */

export default CoverPage;
