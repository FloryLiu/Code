
public class light {
	int id_room;
	int id_light;
	String status; // On/Off
	String color;
	int id_switch;
	
	// Contructor
	public light(){
		id_room   = 0;
		id_light  = 0;
		status    = "Off";
		color     = "None";
		id_switch = 0;
	}
	public light(int room, int light, String status1, String color1, int idswitch){
		id_room   = room;
		id_light  = light;
		status    = status1;
		color     = color1;
		id_switch = idswitch;
	}
	
	
}
