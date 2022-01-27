import React from "react";
import { connect } from "react-redux";

import { fetchTags } from "../store/tags";

import MaterialTable from "material-table";

import XLSX from "xlsx";

import Typography from "@material-ui/core/Typography";

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
      <div id="tags">
        {loading ? <Typography variant="h6">Loading...</Typography> : ""}
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
                  index % 2 == 0 ? { background: "#E7ECEF" } : null,
                headerStyle: { background: "#274C77", color: "white" },
                pageSizeOptions: [50, 100, 250, 1000, 5000, 10000, 15000],
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
      </div>
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
