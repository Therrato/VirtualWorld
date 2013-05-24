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
		var array:Array = GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).getCubeList();
		
	
		for (var i:int = 0; i < array.length; i++){
		var cube:GameObject = array[i];
		cube.GetComponent(SoundCubeScript).playDelayed(i % 8);
		
		}
	}

}