#pragma strict
     
    
import System.IO;

//
private var interval:float = 0;
private var level:String;
private var levelPath:String;
private var count:float;
private var currentLevel:float;

//button width / height
private var buttonWidth:float = 100;
private var buttonHeight:float = 50;

//level Button
private var levelButtonWidth:float = 50;
private var levelButtonHeight:float = 50;

//main menu
private var StartGame:String = "Start Game";
private var Options:String = "Options";
private var About:String = "About";

//options save settings
private var SaveSettings:String = "Save Settings";

//about
private var aboutWidth:float = 100;
private var aboutHeight:float = 400;
private var Back:String = "Back";
private var AboutText:String = "Made By: \n \nTechnical \nRoy Schröder \nKevin Mettes \nRaphael Youssef \nVadim Krupenin \n \nCreative \nShanna Zwart \nDaniel Visser";

//overall menu state
private var State:String = "MainMenu";

function Awake()
{
	DontDestroyOnLoad (transform.gameObject);
}

function Start ()
{
	
}

function Update ()
{
	if(State == "ingame")
	{
		interval++;
		//Debug.Log(interval);
		loadLevel(level);
	}

}

function OnGUI()
{
	//
	//		Main Menu
	//
	
	if(State == "MainMenu")
	{
		//Start game
		if(GUI.Button(new Rect(Screen.width / 2 - buttonWidth / 2, Screen.height / 2 - 150, buttonWidth, buttonHeight), StartGame))
		{
			Debug.Log("level selector");
			State = "Level Select";
			//State = "ingame";
			
			
			//level

		}
		
		//Options
		if(GUI.Button(new Rect(Screen.width / 2 - buttonWidth / 2, Screen.height / 2 - 50, buttonWidth, buttonHeight), Options))
		{
			Debug.Log("Options");
			State = "Options";
		}
		
		//About
		if(GUI.Button(new Rect(Screen.width / 2 - buttonWidth / 2, Screen.height / 2 - -50, buttonWidth, buttonHeight), About))
		{
			State = "About";
		}
		
	}
	
	//
	// 		Options
	//
	
	if(State == "Options")
	{
		//change button
		if(GUI.Button(new Rect(Screen.width / 2 - buttonWidth / 2, Screen.height / 2 - 150, buttonWidth, buttonHeight), Options))
		{
			Debug.Log("changing settings");
		}
		
		//save and go back
		if(GUI.Button(new Rect(Screen.width / 2 - buttonWidth / 2, Screen.height / 2 - -50, buttonWidth, buttonHeight), SaveSettings))
		{
			Debug.Log("saving settings");
			State = "MainMenu";
		}
	}
	
	//
	//		About
	//
	
	if(State == "About")
	{
		GUI.Label(new Rect(Screen.width / 2 - aboutWidth / 2, Screen.height / 2 - 150, aboutWidth, aboutHeight), AboutText);
		
		if(GUI.Button(new Rect(Screen.width / 2 - buttonWidth / 2, Screen.height / 2 - -50, buttonWidth, buttonHeight), Back))
		{
			State = "MainMenu";
		}
	}
	
	//
	//Start Game -> Level Selector
	//
	
	if(State == "Level Select")
	{
		//count files in the directory
		fileCount();
		
		//check if progress file isn't there
		if(File.Exists(levelPath) == false)
		{
			//find the MainMenu object, access the script XMLprogressLoader and execute createsavegame to create a progress.xml
			GameObject.Find("MainMenu").GetComponent(XMLprogressLoader).CreateSaveGame();
		}
		//for every LevelX.xml create a button
		for(var i:float; i<count; i++)
		{
			var levelCount:float = i+1;
			//create buttons	   |						X					|					Y						|	  Width	   |		Height		|		Name			|
			if(GUI.Button(new Rect(Screen.width / 10 - levelButtonWidth / 2 + i*65,	 Screen.height / 2 - levelButtonHeight, levelButtonWidth, levelButtonHeight), 	levelCount.ToString()))
			{
				//check the current level you can play
				var check:float = GameObject.Find("MainMenu").GetComponent(XMLprogressLoader).checkCount(); //check if the level is playable by looking at the progress.xml
				if(check < levelCount)
				{
					Debug.Log("Error, can't do this level yet"); //show in console that the level is not playable yet
					//visual blocking of levels TBI
				}
				//if you can play it then execute else
				else
				{
					level = "Level"+levelCount+".sbs"; //level is a string that the level loader needs
					currentLevel = levelCount;	//set current level to the level you've chosen.
					Debug.Log(level);	//show in console which level you open
					State = "ingame";	//set state to "ingame" so the menu disappears but the functionality can still be accessed
					Application.LoadLevel("MainGame");	//load the MainGame scene which loads the rest
					
				}
			}
		}
	}
}

function fileCount()
{
	//Path to the levels
	
	//unity
	levelPath = Application.dataPath + "\\Menu\\Scripts\\Levels";
	//compiled
	//levelPath = Application.dataPath + "\\Levels";
	
	//get the directory where the levels are stored
	var dir:DirectoryInfo = new DirectoryInfo(levelPath);
	
	//variable to store the info, GetFiles will read all files Level*.xml and store them into the array
    var info:FileInfo[] = dir.GetFiles("Level*.sbs");
    
    //count the amount of files
    count = info.Length;
}

function loadLevel(level)
{
	//wait atleast for 1 frame to load game (else LevelLoader doesn't exist)
	if(interval > 1 && State == "ingame")
	{
		//call loadXML with the level string
		GameObject.Find("MainMenu").GetComponent(XMLloader).loadXML(level);
		//set state to loaded for the GUI to disappear
		State = "loaded";
	}
}

function GetLevel():float
{
	return currentLevel;
}

function destroyMainMenu()
{
	Destroy(GameObject.Find("MainMenu"));
}