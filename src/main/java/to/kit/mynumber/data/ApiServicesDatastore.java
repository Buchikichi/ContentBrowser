package to.kit.mynumber.data;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Map;

import com.google.api.services.datastore.DatastoreV1.BeginTransactionRequest;
import com.google.api.services.datastore.DatastoreV1.BeginTransactionResponse;
import com.google.api.services.datastore.DatastoreV1.CommitRequest;
import com.google.api.services.datastore.DatastoreV1.Entity;
import com.google.api.services.datastore.DatastoreV1.Key;
import com.google.api.services.datastore.DatastoreV1.PartitionId;
import com.google.api.services.datastore.DatastoreV1.Property;
import com.google.api.services.datastore.DatastoreV1.Value;
import com.google.api.services.datastore.client.Datastore;
import com.google.api.services.datastore.client.DatastoreException;
import com.google.api.services.datastore.client.DatastoreHelper;
import com.google.protobuf.ByteString;

import to.kit.mynumber.dto.TableRecord;

class ApiServicesDatastore implements DataAccessor {
	public void create(TableRecord rec) throws GeneralSecurityException, DatastoreException, IOException {
		Datastore datastore = DatastoreHelper.getDatastoreFromEnv();
		BeginTransactionRequest.Builder treq = BeginTransactionRequest.newBuilder();
		BeginTransactionResponse tres = datastore.beginTransaction(treq.build());
		ByteString tx = tres.getTransaction();
		CommitRequest.Builder creq = CommitRequest.newBuilder();
		creq.setTransaction(tx);

		PartitionId partitionId = PartitionId.newBuilder().build();
		Key.Builder key = Key.newBuilder()
				.setPartitionId(partitionId)
				.addPathElement(Key.PathElement.newBuilder().setKind(rec.getTable()).setId(1)/*.setName(uuid)*/);
		Entity.Builder entityBuilder = Entity.newBuilder().setKey(key);
/*
		entityBuilder.addProperty(
				Property.newBuilder().setName("src").setValue(Value.newBuilder().setStringValue("neko.jpg")));
		entityBuilder
				.addProperty(Property.newBuilder().setName("magni").setValue(Value.newBuilder().setIntegerValue(331)));
		//*/
		for (Map.Entry<String, Object> entry : rec.entrySet()) {
			Object val = entry.getValue();
			Value.Builder builderForValue = Value.newBuilder();

			if (val instanceof Integer) {
				builderForValue.setIntegerValue(((Integer) val).longValue());
			} else if (val instanceof Double) {
				builderForValue.setDoubleValue(((Double) val).doubleValue());
			} else {
				builderForValue.setStringValue(String.valueOf(val));
			}
			entityBuilder.addProperty(Property.newBuilder().setName(entry.getKey()).setValue(builderForValue));
		}
		Entity entity = entityBuilder.build();

		creq.getMutationBuilder().addInsert(entity);
		datastore.commit(creq.build());
	}
}
