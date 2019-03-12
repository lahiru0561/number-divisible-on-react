import React, { Component } from 'react';
import axios from 'axios';

export class Divisible extends Component {
  constructor() {
    super();
    this.state = {
      rangers: '',
      divisorInfo: '',
      error: {}
    };
    this.getRangers = this.getRangers.bind(this);
    this.getDivisorInfo = this.getDivisorInfo.bind(this);
  }

  componentDidMount() {
    this.getRangers();
    this.getDivisorInfo();
  }
  getRangers() {
    console.log('getRangers');
    this.setState({ error: { rangeError: '' } });
    axios
      .get(`https://join.reckon.com/test1/rangeInfo`)
      .then(res => {
        //set vlaue
        console.log('res', res);
        this.setState({ rangers: res.data });
      })
      .catch(err => {
        //handle error
        console.log('error', err);
        this.setState({ error: { rangeError: 'Error in getting Ranges' } });
      });
  }

  getDivisorInfo() {
    this.setState({ error: { divisorError: '' } });
    console.log('getDivisorInfo');
    axios
      .get(`https://join.reckon.com/test1/divisorInfo`)
      .then(res => {
        //set vlaue
        console.log('res', res);
        this.setState({ divisorInfo: res.data });
      })
      .catch(err => {
        //handle error
        console.log('error', err);
        this.setState({
          error: { divisorError: 'Error in getting Divisor Details' }
        });
      });
  }

  render() {
    let rangers, divisors, result;

    //set Range details
    if (this.state.rangers !== '') {
      rangers = (
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                {' '}
                <h4>Rangers</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                Lower Range : {this.state.rangers.lower}
              </div>
              <div className="col-md-6">
                Upper Range : {this.state.rangers.upper}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      rangers = (
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h4>Rangers</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-danger">
                {this.state.error.rangeError}
              </div>
            </div>
          </div>
        </div>
      );
    }

    //set divisor details
    if (this.state.divisorInfo !== '') {
      divisors = (
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h4>Divisors</h4>
              </div>
            </div>

            {this.state.divisorInfo.outputDetails.map((item, index) => {
              return (
                <div key={index} className="row">
                  <div className="col-md-12">
                    {item.divisor} {item.output}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      divisors = (
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                {' '}
                <h4>Divisors</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12 text-danger">
                  {this.state.error.divisorError}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    //set results if divisor and ranger details available
    if (this.state.divisorInfo !== '' && this.state.rangers !== '') {
      let resultRows = [];

      for (
        let i = this.state.rangers.lower;
        i <= this.state.rangers.upper;
        i++
      ) {
        resultRows.push(
          <div key={i} className="row">
            <div className="col-md-1">{i}:</div>
            <div className="col-md-10">
              {this.state.divisorInfo.outputDetails.map(item => {
                if (item.divisor !== 0 && i % item.divisor === 0) {
                  return item.output;
                }
              })}
            </div>
          </div>
        );
      }

      result = (
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h4>Result</h4>
              </div>
            </div>

            {resultRows}
          </div>
        </div>
      );
    } else {
      result = '';
    }

    return (
      <div className="row">
        D
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">{rangers}</div>
          </div>
          <div className="row">
            <div className="col-md-12 my-3">{divisors}</div>
          </div>
          <div className="row">
            <div className="col-md-12 my-3">{result}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Divisible;
