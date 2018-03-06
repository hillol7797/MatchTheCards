//State -1: Turned
//       0: No there
//       1: FaceUp
//       2: Selected

function Card(x,y,v)
{
    this.x=x;
    this.y=y;
    this.state=-1;
    this.img=v[0];
    this.value=v[1];
    this.pressed=function()
    {
        this.state=1;
    }
}