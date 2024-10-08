import { MouseEvent } from "react";
import { TCell, TNearestCellsCache } from "./interfaces";

export const prepareNearestCells = (
  nearestCells: HTMLTableCellElement[],
  isReset = false
) => {
  nearestCells.forEach((cell) => {
    if (isReset) {
      cell.style.backgroundColor = "";
      cell.style.color = "";
    } else {
      cell.style.backgroundColor = "rgb(179, 157, 219)";
      cell.style.color = "#fff";
    }
  });
};

export function handleMouseOutAmountCell(this: TNearestCellsCache) {
  if (this.targetCells.length) {
    prepareNearestCells(this.targetCells, true);
  }
}

export const handleMouseOutSum = (
  e: MouseEvent<HTMLTableCellElement>,
  rowCells: TCell[]
) => {
  e.stopPropagation();

  const childNodes = e.currentTarget.closest("tr")?.childNodes as
    | NodeListOf<HTMLTableCellElement>
    | undefined;

  if (!childNodes) {
    return;
  }

  childNodes.forEach((node, i) => {
    if (node.className === "amount-cell") {
      // ATTENTION i - 1 below means that first cell in a row is not "amount-cell"
      node.textContent = String(rowCells[i - 1].amount);
      node.style.backgroundColor = "";
    }
  });
};
