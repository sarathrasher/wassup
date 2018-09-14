const h = React.createElement;

let generateId = () =>
  Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();

// const wassups = [
//   { date: new Date(),
//     content: "Blargh Blargh Blargh",
//     user: 'Ptera🦆tal',
//     id: generateId(),
//   },
//   { date: new Date(),
//     content: "It's hard to know how to React to this",
//     user: 'Tyranasaurus 🐤',
//     id: generateId(),
//   },
//   { date: new Date(),
//     content: "Re🦆🦆",
//     user: 'Veloci🐥tor',
//     id: generateId(),
//   },
// ]

class WassupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newWassupValue: '',
      newUserValue: '',
    }
  }
  render() {
    return <form 
      className='wassup-form'
      onSubmit={(event) => {
        event.preventDefault();
        this.props.addWassup(this.state.newWassupValue, this.state.newUserValue);
        this.setState({
          newWassupValue: '',
          newUserValue: ''
        })
      } }
      >
      <textarea 
        className='wassup-input'  
        placeholder='Wassup?'
        type="text"
        value={this.state.newWassupValue}
        onChange={(event) => {
          this.setState({
            newWassupValue: event.target.value
        })
      } }
      />
      <input 
        className='username-input'
        placeholder='Username'
        type="text"
        value={this.state.newUserValue} 
        onChange={(event) => {
          this.setState({
            newUserValue: event.target.value
          });
        }}
      />, 
      <button className='submit-button' type='submit'>Post</button>
      </form>
    }  
  }
  
let WassupRow = (props) => 
  <li className='wassup-row'>
    <h4 className='wassup-content'>{props.wassup.content}</h4>
    <p className='wassup-user'>Posted by: {props.wassup.user}</p>
    {/* <p className='wassup-date'>Posted on: {props.wassup.date.toString()}</p> */}
  </li>


let WassupList = (props) =>
  <ul className='wassup-list'>{props.wassups.map(wassup => 
  <WassupRow wassup={wassup} key={wassup.id}></WassupRow>)}
  </ul>

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wassups: [],
    }
  }
  
  componentDidMount() {
    fetch('http://0.tcp.ngrok.io:18229/wassups.json')
    .then(res => res.json())
    .then(wassups => {
      this.setState({
        wassups: wassups
    });
  });
  };

  render() {
    let addWassup = (newWassupContent, newWassupUser) => {
      this.setState({
        wassups: [
          {
            id: generateId(),
            user: newWassupUser,
            content: newWassupContent,
          }
        ].concat(this.state.wassups)
      })
    }
    return <div className='main'>
      <h1 className='header'>Wassup!</h1>,
      <WassupForm addWassup={addWassup} />,
      <WassupList wassups={this.state.wassups} />,
    </div> 
    }
}

ReactDOM.render(
  h(Main), 
  document.querySelector('.app')
);