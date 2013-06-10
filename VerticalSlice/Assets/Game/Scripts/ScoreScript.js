#pragma strict
public var Tries:int;
public var needCount:float;
public var foundCount:float;
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

public function displayScore(){
calcPercentage();

}

public function calcPercentage(){
 percentage = (foundCount/(needCount)) *100; 
	Debug.Log(foundCount + "/ "+needCount +" = "+percentage+"%");
}

public function addFound(correct:int){
foundCount += correct;
}

public function addNeed(need:int){
needCount += need;

}
// n is need c is count
public function setScore(n:int,c:int){
	needCount = n;
	foundCount = c;
}
