const leftInput = document.querySelector(".converter__leftInput");
const rightInput = document.querySelector(".converter__rightInput");
const leftSelect = document.querySelector(".converter__leftSelect");
const rightSelect = document.querySelector(".converter__rightSelect");
const transferButton = document.querySelector(".converter__transfer");
const typeButtons = document.querySelectorAll(".typeSelection div");
const topMenuButtons = document.querySelectorAll(".topMenu li");

for (menuButton of topMenuButtons) {
  menuButton.addEventListener("click", buttonClickHandler, true);
}

for (button of typeButtons) {
  button.addEventListener("click", buttonClickHandler, true);
}

leftInput.addEventListener("change", leftInputChangeHandler);
leftSelect.addEventListener("change", leftInputChangeHandler);
rightSelect.addEventListener("change", leftInputChangeHandler);
transferButton.addEventListener("click", transferButtonHandler);

function buttonClickHandler(event) {
  const buttonId = event.currentTarget.id;
  leftInput.value = rightInput.value = 0;
  renderFirstOptionElement();
  renderUnitOptionsElement(buttonId);
  leftSelect.style.color = rightSelect.style.color = "white";
  leftSelect.style.backgroundColor = rightSelect.style.backgroundColor =
    "rgba(34, 40, 49, 0.9)";
  leftSelect.id = event.currentTarget.id;
}

function renderFirstOptionElement() {
  const firstOption = leftSelect.firstElementChild.cloneNode(true);
  leftSelect.innerHTML = rightSelect.innerHTML = "";
  leftSelect.appendChild(firstOption);
  rightSelect.appendChild(firstOption.cloneNode(true));
}

function renderUnitOptionsElement(buttonId) {
  for (object of units[`${buttonId}`]) {
    const optionElement = document.createElement("option");
    optionElement.value = optionElement.textContent = object.name;
    leftSelect.appendChild(optionElement);
    rightSelect.appendChild(optionElement.cloneNode(true));
  }
}

function leftInputChangeHandler() {
  let leftUnitObject;
  for (object of units[`${leftSelect.id}`]) {
    if (object.name === leftSelect.value) leftUnitObject = object;
  }
  rightInputUpdater(leftUnitObject);
}

function rightInputUpdater(leftUnitObject) {
  if (
    leftSelect.value !== "" &&
    rightSelect.value !== "" &&
    leftInput.value !== "0"
  ) {
    const result =
      leftSelect.value === rightSelect.value
        ? parseFloat(leftInput.value)
        : leftInput.value *
          leftUnitObject[
            `${rightSelect.value.toLowerCase()}Pattern`.replace(/\s+/g, "_")
          ];
    if (result % 1 > 0) {
      rightInput.value = result.toFixed(2);
    } else rightInput.value = result.toFixed(0);
  }
}

function transferButtonHandler() {
  const temporaryStorage = rightSelect.value;
  rightSelect.value = leftSelect.value;
  leftSelect.value = temporaryStorage;
  leftInputChangeHandler();
}
