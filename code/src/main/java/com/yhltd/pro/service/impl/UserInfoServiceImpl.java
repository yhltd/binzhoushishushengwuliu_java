package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.UserInfo;
import com.yhltd.pro.entity.UserPower;
import com.yhltd.pro.mapper.UserInfoMapper;
import com.yhltd.pro.mapper.UserPowerMapper;
import com.yhltd.pro.service.UserInfoService;
import com.yhltd.pro.util.GsonUtil;
import com.yhltd.pro.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author hui
 * @date 2022/11/24 11:44
 */
@Service
public class UserInfoServiceImpl extends ServiceImpl<UserInfoMapper, UserInfo> implements UserInfoService {
    @Autowired
    private UserInfoMapper userInfoMapper;
    @Autowired
    private UserPowerMapper userPowerMapper;

    @Override
    public Map<String, Object> login(String username, String password) {
        //条件构造器
        QueryWrapper<UserInfo> queryWrapper = new QueryWrapper<>();
        //账号
        queryWrapper.eq("username", username);
        //密码
        queryWrapper.eq("password", password);
        //获取User
        UserInfo userInfo = this.getOne(queryWrapper);
        //如果不为空
        String data = StringUtils.EMPTY;
        if (StringUtils.isNotNull(userInfo) && userInfo.getState().equals("正常")) {
            //转JSON
            data = GsonUtil.toJson(userInfo);

            List<UserPower> powerList = userPowerMapper.getListById(userInfo.getId());
            Map<String, Object> map = new HashMap<>();
            map.put("token", data);
            map.put("power", powerList);
            return map;
        }
        return null;
    }

    @Override
    public List<UserInfo> getList() {
        return userInfoMapper.getList();
    }

    @Override
    public List<UserInfo> queryList(String name) {
        return userInfoMapper.queryList(name);
    }

    @Override
    public UserInfo add(UserInfo userInfo) {
        return save(userInfo) ? userInfo : null;
    }

    @Override
    public boolean upd(UserInfo userInfo) {
        return updateById(userInfo);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public List<UserInfo> getId() {
        return userInfoMapper.getId();
    }
}
