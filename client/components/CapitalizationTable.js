import React from "react";
import { connect } from "react-redux";

import createMaterialTable from "../helper-functions/CapitalizationTable/createMaterialTable"

import XLSX from "xlsx";

class CapitalizationTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { company } = this.props;

    //tag, source, presentation label, value
    let capitalizationTableStats = [
      ['CommonStockSharesOutstanding','Filing', 'Common Stock Shares Outstanding', null],
      ['StockPrice','API', 'Stock Price', null],
      ['MarketCap','Calculated', 'Market Cap', null],
      ['LongTermDebtAndCapitalLeaseObligations','Filing', 'Total Debt', null],
      ['ConvertiblePreferredStockNonredeemableOrRedeemableIssuerOptionValue','Filing', 'Preferred Stock', null],
      ['LiabilitiesCurrent','Filing', 'Current Liabilities', null],
      ['TotalAssetValue','Calculated', 'Total Asset Value', null],
      ['AssetsCurrent','Filing', 'Current Assets', null],
      ['EnterpriseValue','Calculated', 'Enterprise Value', null]
    ]

    let columns

    let tableData = [];

    if (company.financials) {

      let currentQuarter = '20210630'
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

      console.log('company.financials:', company.financials)

      //filter financials to only include current quarter balance sheet items
      let financials = company.financials.filter((financial) => {
        return financial.ddate === currentQuarter && financial.qtrs === '0'
      })

      console.log('financials:', financials)

      //first, let's filter the capitalization table stats so that we only grab ones where we can fill in the info using financial filings
      let filingData = capitalizationTableStats.filter((stat) => {
        return stat[1] === 'Filing'
      })

      //next, let's replace the second element of each filing data array entry with the actual value containedin the filings
      filingData = filingData.map((data) => {
        let tag = data[0]
        let filingFinancial = financials.filter((financial) => {
          return financial.tag === tag
        })
        console.log('filingFinancial:', filingFinancial)
        return [data[0], filingFinancial[0].value/oneMillion]
      })

      console.log('filingData:', filingData)

      //next, let's update the capitalizationTableStats so that any items contained in SEC filings or determined through APIs are updated
      capitalizationTableStats = capitalizationTableStats.map((statistic) => {
        if (statistic[1] !== 'Filing' && statistic[1] !== 'API') {
          return statistic
        } else if (statistic[1] === 'Filing') {
          let populatedData = filingData.filter((data) => {
            return data[0] === statistic[0]
          })
          if (populatedData.length) {
            return [statistic[0], statistic[1], statistic[2], populatedData[0][1]]
          } else {
            return [statistic[0], statistic[1], statistic[2], 0]
          }
        } else if (statistic[1] === 'API') {
          return [statistic[0], statistic[1], statistic[2], Number(company.priceData['05. price'])]
        }
      })

      //next, let's update the calculated statistics
      for (let i = 0 ; i < capitalizationTableStats.length; i++){
        console.log('capitalizationTableStats:', capitalizationTableStats)
        // let currentStatistic = capitalizationTableStats[i]
        if (capitalizationTableStats[i][1] !== 'Calculated') {
          continue
        } else {
          if (capitalizationTableStats[i][0] === 'MarketCap') {
            console.log('entered market cap')
            capitalizationTableStats[i][3] = capitalizationTableStats[0][3] * capitalizationTableStats[1][3]
          } else if (capitalizationTableStats[i][0] === 'TotalAssetValue') {
            console.log('entered total asset value')
            capitalizationTableStats[i][3] = capitalizationTableStats[2][3] + capitalizationTableStats[3][3] + capitalizationTableStats[4][3] + capitalizationTableStats[5][3]
          } else if (capitalizationTableStats[i][0] === 'EnterpriseValue') {
            console.log('entered enterprise value')
            capitalizationTableStats[i][3] = capitalizationTableStats[6][3] - capitalizationTableStats[7][3]
          }
        }
      }

      // capitalizationTableStats = capitalizationTableStats.map((statistic) => {
      //   if (statistic[1] !== 'Calculated') {
      //     return statistic
      //   } else {
      //     if (statistic[0] === 'MarketCap') {
      //       //shares outstanding times share preice
      //       return [statistic[0], statistic[1], statistic[2], capitalizationTableStats[0][3] * capitalizationTableStats[1][3]]
      //     } else if (statistic[0] === 'TotalAssetValue') {
      //       console.log('capitalizationTableStats:', capitalizationTableStats)
      //       console.log('capitalizationTableStats[2][3]:', capitalizationTableStats[2][3])
      //       console.log('capitalizationTableStats[3][3]:', capitalizationTableStats[3][3])
      //       console.log('capitalizationTableStats[4][3]:', capitalizationTableStats[4][3])
      //       console.log('capitalizationTableStats[5][3]:', capitalizationTableStats[5][3])
      //       return [statistic[0], statistic[1], statistic[2], capitalizationTableStats[2][3] + capitalizationTableStats[3][3] + capitalizationTableStats[4][3] + capitalizationTableStats[5][3]]
      //     } else if (statistic[0] === 'EnterpriseValue') {
      //       return [statistic[0], statistic[1], statistic[2], capitalizationTableStats[6][3] - capitalizationTableStats[7][3]]
      //     }
      //   }
      // })

      for (let i = 0; i < capitalizationTableStats.length; i++) {
        let row = {
          tag: capitalizationTableStats[i][0],
          presentationLabel: capitalizationTableStats[i][2],
          value: Math.round(capitalizationTableStats[i][3]).toLocaleString(),
          // priorValue: (priorQuarterFinancials[i].value/oneMillion).toLocaleString(),
          // currentValue: (currentQuarterFinancials[i].value/oneMillion).toLocaleString(),
          // growth: Math.round(growthRates[i]*100) + '%'
        };

        tableData.push(row);
      }

      console.log('tableData:', tableData)
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
