function Button({ name, onClick, focus, InternClassName }: { name: string, onClick: any, focus: boolean, InternClassName?: any }) {
  const colorButton = focus ? 'bg-green-500' : 'bg-red-500 hover:bg-gray-500 opacity-70 border-red-500'

  InternClassName = (InternClassName != null) ? `${InternClassName} hover:bg-gray-500` : `${colorButton} rounded-lg `;

  return (
    <>
      <div onClick={onClick} className={InternClassName}>
        <p>
          {name}
        </p>
      </div>
    </>
  )
}

export default Button