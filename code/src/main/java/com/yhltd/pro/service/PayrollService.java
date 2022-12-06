package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.Payroll;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/12/5 4:08
 */
@Service
public interface PayrollService extends IService<Payroll> {
    List<Payroll> getList();

    List<Payroll> queryList(String value);

    Payroll add(Payroll payroll);

    boolean update(Payroll payroll);

    boolean delete(List<Integer> idList);
}
