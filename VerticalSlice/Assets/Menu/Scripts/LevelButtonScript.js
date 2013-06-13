#pragma strict
var levelString:String;
var levelNumber:float;
var canPlay:boolean = false;
var texturesArray:Texture[];
var score:float;
var starScoreList:Array = null;

function Start () {
}

function Update () {

}

function SetLevel(number:float,opened:boolean){
	levelString="Level"+number+".sbs";
	levelNumber=number;
	canPlay=opened;
	score = GameObject.Find("MainMenu").GetComponent(XMLprogressLoader).getScore(levelNumber);
	if(renderer.material.shader.name == "Transparent/Diffuse")
	{
		renderer.material.mainTexture = texturesArray[number-1];
	}
	getStarScores();
}

function OnMouseUp()
{
	if (canPlay)
	{
		Debug.Log("setting level");
		GameObject.Find("MainMenu").GetComponent(Menu).setLevel(levelString,levelNumber);
	}
	else	Debug.Log("cant Play Level");

}

function getStarScores(){
	starScoreList = GameObject.Find("MainMenu").GetComponent(XMLprogressLoader).getStars(levelNumber);
	setStars();
}

function setStars(){
   if(score != 0){
    for (var i = 0; i<=starScoreList.length-1; i++){
    	
  		 var obj = starScoreList[i];
  			var neededScore = int.Parse(obj.ToString());
  				Debug.Log(i+" "+score+levelString);

    	if(neededScore >= score){
    		Debug.Log("i may have max "+ neededScore + " and i have "+score);
    		var i1 = i+1;
    		this.gameObject.transform.FindChild("ScoreDisplay").gameObject.transform.FindChild("Star"+i1).GetComponent(MeshRenderer).renderer.enabled = true;
		}
		
		
		}
	}
}