package com.smarthome.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "home")
public class CreateHome {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private int idHome;
	
	@Column(name = "name", nullable = false)
	private String nameHome;
	
	@OneToMany(mappedBy = "home", fetch = FetchType.EAGER)
	private List<CreateRoom> rooms;
	
//	@ManyToOne
//	@JoinColumn(name = "user_id", referencedColumnName = "id")
//	private Account account;
////	
//	@JsonIgnore
//	public Account getAccount() {
//		return account;
//	}

//	public void setAccount(Account account) {
//		this.account = account;
//	}

	public CreateHome() {
		// TODO Auto-generated constructor stub
	}
	
	public CreateHome(int idHome, String nameHome, List<CreateRoom> rooms) {
		this.idHome = idHome;
		this.nameHome = nameHome;
		this.rooms = rooms;
	}

	public int getIdHome() {
		return idHome;
	}

	public void setIdHome(int idHome) {
		this.idHome = idHome;
	}

	public String getNameHome() {
		return nameHome;
	}

	public void setNameHome(String nameHome) {
		this.nameHome = nameHome;
	}

	public List<CreateRoom> getRooms() {
		return rooms;
	}

	public void setRooms(List<CreateRoom> rooms) {
		this.rooms = rooms;
	}

}