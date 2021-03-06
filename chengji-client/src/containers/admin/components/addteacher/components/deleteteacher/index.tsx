import React, { useState } from "react";
import { Modal, Button, Popconfirm } from "antd";
import { connect, RootStateOrAny } from "react-redux";
import { DeleteTeacher } from "@/redux/actions";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
const DeleteTeacherModel = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const { tempdata } = props;

  const handleOk = () => {
    props.DeleteTeacher(tempdata);
    setIsModalVisible(false);
    window.history.go(0);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Popconfirm
        title="是否确定删除？"
        onConfirm={handleOk}
        onCancel={handleCancel}
      >
        <Button type="link" icon={<DeleteOutlined />} onClick={showModal}>
          删除
        </Button>
      </Popconfirm>
    </>
  );
};

export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({
    user: state.user,
  }),
  //  函数确定
  { DeleteTeacher }
)(DeleteTeacherModel);
