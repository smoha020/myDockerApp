import React, { Component } from 'react'
import axios from'axios'

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      person: []
    }
  }

  componentDidMount = () => {
    //localhost during production when not running nginx.
    axios.get('http://localhost:5000/api1/getAll')
    .then(res => {
      
      this.setState({ person: [ ...res.data ]})
    })
    .catch(err => {
      console.log('service did not connect ', err)
    })
  }

  onChange = (e) => {
        
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const person = {
      name: this.state.name,
      DOB: this.state.DOB
    }
    
    axios.post('http://localhost:5000/api1/add', person)
    .then(res => {
      
      this.setState({ person: [ ...this.state.person, res.data ]})
    })
    .catch(err => console.log('error is: ' + err))
    
  }

  render() {

    let display;

    console.log(this.state.person)
    if(this.state.person && this.state.person.length != 0) {
      display = this.state.person.map(per => (
          <div key={per._id}>
              <p> 
                name is {per.name}
              </p>
              <p> 
                DOB is {per.DOB}
              </p>
          </div>
        ))
    } else display = <h4>nothing to display</h4>
    
    return(
      <div>
        <h1>Welcome to the app</h1>
          {display}
        <form onSubmit={this.onSubmit} >
          <input type='text' 
            placeholder='Name'
            name='name'
            onChange={this.onChange}/>
          <input type='text' 
            placeholder='DOB'
            name='DOB'
            onChange={this.onChange}/> 
            <input type="submit"
            value="submit"/> 
        </form>
      </div>
    )
  };
}

export default App;
