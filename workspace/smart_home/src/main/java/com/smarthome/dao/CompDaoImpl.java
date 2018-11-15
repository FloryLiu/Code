package com.smarthome.dao;

import java.util.List;

import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.smarthome.entity.Fridge;
import com.smarthome.entity.Compartment;

@Repository
public class CompDaoImpl implements CompDao {
	@Autowired
	private SessionFactory sessionFactory;
	
	public void addCompartment(Compartment compProject) {
		 Session session = sessionFactory.getCurrentSession();
		 session.saveOrUpdate(compProject);
	}
	
//	public void updateDevice(Device device) {
//		Session session = sessionFactory.getCurrentSession();
//		session.update(device);
//	}
	
	public Compartment getCompartment(String compName) {
		 Session session = sessionFactory.getCurrentSession();
		 Query query = session.createQuery("FROM Compartment WHERE compName = :compfridge");
		 query.setParameter("compName", compName);
		 Compartment comp = (Compartment) query.getSingleResult();
		 return comp;
	}
	
}
