package com.smarthome.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.smarthome.dao.RoomDao;
import com.smarthome.entity.Air;
import com.smarthome.entity.CreateRoom;
import com.smarthome.entity.Device;
import com.smarthome.entity.Fridge;
import com.smarthome.entity.Heaters;
import com.smarthome.entity.Light;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class RoomServiceImpl implements RoomService{
	@Autowired
    RoomDao roomDao;
	
	@Transactional
	public void createRoom(CreateRoom room) {
		roomDao.addRoom(room);	
	}
	
	@Transactional
	public void updateRoom(CreateRoom room) {
		roomDao.updateRoom(room);
	}

	@Override
	public CreateRoom getRoom(String nameRoom) {
		// TODO Auto-generated method stub
		return roomDao.getRoom(nameRoom);
	}
	
	public CreateRoom getRoom1(String id) {
		// TODO Auto-generated method stub
		return roomDao.getRoom(id);
	}
	
	public List<Light> getListLights(String roomname){
		return roomDao.getListLights(roomname);
	}
	
	public List<Fridge> getListFridges(String roomname){
		return roomDao.getListFridges(roomname);
	}
	
	public List<Air> getListAirs(String roomname){
		return roomDao.getListAirs(roomname);
	}
	
	public List<Heaters> getListHeats(String roomname){
		return roomDao.getListHeats(roomname);
	}

}