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
	m_audioClip = pianoArray[audioNumber-1];
	audio.PlayOneShot(m_audioClip);
}

private function volume(value:float)
{
	audio.volume = value;
}