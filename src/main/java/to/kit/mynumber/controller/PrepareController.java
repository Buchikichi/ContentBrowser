package to.kit.mynumber.controller;

import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;

import to.kit.mynumber.dto.Prepare;
import to.kit.sas.control.Controller;

/**
 * 画像アップロード準備.
 * @author Hidetaka Sasai
 */
public class PrepareController implements Controller<Object> {
	@Override
	public Object execute(Object form) {
		Prepare result = new Prepare();
		String url;

		if (System.getenv("DATASTORE_SERVICE_ACCOUNT") == null) {
			BlobstoreService blob = BlobstoreServiceFactory.getBlobstoreService();

			url = blob.createUploadUrl("/upload");
		} else {
			url = "/upload";
		}
		result.setUrl(url);
		return result;
	}
}
