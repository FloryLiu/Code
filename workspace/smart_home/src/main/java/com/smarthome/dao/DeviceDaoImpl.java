package com.smarthome.dao;

import java.util.List;

import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.smarthome.entity.CreateRoom;
import com.smarthome.entity.Device;

@Repository
public class DeviceDaoImpl implements DeviceDao {
		@Autowired
		private SessionFactory sessionFactory;
		
		public void addDevice(Device deviceProject) {
			 Session session = sessionFactory.getCurrentSession();
			 session.save(deviceProject);
		}
		
		public void updateDevice(Device device) {
			Session session = sessionFactory.getCurrentSession();
			session.update(device);
		}
		
		public CreateRoom getRoom(String roomName) {
			 Session session = sessionFactory.getCurrentSession();
			 Query query = session.createQuery("FROM CreateRoom WHERE roomName = :nameroom");
			 query.setParameter("roomName", roomName);
			 CreateRoom room = (CreateRoom) query.getSingleResult();
			 return room;
		}
		
		public Device getDevice(String deviceName) {
			 Session session = sessionFactory.getCurrentSession();
			 Query query = session.createQuery("FROM CreateRoom WHERE deviceName = :namedevice");
			 query.setParameter("deviceName", deviceName);
			 Device device = (Device) query.getSingleResult();
			 return device;
		}
		
		public List<Device> getListDevices(String roomName) {
			Session session = sessionFactory.getCurrentSession();
			Query query = session.createQuery("FROM Device WHERE roomProject = (SELECT id_room FROM CreateRoom WHERE roomName = :nameroom)");
			query.setParameter("nameroom", roomName);
			List<Device> device = (List<Device>) query.getResultList();
			return device;
		}
		
}
