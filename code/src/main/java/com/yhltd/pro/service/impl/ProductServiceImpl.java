package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.Product;
import com.yhltd.pro.mapper.ProductMapper;
import com.yhltd.pro.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 13:03
 */
@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {
    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<Product> getList() {
        return productMapper.getList();
    }

    @Override
    public List<Product> queryList(String value) {
        return productMapper.queryList(value);
    }

    @Override
    public Product add(Product product) {
        return save(product) ? product : null;
    }

    @Override
    public boolean update(Product product) {
        return updateById(product);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
