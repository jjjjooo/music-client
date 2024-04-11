const page = (props) => {
  console.log(props);
  return <div>channel/[{props.params.id}]</div>;
};

export default page;
