import React from "react";
import { connect } from "react-redux";

import { fetchTags } from "../store/tags";

import MaterialTable from "material-table";

import XLSX from "xlsx";

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.props.fetchTags();
    this.setState({ loading: false });
  }

  render() {
    const { tags } = this.props;
    const { loading } = this.state

    let tableData = [];

    let columns = [
      { title: "Tag", field: "tag" },
      { title: "Version", field: "version", align: "center" },
      {
        title: "Custom",
        field: "custom",
        align: "center",
      },
      { title: "Abstract", field: "abstract", align: "center" },
      { title: "CRDR", field: "crdr", align: "center" },
      {
        title: "Datatype",
        field: "datatype",
        align: "center",
      },
      { title: "Doc", field: "doc", align: "center" },
      {
        title: "IORD",
        field: "iord",
        align: "center",
      },
      {
        title: "TLabel",
        field: "tlabel",
        align: "center",
      },
    ];

    if (tags) {
      for (let i = 0; i < tags.length; i++) {
        let row = {
          tag: tags[i].tag,
          version: tags[i].version,
          custom: tags[i].custom,
          abstract: tags[i].abstract,
          crdr: tags[i].crdr,
          datatype: tags[i].datatype,
          doc: tags[i].doc,
          iord: tags[i].iord,
          tlabel: tags[i].tlabel,
        };
        tableData.push(row);
      }
    }

    const downloadExcel = () => {
      const newData = tableData.map((row) => {
        delete row.tableData;
        return row;
      });
      const workSheet = XLSX.utils.json_to_sheet(newData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "financials");

      //buffer to deal with bulk data
      let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

      //binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

      //download
      XLSX.writeFile(workBook, "financials.xlsx");
    };

    return (
      <React.Fragment>
        {loading ? <h3>Loading...</h3> : ""}
        {tableData.length > 1 ? (
          <React.Fragment>
            <MaterialTable
              columns={columns}
              data={tableData}
              title="Tags"
              options={{
                filtering: true,
                // paging: false,
                exportButton: true,
                grouping: true,
                columnsButton: true,
                rowStyle: (data, index) =>
                  index % 2 == 0 ? { background: "#f5f5f5" } : null,
                headerStyle: { background: "#00004d", color: "white" },
                pageSizeOptions: [50, 100, 250, 1000, 5000, 10000],
                pageSize: 1000
              }}
              actions={[
                {
                  icon: () => <button>Export to Excel</button>,
                  tooltip: "Export to Excel",
                  onClick: () => downloadExcel(),
                  isFreeAction: true,
                },
              ]}
            />
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
    tags: state.tags,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTags: () => dispatch(fetchTags()),
  };
};

export default connect(mapState, mapDispatch)(Tags);
