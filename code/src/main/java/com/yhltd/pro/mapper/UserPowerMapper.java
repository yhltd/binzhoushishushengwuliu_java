package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.UserPower;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/24 11:28
 */
@Mapper
@Repository
public interface UserPowerMapper extends BaseMapper<UserPower> {
    @Select("select up.id,user_id,username,`name`,power,view_name,`add`,del,upd,sel from user_info ui left join user_power up  on up.user_id=ui.id where power!='管理员' ")
    List<UserPower> getList();

    @Select("select up.id,user_id,username,`name`,power,view_name,`add`,del,upd,sel from user_info ui left join user_power up  on up.user_id=ui.id where power!='管理员' and name like '%'+#{name}+'%' and view_name like '%'+#{viewName}+'%'  ")
    List<UserPower> queryList(String name, String viewName);

    @Select("select * from user_power where user_id=#{userId} ")
    List<UserPower> getListById(int userId);

    @Update("update user_power set ${column} = #{value} where id=#{id}")
    boolean update(String column, int id, String value);

    @Delete("delete from user_power where user_id=#{userId}")
    boolean deleteById(int userId);
}
