import React from "react";
import { connect } from "react-redux";

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { company } = this.props;

    return (
      <React.Fragment>
        {company.company ? (
          <h2>
            Displaying the financial data of: {company.company.title} (
            {company.company.ticker})
          </h2>
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

export default connect(null)(Title);
