#pragma strict
// change into a move to target by % function, 
private var moveAble:boolean = true;
private var hoverMin:float = -0.05;
private var hoverMax:float = 0.05;
private var hoverDirection:int = -1;
private var hoverPosition:float;

function Start ()
{
 this.transform.position.x+= hoverPosition = Random.value/10 - .05;
}

function Update ()
{

var moveValue = 0.0005;
	if (hoverPosition<=hoverMin)hoverDirection = 1;
	if (hoverPosition>=hoverMax)hoverDirection = -1;
	hoverPosition += moveValue*=hoverDirection;

	this.transform.position.x+=moveValue;
}

function playAnimation(string:String)
{
	//Debug.Log(string);
	if(string != "RaiseArms" && string != "LowerArms" && string != "FullCycle")
	{
		Debug.Log("The Animation you want to play doesn't exist");
	}
	else animation.Play(string);
}

function playAnimationDelayed(delay:float, string:String)
{
	yield WaitForSeconds(delay);
	playAnimation(string);
}