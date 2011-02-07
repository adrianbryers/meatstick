// var plansScreen = Titanium.UI.createWindow({  
	// title:'plans',
	// backgroundColor:'#000'
// });

var plansScreen = Titanium.UI.currentWindow;
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

function getPlansArray(){
	plansScreen= Titanium.UI.currentWindow;
	if(typeof(tableview) != 'undefined'){
		plansScreen.remove(tableview);
	}
	if(typeof(addLabel) != 'undefined'){
		plansScreen.remove(addLabel);
	}
		
	Ti.UI.createView
	var plansArray = [];
	var db = Titanium.Database.open('gymbuddy');
	var dbrows = db.execute('SELECT * FROM workout_plan');
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
		plansScreen.add(tableview);
		
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
				plansScreen.close();
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
	plansScreen.add(addLabel);
	}
	dbrows.close();
	db.close();
}

//list current workout plans
getPlansArray();
	
// create a button to close window
var b = Titanium.UI.createButton({
	title:'New',
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

plansScreen.add(b);
plansScreen.open({
	transition:Titanium.UI.iPhone.AnimationStyle.CURL_DOWN
});

//new plan event
b.addEventListener('click', function()
{
	var new_plan = Ti.UI.createWindow({
		title:'plans',
		width: 220,
		height:400,
		backgroundColor:'#FFF'
	});
	
	//day choose picker
	var label1 = Titanium.UI.createLabel({
		text:'Frequency',
		top:60,
		left:10,
		height:'auto',
		width:'auto'
	});
	
	var picker = Titanium.UI.createPicker({
		top:60,
		left:50,
		useSpinner: true, 
	});
	
	/*var data = [];
	data.push(Titanium.UI.createPickerRow({title:'Not Specified'}));
	data.push(Titanium.UI.createPickerRow({title:'Monday'}));
	data.push(Titanium.UI.createPickerRow({title:'Tuesday'}));
	data.push(Titanium.UI.createPickerRow({title:'Wednesday'}));
	data.push(Titanium.UI.createPickerRow({title:'Thursday'}));
	data.push(Titanium.UI.createPickerRow({title:'Friday'}));
	data.push(Titanium.UI.createPickerRow({title:'Saturday'}));
	data.push(Titanium.UI.createPickerRow({title:'Sunday'}));*/
	
	var data = [];
	data.push(Titanium.UI.createPickerRow({title:'1-2 days a Week', value:'2'}));
	data.push(Titanium.UI.createPickerRow({title:'3 days a Week', value:'3'}));
	data.push(Titanium.UI.createPickerRow({title:'4 days a Week', value:'4'}));
	data.push(Titanium.UI.createPickerRow({title:'5 days a Week', value:'5'}));
	data.push(Titanium.UI.createPickerRow({title:'6 days a Week', value:'6'}));
	data.push(Titanium.UI.createPickerRow({title:'Every Day', value:'7'}));
	picker.add(data);
	
	var picker_val = '1-2 days a Week';
	picker.addEventListener('change',function(e)
	{
		picker_val = e.row.value;
	});
	
	var label2 = Titanium.UI.createLabel({
		text:'Name',
		top:20,
		left:10,
		height:'auto',
		width:'auto'
	});
	
	var nameField = Titanium.UI.createTextField({
		height:35,
		top:20,
		left:50,
		width:250,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	//create button
	var create_button = Titanium.UI.createButton({
	title:'Create',
	top:250,
	left:50,
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
	
	new_plan.add(label1);
	new_plan.add(picker);
	new_plan.add(label2);
	new_plan.add(nameField);
	new_plan.add(create_button);
	new_plan.open();
	
	create_button.addEventListener('click', function(e){
		var workout_name = nameField.value;
		var current = new Date();
		var timestamp = current.getFullYear()+"-"+current.getMonth()+1+"-"+current.getDate()+" "
		+current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
		var db = Titanium.Database.open('gymbuddy');
		// Ti.API.info('time - '+timestamp+'<<<');
		// Ti.API.info('name value - '+nameField.value+'<<<');
		// Ti.API.info('picker value - '+picker_val+'<<<');
		db.execute('INSERT INTO workout_plan (created_at, updated_at, plan_name,frequency,current) VALUES(?,?,?,?,?)',timestamp,timestamp,workout_name, picker_val, '1');
		//show a message about  database insert success
		if(db.rowsAffected > 0){
			toast('Workout '+workout_name+' created');
		}else{
			toast("Error - workout no created");
		}
		
		db.close();
		getPlansArray();
		new_plan.close();
	});
});