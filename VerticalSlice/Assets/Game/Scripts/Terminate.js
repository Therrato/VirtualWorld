#pragma strict

var playFirstTime:boolean = true;
var timer:float = 250;
var countDown:String;
var TextStyle:GUIStyle;

function Start ()
{

}

function Awake()
{
	//change the font size to value
	TextStyle.fontSize = 128;
	//change the colour of the font
	TextStyle.normal.textColor = Color.white;
}

function OnGUI()
{
	//countdown display
	if(playFirstTime == true)
	{
		GUI.Label(new Rect(Screen.width / 2, 0, 30, 80), countDown, TextStyle);
	}
}

public function playSequence()
{
	//set the boolean on false
	playFirstTime = false;
	//get the array of cubes	
	var array:Array = GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).getCubeList();
	
	for (var i:int = 0; i < array.length; i++)
	{
		//get the cube from the array
		var cube:GameObject = array[i];
		//play the sound of the cube if it contains any
		cube.GetComponent(SoundCubeScript).playDelayed(i % 8);
	}
}



function Update ()
{
	//if it has to play the first time
	if(playFirstTime == true)
	{
		//decrease timer by 1
		timer--;
		//Countdown show
		if(timer == 240) countDown = "3";
		if(timer == 160) countDown = "2";
		if(timer == 80) countDown = "1";
		//if time is up
		if(timer == 0)
		{
			//show nothing in the countdown
			countDown = "";
			//play the sequence
			playSequence();
		}
	}
	
	
	if(Input.GetKeyUp("f"))
	{
		//get current level
		var currentLevel = GameObject.Find("MainMenu").GetComponent(Menu).GetLevel();
		//save progress(next level)
		GameObject.Find("MainMenu").GetComponent(XMLprogressLoader).saveGameProgress(currentLevel);
		//destroy MainMenu and XMLProgressLoader
		GameObject.Find("MainMenu").GetComponent(Menu).destroyMainMenu();
		
		//load MainMenu scene (go back to main menu)
		Application.LoadLevel("MainMenu");
	}
	
	if(Input.GetKeyUp("space"))
	{
		//get the array with cubes
		var array:Array = GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).getCubeList();
	
		for (var i:int = 0; i < array.length; i++)
		{
			//store the cube in a variable for usage
			var cube:GameObject = array[i];
			//play the sound of the cube
			cube.GetComponent(SoundCubeScript).playDelayed(i % 8);
			
			//call increase try function
		}
		
	}
	if(Input.GetKeyUp("n"))
	{
		//get current level
		var currentLevel1 = GameObject.Find("MainMenu").GetComponent(Menu).GetLevel();
		//save progress(next level)
		GameObject.Find("MainMenu").GetComponent(XMLprogressLoader).saveGameProgress(currentLevel1);
		
		//get next level string
		var nextLevel:String = GameObject.Find("MainMenu").GetComponent(Menu).nextLevel();
		
		if(nextLevel == null)
		{
			Debug.Log("max level reached");
			//destroy MainMenu and XMLProgressLoader
			GameObject.Find("MainMenu").GetComponent(Menu).destroyMainMenu();
		
			//load MainMenu scene (go back to main menu)
			Application.LoadLevel("MainMenu");
			
		}
		else
		{
			//tell level loader to unload the level.
			GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).clearRowArray();
			GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).unLoad();
			
			//load the new level
			//get string for next level
			
			//load with xml loader
			GameObject.Find("MainMenu").GetComponent(XMLloader).loadXML(nextLevel);
		}
		
	}
}