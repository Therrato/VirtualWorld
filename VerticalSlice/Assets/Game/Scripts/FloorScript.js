#pragma strict

var randomNumber:float = 0; //starts inactive
//var colour:GameObject

function Start ()
{
	
}

function Update ()
{
	randomize();
}

private function randomize()
{
	//random number from 0-6
	randomNumber = Random.Range(0, 6);
	colour();
}

private function colour()
{
	if(randomNumber == 0) colour("inactive");
	if(randomNumber == 1) colour("blue");
	if(randomNumber == 2) colour("green");
	if(randomNumber == 3) colour("red");
	if(randomNumber == 4) colour("yellow");
	if(randomNumber == 5) colour("purple");
}

private function colour(colour:String)
{
	//change shader to colour
	// Create a material from code
        // Create a material with transparent diffuse shader
        var material = new Material (Shader.Find ("Transparent/Diffuse"));
        material.mainTexture = 
        // assign the material to the renderer
        renderer.material = material;
        Debug.Log("changing colour");
}