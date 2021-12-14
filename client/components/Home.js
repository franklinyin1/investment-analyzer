import React from "react";
import { connect } from "react-redux";

import { fetchCompany } from "../store/company";

import IncomeStatement from "./FinancialStatements/IncomeStatement";
import BalanceSheet from "./FinancialStatements/BalanceSheet";
import CashFlowStatement from "./FinancialStatements/CashFlowStatement";
import EquityStatement from "./FinancialStatements/EquityStatement";
import ComprehensiveIncomeStatement from "./FinancialStatements/ComprehensiveIncomeStatement";
import UnclassifiableStatement from "./FinancialStatements/UnclassifiableStatement";
import CoverPage from "./FinancialStatements/CoverPage";

import MaterialTable from "material-table";

import XLSX from "xlsx";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    this.setState({ loading: true });
    await this.props.fetchCompany(this.state.ticker);
    this.setState({ ticker: "", loading: false });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { ticker, loading } = this.state;
    const { company } = this.props;

    let tableData = [];

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

      //sort the current quarter financials based on order of appearance in the income statement
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
        <form id="submit-company" onSubmit={handleSubmit}>
          <div id="companyPrompt">
            <label htmlFor="ticker">
              <span>Enter Stock Ticker:</span>
            </label>
          </div>
          <input name="ticker" onChange={handleChange} value={ticker} />
          <button type="submit">Submit</button>
        </form>
        {loading ? <h3>Loading...</h3> : ""}
        {tableData.length > 0 ? (
          <React.Fragment>
            <h2>
              Displaying the financial data of: {company.company.title} (
              {company.company.ticker})
            </h2>
            <IncomeStatement company={company} />
            <BalanceSheet company={company} />
            <CashFlowStatement company={company} />
            <EquityStatement company={company} />
            <ComprehensiveIncomeStatement company={company} />
            <UnclassifiableStatement company={company} />
            <CoverPage company={company} />
            <h1></h1>
            <div>
              <MaterialTable
                columns={[
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
                ]}
                data={tableData}
                title="All Stats"
                options={{
                  filtering: true,
                  paging: false,
                  exportButton: true,
                  grouping: true,
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
            </div>
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
const mapState = (state) => {
  return {
    username: state.auth.username,
    company: state.company,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCompany: (ticker) => dispatch(fetchCompany(ticker)),
  };
};

export default connect(mapState, mapDispatch)(Home);
