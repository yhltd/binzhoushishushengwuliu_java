package com.yhltd.pro.controller;

import com.yhltd.pro.entity.Customer;
import com.yhltd.pro.entity.Log;
import com.yhltd.pro.entity.Product;
import com.yhltd.pro.entity.UserInfo;
import com.yhltd.pro.service.LogService;
import com.yhltd.pro.service.ProductService;
import com.yhltd.pro.util.*;
import lombok.AllArgsConstructor;
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
 * @date 2022/11/29 13:16
 */
@Slf4j
@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;
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
        if (!powerUtil.isSelect("产品信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }

        try {
            List<Product> getList = productService.getList();
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
    @RequestMapping("/getProduct")
    public ResultInfo getProduct() {
        try {
            List<Product> getList = productService.getList();
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
        if (!powerUtil.isSelect("产品信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }

        try {
            List<Product> getList = productService.queryList(value);
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
        if (!powerUtil.isAdd("产品信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            Product product = GsonUtil.toEntity(gsonUtil.get("addInfo"), Product.class);
            product = productService.add(product);
            if (StringUtils.isNotNull(product)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("产品信息");
                log.setContent("新增");
                logService.add(log);
                return ResultInfo.success("添加成功", product);
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
        if (!powerUtil.isUpdate("产品信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        Product product = null;
        try {
            product = DecodeUtil.decodeToJson(updateJson, Product.class);
            if (productService.update(product)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("产品信息");
                log.setContent("修改");
                logService.add(log);

                return ResultInfo.success("修改成功", product);
            } else {
                return ResultInfo.success("修改失败", product);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", product);
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
        if (!powerUtil.isDelete("产品信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);

        try {
            if (productService.delete(idList)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("产品信息");
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
