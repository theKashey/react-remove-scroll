import {Component} from 'react';

export class ToolboxApp<P, S> extends Component<P, S> {
  onCheckboxChange = (propName: any) => () => {
    const currentValue = (this.state as any)[propName];
    this.setState({ [propName]: !currentValue } as any);
  }

  onFieldTextChange = (propName: any) => (e: any) => {
    const value = e.target.value;
    
    (this as any).setState({
      [propName]: value
    });
  }
}