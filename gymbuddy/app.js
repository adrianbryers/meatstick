//Ben Cole
//9th Jan 2011
//GymBuddy app

//INSTALL DATABASE
var db_install = Titanium.Database.install('gymbuddy.sqlite','gymbuddy');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//
// create base UI tab and home window
//
var homeScreen = Titanium.UI.createWindow({  
    title:'Home',
    backgroundColor:'#000'
});

//create a button and event listenter
var planButton = Titanium.UI.createButton({
	title:'Workout Plan',
	width:200,
	height:40,
	top:10,
	backgroundGradient:{
		type:'linear',
		colors:['#111','#444'],
		startPoint:{x:0,y:25},
		endPoint:{x:0,y:50},
		backFillStart:true
	}
});

planButton.addEventListener('click', function()
{
	var tabs = Ti.UI.createWindow({
		url:'plans.js'});
		tabs.open({fullscreen:true});
		homeScreen.close();
});

//add items to home screen and open with an animation
homeScreen.add(planButton);
homeScreen.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});


