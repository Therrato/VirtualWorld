#pragma strict

function Start ()
{

}

function Update ()
{

}

function wave()
{

}

function playAnimation(string:String)
{
	Debug.Log(string);
	if(string != "RaiseArms" && string != "LowerArms" && string != "FullCycle")
	{
		Debug.Log("The Animation you want to play doesn't exist");
	}
	else animation.Play(string);
}

function playAnimationDelayed(delay:int, string:String)
{
	yield WaitForSeconds(delay);
	playAnimation(string);
}