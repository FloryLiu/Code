package com.smarthome.dao;

import java.util.List;

import com.smarthome.entity.Compartment;
import com.smarthome.entity.Fridge;

public interface FridgeDao {
	public void addFridge(Fridge fridgeProject);
	public Fridge getFridge(String fridgeName);
//	public List<Fridge> getListFridges(int idroom);
	public List<Fridge> getListFridges(String nameroom);
	public List<Compartment> getListCompartments(String fridgename);
}
