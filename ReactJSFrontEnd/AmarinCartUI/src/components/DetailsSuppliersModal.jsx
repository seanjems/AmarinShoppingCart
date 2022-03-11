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

//main class for  form
class DetailsCategoryModel extends Component {
  constructor(props) {
    super(props);

    //Receive Initial details data from parent
    this.state = {
      id: 0,
      name: "",
      slug: "",
      sorting: 100,
    };
  }

  //   Update the state and controls on change event
  handleCategoryTitleChage = (event) => {
    this.setState({ title: event.target.value });
  };

  componentDidUpdate() {}
  onModalShown = () => {
    this.setState({
      id: this.props.pid,
      slug: this.props.pslug,
      sorting: this.props.psorting,
      name: this.props.pname,
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
          {/* Calling the custom notification class when modal popup showsup */}
          <Notifier onShown={this.onModalShown} />
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Details Category for{" "}
              <input
                className="pr-0 pl-0"
                type="text"
                disabled
                defaultValue={this.props.pname}></input>
              <span className="badge badge-small ">this.props.pname</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Update textboxes when popup shows */}

            <Row>
              <Col sm={12}>
                <Form>
                  <Form.Group>
                    <label className="row col p-2">Id</label>
                    <Form.Control
                      className="row form-control col p-2"
                      type="text"
                      defaultValue={this.props.pid}
                      name="id"
                      disabled
                    />
                    <div className="col p-2">
                      <label className="row">Category name</label>
                      <input
                        className="row form-control"
                        defaultValue={this.props.pname}
                        onChange={this.handleCategoryTitleChage}
                        type="text"
                        disabled
                      />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Slug</label>
                      <input
                        className="row form-control"
                        onChange={this.handleCategoryTitleChage}
                        type="text"
                        disabled
                        defaultValue={this.props.pslug}
                      />
                    </div>
                  </Form.Group>
                </Form>
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

export default DetailsCategoryModel;
