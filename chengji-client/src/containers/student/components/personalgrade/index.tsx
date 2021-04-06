import {
  Table,
  Button,
  Space,
  Tooltip,
  Select,
  Tag,
  Typography,
  Form,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  StudentUserid,
  getStuGradeCountInfo,
  getGradeCheat,
} from "@/redux/actions";
import { connect, RootStateOrAny } from "react-redux";
import Cookies from "js-cookie";
import ProTable from "@ant-design/pro-table";
import type { ActionType } from "@ant-design/pro-table";
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import PersonalEditTableModal from "./components/model";
const originData: any = [];
const cookicedata: any = [];
const searchdata: any = [];
let flag = 0;
const PersonalGradeTable = (props) => {
  const userid = Cookies.get("userid");
  useEffect(() => {
    props.StudentUserid({ id: userid });
  }, []);
  const { Option } = Select;
  const cookiceuserid = props.cooikeuserid;
  const cookicelength = cookiceuserid.length;

  if (JSON.stringify(cookiceuserid) !== "{}") {
    for (let i = cookicedata.length; i < cookicelength; i++) {
      cookicedata.push({
        key: i + 1,

        username: cookiceuserid[i].username,
        password: cookiceuserid[i].password,
        realName: cookiceuserid[i].realName,
        sex: cookiceuserid[i].sex,
        affiliation: cookiceuserid[i].affiliation,
        IDcard: cookiceuserid[i].IDcard,
        cname: cookiceuserid[i].cname,
        classno: cookiceuserid[i].classno,
        years: cookiceuserid[i].years,
        term: cookiceuserid[i].term,
        department: cookiceuserid[i].department,
        nation: cookiceuserid[i].nation,
        region: cookiceuserid[i].region,
        phone: cookiceuserid[i].phone,
        eMail: cookiceuserid[i].eMail,
        street: cookiceuserid[i].street,
        address: cookiceuserid[i].address,
        recommend: cookiceuserid[i].recommend,
      });
      props.getStuGradeCountInfo(cookicedata[0]);
    }
  }
  const actionRef = useRef<ActionType>();
  useEffect(() => {}, []);
  const formatedata = props.gradecount;

  const temp = formatedata.length;
  originData.length = 0;
  if (JSON.stringify(formatedata) !== "{}") {
    for (let i = originData.length; i < temp; i++) {
      originData.push({
        key: i + 1,

        classno: formatedata[i].classno,
        username: formatedata[i].username,
        realName: formatedata[i].realName,
        cname: formatedata[i].cname,
        department: formatedata[i].department,
        countcredit: formatedata[i].countcredit,
        averagecountcredit: formatedata[i].averagecountcredit,
        flaggrade: formatedata[i].flaggrade,
        flagcheat: formatedata[i].flagcheat,
        count: formatedata[i].count,
        average: formatedata[i].average,
        countgpa: formatedata[i].countgpa,
        averagegpa: formatedata[i].averagegpa,
      });
    }
  }
  const [state, setState]: any = useState({
    filteredInfo: null,
    sortedInfo: null,
  });
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "countgpa",
      },
    });
  };
  const refresh = () => {
    window.history.go(0);
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns: any = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
    },

    {
      title: "学号",
      dataIndex: "username",
      key: "username",

      filteredValue: filteredInfo.username || null,
      onFilter: (value, record) => record.username.includes(value),
      //   sorter: (a, b) => a.username.length - b.username.length,
      sortOrder: sortedInfo.columnKey === "username" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "姓名",
      dataIndex: "realName",
      key: "realName",

      filteredValue: filteredInfo.realName || null,
      onFilter: (value, record) => record.realName.includes(value),
      //   sorter: (a, b) => a.realName.length - b.realName.length,
      sortOrder: sortedInfo.columnKey === "realName" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "学院",
      dataIndex: "department",
      key: "department",

      filteredValue: filteredInfo.department || null,
      onFilter: (value, record) => record.department.includes(value),
      //   sorter: (a, b) => a.cname.length - b.cname.length,
      sortOrder: sortedInfo.columnKey === "department" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "专业",
      dataIndex: "cname",
      key: "cname",

      filteredValue: filteredInfo.cname || null,
      onFilter: (value, record) => record.cname.includes(value),
      //   sorter: (a, b) => a.cname.length - b.cname.length,
      sortOrder: sortedInfo.columnKey === "cname" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "班级",
      dataIndex: "classno",
      key: "classno",

      filteredValue: filteredInfo.classno || null,
      onFilter: (value, record) => record.classno.includes(value),
      //   sorter: (a, b) => a.classno.length - b.classno.length,
      sortOrder: sortedInfo.columnKey === "classno" && sortedInfo.order,
      ellipsis: true,
    },

    {
      title: "总学分",
      dataIndex: "countcredit",
      key: "countcredit",
      //   sorter: (a, b) => a.countcredit - b.countcredit,
      sortOrder: sortedInfo.columnKey === "countcredit" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "平均学分",
      dataIndex: "averagecountcredit",
      key: "averagecountcredit",
      sorter: (a, b) => a.averagecountcredit - b.averagecountcredit,
      sortOrder:
        sortedInfo.columnKey === "averagecountcredit" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "总分",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
      sortOrder: sortedInfo.columnKey === "count" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "平均分",
      dataIndex: "average",
      key: "average",
      sorter: (a, b) => a.average - b.average,
      sortOrder: sortedInfo.columnKey === "average" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "总绩点",
      dataIndex: "countgpa",
      key: "countgpa",
      //   sorter: (a, b) => a.countgpa - b.countgpa,
      sortOrder: sortedInfo.columnKey === "countgpa" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "平均绩点",
      dataIndex: "averagegpa",
      key: "averagegpa",
      sorter: (a, b) => a.averagegpa - b.averagegpa,
      sortOrder: sortedInfo.columnKey === "averagegpa" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      align: "center",
      render: (_, record) => (
        <Typography.Link>
          <PersonalEditTableModal clickdata={record}></PersonalEditTableModal>
        </Typography.Link>
      ),
    },
  ];

  const onFinish = (e) => {
    props.getGradeCheat(e);
    console.log("eeeeeeeee", e);

    flag = 1;
  };
  const search = props.gradecount;

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

        countcredit: search[i].countcredit,
        averagecountcredit: search[i].averagecountcredit,

        count: search[i].count,
        average: search[i].average,
        countgpa: search[i].countgpa,
        averagegpa: search[i].averagegpa,
      });
    }
  }
  return (
    <>
      {/* <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space> */}
      <ProTable
        columns={columns}
        dataSource={flag === 0 ? [...originData] : [...searchdata]}
        onChange={handleChange}
        options={{ fullScreen: true, reload: false }}
        actionRef={actionRef}
        search={false}
        bordered
        toolBarRender={() => [
          // <Form name="nest-messages" layout="inline" onFinish={onFinish}>
          //   <Form.Item name={"classno"} label="班级">
          //     <Select placeholder="请选择班级">
          //       <Option value={cookicedata[0]?.cname + "1"}>
          //         {cookicedata[0]?.cname + "1"}
          //       </Option>
          //       <Option value={cookicedata[0]?.cname + "2"}>
          //         {cookicedata[0]?.cname + "2"}
          //       </Option>
          //       <Option value={cookicedata[0]?.cname + "3"}>
          //         {cookicedata[0]?.cname + "3"}
          //       </Option>
          //     </Select>
          //   </Form.Item>
          //   <Form.Item name={"flaggrade"} label="不及格">
          //     <Select placeholder="请选择">
          //       <Option value="不及格">不及格</Option>
          //     </Select>
          //   </Form.Item>
          //   <Form.Item name={"flagcheat"} label="作弊">
          //     <Select placeholder="请选择">
          //       <Option value="作弊">作弊</Option>
          //     </Select>
          //   </Form.Item>
          //   <Form.Item>
          //     <Tooltip title="查找">
          //       <Button
          //         htmlType="submit"
          //         style={{ border: 0 }}
          //         shape="circle"
          //         icon={<SearchOutlined />}
          //       />
          //     </Tooltip>
          //   </Form.Item>
          // </Form>,
          <Tooltip title="刷新">
            <Button
              style={{ border: 0 }}
              shape="circle"
              onClick={refresh}
              icon={<RedoOutlined />}
            />
          </Tooltip>,
        ]}
        headerTitle="成绩信息表"
      />
    </>
  );
};

export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({
    grade: state.grade,
    cooikeuserid: state.cooikeuserid,
    gradecount: state.gradecount,
  }),
  //  函数确定
  { StudentUserid, getStuGradeCountInfo, getGradeCheat }
)(PersonalGradeTable);
