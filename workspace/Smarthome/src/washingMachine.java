
public class washingMachine {
	int id_machine;
	int id_room;
	String status;
	int id_socket;
	
	//Contructor
		public washingMachine(){
			id_machine = 0;
			id_room   = 0;
			status	  = "Off";
			id_socket = 0;
		}
		public washingMachine(int machine, int room, String status1, int socket){
			id_machine = machine;
			id_room   = room;
			status	  = status1;
			id_socket = socket;
		}
}
