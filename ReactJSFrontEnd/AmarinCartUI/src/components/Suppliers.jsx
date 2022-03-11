import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";

import AddSuppliersModel from "./AddSuppliersModal";
import EditSuppliersModel from "./EditSuppliersModal";
import DetailsSuppliersModel from "./DetailsSuppliersModal";

class Suppliers extends Component {
  //declare an array to store data from server
  constructor(props) {
    super(props);

    this.state = {
      Suppliers: [],
      AddSuppliersModelShow: false,
      EditSuppliersModelShow: false,
      DetailsSuppliersModelShow: false,
    };
  }

  //method to get api data
  refreshList() {
    //let isMounted = true; // to prevent Setting DOMdata during unmounting phase
    fetch(process.env.REACT_APP_API + "suppliers")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Suppliers: data });
      });
  }

  //update Dom on initialization
  componentDidMount() {
    this.refreshList();
  }

  //On Supplier delete event
  handleDelete(id) {
    if (window.confirm("Are you sure about deleting?")) {
      fetch(process.env.REACT_APP_API + "suppliers/" + id, {
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
    const { Suppliers, psupplierid, pfullname, pcontact, pemail } = this.state;

    //defining the onHide function for the entry form
    let AddSuppliersModelShowClose = () =>
      this.setState({ AddSuppliersModelShow: false });

    //defining the onHide function for the EDIT form
    let EditSuppliersModelShowClose = () =>
      this.setState({ EditSuppliersModelShow: false });

    //defining the onHide function for the Details form
    let DetailsSuppliersModelShowClose = () =>
      this.setState({ DetailsSuppliersModelShow: false });

    //define OnUpdate fn for Entryform so as to update DOM
    let AddSuppliersModelShowUpdate = (jsondata) => {
      fetch(process.env.REACT_APP_API + "suppliers", {
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
    let EditSuppliersModelShowUpdate = (jsondata) => {
      fetch(process.env.REACT_APP_API + "Suppliers/" + jsondata["supplierID"], {
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
          <h1>Suppliers</h1>
        </div>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ AddSuppliersModelShow: true })}>
            Add Supplier
          </Button>
        </ButtonToolbar>

        {/* Create listener events for popup activities */}
        <AddSuppliersModel
          show={this.state.AddSuppliersModelShow}
          onHide={AddSuppliersModelShowClose} //handle the madalised window close and hide events
          onSubmit={AddSuppliersModelShowUpdate} //receive data from modalised window and handle post from here(parent)
        />

        {/* Bootstrap table for the list */}
        <Table
          className="mt-2 table table-bordered table-striped table-hover"
          size="sm">
          <thead>
            <tr className="bg-light text-dark">
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Suppliers.map((supplier) => (
              <tr key={supplier.supplierID}>
                <td>{supplier.fullName}</td>
                <td>{supplier.email}</td>
                <td>{supplier.contact}</td>

                {/* EDIT PAGE BUTTON*/}
                {/* ///////////////////////////////////////////////// */}
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2 btn-info btn-sm m-1"
                      onClick={() => {
                        this.setState({
                          psupplierid: supplier.supplierID,
                          pfullname: supplier.fullName,
                          pemail: supplier.email,
                          pcontact: supplier.contact,
                        });
                        this.setState({ EditSuppliersModelShow: true });
                      }}>
                      Edit
                    </Button>

                    <EditSuppliersModel
                      show={this.state.EditSuppliersModelShow}
                      onHide={EditSuppliersModelShowClose} //handle the madalised window close and hide events
                      onSubmit={EditSuppliersModelShowUpdate} //receive data from modalised window and handle post from here(parent)
                      //pass initial values to the edit window
                      psupplierid={psupplierid}
                      pfullname={pfullname}
                      pemail={pemail}
                      pcontact={pcontact}
                    />

                    {/* DELETE PAGE BUTTON*/}
                    {/* ///////////////////////////////////////////////// */}
                    <Button
                      className="mr-2 btn-danger btn-sm m-1"
                      onClick={() => this.handleDelete(supplier.supplierID)}>
                      Delete
                    </Button>

                    {/* DETAILS PAGE BUTTON*/}
                    {/* ///////////////////////////////////////////////// */}
                    <Button
                      className="mr-2 btn-success btn-sm m-1"
                      onClick={() => {
                        this.setState({
                          psupplierid: supplier.supplierID,
                          pfullname: supplier.fullName,
                          pemail: supplier.email,
                          pcontact: supplier.contact,
                        });
                        this.setState({ DetailsSuppliersModelShow: true });
                      }}>
                      Details
                    </Button>

                    <DetailsSuppliersModel
                      show={this.state.DetailsSuppliersModelShow}
                      onHide={DetailsSuppliersModelShowClose} //handle the madalised window close and hide events
                      //onSubmit={DetailsSuppliersModelShowUpdate} //receive data from modalised window and handle post from here(parent)
                      //pass initial values to the edit window

                      psupplierid={psupplierid}
                      pfullname={pfullname}
                      pemail={pemail}
                      pcontact={pcontact}
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

export default Suppliers;
