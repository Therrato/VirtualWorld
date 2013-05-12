#pragma strict
public var songArray = new Array();

function Start ()
{
}

function Update ()
{
}

function PushCube(soundCode:String)
{
songArray.Push(soundCode);
TestArray();
}

function LoadLevel()
{

}

function TestArray(){
for(var code:String in songArray)
    Debug.Log(code);
    
}