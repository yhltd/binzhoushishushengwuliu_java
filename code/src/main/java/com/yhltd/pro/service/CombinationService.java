package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.Combination;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/30 13:54
 */
@Service
public interface CombinationService extends IService<Combination> {
    List<Combination> getList();

    List<Combination> queryList(String chepai, String name);

    Combination add(Combination combination);

    boolean update(Combination combination);

    boolean delete(List<Integer> idList);

    List<Combination> getZhujia();

    List<Combination> getFujia();
}
