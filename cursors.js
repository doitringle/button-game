var cursors = [
]

var cooldownPenalty = 1

var levelRequirement = 5

const cursorDefault = new Image()
cursorDefault.src = 'images/cursor.png'
const cursorClick = new Image()
cursorClick.src = 'images/hand-cursor.png'

// i PROBABLY should make sure the iamges have loaded before running, but idgaf...

function level(xp) {
    return 1 + Math.floor(Math.log(1+xp) / Math.log(levelRequirement))
}

function distanceBetweenPoints(x1,y1,x2,y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt( a*a + b*b );
}

function drawCursors() {
    
    for (i in cursors) {
        crs = cursors[i]

        if(crs.cooldown > 0) {
            crs.cooldown--
        }
        // display cooldown in seconds underneath cursor

        c.font =  "12px monospace"
        c.textAlign = 'center'
        c.fillStyle = "#000000" 
        c.fillText(Math.abs(crs.cooldown / 60).toFixed(1), crs.x+15,crs.y+40)
        //display stats when mouse is close!!
        if (distanceBetweenPoints(pos.x,pos.y,crs.x+10,crs.y+10) < 25) {
            c.fillText("XP: " + crs.xp + " Level: " + level(crs.xp), crs.x+15,crs.y-5)
        }

        if(within(crs.x, crs.y,[button.x,button.y,100,80])) {
            c.drawImage(cursorClick, crs.x, crs.y)

            if (crs.cooldown <= 0) {
                clickedEffect = 5
                addFloatingText(crs.x,crs.y,"$" + n(updateMoney(level(crs.xp) * button.moneyReward)), 60, "#000000", "18px serif", true)
                crs.cooldown = cooldownPenalty * 15 + 2000 / (5 + upgrade.cursorSpeed.level)
                crs.xp += button.moneyReward
            }
        } else {
            c.drawImage(cursorDefault, crs.x, crs.y)
        }
    }

}

strangeUpgrade.cursorBuy.level = cursors.length
refreshStrangeUpgrade('cursorBuy', '#cursorCost', '#cursorCount', cursors.length)
$("#cursorBuy").on("click", function() {
    var cost = calculateUpgradeCost('cursorBuy',true)
    if (money >= cost) {
        updateMoney(-1 * cost)
        
        cursors.push({x:750* Math.random(),y:550*Math.random(),cooldown:120,xp:0})
        strangeUpgrade.cursorBuy.level++
        refreshStrangeUpgrade('cursorBuy', '#cursorCost', '#cursorCount', cursors.length)

        // at 2 cursors and 5 cursors respectively reveal some investments.
        if(cursors.length == 2) {
            revealInvestment("cursorLevelBoost")
        }
        if (cursors.length == 5) {
            revealInvestment("unlockGuns")
        }

    }
})