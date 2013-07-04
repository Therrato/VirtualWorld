#pragma strict

public var TutorialBackground:Texture2D;

function Start () {

}

function Update () {

}

function OnGUI()
{
	GUI.DrawTexture(Rect(0,Screen.height - 150, Screen.width, 150), TutorialBackground);
	GUI.depth = 1;
}