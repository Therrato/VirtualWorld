#pragma strict
var levelString:String;
var levelNumber:float;
var canPlay:boolean = false;
var texturesArray:Texture[];


function Start () {

}

function Update () {

}

function SetLevel(number:float,opened:boolean){
	levelString="Level"+number+".sbs";
	levelNumber=number;
	canPlay=opened;
	
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