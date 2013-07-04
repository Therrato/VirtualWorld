#pragma strict
public var Tries:int = -1;
public var needCount:float;
public var foundCount:float;
public var percentage:float;
public var hudTexture:Texture2D;
private var destroy:boolean = false;

private var textStyle:GUIStyle = new GUIStyle();

function Awake()
{
	//set textStyle
	textStyle.fontSize = 30;
	textStyle.normal.textColor = Color.white;
}

function OnGUI()
{
	if(destroy == false)
	{
		//hud texture
		GUI.DrawTexture(Rect(Screen.width - 512, 0, 512, 128/2), hudTexture);
		
		
		//level
		GUI.Label(Rect(Screen.width - 512 + 100, 17, 50,50), getLevel().ToString(), textStyle);
		
		//tries
		GUI.Label(Rect(Screen.width - 512 + 245, 17, 50,50), showScore(), textStyle);
		
		//percentage
		GUI.Label(Rect(Screen.width - 512 + 455, 17, 50,50), percentage.ToString(), textStyle);
	}
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

public function getScore():int
{
	return Tries;
}

private function showScore():String
{
	if(Tries == -1) return "0";
	else return Tries.ToString();
}

private function getLevel():int
{
	return GameObject.Find("MainMenu").GetComponent(Menu).GetLevel();
}

public function resetPercentage()
{
	yield WaitForSeconds(4);
	percentage = 0;
}

public function setDestroy()
{
	destroy = true;
}
