// Thank you Kastark for getting me into incremental game development - and teaching me how to save and load.
// Without you, this would have never existed. Nor would Sandwich-Game.
// https://kastark.co.uk/articles/incrementals-part-2.html
var gameVersion = '0.1.4' // initial release

var autosaveEnabled = true

var saveFile = {}


function save() {
    var upgradeToSave = {}
    for(i in Object.keys(upgrade)) {
        upgradeToSave[Object.keys(upgrade)[i]] = {level:upgrade[Object.keys(upgrade)[i]].level}
        //this reduces the amount of data you have 2 save

    }
    var investmentsToSave = {}
    for(i in Object.keys(investments)) {
        investmentsToSave[Object.keys(investments)[i]] = {purchased:investments[Object.keys(investments)[i]].purchased, visible:investments[Object.keys(investments)[i]].visible,}
        //this reduces the amount of data you have 2 save

    }

    saveFile = {
        money:money,
        buttonMR:button.moneyReward,
        buttonAVX:button.avx,
        buttonAVY:button.avy,
        upgrade:upgradeToSave,
        investments:investmentsToSave,
        guns:guns,
        cursors:cursors,
        autosaveEnabled:autosaveEnabled,
        invBoxVisible:invBoxVisible,
        cooldownPenalty:cooldownPenalty,
        gameVersion:gameVersion
    
    }
    localStorage.setItem("save",JSON.stringify(saveFile));
    console.log("Save completed")
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    $("#timeAtLastSave")[0].innerHTML = `${hours}:${minutes}:${seconds}`
}   

function load(isFromImport = false,importText = " ") {

    if(isFromImport) {
        var savegame = JSON.parse(importText)
    } else {
        var savegame = JSON.parse(localStorage.getItem("save"));
    }
    if (savegame != undefined) {
        if (gameVersion !== savegame.gameVersion) {
            alert(savegame.gameVersion + " -> " + gameVersion + " Game version mismatch. This save file may not work. (It probably will. This is just a courtesy warning.)")
        }

        if (typeof savegame.money !== "undefined") money = savegame.money;
        if (typeof savegame.buttonMR !== "undefined") button.moneyReward = savegame.buttonMR;
        if (typeof savegame.buttonAVX !== "undefined") {
            button.avx = Math.abs(savegame.buttonAVX);
            $("#speedCount")[0].innerHTML = Math.abs(button.avx)
        }
        if (typeof savegame.buttonAVY !== "undefined") button.avy = Math.abs(savegame.buttonAVY);
        button.vx = button.avx
        button.vy = button.avy  
        if (typeof savegame.guns !== "undefined") guns = savegame.guns;
        if (typeof savegame.invBoxVisible !== "undefined") invBoxVisible = savegame.invBoxVisible;
        if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
        if (typeof savegame.cooldownPenalty !== "undefined") cooldownPenalty = savegame.cooldownPenalty;
        if (typeof savegame.autosaveEnabled !== "undefined") autosaveEnabled = savegame.autosaveEnabled;
        $("#autosaveCheckbox")[0].checked = autosaveEnabled

        if (typeof savegame.upgrade !== "undefined") {

            strangeUpgrade.cursorBuy.level = savegame.cursors.length
            strangeUpgrade.gunBuy.level = savegame.guns.length
            refreshStrangeUpgrade('gunBuy', '#gunCost', '#gunCount', guns.length)
            refreshStrangeUpgrade('cursorBuy', '#cursorCost', '#cursorCount', cursors.length)

            for(i in Object.keys(savegame.upgrade)) {
                //we only need the level. The rest of it is saved which is kind of wasteful but its only a few bytes. 
                //this is only level because I might rebalance the base cost or increase type or increase coefficient.
                //but for players who had already gotten a level, it remains, but the price will change in the new update.
                // any NEW upgrades will *not* be affected. Any removed upgrades will be lost.
                if (typeof upgrade[Object.keys(savegame.upgrade)[i]] !== "undefined"){
                    upgrade[Object.keys(savegame.upgrade)[i]].level = savegame.upgrade[Object.keys(savegame.upgrade)[i]].level
                    refreshGeneralUpgrade(Object.keys(savegame.upgrade)[i])
                }
            }
        }
        //similar thing to Investments.
        if (typeof savegame.investments !== "undefined") {
            var investKeys = Object.keys(savegame.investments)
            for (i in investKeys) {
                if (typeof investKeys[i] !== "undefined") {
                    investments[investKeys[i]].purchased = savegame.investments[investKeys[i]].purchased
                    investments[investKeys[i]].visible = savegame.investments[investKeys[i]].visible

                    if (investments[investKeys[i]].purchased && investments[investKeys[i]].runEffectsOnLoad) {
                        investments[investKeys[i]].effect()
                    }

                }
            }
            refreshInvestments()
        }

        addFloatingText(400 ,300,"Game loaded successfully",180,"#000000","30px serif")
    } 
    updateMoney()
    
}

$("#autosaveCheckbox").on("click",function() {
    autosaveEnabled = $("#autosaveCheckbox")[0].checked
})

$("#hardReset").on("click", function() {

    if(confirm("Are you SURE? This cannot be undone.")) {
        localStorage.removeItem("save")
        alert("Savegame deleted. Reload for it to take effect. If you change your mind, click 'Save' again.")
    } 
})

$("#export").on("click", function() {
    navigator.clipboard.writeText(btoa(JSON.stringify(saveFile)));
    alert("Save file copied to clipboard")
})

$("#import").on("click", function() {
    var inputValue = window.prompt("Paste your save file code here:","");
    if (inputValue !== null) {
        inputValue = atob(inputValue)
        load(true, inputValue)
    }
})

setInterval(function() {  // autosaving in 3 lines :)
    if (autosaveEnabled) save()
},30000)