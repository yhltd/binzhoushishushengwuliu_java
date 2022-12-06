package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.Vehicle;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 14:12
 */
@Mapper
@Repository
public interface VehicleMapper extends BaseMapper<Vehicle> {
    @Select("select * from vehicle")
    List<Vehicle> getList();

    @Select("select * from vehicle where chepai like concat('%',#{chepai},'%') ")
    List<Vehicle> queryList(String chepai);

    @Update("update vehicle set filepath =#{filepath} , filename=#{filename} where id=#{id} ")
    boolean fileUp(String filepath, String filename, int id);

    @Select("select * from vehicle where id=#{id} and filepath is not null ")
    List<Vehicle> getListById(int id);
}
