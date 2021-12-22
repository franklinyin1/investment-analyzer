import React from "react";
import { connect } from "react-redux";

import createMaterialTable from "../../helper-functions/createMaterialTable"

import XLSX from "xlsx";

import filterFinancials from '../../helper-functions/filterFinancials'

import convertDateAndQuartersToFiscalPeriod from "../../helper-functions/convertDateToQuarter";

import determineNumQtrs from "../../helper-functions/determineNumQtrs";
import determinePriorQtr from "../../helper-functions/determinePriorQtr";
import determineGrowthLabel from "../../helper-functions/determineGrowthLabel";

class CapitalizationTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { company } = this.props;

    let capitalizationTableStats = [
      ['CommonStockSharesOutstanding','Filing'],
      ['StockPrice','API'],
      ['MarketCap','Calculated'],
      ['LongTermDebtAndCapitalLeaseObligations','Filing'],
      ['ConvertiblePreferredStockNonredeemableOrRedeemableIssuerOptionValue','Filing'],
      ['TotalAssetValue','Calculated'],
      ['LiabilitiesCurrent','Filing'],
      ['AssetsCurrent','Filing'],
      ['TotalEnterpriseValue','Computed']
    ]

    let columns

    let tableData = [];

    if (company.financials) {

      // let currentQuarter = '20210630'
      // let statementName = 'IS'
      // let quarters = determineNumQtrs(company.submissions, currentQuarter, statementName)
      // let priorQuarter = determinePriorQtr(company.submissions, currentQuarter, statementName)
      // let growthLabel = determineGrowthLabel(company.submissions, currentQuarter, statementName)

      // let currentFiscalPeriod = convertDateAndQuartersToFiscalPeriod(currentQuarter, quarters)
      // let priorFiscalPeriod = convertDateAndQuartersToFiscalPeriod(priorQuarter, quarters)

      let oneMillion = 1000000

      let date = company.priceData['07. latest trading day']

      columns = [
        { title: "$ in millions, unless otherwise noted", field: "presentationLabel" },
        { title: date, field: "value", align: "center"},
        { title: "Tag", field: "tag" },
      ]

      // let currentQuarterFinancials = filterFinancials(company, statementName, currentQuarter, quarters)

      // let priorQuarterFinancials = filterFinancials(company, 'IS', priorQuarter, quarters)

      // let growthRates = []

      // for (let i = 0; i < currentQuarterFinancials.length; i++){
      //   growthRates[i] = Number(currentQuarterFinancials[i].value)/Number(priorQuarterFinancials[i].value) - 1
      // }

      //filter financials to only include current quarter balance sheet items
      let financials = financials.filter((financial) => {
        return financial.ddate === currentQuarter && financial.qtrs === 0
      })


      let filingData = capitalizationTableStats.filter((stat) => {
        return stat[1] === 'Filing'
      })

      for (let i = 0; i < currentQuarterFinancials.length; i++) {
        let row = {
          tag: currentQuarterFinancials[i].tag,
          presentationLabel: currentQuarterFinancials[i].presentation[0].plabel,
          // priorValue: (priorQuarterFinancials[i].value/oneMillion).toLocaleString(),
          // currentValue: (currentQuarterFinancials[i].value/oneMillion).toLocaleString(),
          // growth: Math.round(growthRates[i]*100) + '%'
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

    let materialTable = createMaterialTable(columns, tableData, "Capitalization Table", downloadExcel)

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

export default connect(null)(CapitalizationTable);
