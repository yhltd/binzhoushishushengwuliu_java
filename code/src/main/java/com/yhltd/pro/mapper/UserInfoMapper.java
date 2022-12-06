package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/24 11:24
 */
@Mapper
@Repository
public interface UserInfoMapper extends BaseMapper<UserInfo> {
    @Select("select * from user_info")
    List<UserInfo> getList();

    @Select("select * from user_info where `name` like concat('%',#{name},'%')  ")
    List<UserInfo> queryList(String name);

    @Select("select MAX(id) as id from user_info")
    List<UserInfo> getId();
}
