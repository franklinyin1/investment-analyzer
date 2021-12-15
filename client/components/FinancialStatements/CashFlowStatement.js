import React from "react";
import { connect } from "react-redux";

import CreateMaterialTable from "../../helper-functions/CreateMaterialTable"

import XLSX from "xlsx";

class CashFlowStatement extends React.Component {
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


    if (company.financials) {
      //filter financials to only include income statement items
      let financials = company.financials.filter((financial) => {
        let presentation = company.presentations.filter((presentation) => {
          return (
            presentation.adsh === financial.adsh &&
            presentation.stmt === "CF" &&
            presentation.tag === financial.tag
          );
        });
        return presentation.length > 0;
      });

      //filter financials to only include current quarter
      let currentQuarter = "20210630";
      let currentQuarterFinancials = financials.filter((financial) => {
        return financial.ddate === currentQuarter && financial.qtrs === "2";
      });

      //add presentation detail as a key-value pair of each financial object
      currentQuarterFinancials = currentQuarterFinancials.map((financial) => {
        let presentation = company.presentations.filter((presentation) => {
          return (
            presentation.adsh === financial.adsh &&
            presentation.stmt === "CF" &&
            presentation.tag === financial.tag
          );
        });
        if (presentation.length > 0) {
          financial.presentation = presentation;
        } else {
          financial.presentation = [{ line: Infinity }];
        }
        return financial;
      });

      //sort the current quarter financials based on order of appearance in the income statement
      currentQuarterFinancials = currentQuarterFinancials.sort(
        (x, y) => x.presentation[0].line - y.presentation[0].line
      );

      //remove all current quarter financials without a specified line on the income statement
      currentQuarterFinancials = currentQuarterFinancials.filter(
        (financial) => financial.presentation[0].line !== Infinity
      );

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

    let materialTable = CreateMaterialTable(columns, tableData, "Cash Flow Statement", downloadExcel)

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

export default connect(null)(CashFlowStatement);
