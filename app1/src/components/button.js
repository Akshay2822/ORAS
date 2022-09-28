const Button = (props) => {
  const { title, onClick } = props
  return (
    <button onClick={onClick} style={styles.button}>
      {title}
    </button>
  )
}

const styles = {
  button: {
    position: 'relative',
    marginLeft:520,
    width: '20%',
    height: 40,
    backgroundColor: '#6044E7',
    color: 'white',
    borderRadius: 5,
    border: 'none',
    marginTop: 10,
  },
}

export default Button
