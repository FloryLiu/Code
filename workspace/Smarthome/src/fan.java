
public class fan {
	int id_fan;
	int id_room;
	String status;
	int strength;	// have 4 level: 0 (Off), 1 (min), 2, 3 (max).
	int id_socket;
	
	//Contructor
	public fan(){
		id_fan	  = 0;
		id_room   = 0;
		status	  = "Off";
		strength  = 0;
		id_socket = 0;
	}
	public fan(int fan, int room, String status1, int strength1, int socket){
		id_fan 	  = fan;
		id_room   = room;
		status	  = status1;
		strength  = strength1;
		id_socket = socket;
	}
}
