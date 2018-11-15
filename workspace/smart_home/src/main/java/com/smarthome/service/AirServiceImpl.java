package com.smarthome.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.smarthome.dao.AirDao;
import com.smarthome.entity.Air;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class AirServiceImpl implements AirService{
	@Autowired
    AirDao airDao;
	
	public void addAir(Air airProject) {
		airDao.addAir(airProject);	
	}
	
//	public Air getAir(String AirName) {
//		return AirDao.getAir(AirName);	
//	}
}
