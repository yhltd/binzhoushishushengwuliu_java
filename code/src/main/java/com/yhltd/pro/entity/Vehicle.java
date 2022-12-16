package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/11/29 14:02
 */
@Data
@TableName("vehicle")
public class Vehicle {
    /**
     * id自增列
     */
    @TableId(value = "id", type = IdType.AUTO)
    private int id;
    private String chepai;
    private String cheduiNo;
    private String fileNo;
    private String gouruRiqi;
    private String goumaiJiage;
    private String factory;
    private String gongli;
    private String youhao;
    private String phone;
    private String carType;
    private String carBrand;
    private String carModel;
    private String carColor;
    private String chejiahao;
    private String chegoushuihao;
    private String guochanJinkou;
    private String fadongjihao;
    private String fadongjixinghao;
    private String ranliao;
    private String pailiang;
    private String zhizaochang;
    private String lunjv;
    private String luntaishu;
    private String spec;
    private String tanhuangshu;
    private String zhoujv;
    private String zhoushu;
    private String huoxiangSize;
    private String waikuoSize;
    private String zongzhiliang;
    private String hedingzaizhiliang;
    private String zaike;
    private String qianyin;
    private String jiashishizaike;
    private String shiyongxingzhi;
    private String chuchangRiqi;
    private String dunwei;
    private String zhengshoudunwei;
    private String fazhengRiqi;
    private String yingyunzhenghao;
    private String zigezhenghao;
    private String zigezhengyouxiaoqi;
    private String daoqiRiqi;
    private String erweidaoqiRiqi;
    private String fuwufeibiaozhun;
    private String daiguachefou;
    private String guacheqita;
    private String remarks;
    private String filepath;
    private String filename;

    private String type;

    private String qian;
    private String hou;
    private String chang;
    private String kuan;
    private String gao;
}
