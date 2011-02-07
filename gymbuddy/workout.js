var workoutScreen = Titanium.UI.currentWindow;

	var plan_id = workoutScreen.workout;
	Ti.API.info(plan_id);
	
var toast;
var tableview;
	
function toast(label){
	//Ti.API.info('here - '+label+'<<<');
	var toastWin = Titanium.UI.createWindow({
		height:30,
		width:250,
		bottom:70,
		borderRadius:10,
		touchEnabled:false,

		orientationModes : [
		Titanium.UI.PORTRAIT,
		Titanium.UI.UPSIDE_PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT,
		]
	});

	var messageLabel = Titanium.UI.createLabel({
		id:'messagelabel',
		text:label,
		color:'#fff',
		width:250,
		height:'auto',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:13
		},
		textAlign:'center'
	});	
	
	toastWin.add(messageLabel);
	toastWin.open();
	setTimeout(function()
	{
		toastWin.close({opacity:0,duration:2000});
	},2000);
}

function getWorkoutArray(plan_id){
	workoutScreen= Titanium.UI.currentWindow;
	if(typeof(tableview) != 'undefined'){
		workoutScreen.remove(tableview);
	}
	if(typeof(addLabel) != 'undefined'){
		workoutScreen.remove(addLabel);
	}
		
	Ti.UI.createView
	var plansArray = [];
	var db = Titanium.Database.open('gymbuddy');
	Ti.API.info('SELECT * FROM workout where workout_id in (select workout_id from plan_workout_link where plan_id = "'+plan_id+'"');
			
	var dbrows = db.execute('SELECT * FROM workout where workout_id in (select workout_id from plan_workout_link where plan_id = "'+plan_id+'");');
	if(dbrows.getRowCount() > 0){
		while (dbrows.isValidRow()) {
			//Ti.API.info(dbrows.fieldByName('plan_name'));
			plansArray.push(
				{title:dbrows.fieldByName('plan_name'), id: dbrows.fieldByName('plan_id'), hasChild:true}
			); 
			dbrows.next();
		}
		
		tableview = Titanium.UI.createTableView({
			data:plansArray
		});
		workoutScreen.add(tableview);
		
		// create table view event listener
		tableview.addEventListener('click', function(e)
		{
			//Ti.API.info("id -"+e.rowData.id);
			if (e.rowData.id)
			{
				var win = Titanium.UI.createWindow({
					url:'workout.js',
					workout:e.rowData.id,
					title:e.rowData.title
				});
				workoutScreen.close();
				win.open({fullscreen:true, animated:true});
			}
		});
	
	}else{
		addLabel = Titanium.UI.createLabel({
			text:'Please add a workout',
			top:60,
			left:10,
			height:'auto',
			width:'auto',
			headerTitle:'Workout Plans',
			rowBackgroundColor:'white'
		});
	workoutScreen.add(addLabel);
	}
	dbrows.close();
	db.close();
}

//list current workout plans
getWorkoutArray(plan_id);
	
// create a button to close window
var b = Titanium.UI.createButton({
	title:'New Workout',
	bottom:10,
	height:40,
	width:150,
	backgroundGradient:{
		type:'linear',
		colors:['#111','#444'],
		startPoint:{x:0,y:25},
		endPoint:{x:0,y:50},
		backFillStart:true
	}
});

workoutScreen.add(b);
workoutScreen.open({
	transition:Titanium.UI.iPhone.AnimationStyle.CURL_DOWN
});

//new plan event
b.addEventListener('click', function()
{
	getWorkoutArray(plan_id);
});	
	