#pragma strict
public var cubeArray = new Array();
public var soundboard:GameObject;



function Start ()
{
	FillCube();
}

function FillCube()
{
	cubeArray.Push("p02");
	cubeArray.Push("p01");
	cubeArray.Push("p02");
	cubeArray.Push("p03");
	cubeArray.Push("p04");
	cubeArray.Push("p10");
	
	//random assign algorithm
	//tbi
}

function Update () 
{

}

function OnMouseDown()
{
	//if left mouse button is pressed on cube execute
	if(Input.GetMouseButtonDown(0))
	{
		//play sound
		soundboard.GetComponent(SoundProcessor).playOnString(cubeArray[0]);
	}
}

function RollForward()
{

}
