package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/11/30 13:28
 */
@Data
@TableName("combination")
public class Combination {
    /**
     * id自增列
     */
    @TableId(value = "id", type = IdType.AUTO)
    private int id;
    private String chepai;
    private String guache;
    private String zhujia;
    private String fujia;
    private String phone;
    private String remarks;
    private String type;
}
