export default function Status(props) {
  const hideModal = e => {
    e.preventDefault()
    props.setShowStatus(!props.showStatus)
  }

  return (
    <div className='w3-container'>
      <div
        style={{ display: `${props.showStatus ? 'block' : 'none'}` }}
        className='w3-modal w3-round-large'
      >
        <div className='w3-modal-content w3-animate-zoom w3-card-4 w3-round-large'>
          <span onClick={hideModal} className='w3-button w3-display-topright'>
            &times;
          </span>
          <form className='w3-container w3-center w3-padding'>
            <h5>
              Based on the information you provided Your application is pending
            </h5>
          </form>
        </div>
      </div>
    </div>
  )
}
