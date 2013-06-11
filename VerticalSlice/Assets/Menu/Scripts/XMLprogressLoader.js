#pragma strict

import System.Xml;
import System.IO;

function Awake()
{
	DontDestroyOnLoad (transform.gameObject);
}

function Start ()
{
}

function Update ()
{
}

function checkCount():float
{
	var count:float;
	
	//read out XML
	var xmlDoc:XmlDocument = new XmlDocument();
	//unity
	var filePath:String = Application.dataPath + "\\Menu\\Scripts\\" + "Progress.xml";
	//compiled
	//var filePath:String = Application.dataPath + "/Levels/" + "Progress.xml";
	
	//if the file exists then execute
	if(File.Exists(filePath))
	{
		//load the xml document
		xmlDoc.Load(filePath);
		
		//get levelProgress as root node
		var progress:XmlNodeList = xmlDoc.GetElementsByTagName("levelProgress");
		
		//get child node of levelProgress
		for each(var node:XmlNode in progress)
		{
			var checkList:XmlNodeList = node.ChildNodes;
			
			for each(var check:XmlNode in checkList)
			{
				//if its called check
				if(check.Name == "check")
				{
					//read out check
					count = float.Parse(node.InnerText);
				}
			}
		} 
		
	}
	
	else Debug.Log("Error Progress.xml does not exist");
	//return the value
	return count;
}


//saves the game progress (calling function)
//parameter = current level
function saveGameProgress(level:float)
{

	var xmlDoc:XmlDocument = new XmlDocument();	//new xml Document
	
	//unity
	var filePath:String = Application.dataPath + "\\Menu\\Scripts\\" + "Progress.xml";
	//compiled
	//var filePath:String = Application.dataPath + "/Levels/" + "Progress.xml";
	
	//executes the next code if the file exists at the given filePath
	if(File.Exists(filePath))
	{
		//load the xml document
		xmlDoc.Load(filePath);
		
		//store nextLevel as float
		var nextLevel:float = level + 1;	//next level would be level + 1
		
		//if nextLevel > check continue script else it means its a redo of the level
		if(nextLevel > checkCount())
		{
			//get root element
			var levelProgressNew:XmlElement = xmlDoc.DocumentElement;
			
			
			levelProgressNew.RemoveAll();	//remove every child of the root element (removes anomolies if any)
			
			
			var checkNew:XmlElement = xmlDoc.CreateElement("check");	//create new element called check
			levelProgressNew.AppendChild(checkNew);						//child it to the root element
			checkNew.InnerText = nextLevel.ToString();					//fill in the check element
			xmlDoc.Save(filePath);										//save the xml document
			//Debug.Log("Progress has been saved!");
		}
		else Debug.Log("This is a redo of a previous level, no progress has been saved");
	}
}

function saveGameScore(level:float)
{
	var xmlDoc:XmlDocument = new XmlDocument();											//xml document
	var filePath:String = Application.dataPath + "\\Menu\\Scripts\\" + "Score.xml";		//filepath of the document
	
	if(File.Exists(filePath))
	{
		xmlDoc.Load(filePath);															//if it exists load it
		
		var myScore = GameObject.Find("Score").GetComponent(ScoreScript).getScore();	//get the score you have now
		var oldScore = this.getScore(level, xmlDoc, filePath);							//get the old score you had (if you had any) if its not it's 0
		
		//Debug.Log("My Score: " + myScore);
		//Debug.Log("Old Score: " + oldScore);
		
		//this will search up the old score and replaces it with the new score since it is a better score
		if(myScore < oldScore || oldScore == 0)											//if the score you are having(amount of tries) < than your old score OR when it is 0 (nonexisting) {execute}
		{
			var count:int;	//create a counter for later
			
			var progress:XmlNodeList = xmlDoc.GetElementsByTagName("levelProgress");	//get levelProgress as root node
			
			
			for each(var levelNode:XmlNode in progress)									//for every node of the root node
			{
				
				var levelList:XmlNodeList = levelNode.ChildNodes;	//child nodes of levelProgress in a list (level)
				
				for each(var levels:XmlNode in levelList)								//for child node in that list
				{
					var propertyOfLevel:XmlNodeList = levels.ChildNodes;				//get the property nodes of the levels (aka levelNumber and Score)
					
					for each(var levelNode:XmlNode in propertyOfLevel)
					{
						if(levelNode.Name == "levelNumber")								//if the node's name is equal to levelNumber {execute}
						{
							//store the level
							var levelIs:float = float.Parse(levelNode.InnerText);		//store the level as a float
							//count array
							count++;													//count 1 up
						}
						if(levelNode.Name == "score")									//if the node's name is equal to score {execute}
						{
							if(levelIs == level)										//if levelIs is equal to the level you are searching for {execute}
							{
								levelNode.InnerText = myScore.ToString();				//save the score
							}
						}
					}
					

				}
				
				if(count < level)														//if the count < level it means the level is not in the xml document yet
				{
					count++;															//count 1 up cause we are going to add it
					//Debug.Log("This level is not listed yet!");
					createLevelScore(xmlDoc, filePath, level, myScore);					//create new level in document
					break;																//break it cause it is already saved
				}
			}
			xmlDoc.Save(filePath);														//save the xml document
			//Debug.Log("finished writing to document!");
		}
	}
	else CreateScoreXML(level);
}


//reads out the old score from the xml document returns a float
function getScore(level:float, document:XmlDocument, filePath:String):float
{
	var doc:XmlDocument = document;	//store the xml doc
	var path:String = filePath;		//store the filepath
	
	var progress:XmlNodeList = doc.GetElementsByTagName("levelProgress"); //get levelProgress as root node
	
	//for every node in levelProgress
	for each(var levelNode:XmlNode in progress)
	{
		var levelList:XmlNodeList = levelNode.ChildNodes; //child nodes of levelProgress in a list (level)
		
		for each(var levels:XmlNode in levelList)
		{
			var propertyOfLevel:XmlNodeList = levels.ChildNodes;	//child nodes of level (score / levelNumber)
			
			for each(var levelNode:XmlNode in propertyOfLevel)
			{
				if(levelNode.Name == "levelNumber")					//if the name of the childnode is levelNumber {execute}
				{
					//store the level
					var levelIs:float = float.Parse(levelNode.InnerText);	//save the level as a float
				}
				if(levelNode.Name == "score")						//if the name of the childnode is score {execute}
				{
					if(levelIs == level)							//if the levelNumber is equal to the current level you are searching for
					{
						var thisScore:int = int.Parse(levelNode.InnerText);	//save the score
						return thisScore;									//return the score
					}
				}
			}
		}
	} 
}

//this will create another <level> element in the xml document and fills in the level + score because it did not exist
function createLevelScore(xmlDoc:XmlDocument, filePath:String, level:float, myScore:int)
{
	//Debug.Log("creating new level score");
	
	var rootElement:XmlElement 		= xmlDoc.DocumentElement; //get root element to child levels to (levelProgress)
	
	var newLevelElement:XmlElement 	= xmlDoc.CreateElement("level"); //create new level element
		rootElement.AppendChild(newLevelElement); //child the level element to the root element
	
	
	var newLevelNumber:XmlElement 	= xmlDoc.CreateElement("levelNumber"); //create new levelNumber element
	var newLevelScore:XmlElement 	= xmlDoc.CreateElement("score"); //create new score element
	
		newLevelElement.AppendChild(newLevelNumber); //child levelNumber to level element
		newLevelElement.AppendChild(newLevelScore);	//child score to level element
	
		newLevelNumber.InnerText 	= level.ToString(); //fill in the levelNumber element
		newLevelScore.InnerText 	= myScore.ToString();//fill in the score element
	
	
	xmlDoc.Save(filePath); //save changes
	
	//Debug.Log("new level written in xml document!");
	
	return;
}

//creates a new Score.xml and fills with the needed node
private function CreateScoreXML(level:float)
{
		var xmlDoc:XmlDocument = new XmlDocument();
		//unity
		var path:String = Application.dataPath + "\\Menu\\Scripts\\" + "Score.xml";
		//compiled
		//var filePath:String = Application.dataPath + "/Levels/" + "Score.xml";


		//if there is no score file yet, create basic file
		if(File.Exists(path) == false)
		{
			//create new Progress.xml file and put root element in it
			File.WriteAllText(path, "<levelProgress></levelProgress>");
			//load the document
			xmlDoc.Load(path);
			//get root element of the document
			var levelProgress:XmlElement = xmlDoc.DocumentElement;
			//save the document
			xmlDoc.Save(path);
			
			//Debug.Log("created XML document");
			
			var myScore = GameObject.Find("Score").GetComponent(ScoreScript).getScore();		//get the score
			createLevelScore(xmlDoc, path, level, myScore);										//saves it into the xml document
		}
}

//funtion call from the menu to create a new save game
function CreateSaveGame()
{
		var xmlDoc:XmlDocument = new XmlDocument();
		//unity
		var filePath:String = Application.dataPath + "\\Menu\\Scripts\\" + "Progress.xml";
		//compiled
		//var filePath:String = Application.dataPath + "/Levels/" + "Progress.xml";


	//if there is no progress/save file yet, create start lvl 1
	if(File.Exists(filePath) == false)
	{
		//create new Progress.xml file and put root element in it
		File.WriteAllText(filePath, "<levelProgress></levelProgress>");
		//load the document
		xmlDoc.Load(filePath);
		//get root element of the document
		var levelProgress:XmlElement = xmlDoc.DocumentElement;
		//create XML element "check"
		var check:XmlElement = xmlDoc.CreateElement("check");
		//make check a child of levelProgress
		levelProgress.AppendChild(check);
		//start at lvl 1
		check.InnerText = "1";
		//save the document
		xmlDoc.Save(filePath);
	}
	
}