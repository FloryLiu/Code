$(document).ready(function(){
	var status_create;
	var getRoomName = localStorage.getItem("storageRoomName");
	$.ajax({
		async : false,
		method: "get",
		contentType: "application/json",
		url: "http://localhost:8080/smarthome/getroom/"+getRoomName,
	}).done(function(data, textStatus, xhr){
		dataRoom = data;
		console.log("dataRoom.lights");
		console.log(dataRoom);
		const dataRoomStr = JSON.stringify(dataRoom);
		localStorage.setItem("dataRoomStr", dataRoomStr);

		
	});
	$(".title").append('<h3>Create device for '+getRoomName+'</h3>');
	// Light
	var count=0;
	const dataRoomParse = localStorage.getItem("dataRoomStr");
	console.log("dataRoomParse");
	console.log(dataRoomParse);
	const dataRoomObject = JSON.parse(dataRoomParse);
	console.log("dataRoomObject");
	console.log(dataRoomObject);
	console.log(dataRoomObject.lights);
	console.log("fridges");
	
	console.log(dataRoomObject.fridges);
	
	
	
	// for(count; count < dataRoom.lights.length; count++){
	// 	console.log("1111111");
	// 	console.log(count);
		
	// 	createLight(count);
	// 	localStorage.setItem("light", count);
	// 	// localStorage.setItem("lights", dataRoom.);
		

	// }
	for (let count = 0; count < dataRoomObject.lights.length; count++) {
		loadLight(count)
		$(".idLight"+count).val(dataRoomObject.lights[count].id_light);
		$(".nameLight"+count).val(dataRoomObject.lights[count].lightName);
		$("#onoffLight"+count).val(dataRoomObject.lights[count].state);
		$("#bright"+count).val(dataRoomObject.lights[count].brightness);
		$("#light-color"+count).val(dataRoomObject.lights[count].color);
		
	}
	$(".addLight").click(function(){
		createLight(count + 1);
		count++;
	});
	saveLight();
	function createLight(createCount){
		$(".tbodyLight").append(
			"<tr>"
				+ "<td><input type='hiddent' class='idLight"+createCount+"' style='width:40px; border:0; background-color:#e6e6e6;' readonly></td>"
				+ "<td>"
					+ '<input class="nameLight'+createCount+'" id="nameLight" type="text" name="nameLight"/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<select name="onoffLight" id="onoffLight'+createCount+'" style="width: 80px;">'
					+ '<option value="Off" selected>Off</option>'
					+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>"
					+ '<select name="bright" id="bright'+createCount+'" style="width: 80px;">'
					+ '<option value="Level 1 - High brightness" selected>Level 1 - High brightness</option>'
					+ '<option value="Level 2 - Television viewing mode">Level 2 - Television viewing mode</option>'
					+ '<option value="Level 3 - Lamp">Level 3 - Lamp</option>'
					+ '</select>'
				+"</td>"
				+ "<td id='third'>"
					+ '<select name="colorpicker-fontawesome" id="light-color'+createCount+'" style="width: 120px;">'
					+ '<option value="Yellow" selected>Yellow</option>'
					+ '<option value="Green">Green</option>'
					+ '<option value="Blue">Blue</option>'
					+ '<option value="White">White</option>'
					+ '<option value="Orange">Orange</option>'
					+ '</select>'
				+"</td>"
				// + "<td id='forth'>"
				// 	// + '<div id="timepicker" class="input-append">'
				// 		// + '<input type="checkbox" id="timerCheck" class="timerCheck" name="timerCheck"/>'
				// 		+ '<input type="text" style="width: auto" id="timepicker" class="timepicker" name="timepicker/>'
				// 	// + '</div>'
				// +"</td>"
				// + "<td>"
				// // 	+ "<a href='#' class='update"+createCount+"'><h5>Update</h5></a>"
				// // +"</td>"
				// // + "<td>"
				// // 	+ "<a href='#' class='saveLight"+createCount+"'><h5>Save</h5></a>"
				// // +"</td>"
			+ "</tr>"
		)
		// $("input[name=timerCheck]").click(function(){
		// 	if (this.checked) {
		// 		$('input[name="timepicker"]').removeAttr("disabled");
		// 	} else {
		// 		$('input[name="timepicker"]').attr("disabled", true);
		// 	}
		// });

		// $('#onoffLight'+createCount+'').change(function(){
		// 	$(this).find(":selected").each(function(){
		// 		// var test = $(this).text();
		// 		if ($(this).text() == "On") {
		// 			// console.log("test");
		// 			$("#bright"+createCount+"").removeAttr("disabled");
		// 			$("#light-color"+createCount+"").removeAttr("disabled");
		// 		} else {
		// 			// $("#timepicker").val('');
		// 			$("#bright"+createCount+"").attr("disabled", true);
		// 			$("#light-color"+createCount+"").attr("disabled", true);
		// 		}
		// 	});
		// });

		// $('input[name="timepicker"]').daterangepicker({
		// 	timePicker: true,
		// 	startDate: moment().startOf('hour'),
		// 	endDate: moment().startOf('hour').add(32, 'hour'),
		// 	locale: {
		// 	  format: 'M/DD hh:mm A',
		// 	}
		//   });
	}	
	function saveLight(){
		$(".saveLight").click(function(){
			$(".tableLight tbody tr").each(function(){
				var nameLight = $(this).find("td:eq(1) input[type='text']").val();
				console.log(nameLight);
				var state = $(this).find("td:eq(2) select").val();
				console.log(state);
				var brightness = $(this).find("td:eq(3) select").val();
				console.log(brightness);
				var color = $(this).find("td:eq(4) select").val();
				console.log(color);
				// if ($('input.timerCheck').is(':checked')) {
				// 	var timer = $(this).find("td:eq(5) input[type='text']").val();
				// 	console.log(timer);
				// }
				// else{
				// 	var timer = "";
				// 	console.log(timer);
				// }
				$.ajax({
					async : false,
					method: "post",
					data: JSON.stringify({lightName:nameLight,state: state, brightness: brightness, color: color, roomProject: dataRoom}),
					contentType: "application/json",
					url: "http://localhost:8080/smarthome/addlight/"+getRoomName,
				}).done(function(data, textStatus, xhr){
					status_create = xhr.status;
				});
				if(status_create = 201){
					alert("Save "+ nameLight +" success!");
				}
				else{
					alert("Save " + nameLight + " unsuccess!");
				}
			});
		});
	}
	function updateLight(){
		$(".saveLight").click(function(){
			$(".tableLight tbody tr").each(function(){
				var nameLight = $(this).find("td:eq(1) input[type='text']").val();
				console.log(nameLight);
				var state = $(this).find("td:eq(2) select").val();
				console.log(state);
				var brightness = $(this).find("td:eq(3) select").val();
				console.log(brightness);
				var color = $(this).find("td:eq(4) select").val();
				console.log(color);
				$.ajax({
					async : false,
					method: "post",
					data: JSON.stringify({lightName:nameLight,state: state, brightness: brightness, color: color, roomProject: dataRoom}),
					contentType: "application/json",
					url: "http://localhost:8080/smarthome/addlight/"+getRoomName,
				}).done(function(data, textStatus, xhr){
					status_create = xhr.status;
				});
				if(status_create = 201){
					alert("Update "+ nameLight +" success!");
				}
				else{
					alert("Update " + nameLight + " unsuccess!");
				}
			});
		});
	}
	function loadLight(loadCount){
		$(".tbodyLight").append(
			"<tr>"
				+ "<td><input type='hiddent' class='idLight"+loadCount+"' style='width:40px; border:0; background-color:#e6e6e6;' readonly></td>"
				+ "<td>"
					+ '<input class="nameLight'+loadCount+'" id="nameLight" type="text" name="nameLight"/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<select name="onoffLight" id="onoffLight'+loadCount+'" style="width: 80px;">'
					+ '<option value="Off" selected>Off</option>'
					+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>"
					+ '<select name="bright" id="bright'+loadCount+'" style="width: 80px;">'
					+ '<option value="Level 1 - High brightness" selected>Level 1 - High brightness</option>'
					+ '<option value="Level 2 - Television viewing mode">Level 2 - Television viewing mode</option>'
					+ '<option value="Level 3 - Lamp">Level 3 - Lamp</option>'
					+ '</select>'
				+"</td>"
				+ "<td id='third'>"
					+ '<select name="colorpicker-fontawesome" id="light-color'+loadCount+'" style="width: 120px;">'
					+ '<option value="Yellow" selected>Yellow</option>'
					+ '<option value="Green">Green</option>'
					+ '<option value="Blue">Blue</option>'
					+ '<option value="White">White</option>'
					+ '<option value="Orange">Orange</option>'
					+ '</select>'
				+"</td>"
			+ "</tr>"
		)
	}
	// Fridge
	// var count1=0;
	// $.ajax({
	// 	async : false,
	// 	method: "get",
	// 	contentType: "application/json",
	// 	url: "http://localhost:8080/smarthome/getroom/"+getRoomName,
	// }).done(function(data, textStatus, xhr){
	// 	dataRoom = data;
	// });
	// console.log("dataRoom.fridges");
	// console.log(dataRoom);
	
	// console.log(dataRoom.fridges);
	
	
	for(let count = 0; count < dataRoomObject.fridges.length; count++){
		// Get Data Fridge
		nameFridge = dataRoomObject.fridges[count].fridgeName;
		$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/getfridge/"+nameFridge,
		}).done(function(data, textStatus, xhr){
			dataFridge = data;
		});
		loadFridge(count);
		localStorage.setItem("fridge", count);
		$(".idFridge"+count).val(dataRoomObject.fridges[count].id);
		$(".nameFride"+count).val(dataRoomObject.fridges[count].fridgeName);
		$("#onoffFridge"+count).val(dataRoomObject.fridges[count].status);
		for(var temp=0; temp < dataFridge.compartments.length; temp++){
			$("#onoffcom"+temp+1).val(dataFridge.compartments[temp].state);
			$("#rangeCom"+temp+1).val(dataFridge.compartments[temp].temper);
		}
	}
	var count1 = 0;
	$(".addFridge").click(function(){
		createFridge(count1 + 1);
		count1++;
	});
	var status_create1;
	saveFridge();
	function createFridge(createCount){
		$(".tbodyFridge").append(
			"<tr>"
				+ "<td><input type='hiddent' class='idFridge"+createCount+"' style='width:40px; border:0; background-color:#e6e6e6;' readonly></td>"
				+ "<td>"
					+ '<input class="nameFridge'+createCount+'" id="nameFridge" type="text" name="nameFridge"/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<select name="onoffFridge" id="onoffFridge'+createCount+'" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>" // ice compartment
					+ '<select name="onoffcom1" id="onoffcom1'+createCount+'" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'	
					+ '<br>'
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-50" max="20" value="0" class="slider" id="rangeCom1">'
							+ '<p>Value: <span id="valCom1"></span></p>'
						+ '</div>'
					+ '</div>'
				+"</td>"
				+ "<td id='third'>" // cool compartment
					+ '<select name="onoffcom2" id="onoffcom2'+createCount+'" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
					+ '<br>'
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-20" max="20" value="0" class="slider" id="rangeCom2">'
							+ '<p>Value: <span id="valCom2"></span></p>'
						+ '</div>'
					+ '</div>'
				+"</td>"
				+ "<td id='forth'>" // vegetables compartment
					+ '<select name="onoffcom3" id="onoffcom3'+createCount+'" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
					+ '<br>'
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-10" max="10" value="0" class="slider" id="rangeCom3">'
							+ '<p>Value: <span id="valCom3"></span></p>'
						+ '</div>'
					+ '</div>'
				+"</td>"
			+ "</tr>"
		)

		var rangeCom1 = document.getElementById("rangeCom1");
		var valCom1 = document.getElementById("valCom1");
		var rangeCom2 = document.getElementById("rangeCom2");
		var valCom2 = document.getElementById("valCom2");
		var rangeCom3 = document.getElementById("rangeCom3");
		var valCom3 = document.getElementById("valCom3");

		valCom1.innerHTML = rangeCom1.value;
		valCom2.innerHTML = rangeCom2.value;
		valCom3.innerHTML = rangeCom3.value;

		rangeCom1.oninput = function() {
			valCom1.innerHTML = this.value;
		}
		rangeCom2.oninput = function() {
			valCom2.innerHTML = this.value;
		}
		rangeCom3.oninput = function() {
			valCom3.innerHTML = this.value;
		}
	}

	function saveFridge(){
		$(".saveFridge").click(function(){
			$(".tableFridge tbody tr").each(function(){
				var nameFridge = $(this).find("td:eq(1) input[type='text']").val();
				localStorage.setItem("storageFridgeName", nameFridge);
				// console.log(nameFridge);
				var status = $(this).find("td:eq(2) select").val();
				// console.log(status);
				// Add Fridge
				$.ajax({
					async : false,
					method: "post",
					data: JSON.stringify({fridgeName:nameFridge, status: status, roomProject: dataRoom}),
					contentType: "application/json",
					url: "http://localhost:8080/smarthome/addfridge/"+getRoomName,
				}).done(function(data, textStatus, xhr){
					
				});
				// Get Data Fridge
				$.ajax({
					async : false,
					method: "get",
					contentType: "application/json",
					url: "http://localhost:8080/smarthome/getfridge/"+nameFridge,
				}).done(function(data, textStatus, xhr){
					dataFridge = data;
				});
				// Add compartment for Fridge
				var temp = 1;
				for(var i=3;i<6;i++){
					var stateCom = $(this).find("td:eq('"+i+"') select").val();
					console.log(stateCom);
					var valCom = $(this).find("td:eq('"+i+"')").find("#valCom"+temp+"").text();
					console.log(valCom);
					temp++;
					$.ajax({
						async : false,
						method: "post",
						data: JSON.stringify({stateCom:stateCom, temperVal: valCom, fridgeProject: dataFridge}),
						contentType: "application/json",
						url: "http://localhost:8080/smarthome/addcompartment/"+nameFridge,
					}).done(function(data, textStatus, xhr){
						status_create1 = xhr.status;
					});
				}
				if(status_create1 = 201){
					alert("Save "+ nameFridge +" success!");
				}
				else{
					alert("Save " + nameFridge + " unsuccess!");
				}

				// $.ajax({
				// 	async : false,
				// 	method: "post",
				// 	data: JSON.stringify({fridgeName:nameFridge,state: state, brightness: brightness, color: color, roomProject: dataRoom}),
				// 	contentType: "application/json",
				// 	url: "http://localhost:8080/smarthome/addFridge/"+getRoomName,
				// }).done(function(data, textStatus, xhr){
				// 	status_create = xhr.status;
				// });
				// if(status_create = 201){
				// 	alert("Save "+ nameFridge +" success!");
				// }
				// else{
				// 	alert("Save " + nameFridge + " unsuccess!");
				// }
			});
		});
	}

	function loadFridge(loadCount){
		$(".tbodyFridge").append(
			"<tr>"
				+ "<td><input type='hiddent' class='idFridge"+loadCount+"' style='width:40px; border:0; background-color:#e6e6e6;' readonly></td>"
				+ "<td>"
					+ '<input class="nameFridge'+loadCount+'" id="nameFridge" type="text" name="nameFridge"/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<select name="onoffFridge" id="onoffFridge'+loadCount+'" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>" // ice compartment
					+ '<select name="onoffcom1" id="onoffcom1'+loadCount+'" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'	
					+ '<br>'
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-50" max="20" value="0" class="slider" id="rangeCom1">'
							+ '<p>Value: <span id="valCom1"></span></p>'
						+ '</div>'
					+ '</div>'
				+"</td>"
				+ "<td id='third'>" // cool compartment
					+ '<select name="onoffcom2" id="onoffcom2'+loadCount+'" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
					+ '<br>'
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-20" max="20" value="0" class="slider" id="rangeCom2">'
							+ '<p>Value: <span id="valCom2"></span></p>'
						+ '</div>'
					+ '</div>'
				+"</td>"
				+ "<td id='forth'>" // vegetables compartment
					+ '<select name="onoffcom3" id="onoffcom3'+loadCount+'" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
					+ '<br>'
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-10" max="10" value="0" class="slider" id="rangeCom3">'
							+ '<p>Value: <span id="valCom3"></span></p>'
						+ '</div>'
					+ '</div>'
				+"</td>"
			+ "</tr>"
		)

		var rangeCom1 = document.getElementById("rangeCom1");
		var valCom1 = document.getElementById("valCom1");
		var rangeCom2 = document.getElementById("rangeCom2");
		var valCom2 = document.getElementById("valCom2");
		var rangeCom3 = document.getElementById("rangeCom3");
		var valCom3 = document.getElementById("valCom3");

		valCom1.innerHTML = rangeCom1.value;
		valCom2.innerHTML = rangeCom2.value;
		valCom3.innerHTML = rangeCom3.value;

		rangeCom1.oninput = function() {
			valCom1.innerHTML = this.value;
		}
		rangeCom2.oninput = function() {
			valCom2.innerHTML = this.value;
		}
		rangeCom3.oninput = function() {
			valCom3.innerHTML = this.value;
		}
	}

	// Air-conditional
	var count2=0;
	$(".addAir").click(function(){
		createAir(count2 + 1);
		count2++;
	});
	var status_create2;
	saveAir();
	function createAir(createCount){
		$(".tbodyAir").append(
			"<tr>"
				+ "<td><input type='hiddent' class='idAir"+createCount+"' style='width:40px; border:0; background-color:#e6e6e6;' readonly></td>"
				+ "<td>"
					+ '<input class="nameAir'+createCount+'" id="nameAir" type="text" name="nameAir"/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<select name="onoffAir" id="onoffAir'+createCount+'" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>"
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-50" max="50" value="0" class="slider'+createCount+'" id="rangeCom">'
							+ '<p>Value: <span id="valCom" class="valCom'+createCount+'"></span></p>'
						+ '</div>'
					+ '</div><br>'
				+"</td>"
			+ "</tr>"
		)

		var rangeCom = document.getElementById("rangeCom");
		var valCom = document.getElementById("valCom");

		valCom.innerHTML = rangeCom.value;

		rangeCom.oninput = function() {
			valCom.innerHTML = this.value;
		}
	}

	function saveAir(){
		$(".saveAir").click(function(){
			$(".tableAir tbody tr").each(function(){
				var nameAir = $(this).find("td:eq(1) input[type='text']").val();
				console.log(nameAir);
				var status = $(this).find("td:eq(2) select").val();
				console.log(status);
				var temper = $(this).find("td:eq(3)").find("#valCom").text();
				console.log(temper);
				// Add Air
				$.ajax({
					async : false,
					method: "post",
					data: JSON.stringify({airName:nameAir, status: status, temperVal: temper, roomProject: dataRoom}),
					contentType: "application/json",
					url: "http://localhost:8080/smarthome/addair/"+getRoomName,
				}).done(function(data, textStatus, xhr){
					status_create2 = xhr.status;
				});
				if(status_create2 = 201){
					alert("Save "+ nameAir +" success!");
				}
				else{
					alert("Save " + nameAir + " unsuccess!");
				}
			});
		});
	}

	// Heaters
	var count3=0;
	$(".addHeat").click(function(){
		createHeat(count3 + 1);
		count3++;
	});
	var status_create3;
	saveHeat();
	function createHeat(createCount){
		$(".tbodyHeat").append(
			"<tr>"
				+ "<td><input type='hiddent' class='idHeat"+createCount+"' style='width:40px; border:0; background-color:#e6e6e6;' readonly></td>"
				+ "<td>"
					+ '<input class="nameHeat'+createCount+'" id="nameHeat" type="text" name="nameHeat"/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<select name="onoffHeat" id="onoffHeat'+createCount+'" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>"
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-50" max="50" value="0" class="slider'+createCount+'" id="rangeCom">'
							+ '<p>Value: <span id="valCom" class="valCom'+createCount+'"></span></p>'
						+ '</div>'
					+ '</div><br>'
				+"</td>"
			+ "</tr>"
		)

		var rangeCom = document.getElementById("rangeCom");
		var valCom = document.getElementById("valCom");

		valCom.innerHTML = rangeCom.value;

		rangeCom.oninput = function() {
			valCom.innerHTML = this.value;
		}
	}

	function saveHeat(){
		$(".saveHeat").click(function(){
			$(".tableHeat tbody tr").each(function(){
				var nameHeat = $(this).find("td:eq(1) input[type='text']").val();
				console.log(nameHeat);
				var status = $(this).find("td:eq(2) select").val();
				console.log(status);
				var temper = $(this).find("td:eq(3)").find("#valCom").text();
				console.log(temper);
				// Add Heat
				$.ajax({
					async : false,
					method: "post",
					data: JSON.stringify({heatame:nameHeat, status: status, temperVal: temper, roomProject: dataRoom}),
					contentType: "application/json",
					url: "http://localhost:8080/smarthome/addair/"+getRoomName,
				}).done(function(data, textStatus, xhr){
					status_create2 = xhr.status;
				});
				if(status_create2 = 201){
					alert("Save "+ nameHeat +" success!");
				}
				else{
					alert("Save " + nameHeat + " unsuccess!");
				}
			});
		});
	}


	// Search device row by device name
	function search(){
		$("#mySearch").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$(".table-device tbody tr").filter(function() {
			  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
			});
		  });
	}
	
	
});

