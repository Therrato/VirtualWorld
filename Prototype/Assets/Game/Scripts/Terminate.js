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
	GameObject.Find("XMLprogressLoader").GetComponent(XMLprogressLoader).saveGameProgress(currentLevel);
	//destroy MainMenu and XMLProgressLoader
	GameObject.Find("XMLprogressLoader").GetComponent(XMLprogressLoader).destroyXMLprogressLoader();
	GameObject.Find("MainMenu").GetComponent(Menu).destroyMainMenu();
	
	//load MainMenu scene
	Application.LoadLevel("mainMenu");
}

}