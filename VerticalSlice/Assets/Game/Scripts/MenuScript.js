#pragma strict

//button width / height
private var buttonWidth:float = 100;
private var buttonHeight:float = 50;

//menu
private var ResumeGame:String = "Resume Game";
private var Options:String = "Options";
private var QuitGame:String = "Quit Game";

//options
private var SaveSettings:String = "Save Settings";

//ingame state
private var inGameState:String = "Game";



function Start ()
{

}

function Update ()
{
	onEscapeKey();
}

function onEscapeKey()
{
	if(Input.GetKeyUp(KeyCode.Escape))
	{
		//show menu
		if(inGameState == "Game")
		{
			inGameState = "Menu";
		}
		else inGameState = "Game";
		//pause game true
		//to be implemented
	}
}

function OnGUI()
{
	//
	//		ingame menu
	//

	if(inGameState == "Menu")
	{
		//Resume game
		if(GUI.Button(new Rect(Screen.width / 2 - buttonWidth / 2, Screen.height / 2 - 150, buttonWidth, buttonHeight), ResumeGame))
		{
			//return to game
			inGameState = "Game";
			
			//unpause game
			//to be implemented
		}
		
		//Options
		if(GUI.Button(new Rect(Screen.width / 2 - buttonWidth / 2, Screen.height / 2 - 50, buttonWidth, buttonHeight), Options))
		{
			inGameState = "Options";
		}
		
		//Quit
		if(GUI.Button(new Rect(Screen.width / 2 - buttonWidth / 2, Screen.height / 2 - -50, buttonWidth, buttonHeight), QuitGame))
		{
			GameObject.Find("MainMenu").GetComponent(Menu).destroyMainMenu();
			Application.LoadLevel("MainMenu");
		}
	}
	
	//
	//		ingame options
	//
	
	if(inGameState == "Options")
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
			inGameState = "Menu";
		}
	}
}