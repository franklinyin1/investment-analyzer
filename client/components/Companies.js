import React, { useState } from "react";
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
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  field: {
  //   marginTop: 20,
  //   marginBottom: 20,
    // display: "block",
  },
});

function Companies(props) {
  const classes = useStyles();
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(evt) {
    setTicker(evt.target.value);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    await props.fetchCompany(ticker);
    setLoading(false);
    setTicker("");
  }

  const { company } = props;

  return (
    <div>
      <form
        noValidate
        autoComplete="off"
        id="submit-company"
        onSubmit={handleSubmit}
      >
        {/* <div id="companyPrompt">
        </div> */}
        <TextField
          className={classes.field}
          label="Enter Stock Ticker"
          variant="outlined"
          onChange={handleChange}
          value={ticker}
          name="ticker"
        />
        {/* <input name="ticker"  /> */}
        <Button type="submit" variant="outlined" endIcon={<SearchIcon />}>
          Search
        </Button>
      </form>
      {loading ? <Typography variant="h6">Loading...</Typography> : ""}
      <Title company={company} />

      <Grid container spacing={3}>
        <Grid item lg={12} xl={6}>
          <CapitalizationTable company={company} />
        </Grid>
        <Grid item lg={12} xl={6}>
          <IncomeStatement company={company} />
        </Grid>
        <Grid item lg={12} xl={6}>
          <BalanceSheet company={company} />
        </Grid>
        <Grid item lg={12} xl={6}>
          <CashFlowStatement company={company} />
        </Grid>
        {/* <EquityStatement company={company} /> */}
        {/* <ComprehensiveIncomeStatement company={company} /> */}
        {/* <UnclassifiableStatement company={company} /> */}
        {/* <CoverPage company={company} /> */}
        <AllFinancials company={company} />
      </Grid>
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
