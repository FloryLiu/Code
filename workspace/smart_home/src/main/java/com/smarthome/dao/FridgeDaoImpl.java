package com.smarthome.dao;

import java.util.List;

import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.smarthome.entity.Compartment;
import com.smarthome.entity.CreateRoom;
import com.smarthome.entity.Fridge;

@Repository
public class FridgeDaoImpl implements FridgeDao{
	@Autowired
	private SessionFactory sessionFactory;
	
	public void addFridge(Fridge fridgeProject) {
		 Session session = sessionFactory.getCurrentSession();
		 session.saveOrUpdate(fridgeProject);
	}
	
//	public void updateDevice(Device device) {
//		Session session = sessionFactory.getCurrentSession();
//		session.update(device);
//	}
	
	public Fridge getFridge(String fridgeName) {
		 Session session = sessionFactory.getCurrentSession();
		 Query query = session.createQuery("FROM Fridge WHERE fridgeName = :fridgeName");
		 query.setParameter("fridgeName", fridgeName);
		 Fridge fridge = (Fridge) query.getSingleResult();
		 return fridge;
	}
	
//	public List<Fridge> getListFridges(int idroom) {
//		Session session = sessionFactory.getCurrentSession();
//		Query query = session.createQuery("FROM Fridge WHERE id_room = :id");
//		query.setParameter("id", idroom);
//		List<Fridge> fridge = (List<Fridge>) query.getResultList();
//		return fridge;
//	}
	
	public List<Fridge> getListFridges(String nameroom) {
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery("FROM Fridge WHERE room = :id");
		query.setParameter("id", nameroom);
		List<Fridge> fridge = (List<Fridge>) query.getResultList();
		return fridge;
	}
	
	public List<Compartment> getListCompartments(String fridgename) {
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery("FROM Compartment WHERE fridgeProject = (SELECT id FROM Fridge WHERE nameFridge = :name)");
		query.setParameter("name", fridgename);
		List<Compartment> comp = (List<Compartment>) query.getResultList();
		return comp;
	}
}
