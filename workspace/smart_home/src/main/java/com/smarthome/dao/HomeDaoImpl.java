package com.smarthome.dao;

import java.util.List;

import javax.persistence.Query;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.smarthome.entity.CreateHome;
import com.smarthome.entity.CreateRoom;

@Repository
@Transactional
public class HomeDaoImpl implements HomeDao {
	@Autowired
	private SessionFactory sessionFactory;
	
	public void addHome(CreateHome homeProject) {
		 Session session = sessionFactory.getCurrentSession();
		 session.save(homeProject);
	}
	public CreateHome getHome(String homeName) {
		 Session session = sessionFactory.getCurrentSession();
		 Query query = session.createQuery("FROM CreateHome WHERE nameHome = :namehome");
		 query.setParameter("namehome", homeName);
		 CreateHome home = (CreateHome) query.getSingleResult();
		 return home;
	}
	public void addRoom(CreateRoom roomProject) {
		 Session session = sessionFactory.getCurrentSession();
		 session.save(roomProject);
	}
	public List<CreateRoom> getListRooms(String homeName) {
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery("FROM CreateRoom WHERE homeProject = (SELECT id FROM CreateHome WHERE nameHome = :namehome)");
		query.setParameter("namehome", homeName);
		List<CreateRoom> room = (List<CreateRoom>) query.getResultList();
		return room;
	}
	
}