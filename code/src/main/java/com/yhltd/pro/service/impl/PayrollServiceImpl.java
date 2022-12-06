package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.Payroll;
import com.yhltd.pro.mapper.PayrollMapper;
import com.yhltd.pro.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/12/5 4:17
 */
@Service
public class PayrollServiceImpl extends ServiceImpl<PayrollMapper, Payroll> implements PayrollService {
    @Autowired
    PayrollMapper payrollMapper;

    @Override
    public List<Payroll> getList() {
        return payrollMapper.getList();
    }

    @Override
    public List<Payroll> queryList(String value) {
        return payrollMapper.queryList(value);
    }

    @Override
    public Payroll add(Payroll payroll) {
        return save(payroll) ? payroll : null;
    }

    @Override
    public boolean update(Payroll payroll) {
        return updateById(payroll);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
