import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

class AddPagesModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      slug: "",
      content: "",
      sorting: 100,
    };
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
  handlePageTitleChage = (event) => {
    this.setState({ title: event.target.value });
  };

  handlePageContentChage = (event) => {
    this.setState({ content: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Page
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={12}>
                <Form typeof="submit">
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Page Title</label>
                      <input
                        className="row form-control"
                        type="text"
                        value={this.state.title}
                        onChange={this.handlePageTitleChage}
                      />
                    </div>
                  </Form.Group>

                  {/* Content text area */}
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Page Content</label>
                      <textarea
                        className="row form-control"
                        type="text"
                        value={this.state.content}
                        onChange={this.handlePageContentChage}></textarea>
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

export default AddPagesModel;
