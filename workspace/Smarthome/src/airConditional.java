
public class airConditional {
	int id_air;
	int id_room;
	String status;
	int temperature;
	int id_socket;
	
	//Contructor
	public airConditional(){
		id_air	  = 0;
		id_room   = 0;
		status	  = "Off";
		temperature  = 0;
		id_socket = 0;
	}
	public airConditional(int air, int room, String status1, int temperature1, int socket){
		id_air 	  = air;
		id_room   = room;
		status	  = status1;
		temperature  = temperature1;
		id_socket = socket;
	}
}
