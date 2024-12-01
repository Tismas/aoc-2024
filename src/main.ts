const daysContainer = document.getElementById("days")!;
const solutionCanvas = document.getElementById("solution") as HTMLCanvasElement;
const ctx = solutionCanvas.getContext("2d")!;

window.addEventListener("resize", handleResize);

interface Module {
  part1: (ctx: CanvasRenderingContext2D) => void;
  part2: (ctx: CanvasRenderingContext2D) => void;
}

addButtons();

function loadDay({ part1 }: Module) {
  part1(ctx);
}

function handleResize() {
  solutionCanvas.width = window.innerWidth;
  solutionCanvas.height =
    window.innerHeight - daysContainer.getBoundingClientRect().height;
}

async function addButtons() {
  for (let i = 1; i <= 25; i++) {
    try {
      const module = (await import(`./solutions/${i}/index.ts`)) as Module;
      const dayTile = document.createElement("div");
      dayTile.classList.add("day-tile");
      dayTile.textContent = `Day ${i}`;
      dayTile.onclick = () => {
        for (const tile of daysContainer.getElementsByClassName("day-tile")) {
          tile.classList.remove("active");
        }
        dayTile.classList.add("active");
        loadDay(module);
      };
      daysContainer.appendChild(dayTile);
    } catch (e) {
      break;
    }
  }
  handleResize();
}
