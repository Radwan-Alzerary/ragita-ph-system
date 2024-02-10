
const Salespositemcategoryselect = (props) => {

  
  return (
    <button
      className={`p-1 w-36 min-w-[100px] hover:bg-orange-200 ${props.active ? 'bg-orange-300' : 'bg-white'} rounded-full`}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};

export default Salespositemcategoryselect;
