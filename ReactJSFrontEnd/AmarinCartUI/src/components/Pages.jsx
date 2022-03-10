import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";

import AddPagesModel from "./AddPagesModal";

class Pages extends Component {
  //declare an array to store data from server
  constructor(props) {
    super(props);
    this.state = { pages: [], AddPagesModelShow: false };
  }

  //method to get api data
  refreshList() {
    //let isMounted = true; // to prevent Setting DOMdata during unmounting phase
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

  render() {
    const { pages } = this.state;
    //defining the onHide function for the entry form
    let AddPagesModelShowClose = () =>
      this.setState({ AddPagesModelShow: false });

    //define OnUpdate fn for Entryform so as to update DOM
    let AddPagesModelShowUpdate = (jsondata) => {
      fetch(process.env.REACT_APP_API + "pages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsondata),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result === "" ? "Success" : result);
            this.refreshList();
          },
          (error) => {
            // if (isMounted)
            alert("Failed");
          }
        );
      //   return () => {
      //     isMounted = false;
      //   };
    };

    //On form submission method Raised event fromchild

    return (
      <div className="mt-2 justify-content-left">
        <div className="row">
          <h1>Pages</h1>
        </div>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ AddPagesModelShow: true })}>
            Add Page
          </Button>
        </ButtonToolbar>

        {/* Create listener events for popup activities */}
        <AddPagesModel
          show={this.state.AddPagesModelShow}
          onHide={AddPagesModelShowClose} //handle the madalised window close and hide events
          onSubmit={AddPagesModelShowUpdate} //receive data from modalised window and handle post from here(parent)
        />

        {/* Bootstrap table for the list */}
        <Table
          className="mt-2 table table-bordered table-striped table-hover"
          size="sm">
          <thead>
            <tr className="bg-light text-dark">
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
