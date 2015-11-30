var names = [
  {id: 1, name: "Jay"},
  {id: 2, name: "May"},
  {id: 3, name: "Day"},
  {id: 4, name: "Fay"},
  {id: 5, name: "Yay"},
  {id: 6, name: "Nay"},
  {id: 7, name: "Leh"}
];


var Autocomplete = React.createClass({

  getInitialState: function () {
    return { searchString: "" };
  },

  handleChange: function(e) {
    this.setState({ searchString: e.target.value });
  },

  liClick: function(e) {
    this.setState({ searchString: e.target.innerHTML.toLowerCase() });
  },

  render: function() {
    var self = this;
    var names = this.props.items;
    var searchStrings = this.state.searchString;

  
    names = names.filter(function(i) {
      return i.name.toLowerCase().match( searchStrings );
    });
    
    return (
      <div>
        <input 
          type="text"
          onChange={this.handleChange}
          value={this.state.searchString}
        >
        </input>
        <ul>
          {
            names.map(function(item) {
              return <li key={item.id} onClick={self.liClick}> {item.name} </li>
            })
          }
        </ul>
      </div>
      )
  },
});

React.render(
  <Autocomplete items={ names } />,
  document.getElementById("project")
);