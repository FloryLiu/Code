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
@Table(name = "heaters")
public class Heaters {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private int id_heat;
	
	@Column(name = "name", nullable = false)
	private String heatName;
	
	@Column(name = "status", nullable = false)
	private String status;
	
	@Column(name = "temper", nullable = false)
	private String temperVal;
	
	@ManyToOne
	@JoinColumn(name = "id_room", referencedColumnName = "id", nullable = false)
	private CreateRoom roomProject;

	public Heaters(){}
	public Heaters(int id_heat, String heatName, String status, String temperVal, CreateRoom roomProject) {
		super();
		this.id_heat = id_heat;
		this.heatName = heatName;
		this.status = status;
		this.temperVal = temperVal;
		this.roomProject = roomProject;
	}
	public int getId_heat() {
		return id_heat;
	}
	public void setId_heat(int id_heat) {
		this.id_heat = id_heat;
	}
	public String getHeatName() {
		return heatName;
	}
	public void setHeatName(String heatName) {
		this.heatName = heatName;
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
