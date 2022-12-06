package com.yhltd.pro.controller;

import com.yhltd.pro.entity.*;
import com.yhltd.pro.service.FileTableService;
import com.yhltd.pro.service.LogService;
import com.yhltd.pro.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
 * @date 2022/12/1 17:35
 */
@Slf4j
@RestController
@RequestMapping("/filetable")
public class FileTableController {
    @Autowired
    private FileTableService fileTableService;
    @Autowired
    private LogService logService;

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(int id) {
        try {
            List<FileTable> getList = fileTableService.getList(id, "数据表");
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
    public ResultInfo add(MultipartFile[] file, int id, String filename, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("数据表") && !powerUtil.isUpdate("数据表") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.success("无权限！");
        }

        //获取原始名称
        String fileName2 = file[0].getOriginalFilename();
        //文件保存路径
        String filePath = "c:/profile/";
        Date date = new Date();
        SimpleDateFormat spd = new SimpleDateFormat("yyyyMMddHHmmssSS");
        //文件重命名,防止重复
        filePath = filePath + spd.format(date) + fileName2;
        //文件对象
        File dest = new File(filePath);
        //判断路径是否存在,如果不存在则创建
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdir();
        }
        FileTable fileTable = new FileTable();
        try {
            //保存到服务器中
            file[0].transferTo(dest);

            fileTable.setOtherId(id);
            fileTable.setType("数据表");
            fileTable.setFilename(filename);
            fileTable.setFilepath(filePath);
            fileTable = fileTableService.add(fileTable);

            SimpleDateFormat spd2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Log log = new Log();
            log.setName(userInfo.getName());
            log.setRiqi(spd2.format(date));
            log.setViewName("数据表");
            log.setContent("上传");
            logService.add(log);

            if (StringUtils.isNotNull(fileTable)) {
                return ResultInfo.success("上传成功", fileTable);
            } else {
                return ResultInfo.success("上传失败", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("上传失败：{}", e.getMessage());
            log.error("参数：{}", fileTable);
            return ResultInfo.error("上传失败");
        }
    }

    /**
     * 下载
     */
    @RequestMapping("/getFile")
    public void getFile(String filepath, HttpSession session, HttpServletResponse response) throws IOException {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        if (!filepath.equals("")) {
            File packetFile = new File(filepath);
            String filename = packetFile.getName();
            File file = new File(filepath);
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
                SimpleDateFormat spd2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Log log = new Log();
                log.setName(userInfo.getName());
                log.setRiqi(spd2.format(date));
                log.setViewName("数据表");
                log.setContent("下载");
                logService.add(log);

            }
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
        if (!powerUtil.isDelete("数据表") && !userInfo.getPower().equals("数据表")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);

        try {
            if (fileTableService.delete(idList)) {
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
