package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.Shujv;
import com.yhltd.pro.mapper.ShujvMapper;
import com.yhltd.pro.service.ShujvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/30 16:04
 */
@Service
public class ShujvServiceImpl extends ServiceImpl<ShujvMapper, Shujv> implements ShujvService {
    @Autowired
    private ShujvMapper shujvMapper;

    @Override
    public List<Shujv> getList() {
        return shujvMapper.getList();
    }

    @Override
    public List<Shujv> queryList(String ks, String js, String chetou) {
        return shujvMapper.queryList(ks, js, chetou);
    }

    @Override
    public Shujv add(Shujv shujv) {
        return save(shujv) ? shujv : null;
    }

    @Override
    public boolean update(Shujv shujv) {
        return updateById(shujv);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public List<Shujv> getSalary(String ks, String js, String name) {
        return shujvMapper.getSalary(ks, js, name);
    }
}
