import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component} from 'react';
import {AppWrapper} from './styled';
import {RemoveScroll} from "../src";

export interface AppState {
  counter: number;
}

const fill = (x: number, y: number) => {
  const a: number[] = [];
  for (let i = 0; i < x; ++i) {
    a.push(y)
  }
  return a;
}

const PDiv = () => (
  <div
    style={{
      position: 'absolute',
      overflow: 'scroll',
      left: 50,
      right: 0,
      top: '350px',
      //width: '100%',
      height: '50px',
      backgroundColor: 'rgba(0,100,100,0.5)',
      zIndex: 10
    }}
    // className={zeroRightClassName}
  >
    XXX
    XXX
    XXX
    {fill(20, 1).map(x => <p>{x}****</p>)}
  </div>
);

const Portal = () => (
  ReactDOM.createPortal(<PDiv/>, document.getElementById('portal'))
)

export default class App extends Component <{}, AppState> {
  state: AppState = {
    counter: 0
  };

  componentDidMount() {
    setInterval(() => {
       //this.setState({counter: this.state.counter ? 0 : 1})
    }, 1000);

    setTimeout(() => {
      //this.setState({counter: this.state.counter ? 0 : 1})
    }, 1000);
  }

  render() {
    return (
      <AppWrapper>
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '50px',
          backgroundColor: '#F00'
        }}>floating
        </div>

        <div
          style={{
            position: 'absolute',
            overflow: 'scroll',
            left: 0,
            right: 0,
            top: '50px',
            //width: '100%',
            height: '80px',
            backgroundColor: 'rgba(200,0,0,0.5)'
          }}
          // className={zeroRightClassName}
        >
          SCROLL!!!
          {(<RemoveScroll enabled={true}>
              <div
                style={{
                  //position: 'absolute',
                  overflow: 'scroll',
                  left: 0,
                  right: 0,
                  top: '20px',
                  width: '300px',
                  height: '200px',
                  color: '#FFF',
                  backgroundColor: 'rgba(0,0,0,0.5)'
                }}
                // className={zeroRightClassName}
              >
                YY
                ZZZ
                AAAA
                {fill(10, 1).map(x => <p>{x} --****--</p>)}
                AAAA
                ZZZ
                YY
                <Portal/>
              </div>
            </RemoveScroll>
          )}
          SCROLL
          <p>SCROLL</p>
          <p>SCROLL</p>
        </div>

        {false && (
          <RemoveScroll enabled={false && !!(this.state.counter % 2)}>
            <div
              style={{
                position: 'absolute',
                overflow: 'scroll',
                left: 0,
                right: 0,
                top: '100px',
                //width: '100%',
                height: '150px',
                backgroundColor: 'rgba(0,1,0,0.5)'
              }}
              // className={fullWidthClassName}
            >
              XXX
              XXX
              XXX
              {fill(20, 1).map(x => <p>{x}****</p>)}
            </div>
          </RemoveScroll>
        )}

        {false && (
          <>
            <div
              style={{
                position: 'fixed',
                overflow: 'scroll',
                left: 0,
                right: 0,
                top: '150px',
                //width: '100%',
                height: '50px',
                backgroundColor: 'rgba(0,0,0,0.5)'
              }}
              className={RemoveScroll.classNames.fullWidth}
            >
              XXX
              XXX
              XXX
              {fill(20, 1).map(x => <p>{x}****</p>)}
            </div>


            <div style={{
              position: 'absolute',
              overflow: 'scroll',
              left: 0,
              right: 0,
              top: 200,
              //width: '100%',
              height: 300,
              backgroundColor: 'rgba(0,0,0,0.5)'
            }}>
              XXX
              XXX
              XXX

              <div style={{
                position: 'absolute',
                overflow: 'scroll',
                width: 200,
                height: 200,
                backgroundColor: 'rgba(0,0,0,0.5)'
              }}>
                ZZZ
                ZZZ
                {fill(20, 1).map(x => <p>{x}****</p>)}
              </div>

              {fill(20, 1).map(x => <p>{x}****</p>)}
            </div>
          </>
        )}

        <p>FILL</p>
        {fill(100, 1).map((x, index) => <p>{index}**** </p>)}
        <p>END</p>
      </AppWrapper>
    )
  }
}