package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.Vehicle;
import com.yhltd.pro.mapper.VehicleMapper;
import com.yhltd.pro.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 14:19
 */
@Service
public class VehicleServiceImpl extends ServiceImpl<VehicleMapper, Vehicle> implements VehicleService {
    @Autowired
    private VehicleMapper vehicleMapper;

    @Override
    public List<Vehicle> getList() {
        return vehicleMapper.getList();
    }

    @Override
    public List<Vehicle> queryList(String chepai) {
        return vehicleMapper.queryList(chepai);
    }

    @Override
    public Vehicle add(Vehicle vehicle) {
        return save(vehicle) ? vehicle : null;
    }

    @Override
    public boolean update(Vehicle vehicle) {
        return updateById(vehicle);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public boolean fileUp(String filepath, String filename, int id) {
        return vehicleMapper.fileUp(filepath, filename, id);
    }

    @Override
    public List<Vehicle> getListById(int id) {
        return vehicleMapper.getListById(id);
    }


}
