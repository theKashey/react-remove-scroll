import * as React from "react";
import {RemoveScroll} from "../src";

import "style-loader!css-loader!./styles.css";

export default function XYBox() {
  return (
    <div className="App">

      <RemoveScroll enabled={true}>
        <div className="Sub">
          <div className="SubSub">
            <div className="container">
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
            </div>
          </div>
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

          {/*<div className="container">*/}
          {/*  <ul className="flex-container">*/}
          {/*    <li className="flex-item">*1</li>*/}
          {/*    <li className="flex-item">2</li>*/}
          {/*    <li className="flex-item">3</li>*/}
          {/*    <li className="flex-item">4</li>*/}
          {/*    <li className="flex-item">5</li>*/}
          {/*    <li className="flex-item">6</li>*/}
          {/*    <li className="flex-item">7</li>*/}
          {/*    <li className="flex-item">8</li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
        </div>
      </RemoveScroll>
    </div>
  );
}
