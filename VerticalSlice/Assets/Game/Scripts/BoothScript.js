#pragma strict

function playAnimation()
{
	if(gameObject.animation.IsPlaying("Spin") == false) gameObject.animation.Play();
	yield WaitForSeconds(2.4);
	if(gameObject.animation.IsPlaying("Spin") == false) gameObject.animation.Play();
}