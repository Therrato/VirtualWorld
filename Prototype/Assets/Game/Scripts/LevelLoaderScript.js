#pragma strict

public var rowArray:Array = new Array();
private var rowCount = 0;
private var cubeList = new Array();

function Awake()
{
	var songArray:Array = new Array();
	rowArray.Push(songArray);
}

function Start ()
{
getCubeList();
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
			var clone:GameObject;
			clone = Instantiate(Resources.Load("Cube"),Vector3((count*0.5-2.5),0.5,0.6-(i*0.4)),Quaternion.identity);
			
			cubeList.push(clone);
			Debug.Log(cubeList);
			//assign "p01" x6
			clone.GetComponent(SoundCubeScript).FillCube();
			//assign soundCode
			clone.GetComponent(SoundCubeScript).FillCube(code,true);
			
			//
			clone = Instantiate(Resources.Load("Cube"),Vector3((count*0.5-2.5),0.5,0.6-(i*0.4)-(0.4*rowCount)),Quaternion.identity);
			clone.GetComponent(SoundCubeScript).FillCube();
			clone.GetComponent(SoundCubeScript).FillCube(code);
			
			//
			count++;
		}
	}
}

public function getCubeList(){
	return cubeList;
	Debug.Log(cubeList);
}

function NextRow()
{
	rowCount++;
	var songArray:Array = new Array();
	rowArray.Push(songArray);
}


