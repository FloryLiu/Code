package com.smarthome.dao;

import java.util.List;
import com.smarthome.entity.Air;
import com.smarthome.entity.CreateRoom;
import com.smarthome.entity.Device;
import com.smarthome.entity.Fridge;
import com.smarthome.entity.Heaters;
import com.smarthome.entity.Light;

public interface RoomDao {
	public void addRoom(CreateRoom room);
	public List<Device> getListDevices(String roomName);
	public void updateRoom (CreateRoom room);
	public CreateRoom getRoom(String nameRoom);
	public List<Light> getListLights(String roomname);
	public List<Fridge> getListFridges(String roomname);
	public List<Air> getListAirs(String roomname);
	public List<Heaters> getListHeats(String roomname);
//	public void saveOrUpdate(CreateRoom room);
}
