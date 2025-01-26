import React, { useState } from "react";
import styles from "./Table.module.css";
import { Matrix } from "../../types";
import { calculateRowSum } from "../../utils/matrixUtils";

interface TableProps {
  matrix: Matrix;
  handleCellClick: (rowIdx: number, colIdx: number) => void;
  highlightedCells: Set<number>;
  handleCellHover: (rowIdx: number, colIdx: number) => void;
  handleSumHover: (rowIdx: number) => void;
  handleSumLeave: () => void;
  handleAddRow: () => void;
  handleRemoveRow: (rowIdx: number) => void;
  isHovered: boolean;
  hoveredRowIdx: number | null;
  hoveredCellIdx: { rowIdx: number; colIdx: number } | null;
  columnPercentiles: number[];
  getRowPercentages: (row: { id: number; amount: number }[]) => number[];
}

const Table: React.FC<TableProps> = ({
  matrix,
  handleCellClick,
  highlightedCells,
  handleCellHover,
  handleSumHover,
  handleSumLeave,
  handleAddRow,
  handleRemoveRow,
  isHovered,
  hoveredRowIdx,
  hoveredCellIdx,
  columnPercentiles,
  getRowPercentages,
}) => {
  const [nearestCells, setNearestCells] = useState<Set<number>>(new Set());

  const findNearestCells = (rowIdx: number, colIdx: number, X: number = 5) => {
    const cellValue = matrix[rowIdx][colIdx].amount;
    const flatMatrix = matrix.flat();

    const sortedCells = [...flatMatrix]
      .sort((a, b) => Math.abs(a.amount - cellValue) - Math.abs(b.amount - cellValue))
      .slice(0, X);

    const nearestCellIds = new Set(sortedCells.map(cell => cell.id));
    setNearestCells(nearestCellIds);
  };

  const clearNearestCells = () => {
    setNearestCells(new Set());
  };

  return (
    <div className={styles.tableContainer}>
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className={styles.headerCell}>Row</th>
            {matrix[0].map((_, idx) => (
              <th key={idx} className={styles.headerCell}>
                Cell values N = {idx + 1}
              </th>
            ))}
            <th className={styles.headerCell}>Sum values</th>
            <th className={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIdx) => {
            const percentages = isHovered && hoveredRowIdx === rowIdx ? getRowPercentages(row) : null;
            return (
              <tr key={rowIdx} className={rowIdx % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td className={styles.rowCell}>Row {rowIdx + 1}</td>
                {row.map((cell, colIdx) => {
                  const percentage = percentages ? percentages[colIdx] : null;
                  const isHoveredCell = hoveredCellIdx && hoveredCellIdx.rowIdx === rowIdx && hoveredCellIdx.colIdx === colIdx;
                  const isNearestCell = nearestCells.has(cell.id);

                  return (
                    <td
                      key={cell.id}
                      className={`${styles.cell} ${
                        highlightedCells.has(cell.id) ? styles.highlighted : ""
                      } ${isHoveredCell ? styles.hoveredCell : ""}`}
                      onClick={() => handleCellClick(rowIdx, colIdx)}
                      onMouseOver={() => {
                        handleCellHover(rowIdx, colIdx);
                        findNearestCells(rowIdx, colIdx);
                      }}
                      onMouseLeave={clearNearestCells}
                      style={{
                        backgroundColor: isNearestCell
                          ? 'rgba(255, 215, 0, 0.5)'
                          : percentage ? `rgba(255, 0, 0, ${percentage / 100})` : 'transparent',
                      }}
                    >
                      {isHovered && hoveredRowIdx === rowIdx
                        ? `${percentage?.toFixed(2)}%`
                        : cell.amount}
                    </td>
                  );
                })}
                <td
                  className={styles.cellSum}
                  onMouseEnter={() => handleSumHover(rowIdx)}
                  onMouseLeave={handleSumLeave}
                >
                  {calculateRowSum(row)}
                </td>
                <td className={styles.actionCell}>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveRow(rowIdx)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td className={styles.rowCell}>50th Percentile</td>
            {columnPercentiles.map((percentile, idx) => (
              <td key={idx} className={styles.cellPercentile}>
                {percentile}
              </td>
            ))}
            <td className={styles.cellPercentile}>-</td>
            <td className={styles.cellPercentile}>-</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <button
          className={styles.addRowButton}
          onClick={handleAddRow}
        >
          Add Row
        </button>
      </div>
    </div>
  );
};

export default Table;
