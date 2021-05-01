import { Modal, Button } from "antd";
import { connect, RootStateOrAny } from "react-redux";
import { FormOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import StudentRegister from "../addstu";
const EditStudentModal = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" icon={<FormOutlined />} onClick={showModal}>
        注册
      </Button>
      <Modal
        afterClose={() => {
          window.history.go(0);
        }}
        title="注册"
        width={600}
        visible={visible}
        footer={null}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <StudentRegister></StudentRegister>
      </Modal>
    </>
  );
};
export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({ user: state.user })
  //  函数确定
)(EditStudentModal);
