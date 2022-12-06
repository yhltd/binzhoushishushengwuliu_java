package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.Customer;
import com.yhltd.pro.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 12:57
 */
@Mapper
@Repository
public interface ProductMapper extends BaseMapper<Product> {
    @Select("select * from product_info")
    List<Product> getList();

    @Select("select * from product_info where product like concat('%',#{value},'%') or pinyin like concat('%',#{value},'%') ")
    List<Product> queryList(String value);
}
