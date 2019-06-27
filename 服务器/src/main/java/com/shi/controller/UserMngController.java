package com.shi.controller;

import java.io.Serializable;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.shi.ServerRes.ServerResponse;
import com.shi.enumeration.ResponCode;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.shi.common.ComUtil;
import com.shi.exception.FriendException;
import com.shi.common.DictUtil;
import com.shi.common.Page;
import com.shi.entity.Dict;
import com.shi.entity.Menu;
import com.shi.entity.Permi;
import com.shi.entity.Role;
import com.shi.entity.RolePermiRel;
import com.shi.entity.SchoolInfo;
import com.shi.entity.TeachStu;
import com.shi.entity.User;
import com.shi.entity.UserRoleRel;
import com.shi.service.MenuService;
import com.shi.service.PermiService;
import com.shi.service.RoleMngService;
import com.shi.service.SchoolInfoService;
import com.shi.service.UserMngService;
import com.shi.service.UserRoleRelService;

@Controller
@RequestMapping(value = "user_mng/")
public class UserMngController {
	@Autowired
	private UserMngService userService;
	@Autowired
	private RoleMngService roleMngService;
	@Autowired
	private UserRoleRelService userRoleRelService;
    @Autowired
    private PermiService permiService; 
    @Autowired
    private MenuService menuService;
    @Autowired
    private SchoolInfoService schoolInfoService;
	
	
	private static Logger logger = LogManager
			.getLogger(UserMngController.class);

    /**
     * 分页查询
     * @param param 查询参数
     * @param no 页码
     * @param size 页记录条数
     * @return
     */
	@ResponseBody
	@RequestMapping(value = "page")
	public ServerResponse page(String param, String no, String size) {
        
		if(no==null||no.equals("")){
			no = "1";
		}
		if(size==null||size.equals("")){
			size="10";
		}
		
	    int pageNo = Integer.valueOf(no);
		int pageSize = Integer.valueOf(size);
		Page<User> page = userService.getSqlPage(param, pageNo, pageSize);
		JSONObject json = new JSONObject();
		return new ServerResponse(ResponCode.success.getCode(),page,"");
	}


	@ResponseBody
	@RequestMapping(value = "md5")
	public ServerResponse md5() {

		String data = "1";
		try {
			MessageDigest md = MessageDigest.getInstance("md5");
			byte[] md5 = md.digest(data.getBytes());
			return new ServerResponse(ResponCode.success.getCode(),ComUtil.toHex(md5),"");
		} catch (NoSuchAlgorithmException e) {
			logger.error(e.toString());
			e.printStackTrace();
			throw new FriendException("加密失败");
		}

	}

	public static void main(String[] args) {

//		String data = "1234567";
//		try {
//			MessageDigest md = MessageDigest.getInstance("md5");
//			byte[] md5 = md.digest(data.getBytes());
//			System.out.println(ComUtil.toHex(md5));
//		} catch (NoSuchAlgorithmException e) {
//			e.printStackTrace();
//		}
		
		
		
		
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
  
		String No = df.format(new Date())+((int)(Math.random()*9+1)*1000);
		System.out.println(No);
	}

	/**
	 * 用户登陆
	 * 

	 */
	@ResponseBody
	@RequestMapping(value = "login")
	//@PostMapping("login")
	@PostMapping
	public ServerResponse login(@RequestBody User user_request){
		String loginName = user_request.getUserName();
		String password = user_request.getPwd();
		try {
			User user = userService.findByLoginName(loginName);
			if (user == null||user.getStatus()==2) {
				throw new FriendException("账号不存在");
			}
			
			if (user.getStatus() == 1) {
				throw new FriendException("账号已被锁定，请联系管理员");
			}
			if (!user.getPwd().equals(password)) {
				throw new FriendException("密码错误");
			} 
			List<Permi> permiList = permiService.findByUser(user);
			List<Permi> noPermiList = permiService.HasNoPermis(permiList);
			String token = ComUtil.GetGUID();
			HashMap<String, Object> userMap = new HashMap<String, Object>();
			userMap.put("user", user);
			userMap.put("permis", permiList);
			userMap.put("noPermis", noPermiList);
			userMap.put("timestamp", new Date());
			ComUtil.loginMap.put(token, userMap);
			logger.info("用户："+user.getUserName() +"-登陆成功!");
			return new ServerResponse(ResponCode.success.getCode(),token,"");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("登陆异常" ,e);
			throw new FriendException("服务异常");
		}
		
	}

	/**
	 * 用户退出登陆
	 * 
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "logout")
	public ServerResponse logout(@RequestBody User user_request) {
		HashMap<String, Object> userMap =  ComUtil.loginMap.get(user_request);
		User user = (User) userMap.get("user");
		ComUtil.loginMap.remove(user);
		logger.info("用户："+user.getUserName() +"-退出登陆!");
		return new ServerResponse(ResponCode.success.getCode(),"","");
	}
    /**
     * 查询登陆用户的所有权限
     * @param request
     * @return
     */
	@ResponseBody
	@RequestMapping(value = "permis")
	public ServerResponse permis(@RequestBody User user_request) {
		List<Permi> permiList = new ArrayList<Permi>();
		permiList = permiService.findByUser(user_request);
		String jsonText = JSON.toJSONString(permiList, false);
		JSONArray jsonArray= JSONArray.parseArray(jsonText);
		return new ServerResponse(ResponCode.success.getCode(),"","");
	}
	
	@ResponseBody
	@RequestMapping(value = "has_menus")
    public ServerResponse hasMenus(@RequestBody User user_request){
		List<Map<String, Object>> menuMapList = menuService.findByUser(user_request);
		return new ServerResponse(ResponCode.success.getCode(),"","");
	}
	
	
	/**
	 * 修改密码
	 * @param request
	 * @param response
	 * @param orginPassword
	 * @param newPassword
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "password_modify")
    public ServerResponse passwordModify(@RequestBody User user_request,
    		String orginPassword, String newPassword){
		String orginPwd = orginPassword;
		String newPwd = newPassword;
		JSONObject json = new JSONObject();
		if(orginPassword==null||newPassword==null){
			throw new FriendException("密码获取失败");
		}else if(!user.getPwd().equals(orginPwd)) {
			throw new FriendException("密码错误");
		}else{
			try {
				orginPwd = ComUtil.toMd5Str(orginPassword);
				newPwd = ComUtil.toMd5Str(newPassword);
			} catch (NoSuchAlgorithmException e) {
				e.printStackTrace();
				throw new FriendException("服务异常");
			}
			user_request.setPwd(newPwd);
			userService.update(user_request);
			return new ServerResponse(ResponCode.success.getCode(),"","");
		}
	}
	
	/**
	 * 获取用户信息
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "get_user_info")
    public ServerResponse getUserInfo(@RequestBody User user_request){
	    Map<String, Object> map = userService.getUserInfo(user_request.getUserId());
		return new ServerResponse(ResponCode.success.getCode(),"","");
	}
	
	
	@ResponseBody
	@RequestMapping(value = "save")
    public ServerResponse save(@RequestBody User user_request){
		if(user_request.getUserName()==null){
			throw new FriendException("用户名为空");
		}
		if(user_request.getPhone()==null){
			throw new FriendException("用户名为空");
		}
		try {
		
	    User user = new User();
		user = user_request;
		SchoolInfo schoolInfo = schoolInfoService.getById(user.getschoolInfoId());
		teachStu.setSchoolInfo(schoolInfo);
		user.setTeachStu(teachStu);
		if(user.getroleId()!=null){
	      Role role = roleMngService.getById(user.getroleId());
	      Set<UserRoleRel> userRoleRelSet = new HashSet<UserRoleRel>();  
	      UserRoleRel urr = new UserRoleRel();
	      urr.setRole(role);
	      urr.setUser(user);
	      userRoleRelSet.add(urr);
	      user.setUserRoleRelSet(userRoleRelSet);
		}
	    userService.save(user);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("新增用户失败" ,e);
			throw new FriendException("服务异常");
		}
		return new ServerResponse(ResponCode.success.getCode(),"","");
	}
	
	@ResponseBody
	@RequestMapping(value = "edit")
    public ServerResponse edit(@RequestBody User user_request){
	    User user = userService.getById(user_request.getUserId());
		if(user==null){
			throw new FriendException("获取用户信息失败");
		}
		
		if(user_request.getPhone()==null){
			throw  new FriendException("手机号码为空");
		}
		try {

		user = user_request;
		TeachStu teachStu = user.getTeachStu();
		SchoolInfo schoolInfo = schoolInfoService.getById(teachStu.getschoolInfoId());
		  if(schoolInfo!=teachStu.getSchoolInfo()){
		    teachStu.setSchoolInfo(schoolInfo);
		  }
	    UserRoleRel urr = new UserRoleRel();
	    Role role = roleMngService.getById(user.getroleId());
	    urr.setRole(role);
	    urr.setUser(user);
	    userRoleRelService.addNew(urr);	    
	    userService.update(user);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("编辑用户信息失败" ,e);
			throw new FriendException("服务异常");
		}
		return new ServerResponse(ResponCode.success.getCode(),"","");
	}
	@ResponseBody
	@RequestMapping(value = "get")
    public ServerResponse get(@RequestBody User user_request){
	    Map<String, Object> map = userService.getUserInfo(user_request.getUserId());
		if(map==null){
			throw new FriendException("获取信息失败");
		}
		return new ServerResponse(ResponCode.success.getCode(),"","");
	}
	@ResponseBody
	@RequestMapping(value = "logoff")
    public ServerResponse logoff(String userId){
	    User user = userService.getById(userId);
		if(user==null){
			throw new FriendException("用户不存在");
		}
		if(user.getStatus() == 2){
			throw new FriendException("抱歉用户已被注销过");
		}
		user.setStatus(2);
		userService.update(user);
		return new ServerResponse(ResponCode.success.getCode(),"");
	}
	
}
