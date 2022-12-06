package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/11/29 10:48
 */
@Data
@TableName("customer")
public class Customer {
    /**
     * id自增列
     */
    @TableId(value = "id", type = IdType.AUTO)
    private int id;
    private String jiancheng;
    private String pinyin;
    private String quancheng;
    private String lianxiren;
    private String phone;
    private String address;
    private String remarks;

}
