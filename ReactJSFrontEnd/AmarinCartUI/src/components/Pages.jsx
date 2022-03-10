import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";

import AddPagesModel from "./AddPagesModal";
import EditPagesModel from "./EditPagesModal";

class Pages extends Component {
  //declare an array to store data from server
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      AddPagesModelShow: false,
      EditPagesModelShow: false,
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

  render() {
    const { pages, pid, ptitle, pslug, pcontent, psorting } = this.state;

    //defining the onHide function for the entry form
    let AddPagesModelShowClose = () =>
      this.setState({ AddPagesModelShow: false });

    //defining the onHide function for the EDIT form
    let EditPagesModelShowClose = () =>
      this.setState({ EditPagesModelShow: false });

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
            alert("Success");
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
            console.log(response.status);
            if (response.ok) {
              alert("Success");
              this.refreshList();
            } else {
              alert("Failed to update; " + response.title);
            }
          },
          (error) => {
            // if (isMounted)
            alert("Failed; " + error.title);
          }
        );
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

                {/* EDIT PAGE BUTTON*/}
                {/* ///////////////////////////////////////////////// */}
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2 btn-info"
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
                      onEntered={function () {
                        console.log("onEntered ");
                      }}
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
