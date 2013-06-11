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


//save the game progress (calling function)
//parameter = current level
function saveGameProgress(level:float)
{

	var xmlDoc:XmlDocument = new XmlDocument();
	
	//unity
	var filePath:String = Application.dataPath + "\\Menu\\Scripts\\" + "Progress.xml";
	//compiled
	//var filePath:String = Application.dataPath + "/Levels/" + "Progress.xml";
	

	if(File.Exists(filePath))
	{
		//load the xml
		xmlDoc.Load(filePath);
		//store nextLevel as float
		var nextLevel:float = level + 1;
		//if nextLevel > check continue script
		if(nextLevel > checkCount())
		{
			//get root element
			var levelProgressNew:XmlElement = xmlDoc.DocumentElement;
			
			//remove every child of the root element
			levelProgressNew.RemoveAll();
			
			//create new check
			var checkNew:XmlElement = xmlDoc.CreateElement("check");
			levelProgressNew.AppendChild(checkNew);
			checkNew.InnerText = nextLevel.ToString();
			xmlDoc.Save(filePath);
			Debug.Log("Progress has been saved!");
		}
		else Debug.Log("This is a redo of a previous level, no progress has been saved");
	}
}

function saveGameScore(level:float)
{
	var xmlDoc:XmlDocument = new XmlDocument();
	var filePath:String = Application.dataPath + "\\Menu\\Scripts\\" + "Score.xml";
	
	if(File.Exists(filePath))
	{
		xmlDoc.Load(filePath);
		
		var myScore = GameObject.Find("Score").GetComponent(ScoreScript).getScore();
		var oldScore = this.getScore(level, xmlDoc, filePath);
		
		//
		Debug.Log("My Score: " + myScore);
		Debug.Log("Old Score: " + oldScore);
		if(myScore < oldScore || oldScore == 0)
		{
			
			Debug.Log("this is a higher score!");
			var count:int;
			//save new score
			//get levelProgress as root node
			var progress:XmlNodeList = xmlDoc.GetElementsByTagName("levelProgress");
			
			//get child node of levelProgress
			for each(var levelNode:XmlNode in progress)
			{
				//child nodes of levelProgress in a list (level)
				var levelList:XmlNodeList = levelNode.ChildNodes;
				
				for each(var levels:XmlNode in levelList)
				{
					var propertyOfLevel:XmlNodeList = levels.ChildNodes;
					
					for each(var levelNode:XmlNode in propertyOfLevel)
					{
						if(levelNode.Name == "levelNumber")
						{
							//store the level
							var levelIs:float = float.Parse(levelNode.InnerText);
							//count array
							count++;
						}
						if(levelNode.Name == "score")
						{
							if(levelIs == level)
							{
								//store the 
								Debug.Log("storing new value!");
								levelNode.InnerText = myScore.ToString();
								Debug.Log("stored new value!");
							}
						}
					}
					

				}
				//if the count < level
				if(count < level)
				{
					//push new level into the array
					count++;
					//create new level in document
					Debug.Log("This level is not listed yet!");
					createLevelScore(xmlDoc, filePath, level, myScore);
					break;
				}
			}
			xmlDoc.Save(filePath);
			Debug.Log("finished writing to document!");
		}
	}
}

//reads out the old score
function getScore(level:float, document:XmlDocument, filePath:String):float
{
	var doc:XmlDocument = document;
	var path:String = filePath;
	//get the old score
	
		//get levelProgress as root node
		var progress:XmlNodeList = doc.GetElementsByTagName("levelProgress");
		
		//get child node of levelProgress
		for each(var levelNode:XmlNode in progress)
		{
			//child nodes of levelProgress in a list (level)
			var levelList:XmlNodeList = levelNode.ChildNodes;
			
			for each(var levels:XmlNode in levelList)
			{
				var propertyOfLevel:XmlNodeList = levels.ChildNodes;
				
				for each(var levelNode:XmlNode in propertyOfLevel)
				{
					if(levelNode.Name == "levelNumber")
					{
						//store the level
						var levelIs:float = float.Parse(levelNode.InnerText);
					}
					if(levelNode.Name == "score")
					{
						if(levelIs == level)
						{
							var thisScore:int = int.Parse(levelNode.InnerText);
							return thisScore;
						}
					}
				}
			}
		} 
	
}

function createLevelScore(xmlDoc:XmlDocument, filePath:String, level:float, myScore:int)
{
	Debug.Log("creatingLevelScore");
	
	//get root element
	var rootElement:XmlElement = xmlDoc.DocumentElement;
	
	//create new level element
	var newLevelElement:XmlElement = xmlDoc.CreateElement("level");
	//child the new level element to root element
	rootElement.AppendChild(newLevelElement);
	//create new levelNumber element
	var newLevelNumber:XmlElement = xmlDoc.CreateElement("levelNumber");
	//create new score element
	var newLevelScore:XmlElement = xmlDoc.CreateElement("score");
	//child new levelNumber to new levelElement
	newLevelElement.AppendChild(newLevelNumber);
	newLevelElement.AppendChild(newLevelScore);
	newLevelNumber.InnerText = level.ToString();
	newLevelScore.InnerText = myScore.ToString();
	//save changes
	xmlDoc.Save(filePath);
	Debug.Log("new level written in xml document!");
	
	return;
}
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
		File.WriteAllText("Progress.xml", "<levelProgress></levelProgress>");
		//load the document
		xmlDoc.Load("Progress.xml");
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

function destroyXMLprogressLoader()
{
	Destroy(GameObject.Find("XMLprogressLoader"));
}