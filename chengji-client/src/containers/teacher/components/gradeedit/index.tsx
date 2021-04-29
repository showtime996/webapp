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
  Tag,
} from "antd";
import { connect, RootStateOrAny } from "react-redux";
import type { ActionType } from "@ant-design/pro-table";
import AddGrade from "../addgrade";

import { GradeInfo, AddGradeCount } from "@/redux/actions";
import ProTable from "@ant-design/pro-table";
import DeleteGradeModel from "../deletegrademodel";
import styles from "./index.module.less";
import EditModel from "./components/editmodel";
import { SyncOutlined, FormOutlined } from "@ant-design/icons";
const originData: any = [];
let counttype = {
  classno: "",
  username: "",
  realName: "",
  department: "",
  flaggrade: false,
  flagcheat: false,
  cname: "",
  count: 0,
  average: 0,
  countgpa: 0,
  averagegpa: 0,
  countcredit: 0,
  averagecountcredit: 0,
};
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
      grade: "",
      credit: "",
      gpa: "",
      cheat: "",
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
          department: formatedata[i].department,
          courseName: formatedata[i].courseName,
          courseType: formatedata[i].courseType,
          grade: formatedata[i].grade,
          credit: formatedata[i].credit,
          gpa: formatedata[i].gpa,
          cheat: formatedata[i].cheat,
          flaggrade: formatedata[i].flaggrade,
          flagcheat: formatedata[i].flagcheat,
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
      title: "学院",
      dataIndex: "department",
      width: "7%",
    },
    {
      title: "专业名",
      dataIndex: "cname",
      width: "7%",
    },
    {
      title: "班级号",
      dataIndex: "classno",
      width: "7%",
    },
    {
      title: "课程号",
      dataIndex: "courseNo",
      width: "7%",
    },
    {
      title: "课程名称",
      dataIndex: "courseName",
      width: "7%",
    },
    {
      title: "课程类型",
      dataIndex: "courseType",
      width: "7%",
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
    },
    {
      title: "作弊",
      dataIndex: "cheat",
      width: "7%",
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: "7%",
      align: "center",
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
            {record.flagcheat === true ? (
              <Typography.Link disabled>
                <Button
                  type="link"
                  style={{ color: "#ccc" }}
                  icon={<FormOutlined />}
                >
                  编辑
                </Button>
              </Typography.Link>
            ) : (
              <Typography.Link disabled={editingKey !== ""}>
                <EditModel record={record}></EditModel>
              </Typography.Link>
            )}

            <Typography.Link>
              <DeleteGradeModel clickdata={record}></DeleteGradeModel>
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
        inputType: col.dataIndex === "grade" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  let count = 0;
  let average: any = 0;
  let countgpa = 0;
  let averagegpa: any = 0;
  let countcredit = 0;
  let averagecountcredit: any = 0;
  let flaggrade = false;
  let flagcheat = false;
  let n: any;
  if (data.length != 0) {
    n = data.length;
  }

  for (let key in data) {
    count = count + data[key].grade;
    average = (count / n).toFixed(2);

    countgpa = data[key].gpa + countgpa;
    averagegpa = (countgpa / n).toFixed(2);
    countcredit = countcredit + Number(data[key].credit);
    averagecountcredit = (countcredit / n).toFixed(2);
    if (data[key].flaggrade === true) {
      flaggrade = true;
    }
    if (data[key].flagcheat === true) {
      flagcheat = true;
    }
  }

  counttype = {
    classno: originData[0]?.classno,
    username: originData[0]?.username,
    realName: originData[0]?.realName,
    cname: originData[0]?.cname,
    department: originData[0]?.department,
    flaggrade,
    flagcheat,
    count,
    average,
    countgpa,
    averagegpa,
    countcredit,
    averagecountcredit,
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    props.AddGradeCount(counttype);

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
        // footer={() => (
        //   <div>
        //     <Tag color="green">总分:{count}</Tag>
        //     <Tag color="green">平均分:{average}</Tag>
        //     <Tag color="green">总绩点:{countgpa}</Tag>
        //     <Tag color="green">平均绩点:{averagegpa}</Tag>
        //     <Tag color="green">总学分:{countcredit}</Tag>
        //     <Tag color="green">平均学分:{averagecountcredit}</Tag>
        //   </div>
        // )}
        bordered
        toolBarRender={() => [
          <AddGrade tempdata={tempdata}></AddGrade>,
          <Popconfirm
            title="同步信息"
            onConfirm={handleOk}
            onCancel={handleCancel}
          >
            <Tooltip title="同步">
              <Button
                style={{ border: 0 }}
                shape="circle"
                icon={<SyncOutlined />}
              ></Button>
            </Tooltip>
          </Popconfirm>,
        ]}
        dataSource={[...data]}
        columns={mergedColumns}
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
  { GradeInfo, AddGradeCount }
)(GradeEdit);
