import React, { Component } from 'react';
import CitySearchInput from './components/CitySearchInput.js';
import ForecastTable from './containers/ForecastTable.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { forecast: [], location: {}, city: '', searchHint: [] };
    this.changeStateCity = this.changeStateCity.bind(this);
    this.getForecast = this.getForecast.bind(this);
  }

  componentDidMount() {
    this.getUserIPForecast();
  }

  getUserIPForecast() {
    fetch('https://api.ipify.org?format=json')
      .then(res => {
        if (res.ok) return res.json();
        throw Error('Error while fetching' + res.statusText);
      })
      .then(data => fetch(
        `https://api.apixu.com/v1/forecast.json?key=58a66c0354594c24a74145907181707&q=${data.ip}&days=7&lang=ru`,
      )
        .then(res => res.json())
        .then(data => this.setState({ forecast: data.forecast.forecastday, location: data.location, city: data.location.name })))
      .catch(err => console.log(err));
  }

  getUserCityForecast(city) {
    fetch(`https://api.apixu.com/v1/forecast.json?key=58a66c0354594c24a74145907181707&q=${city}&days=7&lang=ru`,
    )
      .then(res => {
        if (res.ok) return res.json();
        throw Error('Error while fetching' + res.statusText);
      })
      .then(data => this.setState({ forecast: data.forecast.forecastday, location: data.location, city: data.location.name }))
      .catch(err => console.log(err));
  }

  getUserCity(city) {
    fetch(`https://api.apixu.com/v1/search.json?key=58a66c0354594c24a74145907181707&q=${city}&lang=ru`,
    )
      .then(res => {
        if (res.ok) return res.json();
        throw Error('Error while fetching' + res.statusText);
      })
      .then(data => this.setState({ searchHint: data }))
      .catch(err => console.log(err));
  }

  changeStateCity(location) {
    this.setState({ city: location });
    this.getUserCity(location);
  }

  getForecast(location) {
    this.getUserCityForecast(location);
    this.setState({ searchHint: [] });
  }

  render() {
    return (
      <div className="App">
        <CitySearchInput getFC={this.getForecast} change={this.changeStateCity} hint={this.state.searchHint} />
        <button onClick={(e) => {
          e.preventDefault();
          this.getForecast(this.state.city)
        }
        }>Get Forecast</button>
        <p className='header'>{this.state.location.name}</p>
        <ForecastTable forecast={this.state.forecast} />
      </div>
    );
  }
}

export default App;
