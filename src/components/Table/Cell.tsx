import React from "react";

type CellProps = {
  cell: { id: number; amount: number };
};

const Cell: React.FC<CellProps> = ({ cell }) => {
  return <td>{cell.amount}</td>;
};

export default Cell;
