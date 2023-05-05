import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Search } = Input;
import { useState } from "react";
import { ColumnType, ColumnGroupType } from "antd/es/table";

interface APIResponse {
  title: string;
  description: string;
  image: string;
  key?: number;
}
const response: APIResponse[] = [
  {
    title: "Canelloni",
    description:
      "pasta ripiena di pesce e aromi marini, condita con salsa di pomodoro e besciamella.\n\n",
    image: "/src/img/73ce1bcb-ab10-43a9-8b15-be0f7fe0873a.avif",
  },
  {
    title: "pasta ala matriciana",
    description: "pasta alla matriciana",
    image: "/src/img/d5137045-2709-4380-ae70-60a829d33ce7.jpeg",
  },
  {
    title: "Pasta al pomodoro",
    description:
      "pasta semplice condita con salsa di pomodoro fresco e basilico.\n\n",
    image: "/src/img/33a0e276-7673-46fe-8d3c-60fe3b0ede4a.webp",
  },
  {
    title: "Canelloni",
    description:
      "pasta ripiena di pesce e aromi marini, condita con salsa di pomodoro e besciamella.\n\n",
    image: "/src/img/73ce1bcb-ab10-43a9-8b15-be0f7fe0873a.avif",
  },
  {
    title: "pasta ala matriciana",
    description: "pasta alla matriciana",
    image: "/src/img/d5137045-2709-4380-ae70-60a829d33ce7.jpeg",
  },
  {
    title: "Pasta al pomodoro",
    description:
      "pasta semplice condita con salsa di pomodoro fresco e basilico.\n\n",
    image: "/src/img/33a0e276-7673-46fe-8d3c-60fe3b0ede4a.webp",
  },
  {
    title: "Canelloni",
    description:
      "pasta ripiena di pesce e aromi marini, condita con salsa di pomodoro e besciamella.\n\n",
    image: "/src/img/73ce1bcb-ab10-43a9-8b15-be0f7fe0873a.avif",
  },
  {
    title: "pasta ala matriciana",
    description: "pasta alla matriciana",
    image: "/src/img/d5137045-2709-4380-ae70-60a829d33ce7.jpeg",
  },
  {
    title: "Pasta al pomodoro",
    description:
      "pasta semplice condita con salsa di pomodoro fresco e basilico.\n\n",
    image: "/src/img/33a0e276-7673-46fe-8d3c-60fe3b0ede4a.webp",
  },
  {
    title: "Canelloni",
    description:
      "pasta ripiena di pesce e aromi marini, condita con salsa di pomodoro e besciamella.\n\n",
    image: "/src/img/73ce1bcb-ab10-43a9-8b15-be0f7fe0873a.avif",
  },
  {
    title: "pasta ala matriciana",
    description: "pasta alla matriciana",
    image: "/src/img/d5137045-2709-4380-ae70-60a829d33ce7.jpeg",
  },
  {
    title: "Pasta al pomodoro",
    description:
      "pasta semplice condita con salsa di pomodoro fresco e basilico.\n\n",
    image: "/src/img/33a0e276-7673-46fe-8d3c-60fe3b0ede4a.webp",
  },
  {
    title: "Canelloni",
    description:
      "pasta ripiena di pesce e aromi marini, condita con salsa di pomodoro e besciamella.\n\n",
    image: "/src/img/73ce1bcb-ab10-43a9-8b15-be0f7fe0873a.avif",
  },
  {
    title: "pasta ala matriciana",
    description: "pasta alla matriciana",
    image: "/src/img/d5137045-2709-4380-ae70-60a829d33ce7.jpeg",
  },
  {
    title: "Pasta al pomodoro",
    description:
      "pasta semplice condita con salsa di pomodoro fresco e basilico.\n\n",
    image: "/src/img/33a0e276-7673-46fe-8d3c-60fe3b0ede4a.webp",
  },
  {
    title: "Canelloni",
    description:
      "pasta ripiena di pesce e aromi marini, condita con salsa di pomodoro e besciamella.\n\n",
    image: "/src/img/73ce1bcb-ab10-43a9-8b15-be0f7fe0873a.avif",
  },
  {
    title: "pasta ala matriciana",
    description: "pasta alla matriciana",
    image: "/src/img/d5137045-2709-4380-ae70-60a829d33ce7.jpeg",
  },
  {
    title: "Pasta al pomodoro",
    description:
      "pasta semplice condita con salsa di pomodoro fresco e basilico.\n\n",
    image: "/src/img/33a0e276-7673-46fe-8d3c-60fe3b0ede4a.webp",
  },
  {
    title: "Canelloni",
    description:
      "pasta ripiena di pesce e aromi marini, condita con salsa di pomodoro e besciamella.\n\n",
    image: "/src/img/73ce1bcb-ab10-43a9-8b15-be0f7fe0873a.avif",
  },
  {
    title: "pasta ala matriciana",
    description: "pasta alla matriciana",
    image: "/src/img/d5137045-2709-4380-ae70-60a829d33ce7.jpeg",
  },
  {
    title: "Pasta al pomodoro",
    description:
      "pasta semplice condita con salsa di pomodoro fresco e basilico.\n\n",
    image: "/src/img/33a0e276-7673-46fe-8d3c-60fe3b0ede4a.webp",
  },
  {
    title: "Canelloni",
    description:
      "pasta ripiena di pesce e aromi marini, condita con salsa di pomodoro e besciamella.\n\n",
    image: "/src/img/73ce1bcb-ab10-43a9-8b15-be0f7fe0873a.avif",
  },
  {
    title: "pasta ala matriciana",
    description: "pasta alla matriciana",
    image: "/src/img/d5137045-2709-4380-ae70-60a829d33ce7.jpeg",
  },
  {
    title: "Pasta al pomodoro",
    description:
      "pasta semplice condita con salsa di pomodoro fresco e basilico.\n\n",
    image: "/src/img/33a0e276-7673-46fe-8d3c-60fe3b0ede4a.webp",
  },
];
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
  const getRowClassName = (_: any, index: number) => {
    return index % 2 === 0 ? "table-row-light" : "table-row-dark";
  };
  const foodList = response.map((food, index) => {
    food["key"] = index;
    return food;
  });
  const [searchValue, setSearchValue] = useState("");

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
