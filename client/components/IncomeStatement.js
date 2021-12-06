import React from "react";
import { connect } from "react-redux";

class IncomeStatement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { company } = this.props;
    let rows = [
      [
        <td key={`cell${0}-1`}>Tag</td>,
        <td key={`cell${0}-2`}>Version</td>,
        <td key={`cell${0}-3`}>Period End Date</td>,
        <td key={`cell${0}-4`}>Quarters</td>,
        <td key={`cell${0}-5`}>Value</td>,
        <td key={`cell${0}-6`}>Unit Of Measure</td>,
      ],
    ];
    if (company.financials) {
      for (let i = 1; i < company.financials.length; i++) {
        let rowId = `row${i}`;
        let cell = [];
        cell.push(<td key={`cell${i}-1`}>{company.financials[i - 1].tag}</td>);
        cell.push(
          <td key={`cell${i}-2`}>{company.financials[i - 1].version}</td>
        );
        cell.push(
          <td key={`cell${i}-3`}>{company.financials[i - 1].ddate}</td>
        );
        cell.push(<td key={`cell${i}-4`}>{company.financials[i - 1].qtrs}</td>);
        cell.push(
          <td key={`cell${i}-5`}>{company.financials[i - 1].value.toLocaleString()}</td>
        );
        cell.push(<td key={`cell${i}-6`}>{company.financials[i - 1].uom}</td>);
        rows.push(
          <tr key={i} id={rowId}>
            {cell}
          </tr>
        );
      }
    }

    return (
      <React.Fragment>
        {rows.length > 1 ? (
          <React.Fragment>
            <h3>Income Statement</h3>
            <table id="simple-board">
              <tbody>{rows}</tbody>
            </table>
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

export default connect(null)(IncomeStatement);
