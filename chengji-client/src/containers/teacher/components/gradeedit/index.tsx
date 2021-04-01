import React, { useRef, useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Button,
} from "antd";
import { connect, RootStateOrAny } from "react-redux";
import type { ActionType } from "@ant-design/pro-table";
import AddGrade from "../addgrade";
import request from "umi-request";
import { getUser } from "@/redux/actions";
import ProTable from "@ant-design/pro-table";

import {
  RequestData,
  UseFetchDataAction,
} from "@ant-design/pro-table/lib/typing";
const originData: any = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

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
              message: `请输入${title}!`,
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

const GradeEdit = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const actionRef = useRef<ActionType>();
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "序号",
      dataIndex: "key",
      width: "7%",
      editable: true,
    },
    {
      title: "学号",
      dataIndex: "username",
      width: "7%",
      editable: true,
    },
    {
      title: "姓名",
      dataIndex: "realName",
      width: "7%",
      editable: true,
    },
    {
      title: "班级号",
      dataIndex: "classno",
      width: "7%",
      editable: true,
    },
    {
      title: "课程号",
      dataIndex: "courseNo",
      width: "7%",
      editable: true,
    },
    {
      title: "课程名称",
      dataIndex: "courseName",
      width: "7%",
      editable: true,
    },
    {
      title: "课程类型",
      dataIndex: "courseType",
      width: "7%",
      editable: true,
    },
    {
      title: "成绩",
      dataIndex: "grade",
      width: "7%",
      editable: true,
    },
    {
      title: "学分",
      dataIndex: "credit",
      width: "7%",
      editable: true,
    },
    {
      title: "绩点",
      dataIndex: "gpa",
      width: "7%",
      editable: true,
    },
    {
      title: "作弊",
      dataIndex: "cheat",
      width: "7%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "7%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            编辑
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns: any = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const datarequest: any = async (params = {}) =>
    request<{
      data: any[];
    }>("http://localhost:3000/grade", {
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

  return (
    <Form form={form} component={false}>
      <AddGrade></AddGrade>
      <ProTable
        options={{ fullScreen: true }}
        actionRef={actionRef}
        search={false}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        request={datarequest}
        bordered
        dataSource={[...data]}
        columns={mergedColumns}
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
)(GradeEdit);
