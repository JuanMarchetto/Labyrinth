import React, { useState, useEffect, useCallback }  from "react";
import { GAME_STATUS, ARROW, Position } from './constants';
import { Labyrinth } from "./components/labyrinth";
import {LevelBuilder} from "./components/levelBuilder";

const Button = ({handleOnClick, text}: {handleOnClick :any, text :String}) => (
  <button onClick={handleOnClick} type="button">{text}</button>
)

function App() {
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING);
  const [availableCells, setAvailableCells]=useState([
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
  ]);
  const [startingPosition, setStartingPosition]: [Position, any]=useState([4, 4]);
  const [targetPosition, setTargetPosition]: [Position, any]=useState([6, 9]);
  const cellSize=30;
  const [moveLimit, setMoveLimit]=useState(25);
  const [position, setPosition] = useState(startingPosition);

  const handleStartingPosition = (position: Position) =>{
    setStartingPosition(position);
    setPosition(position);
  }

  const reset=()=>{
    setMoves(0);
    setPosition(startingPosition);
  }

  const start = () => {
    reset()
    setGameStatus(GAME_STATUS.PLAYING);
  };

  const edit = () => {
    reset()
    setGameStatus(GAME_STATUS.EDIT);
  };
  
  const checkGameStatus = useCallback(() => {
    if (targetPosition[0] === position[0] && targetPosition[1] === position[1]) {
      setGameStatus(GAME_STATUS.WIN);
    }
    if (gameStatus !== GAME_STATUS.WIN && moves >= moveLimit) {
      setGameStatus(GAME_STATUS.LOSE);
    }
  }, [gameStatus, moveLimit, moves, position, targetPosition]);
  
  useEffect(()=>{checkGameStatus()},[checkGameStatus, position]);
  useEffect(()=>{},[moveLimit,targetPosition,startingPosition, availableCells]);

  const moveTo = useCallback((position: Position) => {
    setPosition(position);
    setMoves(moves + 1);
  }, [moves]);
  
  const changePosition = useCallback((key: String) => {
    switch (key) {
      case ARROW.DOWN:
        (availableCells[position[0] + 1] && availableCells[position[0] + 1][position[1]] === 1) && moveTo([position[0] + 1, position[1]]);
        break;
      case ARROW.UP:
        (availableCells[position[0] - 1] && availableCells[position[0] - 1][position[1]] === 1) && moveTo([position[0] - 1, position[1]]);
        break;
      case ARROW.LEFT:
        (availableCells[position[0]][position[1] - 1] && availableCells[position[0]][position[1] - 1] === 1) && moveTo([position[0], position[1] - 1]);
        break;
      case ARROW.RIGHT:
        (availableCells[position[0]][position[1] + 1] && availableCells[position[0]][position[1] + 1] === 1) && moveTo([position[0], position[1] + 1]);
        break;
    }
  }, [availableCells, moveTo, position]);
  
  const handleUserKeyPress = useCallback((event: any) => {
    const { key } = event;
    if (gameStatus === GAME_STATUS.PLAYING && Object.values(ARROW).indexOf(key) > -1) {
      changePosition(key);
    }
  }, [changePosition, gameStatus]);

    return (
      <>
      {gameStatus === GAME_STATUS.EDIT &&
      <>
        <LevelBuilder 
          targetPosition={targetPosition}
          availableCells={availableCells}
          startingPosition={startingPosition}
          setMoveLimit={ setMoveLimit}
          moveLimit={moveLimit}
          handleStartingPosition={handleStartingPosition}
          setAvailableCells={setAvailableCells}
          setTargetPosition={setTargetPosition}
        />
              <Button handleOnClick={start} text={'Play Again!'}/>
</>
      }
      <Labyrinth
        targetPosition={targetPosition}
        availableCells={availableCells}
        startingPosition={startingPosition}
        moves={moveLimit - moves}
        cellSize={cellSize}
        position={position}
        handleUserKeyPress={handleUserKeyPress}
      />
      {gameStatus === GAME_STATUS.LOSE &&
          (
            <div className={`modal red`} data-testid={'lose-message'}>
              <h2>
                YOU LOSE
                !
              </h2>
              <Button handleOnClick={start} text={'Play Again!'}/>
              <Button handleOnClick={edit} text={'Level Builder'}/>
            </div>
            )
        }
        {gameStatus === GAME_STATUS.WIN &&
          (
            <div className={'modal green'} data-testid={'win-message'}>
              <h2>
                YOU WIN!
              </h2>
              <Button handleOnClick={start} text={'Play Again!'}/>
              <Button handleOnClick={edit} text={'Level Builder'}/>
            </div>
            )
        }
      </>
    );
}

export default App;
