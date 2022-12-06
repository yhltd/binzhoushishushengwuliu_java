package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.Shujv;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/30 15:59
 */
@Service
public interface ShujvService extends IService<Shujv> {
    List<Shujv> getList();

    List<Shujv> queryList(String ks,String js,String chetou);

    Shujv add(Shujv shujv);

    boolean update(Shujv shujv);

    boolean delete(List<Integer> idList);

    List<Shujv> getSalary(String ks,String js,String name);
}
