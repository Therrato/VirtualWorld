#pragma strict

private var row:float;
private var checkRow:boolean = true;

function Start ()
{

}

function Update ()
{
	updateHalo();
}

function OnMouseUp()
{
	//var isPlayingRow = GameObject.Find().GetComponent().function();
	if(checkRow == true) setCheckRow(false);
	else setCheckRow(true);
}

function setRow(value:float)
{
	row = value + 1;
}

function getRow()
{
	return row;
}

function setCheckRow(value:boolean)
{
	checkRow = value;
}

function getCheckRow()
{
	return checkRow;
}

function updateHalo()
{
	if(checkRow == true) this.gameObject.transform.FindChild("White").GetComponent("Halo").active = false;
	else this.gameObject.transform.FindChild("White").GetComponent("Halo").active = true;
}