var investments = {
    test: {
        name:"Test Investment",
        description:"This is a test. It will output something to the console.",
        price:50,
        visible:false,
        purchased:false,
        runEffectsOnLoad:false,
        effect: function() {
            console.log("test successful");
            this.visible = false
            refreshInvestments()
        }
    },
    cursorLevelBoost: {
        name:"Better Level Requirements",
        description:"Makes cursors level up faster.",
        price:60,
        visible:false,
        purchased:false,
        runEffectsOnLoad:true,
        effect: function() {
            levelRequirement = 4
            this.visible = false
            refreshInvestments()
        }
    },  unlockGuns: {
        name:"Unlock Guns",
        description:"Better than cursors?",
        price:100,
        visible:false,
        purchased:false,
        runEffectsOnLoad:true,
        effect: function() {
            $("#gunsSection")[0].hidden = false
            this.visible = false
            refreshInvestments()
        }
    },
}

var invBoxVisible = false

function refreshInvestments() {

    $("#investmentsBox")[0].innerHTML = ""
    for(i in Object.keys(investments)) {
        var inv = investments[Object.keys(investments)[i]]
        if(inv.visible) {
            invBoxVisible = true
            $("#investmentsBox")[0].innerHTML += "<button onClick=\"purchaseInvestment('" + Object.keys(investments)[i] + "')\">"
            + inv.name + "<br>"
            + inv.description + "<br>"
            + "Price: $" + inv.price.toFixed(2)
        }
    }
    if(!invBoxVisible) {
        $("#investmentsSection")[0].hidden = true
    } else {
        $("#investmentsSection")[0].hidden = false
    }

}

function revealInvestment(inv) {
    if (!investments[inv].purchased) investments[inv].visible = true
    refreshInvestments()
}

refreshInvestments()
function purchaseInvestment(key) {
    if (money >= investments[key].price) {
        updateMoney(-1 * investments[key].price)
        investments[key].effect()
        investments[key].purchased = true
    }

}