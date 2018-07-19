import React, { Component } from 'react';

class ForecastTable extends Component {

  getForecastDate(date_epoch) {
    return new Date(date_epoch * 1000);
  }

  getForecastDat(date) {
    return date.getDate();
  }

  getForecastMonth(date) {
    const month = ['Января', "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    return month[date.getMonth()];
  }

  getForecastDay(date) {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()];
  }

  render() {
    let formattedForecastData = this.props.forecast.map(e => {
      const date = this.getForecastDate(e.date_epoch);
      const dayMonth = this.getForecastDat(date);
      const month = this.getForecastMonth(date);
      const dayWeek = this.getForecastDay(date);
      const temp = e.day.maxtemp_c;
      const hum = e.day.avghumidity;
      const wind = (Number(e.day.avgvis_km) / 3.6).toFixed(1);
      const icon = './img' + (e.day.condition.icon).slice(29);
      const text = e.day.condition.text;
      return { dayMonth, month, dayWeek, temp, hum, wind, icon, text }
    })

    return (
      <div>
        {
          formattedForecastData.map(e => {
            return (
              <div className='dayWrapper' key={e.dayMonth}>
                <div className='tabDate' >
                  <p className='dayMonth' >{e.dayMonth}</p>
                  <p className='month' > {e.month}</p>
                  <p className={e.dayWeek} > {e.dayWeek}</p>
                </div>
                <div className='infoWrapper' >
                  <img className='icon' src={e.icon} alt="icon" />
                  <p className='temp' >{e.temp}°C</p>
                  <p className='wind' >{e.wind}м/с</p>
                  <p className='humidity' >{e.hum}%</p>
                  <p className='text' >{e.text}</p>
                </div>
              </div>
            )
          })
        }
      </div >
    )
  }
}

export default ForecastTable;