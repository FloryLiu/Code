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

import com.smarthome.entity.CreateHome;
import com.smarthome.entity.CreateRoom;
import com.smarthome.service.HomeService;
import com.smarthome.service.RoomService;

@RestController
@RequestMapping(value={"/smarthome"})
@CrossOrigin
public class HomeController {
	
	@Autowired
	HomeService homeService;
	
	@Autowired
	RoomService roomService;
	
	@RequestMapping(value = "/createhome", method= RequestMethod.POST, headers="Accept=application/json")
	public ResponseEntity<HttpStatus> createHome(@RequestBody CreateHome homeProject){
		homeService.createHome(homeProject);
		return new ResponseEntity<> (HttpStatus.CREATED);
	}
	
	
	@RequestMapping(value = "/gethome/{homename}", method= RequestMethod.GET, headers="Accept=application/json")
	public CreateHome getHome(@PathVariable("homename") String homeName){
		return homeService.getHome(homeName);
	}
	
//	@RequestMapping(value = "/room", method= RequestMethod.POST, headers="Accept=application/json")
//	public ResponseEntity<HttpStatus> createRooms(@RequestBody CreateRoom room){
//		if(room.getId_room()<= 0) {
//			roomService.createRoom(room);
//		}
//		else {
//			roomService.updateRoom(room);
//		}
//		return new ResponseEntity<>(HttpStatus.CREATED);
//	}
//	
	@RequestMapping(value = "/createroom", method= RequestMethod.POST, headers="Accept=application/json")
	public ResponseEntity<HttpStatus> createRoom(@RequestBody CreateRoom room){
		roomService.createRoom(room);
		return new ResponseEntity<> (HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/getlistroom/{homename}", method= RequestMethod.GET, headers="Accept=application/json")
	public List<CreateRoom> getListRooms(@PathVariable("homename") String homeName){
		return homeService.getListRooms(homeName);
	}

}