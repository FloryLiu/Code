package com.smarthome.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.smarthome.dao.CompDao;
import com.smarthome.entity.Compartment;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class CompServiceImpl implements CompService{
	@Autowired
    CompDao compDao;
	
	public void addCompartment(Compartment compProject) {
		compDao.addCompartment(compProject);	
	}
	
//	public Light getLight(String lightName) {
//		return lightDao.getLight(lightName);	
//	}
}
