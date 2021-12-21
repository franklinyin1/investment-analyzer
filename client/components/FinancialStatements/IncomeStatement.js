import React from "react";
import { connect } from "react-redux";

import createMaterialTable from "../../helper-functions/createMaterialTable"

import XLSX from "xlsx";

import filterFinancials from '../../helper-functions/filterFinancials'

import convertDateAndQuartersToFiscalPeriod from "../../helper-functions/convertDateToQuarter";

class IncomeStatement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { company } = this.props;

    let currentQuarter = '20210630'
    let quarters = '1'
    let priorQuarter = '20200630'

    let currentFiscalPeriod = convertDateAndQuartersToFiscalPeriod(currentQuarter, quarters)
    let priorFiscalPeriod = convertDateAndQuartersToFiscalPeriod(priorQuarter, quarters)

    let tableData = [];

    let oneMillion = 1000000

    let columns = [
      { title: "$ in millions, unless otherwise noted", field: "presentationLabel" },
      { title: priorFiscalPeriod, field: "priorValue", align: "center"},
      { title: currentFiscalPeriod, field: "currentValue", align: "center" },
      { title: "Tag", field: "tag" },
      { title: "QoQ Growth", field: "QoQGrowth"}
    ]

    if (company.financials) {

      let currentQuarterFinancials = filterFinancials(company, 'IS', currentQuarter, quarters)

      // //convert all expenses to negative
      // currentQuarterFinancials = currentQuarterFinancials.map(financial => {
      //   if (financial.tag.includes("Expense") || financial.tag.includes("Cost")) {
      //     return {...financial, value: financial.value*-1}
      //   } else {
      //     return financial
      //   }
      // })

      let priorQuarterFinancials = filterFinancials(company, 'IS', priorQuarter, quarters)

      // //convert all expenses to negative
      // priorQuarterFinancials = priorQuarterFinancials.map(financial => {
      //   if (financial.tag.includes("Expense") || financial.tag.includes("Cost")) {
      //     return {...financial, value: financial.value*-1}
      //   } else {
      //     return financial
      //   }
      // })

      let QoQGrowthRates = []

      for (let i = 0; i < currentQuarterFinancials.length; i++){
        QoQGrowthRates[i] = Number(currentQuarterFinancials[i].value)/Number(priorQuarterFinancials[i].value) - 1
      }


      for (let i = 0; i < currentQuarterFinancials.length; i++) {
        let row = {
          tag: currentQuarterFinancials[i].tag,
          presentationLabel: currentQuarterFinancials[i].presentation[0].plabel,
          priorValue: (priorQuarterFinancials[i].value/oneMillion).toLocaleString(),
          currentValue: (currentQuarterFinancials[i].value/oneMillion).toLocaleString(),
          QoQGrowth: Math.round(QoQGrowthRates[i]*100) + '%'
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

    let materialTable = createMaterialTable(columns, tableData, "Income Statement", downloadExcel)

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

export default connect(null)(IncomeStatement);
