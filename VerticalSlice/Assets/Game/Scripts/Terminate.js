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
		
		//load MainMenu scene (go back to main menu)
		Application.LoadLevel("MainMenu");
	}
	
	if(Input.GetKeyUp("space"))
	{
		var array:Array = GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).getCubeList();
		
	
		for (var i:int = 0; i < array.length; i++){
		var cube:GameObject = array[i];
		cube.GetComponent(SoundCubeScript).playDelayed(i % 8);
		//cube.GetComponent(SoundCubeScript).resetDelayed();
		
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