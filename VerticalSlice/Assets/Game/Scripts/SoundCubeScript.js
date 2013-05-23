#pragma strict

import System.Collections.Generic;

public var cubeArray = new Array();
public var soundboard:GameObject;
private var IMx:int;
private var IMy:int;
private var moveAble:boolean = true;
private var hoverMin:float = -0.05;
private var hoverMax:float = 0.05;
private var hoverDirection:int = -1;
private var hoverPosition:float;



function Awake()
{
	FillCube();
}

function Start ()
{
	soundboard = GameObject.Find("SequencerBoard");
	this.transform.position.y+= hoverPosition = Random.value/10 - .05;
	//if ( Random.value >= 0.5) hoverDirection =1;
}

function FillCube()
{
	cubeArray.Push("p01");
	cubeArray.Push("p01");
	cubeArray.Push("p01");
	cubeArray.Push("p01");
	cubeArray.Push("p01");
	cubeArray.Push("p01");
	
}

function FillCube(soundCode:String){
//Debug.Log(soundCode);

//assigns the correct sound to a random face of the cube (but not on 0 else it would be instant correct)
cubeArray[Mathf.FloorToInt(Random.value*5 + 1)] = soundCode;

}

function FillCube(soundCode:String,isCorrect:boolean){
if(isCorrect)moveAble=false;
cubeArray[0] = soundCode;

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
	//Debug.Log("now");
	
	if(Input.GetMouseButtonDown(0))
	{
		IMx = Input.mousePosition.x;
		IMy = Input.mousePosition.y;
		//Debug.Log("now: pos x"+ IMx +" pos y"+ IMy);
	}
}

function OnMouseUp(){

	if(Input.mousePosition.x == IMx&&Input.mousePosition.y == IMy||moveAble==false) PlayMe();
	else {
		var movedx = IMx-Input.mousePosition.x;
		var movedy = IMy-Input.mousePosition.y;
		
		//Debug.Log("movedx = "+ movedx+" movedy = "+movedy); 
		
		//check left or right
		if (movedx >= 0 ){//left
			if (movedy >= 0){//Down
			 
			 if (movedy>=movedx) RollBackward(); //
			 else RollLeft();
			}
			else{//Up
				movedy*= -1;
				if (movedy>=movedx) RollForward();
				else RollLeft();
			}
			
		
		}
		else{//right
		movedx*= -1;
		//Debug.Log(movedx);
			if (movedy >= 0){//Down
				if (movedy>=movedx) RollBackward(); 
				else RollRight();
			
			}
			else{ //up
				movedy*= -1;
				if (movedy>=movedx) RollForward(); 
				else RollRight();
			
			}
		
		
		}
		
		
		
	}

}


function PlayMe()
{
	//play sound
	soundboard.GetComponent(SoundProcessor).playOnString(cubeArray[0], moveAble);
}

function RollForward()
{
var bubble:Object;
bubble = cubeArray[0];
cubeArray[0] = cubeArray[1];
cubeArray[1] = cubeArray[2];
cubeArray[2] = cubeArray[3];
cubeArray[3] = bubble;
PlayMe();
}

function RollBackward()
{
var bubble:Object;
bubble = cubeArray[3];
cubeArray[3] = cubeArray[2];
cubeArray[2] = cubeArray[1];
cubeArray[1] = cubeArray[0];
cubeArray[0] = bubble;
PlayMe();
}

function RollLeft()
{
var bubble:Object;
bubble = cubeArray[0];
cubeArray[0] = cubeArray[5];
cubeArray[5] = cubeArray[2];
cubeArray[2] = cubeArray[4];
cubeArray[4] = bubble;
PlayMe();
}

function RollRight()
{
var bubble:Object;
bubble = cubeArray[0];
cubeArray[0] = cubeArray[4];
cubeArray[4] = cubeArray[2];
cubeArray[2] = cubeArray[5];
cubeArray[5] = bubble;
PlayMe();
}

