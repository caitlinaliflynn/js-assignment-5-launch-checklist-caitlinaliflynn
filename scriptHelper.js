// Write your helper functions here!

require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {

    const missionTarget = document.getElementById('missionTarget');

   // Here is the HTML formatting for our mission target div.

    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter}</li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons}</li>
            </ol>
        <img src="${imageUrl}">
    `;
   
}

function validateInput(testInput) {
    if (!testInput) {
        return 'Empty';
    } else if (isNaN(testInput)) {
        return 'Not a Number';
    } else if (!isNaN(testInput)) {
        return 'Is a Number'
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

        list = document.getElementById("faultyItems")
        pilot = document.querySelector("input[name=pilotName]");
        copilot = document.querySelector("input[name=copilotName]");
        fuelLevel = document.querySelector("input[name=fuelLevel]");
        cargoLevel = document.querySelector("input[name=cargoMass]");
    
        let pilotStatus = document.getElementById("pilotStatus");
        let copilotStatus = document.getElementById("copilotStatus");
        let fuelStatus = document.getElementById("fuelStatus");
        let cargoStatus = document.getElementById("cargoStatus");
        let launchStatus = document.getElementById("launchStatus");

    if (validateInput(pilot.value) === 'Empty' || validateInput(pilot.value) === 'Is a Number') {
        alert(`Must enter the name of the pilot.`);
    } else if (validateInput(copilot.value) === 'Empty' || validateInput(copilot.value) === 'Is a Number') {
        alert(`Must enter the name of the copilot.`);
    } else if (validateInput(fuelLevel.value) === 'Empty' || validateInput(fuelLevel.value) === 'Not a Number') {
        alert(`Must enter the number of the fuel level.`);
    } else if (validateInput(cargoLevel.value) === 'Empty' || validateInput(cargoLevel.value) === 'Not a Number') {
        alert(`Must enter the number of the cargo mass.`);
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot.value} is ready.`;
        copilotStatus.innerHTML = `Co-Pilot ${copilot.value} is ready.`;
    }; 
    if (fuelLevel.value < 10000) {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = 'Not enough fuel for the journey.';
        launchStatus.innerHTML = 'Shuttle not ready for launch.';
        launchStatus.style.color = 'red';
      } else if (cargoLevel.value > 10000) {
        list.style.visibility = 'visible';
        cargoStatus.innerHTML = 'Too much mass for the shuttle to take off.';
        launchStatus.innerHTML = 'Shuttle not ready for launch.';
        launchStatus.style.color = 'red';
      } else {
        launchStatus.style.color = 'green';
        launchStatus.innerHTML = 'Shuttle is ready for launch.';
      }

};

async function myFetch() {
    let planetsReturned;

    const response = await fetch("https://handlers.education.launchcode.org/static/planets.json");
    planetsReturned = await response.json();
    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
