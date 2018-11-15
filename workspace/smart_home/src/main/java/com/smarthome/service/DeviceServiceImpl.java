package com.smarthome.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.beans.factory.annotation.Autowired;

import com.smarthome.dao.DeviceDao;
import com.smarthome.entity.Device;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class DeviceServiceImpl implements DeviceService {
	
	@Autowired
    DeviceDao deviceDao;
	
	public void addDevice(Device deviceProject) {
		deviceDao.addDevice(deviceProject);	
	}
	
	public Device getDevice(String deviceName) {
		return deviceDao.getDevice(deviceName);	
	}
//	
//	public void createRoom(CreateRoom roomProject) {
//		homeDao.addRoom(roomProject);	
//	}
//	
//	public List<CreateRoom> getListRooms(String homeName){
//		return homeDao.getListRooms(homeName);
//	}
}