package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/11/30 15:44
 */
@Data
@TableName("shujv")
public class Shujv {
    /**
     * id自增列
     */
    @TableId(value = "id", type = IdType.AUTO)
    private int id;
    private String thRiqi;
    private String xhRiqi;
    private String chetou;
    private String guache;
    private String zhujia;
    private String fujia;
    private String phone;
    private String kehu;
    private String chuchang;
    private String ruchang;
    private String item;
    private String thNum;
    private String shNum;
    private String licheng;
    private String btLicheng;
    private String bcJiayou;
    private String youhao;
    private String xingshilicheng;
    private String baidunyouhao;
    private String niaosu;
    private String bangfei;
    private String etc;
    private String xianjin;
    private String xiulifei;
    private String xiche;
    private String jiashui;
    private String chefei;
    private String tingche;
    private String zhusu;
    private String zafei;
    private String shenghuofei;
    private String yunfei;
    private String jiaojingfakuan;
    private String shoufeizhan;
    private String beizhu;
    private String heji;

    private String file1;
    private String file2;
    private String file3;
    private String file4;
    private String file5;
    private String file6;
    private String file7;
    private String file8;
    private String file9;
    private String file10;
    private String file11;
    private String file12;
    private String file13;
    private String file14;
    private String file15;
    private String file16;
    private String file17;
    private String file18;
    private String file19;
    private String file20;
    private String file21;
}
