import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import "./EditableTable.css";
import { UPDATE_FOOD, DELETE_FOOD } from "../../server-functions";
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
interface FoodImageProps {
  image: string;
}
interface APIResponse {
  title: string;
  description: string;
  image: string;
  _id: string;
  v?: number;
}
interface Item extends APIResponse {
  key: React.Key;
}

interface PropsInterface {
  items: Item[];
  fetchSetItems: Function;
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
const FoodImage: React.FC<FoodImageProps> = ({ image }: FoodImageProps) => {
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
};

const EditableTable: React.FC<PropsInterface> = ({ items, fetchSetItems }) => {
  useEffect(() => {
    fetchSetItems();
  }, []);

  const [form] = Form.useForm();
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

      const newData = [...items];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        await UPDATE_FOOD(newData[index]);
        await fetchSetItems();
        setEditingKey("");
      } else {
        throw "Unknow updating element";
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteRecord = async (key: React.Key) => {
    const newData = [...items];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      await DELETE_FOOD(newData[index]);
      await fetchSetItems();
    }
  };

  const columns = [
    {
      title: "Titolo",
      dataIndex: "title",
      key: "title",
      editable: true,
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
      className: "column-title",
      inputType: "textarea", // set the inputType prop to "textarea"
    },
    {
      title: "Descrizione",
      dataIndex: "description",
      key: "description",
      editable: true,
      inputType: "textarea",
      className: "column-description",
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
        dataSource={items}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
          pageSize: 7,
        }}
      />
    </Form>
  );
};

export default EditableTable;
