package com.smarthome.dao;

import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.smarthome.entity.Heaters;
import com.smarthome.entity.CreateRoom;

@Repository
public class HeatDaoImpl implements HeatDao{
	@Autowired
	private SessionFactory sessionFactory;
	
	public void addHeat(Heaters heatProject) {
		 Session session = sessionFactory.getCurrentSession();
		 session.saveOrUpdate(heatProject);
	}
	
//	public void updateDevice(Device device) {
//		Session session = sessionFactory.getCurrentSession();
//		session.update(device);
//	}
	
	public CreateRoom getRoom(String roomName) {
		 Session session = sessionFactory.getCurrentSession();
		 Query query = session.createQuery("FROM CreateRoom WHERE roomName = :nameroom");
		 query.setParameter("roomName", roomName);
		 CreateRoom room = (CreateRoom) query.getSingleResult();
		 return room;
	}
}
