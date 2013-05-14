#pragma strict

import System.Xml;
import System.IO;

function Start ()
{
	loadXML();
}

function Update ()
{

}

function loadXML():void
{
	var xmlDoc:XmlDocument = new XmlDocument();
	//unity
	var filePath:String = Application.dataPath + "\\Menu\\Scripts\\XMLdocument.xml";
	//compiled
	//var filePath:String = Application.dataPath + "XMLdocument.xml";
	//if the file exists then execute
	if(File.Exists(filePath))
	{
		//load the xml document
		xmlDoc.Load(filePath);
		

		//
		//read level info
		//
		
		var levelInfo:XmlNodeList = xmlDoc.GetElementsByTagName("levelinfo");
		var bpm:float;
		var stage:float;
		
		for each (var node:XmlNode in levelInfo)
		{
			//get nodes of info
			var levelInfoList:XmlNodeList = node.ChildNodes;

			for each(var nodeItem:XmlNode in levelInfoList)
			{
				if(nodeItem.Name == "bpm")
				{
					bpm = float.Parse(node.InnerText);
					//send to function
					//tbi
				}
				else if(nodeItem.Name == "stage")
				{
					stage = float.Parse(node.InnerText);
					//send to function
					//tbi
				}
			}
		}
		
		
		//
		//get the rows
		//
		var rows:XmlNodeList = xmlDoc.GetElementsByTagName("rows");
		//code variable
		var code:String = "";
		
		//for every row node in the root element
		for each (var row:XmlNode in rows)
		{
			//for every cubenode in the row
			for each (var cube:XmlNode in row)
			{
				//cube list of the cubenodes (every cube within row)
				var cubeslist:XmlNodeList = cube.ChildNodes;
				
				//for every cubeItem
				for each (var cubeItem:XmlNode in cubeslist)
				{ 
					//if the node in the list is called cube execute
					if(cubeItem.Name == "cube")
					{
						//for every property within the cube execute
						for each(var cubeProperty:XmlNode in cubeItem)
						{	
							//if the property name is code then execute
							if(cubeProperty.Name == "code")
							{
								code = cubeProperty.InnerText;
								
								//should send code to the loader so the LevelLoader can put it into an array
								GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).PushCube(code);
							}
						}
					}
					
				}
				GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).NextRow();
			}
			
			
		}
		GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).LoadCubes();
		
	}
	else Debug.Log("XML file not found");
}
