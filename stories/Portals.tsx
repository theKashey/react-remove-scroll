import * as ReactDOM from "react-dom";
import * as React from "react";
import {RemoveScroll} from "../src";


const fill = (x: number, y: number) => {
  const a: number[] = [];
  for (let i = 0; i < x; ++i) {
    a.push(y)
  }
  return a;
};

const PDiv = ({top, children, forwardRef}) => (
  <div
    ref={forwardRef}
    style={{
      position: 'absolute',
      overflow: 'scroll',
      left: 50,
      right: 0,
      top: top,
      //width: '100%',
      height: '50px',
      backgroundColor: 'rgba(0,100,100,0.5)',
      zIndex: 10
    }}
    // className={zeroRightClassName}
  >
    <button onClick={() => alert('xxx')}>click me</button>
    {children} SCROLLABLE
    {fill(20, 1).map(x => <p>{x}****</p>)}
  </div>
);

const Portal = () => {
  const [state,setState]=React.useState(null);
  React.useEffect(() => {
    setState({});
  }, []);
  if(document.getElementById('portal')) {
    return ReactDOM.createPortal(<PDiv top={200}>Portal</PDiv>, document.getElementById('portal')!)
  } else {
    return null;
  }
};

export function PortalBox({axis, repeat, options = {}}) {
  const outerRef = React.useRef();
  const ref=React.useRef();
  return (
    <div className="App">
      <div className="SubOuter" ref={outerRef}>
        <div className="SubParent">
          <div id="portal">portal</div>
          <RemoveScroll enabled={true} {...options} shards={[ref]}>
            <div className="Sub">
              <div className={`container container-${axis}`}>
                {Array(repeat).fill(
                  <ul className="flex-container">
                    <li className="flex-item">*1</li>
                    <li className="flex-item">2</li>
                    <li className="flex-item">3</li>
                    <li className="flex-item">4</li>
                    <li className="flex-item">5</li>
                    <li className="flex-item">6</li>
                    <li className="flex-item">7</li>
                    <li className="flex-item">8</li>
                  </ul>
                )}
              </div>
            </div>
            <Portal/>
          </RemoveScroll>
          <PDiv top={100} forwardRef={ref}>shard</PDiv>
        </div>
      </div>
    </div>
  );
}
