import React from "react";
import { connect } from "react-redux";

import MaterialTable from "material-table";

import XLSX from "xlsx";

class AllFinancials extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { company } = this.props;

    let tableData = [];

    let columns = [
      { title: "Tag", field: "tag" },
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
      { title: "Line", field: "line", align: "center" },
      {
        title: "Presentation Label",
        field: "presentationLabel",
        emptyValue: () => <div>N/A</div>,
        align: "center",
      },
      {
        title: "Statement",
        field: "statement",
        emptyValue: () => <div>N/A</div>,
        align: "center",
      },
    ];

    if (company.financials) {
      let financials = company.financials;

      //add presentation detail as a key-value pair of each financial object
      financials = financials.map((financial) => {
        let presentation = company.presentations.filter((presentation) => {
          return (
            presentation.adsh === financial.adsh &&
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

      //sort the current quarter financials based on order of appearance
      financials = financials.sort(
        (x, y) => x.presentation[0].line - y.presentation[0].line
      );

      for (let i = 0; i < financials.length; i++) {
        let row = {
          tag: financials[i].tag,
          version: financials[i].version,
          periodEndDate: financials[i].ddate,
          quarters: financials[i].qtrs,
          value: financials[i].value.toLocaleString(),
          unitOfMeasure: financials[i].uom,
          line: financials[i].presentation[0].line,
          presentationLabel: financials[i].presentation[0].plabel,
          statement: financials[i].presentation[0].stmt,
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
      XLSX.utils.book_append_sheet(workBook, workSheet, "financials");

      //buffer to deal with bulk data
      let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

      //binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

      //download
      XLSX.writeFile(workBook, "financials.xlsx");
    };

    return (
      <React.Fragment>
        {tableData.length > 1 ? (
          <React.Fragment>
            <MaterialTable
              columns={columns}
              data={tableData}
              title="All Stats"
              options={{
                filtering: true,
                paging: false,
                exportButton: true,
                grouping: true,
                columnsButton: true,
                rowStyle: (data, index) =>
                  index % 2 == 0 ? { background: "#E7ECEF" } : null,
                headerStyle: { background: "#274C77", color: "white" },
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

export default AllFinancials;
