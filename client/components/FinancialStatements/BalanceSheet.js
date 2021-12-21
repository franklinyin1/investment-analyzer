import React from "react";
import { connect } from "react-redux";

import createMaterialTable from "../../helper-functions/createMaterialTable"

import XLSX from "xlsx";

import filterFinancials from '../../helper-functions/filterFinancials'

import convertDateAndQuartersToFiscalPeriod from "../../helper-functions/convertDateToQuarter";

import determineNumQtrs from "../../helper-functions/determineNumQtrs";

class BalanceSheet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { company } = this.props;

    let columns

    let tableData = [];

    if (company.financials) {

      let currentQuarter = '20210630'
      let statementName = 'BS'
      let quarters = determineNumQtrs(company.submissions, currentQuarter, statementName)
      let priorQuarter = '20201231'

      let currentFiscalPeriod = convertDateAndQuartersToFiscalPeriod(currentQuarter, quarters)
      let priorFiscalPeriod = convertDateAndQuartersToFiscalPeriod(priorQuarter, quarters)


      let oneMillion = 1000000

      columns = [
        { title: "$ in millions, unless otherwise noted", field: "presentationLabel" },
        { title: priorFiscalPeriod,
          field: "priorValue",
          align: "center",
        },
        { title: currentFiscalPeriod, field: "currentValue", align: "center" },
        {
          title: "Tag",
          field: "tag",
          align: "center",
        },
        { title: "YTD Growth", field: "YTDGrowth"}
      ];

      let currentQuarterFinancials = filterFinancials(company, 'BS', currentQuarter, quarters)

      let priorQuarterFinancials = filterFinancials(company, 'BS', priorQuarter, quarters)

      let YTDGrowthRates = []

      for (let i = 0; i < currentQuarterFinancials.length; i++){
        YTDGrowthRates[i] = Number(currentQuarterFinancials[i].value)/Number(priorQuarterFinancials[i].value) - 1
      }

      for (let i = 0; i < currentQuarterFinancials.length; i++) {
        let row = {
          tag: currentQuarterFinancials[i].tag,
          presentationLabel: currentQuarterFinancials[i].presentation[0].plabel,
          priorValue: (priorQuarterFinancials[i].value/oneMillion).toLocaleString(),
          currentValue: (currentQuarterFinancials[i].value/oneMillion).toLocaleString(),
          YTDGrowth: Math.round(YTDGrowthRates[i]*100) + '%'
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

    let materialTable = createMaterialTable(columns, tableData, "Balance Sheet", downloadExcel)

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

export default connect(null)(BalanceSheet);
