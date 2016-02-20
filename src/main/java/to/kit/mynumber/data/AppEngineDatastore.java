package to.kit.mynumber.data;

import java.util.Map;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;

import to.kit.mynumber.dto.TableRecord;

class AppEngineDatastore implements DataAccessor {
	public void create(TableRecord rec) {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Entity foo = new Entity(rec.getTable());

		for (Map.Entry<String, Object> entry : rec.entrySet()) {
			foo.setProperty(entry.getKey(), entry.getValue());
		}
		datastore.put(foo);
	}
}
