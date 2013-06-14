#pragma strict

public var spaceX:float = 0.59;				//comment these before publish
public var spaceZ:float = 0.615;			
private var TileList:Array = new Array();
private var floorTimer:int = 0;
private var Animate = false;
private var refreshRate:float = 0;
private var maxTimer = 15;

var cc:int = 0;
// letter arrays.


// number arrays.
private var n1:Array = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
						 0, 2, 2, 0, 0, 0, 0, 2, 0, 0,
						 0, 2, 2, 0, 0, 0, 0, 2, 2, 0,
						 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 
						 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 
						 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 
						 0, 2, 2, 0, 0, 0, 0, 0, 0, 0,
						 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
						 
private var n2:Array = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
						 0, 1, 1, 0, 0, 0, 1, 1, 0, 0,
						 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 
						 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
						 0, 1, 1, 0, 1, 1, 0, 0, 1, 1,
						 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 
						 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 
						 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 
						 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
						 
private var n3:Array = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
						 0, 0, 3, 3, 0, 0, 0, 3, 3, 0,
						 0, 3, 3, 0, 0, 3, 0, 0, 3, 3,
						 0, 3, 3, 0, 3, 3, 3, 0, 3, 3, 
						 0, 3, 3, 0, 3, 3, 3, 0, 3, 3, 
						 0, 0, 3, 3, 3, 0, 3, 3, 3, 0, 
						 0, 0, 0, 3, 0, 0, 0, 3, 0, 0,
						 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
						 
private var n0:Array = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 
						 0, 0, 4, 0, 0, 0, 0, 4, 0, 0,
						 0, 0, 4, 0, 4, 0, 0, 4, 0, 0,
						 0, 0, 4, 4, 4, 0, 0, 4, 0, 0, 
						 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
						 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 
						 0, 0, 4, 0, 0, 0, 0, 4, 0, 0,
						 0, 0, 4, 4, 4, 4, 4, 4, 0, 0,
						 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];						 
						 
function Start ()
{
	this.transform.position.x = -24.96354;
	this.transform.position.y = -8.745472;
	this.transform.position.z = 10.02955;
	
	this.transform.localScale.x = 10;
	this.transform.localScale.y = 10;
	this.transform.localScale.z = 10;
}

function Update ()
{
	if(Animate){
		moduloByTimer();
		}
	if(!Animate){
		cc++;
		if (cc == maxTimer){
			if (maxTimer !=5) maxTimer = 5;
			stepTrough();
			cc= 0;
			}
		}


}

function moduloByTimer()
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

public function stepTrough(){
var modValue :int = Mathf.Sqrt(TileList.length);
	for (var i = 0 ; i < TileList.length; i++){
		if( i + modValue < TileList.length){
			var tile1:GameObject = TileList[i];
			var tile2:GameObject = TileList[i+modValue];
			tile1.gameObject.GetComponent(FloorScript).colour(tile2.gameObject.GetComponent(FloorScript).getCurrentColour());
		}
	
	}
}

public function floorToColour(colourNumber:int)
{
	for (var i = 0; i<TileList.length; i++)
	{
	 	var Tile:GameObject = TileList[i];
	 	Tile.gameObject.GetComponent(FloorScript).colour(colourNumber);
	}
}
public function setShowDelay(){
maxTimer = 24;
}

public function startAnimateFloor(){
	setShowDelay();
	Animate = true;
}

public function stopAnimateFloor(){
	Animate = false;
}

public function floorToBlack()
{
	floorToColour(0);
}
public function floorToBlue()
{
	floorToColour(1);
}
public function floorToGreen()
{
	floorToColour(2);
}
public function floorToOrange()
{
	floorToColour(3);
}
public function floorToRed()
{
	floorToColour(4);
}
public function floorToPurple()
{
	floorToColour(5);
}

// call letters
public function play3()
{
	setShowDelay();
	colourByArray(n3);
}

public function play2()
{
	setShowDelay();
	colourByArray(n2);
}

public function play1()
{
	setShowDelay();
	colourByArray(n1);
}
public function play0()
{
	setShowDelay();
	colourByArray(n0);
}

public function colourByModulo(moduloValue:int,colourValue:int)
{
 	for (var i = 0; i<TileList.length; i++)
 	{
	 	var Tile:GameObject = TileList[i];
	 	if(i%moduloValue==0)Tile.gameObject.GetComponent(FloorScript).colour(colourValue); 
	}
}

