package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.Log;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/12/2 12:58
 */
@Mapper
@Repository
public interface LogMapper extends BaseMapper<Log> {
    @Select("select * from log")
    List<Log> getList();

    @Select("select * from log where name like concat('%',#{name},'%') and riqi between #{ks} and #{js}")
    List<Log> queryList(String ks, String js, String name);
}
