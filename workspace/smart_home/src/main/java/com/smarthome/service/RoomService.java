package com.smarthome.service;

import java.util.List;

import com.smarthome.entity.Air;
import com.smarthome.entity.CreateRoom;
import com.smarthome.entity.Fridge;
import com.smarthome.entity.Heaters;
import com.smarthome.entity.Light;

public interface RoomService {
	public void createRoom(CreateRoom room);
	public void updateRoom(CreateRoom room);
//	public List<CreateRoom> getListRooms(String name_home);
	public CreateRoom getRoom(String nameRoom);
	public CreateRoom getRoom1(String id);
	public List<Light> getListLights(String roomname);
	public List<Fridge> getListFridges(String roomname);
	public List<Air> getListAirs(String roomname);
	public List<Heaters> getListHeats(String roomname);
}
