
public class heaters {
	int id_heaters;
	int id_room;
	String status;
	int temperature;
	int id_switch;
	
	//Contructor
	public heaters(){
		id_heaters	  = 0;
		id_room		  = 0;
		status		  = "Off";
		temperature	  = 0;
		id_switch	  = 0;
	}
	public heaters(int heaters, int room, String status1, int temperature1, int switch1){
		id_heaters 	  = heaters;
		id_room   	  = room;
		status	  	  = status1;
		temperature   = temperature1;
		id_switch	  = switch1;
	}
}
