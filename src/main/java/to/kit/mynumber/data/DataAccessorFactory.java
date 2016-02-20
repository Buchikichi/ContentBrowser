package to.kit.mynumber.data;

/**
 * データアクセスファクトリー.
 * @author Hidetaka Sasai
 */
public final class DataAccessorFactory {
	/**
	 * データアクセスのインスタンスを取得.
	 * @return データアクセス
	 */
	public static DataAccessor getInstance() {
		if (System.getenv("DATASTORE_SERVICE_ACCOUNT") == null) {
			return new AppEngineDatastore();
		}
		return new ApiServicesDatastore();
	}
}
