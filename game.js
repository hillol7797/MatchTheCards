var fUp;
var whoFUp=[];
var cards=[];
var scr=0;
function Game(n)
{
    this.sclw,this.sclh,this.back;
    this.pic;
    this.model=function(pic)
    {
        whoFUp=[];
        fUp=0;
        cards=[];
        scr=0;
        this.pic=pic;
        this.back=loadImage('Cards/back.jpg');
        this.sclw=floor(width/n);
        this.sclh=floor(height/n);
        this.back.resize(this.sclw,this.sclh);
        var x=0;
        for(var i=0;i<=width-this.sclw;i+=this.sclw)
        {
            for(var j=0;j<=height-this.sclh;j+=this.sclh)
            {
                cards[x]=new Card(i,j,this.choose());
                cards[x].state=-1;
                x++;
            }
        }
        
    }
    this.view=function()
    {
        for(var i=0;i<cards.length;i++)
        {
            if(cards[i].state==-1)
            {
                image(this.back,cards[i].x,cards[i].y,this.sclw,this.sclh);
            }
            else if(cards[i].state==1)
            {
                image(cards[i].img,cards[i].x,cards[i].y,this.sclw,this.sclh);
            }
            else if(cards[i].state==2)
            {
                fill(0,0,200,100);
                noStroke();
                image(this.back,cards[i].x,cards[i].y,this.sclw,this.sclh);
                rect(cards[i].x,cards[i].y,this.sclw,this.sclh);
            }
            else
            {   
                fill(255);
                noStroke();
                rect(cards[i].x,cards[i].y,this.sclw,this.sclh);
            }
        }
    }
    
    this.input=function()
    {
        if(fUp==0)
            this.state1();
        else if(fUp==1)
        {
            this.state2();
        }
        else 
            this.state0();
    }
    this.state0=function()
    {
        if(fUp==2)
        {
            if(cards[whoFUp[0]].value==cards[whoFUp[1]].value)
            {
                cards[whoFUp[0]].state=0;
                cards[whoFUp[1]].state=0;
                whoFUp=[];
                fUp=0;
                scr+=10;
            }
            else
            {
                cards[whoFUp[0]].state=-1;
                cards[whoFUp[1]].state=-1;
                whoFUp=[];
                fUp=0;
                scr-=2;
            }
        }
        if(fUp>2)
        {
            cards[whoFUp[0]].state=-1;
            cards[whoFUp[1]].state=-1;
            whoFUp=[];
            fUp=0;
        }
    }
    this.state1=function()
    {
        for(var i=0;i<cards.length;i++)
        {
            if(mouseX>=cards[i].x&&mouseX<(cards[i].x+this.sclw)&&mouseY>=cards[i].y&&mouseY<(cards[i].y+this.sclh))     
            {
                if(cards[i].state==-1)
                {
                    fUp=1;
                    cards[i].state=2;
                    whoFUp[0]=i;
                }
            }
        }
        this.view();
    }
    this.state2=function()
    {
        var gotIn=false;
        for(var i=0;i<cards.length;i++)
        {
            if(mouseX>=cards[i].x&&mouseX<(cards[i].x+this.sclw)&&mouseY>=cards[i].y&&mouseY<(cards[i].y+this.sclh))     
            {
                if(cards[i].state==2)
                {
                    cards[i].state=-1;
                    fUp=0;
                    whoFUp=[];
                }
                else if(cards[i].state==-1)
                {
                    gotIn=true;
                    fUp=2;
                    cards[i].state=2;
                    whoFUp[1]=i;
                }
            }
        }
        if(gotIn)
            this.showCards();
    }
    this.showCards=function()
    {
        cards[whoFUp[0]].state=1;
        cards[whoFUp[1]].state=1;
        this.view();
        setTimeout(function no(){ game.state0(); },1000);
    }
    
    this.isDone=function()
    {
        var isDone=true;
        for(var i=0;i<cards.length;i++)
        {
            if(cards[i].state!=0)
            {
                isDone=false;
                break
            }
        }
        if(isDone)
            return true;
    }
    this.getScore=function()
    {
        return scr;
    }
    this.choose=function()
    {
        var x;
        while(true)
        {
            x=floor(random(this.pic[0].length));
            
            if(this.pic[2][x]<2)
            {
                this.pic[2][x]++;
                var ret=[this.pic[0][x],this.pic[1][x]];
                return ret;
            }
        }
    }
    this.giveUp=function()
    {
        for(var i=0;i<cards.length;i++)
        {
            if(cards[i].state==-1)
                cards[i].state=1;
        }
    }
}