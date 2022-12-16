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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
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
                    if (userInfo.getPower().equals("审核人") || userInfo.getPower().equals("其他")) {
                        shujv.setKehu("");
                    }
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
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/getChetou")
    public ResultInfo getChetou() {
        try {
            List<Shujv> getList = shujvService.getChetou();
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
                    if (userInfo.getPower().equals("审核人") || userInfo.getPower().equals("其他")) {
                        shujv.setKehu("");
                    }
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
            List<Shujv> list = shujvService.getListById(shujv.getId());
            shujv.setKehu(list.get(0).getKehu());
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
                for (Shujv shujv : getList) {
                    boolean pd = false;
                    if (shujv.getFujia() != null && !shujv.getFujia().equals("")) {
                        shujv.setHeji(shujv.getZhujia() + "，" + shujv.getFujia());
                    } else {
                        shujv.setHeji(shujv.getZhujia());
                    }
                    shujv.setShoufeizhan(shujv.getRuchang() + "--" + shujv.getChuchang());
                    for (Payroll payroll : list) {
                        if (shujv.getChuchang().equals(payroll.getZhuanghuo()) && shujv.getRuchang().equals(payroll.getXiehuo())) {
                            shujv.setBeizhu(payroll.getPrice());
                            pd = true;
                        }
                    }
                    if (!pd) {
                        shujv.setBeizhu("");
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
     * 图表
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

    /**
     * 上传
     *
     * @return ResultInfo
     */
    @RequestMapping("/driverAdd")
    public ResultInfo driverAdd(MultipartFile[] file1, MultipartFile[] file2, MultipartFile[] file3, MultipartFile[] file4, MultipartFile[] file5, MultipartFile[] file6, MultipartFile[] file7, MultipartFile[] file8, MultipartFile[] file9, MultipartFile[] file10, MultipartFile[] file11, MultipartFile[] file12, MultipartFile[] file13, MultipartFile[] file14, MultipartFile[] file15, MultipartFile[] file16, MultipartFile[] file17, MultipartFile[] file18, MultipartFile[] file19, MultipartFile[] file20, MultipartFile[] file21, String thRiqi, String zhujia, String fujia, String thNum, String xhNum, String chetou, String guache, String niaosu, String shoufeizhan, String bt_licheng, String bc_jiayou, HttpSession session) throws IOException {
        //文件保存路径
        String filePath = "c:/profile/";
        String filePath1 = "";
        String filePath2 = "";
        String filePath3 = "";
        String filePath4 = "";
        String filePath5 = "";
        String filePath6 = "";
        String filePath7 = "";
        String filePath8 = "";
        String filePath9 = "";
        String filePath10 = "";
        String filePath11 = "";
        String filePath12 = "";
        String filePath13 = "";
        String filePath14 = "";
        String filePath15 = "";
        String filePath16 = "";
        String filePath17 = "";
        String filePath18 = "";
        String filePath19 = "";
        String filePath20 = "";
        String filePath21 = "";

        for (int i = 1; i <= 21; i++) {
            Date date = new Date();
            SimpleDateFormat spd = new SimpleDateFormat("yyyyMMddHHmmssSS");
            if (i == 1 && file1 != null) {
                filePath1 = filePath + spd.format(date) + file1[0].getOriginalFilename();
                File dest = new File(filePath1);
                file1[0].transferTo(dest);
            } else if (i == 2 && file2 != null) {
                filePath2 = filePath + spd.format(date) + file2[0].getOriginalFilename();
                File dest = new File(filePath2);
                file2[0].transferTo(dest);
            } else if (i == 3 && file3 != null) {
                filePath3 = filePath + spd.format(date) + file3[0].getOriginalFilename();
                File dest = new File(filePath3);
                file3[0].transferTo(dest);
            } else if (i == 4 && file4 != null) {
                filePath4 = filePath + spd.format(date) + file4[0].getOriginalFilename();
                File dest = new File(filePath4);
                file4[0].transferTo(dest);
            } else if (i == 5 && file5 != null) {
                filePath5 = filePath + spd.format(date) + file5[0].getOriginalFilename();
                File dest = new File(filePath5);
                file5[0].transferTo(dest);
            } else if (i == 6 && file6 != null) {
                filePath6 = filePath + spd.format(date) + file6[0].getOriginalFilename();
                File dest = new File(filePath6);
                file6[0].transferTo(dest);
            } else if (i == 7 && file7 != null) {
                filePath7 = filePath + spd.format(date) + file7[0].getOriginalFilename();
                File dest = new File(filePath7);
                file7[0].transferTo(dest);
            } else if (i == 8 && file8 != null) {
                filePath8 = filePath + spd.format(date) + file8[0].getOriginalFilename();
                File dest = new File(filePath8);
                file8[0].transferTo(dest);
            } else if (i == 9 && file9 != null) {
                filePath9 = filePath + spd.format(date) + file9[0].getOriginalFilename();
                File dest = new File(filePath9);
                file9[0].transferTo(dest);
            } else if (i == 10 && file10 != null) {
                filePath10 = filePath + spd.format(date) + file10[0].getOriginalFilename();
                File dest = new File(filePath10);
                file10[0].transferTo(dest);
            } else if (i == 11 && file11 != null) {
                filePath11 = filePath + spd.format(date) + file11[0].getOriginalFilename();
                File dest = new File(filePath11);
                file11[0].transferTo(dest);
            } else if (i == 12 && file12 != null) {
                filePath12 = filePath + spd.format(date) + file12[0].getOriginalFilename();
                File dest = new File(filePath12);
                file12[0].transferTo(dest);
            } else if (i == 13 && file13 != null) {
                filePath13 = filePath + spd.format(date) + file13[0].getOriginalFilename();
                File dest = new File(filePath13);
                file13[0].transferTo(dest);
            } else if (i == 14 && file14 != null) {
                filePath14 = filePath + spd.format(date) + file14[0].getOriginalFilename();
                File dest = new File(filePath14);
                file14[0].transferTo(dest);
            } else if (i == 15 && file15 != null) {
                filePath15 = filePath + spd.format(date) + file15[0].getOriginalFilename();
                File dest = new File(filePath15);
                file15[0].transferTo(dest);
            } else if (i == 16 && file16 != null) {
                filePath16 = filePath + spd.format(date) + file16[0].getOriginalFilename();
                File dest = new File(filePath16);
                file16[0].transferTo(dest);
            } else if (i == 17 && file17 != null) {
                filePath17 = filePath + spd.format(date) + file17[0].getOriginalFilename();
                File dest = new File(filePath17);
                file17[0].transferTo(dest);
            } else if (i == 18 && file18 != null) {
                filePath18 = filePath + spd.format(date) + file18[0].getOriginalFilename();
                File dest = new File(filePath18);
                file18[0].transferTo(dest);
            } else if (i == 19 && file19 != null) {
                filePath19 = filePath + spd.format(date) + file19[0].getOriginalFilename();
                File dest = new File(filePath19);
                file19[0].transferTo(dest);
            } else if (i == 20 && file20 != null) {
                filePath20 = filePath + spd.format(date) + file20[0].getOriginalFilename();
                File dest = new File(filePath20);
                file20[0].transferTo(dest);
            } else if (i == 21 && file21 != null) {
                filePath21 = filePath + spd.format(date) + file21[0].getOriginalFilename();
                File dest = new File(filePath21);
                file21[0].transferTo(dest);
            }
        }

        //保存到服务器中
        Shujv shujv = new Shujv();
        shujv.setFile1(filePath1);
        shujv.setFile2(filePath2);
        shujv.setFile3(filePath3);
        shujv.setFile4(filePath4);
        shujv.setFile5(filePath5);
        shujv.setFile6(filePath6);
        shujv.setFile7(filePath7);
        shujv.setFile8(filePath8);
        shujv.setFile9(filePath9);
        shujv.setFile10(filePath10);
        shujv.setFile11(filePath11);
        shujv.setFile12(filePath12);
        shujv.setFile13(filePath13);
        shujv.setFile14(filePath14);
        shujv.setFile15(filePath15);
        shujv.setFile16(filePath16);
        shujv.setFile17(filePath17);
        shujv.setFile18(filePath18);
        shujv.setFile19(filePath19);
        shujv.setFile20(filePath20);
        shujv.setFile21(filePath21);

        shujv.setThRiqi(thRiqi);
        shujv.setZhujia(zhujia);
        shujv.setFujia(fujia);
        shujv.setThNum(thNum);
        shujv.setShNum(xhNum);
        shujv.setChetou(chetou);
        shujv.setGuache(guache);
        shujv.setNiaosu(niaosu);
        shujv.setNiaosu(shoufeizhan);
        shujv.setBtLicheng(bt_licheng);
        shujv.setBcJiayou(bc_jiayou);

        shujvService.add(shujv);

        return ResultInfo.success("上传成功", filePath);
    }

    /**
     * 上传
     */
    @RequestMapping("/fileUp")
    public ResultInfo fileUp(String column, int id, MultipartFile[] file, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("数据表") && !powerUtil.isAdd("数据表") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            //获取原始名称
            String fileName = file[0].getOriginalFilename();
            //文件保存路径
            String filePath = "c:/profile/";
            Date date = new Date();
            SimpleDateFormat spd2 = new SimpleDateFormat("yyyyMMddHHmmssSS");
            //文件重命名,防止重复
            filePath = filePath + spd2.format(date) + fileName;
            //文件对象
            File dest = new File(filePath);
            //判断路径是否存在,如果不存在则创建
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdir();
            }
            //保存到服务器中
            file[0].transferTo(dest);
            if (shujvService.fileUp(column, id, filePath)) {
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("数据表");
                log.setContent("上传");
                logService.add(log);
                return ResultInfo.success("上传成功");
            } else {
                return ResultInfo.success("上传失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("上传失败：{}", e.getMessage());
            return ResultInfo.error("上传失败");
        }
    }

    /**
     * 删除
     */
    @RequestMapping("/fileDel")
    public ResultInfo fileDel(String column, int id, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isDelete("数据表") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            if (shujvService.fileDel(column, id)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("数据表");
                log.setContent("删除");
                logService.add(log);
                return ResultInfo.success("删除成功");
            } else {
                return ResultInfo.success("删除失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            return ResultInfo.error("修改失败");
        }
    }
}
