var ns = ["I made this whole thing on a trackpad. Can you believe that?",
    "hi",
    "Mediocre website for exceptional people",
    "IM ONLY 3",
    "genuinely",
    "You bastard! You mutilated me!",
    "Erm, what the FUCK?",
    "ringlesour",
    "Don't you think the newsticker joke is getting kind of old?",
    "They return with the chlorine",
    "This is not for you.",
    "I found it in a drawer",
    "Talkin' teleivion at the casual party",
    "Hit the bottom and escape",
    "Useless rockers from England",
    "I noticed you named your file \"Strange Situation\".",
    "Everything you say will become the truth.",
    "This is actually the second version of Bouncing Button Incremental. The first version was made in 2021, which you can still play at nowheddos.github.io/Bouncing-Button-Incremental. I wouldn't reccomend it, it's an unbalanced buggy mess and I'm not fixing it.",
    "Am I even going to implement this? It's kind of derivitive, and I'm not even making an antimatter dimensions type of game. If I do, I'm leaving this one in, because I think it will be funny."]


var strange_situation = 0

function strangeSituation(x = 6) {
    strange_situation = strange_situation % Math.pow(2,x)
    var modifier = Math.pow(2, Math.round(x * Math.random()))
    if(Math.random() > 0.5 && strange_situation - modifier > 0) {
        strange_situation -= modifier
    } else {
        strange_situation += modifier
    }


    strange_situation = Math.abs(strange_situation)
    return strange_situation

}

    /*c.beginPath()
    c.ellipse(50+strangeSituation(7),50+strangeSituation(7),5,5,0,0,360)
    c.stroke()*/