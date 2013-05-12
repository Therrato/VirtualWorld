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

}

function LoadCubes()
{
var count = 0;
for (var code:String in songArray){
var clone:GameObject;
clone = Instantiate(Resources.Load("Cube"),Vector3((count*0.5-2.5),0.5,0.6),Quaternion.identity);
clone.GetComponent(SoundCubeScript).FillCube();
clone.GetComponent(SoundCubeScript).FillCube(code);
count++;

}

}

function TestArray(){
for(var code:String in songArray)
    Debug.Log(code);
    
}