export default function generate(rowCount = 9, colCount = 9, bombsToPlace = 9) {
  let rows = Array.from({ length: rowCount }, (_, rowIndex) =>
    createRow(rowIndex)
  );
  let cells = rows.reduce((cells, row) => [...cells, ...row], []);
  placeBombs(cells, bombsToPlace);

  cells.forEach((cell) => {
    return (cell.bombCount = getBombCount(rows, cell.rowIndex, cell.colIndex));
  });

  return rows;

  function createRow(rowIndex) {
    return Array.from({ length: colCount }, (_, colIndex) => ({
      rowIndex,
      colIndex,
      covered: true,
      flagged: false,
      bomb: false,
      bombCount: 0,
    }));
  }
}

function placeBombs(cells, bombsToPlace) {
  if (bombsToPlace === 0) return cells;
  const randomCellIndex = Math.floor(Math.random() * cells.length);
  if (cells[randomCellIndex].bomb) return placeBombs(cells, bombsToPlace);
  cells[randomCellIndex].bomb = true;
  return placeBombs(cells, bombsToPlace - 1);
}

function getBombCount(rows, rowIndex, colIndex) {
  let bombCount = 0;
  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    if (!rows[rowIndex + rowOffset]) continue;
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
      const neighbour = rows[rowIndex + rowOffset][colIndex + colOffset];
      if (neighbour && neighbour.bomb) {
        bombCount++;
      }
    }
  }
  return bombCount;
}
