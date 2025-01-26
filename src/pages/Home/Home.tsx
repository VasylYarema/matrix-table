// pages/Home/Home.tsx
import React, { useEffect } from "react";
import MatrixTable from "../../components/MatrixTable";
import { useMatrix } from "../../context/MatrixContext";
import { generateMatrix } from "../../utils/matrixUtils";

const Home: React.FC = () => {
  const { setMatrix } = useMatrix();

  useEffect(() => {
    const initialMatrix = generateMatrix(5, 5); // For example, a 5x5 matrix
    setMatrix(initialMatrix);
  }, [setMatrix]);

  return (
    <div>
      <MatrixTable />
    </div>
  );
};

export default Home;
