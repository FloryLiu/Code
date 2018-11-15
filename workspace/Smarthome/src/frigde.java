
public class frigde {
	int id_frigde;
	int id_room;
	String status;
	int temperature;
	int id_socket;
	
	//Contructor
	public frigde(){
		id_frigde	= 0;
		id_room		= 0;
		status		= "Off";
		temperature = 0;
		id_socket	= 0;
	}
	public frigde(int frigde, int room, String status1, int temperature1, int socket){
		id_frigde = frigde;
		id_room   = room;
		status	  = status1;
		temperature = temperature1;
		id_socket = socket;
	}
}
