package com.jspxcms.core.service;

import java.util.List;

import com.jspxcms.core.domain.Info;
import com.jspxcms.core.domain.InfoParameter;

public interface InfoParameterService {
	public List<InfoParameter> save(Info info,Integer[] parameterIds, String[] values);

	public List<InfoParameter> update(Info info,Integer[] parameterIds, String[] values);

	public int deleteByInfoId(Integer infoId);

	public int deleteByParameterId(Integer parameterId);
}
