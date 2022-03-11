import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";

import AddCategoriesModel from "./AddCategoriesModal";
import EditCategoriesModel from "./EditCategoriesModal";
import DetailsCategoriesModel from "./DetailsCategoriesModal";

class Categories extends Component {
  //declare an array to store data from server
  constructor(props) {
    super(props);

    this.state = {
      Categories: [],
      AddCategoriesModelShow: false,
      EditCategoriesModelShow: false,
      DetailsCategoriesModelShow: false,
    };
  }

  //method to get api data
  refreshList() {
    //let isMounted = true; // to prevent Setting DOMdata during unmounting phase
    fetch(process.env.REACT_APP_API + "categories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Categories: data });
      });
  }

  //update Dom on initialization
  componentDidMount() {
    this.refreshList();
  }

  //On Category delete event
  handleDelete(id) {
    if (window.confirm("Are you sure about deleting?")) {
      fetch(process.env.REACT_APP_API + "categories/" + id, {
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
    const { Categories, pid, pname, pslug, psorting } = this.state;

    //defining the onHide function for the entry form
    let AddCategoriesModelShowClose = () =>
      this.setState({ AddCategoriesModelShow: false });

    //defining the onHide function for the EDIT form
    let EditCategoriesModelShowClose = () =>
      this.setState({ EditCategoriesModelShow: false });

    //defining the onHide function for the Details form
    let DetailsCategoriesModelShowClose = () =>
      this.setState({ DetailsCategoriesModelShow: false });

    //define OnUpdate fn for Entryform so as to update DOM
    let AddCategoriesModelShowUpdate = (jsondata) => {
      fetch(process.env.REACT_APP_API + "categories", {
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
    let EditCategoriesModelShowUpdate = (jsondata) => {
      fetch(process.env.REACT_APP_API + "Categories/" + jsondata["id"], {
        method: "PUT",
        headers: {
          accept: "application/json",
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
          <h1>Categories</h1>
        </div>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ AddCategoriesModelShow: true })}>
            Add Category
          </Button>
        </ButtonToolbar>

        {/* Create listener events for popup activities */}
        <AddCategoriesModel
          show={this.state.AddCategoriesModelShow}
          onHide={AddCategoriesModelShowClose} //handle the madalised window close and hide events
          onSubmit={AddCategoriesModelShowUpdate} //receive data from modalised window and handle post from here(parent)
        />

        {/* Bootstrap table for the list */}
        <Table
          className="mt-2 table table-bordered table-striped table-hover"
          size="sm">
          <thead>
            <tr className="bg-light text-dark">
              <th>Id</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>

                {/* EDIT PAGE BUTTON*/}
                {/* ///////////////////////////////////////////////// */}
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2 btn-info btn-sm m-1"
                      onClick={() => {
                        this.setState({
                          pid: category.id,
                          pname: category.name,
                          pslug: category.slug,
                          psorting: category.sorting,
                        });
                        this.setState({ EditCategoriesModelShow: true });
                      }}>
                      Edit
                    </Button>

                    <EditCategoriesModel
                      show={this.state.EditCategoriesModelShow}
                      onHide={EditCategoriesModelShowClose} //handle the madalised window close and hide events
                      onSubmit={EditCategoriesModelShowUpdate} //receive data from modalised window and handle post from here(parent)
                      //pass initial values to the edit window
                      pid={pid}
                      pname={pname}
                      pslug={pslug}
                      psorting={psorting}
                    />

                    {/* DELETE PAGE BUTTON*/}
                    {/* ///////////////////////////////////////////////// */}
                    <Button
                      className="mr-2 btn-danger btn-sm m-1"
                      onClick={() => this.handleDelete(category.id)}>
                      Delete
                    </Button>

                    {/* DETAILS PAGE BUTTON*/}
                    {/* ///////////////////////////////////////////////// */}
                    <Button
                      className="mr-2 btn-success btn-sm m-1"
                      onClick={() => {
                        this.setState({
                          pid: category.id,
                          pname: category.name,
                          pslug: category.slug,
                          psorting: category.sorting,
                        });
                        this.setState({ DetailsCategoriesModelShow: true });
                      }}>
                      Details
                    </Button>

                    <DetailsCategoriesModel
                      show={this.state.DetailsCategoriesModelShow}
                      onHide={DetailsCategoriesModelShowClose} //handle the madalised window close and hide events
                      //onSubmit={DetailsCategoriesModelShowUpdate} //receive data from modalised window and handle post from here(parent)
                      //pass initial values to the edit window

                      pid={pid}
                      pname={pname}
                      pslug={pslug}
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

export default Categories;
