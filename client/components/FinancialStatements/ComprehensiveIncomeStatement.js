import React from "react";
import { connect } from "react-redux";

import createMaterialTable from "../../helper-functions/createMaterialTable"

import XLSX from "xlsx";

import filterFinancials from "../../helper-functions/filterFinancials";

class ComprehensiveIncomeStatement extends React.Component {
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
      { title: "Quarters", field: "quarters", align: "center" },
      { title: "Value", field: "value", align: "center" },
      {
        title: "Unit of Measure",
        field: "unitOfMeasure",
        align: "center",
      },
    ];

    let rows = [
      [
        <td key={`cell${0}-1`}>Tag</td>,
        <td key={`cell${0}-2`}>Version</td>,
        <td key={`cell${0}-3`}>Period End Date</td>,
        <td key={`cell${0}-4`}>Quarters</td>,
        <td key={`cell${0}-5`}>Value</td>,
        <td key={`cell${0}-6`}>Unit Of Measure</td>,
      ],
    ];

    if (company.financials) {

      let currentQuarterFinancials = filterFinancials(company, 'CI', '20210630', '1')

      for (let i = 0; i < currentQuarterFinancials.length; i++) {
        let row = {
          presentationLabel: currentQuarterFinancials[i].presentation[0].plabel,
          version: currentQuarterFinancials[i].version,
          periodEndDate: currentQuarterFinancials[i].ddate,
          quarters: currentQuarterFinancials[i].qtrs,
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
      XLSX.utils.book_append_sheet(workBook, workSheet, "incomeStatement");

      //buffer to deal with bulk data
      let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

      //binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

      //download
      XLSX.writeFile(workBook, "incomeStatement.xlsx");
    };

    let materialTable = createMaterialTable(columns, tableData, "Comprehensive Income Statement", downloadExcel)

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

export default connect(null)(ComprehensiveIncomeStatement);
