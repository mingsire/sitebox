package com.jspxcms.plug.service;

import java.io.File;

public interface DbBackupExcutor {
	public void backup(File dir, boolean dataOnly);

	public void restore(File file);
}
