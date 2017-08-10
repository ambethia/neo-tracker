import React, { Component } from 'react'
import Currency from './Currency'

class App extends Component {
  state = {
    neo: 0,
    gas: 0,
    btc: 3400
  }

  updateBTC () {
    window.fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/').then(r => r.json()).then(data => {
      this.setState({
        btc: data[0].price_usd
      })
    })
  }

  componentDidMount () {
    this.updateBTC()
    window.setInterval(() => {
      this.updateBTC()
    }, 5 * 60 * 1000)
  }

  handleChange (currency, amount) {
    this.setState({
      [currency]: amount
    })
  }

  render () {
    return (
      <main>
        <h1>
          <img src='https://neo.org/Images/neo_logo.svg' height='120' alt='' />
        </h1>

        <h2>
          ${((this.state.neo + this.state.gas) * this.state.btc).toFixed(2)}
        </h2>

        <div className='currencies'>
          <Currency name='NEO' btcusd={this.state.btc} onChange={amount => this.handleChange('neo', amount)} />
          <Currency name='GAS' btcusd={this.state.btc} onChange={amount => this.handleChange('gas', amount)} />
        </div>
        <p>
          BTC: ${this.state.btc}
        </p>
      </main>
    )
  }
}

export default App
