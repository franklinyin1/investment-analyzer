import React from "react";
import { connect } from "react-redux";

import createMaterialTable from "../../helper-functions/CapitalizationTable/createMaterialTable";

import XLSX from "xlsx";

import {cashTags, debtTags, NCITags, preferredEquityTags } from "./Tags"

class CapitalizationTable extends React.Component {
  constructor(props) {
    super(props);
  }

  async render() {
    const { company } = this.props;

    let debtPLabels = new Array(debtTags.length)
    let debtValues = new Array(debtTags.length)

    let preferredEquityPLabels = new Array(preferredEquityTags.length)
    let preferredEquityValues = new Array(preferredEquityTags.length)

    let NCIPLabels = new Array(NCITags.length)
    let NCIValues = new Array(NCITags.length)

    let cashPLabels = new Array(cashTags.length)
    let cashValues = new Array(cashTags.length)


    //tag, source, presentation label, value
    let capitalizationTableStats = {
      "commonStockShares": {
        "tags": "CommonStockSharesOutstanding",
        "source": "Filing",
        "presentationLabel(s)": "Common Stock Shares Outstanding (millions of shares)",
        "values": null
      },
      "stockPrice": {
        "tags": "StockPrice",
        "source": "API",
        "presentationLabels": "Stock Price (per share)",
        "values": null
      },
      "marketCap": {
        "tags": "MarketCap",
        "source": "Calculated",
        "presentationLabels": "Market Cap",
        "values": null
      },
      "debt": {
        "tags": debtTags,
        "source": "Filing",
        "presentationLabels": debtPLabels,
        "values": debtValues
      },
      "preferredEquity": {
        "tags": preferredEquityTags,
        "source": "Filing",
        "presentationLabels": preferredEquityPLabels,
        "values": preferredEquityValues
      },
      "nonControllingInterest": {
        "tags": NCITags,
        "source": "Filing",
        "presentationLabels:": NCIPLabels,
        "values": NCIValues
      },
      "totalAssetValue": {
        "tags": "TotalAssetValue",
        "source": "Calculated",
        "presentationLabels": "Total Asset Value",
        "values": null
      },
      "cash": {
        "tags": cashTags,
        "source": "Filing",
        "presentationLabels": cashPLabels,
        "values": cashValues
      },
      "enterpriseValue": {
        "tags": "EnterpriseValue",
        "source": "Calculated",
        "presentationLabels": "Enterprise Value",
        "values": null
      }
    }

    let columns;

    let tableData = [];

    if (company.financials) {
      let currentQuarter = "20210630";

      let oneMillion = 1000000;

      let date = company.priceData["07. latest trading day"];

      columns = [
        {
          title: "$ in millions, unless otherwise noted",
          field: "presentationLabel",
        },
        { title: date, field: "value", align: "center" },
        { title: "Tag", field: "tag" },
      ];

      //filter financials to only include current quarter balance sheet items
      let financials = company.financials.filter((financial) => {
        return financial.ddate === currentQuarter && financial.qtrs === "0";
      });

      //add presentation detail as a key-value pair of each financial object
      financials = financials.map(financial => {
        let presentation = company.presentations.filter((presentation) => {
          return presentation.adsh === financial.adsh && presentation.stmt === statementName && presentation.tag === financial.tag
        })
        if (presentation.length > 0){
          financial.presentation = presentation
        } else {
          financial.presentation = [{line: Infinity}]
        }
        return financial
      })

      console.log("financials:", financials);

      //first, let's update all of the filing data in capitalization table stats
      for (const key in capitalizationTableStats) {

        let capitalizationData = capitalizationTableStats[key]

        if (capitalizationData.source === 'Calculated') {
          continue
        }

        if (capitalizationData.source === 'API') {
          //update share price
          capitalizationData.value = Number(company.priceData["05. price"])
        } else if (typeof capitalizationData.tags === "string") {
          //check if we are dealing with an array of tags, or just a single tag
          let tag = capitalizationData[0]
          let filingFinancial = financials.filter((financial) => {
            return financial.tag === tag
          })
          if (filingFinancial.length) {
            capitalizationData.values = filingFinancial[0].value / oneMillion
          } else {
            capitalizationData.values = 0
          }
        } else {
          //in this case, we are dealing with an array of tags (such as debt, pref, NCI, or cash)
          let tags = capitalizationData[0]
          for (const idx in tags) {
            let tag = tags[idx]
            let filingFinancial = financials.filter((financial) => {
              return financial.tag = tag
            })
            if (filingFinancial.length) {
              capitalizationData.values[idx] = filingFinancial[0].value / oneMillion
              capitalizationData.presentationLabels[idx] = filingFinancial[0].presentation[0].plabel
            } else {
              capitalizationData.values[idx] = 0
            }
          }
        }
      }

      //next, let's update the capitalizationTableStats for debt, preferred-equity, NCI, and cash to remove any zero-values
      for (const key in capitalizationTableStats) {

        let capitalizationData = capitalizationTableStats[key]

        if (capitalizationData.source === 'Calculated') {
          continue
        }

      }


      //next, let's update the calculated statistics
      for (const key in capitalizationTableStats) {

        let capitalizationData = capitalizationTableStats[key]

        if (capitalizationData.source !== 'Calculated') {
          continue
        }

        if (capitalizationData.tags === "MarketCap") {
          //shares outstanding * share price
          capitalizationData.values = capitalizationTableStats["commonStockShares"].values * capitalizationTableStats["stockPrice"].values
        } else if (capitalizationData.tags === "TotalAssetValue") {
          capitalizationData.values = capitalizationTableStats["marketCap"]
          for (const debtValue of capitalizationTableStats["debt"].values) {
            capitalizationData += debtValue
          }


          capitalizationTableStats[i][3] =
            //market cap
            capitalizationTableStats[2][3] +
            //total debt
            capitalizationTableStats[3][3] +
            //preferred stock
            capitalizationTableStats[4][3] +
            //current portion of long-term debt
            capitalizationTableStats[5][3];
          //long-term debt
          capitalizationTableStats[6][3];
          //use the calculated verison of long-term liabilities to ensure that current portion of long-term debt is not being double-counted
          capitalizationTableStats[8][3];
        } else if (capitalizationTableStats[i][0] === "EnterpriseValue") {
          capitalizationTableStats[i][3] =
            //total asset value less total current assets
            capitalizationTableStats[9][3] - capitalizationTableStats[10][3];
        }

      }

      //next, let's update the calculated statistics
      for (let i = 0; i < capitalizationTableStats.length; i++) {
        console.log("capitalizationTableStats:", capitalizationTableStats);
        if (capitalizationTableStats[i][1] !== "Calculated") {
          continue;
        } else {
          if (capitalizationTableStats[i][0] === "MarketCap") {
            capitalizationTableStats[i][3] =
              //shares outstanding * share price
              capitalizationTableStats[0][3] * capitalizationTableStats[1][3];
          } else if (capitalizationTableStats[i][0] === "LiabilitiesCurrent") {
            capitalizationTableStats[i][3] =
              //current liabilities
              capitalizationTableStats[7][3] -
              //current portion of long-term debt
              capitalizationTableStats[5][3];
          } else if (capitalizationTableStats[i][0] === "TotalAssetValue") {
            capitalizationTableStats[i][3] =
              //market cap
              capitalizationTableStats[2][3] +
              //total debt
              capitalizationTableStats[3][3] +
              //preferred stock
              capitalizationTableStats[4][3] +
              //current portion of long-term debt
              capitalizationTableStats[5][3];
            //long-term debt
            capitalizationTableStats[6][3];
            //use the calculated verison of long-term liabilities to ensure that current portion of long-term debt is not being double-counted
            capitalizationTableStats[8][3];
          } else if (capitalizationTableStats[i][0] === "EnterpriseValue") {
            capitalizationTableStats[i][3] =
              //total asset value less total current assets
              capitalizationTableStats[9][3] - capitalizationTableStats[10][3];
          }
        }
      }

      //filter all lines with value of 0
      capitalizationTableStats = capitalizationTableStats.filter(
        (statistic) => {
          //exclude the filing verison of total current liabilities, as we will instead show the calculated verison of total current liabilities (that excludes current portion of long-term debt)
          let notFilingVersionOfCurrentLiabilities = !(statistic[0] === 'LiabilitiesCurrent' && statistic[1] === 'Filing');
          //exclude all statistics that equal 0 as well as notFilingVersionOfCurrentLiabilities
          return statistic[3] !== 0 && notFilingVersionOfCurrentLiabilities
        }
      );

      for (let i = 0; i < capitalizationTableStats.length; i++) {
        let row = {
          tag: capitalizationTableStats[i][0],
          presentationLabel: capitalizationTableStats[i][2],
        };
        if (capitalizationTableStats[i][0] !== "StockPrice") {
          row.value = Math.round(
            capitalizationTableStats[i][3]
          ).toLocaleString();
        } else {
          row.value = capitalizationTableStats[i][3].toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          });
        }

        tableData.push(row);
      }

      console.log("tableData:", tableData);
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

    let materialTable = createMaterialTable(
      columns,
      tableData,
      "Capitalization Table",
      downloadExcel
    );

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
