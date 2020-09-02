import React, { useEffect } from 'react';
import Matrix from 'matrix-component';
import { Position } from '../../constants';

export interface Props {
  targetPosition: Position;
  availableCells: any[][];
  startingPosition: Position;
  moves?: number;
  cellSize?: number;
  shadow?: boolean;
  visibleCells?: number;
  position:Position;
  handleUserKeyPress?: any;
}

const Labyrinth = (props: Props) => {
  const {
    targetPosition, availableCells, handleUserKeyPress, moves ,position,
  } = props;

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const matchPosition = (cell: Position, position: Position) => position[0] === cell[0] && position[1] === cell[1];
  const isPlayerPosition = (cell: Position, playerPosition: Position) => matchPosition(playerPosition, cell);
  const isTargetPosition = (cell: Position, targetPosition: Position) => matchPosition(targetPosition, cell);
  
  const available = { classes: 'bg-White border' };
  const wall =  { classes: 'bg-gray border' };
  const finish = { classes: 'bg-green border' }
  const player = { classes: 'ball ball-green border' };
  const target = { classes: 'ball ball-white bg-green border' };

  const list = availableCells.map(
    (row, rowIndex) => row.map(
      (cell, cellIndex) => {
        if (isPlayerPosition([rowIndex,cellIndex],position) && isTargetPosition([rowIndex,cellIndex],targetPosition)) return finish;
        if (isPlayerPosition([rowIndex,cellIndex],position)) return player;
        if (isTargetPosition([rowIndex,cellIndex],targetPosition)) return target;
        if (cell === 1) return available
        return wall ;
      },
    ),
  );

  return (
    <main>
      <Matrix list={list} />
      <div className="moves" data-testid="moves-message">
        moves left
        <span className={moves > 0 ? 'green' : 'red'} > {moves}</span>
      </div>
    </main>
  );
};

export default Labyrinth;
