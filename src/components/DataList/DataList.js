import React from 'react';
import Papa from 'papaparse';
import { Table } from 'react-bootstrap';

// import { withRouter } from 'react-router-dom';

class DataList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getCsvData();
  }

  fetchCsv() {
    return fetch('/cities.csv').then(function (response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder('utf-8');

      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    });
  }

  getData(result) {
    this.setState({ data: result.data });
  }

  async getCsvData() {
    let csvData = await this.fetchCsv();

    Papa.parse(csvData, {
      complete: this.getData
    });
  }


  render() {
    this.items = this.state.data.map((item, key) =>
      <tr>
        {item.map((col, colkey) =>
          <th>{col}</th>
        )}
      </tr>
    );

    return (
      <Table striped bordered hover>
        {this.state.data && this.items}
      </Table>
    );
  }
}

// export default withRouter(DataController);
export default DataList;