function showGraph() {
  var graphDiv = document.getElementById("graph-div");
  graphDiv.style.display = "block";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          // Parse the JSON response from the server
          var response = JSON.parse(xhr.responseText);
          // Update the result element with the new data
          document.getElementById("result").innerHTML = response.html;
      }
  };
  xhr.send("pressure=" + document.getElementById("PT").value + "&temperature=" + document.getElementById("PT").value);
}




const inputSelect = document.querySelector('#input-select');

function selectInput() {
const selectValue = inputSelect.value;
const PTdiv = document.querySelector("#PT-div");
const PEdiv = document.querySelector("#PE-div");
const PHdiv = document.querySelector("#PH-div");
const PXdiv = document.querySelector("#PX-div");
const TEdiv = document.querySelector("#TE-div");
const THdiv = document.querySelector("#TH-div");
const TXdiv = document.querySelector("#TX-div");
const HEdiv = document.querySelector("#HE-div");
const HXdiv = document.querySelector("#HX-div");
const EXdiv = document.querySelector("#EX-div");

switch (selectValue) {
  case "PT":
    PTdiv.style.display = "block";
    PEdiv.style.display = "none";
    PHdiv.style.display = "none";
    PXdiv.style.display = "none";
    TEdiv.style.display = "none";
    THdiv.style.display = "none";
    TXdiv.style.display = "none";
    HEdiv.style.display = "none";
    HXdiv.style.display = "none";
    EXdiv.style.display = "none";
    break;
  case "PE":
    PTdiv.style.display = "none";
    PEdiv.style.display = "block";
    PHdiv.style.display = "none";
    PXdiv.style.display = "none";
    TEdiv.style.display = "none";
    THdiv.style.display = "none";
    TXdiv.style.display = "none";
    HEdiv.style.display = "none";
    HXdiv.style.display = "none";
    EXdiv.style.display = "none";
    break;
  case "PH":
    PTdiv.style.display = "none";
    PEdiv.style.display = "none";
    PHdiv.style.display = "block";
    PXdiv.style.display = "none";
    TEdiv.style.display = "none";
    THdiv.style.display = "none";
    TXdiv.style.display = "none";
    HEdiv.style.display = "none";
    HXdiv.style.display = "none";
    EXdiv.style.display = "none";
    break;
  case "PX":
    PTdiv.style.display = "none";
    PEdiv.style.display = "none";
    PHdiv.style.display = "none";
    PXdiv.style.display = "block";
    TEdiv.style.display = "none";
    THdiv.style.display = "none";
    TXdiv.style.display = "none";
    HEdiv.style.display = "none";
    HXdiv.style.display = "none";
    EXdiv.style.display = "none";
    break;
  case "TE":
    PTdiv.style.display = "none";
    PEdiv.style.display = "none";
    PHdiv.style.display = "none";
    PXdiv.style.display = "none";
    TEdiv.style.display = "block";
    THdiv.style.display = "none";
    TXdiv.style.display = "none";
    HEdiv.style.display = "none";
    HXdiv.style.display = "none";
    EXdiv.style.display = "none";
    break;
  case "TH":
    PTdiv.style.display = "none";
    PEdiv.style.display = "none";
    PHdiv.style.display = "none";
    PXdiv.style.display = "none";
    TEdiv.style.display = "none";
    THdiv.style.display = "block";
    TXdiv.style.display = "none";
    HEdiv.style.display = "none";
    HXdiv.style.display = "none";
    EXdiv.style.display = "none";
    break;
  case "TX":
    PTdiv.style.display = "none";
    PEdiv.style.display = "none";
    PHdiv.style.display = "none";
    PXdiv.style.display = "none";
    TEdiv.style.display = "none";
    THdiv.style.display = "none";
    TXdiv.style.display = "block";
    HEdiv.style.display = "none";
    HXdiv.style.display = "none";
    EXdiv.style.display = "none";
    break;
  case "HE":
    PTdiv.style.display = "none";
    PEdiv.style.display = "none";
    PHdiv.style.display = "none";
    PXdiv.style.display = "none";
    TEdiv.style.display = "none";
    THdiv.style.display = "none";
    TXdiv.style.display = "none";
    HEdiv.style.display = "block";
    HXdiv.style.display = "none";
    EXdiv.style.display = "none";
    break;
  case "HX":
    PTdiv.style.display = "none";
    PEdiv.style.display = "none";
    PHdiv.style.display = "none";
    PXdiv.style.display = "none";
    TEdiv.style.display = "none";
    THdiv.style.display = "none";
    TXdiv.style.display = "none";
    HEdiv.style.display = "none";
    HXdiv.style.display = "block";
    EXdiv.style.display = "none";
    break;
  case "EX":
    PTdiv.style.display = "none";
    PEdiv.style.display = "none";
    PHdiv.style.display = "none";
    PXdiv.style.display = "none";
    TEdiv.style.display = "none";
    THdiv.style.display = "none";
    TXdiv.style.display = "none";
    HEdiv.style.display = "none";
    HXdiv.style.display = "none";
    EXdiv.style.display = "block";
    break;
  default:
    break;
}
}

document.querySelector('#pressure-unit').addEventListener('change', function () {
document.querySelector('#pressure_unit').value = this.value;
});

document.querySelector('#temperature-unit').addEventListener('change', function () {
document.querySelector('#temperature_unit').value = this.value;
});

document.addEventListener("DOMContentLoaded", function() {
const inputSelect = document.querySelector("#input-select");
const selectedValue = localStorage.getItem("selectedValue");

if (selectedValue) {
  inputSelect.value = selectedValue;
} else {
  inputSelect.value = "PT";
}

selectInput();

inputSelect.addEventListener("change", function() {
  localStorage.setItem("selectedValue", this.value);
  selectInput();
});
});

document.addEventListener("DOMContentLoaded", function() {
const pressureUnitSelect = document.querySelector("#pressure-unit");
const pressureUnitSelect1 = document.querySelector("#pressure1-unit");
const pressureUnitSelect2 = document.querySelector("#pressure2-unit");
const pressureUnitSelect3 = document.querySelector("#pressure3-unit");
const temperatureUnitSelect = document.querySelector("#temperature-unit");
const temperatureUnitSelect1 = document.querySelector("#temperature1-unit");
const temperatureUnitSelect2 = document.querySelector("#temperature2-unit");
const temperatureUnitSelect3 = document.querySelector("#temperature3-unit");
const entropyUnitSelect = document.querySelector("#entropy-unit");
const entropyUnitSelect1 = document.querySelector("#entropy1-unit");
const entropyUnitSelect2 = document.querySelector("#entropy2-unit");
const entropyUnitSelect3 = document.querySelector("#entropy3-unit");
const enthalpyUnitSelect = document.querySelector("#enthalpy-unit");
const enthalpyUnitSelect1 = document.querySelector("#enthalpy1-unit");
const enthalpyUnitSelect2 = document.querySelector("#enthalpy2-unit");
const enthalpyUnitSelect3 = document.querySelector("#enthalpy3-unit");
const drynessUnitSelect = document.querySelector("#dryness-unit");
const drynessUnitSelect1 = document.querySelector("#dryness1-unit");
const drynessUnitSelect2 = document.querySelector("#dryness2-unit");
const drynessUnitSelect3 = document.querySelector("#dryness3-unit");

const selectedPressureUnit = localStorage.getItem("selectedPressureUnit");
const selectedTemperatureUnit = localStorage.getItem("selectedTemperatureUnit");
const selectedTemperatureUnit1 = localStorage.getItem("selectedTemperatureUnit1");
const selectedTemperatureUnit2 = localStorage.getItem("selectedTemperatureUnit2");
const selectedTemperatureUnit3 = localStorage.getItem("selectedTemperatureUnit3");
const selectedPressureUnit1 = localStorage.getItem("selectedPressureUnit1");
const selectedPressureUnit2 = localStorage.getItem("selectedPressureUnit2");
const selectedPressureUnit3 = localStorage.getItem("selectedPressureUnit3");
const selectedEnthalpyUnit = localStorage.getItem("selectedEnthalpyUnit");
const selectedEnthalpyUnit1 = localStorage.getItem("selectedEnthalpyUnit1");
const selectedEnthalpyUnit2 = localStorage.getItem("selectedEnthalpyUnit2");
const selectedEnthalpyUnit3 = localStorage.getItem("selectedEnthalpyUnit3");
const selectedDrynessUnit = localStorage.getItem("selectedDrynessUnit");
const selectedDrynessUnit1 = localStorage.getItem("selectedDrynessUnit1");
const selectedDrynessUnit2 = localStorage.getItem("selectedDrynessUnit2");
const selectedDrynessUnit3 = localStorage.getItem("selectedDrynessUnit3");
const entropyUnitValue = localStorage.getItem("entropyUnitValue");
const entropyUnitValue1 = localStorage.getItem("entropyUnitValue1");
const entropyUnitValue2 = localStorage.getItem("entropyUnitValue2");
const entropyUnitValue3 = localStorage.getItem("entropyUnitValue3");

if (selectedPressureUnit) {
  pressureUnitSelect.value = selectedPressureUnit;
} else {
  pressureUnitSelect.value = "MPA";
}
if (selectedPressureUnit1) {
  pressureUnitSelect1.value = selectedPressureUnit1;
} else {
  pressureUnitSelect1.value = "MPA";
}
if (selectedPressureUnit2) {
  pressureUnitSelect2.value = selectedPressureUnit2;
} else {
  pressureUnitSelect2.value = "MPA";
}
if (selectedPressureUnit3) {
  pressureUnitSelect3.value = selectedPressureUnit3;
} else {
  pressureUnitSelect3.value = "MPA";
}

if (selectedTemperatureUnit) {
  temperatureUnitSelect.value = selectedTemperatureUnit;
} else {
  temperatureUnitSelect.value = "C";
}
if (selectedTemperatureUnit1) {
  temperatureUnitSelect1.value = selectedTemperatureUnit1;
} else {
  temperatureUnitSelect1.value = "C";
}
if (selectedTemperatureUnit2) {
  temperatureUnitSelect2.value = selectedTemperatureUnit2;
} else {
  temperatureUnitSelect2.value = "C";
}
if (selectedTemperatureUnit3) {
  temperatureUnitSelect3.value = selectedTemperatureUnit3;
} else {
  temperatureUnitSelect3.value = "C";
}



if (entropyUnitValue) {
  entropyUnitSelect.value = entropyUnitValue;
} else {
  entropyUnitSelect.value = "kJ/kg-K";
}
if (entropyUnitValue1) {
  entropyUnitSelect1.value = entropyUnitValue1;
} else {
  entropyUnitSelect1.value = "kJ/kg-K";
}
if (entropyUnitValue2) {
  entropyUnitSelect2.value = entropyUnitValue2;
} else {
  entropyUnitSelect2.value = "kJ/kg-K";
}
if (entropyUnitValue3) {
  entropyUnitSelect3.value = entropyUnitValue3;
} else {
  entropyUnitSelect3.value = "kJ/kg-K";
}


if (selectedEnthalpyUnit) {
  enthalpyUnitSelect.value = selectedEnthalpyUnit;
} else {
  enthalpyUnitSelect.value = "kJ/kg";
}

if (selectedEnthalpyUnit1) {
  enthalpyUnitSelect1.value = selectedEnthalpyUnit1;
} else {
  enthalpyUnitSelect1.value = "kJ/kg";
}

if (selectedEnthalpyUnit2) {
  enthalpyUnitSelect2.value = selectedEnthalpyUnit2;
} else {
  enthalpyUnitSelect2.value = "kJ/kg";
}

if (selectedEnthalpyUnit3) {
  enthalpyUnitSelect3.value = selectedEnthalpyUnit3;
} else {
  enthalpyUnitSelect3.value = "kJ/kg";
}

if (selectedDrynessUnit) {
  drynessUnitSelect.value = selectedDrynessUnit;
} else {
  drynessUnitSelect.value = "f";
}
if (selectedDrynessUnit1) {
  drynessUnitSelect1.value = selectedDrynessUnit1;
} else {
  drynessUnitSelect.value = "f";
}
if (selectedDrynessUnit2) {
  drynessUnitSelect2.value = selectedDrynessUnit2;
} else {
  drynessUnitSelect2.value = "f";
}
if (selectedDrynessUnit3) {
  drynessUnitSelect3.value = selectedDrynessUnit3;
} else {
  drynessUnitSelect3.value = "f";
}

pressureUnitSelect.addEventListener("change", function() {
  localStorage.setItem("selectedPressureUnit", this.value);
});
pressureUnitSelect1.addEventListener("change", function() {
  localStorage.setItem("selectedPressureUnit1", this.value);
});
pressureUnitSelect2.addEventListener("change", function() {
  localStorage.setItem("selectedPressureUnit2", this.value);
});
pressureUnitSelect3.addEventListener("change", function() {
  localStorage.setItem("selectedPressureUnit3", this.value);
});

temperatureUnitSelect.addEventListener("change", function() {
  localStorage.setItem("selectedTemperatureUnit", this.value);
});
temperatureUnitSelect1.addEventListener("change", function() {
  localStorage.setItem("selectedTemperatureUnit1", this.value);
});
temperatureUnitSelect2.addEventListener("change", function() {
  localStorage.setItem("selectedTemperatureUnit2", this.value);
});
temperatureUnitSelect3.addEventListener("change", function() {
  localStorage.setItem("selectedTemperatureUnit3", this.value);
});

entropyUnitSelect.addEventListener("change", function() {
  localStorage.setItem("entropyUnitValue", this.value);
});
entropyUnitSelect1.addEventListener("change", function() {
  localStorage.setItem("entropyUnitValue1", this.value);
});
entropyUnitSelect2.addEventListener("change", function() {
  localStorage.setItem("entropyUnitValue2", this.value);
});
entropyUnitSelect3.addEventListener("change", function() {
  localStorage.setItem("entropyUnitValue3", this.value);
});

enthalpyUnitSelect.addEventListener("change", function() {
  localStorage.setItem("selectedEnthalpyUnit", this.value);
});
enthalpyUnitSelect1.addEventListener("change", function() {
  localStorage.setItem("selectedEnthalpyUnit1", this.value);
});
enthalpyUnitSelect2.addEventListener("change", function() {
  localStorage.setItem("selectedEnthalpyUnit2", this.value);
});
enthalpyUnitSelect3.addEventListener("change", function() {
  localStorage.setItem("selectedEnthalpyUnit3", this.value);
});

drynessUnitSelect.addEventListener("change", function() {
  localStorage.setItem("selectedDrynessUnit", this.value);
});
drynessUnitSelect1.addEventListener("change", function() {
  localStorage.setItem("selectedDrynessUnit1", this.value);
});
drynessUnitSelect2.addEventListener("change", function() {
  localStorage.setItem("selectedDrynessUnit2", this.value);
});
drynessUnitSelect3.addEventListener("change", function() {
  localStorage.setItem("selectedDrynessUnit3", this.value);
});
});





document.querySelector('#temperature-units').addEventListener('change', function () {
  let temperatureInput = document.querySelector('input[name="saturation"]');
  let selectedUnit = this.value;
  let currentValue = parseFloat(temperatureInput.value);

  if (selectedUnit === 'F') {
    temperatureInput.value = ((currentValue * 9/5) + 32).toFixed(2);
  } else {
    temperatureInput.value = ((currentValue - 32) * 5/9).toFixed(2);
  }
});
document.querySelector('#stemperature-units').addEventListener('change', function () {
  let temperatureInput = document.querySelector('input[name="stemp"]');
  let selectedUnit = this.value;
  let currentValue = parseFloat(temperatureInput.value);
  if (selectedUnit === 'F') {
    temperatureInput.value = ((currentValue*9/5) + 32).toFixed(2);
  } else {
    temperatureInput.value = ((currentValue - 32)*5/9).toFixed(2);
  }
});
document.querySelector('#internal-units').addEventListener('change', function () {
  let temperatureInput = document.querySelector('input[name="internal"]');
  let selectedUnit = this.value;
  let currentValue = parseFloat(temperatureInput.value);

  if (selectedUnit === 'F') {
    temperatureInput.value = (currentValue)*1000;
  } else {
    temperatureInput.value = (currentValue)/1000;
  }
});
document.querySelector('#senthalpy-units').addEventListener('change', function () {
  let temperatureInput = document.querySelector('input[name="senthalpy"]');
  let selectedUnit = this.value;
  let currentValue = parseFloat(temperatureInput.value);

  if (selectedUnit === 'F') {
    temperatureInput.value = (currentValue)*1000;
  } else {
    temperatureInput.value = (currentValue)/1000;
  }
});
document.querySelector('#sentropy-units').addEventListener('change', function () {
  let temperatureInput = document.querySelector('input[name="sentropy"]');
  let selectedUnit = this.value;
  let currentValue = parseFloat(temperatureInput.value);

  if (selectedUnit === 'F') {
    temperatureInput.value = (currentValue)*1000;
  } else {
    temperatureInput.value = (currentValue)/1000;
  }
});
document.querySelector("#sdry-units").addEventListener("change", function() {
  let sdryInput = document.querySelector("input[name='sdry']");
  let selectedUnit = this.value;
  let currentValue = parseFloat(sdryInput.value);

  if (selectedUnit === 'F') {
    sdryInput.value = (currentValue)*100;
  } else {
    sdryInput.value = (currentValue)/100;
  }
});




let selectedInput;

document.querySelector("#input-form").addEventListener("submit", function(event) {
  event.preventDefault();

  selectedInput = document.querySelector("#input-select").value;

  // Your submit logic here...

  // Refresh the page
  location.reload();
});

window.addEventListener("load", function() {
  if (selectedInput) {
    document.querySelector("#input-select").value = selectedInput;
  }
});




function checkPressureValidity() {
  var pressureInput = document.getElementById("PTP");
  var pressureError = document.getElementById("pressure-error");
  if (pressureInput.checkValidity()) {
    pressureError.style.display = "none";
  } else {
    pressureError.style.display = "block";
  }
}

function checkTemperatureValidity() {
  var temperatureInput = document.getElementById("PTT");
  var temperatureError = document.getElementById("temperature-error");
  if (temperatureInput.checkValidity()) {
    temperatureError.style.display = "none";
  } else {
    temperatureError.style.display = "block";
  }
}

