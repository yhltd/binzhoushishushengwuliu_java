package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/11/29 18:28
 */
@Data
@TableName("driver_info")
public class Driver {
    /**
     * id自增列
     */
    @TableId(value = "id", type = IdType.AUTO)
    private int id;
    private String no;
    private String name;
    private String sex;
    private String birth;
    private String idNo;
    private String jiashizhenghao;
    private String jiashizhengbianhao;
    private String zhunjiachexing;
    private String chepai;
    private String phone;
    private String address;
    private String filepath;
}
