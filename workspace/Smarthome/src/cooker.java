
public class cooker {
	int id_cooker;
	int id_room;
	String status;
	int id_socket;
	
	//Contructor
	public cooker(){
		id_cooker = 0;
		id_room   = 0;
		status	  = "Off";
		id_socket = 0;
	}
	public cooker(int cooker, int room, String status1, int socket){
		id_cooker = cooker;
		id_room   = room;
		status	  = status1;
		id_socket = socket;
	}
}
