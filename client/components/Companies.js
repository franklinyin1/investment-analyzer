import React, { useState } from "react";
import { connect } from "react-redux";

import { fetchCompany } from "../store/company";

import IncomeStatement from "./FinancialStatements/IncomeStatement";
import BalanceSheet from "./FinancialStatements/BalanceSheet";
import CashFlowStatement from "./FinancialStatements/CashFlowStatement";

import AllFinancials from "./AllFinancials";
import Title from "./Title";
import CapitalizationTable from "./CapitalizationTable/CapitalizationTable";

import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";

import ErrorBoundary from "./ErrorBoundary";

const useStyles = makeStyles({
  field: {
    marginBottom: 10,
    display: "block",
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
  },
});

function Companies(props) {
  const classes = useStyles();
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [priorTicker, setPriorTicker] = useState("");

  function handleChange(evt) {
    setTicker(evt.target.value);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    setPriorTicker(ticker);
    await props.fetchCompany(ticker);
    setLoading(false);
    setTicker("");
  }

  const { company } = props;

  if (company === "error") {
    return (
      <Typography variant="p">
        Apologies, something went wrong when trying to load the following stock
        ticker: {priorTicker.toUpperCase()}. Please refresh the page to
        continue.{" "}
      </Typography>
    );
  } else {
    return (
      <ErrorBoundary priorTicker={priorTicker}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            className={classes.field}
            label="Enter Stock Ticker"
            variant="outlined"
            onChange={handleChange}
            value={ticker}
            name="ticker"
            fullWidth
            placeholder="GOOG"
          />
          <Button
            type="submit"
            variant="outlined"
            endIcon={<SearchIcon />}
            className={classes.button}
          >
            Search
          </Button>
        </form>
        {loading ? <CircularProgress /> : ""}
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
        </Grid>
        <AllFinancials company={company} />
      </ErrorBoundary>
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
