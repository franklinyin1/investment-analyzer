import React from "react";
import { connect } from "react-redux";

import MaterialTable from "material-table";

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

    // let rows = [
    //   [
    //     <td key={`cell${0}-1`}>Tag</td>,
    //     <td key={`cell${0}-2`}>Version</td>,
    //     <td key={`cell${0}-3`}>Period End Date</td>,
    //     <td key={`cell${0}-4`}>Quarters</td>,
    //     <td key={`cell${0}-5`}>Value</td>,
    //     <td key={`cell${0}-6`}>Unit Of Measure</td>,
    //   ],
    // ];

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

    // for (let i = 1; i < currentQuarterFinancials.length; i++) {
    //   let rowId = `row${i}`;
    //   let cell = [];
    //   cell.push(<td key={`cell${i}-1`}>{currentQuarterFinancials[i - 1].presentation[0].plabel}</td>);
    //   // cell.push(<td key={`cell${i}-1`}>{currentQuarterFinancials[i - 1].tag}</td>);
    //   cell.push(
    //     <td key={`cell${i}-2`}>{currentQuarterFinancials[i - 1].version}</td>
    //   );
    //   cell.push(
    //     <td key={`cell${i}-3`}>{currentQuarterFinancials[i - 1].ddate}</td>
    //   );
    //   cell.push(<td key={`cell${i}-4`}>{currentQuarterFinancials[i - 1].qtrs}</td>);
    //   cell.push(
    //     <td key={`cell${i}-5`}>{currentQuarterFinancials[i - 1].value.toLocaleString()}</td>
    //   );
    //   cell.push(<td key={`cell${i}-6`}>{currentQuarterFinancials[i - 1].uom}</td>);
    //   rows.push(
    //     <tr key={i} id={rowId}>
    //       {cell}
    //     </tr>
    //   );
    // }
    // }

    return (
      <React.Fragment>
        {tableData.length > 1 ? (
          <React.Fragment>
            <MaterialTable
              columns={columns}
              data={tableData}
              title="Cash Flow Statement"
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
