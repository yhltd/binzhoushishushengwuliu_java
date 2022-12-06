package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.Address;
import com.yhltd.pro.entity.Combination;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/30 13:51
 */
@Mapper
@Repository
public interface CombinationMapper extends BaseMapper<Combination> {
    @Select("select * from combination")
    List<Combination> getList();

    @Select("select * from combination where (zhujia like concat('%',#{name},'%') or fujia like concat('%',#{name},'%')) and chepai like concat('%',#{chepai},'%')  ")
    List<Combination> queryList(String chepai, String name);
}
