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



function attachUnitConverterListener(selectSelector, inputName, conversionFn) {
  document.querySelector(selectSelector).addEventListener('change', function () {
    let input = document.querySelector(`input[name="${inputName}"]`);
    let selectedUnit = this.value;
    let currentValue = parseFloat(input.value);

    // Call the provided conversion function
    input.value = conversionFn(currentValue, selectedUnit);
  });
}

// Define your conversion functions
function temperatureConversion(value, unit) {
  if (unit === 'F') {
	return ((value * 9/5) + 32).toFixed(2);
    
  } else {
	return ((value - 32) * 5/9).toFixed(2); 
  }
}



function KiloJtoJ(value, unit) {
  if (unit === 'F') {
    return value * 1000;
  } else {
    return value / 1000;
  }
}

function fractoper(value, unit) {
  if (unit === 'F') {
    return value * 100;
  } else {
    return value / 100;
  }
}


  // Function to attach event listener for temperature dropdown
function attachTemperatureListener() {
attachUnitConverterListener('#saturation-ur1', 'saturation-r1', temperatureConversion);
}

function attachSTemperatureListener() {
attachUnitConverterListener('#stemp-ur2', 'stemp-r2', temperatureConversion);
}

// Function to attach event listener for energy dropdown
function attachEnergyListener() {
attachUnitConverterListener('#internal-ur1', 'internal-r1', KiloJtoJ);
}

function attachEnthalpyListener() {
attachUnitConverterListener('#senthalpy-ur1', 'senthalpy-r1', KiloJtoJ);
}

function attachEntropyListener() {
attachUnitConverterListener('#sentropy-ur1', 'sentropy-r1', KiloJtoJ);
}


function attachDrynessListener() {
	attachUnitConverterListener('#dry-ur1', 'dry-r1', fractoper);
}
	

 document.addEventListener('DOMContentLoaded', function () {
    // Call the functions to attach event listeners
	 attachTemperatureListener();
     attachEnergyListener();
	 attachEnthalpyListener();
	 attachEntropyListener();
	 attachDrynessListener();

  });

//second//

function attachTemperatureListener2() {
attachUnitConverterListener('#saturation-ur2', 'saturation-r2', temperatureConversion);
}

function attachSTemperatureListener2() {
attachUnitConverterListener('#stemp-ur2', 'stemp-r2', temperatureConversion);
}

// Function to attach event listener for energy dropdown
function attachEnergyListener2() {
attachUnitConverterListener('#internal-ur2', 'internal-r2', KiloJtoJ);
}

function attachEnthalpyListener2() {
attachUnitConverterListener('#senthalpy-ur2', 'senthalpy-r2', KiloJtoJ);
}

function attachDrynessListener2() {
	attachUnitConverterListener('#dry-ur2', 'dry-r2', fractoper);
}



// Attach listeners using the appropriate conversion functions
 document.addEventListener('DOMContentLoaded', function () {
    // Call the functions to attach event listeners
	 attachTemperatureListener2();
     attachEnergyListener2();
	 attachSTemperatureListener2();
	 attachEnthalpyListener2();
	 attachDrynessListener2();

  });

//third//

function attachTemperatureListener3() {
attachUnitConverterListener('#saturation-ur3', 'saturation-r3', temperatureConversion);
}

function attachSTemperatureListener3() {
attachUnitConverterListener('#stemp-ur3', 'stemp-r3', temperatureConversion);
}

// Function to attach event listener for energy dropdown
function attachEnergyListener3() {
attachUnitConverterListener('#internal-ur3', 'internal-r3', KiloJtoJ);
}

function attachEntropyListener3() {
attachUnitConverterListener('#sentropy-ur3', 'sentropy-r3', KiloJtoJ);
}

function attachDrynessListener3() {
	attachUnitConverterListener('#dry-ur3', 'dry-r3', fractoper);
}



// Attach listeners using the appropriate conversion functions
 document.addEventListener('DOMContentLoaded', function () {
    // Call the functions to attach event listeners
	 attachTemperatureListener3();
     attachEnergyListener3();
	 attachSTemperatureListener3();
	 attachEntropyListener3();
	 attachDrynessListener3();

  });

//fourth//

function attachTemperatureListener4() {
attachUnitConverterListener('#saturation-ur4', 'saturation-r4', temperatureConversion);
}

function attachSTemperatureListener4() {
attachUnitConverterListener('#stemp-ur4', 'stemp-r4', temperatureConversion);
}

// Function to attach event listener for energy dropdown
function attachEnergyListener4() {
attachUnitConverterListener('#internal-ur4', 'internal-r4', KiloJtoJ);
}

function attachEnthalpyListener4() {
attachUnitConverterListener('#senthalpy-ur4', 'senthalpy-r4', KiloJtoJ);
}

function attachEntropyListener4() {
attachUnitConverterListener('#sentropy-ur4', 'sentropy-r4', KiloJtoJ);
}


 document.addEventListener('DOMContentLoaded', function () {
    // Call the functions to attach event listeners
	 attachTemperatureListener4();
     attachEnergyListener4();
	 attachEnthalpyListener4();
	 attachEntropyListener4();

  });

//fifth//


function pressureConversion(value, unit) {
  if (unit === 'F') {
    return value * 10;
  } else {
    return value / 10;
  }
}



function attachPressureListener5() {
attachUnitConverterListener('#saturationP-ur5', 'saturationP-r5', pressureConversion);
}

function attachSPressureListener5() {
attachUnitConverterListener('#sP-ur5', 'sP-r5', pressureConversion);
}

// Function to attach event listener for energy dropdown
function attachEnergyListener5() {
attachUnitConverterListener('#internal-ur5', 'internal-r5', KiloJtoJ);
}

function attachEnthalpyListener5() {
attachUnitConverterListener('#senthalpy-ur5', 'senthalpy-r5', KiloJtoJ);
}

function attachDrynessListener5() {
	attachUnitConverterListener('#dry-ur5', 'dry-r5', fractoper);
}



// Attach listeners using the appropriate conversion functions
 document.addEventListener('DOMContentLoaded', function () {
    // Call the functions to attach event listeners
	 attachPressureListener5();
     attachEnergyListener5();
	 attachSPressureListener5();
	 attachEnthalpyListener5();
	 attachDrynessListener5();

  });


//sixth//

function attachPressureListener6() {
attachUnitConverterListener('#saturationP-ur6', 'saturationP-r6', pressureConversion);
}

function attachSPressureListener6() {
attachUnitConverterListener('#sP-ur6', 'sP-r6', pressureConversion);
}

// Function to attach event listener for energy dropdown
function attachEnergyListener6() {
attachUnitConverterListener('#internal-ur6', 'internal-r6', KiloJtoJ);
}

function attachEntropyListener6() {
attachUnitConverterListener('#sentropy-ur6', 'sentropy-r6', KiloJtoJ);
}

function attachDrynessListener6() {
	attachUnitConverterListener('#dry-ur6', 'dry-r6', fractoper);
}



// Attach listeners using the appropriate conversion functions
 document.addEventListener('DOMContentLoaded', function () {
    // Call the functions to attach event listeners
	 attachPressureListener6();
     attachEnergyListener6();
	 attachSPressureListener6();
	 attachEntropyListener6();
	 attachDrynessListener6();

  });


//seventh//

function attachPressureListener7() {
attachUnitConverterListener('#saturationP-ur7', 'saturationP-r7', pressureConversion);
}


// Function to attach event listener for energy dropdown
function attachEnergyListener7() {
attachUnitConverterListener('#internal-ur7', 'internal-r7', KiloJtoJ);
}

function attachEnthalpyListener7() {
attachUnitConverterListener('#senthalpy-ur7', 'senthalpy-r7', KiloJtoJ);
}

function attachEntropyListener7() {
attachUnitConverterListener('#sentropy-ur7', 'sentropy-r7', KiloJtoJ);
}




// Attach listeners using the appropriate conversion functions
 document.addEventListener('DOMContentLoaded', function () {
    // Call the functions to attach event listeners
	 attachPressureListener7();
     attachEnergyListener7();
	 attachEnthalpyListener7();
	 attachEntropyListener7();
	 

  });

//eighth//

function attachPressureListener8() {
attachUnitConverterListener('#saturationP-ur8', 'saturationP-r8', pressureConversion);
}

function attachTemperatureListener8() {
attachUnitConverterListener('#stemp-ur8', 'stemp-r8', temperatureConversion);
}

// Function to attach event listener for energy dropdown
function attachEnergyListener8() {
attachUnitConverterListener('#internal-ur8', 'internal-r8', KiloJtoJ);
}

function attachDrynessListener8() {
	attachUnitConverterListener('#dry-ur8', 'dry-r8', fractoper);
}



// Attach listeners using the appropriate conversion functions
 document.addEventListener('DOMContentLoaded', function () {
    // Call the functions to attach event listeners
	 attachPressureListener8();
	 attachTemperatureListener8();
	 attachEnergyListener8();
	 attachDrynessListener8();

  });

//ninth//


function attachPressureListener9() {
attachUnitConverterListener('#spressure-ur9', 'spressure-r9', pressureConversion);
}

function attachTemperatureListener9() {
attachUnitConverterListener('#saturation-ur9', 'saturation-r9', temperatureConversion);
}

// Function to attach event listener for energy dropdown
function attachEntropyLListener9() {
attachUnitConverterListener('#entropyL-ur9', 'entropyL-r9', KiloJtoJ);
}

function attachEntropyVListener9() {
attachUnitConverterListener('#entropyV-ur9', 'entropyV-r9', KiloJtoJ);
}

function attachEntropyListener9() {
attachUnitConverterListener('#sentropy-ur9', 'sentropy-r9', KiloJtoJ);
}

function attachEnthalpyLListener9() {
attachUnitConverterListener('#enthalpyL-ur9', 'enthalpyL-r9', KiloJtoJ);
}


function attachEnthalpyVListener9() {
attachUnitConverterListener('#enthalpyV-ur9', 'enthalpyV-r9', KiloJtoJ);
}


// Attach listeners using the appropriate conversion functions
 document.addEventListener('DOMContentLoaded', function () {
    // Call the functions to attach event listeners
	 attachTemperatureListener9();
	 attachPressureListener9();
	 attachEntropyLListener9();
	 attachEntropyVListener9();
	 attachEntropyListener9();
	 attachEnthalpyLListener9();
	 attachEnthalpyVListener9();

  });

//tenth//


function attachPressureListener10() {
attachUnitConverterListener('#spressure-ur10', 'spressure-r10', pressureConversion);
}

function attachTemperatureListener10() {
attachUnitConverterListener('#saturation-ur10', 'saturation-r10', temperatureConversion);
}

// Function to attach event listener for energy dropdown
function attachEntropyLListener10() {
attachUnitConverterListener('#entropyL-ur10', 'entropyL-r10', KiloJtoJ);
}

function attachEntropyVListener10() {
attachUnitConverterListener('#entropyV-ur10', 'entropyV-r10', KiloJtoJ);
}

function attachEnthalpyListener10() {
attachUnitConverterListener('#enthalpy-ur10', 'enthalpy-r10', KiloJtoJ);
}

function attachEnthalpyLListener10() {
attachUnitConverterListener('#enthalpyL-ur10', 'enthalpyL-r10', KiloJtoJ);
}


function attachEnthalpyVListener10() {
attachUnitConverterListener('#enthalpyV-ur10', 'enthalpyV-r10', KiloJtoJ);
}


// Attach listeners using the appropriate conversion functions
 document.addEventListener('DOMContentLoaded', function () {
    // Call the functions to attach event listeners
	 attachTemperatureListener10();
	 attachPressureListener10();
	 attachEntropyLListener10();
	 attachEntropyVListener10();
	 attachEnthalpyListener10();
	 attachEnthalpyLListener10();
	 attachEnthalpyVListener10();

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

