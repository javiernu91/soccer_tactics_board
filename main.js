const $ = (el) => document.querySelector(el);
const $$ = (els) => document.querySelectorAll(els);

const imageInput = $("#payer__input--image");
const playersSection = $(".players__beench--section");
const resetBtn = $(".player__button--reload");
const trashCan = $(".trash__section");
const fieldColorBtn1 = $("#field__color--first");
const fieldColorBtn2 = $("#field__color--second");

function createItem(src) {
  const imgElement = document.createElement("img");
  imgElement.draggable = true;
  imgElement.src = src;
  imgElement.className = "player__image";

  imgElement.addEventListener("dragstart", handlerDragStart);
  imgElement.addEventListener("dragend", handlerDragEnd);

  playersSection.appendChild(imgElement);
  // console.log(imgElement);
  return imgElement;
}

function useFilesToCreateItems(files) {
  if (files && files.length > 0) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (eventReader) => {
        createItem(eventReader.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
}

imageInput.addEventListener("change", (event) => {
  const { files } = event.target;
  useFilesToCreateItems(files);
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

playersSection.addEventListener("drop", handleDropFromDesktop);
playersSection.addEventListener("dragover", handleDragOverFromDesktop);

trashCan.addEventListener("dragover", handleDragOver);
trashCan.addEventListener("drop", handleDropDelete);
trashCan.addEventListener("dragleave", handleDragLeave);

function handleDropFromDesktop(event) {
  event.preventDefault();
  const { currentTarget, dataTransfer } = event;

  if (sourceContainer && draggedElement) {
    sourceContainer.removeChild(draggedElement);
  }

  if (dataTransfer.types.includes("Files")) {
    const { files } = dataTransfer;
    useFilesToCreateItems(files);
  }
  currentTarget.classList.remove("preview__drop--images");
}

function handleDragOverFromDesktop(event) {
  event.preventDefault();
  const { currentTarget, dataTransfer } = event;

  if (dataTransfer.types.includes("Files")) {
    currentTarget.classList.add("preview__drop--images");
  }
}

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
  currentTarget.classList.remove("preview__drop--images");
}
function handleDragOver(event) {
  event.preventDefault();

  const { currentTarget } = event;
  if (sourceContainer === currentTarget) return;
  currentTarget.classList.add("drag__over");
  currentTarget.classList.add("trash__drag--over");

  currentTarget.classList;
}
function handleDragLeave(event) {
  event.preventDefault();

  const { currentTarget } = event;

  currentTarget.classList.remove("drag__over");
  currentTarget.classList.remove("preview__drop--images");
  currentTarget.classList.remove("trash__drag--over");
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

//delete the element

function handleDropDelete(event) {
  event.preventDefault();
  draggedElement.remove();
}

resetBtn.addEventListener("click", () => {
  const items = $$(".field__container--section .field__section .player__image");
  items.forEach((item) => {
    item.remove();
    playersSection.appendChild(item);
  });
});

//Change the field color

function setFieldColor() {
  const firstSectionField = $$(".field__section");
  const allSections = [];
  const imparSections = [];
  const parSections = [];
  firstSectionField.forEach((section) => {
    allSections.push(section);
  });

  for (let i = 0; i < allSections.length; i++) {
    if (i % 2 === 0) {
      imparSections.push(allSections[i]);
    } else {
      parSections.push(allSections[i]);
    }
  }
  return [parSections, imparSections];
}

//Impar elements
fieldColorBtn1.addEventListener("input", () => {
  console.log(fieldColorBtn1.value);
  const [, imparSections] = setFieldColor();
  const color = fieldColorBtn1.value;
  imparSections.forEach((section) => {
    section.style.backgroundColor = color;
    section.style.opacity = 0.5;

    // console.log(section.getData);
  });
  console.log(imparSections);
});

//Par elements
fieldColorBtn2.addEventListener("input", () => {
  const [parSections] = setFieldColor();
  const color = fieldColorBtn2.value;
  parSections.forEach((section) => {
    section.style.backgroundColor = color;
    section.style.opacity = 0.5;
  });
});
