package com.smarthome.service;

import java.util.List;

import com.smarthome.entity.Compartment;
import com.smarthome.entity.Fridge;

public interface FridgeService {
	public void addFridge(Fridge fridge);
	public Fridge getFridge(String fridgeName);
//	public List<Fridge> getListFridges(int idroom);
	public List<Fridge> getListFridges(String nameroom);
	public List<Compartment> getListCompartments(String fridgename);
}
