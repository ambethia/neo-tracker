import React, { Component } from 'react'

class Currency extends Component {
  state = {
    price: 0,
    owned: 100
  }

  updatePrice () {
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const url = `https://www.binance.com/api/v1/ticker/24hr?symbol=${this.props.name}BTC`
    window
      .fetch(proxy + url)
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({
          price: data.lastPrice
        })
        this.props.onChange(data.lastPrice * this.state.owned)
      })
  }

  componentDidMount () {
    this.setState({
      owned: parseInt(window.localStorage.getItem(`${this.props.name}:owned`)) || this.state.owned
    })
    this.updatePrice()
    window.setInterval(() => {
      this.updatePrice()
    }, 5 * 1000)
  }

  _updateHODL = event => {
    this.setState(
      {
        owned: Number(event.target.value)
      },
      () => {
        this.updatePrice()
        window.localStorage.setItem(`${this.props.name}:owned`, this.state.owned)
      }
    )
  }

  render () {
    return (
      <div className='currency'>
        <h3>
          {this.props.name}
        </h3>
        <h4>
          ${(this.props.btcusd * this.state.price).toFixed(2)}
        </h4>
        <div className='price-btc'>
          {this.state.price} BTC
        </div>
        <input type='number' value={this.state.owned} onChange={this._updateHODL} />
        <h2>
          ${(this.props.btcusd * this.state.price * this.state.owned).toFixed(2)}
        </h2>
      </div>
    )
  }
}

export default Currency
