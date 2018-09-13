const h = React.createElement;

let generateId = () =>
  Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();

const wassups = [
  { date: new Date(),
    content: "Blargh Blargh Blargh",
    user: 'Ptera🦆tal',
    id: 1,
  },
  { date: new Date(),
    content: "It's hard to know how to React to this",
    user: 'Tyranasaurus 🐤',
    id: 2,
  },
  { date: new Date(),
    content: "Re🦆🦆",
    user: 'Veloci🐥tor',
    id: 3,
  },
]

class WassupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newWassupValue: '',
      newUserValue: '',
    }
  }
  render() {
    return h('form', { 
      className: 'wassup-form',
      onSubmit: (event) => {
        event.preventDefault();
        this.props.addWassup(this.state.newWassupValue, this.state.newUserValue)
      }
      }, 
      h('textarea', { 
        className: 'wassup-input', 
        placeholder: 'Wassup?', 
        type: "text",
        value: this.state.newWassupValue,
        onChange: (event) => {
          this.setState({
            newWassupValue: event.target.value
        })
      }
      }),
      h('input', { 
        className: 'username-input', 
        placeholder: 'Username', 
        type: "text",
        value: this.state.newUserValue, 
        onChange: (event) => {
          this.setState({
            newUserValue: event.target.value
          })
        }
      }),
      h('button', 
        { className: 'submit-button', type: 'submit',
        }, 'Post')
      );
    }  
  }
  

let WassupRow = (props) => 
  h('li', {className: 'wassup-row' }, 
    h('h4', { className: 'wassup-content' }, props.wassup.content),
    h('p', { className: 'wassup-user' }, `Posted by: ${props.wassup.user}`),
    h('p', { className: 'wassup-date' }, `Posted on: ${props.wassup.date.toString()}`),
  )

let WassupList = (props) =>
  h('ul', 
  { className: 'wassup-list' }, 
  props.wassups.map(wassup => 
    h(WassupRow, { wassup: wassup,  key: wassup.id }))
  );

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wassups: wassups,
    }
  }
  render() {
    let addWassup = (newWassupContent, newWassupUser) => {
      this.setState({
        wassups: this.state.wassups.concat([
          {
            id: generateId(),
            user: newWassupUser,
            content: newWassupContent,
            date: new Date(),
          }
        ])
      })
    }
    return h('div', {className: 'main' }, 
      h('h1', { className: 'header' }, 'Wassup!'),
      h(WassupForm, { addWassup: addWassup }),
      h(WassupList, { wassups: this.state.wassups })
    )
  }
}

ReactDOM.render(
  h(Main), 
  document.querySelector('.app')
);