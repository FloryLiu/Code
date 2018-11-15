package com.smarthome.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "lights")
public class Light {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_light", nullable = false)
	private int id_light;
	
	@Column(name = "name", nullable = false)
	private String lightName;
	
	@Column(name = "state", nullable = false)
	private String state;
	
	@Column(name = "brightness", nullable = false)
	private String brightness;
	
	@Column(name = "color", nullable = false)
	private String color;
	
//	@Column(name = "timer", nullable = true)
//	private String timer;
	
	@ManyToOne
	@JoinColumn(name = "id_room", referencedColumnName = "id", nullable = false)
	private CreateRoom roomProject;

	public Light() {}

	public Light(int id_light, String lightName, String state, String brightness, String color, CreateRoom roomProject) {
		super();
		this.id_light = id_light;
		this.lightName = lightName;
		this.state = state;
		this.brightness = brightness;
		this.color = color;
		this.roomProject = roomProject;
	}

	public int getId_light() {
		return id_light;
	}

	public void setId_light(int id_light) {
		this.id_light = id_light;
	}

	public String getLightName() {
		return lightName;
	}

	public void setLightName(String lightName) {
		this.lightName = lightName;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getBrightness() {
		return brightness;
	}

	public void setBrightness(String brightness) {
		this.brightness = brightness;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

//	public String getTimer() {
//		return timer;
//	}
//
//	public void setTimer(String timer) {
//		this.timer = timer;
//	}

	@JsonIgnore
	public CreateRoom getRoomProject() {
		return roomProject;
	}

	public void setRoomProject(CreateRoom roomProject) {
		this.roomProject = roomProject;
	}
}
