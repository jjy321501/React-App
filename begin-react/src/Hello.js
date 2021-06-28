import React, { Component } from 'react';

class Hello extends Component{
    static defaultProps = {
        name: '이름없음'
    };
    render() {//Class 형 컴포넌트에서는 render() 메소드가 필수이다.
    const {color, name, isSpecial } = this.props;
    return (
        <div style={{ color }}>
            {isSpecial ? <b>*</b> : null}
            안녕하세요 {name}
        </div>    
    ); 
  }
}

export default Hello;