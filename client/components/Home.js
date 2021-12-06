import React from "react";
import { connect } from "react-redux";

import { fetchCompany } from "../store/company";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.fetchCompany(this.state.ticker);
    this.setState({ ticker: "" });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { ticker } = this.state;
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
        <form id="submit-company" onSubmit={handleSubmit}>
          <div id="companyPrompt">
            <label htmlFor="ticker">
              <span>Enter Stock Ticker:</span>
            </label>
          </div>
          <input
            name="ticker"
            onChange={handleChange}
            value={ticker}
          />
          <button type="submit">Submit</button>
        </form>
        {rows.length > 1 ? (
          <React.Fragment>
            <h3>Displaying the financial data of: {company.submissions[0].name}</h3>
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

//TO BE DELETED
// export const Home = props => {
//   const {username} = props

//   return (
//     <div>
//       <h3>Welcome, {username}</h3>
//     </div>
//   )
// }
