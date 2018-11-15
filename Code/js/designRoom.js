$(document).ready(function(){
	var status_create;
	var getRoomName = localStorage.getItem("storageRoomName");

	
	// alert(getRoomName);

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
	// resetForm();
	focusInput();
	addDevice();
	search();
	// detailsStatus();
	saveDevice();
	
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
		// if( type === "Light" || type === "Heaters" || type === "Air-conditional"){
		// 	// createDevice(dataRoom.devices[count].deviceName,dataRoom.devices[count].serial, "Smart switch");
		// 	// createDevice(dataRoom.devices[count].deviceName,count, "Smart switch");
		// }
		// else if(type === "Fan" || type === "Fridge" || type === "Washing-machine" || type === "Cooker"){
		// 	// createDevice(dataRoom.devices[count].deviceName,dataRoom.devices[count].serial, "Smart socket");
		// 	// createDevice(dataRoom.devices[count].deviceName,count, "Smart socket");
		// }
		// else{
		// 	// createDevice(dataRoom.devices[count].deviceName,dataRoom.devices[count].serial, "Door");
		// 	// createDevice(dataRoom.devices[count].deviceName,count, "Door");
		// }

	}

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

	function addDevice(){
		var temp = 0;
		// focusInput();
		$(".btn-finish").click(function(){
			var listDevice = [];
			$("#defaultCheck:checked").each(function(){
				var type = $(this).attr("name");
				var name = $(".enter"+type).attr("name");
				var number = $(".enter"+name).val();
				var num = parseInt($(".enter"+name).val())
				for(var i=temp;i<num+temp;i++){
					if( type == "light"){
						createDevice("Light",i, "Smart switch");
						// createDevice("Smart switch",i);
					}else if (type == "door"){
						createDevice("Door",i, "");
					}
					else if (type == "fan"){
						createDevice("Fan",i, "Smart socket");
						// createDevice("Smart socket",i);
					}
					else if (type == "fridge"){
						createDevice("Fridge",i, "Smart socket");
						// createDevice("Smart socket",i);
					}
					else if (type == "wash"){
						createDevice("Washing-machine",i, "Smart socket");
						// createDevice("Smart socket",i);
					}
					else if (type == "heaters"){
						createDevice("Heaters",i, "Smart switch");
						// createDevice("Smart switch",i);
					}
					else if (type == "air"){
						createDevice("Air-conditional",i, "Smart switch");
						// createDevice("Smart switch",i);
					}
					else if (type == "cooker"){
						createDevice("Cooker",i, "Smart socket");
						// createDevice("Smart socket",i);
					}
				}
				temp = temp + num;
			});
		});
	}
	
	function createDevice(typeDevice, createCount, typecontrol){
		$("tbody").append(
			"<tr>"
				+ "<td></td>"
				+ "<td><input class='nameDevice' type='text' name='nameDevice' placeholder='Enter the name of device'></td>"
				+ "<td class='serial'>D"+createCount+"</td>"
				+ "<td>"+typecontrol+" of "+typeDevice+"</td>"
				+ "<td><button type='button' name='"+typeDevice+"' class='btn btn-css btn-details"+createCount+"' data-toggle='modal' data-target='#detail"+typeDevice+"'>Details</button></td>"
				
				// + "<td>".append('<div id="'+typeDevice+'"><div>')
				+ "<td></td>"
				+ "<td>"
					+ "<a href='#' class='del'><h5 style='background-color: #ecf9ec;'>Delete</h5></a>"
				+"</td>"
			+ "</tr>"
		)
		var nameDevice = $(this).find("td:eq(1) input[type='text']").val();
		$(".modal-header").append('<h4 class="modal-title">Details '+typeDevice+' of '+nameDevice+'</h4>');
		$(".del").click(function(){
			$(this).closest('tr').remove();
			return false;
		});
	}
	$(".addDevice").click(function(){
		function resetForm(){
				$(".btn-reset").click(function(){
					$(".form")[0].reset();
				});
		}
	});
	
	function getValueStatus(typeDevice){
		var statusDevice = [];
		var state;
		var bright = "";
		var color = "";
		var temperVal = "";
		switch(typeDevice){
			case "Smart switch of Light":
				state = $('input[name=onoffLight]:checked').val(); // value of status on-off
				bright = $("#bright option:selected").text(); // value of brightness
				color = $("#light-color option:selected").text(); // value of light color
				break;
			case "Door":
				state = $("#secure option:selected").text();
				break;
			case "Smart switch of Air-conditional":
				state = $('input[name=onoffAir]:checked').val();
				temperVal = $('#airVal').text();
				break;
			case "Smart socket of Fridge":
				state = $('input[name=onoffFridge]:checked').val();
				temperVal = $('#fridgeVal').text();
				break;
			case "Smart switch of Heaters":
				state = $('input[name=onoffHeat]:checked').val();
				temperVal = $('#heatVal').text();
				break;
			case "Smart socket of Fan":
				state = $('input[name=strength_level]:checked').val();
				break;
			case "Smart socket of Washing-machine":
				state = $('input[name=state]:checked').val();
				break;
			case "Smart socket of Cooker":
				state = $('input[name=mode]:checked').val();
				break;
			default:
				alert("Cannot get value!!!");
		}
		statusDevice.push(state,bright,color,temperVal);
		return statusDevice;
	}

	function saveDevice(){
		$(".saveroom").click(function(){
			$(".table-device tbody tr").each(function(){
				var nameDevice = $(this).find("td:eq(1) input[type='text']").val();
				var serial = $(this).find("td:eq(2)").text();
				var typeDevice = $(this).find("td:eq(3)").text();
				var statusDevice = [];
				// var status = [];
				var state;
				var bright;
				var colour;
				var temperVal;
				if(typeDevice === "Light" || typeDevice === "Fan" || typeDevice === "Fridge" || typeDevice === "Washing-machine" || typeDevice === "Heaters" || typeDevice === "Air-conditional" || typeDevice === "Cooker"){
					state = $(this).find("td:eq(4)").text();
					bright = "";
					colour = "";
					temperVal = "";
				}
				else{
					statusDevice = getValueStatus(typeDevice);
					state = statusDevice[0];
					bright = statusDevice[1];
					colour = statusDevice[2];
					temperVal = statusDevice[3];
				}
				alert(statusDevice);
				// alert(bright);
				// alert(colour);
				// alert(temperVal);
				// alert(state);
				// var temp = [];
				// temp.push(nameDevice,serial,typeDevice,statusDevice);
				// status.push({deviceName:nameDevice, serial: serial, deviceType: typeDevice, listStatus: statusDevice, roomProject:dataRoom});
				// alert(temp);
				// status.push({deviceName:nameDevice, serial: serial, deviceType: typeDevice, State: state, Bright: bright, Color: colour, TemperVal: temperVal, roomProject:dataRoom});
				// alert(status);
				$.ajax({
					async : false,
					method: "post",
					data: JSON.stringify({deviceName:nameDevice, serial: serial, deviceType: typeDevice, State: state, Bright: bright, Color: colour, TemperVal: temperVal, roomProject:dataRoom}),
					contentType: "application/json",
					url: "http://localhost:8080/smarthome/adddevice/"+getRoomName,
				}).done(function(data, textStatus, xhr){
					status_create = xhr.status;
				});
				if(status_create = 201){
					alert("Save "+nameDevice+"success!");
				}
				else{
					alert("Save "+nameDevice+"unsuccess!");
				}
			});

			
		});

	}

	// Load list device from DB
	function loadDevice(id, nameDevice, serial, typeDevice, state, bright, color, temperVal){
		var statusDevice = [];
		statusDevice = detailDevice(typeDevice, state, bright, color, temperVal);
		$("tbody").append(
			"<tr>"
				+ "<td>"+id+"</td>"
				+ "<td>"+nameDevice+"</td>"
				+ "<td>"+serial+"</td>"
				+ "<td>"+typeDevice+"</td>"
				+ "<td>"+statusDevice+"</td>"
				+ "<td>"
					+ "<a href='#' class='adjust'><h5 style='background-color: #ecf9ec;'>Adjust</h5></a>"
				+"</td>"
				+ "<td>"
					+ "<a href='#' class='del'><h5 style='background-color: #ecf9ec;'>Delete</h5></a>"
				+"</td>"
			+ "</tr>"
		)
		$(".del").click(function(){
			$(this).closest('tr').remove();
			return false;
		});
	}
	function detailDevice(typeDevice, state, bright, color, temperVal){
		var statusDevice = [];
		switch(typeDevice){
			case "Smart switch of Light":
				statusDevice.push(state,bright,color);
				break;
			case "Door":
				statusDevice.push(state);
				break;
			case "Smart switch of Air-conditional":
				statusDevice.push(state,temperVal);
				break;
			case "Smart socket of Fridge":
				statusDevice.push(state,temperVal);
				break;
			case "Smart switch of Heaters":
				statusDevice.push(state,temperVal);
				break;
			case "Smart socket of Fan":
				statusDevice.push(state);
				break;
			case "Smart socket of Washing-machine":
				statusDevice.push(state);
				break;
			case "Smart socket of Cooker":
				statusDevice.push(state);
				break;
			case "Light", "Air-conditional", "Heaters":
				statusDevice = ("Be Controlled by Smart switch");
				break;
			case "Fan", "Fridge", "Washing-machine", "Cooker":
				statusDevice = ("Be Controlled by Smart socket");
				break;
			default:
				statusDevice = ("None");
		}
		return statusDevice;
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

