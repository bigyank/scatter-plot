function createPlot(width, height, left, top, clickListener) {
  const plot = document.createElement("div");
  plot.style.backgroundColor = "blueviolet";
  plot.style.borderRadius = "50%";
  plot.style.width = width.toString().concat("px");
  plot.style.height = height.toString().concat("px");
  plot.style.position = "absolute";
  plot.style.left = left.toString().concat("px");
  plot.style.top = top.toString().concat("px");

  //    add click listener
  clickListener(plot);

  return plot;
}

function addClickLister(ele) {
  ele.addEventListener("click", ({ target }) => {
    const clickedItem = {
      x: parseInt(target.style.left),
      y: parseInt(target.style.top),
    };

    // mutate original array
    coordinates = coordinates.filter(
      (item) => JSON.stringify(item) !== JSON.stringify(clickedItem)
    );

    // replot
    scatterPlot();
  });
}

function createContainer(width, height) {
  const container = document.createElement("div");
  container.style.width = width;
  container.style.height = height;
  container.style.border = "1px solid grey";
  container.style.position = "relative";
  return container;
}

function scatterPlot() {
  const root = document.getElementById("root");

  // remove if container already exists
  if (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  const container = createContainer("600px", "600px");

  coordinates.forEach(({ x: xcor, y: ycor }) => {
    const dotWithEvent = createPlot(25, 25, xcor, ycor, addClickLister);
    container.appendChild(dotWithEvent);
  });

  root.appendChild(container);
}

let coordinates = [];

// randomly generate random ammount of coordinates
const maxcor = 8;
const mincor = 3;
let randomAmount = Math.floor(Math.random() * (maxcor - mincor + 1)) + mincor;

while (randomAmount > 0) {
  coordinates.push({
    x: Math.ceil(Math.random() * 550),
    y: Math.ceil(Math.random() * 550),
  });
  randomAmount--;
}

// call main function
scatterPlot();
