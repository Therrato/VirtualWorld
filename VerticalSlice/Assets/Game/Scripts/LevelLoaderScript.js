#pragma strict

import System.Collections.Generic;

public var rowArray:Array = new Array();
private var rowCountArray = new Array();
private var rowCubeArray = new Array();
private var arrayCount:int = 0;
private var rowCount:int = 0;

private var CubeList:Array = new Array();

//level info
private var BPM:float;


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
	 rowCountArray.push(rowCount);
}


function LoadCubes()
{
	for (var i = 0; i<=rowCount-1;i++)
	{
		var songArray:Array = rowArray[i];
		var rowCube:GameObject;
		rowCube = Instantiate(Resources.Load("Cylinder"),Vector3((-2.5),0.5,0.6-(i*0.4)),Quaternion.identity);
		rowCube.GetComponent(RowCheckScript).setRow(i);
		rowCubeArray.Push(rowCube);
		
		var count:int = 1;

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
			cube.GetComponent(SoundCubeScript).checkOn(code, arrayCount);
			cube.GetComponent(SoundCubeScript).setBPM(BPM);
			cube.GetComponent(SoundCubeScript).pushRowCheck(rowCube);
			CubeList.push(cube); //push cube to array
			
			cube.transform.parent = GameObject.Find("CubeContainer").transform;
			count++;	//increase count by 1
			arrayCount ++;
			
		}
	}
}

function setBPM(bpm:float){
BPM = bpm;
}

function getBPM():float{
return BPM;
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

public function getRow()
{
	return rowCountArray;
}

public function getRowCubeArray()
{
	return rowCubeArray;
}

function unLoad():void
{
	GameObject.Find("TerminateGame").GetComponent(Terminate).resetFirstTime();
	GameObject.Find("Score").GetComponent(ScoreScript).resetScore();
	while(CubeList.length > 0)
	{
		var cube:GameObject = CubeList[CubeList.length-1];
		CubeList.splice(CubeList.length-1,1);
		cube.GetComponent(SoundCubeScript).DestroyMe();
	}
	clearRowCubeArray();
		
}

function clearRowArray()
{
	rowArray.Clear();
	var songArray:Array = new Array();
	rowArray.Push(songArray);
	rowCount = 0;
}

function clearRowCubeArray()
{
	for(var i=0; i<rowCubeArray.length; i++)
	{
		var rowCube = rowCubeArray[i];
		Destroy(rowCube);
	}
	rowCubeArray.clear();
}

function checkWin():boolean
{
	//go through the array
	for(var i=0; i<CubeList.length; i++)
	{
		var cube:GameObject = CubeList[i];
		if(cube.GetComponent(SoundCubeScript).checkIfCorrect() == false)
		{
			return false;
		}
	}
	return true;
}




