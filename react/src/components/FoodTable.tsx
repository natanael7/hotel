import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Search } = Input;
import { useEffect, useState } from "react";
import { ColumnType, ColumnGroupType } from "antd/es/table";
import { GET_FOOD } from "../server-functions";

interface APIResponse {
  title: string;
  description: string;
  image: string;
  key?: number;
}

interface Props {
  columns: (ColumnType<APIResponse> | ColumnGroupType<APIResponse>)[];
  pagination?: number;
  handleClickOnRow?: Function;
}

export default function FoodTable({
  columns,
  pagination = 20,
  handleClickOnRow = () => 1,
}: Props) {
  // const response = await GET_FOOD();
  const [foodList, setFoodList] = useState<APIResponse[]>([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GET_FOOD();
        setFoodList(response.map((food, index) => ({ ...food, key: index })));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  const getRowClassName = (_: any, index: number) => {
    return index % 2 === 0 ? "table-row-light" : "table-row-dark";
  };
  // Define a function to handle the search query
  const handleSearch = (value: string) => setSearchValue(value);

  // Filter the data based on the search query
  const filteredData = foodList.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  columns[0].render = (text: string) => {
    const regex = new RegExp(`(${searchValue})`, "gi");
    const highlightedText = text.replace(regex, `<mark>${searchValue}</mark>`);
    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  // APPLICATION

  return (
    <>
      <Search
        placeholder="Search title"
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ margin: "20px 0 10px 0" }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: pagination }}
        rowClassName={getRowClassName}
        bordered
        onRow={(record) => {
          return {
            onClick: () => handleClickOnRow(record),
          };
        }}
      />
    </>
  );
}
