package com.jspxcms.core.repository;

import java.util.List;

import com.jspxcms.core.domain.Attr;

/**
 * AttrDaoPlus
 * 
 * @author xxs
 * 
 */
public interface AttrDaoPlus {
	public List<Attr> findByNumbers(String[] numbers);

	public List<Attr> findByNodeIdAndSiteId(Integer nodeId, Integer siteId);
	
	public Integer findUnusedPropertyIndex();
}
