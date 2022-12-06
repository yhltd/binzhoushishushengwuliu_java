package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.Address;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 9:24
 */
@Service
public interface AddressService extends IService<Address> {
    List<Address> getList();

    List<Address> queryList(String sh,String sf);

    Address add(Address address);

    boolean update(String column, int id, String value);

    boolean delete(List<Integer> idList);
}
