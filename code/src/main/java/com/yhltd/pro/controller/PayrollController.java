package com.yhltd.pro.controller;

import com.yhltd.pro.entity.Combination;
import com.yhltd.pro.entity.Log;
import com.yhltd.pro.entity.Payroll;
import com.yhltd.pro.entity.UserInfo;
import com.yhltd.pro.service.CombinationService;
import com.yhltd.pro.service.LogService;
import com.yhltd.pro.service.PayrollService;
import com.yhltd.pro.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * @author hui
 * @date 2022/12/5 4:21
 */
@Slf4j
@RestController
@RequestMapping("/payroll")
public class PayrollController {
    @Autowired
    private PayrollService payrollService;
    @Autowired
    private LogService logService;

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("工资配置") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Payroll> getList = payrollService.getList();
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    @RequestMapping("/queryList")
    public ResultInfo queryList(HttpSession session, String value) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("工资配置") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Payroll> getList = payrollService.queryList(value);
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 添加
     */
    @RequestMapping("/add")
    public ResultInfo add(@RequestBody HashMap map, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("车牌组合信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            Payroll payroll = GsonUtil.toEntity(gsonUtil.get("addInfo"), Payroll.class);
            payroll = payrollService.add(payroll);
            if (StringUtils.isNotNull(payroll)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("工资配置");
                log.setContent("新增");
                logService.add(log);

                return ResultInfo.success("添加成功", payroll);
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
        if (!powerUtil.isUpdate("工资配置") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        Payroll payroll = null;
        try {
            payroll = DecodeUtil.decodeToJson(updateJson, Payroll.class);
            if (payrollService.update(payroll)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("工资配置");
                log.setContent("修改");
                logService.add(log);

                return ResultInfo.success("修改成功", payroll);
            } else {
                return ResultInfo.success("修改失败", payroll);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", payroll);
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
        if (!powerUtil.isDelete("车牌组合信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);

        try {
            if (payrollService.delete(idList)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("工资配置");
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





}
