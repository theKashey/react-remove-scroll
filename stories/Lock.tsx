import * as React from "react";
import {RemoveScroll} from "../src";

import "./styles.css";

document.body.addEventListener('click', (event) => console.log('BODY CLICKED', event.target, event.currentTarget));
document.addEventListener('click', () => console.log('DOC CLICKED'));

export function XYBox({axis, repeat, options = {}}) {
  const outerRef = React.useRef();

  React.useEffect(() => {
    outerRef.current.scrollTop=50;
    outerRef.current.scrollLeft=50;
  }, []);
  return (
    <div className="App">
      <div className="SubOuter" ref={outerRef}>
        <div className="SubParent">
          <RemoveScroll enabled={true} {...options}>
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
          </RemoveScroll>
        </div>
      </div>
    </div>
  );
}


export const HScroll = () => <XYBox axis='h' repeat={1}/>
export const VScroll = () => <XYBox axis='v' repeat={1}/>
export const HVScroll = () => <XYBox axis='h' repeat={3}/>

export const HVScrollBlocked = () => <XYBox axis='h' repeat={3} options={{inert:true}}/>;