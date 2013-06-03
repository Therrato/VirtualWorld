#pragma strict

import System.Collections.Generic;

public var soundboard:GameObject;

// change into a move to target by % function, 
private var moveAble:boolean = true;
private var hoverMin:float = -0.05;
private var hoverMax:float = 0.05;
private var hoverDirection:int = -1;
private var hoverPosition:float;
// till this part also change function

private var soundCode:int;
private var BPM:float;



public var isChecked:boolean = false;
public var needsToBeChecked:boolean;



function Awake()
{
	resetFeedback();
}

function Start ()
{
	soundboard = GameObject.Find("SequencerBoard");
	this.transform.position.y+= hoverPosition = Random.value/10 - .05;
}

function checkOn(code:int)
{
 	if(code != 0) this.needsToBeChecked = true;
 	else this.needsToBeChecked = false;
 	soundCode = code;
}
function setBPM(bpm:int)
{
	BPM = bpm;
}

function playDelayed(delay:int)
{
	//var delayValue:float = 60/BPM;	//converts miliseconds to seconds
	//var string = delayValue.ToString();
	
	//print(60/BPM);
	
	yield WaitForSeconds((60/BPM)*delay);
	if(needsToBeChecked == true && soundCode!=0) playMe();
	this.TestCube();
	yield WaitForSeconds(0.3);
	resetFeedback();
}

function playMe(){
	soundboard.GetComponent(SoundProcessor).playOnInt(soundCode);
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
	
	if(isChecked == false)
	{
		isChecked = true;
		if (soundCode!=0) playMe();
		lightUp();
	}

	else
	{
	 isChecked = false;	
	 resetFeedback();
	}
}

public function TestCube()
{
	//if the cube needs to be lighten up && is lighten up
	if (this.isChecked == true && this.needsToBeChecked == true)
	{	
 		this.FeedbackGood();
	}
	//if it is check but shouldn't be checked
 	if(this.isChecked == true && this.needsToBeChecked == false)
	{
		this.FeedbackBad();
	}
	//if it isn't light up && doesn't need to be then it should be neutral
	if(this.isChecked == false && this.needsToBeChecked == false || this.isChecked == false && this.needsToBeChecked == true)
	{
		this.FeedbackNeutral();
	}
}

private function FeedbackGood()
{
	this.gameObject.transform.FindChild("Blue").GetComponent("Halo").active = false;
	this.gameObject.transform.FindChild("Red").GetComponent("Halo").active = false;
	this.gameObject.transform.FindChild("Green").GetComponent("Halo").active = true;
}

private function FeedbackBad()
{
	this.gameObject.transform.FindChild("Red").GetComponent("Halo").active = true;
	this.gameObject.transform.FindChild("Blue").GetComponent("Halo").active = false;
	this.gameObject.transform.FindChild("Green").GetComponent("Halo").active = false;
}
private function FeedbackNeutral()
{
	this.gameObject.transform.FindChild("Red").GetComponent("Halo").active = false;
	this.gameObject.transform.FindChild("Blue").GetComponent("Halo").active = true;
	this.gameObject.transform.FindChild("Green").GetComponent("Halo").active = false;
}
function resetFeedback()
{
	if (isChecked){
		this.gameObject.transform.FindChild("Blue").GetComponent("Halo").active = true;
		this.gameObject.transform.FindChild("Red").GetComponent("Halo").active = true;
		this.gameObject.transform.FindChild("Green").GetComponent("Halo").active = true;
	}
	else{
		this.gameObject.transform.FindChild("Blue").GetComponent("Halo").active = false;
		this.gameObject.transform.FindChild("Red").GetComponent("Halo").active = false;
		this.gameObject.transform.FindChild("Green").GetComponent("Halo").active = false;
	
	}
}

function lightUp()
{
	this.gameObject.transform.FindChild("Blue").GetComponent("Halo").active = true;
	this.gameObject.transform.FindChild("Red").GetComponent("Halo").active = true;
	this.gameObject.transform.FindChild("Green").GetComponent("Halo").active = true;
}

public function DestroyMe()
{
	Destroy(this.gameObject);
}

public function checkIfCorrect():boolean
{
	if(isChecked == needsToBeChecked)
	{
		return true;
	}
	else return false;
}
