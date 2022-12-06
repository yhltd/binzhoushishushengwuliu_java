package com.yhltd.pro.controller;

import com.yhltd.pro.entity.Customer;
import com.yhltd.pro.entity.Log;
import com.yhltd.pro.entity.UserInfo;
import com.yhltd.pro.service.CustomerService;
import com.yhltd.pro.service.LogService;
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
 * @date 2022/11/29 11:01
 */
@Slf4j
@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;
    @Autowired
    private LogService logService;

    /**
     * 刷新
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("客户信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }

        try {
            List<Customer> getList = customerService.getList();
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误！");
        }
    }

    /**
     * 刷新
     *
     * @return ResultInfo
     */
    @RequestMapping("/getKehu")
    public ResultInfo getKehu() {
        try {
            List<Customer> getList = customerService.getList();
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误！");
        }
    }

    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/queryList")
    public ResultInfo queryList(String value, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("客户信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }

        try {
            List<Customer> getList = customerService.queryList(value);
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
        if (!powerUtil.isAdd("客户信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            Customer customer = GsonUtil.toEntity(gsonUtil.get("addInfo"), Customer.class);
            customer = customerService.add(customer);
            if (StringUtils.isNotNull(customer)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("客户信息");
                log.setContent("新增");
                logService.add(log);

                return ResultInfo.success("添加成功", customer);
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
    public ResultInfo update(@RequestBody String updateJson,HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("客户信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        Customer customer = null;
        try {
            customer = DecodeUtil.decodeToJson(updateJson, Customer.class);
            if (customerService.update(customer)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("客户信息");
                log.setContent("修改");
                logService.add(log);

                return ResultInfo.success("修改成功", customer);
            } else {
                return ResultInfo.success("修改失败", customer);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", customer);
            return ResultInfo.error("修改失败");
        }
    }


    /**
     * 删除
     * @return ResultInfo
     */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map,HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isDelete("客户信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);

        try {
            if (customerService.delete(idList)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("客户信息");
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
