import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Button,
  Tooltip,
} from "antd";
import { connect, RootStateOrAny } from "react-redux";
import type { ActionType } from "@ant-design/pro-table";
import AddGrade from "../addgrade";
import request from "umi-request";
import { GradeInfo } from "@/redux/actions";
import ProTable from "@ant-design/pro-table";
import DeleteModel from "../deletestudentmodel";
import { RedoOutlined, FormOutlined } from "@ant-design/icons";
const originData: any = [];

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

const GradeEdit = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const actionRef = useRef<ActionType>();
  const isEditing = (record) => record.key === editingKey;
  const { tempdata } = props;
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
  useEffect(() => {
    props.GradeInfo(tempdata);
  }, []);

  const formatedata = props.grade;

  const temp = formatedata.length;
  originData.length = 0;
  if (JSON.stringify(formatedata) !== "{}") {
    for (let i = originData.length; i < temp; i++) {
      if (tempdata.username === formatedata[i].username) {
        originData.push({
          key: i + 1,
          username: formatedata[i].username,
          realName: formatedata[i].realName,
          cname: formatedata[i].cname,
          classno: formatedata[i].classno,
          courseNo: formatedata[i].courseNo,
          courseName: formatedata[i].courseName,
          courseType: formatedata[i].courseType,
          grade: formatedata[i].grade,
          credit: formatedata[i].credit,
          gpa: formatedata[i].gpa,
          cheat: formatedata[i].cheat,
        });
      }
    }
  }
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
      title: "专业名",
      dataIndex: "cname",
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
      title: "操作",
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
            <Popconfirm title="确定取消?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              <Button type="link" icon={<FormOutlined />}>
                编辑
              </Button>
            </Typography.Link>
            <Typography.Link>
              <DeleteModel tempdata={tempdata}></DeleteModel>
            </Typography.Link>
          </div>
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

  const refresh = () => {
    window.history.go(0);
  };
  return (
    <Form form={form} component={false}>
      <ProTable
        options={{ fullScreen: true, reload: false }}
        actionRef={actionRef}
        search={false}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        toolBarRender={() => [
          <AddGrade tempdata={tempdata}></AddGrade>,

          <Tooltip title="刷新">
            <Button
              style={{ border: 0 }}
              shape="circle"
              onClick={refresh}
              icon={<RedoOutlined />}
            />
          </Tooltip>,
        ]}
        dataSource={[...data]}
        columns={mergedColumns}
        rowClassName="editable-row"
        headerTitle="学生成绩信息表"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({ grade: state.grade }),
  //  函数确定
  { GradeInfo }
)(GradeEdit);
