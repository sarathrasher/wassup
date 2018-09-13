const h = React.createElement;

let createRandomId = () =>
  Math.floor(Math.random * Math.floor(1000));

const wassups = [
  { date: new Date(),
    content: "Blargh Blargh Blargh",
    id: 1,
  },
  { date: new Date(),
    content: "It's hard to know how to React to this",
    id: 2,
  },
  { date: new Date(),
    content: "Re🐣🐥",
    id: 3,
  },
]

let WassupForm = (props) =>
  h('form', { className: 'wassup-form' }, [
    h('textarea', { className: 'wassup-input', placeholder: 'Wassup?' }),
    h('input', { className: 'username-input', placeholder: 'Username' }),
    h('button', 
      { className: 'submit-button', type: 'submit',
        onClick: () => {
          event.preventDefault();
          return h(WassupRow, { /*Input Value*/ })
        }
      }, ['Post'])
    ]
  );

let WassupRow = (props) => 
  h('li', {className: 'wassup-row' }, [
    h('h4', { className: 'wassup-content' }, props.wassup.content),
    h('p', { className: 'wassup-date' }, props.wassup.date.toString()),
  ])

let WassupList = (props) =>
  props.wassups.map(wassup =>
    h('ul', { className: 'wassup-list' }, h(WassupRow, { wassup }))
  );

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wassups: wassups
    }
  }
  render() {
    return h('div', {className: 'main' }, [
      h('h1', { className: 'header' }, ['Wassup!']),
      h(WassupForm),
      h(WassupList, { wassups: this.state.wassups })
    ])
  }
}

ReactDOM.render(
  h(Main), 
  document.querySelector('.app')
);