$(document).ready(function(){
    // var status_create;
    var dataRoom;
    var dataFridge;
    var getRoomName = localStorage.getItem("storageRoomName");
    var listLight;
    var listFridge;
	var listCompartment;
	var listAir;
	var listHeat;
	var status_create;
    // localStorage.getItem("storageRoomName");
	$.ajax({
		async : false,
		method: "get",
		contentType: "application/json",
		url: "http://localhost:8080/smarthome/getroom/"+getRoomName,
	}).done(function(data, textStatus, xhr){
		dataRoom = data;
	});
	$(".title").append('<h3>Create device for '+getRoomName+'</h3>');
    // list Light
    $.ajax({
        async : false,
        method: "get",
        contentType: "application/json",
        url: "http://localhost:8080/smarthome/getlistlight/"+getRoomName,
    }).done(function(data, textStatus, xhr){
        listLight = data;
        console.log("listLight");
        console.log(listLight);
    });
	for (let count = 0; count < listLight.length; count++) {
		loadLight(count);
		$(".idLight"+count).val(listLight[count].id_light);
		$(".nameLight"+count).val(listLight[count].lightName);
		$("#onoffLight"+count).val(listLight[count].state);
		$("#bright"+count).val(listLight[count].brightness);
		$("#light-color"+count).val(listLight[count].color);
    }
    createLight();
    saveLight();
	function createLight(){
		$(".tbodyLight").append(
			"<tr>"
				+ "<td>"
					+ '<h6>Name</h6>'
					+ '<input class="nameLight" id="nameLight" type="text" name="nameLight" placeholder="Enter light name"/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<h6>Status</h6>'
					+ '<select name="onoffLight" id="onoffLight" style="width: 80px;">'
					+ '<option value="Off" selected>Off</option>'
					+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>"
					+ '<h6>Brightness</h6>'
					+ '<select name="bright" id="bright" style="width: 80px;" disabled>'
					+ '<option value="Level 1 - High brightness" selected>Level 1 - High brightness</option>'
					+ '<option value="Level 2 - Television viewing mode">Level 2 - Television viewing mode</option>'
					+ '<option value="Level 3 - Lamp">Level 3 - Lamp</option>'
					+ '</select>'
				+"</td>"
				+ "<td id='third'>"
					+ '<h6>Light color</h6>'
					+ '<select name="colorpicker-fontawesome" id="light-color" style="width: 120px;" disabled>'
					+ '<option value="Yellow" selected>Yellow</option>'
					+ '<option value="Green">Green</option>'
					+ '<option value="Blue">Blue</option>'
					+ '<option value="White">White</option>'
					+ '<option value="Orange">Orange</option>'
					+ '</select>'
				+"</td>"
			+ "</tr>"
		)
		$('#onoffLight').change(function(){
			$(this).find(":selected").each(function(){
				if ($(this).text() == "On") {
					$("#bright").removeAttr("disabled");
					$("#light-color").removeAttr("disabled");
				} else {
					$("#bright").attr("disabled", true);
					$("#light-color").attr("disabled", true);
				}
			});
		});
	}	
	function saveLight(){
		$(".saveLight").click(function(){
			$(".tableLight tbody tr").each(function(){
				var name = $(this).find("td:eq(0) input[type='text']").val();
                console.log(name);
                if(name=="") {
                    alert("Name cannot be null!");
                    $(this).find("td:eq(0) input[type='text']").focus();
                }
                else{
                    var nameLight = $(this).find("td:eq(0) input[type='text']").val();
                    console.log(name);
                    var state = $(this).find("td:eq(1) select").val();
                    console.log(state);
                    if(state=="Off"){
                        var brightness = "";
                        var color = "";
                    }
                    else{
                        var brightness = $(this).find("td:eq(2) select").val();
                        console.log(brightness);
                        var color = $(this).find("td:eq(3) select").val();
                        console.log(color);
                    }
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
                    document.location.href = "Room.html";
                }
			});
		});
	}
	function loadLight(loadCount){
		$(".loadLight").append(
			"<tr>"
				+ "<td><input type='hiddent' class='idLight"+loadCount+"' style='width:40px; border:0; background-color:#e6e6e6;' readonly></td>"
				+ "<td>"
					+ '<input class="nameLight'+loadCount+'" id="nameLight" type="text" name="nameLight" readonly/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<select name="onoffLight" id="onoffLight'+loadCount+'" style="width: 80px;" disabled>'
					+ '<option value="Off" selected>Off</option>'
					+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>"
					+ '<select name="bright" id="bright'+loadCount+'" style="width: 80px;" disabled>'
					+ '<option value="Level 1 - High brightness" selected>Level 1 - High brightness</option>'
					+ '<option value="Level 2 - Television viewing mode">Level 2 - Television viewing mode</option>'
					+ '<option value="Level 3 - Lamp">Level 3 - Lamp</option>'
					+ '</select>'
				+"</td>"
				+ "<td id='third'>"
					+ '<select name="colorpicker-fontawesome" id="light-color'+loadCount+'" style="width: 120px;" disabled>'
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
	// list Fridge
    $.ajax({
        async : false,
        method: "get",
        contentType: "application/json",
        url: "http://localhost:8080/smarthome/getlistfridge/"+getRoomName,
    }).done(function(data, textStatus, xhr){
        listFridge = data;
        listCompartment = listFridge.compartments;
        console.log("frigeeeee");
        console.log(listFridge);
    });
    for (let count = 0; count < listFridge.length; count++) {
		loadFridge(count);
		$(".idFridge"+count).val(listFridge[count].id);
        $(".nameFridge"+count).val(listFridge[count].fridgeName);
        $("#onoffFridge"+count).val(listFridge[count].status);
        // var nameFridge = listFridge[count].fridgeName;
		// $.ajax({
		// 	async : false,
		// 	method: "get",
		// 	contentType: "application/json",
		// 	url: "http://localhost:8080/smarthome/getlistcompartment/"+nameFridge,
		// }).done(function(data, textStatus, xhr){
		// 	listCompartment = data;
        // });
        var listCompartment = listFridge[count].compartments;
        $("#onoffcom1"+count).val(listCompartment[0].stateCom);
        $("#valCom1"+count).text(listCompartment[0].temperVal);
        $("#onoffcom2"+count).val(listCompartment[1].stateCom);
        $("#valCom2"+count).val(listCompartment[1].temperVal);
        $("#onoffcom3"+count).val(listCompartment[2].stateCom);
        $("#valCom3"+count).val(listCompartment[2].temperVal);
    }
    createFridge();
    saveFridge();
	// saveFridge();
	function createFridge(){
		$(".tbodyFridge").append(
			"<tr>"
				+ "<td>"
					+ '<h6>Name</h6>'
					+ '<input class="nameFridge" id="nameFridge" type="text" name="nameFridge" placeholder="Enter fridge name"/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<h6>State of Fridge</h6>'
					+ '<select name="onoffFridge" id="onoffFridge" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>" // ice compartment
					+ '<h5>Ice compartment:</h5>'
					+ '<h6>Status</h6>'
					+ '<select name="onoffcom1" id="onoffcom1" style="width: 80px;" disabled>'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'	
					+ '<br>'
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-50" max="20" value="0" class="slider" id="rangeCom1" disabled>'
							+ '<p>Value: <span id="valCom1"></span></p>'
						+ '</div>'
					+ '</div>'
				+"</td>"
				+ "<td id='third'>" // cool compartment
					+ '<h5>Cool compartment:</h5>'
					+ '<h6>Status</h6>'
					+ '<select name="onoffcom2" id="onoffcom2" style="width: 80px;" disabled>'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
					+ '<br>'
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-20" max="20" value="0" class="slider" id="rangeCom2" disabled>'
							+ '<p>Value: <span id="valCom2"></span></p>'
						+ '</div>'
					+ '</div>'
				+"</td>"
				+ "<td id='forth'>" // vegetables compartment
					+ '<h5>Vegetables compartment:</h5>'
					+ '<h6>Status</h6>'
					+ '<select name="onoffcom3" id="onoffcom3" style="width: 80px;" disabled>'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
					+ '<br>'
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-10" max="10" value="0" class="slider" id="rangeCom3" disabled>'
							+ '<p>Value: <span id="valCom3"></span></p>'
						+ '</div>'
					+ '</div>'
				+"</td>"
			+ "</tr>"
        )
        $('#onoffFridge').change(function(){
			$(this).find(":selected").each(function(){
				if ($(this).text() == "On") {
					$("#onoffcom1").removeAttr("disabled");
                    $("#onoffcom2").removeAttr("disabled");
                    $("#onoffcom3").removeAttr("disabled");
                    $('#onoffcom1').change(function(){
                        $(this).find(":selected").each(function(){
                            if ($(this).text() == "On") {
                                $("#rangeCom1").removeAttr("disabled");
                            }
                            else{
                                $("#rangeCom1").attr("disabled", true);
                            }
                        });
                    });
                    $('#onoffcom2').change(function(){
                        $(this).find(":selected").each(function(){
                            if ($(this).text() == "On") {
                                $("#rangeCom2").removeAttr("disabled");
                            }
                            else{
                                $("#rangeCom2").attr("disabled", true);
                            }
                        });
                    });
                    $('#onoffcom3').change(function(){
                        $(this).find(":selected").each(function(){
                            if ($(this).text() == "On") {
                                $("#rangeCom3").removeAttr("disabled");
                            }
                            else{
                                $("#rangeCom3").attr("disabled", true);
                            }
                        });
                    });
				} else {
					$("#onoffcom1").attr("disabled", true);
                    $("#onoffcom2").attr("disabled", true);
                    $("#onoffcom3").attr("disabled", true);
				}
			});
		});

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
                var name = $(this).find("td:eq(0) input[type='text']").val();
                if(name=="") {
                    alert("Name cannot be null!");
                    $(this).find("td:eq(0) input[type='text']").focus();
                }
                else{
                    var nameFridge = $(this).find("td:eq(0) input[type='text']").val();
                    localStorage.setItem("storageFridgeName", nameFridge);
                    // console.log(nameFridge);
                    var status = $(this).find("td:eq(1) select").val();
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
                    for(var i=2;i<5;i++){
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
                    		status_create = xhr.status;
                    	});
                    }
                    if(status_create = 201){
                    	alert("Save "+ nameFridge +" success!");
                    }
                    else{
                    	alert("Save " + nameFridge + " unsuccess!");
                    }
                    document.location.href = "Room.html";
                }
				
			});
		});
	}

	function loadFridge(loadCount){
		$(".loadFridge").append(
			"<tr>"
				+ "<td><input type='hiddent' class='idFridge"+loadCount+"' style='width:40px; border:0; background-color:#e6e6e6;' readonly></td>"
				+ "<td>"
					+ '<input class="nameFridge'+loadCount+'" id="nameFridge" type="text" name="nameFridge" readonly/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<select name="onoffFridge" id="onoffFridge'+loadCount+'" style="width: 80px;" disabled>'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>" // ice compartment
					+ '<select name="onoffcom1" id="onoffcom1'+loadCount+'" style="width: 80px;" disabled>'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'	
					+ '<br>'
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer">'
                        + '<div id="slider">'
                            // + '<p class="temper"></p>'
							+ '<input type="range" min="-50" max="20" value="0" class="slider" id="rangeCom1'+loadCount+'" readonly>'
							+ '<p>Value: <span id="valCom1'+loadCount+'"></span></p>'
						+ '</div>'
					+ '</div>'
				+"</td>"
				+ "<td id='third'>" // cool compartment
					+ '<select name="onoffcom2" id="onoffcom2'+loadCount+'" style="width: 80px;" disabled>'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
					+ '<br>'
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-30" max="20" value="0" class="slider" id="rangeCom2'+loadCount+'" readonly>'
							+ '<p>Value: <span id="valCom2'+loadCount+'"></span></p>'
						+ '</div>'
					+ '</div>'
				+"</td>"
				+ "<td id='forth'>" // vegetables compartment
					+ '<select name="onoffcom3" id="onoffcom3'+loadCount+'" style="width: 80px;" disabled>'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
					+ '<br>'
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-20" max="10" value="0" class="slider" id="rangeCom3'+loadCount+'" readonly>'
							+ '<p>Value: <span id="valCom3'+loadCount+'"></span></p>'
						+ '</div>'
					+ '</div>'
				+"</td>"
			+ "</tr>"
		)
        
		// var rangeCom1 = document.getElementById("rangeCom1");
		// var valCom1 = document.getElementById("valCom1");
		// var rangeCom2 = document.getElementById("rangeCom2");
		// var valCom2 = document.getElementById("valCom2");
		// var rangeCom3 = document.getElementById("rangeCom3");
		// var valCom3 = document.getElementById("valCom3");

		// valCom1.innerHTML = rangeCom1.value;
		// valCom2.innerHTML = rangeCom2.value;
		// valCom3.innerHTML = rangeCom3.value;

		// rangeCom1.oninput = function() {
		// 	valCom1.innerHTML = this.value;
		// }
		// rangeCom2.oninput = function() {
		// 	valCom2.innerHTML = this.value;
		// }
		// rangeCom3.oninput = function() {
		// 	valCom3.innerHTML = this.value;
		// }
	}

	// Air-conditional
	$.ajax({
        async : false,
        method: "get",
        contentType: "application/json",
        url: "http://localhost:8080/smarthome/getlistair/"+getRoomName,
    }).done(function(data, textStatus, xhr){
        listAir = data;
        console.log("Air");
        console.log(listAir);
    });
	for (let count = 0; count < listAir.length; count++) {
		loadAir(count);
		$(".idAir"+count).val(listAir[count].id_air);
        $("#nameAir"+count).val(listAir[count].airName);
        $("#onoffAir"+count).val(listAir[count].status);
        $("#valCom"+count).text(listAir[count].temperVal);
    }
	createAir();
	saveAir();
	function createAir(){
		$(".tbodyAir").append(
			"<tr>"
				+ "<td>"
					+ '<h6>Name</h6>'
					+ '<input class="nameAir" id="nameAir" type="text" name="nameAir" placeholder="Air conditional name"/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<h6>Status</h6>'
					+ '<select name="onoffAir" id="onoffAir" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>"
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<h6>Temperature</h6>'
							+ '<input type="range" min="-50" max="50" value="0" class="slider" id="rangeCom" disabled>'
							+ '<p>Value: <span id="valCom" class="valCom"></span></p>'
						+ '</div>'
					+ '</div><br>'
				+"</td>"
			+ "</tr>"
		)
		$('#onoffAir').change(function(){
			$(this).find(":selected").each(function(){
				if ($(this).text() == "On") {
					$("#rangeCom").removeAttr("disabled");
				}
				else{
					$("#rangeCom").attr("disabled", true);
				}
			});
		});
		
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
				var nameAir = $(this).find("td:eq(0) input[type='text']").val();
				console.log(nameAir);
				var status = $(this).find("td:eq(1) select").val();
				console.log(status);
				var temper = $(this).find("td:eq(2)").find("#valCom").text();
				console.log(temper);
				// Add Air
				$.ajax({
					async : false,
					method: "post",
					data: JSON.stringify({airName:nameAir, status: status, temperVal: temper, roomProject: dataRoom}),
					contentType: "application/json",
					url: "http://localhost:8080/smarthome/addair/"+getRoomName,
				}).done(function(data, textStatus, xhr){
					status_create = xhr.status;
				});
				if(status_create = 201){
					alert("Save "+ nameAir +" success!");
				}
				else{
					alert("Save " + nameAir + " unsuccess!");
				}
				document.location.href = "Room.html";
			});
		});
	}
	function loadAir(loadCount){
		$(".loadAir").append(
			"<tr>"
				+ "<td><input type='hiddent' class='idAir"+loadCount+"' style='width:40px; border:0; background-color:#e6e6e6;' readonly></td>"
				+ "<td>"
					+ '<input class="nameAir" id="nameAir'+loadCount+'" type="text" name="nameAir" readonly/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<select name="onoffAir" id="onoffAir'+loadCount+'" style="width: 80px;" disabled>'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>"
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							// + '<h6>Temperature</h6>'
							+ '<input type="range" min="-50" max="50" value="0" class="slider" id="rangeCom'+loadCount+'" disabled>'
							+ '<p>Value: <span id="valCom'+loadCount+'" class="valCom"></span></p>'
						+ '</div>'
					+ '</div><br>'
				+"</td>"
			+ "</tr>"
		)
	}

	// Heaters
	$.ajax({
        async : false,
        method: "get",
        contentType: "application/json",
        url: "http://localhost:8080/smarthome/getlistheat/"+getRoomName,
    }).done(function(data, textStatus, xhr){
        listHeat = data;
        console.log("Heaters");
        console.log(listHeat);
    });
	for (let count = 0; count < listHeat.length; count++) {
		loadHeat(count);
		$(".idHeat"+count).val(listHeat[count].id_heat);
        $(".nameHeat"+count).val(listHeat[count].heatName);
        $("#onoffHeat"+count).val(listHeat[count].status);
        $("#valComHeat"+count).text(listHeat[count].temperVal);
    }
	createHeat();
	saveHeat();
	function createHeat(){
		$(".tbodyHeat").append(
			"<tr>"
				+ "<td>"
					+ '<h6>Name</h6>'
					+ '<input class="nameHeat" id="nameHeat" type="text" name="nameHeat" placeholder="Enter Heaters name"/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<h6>Status</h6>'
					+ '<select name="onoffHeat" id="onoffHeat" style="width: 80px;">'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>"
					+ '<h6>Temperature</h6>'
					+ '<div class="slidecontainer1">'
						+ '<div id="slider1">'
							+ '<input type="range" min="-50" max="50" value="0" class="slider" id="rangeCom4" disabled>'
							+ '<p>Value: <span id="valCom4" class="valCom4"></span></p>'
						+ '</div>'
					+ '</div><br>'
				+"</td>"
			+ "</tr>"
		)
		$('#onoffHeat').change(function(){
			$(this).find(":selected").each(function(){
				if ($(this).text() == "On") {
					$("#rangeCom4").removeAttr("disabled");
				}
				else{
					$("#rangeCom4").attr("disabled", true);
				}
			});
		});
		var rangeCom = document.getElementById("rangeCom4");
		var valCom = document.getElementById("valCom4");

		valCom.innerHTML = rangeCom.value;

		rangeCom.oninput = function() {
			valCom.innerHTML = this.value;
		}
	}
	function saveHeat(){
		$(".saveHeat").click(function(){
			$(".tableHeat tbody tr").each(function(){
				var nameHeat = $(this).find("td:eq(0) input[type='text']").val();
				console.log(nameHeat);
				var status = $(this).find("td:eq(1) select").val();
				console.log(status);
				var temper = $(this).find("td:eq(2)").find("#valCom4").text();
				console.log(temper);
				// Add Heat
				$.ajax({
					async : false,
					method: "post",
					data: JSON.stringify({heatName:nameHeat, status: status, temperVal: temper, roomProject: dataRoom}),
					contentType: "application/json",
					url: "http://localhost:8080/smarthome/addheat/"+getRoomName,
				}).done(function(data, textStatus, xhr){
					status_create = xhr.status;
				});
				if(status_create = 201){
					alert("Save "+ nameHeat +" success!");
				}
				else{
					alert("Save " + nameHeat + " unsuccess!");
				}
				document.location.href = "Room.html";
			});
		});
	}
	function loadHeat(loadCount){
		$(".loadHeat").append(
			"<tr>"
				+ "<td><input type='hiddent' class='idHeat"+loadCount+"' style='width:40px; border:0; background-color:#e6e6e6;' readonly></td>"
				+ "<td>"
					+ '<input class="nameHeat'+loadCount+'" id="nameHeat" type="text" name="nameHeat" readonly/>&nbsp;'
				+"</td>"
				+ "<td id='first'>"
					+ '<select name="onoffHeat" id="onoffHeat'+loadCount+'" style="width: 80px;" disabled>'
						+ '<option value="Off" selected>Off</option>'
						+ '<option value="On">On</option>'
					+ '</select>'
				+"</td >"
				+ "<td id='second'>"
					+ '<div class="slidecontainer">'
						+ '<div id="slider">'
							+ '<input type="range" min="-50" max="50" value="0" class="slider" id="rangeComHeat'+loadCount+'" disabled>'
							+ '<p>Value: <span id="valComHeat'+loadCount+'" class="valComHeat"></span></p>'
						+ '</div>'
					+ '</div><br>'
				+"</td>"
			+ "</tr>"
		)
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

