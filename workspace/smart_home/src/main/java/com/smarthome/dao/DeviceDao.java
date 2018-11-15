package com.smarthome.dao;

import com.smarthome.entity.Device;

public interface DeviceDao {
	public void addDevice(Device deviceProject);
	public Device getDevice(String deviceName);
}
