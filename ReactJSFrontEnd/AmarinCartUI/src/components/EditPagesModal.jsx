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
class EditPageModel extends Component {
  constructor(props) {
    super(props);

    //Receive Initial edit data from parent
    this.state = {
      id: 0,
      title: "",
      slug: "",
      content: "",
      sorting: 100,
    };
  }

  handleKeyDown = (event) => {
    console.log("A key was pressed", event.keyCode);
  };
  //   Update the state and controls on change event
  handlePageTitleChage = (event) => {
    this.setState({ title: event.target.value });
  };

  handlePageContentChage = (event) => {
    this.setState({ content: event.target.value });
  };

  componentDidUpdate() {}
  onModalShown = () => {
    this.setState({
      id: this.props.pid,
      slug: this.props.pslug,
      sorting: this.props.psorting,
      content: this.props.pcontent,
      title: this.props.ptitle,
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
              Edit Page
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Update textboxes when popup shows */}

            <Row>
              <Col sm={12}>
                <Form>
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Page Title</label>
                      <input
                        className="row form-control"
                        type="text"
                        defaultValue={this.props.ptitle}
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
                        defaultValue={this.props.pcontent}
                        type="text"
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

export default EditPageModel;
