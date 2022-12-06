package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.Address;
import com.yhltd.pro.mapper.AddressMapper;
import com.yhltd.pro.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 9:27
 */
@Service
public class AddressServiceImpl extends ServiceImpl<AddressMapper, Address> implements AddressService {
    @Autowired
    private AddressMapper addressMapper;

    @Override
    public List<Address> getList() {
        return addressMapper.getList();
    }

    @Override
    public List<Address> queryList(String sh, String sf) {
        return addressMapper.queryList(sh, sf);
    }

    @Override
    public Address add(Address address) {
        return save(address) ? address : null;
    }

    @Override
    public boolean update(String column, int id, String value) {
        return addressMapper.update(column, id, value);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
