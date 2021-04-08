import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Select,
  Tooltip,
  Button,
} from "antd";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { connect, RootStateOrAny } from "react-redux";
import { AdminSearchstu, AdminUserid, addstudent } from "@/redux/actions";
import DeleteStudentModel from "@/containers/teacher/components/deletestudentmodel";
import ProTable from "@ant-design/pro-table";
import type { ActionType } from "@ant-design/pro-table";

import request from "umi-request";
import EditStudentModal from "./components/modal";
import {
  RequestData,
  UseFetchDataAction,
} from "@ant-design/pro-table/lib/typing";
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

const Studentinfomation = (props) => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [data, setData]: any[] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;
  const userid = Cookies.get("userid");
  useEffect(() => {
    props.AdminUserid({ id: userid });
  }, []);
  const cookiceuserid = props.cooikeuserid;
  const cookicelength = cookiceuserid.length;
  if (JSON.stringify(cookiceuserid) !== "{}") {
    for (let i = cookicedata.length; i < cookicelength; i++) {
      console.log("cookiceuserid", cookiceuserid);
      cookicedata.push({
        key: i + 1,
        username: cookiceuserid[i].username,
        password: cookiceuserid[i].password,
        type: cookiceuserid[i].type,
        realName: cookiceuserid[i].realName,

        sex: cookiceuserid[i].sex,
        department: cookiceuserid[i].department,

        age: cookiceuserid[i].age,
        duty: cookiceuserid[i].duty,
        IDcard: cookiceuserid[i].IDcard,

        phone: cookiceuserid[i].phone,
        eMail: cookiceuserid[i].eMail,

        diploma: cookiceuserid[i].diploma,
      });
    }
  }
  useEffect(() => {
    props.addstudent({ id: userid });
  }, []);

  const formatedata = props.stuSearch;
  const { Option } = Select;
  const temp = formatedata.length;

  console.log("props", formatedata);
  if (JSON.stringify(formatedata) !== "{}") {
    for (let i = originData.length; i < temp; i++) {
      originData.push({
        key: i + 1,
        username: formatedata[i].username,
        realName: formatedata[i].realName,
        department: formatedata[i].department,
        cname: formatedata[i].cname,
        classno: formatedata[i].classno,
        sex: formatedata[i].sex,
        phone: formatedata[i].phone,
        years: formatedata[i].years,
        term: formatedata[i].term,
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
  const [tempsearch, settempsearch]: any = useState([]);

  const [tempdata, settempdata] = useState();
  const columns: any = [
    {
      title: "序号",
      dataIndex: "key",
      width: "7%",
    },
    {
      title: "学年",
      dataIndex: "years",
      width: "7%",
    },
    {
      title: "学期",
      dataIndex: "term",
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
      align: "center",
      render: (_, record) => {
        return (
          <Typography.Link
            onClick={() => {
              settempdata(record);
            }}
          >
            <DeleteStudentModel tempdata={tempdata}></DeleteStudentModel>
          </Typography.Link>
        );
      },
    },
  ];

  const onFinish = (e) => {
    props.AdminSearchstu(e);
    flag = 1;
  };

  const search = props.stuSearch;

  const serachtemp = search.length;
  searchdata.length = 0;
  if (JSON.stringify(search) !== "{}") {
    for (let i = searchdata.length; i < serachtemp; i++) {
      searchdata.push({
        key: i + 1,
        username: search[i].username,
        realName: search[i].realName,
        cname: search[i].cname,
        department: search[i].department,
        classno: search[i].classno,
        sex: search[i].sex,
        phone: search[i].phone,
        years: search[i].years,
        term: search[i].term,
      });
    }
  }
  const refresh = () => {
    window.history.go(0);
  };
  return (
    <Form form={form} component={false}>
      <ProTable
        actionRef={actionRef}
        search={false}
        options={{ fullScreen: true, reload: false }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered={true}
        headerTitle="学生信息表"
        toolBarRender={() => [
          <Form name="nest-messages" layout="inline" onFinish={onFinish}>
            <Form.Item name={"years"} label="学年">
              <Select placeholder="请选择学年">
                <Option value="20202021">2020-2021</Option>
                <Option value="20192020">2019-2020</Option>
                <Option value="20182019">2018-2019</Option>
              </Select>
            </Form.Item>
            <Form.Item name={"term"} label="学期">
              <Select placeholder="请选择学期">
                <Option value="第一学期">第一学期</Option>
                <Option value="第二学期">第二学期</Option>
                <Option value="第三学期">第三学期</Option>
              </Select>
            </Form.Item>
            <Form.Item name={"department"} label="学院">
              <Select placeholder="请选择学院">
                <Option value="电子信息与工程学院">电子信息与工程学院</Option>
                <Option value="建筑工程学院">建筑工程学院</Option>
                <Option value="机械工程学院">机械工程学院</Option>
                <Option value="交通学院">交通学院</Option>
                <Option value="化学工程学院">化学工程学院</Option>
                <Option value="材料学院">材料学院</Option>
                <Option value="理学院">理学院</Option>
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
          <EditStudentModal></EditStudentModal>,

          <Tooltip title="刷新">
            <Button
              style={{ border: 0 }}
              shape="circle"
              onClick={refresh}
              icon={<RedoOutlined />}
            />
          </Tooltip>,
        ]}
        dataSource={
          flag === 0
            ? [...data]
            : [...searchdata] || (flag === 2 && [...tempsearch])
        }
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
  (state: RootStateOrAny) => ({
    user: state.user,
    cooikeuserid: state.cooikeuserid,
    stuSearch: state.stuSearch,
  }),

  { AdminSearchstu, AdminUserid, addstudent }
)(Studentinfomation);
