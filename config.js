module.exports = {
    solarDiameter: 650000,
    stellarDiameterMin: 4000,
    stellarDiameterMax: 5000000,
    planetDistanceMin: 35000000,
    planetDistanceMax: 3000000000,
    habitableDistanceMin: 100000000,
    habitableDistanceMax: 200000000,
    rockDistanceMax: 300000000,
    gasDiameterMin: 50000,
    gasDiameterMax: 150000,
    rockDiameterMin: 4000,
    rockDiameterMax: 15000,
    globalCivChance: 5,
    starSystemCount: 10,
    getRandomInt: function(max) {
	    return Math.floor(Math.random() * Math.floor(max))
    }
}

  
