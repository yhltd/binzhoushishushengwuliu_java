package com.yhltd.pro.controller;

import com.yhltd.pro.entity.Log;
import com.yhltd.pro.entity.UserInfo;
import com.yhltd.pro.entity.UserPower;
import com.yhltd.pro.service.LogService;
import com.yhltd.pro.service.UserInfoService;
import com.yhltd.pro.service.UserPowerService;
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
import java.util.Map;

/**
 * @author hui
 * @date 2022/11/24 12:01
 */
@Slf4j
@RestController
@RequestMapping("/user")
public class UserInfoController {
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private UserPowerService userPowerService;
    @Autowired
    private LogService logService;

    @RequestMapping("/login")
    public ResultInfo login(HttpSession session, String username, String password) {
        try {
            //获取user
            Map<String, Object> map = userInfoService.login(username, password);

            //为Null则查询不到
            if (StringUtils.isEmpty(map)) {
                SessionUtil.remove(session, "token");
                SessionUtil.remove(session, "power");
                return ResultInfo.error(-1, "用户名密码错误或账号已被禁用！");
            } else {
                SessionUtil.setToken(session, map.get("token").toString());
                SessionUtil.setPower(session, StringUtils.cast(map.get("power")));

                UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);

                return ResultInfo.success("登陆成功", userInfo);
            }
        } catch (Exception e) {
            log.error("登陆失败：{}", e.getMessage());
            log.error("参数：{}", username);
            log.error("参数：{}", password);
            return ResultInfo.error("错误！");
        }
    }

    /**
     * 刷新
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("用户管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }

        try {
            List<UserInfo> getList = userInfoService.getList();
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
    @RequestMapping("/getPower")
    public ResultInfo getPower(int id, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("用户管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }

        try {
            List<UserPower> getList = userPowerService.getListById(id);
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
    @RequestMapping("/getPower2")
    public ResultInfo getPower2(int id, HttpSession session) {
        try {
            List<UserPower> getList = userPowerService.getListById(id);
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误！");
        }
    }

    /**
     * 修改权限
     */
    @RequestMapping("/upd")
    public ResultInfo upd(int id, int userId, String add, String del, String upd, String sel, String viewName, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("用户管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        UserPower userPower = new UserPower();
        userPower.setId(id);
        userPower.setUserId(userId);
        userPower.setViewName(viewName);
        userPower.setAdd(add);
        userPower.setDel(del);
        userPower.setUpd(upd);
        userPower.setSel(sel);

        try {
            if (userPowerService.upd(userPower)) {
                return ResultInfo.success("修改成功", userPower);
            } else {
                return ResultInfo.success("修改失败", userPower);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", userPower);
            return ResultInfo.error("修改失败");
        }
    }


    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/queryList")
    public ResultInfo queryList(String name, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("用户管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }

        try {
            List<UserInfo> getList = userInfoService.queryList(name);
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
        if (!powerUtil.isAdd("用户管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            UserInfo ui = GsonUtil.toEntity(gsonUtil.get("addInfo"), UserInfo.class);
            ui = userInfoService.add(ui);
            if (StringUtils.isNotNull(ui)) {
                List<UserInfo> getId = userInfoService.getId();

                for (int i = 0; i < 14; i++) {
                    UserPower userPower = new UserPower();
                    userPower.setUserId(getId.get(0).getId());
                    userPower.setAdd("");
                    userPower.setDel("");
                    userPower.setUpd("");
                    if (ui.getPower().equals("审核人")) {
                        userPower.setSel("√");
                    } else {
                        userPower.setSel("");
                    }

                    if (i == 0) {
                        userPower.setViewName("送货地址");
                    } else if (i == 1) {
                        userPower.setViewName("客户信息");
                    } else if (i == 2) {
                        userPower.setViewName("产品信息");
                    } else if (i == 3) {
                        userPower.setViewName("挂车信息");
                    } else if (i == 4) {
                        userPower.setViewName("车辆管理信息");
                    } else if (i == 5) {
                        userPower.setViewName("司机信息");
                    } else if (i == 6) {
                        userPower.setViewName("车牌组合信息");
                    } else if (i == 7) {
                        userPower.setViewName("数据表");
                    } else if (i == 8) {
                        userPower.setViewName("司机录入");
                    } else if (i == 9) {
                        userPower.setViewName("工资查询");
                    } else if (i == 10) {
                        userPower.setViewName("图表生成");
                    } else if (i == 11) {
                        userPower.setViewName("用户管理");
                    } else if (i == 12) {
                        userPower.setViewName("操作日志");
                    } else {
                        userPower.setViewName("工资配置");
                    }
                    userPowerService.add(userPower);
                }
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("用户管理");
                log.setContent("新增");
                logService.add(log);
                return ResultInfo.success("添加成功", ui);
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
        if (!powerUtil.isUpdate("用户管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        UserInfo ui = null;
        try {
            ui = DecodeUtil.decodeToJson(updateJson, UserInfo.class);
            if (userInfoService.upd(ui)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("用户管理");
                log.setContent("修改");
                logService.add(log);
                return ResultInfo.success("修改成功", ui);
            } else {
                return ResultInfo.success("修改失败", ui);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", userInfo);
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
        if (!powerUtil.isDelete("用户管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);

        try {
            for (Integer userId : idList) {
                userPowerService.deleteById(userId);
            }
            if (userInfoService.delete(idList)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("用户管理");
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
