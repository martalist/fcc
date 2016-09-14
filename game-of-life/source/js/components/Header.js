import React, { Component } from 'react';
import Button from './Button';
import Counter from './Counter';
import Slider from './Slider';
import RadioButtons from './RadioButtons';

class Header extends Component {
  render() {
    const { speed, playing, generations, togglePlay, changeSpeed } = this.props;
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
            disabled={playing} />
        </div>
        <div className="controls-center">
          <Counter description="generations" count={generations}/>
        </div>
        <div className="controls-right">
          <Slider 
            speed={speed} 
            changeSpeed={(e) => changeSpeed(+e.target.value)}
          />
          <RadioButtons />
        </div>
      </header>
    );
  }
}

export default Header;
