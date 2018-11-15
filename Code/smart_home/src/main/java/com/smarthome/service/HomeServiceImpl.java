package com.smarthome.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smarthome.dao.HomeDao;
import com.smarthome.entity.CreateHome;
import com.smarthome.entity.CreateRoom;

@Service
@Transactional
public class HomeServiceImpl implements HomeService {
	
	@Autowired
    HomeDao homeDao;
	
	public void createHome(CreateHome homeProject) {
		homeDao.addHome(homeProject);	
	}
	
	public CreateHome getHome(String homeName) {
		return homeDao.getHome(homeName);	
	}
	
	public void createRoom(CreateRoom roomProject) {
		homeDao.addRoom(roomProject);	
	}
	
	public List<CreateRoom> getListRooms(String homeName){
		return homeDao.getListRooms(homeName);
	}
}