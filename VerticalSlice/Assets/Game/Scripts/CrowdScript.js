#pragma strict

private var crowdArray:Array = new Array();
private var crowdXAmount:float = 5;
private var crowdYAmount:float = 2;


function Start ()
{

}

function Update ()
{

}

function Awake()
{
	createCrowd(crowdXAmount, crowdYAmount);
	this.gameObject.transform.position.x = -2.5;
	this.gameObject.transform.position.z = 3.5;
}

function createCrowd(x:float, z:float)
{
	var previousX:float = 0;
	var previousZ:float = 0;
	
	for(var i=0; i<x; i++)
	{
		for(var j=0; j<z; j++)
		{
			var spaceX:float = Random.Range(0.2, 0.4);
			var spaceZ:float = Random.Range(0.3, 0.5);
			
			//Instantiate crowd												/		x   /	y	/		z   	/
			var crowd:GameObject = Instantiate(Resources.Load("FemaleCrowd"),Vector3(previousX + spaceX , 	0	, j * spaceZ), Quaternion.identity);
			//add child to crowd
			crowd.transform.parent = GameObject.Find("Crowd").transform;
			//if the J increased reset previous X
			previousX = crowd.transform.position.x;
			
			//add crowd to the array
			crowdArray.push(crowd);
		}
	}
}

function getCrowdArray()
{
	return crowdArray;
}

function playCrowdWave()
{
	for(var i=0; i<crowdArray.length; i++)
	{
		//get the crowd
		var crowd:GameObject = crowdArray[i];
		//play the animation with the given delay
		crowd.GetComponent(CrowIndScript).playAnimationDelayed(i%crowdXAmount, "FullCycle");
	}
}