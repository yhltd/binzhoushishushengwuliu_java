package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.Driver;
import com.yhltd.pro.mapper.DriverMapper;
import com.yhltd.pro.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 18:41
 */
@Service
public class DriverServiceImpl extends ServiceImpl<DriverMapper, Driver> implements DriverService {
    @Autowired
    private DriverMapper driverMapper;

    @Override
    public List<Driver> getList() {
        return driverMapper.getList();
    }

    @Override
    public List<Driver> queryList(String name, String chepai) {
        return driverMapper.queryList(name, chepai);
    }

    @Override
    public Driver add(Driver driver) {
        return save(driver) ? driver : null;
    }

    @Override
    public boolean update(Driver driver) {
        return updateById(driver);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public boolean fileUp(String filepath, int id) {
        return driverMapper.fileUp(filepath, id);
    }

    @Override
    public List<Driver> getListById(int id) {
        return driverMapper.getListById(id);
    }
}
