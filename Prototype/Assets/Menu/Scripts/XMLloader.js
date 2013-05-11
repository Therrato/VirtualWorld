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
	if(File.Exists(filePath))
	{
		xmlDoc.Load(filePath);
		
		//load cubes
		
		//begin read row1
		var row1:XmlNodeList = xmlDoc.GetElementsByTagName("row1");
		var number:float = 0;
		var code:String = "";
		
		for each (var row1Info:XmlNode in row1)
		{
			//read out 
			var cubes:XmlNodeList = row1Info.ChildNodes;
			
			for each (var cubeItem:XmlNode in cubes)
			{
				if(cubeItem.Name == "cube")
				{
					for each(var cubeProperty:XmlNode in cubeItem)
					{

						if(cubeProperty.Name == "number")
						{
							number = float.Parse(cubeProperty.InnerText);	
						}
						
						else if(cubeProperty.Name == "code")
						{
							code = "code";
						}
						
					
						Debug.Log("Numbers: " + number);
						//Debug.Log("Code: " + code);
						//Debug.Log("instantiating cube");
					}
				}
			}
		}
		
	}
	else Debug.Log("not found");
}