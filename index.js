const Planet = require("./planet")
const Star = require("./star")
const Civilization = require('./civilization')

const Config = require("./config")
const starNames = require("./starnames")

let generateStarSystem = () => {
    let rockyBias = Math.random() * (.8, .2) + .2
    
    // generate star
    STAR_SYSTEM = {
        star: null,
        planets: []
    }
    
    starParams = {
        name: starNames[Math.floor(Math.random() * starNames.length)],
        diameter: Math.floor(((Math.random() * (Config.stellarDiameterMax - Config.stellarDiameterMin) + Config.stellarDiameterMin) + Config.solarDiameter)/2)
    }

    STAR_SYSTEM.star = new Star(starParams)

    // generate planets
    let planetNum = Math.floor(Math.random() * 15)

    for (i=0; i<planetNum; i++) {
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
                name: `${starParams.name + "ians"}`
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

    // assign name by distance
    for (i=0; i<STAR_SYSTEM.planets.length; i++) {
        STAR_SYSTEM.planets[i].name = `${STAR_SYSTEM.star.name}-${i+1}`
    }

    // output everything to console
    console.log("Star System: " + STAR_SYSTEM.star.name)
    console.log("Star Diameter: " + STAR_SYSTEM.star.diameter)

    STAR_SYSTEM.planets.forEach((e) => {
        console.log(`${e.name} - ${e.type} - ${e.isHabitable} - ${e.diameter} - ${e.distance} `)
        if (e.civilization) {
            console.log("    Civilization Name: " + e.civilization.name)
            console.log("    Tech Level: " + e.civilization.techLevel)
        }
    })

    console.log("")

}

for (k=0; k<Config.starSystemCount; k++) {
    generateStarSystem()
}

