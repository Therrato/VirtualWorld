#pragma strict

public var spaceX:float = 0.59;				//comment these before publish
public var spaceZ:float = 0.615;			
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
	createFloor(4,4);
}

function createFloor(width:float, height:float)
{
	for(var i = 0; i < width; i++)
	{
		for(var j = 0; j < height; j++)
		{
			//Instantiate tile												/		x   /	y	/		z   	/
			var Tile:GameObject = Instantiate(Resources.Load("Tile"),Vector3(i * spaceX , 	0	, 	 j * spaceZ), Quaternion.identity);
			//add child to Dancefloor
			Tile.transform.parent = GameObject.Find("Dancefloor").transform;
			//add tile to the array
			TileList.push(Tile);
		}
	}
}

public function colourByArray(array:Array)
{
	for(var i=0; i<array.length; i++)
	{
		//store the tile as gameobject
		var Tile:GameObject = TileList[i];	
		//assign the colour
		Tile.gameObject.GetComponent(FloorScript).colour(array[i]);
	}
}