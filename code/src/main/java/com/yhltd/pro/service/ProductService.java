package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 13:00
 */
@Service
public interface ProductService extends IService<Product> {
    List<Product> getList();

    List<Product> queryList(String value);

    Product add(Product product);

    boolean update(Product product);

    boolean delete(List<Integer> idList);
}
