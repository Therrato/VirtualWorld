#pragma strict

//variable for audio
private var m_audioClip:AudioClip;

//contains piano sounds
public var pianoArray:AudioClip[];
public var guitarArray:AudioClip[];


function Start ()
{
	
}

function Update () 
{

}

public function playOnInt(audioNumber:int):void
{
	
	
	//search what you need to play and apply it
	//m_audioClip = searchAudio(string);
	m_audioClip = pianoArray[audioNumber];
	audio.PlayOneShot(m_audioClip);
	Debug.Log(m_audioClip);
	
}


/*
private function searchAudio(string:String):AudioClip
{
	//result variable
	var result:AudioClip;
	
	//if string starts with a p it means piano -> continue executing piano things
	if(string.StartsWith("x"))
	{
		result = pianoArray[calculatePos(string)];
	}
	else if(string.StartsWith("g"))
	{
		result = guitarArray[calculatePos(string)];
	}
	
	//return the result
	return result;
}

private function calculatePos(string:String):int
{
		//remove the p cause we know its the piano
	    var newString:String = string.Substring(1, 2);
	    var a:int;
		a = int.Parse(newString.Substring(0,1));
		
		var b:int;
		b = int.Parse(newString.Substring(1, 1));
		
		
		//calculate index number
		var index:int;
		//8 keys in 1 octave set so a * 7 (0 included)
		//+b will assign which key in the octave set (0 included == first key)
		//index = (a * 7) + b;
		index = 0;
		return index;
}
*/

private function volume(value:float)
{
	audio.volume = value;
}