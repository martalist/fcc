import React, { Component } from 'react';
import Button from '../Button';
import Counter from '../Counter';
import Slider from '../Slider';
import RadioButtonsContainer from '../../containers/RadioButtonsContainer';
import './index.scss';

class Header extends Component {
  render() {
    const { 
      speed, playing, generations, boardWidth, boardHeight,
      togglePlay, changeSpeed, newGame, clearBoard
    } = this.props;
    
    return (
      <header>
        <div className="row">
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
              onClick={clearBoard}
              disabled={playing}
            />
            <Button 
              iconClass="fa fa-random" 
              text="Random" 
              onClick={() => newGame(boardWidth, boardHeight)}
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
            
            <RadioButtonsContainer />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
