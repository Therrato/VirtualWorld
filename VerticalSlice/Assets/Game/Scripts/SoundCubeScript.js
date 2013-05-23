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



public var isChecked:boolean = false;
public var needsToBeChecked:boolean = false;



function Awake()
{

}

function Start ()
{
	soundboard = GameObject.Find("SequencerBoard");
	this.transform.position.y+= hoverPosition = Random.value/10 - .05;
	//if ( Random.value >= 0.5) hoverDirection =1;
}

function FillCube()
{
 needsToBeChecked = true;
}

function Update () 
{
 var moveValue = 0.001;
 if (hoverPosition<=hoverMin)hoverDirection = 1;
 if (hoverPosition>=hoverMax)hoverDirection = -1;
 hoverPosition += moveValue*=hoverDirection;

  this.transform.position.y+=moveValue;
}

function OnMouseDown()
{
	isChecked = true;
}

public function TestCube(){
if (isChecked == needsToBeChecked){
 FeedbackGood();
}
else{
 FeedbackBad();
}

}
