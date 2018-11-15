$(document).ready(function(){

	var status_create;
	var getHomeName = localStorage.getItem("storageName");
	
	var dataHome;
	var count=0;
	var listRoom;

	$('[data-toggle="tooltip"]').tooltip();

		// $.ajax({
		// 	async : false,
		// 	method: "get",
		// 	contentType: "application/json",
		// 	url: "http://localhost:8080/smarthome/getlistroom/"+getHomeName,
		// }).done(function(data, textStatus, xhr){
		// 	listRoom = data;
		// });
		$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/gethome/"+getHomeName,
		}).done(function(data, textStatus, xhr){
			dataHome = data;
		});
	//End get Home

	for(count; count < dataHome.rooms.length; count++){
		appendRoom(count);
		gotoRoom(count);
		$(".getnameroom"+count).val(dataHome.rooms[count].nameRoom);
		$(".getidroom"+count).val(dataHome.rooms[count].id);
		saveRoom(count);
		updateRoom(count);
	}

	function appendRoom(appendCount){
			$(".row").append("<div class='col-sm-3 room"+appendCount+"'></div>");
			// $(".row").append('<div id="room" class="collapse roomname'+appendCount+'"></div>');
			$(".room" + appendCount).append('<img src="Picture/room.jpeg" class="img-thumbnail room" alt="Room" width = 100%; height = 100%;>');
			$(".room" + appendCount).append("<div class='info"+appendCount+"'></div>");
			$(".info"+appendCount).append("<div class='form-group"+appendCount+"'></div>");
			$(".info"+appendCount).append('<button type="submit" class="btn btn-success btn-creroom'+appendCount+'">Save room</button>');
			// $(".info"+appendCount).append('<button type="submit" class="btn btn-success btn-update'+appendCount+'">Update room</button>');
			$(".info"+appendCount).append('<a href="Room.html" class="goto'+appendCount+'"></a>');
			// target="_blank" 
			$(".goto"+appendCount).append('<button type="button" class="btn btn-success goto" data-toggle="tooltip" title="Go to room">Go to</button>');
			$(".form-group"+appendCount).append('<label for="roomname">Room name:</label>');
			$(".form-group"+appendCount).append('<input type="text" class="form-control getnameroom'+appendCount+'" id="roomname">');
			// $(".form-group"+appendCount).append('<label for="idroom">Id room:</label>');
			$(".form-group"+appendCount).append('<input type="hidden" class="form-control getidroom'+appendCount+'" id ="idroom" readonly>');
			// $(".form-group"+appendCount).append('<input type="hidden" class="form-control getidhome'+appendCount+'" id ="idhome" readonly>');
	}
	function saveRoom(saveCount){
		$(".btn-creroom"+saveCount).click(function(){
			var nameRoom = $(".getnameroom"+saveCount).val();
			var idRoom = parseInt($(".idroom"+saveCount)) 
			if(isNaN(idRoom)|| idRoom == null){
				idRoom = 0;
			}
			$.ajax({
				async : false,
				method: "post",
				data: JSON.stringify({nameRoom:nameRoom}),
				contentType: "application/json",
				url: "http://localhost:8080/smarthome/createroom/"+getHomeName
			}).done(function(data, textStatus, xhr){
				status_create = xhr.status;
			});
			if(status_create = 201){
				alert("Save "+nameRoom+" success!");
			}
			else{
				alert("Save "+nameRoom+" unsuccess!");
			}
		});
	}

	function updateRoom(updateCount){
		$(".btn-update"+updateCount).click(function(){
		var nameRoom = $(".getnameroom"+updateCount).val();
		var idRoom = $(".getidroom"+updateCount).val();
		$.ajax({
			async : false,
			method: "post",
			data: JSON.stringify({id: idRoom, nameRoom: nameRoom, home: dataHome}),
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/updateroom/"+getHomeName
		}).done(function(data, textStatus, xhr){
			var status_update = xhr.status;
		});
		if(status_update = 201){
			alert("Update "+nameRoom+" success!");
		}
		else{
			alert("Update "+nameRoom+" unsuccess!");
		}
		});
	}

	function gotoRoom(gotoCount){
		$(".goto"+gotoCount).click(function(){
		var nameRoom = $(".getnameroom"+gotoCount).val();
		// var idRoom = listRoom.id_room;
		localStorage.setItem("storageRoomName", nameRoom);
		});
	}



	$(".add_room").click(function(){
		appendRoom(count + 1);
		saveRoom(count + 1);
		updateRoom(count);
		gotoRoom(count + 1);
		count++;
	});

	});