package com.yhltd.pro.controller;

import com.yhltd.pro.entity.Log;
import com.yhltd.pro.entity.UserInfo;
import com.yhltd.pro.entity.Vehicle;
import com.yhltd.pro.service.LogService;
import com.yhltd.pro.service.VehicleService;
import com.yhltd.pro.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * @author hui
 * @date 2022/11/29 14:28
 */
@Slf4j
@RestController
@RequestMapping("/vehicle")
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;
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
        if (!powerUtil.isSelect("车辆管理信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }

        try {
            List<Vehicle> getList = vehicleService.getList();
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
    @RequestMapping("/getVehicle")
    public ResultInfo getVehicle() {
        try {
            List<Vehicle> getList = vehicleService.getList();
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
    public ResultInfo queryList(String chepai, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("车辆管理信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限！");
        }

        try {
            List<Vehicle> getList = vehicleService.queryList(chepai);
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
        if (!powerUtil.isAdd("车辆管理信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            Vehicle vehicle = GsonUtil.toEntity(gsonUtil.get("addInfo"), Vehicle.class);
            vehicle = vehicleService.add(vehicle);
            if (StringUtils.isNotNull(vehicle)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("车辆管理信息");
                log.setContent("新增");
                logService.add(log);
                return ResultInfo.success("添加成功", vehicle);
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
        if (!powerUtil.isUpdate("车辆管理信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        Vehicle vehicle = null;
        try {
            vehicle = DecodeUtil.decodeToJson(updateJson, Vehicle.class);
            if (vehicleService.update(vehicle)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("车辆管理信息");
                log.setContent("修改");
                logService.add(log);
                return ResultInfo.success("修改成功", vehicle);
            } else {
                return ResultInfo.success("修改失败", vehicle);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", vehicle);
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
        if (!powerUtil.isDelete("车辆管理信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);

        try {
            if (vehicleService.delete(idList)) {
                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("车辆管理信息");
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
     * 上传
     *
     * @return ResultInfo
     */
    @RequestMapping("/upload")
    public ResultInfo upload(MultipartFile[] file, int id, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("车辆管理信息") && !powerUtil.isAdd("车辆管理信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.success("无权限！");
        }

        //获取原始名称
        String fileName = file[0].getOriginalFilename();
        //文件保存路径
        String filePath = "c:/profile/";
        Date date = new Date();
        SimpleDateFormat spd = new SimpleDateFormat("yyyyMMddHHmmssSS");
        //文件重命名,防止重复
        filePath = filePath + spd.format(date) + fileName;
        //文件对象
        File dest = new File(filePath);
        //判断路径是否存在,如果不存在则创建
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdir();
        }
        try {
            //保存到服务器中
            file[0].transferTo(dest);
            vehicleService.fileUp(filePath, fileName, id);

            SimpleDateFormat spd2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Log log = new Log();
            log.setName(userInfo.getName());
            log.setRiqi(spd2.format(date));
            log.setViewName("车辆管理信息");
            log.setContent("上传");
            logService.add(log);

            return ResultInfo.success("上传成功", fileName);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 下载
     */
    @RequestMapping("/getFile")
    public void getFile(int id, HttpSession session, HttpServletResponse response) throws IOException {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);

        List<Vehicle> getList = vehicleService.getListById(id);
        String FullPath = "";
        if (getList != null && getList.size() != 0) {
            FullPath = getList.get(0).getFilepath();//文件的位置
        }
        if (!FullPath.equals("")) {
            File packetFile = new File(FullPath);
            String filename = packetFile.getName();
            File file = new File(FullPath);
            if (file.exists()) {
                // 将文件写入输入流
                FileInputStream fileInputStream = new FileInputStream(file);
                InputStream fis = new BufferedInputStream(fileInputStream);
                byte[] buffer = new byte[fis.available()];
                fis.read(buffer);
                fis.close();

                response.reset();
                //response.setContentType("application/octet-stream");
                response.setCharacterEncoding("utf-8");
                response.addHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(filename, "UTF-8"));
                // 告知浏览器文件的大小
                response.addHeader("Content-Length", "" + file.length());

                OutputStream outputStream = new BufferedOutputStream(response.getOutputStream());
                response.setContentType("application/octet-stream");
                outputStream.write(buffer);
                outputStream.flush();

                Date date = new Date();
                SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd.format(date));
                log.setViewName("车辆管理信息");
                log.setContent("下载");
                logService.add(log);

            }
        }
    }
}
