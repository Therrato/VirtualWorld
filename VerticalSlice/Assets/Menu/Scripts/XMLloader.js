#pragma strict

import System.Xml;
import System.IO;


function Start ()
{
}

function Update ()
{

}

function loadXML(level:String):void
{
	var xmlDoc:XmlDocument = new XmlDocument();
	//unity
	//var filePath:String = Application.dataPath + "\\Menu\\Scripts\\Levels\\" + level;
	//compiled
	var filePath:String = Application.dataPath + "/Levels/" + level;
	
	//if the file exists then execute
	if(File.Exists(filePath))
	{
		//load the xml document
		xmlDoc.Load(filePath);
		

		//
		//read level info
		//
		
		var rootNode:XmlNodeList = xmlDoc.GetElementsByTagName("root");
		var bpm:float;

		for each (var node:XmlNode in rootNode)
		{
			//get nodes of info
			var childNodesOfRoot:XmlNodeList = node.ChildNodes;
			
			for each(var childNodes:XmlNode in childNodesOfRoot)
			{
				if(childNodes.Name == "levelinfo")
				{
					var levelInfoList:XmlNodeList = childNodes.ChildNodes;
					
					for each(var nodeItem:XmlNode in levelInfoList)
					{
						if(nodeItem.Name == "bpm")
						{
							bpm = float.Parse(nodeItem.InnerText);
							GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).setBPM(bpm);
						}
					}
				}	
			}
		}
		
		
		//
		//get the rows
		//
		var rows:XmlNodeList = xmlDoc.GetElementsByTagName("rows");
		//code variable
		var code:int;
		
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
								code = int.Parse(cubeProperty.InnerText);
								
								//send code to the loader
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
