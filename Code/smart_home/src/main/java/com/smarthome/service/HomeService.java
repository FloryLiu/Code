package com.smarthome.service;

import java.util.List;

import com.smarthome.entity.CreateHome;
import com.smarthome.entity.CreateRoom;

public interface HomeService {
	public void createHome(CreateHome homeProject);
	public CreateHome getHome(String homeName);
	public void createRoom(CreateRoom roomProject);
	public List<CreateRoom> getListRooms(String homeName);
}