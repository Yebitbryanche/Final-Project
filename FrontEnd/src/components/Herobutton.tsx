interface Props{
    title:string;
    className?:string;
}

const Herobutton = ({title,className}:Props) => {
  return (
    <button className={className}>
        {title}

    </button>
  )
  
}
export default Herobutton