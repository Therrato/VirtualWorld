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
	var filePath:String = Application.dataPath + "\\Menu\\Scripts\\XMLdocument.xml";
	//if the file exists then execute
	if(File.Exists(filePath))
	{
		//load the xml document
		xmlDoc.Load(filePath);
		
		//load cubes
		
		//begin read row1
		var row1:XmlNodeList = xmlDoc.GetElementsByTagName("row1");
		var code:String = "";
		
		for each (var row1Info:XmlNode in row1)
		{
			//read out nodes of row1
			var cubes:XmlNodeList = row1Info.ChildNodes;
			
			for each (var cubeItem:XmlNode in cubes)
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
			//after reading cubes
			GameObject.Find("LevelLoader").GetComponent(LevelLoaderScript).LoadCubes();
		}
		
	}
	else Debug.Log("XML file not found");
}
