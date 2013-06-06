#pragma strict
     
    
import System.IO;

//
private var interval:float = 0;
private var level:String;
private var levelPath:String;
private var count:float;
private var currentLevel:float;
private var maxLevel:float;

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

public var texturesArray:Texture[];
public var mainMenuTexture:Texture2D;
public var creditsTexture:Texture2D;
private var style:GUIStyle;

//button rects
private var playRect:Rect;
private var helpRect:Rect;
private var creditsRect:Rect;
private var exitRect:Rect;
private var backRect:Rect;

function Awake()
{
	DontDestroyOnLoad (transform.gameObject);
	playRect 	= new Rect(145, 300, texturesArray[0].width, texturesArray[0].height);
	helpRect 	= new Rect(145, 430, texturesArray[1].width, texturesArray[1].height);
	creditsRect = new Rect(145, 560, texturesArray[2].width, texturesArray[2].height);
	exitRect 	= new Rect(145, 700, texturesArray[3].width, texturesArray[3].height);
	backRect	= new Rect(Screen.width / 2 - texturesArray[8].width / 2, Screen.height - texturesArray[8].height - 50 , texturesArray[8].width, texturesArray[8].height);
}

function Start ()
{

}

function Update ()
{
	if(State == "ingame")
	{
		interval++;
		loadLevel(level);
	}
	//Debug.Log(Input.mousePosition.y);
}

function hoverBoolean(rect:Rect):boolean
{
	var leftBorder = rect.x;
	var rightBorder = rect.x + rect.width;
	var topBorder = rect.y;
	var botBorder = rect.y + rect.height;
	var msY = Screen.height - Input.mousePosition.y;

	if(Input.mousePosition.x > leftBorder && Input.mousePosition.x < rightBorder && msY > topBorder && msY < botBorder)
	{
		return true;
	}
	else return false;

}


function OnGUI()
{
	
	//
	//		Main Menu
	//
	
	
	if(State == "MainMenu")
	{
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), mainMenuTexture);
		//Start game
		
		if(hoverBoolean(playRect) == true)
		{
			if(GUI.Button(playRect, texturesArray[4], "label"))
			{
				State = "Level Select";
			}
		}
		
		else if(GUI.Button(playRect, texturesArray[0], "label"))
		{
			State = "Level Select";
		}
		
		//Help
		
		if(hoverBoolean(helpRect) == true)
		{
			if(GUI.Button(helpRect, texturesArray[5], "label"))
			{
				State = "Help";
			}
		}
		else if(GUI.Button(helpRect, texturesArray[1], "label"))
		{
			State = "Help";
		}
		
		
		//Credits
		if(hoverBoolean(creditsRect) == true)
		{
			if(GUI.Button(creditsRect, texturesArray[6], "label"))
			{
				State = "Credits";
			}
		}
		else if(GUI.Button(creditsRect, texturesArray[2], "label"))
		{
				this.guiTexture.texture = creditsTexture;
				State = "Credits";
		}
		
		//exit
		if(hoverBoolean(exitRect) == true)
		{
			if(GUI.Button(exitRect, texturesArray[7], "label"))
			{
				//exit game
				Application.Quit();
			}
		}
		else if(GUI.Button(exitRect, texturesArray[3], "label"))
		{
				//exit game
				Application.Quit();
		}

	}
	
	//
	//		Help
	//
	
	if(State == "Help")
	{	
		//red
		if(hoverBoolean(backRect) == true)
		{
			if(GUI.Button(backRect, texturesArray[9], "label"))
			{
				State = "MainMenu";
			}
		}
		else if(GUI.Button(backRect, texturesArray[8], "label"))
		{
			State = "MainMenu";
		}
	}
	
	//
	//		Credits
	//
	
	if(State == "Credits")
	{	
		//credits texture background
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), creditsTexture);
		
		
		
		//red
		if(hoverBoolean(backRect) == true)
		{
			if(GUI.Button(backRect, texturesArray[9], "label"))
			{
				State = "MainMenu";
			}
		}
		//blue
		else if(GUI.Button(backRect, texturesArray[8], "label"))
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

					//get rid of texture
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
    maxLevel = count;
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

function nextLevel():String
{
	if(currentLevel == maxLevel)
	{
		return null;
	}
	else
	{
		currentLevel += 1;
		var nextLevel = currentLevel;
		return "Level"+nextLevel+".sbs";
	}
}

function destroyMainMenu()
{
	Destroy(GameObject.Find("MainMenu"));
}