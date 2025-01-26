# Frontend React Test Task

## Technical Requirements

- **Technologies**: Typescript, React, React Context
- **Do not use**: Redux, Redux Toolkit, Styled-components, UI libraries, CSS-in-JS

## Project Setup

1. Clone the repository to your local machine.
2. To deploy the production build to GitHub Pages, Heroku, or any other hosting platform, follow the respective instructions for deployment.

## Task Description

### Data Structure

1. **Matrix Generation**:
   - The matrix will have `M` rows and `N` columns, where:
     - `M` (0 <= M <= 100)
     - `N` (0 <= N <= 100)
   - Each cell in the matrix will contain the following structure:
     ```ts
     type CellId = number; // Unique ID for each cell
     type CellValue = number; // Random 3-digit number for each cell

     type Cell = {
       id: CellId,
       amount: CellValue
     }
     ```

### Table Structure

- Display all data in a table view with good UX.
- Show the generated values in each cell.
- Add an additional column to display the sum for each row.
- Add an additional row displaying the 50th percentile value for each column.

#### Example:

| **Cell Value M=1** | 1   | 5   | 6  | **Sum** |
|--------------------|-----|-----|----|---------|
| **Cell Value M=2** | 2   | 2   | 4  | **Sum** |
| **50th Percentile**| 1.5 | 3.5 | -  | -       |

### Features

1. **Increase Cell Value**:
   - Users should be able to increase the value of a cell by 1 when clicking on it. The sum and average values should update accordingly.

2. **Find Nearest Cells**:
   - Highlight `X` cells where the amount is closest to the value of the hovered cell.

   **Example**:  
   If `X = 5`, find 5 cells closest in value to the hovered cell and change the background color for those cells.

3. **Show Percentages for Row**:
   - When the user hovers over the sum cell of a row, replace the amount in each cell in the row with the percentage relative to the total value of the row.

4. **Heatmap**:
   - Build a row heatmap. Each cell in a row should have a background indicating its percentage of the maximum value in that row.

   **Example**:

   | **Cell Value M=1** | 2   | 5   | 7   | **Sum** |
   |--------------------|-----|-----|-----|---------|
   | **Cell Value M=2** | 16% | 84% | 100% | 6 (Hovered) |

5. **Row Management**:
   - Users should be able to add a new row to the table. Upon adding, the sum and average values should be recalculated.
   - Users should be able to remove any row, with recalculated sum and average values accordingly.

### Notes

- All code should be in a GitHub repository.
- The production build should be deployed to GitHub Pages, Heroku, or another hosting platform.
