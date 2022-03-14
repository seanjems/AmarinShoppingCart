import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

//CUSTOM CLASS FOR ONSHOW WINDOW EVENT

export class Notifier extends React.Component {
  componentDidMount = () => {
    this.props.onShown();
  };
  render() {
    return null;
  }
}

//main class for edit form
class EditProductsModel extends Component {
  constructor(props) {
    super(props);

    //Receive Initial edit data from parent
    this.state = {
      id: 0,
      barCode: "",
      slug: "",
      description: "",
      productName: "",
      costInclusive: 0,
      priceInclusive: 0,
      categoryId: 0,
      supplierId: 0,
      isDeleted: false,
    };
  }

  //   Update the state and controls on change event
  //handling onChage events (to consider handling them in a separate class file to ease achieve the SINGLE RESPONSIBILITY PRINICPLE) || SOLID
  handleProductNameChage = (event) => {
    this.setState({ productName: event.target.value });
  };
  handleBarcodeChage = (event) => {
    this.setState({ barCode: event.target.value });
  };

  handleCategoryChage = (event) => {
    this.setState({ categoryId: event.target.value });
  };
  handleSupplierChange = (event) => {
    this.setState({ supplierId: event.target.value });
  };
  handleCostChage = (event) => {
    this.setState({ costInclusive: event.target.value });
  };
  handlePriceChage = (event) => {
    this.setState({ priceInclusive: event.target.value });
  };

  componentDidUpdate() {}
  onModalShown = () => {
    this.setState({
      id: this.props.pid,
      barCode: this.props.pbarcode,
      productName: this.props.pproductname,
      costInclusive: this.props.cost,
      priceInclusive: this.props.pprice,
      categoryId: this.props.pcategory,
      supplierId: this.props.psupplier,
      isDeleted: this.false,
    });
  };
  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Notifier onShown={this.onModalShown} />
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Update textboxes when popup shows */}

            <Row>
              <Col sm={12}>
                <Form typeof="submit">
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Product Name</label>
                      <Form.Control
                        className="row form-control"
                        type="text"
                        onChange={this.handleProductNameChage}
                        defaultValue={this.props.pproductname}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Product Barcode</label>
                      <Form.Control
                        className="row form-control"
                        type="text"
                        onChange={this.handleBarcodeChage}
                        defaultValue={this.props.pbarcode}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Category</label>
                      <select
                        className="row form-control"
                        defaultValue={this.props.pcategory}
                        onChange={this.handleCategoryChage}>
                        <option key={null}>--Select Category--</option>
                        {this.props.pcategories.map((category) => (
                          <option value={category.id} key={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Supplier</label>
                      <select
                        className="row form-control"
                        defaultValue={this.props.psupplier}
                        onChange={this.handleSupplierChange}>
                        <option key={null}>--Select Supplier--</option>
                        {this.props.psuppliers.map((supplier) => (
                          <option
                            value={supplier.supplierID}
                            key={supplier.supplierID}>
                            {supplier.fullName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Cost price</label>
                      <Form.Control
                        className="row form-control"
                        defaultValue={this.props.pcost}
                        type="text"
                        onChange={this.handleCostChage}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Selling price</label>
                      <input
                        defaultValue={this.props.pprice}
                        className="row form-control"
                        type="text"
                        onChange={this.handlePriceChage}
                      />
                    </div>
                  </Form.Group>
                </Form>

                <Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.props.onSubmit.bind(null, this.state)}
                    className="m-2">
                    Submit
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditProductsModel;
