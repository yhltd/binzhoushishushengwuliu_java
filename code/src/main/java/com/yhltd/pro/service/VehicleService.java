package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.Vehicle;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 14:15
 */
@Service
public interface VehicleService extends IService<Vehicle> {
    List<Vehicle> getList();

    List<Vehicle> queryList(String chepai);

    Vehicle add(Vehicle vehicle);

    boolean update(Vehicle vehicle);

    boolean delete(List<Integer> idList);

    boolean fileUp(String filepath,String filename, int id);

    List<Vehicle> getListById(int id);
}
