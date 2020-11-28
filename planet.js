class Planet {
    constructor(paramObj) {
        this.name = paramObj.name,
        this.type = paramObj.type,
        this.isHabitable = paramObj.isHabitable
        this.diameter = paramObj.diameter
        this.distance = paramObj.distance
        this.hasCivilization = paramObj.hasCivilization,
        this.civilization = paramObj.civilization
    }
}

module.exports = Planet