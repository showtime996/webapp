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
import { AdminSearchtea, AdminUserid, addAdmin } from "@/redux/actions";
import DeleteAdminModel from "./components/deleteadmin";
import ProTable from "@ant-design/pro-table";
import type { ActionType } from "@ant-design/pro-table";

import request from "umi-request";
import EditTeacherModal from "./components/modal";
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

const Admininfomation = (props) => {
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
    props.addAdmin();
  }, []);

  const formatedata = props.stuSearchadmin;
  const { Option } = Select;
  const temp = formatedata.length;

  console.log("props", formatedata);
  if (JSON.stringify(formatedata) !== "{}") {
    for (let i = originData.length; i < temp; i++) {
      originData.push({
        key: i + 1,
        username: formatedata[i].username,
        password: formatedata[i].password,
        type: formatedata[i].type,
        realName: formatedata[i].realName,
        cname: formatedata[i].cname,
        sex: formatedata[i].sex,
        department: formatedata[i].department,
        affiliation: formatedata[i].affiliation,
        age: formatedata[i].age,
        duty: formatedata[i].duty,
        IDcard: formatedata[i].IDcard,
        nation: formatedata[i].nation,
        region: formatedata[i].region,
        phone: formatedata[i].phone,
        eMail: formatedata[i].eMail,
        street: formatedata[i].street,
        diploma: formatedata[i].diploma,
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
      title: "职工号",
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
    // {
    //   title: "专业名",
    //   dataIndex: "cname",
    //   width: "7%",
    // },

    {
      title: "电话",
      dataIndex: "phone",
      width: "7%",
    },
    {
      title: "邮件",
      dataIndex: "eMail",
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
            <DeleteAdminModel tempdata={tempdata}></DeleteAdminModel>
          </Typography.Link>
        );
      },
    },
  ];

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
        headerTitle=" 管理员信息表"
        toolBarRender={() => [
          <EditTeacherModal></EditTeacherModal>,

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
    stuSearchadmin: state.stuSearchadmin,
  }),

  { AdminSearchtea, AdminUserid, addAdmin }
)(Admininfomation);
