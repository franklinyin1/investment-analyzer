import React from "react";
import { connect } from "react-redux";

import { fetchCompany } from "../store/company";

import IncomeStatement from "./FinancialStatements/IncomeStatement";
import BalanceSheet from "./FinancialStatements/BalanceSheet";
import CashFlowStatement from "./FinancialStatements/CashFlowStatement";

import AllFinancials from "./AllFinancials";
import Title from "./Title";
import CapitalizationTable from "./CapitalizationTable/CapitalizationTable";

import Typography from "@material-ui/core/Typography";

class Companies extends React.Component {
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

    return (
      <div id="companies">
        <form id="submit-company" onSubmit={handleSubmit}>
          <div id="companyPrompt">
            <label htmlFor="ticker">
              <Typography variant="span">Enter Stock Ticker:</Typography>
            </label>
          </div>
          <input name="ticker" onChange={handleChange} value={ticker} />
          <button type="submit">Submit</button>
        </form>
        {loading ? <Typography variant="h6">Loading...</Typography> : ""}
        <React.Fragment>
          <Title company={company} />
          <CapitalizationTable company={company} />
          <IncomeStatement company={company} />
          <BalanceSheet company={company} />
          <CashFlowStatement company={company} />
          {/* <EquityStatement company={company} /> */}
          {/* <ComprehensiveIncomeStatement company={company} /> */}
          {/* <UnclassifiableStatement company={company} /> */}
          {/* <CoverPage company={company} /> */}
          <AllFinancials company={company} />
        </React.Fragment>
      </div>
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

export default connect(mapState, mapDispatch)(Companies);
