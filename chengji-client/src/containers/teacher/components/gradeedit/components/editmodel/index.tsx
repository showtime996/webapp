import { Modal, Button } from "antd";
import { connect, RootStateOrAny } from "react-redux";
import { ReconciliationOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import UpdateGrade from "../updategrade";
const EditModel = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const { record } = props;

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
      {record.flaggrade === false ? (
        <Button
          type="link"
          icon={<ReconciliationOutlined />}
          onClick={showModal}
        >
          编辑
        </Button>
      ) : (
        <Button
          type="link"
          icon={<ReconciliationOutlined />}
          onClick={showModal}
          style={{ color: "green" }}
        >
          编辑
        </Button>
      )}

      <Modal
        afterClose={() => {
          window.history.go(0);
        }}
        title="编辑成绩表"
        width={700}
        visible={visible}
        footer={null}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <UpdateGrade tempdata={record}></UpdateGrade>
      </Modal>
    </>
  );
};
export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({ user: state.user })
  //  函数确定
)(EditModel);
