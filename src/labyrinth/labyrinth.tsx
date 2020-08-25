import React, { useEffect } from 'react';
import Matrix from 'matrix-component';
import { Position } from '../constants';

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

  const list = availableCells.map(
    (row, rowIndex) => row.map(
      (cell, cellIndex) => {
        if (position[0] === rowIndex && position[1] === cellIndex) return { classes: 'player' };
        if (targetPosition[0] === rowIndex && targetPosition[1] === cellIndex) return { classes: 'target' };
        if (cell === 1) return { classes: 'available' };
        return { classes: 'wall' };
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
