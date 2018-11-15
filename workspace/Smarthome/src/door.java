
public class door {
	int id_door;
	int id_room;
	String status;
	String secure;
	
	// Contructor
	public door(){
		id_door = 0;
		id_room = 0;
		status  = "Off";
		secure  = "Unlocked";
	}
	public door(int door, int room, String status1, String secure1){
		id_door = door;
		id_room = room;
		status  = status1;
		secure  = secure1;
	}
}
