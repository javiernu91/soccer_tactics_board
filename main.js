const $ = (el) => document.querySelector(el);
const $$ = (els) => document.querySelectorAll(els);

const imageInput = $("#payer__input--image");
const playersSection = $("#beench__section");

function createItem(src) {
  const imgElement = document.createElement("img");
  imgElement.draggable = true;
  imgElement.src = src;
  imgElement.className = "player__image";

  imgElement.addEventListener("dragstart", handlerDragStart);
  imgElement.addEventListener("dragend", handlerDragEnd);

  playersSection.appendChild(imgElement);
  console.log(imgElement);
  return imgElement;
}

imageInput.addEventListener("change", (event) => {
  const { files } = event.target;

  if (files && files.length > 0) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (eventReader) => {
        createItem(eventReader.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
});

let draggedElement = null;
let sourceContainer = null;

const boardSection = $$(".field__section");

boardSection.forEach((section) => {
  section.addEventListener("dragover", handleDragOver);
  section.addEventListener("drop", handleDrop);
  section.addEventListener("dragleave", handleDragLeave);
});

playersSection.addEventListener("dragover", handleDragOver);
playersSection.addEventListener("drop", handleDrop);
playersSection.addEventListener("dragleave", handleDragLeave);

function handleDrop(event) {
  event.preventDefault();

  const { currentTarget, dataTransfer } = event;

  if (sourceContainer && draggedElement) {
    sourceContainer.removeChild(draggedElement);
  }

  if (draggedElement) {
    const src = dataTransfer.getData("text/plain");
    const imgElement = createItem(src);
    currentTarget.appendChild(imgElement);
  }
  currentTarget.classList.remove("drag__over");
}
function handleDragOver(event) {
  event.preventDefault();

  const { currentTarget } = event;
  if (sourceContainer === currentTarget) return;
  currentTarget.classList.add("drag__over");

  currentTarget.classList;
}
function handleDragLeave(event) {
  event.preventDefault();

  const { currentTarget } = event;

  currentTarget.classList.remove("drag__over");
}

function handlerDragStart(event) {
  draggedElement = event.target;
  sourceContainer = draggedElement.parentNode;
  event.dataTransfer.setData("text/plain", draggedElement.src);
}

function handlerDragEnd(event) {
  draggedElement = null;
  sourceContainer = null;
}
