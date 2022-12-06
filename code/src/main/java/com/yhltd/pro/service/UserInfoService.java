package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.UserInfo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author hui
 * @date 2022/11/24 11:39
 */
@Service
public interface UserInfoService extends IService<UserInfo> {
    /**
     * 登陆
     *
     * @param username 用户名
     * @param password 密码
     * @return 转Json后的用户信息
     */
    Map<String, Object> login(String username, String password);

    /**
     * 刷新
     */
    List<UserInfo> getList();

    /**
     * 根据姓名和页面名称查询
     */
    List<UserInfo> queryList(String name);

    /**
     * 新增
     */
    UserInfo add(UserInfo userInfo);

    /**
     * 修改
     */
    boolean upd(UserInfo userInfo);

    /**
     * 批量删除
     */
    boolean delete(List<Integer> idList);

    /**
     * 获取id
     */
    List<UserInfo> getId();

}
