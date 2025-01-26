import React from "react";
import Cell from "./Cell";

type RowProps = {
  row: { id: number; amount: number }[];
};

const Row: React.FC<RowProps> = ({ row }) => {
  const sum = row.reduce((acc, cell) => acc + cell.amount, 0);

  return (
    <tr>
      {row.map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
      <td>{sum}</td>
    </tr>
  );
};

export default Row;
