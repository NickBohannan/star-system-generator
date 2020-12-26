class Civilization {
    constructor(paramObj) {
        this.name = paramObj.name,
            this.techLevel = paramObj.techLevel,
            this.body = paramObj.details.body,
            this.type = paramObj.details.type
    }
}