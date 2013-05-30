#pragma strict

public var spaceX:float = 0.59;				//comment these before publish
public var spaceZ:float = 0.615;			
private var TileList:Array = new Array();
private var floorTimer:int = 0;

function Start ()
{
this.transform.position.x = -3.5;
}

function Update ()
{
	floorTimer++;
	if(floorTimer % 10 == 0)
	{
		colourByModulo(Random.RandomRange(2,25),Random.RandomRange(0,6));
		
	}
	if(floorTimer % 100 == 0){
		floorToBlack();
		floorTimer = 0;
	}

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

public function floorToColour(colourNumber:int){
	for (var i = 0; i<TileList.length; i++){
	 var Tile:GameObject = TileList[i];
	 Tile.gameObject.GetComponent(FloorScript).colour(colourNumber);
	 
	}

}
public function floorToBlack(){
	floorToColour(0);

}
public function floorToBlue(){
	floorToColour(1);

}
public function floorToGreen(){
	floorToColour(2);

}
public function floorToOrange(){
	floorToColour(3);
}
public function floorToRed(){
	floorToColour(4);
}
public function floorToPurple(){
	floorToColour(5);
}
public function colourByModulo(moduloValue:int,colourValue:int){
 	for (var i = 0; i<TileList.length; i++){
	 	var Tile:GameObject = TileList[i];
	 	if(i%moduloValue==0)Tile.gameObject.GetComponent(FloorScript).colour(colourValue);
	 
	}
}