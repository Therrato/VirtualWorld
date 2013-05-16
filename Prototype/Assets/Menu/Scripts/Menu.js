#pragma strict

//
private var ingame:boolean = false;
private var interval:float = 0;
private var level:String;

//button width / height
private var buttonWidth:float = 100;
private var buttonHeight:float = 50;

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
private var AboutText:String = "Made By: \n \nTechnical \nRoy Schröder \nKevin Mettes \n \nCreative \nShanna Zwart \nDaniel Visser";

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
			Debug.Log("starting game");
			State = "ingame";
			Application.LoadLevel("mainGame");
			level = "XMLdocument.xml";
			
			
			
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
}

function loadLevel(level)
{
	if(interval > 1 && State == "ingame")
	{
		GameObject.Find("LevelLoader").GetComponent(XMLloader).loadXML(level);
		State = "loaded";
	}
}