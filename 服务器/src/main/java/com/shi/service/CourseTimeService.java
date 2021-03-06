package com.shi.service;

import java.util.List;
import java.util.Map;

import com.shi.common.Page;
import com.shi.entity.CourseTime;

public interface CourseTimeService {

	public Page<CourseTime> getPage(String courseId, int pageNo, int pageSize);

	public void delete(CourseTime courseTime);

	public CourseTime getById(String courseTimeId);

	public void saveOrUpdate(CourseTime courseTime);
	
	public List<CourseTime> findByCourseId(String courseId);
	
	public List<Map<String, Object>> findByCourseId2(String courseId);
}
