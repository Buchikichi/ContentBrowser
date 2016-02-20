package to.kit.mynumber.dto;

import java.io.Serializable;

/**
 * アップロードリクエスト.
 * @author Hidetaka Sasai
 */
public final class UploadRequest implements Serializable {
	/** serialVersionUID. */
	private static final long serialVersionUID = -44972718308359117L;

	private String name;
	private byte[] picture;

	/**
	 * 名前を取得.
	 * @return 名前
	 */
	public String getName() {
		return this.name;
	}
	/**
	 * 名前を設定.
	 * @param name 名前
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * 画像を取得.
	 * @return 画像
	 */
	public byte[] getPicture() {
		return this.picture;
	}
	/**
	 * 画像を設定.
	 * @param value 画像
	 */
	public void setPicture(byte[] value) {
		this.picture = value;
	}
}
