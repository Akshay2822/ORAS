const Input = (props) => {
  const { title, type, onChange,value } = props
  return (
    <div className='mb-3'>
      <label>{title}</label>
      <input
      value={value}
        onChange={onChange}
        type={type ? type : 'text'}
        className='form-control'></input>
    </div>
  )
}

export default Input
