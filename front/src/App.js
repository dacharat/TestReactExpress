import React, { Component } from 'react';
import logo from './logo.svg';
import { getArticles } from './api'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      articles: [],
      title: '',
      author: '',
      body: ''
    }
  }

  async componentDidMount() {
    this.setState({
      articles: await getArticles()
    })
  }

  submit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8000/add', {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify({
        title: this.state.title,
        author: this.state.author,
        body: this.state.body
      }),
    })
      .then(res => res.json())
      .then(body => this.setState({
        articles: [...this.state.articles, body.article]
      }))
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br />
        <div className="modal-body row">
          <div className="col-md-6">
            <form onSubmit={this.submit} method="POST" action="/add">
              Title:
          <input name="title" type="text" onChange={this.onChange} /> <br />
              Author:
          <input name="author" type="text" onChange={this.onChange} /> <br />
              Body:
          <input name="body" type="text" onChange={this.onChange} /> <br />
              <button type="submit">ADD</button>
            </form>
          </div>
          <div className="col-md-6 border">
            {this.state.articles.map((article) => (<div key={article._id}>{article.title}</div>))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
