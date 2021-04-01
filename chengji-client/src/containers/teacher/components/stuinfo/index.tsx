import React, { useEffect, useRef, useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import { connect, RootStateOrAny } from "react-redux";
import { getUser } from "@/redux/actions";
import ProTable from "@ant-design/pro-table";
import type { ActionType } from "@ant-design/pro-table";

import request from "umi-request";
import EditModal from "../modal";
const originData: any = [];
const formatedata: any = [];
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const StuInfo = (props) => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;
  useEffect(() => {
    props.getUser();
  }, []);
  const formatedata = props.user;

  const temp = formatedata.length;

  if (JSON.stringify(formatedata) !== "{}") {
    console.log("temp", temp);
    for (let i = originData.length; i < temp; i++) {
      console.log("formatedata", formatedata);
      originData.push({
        key: i + 1,
        username: formatedata[i].username,
        realName: formatedata[i].realName,
        cname: formatedata[i].cname,
        classno: formatedata[i].classno,
        sex: formatedata[i].sex,
        phone: formatedata[i].phone,
      });
    }
  }
  const edit = (record) => {
    form.setFieldsValue({
      username: "",
      realName: "",
      cname: "",
      classno: "",
      phone: "",

      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const datarequest: any = async (params = {}) =>
    request<{
      data: any[];
    }>("http://localhost:3000/studentInfo", {
      params,
    })
      .then((response) => {
        // 将request请求的对象保存到state中
        // setTableData(response);
        return response;
      })
      .catch((info) => {
        console.log("请求数据失败", info);
      });
  const [tempdata, settempdata] = useState();
  const columns = [
    {
      title: "序号",
      dataIndex: "key",
      width: "7%",
    },
    {
      title: "学号",
      dataIndex: "username",
      width: "7%",
    },
    {
      title: "姓名",
      dataIndex: "realName",
      width: "7%",
    },
    {
      title: "性别",
      dataIndex: "sex",
      width: "7%",
    },
    {
      title: "专业名",
      dataIndex: "cname",
      width: "7%",
    },

    {
      title: "班级",
      dataIndex: "classno",
      width: "7%",
    },
    {
      title: "电话",
      dataIndex: "phone",
      width: "7%",
    },

    {
      title: "操作",
      dataIndex: "operation",
      width: "7%",
      render: (_, record) => {
        return (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => {
              settempdata(record);
            }}
          >
            <EditModal tempdata={tempdata}></EditModal>
          </Typography.Link>
        );
      },
    },
  ];

  return (
    <Form form={form} component={false}>
      <ProTable
        actionRef={actionRef}
        search={false}
        options={{ fullScreen: true }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        request={datarequest}
        bordered
        dataSource={[...data]}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({ user: state.user }),
  //  函数确定
  { getUser }
)(StuInfo);
