export const generateMatrix = (rows: number, cols: number) => {
  let id = 0;
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ id: id++, amount: Math.floor(100 + Math.random() * 900) }))
  );
};

export const calculateRowSum = (row: { amount: number }[]): number =>
  row.reduce((sum, cell) => sum + cell.amount, 0);

export const calculatePercentile = (values: number[], percentile: number): number => {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.floor((percentile / 100) * (sorted.length - 1));
  return sorted[index];
};

export const calculateColumnPercentiles = (
  matrix: { amount: number }[][],
  percentile: number
): number[] => {
  const cols = matrix[0]?.length || 0;
  return Array.from({ length: cols }, (_, colIdx) =>
    calculatePercentile(matrix.map((row) => row[colIdx].amount), percentile)
  );
};