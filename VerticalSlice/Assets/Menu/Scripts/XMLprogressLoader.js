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