package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.Product;
import com.yhltd.pro.entity.Shujv;
import lombok.Data;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/30 15:52
 */
@Mapper
@Repository
public interface ShujvMapper extends BaseMapper<Shujv> {
    @Select("select * from shujv")
    List<Shujv> getList();

    @Select("select * from shujv where id=#{id}")
    List<Shujv> getListById(int id);

    @Select("select * from shujv where chetou like concat('%',#{chetou},'%') and xh_riqi between #{ks} and #{js} ")
    List<Shujv> queryList(String ks, String js, String chetou);

    @Select("select * from shujv where (zhujia like concat('%',#{name},'%') or fujia like concat('%',#{name},'%') )and xh_riqi between #{ks} and #{js} ")
    List<Shujv> getSalary(String ks, String js, String name);

    @Select("select chetou from shujv group by chetou ")
    List<Shujv> getChetou();

    @Update("update shujv set ${column} = #{value} where id=#{id}")
    boolean fileUp(String column, int id, String value);

    @Update("update shujv set ${column} = '' where id=#{id}")
    boolean fileDel(String column, int id);
}
