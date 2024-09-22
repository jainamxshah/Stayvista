interface CustumButtonProps {
    label: string;
    classname: string;
    onClick?:()=> void;
}

const CustumButton: React.FC<CustumButtonProps> = ({label,onClick,classname}) => {
  return (
    <div onClick={onClick} className={`w-full py-4 bg-stayvista hover:stayvista-dark text-white rounded-xl transition cursor-pointer text-center ${classname}`}>
        {label}
    </div>
  )
}

export default CustumButton
