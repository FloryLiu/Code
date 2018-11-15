
public class smartSocket {
	int id_socket;
	int id_room;
	String status;
	//Time time;
	
	//Contructor
	public smartSocket(){
		id_socket	  = 0;
		id_room   	  = 0;
		status	  	  = "Off";
		//time = 0:0:0;
	}
	public smartSocket(int socket, int room, String status1/*, Time time1*/){
		id_socket 	  = socket;
		id_room   = room;
		status	  = status1;
		//time = time1;
	}
}
