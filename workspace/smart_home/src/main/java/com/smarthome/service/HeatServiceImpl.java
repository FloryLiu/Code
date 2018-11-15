package com.smarthome.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.smarthome.dao.HeatDao;
import com.smarthome.entity.Heaters;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class HeatServiceImpl implements HeatService{
	@Autowired
    HeatDao heatDao;
	
	public void addHeat(Heaters heatProject) {
		heatDao.addHeat(heatProject);	
	}
}
