import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import {
  getcurriculums,
  createcurriculums,
  deletecurriculums
} from './actions';
import { connect } from 'react-redux';


class App extends Component {
  state = {
    id: '',
    name: '',
    name2: '',
  }

  componentDidMount() {
    this.props.getcurriculums();
  }
  handleDelete = (e) => {
    const {id} = e.target;
    this.props.deletecurriculums(id);
  }
  handleChange = (e) => { // Fixed
    var name = e.target.name,
      value = e.target.value;
    this.setState({[name]: value});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {name} = this.state;
    this.props.createcurriculums({
      name: name
    });
    this.setState({
      name: ''
    });
  }

  render() {
    const {curriculums} = this.props;
    return (
      <div style={{ backgroundColor: '#FFDAB9', height: '1500px' }}>

        <h1 style={{ margin: '0 150px 0 0px' }}>College of Computing</h1>
        <ul>
          {
            curriculums.map((curriculum, index) => {
              return (
                <li style={{ margin: '0 50px 0 30px' }} key={curriculum.id}>
                  {curriculum.id + '. ' + curriculum.name + ' '}
                  <button id={curriculum.id} onClick={this.handleDelete} >Delete</button>
                </li>
              )
            })
          }
        </ul>
        <h3>Add Curriculum </h3>
        <form  onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} />
          <button style={{ margin: '0 10px 0 5px' }} type="submit">Add </button>

        </form>

      </div>

    );
  }
}


const mapStateToProps = ({ curriculums }) => {
  return {
    curriculums,
  }
}
export default connect(mapStateToProps, { getcurriculums, createcurriculums, deletecurriculums})(App);
