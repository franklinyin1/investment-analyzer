import React from "react";
import { connect } from "react-redux";

import createMaterialTable from "../../helper-functions/CapitalizationTable/createMaterialTable";

import XLSX from "xlsx";

import { cashTagsAndPLabels } from "./TagsAndPLabels/CashTagsAndPLabels";
import { debtTagsAndPLabels } from "./TagsAndPLabels/DebtTagsAndPLabels";
import { NCITagsAndPLabels } from "./TagsAndPLabels/NCITagsAndPLabels";
import { preferredEquityTagsAndPLabels } from "./TagsAndPLabels/PreferredEquityTagsAndPLabels";
import { sharesoutstandingTagsAndPLabels } from "./TagsAndPLabels/SharesoutstandingTagsAndPLabels";

class CapitalizationTable extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { company } = this.props;

    let sharesoutstandingTags = [];
    let sharesoutstandingPLabels = [];
    let sharesoutstandingValues = [];
    for (const idx in sharesoutstandingTagsAndPLabels) {
      sharesoutstandingTags.push(sharesoutstandingTagsAndPLabels[idx][0]);
      sharesoutstandingPLabels.push(sharesoutstandingTagsAndPLabels[idx][1]);
      sharesoutstandingValues.push(null);
    }

    let debtTags = [];
    let debtPLabels = [];
    let debtValues = [];
    for (const idx in debtTagsAndPLabels) {
      debtTags.push(debtTagsAndPLabels[idx][0]);
      debtPLabels.push(debtTagsAndPLabels[idx][1]);
      debtValues.push(null);
    }

    let preferredEquityTags = [];
    let preferredEquityPLabels = [];
    let preferredEquityValues = [];
    for (const idx in preferredEquityTagsAndPLabels) {
      preferredEquityTags.push(preferredEquityTagsAndPLabels[idx][0]);
      preferredEquityPLabels.push(preferredEquityTagsAndPLabels[idx][1]);
      preferredEquityValues.push(null);
    }

    let NCITags = [];
    let NCIPLabels = [];
    let NCIValues = [];
    for (const idx in NCITagsAndPLabels) {
      NCITags.push(NCITagsAndPLabels[idx][0]);
      NCIPLabels.push(NCITagsAndPLabels[idx][1]);
      NCIValues.push(null);
    }

    let cashTags = [];
    let cashPLabels = [];
    let cashValues = [];
    for (const idx in cashTagsAndPLabels) {
      cashTags.push(cashTagsAndPLabels[idx][0]);
      cashPLabels.push(cashTagsAndPLabels[idx][1]);
      cashValues.push(null);
    }

    //tag, source, presentation label, value
    let capitalizationTableStats = {
      commonStockShares: {
        tags: sharesoutstandingTags,
        source: "Filing",
        presentationLabels: sharesoutstandingPLabels,
        values: sharesoutstandingValues,
      },
      stockPrice: {
        tags: "StockPrice",
        source: "API",
        presentationLabels: "Stock Price (per share)",
        values: null,
      },
      marketCap: {
        tags: "MarketCap",
        source: "Calculated",
        presentationLabels: "Market Cap",
        values: null,
      },
      debt: {
        tags: debtTags,
        source: "Filing",
        presentationLabels: debtPLabels,
        values: debtValues,
      },
      preferredEquity: {
        tags: preferredEquityTags,
        source: "Filing",
        presentationLabels: preferredEquityPLabels,
        values: preferredEquityValues,
      },
      nonControllingInterest: {
        tags: NCITags,
        source: "Filing",
        presentationLabels: NCIPLabels,
        values: NCIValues,
      },
      totalAssetValue: {
        tags: "TotalAssetValue",
        source: "Calculated",
        presentationLabels: "Total Asset Value",
        values: null,
      },
      cash: {
        tags: cashTags,
        source: "Filing",
        presentationLabels: cashPLabels,
        values: cashValues,
      },
      enterpriseValue: {
        tags: "EnterpriseValue",
        source: "Calculated",
        presentationLabels: "Enterprise Value",
        values: null,
      },
    };

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
      financials = financials.map((financial) => {
        let presentation = company.presentations.filter((presentation) => {
          return (
            presentation.adsh === financial.adsh &&
            presentation.stmt === "BS" &&
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
      financials = financials.sort(
        (x, y) => x.presentation[0].line - y.presentation[0].line
      );

      //remove all current quarter financials without a specified line on the income statement
      financials = financials.filter(
        (financial) => financial.presentation[0].line !== Infinity
      );

      //first, let's update all of the filing data in capitalization table stats
      for (const key in capitalizationTableStats) {
        let capitalizationData = capitalizationTableStats[key];
        if (capitalizationData.source === "Calculated") {
          continue;
        }
        if (capitalizationData.source === "API") {
          //update share price
          capitalizationData.values = Number(company.priceData["05. price"]);
        } else if (typeof capitalizationData.tags === "string") {
          //check if we are dealing with an array of tags, or just a single tag
          let tag = capitalizationData.tags;
          let singleFinancial = financials.filter((financial) => {
            return financial.tag === tag;
          });
          if (singleFinancial.length) {
            capitalizationData.values = singleFinancial[0].value / oneMillion;
          } else {
            capitalizationData.values = 0;
          }
        } else {
          //in this case, we are dealing with an array of tags (such as debt, pref, NCI, cash, or sharesoustanding)
          let tags = capitalizationData.tags;
          for (const idx in tags) {
            let tag = tags[idx];
            let singleFinancial = financials.filter((financial) => {
              return financial.tag === tag;
            });
            if (singleFinancial.length) {
              capitalizationData.values[idx] =
                singleFinancial[0].value / oneMillion;
              if (singleFinancial.presentation) {
                capitalizationData.presentationLabels[idx] =
                  singleFinancial[0].presentation[0].plabel;
              }
            } else {
              capitalizationData.values[idx] = 0;
            }
          }
        }
      }

      //next, let's update the capitalizationTableStats for debt, preferred-equity, NCI, and cash to remove any zero-values
      for (const key in capitalizationTableStats) {
        let capitalizationData = capitalizationTableStats[key];

        if (
          capitalizationData.source === "Calculated" ||
          capitalizationData.source === "API"
        ) {
          continue;
        }

        if (typeof capitalizationData.tags === "string") {
          continue;
        }

        //now we know we are dealing with the capitalizationTableStats for debt, preferred-equity, NCI, cash, and sharesoutstanding
        let tags = capitalizationData.tags;
        let values = capitalizationData.values;
        let presentationLabels = capitalizationData.presentationLabels;
        let idx = 0;
        while (idx < tags.length) {
          if (values[idx] === 0) {
            tags.splice(idx, 1);
            values.splice(idx, 1);
            presentationLabels.splice(idx, 1);
          } else {
            idx++;
          }
        }
      }

      //next, let's update the calculated statistics
      for (const key in capitalizationTableStats) {
        let capitalizationData = capitalizationTableStats[key];
        if (capitalizationData.source !== "Calculated") {
          continue;
        }
        if (capitalizationData.tags === "MarketCap") {
          //shares outstanding * share price
          let commonStockSharesOutstanding = 0;
          for (const sharesOutstanding of capitalizationTableStats[
            "commonStockShares"
          ].values) {
            commonStockSharesOutstanding += sharesOutstanding;
          }
          capitalizationData.values =
            commonStockSharesOutstanding *
            capitalizationTableStats["stockPrice"].values;
        } else if (capitalizationData.tags === "TotalAssetValue") {
          capitalizationData.values =
            capitalizationTableStats["marketCap"].values;
          for (const debtValue of capitalizationTableStats["debt"].values) {
            capitalizationData.values += debtValue;
          }
          for (const preferredEquityValue of capitalizationTableStats[
            "preferredEquity"
          ].values) {
            capitalizationData.values += preferredEquityValue;
          }
          for (const NCIValue of capitalizationTableStats[
            "nonControllingInterest"
          ].values) {
            capitalizationData.values += NCIValue;
          }
        } else if (capitalizationData.tags === "EnterpriseValue") {
          capitalizationData.values =
            capitalizationTableStats["totalAssetValue"].values;
          for (const cashValue of capitalizationTableStats["cash"].values) {
            capitalizationData.values -= cashValue;
          }
        }
      }

      //if market cap is 0, then we wil not display the data
      if (capitalizationTableStats["marketCap"].values !== 0) {
        //next, let's push our data into tableData
        for (const key in capitalizationTableStats) {
          let capitalizationData = capitalizationTableStats[key];
          if (typeof capitalizationData.tags === "string") {
            let row = {
              tag: capitalizationData.tags,
              presentationLabel: capitalizationData.presentationLabels,
            };

            if (capitalizationData.tags !== "StockPrice") {
              row.value = Math.round(
                capitalizationData.values
              ).toLocaleString();
            } else {
              row.value = capitalizationData.values.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });
            }
            tableData.push(row);
          } else {
            let tags = capitalizationData.tags;
            let values = capitalizationData.values;
            let presentationLabels = capitalizationData.presentationLabels;
            if (tags.length) {
              for (const idx in tags) {
                let row = {
                  tag: tags[idx],
                  value: Math.round(values[idx]).toLocaleString(),
                  presentationLabel: presentationLabels[idx],
                };
                tableData.push(row);
              }
            }
          }
        }
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

export default CapitalizationTable;
