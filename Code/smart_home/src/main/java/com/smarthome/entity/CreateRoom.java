package com.smarthome.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Table(name = "rooms")
public class CreateRoom {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_room", nullable = false)
	private int id_room;
	
	@Column(name = "room", nullable = false, unique = true)
	private String roomName;
	
	
	@ManyToOne
	@JoinColumn(name="id", nullable = true)
	private CreateHome homeProject;


	public int getId_room() {
		return id_room;
	}


	public void setId_room(int id_room) {
		this.id_room = id_room;
	}


	public String getRoomName() {
		return roomName;
	}


	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}


	public CreateHome getHomeProject() {
		return homeProject;
	}


	public void setHomeProject(CreateHome homeProject) {
		this.homeProject = homeProject;
	}

	
}