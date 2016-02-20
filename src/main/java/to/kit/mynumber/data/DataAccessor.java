package to.kit.mynumber.data;

import to.kit.mynumber.dto.TableRecord;

/**
 * データアクセス.
 * @author Hidetaka Sasai
 *
 */
public interface DataAccessor {
	/**
	 * レコード作成.
	 * @param rec レコード
	 * @throws Exception 例外
	 */
	void create(TableRecord rec) throws Exception;
}
