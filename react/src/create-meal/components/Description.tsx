interface Props {
  description: string;
  setDescription: Function;
}
const Description: React.FC<Props> = ({ description, setDescription }) => {
  function handleDescriptionEdit(even: any) {
    setDescription(even.target.value);
  }

  return (
    <>
      <textarea
        id="new-food-description"
        defaultValue={description}
        onChange={handleDescriptionEdit}
      ></textarea>
    </>
  );
};

export default Description;
