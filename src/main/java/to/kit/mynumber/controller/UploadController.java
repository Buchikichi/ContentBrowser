package to.kit.mynumber.controller;

import java.util.UUID;

import com.google.api.client.util.Base64;

import to.kit.mynumber.data.DataAccessor;
import to.kit.mynumber.data.DataAccessorFactory;
import to.kit.mynumber.dto.TableRecord;
import to.kit.mynumber.dto.UploadRequest;
import to.kit.sas.control.Controller;

/**
 * 画像アップロード.
 * @author Hidetaka Sasai
 */
public class UploadController implements Controller<UploadRequest> {
	private TableRecord setupRecord(String uuid, UploadRequest form) {
		TableRecord rec = new TableRecord("picture");
		String src = Base64.encodeBase64String(form.getPicture());

		rec.put("uuid", uuid);
		rec.put("name", form.getName());
		rec.put("src", src);
		return rec;
	}

	@Override
	public Object execute(UploadRequest form) {
		String uuid = UUID.randomUUID().toString();
		TableRecord rec = setupRecord(uuid, form);
		DataAccessor da = DataAccessorFactory.getInstance();

		try {
			da.create(rec);
		} catch (Exception e) {
			e.printStackTrace();
			uuid = null;
		}
		return new String[] { "uuid:" + uuid, "name:" + form.getName() };
	}
}
