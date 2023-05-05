import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import "./EditableTable.css";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text" | "textarea"; // add "textarea" as a valid option
  record: APIResponse;
  index: number;
  children: React.ReactNode;
  rows?: number; // add the "rows" prop for the Input.TextArea component
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  rows = 3, // set a default value for the "rows" prop
  ...restProps
}) => {
  console.log(inputType);
  const inputNode =
    inputType === "number" ? (
      <InputNumber />
    ) : inputType === "textarea" ? ( // add a check for "textarea"
      <Input.TextArea rows={rows} />
    ) : (
      <Input />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
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

interface FoodImageProps {
  image: string;
}

interface APIResponse {
  title: string;
  description: string;
  image: string;
}
interface Item extends APIResponse {
  key: React.Key;
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

function FoodImage({ image }: FoodImageProps) {
  return (
    <img
      src={image.replace("/src", "")}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        height: "100%",
        width: "100%",
        objectFit: "cover",
      }}
    />
  );
}
const App: React.FC = () => {
  const items: Item[] = response.map((el, idx) => ({
    ...el,
    key: idx.toString(),
  }));

  const [form] = Form.useForm();
  const [data, setData] = useState(items);
  const [editingKey, setEditingKey] = useState<React.Key>("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
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

  const deleteRecord = (key: React.Key) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      newData.splice(index, 1); // Remove the item from the array
      setData(newData); // Set the new data
    }
  };

  const columns = [
    {
      title: "Titolo",
      dataIndex: "title",
      key: "title",
      editable: true,
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
      inputType: "textarea", // set the inputType prop to "textarea"
    },
    {
      title: "Descrizione",
      dataIndex: "description",
      key: "description",
      editable: true,
      inputType: "textarea", // set the inputType prop to "textarea"
    },
    {
      title: "Imagine",
      dataIndex: "image",
      key: "image",
      className: "image-column",
      showHeader: false,
      render: (image: string) => <FoodImage image={image} />,
    },
    {
      title: "operation",
      className: "operation-column",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a className="danger-btn">Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            {" "}
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteRecord(record.key)}
            >
              {" "}
              <Typography.Link
                disabled={editingKey !== ""}
                className="danger-btn"
              >
                Delete
              </Typography.Link>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.inputType
          ? col.inputType
          : col.dataIndex === "age"
          ? "number"
          : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        className="editable-table"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
          pageSize: 8,
        }}
      />
    </Form>
  );
};

export default App;
