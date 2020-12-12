// const Planet = require("./planet")
// const Star = require("./star")
// const Civilization = require('./civilization')

// const Config = require("./config")
// const nameComponents = require("./civnames")
// const detailComponents = require("./civdetails")

const space = document.getElementById("space")
const spaceX = space.offsetWidth - 50
const spaceY = space.offsetHeight - 50

function generateName() {
    let nameArray = []
    let nameRounds = Config.getRandomInt(3) + 2

    for (let j = 0; j < nameRounds; j++) {
        nameArray.push(nameComponents.consonants[Config.getRandomInt(nameComponents.consonants.length)])
        nameArray.push(nameComponents.vowels[Config.getRandomInt(nameComponents.vowels.length)])
    }

    if (Config.getRandomInt(2) == 0) {
        nameArray.push(nameComponents.consonants[Config.getRandomInt(nameComponents.consonants.length)])
    }

    let finalNameLowerCase = nameArray.join("")

    return finalNameLowerCase.charAt(0).toUpperCase() + finalNameLowerCase.slice(1)
}

function generateCivDetails() {
    let color = detailComponents.skinColor[Config.getRandomInt(detailComponents.skinColor.length)]
    let type = detailComponents.bodyType[Config.getRandomInt(detailComponents.bodyType.length)]
    // let gov = detailComponents.government[Config.getRandomInt(detailComponents.government.length)]

    let bodyCovering

    switch (type) {
        case "aquatic":
            if (Config.getRandomInt(2) == 0) {
                bodyCovering = "rubbery skin"
            } else {
                bodyCovering = "scales"
            }
            break
        case "terrestrial":
            if (Config.getRandomInt(2) == 0) {
                bodyCovering = "skin"
            } else {
                bodyCovering = "fur"
            }
            break
        case "subterranean":
            bodyCovering = "skin"
            break
        case "insectoid":
            bodyCovering = "carapace"
            break
        case "avian":
            bodyCovering = "feathers"
        default:
            break
    }

    return {
        body: color + " " + bodyCovering,
        type: type
    }
}

function generateStarSystem() {
    console.log(spaceX)
    let rockyBias = Math.random() * (.9, .3) + .3

    // generate star
    STAR_SYSTEM = {
        star: null,
        planets: []
    }

    starParams = {
        name: generateName(),
        diameter: Math.floor(((Math.random() * (Config.stellarDiameterMax - Config.stellarDiameterMin) + Config.stellarDiameterMin) + Config.solarDiameter) / 2),
        x: Math.floor(Math.random() * spaceX),
        y: Math.floor(Math.random() * spaceY)
    }

    STAR_SYSTEM.star = new Star(starParams)

    // generate planets
    let planetNum = Math.floor(Math.random() * 15)

    let gasCounter = 0

    for (let i = 0; i < planetNum; i++) {
        planetParams = {
            distance: Math.floor(Math.random() * Config.planetDistanceMax * rockyBias)
        }

        // assign type and diameter based on distance from star
        if (planetParams.distance > Config.rockDistanceMax) {
            planetParams.type = "gaseous"
            planetParams.diameter = Math.floor(Math.random() * (Config.gasDiameterMax, Config.gasDiameterMin) + Config.gasDiameterMin)
        } else {
            planetParams.type = "rocky"
            planetParams.diameter = Math.floor(Math.random() * (Config.rockDiameterMax, Config.rockDiameterMin) + Config.rockDiameterMin)
        }

        // check if habitable
        if (planetParams.distance >= Config.habitableDistanceMin && planetParams.distance <= Config.habitableDistanceMax) {
            planetParams.isHabitable = true
        } else {
            planetParams.isHabitable = false
        }

        // check if civilization exists
        if (Math.floor(Math.random() * Config.globalCivChance) < 1 && planetParams.isHabitable == true) {
            civParams = {
                name: generateName(),
                details: generateCivDetails()
            }

            techCheck = Math.floor(Math.random() * 100)

            if (techCheck >= 66) {
                civParams.techLevel = "FTL"
            } else if (techCheck <= 33) {
                civParams.techLevel = "primitive"
            } else {
                civParams.techLevel = "pre-FTL"
            }

            planetParams.hasCivilization = true
            planetParams.civilization = new Civilization(civParams)
        }

        // add planet to array
        STAR_SYSTEM.planets.push(new Planet(planetParams))
    }

    // sort planets by distance
    STAR_SYSTEM.planets.sort((a, b) => (a.distance > b.distance) ? 1 : -1)

    // if there are more than 5 gaseous planets, trim the rest off (they eat each other a lot!)
    STAR_SYSTEM.planets.forEach(e => {
        if (e.type == "gaseous") {
            gasCounter++
        }
    })

    if (gasCounter > 5) {
        STAR_SYSTEM.planets = STAR_SYSTEM.planets.slice(0, STAR_SYSTEM.planets.length - gasCounter + 5)
    }

    // assign name by distance
    for (let i = 0; i < STAR_SYSTEM.planets.length; i++) {
        STAR_SYSTEM.planets[i].name = `${STAR_SYSTEM.star.name}-${i + 1}`
    }

    // place star on the webpage with name
    let starElement = document.createElement("div")
    starElement.classList.add("entity")
    starElement.style.top = starParams.y.toString() + "px"
    starElement.style.left = starParams.x.toString() + "px"

    let starName = document.createElement("div")
    starName.classList.add("star-name")
    starName.innerHTML = starParams.name

    starElement.appendChild(starName)
    space.appendChild(starElement)

    // output everything to console
    console.log("Star System: " + STAR_SYSTEM.star.name)
    console.log("Star Diameter: " + STAR_SYSTEM.star.diameter)

    STAR_SYSTEM.planets.forEach(e => {
        console.log(`Name: ${e.name} - Type: ${e.type} - Habitable: ${e.isHabitable} - Diameter: ${e.diameter} km - Distance from Star: ${e.distance} km`)
        if (e.civilization) {
            console.log("    Civilization Name: " + e.civilization.name)
            console.log("    Tech Level: " + e.civilization.techLevel)
            console.log("    Type: " + e.civilization.type)
            console.log("    Body: " + e.civilization.body)
        }
    })

    console.log("")
}

function loopGenerate() {
    // remove all stars
    let spaceDiv = document.getElementById("space")
    while (spaceDiv.lastElementChild) {
        spaceDiv.removeChild(space.lastElementChild)
    }

    // add number of star sytems equal to system number value
    let loopNum = document.getElementById("system-number").value

    if (loopNum <= 250) {
        for (let j = 0; j < loopNum; j++) {
            console.log(loopNum)
            generateStarSystem()
        }
    }
}

