import React, { Component } from 'react';
import Button from './Button';
import Counter from './Counter';
import Slider from './Slider';
import RadioButtons from './RadioButtons';

class Header extends Component {
  render() {
    const { speed, playing, togglePlay } = this.props;
    return (
      <header>
        <div className="controls-left">
          <Button 
            iconClass="fa fa-play" 
            text="Start" 
            onClick={togglePlay}
            disabled={playing}
          />
          <Button 
            iconClass="fa fa-pause" 
            text="Pause" 
            onClick={togglePlay}
            disabled={!playing}
          />
          <Button 
            iconClass="fa fa-eraser" 
            text="Clear" 
            disabled={playing}
          />
          <Button 
            iconClass="fa fa-random" 
            text="Random" 
            disabled={playing}
          />
        </div>
        <div className="controls-center">
          <Counter description="generations" count={0}/>
        </div>
        <div className="controls-right">
          <Slider 
            min={0} 
            max={100} 
            value={50} 
            changeSpeed={() => console.log('changing')}
          />
          <RadioButtons />
        </div>
      </header>
    );
  }
}

export default Header;
