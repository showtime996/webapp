import { Modal, Button } from "antd";
import { connect, RootStateOrAny } from "react-redux";
import { ReadOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import DepartmentGradeTableEdit from "../gradesearch";
const DepartmentEditTableModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const { clickdata } = props;

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
      <Button type="link" icon={<ReadOutlined />} onClick={showModal}>
        详情
      </Button>
      <Modal
        afterClose={() => {
          window.history.go(0);
        }}
     
        width={1200}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <DepartmentGradeTableEdit
          clickdata={clickdata}
        ></DepartmentGradeTableEdit>
      </Modal>
    </>
  );
};
export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({ user: state.user })
  //  函数确定
)(DepartmentEditTableModal);
