import React from 'react';
import Upload from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { FormItem } from 'formik-antd';
import * as uuid from 'uuid';

import { useFormikContext } from 'formik';
import { pure } from 'recompose';

function getFileList(assets) {
  return assets.map(a => ({
    ...a,
    uid: uuid.v4(),
    status: 'done',
  }));
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function UploadImagesField() {
  const formikContext = useFormikContext();
  const { assets = [] } = formikContext.values;

  const handleChange = info => {
    console.log(info.file, info.fileList);
    const { file } = info;
    if (file.status === 'remove') {
      formikContext.setFieldValue(
        'assets',
        assets.filter(a => a.name === file.name),
      );
    } else {
      getBase64(file.originFileObj).then(base64 => {
        const fileData = {
          name: file.name,
          type: file.type,
          ext: '',
          size: file.size,
          data: base64,
        };
        formikContext.setFieldValue('assets', [...assets, fileData]);
      });
    }
  };
  const handleUpload = uploadProps => {
    uploadProps.onSuccess(null, {
      ...uploadProps.file,
    });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <FormItem label="Images" name="assets">
      <Upload
        customRequest={handleUpload}
        listType="picture-card"
        fileList={getFileList(assets)}
        onChange={handleChange}
      >
        {getFileList(assets).length >= 8 ? null : uploadButton}
      </Upload>
    </FormItem>
  );
}

UploadImagesField.propTypes = {};
UploadImagesField.defaultProps = {};

export default pure(UploadImagesField);
