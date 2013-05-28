#pragma strict

var randomNumber:float = 0; //starts inactive
//var colour:GameObject

function Start ()
{
	randomize();
}

function Update ()
{
	colour();
}

private function randomize()
{
	//random number from 0-6
	randomNumber = Random.Range(0, 6);
}

private function colour()
{
	if(randomNumber == 0) Debug.Log("inactive");
	if(randomNumber == 1) Debug.Log("blue");
	if(randomNumber == 2) Debug.Log("green");
	if(randomNumber == 3) Debug.Log("red");
	if(randomNumber == 4) Debug.Log("yellow");
	if(randomNumber == 5) Debug.Log("purple");
}