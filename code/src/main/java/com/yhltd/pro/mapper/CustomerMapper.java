package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.Address;
import com.yhltd.pro.entity.Customer;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 10:51
 */
@Mapper
@Repository
public interface CustomerMapper extends BaseMapper<Customer> {
    @Select("select * from customer")
    List<Customer> getList();

    @Select("select * from customer where jiancheng like concat('%',#{value},'%') or pinyin like concat('%',#{value},'%') or quancheng like concat('%',#{value},'%') ")
    List<Customer> queryList(String value);
}
