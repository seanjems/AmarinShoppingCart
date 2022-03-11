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
class DetailsPageModel extends Component {
  constructor(props) {
    super(props);

    //Receive Initial details data from parent
    this.state = {
      id: 0,
      title: "",
      slug: "",
      content: "",
      sorting: 100,
    };
  }

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
              Details Page for{" "}
              <span className="badge badge-small">this.props.ptitle</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Update textboxes when popup shows */}

            <Row>
              <Col sm={12}>
                <Form>
                  <Form.Group>
                    <label className="row">Id</label>
                    <Form.Control
                      className="row form-control"
                      type="text"
                      defaultValue={this.props.pid}
                      name="id"
                      disabled
                    />
                    <div className="col p-2">
                      <label className="row">Page Title</label>
                      <input
                        className="row form-control"
                        defaultValue={this.props.ptitle}
                        onChange={this.handlePageTitleChage}
                        type="text"
                        disabled
                      />
                    </div>
                  </Form.Group>

                  {/* Content text area */}
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Page Content</label>
                      <textarea
                        className="row form-control"
                        onChange={this.handlePageTitleChage}
                        type="textarea"
                        disabled
                        defaultValue={this.props.pcontent}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="col p-2">
                      <label className="row">Slug</label>
                      <input
                        className="row form-control"
                        onChange={this.handlePageTitleChage}
                        type="textarea"
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

export default DetailsPageModel;
