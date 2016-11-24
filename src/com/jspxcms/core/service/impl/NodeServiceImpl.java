package com.jspxcms.core.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.jspxcms.core.domain.MemberGroup;
import com.jspxcms.core.domain.Node;
import com.jspxcms.core.domain.NodeBuffer;
import com.jspxcms.core.domain.NodeDetail;
import com.jspxcms.core.html.HtmlService;
import com.jspxcms.core.listener.ModelDeleteListener;
import com.jspxcms.core.listener.NodeDeleteListener;
import com.jspxcms.core.listener.NodeListener;
import com.jspxcms.core.listener.SiteDeleteListener;
import com.jspxcms.core.listener.UserDeleteListener;
import com.jspxcms.core.listener.WorkflowDeleteListener;
import com.jspxcms.core.repository.NodeDao;
import com.jspxcms.core.service.InfoNodeService;
import com.jspxcms.core.service.MemberGroupService;
import com.jspxcms.core.service.ModelService;
import com.jspxcms.core.service.NodeBrandService;
import com.jspxcms.core.service.NodeBufferService;
import com.jspxcms.core.service.NodeDetailService;
import com.jspxcms.core.service.NodeMemberGroupService;
import com.jspxcms.core.service.NodeOrgService;
import com.jspxcms.core.service.NodeQueryService;
import com.jspxcms.core.service.NodeRoleService;
import com.jspxcms.core.service.NodeService;
import com.jspxcms.core.service.SiteService;
import com.jspxcms.core.service.UserService;
import com.jspxcms.core.service.WorkflowService;
import com.jspxcms.core.support.DeleteException;

/**
 * NodeServiceImpl
 * 
 * @author liufang
 * 
 */
@Service
@Transactional
public class NodeServiceImpl implements NodeService, SiteDeleteListener,
		UserDeleteListener, WorkflowDeleteListener, ModelDeleteListener {
	
	@Transactional
	public void clone(List<Node> nodes, Integer siteId,Integer userId,Integer parentId) {
		Node node = new Node();
		for (int i = 0; i < nodes.size(); i++) {
			node = nodes.get(i);
			//排除root节点，因为第一步已经复制过root节点
			if(node.getParent()!=null){
				Node dest = new Node();
				NodeDetail detail = new NodeDetail();
				NodeDetail destdetail = new NodeDetail();
				NodeBuffer buffer = new NodeBuffer();
				Map<String, String> customs = new HashMap<String, String>();
				Map<String, String> clobs = new HashMap<String, String>();
//				String[] ignorePros = new String[]{"id","customs","clobs","children","details","buffers","nodeAttrs","nodeParameterGroups","nodeSpecs","nodeBrands","nodeRoles","nodeGroups","nodeOrgs","parent","site","workflow","creator","nodeModel","infoModel"};
//				BeanUtils.copyProperties(node, dest,ignorePros);
				dest.setName(node.getName());
				
				detail = node.getDetail();
				String[] ignorePros = new String[]{"id","node"};
				BeanUtils.copyProperties(detail, destdetail,ignorePros);
				
//				buffer = node.getBuffer();
//				buffer.setId(null);
//				Set<NodeBuffer> buffers = node.getBuffers();
				customs = node.getCustoms();
				clobs = node.getClobs();
//				Integer[] infoPermIds = node.getInfoPerms();
//				Integer[] nodePermIds = node.getNodePerms();
//				Integer[] viewOrgIds = node.getViewOrgs();
				cloneSave(dest, destdetail, customs, clobs, null, null, null, null, null, null, null, null, parentId, null, userId, siteId, null);
			}
		}
	}
	@Transactional
	public Node clone(Node node, Integer siteId,Integer userId) {
		Node dest = new Node();
		NodeDetail detail = new NodeDetail();
		NodeDetail destdetail = new NodeDetail();
		NodeBuffer buffer = new NodeBuffer();
		Map<String, String> customs = new HashMap<String, String>();
		Map<String, String> clobs = new HashMap<String, String>();
//		String[] ignorePros = new String[]{"id","customs","clobs","children","details","buffers","nodeAttrs","nodeParameterGroups","nodeSpecs","nodeBrands","nodeRoles","nodeGroups","nodeOrgs","parent","site","workflow","creator","nodeModel","infoModel"};
//		BeanUtils.copyProperties(node, dest,ignorePros);
		dest.setName(node.getName());
		
		Integer parentId = node.getParent().getId();
		Integer nodeModelId = node.getNodeModel().getId();
		Integer infoModelId = node.getInfoModel().getId();
		Integer workflowId = node.getWorkflow().getId();
		
		
		detail = node.getDetail();
		String[] ignorePros = new String[]{"id","node"};
		BeanUtils.copyProperties(detail, destdetail,ignorePros);
		
//		buffer = node.getBuffer();
//		buffer.setId(null);
//		Set<NodeBuffer> buffers = node.getBuffers();
		customs = node.getCustoms();
		clobs = node.getClobs();
//		Integer[] infoPermIds = node.getInfoPerms();
//		Integer[] nodePermIds = node.getNodePerms();
//		Integer[] viewOrgIds = node.getViewOrgs();
		Node nn = cloneSave(dest, destdetail, customs, clobs, null, null, null, null, null, null, null, null, null, null, userId, siteId, null);
		return nn;
	}
	
	public Node cloneSave(Node bean, NodeDetail detail, Map<String, String> customs,
			Map<String, String> clobs, Integer[] infoPermIds,
			Integer[] nodePermIds, Integer[] viewGroupIds,
			Integer[] contriGroupIds, Integer[] commentGroupIds,
			Integer[] viewOrgIds, Integer parentId, Integer nodeModelId,
			Integer infoModelId, Integer workflowId, Integer creatorId,
			Integer siteId,Integer[] brandIds) {
		Node parent = null;
		if (parentId != null) {
			parent = dao.findOne(parentId);
			bean.setParent(parent);
		}
		if (nodeModelId != null) {
			bean.setNodeModel(modelService.get(nodeModelId));
		}
		if (infoModelId != null) {
			bean.setInfoModel(modelService.get(infoModelId));
			bean.setRealNode(true);
		} else {
			// 首页必须为真实节点
			bean.setRealNode(bean.getParent() == null);
		}
		if (workflowId != null) {
			bean.setWorkflow(workflowService.get(workflowId));
		}
		//准备数据
		infoPermIds = getInfoPermIds(siteId);
		nodePermIds = getNodePermIds(siteId);
		viewGroupIds = getGroupIds(siteId);
		contriGroupIds = getGroupIds(siteId);
		commentGroupIds = getGroupIds(siteId);
		bean.setCreator(userService.get(creatorId));
		bean.setSite(siteService.get(siteId));
//		bean.setCustoms(customs);
//		bean.setClobs(clobs);
//		bean.setDetails(detail);
//		bean.setBuffers(buffers);
		bean.applyDefaultValue();
		treeSave(bean, parent);
		bean = dao.save(bean);
		
		nodeDetailService.save(detail, bean);
		nodeBufferService.save(new NodeBuffer(), bean);
		nodeRoleService.update(bean, infoPermIds, nodePermIds);
		nodeMemberGroupService.update(bean, viewGroupIds, contriGroupIds,
				commentGroupIds);
		nodeOrgService.update(bean, viewOrgIds);
		nodeBrandService.save(bean, brandIds);
		firePostSave(new Node[] { bean });
		return bean;
	}
	
	public Node save(Node bean, NodeDetail detail, Map<String, String> customs,
			Map<String, String> clobs, Integer[] infoPermIds,
			Integer[] nodePermIds, Integer[] viewGroupIds,
			Integer[] contriGroupIds, Integer[] commentGroupIds,
			Integer[] viewOrgIds, Integer parentId, Integer nodeModelId,
			Integer infoModelId, Integer workflowId, Integer creatorId,
			Integer siteId,Integer[] brandIds) {
		Node parent = null;
		if (parentId != null) {
			parent = dao.findOne(parentId);
			bean.setParent(parent);
		}
		if (nodeModelId != null) {
			bean.setNodeModel(modelService.get(nodeModelId));
		}
		if (infoModelId != null) {
			bean.setInfoModel(modelService.get(infoModelId));
			bean.setRealNode(true);
		} else {
			// 首页必须为真实节点
			bean.setRealNode(bean.getParent() == null);
		}
		if (workflowId != null) {
			bean.setWorkflow(workflowService.get(workflowId));
		}
		bean.setCreator(userService.get(creatorId));
		bean.setSite(siteService.get(siteId));
		
		bean.setCustoms(customs);
		bean.setClobs(clobs);

		bean.applyDefaultValue();
		treeSave(bean, parent);
		bean = dao.save(bean);

		nodeDetailService.save(detail, bean);
		nodeBufferService.save(new NodeBuffer(), bean);
		nodeRoleService.update(bean, infoPermIds, nodePermIds);
		nodeMemberGroupService.update(bean, viewGroupIds, contriGroupIds,
				commentGroupIds);
		nodeOrgService.update(bean, viewOrgIds);
		nodeBrandService.save(bean, brandIds);
		updateHtml(bean);
		firePostSave(new Node[] { bean });
		return bean;
	}

	private void treeSave(Node bean, Node parent) {
		bean.setTreeMax(Node.long2hex(0));
		if (parent == null) {
			bean.setTreeLevel(0);
			bean.setTreeNumber(Node.long2hex(0));
			bean.setTreeMax(Node.long2hex(0));
		} else {
			bean.setTreeLevel(parent.getTreeLevel() + 1);
			String max = parent.getTreeMax();
			bean.setTreeNumber(parent.getTreeNumber() + "-" + max);
			long big = parent.getTreeMaxLong() + 1;
			parent.setTreeMax(Node.long2hex(big));
			dao.save(parent);
		}
	}

	public Node update(Node bean, NodeDetail detail,
			Map<String, String> customs, Map<String, String> clobs,
			Integer[] infoPermIds, Integer[] nodePermIds,
			Integer[] viewGroupIds, Integer[] contriGroupIds,
			Integer[] commentGroupIds, Integer[] viewOrgIds,
			Integer nodeModelId, Integer infoModelId, Integer workflowId,Integer[] brandIds) {
		if (nodeModelId != null) {
			bean.setNodeModel(modelService.get(nodeModelId));
		}
		if (infoModelId != null) {
			bean.setInfoModel(modelService.get(infoModelId));
			bean.setRealNode(true);
		} else {
			bean.setInfoModel(null);
			// 首页必须为真实节点
			bean.setRealNode(bean.getParent() == null);
		}
		if (workflowId != null) {
			bean.setWorkflow(workflowService.get(workflowId));
		} else {
			bean.setWorkflow(null);
		}
		bean.getCustoms().clear();
		if (!CollectionUtils.isEmpty(customs)) {
			bean.getCustoms().putAll(customs);
		}
		bean.getClobs().clear();
		if (!CollectionUtils.isEmpty(clobs)) {
			bean.getClobs().putAll(clobs);
		}
		bean.applyDefaultValue();
		bean = dao.save(bean);

		nodeDetailService.update(detail, bean);
		nodeRoleService.update(bean, infoPermIds, nodePermIds);
		nodeMemberGroupService.update(bean, viewGroupIds, contriGroupIds,
				commentGroupIds);
		nodeOrgService.update(bean, viewOrgIds);
		nodeBrandService.update(bean, brandIds);
		updateHtml(bean);
		firePostUpdate(new Node[] { bean });
		return bean;
	}

	public Node[] batchUpdate(Integer[] id, String[] name, String[] number,
			Integer[] views, Boolean[] hidden, Integer siteId,
			boolean isUpdateTree) {
		Map<Integer, List<Integer>> listMap = new HashMap<Integer, List<Integer>>();
		Node[] beans = new Node[id.length];
		for (int i = 0, len = id.length; i < len; i++) {
			beans[i] = dao.findOne(id[i]);
			beans[i].setName(name[i]);
			beans[i].setNumber(number[i]);
			beans[i].setViews(views[i]);
			beans[i].setHidden(hidden[i]);
			dao.save(beans[i]);
			if (isUpdateTree) {
				Node parent = beans[i].getParent();
				Integer parentId;
				if (parent != null) {
					parentId = parent.getId();
				} else {
					parentId = -1;
				}
				List<Integer> list = listMap.get(parentId);
				if (list != null) {
					list.add(id[i]);
				} else {
					list = new ArrayList<Integer>();
					list.add(id[i]);
					listMap.put(parentId, list);
				}
			}
		}
		String parentTreeNumber, origTreeNumber, treeNumber;
		for (Entry<Integer, List<Integer>> entry : listMap.entrySet()) {
			Integer parentId = entry.getKey();
			List<Integer> ids = entry.getValue();
			if (parentId == -1) {
				continue;
			}
			int len = ids.size();
			if (dao.countByParentId(parentId) != len) {
				continue;
			}
			parentTreeNumber = dao.findTreeNumber(parentId);
			dao.appendModifiedFlag(parentTreeNumber + "-%", siteId);
			for (int i = 0; i < len; i++) {
				origTreeNumber = dao.findTreeNumber(ids.get(i));
				treeNumber = parentTreeNumber + "-" + Node.long2hex(i);
				dao.updateTreeNumber(origTreeNumber + "%", treeNumber,
						treeNumber.length() + 2, siteId);
			}
			// 修改父节点的treeMax
			dao.updateTreeMax(parentId, Node.long2hex(len));
		}
		return beans;
	}

	public int move(Integer[] ids, Integer id, Integer siteId) {
		Node parent = dao.findOne(id);
		String parentTreeNumber = parent.getTreeNumber();
		long treeMax = parent.getTreeMaxLong();
		String modifiedTreeNumber, treeNumber;
		int count = 0;
		for (int i = 0, len = ids.length; i < len; i++) {
			dao.updateTreeMax(id, Node.long2hex(treeMax + 1));
			treeNumber = dao.findTreeNumber(ids[i]);
			modifiedTreeNumber = parentTreeNumber + "-"
					+ Node.long2hex(treeMax++);
			count += dao.updateTreeNumber(treeNumber + "%", modifiedTreeNumber,
					treeNumber.length() + 1, siteId);
			dao.updateParentId(ids[i], id);
		}
		return count;
	}

	// 获取节点及其子节点ID
	private Set<Integer> getChildrenIds(Node bean, Set<Integer> ids) {
		if (bean != null) {
			Collection<Node> children = bean.getChildren();
			if (!CollectionUtils.isEmpty(children)) {
				for (Node n : children) {
					getChildrenIds(n, ids);
				}
			}
			ids.add(bean.getId());
		}
		return ids;
	}

	private Set<Node> doDelete(Node bean, Set<Node> deleted) {
		if (bean != null) {
			Collection<Node> children = bean.getChildren();
			if (!CollectionUtils.isEmpty(children)) {
				for (Node n : children) {
					doDelete(n, deleted);
				}
			}
			infoNodeService.deleteByNodeId(bean.getId());
			dao.delete(bean);
			deleted.add(bean);
		}
		return deleted;
	}

	public Node delete(Integer id) {
		Node bean = dao.findOne(id);
		if (bean == null) {
			return null;
		}

		Set<Integer> toDeleteIdSet = new HashSet<Integer>();
		getChildrenIds(bean, toDeleteIdSet);
		firePreDelete(toDeleteIdSet.toArray(new Integer[toDeleteIdSet.size()]));

		Set<Node> deleted = new HashSet<Node>();
		firePreDelete(new Integer[] { id });
		doDelete(bean, deleted);

		firePostDelete(deleted.toArray(new Node[deleted.size()]));
		return bean;
	}

	public Node[] delete(Integer[] ids) {
		Set<Integer> toDeleteIdSet = new HashSet<Integer>();
		for (Integer id : ids) {
			getChildrenIds(dao.findOne(id), toDeleteIdSet);
		}
		firePreDelete(toDeleteIdSet.toArray(new Integer[toDeleteIdSet.size()]));
		Set<Node> deleted = new HashSet<Node>();
		Node bean;
		for (int i = 0; i < ids.length; i++) {
			bean = dao.findOne(ids[i]);
			doDelete(bean, deleted);
		}
		updateHtml(deleted);
		Node[] beans = deleted.toArray(new Node[deleted.size()]);
		firePostDelete(beans);
		return beans;
	}

	/**
	 * @see NodeService#refer(Integer)
	 */
	public Node refer(Integer nodeId) {
		Node node = dao.findOne(nodeId);
		node.setRefers(node.getRefers() + 1);
		return node;
	}

	public List<Node> refer(Integer[] nodeIds) {
		if (ArrayUtils.isEmpty(nodeIds)) {
			return Collections.emptyList();
		}
		Set<Integer> nodeIdSet = new HashSet<Integer>();
		List<Node> nodes = new ArrayList<Node>(nodeIds.length);
		for (Integer nodeId : nodeIds) {
			if (!nodeIdSet.contains(nodeId)) {
				nodes.add(refer(nodeId));
				nodeIdSet.add(nodeId);
			}
		}
		return nodes;
	}

	public void derefer(Node node) {
		node.setRefers(node.getRefers() - 1);
	}

	public void derefer(Collection<Node> nodes) {
		for (Node node : nodes) {
			derefer(node);
		}
	}
	
	private void updateHtml(Node bean) {
		Set<Node> beans = new HashSet<Node>();
		beans.add(bean);
		updateHtml(beans);
	}
	
	private void updateHtml(Collection<Node> beans) {
		for (Node bean : beans) {
			bean.updateHtmlStatus();
			htmlService.makeNode(bean);
		}
	}

	public void preSiteDelete(Integer[] ids) {
		if (ArrayUtils.isNotEmpty(ids)) {
			if (dao.countBySiteId(Arrays.asList(ids)) > 0) {
				throw new DeleteException("node.management");
			}
		}
	}

	public void preModelDelete(Integer[] ids) {
		if (ArrayUtils.isNotEmpty(ids)) {
			if (dao.countByNodeModelId(Arrays.asList(ids)) > 0
					|| dao.countByInfoModelId(Arrays.asList(ids)) > 0) {
				throw new DeleteException("node.management");
			}
		}
	}

	public void preUserDelete(Integer[] ids) {
		if (ArrayUtils.isNotEmpty(ids)) {
			if (dao.countByCreatorId(Arrays.asList(ids)) > 0) {
				throw new DeleteException("node.management");
			}
		}
	}

	public void preWorkflowDelete(Integer[] ids) {
		if (ArrayUtils.isNotEmpty(ids)) {
			if (dao.countByWorkflowId(Arrays.asList(ids)) > 0) {
				throw new DeleteException("node.management");
			}
		}
	}

	private void firePostSave(Node[] bean) {
		if (!CollectionUtils.isEmpty(listeners)) {
			for (NodeListener listener : listeners) {
				listener.postNodeSave(bean);
			}
		}
	}

	private void firePostUpdate(Node[] bean) {
		if (!CollectionUtils.isEmpty(listeners)) {
			for (NodeListener listener : listeners) {
				listener.postNodeUpdate(bean);
			}
		}
	}

	private void firePreDelete(Integer[] ids) {
		if (!CollectionUtils.isEmpty(deleteListeners)) {
			for (NodeDeleteListener listener : deleteListeners) {
				listener.preNodeDelete(ids);
			}
		}
	}

	private void firePostDelete(Node[] bean) {
		if (!CollectionUtils.isEmpty(listeners)) {
			for (NodeListener listener : listeners) {
				listener.postNodeDelete(bean);
			}
		}
	}

	private List<NodeListener> listeners;
	private List<NodeDeleteListener> deleteListeners;

	@Autowired(required = false)
	public void setDeleteListeners(List<NodeDeleteListener> deleteListeners) {
		this.deleteListeners = deleteListeners;
	}

	@Autowired(required = false)
	public void setListeners(List<NodeListener> listeners) {
		this.listeners = listeners;
	}

	private NodeOrgService nodeOrgService;
	private NodeRoleService nodeRoleService;
	private NodeMemberGroupService nodeMemberGroupService;
	private WorkflowService workflowService;
	private ModelService modelService;
	private HtmlService htmlService;
	private InfoNodeService infoNodeService;
	private NodeDetailService nodeDetailService;
	private NodeBufferService nodeBufferService;
	private UserService userService;
	private SiteService siteService;
	private NodeBrandService nodeBrandService;
	private NodeQueryService query;
	private MemberGroupService memberGroupService;

	@Autowired
	public void setMemberGroupService(MemberGroupService memberGroupService) {
		this.memberGroupService = memberGroupService;
	}
	
	@Autowired
	public void setHtmlService(HtmlService htmlService) {
		this.htmlService = htmlService;
	}
	
	@Autowired
	public void setNodeQueryService(NodeQueryService query) {
		this.query = query;
	}
	@Autowired
	public void setNodeBrandService(NodeBrandService nodeBrandService) {
		this.nodeBrandService = nodeBrandService;
	}
	
	@Autowired
	public void setNodeOrgService(NodeOrgService nodeOrgService) {
		this.nodeOrgService = nodeOrgService;
	}

	@Autowired
	public void setNodeRoleService(NodeRoleService nodeRoleService) {
		this.nodeRoleService = nodeRoleService;
	}

	@Autowired
	public void setNodeMemberGroupService(
			NodeMemberGroupService nodeMemberGroupService) {
		this.nodeMemberGroupService = nodeMemberGroupService;
	}

	@Autowired
	public void setWorkflowService(WorkflowService workflowService) {
		this.workflowService = workflowService;
	}

	@Autowired
	public void setModelService(ModelService modelService) {
		this.modelService = modelService;
	}

	@Autowired
	public void setInfoNodeService(InfoNodeService infoNodeService) {
		this.infoNodeService = infoNodeService;
	}

	@Autowired
	public void setNodeDetailService(NodeDetailService nodeDetailService) {
		this.nodeDetailService = nodeDetailService;
	}

	@Autowired
	public void setNodeBufferService(NodeBufferService nodeBufferService) {
		this.nodeBufferService = nodeBufferService;
	}

	@Autowired
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	@Autowired
	public void setSiteService(SiteService siteService) {
		this.siteService = siteService;
	}

	private NodeDao dao;

	@Autowired
	public void setDao(NodeDao dao) {
		this.dao = dao;
	}
	
	private Integer[] getInfoPermIds(Integer siteId) {
		List<Node> list = query.findList(siteId, null, true, null);
		int len = list.size();
		Integer[] ids = new Integer[len];
		for (int i = 0; i < len; i++) {
			ids[i] = list.get(i).getId();
		}
		return ids;
	}

	private Integer[] getNodePermIds(Integer siteId) {
		List<Node> list = query.findList(siteId, null, null, null);
		int len = list.size();
		Integer[] ids = new Integer[len];
		for (int i = 0; i < len; i++) {
			ids[i] = list.get(i).getId();
		}
		return ids;
	}

	private Integer[] getGroupIds(Integer siteId) {
		List<MemberGroup> list = memberGroupService.findList();
		int len = list.size();
		Integer[] ids = new Integer[len];
		for (int i = 0; i < len; i++) {
			ids[i] = list.get(i).getId();
		}
		return ids;
	}
}
