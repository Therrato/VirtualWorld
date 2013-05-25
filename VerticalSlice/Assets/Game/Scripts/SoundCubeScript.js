#pragma strict

import System.Collections.Generic;

public var cubeArray = new Array();
public var soundboard:GameObject;

// change into a move to target by % function, 
private var moveAble:boolean = true;
private var hoverMin:float = -0.05;
private var hoverMax:float = 0.05;
private var hoverDirection:int = -1;
private var hoverPosition:float;
// till this part also change function

private var soundCode:int;



public var isChecked:boolean = false;
public var needsToBeChecked:boolean;



function Awake()
{

}

function Start ()
{
	soundboard = GameObject.Find("SequencerBoard");
	this.transform.position.y+= hoverPosition = Random.value/10 - .05;
	//if ( Random.value >= 0.5) hoverDirection =1;
}

function checkOn(code:int)
{
 	if(code != 0) this.needsToBeChecked = true;
 	else this.needsToBeChecked = false;
 	soundCode = code;
 	
}

function playDelayed(delay:int)
{
	var delayEnd:int = delay / 1000;	//converts miliseconds to seconds
	
	yield WaitForSeconds(delay);
	if(needsToBeChecked == true && soundCode!=0) soundboard.GetComponent(SoundProcessor).playOnInt(soundCode);
	this.TestCube();
}

function Update () 
{
 var moveValue = 0.001;
 if (hoverPosition<=hoverMin)hoverDirection = 1;
 if (hoverPosition>=hoverMax)hoverDirection = -1;
 hoverPosition += moveValue*=hoverDirection;

  this.transform.position.y+=moveValue;
}

function OnMouseUp()
{
	if(isChecked == false) isChecked = true;	//should be visually changed!
	else isChecked = false;						//should be visually changed!
}

public function TestCube()
{
	if (this.isChecked == true && this.needsToBeChecked == true)
	{
 			this.FeedbackGood();
	}
	else
	{
 		this.FeedbackBad();
	}

}

private function FeedbackGood()
{
	//should be visual!
	//should turn blue and red off
	this.gameObject.transform.FindChild("Blue").GetComponent("Halo").active = false;
	this.gameObject.transform.FindChild("Red").GetComponent("Halo").active = false;

	//this.gameObject.Find("Red").GetComponent("Halo").active = false;
	Debug.Log("turning off blue and red halo");
}

private function FeedbackBad()
{
	//should be visual!
	this.gameObject.transform.FindChild("Blue").GetComponent("Halo").active = false;
	this.gameObject.transform.FindChild("Green").GetComponent("Halo").active = false;
}
