var guns = [
    /*{
        x:300,
        y:300,
        r:2.3,
        cooldown:1,
        animationCooldown:10
    }*/
]

var bullets = [ // ROTATION IS IN RADIANS BECAUSE I JUST FINISHED PRECALC
    /*{
        x:300,
        y:300,
        r:2.3,
        velocity:5 // velocity
    }*/
]
function drawGuns() {
    for (i in guns) {
        var g = guns[i]

        if (g.animationCooldown > 0) {
            g.animationCooldown--
        }

        if (g.cooldown > 0) {
            g.cooldown--
        } else {
            g.cooldown = 10 + 90 / ((1+upgrade.shootingSpeed.level)/6)
            bullets.push({x:g.x,y:g.y,r:g.r - Math.PI/2 ,velocity:10 + upgrade.bulletSpeed.level,opacity:1,hasHit:false})
            g.animationCooldown = 10

        }
        
        // display cooldown in seconds underneath gun

        c.font =  "12px monospace"
        c.textAlign = 'center'
        c.fillStyle = "#000000" 
        c.fillText(Math.abs(g.cooldown / 60).toFixed(1), g.x,g.y+40)

        //draw circle middle (it is white)
        c.strokeStyle = "rgb(0,0,0)"
        c.beginPath(    )
        c.ellipse(g.x,g.y,20,20,0,0,360)
        c.stroke()

        //draw circle outline
        c.fillStyle = "rgb(255,255,255)"
        c.beginPath(    )
        c.ellipse(g.x,g.y,20,20,0,0,360)
        c.fill()

        g.r = angle(g.x,g.y,button.x+50,button.y+40) + Math.PI/2

        //draw rectangle (gun barrel)

        c.save()

        c.translate(g.x,g.y)
        
        c.rotate(g.r)

        c.strokeStyle = "rgb(0,0,0)"
        c.strokeRect(-10,-35 + g.animationCooldown,20,20)

        c.fillStyle = "rgb(255,255,255)"
        c.fillRect(-10,-35 + g.animationCooldown,20,20)

        c.restore()

    }

}

function drawBullets() {
    for (i in bullets) {
        var b = bullets[i]

        b.x += b.velocity * Math.cos(b.r);
        b.y += b.velocity * Math.sin(b.r);
        b.velocity /= 1.01

        if(b.y >= 610 || b.y < -10 || b.x >= 810 || b.x < -10) {
            b.velocity = 0

        } 

        if (!b.hasHit && within(b.x,b.y,[button.x,button.y,100,80])) {
            b.hasHit = true
            b.velocity = -5

            clickedEffect = 5
            addFloatingText(b.x,b.y,"$" + n(updateMoney((1+upgrade.bulletMultiplier.level) * button.moneyReward)), 60, "#000000", "18px serif", true)

        }

        if (b.velocity < 1) {
            b.opacity -= 0.06
            if (b.opacity < 0) {
                //console.log("bullet " + i + " is gone, but not forgotten.")
                bullets.splice(i,1)
                i++
            }
        }

        c.save()
        c.translate(b.x,b.y)
        c.rotate(b.r + Math.PI/2)
        c.fillStyle = "rgba(0,0,0," + b.opacity + ")"
        c.fillRect(-5,-8,10,16)        
        c.restore()

    }
}

strangeUpgrade.gunBuy.level = guns.length
refreshStrangeUpgrade('gunBuy', '#gunCost', '#gunCount', guns.length)
$("#gunBuy").on("click", function() {
    var cost = calculateUpgradeCost('gunBuy',true)
    if (money >= cost) {
        updateMoney(-1 * cost)
        
        guns.push({x:750* Math.random(),y:550*Math.random(),cooldown:90})
        strangeUpgrade.gunBuy.level++
        refreshStrangeUpgrade('gunBuy', '#gunCost', '#gunCount', guns.length)
    }
})