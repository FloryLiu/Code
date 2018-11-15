package com.smarthome.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "fridges")
public class Fridge {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private int id;
	
	@Column(name = "name", nullable = false)
	private String fridgeName;
	
	@Column(name = "status", nullable = false)
	private String status;
	
	@Column(name = "timestart", nullable = true)
	private String timeStart;
	
	@Column(name = "timeend", nullable = true)
	private String timeEnd;
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "fridgeProject")
	private List<Compartment> compartments;
	
	@ManyToOne
	@JoinColumn(name = "id_room", referencedColumnName = "id", nullable = false)
	private CreateRoom roomProject;

	public Fridge() {}
	
	public Fridge(int id, String fridgeName, String status, String timeStart, String timeEnd,
			List<Compartment> compartments, CreateRoom roomProject) {
		super();
		this.id = id;
		this.fridgeName = fridgeName;
		this.status = status;
		this.timeStart = timeStart;
		this.timeEnd = timeEnd;
		this.compartments = compartments;
		this.roomProject = roomProject;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFridgeName() {
		return fridgeName;
	}

	public void setFridgeName(String fridgeName) {
		this.fridgeName = fridgeName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTimeStart() {
		return timeStart;
	}

	public void setTimeStart(String timeStart) {
		this.timeStart = timeStart;
	}

	public String getTimeEnd() {
		return timeEnd;
	}

	public void setTimeEnd(String timeEnd) {
		this.timeEnd = timeEnd;
	}

	public List<Compartment> getCompartments() {
		return compartments;
	}

	public void setCompartments(List<Compartment> compartments) {
		this.compartments = compartments;
	}
	@JsonIgnore
	public CreateRoom getRoomProject() {
		return roomProject;
	}

	public void setRoomProject(CreateRoom roomProject) {
		this.roomProject = roomProject;
	}
	
	
	
}
