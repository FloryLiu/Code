$(document).ready(function(){
	var status_create; 

	function toggleAlert(){
		$(".alert").toggleClass('in out'); 
		return false;
	}

    $('.btn-create').click(function(){
    	var nameHome = $("#homename").val();
    	//send request to server
	    $.ajax({
			async : false,
			method: "post",
			data: JSON.stringify({ nameHome:nameHome }),
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/createhome"
		}).done(function(data, textStatus, xhr){
			status_create = xhr.status;
		});

		if(status_create = 201){
			localStorage.setItem("storageName", nameHome);
			alert("Create "+nameHome+" success!");
			// $(".btn-create").on("click", toggleAlert);
			// $('#alert').on('close.bs.alert', toggleAlert);
			document.location.href = "newHome.html";
		}
		else{
			alert("Save "+nameRoom+" unsuccess!");
		}
	});
	
	
});
