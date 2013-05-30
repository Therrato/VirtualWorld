#pragma strict

//public var spaceX:float = 0.295;		//uncomment if need tweaks
//public var spaceZ:float = 0.308;		//uncomment if need tweaks
private var TileList:Array = new Array();

function Start ()
{

}

function Update ()
{

}

function Awake()
{
	Debug.Log("LET THE FLOOR BE MADE!");
	//creates a floor 10 x 10 tiles
	createFloor(10,10);
}

function createFloor(width:float, height:float)
{
	for(var i = 0; i < width; i++)
	{
		for(var j = 0; j < height; j++)
		{
			//Instantiate tile												/		x   /	y	/		z   	/
			var Tile:GameObject = Instantiate(Resources.Load("Tile"),Vector3(i * 0.295 , 	0	, 	 j * 0.308), Quaternion.identity);
			//add child to Dancefloor
			Tile.transform.parent = GameObject.Find("Dancefloor").transform;
			//add tile to the array
			TileList.push(Tile);
		}
	}
}