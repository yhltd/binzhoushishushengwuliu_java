package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.UserPower;
import com.yhltd.pro.mapper.UserPowerMapper;
import com.yhltd.pro.service.UserPowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/24 11:58
 */
@Service
public class UserPowerServiceImpl extends ServiceImpl<UserPowerMapper, UserPower> implements UserPowerService {
    @Autowired
    private UserPowerMapper userPowerMapper;

    @Override
    public List<UserPower> getList() {
        return userPowerMapper.getList();
    }

    @Override
    public List<UserPower> queryList(String name, String viewName) {
        return userPowerMapper.queryList(name, viewName);
    }

    @Override
    public List<UserPower> getListById(int userId) {
        return userPowerMapper.getListById(userId);
    }

    @Override
    public UserPower add(UserPower userPower) {
        return save(userPower) ? userPower : null;
    }

    @Override
    public boolean update(String column, int id, String value) {
        return userPowerMapper.update(column, id, value);
    }

    @Override
    public boolean upd(UserPower userPower) {
        return updateById(userPower);
    }

    @Override
    public boolean deleteById(int userId) {
        return userPowerMapper.deleteById(userId);
    }
}
