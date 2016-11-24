package com.jspxcms.core.repository.impl;

import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.FlushModeType;
import javax.persistence.PersistenceContext;

import org.apache.commons.lang3.ArrayUtils;
import org.hibernate.ejb.QueryHints;

import com.jspxcms.core.domain.Attr;
import com.jspxcms.core.domain.Info;
import com.jspxcms.core.domaindsl.QAttr;
import com.jspxcms.core.repository.AttrDaoPlus;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.expr.BooleanExpression;

/**
 * AttrDaoImpl
 * 
 * @author xiaoshi
 * 
 */
public class AttrDaoImpl implements AttrDaoPlus {
	public List<Attr> findByNumbers(String[] numbers) {
		if (ArrayUtils.isEmpty(numbers)) {
			return Collections.emptyList();
		}
		JPAQuery query = new JPAQuery(this.em);
		query.setHint(QueryHints.HINT_CACHEABLE, true);
		QAttr attr = QAttr.attr;
		query.from(attr);
		BooleanExpression exp = attr.number.eq(numbers[0]);
		for (int i = 1, len = numbers.length; i < len; i++) {
			exp = exp.or(attr.number.eq(numbers[i]));
		}
		query.where(exp);
		return query.list(attr);
	}
	public List<Attr> findByNodeIdAndSiteId(Integer nodeId, Integer siteId) {
		return null;
	}

	private EntityManager em;

	@PersistenceContext
	public void setEm(EntityManager em) {
		this.em = em;
	}
	@Override
	public Integer findUnusedPropertyIndex() {
		for (int i = 0; i < Info.ATTRIBUTE_VALUE_PROPERTY_COUNT; i++) {
			String jpql = "select count(*) from Attr attr where attr.propertyIndex = :propertyIndex";
			Long count = em.createQuery(jpql, Long.class).setFlushMode(FlushModeType.COMMIT).setParameter("propertyIndex", i).getSingleResult();
			if (count == 0) {
				return i;
			}
		}
		return null;
	}
}
