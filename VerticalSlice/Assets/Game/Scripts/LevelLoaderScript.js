#pragma strict

import System.Collections.Generic;

public var rowArray:Array = new Array();
private var rowCount = 0;
private var CubeList:Array = new Array();


function Awake()
{
	var songArray:Array = new Array();
	rowArray.Push(songArray);
}

function Start ()
{

}

function Update ()
{
}

function PushCube(code:int)
{
	 var pushToMe:Array = rowArray[rowCount];
	 pushToMe.Push(code);
}


function LoadCubes()
{
	for (var i = 0; i<=rowCount;i++)
	{
		var songArray:Array = rowArray[i];
		var count = 0;
		for (var code:int in songArray)
		{
		
			//
			//instantiate cubes
			//
		
			//cube variable of the type gameobject
			var cube:GameObject;
			//put the cube(clone) on stage
			cube = Instantiate(Resources.Load("Cube"),Vector3((count*0.5-2.5),0.5,0.6-(i*0.4)),Quaternion.identity);

			//assign Code active / inactive
			
			cube.GetComponent(SoundCubeScript).checkOn(code);
			CubeList.push(cube); //push cube to array
			count++;	//increase count by 1
			
		}
	}
}

function getCubeList()
{
	return CubeList;
}

function NextRow()
{
	rowCount++;
	var songArray:Array = new Array();
	rowArray.Push(songArray);
}


