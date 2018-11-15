package com.smarthome.entity;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
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
@Table(name = "rooms")
public class CreateRoom{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "home_id", referencedColumnName = "id")
	private CreateHome home;
	
	@Column(name = "name_room", nullable = false)
	private String nameRoom;
	
	@LazyCollection(LazyCollectionOption.FALSE)
//	, fetch = FetchType.EAGER
	@OneToMany(mappedBy = "roomProject")
	private List<Light> lights;
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "roomProject")
	private List<Fridge> fridges;
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "roomProject")
	private List<Air> airs;
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "roomProject")
	private List<Heaters> heaters;
	
//	@OneToMany(mappedBy = "roomProject", fetch = FetchType.EAGER)
//	private List<Device> devices;
	
	public CreateRoom() {}
	
	public CreateRoom(int id) {
		this.id = id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	@JsonIgnore
	public CreateHome getHome() {
		return home;
	}

	public void setHome(CreateHome home) {
		this.home = home;
	}

	public String getNameRoom() {
		return nameRoom;
	}

	public void setNameRoom(String nameRoom) {
		this.nameRoom = nameRoom;
	}
	
	public List<Light> getLights() {
		return lights;
	}

	public void setLights(List<Light> lights) {
		this.lights = lights;
	}

	public List<Fridge> getFridges() {
		return fridges;
	}

	public void setFridges(List<Fridge> fridges) {
		this.fridges = fridges;
	}

	public List<Air> getAirs() {
		return airs;
	}

	public void setAirs(List<Air> airs) {
		this.airs = airs;
	}

	public List<Heaters> getHeaters() {
		return heaters;
	}

	public void setHeaters(List<Heaters> heaters) {
		this.heaters = heaters;
	}
	
}