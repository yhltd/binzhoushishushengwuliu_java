package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.Address;
import com.yhltd.pro.entity.Customer;
import com.yhltd.pro.mapper.CustomerMapper;
import com.yhltd.pro.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 10:57
 */
@Service
public class CustomerServiceImpl extends ServiceImpl<CustomerMapper, Customer> implements CustomerService {
    @Autowired
    private CustomerMapper customerMapper;

    @Override
    public List<Customer> getList() {
        return customerMapper.getList();
    }

    @Override
    public List<Customer> queryList(String value) {
        return customerMapper.queryList(value);
    }

    @Override
    public Customer add(Customer customer) {
        return save(customer) ? customer : null;
    }

    @Override
    public boolean update(Customer customer) {
        return updateById(customer);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
