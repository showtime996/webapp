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
  Select,
} from "antd";
import { connect, RootStateOrAny } from "react-redux";
import type { ActionType } from "@ant-design/pro-table";
import Cookies from "js-cookie";
import request from "umi-request";
import { TeacherUserid, Course, CourseSearch } from "@/redux/actions";
import ProTable from "@ant-design/pro-table";

import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
const originData: any = [];
const cookicedata: any = [];
const searchdata: any = [];
let flag = 0;

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

const CourseInfo = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const actionRef = useRef<ActionType>();
  const isEditing = (record) => record.key === editingKey;
  const { clickdata } = props;
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

  const userid = Cookies.get("userid");
  useEffect(() => {
    props.TeacherUserid({ id: userid });
  }, []);

  const cookiceuserid = props.cooikeuserid;
  const cookicelength = cookiceuserid.length;
  if (JSON.stringify(cookiceuserid) !== "{}") {
    for (let i = cookicedata.length; i < cookicelength; i++) {
      cookicedata.push({
        key: i + 1,
        username: cookiceuserid[i].username,
        password: cookiceuserid[i].password,
        type: cookiceuserid[i].type,
        realName: cookiceuserid[i].realName,
        cname: cookiceuserid[i].cname,
        sex: cookiceuserid[i].sex,
        department: cookiceuserid[i].department,
        affiliation: cookiceuserid[i].affiliation,
        age: cookiceuserid[i].age,
        duty: cookiceuserid[i].duty,
        IDcard: cookiceuserid[i].IDcard,
        nation: cookiceuserid[i].nation,
        region: cookiceuserid[i].region,
        phone: cookiceuserid[i].phone,
        eMail: cookiceuserid[i].eMail,
        street: cookiceuserid[i].street,
        diploma: cookiceuserid[i].diploma,
      });
    }
  }

  useEffect(() => {
    props.Course({ courseteacher: cookicedata[0].realName });
  }, []);

  const formatedata = props.course;
  const { Option } = Select;
  const temp = formatedata.length;
  originData.length = 0;
  if (JSON.stringify(formatedata) !== "{}") {
    for (let i = originData.length; i < temp; i++) {
      originData.push({
        key: i + 1,
        username: formatedata[i].username,
        realName: formatedata[i].realName,
        cname: formatedata[i].cname,
        classno: formatedata[i].classno,
        courseNo: formatedata[i].courseNo,
        courseName: formatedata[i].courseName,
        courseType: formatedata[i].courseType,
      });
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

  const onFinish = (e) => {
    props.CourseSearch(e);
    console.log("eeeeeeeee", e);

    flag = 1;
  };
  const search = props.coursesearch;

  const serachtemp = search.length;
  searchdata.length = 0;
  if (JSON.stringify(search) !== "{}") {
    for (let i = searchdata.length; i < serachtemp; i++) {
      searchdata.push({
        key: i + 1,
        username: search[i].username,
        realName: search[i].realName,
        cname: search[i].cname,
        classno: search[i].classno,
        courseNo: search[i].courseNo,
        courseName: search[i].courseName,
        courseType: search[i].courseType,
      });
    }
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
          <Form name="nest-messages" layout="inline" onFinish={onFinish}>
            <Form.Item name={"classno"} label="班级">
              <Select placeholder="请选择班级">
                <Option value={cookicedata[0]?.cname + "1"}>
                  {cookicedata[0]?.cname + "1"}
                </Option>
                <Option value={cookicedata[0]?.cname + "2"}>
                  {cookicedata[0]?.cname + "2"}
                </Option>
                <Option value={cookicedata[0]?.cname + "3"}>
                  {cookicedata[0]?.cname + "3"}
                </Option>
              </Select>
            </Form.Item>
            <Form.Item name={"courseNo"} label="课程号">
              <Select placeholder="请选择课程号">
                <Option value={originData[0]?.courseNo}>
                  {originData[0]?.courseNo}
                </Option>
                <Option value={originData[1]?.courseNo}>
                  {originData[1]?.courseNo}
                </Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Tooltip title="查找">
                <Button
                  htmlType="submit"
                  style={{ border: 0 }}
                  shape="circle"
                  icon={<SearchOutlined />}
                />
              </Tooltip>
            </Form.Item>
          </Form>,
          <Tooltip title="刷新">
            <Button
              style={{ border: 0 }}
              shape="circle"
              onClick={refresh}
              icon={<RedoOutlined />}
            />
          </Tooltip>,
        ]}
        dataSource={flag === 0 ? [...data] : [...searchdata]}
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
  (state: RootStateOrAny) => ({
    grade: state.grade,
    cooikeuserid: state.cooikeuserid,
    course: state.course,
    coursesearch: state.coursesearch,
  }),
  //  函数确定
  { Course, TeacherUserid, CourseSearch }
)(CourseInfo);
