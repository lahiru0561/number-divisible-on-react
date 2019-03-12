import React, { Component } from 'react';
import axios from 'axios';

export class Divisible extends Component {
  constructor() {
    super();
    this.state = {
      rangers: '',
      divisorInfo: '',
      error: {},
      isLoading: {}
    };
    this.getRangers = this.getRangers.bind(this);
    this.getDivisorInfo = this.getDivisorInfo.bind(this);
  }

  componentDidMount() {
    this.getRangers();
    this.getDivisorInfo();
  }
  getRangers() {
    this.setState({
      error: { rangeError: '' },
      isLoading: { rangers: true }
    });
    axios
      .get(`https://join.reckon.com/test1/rangeInfo`)
      .then(res => {
        //set vlaue

        this.setState({ rangers: res.data, isLoading: { rangers: false } });
      })
      .catch(err => {
        //handle error

        this.setState({
          error: { rangeError: 'Error in getting Ranges' },
          isLoading: { rangers: false }
        });
      });
  }

  getDivisorInfo() {
    this.setState({
      error: { divisorError: '' },
      isLoading: { divisor: true }
    });

    axios
      .get(`https://join.reckon.com/test1/divisorInfo`)
      .then(res => {
        //set vlaue

        this.setState({ divisorInfo: res.data, isLoading: { divisor: false } });
      })
      .catch(err => {
        //handle error

        this.setState({
          error: { divisorError: 'Error in getting Divisor Details' },
          isLoading: { divisor: false }
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
    } else if (this.state.isLoading.rangers) {
      rangers = (
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h4>Rangers</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 ">loading...</div>
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
    } else if (this.state.isLoading.divisor) {
      divisors = (
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h4>Divisors</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 ">loading...</div>
            </div>
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
