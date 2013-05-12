#pragma strict
public var cubeArray = new Array();
public var soundboard:GameObject;
private var IMx:int;
private var IMy:int;



function Start ()
{
	FillCube();
}

function FillCube()
{
	cubeArray.Push("p01");
	cubeArray.Push("p12");
	cubeArray.Push("p10");
	cubeArray.Push("p03");
	cubeArray.Push("p02");
	cubeArray.Push("p07");
	FillCube("p04");
}

function FillCube(soundCode:String){

//assigns the correct sound to a random face of the cube (but not on 0 else it would be instant correct)
cubeArray[Mathf.FloorToInt(Random.value*5 + 1)] = soundCode;

}

function Update () 
{

}

function OnMouseDown()
{
	Debug.Log("now");
	
	if(Input.GetMouseButtonDown(0))
	{
		IMx = Input.mousePosition.x;
		IMy = Input.mousePosition.y;
		Debug.Log("now: pos x"+ IMx +" pos y"+ IMy);
	}
}

function OnMouseUp(){

	if(Input.mousePosition.x == IMx&&Input.mousePosition.y == IMy) PlayMe();
	else{
		var movedx = IMx-Input.mousePosition.x;
		var movedy = IMy-Input.mousePosition.y;
		
		Debug.Log("movedx = "+ movedx+" movedy = "+movedy); 
		
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

function PlayMe(){
//play sound
soundboard.GetComponent(SoundProcessor).playOnString(cubeArray[0]);
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
