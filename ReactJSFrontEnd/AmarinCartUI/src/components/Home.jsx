import React, { Component } from "react";

class Categories extends Component {
  //declare an array to store data from server
  constructor(props) {
    super(props);

    this.state = {
      Page: [],
    };
  }

  //method to get api data
  refreshList() {
    //let isMounted = true; // to prevent Setting DOMdata during unmounting phase
    fetch(process.env.REACT_APP_API_Home)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Page: data });
      });
  }

  //update Dom on initialization
  componentDidMount() {
    this.refreshList();
  }

  render() {
    const rawHTML = this.state.Page.content;

    return (
      <div>
        <br />
        {<div dangerouslySetInnerHTML={{ __html: rawHTML }} />}
      </div>
    );
  }
}

export default Categories;
