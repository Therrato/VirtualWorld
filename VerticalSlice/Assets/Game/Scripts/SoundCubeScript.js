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

private var rowCheck:GameObject;

private var soundCode:int;
private var BPM:float;



public var isChecked:boolean = false;
public var needsToBeChecked:boolean;



function Awake()
{
	resetFeedback();
}

function pushRowCheck(obj:GameObject)
{
	rowCheck = obj;
}

function Start ()
{
	soundboard = GameObject.Find("SequencerBoard");
	this.transform.position.y+= hoverPosition = Random.value/10 - .05;
}

function checkOn(code:int, arrayCount:int)
{
	//if the code is not 0 it needs to be checked
 	if(code != 0) this.needsToBeChecked = true;
 	//else it should be false
 	else this.needsToBeChecked = false;
 	//assign the sound to the cube
 	soundCode = code;
 	
 	//if the code is 0 then execute
 	if(code == 0)
 	{
 		var rowCountArray:Array = GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).getRow();
 		var row = rowCountArray[arrayCount];
 		
 		if(row == 0) soundCode = 1;
 		else if(row == 1) soundCode = 2;
 		else if(row == 2) soundCode = 3;
 		this.needsToBeChecked = false;
 	}
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
	if(rowCheck.GetComponent(RowCheckScript).getCheckRow())
	{
		yield WaitForSeconds((60/BPM)*delay);
		if(needsToBeChecked == true && soundCode!=0) playMe();
		this.TestCube();
		yield WaitForSeconds(0.3);
		resetFeedback();
	}
}

function playMe()
{
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
	var playingRow = GameObject.Find("TerminateGame").GetComponent(Terminate).getplayingRow();
	
	if(playingRow == false) {
		if(isChecked == false)
		{
			//set the check to true
			isChecked = true;
			//play the sound of the cube
			playMe();
			//light it up
			lightUp();
		}
	
		else
		{
			//uncheck the cube
			isChecked = false;
			//reset the light
			resetFeedback();
		}
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

public function getSoundCode()
{
	return soundCode;
}
