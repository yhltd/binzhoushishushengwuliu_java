package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.Log;
import com.yhltd.pro.mapper.LogMapper;
import com.yhltd.pro.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/12/2 13:04
 */
@Service
public class LogServiceImpl extends ServiceImpl<LogMapper, Log> implements LogService {
    @Autowired
    private LogMapper logMapper;


    @Override
    public List<Log> getList() {
        return logMapper.getList();
    }

    @Override
    public List<Log> queryList(String ks, String js, String name) {
        return logMapper.queryList(ks, js, name);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public Log add(Log log) {
        return save(log) ? log : null;
    }
}
