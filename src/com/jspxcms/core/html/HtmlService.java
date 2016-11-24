package com.jspxcms.core.html;

import java.io.IOException;

import com.jspxcms.common.web.PathResolver;
import com.jspxcms.core.domain.Info;
import com.jspxcms.core.domain.Node;
import com.jspxcms.core.service.TaskService;

import freemarker.template.Configuration;
import freemarker.template.TemplateException;

/**
 * HtmlService
 * 
 * @author liufang
 * 
 */
public interface HtmlService {
	
	public void makeInfo(Integer infoId);

	public void makeInfo(Info info);

	public void deleteInfo(Info info);

	public void makeNode(Integer nodeId);

	public void makeNode(Node node);

	public void makeHome(Integer siteId) throws IOException, TemplateException;

	public Integer makeNode(Integer siteId, Integer nodeId,
			boolean includeChildren, Integer taskId, boolean forUpdate,
			Integer lastId, int maxResult) throws IOException,
			TemplateException;

	public Integer makeInfo(Integer siteId, Integer nodeId,
			boolean includeChildren, Integer taskId, boolean forUpdate,
			Integer lastId, int maxResult) throws IOException,
			TemplateException;
	
	public void makeInfo(Integer infoId, Configuration config,
			PathResolver resolver, TaskService taskService, Integer taskId,Boolean isAllSite)
			throws IOException, TemplateException;

	public void makeNode(Integer nodeId, Configuration config,
			PathResolver resolver, TaskService taskService, Integer taskId,Boolean isAllSite)
			throws IOException, TemplateException;

	public int makeNode(Integer siteId, Node node, boolean includeChildren,
			Configuration config, PathResolver resolver,
			TaskService taskService, Integer taskId,Boolean isAllSite) throws IOException,
			TemplateException;

	public int makeInfo(Integer siteId, Node node, boolean includeChildren,
			Configuration config, PathResolver resolver,
			TaskService taskService, Integer taskId,Boolean isAllSite) throws IOException,
			TemplateException;
}
