package com.smarthome.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.smarthome.dao.RoomDao;
import com.smarthome.entity.CreateRoom;

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

}
