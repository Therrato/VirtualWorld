#pragma strict

//variable for audio
private var m_audioClip:AudioClip;

//contains piano sounds
public var pianoArray:AudioClip[];


function Start ()
{
	//play p11 (piano, octaaf set 1, first key)
	playOnString("p11");
}

function Update () 
{

}

private function playOnString(string:String):void
{
	//search what you need to play and apply it
	m_audioClip = searchAudio(string);
	
	//play the sound
	audio.PlayOneShot(m_audioClip);
}

private function searchAudio(string:String):AudioClip
{
	//result variable
	var result:AudioClip;
	
	var thisString:String = string;
	//searh in array
	if(string.StartsWith("p"))
	{
		//remove the p cause we know its the piano
		var newString:String = string.Substring(1, 2);
		
		//example: p12   newstring = 12    we want A to be 1 and B to be 2
		//convert string to int
		var a:int;
		a = int.Parse(newString.Substring(0,1));
		
		var b:int;
		b = int.Parse(newString.Substring(1, 1));
		
		
		//calculate index number
		var index:int;
		index = (a * 7) + b;
		
		//apply the result
		result = pianoArray[index];
	}
	
	//return result
	return result;
}