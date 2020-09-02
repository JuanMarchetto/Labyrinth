import React, { useEffect } from 'react';
import { Position } from '../../constants';

export interface Props {
  targetPosition: Position;
  availableCells: any[][];
  startingPosition: Position;
  setMoveLimit: any;
  moveLimit: number;
  handleStartingPosition: any;
  setAvailableCells: any;
  setTargetPosition: any;
}

const LevelBuilder = ({
  targetPosition,
  availableCells,
  startingPosition,
  setMoveLimit,
  moveLimit,
  handleStartingPosition,
  setAvailableCells,
  setTargetPosition,
}: Props) =>{

useEffect(() => {}, [targetPosition, availableCells, startingPosition, moveLimit]);
return (
<div className={'edit'}>
<strong>Size</strong>
<label>
  Rows:
  <input
    type="number"
    value={5}
    onChange={() => alert("TODO")}
  />
</label>
<label>
  Cells:
  <input
    type="number"
    value={5}
    onChange={() => () => alert("TODO")}
  />
</label>
<strong>Start</strong>
<label>
  R:
  <input
    type="number"
    value={startingPosition[0]}
    onChange={e => handleStartingPosition([parseInt(e.target.value),startingPosition[1]])}
  />
</label>
<label>
  C:
  <input
    type="number"
    value={startingPosition[1]}
    onChange={e => handleStartingPosition([startingPosition[0],parseInt(e.target.value)])}
  />
</label>
<strong>End</strong>
<label>
  R:
  <input
    type="number"
    value={targetPosition[0]}
    onChange={e => setTargetPosition([parseInt(e.target.value),targetPosition[1]])}
  />
</label>
<label>
  C:
  <input
    type="number"
    value={targetPosition[1]}
    onChange={e => setTargetPosition([targetPosition[0],parseInt(e.target.value)])}
  />
</label>
<label>
  Max Moves:
  <input
    type="number"
    value={moveLimit}
    onChange={e => setMoveLimit(parseInt(e.target.value))}
  />
</label>
{/*TODO: WALL/EMPTY SELECTOR*/}
</div>

)}

export default LevelBuilder;
