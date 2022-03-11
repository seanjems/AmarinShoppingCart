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

class EditSuppliersModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierID: 0,
      accountNumber: "",
      fullName: "",
      contact: "",
      cardNumber: "",
      vatNumber: "",
      email: "",
      address: "",
      creditLimit: 0,
      deleted: true,
      company: "",
    };
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSupplierTitleChage = (event) => {
    this.setState({ fullName: event.target.value });
  };
  handleSupplierEmailChage = (event) => {
    this.setState({ email: event.target.value });
  };
  handleSupplierContactChage = (event) => {
    this.setState({ contact: event.target.value });
  };

  componentDidUpdate() {}
  onModalShown = () => {
    this.setState({
      supplierID: this.props.psupplierid,
      fullName: this.props.pfullname,
      contact: this.props.pcontact,
      email: this.props.pemail,
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
              Edit Supplier
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={12}>
                <Form typeof="submit">
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Supplier FullName</label>
                      <input
                        className="row form-control"
                        type="text"
                        defaultValue={this.props.pfullname}
                        onChange={this.handleSupplierTitleChage}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Supplier Email</label>
                      <input
                        className="row form-control"
                        type="text"
                        defaultValue={this.props.pemail}
                        onChange={this.handleSupplierEmailChage}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Supplier Contact</label>
                      <input
                        className="row form-control"
                        type="text"
                        defaultValue={this.props.pcontact}
                        onChange={this.handleSupplierContactChage}
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

export default EditSuppliersModel;
