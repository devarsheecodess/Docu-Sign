document.addEventListener("DOMContentLoaded", function () {
  const back_clr = document.getElementById("bg-clr");
  const font_clr = document.getElementById("font-clr");
  const fontSizeInput = document.getElementById("fontSize");


  const canvas = document.getElementById("canvas");


  const clearButton = document.getElementById("clearCanvas");
  const saveButton = document.getElementById("saveCanvas");
  const retrieveButton = document.getElementById("retrieveCanvas");


  const ctx = canvas.getContext("2d");


  let isDrawing = false;


  let paths = [];


  if (window.screen.width <= 660) {
    alert("This application functions only on PC / laptops!");
  }


  canvas.style.backgroundColor = back_clr.value;

  
  ctx.strokeStyle = font_clr.value;


  ctx.lineWidth = fontSizeInput.value;


  back_clr.addEventListener("input", function () {
    canvas.style.backgroundColor = back_clr.value;
  });


  font_clr.addEventListener("input", function () {
    ctx.strokeStyle = font_clr.value;
  });


  fontSizeInput.addEventListener("input", function () {
    ctx.lineWidth = fontSizeInput.value;
  });


  clearButton.addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paths = [];
  });


  saveButton.addEventListener("click", function () {
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });


  retrieveButton.addEventListener("click", function () {
    if (paths.length > 0) {
      paths.pop();
      redrawCanvas();
    }
  });


  function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paths.forEach((path) => {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.stroke();
    });
  }


  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const x = e.offsetX;
    const y = e.offsetY;
    paths.push([{ x, y }]);
  });


  canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
      const x = e.offsetX;
      const y = e.offsetY;
      paths[paths.length - 1].push({ x, y });
      redrawCanvas();
    }
  });


  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
  });


  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
  });
});