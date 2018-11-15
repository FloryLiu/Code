
public class smartSwitch {
	int id_switch;
	int id_room;
	String status;
	//Time time;
	
	//Contructor
	public smartSwitch(){
		id_switch	  = 0;
		id_room   	  = 0;
		status	  	  = "Off";
		//time = 0:0:0;
	}
	public smartSwitch(int switch1, int room, String status1/*, Time time1*/){
		id_switch 	  = switch1;
		id_room   = room;
		status	  = status1;
		//time = time1;
	}
}
