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

    });
    // let lightControl;
    // listLight.forEach(light => {
    //     lightControl = light;
    //     controlLight(lightControl);
    // });

	for (let count = 0; count < listLight.length; count++) {
        // var idLight = listLight[count].id_light;
        loadLight(count);
		$(".idLight"+count).val(listLight[count].id_light);
		$(".nameLight"+count).val(listLight[count].lightName);
		$("#onoffLight"+count).val(listLight[count].state);
		$("#bright"+count).val(listLight[count].brightness);
        $("#light-color"+count).val(listLight[count].color);
    }
    // controlLight(lightControl);
    
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
                +"<td><input type='text' style='width: auto' id='timepicker"+loadCount+"' name='timepicker' disabled/></td>"
                +"<td><h6><a href='#' class='control"+loadCount+"' data-toggle='modal' data-target='#mLight'>Control</a></h6></td>"
			+ "</tr>"
        )
    }
    function controlLight(controlCount){
        // console.log("controlCount");
        // console.log(controlCount);
        // console.log("id_light: "+controlCount.id_light);
        // var idLight = controlCount.id_light;
        // var lightName = controlCount.lightName;
        // var state = controlCount.state;
        // var bright = controlCount.brightness;
        // var color = controlCount.color;
        // $(".idLight").val(controlCount.id_light);
        // $(".nameLight").val(controlCount.lightName);
        // $("#onoffLight").val(controlCount.state);
        // $("#bright").val(controlCount.brightness);
        // $("#light-color").val(controlCount.color);

        // $this = $('#tr_' + idLight).find("td");
        // $this.eq(1).html(idLight);
        $(".control").click(function(){
            // $("#mLight").modal('show');
            $(".tbodyLight").append(
                "<tr>"
                    + "<td>"
                        + '<h6>ID</h6>'
                        + "<input type='hiddent' class='idLight' style='width:40px; border:0; background-color:#e6e6e6;'>"
                    + "</td>"
                    + "<td>"
                        + '<h6>Name</h6>'
                        + '<input class="nameLight" id="nameLight" type="text" name="nameLight"/>&nbsp;'
                    +"</td>"
                    + "<td id='first'>"
                        + '<h6>Status</h6>'
                        + '<select name="onoffLight" id="onoffLight" style="width: 80px;">'
                        // + '<option value="'+state+'" selected>'+state+'</option>'
                        + '<option value="Off">Off</option>'
                        + '<option value="On">On</option>'
                        + '</select>'
                    +"</td >"
                    + "<td id='second'>"
                        + '<h6>Brightness</h6>'
                        + '<select name="bright" id="bright" style="width: 80px;">'
                        // + '<option value="'+bright+'" selected>'+bright+'</option>'
                        + '<option value="Level 1 - High brightness">Level 1 - High brightness</option>'
                        + '<option value="Level 2 - Television viewing mode">Level 2 - Television viewing mode</option>'
                        + '<option value="Level 3 - Lamp">Level 3 - Lamp</option>'
                        + '</select>'
                    +"</td>"
                    + "<td id='third'>"
                        + '<h6>Light color</h6>'
                        + '<select name="colorpicker-fontawesome" id="light-color" style="width: 120px;">'
                        // + '<option value="'+color+'" selected>'+color+'</option>'
                        + '<option value="Yellow">Yellow</option>'
                        + '<option value="Green">Green</option>'
                        + '<option value="Blue">Blue</option>'
                        + '<option value="White">White</option>'
                        + '<option value="Orange">Orange</option>'
                        + '</select>'
                    +"</td>"
                    + "<td id='forth'>"
                        + '<h6>Timer</h6>'
                        + '<input type="checkbox" id="timerCheck" name="timerCheck/>'
                        + '<input type="text" style="width: auto" id="timepicker" class="timepicker" name="timepicker/>'
                    +"</td>"
                + "</tr>"
            )
            $("input[name=timerCheck]").click(function(){
                if (this.checked) {
                    $('input[name="timepicker"]').removeAttr("disabled");
                } else {
                    $('input[name="timepicker"]').attr("disabled", true);
                }
            });
    
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
        });
		
		// $('input[name="timepicker"]').daterangepicker({
		// 	timePicker: true,
		// 	startDate: moment().startOf('hour'),
		// 	endDate: moment().startOf('hour').add(32, 'hour'),
		// 	locale: {
		// 	  format: 'M/DD hh:mm A',
		// 	}
		//   });
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
        var listCompartment = listFridge[count].compartments;
        $("#onoffcom1"+count).val(listCompartment[0].stateCom);
        $("#valCom1"+count).text(listCompartment[0].temperVal);
        $("#onoffcom2"+count).val(listCompartment[1].stateCom);
        $("#valCom2"+count).val(listCompartment[1].temperVal);
        $("#onoffcom3"+count).val(listCompartment[2].stateCom);
        $("#valCom3"+count).val(listCompartment[2].temperVal);
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
	function loadHeat(loadCount){
		$(".loadHeat").append(
			"<tr>"
				+ "<td><input type='hiddent' class='idHeat"+loadCount+"' style='width:40px; border:0; background-color:#e6e6e6;' readonly></td>"
				+ "<td>"
					+ '<input class="nameHeat'+loadCount+'" id="nameHeat" type="text" name="nameHeat"/>&nbsp;'
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
							+ '<input type="range" min="-50" max="50" value="0" class="slider'+loadCount+'" id="rangeCom" disabled>'
							+ '<p>Value: <span id="valCom" class="valCom'+loadCount+'"></span></p>'
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

