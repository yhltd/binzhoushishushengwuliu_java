package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.Driver;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 18:38
 */
@Service
public interface DriverService extends IService<Driver> {
    List<Driver> getList();

    List<Driver> queryList(String name, String chepai);

    Driver add(Driver driver);

    boolean update(Driver driver);

    boolean delete(List<Integer> idList);

    boolean fileUp(String filepath, int id);

    List<Driver> getListById(int id);

    List<Driver> getName();

    List<Driver> getChepai();
}
