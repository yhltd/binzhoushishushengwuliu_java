package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.Payroll;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/12/5 4:05
 */
@Mapper
@Repository
public interface PayrollMapper extends BaseMapper<Payroll> {
    @Select("select * from payroll")
    List<Payroll> getList();

    @Select("select * from payroll where zhuanghuo like concat('%',#{value},'%') or xiehuo like concat('%',#{value},'%') ")
    List<Payroll> queryList(String value);
}
