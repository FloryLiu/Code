package com.smarthome.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smarthome.entity.Compartment;
import com.smarthome.entity.CreateHome;
import com.smarthome.entity.CreateRoom;
import com.smarthome.entity.Fridge;
import com.smarthome.entity.Heaters;
import com.smarthome.entity.Light;
import com.smarthome.entity.Air;
import com.smarthome.service.CompService;
import com.smarthome.service.FridgeService;
import com.smarthome.service.HeatService;
import com.smarthome.service.HomeService;
import com.smarthome.service.LightService;
import com.smarthome.service.AirService;
import com.smarthome.service.RoomService;

@RestController
@RequestMapping(value={"/smarthome"})
@CrossOrigin
public class HomeController {
	
	@Autowired
	HomeService homeService;
	
	@Autowired
	RoomService roomService;
	
	@Autowired
	LightService lightService;
	
	@Autowired
	FridgeService fridgeService;
	
	@Autowired
	CompService compService;
	
	@Autowired
	AirService airService;
	
	@Autowired
	HeatService heatService;
	
	@RequestMapping(value = "/createhome", method= RequestMethod.POST, headers="Accept=application/json")
	public ResponseEntity<HttpStatus> createHome(@RequestBody CreateHome homeProject){
		homeService.createHome(homeProject);
		return new ResponseEntity<> (HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/gethome/{homename}", method= RequestMethod.GET, headers="Accept=application/json")
	public CreateHome getHome(@PathVariable("homename") String homeName){
		return homeService.getHome(homeName);
	}
	
	@RequestMapping(value = "/updateroom/{homename}", method= RequestMethod.POST, headers="Accept=application/json")
	public ResponseEntity<HttpStatus> createRooms(@RequestBody CreateRoom room, @PathVariable("homename") String homeName){
		CreateHome home = homeService.getHome(homeName);
		room.setHome(home);
		if(room.getId()<= 0) {
			roomService.createRoom(room);
		}
		else {
			roomService.updateRoom(room);
		}
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/createroom/{homename}", method= RequestMethod.POST, headers="Accept=application/json")
	public ResponseEntity<HttpStatus> createRoom(@RequestBody CreateRoom room, @PathVariable("homename") String homeName){
		CreateHome home = homeService.getHome(homeName);
		room.setHome(home);
		roomService.createRoom(room);
		return new ResponseEntity<> (HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/getroom/{roomname}", method= RequestMethod.GET, headers="Accept=application/json")
	public CreateRoom getRoom(@PathVariable("roomname") String roomname){
		return roomService.getRoom(roomname);
	}
//	@RequestMapping(value = "/getroom/{id}", method= RequestMethod.GET, headers="Accept=application/json")
//	public CreateRoom getRoom1(@PathVariable("id") String id){
//		return roomService.getRoom(id);
//	}
	
//	@RequestMapping(value = "/getlistroom/{homename}", method= RequestMethod.GET, headers="Accept=application/json")
//	public List<CreateRoom> getListRooms(@PathVariable("homename") String homeName){
//		return homeService.getListRooms(homeName);
//	}
	
	@RequestMapping(value = "/addlight/{roomname}", method= RequestMethod.POST, headers="Accept=application/json")
	public ResponseEntity<HttpStatus> addLight(@RequestBody Light lightProject, @PathVariable("roomname") String roomName){
		CreateRoom room = roomService.getRoom(roomName);
		lightProject.setRoomProject(room);
		lightService.addLight(lightProject);
		return new ResponseEntity<> (HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/addfridge/{roomname}", method= RequestMethod.POST, headers="Accept=application/json")
	public ResponseEntity<HttpStatus> addFridge(@RequestBody Fridge fridgeProject, @PathVariable("roomname") String roomName){
		CreateRoom room = roomService.getRoom(roomName);
		fridgeProject.setRoomProject(room);
		fridgeService.addFridge(fridgeProject);
		return new ResponseEntity<> (HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/getlistlight/{roomname}", method= RequestMethod.GET, headers="Accept=application/json")
	public List<Light> getListLights(@PathVariable("roomname") String roomname){
		return roomService.getListLights(roomname);
	}
	
	@RequestMapping(value = "/getfridge/{fridgename}", method= RequestMethod.GET, headers="Accept=application/json")
	public Fridge getFridge(@PathVariable("fridgename") String fridgeName){
		return fridgeService.getFridge(fridgeName);
	}
	@RequestMapping(value = "/getlistfridge/{nameroom}", method= RequestMethod.GET, headers="Accept=application/json")
	public List<Fridge> getListFridges(@PathVariable("nameroom") String nameroom){
		return roomService.getListFridges(nameroom);
	}
	
	@RequestMapping(value = "/addcompartment/{fridgename}", method= RequestMethod.POST, headers="Accept=application/json")
	public ResponseEntity<HttpStatus> addCompartment(@RequestBody Compartment comp, @PathVariable("fridgename") String fridgeName){
		Fridge fridge = fridgeService.getFridge(fridgeName);
		comp.setFridgeProject(fridge);;
		compService.addCompartment(comp);
		return new ResponseEntity<> (HttpStatus.CREATED);
	}
	@RequestMapping(value = "/getlistcompartment/{fridgename}", method= RequestMethod.GET, headers="Accept=application/json")
	public List<Compartment> getListCompartments(@PathVariable("fridgename") String fridgename){
		return fridgeService.getListCompartments(fridgename);
	}
	
	@RequestMapping(value = "/addair/{roomname}", method= RequestMethod.POST, headers="Accept=application/json")
	public ResponseEntity<HttpStatus> addAir(@RequestBody Air airProject, @PathVariable("roomname") String roomName){
		CreateRoom room = roomService.getRoom(roomName);
		airProject.setRoomProject(room);
		airService.addAir(airProject);
		return new ResponseEntity<> (HttpStatus.CREATED);
	}
	@RequestMapping(value = "/getlistair/{nameroom}", method= RequestMethod.GET, headers="Accept=application/json")
	public List<Air> getListAirs(@PathVariable("nameroom") String nameroom){
		return roomService.getListAirs(nameroom);
	}
	
	@RequestMapping(value = "/addheat/{roomname}", method= RequestMethod.POST, headers="Accept=application/json")
	public ResponseEntity<HttpStatus> addHeat(@RequestBody Heaters heatProject, @PathVariable("roomname") String roomName){
		CreateRoom room = roomService.getRoom(roomName);
		heatProject.setRoomProject(room);
		heatService.addHeat(heatProject);
		return new ResponseEntity<> (HttpStatus.CREATED);
	}
	@RequestMapping(value = "/getlistheat/{nameroom}", method= RequestMethod.GET, headers="Accept=application/json")
	public List<Heaters> getListHeats(@PathVariable("nameroom") String nameroom){
		return roomService.getListHeats(nameroom);
	}

}