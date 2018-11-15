package com.smarthome.service;

import com.smarthome.entity.Device;

public interface DeviceService {
	public void addDevice(Device device);
	public Device getDevice(String nameDevice);
}
