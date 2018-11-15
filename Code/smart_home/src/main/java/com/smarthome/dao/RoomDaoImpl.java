package com.smarthome.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.smarthome.entity.CreateRoom;

@Repository
public class RoomDaoImpl implements RoomDao {
		@Autowired
		private SessionFactory sessionFactory;
		
		public void addRoom(CreateRoom room) {
			 Session session = sessionFactory.getCurrentSession();
			 session.save(room);
		}
		
		public void updateRoom(CreateRoom room) {
			Session session = sessionFactory.getCurrentSession();
			session.update(room);
		}
		
//		public List<Rooms> getListRooms(String name_home) {
//			Session session = sessionFactory.getCurrentSession();
//			Query query = session.createQuery("FROM Rooms WHERE homeId = (SELECT id FROM HomeProject WHERE nameHome = :name)");
//			query.setParameter("name", name_home);
//			List<Rooms> room = (List<Rooms>) query.getResultList();
//			return room;
//		}
//		
//		public Rooms getRoom(String nameRoom) {
//			Session session = sessionFactory.getCurrentSession();
//			Query query = session.createQuery("FROM Rooms WHERE nameRoom =:name");
//			query.setParameter("name", nameRoom);
//			Rooms room = (Rooms) query.getSingleResult();
//			return room;
//		}
//
//		@Override
//		public void saveOrUpdate(Rooms room) {
//			Session session = sessionFactory.getCurrentSession();
//			session.saveOrUpdate(room);
//			
//		}
}
