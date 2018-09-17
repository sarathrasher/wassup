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

let WassupForm = (props) =>
    <form 
      className='wassup-form'
      onSubmit={(event) => {
        event.preventDefault();
        props.addWassup(props.newWassupValue, props.newUserValue);

      } }
      >
      <textarea 
        className='wassup-input'  
        placeholder='Wassup?'
        type="text"
        value={props.newWassupValue}
        onChange={(event) => {
          props.updateWassupInput(event.target.value, props.newUserValue)
        }
      } 
      />
      <input 
        className='username-input'
        placeholder='Username'
        type="text"
        value={props.newUserValue} 
        onChange={(event) => {
            props.updateWassupInput(props.newWassupValue, event.target.value)
          }
        }
      />, 
      <button className='submit-button' type='submit'>Post</button>
      </form>

class WassupFormWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newWassupValue: '',
      newUserValue: '',
    }
  }
  render() {
    let updateWassupInput = (newWassupValue, newUserValue) => {
      this.setState({
        newWassupValue,
        newUserValue, 
      })
    }
    return <WassupForm {...this.props} {...this.state} updateWassupInput={updateWassupInput} />
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

let Main = (props) => 
    <div className='main'>
    <h1 className='header'>Wassup!</h1>,
    <WassupFormWrapper addWassup={props.addWassup} />,
    <WassupList wassups={props.wassups} />,
    </div> 

class MainWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wassups: [],
    }
  }
  
  componentDidMount() {
    fetch('http://0.tcp.ngrok.io:11971/wassups.json')
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
    return <Main {...this.state} addWassup={addWassup} />
    }
}

ReactDOM.render(
  <MainWrapper />,
  document.querySelector('.app')
);