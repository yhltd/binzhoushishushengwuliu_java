package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.Driver;
import com.yhltd.pro.entity.Vehicle;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 18:34
 */
@Mapper
@Repository
public interface DriverMapper extends BaseMapper<Driver> {
    @Select("select * from driver_info")
    List<Driver> getList();

    @Select("select * from driver_info where `name` like concat('%',#{name},'%') and chepai like concat('%',#{chepai},'%') ")
    List<Driver> queryList(String name, String chepai);

    @Update("update driver_info set filepath =#{filepath} where id=#{id} ")
    boolean fileUp(String filepath, int id);

    @Select("select * from driver_info where id=#{id} and filepath is not null ")
    List<Driver> getListById(int id);
}
