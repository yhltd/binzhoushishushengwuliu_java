package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.UserPower;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/24 11:52
 */
@Service
public interface UserPowerService extends IService<UserPower> {
    /**
     * 刷新
     */
    List<UserPower> getList();

    /**
     * 根据姓名和页面名称查询
     */
    List<UserPower> queryList(String name, String viewName);


    List<UserPower> getListById(int userId);

    /**
     * 新增
     **/
    UserPower add(UserPower userPower);

    /**
     * 修改
     */
    boolean update(String column, int id, String value);

    /**
     * 修改
     */
    boolean upd(UserPower userPower);

    /**
     * 删除
     */
    boolean deleteById(int userId);
}
