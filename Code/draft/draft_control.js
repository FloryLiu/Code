$(document).ready(function(){
	var status_create;
	var getRoomName = localStorage.getItem("storageRoomName");


	// $.ajax({
	// 	async : false,
	// 	method: "get",
	// 	contentType: "application/json",
	// 	url: "http://localhost:8080/smarthome/getlistdevice/"+getRoomName,
	// }).done(function(data, textStatus, xhr){
	// 	listDevice = data;
	// });
	$.ajax({
		async : false,
		method: "get",
		contentType: "application/json",
		url: "http://localhost:8080/smarthome/getroom/"+getRoomName,
	}).done(function(data, textStatus, xhr){
		dataRoom = data;
	});

	var count=0;
	focusInput();
    search();
    controlDevice();
	
	for(count; count < dataRoom.devices.length; count++){
		var id = dataRoom.devices[count].id_device;
		var name = dataRoom.devices[count].deviceName;
		var serial = dataRoom.devices[count].serial;
		var type = dataRoom.devices[count].deviceType;
		var state = dataRoom.devices[count].State;
		var bright = dataRoom.devices[count].Bright;
		var colour = dataRoom.devices[count].Color;
		var temperVal = dataRoom.devices[count].TemperVal;
		loadDevice(id, name, serial, type, state, bright, colour, temperVal);
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
    // Focus into text input when checkbox is checked
	function focusInput(){
			$("input[name=light]").click(function(){
				$('input[name=numberLight]')[0].focus();
			});
			$("input[name=door]").click(function(){
				$('input[name=numberDoor]')[0].focus();
			});
			$("input[name=fan]").click(function(){
				$('input[name=numberFan]')[0].focus();
			});
			$("input[name=fridge]").click(function(){
				$('input[name=numberFridge]')[0].focus();
			});
			$("input[name=wash]").click(function(){
				$('input[name=numberWash]')[0].focus();
			});
			$("input[name=heaters]").click(function(){
				$('input[name=numberHeaters]')[0].focus();
			});
			$("input[name=air]").click(function(){
				$('input[name=numberAir]')[0].focus();
			});
			$("input[name=cooker]").click(function(){
				$('input[name=numberCooker]')[0].focus();
			});
    }
    
    // append status content
    function controlDevice(){
        loadDevice();
        $(".btnchange").click(function(){
            
            
        });
    }
    function loadDevice(){
        $(".loadType").click(function(){
            // var name = $("input[name='name-device']").val();
            // var id = $("input[name='id-device']").val();
            // // alert(name);
            // $.ajax({
            //     async : false,
            //     method: "get",
            //     contentType: "application/json",
            //     url: "http://localhost:8080/smarthome/getdevice/"+getDeviceName,
            // }).done(function(data, textStatus, xhr){
            //     dataDevice = data;
            // });
            // var state = dataDevice.State;
            // var bright = dataRoom.Bright;
            // var colour = dataRoom.Color;
            // var temperVal = dataRoom.TemperVal;
            var type = $("#select-device option:selected").text();
            if(type=="Light"){
                $("#controlcontent").empty().append('<h6>State</h6>');
                $("#controlcontent").append('<input type="radio" name="onoffLight" value="Off" checked>Off&nbsp;');
                $("#controlcontent").append('<input type="radio" name="onoffLight" value="On">On&nbsp;');
                $("#controlcontent").append('<h6>Brightness</h6>');
                $("#controlcontent").append('<select name="bright" id="bright" style="width: 80px;"></select>&nbsp;');
                // $("#bright").append('<option selected>'+bright+'</option>');
                $("#bright").append('<option value="l1">Level 1</option>');
                $("#bright").append('<option value="l2">Level 2</option>');
                $("#bright").append('<option value="l3">Level 3</option>');
                $("#controlcontent").append('<h6>Light color</h6>');
                $("#controlcontent").append('<select name="colorpicker-fontawesome" id="light-color" style="width: 120px;"></select>');
                // $("#light-color").append('<option selected>'+colour+'</option>');
                $("#light-color").append('<option value="Yellow">Yellow</option>');
                $("#light-color").append('<option value="Green">Green</option>');
                $("#light-color").append('<option value="Blue">Blue</option>');
                $("#light-color").append('<option value="White">White</option>');
                $("#light-color").append('<option value="Orange">Orange</option>');
                $("#light-color").append('<option value="Red">Red</option>');
                $("#light-color").append('<option value="Purple">Purple</option>');
                $("#light-color").append('<option value="Gray">Gray</option>');
            }else if(type=="Door"){
                $("#controlcontent").empty().append('<h6>Security</h6>');
                $("#controlcontent").append('<select name="secure" class="custom-select-sm secure" id="secure" style="width: auto;"></select>');
                // $("#secure").append('<option selected>'+state+'</option>');
                $("#secure").append('<option value="closed-locked">Closed and Locked</option>');
                $("#secure").append('<option value="opened">Open</option>');
                $("#secure").append('<option value="closed-unlocked">Closed and Unlocked</option>');
            }else if(type=="Fan"){
                $("#controlcontent").empty().append('<h6>State</h6>');
                $("#controlcontent").append('<select name="strength_level" class="custom-select-sm strength_level" id="strength_level" style="width: auto;"></select>');
                // $("#strength_level").append('<option selected>'+state+'</option>');
                $("#strength_level").append('<option value="Off" selected>Off</option>');
                $("#strength_level").append('<option value="Level 1">Level 1</option>');
                $("#strength_level").append('<option value="Level 2">Level 2</option>');
                $("#strength_level").append('<option value="Level 3">Level 3</option>');
            }else if(type=="Fridge"){
                $("#controlcontent").empty().append('<h6>State</h6>');
                $("#controlcontent").append('<select name="onoffFridge" class="custom-select-sm onoffFridge" id="onoffFridge" style="width: auto;"></select>');
                // $("#onoffFridge").append('<option selected>'+state+'</option>');
                $("#onoffFridge").append('<option value="Off">Off</option>');
                $("#onoffFridge").append('<option value="On">On</option>');
                $("#controlcontent").append('<h6>Temperature</h6>');
                $("#controlcontent").append('<div class="slidecontainer"></div>');
                $(".slidecontainer").append('<div id="slider"></div>');
                $("#slider").append('<input type="range" min="-30" max="10" value="0" class="slider" id="fridgeRange">');
                // $("#slider").append('<input type="range" min="-30" max="10" value="'+temperVal+'" class="slider" id="fridgeRange">');
                $("#slider").append('<p>Value: <span id="fridgeVal"></span></p>');
                var fridgeRange = document.getElementById("fridgeRange");
                var fridgeVal = document.getElementById("fridgeVal");
                fridgeVal.innerHTML = fridgeRange.value;

                fridgeRange.oninput = function() {
                    fridgeVal.innerHTML = this.value;
                }
            }else if(type=="Washing-machine"){
                $("#controlcontent").empty().append('<h6>Running state</h6>');
                $("#controlcontent").append('<select name="state" class="custom-select-sm state" id="state" style="width: auto;"></select>');
                // $("#state").append('<option selected>'+state+'</option>');
                $("#state").append('<option value="Off" selected>Off</option>');
                $("#state").append('<option value="On">On</option>');
                $("#state").append('<option value="Pause">Pause</option>');
                $("#state").append('<option value="Running">Running</option>');
            }else if(type=="Air-conditional"){
                $("#controlcontent").empty().append('<h6>State</h6>');
                $("#controlcontent").append('<select name="onoffAir" class="custom-select-sm onoffAir" id="onoffAir" style="width: auto;"></select>');
                // $("#onoffAir").append('<option selected>'+state+'</option>');
                $("#onoffAir").append('<option value="Off">Off</option>');
                $("#onoffAir").append('<option value="On">On</option>');
                $("#controlcontent").append('<h6>Temperature</h6>');
                $("#controlcontent").append('<div class="slidecontainer"></div>');
                $(".slidecontainer").append('<div id="slider"></div>');
                $("#slider").append('<input type="range" min="0" max="40" value="26" class="slider" id="airRange">');
                // $("#slider").append('<input type="range" min="0" max="40" value="'+temperVal+'" class="slider" id="airRange">');
                $("#slider").append('<p>Value: <span id="airVal"></span></p>');
                var airRange = document.getElementById("airRange");
                var airVal = document.getElementById("airVal");
                airVal.innerHTML = airRange.value;

                airRange.oninput = function() {
                    airVal.innerHTML = this.value;
                }
            }else if(type=="Heaters"){
                $("#controlcontent").empty().append('<h6>State</h6>');
                $("#controlcontent").append('<select name="onoffHeat" class="custom-select-sm onoffHeat" id="onoffHeat" style="width: auto;"></select>');
                // $("#onoffHeat").append('<option selected>'+state+'</option>');
                $("#onoffHeat").append('<option value="Off">Off</option>');
                $("#onoffHeat").append('<option value="On">On</option>');
                $("#controlcontent").append('<h6>Temperature</h6>');
                $("#controlcontent").append('<div class="slidecontainer"></div>');
                $(".slidecontainer").append('<div id="slider"></div>');
                $("#slider").append('<input type="range" min="0" max="40" value="26" class="slider" id="heatRange">');
                // $("#slider").append('<input type="range" min="0" max="40" value="'+temperVal+'" class="slider" id="heatRange">');
                $("#slider").append('<p>Value: <span id="heatVal"></span></p>');
                var heatRange = document.getElementById("heatRange");
                var heatVal = document.getElementById("heatVal");
                heatVal.innerHTML = heatRange.value;

                heatRange.oninput = function() {
                    heatVal.innerHTML = this.value;
                }
            }else if(type=="Cooker"){
                $("#controlcontent").empty().append('<h6>State</h6>');
                $("#controlcontent").append('<select name="mode" class="custom-select-sm mode" id="mode" style="width: auto;"></select>');
                // $("#mode").append('<option selected>'+state+'</option>');
                $("#mode").append('<option value="Off">Off</option>');
                $("#mode").append('<option value="Cook">Cook</option>');
                $("#mode").append('<option value="Warm">Warm</option>');
            }
        });
    }

});

