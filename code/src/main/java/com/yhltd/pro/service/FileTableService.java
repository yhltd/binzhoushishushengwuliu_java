package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.FileTable;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

/**
 * @author hui
 * @date 2022/12/1 17:30
 */
@Service
public interface FileTableService extends IService<FileTable> {
    List<FileTable> getList(int id,String type);

    FileTable add(FileTable fileTable);

    boolean delete(List<Integer> idList);
}
