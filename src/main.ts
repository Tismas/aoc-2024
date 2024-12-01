const uiContainer = document.getElementById("ui")!;
const daysContainer = document.getElementById("days")!;
const partContainer = document.getElementById("part")!;
const solutionCanvas = document.getElementById("solution") as HTMLCanvasElement;
const ctx = solutionCanvas.getContext("2d")!;

window.addEventListener("resize", handleResize);
let activeModule: Module | null = null;
let partButtonsAdded = false;

interface Module {
  part1: (ctx: CanvasRenderingContext2D) => void;
  part2: (ctx: CanvasRenderingContext2D) => void;
}

addDayButtons();

function handleResize() {
  solutionCanvas.width = window.innerWidth;
  solutionCanvas.height =
    window.innerHeight - uiContainer.getBoundingClientRect().height;
}

function addPartButtons() {
  partButtonsAdded = true;
  const part1Button = document.createElement("button");
  part1Button.textContent = "Part 1";
  part1Button.onclick = () => {
    activeModule?.part1(ctx);
    part1Button.classList.add("active");
    part2Button.classList.remove("active");
  };
  const part2Button = document.createElement("button");
  part2Button.textContent = "Part 2";
  part2Button.onclick = () => {
    activeModule?.part2(ctx);
    part1Button.classList.remove("active");
    part2Button.classList.add("active");
  };

  partContainer.appendChild(part1Button);
  partContainer.appendChild(part2Button);

  handleResize();
}

async function addDayButtons() {
  for (let i = 1; i <= 25; i++) {
    try {
      const module = (await import(`./solutions/${i}/index.ts`)) as Module;
      const dayTile = document.createElement("button");
      dayTile.classList.add("day-tile");
      dayTile.textContent = `Day ${i}`;
      dayTile.onclick = () => {
        activeModule = module;
        for (const tile of daysContainer.getElementsByClassName("day-tile")) {
          tile.classList.remove("active");
        }
        dayTile.classList.add("active");

        if (!partButtonsAdded) {
          addPartButtons();
        }
      };
      daysContainer.appendChild(dayTile);
    } catch (e) {
      break;
    }
  }
  handleResize();
}
