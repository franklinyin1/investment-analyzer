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
      console.log('company.financials:', company.financials)
      console.log('company.presentations:', company.presentations)

      //filter financials to only include income statement items
      let financials = company.financials.filter((financial) => {
        let presentation = company.presentations.filter((presentation) => {
          return presentation.adsh === financial.adsh && presentation.stmt === 'CF'
        })
        return presentation.length > 0
      })

      console.log('financials:', financials)

      //filter financials to only include current quarter
      let currentQuarter = '20210630'
      let currentQuarterFinancials = financials.filter((financial) => {
        return financial.ddate === currentQuarter && financial.qtrs === '2'
      })

      console.log('currentQuarterFinancials:', currentQuarterFinancials)

      //add presentation detail as a key-value pair of each financial object
      currentQuarterFinancials = currentQuarterFinancials.map(financial => {
        let presentation = company.presentations.filter((presentation) => {
          return presentation.adsh === financial.adsh && presentation.stmt === 'CF' && presentation.tag === financial.tag
        })
        if (presentation.length > 0){
          financial.presentation = presentation
        } else {
          financial.presentation = [{line: Infinity}]
        }
        return financial
      })

      console.log('currentQuarterFinancials2:', currentQuarterFinancials)

      //sort the current quarter financials based on order of appearance in the income statement
      currentQuarterFinancials = currentQuarterFinancials.sort((x,y) => x.presentation[0].line - y.presentation[0].line)

      console.log('currentQuarterFinancials3:', currentQuarterFinancials)

      //remove all current quarter financials without a specified line on the income statement
      currentQuarterFinancials = currentQuarterFinancials.filter((financial) => financial.presentation[0].line !== Infinity)

      console.log('currentQuarterFinancials4:', currentQuarterFinancials)

      for (let i = 1; i < currentQuarterFinancials.length; i++) {
        let rowId = `row${i}`;
        let cell = [];
        cell.push(<td key={`cell${i}-1`}>{currentQuarterFinancials[i - 1].presentation[0].plabel}</td>);
        // cell.push(<td key={`cell${i}-1`}>{currentQuarterFinancials[i - 1].tag}</td>);
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
            <h3>Cash Flow Statement</h3>
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

export default connect(null)(CashFlowStatement);
