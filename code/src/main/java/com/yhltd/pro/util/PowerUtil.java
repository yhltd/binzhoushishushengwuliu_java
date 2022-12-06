package com.yhltd.pro.util;

import com.yhltd.pro.entity.UserPower;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @author wanghui
 * @date 2021/1/23 15:07
 */
public class PowerUtil{

    private List<UserPower> powerList;

    private PowerUtil(){}

    private static PowerUtil powerUtil;

    public static PowerUtil getPowerUtil(HttpSession session){
        if(StringUtils.isNull(powerUtil)){
            powerUtil = new PowerUtil();
        }
        powerUtil.powerList = SessionUtil.getPower(session);
        return powerUtil;
    }

    public boolean isAdd(String viewName) {
        try{
            for(UserPower userPower : powerList){
                if(userPower.getViewName().equals(viewName)){
                    return userPower.getAdd().equals("√");
                }
            }
        }catch (Exception e){
            return false;
        }
        return false;
    }

    public boolean isDelete(String viewName) {
        try{
            for(UserPower userPower : powerList){
                if(userPower.getViewName().equals(viewName)){
                    return userPower.getDel().equals("√");
                }
            }
        }catch (Exception e){
            return false;
        }
        return false;
    }

    public boolean isUpdate(String viewName) {
        try{
            for(UserPower userPower : powerList){
                if(userPower.getViewName().equals(viewName)){
                    return userPower.getUpd().equals("√");
                }
            }
        }catch (Exception e){
            return false;
        }
        return false;
    }

    public boolean isSelect(String viewName) {
        try{
            for(UserPower userPower : powerList){
                if(userPower.getViewName().equals(viewName)){
                    return userPower.getSel().equals("√");
                }
            }
        }catch (Exception e){
            return false;
        }
        return false;
    }
}
