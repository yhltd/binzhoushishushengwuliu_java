package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/11/24 10:50
 */
@Data
@TableName("user_info")
public class UserInfo {
    /**
     * id自增列
     */
    @TableId(value = "id", type = IdType.AUTO)
    private int id;
    private String username;
    @TableField("`password`")
    private String password;
    @TableField("`name`")
    private String name;
    private String power;
    private String state;
}
