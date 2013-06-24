#pragma strict

private var playingRow:boolean = false;


var playFirstTime:boolean = true;
var timer:float = 250;
var countDown:String;
var TextStyle:GUIStyle;
var tutorialHint:boolean = false ;
var currentLevel1:int;
var addDelayhint1:boolean =false;
var addDelayhint2:boolean =false;
var addDelayhint3:boolean =false;
var maxLevel:boolean = false;
public var endScreenTexture:Texture2D;

function Start ()
{
	currentLevel1= GameObject.Find("MainMenu").GetComponent(Menu).GetLevel();
		if (currentLevel1==1)timer = 850;
		else timer = 300;
}

function Awake()
{
	//change the font size to value
	TextStyle.fontSize = 24;
	//change the colour of the font
	TextStyle.normal.textColor = Color.white;
}

function OnGUI()
{
	if (tutorialHint)
	{
		GUI.Label(new Rect(Screen.width / 4-45, Screen.height-120, 30, 80), countDown, TextStyle);
	}
	
	if(maxLevel == true)
	{
		GUI.DrawTexture(Rect(0, 0, (Screen.width)+50, Screen.height), endScreenTexture);
	}
}

public function playSequence()
{
	
	GameObject.Find("Score").GetComponent(ScoreScript).addTry();
	GameObject.Find("DJ Booth").GetComponent(BoothScript).playAnimation();
	//set the boolean on false
	
	//get the array of cubes	
	var array:Array = GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).getCubeList();
	
	for (var i:int = 0; i < array.length; i++)
	{
		//get the cube from the array
		var cube:GameObject = array[i];
		//play the sound of the cube if it contains any
		cube.GetComponent(SoundCubeScript).playDelayed(i % 8);
	}
	playFirstTime = false;
	
	yield WaitForSeconds((60/GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).getBPM())*9);
	if(GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).checkWin() == true)
	{
		GameObject.Find("Crowd").GetComponent(CrowdScript).playCrowdWave();
		nextLevel();
	}
	
}

public function resetFirstTime(){
	timer = 300;
	playFirstTime = true;
}



function Update ()
{
	CheckSeq();
	//if it has to play the first time
	if(playFirstTime == true)
	{
		//decrease timer by 1
		timer--;
		//Countdown show
		// label wise 
		/*
		if(timer == 240) countDown = "3";
		if(timer == 160) countDown = "2";
		if(timer == 80) countDown = "1";
		*/
		if (timer> 601&&timer< 750){
		
		if (currentLevel1==1) { countDown = "These are your Soundcubes. \r\nFirst listen to the sequence. \r\nAfterwards click them to activate them. ";
				tutorialHint = true;
				if (timer==611&&addDelayhint1==false){
					timer+=99;
					addDelayhint1 = true;
				}
			}
		}
		
		if (timer> 450&&timer< 600){
		
		if (currentLevel1==1) { countDown = "If you think you have the sequence correct. \r\nPress space to check your sequence. ";
				tutorialHint = true;
				if (timer==460&&addDelayhint2==false){
					timer+=89;
					addDelayhint2 = true;
				}
			}
		}
		if (timer> 301&& timer<450){
		
		if (currentLevel1==1) { countDown = "Red Soundcubes are incorrect.\r\nGreen Soundcubes are correct\r\nBlue SoundCubes are neutral";
				tutorialHint = true;
				if (timer==310&&addDelayhint3==false){
					timer+=100;
					addDelayhint3 = true;
				}
			}
		}
		
		if(timer == 299){GameObject.Find("Dancefloor").GetComponent(DanceFloor).stopAnimateFloor();
		countDown = "";
		}
		if(timer == 240) GameObject.Find("Dancefloor").GetComponent(DanceFloor).play3();
		if(timer == 160) GameObject.Find("Dancefloor").GetComponent(DanceFloor).play2();
		if(timer == 80) GameObject.Find("Dancefloor").GetComponent(DanceFloor).play1();
		
		if(timer == 10){
			GameObject.Find("Dancefloor").GetComponent(DanceFloor).play0();
		}
		//if time is up
		playOnStart();
	}
	
	if(Input.GetKeyUp("w"))
	{
		GameObject.Find("Crowd").GetComponent(CrowdScript).playCrowdWave();
	}
	
	
	if(Input.GetKeyUp("f"))
	{
		//save progress(next level)
		GameObject.Find("MainMenu").GetComponent(XMLprogressLoader).saveGameProgress(currentLevel1);
		
		//destroy MainMenu and XMLProgressLoader
		GameObject.Find("MainMenu").GetComponent(Menu).destroyMainMenu();
		
		//load MainMenu scene (go back to main menu)
		Application.LoadLevel("MainMenu");
	}
	
	
		/*get the array with cubes
		var array:Array = GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).getCubeList();
	
		for (var i:int = 0; i < array.length; i++)
		{
			//store the cube in a variable for usage
			var cube:GameObject = array[i];
			//play the sound of the cube
			cube.GetComponent(SoundCubeScript).playDelayed(i % 8);
			
			//call increase try function
		}
		*/
		
	
}

function nextLevel()
{
		//get current level
		currentLevel1 = GameObject.Find("MainMenu").GetComponent(Menu).GetLevel();
		//save progress(next level)
		GameObject.Find("MainMenu").GetComponent(XMLprogressLoader).saveGameProgress(currentLevel1);
		GameObject.Find("MainMenu").GetComponent(XMLprogressLoader).saveGameScore(currentLevel1);
		
		//get next level string
		var nextLevel:String = GameObject.Find("MainMenu").GetComponent(Menu).nextLevel();
		
		if(nextLevel == null)
		{
			Debug.Log("max level reached");
			//destroy MainMenu and XMLProgressLoader
			GameObject.Find("MainMenu").GetComponent(Menu).destroyMainMenu();
			maxLevel = true;
			//load MainMenu scene (go back to main menu)
			yield WaitForSeconds(8);
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

function playOnStart() {
	playingRow = true;
	if(timer == 0)
		{	
			//show nothing in the countdown
			countDown = "";
			//play the sequence
			playSequence();
			yield WaitForSeconds(1);
			GameObject.Find("Dancefloor").GetComponent(DanceFloor).startAnimateFloor();
			yield WaitForSeconds(4);
			playingRow = false;
			
			
		}
}


function CheckSeq() {
	if(Input.GetKeyUp("space"))
	{
	
		if (playingRow == false) {
			playSequence();
			playingRow = true;
			yield WaitForSeconds(5);
			playingRow = false;
		}

	}	
}

function getplayingRow():boolean
{
	return playingRow;	
}		