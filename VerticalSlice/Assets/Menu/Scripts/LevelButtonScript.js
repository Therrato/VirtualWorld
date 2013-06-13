#pragma strict
var levelString:String;
var levelNumber:float;
var canPlay:boolean = false;
var texturesArray:Texture[];
var score:float;

function Start () {

}

function Update () {

}

function SetLevel(number:float,opened:boolean){
	levelString="Level"+number+".sbs";
	levelNumber=number;
	canPlay=opened;
	score = GameObject.Find("MainMenu").GetComponent(XMLprogressLoader).getScore(levelNumber);
	if(renderer.material.shader.name == "Transparent/Diffuse")
	{
		renderer.material.mainTexture = texturesArray[number-1];
	}
	
}

function OnMouseUp()
{
	if (canPlay)
	{
		Debug.Log("setting level");
		GameObject.Find("MainMenu").GetComponent(Menu).setLevel(levelString,levelNumber);
	}
	else	Debug.Log("cant Play Level");

}