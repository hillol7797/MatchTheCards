var game,card,img=[2],pic=[3],l=0,c,rButton,slider,goButton,gUButton,score;

var n=2*2;

function setup() {
    c=createCanvas(414,600); 
    c.position(windowWidth/2-width/2,50);
    background(255);
    card=loadJSON("cards.json",loaded);
    createP("");
    rButton=createButton("Reset");
    rButton.position(10,10);
    rButton.mouseClicked(resetFunc);
    slider=createSlider(2,5,2,1);
    slider.position(0,40);
    goButton=createButton('Set N');
    goButton.position(175,40);
    goButton.mouseClicked(setN);
    gUButton=createButton('Give Up');
    gUButton.position(10,70);
    gUButton.mouseClicked(giveUpFunc);
    score=createP('Score: 0');
    score.position(windowWidth/2-200,50+height);
    score.style('font-size', '18px');
}

function resetFunc()
{
    if(c==null)
    {
        c=createCanvas(414,600); 
        c.position(windowWidth/2-width/2,50); 
        score.show();
    }
    game=new Game(n);
    createImageSet();
    l=1;
}

function setN()
{
    n=2*slider.value();
    c=null;
    noCanvas();
    resetFunc();
}

function giveUpFunc()
{
    game.giveUp();
}
var len;
function loaded()
{
    img[0]=[];
    img[1]=[];
    len=card.cards.length;
    for(var i=0;i<len;i++)
    {
        img[0][i]=loadImage(card.cards[i].img);
        img[1][i]=card.cards[i].name;
    }
    resetFunc();
}

function mousePressed()
{
    game.input();
}
var check=false;
function draw() {
    
    if(l)
    {
        game.view();
        score.html('Score: '+game.getScore());
        check=game.isDone();
        if(check)
        {
            noCanvas;
            c=null;
            p=createP('Congratulations..!!');
            p.position(windowWidth/2-100,windowHeight/2-20);
            p.style('font-size','24px');
            p.style('color','#00ff40');
            p2=createP('Your Score: '+game.getScore());
            p2.position(windowWidth/2-100,windowHeight/2+20);
            p2.style('font-size','18px');
            p2.style('color','#0000e0');
            score.hide();
        }
    }
}

function createImageSet()
{
    pic[0]=[];
    pic[1]=[];
    pic[2]=[];
    var usedIndex=[];
    for(var i=0;i<n*n/2;i++)
    {
        var loop=true,index;
        while(loop)
        {
            loop=false;
            index=floor(random(img[0].length));
            for(var i=0;i<usedIndex.length;i++)
                if(index==usedIndex[i])
                    loop=true;
        }
        usedIndex.push(index);
        pic[0][i]=img[0][index];
        pic[1][i]=img[1][index];
        pic[2][i]=0;
    }
    game.model(pic);
}
