var upgrade = {
    speedVariance:{
        level:0,
        maxLevel:60,
        baseCost:10.00,
        type:"exponential",
        inc:2  // amount baseCost is multiplied/powered to
                // (baseCost) ^ 1 + level * inc
    },
    buttonValueIncrease:{
        level:0,
        maxLevel:9999999,
        baseCost:20,
        type:"exponential",
        inc:2.5
    },
    cornerBoost: {
        level:0,
        maxLevel:100,
        baseCost:10,
        type:"exponential",
        inc:3 // linear: (level * baseCost * inc)
    },
    cornerTime: {
        level:0,
        maxLevel:300,
        baseCost:8.5,
        type:"exponential",
        inc:2 // linear: (level * baseCost * inc)
    },
    cursorSpeed: {
        level:0,
        maxLevel:50,
        baseCost:5,
        type:"exponential",
        inc:1.2
    },
    shootingSpeed: {
        level:0,
        maxLevel:100,
        baseCost:15,
        type:"exponential",
        inc:1.75
    },
    bulletSpeed: {
        level:0,
        maxLevel:50,
        baseCost:20,
        type:"exponential",
        inc:1.5
    },
    bulletMultiplier: {
        level:0,
        maxLevel:50,
        baseCost:20,
        type:"exponential",
        inc:2.25
    },
}

var strangeUpgrade = {
    cursorBuy: {
        level: 0, // not relly neccesary but i want to reuse the calculateUpgradeCost function for calcuating the price of cursors
        baseCost:13.50,
        type:"exponential",
        inc:2.155
    },
    gunBuy: {
        level: 0,
        baseCost:32,
        type:"exponential",
        inc:1.85
    }
}



function calculateUpgradeCost(upg, isStrange = false) {
    
    var uo = upgrade[upg] // UO = Upgrade Object
    if (isStrange) { uo = strangeUpgrade[upg]}
    if (uo.level == 0) {
        return uo.baseCost
    }
    if(uo.type == "exponential") {

        return (uo.baseCost *  Math.pow(uo.inc, uo.level) )

    } else if (uo.type == "linear") {

        return ( uo.level * uo.baseCost * uo.inc )

    } else {
        console.log("uh oh. upgrade type " + uo.type + " not recognized.")
        return 0.00
    }
}

function refreshGeneralUpgrade(upg) {
    var uo = upgrade[upg] // UO = Upgrade Object
    var actualCost = calculateUpgradeCost(upg)
    $("#" + upg + "Cost")[0].innerHTML = n(actualCost.toFixed(2))
    $("#" + upg + "Level")[0].innerHTML = uo.level
}

function refreshStrangeUpgrade(upg, costId, levelId, level) {
    var uo = strangeUpgrade[upg]
    var actualCost = calculateUpgradeCost(upg, true)
    $(costId)[0].innerHTML = n(actualCost.toFixed(2))
    $(levelId)[0].innerHTML = level // not actually a level most of the time.
}


//speed +- click handler
//technically not an upgrade
$('#modifySpeedPlus').on("click", function() {
    if( 1 + Math.abs(button.avx) < 6 + upgrade.speedVariance.level) {
        if(button.avx > 0) {
            button.avx++
        } else {
            button.avx--
        }
        if (button.avy > 0) {
            button.avy++
        } else {
            button.avy--
        }
        var diff = Math.round(button.vy) - button.vy
        button.vy = button.avy + diff
        diff = Math.round(button.vx) - button.vx
        button.vx = button.avx + diff


        $("#speedCount")[0].innerHTML = Math.abs(button.avx)
    }

})

$('#modifySpeedMinus').on("click", function() {
    if(Math.abs(button.avx) - 1 > 4 - upgrade.speedVariance.level &&
       Math.abs(button.avx) - 1 > 0) {
        if(button.avx > 0) {
            button.avx--
        } else {
            button.avx++
        }
        if (button.avy > 0) {
            button.avy--
        } else {
            button.avy++
        }

        var diff = Math.round(button.vy) - button.vy
        button.vy = button.avy + diff
        diff = Math.round(button.vx) - button.vx
        button.vx = button.avx + diff

        $("#speedCount")[0].innerHTML = Math.abs(button.avx)
    }

})


// upgrade click handler
// BUT first! we must start by refreshing all

var upgKeys = Object.keys(upgrade)
for (i=0;i<upgKeys.length;i++){
    refreshGeneralUpgrade(upgKeys[i])
}


// Speed Variance Upgrade

/*$('#speedVarianceUpgrade').on("click", function() {
    var cost = calculateUpgradeCost('speedVariance')
    if (money >= cost && upgrade.speedVariance.maxLevel > upgrade.speedVariance.level) {
        updateMoney(-1 * cost)
        upgrade.speedVariance.level++
        refreshGeneralUpgrade('speedVariance')
    }

})
$('#buttonValueIncreaseUpgrade').on("click", function() {
    var cost = calculateUpgradeCost('buttonValueIncrease')
    if (money >= cost) {
        updateMoney(-1 * cost)
        upgrade.buttonValueIncrease.level++
        button.moneyReward *= 2
        refreshGeneralUpgrade('buttonValueIncrease')
    }

})
$('#cornerBoostUpgrade').on("click", function() {
    var cost = calculateUpgradeCost('cornerBoost')
    if (money >= cost && upgrade.cornerBoost.maxLevel > upgrade.cornerBoost.level) {
        updateMoney(-1 * cost)
        upgrade.cornerBoost.level++
        refreshGeneralUpgrade('cornerBoost')
    }

})

$('#cornerTimeUpgrade').on("click", function() {
    var cost = calculateUpgradeCost('cornerTime')
    if (money >= cost && upgrade.cornerTime.maxLevel > upgrade.cornerTime.level) {
        updateMoney(-1 * cost)
        upgrade.cornerTime.level++
        refreshGeneralUpgrade('cornerTime')
    }

})

$('#cursorSpeedUpgrade').on("click", function() {
    var cost = calculateUpgradeCost('cursorSpeed')
    if (money >= cost && upgrade.cursorSpeed.maxLevel > upgrade.cursorSpeed.level) {
        updateMoney(-1 * cost)
        upgrade.cursorSpeed.level++
        refreshGeneralUpgrade('cursorSpeed')
    }

})*/

function purchase(upgradeString) {
    var cost = calculateUpgradeCost(upgradeString)
    var thisUpgrade = upgrade[upgradeString]

    if (money >= cost && thisUpgrade.maxLevel > thisUpgrade.level) {

        updateMoney(-1 * cost)
        upgrade[upgradeString].level++

    switch (upgradeString) { // for special 

        case "buttonValueIncrease":
            button.moneyReward *= 2
            cooldownPenalty += 0.5
        break
        default:
            console.log("no special instructions for " + upgradeString)
        break
    }

    refreshGeneralUpgrade(upgradeString)
}
}