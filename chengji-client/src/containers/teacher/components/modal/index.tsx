import { Modal, Button } from "antd";
import { connect, RootStateOrAny } from "react-redux";
import { getUser } from "@/redux/actions";
import React, { useEffect, useRef, useState } from "react";
import GradeEdit from "../gradeedit";
const EditModal = () => {
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
      <Button type="link" onClick={showModal}>
        编辑
      </Button>
      <Modal
        title="编辑成绩表"
        width={1200}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <GradeEdit></GradeEdit>
      </Modal>
    </>
  );
};
export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({ user: state.user }),
  //  函数确定
  { getUser }
)(EditModal);
