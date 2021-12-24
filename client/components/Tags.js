import React from "react";
import { connect } from "react-redux";

import { fetchTags } from "../store/tags";

class Tags extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log('entered componentDidMount')
    this.props.fetchTags()
  }

  render() {
    const {tags} = this.props
    console.log('tags:', tags)

    return (
      <React.Fragment>
        <div>Hello</div>
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
    tags: state.tags,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTags: () => dispatch(fetchTags()),
  };
};

export default connect(mapState, mapDispatch)(Tags);
