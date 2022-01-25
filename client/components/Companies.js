import React, {useState} from "react";
import { connect } from "react-redux";

import { fetchCompany } from "../store/company";

import IncomeStatement from "./FinancialStatements/IncomeStatement";
import BalanceSheet from "./FinancialStatements/BalanceSheet";
import CashFlowStatement from "./FinancialStatements/CashFlowStatement";

import AllFinancials from "./AllFinancials";
import Title from "./Title";
import CapitalizationTable from "./CapitalizationTable/CapitalizationTable";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

function Companies(props) {
  const [ticker, setTicker] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(evt) {
    setTicker({[evt.target.name]: evt.target.value})
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true)
    await props.fetchCompany(state.ticker);
    setLoading(false)
    setTicker(')')
  }

  const { company } = props;

  return (
    <div id="companies">
      <form noValidate autoComplete="off" id="submit-company" onSubmit={handleSubmit}>
        {/* <div id="companyPrompt">
        </div> */}
        <TextField
          label="Enter Stock Ticker"
          variant="outlined"
          onChange={handleChange} value={ticker}
          name="ticker"
        />
        {/* <input name="ticker"  /> */}
        <Button type="submit" variant="outlined" endIcon={<SearchIcon />}>Search</Button>
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
