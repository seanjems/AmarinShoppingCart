import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";

import AddPagesModel from "./AddPagesModal";
import EditPagesModel from "./EditPagesModal";
import DetailsPagesModel from "./DetailsPagesModal";

class Pages extends Component {
  //declare an array to store data from server
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      AddPagesModelShow: false,
      EditPagesModelShow: false,
      DetailsPagesModelShow: false,
    };
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

  //On Page delete event
  handleDelete(id) {
    if (window.confirm("Are you sure about deleting?")) {
      fetch(process.env.REACT_APP_API + "pages/" + id, {
        method: "DELETE",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
      }).then(() => {
        this.refreshList();
      });
    }
  }

  render() {
    const { pages, pid, ptitle, pslug, pcontent, psorting } = this.state;

    //defining the onHide function for the entry form
    let AddPagesModelShowClose = () =>
      this.setState({ AddPagesModelShow: false });

    //defining the onHide function for the EDIT form
    let EditPagesModelShowClose = () =>
      this.setState({ EditPagesModelShow: false });

    //defining the onHide function for the Details form
    let DetailsPagesModelShowClose = () =>
      this.setState({ DetailsPagesModelShow: false });

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
          (response) => {
            if (response.status < 300) {
              alert("Success");
              this.refreshList();
            } else {
              alert(
                response.status === undefined
                  ? "Success"
                  : "Failed to update; " +
                      response.status +
                      " " +
                      response.title
              );
              this.refreshList();
            }
          },
          (error) => {
            // if (isMounted)

            if (error === undefined) {
              alert("Failed; " + error.title);
            } else {
              alert("Success");
              this.refreshList();
            }
          }
        );
      //   return () => {
      //     isMounted = false;
      //   };
    };

    //define OnUpdate fn for EDITFORM so as to update DOM
    let EditPagesModelShowUpdate = (jsondata) => {
      fetch(process.env.REACT_APP_API + "pages/" + jsondata["id"], {
        method: "PUT",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(jsondata),
      })
        .then((res) => res.json())
        .then(
          (response) => {
            if (response.status < 300) {
              alert("Success");
              this.refreshList();
            } else {
              alert(
                "Failed to update; " + response.status + " " + response.title
              );
              this.refreshList();
            }
          },
          (error) => {
            // if (isMounted)

            if (error === undefined) {
              alert("Failed; " + error.title);
            } else {
              alert("Success");
              this.refreshList();
            }
          }
        );
    };

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
            {/* Setting the width and height for pages table since data may be alot causing bootstrap to squeeze some columns */}
            <tr className="bg-light text-dark">
              <th style={{ width: "5%" }}>Id</th>
              <th style={{ width: "10%" }}>Title</th>
              <th style={{ width: "65%" }}>Content</th>
              <th style={{ width: "20%" }}></th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id}>
                <td>{page.id}</td>
                <td>{page.title}</td>
                <td style={{ height: "7em", overflow: "auto" }}>
                  {page.content}
                </td>

                {/* EDIT PAGE BUTTON*/}
                {/* ///////////////////////////////////////////////// */}
                <td>
                  <ButtonToolbar>
                    <Button
                      className="m-2 btn-info btn-sm m-1"
                      onClick={() => {
                        this.setState({
                          pid: page.id,
                          ptitle: page.title,
                          pslug: page.slug,
                          pcontent: page.content,
                          psorting: page.sorting,
                        });
                        this.setState({ EditPagesModelShow: true });
                      }}>
                      Edit
                    </Button>

                    {/* DELETE PAGE BUTTON*/}
                    {/* ///////////////////////////////////////////////// */}
                    <Button
                      className="m-2 btn-danger btn-sm m-1"
                      onClick={() => this.handleDelete(page.id)}>
                      Delete
                    </Button>

                    {/* DETAILS PAGE BUTTON*/}
                    {/* ///////////////////////////////////////////////// */}
                    <Button
                      className="m-2 btn-info btn-sm m-1"
                      onClick={() => {
                        this.setState({
                          pid: page.id,
                          ptitle: page.title,
                          pslug: page.slug,
                          pcontent: page.content,
                          psorting: page.sorting,
                        });
                        this.setState({ DetailsPagesModelShow: true });
                      }}>
                      Details
                    </Button>

                    <EditPagesModel
                      show={this.state.EditPagesModelShow}
                      onHide={EditPagesModelShowClose} //handle the madalised window close and hide events
                      onSubmit={EditPagesModelShowUpdate} //receive data from modalised window and handle post from here(parent)
                      //pass initial values to the edit window
                      pid={pid}
                      ptitle={ptitle}
                      pslug={pslug}
                      pcontent={pcontent}
                      psorting={psorting}
                    />
                    <DetailsPagesModel
                      show={this.state.DetailsPagesModelShow}
                      onHide={DetailsPagesModelShowClose} //handle the madalised window close and hide events
                      //onSubmit={DetailsPagesModelShowUpdate} //receive data from modalised window and handle post from here(parent)
                      //pass initial values to the edit window
                      pid={pid}
                      ptitle={ptitle}
                      pslug={pslug}
                      pcontent={pcontent}
                      psorting={psorting}
                    />
                  </ButtonToolbar>
                </td>

                {/* Create listener events for popup activities */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Pages;
