package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.Address;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/28 17:52
 */
@Mapper
@Repository
public interface AddressMapper extends BaseMapper<Address> {
    @Select("select * from address")
    List<Address> getList();

    @Select("select * from address where (sh_address like concat('%',#{sh},'%') or sh_jx like concat('%',#{sh},'%')) and (sf_address like concat('%',#{sf},'%') or sf_jx like concat('%',#{sf},'%')) ")
    List<Address> queryList(String sh, String sf);

    @Update("update address set ${column} = #{value} where id=#{id}")
    boolean update(String column, int id, String value);
}
