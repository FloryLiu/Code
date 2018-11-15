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
@Table(name = "airs")
public class Air {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private int id_air;
	
	@Column(name = "name", nullable = false)
	private String airName;
	
	@Column(name = "status", nullable = false)
	private String status;
	
	@Column(name = "temper", nullable = false)
	private String temperVal;
	
	@ManyToOne
	@JoinColumn(name = "id_room", referencedColumnName = "id", nullable = false)
	private CreateRoom roomProject;

	public Air() {}

	public Air(int id_air, String airName, String status, String temperVal, CreateRoom roomProject) {
//	public Air(int id_air, String airName, String status, String temperVal) {
		super();
		this.id_air = id_air;
		this.airName = airName;
		this.status = status;
		this.temperVal = temperVal;
		this.roomProject = roomProject;
	}

	public int getId_air() {
		return id_air;
	}

	public void setId_air(int id_air) {
		this.id_air = id_air;
	}

	public String getAirName() {
		return airName;
	}

	public void setAirName(String airName) {
		this.airName = airName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTemperVal() {
		return temperVal;
	}

	public void setTemperVal(String temperVal) {
		this.temperVal = temperVal;
	}
	@JsonIgnore
	public CreateRoom getRoomProject() {
		return roomProject;
	}

	public void setRoomProject(CreateRoom roomProject) {
		this.roomProject = roomProject;
	}
}
