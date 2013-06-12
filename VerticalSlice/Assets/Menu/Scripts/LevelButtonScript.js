#pragma strict
var levelString:String;
var levelNumber:float;
var canPlay:boolean = false;



function Start () {

}

function Update () {

}

function SetLevel(number:float,opened:boolean){
	levelString="Level"+number+".sbs";
	levelNumber=number;
	canPlay=opened;
}

function OnMouseUp()
{
	if (canPlay){
	GameObject.Find("MainMenu").GetComponent(Menu).setLevel(levelString,levelNumber);
	}
	else	Debug.Log("cant Play Level");

}