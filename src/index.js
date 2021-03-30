import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          {this.props.list.map(item => {
            return (
              <li key={item.id}>
                <a
                  href={item.id}
                  onClick={(e) => {
                    e.preventDefault()
                    this.props.onClick(item.id)
                  }}
                >
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    );
  }
}

class Article extends Component {
  state = {}
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

class App extends Component {
  state = {
    article: { title: "Welcome", desc: "Hello, React & Ajax" },
    list: []
  }
  componentDidMount = () => {
    fetch("list.json")
      .then(result => result.json())
      .then(json => this.setState({ list: json }))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div>
        <h1>WEB</h1>
        <Nav
          list={this.state.list}
          onClick={(id) => {
            fetch(`${id}.json`)
              .then(result => result.json())
              .then(data => this.setState({ article: { title: data.title, desc: data.desc } }))
              .catch(err => console.log(err))
          }}
        />
        <Article
          title={this.state.article.title}
          desc={this.state.article.desc}
        />
      </div>
    );
  }
}

export default App;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

