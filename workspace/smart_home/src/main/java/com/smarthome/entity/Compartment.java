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
@Table(name = "compartments")
public class Compartment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_com", nullable = false)
	private int id_com;

	@Column(name = "state", nullable = false)
	private String stateCom;
	
	@Column(name = "temper", nullable = false)
	private String temperVal;
	
//	@Column(name = "timestart", nullable = true)
//	private String timeStart;
//	
//	@Column(name = "timeend", nullable = true)
//	private String timeEnd;

	@ManyToOne
	@JoinColumn(name = "fridge_id", referencedColumnName = "id", nullable = false)
	private Fridge fridgeProject;

	public int getId_com() {
		return id_com;
	}

	public void setId_com(int id_com) {
		this.id_com = id_com;
	}

	public String getStateCom() {
		return stateCom;
	}

	public void setStateCom(String stateCom) {
		this.stateCom = stateCom;
	}

	public String getTemperVal() {
		return temperVal;
	}

	public void setTemperVal(String temperVal) {
		this.temperVal = temperVal;
	}
	
//	public String getTimeStart() {
//		return timeStart;
//	}
//
//	public void setTimeStart(String timeStart) {
//		this.timeStart = timeStart;
//	}
//
//	public String getTimeEnd() {
//		return timeEnd;
//	}
//
//	public void setTimeEnd(String timeEnd) {
//		this.timeEnd = timeEnd;
//	}
	@JsonIgnore
	public Fridge getFridgeProject() {
		return fridgeProject;
	}

	public void setFridgeProject(Fridge fridgeProject) {
		this.fridgeProject = fridgeProject;
	}
	
}
