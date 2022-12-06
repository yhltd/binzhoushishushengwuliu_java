package com.yhltd.pro.controller;

import com.yhltd.pro.entity.Log;
import com.yhltd.pro.entity.Payroll;
import com.yhltd.pro.entity.Shujv;
import com.yhltd.pro.entity.UserInfo;
import com.yhltd.pro.service.LogService;
import com.yhltd.pro.service.PayrollService;
import com.yhltd.pro.service.ShujvService;
import com.yhltd.pro.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * @author hui
 * @date 2022/11/30 16:18
 */
@Slf4j
@RestController
@RequestMapping("/shujv")
public class ShujvController {
    @Autowired
    private ShujvService shujvService;
    @Autowired
    private LogService logService;
    @Autowired
    private PayrollService payrollService;

    /**
     * 刷新
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("数据表") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }
        DecimalFormat df = new DecimalFormat("0.00");

        try {
            List<Shujv> getList = shujvService.getList();
            if (getList != null) {
                for (Shujv shujv : getList) {
                    shujv.setHeji(zhuanhuan(shujv.getBangfei()) + zhuanhuan(shujv.getXianjin()) + zhuanhuan(shujv.getXiulifei()) + zhuanhuan(shujv.getXiche()) + zhuanhuan(shujv.getJiashui()) + zhuanhuan(shujv.getChefei()) + zhuanhuan(shujv.getTingche()) + zhuanhuan(shujv.getZhusu()) + zhuanhuan(shujv.getZafei()) + zhuanhuan(shujv.getShenghuofei()) + zhuanhuan(shujv.getJiaojingfakuan()) + "");
                    if (zhuanhuan(shujv.getBtLicheng()) != 0) {
                        shujv.setYouhao(df.format(zhuanhuan(shujv.getBcJiayou()) / zhuanhuan(shujv.getBtLicheng()) * 100));
                    }
                    if (zhuanhuan(shujv.getYouhao()) != 0) {
                        shujv.setXingshilicheng(df.format(zhuanhuan(shujv.getBtLicheng()) / zhuanhuan(shujv.getBcJiayou())));
                    }
                }
            }
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误！");
        }
    }

    public double zhuanhuan(String str) {
        if (str == null || str.equals("")) {
            return 0;
        } else {
            return Double.parseDouble(str);
        }
    }

    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/queryList")
    public ResultInfo queryList(String ks, String js, String chetou, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("数据表") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }
        DecimalFormat df = new DecimalFormat("0.00");
        try {
            List<Shujv> getList = shujvService.queryList(ks, js, chetou);
            if (getList != null) {
                for (Shujv shujv : getList) {
                    shujv.setHeji(zhuanhuan(shujv.getBangfei()) + zhuanhuan(shujv.getXianjin()) + zhuanhuan(shujv.getXiulifei()) + zhuanhuan(shujv.getXiche()) + zhuanhuan(shujv.getJiashui()) + zhuanhuan(shujv.getChefei()) + zhuanhuan(shujv.getTingche()) + zhuanhuan(shujv.getZhusu()) + zhuanhuan(shujv.getZafei()) + zhuanhuan(shujv.getShenghuofei()) + zhuanhuan(shujv.getJiaojingfakuan()) + "");
                    if (zhuanhuan(shujv.getBtLicheng()) != 0) {
                        shujv.setYouhao(df.format(zhuanhuan(shujv.getBcJiayou()) / zhuanhuan(shujv.getBtLicheng()) * 100));
                    }
                    if (zhuanhuan(shujv.getYouhao()) != 0) {
                        shujv.setXingshilicheng(df.format(zhuanhuan(shujv.getBtLicheng()) / zhuanhuan(shujv.getBcJiayou())));
                    }
                }
            }
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误！");
        }
    }

    /**
     * 添加
     */
    @RequestMapping("/add")
    public ResultInfo add(@RequestBody HashMap map, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("数据表") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            Shujv shujv = GsonUtil.toEntity(gsonUtil.get("addInfo"), Shujv.class);
            shujv = shujvService.add(shujv);
            if (StringUtils.isNotNull(shujv)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("数据表");
                log.setContent("新增");
                logService.add(log);
                return ResultInfo.success("添加成功", shujv);
            } else {
                return ResultInfo.success("添加失败", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            log.error("参数：{}", map);
            return ResultInfo.error("添加失败");
        }
    }

    /**
     * 修改
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResultInfo update(@RequestBody String updateJson, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("数据表") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        Shujv shujv = null;
        try {
            shujv = DecodeUtil.decodeToJson(updateJson, Shujv.class);
            if (shujvService.update(shujv)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("数据表");
                log.setContent("修改");
                logService.add(log);
                return ResultInfo.success("修改成功", shujv);
            } else {
                return ResultInfo.success("修改失败", shujv);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", shujv);
            return ResultInfo.error("修改失败");
        }
    }


    /**
     * 删除
     *
     * @return ResultInfo
     */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isDelete("数据表") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);

        try {
            if (shujvService.delete(idList)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("数据表");
                log.setContent("删除");
                logService.add(log);
                return ResultInfo.success("删除成功", idList);
            } else {
                return ResultInfo.success("删除失败", idList);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("删除失败：{}", e.getMessage());
            log.error("参数：{}", idList);
            return ResultInfo.error("删除失败");
        }
    }

    /**
     * 工资
     *
     * @return ResultInfo
     */
    @RequestMapping("/getSalary")
    public ResultInfo getSalary(HttpSession session, String ks, String js, String name) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("数据表") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }
        DecimalFormat df = new DecimalFormat("0.00");

        if (ks.equals("")) {
            ks = "1900-01-01";
        }
        if (js.equals("")) {
            js = "2200-01-01";
        }
        try {
            List<Shujv> getList = shujvService.getSalary(ks, js, name);
            if (getList != null) {
                List<Payroll> list = payrollService.getList();
                for (int i = 0; i < getList.size(); i++) {
                    boolean pd = false;
                    for (int j = 0; j < list.size(); j++) {
                        if (getList.get(i).getChuchang().equals(list.get(j).getZhuanghuo()) && getList.get(i).getRuchang().equals(list.get(j).getXiehuo())) {
                            getList.get(i).setBeizhu(list.get(j).getPrice());
                            pd = true;
                        }
                    }
                    if (!pd) {
                        getList.get(i).setBeizhu("");
                    }
                }
            }
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误！");
        }
    }

    /**
     * 工资
     *
     * @return ResultInfo
     */
    @RequestMapping("/getTubiao")
    public ResultInfo getTubiao(HttpSession session, String ks, String js, String chepai) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("图表生成") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }
        DecimalFormat df = new DecimalFormat("0.00");

        if (ks.equals("")) {
            ks = "1900-01-01";
        }
        if (js.equals("")) {
            js = "2200-01-01";
        }
        try {
            List<Shujv> list = new ArrayList<>();
            List<Shujv> getList = shujvService.queryList(ks, js, chepai);
            if (getList != null) {
                Shujv shujv = new Shujv();
                for (int i = 0; i < getList.size(); i++) {
                    shujv.setLicheng(zhuanhuan(getList.get(i).getLicheng()) + zhuanhuan(shujv.getLicheng()) + "");
                    shujv.setBcJiayou(zhuanhuan(getList.get(i).getBcJiayou()) + zhuanhuan(shujv.getBcJiayou()) + "");
                }
                list.add(shujv);
            } else {
                Shujv shujv = new Shujv();
                shujv.setLicheng("0");
                shujv.setBcJiayou("0");
                list.add(shujv);
            }
            return ResultInfo.success("获取成功", list);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误！");
        }
    }

}
