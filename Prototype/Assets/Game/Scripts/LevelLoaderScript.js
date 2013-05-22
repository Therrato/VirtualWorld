#pragma strict

import System.Collections.Generic;

public var rowArray:Array = new Array();
private var rowCount = 0;
private var goodCubeList:Array = new Array();
private var badCubeList:Array = new Array();

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

function PushCube(soundCode:String)
{
	 var pushToMe:Array = rowArray[rowCount];
	 pushToMe.Push(soundCode);
}


function LoadCubes()
{
	for (var i = 0; i<=rowCount;i++)
	{
		var songArray:Array = rowArray[i];
		var count = 0;
		for (var code:String in songArray)
		{
		
			//
			//instantiate good cubes
			//
		
			//cube clone variable
			var clone:GameObject;
			//put the cube(clone) on stage
			clone = Instantiate(Resources.Load("Cube"),Vector3((count*0.5-2.5),0.5,0.6-(i*0.4)),Quaternion.identity);
			//assign "p01" x6

			//assign soundCode
			clone.GetComponent(SoundCubeScript).FillCube(code,true);
			//push it to the array
			goodCubeList.push(clone);
			
			
			//
			//instantiate bad cubes
			//
			
			var clone2:GameObject;
			
			//copy of the good cubes turned into bad cubes
			clone2 = Instantiate(Resources.Load("Cube"),Vector3((count*0.5-2.5),0.5,0.6-(i*0.4)-(0.4*rowCount)),Quaternion.identity);
			clone2.GetComponent(SoundCubeScript).FillCube(code);
			
			badCubeList.push(clone2);
			//increase count
			count++;
		}
	}
}

function getGoodCubeList()
{
	return goodCubeList;
}

function getBadCubeList(){
	return badCubeList;
}

function NextRow()
{
	rowCount++;
	var songArray:Array = new Array();
	rowArray.Push(songArray);
}

function allCubes()
{
	var concatList = goodCubeList.concat(badCubeList);
	return concatList;
}


