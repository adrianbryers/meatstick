// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({id:'tabGroup1'});
var win = Titanium.UI.currentWindow;

// create home tab and window
var tab1_win = Titanium.UI.createWindow({
    url:'app.js',
    titleid:'win_tab1'
});

var tab_home = Titanium.UI.createTab({
	id:'tab_home',
    window:tab1_win,
	 titleid:'win_tab1',
	 title: 'Home'
});
// create plans tab and window
var tab2_win = Titanium.UI.createWindow({
    url:'plans.js',
    titleid:'win_tab2'
});
var tab_plans = Titanium.UI.createTab({
	id:'tab_plans',
	titleid:'win_tab2',
    window:tab2_win,
	 title: 'Routines'
});

tabGroup.addTab(tab_home);
tabGroup.addTab(tab_plans);

tabGroup.setActiveTab(1); 

// open tab group with a transition animation
// tabGroup.open({
	// transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
// });

tab1_win.close();
tab2_win.open();

tab_home.addEventListener('click', function()
{
	var home = Ti.UI.createWindow({
		url:'app.js'});
		home.open({fullscreen:true});
		win.close();
});