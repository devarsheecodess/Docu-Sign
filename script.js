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
    const { offsetX, offsetY } = e;
    paths.push([{ x: offsetX, y: offsetY }]);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e;
    paths[paths.length - 1].push({ x: offsetX, y: offsetY });
    redrawCanvas();
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
  });

  const toggle = document.getElementById('toggle')
  const black = document.querySelectorAll('.black-text')
  
  const logo = "fa-moon"
  toggle.innerHTML = `<i class="fa-solid ${logo}" style="color: #ffffff; font-size: 25px"></i>`

  let flag = true;

  toggle.addEventListener('click', ()=>{
    flag = !flag

    if(flag){
      document.body.style.backgroundColor = 'white'

      black.forEach(element => {
        element.style.color = "black"
      });

      canvas.style.backgroundColor = 'black'
      const logo = "fa-moon"

      toggle.innerHTML = `<i class="fa-solid ${logo}" style="color: #ffffff; font-size: 25px"></i>`
    } else{
      document.body.style.backgroundColor = 'rgb(4, 4, 19)'

      black.forEach(element => {
        element.style.color = "white"
      });

      canvas.style.backgroundColor = 'white'
      const logo = "fa-sun"

      toggle.innerHTML = `<i class="fa-solid ${logo}" style="color: #ffffff; font-size: 25px"></i>`
    }
  })
});