package com.smarthome.dao;

import com.smarthome.entity.CreateRoom;

public interface RoomDao {
	public void addRoom(CreateRoom room);
//	public List<Rooms> getListRooms(String name_home);
	public void updateRoom (CreateRoom room);
//	public Rooms getRoom(String nameRoom);
//	public void saveOrUpdate(CreateRoom room);
}
