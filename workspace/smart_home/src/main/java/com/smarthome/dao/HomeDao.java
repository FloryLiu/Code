package com.smarthome.dao;

import java.util.List;

import com.smarthome.entity.CreateHome;
import com.smarthome.entity.CreateRoom;

public interface HomeDao {
	public void addHome(CreateHome homeProject);
	public CreateHome getHome(String homeName);
	public void addRoom(CreateRoom roomProject);
	public List<CreateRoom> getListRooms(String homeName);
}