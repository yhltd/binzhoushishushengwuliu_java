package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/11/24 10:53
 */
@Data
@TableName("user_power")
public class UserPower {
    /**
     * id自增列
     */
    @TableId(value = "id", type = IdType.AUTO)
    private int id;
    private int userId;
    @TableField("`add`")
    private String add;
    private String del;
    private String upd;
    private String sel;
    private String viewName;

    @TableField("`name`")
    private String username;
    private String name;
    private String power;

}
