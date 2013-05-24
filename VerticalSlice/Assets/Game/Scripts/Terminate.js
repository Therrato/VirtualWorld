#pragma strict

function Start () {

}

function Update ()
{

	if(Input.GetKeyUp("f"))
	{
		//get current level
		var currentLevel = GameObject.Find("MainMenu").GetComponent(Menu).GetLevel();
		//save progress(next level)
		GameObject.Find("MainMenu").GetComponent(XMLprogressLoader).saveGameProgress(currentLevel);
		//destroy MainMenu and XMLProgressLoader
		GameObject.Find("MainMenu").GetComponent(Menu).destroyMainMenu();
		
		//load MainMenu scene
		Application.LoadLevel("MainMenu");
	}
	
	if(Input.GetKeyUp("space"))
	{
		//test -> play third cube when pressing space
		//GameObject.Find("LevelLoader").GetComponent().
		//GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).getBadCubeList();
	}

}