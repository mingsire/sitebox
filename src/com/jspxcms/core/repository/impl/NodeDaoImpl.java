package com.jspxcms.core.repository.impl;

import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.ejb.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.jspxcms.common.orm.JpqlBuilder;
import com.jspxcms.common.orm.Limitable;
import com.jspxcms.common.orm.QuerydslUtils;
import com.jspxcms.core.domain.Node;
import com.jspxcms.core.domaindsl.QNode;
import com.jspxcms.core.repository.NodeDaoPlus;
import com.mysema.query.BooleanBuilder;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.expr.BooleanExpression;

/**
 * NodeDaoImpl
 * 
 * @author liufang
 * 
 */
public class NodeDaoImpl implements NodeDaoPlus {
	public List<Node> findList(Integer[] siteId, Integer parentId,
			String treeNumber, Boolean isRealNode, Boolean isHidden,
			Limitable limitable) {
		JPAQuery query = new JPAQuery(this.em);
		query.setHint(QueryHints.HINT_CACHEABLE, true);
		QNode node = QNode.node;
		predicate(query, node, siteId, parentId, treeNumber, isRealNode,
				isHidden);
		return QuerydslUtils.list(query, node, limitable);
	}

	public Page<Node> findPage(Integer[] siteId, Integer parentId,
			String treeNumber, Boolean isRealNode, Boolean isHidden,
			Pageable pageable) {
		JPAQuery query = new JPAQuery(this.em);
		query.setHint(QueryHints.HINT_CACHEABLE, true);
		QNode node = QNode.node;
		predicate(query, node, siteId, parentId, treeNumber, isRealNode,
				isHidden);
		return QuerydslUtils.page(query, node, pageable);
	}

	private void predicate(JPAQuery query, QNode node, Integer[] siteId,
			Integer parentId, String treeNumber, Boolean isRealNode,
			Boolean isHidden) {
		query.from(node);
		BooleanBuilder exp = new BooleanBuilder();
		if (ArrayUtils.isNotEmpty(siteId)) {
			exp = exp.and(node.site.id.in(siteId));
		}
		if (parentId != null) {
			exp = exp.and(node.parent.id.eq(parentId));
		}
		if (StringUtils.isNotBlank(treeNumber)) {
			exp = exp.and(node.treeNumber.startsWith(treeNumber));
		}
		if (isRealNode != null) {
			exp = exp.and(node.realNode.eq(isRealNode));
		}
		if (isHidden != null) {
			exp = exp.and(node.hidden.eq(isHidden));
		}
		query.where(exp);
	}

	public List<Node> findByNumbersLike(String[] numbers) {
		if (ArrayUtils.isEmpty(numbers)) {
			return Collections.emptyList();
		}
		JPAQuery query = new JPAQuery(this.em);
		query.setHint(QueryHints.HINT_CACHEABLE, true);
		QNode node = QNode.node;
		query.from(node);
		BooleanExpression exp = node.number.like(numbers[0]);
		for (int i = 0, len = numbers.length; i < len; i++) {
			exp.or(node.number.like(numbers[i]));
		}
		query.where(exp);
		return query.list(node);
	}

	public List<Node> findByNumbers(String[] numbers) {
		if (ArrayUtils.isEmpty(numbers)) {
			return Collections.emptyList();
		}
		JPAQuery query = new JPAQuery(this.em);
		query.setHint(QueryHints.HINT_CACHEABLE, true);
		QNode node = QNode.node;
		query.from(node);
		BooleanExpression exp = node.number.eq(numbers[0]);
		for (int i = 1, len = numbers.length; i < len; i++) {
			exp = exp.or(node.number.eq(numbers[i]));
		}
		query.where(exp);
		return query.list(node);
	}
	
	public List<Node> findForHtml(Integer siteId, Integer nodeId,
			String treeNumber, boolean forUpdate, Integer lastId, int maxResult) {
		JpqlBuilder jb = new JpqlBuilder("from Node bean where 1=1");
		jb.append(" and bean.site.id = :siteId");
		jb.setParameter("siteId", siteId);
		if (lastId != null) {
			jb.append(" and bean.id > :lastId");
			jb.setParameter("lastId", lastId);
		}
		if (forUpdate) {
			jb.append(" and (bean.htmlStatus = '" + Node.HTML_TOBE_DELETE);
			jb.append("' or bean.htmlStatus = '" + Node.HTML_TOBE_UPDATE);
			jb.append("')");
		}
		if (StringUtils.isNotBlank(treeNumber)) {
			jb.append(" and bean.treeNumber like :treeNumber");
			jb.setParameter("treeNumber", treeNumber + "%");
		} else if (nodeId != null) {
			jb.append(" and bean.id = :nodeId");
			jb.setParameter("nodeId", nodeId);
		}
		jb.append(" order by bean.id asc");
		TypedQuery<Node> query = jb.createQuery(em, Node.class);
		query.setMaxResults(maxResult);
		return query.getResultList();
	}

	private EntityManager em;

	@javax.persistence.PersistenceContext
	public void setEm(EntityManager em) {
		this.em = em;
	}

}
