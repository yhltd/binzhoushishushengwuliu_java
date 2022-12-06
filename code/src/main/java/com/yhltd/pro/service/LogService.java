package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.Log;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/12/2 13:02
 */
@Service
public interface LogService extends IService<Log> {
    List<Log> getList();

    List<Log> queryList(String ks, String js, String name);

    boolean delete(List<Integer> idList);

    Log add(Log log);
}
