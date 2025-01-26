import React, { useState } from "react";
import { calculateColumnPercentiles } from "../utils/matrixUtils";
import Table from "./Table/Table";
import { useMatrix } from "../context/MatrixContext";

const MatrixTable: React.FC = () => {
  const { matrix, setMatrix } = useMatrix();
  const [highlightedCells, setHighlightedCells] = useState<Set<number>>(new Set());
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredRowIdx, setHoveredRowIdx] = useState<number | null>(null);
  const [hoveredCellIdx, setHoveredCellIdx] = useState<{ rowIdx: number; colIdx: number } | null>(null);

  const handleCellClick = (rowIdx: number, colIdx: number) => {
    const newMatrix = matrix.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIdx && cIdx === colIdx) {
          return { ...cell, amount: cell.amount + 1 };
        }
        return cell;
      })
    );
    setMatrix(newMatrix);
  };

  const handleCellHover = (rowIdx: number, colIdx: number) => {
    const targetAmount = matrix[rowIdx][colIdx].amount;
    const flattenedCells = matrix.flat();
    const closestCells = [...flattenedCells]
      .sort((a, b) => Math.abs(a.amount - targetAmount) - Math.abs(b.amount - targetAmount))
      .slice(0, 5);
    const highlightedIds = new Set(closestCells.map((cell) => cell.id));
    setHighlightedCells(highlightedIds);
    setHoveredCellIdx({ rowIdx, colIdx });
  };

  const handleSumHover = (rowIdx: number) => {
    setIsHovered(true);
    setHoveredRowIdx(rowIdx);
  };

  const handleSumLeave = () => {
    setIsHovered(false);
    setHoveredRowIdx(null);
    setHoveredCellIdx(null);
  };

  const handleAddRow = () => {
    const newRow = Array.from({ length: matrix[0].length }, (_, idx) => ({
      id: matrix.flat().length + idx,
      amount: Math.floor(100 + Math.random() * 900),
    }));
    setMatrix([...matrix, newRow]);
  };

  const handleRemoveRow = (rowIdx: number) => {
    const newMatrix = matrix.filter((_, idx) => idx !== rowIdx);
    setMatrix(newMatrix);
  };

  const getRowPercentages = (row: { id: number; amount: number }[]) => {
    const maxAmount = Math.max(...row.map(cell => cell.amount));
    return row.map(cell => (maxAmount === 0 ? 0 : (cell.amount / maxAmount) * 100));
  };

  const columnPercentiles = calculateColumnPercentiles(matrix, 50);

  return (
    <div>
      <h1>Matrix Table</h1>
      <Table
        matrix={matrix}
        handleCellClick={handleCellClick}
        highlightedCells={highlightedCells}
        handleCellHover={handleCellHover}
        handleSumHover={handleSumHover}
        handleSumLeave={handleSumLeave}
        handleAddRow={handleAddRow}
        handleRemoveRow={handleRemoveRow}
        isHovered={isHovered}
        hoveredRowIdx={hoveredRowIdx}
        hoveredCellIdx={hoveredCellIdx}
        columnPercentiles={columnPercentiles}
        getRowPercentages={getRowPercentages}
      />
    </div>
  );
};

export default MatrixTable;
