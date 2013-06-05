#pragma strict
public var Tries:int;
public var needCount:float = 10;
public var foundCount:float = 8;
public var percentage:float;


function Awake(){
Tries = -1;

}

function Start () {

}

function Update () {
	if(Input.GetKeyUp("s")) 
	{
	calcPercentage();
	}
}

public function addTry(){
Tries++;
}

public function resetScore(){
Tries = -1;
}

public function calcPercentage(){
 percentage = ((needCount/100)*foundCount) *100; 
	Debug.Log(needCount + " /100 * " + foundCount + "*100 = %" + percentage);
}

public function addFound(correct:int){
foundCount += correct;
}

public function addNeed(need:int){
needCount += need;

}
