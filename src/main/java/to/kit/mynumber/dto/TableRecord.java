package to.kit.mynumber.dto;

import java.util.HashMap;

/**
 * テーブルレコードを管理.
 * @author Hidetaka Sasai
 */
public final class TableRecord extends HashMap<String, Object> {
	private final String table;

	/**
	 * インスタンス生成.
	 * @param tableName テーブル名
	 */
	public TableRecord(String tableName) {
		this.table = tableName;
	}

	/**
	 * テーブル名を取得.
	 * @return テーブル名
	 */
	public String getTable() {
		return this.table;
	}
}
