import React from "react";
import { connect } from "react-redux";

class CashFlowStatement extends React.Component {
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

      //filter financials to only include income statement items
      let financials = company.financials.filter((financial) => {
        let presentation = company.presentations.filter((presentation) => {
          return presentation.adsh === financial.adsh && presentation.stmt === 'IS'
        })
        return presentation.length > 0
      })

      //filter financials to only include current quarter
      let currentQuarter = '20210630'
      let currentQuarterFinancials = financials.filter((financial) => {
        return financial.ddate === currentQuarter && financial.qtrs === '1'
      })

      //add presentation detail as a key-value pair of each financial object
      currentQuarterFinancials = currentQuarterFinancials.map(financial => {
        let presentation = company.presentations.filter((presentation) => {
          return presentation.adsh === financial.adsh && presentation.stmt === 'IS' && presentation.tag === financial.tag
        })
        if (presentation.length > 0){
          financial.presentation = presentation
        } else {
          financial.presentation = [{line: Infinity}]
        }
        return financial
      })

      //sort the current quarter financials based on order of appearance in the income statement
      currentQuarterFinancials = currentQuarterFinancials.sort((x,y) => x.presentation[0].line - y.presentation[0].line)

      //remove all current quarter financials without a specified line on the income statement
      currentQuarterFinancials = currentQuarterFinancials.filter((financial) => financial.presentation[0].line !== Infinity)

      for (let i = 1; i < currentQuarterFinancials.length; i++) {
        let rowId = `row${i}`;
        let cell = [];
        cell.push(<td key={`cell${i}-1`}>{currentQuarterFinancials[i - 1].presentation[0].plabel}</td>);
        cell.push(
          <td key={`cell${i}-2`}>{currentQuarterFinancials[i - 1].version}</td>
        );
        cell.push(
          <td key={`cell${i}-3`}>{currentQuarterFinancials[i - 1].ddate}</td>
        );
        cell.push(<td key={`cell${i}-4`}>{currentQuarterFinancials[i - 1].qtrs}</td>);
        cell.push(
          <td key={`cell${i}-5`}>{currentQuarterFinancials[i - 1].value.toLocaleString()}</td>
        );
        cell.push(<td key={`cell${i}-6`}>{currentQuarterFinancials[i - 1].uom}</td>);
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
