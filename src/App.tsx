import React from "react";
import { MatrixProvider } from "./context/MatrixContext";
import Home from "./pages/Home/Home";

const App: React.FC = () => {
  return (
    <MatrixProvider>
      <Home />
    </MatrixProvider>
  );
};

export default App;
