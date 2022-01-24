import React from "react";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { company } = this.props;

    let fyeEndMonth
    let fyeEndDay

    let periodEndDateYear
    let periodEndDateMonth
    let periodEndDateDay

    if (company.submissions) {
      let submissions = company.submissions;
      submissions = submissions.filter((submission) => {
        return submission.form === "10-Q" || submission.form === "10-K";
      });
      let fye = submissions[0].fye;
      fyeEndMonth = fye.slice(0, 2);
      fyeEndDay = fye.slice(2, 4);

      let periodEndDate = submissions[0].period;
      periodEndDateYear = periodEndDate.slice(0, 4);
      periodEndDateMonth = periodEndDate.slice(4, 6);
      periodEndDateDay = periodEndDate.slice(6, 8);
    }

    return (
      <React.Fragment>
        {company.company ? (
          <React.Fragment>
            <Typography variant="h6">
              Displaying the financial data of: {company.company.title} (
              {company.company.ticker})
            </Typography>
            <Typography variant="div">
              For the period ending {periodEndDateYear}/{periodEndDateMonth}/
              {periodEndDateDay}. {company.company.title}'s fiscal year ends on{" "}
              {fyeEndMonth}/{fyeEndDay}
            </Typography>
            <h2></h2>
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

export default Title;
