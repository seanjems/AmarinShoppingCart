import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";

import AddProductsModel from "./AddProductsModal";
import EditProductsModel from "./EditProductsModal";
import DetailsProductsModel from "./DetailsProductsModal";

class Products extends Component {
  //declare an array to store data from server
  constructor(props) {
    super(props);

    this.state = {
      Products: [],
      AddProductsModelShow: false,
      EditProductsModelShow: false,
      DetailsProductsModelShow: false,
      suppliers: [],
      categories: [],
    };
  }

  //method to get api data
  refreshList() {
    //let isMounted = true; // to prevent Setting DOMdata during unmounting phase
    fetch(process.env.REACT_APP_API + "products")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Products: data });
      });
  }

  fetchDropdownData() {
    //fetch suppliers for the suppliers dropdownlist
    fetch(process.env.REACT_APP_API + "suppliers")
      .then((resposnse) => resposnse.json())
      .then((data) => {
        this.setState({ suppliers: data });
      });

    //fetch categories for the categories dropdown list
    fetch(process.env.REACT_APP_API + "categories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  }

  //update Dom on initialization
  componentDidMount() {
    this.refreshList();
    this.fetchDropdownData();
  }

  //On Product delete event
  handleDelete(id) {
    if (window.confirm("Are you sure about deleting?")) {
      fetch(process.env.REACT_APP_API + "products/" + id, {
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
    const {
      Products,
      pid,
      pproductname,
      pbarcode,
      pcost,
      pprice,
      pcategory,
      psupplier,
    } = this.state;

    //defining the onHide function for the entry form
    let AddProductsModelShowClose = () =>
      this.setState({ AddProductsModelShow: false });

    //defining the onHide function for the EDIT form
    let EditProductsModelShowClose = () =>
      this.setState({ EditProductsModelShow: false });

    //defining the onHide function for the Details form
    let DetailsProductsModelShowClose = () =>
      this.setState({ DetailsProductsModelShow: false });

    //define OnUpdate fn for Entryform so as to update DOM
    let AddProductsModelShowUpdate = (jsondata) => {
      fetch(process.env.REACT_APP_API + "products", {
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
    let EditProductsModelShowUpdate = (jsondata) => {
      fetch(process.env.REACT_APP_API + "Products/" + jsondata["id"], {
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
          <h1>Products</h1>
        </div>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => {
              this.setState({ AddProductsModelShow: true });
            }}>
            Add Product
          </Button>
        </ButtonToolbar>

        {/* Create listener events for popup activities */}
        <AddProductsModel
          pcategories={this.state.categories}
          psuppliers={this.state.suppliers}
          show={this.state.AddProductsModelShow}
          onHide={AddProductsModelShowClose} //handle the modalised window close and hide events
          onSubmit={AddProductsModelShowUpdate} //receive data from modalised window and handle post from here(parent)
        />

        {/* Bootstrap table for the list */}
        <Table
          className="mt-2 table table-bordered table-striped table-hover"
          size="sm">
          <thead>
            <tr className="bg-light text-dark">
              <th>Product name</th>
              <th>Barcode</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Cost</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Products.map((product) => (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.barCode}</td>
                <td>{product.category.name}</td>
                <td>{product.supplier.fullName}</td>
                <td>{product.costInclusive}</td>
                <td>{product.priceInclusive}</td>

                {/* EDIT PAGE BUTTON*/}
                {/* ///////////////////////////////////////////////// */}
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2 btn-info btn-sm m-1"
                      onClick={() => {
                        this.setState({
                          pid: product.id,
                          pproductname: product.productName,
                          pcost: product.costInclusive,
                          pprice: product.priceInclusive,
                          pbarcode: product.barCode,
                          pcategory: product.categoryId,
                          psupplier: product.supplierId,
                        });
                        this.setState({ EditProductsModelShow: true });
                      }}>
                      Edit
                    </Button>

                    {/* DELETE PAGE BUTTON*/}
                    {/* ///////////////////////////////////////////////// */}
                    <Button
                      className="mr-2 btn-danger btn-sm m-1"
                      onClick={() => this.handleDelete(product.id)}>
                      Delete
                    </Button>

                    {/* DETAILS PAGE BUTTON*/}
                    {/* ///////////////////////////////////////////////// */}
                    <Button
                      className="mr-2 btn-success btn-sm m-1"
                      onClick={() => {
                        this.setState({
                          pid: product.id,
                          pproductname: product.productName,
                          pcost: product.costInclusive,
                          pprice: product.priceInclusive,
                          pbarcode: product.barCode,
                          pcategory: product.categoryId,
                          psupplier: product.supplierId,
                        });
                        this.setState({ DetailsProductsModelShow: true });
                      }}>
                      Details
                    </Button>

                    <EditProductsModel
                      show={this.state.EditProductsModelShow}
                      onHide={EditProductsModelShowClose} //handle the modalised window close and hide events
                      onSubmit={EditProductsModelShowUpdate} //receive data from modalised window and handle post from here(parent)
                      //pass initial values to the edit window
                      pid={pid}
                      pproductname={pproductname}
                      pcost={pcost}
                      pprice={pprice}
                      pcategories={this.state.categories}
                      psuppliers={this.state.suppliers}
                      pbarcode={pbarcode}
                      psupplier={psupplier}
                      pcategory={pcategory}
                    />

                    <DetailsProductsModel
                      show={this.state.DetailsProductsModelShow}
                      onHide={DetailsProductsModelShowClose} //handle the modalised window close and hide events
                      //onSubmit={DetailsProductsModelShowUpdate} //receive data from modalised window and handle post from here(parent)
                      //pass initial values to the edit window

                      pid={pid}
                      pproductname={pproductname}
                      pcost={pcost}
                      pprice={pprice}
                      pcategories={this.state.categories}
                      psuppliers={this.state.suppliers}
                      pbarcode={pbarcode}
                      psupplier={psupplier}
                      pcategory={pcategory}
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

export default Products;
