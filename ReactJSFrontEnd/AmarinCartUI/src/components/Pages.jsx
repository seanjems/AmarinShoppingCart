import React, { Component } from "react";
import { Table } from "react-bootstrap";

class Pages extends Component {
  //declare an array to store data from server
  constructor(props) {
    super(props);
    this.state = { pages: [] };
  }

  //method to get api data
  refreshList() {
    fetch(process.env.REACT_APP_API + "pages")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pages: data });
      });
  }

  //update Dom on initialization
  componentDidMount() {
    this.refreshList();
  }

  //update DOM on DATA chage
  componentDidUpdate() {
    this.refreshList();
  }

  render() {
    const { pages } = this.state;
    return (
      <div className="mt-5 d-flex justify-content-left">
        <Table
          className="mt-4 table table-active table-bordered table-striped table-hover"
          size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Content</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id}>
                <td>{page.id}</td>
                <td>{page.title}</td>
                <td>{page.content}</td>
                <td>Edit / Delete</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Pages;
