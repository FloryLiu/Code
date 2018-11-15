package com.smarthome.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.smarthome.dao.FridgeDao;
import com.smarthome.entity.Compartment;
import com.smarthome.entity.Fridge;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class FridgeServiceImpl implements FridgeService {
	@Autowired
    FridgeDao fridgeDao;
	
	public void addFridge(Fridge fridgeProject) {
		fridgeDao.addFridge(fridgeProject);	
	}
	
	public Fridge getFridge(String fridgeName) {
		return fridgeDao.getFridge(fridgeName);	
	}
	
//	public List<Fridge> getListFridges(int idroom){
//		return fridgeDao.getListFridges(idroom);
//	}
	
	public List<Fridge> getListFridges(String nameroom){
		return fridgeDao.getListFridges(nameroom);
	}
	
//	return roomDao.getListFridges(roomname);
	public List<Compartment> getListCompartments(String fridgename){
		return fridgeDao.getListCompartments(fridgename);
	}
}
