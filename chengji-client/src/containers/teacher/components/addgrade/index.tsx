import { Modal, Button } from "antd";
import { connect, RootStateOrAny } from "react-redux";
import { GradeInfo } from "@/redux/actions";
import React, { useEffect, useRef, useState } from "react";
import GradeEdit from "../gradeedit";
import AddDetail from "./components/adddetail";
const AddGrade = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { tempdata } = props;
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
      <Button type="primary" onClick={showModal}>
        录入
      </Button>
      <Modal
        title="录入成绩表"
        width={700}
        // afterClose={() => {
        //   window.history.go(0);
        // }}
        visible={visible}
        footer={null}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <AddDetail tempdata={tempdata}></AddDetail>
      </Modal>
    </>
  );
};
export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({ grade: state.grade }),

  //  函数确定
  { GradeInfo }
)(AddGrade);
