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
@Table(name = "devices")
public class Device {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_device", nullable = false)
	private int id_device;
	
	@Column(name = "device", nullable = false, unique = true)
	private String deviceName;
	
	@Column(name = "serial", nullable = false)
	private String serial;
	
	@Column(name = "type", nullable = false)
	private String deviceType;
	
	@Column(name = "state")
	private String State;
	
	@Column(name = "brightness")
	private String Bright;
	
	@Column(name = "color")
	private String Color;
	
	@Column(name = "temperature")
	private String TemperVal;
	
	@ManyToOne
	@JoinColumn(name = "id_room", referencedColumnName = "id", nullable = false)
	private CreateRoom roomProject;

	public int getId_device() {
		return id_device;
	}

	public void setId_device(int id_device) {
		this.id_device = id_device;
	}

	public String getDeviceName() {
		return deviceName;
	}

	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	public String getSerial() {
		return serial;
	}

	public void setSerial(String serial) {
		this.serial = serial;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

	public String getState() {
		return State;
	}

	public void setState(String state) {
		State = state;
	}

	public String getBright() {
		return Bright;
	}

	public void setBright(String bright) {
		Bright = bright;
	}

	public String getColor() {
		return Color;
	}

	public void setColor(String color) {
		Color = color;
	}

	public String getTemperVal() {
		return TemperVal;
	}

	public void setTemperVal(String temperVal) {
		TemperVal = temperVal;
	}

	public CreateRoom getRoomProject() {
		return roomProject;
	}

	public void setRoomProject(CreateRoom roomProject) {
		this.roomProject = roomProject;
	}
	
	
}
