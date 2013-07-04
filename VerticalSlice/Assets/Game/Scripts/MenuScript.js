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

public var texturesArray:Texture[];
public var menuBackground:Texture2D;
private var resumeRect:Rect;
private var quitRect:Rect;

function Awake()
{
	resumeRect = new Rect(Screen.width / 2 - (texturesArray[0].width / 2) + 5, (Screen.height / 2) - 50, 164, 68);
	quitRect = new Rect(Screen.width / 2 - (texturesArray[2].width / 2) + 5, (Screen.height / 2) + 35, 164, 68);
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
			//pauseGame();
		}
		else
		{
			//unpauseGame();
			inGameState = "Game";
		}
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
		GUI.DrawTexture(Rect(Screen.width / 2 - 169 / 2, Screen.height / 2 - menuBackground.height / 2, 169, 182), menuBackground);
		//Resume game
		//glow
		if(hoverBoolean(resumeRect) == true)
		{
			if(GUI.Button(resumeRect, texturesArray[0], "label"))
			{
				//return to game
				//unpauseGame();
				inGameState = "Game";
			}
		}
		//noglow
		if(GUI.Button(resumeRect, texturesArray[2], "label"))
		{
			//return to game
			//unpauseGame();
			inGameState = "Game";
		}
		
		//Quit
		//glow
		if(hoverBoolean(quitRect) == true)
		{
			if(GUI.Button(quitRect, texturesArray[1], "label"))
			{
				GameObject.Find("Score").GetComponent(ScoreScript).setDestroy();
				GameObject.Find("MainMenu").GetComponent(Menu).destroyMainMenu();
				Application.LoadLevel("MainMenu");
			}
		}
		//noglow
		if(GUI.Button(quitRect, texturesArray[3], "label"))
		{
			GameObject.Find("MainMenu").GetComponent(Menu).destroyMainMenu();
			Application.LoadLevel("MainMenu");
		}
	}
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

function pauseGame()
{
	GameObject.Find("TerminateGame").GetComponent(Terminate).setPlayingRow(true);
}

function unpauseGame()
{
	GameObject.Find("TerminateGame").GetComponent(Terminate).setPlayingRow(false);
}