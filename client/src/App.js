import React from "react";
import axios from "axios";

import "./App.css";

class App extends React.Component {
  state = {
    title: "",
    body: "",
    posts:[],
  };

  componentDidMount = () =>{
    this.getBlogPost();
  }

  getBlogPost = () =>{
    axios.get('/api')
    .then((response) => {
      const data = response.data;
      this.setState({posts: data});
      console.log("Data has been received!!");
    })
    .catch(() => {
      alert('Error retrieving data!!');
    })
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body,
    };

    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server");
        this.resetUserInput();
        this.getBlogPost();
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  resetUserInput = () => {
    this.setState({
      title:'',
      body:''
    });
  }

  displayBlogPost = (posts) => {
    if(!posts.length) return null;
    return posts.map((post, index) => (
      <div key={index} className="blog-post_display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));

  }

  render() {
    //console.log("state", this.state);
    //JSX
    return (
      <div className="app">
        <h2>Welcome To MernStack Web App</h2>
        <form onSubmit={this.submit}className="form">
          <div className="form-input">
            <input
              type="text"
              placeholder="Enter your title"
              name="title" 
              required="required"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              name="body"
              placeholder="Enter your message"
              required="required"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <button>Submit</button>
        </form>

        <div className='blog-posts'>
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;
