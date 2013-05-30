#pragma strict
public var Tries:int;

function Awake(){
Tries = -1;

}

function Start () {

}

function Update () {

}

public function addTry(){
Tries++;
}

public function resetScore(){
Tries = -1;
}