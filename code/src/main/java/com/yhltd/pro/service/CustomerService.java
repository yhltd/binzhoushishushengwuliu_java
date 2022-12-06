package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.Address;
import com.yhltd.pro.entity.Customer;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 10:55
 */
@Service
public interface CustomerService extends IService<Customer> {
    List<Customer> getList();

    List<Customer> queryList(String value);

    Customer add(Customer customer);

    boolean update(Customer customer);

    boolean delete(List<Integer> idList);
}
