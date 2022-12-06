package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.FileTable;
import com.yhltd.pro.mapper.FileTableMapper;
import com.yhltd.pro.service.FileTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/12/1 17:32
 */
@Service
public class FileTableServiceImpl extends ServiceImpl<FileTableMapper, FileTable> implements FileTableService {
    @Autowired
    private FileTableMapper fileTableMapper;


    @Override
    public List<FileTable> getList(int id, String type) {
        return fileTableMapper.getList(id, type);
    }

    @Override
    public FileTable add(FileTable fileTable) {
        return save(fileTable) ? fileTable : null;
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
