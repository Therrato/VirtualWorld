#pragma strict

import System.IO;

var randomNumber:float = 0; 	//starts inactive
public var texture:Texture[];	//array of textures

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
	randomNumber = Random.Range(0, 8);
	//colours the tile
	colour();
}

private function colour()
{
	if(randomNumber == 0) colour(0);	//if randomNumber = 0 then call function and give colour
	if(randomNumber == 1) colour(1);
	if(randomNumber == 2) colour(2);
	if(randomNumber == 3) colour(3);
	if(randomNumber == 4) colour(0);
	if(randomNumber == 5) colour(4);
	if(randomNumber == 6) colour(5);
	if(randomNumber == 7) colour(0);
}

public function colour(colour:int)
{
		renderer.material.mainTexture = texture[colour];	//assigns the texture from the array
}