
// Moral of the story: canvas is shit

const canvas = $('#screen')[0]
const c = canvas.getContext("2d");
var lastCalledTime;
const setOpacity = (hex, alpha) => `${hex}${Math.floor(alpha * 255).toString(16).padStart(2, 0)}`;
var fps;
var frames = 0;
var button = {
    x:50,
    vx:5,
    avx:5, // actual velocity, aka what it should be
    y:100,
    vy:5,
    avy:5,
    moneyReward:1.00,
    speed:1
}
var particle = [
    /*{
        x:400,
        y:300,
        size:20,
        opacity:1,
        color:"252, 186, 3"
    }*/
]

function explode(x,y,color = "default",size = 15,opacity = 1) {

    if (color == "default") {
        "252,186,3"
        color = 220 + (32 * Math.random()) + "," + 154 + (32 * Math.random()) + "," + 3 * Math.random()
    }

    particle.push({x:x,y:y,size:size,color:color,opacity:opacity})
}
var bonus = 0; // amount of frames corner bonus is active. if 0, there is no bonus active.

var clickedEffect = 0;
// this will increase the size of the number display on the button when it is clicked to add a bit of crunchyness to clicking it

var mouseIsInButton = false;

const debug = false;
if (!debug || !document.URL.startsWith("file")) {
    $('#debug')[0].innerHTML = ""
}

var floatingTexts = []

var money = 0.00
$("#moneyCount")[0].innerHTML = money.toFixed(2);

var pos = { x: -1, y: -1 };

$(canvas).mousemove(function(event) {
    pos.x = event.pageX -10
    pos.y = event.pageY -10
});

// screen click handler
$('#screen').on("click", function() {
    if (mouseIsInButton) {
        clickedEffect = 5
        addFloatingText(pos.x,pos.y,"$" + n(updateMoney(button.moneyReward)),90,"#000000","20px serif",true)
        
    }
})




function updateMoney(v = 0) {
    if (bonus > 0 && v > 0) {
        v *= (upgrade.cornerBoost.level + 3)
    }
    money += v
    $("#moneyCount")[0].innerHTML = n(money.toFixed(2));
    return v.toFixed(2)
}

function addFloatingText(x,y,text,time = 180,color = "#000000", font = "20px serif", floatingUpwards=false) {
    floatingTexts.push(
        {
            text: text,
            x:x,
            y:y,
            color:color,
            font:font,
            time:time,
            floatingUpwards:floatingUpwards
        }
    )
}

function scientific(x) {
    var exponent = Math.floor(0.001+Math.log(x) / Math.log(10))
    if (x.toString()[1] != "e" && x.toString()[1] != ".") {
        return x.toString()[0] + "." + x.toString()[1] + "e" + exponent
    } else if (x.toString()[1] == ".") {
        return x.toString()[0] + "." + x.toString()[2] + "e" + exponent
    } else {
        return x.toString()[0] + ".0" + "e" + exponent

    }

}
function n(x) {
    if (x > 999999) {
        return scientific(x)
    } else {
        return x.toString()
    }
}

function angle(cx, cy, ex, ey) {
    // https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]

    return theta;
  }

function within(x,y,area) { //is the point x, y  
    // area = [x,y,w,h]
    // **REMEMBER THAT 0,0 IS TOP LEFT**

    return (x >= area[0] &&
            x <= area[0] + area[2] && 
            y >= area[1] &&
            y <= area[1] + area[3])
}

function draw(evt) {

    frames++;

    if (bonus > 0) {
        bonus--
    }
    if (clickedEffect > 0){
        clickedEffect -= 0.2
    }

    // calculate framerate
    if(!lastCalledTime) { 
            lastCalledTime = performance.now()
        fps = 0;
        return;
    }
    delta = (performance.now() - lastCalledTime)/1000;
    lastCalledTime = performance.now();
    fps = 1/delta;
    if(frames % 30 == 0) {
        $('#framerate')[0].innerHTML = fps.toFixed(1)
    }

    //clear canvas
    c.globalCompositeOperation = "destination-over";
    c.clearRect(0, 0, 800, 600);


//particle rendering

for(i in particle) {
    p = particle[i]
    p.size+=2
    p.opacity -= 0.08
    c.fillStyle = "rgba(" + p.color + "," + p.opacity + ")"
    c.beginPath(    )
    c.ellipse(p.x,p.y,p.size,p.size,0,0,360)
    c.fill()

    if (p.opacity <= 0) {
        particle.splice(i,1)
        i++
    }

}


    //c.fillStyle = "#000000";
    //c.fillRect (pos.x, pos.y, 4, 4);

    //draw floating text

    for (i in floatingTexts) {

        var ftx = floatingTexts[i]

        ftx.time--
        c.font = ftx.font
        c.textAlign = 'center'
        c.fillStyle = ftx.color
        if(ftx.color == "rainbow") {
            c.fillStyle = 'hsl(' + (frames % 360) + ",100%, 50%)"
        }
        //changes opacity for fadeout
        c.fillStyle = setOpacity(c.fillStyle, ftx.time / 45)
        
        if (ftx.floatingUpwards) {
            ftx.y -= 1 + (40 / ftx.time)
        }

        c.fillText(ftx.text, ftx.x,ftx.y)
        if(ftx.time <= 0) {
            floatingTexts.splice(i,1)
            i++
        }
    }



    //draw objects

    drawGuns()

    drawBullets()

    drawCursors()


    //draw button

    
    c.font =  (clickedEffect + 24) + "px monospace"
    c.textAlign = 'center'
    c.fillStyle = "#61ff8e"
    var buttonRewardLabel = button.moneyReward

    if(bonus > 0) {
        buttonRewardLabel *= (3 + upgrade.cornerBoost.level)
    }   

    buttonRewardLabel = n(buttonRewardLabel.toFixed(2))

    //button text
    c.fillText(buttonRewardLabel,button.x+50,button.y+50,90)

    c.fillStyle = "rgb(100,100,100)"
    mouseIsInButton = within(pos.x,pos.y,[button.x,button.y,100,80])
    if(mouseIsInButton){
        c.fillStyle = "rgb(200,200,200)"
    }
    c.fillRect(button.x+5,button.y+5,90,70)

    c.fillStyle = "rgb(0,0,0)"
    c.fillRect(button.x,button.y,100,80)

    

    //move button

    if(80+button.y >= 600 || button.y < 0) {
        button.vy *= -1
        button.avy *= -1
        button.vx = button.avx + (Math.random() - 0.5) / 3
        // minor adjustment to add randomness
    } 
    if (100 + button.x >= 800 || button.x < 0) {
        button.vx *= -1
        button.avx *= -1
        button.vy = button.avy + (Math.random() - 0.5) / 3  
    }
    
    if (button.x < 0) {
        if (80+button.y >= 600 || button.y < 0) {
            bonus = 360 + 30 * upgrade.cornerTime.level
            addFloatingText(400,300,"Hit a corner! x" + (upgrade.cornerBoost.level + 3),bonus,"rainbow","48px serif")
        }
    } else if (100 + button.x >=800) {
        if (80+button.y >= 600 || button.y < 0) {
            bonus = 360 + 30 * upgrade.cornerTime.level
            addFloatingText(400,300,"Hit a corner! x" + (upgrade.cornerBoost.level + 3),bonus,"rainbow","48px serif")
        }
    }




    //c.fillRect(pos.x-5,pos.y-5,10,10)

    button.x += button.vx/1.5
    button.y += button.vy/1.5

    window.requestAnimationFrame(draw);
}
window.addEventListener('load', function () {

    load()

    draw()

    window.requestAnimationFrame(draw);

    console.log("Trans rights!")
})
