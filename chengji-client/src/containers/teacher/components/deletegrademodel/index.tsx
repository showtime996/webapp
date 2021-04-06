import React, { useState } from "react";
import { Modal, Button, Popconfirm } from "antd";
import { connect, RootStateOrAny } from "react-redux";
import { DeleteGrade } from "@/redux/actions";
import { DeleteOutlined } from "@ant-design/icons";
const DeleteGradeModel = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const { clickdata } = props;

  const handleOk = () => {
    // console.log("clickdata", clickdata);

    props.DeleteGrade(clickdata);
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
        {clickdata.flagcheat === true ? (
          <Button
            type="link"
            style={{ color: "red" }}
            icon={<DeleteOutlined />}
            onClick={showModal}
          >
            删除
          </Button>
        ) : (
          <Button type="link" icon={<DeleteOutlined />} onClick={showModal}>
            删除
          </Button>
        )}
      </Popconfirm>
    </>
  );
};

export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({
    grade: state.grade,
  }),
  //  函数确定
  { DeleteGrade }
)(DeleteGradeModel);
