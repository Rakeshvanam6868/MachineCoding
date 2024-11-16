const display = document.getElementById("display");

function appendSymbol(symbol) {
  display.value += symbol;
}

function clearDisplay() {
  display.value = "";
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

function calculateAdvanced(operation) {
  let currentValue = parseFloat(display.value);
  if (isNaN(currentValue)) {
    display.value = "Error";
    return;
  }

  switch (operation) {
    case "pow":
      const exponent = prompt("Enter exponent value:");
      if (isNaN(exponent)) {
        display.value = "Error";
      } else {
        display.value = Math.pow(currentValue, exponent);
      }
      break;

    case "log":
      display.value = Math.log10(currentValue).toFixed(6);
      break;

    case "sqrt":
      display.value = Math.sqrt(currentValue).toFixed(6);
      break;

    default:
      display.value = "Error";
  }
}
