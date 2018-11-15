package com.smarthome.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.smarthome.dao.LightDao;
import com.smarthome.entity.Light;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class LightServiceImpl implements LightService {
	@Autowired
    LightDao lightDao;
	
	public void addLight(Light lightProject) {
		lightDao.addLight(lightProject);	
	}
	
//	public Light getLight(String lightName) {
//		return lightDao.getLight(lightName);	
//	}
//	public List<Light> getListLights(String roomname){
//		return lightDao.getListLights(roomname);
//	}
}
