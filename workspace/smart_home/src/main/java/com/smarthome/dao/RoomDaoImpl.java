package com.smarthome.dao;

import java.util.List;

import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.smarthome.entity.Air;
import com.smarthome.entity.CreateRoom;
import com.smarthome.entity.Device;
import com.smarthome.entity.Fridge;
import com.smarthome.entity.Heaters;
import com.smarthome.entity.Light;

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
		public List<Device> getListDevices(String nameRoom) {
			Session session = sessionFactory.getCurrentSession();
			Query query = session.createQuery("FROM Device WHERE roomId = (SELECT id FROM RoomProject WHERE nameRoom = :name)");
			query.setParameter("name_room", nameRoom);
			List<Device> device = (List<Device>) query.getResultList();
			return device;
		}
//		
		public CreateRoom getRoom(String nameRoom) {
			Session session = sessionFactory.getCurrentSession();
			Query query = session.createQuery("FROM CreateRoom WHERE nameRoom =:name");
			query.setParameter("name", nameRoom);
			CreateRoom room = (CreateRoom) query.getSingleResult();
			return room;
		}
		
//		public CreateRoom getRoom1(String id) {
//			Session session = sessionFactory.getCurrentSession();
//			Query query = session.createQuery("FROM CreateRoom WHERE id =:id");
//			query.setParameter("name", id);
//			CreateRoom room = (CreateRoom) query.getSingleResult();
//			return room;
//		}
		
		public List<Light> getListLights(String roomname) {
			Session session = sessionFactory.getCurrentSession();
			Query query = session.createQuery("FROM Light WHERE roomProject = (SELECT id FROM CreateRoom WHERE nameRoom = :name)");
			query.setParameter("name", roomname);
			List<Light> light = (List<Light>) query.getResultList();
			return light;
		}
		public List<Fridge> getListFridges(String roomname) {
			Session session = sessionFactory.getCurrentSession();
			Query query = session.createQuery("FROM Fridge WHERE roomProject = (SELECT id FROM CreateRoom WHERE nameRoom = :name)");
			query.setParameter("name", roomname);
			List<Fridge> fridge = (List<Fridge>) query.getResultList();
			return fridge;
		}
		public List<Air> getListAirs(String roomname) {
			Session session = sessionFactory.getCurrentSession();
			Query query = session.createQuery("FROM Air WHERE roomProject = (SELECT id FROM CreateRoom WHERE nameRoom = :name)");
			query.setParameter("name", roomname);
			List<Air> air = (List<Air>) query.getResultList();
			return air;
		}
		public List<Heaters> getListHeats(String roomname) {
			Session session = sessionFactory.getCurrentSession();
			Query query = session.createQuery("FROM Heaters WHERE roomProject = (SELECT id FROM CreateRoom WHERE nameRoom = :name)");
			query.setParameter("name", roomname);
			List<Heaters> heat = (List<Heaters>) query.getResultList();
			return heat;
		}
//
//		@Override
//		public void saveOrUpdate(Rooms room) {
//			Session session = sessionFactory.getCurrentSession();
//			session.saveOrUpdate(room);
//			
//		}
}
