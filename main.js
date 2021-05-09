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

  coordinates.forEach(({ x, y }) => {
    const dotWithEvent = createPlot(25, 25, x, y, addClickLister);
    container.appendChild(dotWithEvent);
  });

  root.appendChild(container);
}

let coordinates = [
  { x: 100, y: 200 },
  { x: 400, y: 400 },
  { x: 300, y: 300 },
  { x: 400, y: 100 },
  { x: 100, y: 500 },
];

// call main function
scatterPlot();
