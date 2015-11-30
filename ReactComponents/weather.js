var Time = React.createClass({
  getInitialState: function() {
    return { time: new Date() };
  },

  componentDidMount: function() {
    setInterval(this.startHours, 50);
    setInterval(this.startMinutes, 50);
    setInterval(this.startSeconds, 500);
  },

  startMinutes: function() {
    this.setCurrentDate();
  },

  startHours: function() {
    this.setCurrentDate();
  },

  startSeconds: function() {
    this.setCurrentDate();
  },

  setCurrentDate: function() {
    this.setState({ time: new Date() });
  },

  modifySeconds: function() {

    if (this.state.time.getSeconds() < 10) {
      return "0" + this.state.time.getSeconds();
    } else {
      return this.state.time.getSeconds();
    }
  },

  render: function() {
    return (
      <div>
        <span> The Current Time </span>
        <h1> {this.state.time.getHours()}:{this.state.time.getMinutes()}:{this.modifySeconds()} </h1>
        <Weather />
      </div>
    )
  },
});



var Weather = React.createClass({

  getInitialState: function() {
    return { 
      temperature: "",
      description: "Loading..."
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(this.setLocation)
  },

  setLocation: function(values) {
    var lat = Math.round(values.coords.latitude)
    var lon = Math.round(values.coords.longitude)
    this.getData(lat, lon);
  },

  getData: function(lat, lon) {
    var self = this;
    var api_key = "3b843beebe7a3e418590bce12ba9026a"
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon +'&units=imperial&APPID=' + api_key
    console.log(url)
    var request = new XMLHttpRequest();
    request.open("GET", url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var resp = request.responseText;
        console.log(resp)
        self.parseWeather(resp);
      } else {
        alert("Weather failed to fetch")
      }
    }
    request.send();
  },

  parseWeather: function(resp) {
    var data = JSON.parse(resp);

    this.setState({ description: data.weather[0]['description'] })
    this.setState({ temperature: data.main['temp'] })
  },


  render: function() {
    return (
      <div>
        <p>Hello From the Weather Component</p>
        <div> { this.state.description } </div>
        <div> Temperature: { this.state.temperature } </div>
      </div>
    )
  },
});


React.render (
  <Time />,
  document.getElementById('time')
);
