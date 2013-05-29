#pragma strict

import System.IO;

var randomNumber:float = 0; //starts inactive
public var texture:Texture[];

function Start ()
{
	
}

function Update ()
{
	if(Input.GetKeyUp("space"))
	{
		randomize();
	}
	
}

private function randomize()
{
	//random number from 0-6
	randomNumber = Random.Range(0, 6);
	colour();
}

private function colour()
{
	if(randomNumber == 0) colour(0);
	if(randomNumber == 1) colour(1);
	if(randomNumber == 2) colour(2);
	if(randomNumber == 3) colour(3);
	if(randomNumber == 4) colour(4);
	if(randomNumber == 5) colour(5);
}

private function colour(colour:int)
{
		Debug.Log(colour);
		renderer.material.mainTexture = texture[colour];
}