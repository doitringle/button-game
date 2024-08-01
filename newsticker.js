var ns = [
    "I made this whole thing on a trackpad. Can you believe that?",
    "She's got cream cheese on like three of her fingers!",
    "BY THE WAY, FUCK BOOTSTRAP. I swear to god if I knew how I'd brick the whole website if someone tried adding it. Someone once forked Sandwich Game to add Bootstrap, and IT PISSED ME THE FUCK OFF. DON'T DO THAT. Do you KNOW how hard I worked on that button CSS? COUNTLESS HOURS IN THE COLOR PICKER, REDUCED TO ASHES!! BECAUSE OF YOU.",
    "hi",
    "I'm kind of losing it at the moment",
    "Reduced to shavings!",
    "I love you!",
    "Mediocre website for exceptional people",
    "IM ONLY 3",
    "genuinely",
    "You bastard! You mutilated me!",
    "Erm, what the FUCK?",
    "ringlesour",
    "Don't you think the newsticker is getting kind of old?",
    "They return with the chlorine",
    "This is not for you.",
    "I found it in a drawer",
    "Talkin' teleivion at the casual party",
    "Hit the bottom and escape",
    "Useless rockers from England",
    "I noticed you named your file \"Strange Situation\".",
    "Everything is fine.",
    strangeSituation().toString(),
    "P.A.C.E. yourself.",
    "Some may ask me, \"Chloe, what does it mean?\" and I'll probably answer, in my infinite wisdom, \"I don't know.\"",
    "I'm struggling to get it up to sixty.",
    "linux release soon",
    "The laptop I'm writing this on has the most shitty battery life known to man.",
    "Don't load() what you hate, but save() what you love.",
    "my head hruts",
    "virtual_aquarium.exe (45 gb)",
    "watch my video",
    "When does universal paperclips get around to the heroin selling",
    "YOU NEED TO GET KOVAREX BEFORE BUILDING NUCLEAR YOULL RUN OUT OF URANIUM!!!!",
    "aeughhh...",
    "dog. woof.",
    "aaaand its peam aaaand its yummers ",
    "worst joke known to man",
    "NAAAHHHH....",
    "water in your hands!",
    "Her?",
    "I've made a huge mistake.",
    "Fucked too hard. Loved too deep.",
    "10000 years jail",
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