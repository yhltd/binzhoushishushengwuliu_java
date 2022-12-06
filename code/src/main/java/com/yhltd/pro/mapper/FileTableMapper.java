package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.FileTable;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/12/1 17:28
 */
@Mapper
@Repository
public interface FileTableMapper extends BaseMapper<FileTable> {
    @Select("select * from filetable where other_id=#{id} and type=#{type}")
    List<FileTable> getList(int id, String type);
}
