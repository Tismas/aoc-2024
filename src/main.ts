import { clearCanvas } from "./helpers/animations/runAnimations";

const uiContainer = document.getElementById("ui")!;
const daysContainer = document.getElementById("days")!;
const partContainer = document.getElementById("part")!;
const solutionCanvas = document.getElementById("solution") as HTMLCanvasElement;
const puzzleInputContainer = document.getElementById("puzzle-input-wrapper") as HTMLDivElement;
const puzzleInputElement = document.getElementById("puzzle-input") as HTMLTextAreaElement;
const runButton = document.getElementById("run-button") as HTMLButtonElement;
const ctx = solutionCanvas.getContext("2d")!;

window.addEventListener("resize", handleResize);
const activeModuleLastVisitKey = "last-active-module";
let activeModuleLastVisit = localStorage.getItem(activeModuleLastVisitKey);
const activePartLastVisitKey = "last-active-part";
let activePartLastVisit = localStorage.getItem(activePartLastVisitKey);
let activeModule: Module | null = null;
let activePart: 1 | 2 | null = null;

interface Module {
  part1: (ctx: CanvasRenderingContext2D, input: string) => void;
  part2: (ctx: CanvasRenderingContext2D, input: string) => void;
  input: string;
}

addDayButtons();

const runSolution = () => {
  if (!activeModule) return;

  handleResize();
  clearCanvas();

  if (activePart === 1) {
    activeModule.part1(ctx, puzzleInputElement.value);
  } else if (activePart === 2) {
    activeModule.part2(ctx, puzzleInputElement.value);
  }
};

function handleResize() {
  solutionCanvas.width = window.innerWidth;
  solutionCanvas.height =
    window.innerHeight -
    uiContainer.getBoundingClientRect().height -
    puzzleInputContainer.getBoundingClientRect().height -
    10;
}

function addPartButtons() {
  const part1Button = document.createElement("button");
  part1Button.textContent = "Part 1";
  part1Button.onclick = () => {
    if (!activeModule) return;
    activePart = 1;
    puzzleInputElement.value = activeModule.input || "";
    puzzleInputContainer.style.visibility = "visible";
    runSolution();
    part1Button.classList.add("active");
    part2Button.classList.remove("active");
    localStorage.setItem(activePartLastVisitKey, "1");
  };
  const part2Button = document.createElement("button");
  part2Button.textContent = "Part 2";
  part2Button.onclick = () => {
    if (!activeModule) return;
    activePart = 2;
    puzzleInputElement.value = activeModule.input || "";
    puzzleInputContainer.style.visibility = "visible";
    runSolution();
    part1Button.classList.remove("active");
    part2Button.classList.add("active");
    localStorage.setItem(activePartLastVisitKey, "2");
  };

  partContainer.appendChild(part1Button);
  partContainer.appendChild(part2Button);

  handleResize();

  if (activePartLastVisit === "1") {
    part1Button.click();
  }
  if (activePartLastVisit === "2") {
    part2Button.click();
  }
}

async function addDayButtons() {
  for (let i = 1; i <= 25; i++) {
    try {
      const module = (await import(`./solutions/${i}/index.ts`)) as Module;
      const dayTile = document.createElement("button");
      dayTile.classList.add("day-tile");
      dayTile.textContent = `Day ${i}`;
      dayTile.onclick = () => {
        activeModuleLastVisit = i.toString();
        localStorage.setItem(activeModuleLastVisitKey, i.toString());
        activeModule = module;
        clearCanvas();
        partContainer.replaceChildren();
        puzzleInputContainer.style.visibility = "hidden";

        for (const tile of daysContainer.getElementsByClassName("day-tile")) {
          tile.classList.remove("active");
        }
        dayTile.classList.add("active");

        addPartButtons();
      };
      if (activeModuleLastVisit === i.toString()) {
        dayTile.click();
      }
      daysContainer.appendChild(dayTile);
    } catch (e) {
      break;
    }
  }
  handleResize();
}

runButton.addEventListener("click", runSolution);
