package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.Combination;
import com.yhltd.pro.mapper.CombinationMapper;
import com.yhltd.pro.service.CombinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/30 13:57
 */
@Service
public class CombinationServiceImpl extends ServiceImpl<CombinationMapper, Combination> implements CombinationService {
    @Autowired
    private CombinationMapper combinationMapper;


    @Override
    public List<Combination> getList() {
        return combinationMapper.getList();
    }

    @Override
    public List<Combination> queryList(String chepai, String name) {
        return combinationMapper.queryList(chepai, name);
    }

    @Override
    public Combination add(Combination combination) {
        return save(combination) ? combination : null;
    }

    @Override
    public boolean update(Combination combination) {
        return updateById(combination);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
